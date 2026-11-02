# SOP 03: Publish (main → live, go live)

**When:** anything goes live. `live` is the published site: a push to `live` publishes. `main` is the work in progress.
**Tier:** T2 minimum, every time.
**Who decides:** her. Nothing reaches `live` until she says "publish" (or clearly agrees) in
this conversation. The guard hook blocks it otherwise.

## Before asking her

1. **Fetch main again** (`git fetch origin main`). Another session may have published since
   you branched. Two sessions building the same thing has happened before.
2. **A clean merge can silently undo a fix.** List files changed on both sides and read both diffs:
   ```bash
   BASE=$(git merge-base HEAD origin/main)
   comm -12 <(git diff --name-only "$BASE" HEAD | sort) <(git diff --name-only "$BASE" origin/main | sort)
   ```
3. `verifier`: all gates (type-check, lint, build, tests if any). Raw exit codes and logs.
4. `reviewer`: the branch diff. Fix every `blocker` first.
5. Any migration on the branch is **applied** (SOP 02), or you say plainly what breaks until it is.
6. Push the branch and open the **preview** (Vercel builds one per branch). Check it on a phone width.

## Asking her

Send: the preview link, two or three lines on what changes for visitors, anything she must
check (a price, a claim, a photo). Then ask: "Shall I publish?"

## Publishing (only after her yes)

1. `mkdir -p .claude/approvals && touch .claude/approvals/publish` (valid 60 minutes).
   Never create it without her yes in this conversation.
2. Make sure your work is on `main` (handoff skill §Save), then publish `main` to `live`:
   `git fetch origin && git push origin origin/main:live` (creates `live` the first time),
   or a pull request `main` → `live`. Everything on `main` goes live together, so a page that is not ready
   must be switched off in `web/config/launch.ts` first. Never `git add -A`.
3. Wait for the production deploy, then **open the live URL** and check the changed pages,
   at phone width. Zero live page loads after a publish is the most common gap there is.

## After

- [ ] Live pages opened and checked
- [ ] `docs/wiki/state.md` "Live links" and "Next step" updated
- [ ] One line in `docs/wiki/log.md`
- [ ] She got one sentence: what is live now, and the link

If the live site is broken: say so at once, roll back in Vercel to the previous deployment
(with her OK), then debug with SOP 04.
