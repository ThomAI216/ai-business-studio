#!/usr/bin/env bash
# Vendor (or upgrade) the claude-seo toolkit into this repo, the way its own install.sh
# does for ~/.claude, but into .claude/ so it travels with every copy of the template and
# works in fresh cloud containers.
#
#   git clone --depth 1 https://github.com/AgriciDaniel/claude-seo.git /tmp/claude-seo
#   bash tools/vendor-claude-seo.sh /tmp/claude-seo
#
# Then re-run the checks in the seo-checkup skill and update the version in
# .claude/skills/seo/VENDORED.md. Core skills only; the optional extensions are skipped.
set -euo pipefail

SRC="${1:?usage: vendor-claude-seo.sh <path-to-claude-seo-checkout>}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SKILLS="$ROOT/.claude/skills"
AGENTS="$ROOT/.claude/agents"
[ -f "$SRC/skills/seo/SKILL.md" ] || { echo "not a claude-seo checkout: $SRC" >&2; exit 1; }
VERSION=$(python3 -c "import json,sys;print(json.load(open('$SRC/.claude-plugin/plugin.json'))['version'])")
COMMIT=$(git -C "$SRC" rev-parse --short HEAD 2>/dev/null || echo unknown)

# 1. Remove the previous vendored copy (only what this script installs).
for d in "$SRC"/skills/*/; do rm -rf "$SKILLS/$(basename "$d")"; done
for f in "$SRC"/agents/*.md; do rm -f "$AGENTS/$(basename "$f")"; done

# 2. Copy skills, agents and the hub's support folders.
for d in "$SRC"/skills/*/; do cp -r "$d" "$SKILLS/$(basename "$d")"; done
cp "$SRC"/agents/*.md "$AGENTS/"
for sub in scripts schema data hooks; do
  [ -d "$SRC/$sub" ] && { mkdir -p "$SKILLS/seo/$sub"; cp -r "$SRC/$sub/." "$SKILLS/seo/$sub/"; }
done
cp "$SRC/requirements.txt" "$SKILLS/seo/requirements.txt"
cp "$SRC/.claude-plugin/plugin.json" "$SKILLS/seo/runtime-plugin.json"
cp "$SRC/LICENSE" "$SKILLS/seo/LICENSE"
chmod +x "$SKILLS/seo/scripts/claude-seo"
find "$SKILLS/seo/scripts" -name '__pycache__' -prune -exec rm -rf {} +

# 3. There is no plugin root here: point the plugin-root token at repo-relative paths.
#    Claude runs commands from the repo root, and reads .claude/... paths from there.
rewrite() {
  sed -i \
    -e 's#"${CLAUDE_PLUGIN_ROOT}/scripts/claude-seo"#".claude/skills/seo/scripts/claude-seo"#g' \
    -e 's#${CLAUDE_PLUGIN_ROOT}/scripts/claude-seo#.claude/skills/seo/scripts/claude-seo#g' \
    -e 's#${CLAUDE_PLUGIN_ROOT}/skills/#.claude/skills/#g' \
    -e 's#${CLAUDE_PLUGIN_ROOT}/scripts/#.claude/skills/seo/scripts/#g' \
    "$1"
}
for d in "$SRC"/skills/*/; do
  find "$SKILLS/$(basename "$d")" -type f -name '*.md' -print0 | while IFS= read -r -d '' f; do rewrite "$f"; done
done
for f in "$SRC"/agents/*.md; do rewrite "$AGENTS/$(basename "$f")"; done

left=$(grep -rl 'CLAUDE_PLUGIN_ROOT' "$SKILLS"/seo* "$AGENTS"/seo-*.md 2>/dev/null | grep -v '/scripts/' || true)
[ -n "$left" ] && { echo "WARNING: plugin-root tokens left in:"; echo "$left"; }

cat > "$SKILLS/seo/VENDORED.md" <<EOF
# Vendored: claude-seo v$VERSION

From [AgriciDaniel/claude-seo](https://github.com/AgriciDaniel/claude-seo) at commit \`$COMMIT\`,
MIT licensed (\`LICENSE\` in this folder). Vendored with \`tools/vendor-claude-seo.sh\`, which
copies the core skills (\`.claude/skills/seo*\`), the agents (\`.claude/agents/seo-*.md\`) and the
runtime (\`scripts/\`, \`schema/\`, \`data/\`, \`hooks/\`), and rewrites the plugin-root paths to
repo-relative ones. Do not edit these files by hand: re-run the script to upgrade. The plain-
language wrapper for the owner is our own \`seo-checkup\` skill.
EOF
echo "claude-seo v$VERSION ($COMMIT) vendored: $(ls -d "$SKILLS"/seo* | wc -l) skills, $(ls "$AGENTS"/seo-*.md | wc -l) agents"
