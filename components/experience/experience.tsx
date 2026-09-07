import { experienceItems, showExperienceSection } from "@/data/experience";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Experience() {
  if (!showExperienceSection) return null;

  return (
    <section id="experience" className="section-pad relative" aria-labelledby="experience-heading">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Journey"
            title="Experience & Journey"
            description="A flexible timeline structure. Replace placeholder entries with verified professional history."
          />
        </Reveal>

        <ol className="relative mt-12 space-y-6 border-l border-white/10 pl-6 md:pl-8">
          {experienceItems.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.05}>
              <li className="relative">
                <span className="absolute -left-[1.91rem] top-2 h-3 w-3 rounded-full border border-accent/50 bg-background md:-left-[2.41rem]" />
                <div className="rounded-[var(--radius-lg)] border border-white/8 bg-card/50 p-5 md:p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="capitalize">{item.type}</Badge>
                    {item.isPlaceholder ? <Badge>Placeholder</Badge> : null}
                    <span className="text-xs text-subtle">
                      {item.startDate}
                      {item.endDate ? ` — ${item.endDate}` : ""}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-xl font-medium text-foreground">
                    {item.title}
                  </h3>
                  {item.organization ? (
                    <p className="mt-1 text-sm text-muted">{item.organization}</p>
                  ) : null}
                  <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
                  {item.highlights?.length ? (
                    <ul className="mt-4 space-y-1.5 text-sm text-subtle">
                      {item.highlights.map((highlight) => (
                        <li key={highlight} className="flex gap-2">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/70" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
