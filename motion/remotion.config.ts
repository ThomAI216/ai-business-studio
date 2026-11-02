import { Config } from '@remotion/cli/config'

// swangle keeps CSS blur rasterising identically from frame to frame. The
// default GL backend produces brightness pops at chunk boundaries, which is
// exactly the failure mode for glass plus glow.
Config.setChromiumOpenGlRenderer('swangle')
Config.setVideoImageFormat('png')
Config.setPixelFormat('yuv420p')
Config.setCodec('h264')
// 12, not the default: large serif type and fine glass rims over a soft
// gradient are close to the worst case for h264; at higher crf the letters ring.
Config.setCrf(12)
