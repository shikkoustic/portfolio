"use client";

import { motion } from "framer-motion";

// The animated crest that sits at the top of every section (except Hero,
// which has nothing above it to wash in from). Three phase-shifted frames
// of the same wave, morphed between on a loop, so it reads as continuously
// rolling water instead of a static shape. It renders IN NORMAL FLOW as the
// first thing inside the section — not absolutely positioned above it — so
// it only becomes visible once the section's own box genuinely scrolls
// into view, never before.
const CREST_HEIGHT = 84;

const WAVE_FRAMES = [
  "M0,36 C120,48 240,22 360,30 C480,38 600,18 720,26 C840,34 960,20 1080,28 C1200,36 1320,22 1440,30 L1440,84 L0,84 Z",
  "M0,28 C120,20 240,44 360,34 C480,24 600,46 720,36 C840,26 960,44 1080,30 C1200,18 1320,40 1440,26 L1440,84 L0,84 Z",
  "M0,40 C120,32 240,26 360,38 C480,42 600,24 720,32 C840,40 960,24 1080,36 C1200,42 1320,26 1440,36 L1440,84 L0,84 Z",
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
