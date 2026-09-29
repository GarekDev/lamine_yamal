import { About } from "@/components/about/About";
import { Creator } from "@/components/creator/Creator";
import { Footer } from "@/components/footer/Footer";
import { Hero } from "@/components/hero/Hero";
import { Statistics } from "@/components/stats/Statistics";
import { TrophyBelt } from "@/components/trophies/TrophyBelt";

export default function HomePage() {
  return (
    <>
      <main id="contenido">
        <Hero />
        <About />
        <TrophyBelt />
        <Statistics />
        <Creator />
      </main>
      <Footer />
    </>
  );
}
