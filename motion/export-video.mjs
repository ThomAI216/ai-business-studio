// Render one composition to MP4 with the programmatic API.
//   node export-video.mjs <CompositionId> [outName]
// (The CLI's `remotion render` can stall waiting on fonts; bundle() +
// renderMedia() is the reliable path.)
//
// crf 12, not the default 18: large serif type and 1px glass rims over a soft
// gradient are the worst case for h264, which spends its bits on the smooth
// background and leaves ringing around the letters that reads as shimmer.
// Judge shimmer from THIS video, never from a still.
import { bundle } from '@remotion/bundler'
import { selectComposition, renderMedia } from '@remotion/renderer'
import path from 'node:path'
import fs from 'node:fs'
import { browserExecutable } from './scripts/browser.mjs'

const id = process.argv[2]
if (!id) { console.error('usage: node export-video.mjs <CompositionId> [outName]'); process.exit(1) }
const name = process.argv[3] ?? id
const OUT = path.join(process.cwd(), 'out')
fs.mkdirSync(OUT, { recursive: true })

console.log('bundling...')
const serveUrl = await bundle({ entryPoint: path.join(process.cwd(), 'src/index.ts') })
const browser = browserExecutable()
const composition = await selectComposition({ serveUrl, id, browserExecutable: browser })
const output = path.join(OUT, `${name}.mp4`)
let last = -1

await renderMedia({
  composition,
  serveUrl,
  codec: 'h264',
  crf: 12,
  outputLocation: output,
  browserExecutable: browser,
  chromiumOptions: { gl: 'swangle' },
  timeoutInMilliseconds: 180000,
  concurrency: 2,
  onProgress: ({ progress }) => {
    const pct = Math.floor(progress * 10) * 10
    if (pct !== last) { last = pct; process.stdout.write(`  ${pct}%`) }
  },
})
console.log(`\n  ${composition.durationInFrames} frames -> ${output} (${(fs.statSync(output).size / 1024 / 1024).toFixed(1)}MB)`)
