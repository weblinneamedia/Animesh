"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  Building2,
  Compass,
  Database,
  Globe2,
  Layers3,
  Palette,
  Smartphone,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { services } from "@/data/services";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

const iconMap = {
  globe: Globe2,
  layers: Layers3,
  smartphone: Smartphone,
  building: Building2,
  sparkles: Sparkles,
  database: Database,
  palette: Palette,
  compass: Compass,
} as const;

export function Services() {
  const [active, setActive] = useState(services[0]?.id ?? "");
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="services" className="section-pad relative" aria-labelledby="services-heading">
      <Container>
        <Reveal>
          <SectionHeading
            id="services-heading"
            eyebrow="Services"
            title="What I Can Build"
            description="From polished websites to intelligent systems — custom digital solutions shaped around real business needs."
          />
        </Reveal>

        <div className="mt-14 space-y-3">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon];
            const isActive = active === service.id;

            return (
              <Reveal key={service.id} delay={index * 0.03}>
                <motion.button
                  type="button"
                  onMouseEnter={() => setActive(service.id)}
                  onFocus={() => setActive(service.id)}
                  onClick={() => setActive(service.id)}
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.01 }}
                  className={cn(
                    "group w-full overflow-hidden rounded-[1.5rem] border text-left transition-colors duration-300",
                    isActive
                      ? "border-accent/40 bg-accent text-white shadow-[0_20px_60px_rgba(225,29,46,0.25)]"
                      : "border-white/10 bg-card/50 text-foreground hover:border-white/20",
                  )}
                >
                  <div className="flex items-center gap-4 px-5 py-5 md:gap-6 md:px-8 md:py-6">
                    <span
                      className={cn(
                        "font-mono text-sm",
                        isActive ? "text-white/55" : "text-subtle",
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <motion.span
                      animate={
                        prefersReducedMotion
                          ? undefined
                          : isActive
                            ? { rotate: 8, scale: 1.08 }
                            : { rotate: 0, scale: 1 }
                      }
                      className={cn(
                        "flex h-11 w-11 items-center justify-center rounded-full border transition-colors",
                        isActive
                          ? "border-white/25 bg-white/15 text-white"
                          : "border-white/10 bg-white/[0.03] text-accent",
                      )}
                    >
                      <Icon size={18} />
                    </motion.span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-xl font-medium tracking-tight md:text-2xl lg:text-3xl">
                        {service.title}
                      </h3>
                      <motion.div
                        initial={false}
                        animate={{
                          height: isActive ? "auto" : 0,
                          opacity: isActive ? 1 : 0,
                          marginTop: isActive ? 12 : 0,
                        }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p
                          className={cn(
                            "max-w-2xl text-sm leading-relaxed md:text-base",
                            isActive ? "text-white/75" : "text-muted",
                          )}
                        >
                          {service.summary}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {service.offerings.slice(0, 4).map((item) => (
                            <span
                              key={item}
                              className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/85"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                    <motion.span
                      animate={
                        prefersReducedMotion
                          ? undefined
                          : isActive
                            ? { rotate: 45, x: 2, y: -2 }
                            : { rotate: 0, x: 0, y: 0 }
                      }
                      className={cn(
                        "shrink-0",
                        isActive ? "text-white" : "text-subtle group-hover:text-accent",
                      )}
                    >
                      <ArrowUpRight size={22} />
                    </motion.span>
                  </div>
                </motion.button>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
