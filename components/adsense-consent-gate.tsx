"use client";

import Script from "next/script";
import { getAdsenseClientId, isAdsenseEnabled } from "@/lib/adsense-config";
import { useMarketingConsent } from "@/lib/use-marketing-consent";

/** Indlæser AdSense-script kun efter &quot;Accepter&quot; i cookie-banneret. */
export function AdSenseConsentGate() {
  const allowAds = useMarketingConsent();
  const enabled = isAdsenseEnabled();
  const client = getAdsenseClientId();

  if (!enabled || !allowAds) return null;

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
