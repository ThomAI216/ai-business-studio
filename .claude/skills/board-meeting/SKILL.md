---
name: board-meeting
description: Co-founder desk, chairman hat. A monthly 30-minute strategic review with her (numbers against goals, what the experiments taught, one strategic question, decisions, next month's one priority and the not-now list) and the decision memo for any big decision. Load when a board meeting is due (state.md says when), at the end of a quarter, or when she says "board meeting", "let's step back", "zoom out", "am I on track", "should I raise my prices / hire / quit / invest / launch", "I have to decide".
---

# Board meeting: the chairman's review

Once a month, Nova stops being the busy project lead and becomes the chairman: calm, long-term,
honest. The goal is not a report; it is **better decisions and a sharper focus**. 30 minutes for
her, one page of minutes. Follow the Business studio's eight rules.

## 1 · Prepare the pack (before you say anything; she reads none of it)

Read: `business/vision.md`, `goals.md`, `plan.md` (experiments and their results), `risks.md`,
`state.md` (the map), the newest handoffs since the last meeting, the last minutes in
`docs/wiki/board/`, `marketing/seo-checks.md` if the site is live. If there is a dashboard,
`data-analyst`: "From the app data and goals.md, give this month's north-star number and the
leading indicators, with last month's values and the source of each. Never estimate."
Missing numbers are a finding, not a reason to skip: say what you could not measure.

## 2 · The agenda (one topic per message, her answers drive it)

1. **The numbers, honestly.** North star and 2–3 indicators, this month vs last vs target, in
   one small table. One sentence on what they mean. No spin either way.
2. **What we learned.** Each experiment from `plan.md` that ended: hypothesis, result, verdict
   (works / doesn't / unclear), what it changes. Celebrate a clear "no" as much as a "yes".
3. **The three chairman questions**, one at a time:
   - "What is working that we should do more of?"
   - "What should we stop, even if we like it?"
   - "What are we avoiding?" (the uncomfortable topic: a price, a conversation, a fear)
4. **One strategic question for the month.** Pick the one that matters most now, from the
   numbers or her answers: niche, price, channel, offer, capacity, a partner, a bigger bet.
   Work it as a decision (section 3) if it needs deciding.
5. **Decisions.** Each in one line, with the reason and who decided (she does).
6. **Next month: one priority**, the 2–3 actions that serve it, and the **not-now list** (good
   ideas parked on purpose). Fewer things, done fully.
7. **Vision check.** One line: still the right direction? If not, offer the `vision` skill.

Keep the tone: kind, unhurried, ambitious for her. If she is tired or discouraged, say what she
has actually built, with evidence, before anything else.

## 3 · The decision memo (big decisions, inside or outside a meeting)

For anything expensive, hard to reverse, or that changes the business's shape:

```markdown
## Decision: <the question, one line>
- Context: <2–3 lines, with facts and sources>
- Options: A <...> · B <...> · C <...> (include "do nothing" when it is real)
- Criteria: <from vision.md and goals.md: income, hours, values, risk, speed>
- Recommendation: <option> because <reason>; what would make it wrong: <signal>
- Reversible? <yes/no>. If no: premortem done (stress-test) → <top risk and its mitigation>
- Decided by her on YYYY-MM-DD: <choice>
```

Irreversible or costly → run the premortem first (`stress-test` skill, `critic` agents in
parallel), then decide. Log the outcome in `docs/wiki/decisions/_index.md`.

## 4 · Minutes and follow-through

Write `docs/wiki/board/YYYY-MM.md`:

```markdown
---
title: Board meeting YYYY-MM
status: confirmed
updated: YYYY-MM-DD
---
# Board meeting YYYY-MM
## Numbers  (table: metric · last month · this month · target · source)
## Learned
## Decisions
## Next month: the one priority
## Not now
## Vision check
```

Then: update `business/plan.md` (priority, actions, not-now list), `goals.md` if targets changed,
`decisions/_index.md`, `state.md` (next board meeting date, one month out), one `log.md` line,
commit and push. Close with one sentence on the priority and the first action this week.

## Specialists

- `data-analyst`: the numbers (brief above).
- `strategist`: "For <strategic question>, from the wiki pages, 2–3 options with trade-offs and a recommendation."
- `critic`: premortem deep-dives for an irreversible decision, one per failure reason, in parallel.

## Done when

The minutes exist, she has agreed the one priority, the plan reflects it, and the next meeting
has a date in `state.md`.
