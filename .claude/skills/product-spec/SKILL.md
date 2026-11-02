---
name: product-spec
description: Business studio module 8, the bridge to building. Turns the business pages into a scored, signed-off spec of what the website must do (pages, each with its job and call-to-action) and whether an app or dashboard is needed yet (who logs in, what they do, what she manages). Load after launch-plan, before any website or app work starts, or when she says "what should my website do", "what pages do I need", "I want an app", "I want clients to log in / book / pay", "let's build the site".
---

# Product spec: what we build, and why

Follow the studio rules in `.claude/studios/business.md`. This skill adds the quality score and
the website / app split. It is a requirements interview, but most answers already exist in the
wiki: **fill everything you can first, then ask only what is missing.**

**Inputs:** `business/idea.md`, `audience.md`, `offer.md`, `funnel.md`, `positioning.md`,
`plan.md`, `goals.md`, `owner.md`; `docs/wiki/raw/` (old site, examples she likes).
**Output:** `docs/wiki/business/product-spec.md`.

## 1 · Draft from the wiki (before saying anything)

Write a first version of every section of the template below from the existing pages. Mark
each line `from: <page>` or `my proposal`. Gaps stay as `?`.

## 2 · Score it /100 and show the score

| Area | Points | Full marks when |
|---|---|---|
| **Business goals & success** | 30 | the site's job in one sentence (10), the numbers that show it works, e.g. sign-ups or bookings per month (10), how it serves the 90-day plan and the standard offer (10) |
| **What people must be able to do** | 25 | 3–7 stories in plain words, "a visitor can … so that …", each with a "done when" (10); the path from first visit to the free offer to paying (10); what happens when something goes wrong, e.g. a fully booked calendar or a failed payment (5) |
| **Experience** | 20 | who visits, from where, on which device (8); the journey, page by page (7); look and feel: 2–3 sites she likes and why, what she dislikes (5) |
| **Constraints** | 15 | budget and monthly costs she accepts; languages; legal and consent (imprint, privacy, cookies, anything regulated in her field) (5); tools she already uses: calendar, payments, email, newsletter, social (5); content she has and what must be written or photographed (5) |
| **Scope & priorities** | 10 | the launch version (MVP) clearly separated from "later" (5); the order things get built (3); the top 3 must-haves (2) |

Show it to her simply:

> Spec readiness: **72/100**. Goals 26/30 · What people can do 15/25 · Experience 14/20 ·
> Constraints 9/15 · Scope 8/10. The biggest gap is what visitors can do, so one question about that.

## 3 · Ask only what raises the lowest area

One question per message, specific to her business, with your suggested answer. Re-score after
each answer and say what improved ("That took 'what people can do' from 15 to 21"). Stop at
**≥ 90**. If she wants to stop earlier, note the open gaps in the spec and in `state.md`.

Territory, by area:
- **Goals:** What should a visitor do before leaving? How many of those a month would feel like success?
- **Stories:** Walk me through your ideal client finding you: where were they, what did they click, what did they do next? What should happen after someone books?
- **Experience:** Send me 2–3 sites you love, even from another field. What do you notice first? Will most people arrive on their phone?
- **Constraints:** Which tools do you already pay for? Which languages? Is anything in your field regulated (claims, prices, data)?
- **Scope:** If the site could only do three things on launch day, which three?

## 4 · Split: website, and app or dashboard

**Website:** the public part. One row per page: its **job** (the single thing it must achieve),
its **call-to-action** (usually the standard offer from `funnel.md`), and the content it needs.
Keep the launch version small: often home, offer, about, contact or booking, legal.

**App / dashboard:** only if a real story needs a login or saved data: clients who log in
(a members area, bookings, resources), forms that save data, her own back office (clients,
sign-ups, numbers). For each: who logs in, what they do, what she manages. **"Not needed yet"
is a valid and often correct answer**; say so, and name the signal that would change it (for
example "ten paying clients asking for a portal"). Existing tools (a booking tool, a
newsletter tool) often beat building; propose them first.

## 5 · Approaches, then sign-off

Before writing the final version, lay out 2–3 ways to deliver it (for example: a simple site
plus her existing booking tool; a site with built-in booking; site plus a members app), each
with cost, time and trade-off, your recommendation and why. She picks. Then read back a
five-line summary, ask *"Is this what we're building?"*, and mark the spec confirmed only on her yes.

## The visual

A **site map**: one card per page with its job and button, arrows for the visitor's journey to
the standard offer, and a separate box for the app (or "not yet"). Artifact tool if available,
otherwise `docs/boards/product-spec.html` plus a screenshot. Show it before the sign-off.

## Specialists

- `strategist`: "From the business pages, draft the user stories and the website page list,
  each page with its job and call-to-action. Mark what is inferred."
- `researcher`: "Compare 2–3 existing tools for [booking / payments / members area] in [her
  country]: price, language support, what they do well. Cite sources."
- `designer` (Website & design studio), only to look at sites she likes and describe what
  makes them work.

## Wiki template: `docs/wiki/business/product-spec.md`

```markdown
---
title: Product spec
status: draft
updated: YYYY-MM-DD
sources: []
score: NN/100
---

# Product spec

## In one sentence
The website exists so that <who> can <do what>, which leads to <the standard offer>.

## Success
- <metric> · <target per month> · measured by <how>

## What people can do (stories)
1. A visitor can ... so that ... · done when ...

## Journey
first visit → ... → free offer → ... → paying client

## Website (launch version)
| Page | Its job | Call-to-action | Content needed | Status |
|---|---|---|---|---|

## App / dashboard
- **Needed now?** yes / not yet (signal that would change it: ...)
- Who logs in · what they do · what she manages

## Look and feel
- Sites she likes, and why: ...
- Dislikes: ...

## Constraints
- Budget · monthly costs: ...
- Languages: ...
- Legal and consent: ...
- Tools she already uses: ...
- Content she has / must create: ...

## Scope
- **Launch (MVP):** ...
- **Later:** ...
- **Build order:** ...

## Approach chosen
<the option she picked, and why>
```

## Done when

Score ≥ 90 (or her explicit choice to proceed with listed gaps), the website page list has a
job and a call-to-action per page, the app question has an answer (including "not yet"), the
approach is chosen, and she says "yes, this is what we're building". Then `status: confirmed`,
tick module 8 in `state.md`, one `log.md` line. Seed `docs/wiki/website/_index.md` with the
page list as a sitemap table (page · job · call-to-action · status `planned`), and the app
section of `docs/wiki/app/_index.md` (or "not needed yet"), so the next studio starts from them.

## Hands off to

- **Website & design studio** (`website` skill): the page list, journey, look and feel, constraints.
- **App & dashboard studio** (`webapp-dashboard` skill): the app section, if needed now.
- *"Your business plan is complete and the website is specified. Next, the fun part: how it
  will look. Shall we start with your brand?"*
