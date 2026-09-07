import { whyCards } from "@/data/content";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";

export function WhyAnimesh() {
  return (
    <section id="why" className="section-pad relative" aria-labelledby="why-heading">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <Container>
        <Reveal>
          <SectionHeading
            id="why-heading"
            eyebrow="Why Animesh"
            title="Why Work With Me?"
            description="A solutions-first approach focused on clarity, custom builds, and real business outcomes."
          />
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {whyCards.map((card, index) => (
            <Reveal key={card.title} delay={index * 0.05}>
              <SpotlightCard className="h-full rounded-[var(--radius-lg)] border border-white/10 bg-card/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30">
                <article>
                  <p className="font-mono text-xs text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-display text-xl font-medium tracking-tight text-foreground">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{card.description}</p>
                </article>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
