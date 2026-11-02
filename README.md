# AI Business Studio

A studio you run by talking to one AI coordinator, **Nova**. Nova starts with the business
idea you already have and works through it with you: who it is for, what you sell and at
what price, what could go wrong, your first 90 days. Then Nova designs and builds your website,
and your app and dashboard if you need them, and helps with marketing, SEO and social content.

Made for founders who are not technical. **You never need to know what to ask:** Nova leads,
one question at a time, always with a suggestion, and you decide. Behind the scenes Nova
brings in specialists (research, strategy, critique, writing, design, building, review) and
checks their work before showing it to you.

## Get started (about 15 minutes)

1. **Make your own private copy:** click **Use this template** (top right) → **Create a new
   repository** → choose **Private** → **Create repository**.
   Your copy will hold your business ideas, prices and files: keep it private. Only this
   empty template is public.
2. Go to **[claude.ai/code](https://claude.ai/code)**, connect GitHub, and pick your new repository.
3. In the environment settings (environment name at the top of the session → **Edit**), set
   **Network access** so the studio can reach the web.
4. Type **"Hi Nova, let's start."**

The full guide for the owner is [`START-HERE.md`](START-HERE.md).

## What is inside

| Studio | What Nova does there |
|---|---|
| **Business** | eight modules: your idea sharpened, your customer, the business model, offer and pricing, positioning, a premortem stress test, a 90-day plan, and the spec of what your website and app must do |
| **Marketing & SEO** | your message, being found on Google and in AI answers, your launch |
| **Website & design** | your brand look and voice, your pages, the website (Next.js, Vercel) |
| **App & dashboard** | logins, a client area, bookings, your back office (Supabase) |
| **Content** | posts, carousels and short videos in your brand (Remotion) |

## How it is built (for whoever sets it up)

| Layer | Where | Loaded |
|---|---|---|
| Coordinator manual (≤40 lines) | `CLAUDE.md` | every session |
| Persona (Nova) and per-message triage | `.claude/coordinator.md` | every session |
| Five studio briefs | `.claude/studios/` | one brief, per message |
| Specialists (13 studio agents + 19 `seo-*` toolkit agents) | `.claude/agents/` | when delegated |
| Routing and delegation contract | `.claude/orchestration.md` | when delegating |
| Procedures for changes | `.claude/sops/` | one file, on demand |
| Workflows | `.claude/skills/` | one skill, on demand |
| Guardrails | `.claude/hooks/` + `.claude/settings.json` | automatic |
| Memory | `docs/wiki/` (router `index.md`, the map in `state.md`) + `handoffs/` | one page, on demand |

Routing is cheap, knowledge is lazy: only `CLAUDE.md` and the persona cost tokens every session.

**Branches.** `main` is the work in progress: every claude.ai/code conversation starts from
it, and each one saves back into it. `live` is the published website (Vercel's production
branch). Work reaches `live` only when the owner says "publish".

**Hooks.**
- `session-start.mjs`: installs yt-dlp if missing; hands Nova `state.md`, the newest handoff and the inbox count.
- `context-meter.mjs`: reads real token usage; WARN at 110k, SWITCH at 150k (`settings.json` → `env`). On SWITCH, Nova writes a handoff and asks for a new conversation.
- `guard.mjs`: blocks `git add -A`, reading or writing `.env` files, editing the hooks, force-pushes, and publishing to `live` (push or PR merge) without a fresh `.claude/approvals/publish` marker.
- `stop-save.mjs`: cloud containers are wiped, so a turn cannot end with uncommitted, unpushed or not-yet-on-`main` work.

**Optional.** `OPENAI_API_KEY` as an environment variable (never in a file) for video
transcripts when local Whisper is unavailable. Vercel and Supabase connectors
(claude.ai → Settings → Connectors) when the website and app studios start.

## Credits and licences

- `.claude/skills/brainstorm` is adapted from the brainstorming skill in
  [obra/superpowers](https://github.com/obra/superpowers) (MIT, © 2025 Jesse Vincent); its
  licence is in that folder.
- The SEO toolkit (`.claude/skills/seo*`, `.claude/agents/seo-*.md`) is
  [claude-seo](https://github.com/AgriciDaniel/claude-seo) v2.5.0 by AgriciDaniel (MIT), vendored
  with `tools/vendor-claude-seo.sh`; see `.claude/skills/seo/VENDORED.md`.
- The stress test follows Gary Klein's premortem method.
- `motion/` uses [Remotion](https://www.remotion.dev), which has its own licence: free for
  individuals and small companies, a paid company licence above that. Check
  [remotion.dev/license](https://www.remotion.dev/license) before commercial use.
- `tools/ig-capture.mjs` reads public Instagram/LinkedIn embeds for your own reference and
  inspiration analysis; respect the platforms' terms and other people's copyright.
