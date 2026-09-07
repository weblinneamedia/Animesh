"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface OchiEyesProps {
  className?: string;
  size?: "md" | "lg" | "xl";
  tone?: "light" | "dark";
}

const sizeMap = {
  md: { eye: "h-28 w-28 sm:h-36 sm:w-36", pupil: "h-14 w-14 sm:h-16 sm:w-16", iris: "h-3 w-3" },
  lg: { eye: "h-36 w-36 sm:h-48 sm:w-48", pupil: "h-16 w-16 sm:h-20 sm:w-20", iris: "h-3.5 w-3.5" },
  xl: {
    eye: "h-40 w-40 sm:h-56 sm:w-56 md:h-64 md:w-64",
    pupil: "h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28",
    iris: "h-4 w-4",
  },
};

export function OchiEyes({ className, size = "lg", tone = "light" }: OchiEyesProps) {
  const prefersReducedMotion = useReducedMotion();
  const leftPupil = useRef<HTMLSpanElement>(null);
  const rightPupil = useRef<HTMLSpanElement>(null);
  const leftEye = useRef<HTMLDivElement>(null);
  const rightEye = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const movePupils = (clientX: number, clientY: number) => {
      const eyes = [
        { eye: leftEye.current, pupil: leftPupil.current },
        { eye: rightEye.current, pupil: rightPupil.current },
      ];

      eyes.forEach(({ eye, pupil }) => {
        if (!eye || !pupil) return;
        const rect = eye.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const angle = Math.atan2(clientY - centerY, clientX - centerX);
        const distance = Math.min(rect.width * 0.18, 28);
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        pupil.style.transform = `translate(${x}px, ${y}px)`;
      });
    };

    const onMove = (event: MouseEvent) => movePupils(event.clientX, event.clientY);
    const onTouch = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (touch) movePupils(touch.clientX, touch.clientY);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouch, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
    };
  }, [prefersReducedMotion]);

  const dims = sizeMap[size];
  const eyeSurface =
    tone === "light"
      ? "bg-[#f4f4f0] shadow-[inset_0_-8px_24px_rgba(0,0,0,0.08)]"
      : "bg-[#111118] border border-white/15 shadow-[inset_0_-8px_24px_rgba(255,255,255,0.04)]";
  const pupilTone = tone === "light" ? "bg-[#111]" : "bg-[#f4f4f0]";
  const irisTone = tone === "light" ? "bg-white" : "bg-[#111]";

  return (
    <div
      className={cn("flex items-center justify-center gap-4 sm:gap-6 md:gap-8", className)}
      aria-hidden
    >
      <div
        ref={leftEye}
        className={cn(
          "relative flex items-center justify-center rounded-full",
          dims.eye,
          eyeSurface,
        )}
      >
        <span
          ref={leftPupil}
          className={cn(
            "flex items-center justify-center rounded-full transition-transform duration-75 ease-out will-change-transform",
            dims.pupil,
            pupilTone,
          )}
        >
          <span className={cn("rounded-full", dims.iris, irisTone)} />
        </span>
      </div>

      <div
        ref={rightEye}
        className={cn(
          "relative flex items-center justify-center rounded-full",
          dims.eye,
          eyeSurface,
        )}
      >
        <span
          ref={rightPupil}
          className={cn(
            "flex items-center justify-center rounded-full transition-transform duration-75 ease-out will-change-transform",
            dims.pupil,
            pupilTone,
          )}
        >
          <span className={cn("rounded-full", dims.iris, irisTone)} />
        </span>
      </div>
    </div>
  );
}
