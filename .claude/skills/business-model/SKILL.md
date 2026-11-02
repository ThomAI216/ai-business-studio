---
name: business-model
description: Business studio module 3, how her business works on one page (what she offers, to whom, through which channels, what comes in, what it costs, how she knows it works) plus the competition and a simple money check (docs/wiki/business/model.md and competitors.md). Load after the audience is clear, or when she asks "how will I make money", "can I live from this", "who are my competitors", "should I do 1:1 or groups / a membership / a product", "is this viable". Not for setting exact prices (module 4).
---

# Business model: how it works, on one page

This module turns the idea and the customer into a business that adds up. The structure
underneath is the Lean Canvas, but she never sees a form: you fill the boxes through the
conversation and show her the finished page.

Follow the studio's eight rules (`.claude/studios/business.md`). Start by reading
`business/idea.md`, `business/audience.md`, `business/goals.md` (if begun) and `docs/wiki/raw/`.
Most boxes are already half answered there: fill those first and ask only for the gaps.

## 1 · The nine boxes (hidden structure, filled one question at a time)

| Box | What you need | A question that gets it |
|---|---|---|
| Problem | top 1–3 problems (from audience.md) | usually already answered: confirm |
| Customer | primary customer, early adopters | "Who will say yes first, before anyone knows you?" |
| Unique value | why someone picks her, in one line | "What do clients say after working with you?" |
| Solution | the 3 things she actually does or delivers | "If you could only offer three things, which?" |
| Channels | how customers find and reach her | "How did your last three clients find you?" |
| Revenue | what she charges for, and how (once, monthly, package) | "What would you love people to pay you for?" |
| Costs | time, tools, rent, materials, help, marketing | "What do you spend each month to run this, roughly?" |
| Key numbers | the 2–3 numbers that tell her it works | "If you could check one number every Monday, which?" |
| Unfair advantage | what others cannot easily copy | usually from "why her" in idea.md |

A box she has not decided yet stays visibly "open", with the question written next to it.

## 2 · The competition (delegate, then let her react)

Brief the `researcher`:
> "For <idea> aimed at <primary customer> in <country/language>, find 3–6 alternatives:
> direct competitors (same offer), indirect ones (different way to solve the same problem) and
> the do-it-yourself route (apps, books, free content). For each: name, link, what they offer,
> public prices, their main promise, what clients praise and complain about (quotes from
> reviews with links). Return a table. Cite everything; mark anything unverified."

Show her the table. Then ask, one at a time: which one she admires and why; which one she
would never want to resemble; where she is clearly different. Her reactions are the most
valuable part of the page: record them verbatim.

## 3 · The money check (simple numbers, assumptions labelled)

Ask her income goal (per month, after costs) and her available hours per week, then build a
small table with her:

| | Value | Where it comes from |
|---|---|---|
| Income goal per month (after costs) | | her answer |
| Monthly costs | | box "Costs" |
| Average price per client | | assumption until module 4 |
| Clients needed per month | goal + costs ÷ price | calculated |
| Hours per client (delivery + admin) | | her estimate |
| Hours needed per month | | calculated |
| Hours she can give per month | | her answer |
| Capacity ceiling | max clients at her hours | calculated |

Say plainly what the numbers mean: "At this price you need 14 clients a month and about 120
hours. You have 80. So either the price goes up, the delivery gets lighter, or part of it
becomes group or online." Never present an assumption as a fact; label each one.

## 4 · Model options (only when a real choice exists)

If the money check or her anti-goals point to a different shape, lay out 2–3 options in a
message of their own, each with what it means for her week, her income ceiling, the effort
to sell it and the risk:
- **1:1 service** (highest price per client, capped by her hours)
- **Group programme or workshop** (more clients per hour, needs a launch rhythm)
- **Membership or subscription** (steady income, needs ongoing content and community)
- **Product** (digital guide, course, physical product: scalable, needs an audience first)
- **B2B** (companies, schools, clinics, hotels: bigger contracts, longer sales)
- **Hybrid** (a ladder from free content to premium 1:1, the common end state)
Recommend one for now and say why; note the others as "later" on the page.

## 5 · Show, don't tell

The finished canvas as a one-page visual (nine boxes, her words, "open" boxes marked) is the
centrepiece of this module. Publish it with the Artifact tool if available, otherwise
`docs/boards/YYYY-MM-DD-business-model.html` plus a screenshot. Talk her through it box by box.

## 6 · Write the pages

`docs/wiki/business/model.md`, `status: draft`:

```markdown
---
title: Business model
status: draft
updated: YYYY-MM-DD
sources: [conversation YYYY-MM-DD, business/idea.md, business/audience.md]
---
# Business model
**Shape:** <1:1 · group · membership · product · B2B · hybrid>, and why
## Problem · Customer · Unique value · Solution
## Channels
## Revenue
## Costs
## Key numbers (checked every <week/month>)
## Unfair advantage
## The money check
<the table, assumptions labelled>
## Later
<model options set aside for now, and when to revisit>
## Open boxes
```

`docs/wiki/business/competitors.md`, `status: draft`:

```markdown
---
title: Competitors
status: draft
updated: YYYY-MM-DD
sources: [research: raw/YYYY-MM-DD-research-competitors.md]
---
# Competitors
| Name | Type (direct/indirect/DIY) | Offer | Price | Promise | Praised for | Complained about | Link |
## Her reactions
- "<what she said>" about <name>
## Where she is clearly different
## Gaps nobody fills well
```

## Specialists

- `researcher`: the competition brief in step 2.
- `strategist`: "From idea.md, audience.md and the money check in model.md, propose 2–3 model
  shapes that reach her income goal within her hours and respect her anti-goals; trade-offs and
  a recommendation."

## Done when

The one-page model has no blank box she has not chosen to leave open, the money check is
filled with assumptions labelled, the competitor table exists with her reactions, and she
confirms both pages. Then: `model.md` and `competitors.md` → `confirmed`, `state.md` module 3
→ ☑, one `log.md` line, commit and push.

## Hand off

"Your business now adds up on one page, and you know who else is out there. Next I suggest we
shape exactly what you sell and at what price. Shall we?" → `offer-and-pricing`.
