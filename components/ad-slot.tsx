"use client";

import { useEffect, useRef } from "react";
import { getAdsenseClientId, isAdsenseSlotsActive } from "@/lib/adsense-config";
import { useMarketingConsent } from "@/lib/use-marketing-consent";

/**
 * AdSense-annoncer er slået fra som standard. Aktivér først når Google har godkendt sitet:
 * sæt NEXT_PUBLIC_ADSENSE_ACTIVE=true og NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-…
 *
 * Publisher-scriptet indlæses uafhængigt via <AdSenseConsentGate /> i layout — dét
 * kræver kun NEXT_PUBLIC_ADSENSE_CLIENT, så Googlebot kan verificere publisher-tagget.
 * Selve annonce-slots (denne komponent) kræver både env ACTIVE=true og cookie-valget "Accepter".
 */
export function AdSenseLoader() {
  return null;
}

type SlotProps = { slot: string; className?: string; format?: "auto" | "rectangle" | "horizontal" | "vertical" };

export function AdSlot({ slot, className = "", format = "auto" }: SlotProps) {
  const allowAds = useMarketingConsent();
  const enabled = isAdsenseSlotsActive();
  const client = getAdsenseClientId();
  const pushedRef = useRef(false);

  useEffect(() => {
    if (!enabled || !allowAds || pushedRef.current) return;
    try {
      const w = window as unknown as { adsbygoogle?: object[] };
      w.adsbygoogle = w.adsbygoogle || [];
      w.adsbygoogle.push({});
      pushedRef.current = true;
    } catch {
      /* ignore */
    }
  }, [enabled, allowAds, slot]);

  if (!enabled || !allowAds) return null;

  return (
    <div className={className}>
      <ins
        className="adsbygoogle block min-h-[100px] w-full"
        style={{ display: "block" }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
