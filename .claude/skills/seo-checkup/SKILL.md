---
name: seo-checkup
description: Marketing & SEO studio modules 2, 4 and 6 - check her website with the SEO toolkit and explain the result in plain words - foundations (titles, canonicals, sitemap, robots.txt, structured data, mobile, speed, images), being found by AI answers (GEO), local SEO, and the monthly health check with Google Search Console - then turn findings into a short fix list she chooses from (docs/wiki/marketing/seo-checks.md). Load when she says "check my site", "is my site good for Google", "why am I not on Google", "ChatGPT recommends my competitor", "SEO audit", "is my site ready to launch", "monthly check", "Search Console", or before any publish of new public pages.
---

# SEO checkup: the toolkit, in plain words

Follow the studio rules in `.claude/studios/marketing-seo.md`, especially rule 5: toolkit
output is evidence, not orders. She never sees raw scores or jargon, only what matters,
why, and what it costs to fix.

**Needs:** a preview link or the live URL (no site yet → do `seo-strategy`, then the
Website & design studio, then come back). **Output:** fixes on the site, and
`docs/wiki/marketing/seo-checks.md`.

## (a) Running the toolkit in a cloud session

The SEO toolkit (`/seo` and the `seo-*` skills, vendored in `.claude/skills/`) reads pages on
its own; many checks work by fetching and reading the page. Its Python tools (rendering,
PageSpeed, drift, Search Console) need a one-time setup per cloud session, which takes a few
minutes: tell her ("I'm setting up my measuring tools, about three minutes").

```bash
".claude/skills/seo/scripts/claude-seo" doctor --json    # ready? (changes nothing)
".claude/skills/seo/scripts/claude-seo" setup            # if not: own Python env + Chromium
".claude/skills/seo/scripts/claude-seo" setup --skip-browser   # if the browser download is refused
".claude/skills/seo/scripts/claude-seo" run <script.py> [args]  # how every toolkit script runs
```
- Setup builds an isolated Python environment and a headless browser **inside
  `.claude/skills/seo/`** (gitignored, rebuilt each cloud session). Needs Python 3.11 to 3.14
  and network access to `pypi.org`, `files.pythonhosted.org` and Playwright's browser
  download host. A refused host: name it to her and point to Network access in the
  environment settings; then use `--skip-browser` (pages are read without rendering).
- Her session may ask permission to run the setup. Explain in one line: "these are the SEO
  measuring tools included in your studio; they install only inside the project".
- Never `pip install` anything globally for the toolkit, and never run its scripts with a
  bare `python`: always through the launcher above.
- **Not yet proven end to end in a cloud session** (the template was vendored without
  running setup). The first time it runs, write what happened (time, any refused host) to
  `docs/wiki/lessons/` so the next session knows.

If setup fails, say so plainly, run the reading-based checks only, and mark the results
"partial: tools unavailable" in `seo-checks.md`. Never present a partial check as complete.

## (b) Which command for which question

| Her question | Module | Command |
|---|---|---|
| "Is this page OK for Google?" | 2 | `/seo page <url>` |
| "Is the site technically sound?" (crawling, indexing, speed, mobile) | 2 | `/seo technical <url>` |
| "Is the structured data right?" | 2 | `/seo schema <url>` |
| "Is the sitemap right?" | 2 | `/seo sitemap <url>` |
| "Are my images OK?" | 2 | `/seo images <url>` |
| "Why doesn't ChatGPT / Google AI mention me?" | 4 | `/seo geo <url>` |
| "Can AI agents use my site?" (llms.txt, agent access) | 4 | `/seo agentic <url>` |
| "Am I found locally / on Maps?" | 4 | `/seo local <url>` |
| "Check everything" (before launch, then quarterly) | 2–6 | `/seo audit <url>` |
| "Did anything break since last time?" | 6 | `/seo drift baseline <url>`, later `/seo drift compare <url>` |
| "What do my Google numbers say?" | 6 | `/seo google ...` once Search Console is connected (g) |

Run on the **preview link before publishing** new pages, and on the **live URL after**.

## (c) The foundations checklist (module 2)

Every public page, on the preview, before it goes live:
```
[ ] Its own title (≤ 60 chars, the question or the service + place) and description (≤ 155)
[ ] Its own canonical pointing at itself, on the final host (no redirect); never the home page's
[ ] One <head> per page: no duplicated title, description or structured data
[ ] One H1; headings in order; question-shaped where the page answers questions
[ ] robots.txt and sitemap.xml checked by their CONTENT and type, not the status code
    (a single-page app can answer any missing file with the home page and "200 OK")
[ ] Unknown URLs return a real 404, not the home page
[ ] Sitemap lists only real, finished, indexable pages; stubs and "coming soon" are noindex
[ ] Real dates (published, updated) that match what the page shows
[ ] Structured data only states what is true for this page and this person
    (credentials, reviews, prices, opening hours are public claims)
[ ] Mobile: readable at 390px, tap targets big enough, no sideways scroll
[ ] Fast: images compressed and sized, nothing heavy preloaded that the page does not use
[ ] Images: descriptive alt text naming what is shown (not "image", not keywords)
[ ] Internal links: every page reachable from the menu or another page; no orphans, no dead links
[ ] Social preview: a working share image, title and description
```
Finding a trap on her site that is not on this list → add it here and write a
`docs/wiki/lessons/` page the same day.

## (d) Being found by AI answers (module 4)

AI assistants quote pages that answer clearly and that they can trust. Check on the live site:
```
[ ] Answer-first: key pages and every article section open with a 1–2 sentence answer that
    stands alone (the article-writing standard)
[ ] One clear "what she does, for whom, where" passage on the home and about pages
[ ] Her facts are the same everywhere: name, business name, place, offer, contact, on the
    site, Google Business Profile, LinkedIn, Instagram, directories
[ ] Author and sources visible: who wrote it, real credentials, sources listed
[ ] Structured data: Organization or LocalBusiness, Person for her, sameAs links to her real
    profiles, FAQ from the article questions
[ ] Crawlable: real HTML content (not only after JavaScript), robots.txt allows the AI
    crawlers SHE chose to allow (her decision: allowing them means being quotable)
[ ] llms.txt: optional, nice to have, never a priority
[ ] Re-run the AI-answer baseline from seo-plan.md: who is named now?
```

## (e) Turning findings into a fix list

Never forward the report. Translate it:
1. Keep what affects her clients finding or trusting her; drop noise and duplicates.
2. Sort into **must** (blocks being found or is untrue), **should** (clear gain), **nice**.
3. For each: what, why it matters in one plain sentence, effort (minutes / an hour / a day),
   who fixes it (`builder` for the site, `copywriter` for words, her for accounts and decisions).
4. Show the list (an Artifact or a board for more than 8 items), recommend the first three, she picks.
5. Specialists fix on a branch; re-run the same command on the preview; show her before/after.
6. Anything that needs her (a profile, a photo, a decision about AI crawlers) goes to
   "Waiting on her" in `state.md`.

## (f) The monthly ritual (module 6)

Once a month, 15 minutes, when she says "monthly check" (or offer it if a month has passed):
`/seo drift compare <live url>`, Search Console numbers for the cluster questions, the
AI-answer baseline re-asked, one page chosen for an update. Report in five lines: what grew,
what dropped, one fix, one update, the next article. Log it in `seo-checks.md`.

## (g) Connecting Google Search Console (once, with her)

Plain steps, one at a time, waiting for "done" after each:
1. She opens search.google.com/search-console with the Google account she wants to own it.
2. "Add property" → **Domain** (covers every page) → Google shows a TXT record.
3. Verification: add that TXT record where her domain is managed (her registrar, or Vercel if
   the domain is there; `builder` can do it with the Vercel connector if she approves), then
   "Verify". If DNS is not possible, use the URL-prefix property with the HTML tag method;
   `builder` adds the tag to the site.
4. Submit `sitemap.xml` (the full URL) under Sitemaps.
5. For the toolkit to read her data, `/seo google` explains the credentials it needs. They go
   in the cloud environment's variables (environment settings → Edit), **never in a file,
   never in the chat**. Until then, she can read the numbers in Search Console herself and
   paste or screenshot them.
Data takes a few days to appear; judge changes after 4–6 weeks.

## Template: `docs/wiki/marketing/seo-checks.md`

```markdown
---
title: SEO checks
status: draft
updated: YYYY-MM-DD
sources: []
---
# SEO checks
| Date | URL | Command | Score (if any) | Top issues | Fixed | Next check |
## Open fix list
| Priority | What | Why it matters | Effort | Who | Status |
## Monthly notes
<date: what grew, what dropped, fix, update, next article>
```

## Specialists

- `seo-*` toolkit agents: spawned by the toolkit commands themselves; you read their reports.
- `builder`: "Fix <items> on branch <b> per SOP 01; re-run <command> on the preview; return before/after."
- `copywriter`: "Rewrite titles/descriptions/answers for <pages> per article-writing rules."
- `reviewer`: before publish, include the foundations checklist in the review.

## Done when

Module 2: every public page passes (c) on the preview. Module 4: (d) passes on the live site
and her facts match everywhere. Module 6: Search Console connected (or the reason it is not
written down), a drift baseline taken, the monthly check in her calendar. Each: ☑ in
`state.md`, one `log.md` line, commit and push.

## Hand off

"Your site is now easy for Google and AI assistants to read and to trust." Then the next
unchecked Marketing & SEO module, or the next article in the editorial plan.
