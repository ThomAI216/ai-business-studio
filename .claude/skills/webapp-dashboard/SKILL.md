---
name: webapp-dashboard
description: App & dashboard studio modules 2 and 3. Set up her data safely and the logins - Supabase project, tables with row level security on every one, the isolation test (tools/db-verify.mjs), her owner gate, client sign-in and the client area's access rules. Load once app/plan.md is confirmed (module 1, app-plan), or when she asks for logins, "only I should see this", "clients log in", a members area, or a database. For a single table or form change later, SOP 02 alone is enough. Plan, dashboard and features are the app-plan, dashboard-design and app-recipes skills.
---

# Web app: her data, safely, and who may sign in

The app lives in the same `web/` Next.js project as the website, on Supabase (database and
logins). This skill is modules 2 and 3 of `.claude/studios/app-dashboard.md`. Module 1
(`app-plan`) must be confirmed first: the approved data list in `docs/wiki/app/plan.md` is the
brief. Module 4 is `dashboard-design`, module 5 is `app-recipes`.

Build order for every step: **database** (tables and security) → **builder** (screens) →
**verifier** → **qa-tester** → **reviewer** → she tries it on the preview link.

## 1 · Supabase setup (step by step with her)

- She connects the **Supabase** connector (claude.ai → Settings → Connectors) and creates a
  project in a region close to her clients. The free tier is enough to start.
- Keys go into **Vercel's environment variables** (and the cloud environment if a session
  needs them), never into a file or the chat. Names are in `.env.example`.
- **One database, hers, for ever.** The studio may only ever touch the project created here,
  for this business, under her own Supabase account. Never pick, open or reuse an existing
  project from a list, even if one appears. After her yes: create `.claude/approvals/supabase-setup`,
  create the project, then write its ref as the single line in `.claude/supabase-project`
  (the guard hook refuses every database call to any other project, and every call at all
  while that file is empty). Record name, region and ref in `docs/wiki/app/_index.md`.

## 2 · Data (module 2)

Turn each "thing" of the approved data list into a table, per `.claude/sops/02-data-change.md`.
The shape every table follows:

```sql
create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now(),
  unique (id, owner_id)                         -- lets child tables pin to the same owner
);
alter table public.clients enable row level security;
revoke all on public.clients from anon;
drop policy if exists clients_owner_rw on public.clients;
create policy clients_owner_rw on public.clients for all to authenticated
  using (owner_id = (select auth.uid())) with check (owner_id = (select auth.uid()));
drop policy if exists clients_service on public.clients;
create policy clients_service on public.clients for all to service_role using (true) with check (true);
```

- A child table points at its parent with a **composite foreign key**
  `foreign key (client_id, owner_id) references public.clients(id, owner_id)`, so a row can
  never be attached to another owner's row.
- Rows a logged-in client may read get a separate policy `client_id = (select auth.uid())`
  (select only, unless the plan says the client may change them).
- `(select auth.uid())` rather than bare `auth.uid()`: evaluated once per query, not per row.
- Migrations are files in `web/supabase/migrations/YYYYMMDDHHMMSS_name.sql`, written to be
  re-runnable (`if not exists`, `drop policy if exists`).

**The isolation test, before anything reaches the live database:**

```bash
cd web && npm i -D @electric-sql/pglite      # once
node ../tools/db-verify.mjs                  # every migration, every time
```

It applies all migrations to an empty database with Supabase's auth stubs, then proves for
every table: RLS on, no anonymous access, policies scoped to the signed-in user, deleting an
account deletes its rows, a second user cannot read, change, delete or insert the first
user's rows, references pinned to the same owner, storage folders private. A table that is
deliberately server-only goes in its `SERVICE_ONLY` list with a reason. **A finding blocks the
migration.** Then: dry-run on the live project, apply, run the advisors, regenerate types
(never hand-edit them).

Write the result in `docs/wiki/app/_index.md`: each table, what it holds, who reads and
writes it, which personal data it contains.

## 3 · Logins and the client area (module 3)

- **Sign-in:** Supabase Auth with an email link (no password to forget) or email and
  password; Google sign-in only if she wants it.
- **Her owner gate fails closed.** Her dashboard routes check, on the server, that the
  signed-in email is in the `OWNER_EMAILS` environment variable. Missing or empty variable:
  nobody gets in, never everybody. Row level security enforces the same thing underneath.
- **Clients** sign in to their own area only; every client screen reads through the
  `client_id` policies. Test with **two test clients**: each must see only their own things.
- Public pages (site, booking, contact form) stay outside the login; their server routes use
  the service role only where unavoidable, always filtered by the owner, with a one-line
  comment why.
- Sign-out, "forgot my link" and an expired-link page exist from day one.

## 4 · Rules that are never relaxed

These come from production systems where each one was paid for:
- **Errors are values.** Every Supabase call destructures and checks `error`. Writes ask for
  `.select('id')` and treat zero rows as failure (a write that matched nothing reports no error).
- **Zod at every boundary:** every form handler, server action and route validates its input
  and checks who is calling, there, not only in the page.
- **Server actions return a typed result** (`{ ok: true, ... } | { ok: false, error }`) the
  screen must handle; never fire and forget.
- **`'use server'` files export async functions only;** helpers live beside them.
- **The service-role key** is server-only, never in a client component, always filtered by owner.
- **AI** goes through one module, `web/lib/ai.ts`, and only proposes (`app-recipes` §8).
- **Emails and messages** to clients are switched on only after she has seen a sample.
- **Collect only what a feature needs;** sensitive data (health, money, identity) only after
  she checked the law for her country with a professional.

## Done for modules 2 and 3

`tools/db-verify.mjs` passes · migration applied and advisors clean · types regenerated ·
she signed in as herself and as a test client on her phone · a second test client sees
nothing of the first · verifier green, qa-tester and reviewer have no blockers ·
`docs/wiki/app/_index.md` updated · App & dashboard modules 2 and 3 ☑ in `state.md`.

## Hand off

"Your data is private by construction and your clients can sign in. Next, the screen you'll
open every morning." → `dashboard-design` (module 4).
