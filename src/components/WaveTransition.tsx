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
// 96px was far too thin: a single ordinary mouse-wheel tick (let alone
// Lenis's eased overshoot) blows straight through it, so the wave never
// actually gets seen mid-transition — it just reads as "missing". Scaled up
// to something you can't scroll past in one step.
const CREST_HEIGHT = 260;

const WAVE_FRAMES = [
  "M0,140 C120,180 240,100 360,130 C480,160 600,90 720,120 C840,150 960,100 1080,130 C1200,160 1320,110 1440,140 L1440,260 L0,260 Z",
  "M0,110 C120,80 240,170 360,140 C480,110 600,190 720,150 C840,110 960,180 1080,130 C1200,90 1320,160 1440,110 L1440,260 L0,260 Z",
  "M0,160 C120,130 240,90 360,150 C480,170 600,100 720,130 C840,160 960,100 1080,150 C1200,170 1320,120 1440,150 L1440,260 L0,260 Z",
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
