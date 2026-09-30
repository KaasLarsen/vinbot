/** Slugify butiksnavn til URL-sikker partner-slug. */
export function slugifyPartnerName(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/æ/g, "ae")
    .replace(/ø/g, "oe")
    .replace(/å/g, "aa")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-")
    .slice(0, 60);
}

/** Host uden www/port fra en website-URL. */
export function hostFromWebsite(website: string): string | null {
  try {
    const withProtocol = /^https?:\/\//i.test(website) ? website : `https://${website}`;
    const u = new URL(withProtocol);
    return u.hostname.replace(/^www\./i, "").toLowerCase() || null;
  } catch {
    return null;
  }
}

export function normalizeWebsiteUrl(website: string): string | null {
  try {
    const withProtocol = /^https?:\/\//i.test(website.trim())
      ? website.trim()
      : `https://${website.trim()}`;
    const u = new URL(withProtocol);
    if (u.protocol !== "http:" && u.protocol !== "https:") return null;
    u.hash = "";
    return u.toString().replace(/\/$/, "");
  } catch {
    return null;
  }
}

/** Intern tracked CPC-URL. */
export function cpcGoHref(partnerSlug: string, targetUrl: string, placement?: string): string {
  const params = new URLSearchParams();
  params.set("url", targetUrl);
  if (placement?.trim()) params.set("placement", placement.trim());
  return `/go/${encodeURIComponent(partnerSlug)}?${params.toString()}`;
}

export function formatCpcOre(cpcOre: number): string {
  const kroner = cpcOre / 100;
  return new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: "DKK",
    minimumFractionDigits: cpcOre % 100 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(kroner);
}

export function formatDueDkk(clickCount: number, cpcOre: number): string {
  const kroner = (clickCount * cpcOre) / 100;
  return new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: "DKK",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(kroner);
}

export function startOfUtcMonth(d = new Date()): Date {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1, 0, 0, 0, 0));
}

export function startOfUtcDay(d = new Date()): Date {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 0, 0, 0, 0));
}

export function daysAgoUtc(days: number, d = new Date()): Date {
  const out = new Date(d);
  out.setUTCDate(out.getUTCDate() - days);
  return out;
}
