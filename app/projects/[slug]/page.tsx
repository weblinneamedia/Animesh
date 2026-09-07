import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { getProjectBySlug, projects } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { PageTransition } from "@/components/ui/page-transition";
import { Reveal } from "@/components/ui/reveal";
import { SITE_NAME } from "@/lib/constants";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} | ${SITE_NAME}`,
      description: project.description,
      images: [{ url: project.image, alt: project.title }],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const sections = [
    { number: "01", title: "The Problem", body: project.problem },
    { number: "02", title: "The Approach", body: project.approach },
    { number: "03", title: "The Solution", body: project.solution },
    { number: "06", title: "Outcome", body: project.result },
  ];

  return (
    <PageTransition>
    <article className="pb-24 pt-28">
      <Container>
        <Reveal>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft size={16} />
            Back to projects
          </Link>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <Badge className="border-accent/25 bg-accent-soft text-accent">{project.category}</Badge>
            {project.isPlaceholder ? (
              <Badge>Placeholder case study — replace with real project details</Badge>
            ) : null}
          </div>
          <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.2rem,6vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.04em] text-foreground">
            {project.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{project.description}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            {project.liveUrl ? (
              <ButtonLink href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                Live project
                <ArrowUpRight size={16} />
              </ButtonLink>
            ) : null}
            {project.githubUrl ? (
              <ButtonLink
                href={project.githubUrl}
                variant="secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={16} />
                GitHub
              </ButtonLink>
            ) : null}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative mt-12 aspect-[16/9] overflow-hidden rounded-[var(--radius-xl)] border border-white/8">
            <Image
              src={project.image}
              alt={`${project.title} visual`}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1152px"
              className="object-cover"
            />
          </div>
        </Reveal>

        <div className="mt-16 space-y-14">
          {sections.map((section, index) => (
            <Reveal key={section.number} delay={index * 0.04}>
              <section className="grid gap-4 border-t border-white/8 pt-10 md:grid-cols-[12rem_minmax(0,1fr)]">
                <div>
                  <p className="font-mono text-sm text-accent">{section.number}</p>
                  <h2 className="mt-2 font-display text-2xl font-medium tracking-tight text-foreground md:text-3xl">
                    {section.title}
                  </h2>
                </div>
                <p className="max-w-2xl text-base leading-relaxed text-muted md:text-lg">
                  {section.body}
                </p>
              </section>
            </Reveal>
          ))}

          <Reveal>
            <section className="grid gap-4 border-t border-white/8 pt-10 md:grid-cols-[12rem_minmax(0,1fr)]">
              <div>
                <p className="font-mono text-sm text-accent">04</p>
                <h2 className="mt-2 font-display text-2xl font-medium tracking-tight text-foreground md:text-3xl">
                  Technology
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} className="px-3.5 py-2 text-sm text-foreground">
                    {tech}
                  </Badge>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal>
            <section className="grid gap-4 border-t border-white/8 pt-10 md:grid-cols-[12rem_minmax(0,1fr)]">
              <div>
                <p className="font-mono text-sm text-accent">05</p>
                <h2 className="mt-2 font-display text-2xl font-medium tracking-tight text-foreground md:text-3xl">
                  Key Features
                </h2>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <li
                    key={feature}
                    className="rounded-[var(--radius-md)] border border-white/8 bg-card/50 px-4 py-3 text-sm text-muted"
                  >
                    {feature}
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        </div>

        <Reveal>
          <div className="mt-16 rounded-[var(--radius-xl)] border border-accent/20 bg-accent-soft/40 p-8 text-center md:p-10">
            <p className="font-display text-2xl tracking-tight text-foreground md:text-3xl">
              Want something like this built for your idea?
            </p>
            <ButtonLink href="/#contact" className="mt-6">
              Start a Project
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </article>
    </PageTransition>
  );
}
