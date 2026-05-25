import Link from "next/link";

import { listWineDetailPagesForGuide, wineDetailPageUrl } from "@/lib/wine-detail-pages/registry";
import { getMerchantWineConfig } from "@/lib/wine-detail-pages/merchants";

/** Valgfri «Eksempel-flasker»-sektion når kuraterede detail-sider matcher guiden. */
export function GuideWineDetailLinks({ guideSlug }: { guideSlug: string }) {
  const pages = listWineDetailPagesForGuide(guideSlug, 3);
  if (pages.length === 0) return null;

  return (
    <section className="not-prose mt-10 rounded-2xl border border-stone-200 bg-stone-50/90 p-6" aria-labelledby="guide-wine-detail-heading">
      <h2 id="guide-wine-detail-heading" className="text-xl font-semibold text-stone-900">
        Eksempel-flasker hos forhandlere
      </h2>
      <p className="mt-2 text-sm text-stone-700">
        Kuraterede enkeltvin-sider på Vinbot — med madmatch og affiliatelink til butikken. Pris og lager tjekkes altid hos forhandleren.
      </p>
      <ul className="mt-4 space-y-3">
        {pages.map((page) => {
          const cfg = getMerchantWineConfig(page.merchantId);
          const href = wineDetailPageUrl(page);
          return (
            <li key={`${page.merchantId}-${page.slug}`}>
              <Link href={href} className="font-medium text-rose-900 underline decoration-rose-200 underline-offset-4 hover:text-rose-950">
                {page.displayTitle}
              </Link>
              <span className="text-sm text-stone-600"> · {cfg.displayName}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
