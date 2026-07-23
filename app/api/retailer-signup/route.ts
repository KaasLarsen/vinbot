import { NextResponse } from "next/server";
import { Resend } from "resend";

import { parseRetailerSignupBody } from "@/lib/retailer-signup";
import { contactEmail, siteName } from "@/lib/site";

export async function POST(req: Request) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: "Ugyldigt JSON." }, { status: 400 });
  }

  const parsed = parseRetailerSignupBody(raw);
  if (parsed.error || !parsed.data) {
    return NextResponse.json(
      { error: parsed.error?.message || "Ugyldig ansøgning." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.error("RESEND_API_KEY mangler");
    return NextResponse.json(
      { error: "Mail-afsendelse er ikke konfigureret. Prøv igen senere." },
      { status: 503 },
    );
  }

  const { storeName, feedUrl, email, hasAffiliate, affiliateNetwork, wantsCpc } = parsed.data;
  const from =
    process.env.RESEND_FROM?.trim() || `${siteName} <onboarding@resend.dev>`;

  const affiliateLine = hasAffiliate
    ? `Affiliate-netværk: ${affiliateNetwork}`
    : "Affiliate-netværk: Nej";
  const cpcLine = wantsCpc ? "CPC-aftale ønskes: Ja" : "CPC-aftale ønskes: Nej";

  const text = [
    `Ny forhandler-ansøgning fra ${siteName}`,
    "",
    `Butiksnavn: ${storeName}`,
    `E-mail: ${email}`,
    `Produkt feed URL: ${feedUrl}`,
    affiliateLine,
    cpcLine,
  ].join("\n");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: contactEmail,
      replyTo: email,
      subject: `Ny forhandler-ansøgning: ${storeName}`,
      text,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Kunne ikke sende ansøgningen. Prøv igen senere." },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("Resend send failed:", err);
    return NextResponse.json(
      { error: "Kunne ikke sende ansøgningen. Prøv igen senere." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
