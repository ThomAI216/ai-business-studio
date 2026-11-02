---
name: web-design
description: Website & design studio modules 3 and 4. Design her pages before building them, the way a good agency does - two or three directions as real mockups she can look at, the approved mockup becomes the spec, then the design system in code (tokens and components), phone first, accessible, checked in a real browser. Load before any new page, layout or restyle, when she says "make it look better", "I don't like the design", "show me options", "how will my homepage look", "make it more modern / warmer / more premium", or when a builder is about to invent a layout without an approved mockup.
---

# Web design: see it, choose it, then build it

She cannot read code and should never have to imagine a design from words. Every visual
decision is made on something she can **look at**. The approved mockup is the spec: the
builder matches it, and anything not in it is a question, not an improvisation.

Follow the studio rules (`.claude/studios/website-design.md`). Inputs: `brand/visual.md` and
`brand/voice.md` (from the `brand` skill), the page list in `website/_index.md`, the journeys
in `website/journeys.md`, the page's job and call-to-action from `business/product-spec.md`.

## The tools (vendored, see `.claude/skills/VENDORED-DESIGN.md`)

| Need | Skill |
|---|---|
| A look with intent, not the generic AI template (type, layout, character) | `frontend-design` |
| Style, palette, font-pairing and UX-rule lookups for her kind of business | `ui-ux-pro-max` (`python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<query>" --design-system`) |
| Logo concepts, banners, social images, icons, identity sets | `ckm-design` (image generation needs `GEMINI_API_KEY`; optional) |
| Real-browser checks and screenshots | `webapp-testing` (Playwright is preinstalled; never `playwright install`) |

Use them as advisers: their suggestions go through her brand pages and her taste, never
straight into the site.

## Module 3 · Directions and mockups

1. **Classify the surface.** Marketing page (expressive, story, one call-to-action), product
   screen (dashboard, client area: density, clarity, states first), document or email (print
   and inbox rules). The rules differ; say which one you are designing.
2. **Look at what exists first.** Her approved pages and mockups (`docs/design/mockups/approved/`)
   are the reference for rhythm, spacing and tone. A new page should feel like the best
   existing one, not like a new invention.
3. **Two or three directions, never one, never six.** Each direction is a named idea
   ("Calm and editorial", "Warm and personal", "Bold and modern") built as a real page: her
   real copy (from `copywriter`, approved words, never lorem ipsum), her palette and fonts, real
   or clearly placeholder images. Use `frontend-design` for character and `ui-ux-pro-max` to
   ground choices in what works for her type of business.
4. **Make them viewable.** Publish each as an Artifact if this session has the tool;
   otherwise a self-contained HTML file in `docs/design/mockups/YYYY-MM-DD-<page>-<direction>.html`
   (inline CSS, no external scripts), screenshot it at 390px and 1440px, and show her the
   screenshots side by side. Phone view first: most of her visitors are on a phone.
5. **Ask one question**: "Which one feels most like you? You can also mix, like A's colours
   with B's layout." Note what she likes and dislikes in her words; that is design feedback.
6. **Iterate on one direction**, one round at a time, until she says "yes, this one".
   Then copy the final file to `docs/design/mockups/approved/<page>.html` and record it in
   `docs/wiki/website/design-system.md`. **From now on, that file is the spec.**

## Module 4 · The design system in code

Once the first page is approved (usually the homepage), turn it into a system before page two:
- **Tokens only.** Colours, fonts, sizes, spacing, radii, shadows live in one place
  (`web/app/globals.css` variables and the Tailwind theme). Components use token names, never
  a hex value or a one-off pixel size. A new value needs a reason and her OK (it is a brand
  decision).
- **A brand accent is often not a text colour.** Many accents fail 4.5:1 contrast as text on a
  light background; use them for lines, dots, big numbers and buttons with dark or white text,
  and make a darker variant for accent text. Measure, do not guess.
- **Two font families at most**, loaded from the project (fontsource or next/font), with a
  system fallback.
- **The component list** goes in `website/design-system.md`: button, link, card, section,
  heading scale, form field, navigation, footer, the page's closing call-to-action, and the
  article blocks. Reuse before inventing a parallel one.
- **States are part of the design**: every list and form has an empty, loading, error and
  long-content state. An empty state says what will appear and how to get it.

## Rules that came from real mistakes

- **Hover sticks after a tap on phones.** Put hover effects inside `@media (hover: hover)`.
- **Images grow after they load** when sized in percent. Give every image box a fixed aspect
  ratio and real `width`/`height`.
- **`overflow` on a parent can silently break `position: sticky`.** Check sticky and pinned
  elements at 390px in a real browser.
- **A wrapper becomes the grid item.** An animation or link wrapper around a card is what the
  grid sees; put grid rules on the wrapper.
- **Fade a stack as one layer.** Fading each card of an overlapping stack shows the cards
  behind through the top one.
- **A section that slides over another needs a soft edge**, or a hard line appears where the
  grounds meet.
- **Layout changes at the breakpoint need their own overrides.** A desktop-only rule written for
  a row breaks the same element when it stacks into a column.
- **Rows with separators ("12 weeks · 4 people") break when they wrap**: allow the wrap or drop
  the separators on small screens. A 2 × 2 grid needs an even number of items.
- **Text that must fit a width: measure the text, not its box** (a no-wrap box hides overflow).
- **A font check can say "loaded" when the font never arrived.** Confirm on the screenshot.
- **Motion with restraint**: one or two purposeful movements per page, respect
  `prefers-reduced-motion`, and never animate the text she needs to read.

## Accessibility floor (every public page)

AA contrast measured on the real background (including text over images), visible keyboard
focus, tap targets of at least 44px, a label on every form field, alt text that names the
subject on meaningful images (empty alt on decoration), headings in order, the page usable
at 200% zoom, no information carried by colour alone.

## Check it in a real browser before she sees it

Use `webapp-testing` (or the `qa-tester` agent for a full journey):
- Screenshots at **390px and 1440px**, full page. Turn off smooth scrolling and wait for
  reveal animations to finish before capturing, or the screenshot shows half-faded sections.
- Look at every screenshot yourself: alignment, overflow, contrast, the call-to-action visible.
- Console errors: zero. Broken images and links: zero.
Screenshots go to `web/.screens/` (gitignored). A passing build is not a design check.

## Specialists

- `designer`: "Build direction <name> for <page> as a self-contained mockup in
  `docs/design/mockups/`, from `brand/visual.md` and the copy in <path>; screenshots at 390/1440."
  (One designer per direction, in parallel, disjoint files.)
- `ux-designer`: "Sketch the layout and flow of <page> for the journey <name> in
  `website/journeys.md`: sections in order, what each must achieve, the form fields."
- `copywriter`: the words, approved before the design round.
- `qa-tester`: "Walk <journey> on the preview at 390 and 1440; report with screenshots."

## Done when

Module 3: an approved mockup for the page, stored in `docs/design/mockups/approved/`, recorded
in `website/design-system.md`. Module 4: tokens and the component list in code and on that
page; the approved homepage rebuilt from them matches its mockup at 390 and 1440.
Update `docs/wiki/state.md` (Website & design module ☑), one `log.md` line, commit and push.

## Hand off

"Your homepage design is approved; it's now the blueprint for every page. Next I suggest we
build it for real, so you can open it on your phone. Shall we?" → `website` (module 5).
