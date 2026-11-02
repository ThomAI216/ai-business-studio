# content/: social content production

Where carousels and reels are planned, written, filed and remembered. The engine that
draws them is `motion/`; the process is the `carousel` skill; reverse-engineering other
people's posts is the `inspiration` skill. Brand rules live in `docs/wiki/brand/`.

```
carousels/<YYYY-MM-DD>-<slug>/brief.md   one folder per post: arc, ## Copy (locked), plates, caption, status
post-types/                              the reusable shapes (TYPE-NN-slug.md) + analyses of inspiration
image-bank.md                            plates we own: where, licence, used in, veil/blur that worked
prompts.md                               recipes for generating text-free background plates
decisions.md                             why each content rule exists (append, never rewrite)
check-copy.mjs                           the copy law: no full stops, no em dashes (exit 1 on violation)
```

Renders land in `motion/out/` (not committed). A post the owner approved gets its final
PNGs / MP4 copied into its `carousels/<post>/final/` folder and committed, so the cloud
session can be wiped safely.

`brief.md` sections, in this order: `## Job` (the one feeling, the audience) · `## Arc`
(what each slide DOES) · `## Copy` (locked lines, checked by check-copy) · `## Plates` ·
`## Caption` (Instagram, LinkedIn) · `## Status` (draft · copy locked · stills approved ·
video approved · published, with dates).
