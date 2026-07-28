import { NextResponse } from "next/server";

import { parseNewsletterSignupBody } from "@/lib/newsletter-signup";
import {
  sendNewsletterWelcomeEmail,
  subscribeNewsletterContact,
} from "@/lib/resend-newsletter";

export async function POST(req: Request) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: "Ugyldigt JSON." }, { status: 400 });
  }

  const parsed = parseNewsletterSignupBody(raw);
  if (parsed.error || !parsed.data) {
    return NextResponse.json(
      { error: parsed.error?.message || "Ugyldig tilmelding." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.error("RESEND_API_KEY mangler");
    return NextResponse.json(
      { error: "Tilmelding er ikke konfigureret. Prøv igen senere." },
      { status: 503 },
    );
  }

  const result = await subscribeNewsletterContact(apiKey, parsed.data.email);
  if (!result.ok) {
    return NextResponse.json(
      { error: "Kunne ikke tilmelde dig. Prøv igen senere." },
      { status: 502 },
    );
  }

  if (result.isNew) {
    // Fire-and-forget: don't block success on welcome mail
    void sendNewsletterWelcomeEmail(apiKey, parsed.data.email);
  }

  return NextResponse.json({ ok: true });
}
