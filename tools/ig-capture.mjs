#!/usr/bin/env node
/**
 * Capture a public Instagram or LinkedIn post (all carousel slides + caption) from a link.
 *
 *   node tools/ig-capture.mjs <instagram-url | shortcode | linkedin-post-url> [outdir]
 *
 * Instagram: renders the public /embed/captioned/ page headlessly (a plain HTTP
 * request only gets an empty JavaScript shell), clicks through the carousel and
 * writes ordered screenshots 01.png, 02.png ... plus caption.txt and source.json
 * into inbox/ig-<code>/ (or [outdir]).
 * LinkedIn: public posts only, through linkedin.com/embed/feed/update/urn:li:activity:<id>;
 * one full-page screenshot plus the visible text.
 *
 * Honest limits, say them to her instead of guessing:
 *  - private accounts, stories and some reels stay walled: ask for screenshots or a screen recording
 *  - slides are ~700px screenshots, not the original files: enough to analyse, not to reuse as artwork
 *  - a video slide gives only its poster frame: for motion, get the video and run tools/video-digest.sh
 * Uses the Node Playwright + Chromium preinstalled in cloud sessions (no install step).
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createRequire } from "node:module";
import { createHash } from "node:crypto";

const require = createRequire(import.meta.url);
let chromium;
try {
  ({ chromium } = require("playwright"));
} catch {
  console.error("Playwright is not available. In a cloud session it is preinstalled; locally run: npm i -g playwright && npx playwright install chromium");
  process.exit(1);
}

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36";
const MAX_SLIDES = 20;
const [arg, outArg] = process.argv.slice(2);
if (!arg) {
  console.error("usage: node tools/ig-capture.mjs <instagram-url | shortcode | linkedin-post-url> [outdir]");
  process.exit(1);
}

async function textOf(page, sel) {
  try {
    return await page.innerText(sel, { timeout: 2000 });
  } catch {
    return "";
  }
}

async function instagram() {
  const m = arg.match(/\/(?:p|reel|reels|tv)\/([A-Za-z0-9_-]+)/);
  const code = m ? m[1] : arg.replace(/\//g, "");
  const out = outArg || `inbox/ig-${code}`;
  mkdirSync(out, { recursive: true });
  const url = `https://www.instagram.com/p/${code}/embed/captioned/`;

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 700, height: 940 }, userAgent: UA });
  await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
  await page.waitForTimeout(2000);
  const caption = await textOf(page, ".Caption");
  const user = await textOf(page, ".UsernameText");

  const seen = new Set();
  let n = 0;
  for (let i = 0; i < MAX_SLIDES; i++) {
    const shot = await page.screenshot({ clip: { x: 0, y: 54, width: 700, height: 868 } });
    const hash = createHash("sha1").update(shot).digest("hex");
    if (seen.has(hash)) break; // the arrow stopped advancing: end of the carousel
    seen.add(hash);
    n++;
    writeFileSync(join(out, `${String(n).padStart(2, "0")}.png`), shot);
    let advanced = false;
    for (const sel of ['[aria-label="Next"]', '[class*="Chevron"]', "button:has(svg)"]) {
      try {
        await page.click(sel, { timeout: 1000 });
        advanced = true;
        break;
      } catch {}
    }
    if (!advanced) await page.mouse.click(660, 480);
    await page.waitForTimeout(1300);
  }
  await browser.close();

  if (n <= 1 && !caption && !user) {
    console.error(`WARNING: nothing readable came back from ${url}. The post may be private, removed, or blocked by the network. Ask for screenshots instead.`);
  }
  writeFileSync(join(out, "caption.txt"), `@${user}\n\n${caption}`);
  writeFileSync(
    join(out, "source.json"),
    JSON.stringify({ platform: "instagram", shortcode: code, url: `https://www.instagram.com/p/${code}/`, user, slides: n }, null, 2)
  );
  console.log(`${n} slide(s) -> ${out}`);
}

async function linkedin() {
  const m = arg.match(/activity[:-](\d+)/);
  if (!m) {
    console.error('LinkedIn: no activity id in the link. On the post, use "Copy link to post" and pass that link.');
    process.exit(1);
  }
  const out = outArg || `inbox/li-${m[1]}`;
  mkdirSync(out, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 760, height: 1000 }, userAgent: UA });
  await page.goto(`https://www.linkedin.com/embed/feed/update/urn:li:activity:${m[1]}`, { waitUntil: "networkidle", timeout: 45000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: join(out, "01.png"), fullPage: true });
  const body = await textOf(page, "body");
  await browser.close();
  writeFileSync(join(out, "caption.txt"), body);
  writeFileSync(join(out, "source.json"), JSON.stringify({ platform: "linkedin", activity: m[1], url: arg }, null, 2));
  console.log(`1 page -> ${out}`);
}

(arg.includes("linkedin.com") ? linkedin() : instagram()).catch((e) => {
  console.error(`capture failed: ${e.message.split("\n")[0]}. Private post or blocked network? Ask for screenshots.`);
  process.exit(1);
});
