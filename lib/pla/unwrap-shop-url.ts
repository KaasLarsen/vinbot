/** Træk butiks-URL ud af Partner-Ads klikbanner, ellers returnér URL'en uændret. */
export function unwrapAffiliateShopUrl(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  try {
    const u = new URL(trimmed.includes("://") ? trimmed : `https://${trimmed}`);
    if (u.hostname.includes("partner-ads.com")) {
      const htmlurl = u.searchParams.get("htmlurl")?.trim();
      if (!htmlurl) return null;
      return htmlurl;
    }
    return u.toString();
  } catch {
    return null;
  }
}
