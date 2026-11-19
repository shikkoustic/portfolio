"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import WaveEdge from "./WaveEdge";

// Every section is `position: sticky; top: 0`, all direct siblings under
// the same parent (`main`), each with a higher z-index than the one
// before it. A sticky element only "releases" once its parent runs out of
// room beyond its own height — since the parent here is `main` itself
// (effectively unbounded), none of them ever release. Each one reaches the
// top, sticks there permanently, and stays pinned, exactly in place,
// forever. There's no slide-away phase, because nothing ever un-sticks.
//
// The next section needs no special positioning to "come in" - it's just
// the next block in normal document flow, so it naturally rises up from
// below the viewport as the user scrolls, and (being a higher z-index)
// visually buries whatever is stuck beneath it as it arrives.
//
// The wave crest sits at the very top of the incoming section, as an
// absolutely positioned OVERLAY on top of the content — not a sibling
// sharing flex space with it. A `transform: translateY` (the `y` motion
// value below) only moves where something is PAINTED; it never gives back
// the layout space that element reserves. Putting the crest in normal flow
// alongside the content meant that even once it had visually translated
// away, its 240px was still being subtracted from the content's height —
// which is why the section kept rendering as a big blank gap on top with
// everything crammed into the bottom half. Overlaying it means the content
// always gets the section's full height, with the crest floating above it
// only while it's actually passing through.
//
// Tracking a target element's own rect (even a non-sticky marker) turned
// out not to extrapolate past "fully entered" the way plain page scrollY
// does — scrollYProgress from a `target` stays clamped at 1. So instead
// the crest's exit is driven directly off absolute window scrollY: each
// section occupies one viewport plus the 45vh settle spacer below, so
// this section's own landing point in px is `index * slot`, and a short
// distance after that the crest is translated fully out of view.
const SLOT_MULT = 1.45; // 1 (h-screen) + 0.45 (the settle spacer)

export default function FadeSection({
  children,
  z,
  index,
  waveColor,
}: {
  children: ReactNode;
  z: number;
  index: number;
  waveColor?: string;
}) {
  const { scrollY } = useScroll();
  const [vh, setVh] = useState(900);

  useEffect(() => {
    const update = () => setVh(window.innerHeight);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const slot = vh * SLOT_MULT;
  const landing = index * slot;
  const waveY = useTransform(
    scrollY,
    [landing, landing + vh * 0.4],
    ["0%", "-130%"],
    { clamp: true }
  );

  return (
    <>
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={{ zIndex: z }}
      >
        {index > 0 && waveColor && (
          <motion.div
            style={{ y: waveY }}
            className="pointer-events-none absolute inset-x-0 top-0 z-10"
          >
            <WaveEdge fill={waveColor} />
          </motion.div>
        )}
        <div className="h-full">{children}</div>
      </div>
      {/* A plain, invisible spacer in normal flow - not sticky, not
          z-indexed, nothing to see. It exists purely to push the NEXT
          section's natural starting position further down the document, so
          there's real scroll distance where this section just sits there,
          fully settled, before the next one's rise even begins. Without it,
          the next section's natural top sits immediately after this one's
          own h-screen box, so it starts rising the instant this one finishes
          landing - there's no pause, the two blend together mid-transition. */}
      <div aria-hidden className="h-[45vh]" />
    </>
  );
}
