# SOP 02: Data change (read, write, or schema)

**When:** a new table or column, a security policy, a form that saves, a page that reads
data, a dashboard number, anything that touches Supabase.
**Tier:** T2 minimum. A write that silently fails looks exactly like success until someone
notices missing data, which can take weeks.
**Specialists:** `database` (schema, RLS) → `builder` (queries, actions) → `verifier` → `reviewer`.

## Schema

1. **The live database is the truth, not the migrations folder.** `list_migrations` and
   `list_tables` before writing anything.
2. Write the migration in `web/supabase/migrations/YYYYMMDDHHMMSS_short_name.sql`,
   idempotent (`if not exists`, `or replace`). Additive by default; dropping or renaming needs her OK.
3. **RLS on every new table** in the same migration. Default: a user reads and writes only
   their own rows (`user_id = auth.uid()`). Anything wider is written down in `docs/wiki/app/_index.md`.
4. **Dry-run** inside `begin; … rollback;`, then apply.
5. `get_advisors` after applying. A new ERROR blocks.
6. Regenerate `web/lib/types/database.ts`. Never hand-edit it.
7. After adding a column, grep every `.select(` on that table. A column nobody selects is
   `undefined` at runtime and green under type-check.

## Reading

- Destructure `error` and check it. `const { data } = await …` silently throws errors away.
- Select named columns, not `*`, on any table with private fields.
- An empty result and a failed query must look different to the user.

## Writing

```ts
const { data, error } = await supabase.from("…").update(patch).eq("id", id).select("id")
if (error) return { ok: false, error: error.message }
if (!data?.length) return { ok: false, error: "no row matched" }   // zero rows is a failure
```

- Validate input with **Zod** at the top of the server action or route handler, and check the
  user is allowed, there, not only in the page.
- Return a typed `{ ok, … }` the caller must handle. Never `void fn().catch(() => {})`.
- A `'use server'` file exports async functions only.
- The service-role key is server-only, filtered by the user's id, with a one-line comment why.

## AI proposes, she decides

Anything inferred by AI (a suggested reply, a tag, a summary, a score) lands as a **suggestion**
she accepts, never as a fact written over her data. Nothing is emailed, posted or charged
without her confirmation.

## Gates

- [ ] Live catalogue checked before writing the migration
- [ ] RLS on every new table; policies match the wiki
- [ ] Dry-run passed; migration applied (or clearly stated as not applied, and what breaks until it is)
- [ ] Advisors: no new ERROR
- [ ] Types regenerated
- [ ] `error` checked on every call; writes use `.select('id')`; Zod on every input
- [ ] Tried for real in the preview: saved, read back, and a second user cannot see it
- [ ] `docs/wiki/app/_index.md` updated: tables, who can read and write them, personal data held
