---
name: launch-plan
description: Business studio module 7. Turn the riskiest assumptions into cheap experiments and a 90-day plan sized to her real week, with goals for 3, 6 and 12 months and one number to watch. Also runs the 15-minute weekly review. Load after stress-test, or when she says "what should I do first", "where do I start", "make me a plan", "what's my next step this week", "set goals", "how do I know it's working", "weekly review", or seems overwhelmed by everything there is to do.
---

# Launch plan: the first 90 days

Follow the studio rules in `.claude/studios/business.md`. This skill adds experiments, the
90-day plan, goals and the weekly review.

**Inputs:** `business/risks.md` (the three riskiest assumptions), `business/offer.md`,
`business/funnel.md`, `business/audience.md`, `business/positioning.md`, `business/owner.md`
(her time, constraints). **Outputs:** `docs/wiki/business/plan.md` and `docs/wiki/business/goals.md`.

## 1 · Her real capacity (ask first, one question)

*"In a normal week, how many hours can you honestly give this, and in which slots?"* Plan to
that number, minus 20% for life. A plan that needs 30 hours from someone who has 8 is a plan to
feel guilty. Record it in `plan.md`.

## 2 · Experiments: cheapest test first

For each of the top 3 riskiest assumptions in `risks.md`, propose the cheapest experiment that
could prove it wrong. Order from cheapest to most expensive and stop at the first one that
answers the question:

1. **Conversations**: 5–10 talks with people in the target group (`customer-research` scripts).
2. **A post or a short series**: does the topic get replies, saves, messages?
3. **A one-page landing page** with the free entry offer from `funnel.md`: do strangers sign up?
4. **A pre-sale**: will people pay, or put down a deposit, before it is built?
5. **A pilot with 3 clients**: at a founding price, in exchange for feedback and a testimonial.

Each experiment is written as:
- **Hypothesis:** "If [action], then [who] will [measurable behaviour]."
- **Test:** what she does, exactly.
- **Metric and threshold:** the number that means "it works" (decided *before* starting,
  e.g. "4 of 10 people ask for the price").
- **Date and cost:** when it ends, hours and money.
- **Then:** what she does if it works, and if it doesn't.

Offer two or three experiments, recommend the first, let her pick. The first one starts
**this week**.

## 3 · The 90-day plan in three blocks

Size every block to her hours. Each block has one theme, 3–5 outcomes and what she will NOT do.

- **Days 1–30 · Learn.** Run the first experiments, talk to clients, confirm the offer and price.
- **Days 31–60 · Build.** The minimum she needs to sell: the landing page or website (hands
  to Website & design via `product-spec`), the free offer, the first content.
- **Days 61–90 · Sell.** First paying clients, first testimonials, first repeatable channel.

Adjust the themes to her situation (with clients already: Systemise → Grow → Scale).

## 4 · Goals: 3, 6 and 12 months

- **One north-star number**: the one figure that best shows the business is working (paying
  clients, monthly revenue, active members). One, not five.
- **2–3 leading indicators**: weekly numbers she controls that move the north star
  (conversations booked, sign-ups to the free offer, proposals sent).
- **Targets** at 3, 6 and 12 months, each realistic for her hours, each with how we measure it.
- **Anti-goals**: what would make it a failure even if the numbers grow (working weekends,
  clients she dislikes, a price she resents).

## 5 · What NOT to do yet

A short, explicit list. Typical entries: an app before ten paying clients, paid ads before a
proven offer, a logo redesign before the first sale, five social networks at once. Each with
one line of why and the condition under which it becomes worth doing.

## 6 · The weekly review (15 minutes, when she says "weekly review")

Run it as a short conversation, one question at a time:
1. *"What happened this week?"* (wins, numbers)
2. Update the leading indicators in `goals.md`; compare to last week.
3. Experiments: any result in? Apply the threshold decided in advance; record the verdict.
4. *"What got in the way?"* Adjust next week's plan to her real hours.
5. Propose the **three things for next week**, she confirms.
6. Write it to the "Weekly log" in `plan.md`, update `state.md`, one `log.md` line.

If two weeks pass without a review, the Coordinator offers one at the start of the next session.

## Question bank (territory)

- What has to be true in 90 days for you to feel this is working?
- What would you happily stop doing to make room for this?
- Which client could you call this week?
- What scares you most about selling it? (often the real blocker)
- What would you do first if you could only do one thing?

## The visual

A **90-day roadmap**: three columns (the blocks), experiments as cards with their dates and
thresholds, the north-star number and its targets at the top. Artifact tool if available,
otherwise `docs/boards/plan.html` plus a screenshot. Refresh it at each weekly review.

## Specialists

- `strategist`: "From `risks.md` and `offer.md`, propose 3 experiments for [assumption],
  cheapest first, each with hypothesis, metric, threshold, cost."
- `researcher`: "What conversion and response rates are typical for [experiment type] in
  [her market]? Cite sources; say when data is thin."

## Wiki templates

`docs/wiki/business/plan.md`
```markdown
---
title: 90-day plan
status: draft
updated: YYYY-MM-DD
sources: []
---

# 90-day plan (start YYYY-MM-DD)

**Her capacity:** <hours per week, slots>

## Experiments
| # | Hypothesis | Test | Metric · threshold | Dates · cost | Result | Then |
|---|---|---|---|---|---|---|

## Blocks
### Days 1–30 · <theme>
- Outcomes: ...
- Not doing: ...
### Days 31–60 · <theme>
### Days 61–90 · <theme>

## Not yet (and when it becomes worth it)
- ...

## Weekly log
- YYYY-MM-DD · numbers · verdicts · next three things
```

`docs/wiki/business/goals.md`
```markdown
---
title: Goals
status: draft
updated: YYYY-MM-DD
sources: []
---

# Goals

**North star:** <the one number> · measured by <how>

| Horizon | North-star target | Leading indicators (weekly) |
|---|---|---|
| 3 months | | |
| 6 months | | |
| 12 months | | |

**Anti-goals:** ...
```

## Done when

Three experiments with hypothesis, threshold, date and cost exist; the first starts this week;
the 90-day blocks fit her hours; goals have one north star and leading indicators; the "not
yet" list exists. She confirms both pages: `status: confirmed`, tick module 7 in `state.md`,
one `log.md` line.

## Hands off to

- **Next module:** `product-spec`. *"Now we know what the website must help you test and sell.
  Next, let's write down exactly what the website (and maybe an app) has to do. Shall we?"*
- **Marketing & SEO studio**: the plan's channels and experiments become the first campaigns.
