import { NextResponse } from "next/server";
import { Resend } from "resend";

import {
  hostFromWebsite,
  normalizeWebsiteUrl,
  slugifyPartnerName,
} from "@/lib/cpc/helpers";
import { contactEmail, siteName } from "@/lib/site";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  createSupabaseServiceClient,
  hasSupabaseServiceRole,
} from "@/lib/supabase/service";

type SignupBody = {
  name?: string;
  website?: string;
  email?: string;
  password?: string;
  message?: string;
};

export async function POST(req: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Partner-portalen er ikke konfigureret endnu." },
      { status: 503 },
    );
  }

  let body: SignupBody;
  try {
    body = (await req.json()) as SignupBody;
  } catch {
    return NextResponse.json({ error: "Ugyldigt JSON." }, { status: 400 });
  }

  const name = body.name?.trim() || "";
  const email = body.email?.trim().toLowerCase() || "";
  const password = body.password || "";
  const message = body.message?.trim() || "";
  const website = normalizeWebsiteUrl(body.website || "");

  if (!name || name.length < 2) {
    return NextResponse.json({ error: "Butiksnavn er påkrævet." }, { status: 400 });
  }
  if (!website) {
    return NextResponse.json({ error: "Gyldig website-URL er påkrævet." }, { status: 400 });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Gyldig e-mail er påkrævet." }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json(
      { error: "Adgangskode skal være mindst 8 tegn." },
      { status: 400 },
    );
  }

  const allowedHost = hostFromWebsite(website);
  if (!allowedHost) {
    return NextResponse.json({ error: "Kunne ikke læse domæne fra website." }, { status: 400 });
  }

  const baseSlug = slugifyPartnerName(name) || "partner";
  const supabase = await createSupabaseServerClient();

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.vinbot.dk"}/partnere/auth/callback`,
    },
  });

  if (authError || !authData.user) {
    const msg = authError?.message || "Kunne ikke oprette bruger.";
    const friendly = /already|registered|exists/i.test(msg)
      ? "Der findes allerede en konto med den e-mail. Log ind i stedet."
      : msg;
    return NextResponse.json({ error: friendly }, { status: 400 });
  }

  // Service role til insert (virker også før e-mail er bekræftet); ellers user-session + RLS.
  const writer = hasSupabaseServiceRole()
    ? createSupabaseServiceClient()
    : supabase;

  let slug = baseSlug;
  for (let i = 0; i < 8; i++) {
    const candidate = i === 0 ? baseSlug : `${baseSlug}-${i + 1}`;
    const { data: existing } = await writer
      .from("partners")
      .select("id")
      .eq("slug", candidate)
      .maybeSingle();
    if (!existing) {
      slug = candidate;
      break;
    }
  }

  const { error: insertError } = await writer.from("partners").insert({
    name,
    slug,
    website,
    contact_email: email,
    allowed_host: allowedHost,
    status: "pending",
    cpc_ore: null,
    auth_user_id: authData.user.id,
    notes: message || null,
  });

  if (insertError) {
    console.error("partner insert failed:", insertError);
    return NextResponse.json(
      {
        error:
          insertError.code === "23505"
            ? "E-mail eller butik er allerede tilmeldt."
            : "Kunne ikke oprette partnerprofil. Prøv igen.",
      },
      { status: 400 },
    );
  }

  // Notify Vinbot (best-effort)
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (apiKey) {
    try {
      const resend = new Resend(apiKey);
      const from =
        process.env.RESEND_FROM?.trim() || `${siteName} <onboarding@resend.dev>`;
      await resend.emails.send({
        from,
        to: contactEmail,
        replyTo: email,
        subject: `Ny CPC-partner: ${name}`,
        text: [
          `Ny direkte CPC-ansøgning`,
          "",
          `Butik: ${name}`,
          `Slug: ${slug}`,
          `Website: ${website}`,
          `Host: ${allowedHost}`,
          `E-mail: ${email}`,
          message ? `Besked: ${message}` : "",
          "",
          "Aktivér i Supabase: partners → status=active + sæt cpc_ore (øre).",
        ]
          .filter(Boolean)
          .join("\n"),
      });
    } catch (err) {
      console.error("Resend CPC signup notify failed:", err);
    }
  }

  return NextResponse.json({ ok: true, slug });
}
