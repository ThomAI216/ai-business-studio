---
name: carousel
description: Produce or edit an Instagram / LinkedIn carousel or reel — topic in, approved slides and caption out — with the motion/ engine. Load whenever she wants a post, wants to change words / colours / images on a slide, or asks for a video version. Requires the brand skill's pages (docs/wiki/brand/).
---

# Topic → published carousel

The reproducible process. Brand rules: `docs/wiki/brand/voice.md` + `visual.md` (if they
are `empty`, run the `brand` skill first, or say clearly that this post uses the neutral
template look). Engine: `motion/` (README there). Laws and their reasons:
`content/decisions.md`. Each post gets a folder `content/carousels/<YYYY-MM-DD>-<slug>/`
with a `brief.md` (sections in `content/README.md`).

**Copy is locked before art, always.** Words are expensive to change later; images and
motion are cheap to redo.

## Delegation (T2: a post is public)
- `copywriter`: the arc and the copy (phase 1), the caption (phase 6)
- `content-producer`: composing slides in `motion/`, renders, video (phases 3 to 5)
- `media-analyst`: if she points at a reference post or video (via `inspiration`)
- `researcher`: if a slide states a fact or a number: every claim gets a source in `brief.md`
- `reviewer`: before she sees the final set (copy law, contrast, claims, brand)
You keep the conversation with her and the approvals.

## Phase 1 · CONTENT: the arc (no design yet)
Input: a topic, a draft, or a brainstorm she pasted. Write in `brief.md`:
- `## Job`: who it is for (from `business/audience.md`) and the ONE feeling or shift the post must leave
- `## Arc`: per slide, what it DOES (hook · claim · reframe · example · list · proof · next
  step), never just what it says. Shape: COVER (feeling, stop the scroll) → argument slides
  alternating light and dark grounds (the dark one is the pivot: the slide whose content
  IS the shift) → CLOSER (the point + one small next step). 5 to 9 slides; 7 is a good default.
- `## Copy`: per slide `eyebrow / title (with its seam) / body / closing`. One idea per
  slide. Max 7 items in any list. The title has a seam: break the line on it, mark the lit
  half `**like this**`. No full stops, no em dashes.
Run `node content/check-copy.mjs` and show her the copy as plain text, slide by slide.
**Gate: she approves the copy.** Mark `## Status: copy locked (date)`.

## Phase 2 · BACKGROUNDS: the plates
- Default: the CSS gradient plates (`bloom`, `shaft`, `dunes`): no files, always on-brand.
- Cover and closer deserve the most beautiful image of the deck (the COVER family);
  inner slides stay sober (GROUND family). Max 3 photographic images per deck; the closer
  may reuse the cover as a different crop (bookending).
- Source order: `content/image-bank.md` first → her own photos (from `raw/`) → generate
  only for gaps with `content/prompts.md` recipes (if an image generation connector such
  as Higgsfield is connected; otherwise ask her for images or stay on gradient plates).
  Always text-free. Bank every keeper with its source and licence.
- Photo plates go through `Backdrop` with a veil (light plate 0.55 to 0.72, dark plate
  0.35 to 0.55) and blur ~12.6 if they carry sharp detail.

## Phase 3 · COMPOSE: tint × ground, then type
- Per slide choose ONE `<SlideTint tint ground>` by the feeling of that slide (mapping
  table in `brand/visual.md`). The ground decides light or dark type automatically.
- Reuse a registered type from `content/post-types/` (start: cover · argument-cards ·
  closer, in `motion/src/slides/Example.tsx`). For a post, prefer a **scene document**:
  `motion/scenes/<slug>.json` validated by `src/scene/schema.ts`, registered in
  `Root.tsx` like `Scene-*`. A new visual shape becomes a new slide component with its own
  zod schema, and later a numbered type.
- Slide files own only their picture; eyebrow, title, body, closing and wordmark come
  from `Chrome.tsx`. Every number comes from `tokens.ts` or `lib/motion.ts`.

## Phase 4 · MOTION (only for a reel or an animated carousel)
Grammar from `motion/src/lib/motion.ts`: springs not curves, deceleration only, tight
staggers (BEAT), calm → burst → hold. The graphic waits for the body copy (~2s); the
closing line lands after the graphic; then hold ~3s (the poster frame). Leave empty
space for the motion. Anything that settles, stops: continuous drift only for things
that ARE unstable. Never move a plate under type.

## Phase 5 · RENDER, CHECK, APPROVE
```bash
cd motion && npm install                      # once per session
node export-stills.mjs <IdPrefix>             # settled stills, never frame 0
node export-video.mjs <CompositionId>         # only after the stills are approved; crf 12
node ../content/check-copy.mjs
```
Before showing her: open every still yourself; check body text ≥ 4.5:1 and title ≥ 3:1
**on the finished frame** (sample the pixels behind the text when a plate is involved);
view the deck as a strip (all slides side by side, e.g. an ffmpeg `hstack` or `tile`
into one PNG) to check rhythm. Show one still per slide for approval; burn the video only
after. Judge shimmer from the video, never the still. **Gate: she approves.** Copy the
final PNG / MP4 into the post's `final/` folder and commit (renders in `out/` are not
saved: cloud sessions are wiped).

## Phase 6 · CAPTION, PUBLISH, WRITE BACK
- Caption per channel in `brief.md`, in her voice (`brand/voice.md`): Instagram (hook in
  the first line, short paragraphs, a question or next step, hashtags at the end if she
  uses them) and LinkedIn (no link in the body, links go in the first comment; character
  length MEASURED with `wc -m`, not estimated).
- Posting is hers unless a posting tool is connected AND she says "post it" in this
  conversation. Never post on your own.
- Afterwards: status `published (date)` in `brief.md`; new keepers into the image bank;
  a new rule or a trap into `content/decisions.md`; a reusable shape into `post-types/`.

## Editing power: what she says → what you change
She never edits code. Map her words to the smallest change, re-render that one slide, show it:

| She says | You change |
|---|---|
| "change the title / this word" | the `title` / `body` / `closing` string in the scene JSON or the slide's defaults (keep `\n` and `**seam**`) |
| "make this part stand out" | move the `**bold**` (lit) half of the title; never add bold, italic or colour for emphasis |
| "darker / lighter / warmer slide" | that slide's `ground` and `tint` (enums in tokens.ts), not a raw colour |
| "the background is too busy" | plate `strength` down, or veil up / blur up on a photo plate, or another plate family |
| "use my photo here" | file into `motion/public/plates/`, image-bank row, `Backdrop plate=...` |
| "too slow / too fast" | the phase constants in `lib/motion.ts` usage on that slide (CALM, BEAT), never one-off frame numbers |
| "bigger / smaller text" | the `size` prop on Title, within the brand's type scale |
| "add a point" | the `points` array (max 4 cards; above that, split the slide) |

If she wants to play with it herself: on her own computer, `npx remotion studio` in
`motion/` shows every Example and Scene slide with a form on the right (every word,
tint, ground and plate). "Save Defaults" writes her edits back into `Root.tsx`. In a
cloud session there is no live studio: render stills instead.

## Rules
- Never invent facts or numbers on a slide; a claim without a source does not ship.
- Never name or depict real people other than her without their consent.
- After a post: update `docs/wiki/state.md` (content line), append `docs/wiki/log.md`,
  commit (named paths) and push.
