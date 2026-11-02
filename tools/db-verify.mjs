#!/usr/bin/env node
// tools/db-verify.mjs: prove the app's data is private BEFORE a migration touches a live database.
//
// Usage (from web/, once):   npm i -D @electric-sql/pglite
// Then, before applying any migration (SOP 02):
//   cd web && node ../tools/db-verify.mjs                      # default: web/supabase/migrations
//   node tools/db-verify.mjs path/to/migrations                # or any folder of *.sql
//
// What it proves, without touching any live database:
//   1. Every migration applies, in order, on an EMPTY Postgres that has only what a fresh
//      Supabase project provides (roles, auth.users, auth.uid(), storage), and re-applies
//      (idempotent).
//   2. Isolation, adversarially, on every table in the public schema:
//      - row level security is ON; the anon role holds no privilege;
//      - every policy is service_role only, scoped to the signed-in user
//        (`<scope column> = auth.uid()`, scope columns below), or a read-only platform
//        policy (`owner_id IS NULL`, SELECT only);
//      - owner_id references auth.users ON DELETE CASCADE (deleting an account empties it);
//      - with a row seeded for user A: user B reads 0, updates 0, deletes 0 of A's rows, an
//        insert by B carrying A's owner_id is refused, and A can read its own row (the policy
//        is not simply "deny everything");
//      - every foreign key between owned tables includes owner_id (composite), so a row can
//        never point at another user's row;
//      - storage: no public bucket, every storage policy pinned to the user's own folder.
//   Tables that are deliberately server-only go in SERVICE_ONLY with a reason.
//
// Exit code 0 = pass, 1 = a finding (printed), 2 = the harness itself broke.
// Adapted from a production isolation harness; the gates each come from a real near-miss.

import { readdirSync, readFileSync, existsSync } from 'node:fs'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const MIGRATIONS = resolve(process.argv[2] ?? join(ROOT, 'web', 'supabase', 'migrations'))

/** Tables no signed-in user may read directly (server code only). Each needs a reason. */
const SERVICE_ONLY = {
  // example_api_keys: 'encrypted provider keys: read and written only by server code',
}

/** Columns a policy may compare to auth.uid(). owner_id = the business owner's rows;
 *  user_id / client_id = rows a logged-in client may see (a client area). */
const SCOPE_COLUMNS = ['owner_id', 'user_id', 'client_id']

/** Values the harness cannot guess from a CHECK (a regex, "one of a or b"), per table. */
const SEED_EXTRA = {
  // bookings: { status: `'requested'` },
}

const A = '00000000-0000-4000-8000-00000000000a'
const B = '00000000-0000-4000-8000-00000000000b'

// What a fresh Supabase project already has, and nothing more.
const SUPABASE_STUB = `
create role anon nologin;
create role authenticated nologin;
create role service_role nologin bypassrls;
create schema auth;
create table auth.users (
  id uuid primary key,
  email text,
  raw_user_meta_data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create function auth.uid() returns uuid language sql stable as
  $$ select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid $$;
create function auth.role() returns text language sql stable as
  $$ select nullif(current_setting('request.jwt.claim.role', true), '') $$;
create function auth.jwt() returns jsonb language sql stable as
  $$ select coalesce(nullif(current_setting('request.jwt.claims', true), ''), '{}')::jsonb $$;
create schema storage;
create table storage.buckets (
  id text primary key, name text not null, public boolean default false,
  file_size_limit bigint, allowed_mime_types text[], created_at timestamptz default now()
);
create table storage.objects (
  id uuid primary key default gen_random_uuid(), bucket_id text references storage.buckets(id),
  name text, owner uuid, metadata jsonb, created_at timestamptz default now()
);
alter table storage.objects enable row level security;
create function storage.foldername(name text) returns text[] language sql immutable as
  $$ select (string_to_array(name, '/'))[1:array_length(string_to_array(name, '/'), 1) - 1] $$;
grant usage on schema public, auth, storage to anon, authenticated, service_role;
grant execute on all functions in schema auth to anon, authenticated, service_role;
alter default privileges in schema public grant all on tables to anon, authenticated, service_role;
alter default privileges in schema public grant all on sequences to anon, authenticated, service_role;
alter default privileges in schema public grant execute on functions to anon, authenticated, service_role;
grant all on all tables in schema storage to authenticated, service_role;
insert into auth.users (id, email) values ('${A}', 'a@tenant.test'), ('${B}', 'b@tenant.test');
`

const findings = []
const fail = (msg) => findings.push(msg)

async function loadPGlite(needs) {
  // Resolve from the current folder first (web/ holds the dev dependency), then from here.
  const bases = [join(process.cwd(), 'package.json'), join(ROOT, 'web', 'package.json'), import.meta.url]
  for (const base of bases) {
    try {
      const req = createRequire(base)
      const core = await import(req.resolve('@electric-sql/pglite'))
      const extensions = {}
      if (needs.vector) extensions.vector = (await import(req.resolve('@electric-sql/pglite/vector'))).vector
      if (needs.trgm) extensions.pg_trgm = (await import(req.resolve('@electric-sql/pglite/contrib/pg_trgm'))).pg_trgm
      return new core.PGlite({ extensions })
    } catch {
      /* try the next base */
    }
  }
  console.error('db-verify: @electric-sql/pglite not found. Run `npm i -D @electric-sql/pglite` in web/.')
  process.exit(2)
}

async function asUser(db, uid, fn) {
  await db.exec(`set role authenticated; select set_config('request.jwt.claim.sub', '${uid}', false); select set_config('request.jwt.claim.role', 'authenticated', false);`)
  try {
    return await fn()
  } finally {
    await db.exec(`reset role; select set_config('request.jwt.claim.sub', '', false);`)
  }
}

/** A literal for a NOT NULL column without default, honouring simple CHECK (col in (...)). */
function literalFor(col, checks) {
  const check = checks.find((c) => c.includes(col.name))
  const allowed = check && /'([^']*)'::text/.exec(check)
  if (allowed) return `'${allowed[1].replace(/'/g, "''")}'`
  const t = col.type
  if (t === 'uuid') return `'00000000-0000-4000-8000-${String(col.ordinal ?? 0).padStart(12, '0')}'`
  if (t === 'text' || t.startsWith('character') || t === 'citext') return `'x'`
  if (t === 'boolean') return 'false'
  if (/int|numeric|double|real|money/.test(t)) {
    const lo = check && new RegExp(`${col.name} >= \\(?(\\d+)`).exec(check)
    return lo ? lo[1] : '0'
  }
  const isEnd = /(^|_)end/.test(col.name)
  if (t.startsWith('timestamp')) return isEnd ? "now() + interval '1 hour'" : 'now()'
  if (t.startsWith('time')) return isEnd ? "'17:00'" : "'09:00'"
  if (t === 'date') return 'current_date'
  if (t === 'jsonb' || t === 'json') return `'{}'`
  if (t.endsWith('[]')) return `'{}'`
  if (t === 'tsvector') return `''::tsvector`
  return null
}

const SCOPE = new RegExp(`(?:${SCOPE_COLUMNS.join('|')}) = (?:auth\\.uid\\(\\)|\\( SELECT auth\\.uid\\(\\) AS uid\\))`)
const scoped = (e) => SCOPE.test(e)

async function main() {
  if (!existsSync(MIGRATIONS)) {
    console.error(`db-verify: no migrations folder at ${MIGRATIONS}`)
    process.exit(2)
  }
  const files = readdirSync(MIGRATIONS).filter((f) => f.endsWith('.sql')).sort()
  const allSql = files.map((f) => readFileSync(join(MIGRATIONS, f), 'utf8')).join('\n')
  const db = await loadPGlite({ vector: /\bvector\b/i.test(allSql), trgm: /pg_trgm/i.test(allSql) })
  await db.exec(SUPABASE_STUB)

  for (const f of files) {
    try {
      await db.exec(readFileSync(join(MIGRATIONS, f), 'utf8'))
    } catch (err) {
      console.error(`✗ migration ${f} failed on an empty database:\n  ${err.message}`)
      process.exit(1)
    }
  }
  for (const f of files) {
    try {
      await db.exec(readFileSync(join(MIGRATIONS, f), 'utf8'))
    } catch (err) {
      fail(`migration ${f} is not idempotent (re-running it fails): ${err.message}`)
    }
  }
  console.log(`✓ ${files.length} migration(s) apply on an empty database (and re-apply)`)

  const { rows: tables } = await db.query(`
    select c.relname as name, c.relrowsecurity as rls
    from pg_class c join pg_namespace n on n.oid = c.relnamespace
    where n.nspname = 'public' and c.relkind in ('r', 'p') order by c.relname`)

  for (const t of tables) {
    const name = t.name
    if (!t.rls) fail(`${name}: row level security is OFF`)
    const { rows: anonPriv } = await db.query(
      `select has_table_privilege('anon', 'public.' || quote_ident($1), 'select') or has_table_privilege('anon', 'public.' || quote_ident($1), 'insert') as any`, [name])
    if (anonPriv[0].any) fail(`${name}: the anon role (anyone, not signed in) still holds privileges: add \`revoke all on public.${name} from anon;\``)

    const { rows: policies } = await db.query(
      `select polname, polcmd, array(select rolname from pg_roles where oid = any(polroles)) as roles,
              pg_get_expr(polqual, polrelid) as using_expr, pg_get_expr(polwithcheck, polrelid) as check_expr
       from pg_policy where polrelid = ('public.' || quote_ident($1))::regclass`, [name])
    for (const p of policies) {
      const roles = p.roles
      if (roles.length === 1 && roles[0] === 'service_role') continue
      if (roles.includes('anon') || roles.includes('public') || roles.length === 0) {
        fail(`${name}.${p.polname}: policy applies to ${roles.length ? roles.join(',') : 'PUBLIC (everyone)'}`)
        continue
      }
      const u = (p.using_expr ?? '').replace(/\s+/g, ' ')
      const c = (p.check_expr ?? '').replace(/\s+/g, ' ')
      const platformRead = p.polcmd === 'r' && /owner_id IS NULL/.test(u) && !/ OR /i.test(u.replace(SCOPE, ''))
      if (platformRead) continue
      if (!scoped(u)) fail(`${name}.${p.polname}: USING is not scoped to the signed-in user (${u || 'none'})`)
      if (p.polcmd !== 'r' && p.polcmd !== 'd' && !scoped(c || u)) fail(`${name}.${p.polname}: WITH CHECK is not scoped to the signed-in user (${c || 'none'})`)
    }

    const { rows: cols } = await db.query(
      `select a.attname as name, format_type(a.atttypid, a.atttypmod) as type, a.attnotnull as notnull,
              a.atthasdef as hasdef, a.attidentity <> '' or a.attgenerated <> '' as auto, a.attnum as ordinal
       from pg_attribute a where a.attrelid = ('public.' || quote_ident($1))::regclass and a.attnum > 0 and not a.attisdropped`, [name])

    if (SERVICE_ONLY[name]) {
      if (policies.some((p) => !(p.roles.length === 1 && p.roles[0] === 'service_role'))) fail(`${name}: listed as server-only but has user policies`)
      const r = await asUser(db, A, () => db.query(`select count(*)::int as n from public."${name}"`)).catch((e) => ({ rows: [{ n: /permission denied/i.test(e.message) ? 0 : `error ${e.message}` }] }))
      if (r.rows[0].n !== 0) fail(`${name}: a signed-in user can read rows of a server-only table (${r.rows[0].n})`)
      continue
    }
    if (!cols.some((c) => c.name === 'owner_id')) {
      fail(`${name}: no owner_id column (every table needs one, or list it in SERVICE_ONLY with a reason)`)
      continue
    }
    const { rows: fk } = await db.query(
      `select confdeltype from pg_constraint where conrelid = ('public.' || quote_ident($1))::regclass and contype = 'f'
         and confrelid = 'auth.users'::regclass and conkey = array[(select attnum from pg_attribute where attrelid = ('public.' || quote_ident($1))::regclass and attname = 'owner_id')]`, [name])
    if (fk.length === 0 || fk[0].confdeltype !== 'c') fail(`${name}: owner_id does not reference auth.users ON DELETE CASCADE`)

    // Seed one row for user A as superuser, foreign keys and triggers off.
    const { rows: checkRows } = await db.query(
      `select pg_get_constraintdef(oid) as def from pg_constraint where conrelid = ('public.' || quote_ident($1))::regclass and contype = 'c'`, [name])
    const checks = checkRows.map((r) => r.def)
    const needed = cols.filter((c) => c.notnull && !c.hasdef && !c.auto && c.name !== 'owner_id')
    const override = SEED_EXTRA[name] ?? {}
    const extra = Object.entries(override).filter(([k]) => !needed.some((c) => c.name === k))
    const names = ['owner_id', ...needed.map((c) => c.name), ...extra.map(([k]) => k)]
    const values = [`'${A}'`, ...needed.map((c) => override[c.name] ?? literalFor(c, checks)), ...extra.map(([, v]) => v)]
    if (values.includes(null)) {
      fail(`${name}: harness cannot make a test row (column types ${needed.map((c) => c.type).join(', ')}): add it to SEED_EXTRA`)
      continue
    }
    const insert = `insert into public."${name}" (${names.map((n) => `"${n}"`).join(', ')}) values (${values.join(', ')})`
    try {
      await db.exec(`set session_replication_role = replica; ${insert}; set session_replication_role = origin;`)
    } catch (err) {
      await db.exec('set session_replication_role = origin;')
      fail(`${name}: could not make a test row (${err.message}): add it to SEED_EXTRA`)
      continue
    }

    const seen = await asUser(db, B, () => db.query(`select count(*)::int as n from public."${name}" where owner_id = '${A}'`)).catch((e) => ({ rows: [{ n: /permission denied/i.test(e.message) ? 0 : -1 }] }))
    if (seen.rows[0].n !== 0) fail(`${name}: user B can READ user A's rows`)
    const own = await asUser(db, A, () => db.query(`select count(*)::int as n from public."${name}" where owner_id = '${A}'`)).catch(() => ({ rows: [{ n: 0 }] }))
    if (own.rows[0].n < 1) fail(`${name}: user A cannot read their own row (does the policy deny everything?)`)
    const denied = (e) => (/permission denied/i.test(e.message) ? { affectedRows: 0 } : Promise.reject(e))
    const upd = await asUser(db, B, () => db.query(`update public."${name}" set owner_id = owner_id where owner_id = '${A}'`)).catch(denied)
    if ((upd.affectedRows ?? 0) !== 0) fail(`${name}: user B can UPDATE user A's rows`)
    const del = await asUser(db, B, () => db.query(`delete from public."${name}" where owner_id = '${A}'`)).catch(denied)
    if ((del.affectedRows ?? 0) !== 0) fail(`${name}: user B can DELETE user A's rows`)
    try {
      await asUser(db, B, () => db.exec(insert))
      fail(`${name}: user B can INSERT a row owned by user A`)
    } catch (err) {
      if (!/row-level security|permission denied/i.test(err.message)) {
        const probe = await asUser(db, B, () => db.query(`select count(*)::int as n from public."${name}"`))
        if (probe.rows[0].n !== 0) fail(`${name}: insert test inconclusive (${err.message}) and B sees rows`)
      }
    }
  }

  // Same-owner references: a foreign key between two owned tables must include owner_id.
  const { rows: openRefs } = await db.query(`
    select c.conrelid::regclass::text as child, c.confrelid::regclass::text as parent,
           array(select attname from pg_attribute where attrelid = c.conrelid and attnum = any(c.conkey)) as cols
    from pg_constraint c
    join pg_class pc on pc.oid = c.conrelid join pg_namespace pn on pn.oid = pc.relnamespace
    join pg_class fc on fc.oid = c.confrelid join pg_namespace fn on fn.oid = fc.relnamespace
    where c.contype = 'f' and pn.nspname = 'public' and fn.nspname = 'public'
      and exists (select 1 from pg_attribute where attrelid = c.confrelid and attname = 'owner_id' and attnotnull)
      and not ('owner_id' = any(array(select attname from pg_attribute where attrelid = c.conrelid and attnum = any(c.conkey))))`)
  for (const r of openRefs) fail(`${r.child}.${r.cols.join(',')} → ${r.parent}: reference not pinned to the same owner (use a composite foreign key with owner_id)`)

  // Storage: no public bucket, every user policy pinned to the user's own folder.
  const { rows: buckets } = await db.query(`select id, public from storage.buckets`)
  for (const b of buckets) if (b.public) fail(`storage bucket ${b.id} is public`)
  const { rows: sp } = await db.query(
    `select polname, array(select rolname from pg_roles where oid = any(polroles)) as roles,
            coalesce(pg_get_expr(polqual, polrelid), '') || ' ' || coalesce(pg_get_expr(polwithcheck, polrelid), '') as expr
     from pg_policy where polrelid = 'storage.objects'::regclass`)
  for (const p of sp) {
    if (p.roles.length === 1 && p.roles[0] === 'service_role') continue
    if (!/foldername\(name\)\)\[1\] = \(?auth\.uid\(\)\)?::text/.test(p.expr.replace(/\s+/g, ' '))) fail(`storage policy ${p.polname} is not pinned to the user's own folder`)
  }

  if (findings.length) {
    console.error(`✗ isolation: ${findings.length} finding(s) over ${tables.length} table(s)`)
    for (const f of findings) console.error(`  - ${f}`)
    process.exit(1)
  }
  console.log(`✓ isolation holds on ${tables.length} table(s): RLS on, no anon access, policies scoped to the signed-in user, cascade on account deletion, other users cannot read, change, delete or insert; ${buckets.length} private bucket(s)`)
}

main().catch((err) => {
  console.error('db-verify harness error:', err)
  process.exit(2)
})
