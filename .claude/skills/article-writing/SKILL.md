---
name: article-writing
description: Marketing & SEO studio module 3. Write, review and publish articles that answer her clients' real questions so well that Google and AI assistants quote them - question-shaped sections with standalone answers, a small closed set of blocks, a narrative opening, real sources, her human review, and her free next step at the end. Also keeps the editorial plan (docs/wiki/marketing/editorial-plan.md). Load when she says "write an article", "blog", "blog post", "guide", "I want to write about", "content for my website", "update this article", "what should I publish this week", or when the seo-plan rhythm says an article is due.
---

# Article writing: answers worth quoting

Follow the studio rules in `.claude/studios/marketing-seo.md`. This skill adds the article
standard and the pipeline. An article that does not follow the standard is not finished.

**Inputs:** `marketing/seo-plan.md` and `keywords.md` (which question, which cluster),
`brand/voice.md`, `business/audience.md` (their words), `business/offer.md` (the free next step).
**Output:** the article in the articles folder the website skill set up (recorded in
`docs/wiki/website/_index.md`), its sources in `docs/wiki/marketing/references.md`, its row
in `docs/wiki/marketing/editorial-plan.md`.

## 1 · The shape of an article

```
title          the question the whole article answers, in searchers' words (≤ 60 characters)
one-liner      one sentence under the title (it is also the meta description, ≤ 155 characters)
takeaways      3 to 5 sentences that answer the title with no page around them
intro          2 or 3 short paragraphs: a situation the reader recognises ("you"), why it is confusing, what the article walks through
sections[]     the questions, in the order a reader would ask them
next step      her free entry offer, in the same words every time
sources        numbered
```

Each section: a **question** (real, ends in "?", unique to this article, typed the way a
person would search it), an **answer** (one or two sentences that answer it completely on
their own), then the depth, built only from the blocks below.

**The rule that is not negotiable: every answer survives being quoted with nothing around
it.** That is what an AI assistant lifts and what becomes the FAQ in the page's structured
data. Test: read only the question and the answer aloud. If a stranger understands it, it
ships. If not, fix the question, never skip the answer.

The visible subheading may be a short statement instead of the question (a page that reads
"question, question, question" tires people); the questions and their answers then appear in
a folded "Quick answers" recap at the end, which is also the FAQ. Same facts either way.

## 2 · The closed set of blocks

Nothing in an article is styled ad hoc. If a block does not fit one of these, the section is
wrong, not the set. Adding a block type is a decision she makes once, recorded in
`docs/wiki/decisions/`, then built into the site's article components.

| Block | Use it for | Never for |
|---|---|---|
| **Answer** | the standalone answer of the section (mandatory) | a teaser ("read on to find out") |
| **Prose** | explanation, one paragraph per block | three paragraphs crammed in one |
| **Steps** | something the reader can do today, in order, without buying anything | information they cannot act on |
| **Comparison** | "it depends which": two or three columns | cards that are really a table |
| **Example** | a concrete case: a real one (with consent) or clearly marked as illustrative | invented testimonials |
| **Quote** | a named expert or client, approved wording, with their agreement | anonymous "experts say" |
| **Myth vs fact** | a belief the article corrects, with its source | strawmen |
| **Checklist** | a reader's self-check of facts (not a scored quiz, see §5) | scores, levels, diagnoses |
| **Figure** | a diagram to be read: alt text says what it shows, caption says what to take from it | decoration |
| **Next step** | her free entry offer, closing the article | a second competing offer |

## 3 · Writing rules

- **Her voice** (`brand/voice.md`), calm and specific. No hype words, no "secrets", no urgency
  tricks, no em dashes, no full stops in headings.
- **Claims carry sources.** Every number, mechanism or study gets a numbered source `[n]`. No
  source: soften the claim to what she has seen in her work, and say so.
- **Length follows the question.** No word-count target; Google has none. A thorough answer to
  a real question usually lands between 1 000 and 2 500 words; a narrow one can be shorter.
- **Author box: true facts only.** Her real name, real qualifications, real experience. Every
  credential in the visible page AND in the structured data is a public claim: true for this
  person, or removed.
- **Optional expert reviewer.** A named professional who really reviewed THIS version may be
  shown as "Reviewed by <name, title>, <date>", with written agreement; a substantial update
  needs a new review or the label comes off. Disclose if the review was paid.
- **Dates are real.** Show the publication date; "updated" moves only after a real update.

## 4 · AI-assisted, human-approved

Every article is drafted with AI and **reviewed by her** (or her named editor) against its
sources before it goes out. Record the review (who, date) in the editorial plan; nothing
unreviewed is published. With her agreement, add one small line under the sources:
"Researched and drafted with the help of AI, checked against its sources, and reviewed by
<her name>." This is honest, builds trust, and in the EU a real human review with someone
holding editorial responsibility is what removes the need for a formal AI label on public
information texts. The note is only true if the review really happened.

## 5 · Regulated fields: inform, never diagnose, score or promise

If her field touches health, money, law, therapy or results (coaching, fitness, nutrition,
finance, legal, beauty):
- The article informs. It never diagnoses, never tells a reader they have a condition, never
  promises an outcome, never replaces a professional.
- A quiz or checklist may show questions; the page never scores, ranks or interprets the
  answers ("your level", "your risk"). Software that interprets health answers can become a
  regulated medical device whatever the disclaimer says. Where a result would cross the line,
  the page says "talk it through with <her> on a free call" instead.
- Safety lines are shown to everyone ("see a doctor / an advisor if..."), never triggered by answers.
- Flag anything uncertain for her professional check; `critic` runs the claims check.

## 6 · The pipeline: roles and gates

```
1 Brief ─ 2 Research ─[Gate A: every claim has a source] ─ 3 Draft ─ 4 Claims check
─[Gate B: wording, safety, true credentials] ─ 5 Her review ─[Gate C: her yes] ─ 6 Publish ─ 7 Distribute ─ 8 Monitor
```

| # | Who | Does | Must not |
|---|---|---|---|
| 1 | Nova + toolkit | `/seo content-brief <question>`: title, one-liner, headings in searchers' words, internal links (pillar + 2 siblings), what the top results miss | stuff keywords; promise in the title what the article cannot deliver |
| 2 | `researcher` | sources, best first (official guidance, primary studies, recognised bodies), each finding written from the source itself, added to `references.md` | use blogs, vendor pages or press as evidence; record what the source does not say |
| 3 | `copywriter` | the article in the standard above, in her voice | write a section without its answer; style ad hoc; invent stories |
| 4 | `critic` | claims check: each claim ↔ a source, regulated-claims line, credentials true | wave through "guaranteed", "cures", "the best" |
| 5 | **her** | reads it on the preview link, corrects, says yes | (nobody else signs for her) |
| 6 | `builder` | publishes per SOP 01 / 03: own title, description, canonical, real date, FAQ + Article structured data from the questions | publish without her yes; `git add -A` |
| 7 | → `content-distribution` | the posts that point back to it | |
| 8 | `seo-checkup` | after 4–6 weeks: which searches it appears for, title tweak or new article ideas | change the date without a real update |

When a source is corrected, correct it everywhere at once: `references.md`, the article's
source list, and any post that used it. Fixing one copy lets the old one come back later.

## 7 · Checklist before it ships

```
[ ] Every section: a real question and an answer that stands alone when quoted
[ ] Questions unique to this article, in searchers' words
[ ] Takeaways answer the title in 3 to 5 sentences
[ ] Only blocks from the set; prose one paragraph per block
[ ] Every number, mechanism or study has a source; sources listed
[ ] Regulated field: no diagnosis, score or promise; safety line shown to everyone
[ ] Author and reviewer facts true, in the page and in the structured data
[ ] Her free next step closes the article
[ ] No em dashes; copy checker clean (`node content/check-copy.mjs`)
[ ] She reviewed it (who, date recorded); AI note added if she agreed
[ ] Own title, description, canonical; real date; checked on phone width
```

## Template: `docs/wiki/marketing/editorial-plan.md`

```markdown
---
title: Editorial plan
status: draft
updated: YYYY-MM-DD
sources: [marketing/seo-plan.md]
---
# Editorial plan
Rhythm: <e.g. one article every other Tuesday; monthly update on the first Monday>
| Article | Cluster | Question it answers | Status (idea · brief · draft · in review · live · update due) | Reviewed by, date | Publish date | URL |
```

`docs/wiki/marketing/references.md`: `| # | Source (title, author, year, link) | What it says (from the source itself) | Used in |`

## Done when

The first article is live: standard followed, checklist green, her review recorded, free next
step in place, editorial plan current. Then module 3 ☑ in `state.md`, one `log.md` line,
commit and push. After that, each article is one row moving through the plan.

## Hand off

"Your first article is live, and it answers a question your clients really ask." Then: "Next I
suggest we turn it into posts for your two main channels. Shall we?" → `content-distribution`.
