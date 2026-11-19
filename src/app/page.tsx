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
        {/* Hero + wave-wash into Work — intentionally pinned/sticky */}
        <FadeSection z={0} index={0}>
          <Hero />
        </FadeSection>
        <FadeSection z={10} index={1} waveColor="#f3efe6">
          <Work />
        </FadeSection>

        {/* Normal-scroll sections — z-20 so they slide over the sticky Work as you scroll down */}
        <div className="relative" style={{ zIndex: 20 }}>
          <Experience />
          <CompetitiveProgramming />
          <About />
          <Stack />
        </div>
      </main>
      <Footer />
    </>
  );
}
