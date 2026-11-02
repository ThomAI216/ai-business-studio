---
name: dashboard-design
description: App & dashboard studio module 4. Design her back office around one daily screen - what needs her today, her few key numbers from business/goals.md, and short lists of leads, clients, bookings and tasks - phone first, with honest charts and helpful empty states (docs/wiki/app/dashboard.md). Load when logins work and she needs her own view, or when she says "my dashboard", "where do I see my sign-ups / clients / bookings", "I want to see my numbers", "how is my business doing", "I lose track of my leads", "admin page", "back office".
---

# Her dashboard: the one screen she opens every morning

Follow the studio's rules (`.claude/studios/app-dashboard.md`). The test of a good dashboard:
she opens it on her phone and, in ten seconds, knows what needs her today and whether the
business is on track. Everything else is a click away or does not exist yet.

## 0 · Look before you ask

Read `business/goals.md` (north star and leading indicators), `business/plan.md` (the
experiments she is running), `business/funnel.md` (the steps a client goes through),
`app/plan.md` (her journeys and screens) and `app/_index.md` (the tables that exist). The
dashboard only shows data the app really holds; a number nobody records is a question for
her, not a chart.

## 1 · The questions (one per message, with your suggestion)

- "When you open this in the morning, what is the first thing you want to know?"
- "Which numbers would tell you the business is on track this month?" Suggest the north star
  and 2 or 3 leading indicators from `goals.md`.
- "What do you do today by hand that you'd like this screen to remind you of?" (follow up a
  lead, confirm a booking, send a document, reply to a message)
- "How often will you look: daily, weekly?" (sets what is on the first screen)

## 2 · The layout (phone first, top to bottom)

1. **Today**: the things waiting for her, as an inbox with one action each ("Reply to Anna",
   "Confirm Tuesday 10:00", "Review AI draft"). Empty is good news: say so ("Nothing waits
   for you. Next booking: Thursday 14:00").
2. **The numbers**: 3 to 4 tiles at most. Each tile: the name in her words, this period's value,
   the comparison that matters (last month, or the goal), and a one-line meaning on tap.
3. **Lists**: leads, clients, bookings, tasks, each with search, status and the next action.
   A row opens a detail panel; nothing needs a separate page in v1.
4. **The way back**: one tap to the public site, one to the full lists.

Add a screen only when she asks twice for the same information.

## 3 · Numbers done honestly

`data-analyst` defines every number before it is built: its name, the formula, the source
table, the period, and what is NOT counted. Write it in `app/dashboard.md`.
- **One question per chart.** If a chart answers two questions, make two, or a sentence.
- **A sentence beats a chart** when there is one number ("12 new leads this month, 3 more than
  last month").
- **Honest axes.** Bars start at zero. Time runs left to right at even steps. No 3D, no pie for
  more than three parts.
- **Small numbers are fragile.** With fewer than ~20 events, show the count, not a percentage
  ("2 of 3 calls became clients", not "67% conversion").
- **Colour carries meaning, not decoration.** One accent colour for "her" data, grey for
  comparison, the warning colour only for things that need action. The palette must read in
  light and dark mode and pass contrast (4.5:1 for text).
- **Never invent data.** Missing data shows as missing ("no bookings recorded before May"),
  never as zero.

## 4 · Empty states and first use

Every list and tile has an empty state that says what will appear and how to get it ("Your
leads appear here when someone fills in the contact form on your site. Share the link: ...").
On day one the dashboard is mostly empty: it must still feel useful and calm.

## 5 · Mock up, then build

`ux-designer` mocks the daily screen as a clickable page at 390px in her brand; she reacts;
then `builder` builds it from the approved mockup, `designer` checks tokens and contrast,
`qa-tester` uses it on a phone. Owner gate: only emails in `OWNER_EMAILS` reach it, checked on
the server and enforced by row level security (`webapp-dashboard` §logins).

## 6 · Write the page

`docs/wiki/app/dashboard.md`, `status: draft` until she has used it for a week:

```markdown
---
title: Her dashboard
status: draft
updated: YYYY-MM-DD
sources: [business/goals.md, app/plan.md]
---
# Her dashboard
## Today (the inbox)
| Item | Comes from | Her one action |
## Numbers
| Name (her words) | Formula | Source table | Period | Compared with | Not counted |
## Lists
| List | Columns | Filters | Next action per row |
## Empty states
| Where | Text |
## Not yet
- <screen or number> · why later
```

## Specialists

- `data-analyst`: "From `business/goals.md` and `app/_index.md`, define 3 to 4 dashboard numbers:
  name, formula, source table, period, comparison. Flag any we cannot compute yet."
- `ux-designer`: "Mock up the daily screen from `app/dashboard.md` at 390px in her tokens; return
  file + screenshot."
- `builder`, `designer`, `qa-tester`: as in the studio brief.

## Done when

She opened it on her phone and knew what needed her today in ten seconds, every number has a
written definition, App & dashboard module 4 is ☑ in `state.md`, one `log.md` line, commit and push.

## Hand off

"Your business now has a cockpit. These numbers feed your weekly review and your monthly board
meeting." Then propose the next feature from the spec → `app-recipes` (module 5).
