import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import WaveTransition from "@/components/WaveTransition";
import Work from "@/components/Work";
import Experience from "@/components/Experience";
import CompetitiveProgramming from "@/components/CompetitiveProgramming";
import About from "@/components/About";
import Stack from "@/components/Stack";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        {/* A sticky element only stays visually pinned for as long as its
            CONTAINING BLOCK (its parent) has "slack" beyond the element's
            own height — pin duration = parent height - child height. A
            parent exactly one viewport tall gives zero slack (Hero would
            unstick instantly), and a parent the size of `main` gives it no
            end to that slack (Hero never releases, paints over everything
            below forever). 200vh gives Hero a full extra viewport of
            genuine pin duration. */}
        <div className="relative h-[200vh]">
          <div className="sticky top-0 z-0 h-screen overflow-hidden">
            <Hero />
          </div>
        </div>
        {/* Work's wrapper normally starts exactly where Hero's 200vh box
            ends - which is also exactly Hero's unstick point, by
            construction. That means they'd always be flush, never
            overlapping: Work would only ever appear right as Hero finishes
            releasing, so the wave's "see Hero through the transparent gap"
            effect would never have anything behind it to show. Pulling
            Work up with a negative margin makes it start rising into the
            viewport while Hero is still genuinely pinned, giving a real
            overlap window sized comfortably larger than the wave's own
            height for the crest to animate across. */}
        <div className="relative z-10 -mt-[380px]">
          <WaveTransition />
          <Work />
        </div>
        <Experience />
        <CompetitiveProgramming />
        <About />
        <Stack />
      </main>
      <Footer />
    </>
  );
}
