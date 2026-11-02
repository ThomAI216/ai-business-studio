# Background plate recipes

Recipes for generating background plates (images with NO text) that type will sit on.
Every prompt is the same seven blocks in the same order; change only the `{slots}`. Each
block exists because leaving it out produced a rejected image.

```
[FORM]       what the plate physically is (one family below)
[PALETTE]    the slide's colours, from docs/wiki/brand/visual.md
[CALM ZONE]  where the type will sit, described as emptiness in the image
[LIGHT]      soft diffuse / rim / shaft / bloom, always soft
[MOOD]       the brand's mood words (from docs/wiki/brand/visual.md)
[NEGATIVES]  "No text, no letters, no logos, no people" (always)
[FORMAT]     "Vertical composition" (4:5) or "Square" (1:1)
```

**Why text is never generated into the image:** image models corrupt small type (letters
swapped, numbers changed). Large type sometimes survives, small type never reliably.
Type is always live, drawn by `motion/` on top of the plate.

Settings: 4:5 vertical, about 2k resolution. If the generation service substitutes a
different model than the one asked for, say so. State the calm zone even when the model
ignores it: half the time it obeys.

## Family A · light study (bloom / spotlight) · veil ~0.42, no blur
The safest and most reusable family; pure light, nothing competes with type.

> A soft diffuse spotlight of pale {COLOUR} light blooming through warm {GROUND COLOUR}
> haze, like light through frosted glass. Pure abstract light study, no objects at all.
> Gentle radial gradient, the glow centred {POSITION}, the {CALM CORNER} calm and almost
> plain. Extremely soft, dreamy, minimal, low contrast. Fine film grain. {MOOD WORDS}.
> No text, no letters, no logos, no shapes, no people. Vertical composition.

Dark variant (the shaft):
> A single soft shaft of {COLOUR} light falling through deep dark {GROUND COLOUR}
> atmospheric mist. Volumetric light, very dark background, cinematic and quiet. Pure
> atmosphere, no visible objects. The light enters from the upper {SIDE} and pools in the
> lower {SIDE}. Large calm dark areas. No text, no letters, no logos, no people.
> Vertical composition.

## Family B · sculpted abstract (dunes, soft 3D waves) · veil 0.5 + blur ~12.6
> Abstract 3D render of smooth flowing sculpted dunes in muted {COLOUR} and {GROUND
> COLOUR}, like soft contour lines rendered as gentle undulating surfaces. Very soft
> raking light, long gentle shadows. Minimal, spacious. The {CALM ZONE} smooth and calm,
> the ridges gathering in the {BUSY ZONE}. {MOOD WORDS}. No text, no letters, no logos,
> no objects, no people. Vertical composition.

## Family C · textile (silk, satin, soft fabric) · veil 0.5 + blur ~12.6
> Abstract 3D render of soft flowing silk fabric folds, {COLOUR} and pale {GROUND
> COLOUR}, smooth satin waves catching gentle studio light. Extremely soft diffuse
> lighting, low contrast. The {CALM ZONE} calm, smooth and almost empty; the folds gather
> in the {BUSY ZONE}. {MOOD WORDS}. No text, no letters, no logos, no objects, no people.
> Vertical composition.

## Family D · soft bokeh · veil 0.5 to 0.58
> Completely out of focus {SUBJECT} bokeh, soft round orbs of muted {COLOUR} and warm
> light, abstract and dreamy, no recognisable subject at all. Gentle gradient from pale
> {GROUND COLOUR} at the top to soft {COLOUR} at the bottom. Very low contrast, airy,
> calm. Fine grain. No text, no letters, no logos, no people. Vertical composition.

## Family E · cover subject (the magazine shot) · light veil only
For covers and closers: the one detailed, beautiful image of the deck. Name the real
thing, never an abstract shape: "ceramic bowl of ripe figs on linen" activates far richer
detail than "round objects".

> Editorial photograph of {SUBJECT, named concretely}, {SURFACE / SETTING}, {LIGHT:
> e.g. soft window light from the left}, shallow depth of field, the subject sharp and
> its surroundings softly out of focus. The {CALM ZONE} of the frame is calm and empty so
> a headline can sit there. {MOOD WORDS}, premium magazine quality. No text, no letters,
> no labels, no logos. Vertical composition.

## After generating
Crop to the focal point, save as jpg in `motion/public/plates/<family>/`, add a row to
`content/image-bank.md` with the veil and blur that worked, then render the slide and
measure contrast on the finished frame.
