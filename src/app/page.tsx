import { Hero } from "@/components/Hero";
import { LogoMarquee } from "@/components/LogoMarquee";
import { ProofQuote } from "@/components/ProofQuote";
import { Agents } from "@/components/Agents";
import { Solutions } from "@/components/Solutions";
import { Platform } from "@/components/Platform";
import { HowItWorks } from "@/components/HowItWorks";
import { Results } from "@/components/Results";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoMarquee />
      <ProofQuote />
      <Agents />
      <Solutions />
      <Platform />
      <HowItWorks />
      <Results />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  );
}
