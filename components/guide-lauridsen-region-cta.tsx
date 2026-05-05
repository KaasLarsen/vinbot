"use client";

import { trackAffiliateClick } from "@/lib/affiliate-track";
import { PARTNER_ADS_KLIK_BANNERS, partnerAdsKlikUrl } from "@/lib/partner-ads-links";

const linkRel = "nofollow sponsored noopener noreferrer";

const SHOP_HREF = partnerAdsKlikUrl(PARTNER_ADS_KLIK_BANNERS.lauridsenVine, "https://lauridsenvine.dk/");

/**
 * Eksplicit sponsor-CTA på regionguides med produktforslag — supplement til rotations-banneret,
 * med tydelig affiliate-markering.
 */
export function GuideLauridsenRegionCta({ slug }: { slug: string }) {
  return (
    <aside
      className="not-prose mt-8 rounded-2xl border border-amber-200/90 bg-gradient-to-r from-amber-50/90 to-white px-5 py-4 shadow-sm ring-1 ring-stone-200/70 sm:px-6 sm:py-5"
      aria-label="Sponsorlink til Lauridsen Vine"
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-amber-900/85">Affiliate · partner</p>
      <p className="mt-2 text-sm text-stone-800">
        Udforsk <strong className="font-semibold text-stone-900">Lauridsen Vine</strong> — stort europæisk sortiment der passer godt til regionguider som denne.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <a
          href={SHOP_HREF}
          target="_blank"
          rel={linkRel}
          onClick={() =>
            trackAffiliateClick({
              merchant: "Lauridsen Vine",
              placement: "guide-region-lauridsen-cta",
              slug,
              hub: "regioner",
              url: SHOP_HREF,
            })
          }
          className="inline-flex rounded-xl bg-rose-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-rose-950"
        >
          Besøg Lauridsen Vine
        </a>
        <span className="text-xs text-stone-500">Åbner i nyt vindue · provision til Vinbot mulig</span>
      </div>
    </aside>
  );
}
