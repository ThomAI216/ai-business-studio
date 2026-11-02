// Which Chromium renders. Remotion downloads its own headless shell on first
// use. In a locked-down cloud container that download can be blocked; then
// point REMOTION_BROWSER_EXECUTABLE at a Chromium that is already installed
// (cloud sessions ship one, e.g. under /opt/pw-browsers/). This file finds it
// automatically when the variable is not set.
import fs from 'node:fs'
import path from 'node:path'

export const browserExecutable = () => {
  if (process.env.REMOTION_BROWSER_EXECUTABLE) return process.env.REMOTION_BROWSER_EXECUTABLE
  const root = '/opt/pw-browsers'
  if (!fs.existsSync(root)) return null // let Remotion download its own
  for (const dir of fs.readdirSync(root).filter((d) => d.startsWith('chromium_headless_shell')).sort().reverse()) {
    for (const sub of ['chrome-headless-shell-linux64/chrome-headless-shell', 'chrome-linux/headless_shell']) {
      const p = path.join(root, dir, sub)
      if (fs.existsSync(p)) return p
    }
  }
  return null
}
