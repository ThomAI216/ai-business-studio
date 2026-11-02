---
name: vision
description: Co-founder desk. Draw out, write down and keep her vision with her: the change she wants to make, the picture three years from now, her values, her ambition level, the strategic bets and what she will never do (docs/wiki/business/vision.md). Load after the idea brief is confirmed (Business module 1), again after the 90-day plan (module 7), at every board meeting, before any big decision, or when she says "where is this going", "what's the big picture", "my dream", "I want to grow", "I don't want to grow too much", "what's my mission", "values", "long term".
---

# Vision: the north star you hold with her

A co-founder's first job is to know where the business is going and why. The vision is not a
slogan for the website (positioning does that); it is the private compass every big decision is
checked against. Short, true, hers. Follow the Business studio's eight rules
(`.claude/studios/business.md`).

## When

- **First draft:** right after module 1 (`brainstorm`) is confirmed. Offer it: "Before we get
  concrete, can I ask you three big-picture questions? It makes every later choice easier."
- **Second pass:** after module 7 (`launch-plan`), when the numbers are real.
- **Then:** read at every board meeting; changed only when she says so, with a `log.md` line.

## 0 · Look before you ask

Read `business/idea.md` (success in one year, anti-goals, constraints, why her), `owner.md`, and
any vision-like material in `docs/wiki/raw/`. Draft what you can; ask only what is missing.

## 1 · Ground to cover (territory, one question at a time)

- **The change she wants to make:** for whom, from what to what. ("Busy parents go from
  dreading dinner to enjoying it.") This becomes the mission line.
- **Three years from now, concretely:** a normal Tuesday. Where she works, with whom, how many
  clients, how much she earns, what she no longer does, what people say about her business.
  Ask for the picture, then the numbers.
- **Ambition level, said out loud** (the most important strategic choice, and often unspoken):
  - *Solo and free*: her income and time on her terms, no team.
  - *Boutique*: a small team or partners, a known name in a niche.
  - *Scale*: a product or company that grows beyond her hours.
  Each is valid. Show what each implies for offer, price, hours and risk, recommend one from
  what she said, let her choose. It changes everything downstream.
- **Values:** 3 to 5, each as a behaviour, not a word. "We answer every message within a day",
  not "reliability". Ask for a moment she was proud of how she worked, and one she hated.
- **The strategic bets:** the 2 or 3 things she believes that others in her market don't, and
  that the business is built on. ("People will pay more for a small group than for 1:1.")
  Each bet is an assumption: link it to `business/risks.md`.
- **Never:** what she will never do, even for money (her anti-goals, sharpened).
- **How we'll know we are on track:** the north-star number (from `business/goals.md` or proposed now).

## 2 · Play it back as a one-page vision

Write `docs/wiki/business/vision.md` (`status: draft`):

```markdown
---
title: Vision
status: draft
updated: YYYY-MM-DD
sources: [conversation YYYY-MM-DD, business/idea.md]
---
# Vision
**Mission (the change we make):** <one sentence, her words>
**In three years:** <the Tuesday picture, 4 to 6 lines, then 3 numbers: clients, income, hours/week>
**Ambition level:** <solo and free / boutique / scale> because <her reason>
## Values (how we behave)
- <behaviour> · <behaviour> · <behaviour>
## Our bets (what we believe that others don't)
- <bet> → tested by <risk/experiment in risks.md or plan.md>
## Never
- <what she will not do>
## On track when
<north-star number and its 12-month target, from goals.md>
## Open questions
```

Read back the mission line and the three-year picture: "Is this where you want to go?" Her yes
→ `status: confirmed`. Visual: offer a one-page "vision board" (Artifact or `docs/boards/`).

## 3 · Using it (this is the point)

- **Big decisions:** say in one line how each option fits the vision ("Option B grows faster
  but breaks your 'no evenings' rule").
- **Ideas:** a co-founder idea must serve the vision, or say plainly that it would change it.
- **Drift:** if her requests stop matching the ambition level she chose, ask whether the vision
  changed. Changing it is fine; drifting without noticing is not.

## Specialists

- `strategist`: "From idea.md and vision.md, describe what each ambition level means for offer,
  price, hours and risk; 5 lines each; recommend one with the reason."
- `critic`: "Attack the strongest bet in vision.md: how it fails, the early sign, the cheapest test."

## Done when

She has read the one-page vision and said "yes, that's where I'm going". Then `confirmed`,
`state.md` (Co-founder: vision ☑), one `log.md` line, commit and push. Next: back to the
Business studio module in progress.
