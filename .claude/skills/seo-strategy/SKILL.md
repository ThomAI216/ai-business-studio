---
name: seo-strategy
description: Marketing & SEO studio module 1. Turn her audience, offer and positioning into a plan for being found on Google and in AI answers (ChatGPT, Perplexity, Google AI Overviews) - the questions her clients really ask, grouped into 3 to 5 topic clusters, the page map for the website, local and language decisions, and a publishing rhythm she can keep (docs/wiki/marketing/seo-plan.md and keywords.md). Load when the Marketing & SEO studio starts, before the website sitemap is final, or when she says "how do people find me", "SEO", "Google", "I want to be on the first page", "what should I write about", "ChatGPT recommends my competitor", "should I have a blog", "keywords".
---

# SEO strategy: the questions her clients ask, and where she answers them

Follow the studio rules in `.claude/studios/marketing-seo.md` (they include the Business
studio's eight). This skill adds only what is specific to the plan.

**Inputs (read first):** `business/audience.md` (their problems in their words: the raw
material of every keyword), `business/offer.md`, `business/positioning.md`,
`business/plan.md` (her weekly hours), `business/competitors.md`, `docs/wiki/website/_index.md`
(the page list from the product spec, if it exists).
**Output:** `docs/wiki/marketing/seo-plan.md`, `docs/wiki/marketing/keywords.md`, and the page
map added to the website sitemap.

## The idea in one paragraph (for you, and for her if she asks)

People find a small business by typing, or asking an AI, a question in their own words. The
plan is a short list of those questions, grouped into a few topics she wants to be known
for, each answered by one page that is better than what is out there today. Search engines
and AI answers both reward the same thing: a clear, true, specific answer from someone who
visibly knows the subject. No tricks, no keyword stuffing, no volume for its own sake.

## 1 · Harvest the questions (her words first, then the outside world)

1. **From her clients.** Pull every question, phrase and complaint from `audience.md`, her
   intake material (`docs/wiki/raw/`), call notes, DMs and emails she has shared. These are
   gold: the words people use about themselves are the searches they type.
   Ask her: *"What do people ask you in the first five minutes of a first conversation?"*
2. **From search.** `researcher` collects "People also ask" questions, related searches,
   autocomplete phrasings, forum and review language (Reddit, local groups, competitor
   reviews) in her country and languages.
   Then run the toolkit: `/seo cluster <seed phrase>` for SERP-based grouping, and
   `/seo plan <her business type>` for a strategic starting frame. Treat both as evidence.
3. **From AI answers.** `researcher` asks two or three AI assistants the questions her client
   would ask ("best <service> in <city>", "how do I <job> without <pain>") and records who
   gets named and which sources are cited. This is her AI-search baseline.
4. **Demand, honestly.** Search volumes come from a tool or are marked "unverified". For a
   small local business, a question with little volume but strong buying intent beats a big
   vague one. Never invent numbers.

## 2 · Group into 3 to 5 topic clusters

A cluster = one **pillar** (the big question, usually tied to an offer) + 4 to 10
**supporting questions** that lead to it. Each cluster must pass three tests:
- **Hers to own:** it matches her positioning and an offer she sells (no traffic for its own sake).
- **Her clients' words:** she recognises the questions as what people really ask.
- **Winnable:** the current top results are generic, old, or from big sites that don't serve
  her niche, place or language.

Offer the clusters as a board (Artifact, or `docs/boards/<date>-clusters.html`): one column per
cluster, the pillar on top, the questions below. Ask her which feel like her and which do not.
Example (a yoga teacher for desk workers): pillar "yoga for back pain from sitting";
supporting "how long before yoga helps back pain", "yoga at your desk", "yoga or pilates for
posture".

## 3 · Decide the page types

For each question, one home only (two pages answering the same question compete with each other):

| Page type | Use for | Example (an accountant for freelancers) |
|---|---|---|
| **Service page** | the pillar tied to an offer; buying intent | "Accounting for freelancers in Lyon" |
| **Article** | a supporting question needing a real explanation | "Which expenses can a freelancer deduct?" |
| **FAQ on a service page** | short questions with a one-paragraph answer | "Do you work with clients abroad?" |
| **Local page** | only if she serves distinct places | one page per town she really serves |
| **Comparison page** | "X vs Y" questions her clients really ask | `/seo competitor-pages` helps, honestly only |

The result is the **page map**: page, type, the question it answers, the cluster, its one call
to action (her free entry offer). Add it to the sitemap table in `docs/wiki/website/_index.md`
(status `planned`); never delete pages the product spec put there, flag conflicts instead.

## 4 · Two decisions to settle now

- **Local or not?** Does she serve clients in a place (a studio, a shop, home visits, a
  city)? Then local SEO matters: a Google Business Profile, her name, address and phone the
  same everywhere, reviews, local pages. Run `/seo local` once the site exists. If she is
  online-only, say so in the plan and skip it.
- **Languages.** Which languages do her clients search in? One language done well beats two
  done badly. If two: each page exists in both, linked to each other (hreflang); the
  `website` skill builds it, `/seo hreflang` checks it.

## 5 · The rhythm she can keep

Google does not reward a frequency; it rewards pages that are worth reading, and it penalises
many thin pages made to rank. So the cadence follows her review time, not ambition:
- **Launch:** the service pages plus 3 to 6 strong articles on day one, so the site never
  opens on "coming soon".
- **Then a fixed rhythm** sized to `plan.md`: for most solo founders, one article every one or
  two weeks, on a fixed day. Every article gets her real read before it goes out.
- **Once a month:** update an existing page (fix, extend, add a source). Only a real update
  moves its "updated" date.
- **Judge after 4 to 6 weeks,** never sooner.

## 6 · How we will know it works

Pick 3 numbers, written in `seo-plan.md`: impressions and clicks in Google Search Console
for the cluster questions, enquiries or free-offer sign-ups from organic visits, and whether
AI assistants name her for her pillar questions (re-checked monthly by `seo-checkup`).

## Templates

`docs/wiki/marketing/seo-plan.md`:
```markdown
---
title: SEO and AI-search plan
status: draft
updated: YYYY-MM-DD
sources: [business/audience.md, conversation YYYY-MM-DD, marketing/keywords.md]
---
# SEO and AI-search plan
## In one sentence
<what she wants to be found for, by whom, where>
## Topic clusters
| Cluster | Pillar question | Offer it leads to | Why winnable |
## Page map
| Page | Type | Question it answers | Cluster | Call to action | Status |
## Local
<yes/no, the places, Google Business Profile status>
## Languages
<which, and why>
## Rhythm
<launch set, weekly rhythm, monthly update day>
## How we measure
<3 numbers, where they come from, first check date>
## AI-search baseline (YYYY-MM-DD)
<questions asked, who was named, sources cited>
```

`docs/wiki/marketing/keywords.md`:
```markdown
---
title: Questions and keywords
status: draft
updated: YYYY-MM-DD
sources: []
---
| Question / phrase (their words) | Cluster | Source (client, PAA, forum, tool) | Volume (or "unverified") | Intent (learn / compare / buy) | Page |
```

## Specialists

- `researcher`: "For <business> in <country/language>, collect People-also-ask questions,
  autocomplete phrasings, forum and review wording, and what 2–3 AI assistants answer for
  <pillar questions>. Quote and link every item."
- `strategist`: "From audience, offer, positioning and the question list, propose 3–5 clusters
  with pillar, supporting questions and the offer each leads to; recommend which to start with."

## Done when

She recognises the clusters as her clients' questions, the page map is in the website
sitemap, the local and language decisions are written, and the rhythm fits her week. Then
`seo-plan.md` and `keywords.md` → `confirmed`, the Marketing & SEO checklist item 1 ☑ in
`state.md`, one `log.md` line, commit and push.

## Hand off

"You now know exactly which questions your website answers, and in what order." Then: no site
yet → "Next I suggest we design the website around this page map" (Website & design studio);
site exists → module 2, `seo-checkup` foundations.
