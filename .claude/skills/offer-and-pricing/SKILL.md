---
name: offer-and-pricing
description: Business studio module 4, exactly what she sells and at what price, as a ladder from one free entry offer to premium, plus the path from stranger to client (docs/wiki/business/offer.md and funnel.md). Load after the business model, or when she says "how much should I charge", "what should I sell", "I want a package", "should I offer something free", "nobody buys", "how do people become clients". Not for the model's shape (module 3) or how to say it publicly (module 5).
---

# Offer and pricing: what she sells, at what price

People buy a clear result, not a list of sessions. This module turns her model into a small
**offer ladder** with names and prices, one **standard offer** (the free first step that ends
every page and post), and the **funnel** that leads from one to the other.

Follow the studio's eight rules (`.claude/studios/business.md`). Start by reading
`business/idea.md`, `audience.md`, `model.md` (the money check), `competitors.md` (their
prices) and `docs/wiki/raw/` (anything she already sells or has priced).

## 1 · What she sells today (if anything)

"List everything you sell or have sold, even small things. Which do you love most? Which
pays?" Record format, duration, price and what the client gets. Starting from what already
works beats inventing from scratch.

## 2 · The offer ladder

Build it with her, one rung at a time, from the bottom:

| Rung | Its job | Typical shape |
|---|---|---|
| **Free entry (the standard offer)** | let a stranger feel her value, risk-free | a call, an audit, a guide, a short trial |
| **Starter** | a first small yes, low price | a workshop, a single session, a mini-programme |
| **Core** | the offer she wants to sell most | a programme, a package, a monthly plan |
| **Premium** | for those who want the most, or done-for-you | VIP, intensive, 1:1 with extras |

For each rung, the territory: who it is for · the **result** it promises (in the customer's
words from audience.md) · what is included · format (1:1, group, online, in person) · duration
· price · what happens next (the rung it leads to). Three rungs are enough to start; four is
the maximum. An empty premium rung is fine.

**Naming:** names say the result, not the method ("The Calm Evenings Programme", not "Package
B"). Offer two or three names per rung; she picks or mixes.

## 3 · The standard offer (one, always the same)

A proven pattern: **one clear free next step closes every page, post and email**, so every
piece of content leads somewhere. Agree it with her:
- It shows her value in under an hour and she can give it ten times a week without burning out.
- It has an exact name, what the person gets, how long it takes, and what happens after.
- It naturally leads to the starter or core offer.
Examples: a free 20-minute call, a free written mini-audit, a free guide in exchange for an
email, a short trial. Write it in `offer.md` exactly as it will appear on the website.

## 4 · Pricing, in plain words

Never pick a price from thin air. Four inputs, shown to her side by side:
1. **Value to the client**: what the problem costs them (audience.md) and what solving it is worth.
2. **Alternatives' prices**: from competitors.md (direct, indirect, and the DIY route).
3. **Her capacity**: hours per client and her hours per month (the money check in model.md).
4. **Her income goal**: how many clients at this price reach it.

Then 2–3 price options per core rung in a message of their own, each with what it means
(clients needed per month, hours, who it attracts or excludes) and your recommendation.
Explain, briefly and only when relevant:
- **Packages beat hourly**: they sell a result and stop clients counting minutes.
- **Anchoring**: showing the premium rung first makes the core rung feel reasonable.
- **A price that is too low** signals low value and fills her calendar with the wrong clients.
- Payment plans, early-bird prices and guarantees: only if she wants them; a guarantee must be
  one she can honour.
Re-run the money check from model.md with the chosen prices and show her the result.

## 5 · The funnel: stranger to client

One line per step, written with her:
1. **Stranger** → how they first hear of her (channels from model.md).
2. **Follower / visitor** → what makes them stay (content, a story, a free resource).
3. **Lead** → what she gives in exchange for an email or a booking (usually the standard offer).
4. **Call or trial** → what happens there, how she invites them to the next step.
5. **Client** → the first rung they usually buy.
6. **Returning client / referral** → what brings them back or makes them recommend her.
Note where people drop off today and one idea for each drop-off. Marketing & SEO builds on this.

## 6 · Careful with claims

If her field is regulated (health, therapy, nutrition, finance, legal, investment, some
coaching claims), flag on the page what she must check with a professional before publishing:
titles she may use, results she may promise, required disclaimers. **Never write a promise she
cannot guarantee** ("lose 10 kg", "double your income"); describe what the client gets and does
instead. You are not a lawyer; say so when it matters.

## 7 · Show, don't tell

The **offer ladder** as a one-page visual (rungs stacked, name, result, price, arrows to the
next rung) and the **funnel** as a simple flow. Artifact tool if available, otherwise
`docs/boards/YYYY-MM-DD-offer-ladder.html` plus a screenshot.

## 8 · Write the pages

`docs/wiki/business/offer.md`, `status: draft`:

```markdown
---
title: Offer and pricing
status: draft
updated: YYYY-MM-DD
sources: [conversation YYYY-MM-DD, business/model.md, business/competitors.md]
---
# Offer and pricing
## The standard offer (closes every page and post)
**Name:** · **What they get:** · **How long:** · **What happens after:**
## The ladder
### <Rung name> · <price>
For: · Result: · Included: · Format: · Duration: · Leads to:
## Pricing rationale
<value, alternatives, capacity, goal; the options considered and why this one>
## Money check with these prices
## To check with a professional
## Open questions
```

`docs/wiki/business/funnel.md`, `status: draft`:

```markdown
---
title: Funnel
status: draft
updated: YYYY-MM-DD
sources: [conversation YYYY-MM-DD, business/offer.md]
---
# Funnel: stranger to client
1. Stranger → <how they hear of her>
2. Follower / visitor → <what makes them stay>
3. Lead → <what she gives for an email or booking>
4. Call / trial → <what happens, the invitation to the next step>
5. Client → <first rung bought>
6. Return / referral → <what brings them back>
## Where people drop off today, and one idea for each
```

## Specialists

- `researcher`: "Find public prices for <offer type> for <customer> in <country>: 8–10
  examples with links, what is included, format. Cite everything."
- `strategist`: "From audience.md, model.md and competitors.md, propose an offer ladder (free
  entry, starter, core, premium) with names, results and 2–3 price options for the core rung;
  trade-offs and a recommendation."

## Done when

A priced ladder (at least free entry + one paid rung) and one standard offer are written, the
money check works with the chosen prices, the funnel has all six steps, any regulated claim is
flagged, and she confirms both pages. Then: `offer.md` and `funnel.md` → `confirmed`,
`state.md` module 4 → ☑, one `log.md` line, commit and push.

## Hand off

"You now have a clear offer, a price you can defend, and one free first step for everyone.
Next I suggest we find the words that make the right people pick you. Shall we?" →
`positioning`.
