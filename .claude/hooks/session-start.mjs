#!/usr/bin/env node
/**
 * SessionStart. Cloud containers start empty every time, so this:
 *   1. installs the small media tools the skills rely on, if missing (yt-dlp);
 *      ffmpeg is normally preinstalled in cloud containers
 *   2. hands the Coordinator the state of the project: the head of
 *      docs/wiki/state.md and the newest handoff note
 * It never fails the session: every step is best-effort.
 */
import { execSync } from "node:child_process";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.env.CLAUDE_PROJECT_DIR || process.cwd();
const has = (bin) => {
  try {
    execSync(`command -v ${bin}`, { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
};

const notes = [];
if (!has("yt-dlp")) {
  try {
    execSync("python3 -m pip install -q --user yt-dlp || pip install -q yt-dlp", { stdio: "ignore", timeout: 90000 });
  } catch {}
}
notes.push(`Tools: ffmpeg ${has("ffmpeg") ? "ready" : "MISSING"}, yt-dlp ${has("yt-dlp") || existsSync(join(process.env.HOME || "", ".local/bin/yt-dlp")) ? "ready" : "MISSING (media-reading skill explains the fallback)"}.`);

try {
  const state = readFileSync(join(ROOT, "docs/wiki/state.md"), "utf8").split("\n").slice(0, 25).join("\n");
  notes.push("--- docs/wiki/state.md (top) ---\n" + state);
} catch {
  notes.push("docs/wiki/state.md is missing: treat this as a first session and run the onboarding skill.");
}
try {
  const files = readdirSync(join(ROOT, "handoffs")).filter((f) => /^\d{4}-\d{2}-\d{2}.*\.md$/.test(f)).sort();
  if (files.length) notes.push(`Newest handoff: handoffs/${files[files.length - 1]} (read it before greeting the owner).`);
} catch {}
try {
  const inbox = readdirSync(join(ROOT, "inbox")).filter((f) => !/^(README\.md|\.gitkeep)$/.test(f));
  if (inbox.length) notes.push(`inbox/ holds ${inbox.length} item(s) not yet filed: offer the intake skill.`);
} catch {}

process.stdout.write(
  JSON.stringify({ hookSpecificOutput: { hookEventName: "SessionStart", additionalContext: notes.join("\n") } })
);
process.exit(0);
