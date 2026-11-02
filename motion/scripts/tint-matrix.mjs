// Regenerate the tint x ground ink matrix for src/brand/tokens.ts.
//
//   node scripts/tint-matrix.mjs
//
// A tint is NOT one colour. The legible version of a hue depends on what it
// sits on, and it inverts between light and dark grounds (a yellow that is
// excellent on a dark ground is invisible on a light one). For every
// (tint, ground) pair this walks the hue's lightness AWAY from the ground and
// stops at the first value that clears the 4.5 body floor: the closest version
// of the brand's own colour that still reads.
//
// Edit HUES and GROUNDS from docs/wiki/brand/visual.md, run, paste the printed
// TINTS block into src/brand/tokens.ts. Values are checked in, not computed at
// runtime, so a palette change is reviewable in a diff.
import { pathToFileURL } from 'node:url'

const FLOOR = 4.5

// the brand's accent colours AS DRAWN (placeholders until the brand skill runs)
export const HUES = {
  accent: '#2F6F62',
  warm: '#C2603A',
  cool: '#3D5A99',
  bright: '#E2B33C',
}

// must match GROUNDS in src/brand/tokens.ts
export const GROUNDS = {
  light: '#F6F3EE',
  dark: '#16201E',
  night: '#141B2D',
}

const lin = (v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)
const rgb = (h) => [0, 2, 4].map((i) => parseInt(h.replace('#', '').slice(i, i + 2), 16) / 255)
const lum = (h) => { const [r, g, b] = rgb(h).map(lin); return 0.2126 * r + 0.7152 * g + 0.0722 * b }
export const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05) }

const toHsl = ([r, g, b]) => {
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2
  if (mx === mn) return [0, 0, l]
  const d = mx - mn, s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn)
  const h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4
  return [h / 6, s, l]
}
const fromHsl = ([h, s, l]) => {
  const f = (n) => { const k = (n + h * 12) % 12, a = s * Math.min(l, 1 - l); return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1)) }
  return '#' + [f(0), f(8), f(4)].map((v) => Math.round(v * 255).toString(16).padStart(2, '0')).join('').toUpperCase()
}

export const inkFor = (hue, ground) => {
  if (ratio(hue, ground) >= FLOOR) return hue.toUpperCase()
  const [h, s, l0] = toHsl(rgb(hue))
  const step = lum(ground) > 0.4 ? -0.005 : 0.005 // walk away from the ground
  for (let l = l0; l >= 0 && l <= 1; l += step) {
    const c = fromHsl([h, s, l])
    if (ratio(c, ground) >= FLOOR) return c
  }
  return lum(ground) > 0.4 ? '#000000' : '#FFFFFF'
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const g = Object.keys(GROUNDS)
  console.log(`export const TINTS = {\n  //        ${g.map((x) => ('on ' + x).padEnd(18)).join(' ')}`)
  for (const [name, hue] of Object.entries(HUES)) {
    const cells = g.map((k) => { const ink = inkFor(hue, GROUNDS[k]); return `${k}: '${ink}'` })
    const notes = g.map((k) => ratio(inkFor(hue, GROUNDS[k]), GROUNDS[k]).toFixed(2)).join(' / ')
    console.log(`  ${(name + ':').padEnd(8)}{ ${cells.join(', ')} }, // ${notes}`)
  }
  console.log('} as const')
}
