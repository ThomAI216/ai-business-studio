# Content decisions (why each rule exists)

Append, never rewrite. Each entry: date · decision · why · who decided. A reversed
decision is struck through in "Reversed" with the date and reason, not deleted.

---

## Inherited (proven on an earlier content system, adopted at setup)

**Text is never baked into generated images.** Image models corrupted small type
(letters swapped, numbers changed); only very large type sometimes survived. So: art-only
generation, live typography composited on top. The single most important rule.

**Copy is locked before art.** Wording is expensive to change and everything downstream
is cheap to regenerate. Art briefs derive from locked copy, never the reverse.

**The layout of a slide is chosen before its art**, because the art must know where the
empty space for the type goes.

**No full stops and no em dashes in slide copy.** A stop makes a headline read as prose
and closes a line meant to stay open; two sentences become one. Enforced by
`check-copy.mjs`, not by memory.

**The seam is the emphasis device.** Write the title so it has a seam, break the line on
it, and drop the framing half to a muted value. One size, one weight, one face across
the seam. (Measured on high-performing educational carousels: their whole emphasis system
was one colour at two values.)

**Tint × ground, one decision per slide.** A tint is not one colour: its legible ink
depends on the ground and inverts between light and dark grounds. Every tint carries one
ink per ground, generated to clear 4.5:1 (`motion/scripts/tint-matrix.mjs`).

**Measure contrast on the finished frame, not the token.** A dark plate veiled toward a
light ground becomes a mid ground, where an ink that passed on the token fails.

**Plates are veiled, and blurred if sharp, never raw.** Reach for blur, not more veil:
veil kills the light that made the plate worth having; blur kills only the competing detail.

**A plate never drifts or pans under type.** The plate is resampled to a new sub-pixel
grid every frame, so still letters shimmer at the edges; it also triples file size.

**Video exports at crf 12.** Large serif type and fine glass rims over smooth gradients
are the worst case for h264; at higher crf the letters ring. **Judge shimmer from the
video, never from a still.**

**Stills are rendered at a settled frame, never frame 0.** Everything eases in, so frame
0 is an empty ground.

**The graphic waits for the body copy; the closing line lands after the graphic; then a
long hold.** Calm, burst, hold: stillness makes the burst land, the hold makes it read as
intentional.

**Glass splits opacity from backdrop-filter.** `opacity < 1` on the element carrying the
blur makes it sample itself and the blur silently dies. The wrapper animates, the glass
never does. Glass also needs something behind it: on a flat fill it is invisible.

**Nothing in a group exceeds 7 items** (cards 2 to 4, rows up to 6).

**Vary the SEQUENCE of post types per deck, not the visual language.** Same grid, palette
and type; different order of types. This is the defence against fifty posts looking identical.

**Render locally (in the session), not on a render farm**: distributed renderers can
rasterise CSS blur differently per chunk, producing brightness pops.

**One render for approval before burning a video.** Show a still, get a yes, then export.

---

## Ours

- (none yet)

## Reversed

- (none yet)
