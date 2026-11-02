# Content studio

**Purpose:** social posts, carousels, short videos and images that sound and look like her, that
her clients save and share, and that always lead to her free next step. **Owns:** `content/`,
`docs/wiki/content/`. **Needs first:** `brand/voice.md` and `brand/visual.md` (at least draft),
`business/audience.md`, `business/offer.md`. **Specialists:** `copywriter` (words, captions),
`content-producer` (slides and video in `motion/`), `media-analyst` (reading references and her
videos), `designer` (look), `critic` (claims check), `researcher` (what her audience engages with).

## The playbook: five modules, in this order by default

| # | Module | Skill | Produces | Done when |
|---|---|---|---|---|
| 1 | Content pillars | `content-distribution` §channels + this brief | `docs/wiki/content/_index.md` (3–4 pillars from her SEO clusters and clients' questions, her two channels, a rhythm) | she recognises every pillar as "what my clients ask me" |
| 2 | Post types | `inspiration` | named, reusable types in `content/post-types/` | 3 types she likes, rebuilt in her brand |
| 3 | Make a post | `carousel` | `content/carousels/<date>-<slug>/` with locked copy, stills, caption | she approves the stills (and the video, if any) |
| 4 | From each article | `content-distribution` | `content/channels/<article>.md` and post briefs | one article became posts on both channels |
| 5 | Learn what works | this brief + `data-analyst` | a line per post in `docs/wiki/content/_index.md` (saves, shares, comments, link clicks) | monthly: one thing to do more of, one to stop (feeds the board meeting) |

## Rules

- **Copy is locked before visuals.** `node content/check-copy.mjs` passes before anything ships
  (no em dashes, no full stops in display copy).
- **One idea per post, one post per job** (teach, prove, invite). Every post ends on her free
  next step (`business/offer.md`) unless she says otherwise.
- **Never a copy.** Inspiration becomes a type in her brand; images are hers, licensed, or
  generated text-free. People's faces and other creators' work need permission.
- **Claims are true.** In a regulated field, informative only; `critic` checks claims.
- **She posts.** You prepare files and captions; she publishes (or explicitly asks for scheduling).
- Judge motion from the video, never from stills; render stills at a settled frame.

## Hands off to

- Results of module 5 → the monthly `board-meeting` and `marketing/channels.md`.
- New questions clients ask in comments → `marketing/keywords.md` (future articles).
