"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { CircularText } from "@/components/ui/circular-text";
import { Container } from "@/components/ui/container";
import { OchiEyes } from "@/components/ui/ochi-eyes";

export function EyesPlaySection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden bg-accent py-20 text-white md:py-28"
      aria-labelledby="play-heading"
    >
      <div className="pointer-events-none absolute inset-0 web-bg opacity-40" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent via-accent to-[var(--spidey-blue)] opacity-90" />

      <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
        <div className="absolute left-1/2 top-1/2 w-[140%] -translate-x-1/2 -translate-y-1/2 font-display text-[22vw] font-medium leading-none tracking-[-0.07em]">
          THWIP
        </div>
      </div>

      <Container className="relative z-10">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70"
          >
            Suit up for your next build
          </motion.p>

          <motion.h2
            id="play-heading"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="mt-5 font-display text-[clamp(2.8rem,8vw,5.8rem)] font-medium leading-[0.92] tracking-[-0.05em]"
          >
            Ready to swing
            <br />
            into a project?
          </motion.h2>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12, duration: 0.6 }}
            className="my-12 md:my-16"
          >
            <div className="rounded-[2rem] border border-white/20 bg-black/20 p-5 backdrop-blur-sm">
              <OchiEyes size="xl" tone="light" />
            </div>
          </motion.div>

          <div className="flex flex-col items-center gap-8 sm:flex-row">
            <ButtonLink
              href="#contact"
              size="lg"
              className="btn-shine group bg-ink text-cream hover:bg-black hover:scale-105"
            >
              Start a Project
              <ArrowUpRight size={16} />
            </ButtonLink>
            <CircularText
              className="text-white"
              size={150}
              centerLabel="Go"
              text="START A PROJECT • THWIP • LET'S BUILD • "
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
