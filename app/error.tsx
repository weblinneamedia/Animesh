"use client";

import { useEffect } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[70svh] items-center py-28">
      <Container className="text-center">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">Error</p>
        <h1 className="mt-4 font-display text-[clamp(2rem,6vw,3.5rem)] font-medium tracking-tight text-foreground">
          Something went off-track.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-muted">
          An unexpected error occurred. You can try again or return home.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-11 items-center justify-center rounded-full bg-accent px-5 text-sm font-medium text-[#042f2e] transition-colors hover:bg-accent-strong"
          >
            Try again
          </button>
          <ButtonLink href="/" variant="secondary">
            Back Home
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
