"use client";

import { motion } from "framer-motion";

// Three samples of the same wave, each phase-shifted, so morphing between
// them in a loop reads as continuous rolling water instead of a static
// crest. No scroll listeners here at all — the only scroll-tied behaviour
// is the entrance (`whileInView`), which Framer drives off an
// IntersectionObserver, not a scroll event, so it costs nothing and never
// fights Lenis's own rAF loop the way a `window.addEventListener("scroll")`
// + setState did.
const WAVE_FRAMES = [
  "M 0 38 Q 180 50, 360 44 Q 540 38, 720 28 Q 900 18, 1080 24 Q 1260 32, 1440 30 L 1440 142 L 0 142 Z",
  "M 0 30 Q 180 20, 360 28 Q 540 40, 720 48 Q 900 44, 1080 32 Q 1260 22, 1440 28 L 1440 142 L 0 142 Z",
  "M 0 44 Q 180 36, 360 22 Q 540 18, 720 26 Q 900 38, 1080 46 Q 1260 42, 1440 36 L 1440 142 L 0 142 Z",
];

export default function WaveTransition() {
  return (
    <div
      aria-hidden
      className="pointer-events-none relative z-10 h-[90px] w-full overflow-visible sm:h-[120px]"
    >
      <motion.svg
        viewBox="0 0 1440 140"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 h-full w-full overflow-visible"
        style={{ filter: "drop-shadow(0 -4px 10px rgba(0,0,0,0.10))" }}
        initial={{ y: 36, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.path
          fill="#F3EFE6"
          animate={{ d: WAVE_FRAMES }}
          transition={{
            duration: 7,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      </motion.svg>
    </div>
  );
}
