---
name: webapp-dashboard
description: App & dashboard studio: the logged-in part: a client/member area, booking or forms that save data, and her own dashboard to manage clients, content and numbers. Load when the app section of `business/product-spec.md` is signed off, or she asks for logins, a members area, a client portal, a CRM, a dashboard, or "where do I see my sign-ups". Single schema or form changes later follow SOP 02 alone.
---

# Web app and dashboard: her data, safely

Lives in the same `web/` Next.js app as the site, on Supabase (database + logins). T3:
run `kickoff` → `docs/plans/YYYY-MM-DD-app.md`. Build order per step:
**database** (tables + security) → **builder** (screens) → **verifier** → **reviewer** → she
tries it on the preview link.

## 1 · Interview: what must it do? (max 3 questions per message)

Fill from the wiki first (`business/offer.md`, `business/funnel.md`), then ask:
- Who logs in? (Only her? Her clients? A team member?) What may each one see and do?
- What does she want to manage herself? (Clients, bookings, sign-ups, orders, content, notes.)
- What numbers does she want to see each week? (New leads, standard offers taken, revenue…)
- What should happen automatically, and what must always wait for her OK?

Write the answers in `docs/wiki/app/_index.md`: roles, screens, numbers, automations.

## 2 · The data model, in plain words, approved by her

Before any table exists, show her a short list like:
> **Clients**: name, email, phone, where they came from, notes, date added.
> **Bookings**: which client, date, which offer, status (requested / confirmed / done).
> Only you can see clients and bookings. A client sees only their own bookings.

Her yes → **database** turns it into tables via `.claude/sops/02-data-change.md`. Record the
model (tables, who sees what) in `docs/wiki/app/_index.md`. Never collect data she does not
need; never store health, financial or ID documents without a professional's advice on
the law for her country.

## 3 · Supabase setup (step by step with her)

- She connects the **Supabase** connector (claude.ai → Settings → Connectors) and creates
  a project (region close to her customers). Free tier to start.
- Keys go into **Vercel's environment variables** (and the cloud environment if needed),
  never into a file or the chat. Names are listed in `.env.example`.
- Logins: Supabase Auth with email magic link or password; Google login only if she wants it.

## 4 · Rules that are never relaxed

These come from production systems where each one was paid for:

- **Security in the database.** Row Level Security is ON for every table, with a policy
  per role (e.g. `owner_id = auth.uid()`). A hidden button is not a lock.
- **Owner gate fails closed.** Her dashboard is reachable only by emails in the
  `OWNER_EMAILS` environment variable. Missing or empty variable → nobody gets in (never
  everybody). Checked server-side in the dashboard layout AND enforced by RLS.
- **The service-role key** (bypasses security) is used only in server code, only where
  unavoidable, always filtered by owner, with a one-line comment saying why.
- **Errors are values.** Every Supabase call destructures and checks `error`. Writes ask
  for `.select('id')` and treat zero rows as failure (a write that matched nothing reports
  no error).
- **Validate every input with Zod**, in every form handler, server action and API route,
  which also checks who is calling.
- **Migrations are files** in `web/supabase/migrations/` with a timestamp name, applied
  through the Supabase connector, and the TypeScript types regenerated after. Never edit
  generated types by hand.
- **`'use server'` files export async functions only**; helpers live beside them (a sync
  export there fails the build late).

## 5 · AI features

- All AI calls go through **one module**, `web/lib/ai.ts` (one place for the model,
  the key name, costs and logging). The key lives in environment variables.
- **AI proposes, she decides.** AI output lands as a draft, a suggestion or a proposal on
  her dashboard. Nothing is sent to a client, published, or changed in bulk without her
  click. Nothing external (email, message, post) is sent without her confirmation.
- Tell visitors when they are talking to or reading AI output.

## 6 · Emails and external services

Transactional email (booking confirmations, "new sign-up" alerts to her) through one
provider (e.g. Resend; `RESEND_API_KEY`). Every automatic email is shown to her as a
sample before it is switched on. Payments: use the provider's hosted checkout (e.g.
Stripe Checkout); never handle card data.

## 7 · Her dashboard: start small

First version: one overview (the weekly numbers she named), a list per table with search,
a detail panel, and an inbox of things waiting for her decision. Add views only when she
asks twice for the same information.

## Done for each step

Verifier green · reviewer has no blockers · RLS checked by **database** (try to read as the
wrong user, expect nothing) · she used it on the preview link · `docs/wiki/app/_index.md`
updated · published via `.claude/sops/03-publish.md` on her "publish".
