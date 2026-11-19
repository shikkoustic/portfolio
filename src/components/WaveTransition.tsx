"use client";

import { motion } from "framer-motion";

// Hero sits in a `sticky top-0 h-screen` wrapper and Work sits right after it
// in a second `sticky top-0` wrapper with a higher z-index — pure CSS. Hero
// never moves: it just stays pinned at the top of the viewport. Work's box
// starts off-screen below and rises up through normal scroll until it's
// pinned too, at which point it fully covers Hero — exactly water washing
// up over land, driven entirely by the browser's native sticky positioning.
// No scroll listener, no React state, so it can't fight Lenis's rAF loop.
//
// This component is purely the crest: it sits flush with Work's own top
// edge and pokes `CREST_HEIGHT` above it, so while Work's box is rising,
// its wavy top edge is what's visible washing over Hero first, before the
// flat section underneath catches up. The crest never stops rippling
// (phase-shifted `d` frames looped on a timer) so it reads as live water,
// not a static decal.
const CREST_HEIGHT = 96;

const WAVE_FRAMES = [
  "M0,36 C120,52 240,16 360,28 C480,40 600,10 720,22 C840,34 960,14 1080,26 C1200,38 1320,18 1440,30 L1440,96 L0,96 Z",
  "M0,26 C120,14 240,46 360,34 C480,22 600,50 720,38 C840,26 960,46 1080,30 C1200,16 1320,42 1440,24 L1440,96 L0,96 Z",
  "M0,42 C120,30 240,22 360,40 C480,46 600,20 720,30 C840,42 960,22 1080,36 C1200,46 1320,24 1440,38 L1440,96 L0,96 Z",
];

export default function WaveTransition() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 w-full overflow-visible"
      style={{ top: -CREST_HEIGHT, height: CREST_HEIGHT }}
    >
      <svg
        viewBox={`0 0 1440 ${CREST_HEIGHT}`}
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        <motion.path
          fill="var(--cream)"
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
