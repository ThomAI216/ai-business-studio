# Marketing & SEO studio

**Purpose:** she is found and chosen: on Google, in AI answers (ChatGPT, Perplexity, Google AI
Overviews), and on the channels her clients use. **Owns:** `docs/wiki/marketing/*`.
**Needs first:** Business modules 2 (`audience.md`), 4 (`offer.md`) and 5 (`positioning.md`)
confirmed; module 7 (`plan.md`) helps. Missing? Follow the Coordinator's "out of order" rule.
**Specialists:** `researcher` (questions people ask, competitors' content, search demand),
`copywriter` (articles, page copy), `strategist` (channel choice), `critic` (claims check), the
`seo-*` agents of the SEO toolkit (audits), `builder` (fixes on the site).

## Two layers: the method and the toolkit

- **The method** (our skills, below): *what* to publish and *why*, written for her business.
- **The SEO toolkit** (`/seo` and the `seo-*` skills, claude-seo v2.5.0, MIT, vendored in
  `.claude/skills/`): the measuring instruments. Audits, schema, GEO, local, sitemaps, content
  briefs, keyword clusters. Nova runs them; she only sees the plain-language result.
  Runtime notes and when to use which command: `seo-checkup` skill.

## The playbook: six modules, in this order by default

| # | Module | Skill | Produces | Done when |
|---|---|---|---|---|
| 1 | The SEO and AI-search plan | `seo-strategy` | `marketing/seo-plan.md`, `marketing/keywords.md` | topic clusters she recognises as her clients' questions, a page map handed to the website sitemap, a cadence she can keep |
| 2 | Foundations on the site | `seo-checkup` (foundations) | fixes in `web/`, `marketing/seo-checks.md` | every public page passes the foundations checklist on the preview |
| 3 | Articles that answer | `article-writing` | articles in the site, `marketing/editorial-plan.md` | the first article is live, human-reviewed, with its free next step |
| 4 | Found by AI answers | `seo-checkup` (GEO) | `marketing/seo-checks.md` | GEO checks pass on the live site; brand facts consistent everywhere |
| 5 | Every article travels | `content-distribution` | `marketing/channels.md`, briefs for the Content studio | one article became posts on her two main channels |
| 6 | Measure and keep it healthy | `seo-checkup` (monthly) | `marketing/seo-checks.md` | Search Console connected (or a reason), a baseline, a monthly check in the calendar |

Track progress in `docs/wiki/state.md` (the Marketing & SEO line becomes a six-item checklist
when this studio starts). Modules 2, 4 and 6 need a website preview or live URL; before the site
exists, do 1, then go to Website & design, and come back.

## Rules every module follows

The Business studio's eight rules apply (look before you ask, one question, play back, options,
show don't tell, write it down, check facts, always a next step). Plus:
1. **Write for people first.** Every page and article answers a real question her client asks,
   in their words, better than the pages already ranking. No keyword stuffing, no density targets.
2. **Every claim is true and provable.** Structured data makes claims too. In a regulated field
   (health, finance, legal, therapy, coaching results), flag claims for her professional check;
   never promise outcomes.
3. **Every page ends on one free next step** (her entry offer, `business/offer.md`).
4. **AI-assisted, human-approved.** Nothing is published without her review; articles carry a
   short "drafted with AI, reviewed by <her>" note if she agrees (transparency builds trust).
5. **Toolkit output is evidence, not orders.** Translate findings into a short, prioritised fix
   list in plain words (what, why it matters, effort); she picks; specialists fix; re-check.

## Hands off to

- Module 1's page map → Website & design (`website` skill, sitemap in `docs/wiki/website/_index.md`).
- Module 5's post briefs → Content studio (`carousel`).
