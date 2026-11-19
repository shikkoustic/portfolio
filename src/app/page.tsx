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
        {/* This outer div is what bounds the sticky child's pin range: a
            sticky element stays stuck for as long as its CONTAINING BLOCK
            (its parent) is in view, not for its own height. Without this
            wrapper, `main` itself (the whole page) is that containing
            block, so Hero would never un-stick and would stay painted over
            every section below it for the rest of the scroll. */}
        <div className="relative h-screen">
          <div className="sticky top-0 z-0 h-screen overflow-hidden">
            <Hero />
          </div>
        </div>
        <div className="relative z-10">
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
