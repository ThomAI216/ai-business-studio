---
name: app-recipes
description: App & dashboard studio module 5. Proven feature patterns for a small business app - booking page with her availability, contact form to her inbox, simple client list (CRM), client area, tasks board, newsletter signup, payments, an AI helper over her own data, scheduled jobs, file uploads - each with its user story, tables, screens and the traps already paid for elsewhere. Load when the product spec names one of these features, or she says "people should book a call", "contact form", "keep track of my clients", "clients log in to see their documents", "a to-do board", "newsletter", "take payments", "can AI help me reply", "send reminders", "clients upload files".
---

# App recipes: features that have worked before

Follow the studio's rules (`.claude/studios/app-dashboard.md`). One recipe at a time, each
started with `kickoff` (T2), each table through `.claude/sops/02-data-change.md` and
`tools/db-verify.mjs`, each screen from an approved mockup. Every recipe starts from a user
story in `business/product-spec.md`; no story, no recipe.

**Every table, every recipe:** `owner_id uuid not null default auth.uid() references
auth.users(id) on delete cascade`, row level security on, a policy
`owner_id = (select auth.uid())` for her, a `client_id = (select auth.uid())` read policy where a
client must see their own rows, a `service_role` policy, `revoke all ... from anon`, and
composite foreign keys `(parent_id, owner_id)` so a row can never point at another owner's row.
Server code using the service role is filtered by `owner_id`, with a one-line comment why.

**Before building any recipe:** does a tool she already uses do it well (a booking service, a
newsletter tool, a payment link)? Then connect or embed it, and say so. Build only what is
better built.

## 1 · Booking page with her availability

- **Story:** "As a visitor I can book a free call in a free slot so that I get a time without emails back and forth."
- **Tables:** `meeting_types` (name, length, buffer, questions, public slug), `availability`
  (weekday, start, end, timezone), `bookings` (type, start, end, guest name and email,
  answers, status, a random `manage_token`).
- **Screens:** public page (pick type, pick slot, answer questions, confirm), confirmation
  with a calendar file (.ics), a "manage your booking" page reached by the token link, her
  list of bookings.
- **Traps:** store times in UTC and show them in the visitor's timezone (and hers); **re-check
  the slot at the moment of booking**, a slot shown free a minute ago may be gone; if her
  calendar cannot be read, show no slots (fail closed: an unreadable calendar is not a free
  one); a hidden honeypot field answered by a bot gets a bland "ok" and nothing happens; rate
  limit per email and per IP; errors to visitors are plain fixed sentences, never provider
  details; the manage link is long and random, never the booking id.

## 2 · Contact or lead form to her inbox

- **Story:** "As a visitor I can ask a question so that she answers me personally."
- **Tables:** `leads` (name, email, message, source page, consent, status: new, replied, client, closed).
- **Screens:** the form on the site, the lead in her dashboard inbox, an email alert to her.
- **Traps:** honeypot and rate limit; Zod on every field; consent checkbox where her law needs
  it, with the date stored; the alert email goes to her, not an auto-reply to the visitor
  until she has approved the text; the form shows success only after the row is saved
  (`.select('id')`, zero rows is a failure).

## 3 · Simple client list (CRM)

- **Story:** "As the owner I can see each client, our history and the next step so that nobody falls through the cracks."
- **Tables:** `clients` (name, email, phone, source, status, next step, next date),
  `client_notes` (client, body, date), linking to `leads` and `bookings` by `client_id`.
- **Screens:** a searchable list with status and next step, a detail panel with the timeline
  (notes, bookings, payments), quick add.
- **Traps:** one person, one row: match new leads to existing clients by email before
  creating; "next step" with a date is what makes a CRM useful, not more fields; never import
  contacts from her email or phone without her choosing which.

## 4 · Client area

- **Story:** "As a client I can sign in and see my documents, my progress and my messages so that everything is in one place."
- **Tables:** `client_documents` (client, title, storage path, shared date), `client_progress`
  (client, step, status, date), `messages` (client, from, body, read).
- **Screens:** sign-in by email link, the client's home (next session, documents, progress,
  messages), her side to share a document or post a message.
- **Traps:** every client policy is `client_id = (select auth.uid())`; test with two test
  clients that each sees only their own (db-verify plus a manual check on the preview);
  documents live in a private storage bucket, served by short-lived signed links; she
  decides what is shared, nothing appears in a client area automatically.

## 5 · Tasks or projects board

- **Story:** "As the owner I can see what I must do this week, by project, so that I stop holding it in my head."
- **Tables:** `projects` (name, status), `tasks` (project, title, status, due date, client optional).
- **Screens:** list and board views (to do, doing, done), today's tasks on the dashboard.
- **Traps:** start with list + board only; due dates in her timezone; tasks created by AI or by
  a rule land in an "inbox" status she sorts, never straight into "to do".

## 6 · Newsletter signup

- **Story:** "As a visitor I can get her letter so that I hear from her when she publishes."
- **Default:** use a newsletter tool (its embed or API) rather than building sending yourself;
  store only `subscribers` (email, consent date, source) if she wants them in her dashboard.
- **Traps:** double opt-in where the law asks for it; an unsubscribe link in every send; never
  add people who did not sign up.

## 7 · Payments

- **Story:** "As a client I can pay for <offer> online so that I start without waiting for an invoice."
- **Default:** a hosted checkout or payment link from the payment provider (for example Stripe
  Checkout or Payment Links): the client pays on the provider's page, the app never sees
  card data. Store only `payments` (client, offer, amount, currency, provider id, status).
- **Traps:** trust only **verified webhooks** (signature checked with the secret from the
  environment) to mark a payment as paid, never the redirect back to the site; handle the
  same webhook arriving twice (idempotent by provider id); prices come from the offer page,
  not from the browser. **Not proven in the projects this kit was distilled from:** build it
  behind a test-mode switch, run the provider's test cards, and have `reviewer` check it before
  any real money.

## 8 · AI helper over her own data

- **Story:** "As the owner I can get a suggested reply or summary so that I answer faster."
- **Tables:** `ai_calls` (feature, model, tokens, cost, created) as a cost ledger;
  `suggestions` (target, body, status: proposed, accepted, dismissed).
- **Rules:** every AI call goes through **one module**, `web/lib/ai.ts` (model, key name, cost
  logging, a monthly budget cap); the key lives in environment variables; output lands as a
  proposal she accepts, edits or dismisses; nothing is sent or written over her data without
  her click; only her own data goes to the model, with clients' sensitive details left out
  unless she has checked that her provider and her law allow it.

## 9 · Scheduled jobs (reminders, digests)

- **Story:** "As a client I get a reminder the day before my session so that I don't forget."
- **Pattern:** a route under `web/app/api/cron/` called on a schedule (Vercel Cron), protected
  by a secret header (`CRON_SECRET`), doing a small bounded amount of work per run.
- **Traps:** one owner's failure is logged and skipped, never fatal for the others; every job
  safe to run twice (mark what was sent); reminder texts approved by her before they switch on;
  times in each person's timezone.

## 10 · File uploads

- **Story:** "As a client I can upload a document so that she has it before our session."
- **Pattern:** a private storage bucket; paths start with the owner's id
  (`<owner_id>/<client_id>/<file>`); storage policies pinned to that folder (db-verify checks
  them); size and type limits; downloads by short-lived signed link.
- **Traps:** never a public bucket for client files; scan the type, not only the extension;
  tell clients what not to upload if her field is regulated.

## For every recipe

1. `kickoff` (T2): objective, done-when in her words, scope fence.
2. `ux-designer` mockup → her yes.
3. `database`: migration per SOP 02, `node tools/db-verify.mjs` passes, then applied.
4. `builder`: screens; Zod at every boundary; errors are values; `'use server'` exports async only.
5. `qa-tester` on a phone with two test users; `verifier`; `reviewer`.
6. She uses it for real for a week. Then `docs/wiki/app/_index.md` and `log.md`, and the next recipe.

## Done when

The recipe's user story works on the live site for a real user, db-verify passes, the wiki
says which tables hold which personal data, and she has used it for a week.
