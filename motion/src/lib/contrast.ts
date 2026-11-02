/**
 * WCAG contrast, the same maths as scripts/tint-matrix.mjs, in TS so a slide
 * or a check can measure an ink against its ground. TINTS in
 * src/brand/tokens.ts stays the checked-in truth for the palette.
 *
 * Floors: 4.5 for body-class text, 3.0 for the display title (large type).
 * When a plate (photo or gradient) sits behind the type, measure the FINISHED
 * FRAME: against the ground token this is only the optimistic bound.
 */

const linear = (v: number): number =>
  v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4

/** '#RGB' or '#RRGGBB' to [r, g, b] 0..255; null when it is not a hex colour */
export const hexToRgb = (hex: string): [number, number, number] | null => {
  const h = hex.trim().replace(/^#/, '')
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  if (!/^[0-9a-fA-F]{6}$/.test(full)) return null
  return [
    parseInt(full.slice(0, 2), 16),
    parseInt(full.slice(2, 4), 16),
    parseInt(full.slice(4, 6), 16),
  ]
}

export const luminance = (hex: string): number | null => {
  const rgb = hexToRgb(hex)
  if (!rgb) return null
  const [r, g, b] = rgb.map((v) => linear(v / 255))
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/** WCAG ratio between two hex colours, 1..21; null when either fails to parse */
export const contrastRatio = (a: string, b: string): number | null => {
  const la = luminance(a)
  const lb = luminance(b)
  if (la === null || lb === null) return null
  const hi = Math.max(la, lb)
  const lo = Math.min(la, lb)
  return (hi + 0.05) / (lo + 0.05)
}

export const BODY_FLOOR = 4.5
export const TITLE_FLOOR = 3.0
