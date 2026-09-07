"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { skillCategories } from "@/data/skills";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

const floatOffsets = [
  { x: -8, y: -14 },
  { x: 10, y: -8 },
  { x: -6, y: 12 },
  { x: 12, y: 6 },
  { x: -12, y: 4 },
  { x: 7, y: -12 },
  { x: -4, y: -6 },
  { x: 9, y: 10 },
];

export function Skills() {
  const [active, setActive] = useState(skillCategories[0]?.id ?? "frontend");
  const [autoPlay, setAutoPlay] = useState(true);
  const prefersReducedMotion = useReducedMotion();
  const activeIndex = skillCategories.findIndex((category) => category.id === active);
  const activeCategory =
    skillCategories.find((category) => category.id === active) ?? skillCategories[0];

  useEffect(() => {
    if (prefersReducedMotion || !autoPlay) return;
    const timer = window.setInterval(() => {
      setActive((current) => {
        const index = skillCategories.findIndex((category) => category.id === current);
        const next = (index + 1) % skillCategories.length;
        return skillCategories[next]?.id ?? current;
      });
    }, 3800);
    return () => window.clearInterval(timer);
  }, [autoPlay, prefersReducedMotion]);

  return (
    <section id="skills" className="section-pad relative overflow-hidden" aria-labelledby="skills-heading">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-[28rem] -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(225,29,46,0.14),transparent_60%)]" />

      {!prefersReducedMotion
        ? skillCategories
            .flatMap((category) => category.skills)
            .slice(0, 10)
            .map((skill, index) => (
              <motion.span
                key={`float-${skill.name}-${index}`}
                aria-hidden
                className="pointer-events-none absolute hidden rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/20 lg:block"
                style={{
                  left: `${8 + ((index * 9) % 80)}%`,
                  top: `${12 + ((index * 13) % 70)}%`,
                }}
                animate={{
                  y: [0, -18, 0],
                  opacity: [0.15, 0.35, 0.15],
                }}
                transition={{
                  duration: 5 + (index % 4),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.35,
                }}
              >
                {skill.name}
              </motion.span>
            ))
        : null}

      <Container className="relative">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              id="skills-heading"
              eyebrow="Skills"
              title="My Technology Arsenal"
              description="A practical stack for building modern websites, applications, systems, and intelligent digital products."
            />
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 self-start rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 md:self-auto"
            >
              <span className="font-display text-3xl font-medium text-accent">
                {String(activeCategory.skills.length).padStart(2, "0")}
              </span>
              <span className="text-xs uppercase tracking-[0.18em] text-muted">
                tools in
                <br />
                {activeCategory.label}
              </span>
            </motion.div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <LayoutGroup>
            <div
              role="tablist"
              aria-label="Skill categories"
              className="mt-10 flex gap-2 overflow-x-auto pb-3"
              onMouseEnter={() => setAutoPlay(false)}
              onMouseLeave={() => setAutoPlay(true)}
              onFocusCapture={() => setAutoPlay(false)}
            >
              {skillCategories.map((category) => {
                const isActive = active === category.id;
                return (
                  <button
                    key={category.id}
                    role="tab"
                    type="button"
                    aria-selected={isActive}
                    className={cn(
                      "relative shrink-0 rounded-full px-4 py-2.5 text-sm font-medium transition-colors",
                      isActive ? "text-white" : "text-muted hover:text-foreground",
                    )}
                    onClick={() => {
                      setActive(category.id);
                      setAutoPlay(false);
                    }}
                  >
                    {isActive && !prefersReducedMotion ? (
                      <motion.span
                        layoutId="skills-tab-pill"
                        className="absolute inset-0 rounded-full bg-accent shadow-[0_10px_30px_rgba(225,29,46,0.35)]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    ) : null}
                    {isActive && prefersReducedMotion ? (
                      <span className="absolute inset-0 rounded-full bg-accent" />
                    ) : null}
                    {!isActive ? (
                      <span className="absolute inset-0 rounded-full border border-white/10" />
                    ) : null}
                    <span className="relative z-10">{category.label}</span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>

          <div className="mt-2 flex gap-1.5 px-1">
            {skillCategories.map((category, index) => (
              <button
                key={`dot-${category.id}`}
                type="button"
                aria-label={`Show ${category.label}`}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  index === activeIndex ? "w-6 bg-accent" : "w-1.5 bg-white/20 hover:bg-white/40",
                )}
                onClick={() => {
                  setActive(category.id);
                  setAutoPlay(false);
                }}
              />
            ))}
          </div>
        </Reveal>

        <div className="relative mt-8 overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-elevated via-card/80 to-background p-6 md:min-h-[22rem] md:p-10">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-accent/5 blur-3xl" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -16, filter: "blur(6px)" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="font-mono text-xs text-accent">
                    {String(activeIndex + 1).padStart(2, "0")} /{" "}
                    {String(skillCategories.length).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 font-display text-3xl font-medium tracking-tight text-foreground md:text-5xl">
                    {activeCategory.label}
                  </h3>
                </div>
                <p className="max-w-xs text-sm text-muted">
                  Hover the tags — they bounce. Categories auto-play until you take control.
                </p>
              </div>

              <div className="flex flex-wrap content-start gap-3 md:gap-4">
                {activeCategory.skills.map((skill, index) => {
                  const offset = floatOffsets[index % floatOffsets.length];
                  return (
                    <motion.button
                      type="button"
                      key={skill.name}
                      initial={
                        prefersReducedMotion
                          ? false
                          : { opacity: 0, scale: 0.7, y: 20, rotate: -4 }
                      }
                      animate={
                        prefersReducedMotion
                          ? { opacity: 1, scale: 1 }
                          : {
                              opacity: 1,
                              scale: 1,
                              y: [0, offset.y, 0],
                              x: [0, offset.x, 0],
                              rotate: 0,
                            }
                      }
                      transition={
                        prefersReducedMotion
                          ? { duration: 0.2 }
                          : {
                              opacity: { delay: index * 0.05, duration: 0.3 },
                              scale: { delay: index * 0.05, duration: 0.35, type: "spring" },
                              y: {
                                delay: 0.4 + index * 0.05,
                                duration: 3.4 + (index % 3) * 0.4,
                                repeat: Infinity,
                                ease: "easeInOut",
                              },
                              x: {
                                delay: 0.4 + index * 0.05,
                                duration: 4 + (index % 3) * 0.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                              },
                            }
                      }
                      whileHover={
                        prefersReducedMotion
                          ? undefined
                          : {
                              scale: 1.12,
                              y: -10,
                              rotate: [-2, 2, 0],
                              backgroundColor: "#e11d2e",
                              color: "#ffffff",
                              borderColor: "#e11d2e",
                            }
                      }
                      whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
                      className="cursor-pointer rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-foreground shadow-[0_12px_40px_rgba(0,0,0,0.25)] backdrop-blur-sm md:text-base"
                    >
                      {skill.name}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
