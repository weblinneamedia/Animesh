"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
}

export function Card({ className, interactive = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-lg)] border border-white/8 bg-card/80 p-6",
        interactive &&
          "transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:bg-[var(--bg-card-hover)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)]",
        className,
      )}
      {...props}
    />
  );
}
