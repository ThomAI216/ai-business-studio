---
name: inspiration
description: Reverse-engineer posts she likes (Pinterest images, Instagram screenshots, screen recordings, post links) into NAMED, REUSABLE post types rebuilt in her brand — never copies. Load whenever she shares someone else's post, reel or design as "I want something like this".
---

# Inspiration → a reusable post type

Someone else's post comes in; what comes out is never a copy but a **named, reusable
type** in her brand. Load the brand pages (`docs/wiki/brand/`) and know the `carousel`
skill's phases first: they define what "her brand" and "our system" mean.

## 1 · Intake: get the actual pixels, never pretend
Everything she shares goes through the `media-reading` skill first (it files the
originals in `docs/wiki/raw/` and writes a `digest.md`):
- **Images** (Pinterest saves, screenshots): one file per slide, in order (`01.png`,
  `02.png`…) in one folder per post. Open and look at every one.
- **Screen recordings / reels**: `bash tools/video-digest.sh <file>` samples frames
  (and transcribes the audio when possible). Analyse the frames AND the timing between them.
- **Post links**: `node tools/ig-capture.mjs <url>` renders a public Instagram post's
  embed and saves the ordered slides + caption. LinkedIn public posts: the same trick on
  `linkedin.com/embed/feed/update/urn:li:activity:<id>`.
- **Private accounts, blocked downloads, true video you cannot fetch**: say so plainly
  and ask her for screenshots or a screen recording. **Never describe a post you have not
  actually seen.** If the cloud network blocks a host, name the host and tell her the
  network setting to change (see START-HERE.md).
Delegate a batch (more than ~3 posts) to `media-analyst`, one post per brief.

## 2 · Analysis: one file per post, fixed schema
Write `content/post-types/inspiration/<slug>/analysis.md`:

```
SOURCE        who, platform, link or raw/ path, date captured
TOPIC         what it teaches + the psychological effect it aims for
HOOK          why you stop scrolling (the cover's one trick)
ARC           slide by slide: what each slide DOES (hook, claim, evidence, reframe,
              list, proof, next step), not what it says
COMPOSITION   grid, type hierarchy (display / body / label: sizes, faces), alignment,
              density per slide, empty space, where the eye goes first
BACKGROUND    per slide: photo / flat / gradient / texture / 3D; light direction; how
              the type survives on it
COLOUR        palette + the JOB each colour does (ground / ink / accent), the feeling targeted
MOTION        (if animated) what moves, in what order, what NEVER moves, where the hold is
STEALABLE     the 1 to 3 ideas actually worth taking
INCOMPATIBLE  what breaks her rules (full stops, em dashes, emphasis by colour or
              italic, more than 7 items, text baked into images, claims without sources)
              and what replaces each
```

Measure, do not guess: read actual sizes and colours from the pixels when it matters
(crop and sample with a short Python/PIL script).

## 3 · Rebuild in her system: map, never mimic
- their display face → her display face, title on the seam · their bold → weight 500
- their emphasis (bold, colour, underline) → the seam (value only)
- their background → the nearest plate family (gradient plate, image bank, or a
  `content/prompts.md` recipe), never their image
- their palette → the nearest tint × ground from `brand/visual.md`
- their cards / boxes → `GlassCard` or a new component in her look
- their footer / handle → her chrome (eyebrow + wordmark from `Chrome.tsx`)
- their words → none. Copy is written fresh, in her voice, for her topic.

Build it as a real slide in `motion/src/slides/` with its own zod schema (the
`content-producer` agent), and render ONE settled still for her approval.
**Static first, motion second**: every type must work as a still; animation (carousel
skill, phase 4) only after the still is approved.

## 4 · File the type
A rebuild that works is registered in `content/post-types/` as `TYPE-NN-slug.md` (schema
in the README there) and added to the registry table. A type is reusable when a new topic
can be poured into it by changing only copy, plate and tint. A one-off gets no number.

Every analysis, even rejected ones, stays in `content/post-types/inspiration/`: knowing
why something does NOT fit her is context too.

## Rules
- Never reuse their images, logos, characters, exact wording, or a distinctive layout so
  close it reads as theirs. Take the principle, not the post.
- Credit nobody publicly and copy nobody publicly; the analysis files are internal.
- After filing: append `docs/wiki/log.md`; if the type changes how she posts, add a line
  to `docs/wiki/content/_index.md`; commit (named paths) and push.
