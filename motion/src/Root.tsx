import React from 'react'
import { Composition, Folder } from 'remotion'
import { z } from 'zod'
import './brand/fonts'
import './theme.css'
import { LAYOUT } from './brand/tokens'
import { FPS } from './lib/motion'
import {
  Argument, ARGUMENT_DEFAULTS, argumentSchema,
  Closer, CLOSER_DEFAULTS, closerSchema,
  Cover, COVER_DEFAULTS, coverSchema,
} from './slides/Example'
import { sceneSchema } from './scene/schema'
import { SceneSlide } from './scene/SceneSlide'
import exampleScene from '../scenes/example.json'

/**
 * Every slide is an ordinary composition: render it as a STILL for a carousel
 * or as a VIDEO for a reel, from the same file. Never two implementations.
 *
 * STILLS MUST NAME A SETTLED FRAME. Everything eases in from nothing, so
 * frame 0 is an empty ground. The example slides settle by ~frame 150:
 *
 *   npx remotion still Example-2 out/example-2.png --frame=170
 *   node export-stills.mjs Example          every Example-* slide, settled
 *   node export-video.mjs Example-2         the animated version (crf 12)
 *
 * Example-1..3 carry zod schemas: open them in Remotion Studio
 * (`npx remotion studio`), edit any word or colour in the right-hand panel,
 * then "Save Defaults" writes the values back into this file.
 *
 * Scene-1..3 render the deck in scenes/example.json, the scene-is-data layer:
 * a whole post as one JSON document, validated against the same schemas.
 */
const SLIDE = { width: LAYOUT.width, height: LAYOUT.height, fps: FPS, durationInFrames: FPS * 6 }

const EXAMPLE = sceneSchema.parse(exampleScene)
const sceneProps = z.object({ slide: z.number().int().min(0).max(EXAMPLE.slides.length - 1) })
const ExampleScene: React.FC<z.infer<typeof sceneProps>> = ({ slide }) => <SceneSlide scene={EXAMPLE} slide={slide} />

export const RemotionRoot: React.FC = () => (
  <>
    <Folder name="Example-deck">
      <Composition id="Example-1" component={Cover} schema={coverSchema} defaultProps={COVER_DEFAULTS} {...SLIDE} />
      <Composition id="Example-2" component={Argument} schema={argumentSchema} defaultProps={ARGUMENT_DEFAULTS} {...SLIDE} />
      <Composition id="Example-3" component={Closer} schema={closerSchema} defaultProps={CLOSER_DEFAULTS} {...SLIDE} />
    </Folder>
    <Folder name="Example-scene">
      {EXAMPLE.slides.map((_, i) => (
        <Composition key={i} id={`Scene-${i + 1}`} component={ExampleScene} schema={sceneProps} defaultProps={{ slide: i }} {...SLIDE} />
      ))}
    </Folder>
  </>
)
