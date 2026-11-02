// Render settled stills of every composition whose id starts with a prefix.
//   node export-stills.mjs Example          -> out/Example-1.png, Example-2.png, ...
//   node export-stills.mjs Example 150      (optional frame; default = 30 frames before the end)
// Never frame 0: everything eases in, so frame 0 is an empty ground.
import { bundle } from '@remotion/bundler'
import { getCompositions, renderStill } from '@remotion/renderer'
import path from 'node:path'
import fs from 'node:fs'
import { browserExecutable } from './scripts/browser.mjs'

const prefix = process.argv[2]
if (!prefix) { console.error('usage: node export-stills.mjs <IdPrefix> [frame]'); process.exit(1) }
const OUT = path.join(process.cwd(), 'out')
fs.mkdirSync(OUT, { recursive: true })

const serveUrl = await bundle({ entryPoint: path.join(process.cwd(), 'src/index.ts') })
const browser = browserExecutable()
const comps = (await getCompositions(serveUrl, { browserExecutable: browser })).filter((c) => c.id.startsWith(prefix))
if (!comps.length) { console.error(`no composition id starts with "${prefix}"`); process.exit(1) }

for (const composition of comps) {
  const frame = process.argv[3] ? Number(process.argv[3]) : Math.max(0, composition.durationInFrames - 30)
  const output = path.join(OUT, `${composition.id}.png`)
  await renderStill({ composition, serveUrl, output, frame, browserExecutable: browser, chromiumOptions: { gl: 'swangle' } })
  console.log(`  ${composition.id} @ frame ${frame} -> ${output}`)
}
