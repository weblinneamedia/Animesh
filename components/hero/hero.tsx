"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { CircularText } from "@/components/ui/circular-text";
import { Container } from "@/components/ui/container";
import { OchiEyes } from "@/components/ui/ochi-eyes";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.15]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-end overflow-hidden pb-10 pt-28 md:items-center md:pb-16"
      aria-labelledby="hero-heading"
    >
      <div className="pointer-events-none absolute inset-0 mesh-glow" />
      <div className="pointer-events-none absolute inset-0 web-bg" />
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
      <div className="aurora-blob left-[15%] top-[-8%] h-[24rem] w-[24rem] bg-accent/25" />
      <div
        className="aurora-blob right-[5%] top-[20%] h-[22rem] w-[22rem] bg-[var(--accent-2)]/20"
        style={{ animationDelay: "-5s" }}
      />

      {/* Decorative spinning web */}
      <div
        aria-hidden
        className="web-spin pointer-events-none absolute right-[-8rem] top-24 hidden h-[28rem] w-[28rem] rounded-full border border-accent/15 md:block"
      >
        <div className="absolute inset-8 rounded-full border border-[var(--accent-2)]/20" />
        <div className="absolute inset-16 rounded-full border border-accent/10" />
        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-accent/30 to-transparent" />
          <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-[var(--accent-2)]/30 to-transparent" />
        </div>
      </div>

      <Container className="relative z-10 w-full">
        <motion.div style={prefersReducedMotion ? undefined : { y, opacity }}>
          <div className="mb-8 flex flex-wrap items-center justify-between gap-6">
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent-soft px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-50" />
                <span className="relative h-2 w-2 rounded-full bg-accent" />
              </span>
              Friendly neighborhood freelancers welcome
            </motion.p>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="hidden md:block"
            >
              <CircularText
                size={140}
                centerLabel="Go"
                text="SWING INTO A PROJECT • BUILD WITH ME • "
                className="text-foreground"
              />
            </motion.div>
          </div>

          <div className="grid items-end gap-10 lg:grid-cols-[1.25fr_0.75fr]">
            <div>
              <motion.p
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="mb-4 font-display text-sm uppercase tracking-[0.35em] text-muted md:text-base"
              >
                Animesh Hazra · Digital Hero Mode
              </motion.p>

              <motion.h1
                id="hero-heading"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-[clamp(3.4rem,11vw,8.5rem)] font-medium leading-[0.86] tracking-[-0.055em] text-foreground"
              >
                Ideas In.
                <br />
                <span className="gradient-text gradient-text-animated">Solutions Out.</span>
              </motion.h1>

              <motion.p
                initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="mt-7 max-w-xl text-base leading-relaxed text-muted md:text-xl"
              >
                With great code comes great responsibility — I design and build websites, apps,
                systems, AI and automation that turn ideas into real products.
              </motion.p>

              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-9 flex flex-col gap-3 sm:flex-row"
              >
                <ButtonLink href="#contact" size="lg" className="btn-shine group min-w-[11rem]">
                  Start a Project
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </ButtonLink>
                <ButtonLink href="#projects" variant="secondary" size="lg" className="group">
                  Explore My Work
                  <ArrowDownRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                  />
                </ButtonLink>
              </motion.div>
            </div>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="relative flex flex-col items-center justify-end gap-6 pb-2"
            >
              <div className="relative rounded-[2rem] border border-accent/30 bg-gradient-to-b from-accent/20 to-[var(--accent-2)]/10 p-6 shadow-[0_0_80px_rgba(225,29,46,0.2)]">
                <div className="pulse-ring absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/30" />
                <OchiEyes size="xl" tone="light" />
              </div>
              <p className="max-w-[16rem] text-center text-sm text-muted">
                Mask on. Eyes watching the details — just like Spidey.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
