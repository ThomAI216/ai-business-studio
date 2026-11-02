import React from 'react'
import { entryStyle } from '../lib/motion'

/**
 * Liquid glass, NOT frosted.
 *
 * The backdrop is blurred by HALF A PIXEL. What makes it read as glass is not
 * blur at all, it is four stacked layers:
 *
 *   1. backdrop   blur(0.5px) + saturate(1.2), optionally an SVG refraction
 *   2. tint       flat white at ~40% (see-through) or ~60% (light)
 *   3. rim        three white inset shadows, the lit liquid-glass edge
 *   4. bevel      a 1.5px border lit top-left, dark bottom-right
 *
 * A heavy blur destroys this: you stop seeing through the card, the rim has
 * nothing to catch, and it becomes a white slab. Glass also needs something
 * BEHIND it to sample (a plate or gradient): on a flat fill it is invisible.
 *
 * THE STACKING TRAP: opacity < 1 on the element carrying backdrop-filter makes
 * it the backdrop root, and it samples itself (the blur silently dies). The
 * wrapper animates; the glass never does.
 */

/** Inject once per composition. The refraction filters live here. */
export const LiquidGlassDefs: React.FC = () => (
  <svg aria-hidden width={0} height={0} style={{ position: 'absolute' }}>
    <defs>
      {/* Chromatic refraction. R, G and B are displaced by different amounts
          (14 / 8 / 2) and screen-blended, which is what splits light at the
          card edge instead of merely smearing it. */}
      <filter id="glass-card" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox">
        <feTurbulence type="fractalNoise" baseFrequency="0.015 0.015" numOctaves={2} seed={92} result="noise" />
        <feGaussianBlur in="noise" stdDeviation="1.4" result="map" />
        <feDisplacementMap in="SourceGraphic" in2="map" scale={14} xChannelSelector="R" yChannelSelector="G" result="rch" />
        <feColorMatrix in="rch" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r" />
        <feDisplacementMap in="SourceGraphic" in2="map" scale={8} xChannelSelector="R" yChannelSelector="G" result="gch" />
        <feColorMatrix in="gch" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="g" />
        <feDisplacementMap in="SourceGraphic" in2="map" scale={2} xChannelSelector="R" yChannelSelector="G" result="bch" />
        <feColorMatrix in="bch" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="b" />
        <feBlend in="r" in2="g" mode="screen" result="rg" />
        <feBlend in="rg" in2="b" mode="screen" />
      </filter>
      {/* the gentler ripple used on large panels, so fine detail behind the
          card does not smear */}
      <filter id="glass-soft" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox">
        <feTurbulence type="fractalNoise" baseFrequency="0.009 0.009" numOctaves={2} seed={92} result="noise" />
        <feGaussianBlur in="noise" stdDeviation="1.4" result="blurred" />
        <feDisplacementMap in="SourceGraphic" in2="blurred" scale={30} xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
  </svg>
)

const FILL: React.CSSProperties = { position: 'absolute', inset: 0, pointerEvents: 'none' }

type Props = {
  /** 0..1 entry progress */
  p?: number
  /**
   * 'see'   over dark or photographic grounds: 20% fill, lit rim, background reads through
   * 'light' over cream: 50% fill, no rim, still barely blurred
   */
  tone?: 'see' | 'light'
  /** corner radius; ~7% of the card width reads as the same object at any size */
  radius?: number
  padding?: number
  /** chromatic displacement on the backdrop. Off by default: it smears fine detail. */
  refraction?: boolean
  /** tint alpha override. Defaults: 0.40 on deep, 0.60 on cream. */
  fill?: number
  /** default 0.5. Anything above ~4 stops being glass. */
  blur?: number
  y?: number
  style?: React.CSSProperties
  children?: React.ReactNode
}

export const GlassCard: React.FC<Props> = ({
  p = 1,
  tone = 'see',
  radius = 64,
  padding = 44,
  refraction = false,
  fill,
  blur = 0.5,
  y = 26,
  style,
  children,
}) => {
  const see = tone === 'see'
  const { transform, opacity, filter } = entryStyle(p, { y, blur: 10 })

  const a = fill ?? (see ? 0.4 : 0.6)
  const tint = `rgba(255,255,255,${a})`
  const edge = see ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.50)'

  const backdrop = [
    `blur(${blur}px)`,
    see ? 'saturate(1.2)' : '',
    refraction ? 'url(#glass-card)' : '',
  ].filter(Boolean).join(' ')

  return (
    <div style={{ transform, opacity, filter, willChange: 'transform, opacity, filter', ...style }}>
      <div
        style={{
          position: 'relative',
          borderRadius: radius,
          border: `1px solid ${edge}`,
          overflow: 'hidden',
          // 0 8px 14px at 40%. Deliberately dark and tight, not a soft halo.
          boxShadow: '0 8px 14px rgba(0,0,0,0.40)',
          opacity: 1, // never animate this
          height: '100%',
        }}
      >
        {/* 1 · backdrop */}
        <div style={{ ...FILL, backdropFilter: backdrop, WebkitBackdropFilter: backdrop }} />

        {/* 2 · tint */}
        <div style={{ ...FILL, background: tint }} />

        {/* 3 · lit rim, see-through only */}
        {see && (
          <div
            style={{
              ...FILL,
              borderRadius: radius,
              boxShadow:
                'inset 4px 4px 12px 2px rgba(255,255,255,0.25), inset -2px -2px 15px 1px rgba(255,255,255,0.25), inset 0 0 15px 2px rgba(255,255,255,0.25)',
            }}
          />
        )}

        {/* 4 · content, above the backdrop so the refraction never touches it */}
        <div style={{ position: 'relative', padding }}>{children}</div>

        {/* 5 · glossy bevel, lit top-left and falling away bottom-right */}
        <div
          style={{
            ...FILL,
            borderRadius: radius,
            borderWidth: 1.5,
            borderStyle: 'solid',
            borderTopColor: 'rgba(255,255,255,0.70)',
            borderLeftColor: 'rgba(255,255,255,0.60)',
            borderRightColor: 'rgba(255,255,255,0.25)',
            borderBottomColor: 'rgba(255,255,255,0.25)',
          }}
        />
      </div>
    </div>
  )
}
