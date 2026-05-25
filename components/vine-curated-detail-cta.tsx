import Link from "next/link";

import { findWineDetailPageByProductUrl, wineDetailPageUrl } from "@/lib/wine-detail-pages/registry";
import { getMerchantWineConfig } from "@/lib/wine-detail-pages/merchants";
import type { CanonicalWine } from "@/lib/vine/types";

/** Diskret CTA på katalog-sider når en kurateret detail-side findes for et tilbud. */
export function VineCuratedDetailCta({ wine }: { wine: CanonicalWine }) {
  for (const offer of wine.offers) {
    const detail = findWineDetailPageByProductUrl(offer.url);
    if (!detail) continue;
    const cfg = getMerchantWineConfig(detail.merchantId);
    const href = wineDetailPageUrl(detail);
    return (
      <div className="mt-6 rounded-2xl border border-rose-100 bg-rose-50/60 p-5">
        <p className="text-sm font-medium text-stone-900">Læs Vinbots dybere guide til denne flaske</p>
        <p className="mt-1 text-sm text-stone-700">
          Madmatch, servering og specs — kurateret side hos {cfg.displayName}.
        </p>
        <Link
          href={href}
          className="mt-3 inline-flex text-sm font-semibold text-rose-900 underline decoration-rose-300 underline-offset-4 hover:text-rose-950"
        >
          {detail.displayTitle} →
        </Link>
      </div>
    );
  }
  return null;
}
