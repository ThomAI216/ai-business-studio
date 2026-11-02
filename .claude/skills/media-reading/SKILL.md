---
name: media-reading
description: Read images, screenshots, videos, reels, audio and Instagram/LinkedIn links. Load whenever a video or audio file, a post link, or a batch of screenshots must be understood (intake, inspiration, content review), or she asks "can you watch this?". Images alone can be read directly; this skill covers everything that cannot.
---

# Media reading: seeing what she sends

You cannot play a video. You can read frames, a contact sheet and a transcript. This skill
turns any media into those, honestly. **Never describe something you did not actually see
or hear.** If a piece is missing, say which and why.

## Images and screenshots
Read them directly with the Read tool. For a carousel, read the slides in order and name
them by number. Note: text on the image (copy it exactly), layout, colours, type style,
photo style, logo, what the eye lands on first.

## Video or audio file

```bash
bash tools/video-digest.sh <file> [outdir]     # outdir defaults to "<file-name>.digest/" beside it
```

Produces in the digest folder:
- `contact-sheet.jpg`: up to 40 frames on one image, in time order. **Read this first.**
- `frames/NN_t<seconds>s.jpg`: the key frames (scene changes + an even grid). Open the
  ones that matter (hook, text on screen, transitions).
- `transcript.txt`: from the platform's subtitles, else local Whisper (first run downloads
  a ~150 MB model, a few minutes), else the OpenAI API if `OPENAI_API_KEY` is set in the
  cloud environment, else an honest "no transcript: <reason>".
- `digest.md`: a skeleton with source, duration, frame table and transcript.

Then fill in `digest.md` (or have **media-analyst** do it for several videos in parallel):
what it is, frame-by-frame notes where something changes, hook (first 3 seconds),
structure and pacing, on-screen text and style, sound, what to keep, what to avoid.
Audio-only files work too: there are no frames, only the transcript.

Long video (over ~10 minutes): the frames are spread thin. Read the transcript first, then
cut the interesting part and digest it alone:
`ffmpeg -ss 00:04:10 -to 00:05:30 -i in.mp4 -c copy part.mp4`.

## Video link (YouTube, Vimeo, a direct .mp4, a reel)

```bash
bash tools/video-digest.sh "<url>" docs/wiki/raw/YYYY-MM-DD-<name>/
```

Uses `yt-dlp` (installed at session start). Many platforms refuse downloads from cloud
servers (YouTube often answers 403; Instagram reels often need a login). When the
download fails: tell her plainly and ask for the file itself (on a phone: save the video,
or screen-record it) and digest that. If a host is blocked by the network policy, name the
host; she can allow it in the environment's Network access settings.

## Instagram or LinkedIn post link

```bash
node tools/ig-capture.mjs <instagram-post-url> [outdir]      # default outdir: inbox/ig-<code>/
node tools/ig-capture.mjs <linkedin-post-url> [outdir]
```

Public posts only. Instagram gives every carousel slide as `01.png 02.png …` plus
`caption.txt` (account + caption) and `source.json`. LinkedIn gives one full-page
screenshot and the text. Limits to tell her:
- private accounts, stories and some reels: she must send screenshots (one folder per
  post, numbered in order) or a screen recording;
- slides are ~700 px screenshots: fine to analyse, not to reuse as artwork;
- a video slide gives only its cover frame: for motion, get the video and digest it.

## Where results go
- Material for the business (her own posts, videos): into the matching
  `docs/wiki/raw/YYYY-MM-DD-<name>/` folder, then facts into the wiki (`intake` skill).
- Inspiration (someone else's post she likes): the `inspiration` skill takes over.
- Raw frame folders are working files; keep `digest.md`, `contact-sheet.jpg` and
  `transcript.txt`. Do not commit source videos over 50 MB.

## Troubleshooting
| Symptom | Meaning | Do |
|---|---|---|
| `ffmpeg is missing` | unusual in cloud | tell her guide; read images only meanwhile |
| `download failed` | platform refused | ask her for the file or a screen recording |
| `no transcript: …` | no subtitles, no Whisper, no API key | ask her what is said, or for a captioned version |
| `capture failed` / `nothing readable` | private post or blocked network | ask for screenshots |
