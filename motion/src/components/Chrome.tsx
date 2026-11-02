import React from 'react'
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from 'remotion'
import { enter, entryStyle, stagger } from '../lib/motion'
import { parseRich, type RichLine } from '../lib/richtext'
import {
  BRAND, FONTS, GROUNDS, INK, LAYOUT, LIGHT_GROUNDS, TINTS,
  type Ground, type Tint,
} from '../brand/tokens'

/**
 * Slide chrome: the ONE place that decides where the eyebrow, title, body,
 * closing line and wordmark sit and how they look. Slide files own only their
 * picture (the one graphic); structure comes from here, so a change lands on
 * every slide at once.
 *
 * Order on every slide: eyebrow (mark + label) → Title on the seam → Body →
 * the one graphic → Closing line → wordmark centred at the foot.
 */

/* ------------------------------------------------------------------ */
/* TINT × GROUND: one decision per slide                              */
/* ------------------------------------------------------------------ */

/**
 * A slide makes ONE colour decision: <SlideTint tint ground>. It recolours the
 * eyebrow mark, eyebrow type, footer mark and footer type together, from a
 * context rather than four props, so a slide physically cannot end up with
 * mismatched accents. The GROUND also decides light-or-dark type for the title,
 * body and closing line, so dark type can never land on a dark plate.
 */
type Scheme = { tint: Tint; ground: Ground }
const TintContext = React.createContext<Scheme>({ tint: 'accent', ground: 'light' })

export const SlideTint: React.FC<{ tint?: Tint; ground?: Ground; children: React.ReactNode }> = ({
  tint = 'accent',
  ground = 'light',
  children,
}) => <TintContext.Provider value={{ tint, ground }}>{children}</TintContext.Provider>

export const useScheme = () => React.useContext(TintContext)
export const inkOf = (tint: Tint, ground: Ground) => TINTS[tint][ground]
export const isDarkGround = (g: Ground) => !LIGHT_GROUNDS.includes(g)
export const useDark = () => isDarkGround(useScheme().ground)

/* ------------------------------------------------------------------ */
/* The frame and the plates                                           */
/* ------------------------------------------------------------------ */

/** The canvas: ground colour, brand faces, no overflow. Wrap every slide in it. */
export const Frame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { ground } = useScheme()
  return (
    <AbsoluteFill
      style={{
        width: LAYOUT.width,
        height: LAYOUT.height,
        background: GROUNDS[ground],
        fontFamily: FONTS.sans,
        color: isDarkGround(ground) ? INK.onDark : INK.onLight,
        overflow: 'hidden',
        isolation: 'isolate',
      }}
    >
      {children}
    </AbsoluteFill>
  )
}

export type GradientFamily = 'bloom' | 'shaft' | 'dunes'

/**
 * A plate made of CSS only, so a deck renders with no image files at all.
 * Three families, matching the generated-plate families in content/prompts.md:
 *   bloom  a soft spotlight blooming through haze (safest under type)
 *   shaft  one soft shaft of light falling through a dark ground
 *   dunes  layered soft bands, a calm sculpted feel
 * `hue` is any colour (usually the slide's tint ink); `at` places the light.
 * A gradient plate never moves: a moving ground makes still type shimmer.
 */
export const GradientPlate: React.FC<{
  family?: GradientFamily
  hue?: string
  at?: 'top-left' | 'top-right' | 'center' | 'bottom-left' | 'bottom-right'
  strength?: number
}> = ({ family = 'bloom', hue, at = 'top-right', strength = 0.55 }) => {
  const { tint, ground } = useScheme()
  const light = hue ?? inkOf(tint, ground)
  const base = GROUNDS[ground]
  const pos = {
    'top-left': '18% 14%', 'top-right': '82% 14%', center: '50% 45%',
    'bottom-left': '18% 86%', 'bottom-right': '82% 86%',
  }[at]
  const a = (x: number) => Math.round(Math.min(1, x * strength) * 255).toString(16).padStart(2, '0')
  const layers: Record<GradientFamily, string> = {
    bloom: `radial-gradient(ellipse 70% 55% at ${pos}, ${light}${a(1)} 0%, ${light}${a(0.35)} 38%, ${base}00 72%), ${base}`,
    shaft: `linear-gradient(${at.includes('left') ? 160 : 200}deg, ${light}${a(0.9)} 0%, ${light}${a(0.25)} 30%, ${base}00 58%), radial-gradient(ellipse 60% 40% at 50% 100%, ${light}${a(0.25)} 0%, ${base}00 70%), ${base}`,
    dunes: `radial-gradient(ellipse 120% 40% at 30% 100%, ${light}${a(0.7)} 0%, ${base}00 60%), radial-gradient(ellipse 110% 35% at 80% 78%, ${light}${a(0.45)} 0%, ${base}00 62%), radial-gradient(ellipse 90% 30% at 40% 58%, ${light}${a(0.25)} 0%, ${base}00 64%), ${base}`,
  }
  return (
    <>
      <AbsoluteFill style={{ background: layers[family], filter: 'blur(24px)', transform: 'scale(1.08)' }} />
      <Grain />
    </>
  )
}

/** paper grain, so the plate and the drawn elements share one surface */
const Grain: React.FC = () => {
  const dark = useDark()
  return (
    <AbsoluteFill
      style={{
        opacity: 0.05,
        mixBlendMode: dark ? 'overlay' : 'multiply',
        backgroundImage: 'radial-gradient(circle at 1px 1px, #7A7468 0.7px, transparent 0)',
        backgroundSize: '3px 3px',
      }}
    />
  )
}

/**
 * A photographic plate from public/, VEILED. A plate is never used raw: type
 * sits directly on it, and a plate at full strength turns a headline into
 * something you decode rather than read.
 *
 *   veil  a wash of the slide's own ground colour. Light plate under dark type:
 *         0.55 to 0.72. Dark plate under light type: 0.35 to 0.55.
 *   blur  for plates with SHARP detail (~12.6). Reach for blur, not more veil:
 *         veil kills the light that made the plate worth having, blur kills
 *         only the detail that competes with type.
 * A dark plate veiled toward a light ground becomes a MID ground: re-measure
 * contrast on the finished frame. There is deliberately no drift option: a
 * plate moving under type makes the letters shimmer and triples file size.
 */
export const Backdrop: React.FC<{ plate: string; veil?: number; blur?: number }> = ({
  plate,
  veil = 0.6,
  blur = 0,
}) => {
  const { ground } = useScheme()
  // blur pulls transparency in from the edges; overscale so it falls outside the frame
  const bleed = blur ? 1 + (blur * 3) / LAYOUT.width : 1
  return (
    <>
      <AbsoluteFill style={{ overflow: 'hidden' }}>
        <Img
          src={staticFile(plate)}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            filter: blur ? `blur(${blur}px)` : undefined,
            transform: `scale(${bleed})`,
          }}
        />
      </AbsoluteFill>
      <AbsoluteFill style={{ background: GROUNDS[ground], opacity: veil }} />
      <Grain />
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Type                                                               */
/* ------------------------------------------------------------------ */

/** The mark: the brand's logo mask if it has one, else a small square, in the tint ink. */
export const Mark: React.FC<{ height?: number; ink?: string }> = ({ height = 40, ink }) => {
  const { tint, ground } = useScheme()
  const colour = ink ?? inkOf(tint, ground)
  if (!BRAND.logoMask) {
    return <div style={{ width: height * 0.42, height: height * 0.42, background: colour, borderRadius: 4, flex: 'none' }} />
  }
  const mask = `url(${staticFile(BRAND.logoMask)})`
  return (
    <div
      style={{
        width: height, height, flex: 'none', background: colour,
        WebkitMaskImage: mask, maskImage: mask,
        WebkitMaskSize: 'contain', maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center', maskPosition: 'center',
      }}
    />
  )
}

/** body-class markdown-lite: \n breaks, **bold** = weight 500 (700 reads heavy at this size) */
const richSpans = (lines: RichLine[]): React.ReactNode =>
  lines.map((line, li) => (
    <React.Fragment key={li}>
      {li > 0 && <br />}
      {line.map((s, si) =>
        s.bold || s.italic ? (
          <span key={si} style={{ fontWeight: s.bold ? 500 : undefined, fontStyle: s.italic ? 'italic' : undefined }}>
            {s.text}
          </span>
        ) : (
          <React.Fragment key={si}>{s.text}</React.Fragment>
        ),
      )}
    </React.Fragment>
  ))

export const rich = (children: React.ReactNode): React.ReactNode =>
  typeof children === 'string' ? richSpans(parseRich(children)) : children

/** The eyebrow: mark + a short mono label, in the slide's tint. */
export const Eyebrow: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 2 }) => {
  const frame = useCurrentFrame()
  const { tint, ground } = useScheme()
  return (
    <div
      style={{
        fontFamily: FONTS.mono, fontSize: 28, letterSpacing: '.2em', textTransform: 'uppercase',
        color: inkOf(tint, ground), display: 'flex', alignItems: 'center', gap: 18,
        ...entryStyle(enter(frame, delay, 'text'), { y: 12, blur: 4 }),
      }}
    >
      <Mark />
      {rich(children)}
    </div>
  )
}

/**
 * The headline, ON THE SEAM. The seam is the only emphasis device: write the
 * sentence so it has a seam, break the line on it, and **bold** the half that
 * carries the point. Bold here means LIT (full ink); the unbolded framing half
 * drops in VALUE only. One size, one weight, one face across the seam.
 * The face is the display face and is deliberately NOT a prop: a prop is an
 * invitation to set it wrong on one slide out of seven.
 */
export const Title: React.FC<{ title: string; size?: number; delay?: number; style?: React.CSSProperties }> = ({
  title, size = 92, delay = 10, style,
}) => {
  const frame = useCurrentFrame()
  const dark = useDark()
  const lit = dark ? INK.onDark : INK.onLight
  const muted = dark ? INK.onDarkMuted : INK.onLightMuted
  return (
    <h2 style={{ fontFamily: FONTS.display, fontWeight: 400, fontSize: size, lineHeight: 1.06, letterSpacing: '-0.012em', margin: 0, ...style }}>
      {parseRich(title).map((line, i) => (
        <span key={i} style={{ display: 'block', ...entryStyle(enter(frame, stagger(i, 6, delay), 'text'), { y: 26, blur: 9 }) }}>
          {line.map((s, si) => (
            <span key={si} style={{ color: s.bold ? lit : muted, fontStyle: s.italic ? 'italic' : undefined }}>
              {s.text}
            </span>
          ))}
        </span>
      ))}
    </h2>
  )
}

/** Body copy: a real reading size, not a caption (Instagram downsizes 1080 to ~400). */
export const Body: React.FC<{ children: React.ReactNode; delay?: number; style?: React.CSSProperties }> = ({
  children, delay = 22, style,
}) => {
  const frame = useCurrentFrame()
  const dark = useDark()
  return (
    <p
      style={{
        fontSize: 34, fontWeight: 400, lineHeight: 1.46, maxWidth: '40ch', margin: 0,
        color: dark ? INK.onDark : INK.onLight,
        ...entryStyle(enter(frame, delay, 'text'), { y: 18, blur: 6 }),
        ...style,
      }}
    >
      {rich(children)}
    </p>
  )
}

/**
 * The closing line: the slide's POINT, not a footnote. In the display face,
 * lifted clear of the floor, and it lands only after the graphic has finished.
 */
export const Closing: React.FC<{ children: React.ReactNode; delay?: number; style?: React.CSSProperties }> = ({
  children, delay = 40, style,
}) => {
  const frame = useCurrentFrame()
  const dark = useDark()
  return (
    <p
      style={{
        fontFamily: FONTS.display, fontWeight: 400, fontSize: 46, letterSpacing: '-0.01em', lineHeight: 1.18, margin: 0,
        color: dark ? INK.closingOnDark : INK.closingOnLight,
        ...entryStyle(enter(frame, delay, 'text'), { y: 14, blur: 5 }),
        ...style,
      }}
    >
      {rich(children)}
    </p>
  )
}

/** The mark beside the brand name, centred at the foot. Real type, so it stays sharp and takes the tint. */
export const Wordmark: React.FC<{ delay?: number }> = ({ delay = 4 }) => {
  const frame = useCurrentFrame()
  const { tint, ground } = useScheme()
  return (
    <div
      style={{
        position: 'absolute', left: 0, right: 0, bottom: 46,
        display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14,
        ...entryStyle(enter(frame, delay, 'text'), { y: 8, blur: 3 }),
      }}
    >
      <Mark height={34} />
      <span style={{ fontFamily: FONTS.display, fontSize: 34, letterSpacing: '-0.008em', color: inkOf(tint, ground) }}>
        {BRAND.name}
      </span>
    </div>
  )
}

/** Padding that leaves room for the closing line and the wordmark beneath it. */
export const SLIDE_PAD: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  padding: `96px ${LAYOUT.margin}px 170px`,
  display: 'flex',
  flexDirection: 'column',
}
