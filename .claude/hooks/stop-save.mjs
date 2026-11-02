#!/usr/bin/env node
/**
 * Stop hook: nothing is lost. Cloud containers are deleted after a session, so
 * work that is not committed AND pushed disappears. When the Coordinator tries to
 * end a turn with unsaved work, it is sent back once to commit (named paths) and
 * push its branch. Never pushes main for it (the guard requires "publish").
 * Never blocks twice in a row (stop_hook_active), never blocks on git errors.
 */
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";

const ROOT = process.env.CLAUDE_PROJECT_DIR || process.cwd();
let p = {};
try {
  p = JSON.parse(readFileSync(0, "utf8"));
} catch {}
if (p.stop_hook_active) process.exit(0);

const git = (c) => execSync(c, { cwd: ROOT, timeout: 10000, stdio: ["ignore", "pipe", "ignore"] }).toString().trim();

let dirty = "", ahead = 0, branch = "";
try {
  dirty = git("git status --porcelain");
  branch = git("git rev-parse --abbrev-ref HEAD");
} catch {
  process.exit(0);
}
try {
  ahead = Number(git("git rev-list --count @{u}..HEAD")) || 0;
} catch {
  // no upstream yet: count commits not on any remote branch
  try {
    ahead = Number(git("git rev-list --count HEAD --not --remotes")) || 0;
  } catch {}
}

// The next conversation starts from `main`: work that is pushed but not folded
// into main is invisible to it. Checked only when origin/main exists.
let notOnStudio = false;
try {
  execSync("git fetch -q origin main", { cwd: ROOT, timeout: 15000, stdio: "ignore" });
} catch {}
try {
  git("git rev-parse --verify -q origin/main");
  try {
    execSync("git merge-base --is-ancestor HEAD origin/main", { cwd: ROOT, timeout: 10000, stdio: "ignore" });
  } catch {
    notOnStudio = true;
  }
} catch {}

if (!dirty && !ahead && !notOnStudio) process.exit(0);

const parts = [];
if (dirty) parts.push(`uncommitted changes:\n${dirty.split("\n").slice(0, 15).join("\n")}`);
if (ahead) parts.push(`${ahead} commit(s) not pushed on branch ${branch}`);
if (notOnStudio) parts.push("this branch is not folded into `main`, so the next conversation will not see it (handoff skill §Save: rebase on origin/main, push, `git push origin HEAD:main`)");
process.stderr.write(
  "Unsaved work (cloud sessions are wiped): " + parts.join("; ") +
    `\nCommit with named paths (never git add -A) and run: git push -u origin ${branch === "live" ? "<a work branch, not live>" : branch}. ` +
    "If something should NOT be saved (scratch files), add it to .gitignore instead. Then finish."
);
process.exit(2);
