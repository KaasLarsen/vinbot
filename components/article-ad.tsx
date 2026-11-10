"use client";

import { AdSlot } from "@/components/ad-slot";
import { getAdsenseArticleSlotId, isAdsenseSlotsActive } from "@/lib/adsense-config";
import { useMarketingConsent } from "@/lib/use-marketing-consent";

type ArticleAdProps = { className?: string };

/**
 * Ét in-article AdSense-felt. Vises kun når Active er slået til, slot-id er sat,
 * og brugeren har trykket Accepter. Ellers intet hul i layoutet.
 */
export function ArticleAd({ className = "" }: ArticleAdProps) {
  const allowAds = useMarketingConsent();
  const slot = getAdsenseArticleSlotId();
  if (!isAdsenseSlotsActive() || !slot || !allowAds) return null;

  return (
    <aside
      aria-label="Annonce"
      className={["mx-auto mt-12 w-full max-w-3xl pb-4", className].filter(Boolean).join(" ")}
    >
      <p className="mb-2 text-center text-[11px] font-medium uppercase tracking-[0.14em] text-stone-400">
        Annonce
      </p>
      <AdSlot slot={slot} format="in-article" />
    </aside>
  );
}
