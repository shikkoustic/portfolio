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
        <div className="sticky top-0 z-0 h-screen overflow-hidden">
          <Hero />
        </div>
        <div className="sticky top-0 z-10 min-h-screen bg-cream">
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
