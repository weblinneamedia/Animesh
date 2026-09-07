"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { showTestimonialsSection, testimonials } from "@/data/testimonials";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Testimonials() {
  const [index, setIndex] = useState(0);

  if (!showTestimonialsSection) return null;

  const current = testimonials[index];

  return (
    <section
      id="testimonials"
      className="section-pad relative"
      aria-labelledby="testimonials-heading"
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Testimonials"
            title="Client Words"
            description="Verified feedback from people I've worked with."
          />
        </Reveal>

        <Reveal delay={0.08}>
          <figure className="relative mt-12 overflow-hidden rounded-[var(--radius-xl)] border border-white/8 bg-card/60 p-8 md:p-12">
            <Quote className="mb-6 text-accent/50" size={28} aria-hidden />
            <blockquote className="max-w-3xl font-display text-2xl leading-snug tracking-tight text-foreground md:text-3xl">
              “{current.quote}”
            </blockquote>
            <figcaption className="mt-8">
              <p className="font-medium text-foreground">{current.name}</p>
              <p className="text-sm text-muted">
                {current.role}
                {current.company ? ` · ${current.company}` : ""}
              </p>
            </figcaption>

            {testimonials.length > 1 ? (
              <div className="mt-8 flex gap-2">
                <button
                  type="button"
                  aria-label="Previous testimonial"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-muted hover:text-foreground"
                  onClick={() =>
                    setIndex((value) => (value - 1 + testimonials.length) % testimonials.length)
                  }
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  aria-label="Next testimonial"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-muted hover:text-foreground"
                  onClick={() => setIndex((value) => (value + 1) % testimonials.length)}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            ) : null}
          </figure>
        </Reveal>
      </Container>
    </section>
  );
}
