# Post-type registry

The reusable shapes. A TYPE is a slide (or whole-deck) pattern a new topic can be poured
into by changing only **copy, plate, and tint**, nothing structural. Types come from two
places: patterns we proved on our own posts, and inspiration posts reverse-engineered by
the `inspiration` skill (analyses live in `post-types/inspiration/<slug>/analysis.md`).

## Schema: one file per type, `TYPE-NN-slug.md`

```
NAME            short, what it does
JOB             the psychological effect it exists to produce
STATIC          the settled composition (it must work as a still)
MOTION          what animates, in the motion grammar's terms (waits, beats, hold)
IMPLEMENTATION  motion/src/slides/<file> + its composition id: the working reference
SLOTS           what changes per use: copy fields, plate family, tint, ground
EXEMPLARS       our posts that used it; the inspiration that seeded it
```

## Registered types

| # | name | job | implementation |
|---|---|---|---|
| 01 | **cover** | stop the scroll: one feeling, a title on the seam over a plate | `Example.tsx` `Cover` (Example-1) |
| 02 | **argument-cards** | one idea made concrete in up to four glass cards, then the point | `Example.tsx` `Argument` (Example-2) |
| 03 | **closer** | the point, and one small next step | `Example.tsx` `Closer` (Example-3) |

## Candidates (analysis done, rebuild pending)

- (none yet)

Numbers are stable once assigned. Retire a type by marking it RETIRED, never by
renumbering. New types append. A rebuild used only once is a one-off and gets no number.
