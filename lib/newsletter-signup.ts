export type NewsletterSignupPayload = {
  email: string;
  consent: true;
};

export type NewsletterSignupValidationError = {
  field?: "email" | "consent" | "form";
  message: string;
};

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function parseNewsletterSignupBody(raw: unknown): {
  data?: NewsletterSignupPayload;
  error?: NewsletterSignupValidationError;
} {
  if (!raw || typeof raw !== "object") {
    return { error: { field: "form", message: "Ugyldigt request." } };
  }

  const body = raw as Record<string, unknown>;
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const consent = body.consent === true;

  if (!email) {
    return { error: { field: "email", message: "E-mail er påkrævet." } };
  }
  if (!isEmail(email)) {
    return { error: { field: "email", message: "Angiv en gyldig e-mailadresse." } };
  }
  if (!consent) {
    return {
      error: {
        field: "consent",
        message: "Du skal give samtykke for at tilmelde dig nyhedsbrevet.",
      },
    };
  }

  return { data: { email, consent: true } };
}
