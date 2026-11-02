/**
 * Fonts, bundled locally (no network at render time), and the render WAITS for
 * them. Without the wait a still can capture the fallback face.
 *
 * Trap (learned the hard way): `document.fonts.check()` returns TRUE when a
 * family never loaded at all, because nothing is pending. So this waits on
 * `document.fonts.load()` and checks that a face actually came back.
 *
 * To change fonts: `npm install @fontsource/<family>`, swap the imports below,
 * update FONTS in tokens.ts and FAMILIES here.
 */
import { continueRender, delayRender } from 'remotion'
import '@fontsource/playfair-display/400.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'

const FAMILIES = ['400 92px "Playfair Display"', '400 34px "Inter"', '500 34px "Inter"']

const handle = delayRender('Loading brand fonts')
Promise.all(FAMILIES.map((f) => document.fonts.load(f)))
  .then((faces) => {
    const missing = FAMILIES.filter((_, i) => faces[i].length === 0)
    if (missing.length) console.warn('Fonts did not load, the render will use fallbacks:', missing)
    continueRender(handle)
  })
  .catch((err) => {
    console.warn('Font loading failed', err)
    continueRender(handle)
  })
