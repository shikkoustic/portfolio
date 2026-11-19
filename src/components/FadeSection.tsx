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
// The wave crest sits at the very top of the incoming section, as a
// normal flex sibling BEFORE the content (not an absolutely positioned
// overlay). Two things tried before this both failed the same way, for
// opposite reasons:
//   - Giving it a fixed height and sliding it away with `transform: y`:
//     a transform only moves where something PAINTS, it never gives back
//     the layout space the element reserves, so the content below stayed
//     squeezed into (section height - crest height) even after the crest
//     had visually scrolled off - rendering as a blank gap up top with
//     everything crammed into the bottom half.
//   - Overlaying it on top of the content instead (so the content could
//     use the section's full height): the crest's fill is the destination
//     section's own background color, by design, so its transparent gaps
//     read as "water" and its filled parts blend with the content behind
//     it once landed. But stacked ON TOP of that same content, its filled
//     parts don't blend with anything - they just paint over and hide the
//     heading and the top row of cards sitting directly underneath.
// The actual fix: animate the crest's own HEIGHT (240px -> 0px) over the
// same scroll range, instead of transforming it. A height change is a
// real layout change, so as it shrinks, the content - a normal flex-1
// sibling right after it - naturally reflows upward to reclaim the space,
// at the same rate the crest visually collapses. No overlay, no reserved
// dead space once it's done.
//
// Tracking a target element's own rect (even a non-sticky marker) turned
// out not to extrapolate past "fully entered" the way plain page scrollY
// does — scrollYProgress from a `target` stays clamped at 1. So instead
// the crest's exit is driven directly off absolute window scrollY: each
// section occupies one viewport plus the 45vh settle spacer below, so
// this section's own landing point in px is `index * slot`, and a short
// distance after that the crest has fully collapsed.
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
  const waveHeight = useTransform(
    scrollY,
    [landing, landing + vh * 0.25],
    [240, 0],
    { clamp: true }
  );

  return (
    <>
      <div
        className="sticky top-0 flex h-screen flex-col overflow-hidden"
        style={{ zIndex: z }}
      >
        {index > 0 && waveColor && (
          <motion.div
            style={{ height: waveHeight }}
            className="pointer-events-none w-full shrink-0 overflow-hidden"
          >
            <WaveEdge fill={waveColor} />
          </motion.div>
        )}
        <div className="min-h-0 flex-1">{children}</div>
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
