import Link from "next/link";

import { listWineDetailPagesForRecipe } from "@/lib/growth/recipe-commerce";
import { getMerchantWineConfig } from "@/lib/wine-detail-pages/merchants";
import { wineDetailPageUrl } from "@/lib/wine-detail-pages/registry";

type Props = {
  recipeSlug: string;
  tags?: string[];
  relatedGuides?: string[];
};

/** Kuraterede enkeltvin-sider (inkl. DSF) — salgsnærmere end ren søgning. */
export function RecipeCuratedWineLinks({ recipeSlug, tags = [], relatedGuides = [] }: Props) {
  const pages = listWineDetailPagesForRecipe(recipeSlug, tags, relatedGuides, 3);
  if (pages.length === 0) return null;

  return (
    <section
      className="not-prose rounded-2xl border border-stone-200 bg-stone-50/90 p-5 shadow-sm"
      aria-labelledby="recipe-curated-wine-heading"
    >
      <h2 id="recipe-curated-wine-heading" className="text-lg font-semibold text-stone-900">
        Kuraterede flasker med shop-link
      </h2>
      <p className="mt-1 text-sm text-stone-600">
        Udvalgte enkeltvin-sider på Vinbot — tjek altid pris og lager hos butikken.
      </p>
      <ul className="mt-4 space-y-3">
        {pages.map((page) => {
          const cfg = getMerchantWineConfig(page.merchantId);
          return (
            <li key={`${page.merchantId}-${page.slug}`} className="rounded-xl border border-stone-200 bg-white px-4 py-3">
              <Link
                href={wineDetailPageUrl(page)}
                className="font-medium text-rose-900 underline decoration-rose-200 underline-offset-4 hover:text-rose-950"
              >
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
