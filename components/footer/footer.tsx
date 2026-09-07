import Link from "next/link";
import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import { activeSocialLinks } from "@/data/social";
import { NAV_LINKS } from "@/lib/constants";
import { Container } from "@/components/ui/container";

const iconMap = {
  linkedin: Linkedin,
  github: Github,
  instagram: Instagram,
  email: Mail,
} as const;

export function Footer() {
  return (
    <footer className="border-t border-white/8 pb-10 pt-16">
      <Container>
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-xl font-medium tracking-tight text-foreground">
              ANIMESH HAZRA
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              Freelance Full-Stack Developer & Digital Solutions Specialist
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-subtle">
              Navigation
            </p>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-subtle">
              Connect
            </p>
            {activeSocialLinks.length > 0 ? (
              <ul className="mt-4 flex flex-wrap gap-3">
                {activeSocialLinks.map((link) => {
                  const Icon = iconMap[link.id as keyof typeof iconMap] ?? Mail;
                  return (
                    <li key={link.id}>
                      <a
                        href={link.href}
                        target={link.id === "email" ? undefined : "_blank"}
                        rel={link.id === "email" ? undefined : "noopener noreferrer"}
                        aria-label={link.label}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-muted transition-colors hover:border-accent/40 hover:text-accent"
                      >
                        <Icon size={16} />
                      </a>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-subtle">
                Social links can be enabled in{" "}
                <code className="text-muted">data/social.ts</code>
              </p>
            )}
            <p className="mt-4">
              <Link
                href="#contact"
                className="text-sm text-accent transition-colors hover:text-accent-strong"
              >
                Start a Project →
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/8 pt-6 text-sm text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Animesh Hazra. All rights reserved.</p>
          <p>Ideas In. Digital Solutions Out.</p>
        </div>
      </Container>
    </footer>
  );
}
