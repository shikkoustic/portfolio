import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import WaveEdge from "@/components/WaveEdge";
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
        {/* ── HERO + WAVE WASH INTO WORK ── */}
        <div className="relative">
          {/* Pinned Hero */}
          <div className="sticky top-0 h-screen w-full overflow-hidden z-0">
            <Hero />
          </div>

          {/* Runway spacer: allows wave to enter smoothly from below */}
          <div aria-hidden className="h-[35vh] w-full pointer-events-none" />

          {/* Incoming Work section */}
          <div className="relative z-10 bg-cream">
            {/* Animated Wave Crest Washing Over Hero */}
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-full left-0 right-0 w-full overflow-hidden select-none"
              style={{ height: 240, marginBottom: -1 }}
            >
              <WaveEdge fill="#F3F2ED" />
            </div>

            <Work />
          </div>
        </div>

        {/* ── NORMAL SMOOTH SCROLLING SECTIONS (1 section at a time on screen) ── */}
        <Experience />
        <CompetitiveProgramming />
        <About />
        <Stack />
      </main>
      <Footer />
    </>
  );
}
