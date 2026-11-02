# SOP 01: New page or surface

**When:** a new page, a new section of a page, a new dashboard screen, a changed route,
a launch switch flipped.
**Tier:** T2 if it is public or new; T1 for a change inside an existing page.
**Specialists:** `copywriter` (words) → `designer` + `builder` (page) → `verifier` → `reviewer`.

## Before building

1. **Copy first.** The words are agreed with her (or marked draft) before layout starts.
   Changing words after the design is built costs the design.
2. Read `docs/wiki/website/_index.md` (sitemap, stack) and `docs/wiki/brand/visual.md`.
3. Every page closes on the **standard offer** (`docs/wiki/business/funnel.md`).

## Building

- **Mobile first.** Build at 390px wide, then widen. Most visitors are on a phone.
- **Own `<head>` on every public page:** title (under 60 characters), description
  (under 160), canonical URL, social image. A page without them inherits the home page's,
  and search engines merge it into the home page.
- Articles and FAQs use **question-shaped sections**: the heading is the question, the first
  sentences answer it on their own.
- **Launch switches** live in one config file (`web/config/launch.ts` or the file the wiki names).
  A page that is built but not launched is switched off there, not deleted or hidden ad hoc.
- New routes go in the sitemap and, if public, are linked from somewhere a visitor can reach.
- Images: compressed, fixed aspect ratio, alt text. Hover effects inside `@media (hover: hover)`.

## Gates

- [ ] Copy agreed (or clearly marked draft for her to review)
- [ ] Own title, description, canonical
- [ ] Launch switch set deliberately (on or off), and the wiki says which
- [ ] `npm run build` in `web/` passes: raw exit code and log
- [ ] **Screenshots at 390px and 1440px**, looked at by you, before saying done
- [ ] Links on the page open the right place (click them in the preview)
- [ ] Branch pushed; **preview link sent to her** with one line on what to look at
- [ ] `docs/wiki/website/_index.md` (or `app/_index.md`) updated: the page, its status, its route

## What "done" means to her

A link she can open on her phone, and a sentence on what changed. Not a file list.
It is **not live** until SOP 03 has run and she said "publish".
