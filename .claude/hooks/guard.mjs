#!/usr/bin/env node
/**
 * PreToolUse guard. Plain, literal checks only, adapted from a production harness
 * where each rule was paid for by a real incident:
 *   1. broad staging (git add -A / . / --all / *) sweeps in junk and secrets
 *   2. publishing to main (push or PR merge) without the owner's "publish"
 *   3. reading a .env file, through any tool, prints a live secret into the chat
 *   4. editing the hooks themselves without an explicit OK
 *
 * Exit 0 = allow. Exit 2 = block (stderr goes back to the model).
 * Approval markers live in .claude/approvals/<name> (gitignored), valid 60 min.
 * A marker is an honesty mechanism, not a lock: create one ONLY after the owner
 * said yes in this conversation.
 */
import { statSync, readFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { join } from "node:path";

const ROOT = process.env.CLAUDE_PROJECT_DIR || process.cwd();
const TTL = 60 * 60 * 1000;

function fresh(name) {
  for (const dir of new Set([ROOT, process.cwd()])) {
    try {
      if (Date.now() - statSync(join(dir, ".claude", "approvals", name)).mtimeMs < TTL) return true;
    } catch {}
  }
  return false;
}
function block(msg) {
  process.stderr.write("BLOCKED by guard hook: " + msg);
  process.exit(2);
}

let p;
try {
  p = JSON.parse(readFileSync(0, "utf8"));
} catch {
  process.exit(0);
}
const tool = p.tool_name ?? "";
const ti = p.tool_input ?? {};

const PUBLISH_MSG =
  "this publishes to `live`, the live site. Ask the owner first. If she said " +
  "\"publish\" (or clearly agreed) in this conversation, create `.claude/approvals/publish` " +
  "(valid 60 min) and retry. Never create it on your own initiative.";

// Merging a pull request through the GitHub tools is publishing too.
if (/merge_pull_request|merge_branch/.test(tool) && !fresh("publish")) block(PUBLISH_MSG);

// ---------- Database guard: only HER own Supabase project, never any other ----------
// The template must never reach a database that is not the one she created for this
// project (the person who set this up has their own databases on the same platform).
// The allowed project is the single ref in .claude/supabase-project, empty in the template,
// so every database call is refused until her own project exists and is recorded.
// search_docs reads Supabase's public documentation: no project, no data.
if (/^mcp__.*supabase.*__/i.test(tool) && !/search_docs$/.test(tool)) {
  let allowed = "";
  try {
    allowed = readFileSync(join(ROOT, ".claude", "supabase-project"), "utf8")
      .split("\n").map((l) => l.trim()).filter((l) => l && !l.startsWith("#"))[0] || "";
  } catch {}
  const name = tool.replace(/^mcp__[^_]+(?:_[^_]+)*?__/, "");
  // Account-wide calls: only to set up HER new project, with her explicit yes.
  const ACCOUNT = /(list_projects|list_organizations|get_organization|create_project|get_cost|confirm_cost|pause_project|restore_project)$/;
  if (ACCOUNT.test(tool)) {
    if (!fresh("supabase-setup")) {
      block("this database call works on the whole Supabase account. It is allowed only to create HER OWN new project, after she said yes in this conversation: then create `.claude/approvals/supabase-setup` (valid 60 min). Never choose, open or reuse an existing project she did not create for this business.");
    }
  } else {
    const pid = String(ti.project_id ?? ti.projectId ?? ti.project_ref ?? "");
    if (!allowed) {
      block("no database is connected to this project yet. Only her own new Supabase project may ever be used: create it with her (webapp-dashboard skill), then record its ref in `.claude/supabase-project`.");
    }
    if (pid !== allowed) {
      block(`this database call targets project "${pid || "(none)"}", but the only project this studio may touch is the one in .claude/supabase-project. Never connect to any other database.`);
    }
  }
}

// The Read tool on a secret file.
if (tool === "Read") {
  const fp = String(ti.file_path ?? "");
  if (/(^|[\\/])\.env(\.[\w-]+)?$/.test(fp) && !/\.env\.example$/.test(fp)) {
    block("reading a .env file would print secrets into the conversation. Use variable NAMES only; `.env.example` lists them.");
  }
}

if (tool === "Bash") {
  const cmd = String(ti.command ?? "");

  if (/\bgit\s+add\s+(-A\b|--all\b|\.(\s|$|"|')|\*)/.test(cmd)) {
    block("`git add -A` / `git add .` is forbidden. Stage named paths: `git add path/one path/two`.");
  }

  // `live` is the published site (Vercel production branch). `main` is the working branch.
  const explicitMain = /\bgit\s+push\b[^\n;&|]*:\s*(refs\/heads\/)?live\b|\bgit\s+push\b[^\n;&|]*\sorigin\s+live\b/.test(cmd);
  let bareOnMain = false;
  if (!explicitMain && /\bgit\s+push\b/.test(cmd)) {
    try {
      bareOnMain = execSync("git rev-parse --abbrev-ref HEAD", { cwd: ROOT, timeout: 5000, stdio: ["ignore", "pipe", "ignore"] }).toString().trim() === "live";
    } catch {}
  }
  if ((explicitMain || bareOnMain) && !fresh("publish")) block(PUBLISH_MSG);

  if (/\bgit\s+push\b[^\n;&|]*(\s--force\b|\s-f\b|\s--force-with-lease\b|\s\+\S)/.test(cmd) && !fresh("force-push")) {
    block("force-pushing rewrites saved history and can erase another conversation's work on `main`. Rebase on origin/main and push normally. If her guide asked for a force push, create `.claude/approvals/force-push` and retry.");
  }

  const envFile = /(^|[\s'"`=/\\])\.env(\.(?!example)[\w-]+)?(\s|$|['"`])/.test(cmd);
  const readVerb = /(^|[\s;&|(])(cat|less|more|head|tail|bat|strings|xxd|od|grep|rg|awk|sed|source|\.)\s/.test(cmd) || /readFile/.test(cmd);
  if (envFile && readVerb) {
    block("this reads a .env file through the shell, which prints secrets into the conversation. Code reads values from process.env; you only ever need the NAMES.");
  }

  const writeVerb = /(^|[\s;&|])(tee|cp|mv|rm|truncate|dd)\b|>{1,2}\s*[^&\s]|\bsed\b[^\n;&|]*\s-i\b/.test(cmd);
  if (writeVerb && /\.claude[\\/]supabase-project/.test(cmd) && !fresh("supabase-setup")) {
    block("`.claude/supabase-project` decides which database this studio may touch. Change it only to record HER OWN new project, after her explicit yes (`.claude/approvals/supabase-setup`).");
  }
  if (writeVerb && /(^|[^\w-])\.claude[\\/]hooks[\\/]/.test(cmd) && !fresh("hook-edit")) {
    block("this changes .claude/hooks/, code that runs automatically on every step. Ask the owner (or her guide), then create `.claude/approvals/hook-edit` and retry.");
  }
}

if (tool === "Write" || tool === "Edit" || tool === "NotebookEdit") {
  const fp = String(ti.file_path ?? ti.notebook_path ?? "");
  if (/(^|[\\/])\.claude[\\/]hooks[\\/]/.test(fp) && !fresh("hook-edit")) {
    block("editing .claude/hooks/ changes code that runs automatically on every step. Ask first, then create `.claude/approvals/hook-edit` and retry.");
  }
  if (/(^|[\\/])\.claude[\\/]supabase-project$/.test(fp) && !fresh("supabase-setup")) {
    block("`.claude/supabase-project` decides which database this studio may touch. Change it only to record HER OWN new project, after her explicit yes: create `.claude/approvals/supabase-setup` first.");
  }
  if (/(^|[\\/])\.env(\.(?!example)[\w-]+)?$/.test(fp)) {
    block("never write secrets into a file in the repo. Secrets go in Vercel / Supabase / the cloud environment's variables.");
  }
}

process.exit(0);
