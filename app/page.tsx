import { About } from "@/components/about/about";
import { WhyAnimesh } from "@/components/about/why-animesh";
import { Contact } from "@/components/contact/contact";
import { Experience } from "@/components/experience/experience";
import { Hero } from "@/components/hero/hero";
import { CapabilitiesRail } from "@/components/playful/capabilities-rail";
import { EyesPlaySection } from "@/components/playful/eyes-play-section";
import { DigitalBlueprint } from "@/components/process/digital-blueprint";
import { Process } from "@/components/process/process";
import { Projects } from "@/components/projects/projects";
import { Services } from "@/components/services/services";
import { Skills } from "@/components/skills/skills";
import { Testimonials } from "@/components/testimonials/testimonials";
import { PageTransition } from "@/components/ui/page-transition";

export default function HomePage() {
  return (
    <PageTransition>
      <Hero />
      <CapabilitiesRail />
      <About />
      <Services />
      <Skills />
      <Projects />
      <EyesPlaySection />
      <DigitalBlueprint />
      <Process />
      <WhyAnimesh />
      <Experience />
      <Testimonials />
      <Contact />
    </PageTransition>
  );
}
