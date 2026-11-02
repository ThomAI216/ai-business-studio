---
name: handoff
description: Close a conversation cleanly and resume in a fresh one. Load when the context-meter hook says SWITCH, after a big milestone (a phase done, a page published), when she says she is stopping for the day, or when she starts a new conversation with "continue" / "where were we".
---

# Handoff: fresh conversations, nothing lost

A long conversation gets slower, forgetful and more error-prone. A fresh one that reads a
good handoff note is better than the old one ever was. The note is **written, not dumped**:
what the next session needs, decisions with reasons, dead ends as one line each. Never a
transcript, never a log of everything you tried.

## A · Closing a conversation

1. **Finish or park the action in progress.** Never hand off mid-edit. If a step is half
   done, either finish it or undo it and write "not started" in the note.
2. **Write `handoffs/YYYY-MM-DD-<topic>.md`** (today's date, 2–4 word topic; add `-2` if
   one already exists for today). Maximum 60 lines, from this template:

```markdown
# Handoff YYYY-MM-DD · <topic>

## Where we are
<two or three sentences: studio and module, what is true now>

## Done this session
- <what> · `<path>` (· preview link if any)

## Decided (with the reason)
- <decision> · because <reason> · <she decided / proposed, waiting>

## Next
1. <the very first action of the next session, concrete enough to start without asking>
2. <then>

## Waiting on her
- <question, with the suggested answer>

## Watch out
- <traps, dead ends: "X tried, rejected because Y">
- <anything unverified, marked "unverified">
```

3. **Update `docs/wiki/state.md`**: the map (☐/◐/☑), studio now, next step (same as "Next 1"), "Waiting on her",
   live links, `updated:`. `state.md` must make sense on its own, even if the note is lost.
4. If something was decided, add it to `docs/wiki/decisions/_index.md`; if a trap was hit,
   write the `docs/wiki/lessons/` page now (not "next time").
5. **Save:** `git add handoffs/<file> docs/wiki/state.md <other changed paths>` (named
   paths only), commit with a plain message ("Handoff: <topic>"), then fold it into `main`,
   because the next conversation starts from `main` and sees nothing else:
   ```bash
   B=$(git rev-parse --abbrev-ref HEAD)
   git fetch origin main && git rebase origin/main         # someone may have saved meanwhile
   git push -u origin "$B" && git push origin HEAD:main    # fast-forward only; never --force
   ```
   A rebase conflict: resolve it (the newer wiki fact wins; ask her if two facts disagree),
   never discard the other side. Check both pushes succeeded. Cloud sessions are deleted;
   work that is not on `main` is invisible to the next conversation.
   This is not publishing: the live site is the `live` branch, never `main`.
   (If the session is already on `main`, just `git pull --rebase origin main && git push origin main`.)
6. **Tell her, in one friendly sentence**, for example:
   > "We've covered a lot, so I've saved everything. Please open a new conversation and type
   > **continue**; I'll pick up exactly here, with <next step>."

Do not start new work after telling her to switch.

## B · Resuming ("continue", "where were we", or any first message)

1. Read `docs/wiki/state.md`, then the newest file in `handoffs/` (the session-start hook
   names it). Read nothing else yet.
2. Check the claims that matter: the files named under "Done" exist; the branch has the
   last handoff commit (`git log -3 --oneline`). Anything marked unverified is checked
   before being built on.
3. Greet her with three short lines: where we are, what is next, anything waiting on her.
   Then start "Next 1" unless she wants something else.
4. Load only the skill and wiki page the next step needs.

## Rules

- One conversation ≈ one meaningful step. It is fine to hand off early.
- The note is for an assistant who knows nothing but the wiki: no "as discussed", no
  "the thing from before". Name files and pages.
- Plans that span several sessions live in `docs/plans/` (the `kickoff` skill writes them);
  the handoff points to the plan and says which step is next.
- Never put secrets, passwords or private client data in a handoff.
