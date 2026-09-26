import Script from "next/script";
import { getAdsenseClientId, isAdsenseScriptEnabled } from "@/lib/adsense-config";

/**
 * Indlæser AdSense publisher-scriptet på alle sider.
 *
 * Scriptet loades, så Googlebot kan verificere publisher-tagget (krav for
 * AdSense-godkendelse). Consent Mode v2 er sat til denied i layout, indtil
 * brugeren trykker Accepter — så scriptet ikke sætter marketing-cookies før samtykke.
 * Selve annonce-visningen (`AdSlot`) er stadig samtykke-gated via `useMarketingConsent`.
 */
export function AdSenseConsentGate() {
  if (!isAdsenseScriptEnabled()) return null;
  const client = getAdsenseClientId();

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
