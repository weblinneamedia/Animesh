"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { blueprintStages } from "@/data/content";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function DigitalBlueprint() {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 40%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });
  const lineHeight = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={ref}
      id="blueprint"
      className="section-pad relative overflow-hidden"
      aria-labelledby="blueprint-heading"
    >
      <Container className="relative">
        <Reveal>
          <SectionHeading
            id="blueprint-heading"
            eyebrow="Signature"
            title="The Digital Blueprint"
            description="A clear path from idea to product — design, code, data, AI, and automation working together."
          />
        </Reveal>

        <div className="relative mx-auto mt-14 max-w-2xl">
          <div className="absolute bottom-8 left-[1.15rem] top-8 w-px bg-white/10 md:left-1/2 md:-translate-x-1/2" />
          {!prefersReducedMotion ? (
            <motion.div
              className="absolute bottom-8 left-[1.15rem] top-8 w-px origin-top bg-accent md:left-1/2 md:-translate-x-1/2"
              style={{ height: lineHeight }}
            />
          ) : (
            <div className="absolute bottom-8 left-[1.15rem] top-8 w-px bg-accent/50 md:left-1/2 md:-translate-x-1/2" />
          )}

          <ol className="relative space-y-7">
            {blueprintStages.map((stage, index) => (
              <Reveal key={stage} delay={index * 0.04}>
                <li className="relative flex items-center gap-5 md:justify-center">
                  <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent/50 bg-background text-xs font-semibold text-accent shadow-[0_0_30px_rgba(225,29,46,0.25)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-3xl font-medium tracking-[0.18em] text-foreground md:min-w-[14rem] md:text-center md:text-4xl">
                    {stage}
                  </span>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal delay={0.12}>
          <div className="mt-16 overflow-hidden rounded-[2rem] bg-gradient-to-br from-accent to-[var(--spidey-blue)] p-8 text-center text-white md:p-12">
            <p className="font-display text-3xl tracking-tight md:text-5xl">
              Let&apos;s build something real.
            </p>
            <ButtonLink
              href="#contact"
              className="btn-shine mt-8 bg-ink text-cream hover:bg-black hover:scale-105"
            >
              Start a Project
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
