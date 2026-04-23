/**
 * Env-styret AdSense-konfiguration.
 *
 * - `NEXT_PUBLIC_ADSENSE_CLIENT` (fx "ca-pub-XXXX") styrer om AdSense-scriptet
 *   overhovedet indlæses. Scriptet indlæses UDEN samtykke-gate, så Googlebot
 *   kan verificere publisher-tagget (krav for AdSense-godkendelse).
 * - `NEXT_PUBLIC_ADSENSE_ACTIVE === "true"` styrer om faktiske annonce-slots
 *   renderes (kræver dermed også samtykke). Slå først til når Google har
 *   godkendt sitet.
 */
export function isAdsenseScriptEnabled(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim());
}

export function isAdsenseSlotsActive(): boolean {
  return (
    process.env.NEXT_PUBLIC_ADSENSE_ACTIVE === "true" && Boolean(process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim())
  );
}

/** @deprecated Brug `isAdsenseSlotsActive` for annonce-slots eller `isAdsenseScriptEnabled` for script-loader. */
export function isAdsenseEnabled(): boolean {
  return isAdsenseSlotsActive();
}

export function getAdsenseClientId(): string {
  return process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim() || "";
}
