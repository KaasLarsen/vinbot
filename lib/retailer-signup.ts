export type RetailerSignupPayload = {
  storeName: string;
  feedUrl: string;
  email: string;
  hasAffiliate: boolean;
  affiliateNetwork?: string;
  wantsCpc: boolean;
};

export type RetailerSignupValidationError = {
  field?: keyof RetailerSignupPayload | "form";
  message: string;
};

function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function isEmail(value: string): boolean {
  // Simpel, pragmatisk check — ikke RFC-komplet.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function parseRetailerSignupBody(raw: unknown): {
  data?: RetailerSignupPayload;
  error?: RetailerSignupValidationError;
} {
  if (!raw || typeof raw !== "object") {
    return { error: { field: "form", message: "Ugyldigt request." } };
  }

  const body = raw as Record<string, unknown>;
  const storeName = typeof body.storeName === "string" ? body.storeName.trim() : "";
  const feedUrl = typeof body.feedUrl === "string" ? body.feedUrl.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const hasAffiliate = body.hasAffiliate === true;
  const wantsCpc = body.wantsCpc === true;
  const affiliateNetwork =
    typeof body.affiliateNetwork === "string" ? body.affiliateNetwork.trim() : "";

  if (!storeName) {
    return { error: { field: "storeName", message: "Butiksnavn er påkrævet." } };
  }
  if (!feedUrl) {
    return { error: { field: "feedUrl", message: "Produkt feed URL er påkrævet." } };
  }
  if (!isHttpUrl(feedUrl)) {
    return {
      error: { field: "feedUrl", message: "Angiv en gyldig URL (http eller https)." },
    };
  }
  if (!email) {
    return { error: { field: "email", message: "E-mail er påkrævet." } };
  }
  if (!isEmail(email)) {
    return { error: { field: "email", message: "Angiv en gyldig e-mailadresse." } };
  }
  if (hasAffiliate && !affiliateNetwork) {
    return {
      error: {
        field: "affiliateNetwork",
        message: "Angiv hvilket affiliate-netværk I samarbejder via.",
      },
    };
  }

  return {
    data: {
      storeName,
      feedUrl,
      email,
      hasAffiliate,
      wantsCpc: hasAffiliate ? false : wantsCpc,
      ...(hasAffiliate ? { affiliateNetwork } : {}),
    },
  };
}
