import type { ReactNode } from "react";
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
// The transition itself is the animated wave crest (WaveEdge) sitting at
// the very top of the incoming section, in normal flow - not a plain
// opacity crossfade. Its fill matches the section it belongs to, and the
// area above its rippling line is transparent, so the still-pinned section
// underneath shows through it as it rises, exactly like water washing in.
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
  return (
    <div
      className="sticky top-0 flex h-screen flex-col overflow-hidden"
      style={{ zIndex: z }}
    >
      {index > 0 && waveColor && <WaveEdge fill={waveColor} />}
      <div className="min-h-0 flex-1">{children}</div>
    </div>
  );
}
