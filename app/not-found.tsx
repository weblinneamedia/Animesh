import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center py-28">
      <Container className="text-center">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">404</p>
        <h1 className="mt-4 font-display text-[clamp(2.4rem,8vw,4.8rem)] font-medium tracking-[-0.04em] text-foreground">
          Lost in the Digital Space?
        </h1>
        <p className="mx-auto mt-4 max-w-md text-muted">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
        </p>
        <ButtonLink href="/" className="mt-8">
          Back Home
        </ButtonLink>
      </Container>
    </section>
  );
}
