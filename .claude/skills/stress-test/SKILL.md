---
name: stress-test
description: Business studio module 6. Find what could kill the business before it happens - a premortem ("it's a year from now and it failed: why?"), an assumption map, and a devil's-advocate pass on her favourite assumption - then turn every risk into an action. Load after positioning, before launch-plan, before any big commitment (spending money, quitting a job, signing a lease, a launch), or when she says "what could go wrong", "am I missing something", "poke holes in this", "is this a good idea", "stress test this", "be honest with me".
---

# Stress test: break it on paper first

Follow the studio rules in `.claude/studios/business.md`. This skill adds the premortem, the
assumption map and the devil's-advocate pass.

The premortem is Gary Klein's method (made famous by Daniel Kahneman): instead of asking
"what could go wrong?", which gets polite and vague answers, you state that the plan **has
already failed** and ask why. Imagining the failure as a fact makes people, and AI, specific
and honest. It also counters your own pull towards agreeing with her.

**Tone:** kind, honest, never discouraging. You are on her side; the market is the test. Say
plainly what is weak. Every risk you name ends with something she can do.

**Inputs:** every `docs/wiki/business/*.md` page that exists (idea, audience, model,
competitors, offer, funnel, positioning). **Output:** `docs/wiki/business/risks.md`.

## 1 · Context threshold (from the wiki, not from her)

You need three things, and you should already have them:
1. **What it is**: the business in one sentence (`idea.md`, `positioning.md`).
2. **Who it is for**: the primary client (`audience.md`).
3. **What success looks like**: revenue, clients or another number, with a time frame
   (`goals.md` if it exists, otherwise `idea.md`).

If one is missing, ask only that one question. If several modules are still blank, say so and
suggest finishing them first. A premortem on a vague plan produces generic risks.

## 2 · Set the frame (say it to her)

> "Let's try something useful. Imagine it's [month, next year]. [Business] didn't work: it's
> closed, or it never took off. We're looking back to understand why. This isn't pessimism;
> it's the cheapest way to find the weak spots while they are still easy to fix."

## 3 · Raw failure reasons

Write every genuine reason it died, each in one or two sentences, **grounded in her pages**
(her price, her audience, her channel, her hours), never generic startup advice. Cover the
usual suspects without forcing them: nobody wants it enough (desirability), it doesn't pay
(viability), she can't deliver it at that scale or in that time (feasibility), people never
hear about it (reach), something outside her control (law, platform, partner, season), and
her own capacity (time, money, energy). Typically 4–9 reasons; whatever is real.

## 4 · Deep-dives by the `critic`, in parallel

One `critic` agent per failure reason, all launched in one message, each with a disjoint brief:

> "Premortem deep-dive. Read: [list of business pages]. Frame: it is [date]; the business has
> failed. Your one reason: [reason]. Return: how it died (a short, specific story), the
> assumption that made it possible, the earliest warning sign she could see, likelihood and
> impact (high/medium/low, with why), and the cheapest test or prevention she could do this
> month. Under 300 words. Cite any fact you look up."

Read every result yourself. Merge duplicates. A `null` result means the agent failed: re-run
that one, never report it as "no risk".

## 5 · Synthesis (what she actually reads)

- **Most likely failure**: and why.
- **Most dangerous failure**: the one worth insuring against even if less likely.
- **The hidden assumption**: the one thing so obvious to her she forgot it was an assumption.
- **The risk table**: every reason with likelihood, impact, warning sign and action.
- **Changes to the plan**: concrete ("test the price at X with five people before printing
  it on the website"), each tied to a risk.

## 6 · Assumption map

List the assumptions the plan rests on (10–20), sorted into **desirability** (they want it),
**viability** (it pays) and **feasibility** (she can deliver). Place each on two axes:
**importance** (if wrong, does it break the business?) and **evidence** (what do we actually
know: her client conversations, sales, data, or a guess). Important + little evidence = the
**riskiest assumptions**. Pick the top 3; they become the experiments in `launch-plan`.

## 7 · Devil's advocate on her favourite assumption

Ask her: *"Which part of this are you most sure about?"* Then argue against it, kindly and
seriously, for one short paragraph, with the strongest real counter-argument you can find.
Ask what would convince her she is right. That answer becomes a test, not a debate.

## How to deliver it

Do not drop all of this at once. Send the frame, then the synthesis (most likely, most
dangerous, hidden assumption) in one short message with the visual. Walk the risk table one
risk at a time if she wants. End with the three riskiest assumptions and the next step.

## The visual

A **risk board**: synthesis at the top, then one card per failure (likelihood and impact as
colour, the warning sign, the action), then the assumption map as a 2×2 grid. Artifact tool if
available, otherwise `docs/boards/risks.html` plus a screenshot.

## Question bank (territory)

- What would make you stop, even if it is "working"? (anti-goals)
- How many hours a week can you really give this, in the busiest month of your year?
- How long can you go before it must pay you? What happens then?
- Who could copy this fastest, and what would stop them?
- What has to stay true outside your control (a platform, a partner, a law, a season)?
- Which client conversation would change your mind?

## Wiki template: `docs/wiki/business/risks.md`

```markdown
---
title: Risks and assumptions
status: draft
updated: YYYY-MM-DD
sources: []
---

# Risks and assumptions

## The premortem in three lines
- **Most likely failure:** ...
- **Most dangerous failure:** ...
- **Hidden assumption:** ...

## Risk table
| Risk | Likelihood | Impact | Early warning sign | Action (test or prevention) | Owner · date |
|---|---|---|---|---|---|

## Assumption map
| Assumption | Type (D/V/F) | Importance | Evidence today | Riskiest? |
|---|---|---|---|---|

**Top 3 riskiest:** 1. ... 2. ... 3. ... (→ `plan.md` experiments)

## Devil's advocate
- **Her strongest belief:** ...
- **The best case against it:** ...
- **What would prove her right:** ...

## Changes to the plan
- ...
```

## Done when

Every risk in the table has an action or an explicit decision to accept it, the top 3 riskiest
assumptions are named, and she has read the synthesis. Then `status: confirmed`, tick module 6
in `state.md`, one `log.md` line. If a risk needs a professional (law, tax, insurance,
regulation), add it to "Waiting on her" in `state.md`.

## Hands off to

**`launch-plan`**: the three riskiest assumptions become the first experiments. *"We know the
three things most worth testing. Next, let's turn them into a 90-day plan that fits your week.
Shall we?"*
