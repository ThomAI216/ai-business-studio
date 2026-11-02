---
name: skill-factory
description: Turn something repeatable into a new skill or agent in .claude/: a workflow she keeps asking for, an article or video describing a method, a GitHub repo or template she likes. Load when she says "can you always do it like this", "make this a routine", "learn this method", or shares a source to adopt. Not for one-off tasks.
---

# Skill factory: from a good way of working to a reusable skill

**Distil, map, adapt, check.** Never paste someone else's work in: a skill is an
adaptation with a named purpose, written for this project.

## 1 · Spot or receive the candidate

Two entry points:
- **Repetition.** She asked for the same kind of thing three times (a weekly newsletter,
  a testimonial post, a client onboarding email). Propose: "Shall I turn this into a
  routine so it comes out the same way every time?"
- **A source.** She shares an article, video, template or repo. Read it fully first
  (video: `media-reading`; repo: clone read-only and read its README and core docs; big
  repo: **scout** per area). Check the license before reusing text word for word
  (no license → ideas only, in your own words).

## 2 · Distil

Write `docs/wiki/raw/YYYY-MM-DD-<source>/distilled.md`: source, date, license, then the
actual rules, steps and checklists with their reasons. End with **"Ideas for us"**: each
idea mapped to her business, her brand and this repo.

## 3 · Decide what each idea becomes (exactly one)

| Becomes | When |
|---|---|
| **Skill** (`.claude/skills/<name>/SKILL.md`) | a repeatable procedure the coordinator follows on demand |
| **Agent** (`.claude/agents/<name>.md`) | a role with its own tools, model and return format, worth delegating |
| **SOP** (`.claude/sops/`) | a procedure with safety checks tied to a real past mistake |
| **Wiki page** | a fact or a decision, not a procedure |
| **Nothing** | interesting, but nothing would use it now; it stays in `raw/` |

Prefer improving an existing skill over adding a new one. More skills is not better.

## 4 · Write it

- Frontmatter: `name`, and a `description` written for triggering: when to load it, two
  realistic phrases she would use, and when NOT to load it.
- Body under ~150 lines: steps in order, where outputs go (real wiki paths), what she must
  approve, what "done" looks like.
- Adapt examples to her business and brand; say what you deliberately left out of the
  source and why.
- New agent files: `name`, `description`, `tools` (only what it needs), `model`, and a
  "Return this" section.
- Add the skill's name to the skills line in `CLAUDE.md` only if the coordinator must know
  it exists every session (keep `CLAUDE.md` under 40 lines; replace, don't append).

## 5 · Check and get her yes

A skill counts as done when:
1. it was run once for real on her actual material, and the result was shown to her;
2. she approved the result ("yes, always like this");
3. whatever it replaces was deleted or merged (compress, don't pile up).

Then log it in `docs/wiki/log.md` and `docs/wiki/decisions/_index.md`, commit, push.

## Never

- Never import a whole external framework, prompt pack or agent swarm "because it is good".
- Never let a skill skip her approval for publishing, sending or paying.
- Never copy secrets, keys or other people's private data into a skill.
