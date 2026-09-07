import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  projectType?: string;
  budget?: string;
  message?: string;
};

/**
 * Contact endpoint scaffold.
 * Connect to Formspree, Resend, or another provider via env vars.
 * Without CONTACT_WEBHOOK_URL / RESEND_API_KEY, submissions are validated
 * and acknowledged so the UI flow works during local/demo use.
 */
export async function POST(request: Request) {
  let body: ContactPayload;

  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request body." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const projectType = body.projectType?.trim() ?? "";
  const budget = body.budget?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || !email || !projectType || message.length < 12) {
    return NextResponse.json(
      { ok: false, message: "Please complete the required fields." },
      { status: 400 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, message: "Please provide a valid email address." },
      { status: 400 },
    );
  }

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  const formspreeId = process.env.FORMSPREE_FORM_ID;

  try {
    if (formspreeId) {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, projectType, budget, message }),
      });

      if (!response.ok) {
        return NextResponse.json(
          { ok: false, message: "Unable to deliver your message right now." },
          { status: 502 },
        );
      }
    } else if (webhookUrl) {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, projectType, budget, message }),
      });

      if (!response.ok) {
        return NextResponse.json(
          { ok: false, message: "Unable to deliver your message right now." },
          { status: 502 },
        );
      }
    }

    return NextResponse.json({
      ok: true,
      message:
        formspreeId || webhookUrl
          ? "Thanks — your message has been sent."
          : "Thanks — your message was validated. Connect FORMSPREE_FORM_ID or CONTACT_WEBHOOK_URL to deliver emails in production.",
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Unexpected error while sending your message." },
      { status: 500 },
    );
  }
}
