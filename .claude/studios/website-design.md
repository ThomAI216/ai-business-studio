# Website & design studio

**Purpose:** how her business looks, sounds and works online: the brand, the website, and the
design system the app and dashboard reuse. **Owns:** `docs/wiki/brand/*`, `docs/wiki/website/*`,
`docs/design/` (mockups; `approved/` is the spec). **Needs first:** `business/product-spec.md`
signed off (Business module 8), `business/positioning.md` confirmed, and the page map from
`marketing/seo-plan.md` if the Marketing & SEO plan exists. Missing? Follow the Coordinator's
"out of order" rule. **Specialists:** `designer` (look, tokens, mockups), `ux-designer` (flows,
sitemap, wireframes, forms), `copywriter` (words, approved before design), `builder` (pages in
`web/`), `qa-tester` (real-browser journeys), `verifier` (build checks), `reviewer` (before publish).

## The stance

She judges with her eyes, so every decision is made on something she can **see**: a mockup, a
screenshot, a preview link on her phone. Words come before design, design before code, and the
approved mockup is the spec the builder matches. She never has to describe a layout in the
abstract or approve something she has not seen.

## The tools

Our method skills (`brand`, `web-design`, `website`) decide *what* and *in which order*. The
vendored design skills (`.claude/skills/VENDORED-DESIGN.md`) are the instruments:
`frontend-design` (character, not a template look), `ui-ux-pro-max` (styles, palettes, font
pairings, UX rules), `ckm-design` (logos, banners, social images, icons), `webapp-testing`
(real-browser checks and screenshots).

## The playbook: seven modules, in this order by default

| # | Module | Skill | Produces | Done when |
|---|---|---|---|---|
| 1 | Brand strategy and identity | `brand` | `brand/voice.md`, `brand/visual.md` | purpose, values, personality, palette, type, logo direction confirmed by her |
| 2 | Site map and user journeys | `website` §plan + `ux-designer` | `website/_index.md` (page table), `website/journeys.md` | every page has one job and one call-to-action; the 2–3 main journeys (stranger to lead, lead to client, returning client) are written step by step |
| 3 | Design directions and mockups | `web-design` | `docs/design/mockups/approved/<page>.html`, `website/design-system.md` | she approved the homepage mockup (phone and desktop) |
| 4 | Design system in code | `web-design` + `designer` | tokens and components in `web/`, `website/design-system.md` | the homepage built from tokens matches its mockup at 390 and 1440 |
| 5 | Build the pages | `website` + SOP `01-new-page.md` | the site in `web/`, previews | every planned page is `preview` and she has seen each on her phone |
| 6 | Quality check in a real browser | `webapp-testing` via `qa-tester` | `website/qa.md` | every journey passes at 390 and 1440: no broken link, no console error, forms work, accessibility floor met |
| 7 | Publish | SOP `03-publish.md` | the live site | she said "publish", the live URL checked on a phone, `state.md` live links updated |

**Order is a default, not a rule.** If she arrives with a brand, audit it against module 1's
"done when" and fill only the gaps. A single new page later runs modules 3, 5 and 6 for that page
only. Track progress in `docs/wiki/state.md` (one line per module: ☐ / ◐ / ☑).

## Rules every module follows

The Business studio's eight rules apply (look before you ask, one question, play back, options,
show don't tell, write it down, check facts, always a next step). Plus:
1. **Words before design, design before code.** The copywriter's text is approved first; the
   mockup is approved second; only then does the builder build.
2. **Two or three directions, never one, never six**, each named and shown side by side.
3. **The approved mockup is the spec.** Anything missing from it is a question for her, not an
   improvisation by a specialist.
4. **Tokens only.** No hardcoded colour or size in a page; a new value is a brand decision.
5. **Phone first.** Designed and checked at 390px, then 1440px. Most visitors are on a phone.
6. **Accessible by default**: 4.5:1 contrast, visible focus, labels, alt text, 44px tap targets.
7. **Seen in a real browser before she sees it.** Screenshots and a click-through, never "the
   build passed".
8. **Every page ends on her one free next step** (`business/offer.md`).

## Hands off to

- The design system (module 4) → App & dashboard studio (same tokens and components).
- The brand pages (module 1) → Content studio (`motion/` tokens) and every copywriter brief.
- The live site (module 7) → Marketing & SEO studio modules 2, 4 and 6 (checks on the real URL).
