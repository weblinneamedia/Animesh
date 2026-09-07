"use client";

import Link from "next/link";
import { useId } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface CircularTextProps {
  text?: string;
  href?: string;
  className?: string;
  size?: number;
  centerLabel?: string;
}

export function CircularText({
  text = "START A PROJECT • LET'S BUILD • ",
  href = "#contact",
  className,
  size = 160,
  centerLabel = "Play",
}: CircularTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const pathId = useId().replace(/:/g, "");
  const radius = size / 2 - 14;

  return (
    <Link
      href={href}
      aria-label="Start a project"
      data-cursor="interactive"
      className={cn(
        "group relative inline-flex items-center justify-center rounded-full",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <span className="absolute inset-[20%] z-[1] flex items-center justify-center rounded-full bg-accent font-display text-sm font-semibold text-white shadow-[0_10px_30px_rgba(225,29,46,0.45)] transition-transform duration-300 group-hover:scale-110">
        {centerLabel}
      </span>

      <svg
        className={cn(
          "absolute inset-0 h-full w-full overflow-visible text-current",
          !prefersReducedMotion && "animate-[orbit-spin_14s_linear_infinite]",
        )}
        viewBox={`0 0 ${size} ${size}`}
        aria-hidden
      >
        <defs>
          <path
            id={pathId}
            d={`M ${size / 2},${size / 2} m -${radius},0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
            fill="none"
          />
        </defs>
        <text className="fill-current text-[10px] font-semibold uppercase tracking-[0.28em]">
          <textPath href={`#${pathId}`}>{text}</textPath>
        </text>
      </svg>
    </Link>
  );
}
