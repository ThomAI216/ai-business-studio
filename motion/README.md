# motion/: the slide and video engine

A Remotion project: every carousel slide and every reel is a React component.
The same file renders as a **still** (carousel) or a **video** (reel).
The `carousel` skill drives it; the owner never needs to open this folder.

## Commands (run inside `motion/`)

```bash
npm install                                   # once per cloud session (containers start empty)
npx remotion studio                           # live editor; in a cloud session use stills instead
npx remotion still Example-2 out/x.png --frame=170    # ONE settled still
node export-stills.mjs Example                # every Example-* slide, settled frame
node export-video.mjs Example-2               # MP4, crf 12, in out/
npx tsc --noEmit                              # type check
node ../content/check-copy.mjs                # copy law, before anything ships
node scripts/tint-matrix.mjs                  # regenerate tint inks after a palette change
```

**Never render a still at frame 0.** Everything eases in, so frame 0 is an empty
ground. Use a frame near the end (the example slides settle by ~150 of 180).

**Chromium.** Remotion downloads its own headless browser on first use. If the
network blocks that download, `scripts/browser.mjs` finds the Chromium already
installed in cloud sessions (`/opt/pw-browsers/`), or set
`REMOTION_BROWSER_EXECUTABLE` to a Chromium path.

## Where things are

```
src/brand/tokens.ts      THE brand: grounds, inks, tints, fonts, layout (filled by the brand skill)
src/brand/fonts.ts       which @fontsource fonts load; the render waits for them
src/components/Chrome.tsx  structure: SlideTint, Frame, plates, Eyebrow, Title, Body, Closing, Wordmark
src/components/GlassCard.tsx  liquid glass (not frosted)
src/lib/motion.ts        the motion grammar: springs, CALM / BEAT / HOLD, entryStyle
src/lib/contrast.ts      WCAG contrast maths
src/lib/richtext.ts      the text grammar: \n line break, **bold** (the lit half of a title)
src/slides/              one file per slide type, each with a zod schema (editable in Studio)
src/scene/               a whole post as one JSON document (scenes/*.json)
public/                  plates and logo masks (image files go here, then into content/image-bank.md)
```

## The laws (why each exists: `content/decisions.md`)

1. Slide files own only their picture. Structure comes from `Chrome.tsx`.
2. One `<SlideTint tint ground>` per slide decides every accent colour; the ground decides light or dark type.
3. Copy uses `\n` and `**bold**` only. No full stops, no em dashes.
4. A plate never moves under type. Video exports at crf 12. Judge shimmer from the video.
5. The graphic waits for the body copy; the closing line lands after the graphic; then hold.
6. Every number lives in `src/brand/tokens.ts` or `src/lib/motion.ts`, never inline in a slide.

## Making a new slide type

Copy the closest slide in `src/slides/Example.tsx` into a new file, give it its own zod
schema and defaults, register it in `src/Root.tsx`, add it to `src/scene/schema.ts` and
`SceneSlide.tsx` if posts will use it as data, and file it in `content/post-types/`.
