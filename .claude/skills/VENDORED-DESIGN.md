# Vendored design skills

Copied into the repo so every copy of the template has them, with their licences. Do not edit
them by hand; to upgrade, re-copy from the source and redo the changes listed here. The way we
use them (when, in what order, for her) is our own `web-design` and `brand` skills.

| Skill | Source | Licence | Version | Why it is here |
|---|---|---|---|---|
| `frontend-design` | [anthropics/skills](https://github.com/anthropics/skills/tree/main/skills/frontend-design) | Apache 2.0 (`LICENSE.txt`) | main, 2026-11-02 | a distinctive, intentional look instead of the generic AI-template look |
| `webapp-testing` | [anthropics/skills](https://github.com/anthropics/skills/tree/main/skills/webapp-testing) | Apache 2.0 (`LICENSE.txt`) | main, 2026-11-02 | real-browser checks and screenshots (Playwright) for the `qa-tester` and `designer` |
| `ui-ux-pro-max` | [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | MIT (`LICENSE`) | commit `713eef5`, 2026-11-02 | searchable styles, palettes, font pairings, product-type rules and UX guidelines |
| `ckm-design` | claudekit, "ckm:design" | MIT (declared in its frontmatter; `LICENSE`) | 2.1.0 | logos, corporate identity sets, banners, social images, icons |

## Changes made while vendoring

- `ui-ux-pro-max`: `${CLAUDE_PLUGIN_ROOT}/.claude/skills/` rewritten to the repo-relative
  `.claude/skills/` in its commands; its `scripts/tests/` folder dropped (not needed to run).
- `ckm-design`: folder and skill name `ckm:design` renamed to `ckm-design`; install paths
  `~/.claude/skills/design/` rewritten to `.claude/skills/ckm-design/`.
- `frontend-design`, `webapp-testing`: unchanged.

## Runtime needs

- `ui-ux-pro-max`: `python3` (its search script reads the bundled CSV data; no install).
  Commands are run from the repo root.
- `ckm-design`: the search and HTML scripts need `python3` only. **Logo, icon and identity image
  generation needs a `GEMINI_API_KEY` environment variable** (optional; set it in the cloud
  environment's variables, never in a file). Without it, use it for briefs and HTML layouts only.
- `webapp-testing`: Playwright and Chromium are preinstalled in cloud sessions; do not run
  `playwright install`. Its helper scripts live in `.claude/skills/webapp-testing/scripts/`.

## Names inside ckm-design that point to skills we do not ship

`ckm-design` sometimes says `/ckm:brand`, `/ckm:design-system`, `/ck:ui-ux-pro-max` or
`/ck:frontend-design`. Here they mean: `brand` (ours), the design-system module of
`web-design` (ours), `ui-ux-pro-max` and `frontend-design` (vendored above).

## Not vendored

`brand-identity` (openclaw/skills, by jk-0001): no licence stated, so it is not copied. Its
strategy-first method is folded, in our own words, into the `brand` skill.
