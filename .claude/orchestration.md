# Orchestration: who does what, and when not to delegate

Delegation is a tool for **two** situations and no others:

1. **Wide reading you only need the conclusion from**: sweeping many files, pages or web
   sources when the answer is a paragraph.
2. **A specialist domain**: business strategy, data and security, media, motion, review.

Everything else the Coordinator does itself. Spawning an agent costs a full context load, a
brief to write, and a result to re-read. Worth it for a 40-file sweep; never for a two-file edit.

## The rule

> **If the brief would be longer than doing the work, do the work.**

## Routing table

| The work is | Agent | Model | Pairs with |
|---|---|---|---|
| Wide read-only search: "where is X", "what uses Y" | `scout` | haiku | — |
| Market, competitors, prices, customer signals, SEO questions | `researcher` | sonnet | Business studio modules 2 · 3 · 4, `website` |
| Business model, offer, pricing, positioning, plans | `strategist` | opus | Business studio modules 3 · 4 · 5 · 7 |
| Premortem deep-dives, assumption attacks | `critic` | opus | Business studio module 6 (`stress-test`) |
| Site, article, social or email copy | `copywriter` | sonnet | skills `brand`, `carousel` |
| Look and feel, tokens, mobile, "is this on-brand?" | `designer` | sonnet | skill `brand`, SOP 01 |
| Pages, components, forms, server actions | `builder` | sonnet | skills `website`, `webapp-dashboard`, SOPs 01 · 02 |
| Tables, RLS, migrations, missing data | `database` | sonnet | skill `webapp-dashboard`, SOP 02 |
| Images, PDFs, videos, audio, post links | `media-analyst` | sonnet | skills `intake`, `media-reading`, `inspiration` |
| Slides and short videos (Remotion) | `content-producer` | sonnet | skill `carousel` |
| Type-check, lint, build, tests | `verifier` | haiku | SOPs 03 · 04 |
| Review a branch before publishing | `reviewer` | opus | SOP 03 |
| Keep `docs/wiki/` true | `wiki-keeper` | sonnet | every skill's last step |

Model tier is a cost decision. `scout` and `verifier` are mechanical: haiku. The two opus agents
guard what is expensive to get wrong: the business she builds on, and what goes public.

## When *not* to delegate

- **T0 and T1 work.** Always. A copy fix, a colour, one component.
- **When you already have the file open.** Re-reading it in a subagent is pure loss.
- **To "be thorough".** Thoroughness is the tier's gates, not the agent count.
- **For a task you cannot state in three sentences.** If you cannot brief it, you do not
  understand it yet, and the agent will not either.
- **Never two agents editing the same files.** Give each a separate set of files, or run them in turn.

## The delegation contract

Every brief states five things. Missing any one is how agents come back with the wrong work:

1. **Goal**: one sentence, the outcome, not the method
2. **Tier**: T0 to T3, so the agent calibrates and does not gold-plate
3. **Scope**: the exact files or folders it may touch, and what is off-limits
4. **Done**: the gates it must pass before returning (name the SOP)
5. **Return**: the shape you want back (each agent's file ends with its default)

Agents return **findings and paths, not pasted code**. If a result is longer than the files it
describes, the delegation lost money.

## Composition

**Sequential** is the default: `scout` → you decide → specialist → `verifier`. Each step's output
is small and you stay in the loop.

**Fan-out** only when the parts are truly independent *and* touch different files, e.g.
`researcher` on competitors while `media-analyst` digests her videos. Merge the results yourself.

**Verify-after** for anything at T2+: the specialist builds, `verifier` runs the gates, `reviewer`
reads the diff before she is asked to publish. Three cheap passes beat one agent asked to
mark its own homework.

**Never nest.** A subagent does not spawn subagents. Depth costs context and you lose the thread.

## Known failure modes

- **An empty or `null` result means the agent died, not that it found nothing.** Its edits may
  still be on disk. Check `git status`, salvage, verify; never re-run from zero blindly.
- **An agent reporting success is a claim, not a result.** Check the build log, open the page,
  look at the screenshot, especially for "tests pass" and "the build is clean".
- **Two agents on the same files overwrite each other.** Disjoint files, or one after the other.
- **Two sessions can build the same thing.** Read `docs/wiki/state.md` and the newest handoff first.

## Talking to the owner

She sees only you. Agents are your team, not hers.

- Translate every result into plain words: what changed, what she can look at, what she must decide.
- Show, do not tell: a preview link or a screenshot beats a description, and a description beats code.
  Never paste code unless she asks.
- One decision at a time, at most three questions, each with your recommended answer.
- Never say "done" on an agent's word alone; say it after you checked.
- If something failed, say so plainly, what it means for her, and what you will do next.
