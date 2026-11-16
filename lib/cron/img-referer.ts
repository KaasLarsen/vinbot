/**
 * Tillad /api/img upstream-fetch kun fra eget site (eller egen cron-UA).
 * Direkte bot-scraping af `/api/img?src=` uden referer brænder ellers Fluid GB-hours.
 */
export function isAllowedImgReferer(refererOrOrigin: string | null | undefined, siteHost: string): boolean {
  const raw = (refererOrOrigin || "").trim();
  if (!raw) return false;
  try {
    const url = new URL(raw);
    const host = url.hostname.toLowerCase().replace(/\.$/, "");
    const allowed = siteHost.toLowerCase().replace(/\.$/, "");
    if (host === allowed) return true;
    if (allowed.startsWith("www.") && host === allowed.slice(4)) return true;
    if (!allowed.startsWith("www.") && host === `www.${allowed}`) return true;
    return false;
  } catch {
    return false;
  }
}

export function isVinbotCronUserAgent(ua: string | null | undefined): boolean {
  const s = (ua || "").trim();
  return s.startsWith("VinbotCronWarm/");
}

export function allowImgUpstreamFetch(opts: {
  referer: string | null | undefined;
  origin: string | null | undefined;
  userAgent: string | null | undefined;
  siteHost: string;
}): boolean {
  if (isVinbotCronUserAgent(opts.userAgent)) return true;
  if (isAllowedImgReferer(opts.referer, opts.siteHost)) return true;
  if (isAllowedImgReferer(opts.origin, opts.siteHost)) return true;
  return false;
}
