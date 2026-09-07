"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "motion/react";

function subscribePointerCapability(onStoreChange: () => void) {
  const fine = window.matchMedia("(pointer: fine)");
  const hover = window.matchMedia("(hover: hover)");
  fine.addEventListener("change", onStoreChange);
  hover.addEventListener("change", onStoreChange);
  return () => {
    fine.removeEventListener("change", onStoreChange);
    hover.removeEventListener("change", onStoreChange);
  };
}

function getPointerCapability() {
  return (
    window.matchMedia("(pointer: fine)").matches &&
    window.matchMedia("(hover: hover)").matches
  );
}

function getServerSnapshot() {
  return false;
}

function SpiderMark({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <circle cx="12" cy="10" r="3.2" />
      <path d="M12 13.2c-1.4 0-2.4.7-2.8 1.6h5.6c-.4-.9-1.4-1.6-2.8-1.6Z" />
      <path
        d="M4.5 8.2 8 10M19.5 8.2 16 10M3.8 12.5 8.2 12M20.2 12.5 15.8 12M5 16.8 8.5 14.2M19 16.8 15.5 14.2M7.2 5.5 9.4 8.2M16.8 5.5 14.6 8.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  const canUseCustomCursor = useSyncExternalStore(
    subscribePointerCapability,
    getPointerCapability,
    getServerSnapshot,
  );
  const enabled = Boolean(canUseCustomCursor && !prefersReducedMotion);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [expanded, setExpanded] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [trail, setTrail] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove("custom-cursor-active");
      return;
    }

    document.documentElement.classList.add("custom-cursor-active");

    const onMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    const onOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest(
        "a, button, [role='button'], input, textarea, select, [data-cursor='interactive']",
      );
      const project = target.closest("[data-cursor='project']");
      setExpanded(Boolean(interactive || project));
      setLabel(project ? "Swing" : interactive ? "Tap" : null);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    const tick = () => {
      setTrail((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.18,
        y: prev.y + (position.y - prev.y) * 0.18,
      }));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [enabled, position.x, position.y]);

  if (!enabled) return null;

  const size = expanded ? 56 : 28;

  return (
    <>
      {/* Web ring trail */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[99] hidden lg:block"
        animate={{
          x: trail.x - 18,
          y: trail.y - 18,
          opacity: expanded ? 0.55 : 0.35,
        }}
        transition={{ type: "spring", stiffness: 180, damping: 24, mass: 0.5 }}
      >
        <div className="h-9 w-9 rounded-full border border-accent/50 shadow-[0_0_18px_rgba(225,29,46,0.35)]" />
      </motion.div>

      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden lg:block"
        animate={{
          x: position.x - size / 2,
          y: position.y - size / 2,
          width: size,
          height: size,
        }}
        transition={{ type: "spring", stiffness: 520, damping: 32, mass: 0.35 }}
      >
        <div
          className={`relative flex h-full w-full items-center justify-center rounded-full border-2 border-white/90 bg-accent text-white shadow-[0_0_28px_rgba(225,29,46,0.55)] ${
            expanded ? "" : ""
          }`}
        >
          {expanded && label ? (
            <span className="text-[9px] font-bold uppercase tracking-[0.14em]">{label}</span>
          ) : (
            <SpiderMark size={expanded ? 18 : 14} />
          )}
          <span className="absolute inset-[-6px] rounded-full border border-[var(--accent-2)]/40" />
        </div>
      </motion.div>
    </>
  );
}
