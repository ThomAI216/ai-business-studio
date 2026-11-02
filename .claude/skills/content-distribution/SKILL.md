---
name: content-distribution
description: Marketing & SEO studio module 5. Make every article travel - pick her two main channels, turn one article into a set of posts (LinkedIn, Instagram carousel, newsletter, short video idea) that all point back to it and end on her free next step, space them over two weeks, and hand the visual briefs to the Content studio (docs/wiki/marketing/channels.md). Load after an article goes live, or when she says "post this on LinkedIn", "what should I post", "Instagram", "newsletter", "how do I share my article", "I never know what to post", "social media plan".
---

# Content distribution: one article, every channel she uses

Follow the studio rules in `.claude/studios/marketing-seo.md`. The article is the source;
every post points back to it, so her reach builds her website instead of competing with it.

**Inputs:** the live article, `business/audience.md` (where her clients spend time),
`brand/voice.md`, `business/offer.md` (the free next step), `business/plan.md` (her hours).
**Output:** `docs/wiki/marketing/channels.md` (once), then one batch file per article:
`content/channels/<article-slug>.md`, every post ready to paste.

## 1 · Pick two main channels (once)

Two channels done every time beat five done sometimes. Choose with her from evidence:
- **Where her clients are,** from `audience.md` ("where they hang out") and her own numbers
  (followers, past posts that worked, emails she already has).
- **What she enjoys making.** A channel she dreads will stop in three weeks.
- **What the business needs:** professional buyers → LinkedIn; visual or local consumers →
  Instagram; trust over time → a newsletter (the only audience she owns).
Offer 2–3 combinations with trade-offs and a recommendation (studio rule 4). Example: a
bakery picks Instagram + a monthly newsletter; an accountant picks LinkedIn + newsletter.

## 2 · The set every article produces

Pick the pieces that fit her two channels; never all of them by default.

| Piece | Shape | Angle |
|---|---|---|
| LinkedIn post 1 | text, 150–250 words | **recognition**: the phrases her clients use about themselves |
| LinkedIn post 2 | text | **the myth**: the belief the article corrects |
| LinkedIn post 3 | text | **one number or one idea, plus three things to do** |
| LinkedIn document | PDF carousel, 7–9 slides | the article's table or framework |
| Instagram carousel | 7–9 slides + caption ≤ 150 words | the same framework, shorter lines |
| Newsletter | 400–900 words | why she wrote it, the key idea, a link, one personal note |
| Short video idea | 20–45 s, hook in the first 2 seconds | one question, one answer, from the article |

## 3 · Writing rules (every piece)

- **Same claims rules as the article:** no new number, story or claim that is not in the
  article and its sources. Regulated field: inform, never promise.
- **No invented stories.** A client story only if it is real and the client agreed in writing;
  otherwise mark it `[her: a real example?]` and ask.
- **The hook is the first two lines.** They must make sense alone.
- **Her voice,** one idea per post, short paragraphs, no hype words, no em dashes, three
  hashtags at most, no emoji walls.
- **Close on her free next step**, in the same words as the website, with the article link.
- **Links carry tags** so she can see which channel brought visitors:
  `?utm_source=<linkedin|instagram|newsletter>&utm_medium=<social|email>&utm_campaign=<article-slug>`.
  The article's canonical tag keeps search clean.

## 4 · The rhythm

Spread a batch over about two weeks after the article goes live: never everything the same
day. Newsletter in its next regular send. Fit it to her week from `plan.md`; if she has one
hour a week for social media, the batch is two posts, and that is fine. Write the schedule
into the batch file; she posts (or schedules in her tool) and ticks what went out.

## 5 · Visual pieces go to the Content studio

For carousels, documents and video, write a brief per piece and hand it to the Content
studio (`carousel` skill): the angle, the slide-by-slide copy (locked before any visuals),
the article link, the closing next step. The Content studio owns the look; this skill owns
what is said.

## Templates

`docs/wiki/marketing/channels.md`:
```markdown
---
title: Channels
status: draft
updated: YYYY-MM-DD
sources: [business/audience.md, conversation YYYY-MM-DD]
---
# Channels
| Channel | Account / handle | Why this one | Rhythm | Language | Free next step wording |
## What worked (updated monthly)
| Date | Piece | Channel | Result (reach, clicks, sign-ups) | Lesson |
```

`content/channels/<article-slug>.md`: per piece: channel, planned date, text ready to paste,
link with tags, sources it uses, status (to post · posted on <date>).

## Specialists

- `copywriter`: "From <article> and voice.md, write <pieces> for <channels> following the
  content-distribution rules; nothing that is not in the article; end on <free next step>."
- `strategist`: once, for the channel choice: "From audience.md and her numbers, propose 2–3
  channel pairs with trade-offs and a recommendation."

## Done when

`channels.md` is confirmed and one article's batch is posted (or scheduled) on her two
channels, with tagged links. Then module 5 ☑ in `state.md`, one `log.md` line, commit, push.

## Hand off

"Your article now reaches people where they already are, and brings them back to you." Then:
"Next I suggest we check the site's health and set up the monthly check. Shall we?" →
`seo-checkup` (module 6), or the next article in the editorial plan.
