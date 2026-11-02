# The wiki: how to use it

**Load one page, not the wiki.** `index.md` is a router: find your row, open that page, stop.

## What lives where

| You need | Read |
|---|---|
| Where the project is right now | `state.md` (always current, short) |
| Who she is, what she sells, to whom | `business/` |
| How she is found: SEO, AI search, channels | `marketing/` |
| How the brand looks and sounds | `brand/` |
| How the website works (pages, stack, deploy) | `website/` |
| How the web app / dashboard works (data, logins) | `app/` |
| Content: series, post types, image bank | `content/` |
| Why something is the way it is | `decisions/` |
| A trap we already fell into | `lessons/_index.md` |
| Original material she sent (never edited) | `raw/` |
| **How to make a change** | not here: `.claude/sops/` and `.claude/skills/` |

This wiki answers *what is true*. Skills and SOPs answer *how to do it*. Never copy procedure
into a wiki page; that is how pages go stale.

## Rules for editing
- Never edit anything in `raw/`. It is the evidence; pages are the summary.
- **One page per topic.** Two pages about the same thing is a merge, not a choice.
- Every page starts with frontmatter: `title`, `status` (`empty` · `draft` · `confirmed`), `updated`, `sources`.
  `business/product-spec.md` also carries `score:` (the requirements score out of 100, see the `product-spec` skill).
- `confirmed` means **she** said yes to it. AI-inferred content stays `draft` until she confirms.
- Pages are present tense: what is true now. History goes in `log.md`.
- Every fact taken from her material cites the file in `raw/` it came from.
- Never link a page that does not exist. After adding, merging or renaming a page:
  update `index.md` and append one line to `log.md`.
- Keep `index.md` a router (one line per page). News and dated notes go in `log.md`, never in the index.

## When to update
T0/T1 changes do not touch the wiki. Update when something real changed: a business answer,
a brand rule, a page shipped, a data table added, a decision made, or a trap hit (a trap
always earns a `lessons/` page the same day).
