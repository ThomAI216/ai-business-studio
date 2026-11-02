---
name: positioning
description: Business studio module 5. Work out why a client should choose her, then turn it into words she can say out loud (one-liner, 30-second pitch, proof points, words to own and avoid, answers to objections). Load after offer-and-pricing, or whenever she says "how do I explain what I do", "what makes me different", "what do I say when people ask", "my pitch", "my bio", "my tagline", or before any homepage, profile or post that introduces her.
---

# Positioning: why her, said in her words

Follow the studio rules in `.claude/studios/business.md` (look before you ask, one question per
message, play it back, options not answers, show don't tell, write it down, check facts, always
a next step). This skill adds only what is specific to positioning.

**Inputs (read first):** `business/idea.md`, `business/audience.md`, `business/model.md`,
`business/competitors.md`, `business/offer.md`, anything in `docs/wiki/raw/` she wrote about
herself (bios, old site, posts, testimonials).
**Output:** `docs/wiki/business/positioning.md`.

## The hidden structure (never name it to her)

Positioning is built from what is true, not from what sounds good. Work through these steps
in order. Each is a conversation, not a form:

1. **Real alternatives.** What would her ideal client do if she did not exist? Not only
   competitors: doing nothing, a spreadsheet, a cousin, a big agency, a YouTube video, an app.
   *"When someone like your best client has this problem and doesn't find you, what do they do instead?"*
2. **What only she has.** Attributes the alternatives lack: method, experience, format, access,
   speed, personality, location, language. Facts, not adjectives.
   *"What do clients get with you that they can't get from [alternative]?"*
3. **The value those create.** For each attribute: so what, for the client? Push until it is
   a result they would pay for. *"Because you do X, what changes for them?"*
4. **Who cares most.** The clients for whom that value matters most. Usually narrower than
   her first answer; that is a strength, not a loss. Check against `audience.md`.
5. **The frame.** The category she is in, so people understand her in two seconds ("a
   bookkeeper for creatives", not "a financial wellbeing partner"). Offer 2–3 frames with what
   each makes people expect.
6. **Why now.** A trend or change that makes this matter today, only if it is real and sourced.

Play back after steps 3 and 5 (150–250 words). Her words stay hers; your inferences are
marked "my proposal".

## Then the messaging

Draft, read back, let her edit. Never finalise wording without her saying it sounds like her.

- **One-liner.** Start from *"I help [who] [get result] without [pain]"*, then offer two better
  variants that drop the template feel. Recommend one and say why.
- **30-second pitch.** About 75 words she would say at a dinner: who, problem, what she does,
  result, the next step. Ask her to read it aloud and change any word that feels unnatural.
- **Three proof points.** Facts that make the claim believable: results, numbers, years,
  testimonials, credentials, a story. Only what is true and confirmable; missing proof becomes
  a task in `state.md` ("collect two client quotes").
- **Words she owns / words to avoid.** 5–10 each. Owned words come from her clients' language
  (`audience.md`, `raw/`). Avoid jargon, clichés of her industry, and claims she cannot back.
- **Objections and answers.** The 3–5 reasons people say no (price, time, trust, "I can do it
  myself", "not now"), each with an honest one- or two-sentence answer.

## Question bank (territory, not a script)

- Tell me about the last client who said "this is exactly what I needed". What had they tried before?
- If a friend introduced you at a party, what would you want them to say?
- Which clients do you secretly hope never to have again? Why?
- What do people get wrong about your field?
- What do you refuse to do that others in your field do?
- What is the result clients mention first when they thank you?
- Which word do you hate being called?

## The visual

A one-page **positioning card**: alternatives on the left, her unique attributes and the value
they create in the middle, the people who care most on the right, the one-liner across the top.
Publish it (Artifact tool if available, otherwise `docs/boards/positioning.html` plus a
screenshot) once steps 1–4 are drafted, so she reacts to a picture instead of a list.

## Specialists

- `researcher`: "How do the 3–5 competitors in `competitors.md` describe themselves (homepage
  headline, tagline, bio)? Quote them, cite the URLs, note the words they all share."
- `strategist`: "From `positioning.md` steps 1–5, propose 2–3 frames and 3 one-liners with
  trade-offs and a recommendation."
- `copywriter` (Website & design studio), only to polish her final wording, never to replace it.

## The test

Positioning is not done in the chat. Before marking it confirmed, ask her to **say the
one-liner or the pitch to one real person this week** (a client, a friend in the target group)
and report back: did they understand, what did they ask, did they want to know more? Note the
reaction in the page and adjust the wording once.

## Wiki template: `docs/wiki/business/positioning.md`

```markdown
---
title: Positioning
status: draft
updated: YYYY-MM-DD
sources: []
---

# Positioning

## In one line
<the chosen one-liner>

## The 30-second pitch
<about 75 words, her wording>

## How we got here
- **Real alternatives:** <what clients do instead>
- **What only she has:** <attributes, facts>
- **The value it creates:** <attribute → result>
- **Who cares most:** <the narrow group>
- **Frame:** <category people understand>
- **Why now:** <trend, with source> or "not used"

## Proof points
1. <fact> (source)
2. ...
3. ...

## Words she owns / words to avoid
- Owns: ...
- Avoids: ...

## Objections and answers
| They say | She answers |
|---|---|

## Real-world test
<date, who she said it to, their reaction, what changed>
```

## Done when

She has a one-liner and a 30-second pitch she would say out loud, three true proof points,
her owned and avoided words, answers to the main objections, and one real-world test logged.
Then: `status: confirmed`, tick module 5 in `state.md`, add one `log.md` line.

## Hands off to

- **Marketing & SEO studio**: the one-liner, owned words and objections become messages,
  headlines and search topics.
- **`brand` skill** (Website & design studio): owned and avoided words feed
  `docs/wiki/brand/voice.md`.
- **Next module:** `stress-test`. *"Your pitch is ready. Next I'd like to try to break the plan
  on purpose, so the market doesn't do it for us. Shall we?"*
