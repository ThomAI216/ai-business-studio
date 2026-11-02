import { z } from 'zod'
import { argumentSchema, closerSchema, coverSchema } from '../slides/Example'

/**
 * The scene is data. A Scene document is one post: an id, its series, and an
 * ordered list of slides. Each slide names a TYPE from the registry below and
 * carries the full props for that type's component. The schemas are the SAME
 * zod objects the slides use, so a scene validates exactly when the
 * components can render it.
 *
 * New post type? Build the slide component with its own schema in
 * src/slides/, add one line here and one case in SceneSlide.tsx, and register
 * it in content/post-types/.
 */
export const slideSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('cover'), props: coverSchema }),
  z.object({ type: z.literal('argument'), props: argumentSchema }),
  z.object({ type: z.literal('closer'), props: closerSchema }),
])
export type SlideDoc = z.infer<typeof slideSchema>

export const sceneSchema = z.object({
  id: z.string(),
  series: z.string(),
  slides: z.array(slideSchema),
})
export type Scene = z.infer<typeof sceneSchema>
