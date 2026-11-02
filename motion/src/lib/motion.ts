import { spring, interpolate, Easing } from 'remotion'

/**
 * The motion grammar. Every slide times itself through these helpers, so
 * motion stays comparable across slides and decks.
 *
 * The whole "premium" question is decided here, not by the renderer. Four
 * things separate motion that feels like an object from motion that feels
 * like a div appearing:
 *
 *   1. Physics, not curves. A spring has mass, so it settles rather than
 *      stopping. A tiny overshoot of one or two percent reads as a real
 *      object; ten percent reads as a toy.
 *   2. Overlap. Siblings start before the previous one has finished. A
 *      stagger of three or four frames feels composed; fifteen feels like
 *      a slideshow.
 *   3. Secondary motion. Anything that scales also drifts slightly, and
 *      anything that arrives resolves out of a small blur. Focus pulling
 *      into place is the single strongest premium tell available in CSS.
 *   4. Deceleration only. Nothing in this system accelerates into place.
 */

export const FPS = 30

/**
 * Calm, burst, hold.
 *
 * Two seconds of nothing, then an event every ~470ms, then a long freeze. The
 * calm is what makes the burst land, and the freeze is what makes it read as
 * intentional rather than as a loop. Decks that start moving at frame 2 feel
 * busy for exactly this reason.
 */
export const CALM = 60   // 2.0s of stillness before anything happens
export const BEAT = 14   // ~470ms between siblings in a burst
export const POP = 9     // ~300ms for a single entrance
export const HOLD = 90   // 3.0s settled at the end, the poster frame

/** Spring presets. damping high enough that nothing wobbles. */
export const SPRING = {
  /** panels, cards, glass. settles with a barely visible overshoot */
  settle: { damping: 26, stiffness: 110, mass: 0.9 },
  /** big slow moves, backgrounds, whole-layer arrivals */
  glide: { damping: 30, stiffness: 78, mass: 1.15 },
  /** dots, nodes, ticks. quicker and slightly livelier */
  mark: { damping: 19, stiffness: 190, mass: 0.55 },
  /** type. critically damped, because overshooting text looks cheap */
  text: { damping: 36, stiffness: 130, mass: 0.8 },
} as const

export type Preset = keyof typeof SPRING

/**
 * Progress 0..1 for an element entering at `delay` frames.
 * Everything in a composition should come through here so timing stays
 * comparable across slides.
 */
export const enter = (
  frame: number,
  delay: number,
  preset: Preset = 'settle',
  fps: number = FPS,
) =>
  spring({
    frame: frame - delay,
    fps,
    config: SPRING[preset],
    durationInFrames: undefined,
  })

/** Linear-time progress for things that must not overshoot: path draws, wipes. */
export const ramp = (
  frame: number,
  delay: number,
  duration: number,
  easing = Easing.bezier(0.22, 1, 0.36, 1),
) =>
  interpolate(frame, [delay, delay + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing,
  })

/**
 * Stagger. Deliberately tight: 3 to 5 frames between siblings, so the group
 * reads as one gesture rather than a queue.
 */
export const stagger = (i: number, step = 4, base = 0) => base + i * step

/**
 * Entry transform. Scale, drift and blur resolve together from one progress
 * value, which is what keeps a group feeling like it shares physics.
 */
export const entryStyle = (
  p: number,
  opts: { y?: number; x?: number; scale?: number; blur?: number; fade?: boolean } = {},
): React.CSSProperties => {
  const { y = 22, x = 0, scale = 1, blur = 8, fade = true } = opts
  const inv = 1 - p

  /**
   * SNAP TO REST.
   *
   * A spring approaches its target asymptotically and never actually reaches
   * it, so an element that has visually finished moving is still carrying a
   * transform of something like translateY(0.003px) for the rest of the shot.
   * That is not nothing: a fractional transform forces the glyphs to be
   * re-rasterised against a slightly different sub-pixel grid every frame, and
   * on a large serif over a textured plate it reads as a shimmer. Text that has
   * arrived must be composited at exactly its resting position, with no
   * transform, no filter and no promoted layer.
   *
   * The threshold is in PIXELS rather than in progress, because the same
   * progress means a different visible offset for a 26px drift than for a 4px
   * one.
   */
  const dy = inv * y
  const dx = inv * x
  const ds = scale === 1 ? 0 : Math.abs(1 - (scale + (1 - scale) * p))
  const b = inv * blur
  const atRest = Math.abs(dy) < 0.05 && Math.abs(dx) < 0.05 && ds < 0.0005 && b < 0.35

  if (atRest) {
    return { opacity: fade ? Math.min(1, p * 1.35) : 1 }
  }

  const parts: string[] = []
  if (y) parts.push(`translateY(${dy.toFixed(3)}px)`)
  if (x) parts.push(`translateX(${dx.toFixed(3)}px)`)
  if (scale !== 1) parts.push(`scale(${(scale + (1 - scale) * p).toFixed(5)})`)
  return {
    transform: parts.length ? parts.join(' ') : undefined,
    opacity: fade ? Math.min(1, p * 1.35) : 1,
    // Sub-pixel blur costs a lot and buys nothing, so it is dropped near the end.
    filter: b > 0.35 ? `blur(${b.toFixed(2)}px)` : undefined,
    willChange: 'transform, opacity, filter',
  }
}

/**
 * Stroke-draw for an SVG path. Returns the dash properties; the caller
 * supplies the measured length.
 */
export const drawStyle = (p: number, length: number): React.CSSProperties => ({
  strokeDasharray: length,
  strokeDashoffset: length * (1 - p),
})

/** Count a number up, with the same deceleration as everything else. */
export const countTo = (p: number, to: number, from = 0) => from + (to - from) * p

/** Seconds to frames, so timings can be written in human units. */
export const s = (seconds: number, fps: number = FPS) => Math.round(seconds * fps)
