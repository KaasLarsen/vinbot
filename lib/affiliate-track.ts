/**
 * Lille klient-side helper der fyrer et GA4 `affiliate_click` event,
 * så vi kan måle hvilke merchant/slug/placering der faktisk konverterer.
 *
 * GA4 opsættes i components/google-analytics.tsx — `window.gtag` er derfor
 * tilstede efter consent. Hvis consent mangler er `gtag` undefined og vi no-op'er.
 */

type AffiliateEventParams = {
  merchant: string;
  /** Placering: fx "guide-picks", "home-search", "home-dsf-featured", "partner-leaderboard", "campaign-banner". */
  placement: string;
  slug?: string;
  hub?: string;
  url?: string;
};

export function trackAffiliateClick(params: AffiliateEventParams): void {
  if (typeof window === "undefined") return;
  const gtag = window.gtag;
  if (typeof gtag !== "function") return;
  try {
    gtag("event", "affiliate_click", {
      merchant: params.merchant,
      placement: params.placement,
      slug: params.slug || "",
      hub: params.hub || "",
      url: params.url || "",
    });
  } catch {
    // no-op
  }
}
