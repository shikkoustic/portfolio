import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import FadeSection from "@/components/FadeSection";
import Work from "@/components/Work";
import Experience from "@/components/Experience";
import CompetitiveProgramming from "@/components/CompetitiveProgramming";
import GithubActivity from "@/components/GithubActivity";
import About from "@/components/About";
import PlayGame from "@/components/PlayGame";
import Stack from "@/components/Stack";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <FadeSection z={0} index={0}>
          <Hero />
        </FadeSection>
        <FadeSection z={10} index={1} waveColor="#f3efe6">
          <Work />
        </FadeSection>
        <FadeSection z={20} index={2}>
          <Experience />
        </FadeSection>
        <FadeSection z={30} index={3}>
          <CompetitiveProgramming />
        </FadeSection>
        <FadeSection z={40} index={4}>
          <GithubActivity />
        </FadeSection>
        <FadeSection z={50} index={5}>
          <About />
        </FadeSection>
        <FadeSection z={60} index={6}>
          <PlayGame />
        </FadeSection>
        <FadeSection z={70} index={7}>
          <Stack />
        </FadeSection>
      </main>
      <Footer />
    </>
  );
}
