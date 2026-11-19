"use client";

import { motion } from "framer-motion";

// The animated crest that sits at the top of every section (except Hero,
// which has nothing above it to wash in from). Three phase-shifted frames
// of the same wave, morphed between on a loop, so it reads as continuously
// rolling water instead of a static shape. It renders IN NORMAL FLOW as the
// first thing inside the section — not absolutely positioned above it — so
// it only becomes visible once the section's own box genuinely scrolls
// into view, never before.
// 84px read as barely-there — a crest that modest doesn't register as
// "water" at normal viewing distance. Scaled way up, with real swing in the
// curve (not a gentle ripple), so it's unmistakable as a wave.
const CREST_HEIGHT = 240;

const WAVE_FRAMES = [
  "M0,110 C120,160 240,60 360,100 C480,140 600,40 720,80 C840,120 960,50 1080,90 C1200,130 1320,70 1440,100 L1440,240 L0,240 Z",
  "M0,70 C120,30 240,150 360,110 C480,70 600,170 720,130 C840,90 960,160 1080,100 C1200,40 1320,140 1440,80 L1440,240 L0,240 Z",
  "M0,130 C120,90 240,50 360,120 C480,150 600,60 720,100 C840,140 960,60 1080,130 C1200,160 1320,80 1440,120 L1440,240 L0,240 Z",
];

export default function WaveEdge({ fill }: { fill: string }) {
  return (
    <div aria-hidden className="pointer-events-none w-full" style={{ height: CREST_HEIGHT }}>
      <svg
        viewBox={`0 0 1440 ${CREST_HEIGHT}`}
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        <motion.path
          fill={fill}
          animate={{ d: WAVE_FRAMES }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      </svg>
    </div>
  );
}
