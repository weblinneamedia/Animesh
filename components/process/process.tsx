"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { processSteps } from "@/data/content";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Process() {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 60%", "end 50%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 70, damping: 22 });
  const width = useTransform(progress, [0, 1], ["0%", "100%"]);
  const height = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={ref}
      id="process"
      className="section-pad relative"
      aria-labelledby="process-heading"
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Process"
            title="From Idea to Launch"
            description="A structured path from understanding the problem to shipping and improving the product."
          />
        </Reveal>

        <div className="relative mt-12 hidden lg:block">
          <div className="absolute left-0 right-0 top-8 h-px bg-white/10" />
          {!prefersReducedMotion ? (
            <motion.div
              className="absolute left-0 top-8 h-px origin-left bg-gradient-to-r from-accent to-accent-strong"
              style={{ width }}
            />
          ) : null}

          <ol className="grid grid-cols-7 gap-3">
            {processSteps.map((step, index) => (
              <Reveal key={step.number} delay={index * 0.05}>
                <li className="relative pt-2">
                  <span className="mb-6 flex h-4 w-4 rounded-full border border-accent/50 bg-background shadow-[0_0_16px_rgba(94,234,212,0.25)]" />
                  <p className="font-mono text-xs text-accent">{step.number}</p>
                  <h3 className="mt-2 font-display text-lg font-medium text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>

        <div className="relative mt-10 lg:hidden">
          <div className="absolute bottom-2 left-4 top-2 w-px bg-white/10" />
          {!prefersReducedMotion ? (
            <motion.div
              className="absolute left-4 top-2 w-px origin-top bg-accent"
              style={{ height }}
            />
          ) : null}
          <ol className="space-y-8">
            {processSteps.map((step, index) => (
              <Reveal key={step.number} delay={index * 0.04}>
                <li className="relative pl-12">
                  <span className="absolute left-2.5 top-1.5 h-3.5 w-3.5 rounded-full border border-accent/50 bg-background" />
                  <p className="font-mono text-xs text-accent">{step.number}</p>
                  <h3 className="mt-1 font-display text-xl font-medium text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
