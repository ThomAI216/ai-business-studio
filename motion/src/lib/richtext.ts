/**
 * Markdown-lite, the whole grammar: manual line breaks, **bold**, *italic*.
 * Nothing else, ever, and no dependency. One parser shared by every text
 * component (Chrome.tsx), so what the owner types in Remotion Studio's props
 * panel and what the slide draws can never drift apart.
 *
 * What the marks MEAN is decided by the component that renders the spans:
 * in the Title, bold is the seam (the LIT half of the sentence) and unbolded
 * text is the muted half; in body-class text bold is weight 500, the deck's
 * bold. Whether italic is on-brand is the brand's call (docs/wiki/brand/voice.md).
 */

export interface RichSpan {
  text: string
  bold: boolean
  italic: boolean
}

export type RichLine = RichSpan[]

/** parse one line: ** toggles bold, single * toggles italic */
const parseLine = (line: string): RichLine => {
  const spans: RichLine = []
  let bold = false
  let italic = false
  let buf = ''
  const flush = () => {
    if (buf) spans.push({ text: buf, bold, italic })
    buf = ''
  }
  let i = 0
  while (i < line.length) {
    if (line.startsWith('**', i)) {
      flush()
      bold = !bold
      i += 2
    } else if (line[i] === '*') {
      flush()
      italic = !italic
      i += 1
    } else {
      buf += line[i]
      i += 1
    }
  }
  flush()
  return spans
}

/** the document: lines of styled spans. An empty line stays an empty array. */
export const parseRich = (src: string): RichLine[] =>
  src.split('\n').map(parseLine)

/** the text with all markup stripped, line breaks kept */
export const plainText = (src: string): string =>
  parseRich(src)
    .map((line) => line.map((s) => s.text).join(''))
    .join('\n')

/** plain lines, for width estimates and previews */
export const plainLines = (src: string): string[] => plainText(src).split('\n')

/** does the string carry any *italic* span (the off-brand mark)? */
export const hasItalic = (src: string): boolean =>
  parseRich(src).some((line) => line.some((s) => s.italic && s.text.length > 0))

/** does the string carry any **bold** span? */
export const hasBold = (src: string): boolean =>
  parseRich(src).some((line) => line.some((s) => s.bold && s.text.length > 0))

/**
 * Toggle a marker around [start, end) of `value`, for the studio's B and I
 * buttons: if the selection is already wrapped the marker comes off, else it
 * goes on. Returns the new value plus the selection to restore.
 */
export const toggleMark = (
  value: string,
  start: number,
  end: number,
  marker: '**' | '*',
): { value: string; start: number; end: number } => {
  const m = marker.length
  const before = value.slice(0, start)
  const inner = value.slice(start, end)
  const after = value.slice(end)
  const wrapped =
    before.endsWith(marker) &&
    after.startsWith(marker) &&
    // a single * must not strip one half of a ** pair
    !(marker === '*' && (before.endsWith('**') || after.startsWith('**')))
  if (wrapped) {
    return {
      value: before.slice(0, -m) + inner + after.slice(m),
      start: start - m,
      end: end - m,
    }
  }
  if (inner.startsWith(marker) && inner.endsWith(marker) && inner.length >= m * 2) {
    return {
      value: before + inner.slice(m, inner.length - m) + after,
      start,
      end: end - m * 2,
    }
  }
  return {
    value: before + marker + inner + marker + after,
    start: start + m,
    end: end + m,
  }
}
