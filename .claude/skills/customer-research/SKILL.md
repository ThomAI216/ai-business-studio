---
name: customer-research
description: Business studio module 2, the one person her business is for, their problem in their own words, backed by desk research and real conversations (docs/wiki/business/audience.md). Load after the idea brief is confirmed, or when she says "who should I target", "who is my ideal client", "is there demand for this", "how do I talk to potential clients", or shares interview notes or recordings. Not for prices or the offer (module 4).
---

# Customer research: the one person it is for

A business that is "for everyone" has no words that land. This module finds **one primary
customer**, what they are trying to get done, and the exact words they use for their
problem. Those words become her website, her posts and her offer later.

Follow the studio's eight rules (`.claude/studios/business.md`). Start by reading
`business/idea.md`, `business/audience.md` (if begun) and `docs/wiki/raw/`.

## 1 · Pick one primary customer

If her idea brief names one clear person, play it back and confirm. If it names several
("busy mothers, executives, and athletes"), put them side by side in a message of its own:
for each, how often they feel the problem, how much they would pay, how easy they are to
reach for her, and how much she enjoys working with them. Recommend one and say why. The
others become **secondary audiences**, kept on the page, not deleted.

## 2 · What they are trying to get done (territory, one question at a time)

- **The job**: what are they trying to achieve or fix? Not "buy coaching", but "feel in
  control of my evenings again".
- **The trigger**: the moment they start looking for help. What just happened?
- **Today's solution**: what they use now (another provider, an app, a book, a friend,
  nothing, putting up with it), and what they dislike about it.
- **The cost of the problem**: in money, time, health, stress, relationships, reputation.
- **What would "solved" look like** for them, in their words?
- **Who decides and who pays**: themselves, a partner, an employer, an insurer?
- **Where they hang out**: platforms, groups, places, events, newsletters, people they trust.
- **Who it is NOT for**: the clients she does not want.

Ask her about real people first: "Tell me about your best client, or the last person who asked
you for help. What was going on for them?" Her stories beat her theories.

## 3 · Desk research (delegate, then show her)

Brief the `researcher`:
> "For <primary customer> with <problem> in <country/language>: find what they say in their
> own words. Sources: reviews of competitors' services (Google, Trustpilot, app stores),
> forums and groups (Reddit, Facebook groups, Quora), Google 'People also ask' and related
> searches for <3–5 phrases>, comments under popular posts on the topic. Return 10–20 verbatim
> quotes with links, grouped by pain, plus the phrases they use most. Rough search demand for
> the main phrases if a free source shows it. Cite everything; mark anything unverified."

Show her the quotes grouped by theme. Her reaction ("yes, that's exactly what they say", "no,
my clients never talk like that") is data: record it.

## 4 · Real conversations (the strongest evidence)

Desk research finds patterns; conversations confirm them. Aim for **five conversations**
with people who match the primary customer. The rules (the "Mom Test" way):
- Ask about **their past and present behaviour**, never opinions about her idea
  ("When did that last happen? What did you do?", not "Would you buy this?").
- **No pitching.** She is learning, not selling. The idea comes up only at the end, if at all.
- Listen for what they already spend money or time on: that is real demand.

Help her with everything she needs:
1. **Who**: list with her where to find five people (her network, past clients, groups
   from step 2). Suggest she starts with two warm contacts this week.
2. **The invitation**: a short message in her language and tone, asking for 20 minutes "to
   understand how people deal with <problem>", explicitly not a sales call.
3. **The script**: 6–8 questions in her language, for example:
   - "Tell me about the last time <problem> got in your way."
   - "What did you try? What happened?"
   - "What did that cost you (time, money, nerves)?"
   - "What would have to change for this to stop being a problem?"
   - "Have you ever paid for help with this? What was that like?"
   - "Who else do you know who deals with this?"
4. **Notes**: she can paste notes in the chat, or upload recordings (the `intake` and
   `media-reading` skills transcribe them; ask for the person's consent to record first).

After each batch, synthesise: quotes by theme, what surprised, what contradicts the idea
brief, what they already pay for. Update the page. Two contradicting conversations are a
reason to talk to more people, not to pick the one you like.

## 5 · Show, don't tell

A one-page **customer portrait** (the person, a day in their life when the problem hits,
their quotes, what they have tried) as an artifact or `docs/boards/` page helps her see them.
Offer it once the quotes are in.

## 6 · Write the page

`docs/wiki/business/audience.md`, `status: draft`:

```markdown
---
title: Audience
status: draft
updated: YYYY-MM-DD
sources: [conversation YYYY-MM-DD, raw/..., research: raw/YYYY-MM-DD-research-<topic>.md]
---
# Audience
## Primary customer
<who, in one paragraph: situation, life stage, context>
## The trigger
<the moment they start looking for help>
## What they are trying to get done
## Pains, in their words
- "<verbatim quote>" (source)
## What they use today, and what they dislike about it
## What they would pay for (evidence, not guesses)
## Who decides and who pays
## Where they hang out
## Not for
## Secondary audiences
## Conversations
<date · who (first name or role only) · 3 key lines · link to notes in raw/>
## Open questions
```

Keep personal data minimal: first names or roles only, never contact details, in the wiki.

## Specialists

- `researcher`: the desk-research brief in step 3.
- `strategist`: if choosing the primary customer is hard: "From idea.md and audience.md,
  compare these audiences on frequency of pain, willingness to pay, reach and fit; recommend one."

## Done when

One primary customer is named; their problem is written in their own words with sources;
3–5 conversations are done or booked with dates in `state.md`; she confirms the page. Then:
`audience.md` → `confirmed`, `state.md` module 2 → ☑ (◐ if conversations are still booked),
one `log.md` line, commit and push. Conversations can continue while module 3 starts.

## Hand off

"You now know exactly who this is for, in their own words. Next I suggest we look at how the
business itself works: what comes in, what goes out, and who else is out there. Shall we?" →
`business-model`.
