#!/usr/bin/env node
/**
 * Context meter. The owner cannot see how full the conversation is, and quality
 * drops long before the hard limit. This hook reads the real token usage of the
 * last model turn from the transcript and tells the Coordinator when to wrap up.
 *
 * Runs on UserPromptSubmit (every message) and PostToolUse (long autonomous turns).
 * Thresholds (tokens in context), overridable in settings.json "env":
 *   CONTEXT_WARN_TOKENS    default 110000  -> finish the current step
 *   CONTEXT_SWITCH_TOKENS  default 150000  -> run the handoff skill now
 * PostToolUse only speaks when a level is crossed for the first time, so it never spams.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const WARN = Number(process.env.CONTEXT_WARN_TOKENS) || 110000;
const SWITCH = Number(process.env.CONTEXT_SWITCH_TOKENS) || 150000;

let p;
try {
  p = JSON.parse(readFileSync(0, "utf8"));
} catch {
  process.exit(0);
}
const event = p.hook_event_name || "UserPromptSubmit";

let used = 0;
try {
  const lines = readFileSync(p.transcript_path, "utf8").trim().split("\n");
  for (let i = lines.length - 1; i >= 0; i--) {
    let row;
    try {
      row = JSON.parse(lines[i]);
    } catch {
      continue;
    }
    const u = row?.message?.usage;
    if (u && !row.isSidechain) {
      used =
        (u.input_tokens || 0) +
        (u.cache_read_input_tokens || 0) +
        (u.cache_creation_input_tokens || 0) +
        (u.output_tokens || 0);
      break;
    }
  }
} catch {
  process.exit(0); // no transcript: never block on infrastructure
}

const level = used >= SWITCH ? 2 : used >= WARN ? 1 : 0;
if (level === 0) process.exit(0);

// Remember the highest level already announced in this session.
const stateFile = join(tmpdir(), `context-meter-${p.session_id || "x"}.json`);
let announced = 0;
try {
  announced = JSON.parse(readFileSync(stateFile, "utf8")).level || 0;
} catch {}
if (event === "PostToolUse" && level <= announced) process.exit(0);
try {
  writeFileSync(stateFile, JSON.stringify({ level }));
} catch {}

const k = Math.round(used / 1000);
const text =
  level === 2
    ? `CONTEXT METER: SWITCH (${k}k tokens). Finish the action in progress, then run the handoff skill NOW: write handoffs/<date>-<topic>.md, update docs/wiki/state.md, commit and push. Then tell the owner, in one friendly sentence, to open a new conversation and type "continue".`
    : `CONTEXT METER: WARN (${k}k tokens). Do not start a new big step in this conversation. Finish the current one; plan the handoff at the next natural pause.`;

process.stdout.write(
  JSON.stringify({ hookSpecificOutput: { hookEventName: event, additionalContext: text } })
);
process.exit(0);
