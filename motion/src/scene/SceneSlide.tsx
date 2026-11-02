import React from 'react'
import type { Scene, SlideDoc } from './schema'
import { Argument, Closer, Cover } from '../slides/Example'

/**
 * Type → component: render slide N of a scene document through the SAME
 * components the hand-built compositions use, so "renders from JSON" and
 * "renders as designed" are the same statement. The switch (not a Record)
 * lets TypeScript prove each props shape reaches the right component.
 */
const render = (s: SlideDoc): React.ReactElement => {
  switch (s.type) {
    case 'cover': return <Cover {...s.props} />
    case 'argument': return <Argument {...s.props} />
    case 'closer': return <Closer {...s.props} />
  }
}

export const SceneSlide: React.FC<{ scene: Scene; slide: number }> = ({ scene, slide }) => {
  const s = scene.slides[slide]
  if (!s) throw new Error(`Scene "${scene.id}" has ${scene.slides.length} slides, slide ${slide} does not exist`)
  return render(s)
}
