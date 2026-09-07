"use client";

import { motion, useReducedMotion } from "motion/react";
import { aboutJourney } from "@/data/content";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ArrowRight } from "lucide-react";

const capabilities = [
  "Web development",
  "Application development",
  "Business systems",
  "AI",
  "Automation",
  "Data",
  "Digital experiences",
];

export function About() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="about" className="section-pad relative" aria-labelledby="about-heading">
      <Container>
        <Reveal>
          <SectionHeading
            id="about-heading"
            eyebrow="About"
            title="More Than Just Code."
            description="I'm a digital solutions-focused developer who builds technology around real problems."
          />
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal delay={0.08}>
            <p className="max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
              From concept to launch, I help turn product ideas into working digital systems —
              websites, applications, business tools, intelligent features, and automation that
              create real outcomes.
            </p>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {capabilities.map((item, index) => (
                <motion.span
                  key={item}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * index }}
                  whileHover={
                    prefersReducedMotion
                      ? undefined
                      : { y: -4, scale: 1.05, backgroundColor: "#e11d2e", color: "#ffffff" }
                  }
                  className="cursor-default rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-sm text-muted"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <motion.aside
              whileHover={prefersReducedMotion ? undefined : { y: -4 }}
              className="rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-elevated to-card/80 p-6 md:p-8"
            >
              <p className="text-sm leading-relaxed text-muted">
                Positioning: take a business or product idea from concept to a working digital
                solution — with clarity, craft, and practical modern technology.
              </p>
              <p className="mt-4 font-display text-xl text-foreground md:text-2xl">
                Ideas In. Digital Solutions Out.
              </p>
            </motion.aside>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="mt-14 overflow-hidden rounded-[1.75rem] border border-white/10 bg-elevated/40 p-5 md:p-8">
            <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-subtle">
              How ideas become products
            </p>
            <ol className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2 md:gap-3">
              {aboutJourney.map((step, index) => (
                <motion.li
                  key={step}
                  initial={prefersReducedMotion ? false : { opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="flex items-center gap-2 sm:gap-3"
                >
                  <motion.span
                    whileHover={prefersReducedMotion ? undefined : { scale: 1.08, y: -2 }}
                    className="inline-flex items-center rounded-full border border-accent/30 bg-accent-soft px-3.5 py-2 font-display text-xs font-medium tracking-[0.16em] text-accent md:text-sm"
                  >
                    {step}
                  </motion.span>
                  {index < aboutJourney.length - 1 ? (
                    <ArrowRight className="hidden text-accent/60 sm:block" size={14} aria-hidden />
                  ) : null}
                </motion.li>
              ))}
            </ol>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
