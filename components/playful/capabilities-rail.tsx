"use client";

import { useState } from "react";
import {
  Bot,
  Boxes,
  Database,
  Globe2,
  Lightbulb,
  Smartphone,
  Sparkles,
  Workflow,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const capabilities = [
  {
    title: "Websites",
    blurb: "Brand sites, launches & conversion-focused pages",
    icon: Globe2,
  },
  {
    title: "Applications",
    blurb: "Custom web apps built around real workflows",
    icon: Boxes,
  },
  {
    title: "Business Systems",
    blurb: "CRM, dashboards, ops & management tools",
    icon: Workflow,
  },
  {
    title: "AI",
    blurb: "Practical LLM integrations & intelligent features",
    icon: Bot,
  },
  {
    title: "Automation",
    blurb: "Repeatable processes that save time",
    icon: Sparkles,
  },
  {
    title: "Data",
    blurb: "Annotation, preparation & quality workflows",
    icon: Database,
  },
  {
    title: "Mobile",
    blurb: "Cross-platform utility & business apps",
    icon: Smartphone,
  },
  {
    title: "Ideas → Reality",
    blurb: "From concept to a working digital product",
    icon: Lightbulb,
  },
] as const;

export function CapabilitiesRail() {
  const prefersReducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const sequence = [...capabilities, ...capabilities];

  return (
    <section
      className="relative overflow-hidden border-y border-white/8 bg-[#05070f] py-14 md:py-20"
      aria-label="Capabilities"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(225,29,46,0.1),transparent_55%)]" />

      <div className="relative mb-8 flex items-end justify-between gap-4 px-4 md:px-[max(1.5rem,calc((100%-76rem)/2))]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
            Capabilities
          </p>
          <h2 className="mt-2 font-display text-2xl font-medium tracking-tight text-foreground md:text-4xl">
            What I turn ideas into.
          </h2>
        </div>
        <p className="hidden max-w-xs text-right text-sm text-muted md:block">
          Hover a card — soft glow, lift, and accent details.
        </p>
      </div>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#05070f] to-transparent md:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#05070f] to-transparent md:w-24" />

        <div
          className={cn(
            "flex w-max gap-4 px-4 md:gap-5 md:px-10",
            !prefersReducedMotion && "marquee-track [animation-duration:42s]",
            paused && "![animation-play-state:paused]",
          )}
        >
          {sequence.map((item, index) => {
            const Icon = item.icon;
            const realIndex = index % capabilities.length;

            return (
              <motion.article
                key={`${item.title}-${index}`}
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : { y: -10, scale: 1.03 }
                }
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                className="group relative h-[17rem] w-[16.5rem] shrink-0 overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-[#12182a] to-[#0a1020] p-6 transition-[border-color,box-shadow] duration-300 hover:border-accent/50 hover:shadow-[0_20px_60px_rgba(0,0,0,0.45),0_0_0_1px_rgba(225,29,46,0.2),0_0_40px_rgba(225,29,46,0.18)] md:h-[19rem] md:w-[19rem]"
              >
                {/* Soft accent wash — keeps dark theme readable */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(225,29,46,0.2),transparent_45%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Bottom accent line */}
                <div className="absolute inset-x-6 bottom-0 h-[2px] origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100" />

                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-xs text-muted transition-colors duration-300 group-hover:text-accent">
                      {String(realIndex + 1).padStart(2, "0")}
                    </span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-accent transition-all duration-300 group-hover:border-accent/40 group-hover:bg-accent-soft group-hover:shadow-[0_0_24px_rgba(225,29,46,0.35)]">
                      <Icon
                        size={18}
                        className="transition-transform duration-300 group-hover:scale-110"
                      />
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display text-3xl font-medium leading-[0.95] tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent md:text-4xl">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted transition-colors duration-300 group-hover:text-foreground/80">
                      {item.blurb}
                    </p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-subtle md:hidden">Swipe / hover to explore</p>
    </section>
  );
}
