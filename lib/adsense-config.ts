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

/** Publisher-ID til ads.txt (`pub-…`), udledt fra `ca-pub-…` eller fallback som matcher .env.example. */
export function getAdsensePublisherIdForAdsTxt(): string {
  const client = getAdsenseClientId();
  const m = client.match(/ca-pub-(\d+)/i);
  if (m?.[1]) return `pub-${m[1]}`;
  return "pub-7373148222153531";
}

/** Én linje pr. Google-spec + afsluttende linjeskift (til GET /ads.txt). */
export function getAdsenseAdsTxtBody(): string {
  const pub = getAdsensePublisherIdForAdsTxt();
  return `google.com, ${pub}, DIRECT, f08c47fec0942fa0\n`;
}
