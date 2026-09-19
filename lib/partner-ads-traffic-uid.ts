/** Partner-Ads uid for trafik der landede via Google Ads / PLA. Må ikke indeholde `/`. */
export const PARTNER_ADS_UID_GOOGLE = "vinbot-google";

/** Samme default som `PARTNER_ADS_UID` i partner-ads-links (undgår node-test path-alias). */
const DEFAULT_PARTNER_ADS_UID = "vinbot";

/** sessionStorage-nøgle — husker Google Ads-attribution i browser-sessionen. */
export const PARTNER_ADS_TRAFFIC_UID_KEY = "vinbot_pa_uid";

/** Query på PLA-produktsider i Google-feedet, så vi kan genkende Ads uden gclid. */
export const GOOGLE_PLA_LANDING_QUERY = {
  utm_source: "google",
  utm_medium: "cpc",
  utm_campaign: "vinbot-pla",
} as const;

export function appendGooglePlaLandingQuery(url: string): string {
  try {
    const u = new URL(url);
    u.searchParams.set("utm_source", GOOGLE_PLA_LANDING_QUERY.utm_source);
    u.searchParams.set("utm_medium", GOOGLE_PLA_LANDING_QUERY.utm_medium);
    u.searchParams.set("utm_campaign", GOOGLE_PLA_LANDING_QUERY.utm_campaign);
    return u.toString();
  } catch {
    return url;
  }
}

/**
 * True når landing-URL'en tyder på Google Ads / Shopping (auto-tag eller vores PLA-UTM).
 */
export function isGoogleAdsLandingSearch(search: string): boolean {
  const raw = search.startsWith("?") ? search.slice(1) : search;
  if (!raw.trim()) return false;
  let params: URLSearchParams;
  try {
    params = new URLSearchParams(raw);
  } catch {
    return false;
  }

  if (params.get("gclid")?.trim()) return true;
  if (params.get("gbraid")?.trim() || params.get("wbraid")?.trim()) return true;

  const source = (params.get("utm_source") || "").trim().toLowerCase();
  const medium = (params.get("utm_medium") || "").trim().toLowerCase();
  const campaign = (params.get("utm_campaign") || "").trim().toLowerCase();

  if (campaign === GOOGLE_PLA_LANDING_QUERY.utm_campaign) return true;
  if (source === "google" && (medium === "cpc" || medium === "ppc" || medium === "paid")) {
    return true;
  }
  return false;
}

export function capturePartnerAdsTrafficUidFromSearch(search: string): void {
  if (typeof window === "undefined") return;
  if (!isGoogleAdsLandingSearch(search)) return;
  try {
    window.sessionStorage.setItem(PARTNER_ADS_TRAFFIC_UID_KEY, PARTNER_ADS_UID_GOOGLE);
  } catch {
    // private mode / blocked storage
  }
}

export function getPartnerAdsTrafficUid(): string {
  if (typeof window === "undefined") return DEFAULT_PARTNER_ADS_UID;
  try {
    const stored = window.sessionStorage.getItem(PARTNER_ADS_TRAFFIC_UID_KEY)?.trim();
    if (stored === PARTNER_ADS_UID_GOOGLE) return PARTNER_ADS_UID_GOOGLE;
  } catch {
    // ignore
  }
  return DEFAULT_PARTNER_ADS_UID;
}

/**
 * Sæt sessionens Partner-Ads `uid` på klikbanner-URL'er.
 * Andre netværk / almindelige shop-URL'er røres ikke.
 */
export function withPartnerAdsTrafficUid(href: string): string {
  const trimmed = href.trim();
  if (!trimmed.includes("partner-ads.com/dk/klikbanner.php")) return trimmed;
  try {
    const u = new URL(trimmed);
    u.searchParams.set("uid", getPartnerAdsTrafficUid());
    return u.toString();
  } catch {
    return trimmed;
  }
}
