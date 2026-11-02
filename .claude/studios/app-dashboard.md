# App & dashboard studio

**Purpose:** the logged-in part of her business: a client area, bookings or forms that save
data, and her own back office, the one screen she opens every morning. **Owns:**
`docs/wiki/app/*`. **Needs first:** the app section of `business/product-spec.md` signed off.
"Not needed yet" is a valid answer there: say so kindly and do not build. Many businesses
run for a year on a website, a booking link and a spreadsheet.
**Specialists:** `ux-designer` (journeys, screens, clickable mockups), `database` (tables,
security), `builder` (screens, actions), `designer` (look, tokens), `data-analyst` (her
numbers, charts), `qa-tester` (tries it like a real user), `verifier`, `reviewer`.

## The stance

Software is a cost, not a trophy. Build the smallest thing that saves her time or wins her
clients, prove it with real use, then grow it. Every screen exists because a user story in
the spec needs it. Her clients' data is held in trust: it stays private by construction, not
by good intentions.

## The playbook: six modules, in this order by default

| # | Module | Skill / procedure | Produces (wiki) | Done when |
|---|---|---|---|---|
| 1 | The app in plain words | `app-plan` | `app/plan.md`, a clickable mockup | she clicked through the mockup and said "yes, that's it"; the data list ("things and facts") is approved |
| 2 | Data and security | `webapp-dashboard` §data · SOP 02 · `tools/db-verify.mjs` | migrations, `app/_index.md` (tables, who sees what) | db-verify passes, advisors clean, a second test user sees nothing of the first |
| 3 | Logins and the client area | `webapp-dashboard` §logins | working sign-in, client screens on the preview | she signed in as herself and as a test client on her phone |
| 4 | Her dashboard | `dashboard-design` | `app/dashboard.md`, the daily screen | she opened it on her phone and knew what needed her today in 10 seconds |
| 5 | Features | `app-recipes` | one recipe at a time, each with its user story | each feature used for real by her (or a client) for a week before the next |
| 6 | Check and go live | `qa-tester` + SOP 03 | `app/qa.md` (what was tried, what broke, what was fixed) | qa pass on phone and desktop, reviewer has no blockers, her "publish" |

**Order is a default.** If she already uses a tool that works (a booking service, a
newsletter tool, a payment link), connect to it or keep it; rebuilding a working tool is
rarely worth her money. Track progress in `docs/wiki/state.md` (App & dashboard checklist).

## Rules every module follows

The Business studio's eight rules apply (look before you ask, one question, play back,
options, show don't tell, write it down, check facts, always a next step). Plus:
1. **No feature without a user story** from `business/product-spec.md` ("As a client I can
   book a free call so that ..."). A new idea goes into the spec first, then into the build.
2. **Security lives in the database.** Row level security on every table, every row has an
   `owner_id`, `tools/db-verify.mjs` passes before any migration reaches the live database.
   A hidden button is not a lock.
3. **Nothing leaves without her OK.** No email, message, invoice or post is sent to a client
   automatically until she has seen a sample and switched it on.
4. **AI proposes, she decides.** AI output lands as a suggestion or a draft in her inbox,
   never as a fact written over her data, never as a message sent on her behalf.
5. **Phone first.** Every screen works at 390px wide; she will mostly use it on her phone.
6. **Show before build.** A clickable mockup (an Artifact, or `docs/design/mockups/app-*.html`
   with a screenshot) before any table or screen exists.
7. **Collect only what a feature needs.** Health, financial or identity data only after
   she has checked the law for her country with a professional; say so plainly.

## Delegation in this studio

- `ux-designer`: "From `app/plan.md`, mock up <journey> as a clickable HTML page, phone first, in
  her brand tokens. Return the file and a screenshot at 390px."
- `database`: "Turn the approved data list in `app/plan.md` into a migration per SOP 02. Run
  `tools/db-verify.mjs`. Return the file, the db-verify output, applied or not."
- `builder`: "Build <screen> from the mockup, reading data only through the tables in
  `app/_index.md`. Errors are values, Zod on every input. Return the preview link."
- `data-analyst`: "From `business/goals.md`, define the dashboard numbers: name, formula, source
  table, how often. Flag any number we cannot compute yet."
- `qa-tester`: "Use the preview like <her client> would, on a phone: <the user stories>. Return what
  worked, what broke, with screenshots."
Keep the conversation with her in the main thread; specialists work from the wiki.

## Hands off to

- Module 4 numbers feed the `launch-plan` weekly review and the `board-meeting` (co-founder desk).
- New feature ideas she has along the way go back to `product-spec` (Business module 8) first.
