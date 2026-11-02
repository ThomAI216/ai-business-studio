#!/usr/bin/env bash
# video-digest.sh: turn a video (file or link) into something Claude can read.
#
#   bash tools/video-digest.sh <video-file | url> [outdir]
#
# Produces in <outdir> (default: next to the file, "<name>.digest/"):
#   frames/NN_t<seconds>s.jpg   up to 40 key frames (scene changes + an even grid), 768px wide
#   contact-sheet.jpg           all frames on one image, in order: read this first
#   audio.wav                   16 kHz mono (deleted at the end unless KEEP_AUDIO=1)
#   transcript.txt              from subtitles, else local Whisper, else the OpenAI API, else an honest reason
#   digest.md                   skeleton for the media-analyst to fill with observations
#
# Never fakes a result: every missing piece is written down with its reason.
set -uo pipefail

SRC="${1:-}"
if [[ -z "$SRC" ]]; then
  echo "usage: bash tools/video-digest.sh <video-file|url> [outdir]" >&2
  exit 1
fi
MAX_FRAMES="${MAX_FRAMES:-40}"
MIN_FRAMES=8
export PATH="$HOME/.local/bin:$PATH"

is_url=0
[[ "$SRC" =~ ^https?:// ]] && is_url=1

if [[ $is_url == 1 ]]; then
  OUT="${2:-inbox/video-$(date +%Y%m%d-%H%M%S).digest}"
else
  [[ -f "$SRC" ]] || { echo "not found: $SRC" >&2; exit 1; }
  base="$(basename "$SRC")"
  OUT="${2:-$(dirname "$SRC")/${base%.*}.digest}"
fi
mkdir -p "$OUT/frames"
NOTES=()

for bin in ffmpeg ffprobe; do
  command -v "$bin" >/dev/null || { echo "$bin is missing. In a cloud session it is usually preinstalled; otherwise: apt-get install -y ffmpeg" >&2; exit 1; }
done

# ---------- 1. get the file ----------
VIDEO="$SRC"
SUBS_FILE=""
if [[ $is_url == 1 ]]; then
  if ! command -v yt-dlp >/dev/null; then
    python3 -m pip install -q --user yt-dlp >/dev/null 2>&1 || true
  fi
  if ! command -v yt-dlp >/dev/null; then
    echo "yt-dlp is not available and could not be installed (network?). Ask for the video file instead." >&2
    exit 1
  fi
  yt-dlp -q --no-warnings --no-playlist \
    -f "bv*[height<=720]+ba/b[height<=720]/b" --merge-output-format mp4 \
    --write-info-json -o "$OUT/source.%(ext)s" "$SRC"
  dl=$?
  # Subtitles separately: a refused subtitle request must not cost us the video.
  yt-dlp -q --no-warnings --no-playlist --skip-download --write-subs --write-auto-subs \
    --sub-langs "en,fr,de,it,es" --sub-format vtt -o "$OUT/source.%(ext)s" "$SRC" >/dev/null 2>&1 || true
  if [[ $dl -ne 0 ]]; then
    echo "download failed. Private posts, logins and some platforms block downloads: ask for the file or a screen recording." >&2
    exit 1
  fi
  VIDEO="$(ls "$OUT"/source.* 2>/dev/null | grep -Ev '\.(vtt|json)$' | head -1)"
  SUBS_FILE="$(ls "$OUT"/source.*.vtt 2>/dev/null | head -1)"
  [[ -n "$VIDEO" ]] || { echo "download produced no video file" >&2; exit 1; }
fi

# ---------- 2. measure ----------
DUR="$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$VIDEO" | cut -d. -f1)"
DUR="${DUR:-0}"
[[ "$DUR" -lt 1 ]] && DUR=1
HAS_AUDIO="$(ffprobe -v error -select_streams a -show_entries stream=index -of csv=p=0 "$VIDEO" | head -1)"
HAS_SUBS="$(ffprobe -v error -select_streams s -show_entries stream=index -of csv=p=0 "$VIDEO" | head -1)"

# ---------- 3. pick frame times: scene changes + an even grid ----------
TARGET=$(( DUR / 3 ))
(( TARGET < MIN_FRAMES )) && TARGET=$MIN_FRAMES
(( TARGET > MAX_FRAMES )) && TARGET=$MAX_FRAMES

SCENES="$(ffmpeg -hide_banner -nostats -i "$VIDEO" -an -vf "select='gt(scene,0.35)',showinfo" -f null - 2>&1 \
  | grep -o 'pts_time:[0-9.]*' | cut -d: -f2)"
GRID="$(awk -v d="$DUR" -v n="$TARGET" 'BEGIN{for(i=0;i<n;i++) printf "%.2f\n", (i+0.5)*d/n}')"

TIMES="$(printf '%s\n%s\n' "$SCENES" "$GRID" | grep -E '^[0-9.]+$' | sort -n | awk '
  { if (NR==1 || $1-last >= 1.0) { print; last=$1 } }')"
COUNT="$(printf '%s\n' "$TIMES" | grep -c .)"
if (( COUNT > MAX_FRAMES )); then
  TIMES="$(printf '%s\n' "$TIMES" | awk -v c="$COUNT" -v m="$MAX_FRAMES" '{a[NR]=$1} END{for(i=0;i<m;i++) print a[int(i*c/m)+1]}')"
fi

i=0
FRAME_LIST=""
while read -r t; do
  [[ -z "$t" ]] && continue
  i=$((i+1))
  name="$(printf '%02d_t%07.1fs.jpg' "$i" "$t")"
  ffmpeg -hide_banner -loglevel error -y -ss "$t" -i "$VIDEO" -frames:v 1 -vf "scale=768:-2" -q:v 4 "$OUT/frames/$name" </dev/null
  mm=$(awk -v t="$t" 'BEGIN{printf "%d:%04.1f", int(t/60), t-60*int(t/60)}')
  FRAME_LIST+="| $i | $mm | frames/$name | |"$'\n'
done <<< "$TIMES"
NFRAMES=$i

# ---------- 4. contact sheet ----------
if (( NFRAMES > 0 )); then
  COLS=5
  ROWS=$(( (NFRAMES + COLS - 1) / COLS ))
  ffmpeg -hide_banner -loglevel error -y -pattern_type glob -i "$OUT/frames/*.jpg" \
    -vf "scale=320:-2,tile=${COLS}x${ROWS}:padding=4:margin=4" -frames:v 1 -q:v 4 "$OUT/contact-sheet.jpg" </dev/null \
    || NOTES+=("contact sheet failed; read the frames one by one")
fi

# ---------- 5. transcript ----------
TRANSCRIPT="$OUT/transcript.txt"
METHOD=""
vtt_to_text() { # strip WEBVTT headers, timings, tags and repeated lines
  grep -v -E '^(WEBVTT|Kind:|Language:|NOTE|[0-9:.]+ --> |[0-9]+$|\s*$)' "$1" | sed -e 's/<[^>]*>//g' | awk '!seen[$0]++'
}
if [[ -n "$SUBS_FILE" ]]; then
  vtt_to_text "$SUBS_FILE" > "$TRANSCRIPT" && METHOD="subtitles from the platform ($(basename "$SUBS_FILE"))"
elif [[ -n "$HAS_SUBS" ]]; then
  ffmpeg -hide_banner -loglevel error -y -i "$VIDEO" -map 0:s:0 "$OUT/embedded.vtt" </dev/null \
    && vtt_to_text "$OUT/embedded.vtt" > "$TRANSCRIPT" && METHOD="subtitles embedded in the file"
fi

if [[ -z "$METHOD" && -z "$HAS_AUDIO" ]]; then
  echo "no transcript: the video has no audio track" > "$TRANSCRIPT"
  METHOD="none (no audio track)"
fi

if [[ -z "$METHOD" ]]; then
  ffmpeg -hide_banner -loglevel error -y -i "$VIDEO" -vn -ac 1 -ar 16000 "$OUT/audio.wav" </dev/null
  # (b) local Whisper (faster-whisper). Needs pip + a one-time model download.
  if ! python3 -c "import faster_whisper" 2>/dev/null; then
    timeout 300 python3 -m pip install -q --user faster-whisper >/dev/null 2>&1 || true
  fi
  if python3 -c "import faster_whisper" 2>/dev/null; then
    if timeout 1800 python3 - "$OUT/audio.wav" "$TRANSCRIPT" <<'PY' 2>"$OUT/whisper.err"
import sys, wave
import numpy as np
from faster_whisper import WhisperModel
# Read the 16 kHz mono wav ourselves: faster-whisper's own decoder needs a recent PyAV,
# and an older system PyAV fails with "unexpected keyword argument 'metadata_errors'".
with wave.open(sys.argv[1], "rb") as w:
    audio = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768.0
model = WhisperModel("base", device="cpu", compute_type="int8")
segments, info = model.transcribe(audio, vad_filter=True)
with open(sys.argv[2], "w", encoding="utf-8") as f:
    f.write(f"[language: {info.language} ({info.language_probability:.0%})]\n")
    for s in segments:
        f.write(f"[{int(s.start//60)}:{s.start%60:04.1f}] {s.text.strip()}\n")
PY
    then
      METHOD="local Whisper (faster-whisper, base model)"
    else
      NOTES+=("local Whisper failed: $(tail -1 "$OUT/whisper.err" 2>/dev/null)")
    fi
  else
    NOTES+=("local Whisper not installable here (no network to PyPI?)")
  fi
  rm -f "$OUT/whisper.err"
fi

if [[ -z "$METHOD" && -n "${OPENAI_API_KEY:-}" ]]; then
  ffmpeg -hide_banner -loglevel error -y -i "$OUT/audio.wav" -ac 1 -b:a 48k "$OUT/audio.mp3" </dev/null
  if curl -sS --fail https://api.openai.com/v1/audio/transcriptions \
      -H "Authorization: Bearer $OPENAI_API_KEY" \
      -F model=whisper-1 -F response_format=text -F file=@"$OUT/audio.mp3" > "$TRANSCRIPT" 2>"$OUT/api.err"; then
    METHOD="OpenAI Whisper API"
  else
    NOTES+=("OpenAI API transcription failed: $(head -c 200 "$OUT/api.err")")
  fi
  rm -f "$OUT/audio.mp3" "$OUT/api.err"
fi

if [[ -z "$METHOD" ]]; then
  REASON="no subtitles, local Whisper unavailable or failed, and no OPENAI_API_KEY set"
  echo "no transcript: $REASON. Ask her what is said, or for a version with captions." > "$TRANSCRIPT"
  METHOD="none ($REASON)"
fi
[[ "${KEEP_AUDIO:-0}" == 1 ]] || rm -f "$OUT/audio.wav"

# ---------- 6. digest skeleton ----------
DMM=$(awk -v t="$DUR" 'BEGIN{printf "%d:%02d", int(t/60), t%60}')
{
  echo "# Video digest"
  echo
  echo "- **Source:** $SRC"
  echo "- **Duration:** $DMM ($DUR s) · audio: $([[ -n "$HAS_AUDIO" ]] && echo yes || echo no)"
  echo "- **Frames:** $NFRAMES (scene changes + even grid) · contact sheet: \`contact-sheet.jpg\`"
  echo "- **Transcript:** $METHOD"
  for n in "${NOTES[@]+"${NOTES[@]}"}"; do echo "- **Note:** $n"; done
  echo "- **Made:** $(date +%Y-%m-%d) by tools/video-digest.sh"
  echo
  echo "## What it is (fill in)"
  echo "_One paragraph: format, purpose, who speaks, the one idea._"
  echo
  echo "## Frames"
  echo "| # | time | file | what is on screen (fill in) |"
  echo "|---|---|---|---|"
  printf '%s' "$FRAME_LIST"
  echo
  echo "## Transcript"
  echo '```'
  head -c 20000 "$TRANSCRIPT"
  echo
  echo '```'
  echo
  echo "## Observations (fill in)"
  echo "- Hook (first 3 s):"
  echo "- Structure and pacing:"
  echo "- On-screen text and style (fonts, colours, layout):"
  echo "- Sound (voice, music):"
  echo "- What to keep for her brand:"
  echo "- What to avoid:"
} > "$OUT/digest.md"

echo "digest ready: $OUT/digest.md ($NFRAMES frames, transcript: $METHOD)"
