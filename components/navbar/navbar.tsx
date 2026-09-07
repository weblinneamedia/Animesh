"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button-link";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((link) => link.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(`#${id}`);
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "mx-auto mt-3 w-[min(100%-1.25rem,72rem)] rounded-full border transition-all duration-300",
          scrolled
            ? "border-white/10 bg-[rgba(8,8,12,0.78)] shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <nav
          className="flex h-[3.75rem] items-center justify-between px-4 sm:px-5"
          aria-label="Primary"
        >
          <Link
            href="/"
            className="group flex items-center gap-2.5"
            aria-label="Animesh Hazra home"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent font-display text-xs font-bold text-white">
              AH
            </span>
            <span className="hidden font-display text-sm font-medium tracking-wide text-foreground sm:inline">
              ANIMESH HAZRA
            </span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm transition-colors",
                  active === link.href
                    ? "text-accent"
                    : "text-muted hover:text-foreground",
                )}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:block">
            <ButtonLink href="#contact" size="sm">
              Start a Project
            </ButtonLink>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-foreground lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={prefersReducedMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mx-auto mt-2 w-[min(100%-1.25rem,72rem)] overflow-hidden rounded-[1.25rem] border border-white/10 bg-[rgba(8,8,12,0.94)] backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-1 p-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-xl px-4 py-3 text-base transition-colors",
                    active === link.href
                      ? "bg-accent-soft text-accent"
                      : "text-foreground hover:bg-white/[0.04]",
                  )}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <ButtonLink
                href="#contact"
                className="mt-2 w-full"
                onClick={() => setOpen(false)}
              >
                Start a Project
              </ButtonLink>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
