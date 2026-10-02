const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SLUG_RE = /^[a-z0-9-]{1,180}$/;

export type PriceAlertSignupPayload = {
  email: string;
  slug: string;
  consent: true;
};

export type PriceAlertSignupError = {
  field?: "email" | "consent" | "slug" | "form";
  message: string;
};

export function parsePriceAlertSignupBody(raw: unknown): {
  data?: PriceAlertSignupPayload;
  error?: PriceAlertSignupError;
} {
  if (!raw || typeof raw !== "object") {
    return { error: { field: "form", message: "Ugyldigt request." } };
  }

  const body = raw as Record<string, unknown>;
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const slug = typeof body.slug === "string" ? body.slug.trim().toLowerCase() : "";
  const consent = body.consent === true;

  if (!email) {
    return { error: { field: "email", message: "E-mail er påkrævet." } };
  }
  if (!EMAIL_RE.test(email) || email.length > 320) {
    return { error: { field: "email", message: "Angiv en gyldig e-mailadresse." } };
  }
  if (!consent) {
    return {
      error: {
        field: "consent",
        message: "Du skal give samtykke for at få besked om prisfald.",
      },
    };
  }
  if (!SLUG_RE.test(slug)) {
    return { error: { field: "slug", message: "Vinen kunne ikke findes." } };
  }

  return { data: { email, slug, consent: true } };
}
