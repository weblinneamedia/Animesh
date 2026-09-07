"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import type { MouseEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { projectFilters, projects, type ProjectCategory } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

function ProjectCard({
  project,
  index,
  featured,
}: {
  project: (typeof projects)[number];
  index: number;
  featured?: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 120, damping: 18 });
  const springY = useSpring(y, { stiffness: 120, damping: 18 });

  const onMove = (event: MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    x.set(px * -18);
    y.set(py * -14);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.article
      layout={!prefersReducedMotion}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 36, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={prefersReducedMotion ? undefined : { opacity: 0, y: 16, scale: 0.98 }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      data-cursor="project"
      className={cn(
        "group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-card",
        featured && "lg:col-span-2",
      )}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <Link href={`/projects/${project.slug}`} className="block">
        <div
          className={cn(
            "relative overflow-hidden",
            featured ? "aspect-[16/10] md:aspect-[21/9]" : "aspect-[16/11]",
          )}
        >
          <motion.div
            className="absolute -inset-6"
            style={
              prefersReducedMotion
                ? { scale: 1.05 }
                : { x: springX, y: springY, scale: 1.08 }
            }
          >
            <Image
              src={project.image}
              alt={`${project.title} interface mockup`}
              fill
              sizes={featured ? "100vw" : "(max-width: 1024px) 100vw, 50vw"}
              className="object-cover"
              priority={index === 0}
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10 transition-opacity duration-500 group-hover:via-black/60" />
          <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(225,29,46,0.22),transparent_40%)]" />
          </div>

          {/* Floating mock frame accent */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute right-5 top-5 hidden rounded-2xl border border-white/15 bg-black/30 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-white/70 backdrop-blur-md md:block"
            initial={false}
            animate={prefersReducedMotion ? undefined : { y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            Live mockup
          </motion.div>

          <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
            <motion.div
              className="mb-3 flex flex-wrap items-center gap-2"
              initial={false}
            >
              <Badge className="border-accent/40 bg-accent text-white">{project.category}</Badge>
              {project.isPlaceholder ? (
                <Badge className="border-white/20 bg-black/45 text-cream backdrop-blur">
                  Placeholder
                </Badge>
              ) : null}
            </motion.div>

            <div className="flex items-end justify-between gap-4">
              <div className="min-w-0">
                <h3
                  className={cn(
                    "font-display font-medium tracking-tight text-cream transition-transform duration-500 group-hover:translate-x-1",
                    featured ? "text-3xl md:text-5xl" : "text-2xl md:text-3xl",
                  )}
                >
                  {project.title}
                </h3>
                <p className="mt-2 max-w-2xl text-sm text-white/70 transition-colors duration-300 group-hover:text-white/85 md:text-base">
                  {project.description}
                </p>

                <div className="mt-4 flex max-h-0 flex-wrap gap-2 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-20 group-hover:opacity-100">
                  {project.technologies.slice(0, featured ? 5 : 3).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/15 bg-black/35 px-3 py-1 text-xs text-cream backdrop-blur-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <motion.span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-white shadow-[0_0_30px_rgba(225,29,46,0.45)] md:h-14 md:w-14"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.08 }}
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { rotate: 0 }
                }
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                style={{ rotate: 0 }}
              >
                <ArrowUpRight
                  size={featured ? 22 : 20}
                  className="transition-transform duration-300 group-hover:rotate-45"
                />
              </motion.span>
            </div>
          </div>

          {/* Shine sweep */}
          <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        </div>
      </Link>
    </motion.article>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<(typeof projectFilters)[number]>("All");
  const prefersReducedMotion = useReducedMotion();

  const filtered = useMemo(() => {
    if (filter === "All") return projects;
    return projects.filter((project) => project.category === (filter as ProjectCategory));
  }, [filter]);

  return (
    <section id="projects" className="section-pad relative" aria-labelledby="projects-heading">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      <Container>
        <Reveal>
          <SectionHeading
            id="projects-heading"
            eyebrow="Selected Work"
            title="Work that turns ideas into products."
            description="Interactive mockups for each case study. Swap the placeholder visuals in public/images/projects with real screenshots anytime."
          />
        </Reveal>

        <Reveal delay={0.08}>
          <div
            className="mt-10 flex gap-2 overflow-x-auto pb-2"
            role="tablist"
            aria-label="Filter projects"
          >
            {projectFilters.map((item) => (
              <motion.button
                key={item}
                type="button"
                role="tab"
                aria-selected={filter === item}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-all",
                  filter === item
                    ? "border-accent bg-accent text-white shadow-[0_0_24px_rgba(225,29,46,0.35)]"
                    : "border-white/10 text-muted hover:border-white/25 hover:text-foreground",
                )}
                onClick={() => setFilter(item)}
              >
                {item}
              </motion.button>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={index}
                featured={index === 0}
              />
            ))}
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
