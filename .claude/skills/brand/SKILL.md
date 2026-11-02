---
name: brand
description: Build, record and apply the owner's brand identity — voice, wording rules, palette, type, imagery, logo — into docs/wiki/brand/ and into the code (motion tokens, website tokens). Load in the Website & design studio (after Business modules 2 and 5), whenever she shares a logo / old site / Instagram for her look, and BEFORE writing any public copy, slide or page.
---

# Brand: from her material to one source of truth

The brand lives in two wiki pages and flows into code from there:

```
docs/wiki/brand/voice.md    who we sound like: tone, signature phrases, words to avoid, copy rules
docs/wiki/brand/visual.md   how we look: palette, grounds, tints, type, imagery, logo, glass, never-do list
        ↓ applied by this skill
motion/src/brand/tokens.ts  slides and reels       (+ motion/scripts/tint-matrix.mjs)
web/ tailwind tokens        website, app, dashboard (once the website skill created web/)
content/image-bank.md       the style bar for plates
```

When pages and code disagree, the **wiki wins** and the code is regenerated from it.
Every value stays `status: draft` until she says yes; then `confirmed`.

## 0 · Before you start
Read `docs/wiki/business/positioning.md` and `audience.md` (the brand expresses the
positioning; without them you are decorating). If they are `empty`, run
Business studio modules 2 (`customer-research`) and 5 (`positioning`) first, or at least positioning.

## 1 · Gather what exists (do not ask what you can see)
Ask her for, in one message: her logo (any format), 3 to 9 screenshots of her Instagram
grid or posts, her current website link, and 3 to 5 brands or accounts she loves the look
of (any industry). They go to `inbox/`; run `intake` / `media-reading` on them.
Then extract, citing the `raw/` file for each:
- **colours actually used**: sample hex values from her screenshots and logo (open the
  image, read the dominant and accent colours; for exact values, crop and check pixels
  with a short Python/PIL script). Name each: ground, ink, accent.
- **type**: serif or sans, weight, how headlines feel; identify the closest free Google /
  @fontsource family pair (one display, one body). Never more than two families.
- **imagery**: photo / illustration / texture, light (soft, hard, dark, airy), people or not.
- **voice**: from her captions and past conversations: person (I / we / you), formality,
  sentence length, words she repeats, emoji habits, language(s).

## 2 · Interview what you cannot see (max 3 questions per message)
Plain words, each with a recommended answer:
1. "Three words people should feel when they see your page?" (offer 3 options from her material)
2. "Anything you never want to look or sound like?" (a competitor style, a colour, a tone)
3. "Should it feel more like [direction A] or [direction B]?" with screenshots, never abstract.
Then languages, formal/informal address, and whether her name or a brand name signs the posts.

## 3 · Show, don't ask: 2 or 3 directions
Never ask "which hex do you like?". Build 2 to 3 named directions (e.g. *Warm editorial*,
*Clean clinical*, *Bold modern*), each a real palette + font pair + plate family + voice
sample, and **render them**: set the tokens, run
`cd motion && npm install && node export-stills.mjs Example`, and show her one still per
direction (the `designer` agent can produce these in parallel, one direction each, with
disjoint output folders). She picks one or mixes ("A's colours with B's type").

## 4 · Write the wiki (draft → she confirms)
`voice.md` sections: Tone (3 words + what they mean in practice) · Person and address ·
Signature phrases (use them) · Words we avoid · Copy rules (default: no full stops in
display copy, no em dashes, the seam as the only emphasis, max 7 items in a list, no
italic or bold for emphasis unless she wants it) · Per channel (Instagram, LinkedIn,
website, email) · Examples: 3 good lines, 3 bad lines rewritten.

`visual.md` sections: Palette (name · hex · job: ground / ink / accent / mark) · Grounds
(which are light, which dark) · Tints and their inks per ground (paste the tint-matrix
output) · Type (display, body, mono; weights allowed; sizes) · Imagery (style bar for
COVER and GROUND plates, 2 reference images each) · Logo (files in `raw/`, clear space,
which version on which ground) · Glass and texture (yes/no, where) · Never do (list).
Read both back to her as a 5-line summary; on her yes, set `status: confirmed`.

## 5 · Apply to code
1. `motion/scripts/tint-matrix.mjs`: set `HUES` (her accents as drawn) and `GROUNDS`;
   run it; paste the printed `TINTS` block into `motion/src/brand/tokens.ts`.
2. `tokens.ts`: `GROUNDS`, `LIGHT_GROUNDS`, `INK` (check each with `src/lib/contrast.ts`:
   body ≥ 4.5, title ≥ 3.0, the muted title half ≥ 3.0), `FONTS`, `BRAND.name`.
3. Fonts: `npm install @fontsource/<display> @fontsource/<body>`, swap the imports and
   `FAMILIES` in `motion/src/brand/fonts.ts`, remove the old packages.
4. Logo: if she has a single-colour logo, save a transparent PNG **alpha mask** in
   `motion/public/logo/mark.png` and set `BRAND.logoMask`. A mask takes any ink on any
   ground: never make one PNG per colour.
5. Render all example stills, look at every one (contrast on the FINISHED frame, not the
   token: a veiled plate can turn a dark ground into a mid ground), show her.
6. Website: when `web/` exists, the `website` skill maps the same values into its
   Tailwind theme. Same names, same hexes: one brand, every surface.

## Tint × ground, in one paragraph (teach it to her if she asks why)
A slide makes ONE colour decision, `<SlideTint tint ground>`. The tint is not one colour:
a yellow that glows on a dark ground is invisible on a light one, so every tint has one
ink per ground, generated to stay readable. The ground also decides whether type is light
or dark. That makes mismatched accents and dark-on-dark titles impossible by construction.
Choose tint and ground per slide by the FEELING of the topic (calm, energy, warmth,
gravity) and record that mapping as a small table in `visual.md`.

## Rules
- Never invent brand facts: unknown stays unknown and becomes a question.
- Never copy another brand's logo, name, wording or exact palette; take the principle.
- A rule without a reason gets deleted: log each brand decision in
  `docs/wiki/decisions/_index.md` with why and who decided.
- After this skill: update `docs/wiki/state.md` (brand ☑ in the map, or what is waiting on her),
  append `docs/wiki/log.md`, commit and push.
