"use client";

import { FormEvent, ReactNode, useState } from "react";
import { CheckCircle2, LoaderCircle, Send } from "lucide-react";
import { BUDGET_RANGES, PROJECT_TYPES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { OchiEyes } from "@/components/ui/ochi-eyes";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

type FormState = {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
  website: string; // honeypot
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  name: "",
  email: "",
  projectType: "",
  budget: "",
  message: "",
  website: "",
};

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.projectType) errors.projectType = "Select a project type.";
  if (!values.message.trim() || values.message.trim().length < 12) {
    errors.message = "Tell me a bit more about your idea (at least a sentence).";
  }
  return errors;
}

export function Contact() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    // Honeypot — silently succeed for bots
    if (values.website) {
      setStatus("success");
      setStatusMessage("Thanks — your message has been received.");
      return;
    }

    setStatus("loading");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          projectType: values.projectType,
          budget: values.budget,
          message: values.message,
        }),
      });

      const data = (await response.json()) as { ok?: boolean; message?: string };

      if (!response.ok || !data.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      setStatus("success");
      setStatusMessage(data.message || "Thanks — your message has been received.");
      setValues(initialState);
    } catch (error) {
      setStatus("error");
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "Unable to send right now. Please try again shortly.",
      );
    }
  };

  return (
    <section id="contact" className="section-pad relative" aria-labelledby="contact-heading">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(94,234,212,0.12),transparent_55%)]" />
      <div className="aurora-blob bottom-[-20%] left-[20%] h-72 w-72 bg-accent/20" />
      <div
        className="aurora-blob bottom-[-10%] right-[10%] h-64 w-64 bg-[var(--accent-2)]/15"
        style={{ animationDelay: "-5s" }}
      />
      <Container className="relative">
        <Reveal>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              id="contact-heading"
              eyebrow="Contact"
              title="Have an Idea? Let's Build It."
              description="Tell me what you're trying to build, improve or automate."
            />
            <div className="shrink-0 self-start lg:self-end">
              <OchiEyes size="md" tone="dark" />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={onSubmit}
            className="card-glow-border mt-12 grid gap-5 rounded-[var(--radius-xl)] bg-card/70 p-6 md:grid-cols-2 md:p-8"
            noValidate
          >
            <Field
              label="Name"
              id="name"
              error={errors.name}
            >
              <input
                id="name"
                name="name"
                autoComplete="name"
                value={values.name}
                onChange={(event) => setValues((v) => ({ ...v, name: event.target.value }))}
                className={inputClass(errors.name)}
                placeholder="Your name"
              />
            </Field>

            <Field label="Email" id="email" error={errors.email}>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={(event) => setValues((v) => ({ ...v, email: event.target.value }))}
                className={inputClass(errors.email)}
                placeholder="you@company.com"
              />
            </Field>

            <Field label="Project Type" id="projectType" error={errors.projectType}>
              <select
                id="projectType"
                name="projectType"
                value={values.projectType}
                onChange={(event) =>
                  setValues((v) => ({ ...v, projectType: event.target.value }))
                }
                className={inputClass(errors.projectType)}
              >
                <option value="">Select a type</option>
                {PROJECT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Budget" id="budget" error={errors.budget}>
              <select
                id="budget"
                name="budget"
                value={values.budget}
                onChange={(event) => setValues((v) => ({ ...v, budget: event.target.value }))}
                className={inputClass(errors.budget)}
              >
                <option value="">Optional</option>
                {BUDGET_RANGES.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
            </Field>

            <Field
              label="Message"
              id="message"
              error={errors.message}
              className="md:col-span-2"
            >
              <textarea
                id="message"
                name="message"
                rows={5}
                value={values.message}
                onChange={(event) => setValues((v) => ({ ...v, message: event.target.value }))}
                className={cn(inputClass(errors.message), "resize-y")}
                placeholder="What are you trying to build, improve, or automate?"
              />
            </Field>

            {/* Honeypot field for basic spam protection */}
            <div className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden>
              <label htmlFor="website">Website</label>
              <input
                id="website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={values.website}
                onChange={(event) => setValues((v) => ({ ...v, website: event.target.value }))}
              />
            </div>

            <div className="flex flex-col gap-3 md:col-span-2 md:flex-row md:items-center md:justify-between">
              <p className="text-sm text-subtle">
                Form is ready for Formspree, Resend, or a Vercel/server action integration.
              </p>
              <Button type="submit" size="lg" disabled={status === "loading"}>
                {status === "loading" ? (
                  <>
                    <LoaderCircle className="animate-spin" size={16} />
                    Sending…
                  </>
                ) : status === "success" ? (
                  <>
                    <CheckCircle2 size={16} />
                    Sent
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={16} />
                  </>
                )}
              </Button>
            </div>

            {statusMessage ? (
              <p
                role="status"
                className={cn(
                  "md:col-span-2 text-sm",
                  status === "success" ? "text-success" : "text-danger",
                )}
              >
                {statusMessage}
              </p>
            ) : null}
          </form>
        </Reveal>
      </Container>
    </section>
  );
}

function Field({
  label,
  id,
  error,
  children,
  className,
}: {
  label: string;
  id: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-foreground">
        {label}
      </label>
      {children}
      {error ? (
        <p className="mt-1.5 text-sm text-danger" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function inputClass(error?: string) {
  return cn(
    "w-full rounded-[var(--radius-md)] border bg-background/60 px-3.5 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-subtle",
    "focus:border-accent/50 focus:ring-2 focus:ring-accent/20",
    error ? "border-danger/60" : "border-white/10",
  );
}
