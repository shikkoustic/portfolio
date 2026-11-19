"use client";

import { motion } from "framer-motion";

// Hero sits in a `sticky top-0 h-screen` wrapper and never moves. Work sits
// right after it as a totally normal, non-sticky block with a higher
// z-index, so it just rises up through ordinary scroll and visually washes
// over the pinned Hero beneath it — no scroll listener, no motion values on
// Hero, nothing fighting Lenis.
//
// This crest renders IN NORMAL FLOW as the first thing inside Work's own
// box — it does not escape above Work's box the way an absolutely
// positioned element with a negative offset would. That matters: anything
// poking above Work's box is, by definition, visible the instant Work's box
// is anywhere near the viewport, including before the user has scrolled at
// all. Kept in-flow, the crest only enters the screen once Work's box
// itself actually scrolls into view. The area above the wavy line is left
// transparent so Hero (painted behind, lower z-index) shows through it
// until the crest genuinely reaches that point as you scroll.
const CREST_HEIGHT = 96;

const WAVE_FRAMES = [
  "M0,36 C120,52 240,16 360,28 C480,40 600,10 720,22 C840,34 960,14 1080,26 C1200,38 1320,18 1440,30 L1440,96 L0,96 Z",
  "M0,26 C120,14 240,46 360,34 C480,22 600,50 720,38 C840,26 960,46 1080,30 C1200,16 1320,42 1440,24 L1440,96 L0,96 Z",
  "M0,42 C120,30 240,22 360,40 C480,46 600,20 720,30 C840,42 960,22 1080,36 C1200,46 1320,24 1440,38 L1440,96 L0,96 Z",
];

export default function WaveTransition() {
  return (
    <div aria-hidden className="pointer-events-none w-full" style={{ height: CREST_HEIGHT }}>
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
