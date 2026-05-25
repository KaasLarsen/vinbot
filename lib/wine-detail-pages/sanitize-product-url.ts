/** Fjerner query/hash og normaliserer til https — til Partner-Ads `htmlurl`. */
export function sanitizeProductUrlForHost(raw: string, expectedHostSuffix: string): string {
  const trimmed = raw.trim();
  const u = new URL(trimmed.includes("://") ? trimmed : `https://${expectedHostSuffix}/${trimmed.replace(/^\//, "")}`);
  if (!u.hostname.endsWith(expectedHostSuffix)) {
    throw new Error(`sanitizeProductUrl: forventede host *${expectedHostSuffix}, fik ${u.hostname}`);
  }
  u.protocol = "https:";
  u.search = "";
  u.hash = "";
  const path = u.pathname.replace(/\/+$/, "") || "/";
  return `https://${u.hostname}${path}`;
}
