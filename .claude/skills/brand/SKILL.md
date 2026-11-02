---
name: brand
description: Website & design studio module 1. Build, record and apply her brand - strategy first (purpose, values, personality, promise), then voice and the visual identity (palette, type, imagery, logo) - into docs/wiki/brand/ and into the code (website tokens, motion tokens). Load after Business modules 2 and 5, whenever she shares a logo, old site or Instagram for her look, when she says "my brand", "logo", "colours", "fonts", "what should my brand look like", "rebrand", and BEFORE writing any public copy, slide or page.
---

# Brand: strategy first, then the look, then one source of truth

The brand lives in two wiki pages and flows into code from there:

```
docs/wiki/brand/voice.md    who we are and how we sound: purpose, values, personality, tone, words
docs/wiki/brand/visual.md   how we look: palette, type, imagery, logo, never-do list
        ↓ applied by this skill
web/ tokens                 website, app, dashboard (globals.css variables + Tailwind theme)
motion/src/brand/tokens.ts  slides and reels (+ motion/scripts/tint-matrix.mjs)
content/image-bank.md       the style bar for images
```

When pages and code disagree, the **wiki wins** and the code is regenerated from it. Every
value stays `status: draft` until she says yes; then `confirmed`. Studio rules:
`.claude/studios/website-design.md`.

## 0 · Before you start
Read `business/positioning.md`, `audience.md` and, if it exists, `business/vision.md`. The
brand expresses the positioning to that audience; without them you are decorating. If they
are `empty`, run Business modules 2 (`customer-research`) and 5 (`positioning`) first.

## 1 · Strategy first (picking colours before this is the classic brand mistake)
Mostly drafted by you from her business pages, confirmed by her, one question at a time:
- **Purpose**: why the business exists beyond money, in one sentence of her words.
- **Three values**, each with one sentence of what it looks like in practice ("Clarity: every
  client leaves a session with one written next step"). Three, not five.
- **Personality**: "if your business walked into a room, how would people describe it?" Place
  it on a few plain scales (serious or playful, formal or relaxed, quiet or bold, classic or
  modern, warm or cool) and write three to five sentences. This is the filter for every
  later choice: "would this person say it like that, dress like that?"
- **The promise**: what a client can count on, every time. A tagline only if one falls out
  naturally; never force it.
- Check against the audience: the brand must appeal to her clients, not only to her.

## 2 · Gather what exists (do not ask what you can see)
Ask in one message for: her logo (any format), 3 to 9 screenshots of her Instagram or posts,
her current website, and 3 to 5 brands she loves the look of (any industry). They go to
`inbox/`; run `intake` / `media-reading`. Then extract, citing the `raw/` file each time:
- **colours actually used**: dominant and accent hex values (crop and read pixels with a small
  Python/PIL script for exact values); name each: ground, ink, accent.
- **type**: serif or sans, weight, feel; the closest free font pair (one display, one body).
- **imagery**: photo, illustration or texture; light; people or not.
- **voice**: from her captions and messages: I / we / you, formality, sentence length,
  repeated words, emoji habits, languages.

## 3 · Voice and tone
Three voice words, and for each one thing she always does and one thing she never does. Tone
shifts by context while the voice stays: website (clear, benefit first), social (closer,
conversational), emails (personal), error and form messages (calm, helpful, never blaming),
success moments (warm). Write the same message twice, generic and in her voice; the contrast
teaches everyone, including the copywriter.

## 4 · Show, don't ask: two or three visual directions
Never ask "which hex do you like?". Build 2 to 3 named directions that each fit the
personality, each with a real palette, a font pair, an image style and a voice sample:
- Ground the candidates with `ui-ux-pro-max` (`python3 .claude/skills/ui-ux-pro-max/scripts/search.py
  "<her business type> <personality words>" --design-system`) and give them character with
  `frontend-design`. Palettes: a primary, a secondary, two or three neutrals (avoid pure black
  and pure white), and one functional colour for alerts. Check every text colour for 4.5:1
  contrast on its ground.
- **Logo**: if she has none, start with a clean **wordmark** in the display font (works small,
  in one colour, on light and dark). For concepts beyond that, use `ckm-design` (generation
  needs `GEMINI_API_KEY`; without it, produce a design brief and HTML/SVG concepts).
- **Render them** so she sees them: one website hero section per direction (a mockup via the
  `web-design` skill, as an Artifact or `docs/design/mockups/`) and, if she wants social
  content, one slide per direction (`cd motion && npm install && node export-stills.mjs Example`
  after setting the tokens). The `designer` can build directions in parallel, one each.
She picks one or mixes ("A's colours with B's type"). Record what she rejected and why.

## 5 · Write the wiki (draft, then she confirms)
`voice.md`: Purpose · Values (with practice) · Personality · Promise · Voice words with
always/never · Tone by context · Person and address · Signature phrases · Words we avoid ·
Copy rules (default: no em dashes, no full stops in display headings, max 7 items in a list)
· Per channel · Examples: 3 good lines, 3 bad lines rewritten.

`visual.md`: Palette (name · hex · job · text-safe or not) · Grounds (light, dark) · Type
(display, body, weights, size scale) · Imagery (style bar, 2 reference images) · Logo (files in
`raw/`, clear space, which version on which ground, smallest size) · Motion feel · Never do.
Read both back as a five-line summary; on her yes, `status: confirmed`. Log each brand
decision in `docs/wiki/decisions/_index.md` with why and who decided.

## 6 · Apply to code
1. **Website** (when `web/` exists): the `designer` maps the palette, fonts, radii and spacing
   into `web/app/globals.css` variables and the Tailwind theme (the design-system module of
   `web-design`). Same names, same hexes as `visual.md`.
2. **Motion**: set `HUES` and `GROUNDS` in `motion/scripts/tint-matrix.mjs`, run it, paste the
   `TINTS` block into `motion/src/brand/tokens.ts`; set `GROUNDS`, `INK` (check with
   `src/lib/contrast.ts`: body ≥ 4.5, titles ≥ 3.0), `FONTS`, `BRAND.name`; install the two
   `@fontsource` packages and swap them in `motion/src/brand/fonts.ts`.
3. **Logo**: a single-colour logo becomes a transparent alpha mask (`motion/public/logo/mark.png`,
   `BRAND.logoMask`): one mask takes any colour on any ground; never one file per colour.
4. Render and look: contrast is judged on the finished screenshot or frame, not on the token.

## The brand check (run before anything public ships)
Only brand colours and fonts · the tone fits the context · images match the style bar · the
logo follows its rules · it sounds like the personality. One off-brand page undoes ten good ones.

## Rules
- Never invent brand facts: unknown stays unknown and becomes a question.
- Never copy another brand's logo, name, wording or exact palette; take the principle.
- A rule without a reason gets deleted.

## Done when
Both pages `confirmed`, tokens applied wherever code exists, the direction she chose and the
ones she rejected recorded. Then `docs/wiki/state.md` (Website & design module 1 ☑), one
`log.md` line, commit and push. Next: "Now let's map the pages and the paths people take
through your site." → module 2 (`website` §plan with the `ux-designer`).
