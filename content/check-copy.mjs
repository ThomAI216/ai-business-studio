// The copy law, checked so it cannot drift back in.
//
//   node content/check-copy.mjs          (from the repo root, or anywhere)
//
// 1. NO FULL STOPS in display copy: titles, bodies, closings, eyebrows, labels.
//    A terminal stop makes a headline read as prose and closes a line meant to
//    stay open. Two sentences are REWRITTEN as one (comma or conjunction), not
//    left as a run-on with the stop deleted.
// 2. NO EM DASHES anywhere in copy. Reword with commas or colons.
//
// Decimals (2.8), times (22:00), URLs and file names are data, not punctuation.
//
// What it scans:
//   motion/src/slides/**/*.tsx   string literals that look like copy
//   motion/scenes/*.json         every string value in a scene document
//   content/carousels/**/*.md    lines under a "## Copy" heading (the locked copy)
// Exit 1 on any violation, so it can gate a render.
import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')
const STOP = /[\p{L},)'"’”][.](\s|$|['"’”])/u // a full stop ending a word
const EMDASH = /—/
const DATA = /(https?:\/\/|www\.|\.(png|jpe?g|webp|mp4|json|md|tsx?|css)\b|@\S+\.\S+)/i

const walk = (dir, ext) =>
  !fs.existsSync(dir) ? [] :
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) =>
    d.isDirectory() ? (d.name === 'node_modules' ? [] : walk(path.join(dir, d.name), ext))
    : d.name.endsWith(ext) ? [path.join(dir, d.name)] : [])

const problems = []
const check = (file, line, text) => {
  if (DATA.test(text)) return
  if (STOP.test(text)) problems.push(`${file}:${line}  full stop  ${text.trim()}`)
  if (EMDASH.test(text)) problems.push(`${file}:${line}  em dash    ${text.trim()}`)
}
const rel = (f) => path.relative(ROOT, f)

// 1. slide sources: only string literals, never comments or code
for (const file of walk(path.join(ROOT, 'motion/src/slides'), '.tsx')) {
  let inBlock = false
  fs.readFileSync(file, 'utf8').split('\n').forEach((line, i) => {
    if (inBlock) { if (line.includes('*/')) inBlock = false; return }
    if (/^\s*\/\*/.test(line) && !line.includes('*/')) { inBlock = true; return }
    if (/^\s*(\/\/|\*|\/\*)/.test(line)) return
    for (const m of line.matchAll(/(['"`])((?:\\.|(?!\1).)*)\1/g)) {
      const s = m[2]
      if (s.split(' ').length < 2) continue // single tokens are keys, ids, enum values
      check(rel(file), i + 1, s.replace(/\\n/g, ' '))
    }
  })
}

// 2. scene documents: every string value
const visit = (file, v) =>
  typeof v === 'string' ? (v.includes(' ') && check(rel(file), '-', v.replace(/\n/g, ' ')))
  : Array.isArray(v) ? v.forEach((x) => visit(file, x))
  : v && typeof v === 'object' ? Object.values(v).forEach((x) => visit(file, x)) : null
for (const file of walk(path.join(ROOT, 'motion/scenes'), '.json')) {
  try { visit(file, JSON.parse(fs.readFileSync(file, 'utf8'))) }
  catch (e) { problems.push(`${rel(file)}  not valid JSON: ${e.message}`) }
}

// 3. carousel briefs: the locked copy section only
for (const file of walk(path.join(ROOT, 'content/carousels'), '.md')) {
  let inCopy = false
  fs.readFileSync(file, 'utf8').split('\n').forEach((line, i) => {
    if (/^##\s/.test(line)) { inCopy = /^##\s+copy\b/i.test(line); return }
    if (inCopy && line.trim() && !/^\s*(<!--|```)/.test(line)) check(rel(file), i + 1, line.replace(/^\s*[-*]\s*(\w+:)?/, ''))
  })
}

if (problems.length) {
  console.log(problems.map((p) => '  ' + p).join('\n'))
  console.error(`\ncheck-copy: ${problems.length} violation${problems.length === 1 ? '' : 's'}`)
  process.exit(1)
}
console.log('check-copy: clean')
