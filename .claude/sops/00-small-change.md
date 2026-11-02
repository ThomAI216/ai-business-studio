# SOP 00: Small change

**When:** copy, spacing, colour, a class name, a constant, a label, a typo.
**Tier:** T0. This SOP exists to stop you turning it into anything larger.

## Procedure

1. **Confirm it is actually small.** Run the escalation check below. If any trigger fires,
   stop and switch SOP.
2. **Find the one file.** Grep for the visible string: the literal button label, the
   heading text, the class. Do not map the component tree first.
3. **Edit it.**
4. **Stop.** Report the file and the change in one line, in plain words for her.

## Escalation check: 15 seconds

Does the change touch any of these?

- Data: a table, a column, a query, a form that saves something → **SOP 02**
- A public claim: a price, a number, a credential, a testimonial, a health, money or legal
  statement → check it against `docs/wiki/business/` and ask her before it ships
- A route, a link target or a redirect → **SOP 01** (a link with an empty value is a
  *different page*, not a variant of the same one)
- Who can see or do what: login, access, a hidden or disabled button, a launch switch → **SOP 01**
- Payments or anything that sends an email or message → T2, `kickoff`
- An AI call or its prompt → T2, `kickoff`

None of them? It is T0. Edit and stop.

## What you do not do

No subagent. No plan document. No new test. No wiki update. No "while I'm here" refactor.
No reading the five files that import this one.

If the small change reveals a real bug, **say so and stop**; do not fix it in the same
breath. She decides whether that becomes its own task.

## The two traps that make a small change not small

**A hardcoded `disabled` is a promise.** A button disabled because the feature does not exist
yet becomes a silent lie the day the feature ships. Gate it on the real condition or leave a
`TODO` naming the condition.

**Display state must derive from props.** `useState(props.x)` freezes the first value it ever
saw and then renders stale data forever. State is for edit drafts only.

## Done

It still builds (or, for copy only, the copy checker passes). You said what changed, in one line.
Commit and push your branch: cloud sessions are wiped.
