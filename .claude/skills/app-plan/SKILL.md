---
name: app-plan
description: App & dashboard studio module 1. Turn the app section of the product spec into a plan she understands and approves - who logs in, what each person does, the screens, the data as "things and facts" and who sees what, the tools she already uses, and what is NOT in the first version - shown as a clickable mockup before anything is built (docs/wiki/app/plan.md). Load when the App & dashboard studio starts, or when she says "I want an app", "I want clients to log in", "a client area", "a members area", "a portal", "a dashboard", "can people book / pay / upload on my site", "I want to see my sign-ups".
---

# App plan: the app in plain words, before any code

Follow the studio's rules (`.claude/studios/app-dashboard.md`) and the Business studio's
eight rules. What follows is how they play out here.

## 0 · Look before you ask

Read `business/product-spec.md` (the app section, the user stories, the score), then
`business/offer.md`, `business/funnel.md`, `business/goals.md`, `app/plan.md` if half done,
and `docs/wiki/raw/` for screenshots of tools she uses today. Never ask what the spec already
answers: quote it back. If the spec says "not needed yet", agree in one line, suggest the
lightest alternative (a booking link, a form that emails her, a shared spreadsheet), and stop.

## 1 · First message

Echo the app back in her words, about 150 words: who will use it, what each person can do,
what she manages, and why it matters for the business (which goal in `goals.md` it serves).
Add one thing you noticed (a tool she already pays for that does part of it, a simpler first
version, a privacy point). End with one question on the biggest open thing.

## 2 · Ground to cover (territory, never a list read out)

- **People and roles:** only her? Her clients? A team member or assistant? For each one: what
  they may see, what they may change, what they must never see.
- **Journeys:** for each person, the 2 or 3 things they come to do, step by step ("a new client
  books a free call: finds the button, picks a slot, gets a confirmation, gets a reminder").
- **Her side:** what she does every day, every week; what she does today by hand that the app
  should take off her plate; what must always wait for her click.
- **Data as things and facts:** the "things" (clients, bookings, sessions, documents,
  payments, messages) and the facts kept about each (name, email, date, status). For each
  thing: who sees it, who changes it, how long she keeps it.
- **Tools she already uses:** calendar, email, payment, newsletter, forms, spreadsheets.
  Keep what works; connect rather than rebuild.
- **Sensitive data:** health, money, identity, children. Collect only if a user story needs
  it, and only after she checks the law for her country with a professional.
- **Not in v1:** the ideas that wait, written down so they are not lost and not built.

## 3 · Play it back, then show it

Play back each part in 150 to 250 words as it becomes clear. Then **show before build**:
ask `ux-designer` for a clickable mockup of the main journeys, phone first, in her brand
tokens (`brand/visual.md`; neutral if not set). Publish it with the Artifact tool if this
session has it, otherwise write `docs/design/mockups/app-<journey>.html` (self-contained, no
external scripts) and send a screenshot at 390px. Let her click through and react. Change
the mockup, not the code, until she says "yes, that's it".

## 4 · The data list she approves

Before any table exists, show the data in her words:

> **Clients**: name, email, phone, where they came from, notes, date added. Only you see them.
> **Bookings**: which client, date and time, which offer, status (requested, confirmed, done,
> cancelled). You see all of them; a client sees only their own.
> **Documents**: a file you share with one client. Only you and that client see it.

Her yes is the brief for `database` (module 2, `webapp-dashboard` §data). Every thing becomes
a table with an `owner_id`; "a client sees only their own" becomes a `client_id` policy.

## 5 · Write the plan

Write `docs/wiki/app/plan.md`, `status: draft`:

```markdown
---
title: App plan
status: draft
updated: YYYY-MM-DD
sources: [business/product-spec.md, conversation YYYY-MM-DD]
---
# App plan
**In one sentence:** <what the app lets whom do, for which goal>
## People and roles
| Who | Can see | Can change | Never sees |
## Journeys
### <person>: <what they come to do>
1. ... (step by step, in her words)
## Screens
| Screen | For whom | What it shows | Its one main action | User story |
## Data: things and facts
| Thing | Facts kept | Who sees | Who changes | Kept for |
## Tools she already uses
| Tool | Keep, connect or replace | Why |
## Not in version 1
- <idea> · why later
## Mockup
<link to the artifact or docs/design/mockups/app-*.html>
## Open questions
```

Read back the one-sentence plan and the data list: "Is this it?" Her yes → `status: confirmed`.

## Specialists

- `ux-designer`: "From `app/plan.md`, mock up <journey> as a clickable HTML page, phone first,
  her brand tokens. Return the file and a 390px screenshot."
- `researcher`: "Does <tool she uses> offer <feature> or an API/embed we can connect? Cite docs."
- `strategist`: only when two app shapes compete: "From the spec and plan, 2 options with
  trade-offs (cost, time, her effort) and a recommendation."

## Done when

She clicked through the mockup and said yes, the data list is approved, `app/plan.md` is
`confirmed`, App & dashboard module 1 is ☑ in `state.md`, one `log.md` line, commit and push.

## Hand off

"Your app is clear on paper, and you have seen it. Next I set up the data safely, so only the
right people ever see each thing. Shall we?" → `webapp-dashboard` (module 2).

## Red flags

| Thought | Reality |
|---|---|
| "I'll start with the tables, it's faster" | A table built before the mockup is rebuilt after it. |
| "She'll want this feature too" | Not in the spec, not in v1. Write it under "Not in version 1". |
| "Let's rebuild her booking tool" | If it works and she likes it, connect it. |
| "Clients can just see everything, it's simpler" | Every thing has a "who sees" answer before it exists. |
