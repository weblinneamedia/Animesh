"use client";

import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  className?: string;
  speed?: "slow" | "normal" | "fast";
  variant?: "subtle" | "ochi";
  direction?: "left" | "right";
}

export function Marquee({
  items,
  className,
  speed = "normal",
  variant = "subtle",
  direction = "left",
}: MarqueeProps) {
  const prefersReducedMotion = useReducedMotion();
  const sequence = [...items, ...items];
  const isOchi = variant === "ochi";

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        isOchi
          ? "border-y border-black/10 bg-cream py-6 md:py-8"
          : "border-y border-white/8 bg-elevated/40 py-4",
        className,
      )}
      aria-hidden
    >
      {!isOchi ? (
        <>
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent md:w-28" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent md:w-28" />
        </>
      ) : null}

      <div
        className={cn(
          "flex items-center px-4",
          isOchi ? "gap-10 md:gap-14" : "gap-8",
          prefersReducedMotion ? "" : "marquee-track",
          direction === "right" && !prefersReducedMotion && "[animation-direction:reverse]",
          speed === "slow" && !prefersReducedMotion && "[animation-duration:48s]",
          speed === "fast" && !prefersReducedMotion && "[animation-duration:22s]",
          isOchi && !prefersReducedMotion && "[animation-duration:26s]",
        )}
      >
        {sequence.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className={cn(
              "inline-flex shrink-0 items-center",
              isOchi
                ? "gap-10 font-display text-[clamp(2.4rem,7vw,5.5rem)] font-medium uppercase leading-none tracking-[-0.05em] text-ink md:gap-14"
                : "gap-8 font-display text-sm font-medium uppercase tracking-[0.28em] text-muted/80 md:text-base",
            )}
          >
            {item}
            <span
              className={cn(
                "rounded-full",
                isOchi ? "h-3.5 w-3.5 bg-accent md:h-5 md:w-5" : "h-1.5 w-1.5 bg-accent/70",
              )}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
