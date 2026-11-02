import React from 'react'
import { useCurrentFrame } from 'remotion'
import { z } from 'zod'
import { zColor } from '@remotion/zod-types'
import { Body, Closing, Eyebrow, Frame, GradientPlate, SLIDE_PAD, SlideTint, Title, Wordmark } from '../components/Chrome'
import { GlassCard, LiquidGlassDefs } from '../components/GlassCard'
import { CALM, BEAT, enter, s } from '../lib/motion'
import { GROUNDS, TINTS, FONTS } from '../brand/tokens'

/**
 * THE EXAMPLE DECK: three slides showing the three jobs every carousel needs.
 *   1 · cover     stop the scroll: one feeling, a title on the seam, a plate
 *   2 · argument  the one idea, with ONE graphic (here: three glass cards)
 *   3 · closer    the point, and what to do next
 *
 * Every slide is DATA: its props are a zod schema, so Remotion Studio shows a
 * form in the right-hand panel where every word, tint, ground and plate can be
 * edited live, and "Save Defaults" writes the values back into Root.tsx.
 *
 * Copy law (checked by content/check-copy.mjs): no full stops, no em dashes.
 * Text: \n breaks a line, **bold** marks the LIT half of the title (the seam).
 *
 * Timing law: the graphic waits for the body copy to settle, then builds; the
 * closing line lands only after the graphic has finished; then a long hold
 * (the poster frame). Stills are rendered from that settled end, never frame 0.
 */

const tintEnum = z.enum(Object.keys(TINTS) as [keyof typeof TINTS, ...(keyof typeof TINTS)[]])
const groundEnum = z.enum(Object.keys(GROUNDS) as [keyof typeof GROUNDS, ...(keyof typeof GROUNDS)[]])
const plateSchema = z.object({
  family: z.enum(['bloom', 'shaft', 'dunes']),
  at: z.enum(['top-left', 'top-right', 'center', 'bottom-left', 'bottom-right']),
  strength: z.number().min(0).max(1).step(0.05),
  /** optional colour override for the light in the plate */
  hue: zColor().optional(),
})

/* ------------------------------------------------------------------ */
/* 1 · cover                                                          */
/* ------------------------------------------------------------------ */

export const coverSchema = z.object({
  tint: tintEnum,
  ground: groundEnum,
  plate: plateSchema,
  eyebrow: z.string(),
  title: z.string(),
  body: z.string(),
})
export type CoverProps = z.infer<typeof coverSchema>

export const COVER_DEFAULTS: CoverProps = {
  tint: 'bright',
  ground: 'dark',
  plate: { family: 'shaft', at: 'top-right', strength: 0.6 },
  eyebrow: 'Series name · 01',
  title: 'The question your\n**reader already asks**',
  body: 'One line that promises what the next slides deliver',
}

export const Cover: React.FC<CoverProps> = ({ tint, ground, plate, eyebrow, title, body }) => (
  <SlideTint tint={tint} ground={ground}>
    <Frame>
      <GradientPlate {...plate} />
      <div style={{ ...SLIDE_PAD, justifyContent: 'flex-end' }}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <div style={{ height: 40 }} />
        <Title title={title} size={104} />
        <div style={{ height: 36 }} />
        <Body delay={30}>{body}</Body>
      </div>
      <Wordmark />
    </Frame>
  </SlideTint>
)

/* ------------------------------------------------------------------ */
/* 2 · argument                                                       */
/* ------------------------------------------------------------------ */

export const argumentSchema = z.object({
  tint: tintEnum,
  ground: groundEnum,
  plate: plateSchema,
  eyebrow: z.string(),
  title: z.string(),
  body: z.string(),
  /** max 4 cards: nothing in a group ever goes past 7, and 3 reads best */
  points: z.array(z.object({ label: z.string(), text: z.string() })).max(4),
  closing: z.string(),
})
export type ArgumentProps = z.infer<typeof argumentSchema>

export const ARGUMENT_DEFAULTS: ArgumentProps = {
  tint: 'accent',
  ground: 'light',
  plate: { family: 'bloom', at: 'top-right', strength: 0.5 },
  eyebrow: 'The idea',
  title: 'Most people start here\n**the shift starts here**',
  body: 'Say the one idea of this slide in a sentence your reader would say out loud',
  points: [
    { label: '01', text: 'First thing to notice' },
    { label: '02', text: 'Second thing, building on it' },
    { label: '03', text: 'Third thing, the payoff' },
  ],
  closing: 'The closing thought is the point of the slide',
}

export const Argument: React.FC<ArgumentProps> = ({ tint, ground, plate, eyebrow, title, body, points, closing }) => {
  const frame = useCurrentFrame()
  // the graphic waits for the body copy to settle (~1.8s), then builds in one gesture
  const graphicStart = CALM
  const closingAt = graphicStart + points.length * BEAT + s(0.8)
  const dark = ground !== 'light'
  return (
    <SlideTint tint={tint} ground={ground}>
      <Frame>
        <GradientPlate {...plate} />
        <LiquidGlassDefs />
        <div style={SLIDE_PAD}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <div style={{ height: 40 }} />
          <Title title={title} />
          <div style={{ height: 28 }} />
          <Body>{body}</Body>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 22 }}>
            {points.map((pt, i) => (
              <GlassCard key={i} p={enter(frame, graphicStart + i * BEAT)} tone={dark ? 'see' : 'light'} radius={36} padding={30}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 26 }}>
                  <span style={{ fontFamily: FONTS.mono, fontSize: 26, color: TINTS[tint][ground] }}>{pt.label}</span>
                  <span style={{ fontSize: 34, fontWeight: 500 }}>{pt.text}</span>
                </div>
              </GlassCard>
            ))}
          </div>
          <Closing delay={closingAt}>{closing}</Closing>
        </div>
        <Wordmark />
      </Frame>
    </SlideTint>
  )
}

/* ------------------------------------------------------------------ */
/* 3 · closer                                                         */
/* ------------------------------------------------------------------ */

export const closerSchema = z.object({
  tint: tintEnum,
  ground: groundEnum,
  plate: plateSchema,
  eyebrow: z.string(),
  title: z.string(),
  body: z.string(),
  action: z.string(),
})
export type CloserProps = z.infer<typeof closerSchema>

export const CLOSER_DEFAULTS: CloserProps = {
  tint: 'bright',
  ground: 'dark',
  plate: { family: 'dunes', at: 'bottom-left', strength: 0.55 },
  eyebrow: 'Your next step',
  title: 'Small and clear\n**beats big and vague**',
  body: 'One sentence that turns the idea into something to do this week',
  action: 'Save this post and send it to a friend',
}

export const Closer: React.FC<CloserProps> = ({ tint, ground, plate, eyebrow, title, body, action }) => (
  <SlideTint tint={tint} ground={ground}>
    <Frame>
      <GradientPlate {...plate} />
      <div style={{ ...SLIDE_PAD, justifyContent: 'center' }}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <div style={{ height: 40 }} />
        <Title title={title} />
        <div style={{ height: 32 }} />
        <Body>{body}</Body>
        <div style={{ height: 64 }} />
        <Closing delay={CALM}>{action}</Closing>
      </div>
      <Wordmark />
    </Frame>
  </SlideTint>
)
