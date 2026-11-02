---
title: Lessons
status: confirmed
updated: YYYY-MM-DD
---

# Lessons: traps, so we fall into each one only once

**Rule:** when a mistake costs time, write `lessons/<what-happened-as-a-sentence>.md` the same day
(what happened · why · the rule now) and add a line here. If a skill or SOP could have
prevented it, add the check there too and name this lesson next to it. A rule with no story
behind it gets deleted, correctly.

## Ours
- (none yet)

## Inherited (learned the hard way on earlier projects; true here too)

**Working with the AI**
- **Work on a branch is not live.** A detailed write-up on a branch reads as shipped. Before saying
  "this is done", check it is on `live` and on the live site; `state.md` says which.
- **An agent saying "done" or "tests pass" is a claim, not a result.** Check the build output or open the page.
- **`git add -A` sweeps in junk and secrets.** Stage named paths only (the guard hook enforces it).
- **Every instruction pointing "do more" makes small jobs huge.** A colour change once produced a
  full development plan. The effort ladder in `CLAUDE.md` points down; obey it.
- **Two sessions can build the same thing.** Check `state.md` and the newest handoff before starting.

**Website**
- **One switch file decides what is live.** Keep launch switches (which pages and buttons show) in
  one config file, and read it before asserting a page is live.
- **A missing file can return 200.** A single-page app answers every unknown URL with the home page
  and status 200. Check `robots.txt`, `sitemap.xml` and redirects by their content, not their status.
- **A page with no own `<head>` inherits the home page's canonical and title.** Search engines then
  merge it into the home page. Every public page sets its own title, description and canonical.
- **Structured data makes claims.** A hardcoded credential, rating or award in JSON-LD is a public
  statement. Only state what is true for that page and that person.
- **A disclaimer does not change what software does.** If a quiz scores health, money or legal
  answers, it may be regulated whatever the small print says. Questions may inform; scoring and
  advice need a professional and a legal check.
- **Hover effects stick after a tap on phones.** Put hover transforms inside `@media (hover: hover)`.
- **`overflow-x: hidden` on a parent can break `position: sticky`.** Check sticky elements on a real phone width.
- **A font check can say "loaded" when the font never arrived.** Look at the rendered page or screenshot.
- **A percentage-height image grows once it loads.** Give image boxes a fixed aspect ratio.
- **Free hosting plans have limits that shape the code** (e.g. a cap on server functions). Check the
  plan's limits before adding one endpoint per form.

**Data**
- **Database errors are values, not exceptions.** With Supabase, always read `error`; a write that
  matched zero rows returns no error. Ask for `.select('id')` and treat zero rows as a failure.
- **Security is enforced in the database (RLS), not just the page.** A hidden button is not a lock.

**Copy and content**
- **No em dashes and no full stops in display headings**; they read as machine-written and heavy.
  Check copy before it ships (`content/check-copy.mjs`).
- **Copy is locked before the art.** Changing words after the image is built costs the image.
- **Judge motion from the video, not stills.** A still hides shimmer and timing problems.
- **A new image a page points to must be published with it.** Re-check images after every publish.
