import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import FadeSection from "@/components/FadeSection";
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
        {/* Hero + wave-wash into Work — these two are intentionally pinned */}
        <FadeSection z={0} index={0}>
          <Hero />
        </FadeSection>
        <FadeSection z={10} index={1} waveColor="#f3efe6">
          <Work />
        </FadeSection>

        {/* All remaining sections scroll normally — no pinning, no fade locks */}
        <Experience />
        <CompetitiveProgramming />
        <About />
        <Stack />
      </main>
      <Footer />
    </>
  );
}
