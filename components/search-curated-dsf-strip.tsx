"use client";

import Link from "next/link";
import { useMemo } from "react";

import { MerchantAffiliateOutboundLink } from "@/components/merchant-affiliate-outbound-link";
import { listCuratedPicksForSearchQuery, detailSlugForCuratedPick } from "@/lib/growth/search-curated";
import { getMerchantWineConfig } from "@/lib/wine-detail-pages/merchants";
import { trackAffiliateClick } from "@/lib/affiliate-track";

const IMAGE_FRAME =
  "mx-auto mt-3 flex size-28 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-stone-100 sm:size-32";

type Props = {
  query: string;
  maxBudget: number | null;
  prominent?: boolean;
};

/** «Har du set hos Den Sidste Flaske?» — kurateret uden feed. */
export function SearchCuratedDsfStrip({ query, maxBudget, prominent = false }: Props) {
  const picks = useMemo(() => listCuratedPicksForSearchQuery(query, maxBudget, 3), [query, maxBudget]);
  if (picks.length === 0) return null;

  const cfg = getMerchantWineConfig("den-sidste-flaske");

  return (
    <section
      className={
        prominent
          ? "rounded-2xl border border-rose-200 bg-gradient-to-br from-rose-50/80 via-white to-amber-50/50 p-5 shadow-sm"
          : "rounded-2xl border border-stone-200 bg-stone-50/90 p-5 shadow-sm"
      }
      aria-labelledby="search-dsf-curated-heading"
    >
      <h2 id="search-dsf-curated-heading" className="text-lg font-semibold text-stone-900">
        Har du set hos Den Sidste Flaske?
      </h2>
      <p className="mt-1 text-sm text-stone-600">
        Kuraterede flasker på Vinbot — de vises ikke i feed-søgningen ovenfor. Tjek pris og lager hos butikken.
      </p>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {picks.map((pick) => {
          const detailSlug = detailSlugForCuratedPick(pick);
          const price =
            pick.listPrice != null
              ? new Intl.NumberFormat("da-DK", {
                  style: "currency",
                  currency: pick.priceCurrency || "DKK",
                }).format(pick.listPrice)
              : null;

          return (
            <li key={pick.productUrl}>
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200/90 bg-white shadow-sm">
                <a
                  href={pick.productUrl}
                  target="_blank"
                  rel="nofollow sponsored noopener noreferrer"
                  onClick={() =>
                    trackAffiliateClick({
                      merchant: cfg.displayName,
                      placement: "search-dsf-curated",
                      slug: query.slice(0, 80),
                      url: pick.productUrl,
                    })
                  }
                  className={IMAGE_FRAME}
                >
                  {pick.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={pick.imageUrl} alt="" className="max-h-full max-w-full object-contain p-2" loading="lazy" />
                  ) : (
                    <span className="px-2 text-center text-xs text-stone-400">{cfg.displayName}</span>
                  )}
                </a>
                <div className="flex flex-1 flex-col gap-2 p-3">
                  <h3 className="line-clamp-2 text-sm font-semibold text-stone-900">{pick.title}</h3>
                  {pick.blurb ? <p className="line-clamp-2 text-xs text-stone-600">{pick.blurb}</p> : null}
                  {price ? <p className="text-sm font-semibold text-stone-800">{price}</p> : null}
                  {detailSlug ? (
                    <Link
                      href={`${cfg.hubPath}/vin/${detailSlug}`}
                      className="text-xs font-medium text-stone-700 underline decoration-stone-300 underline-offset-4 hover:text-stone-900"
                    >
                      Læs Vinbots side om vinen →
                    </Link>
                  ) : null}
                  <MerchantAffiliateOutboundLink
                    merchantId="den-sidste-flaske"
                    productUrl={pick.productUrl}
                    placement="search-dsf-curated"
                    slug={query.slice(0, 80)}
                    className="mt-auto inline-flex items-center justify-center rounded-xl bg-rose-900 px-3 py-2 text-xs font-medium text-white hover:bg-rose-950"
                  >
                    Se hos {cfg.displayName}
                  </MerchantAffiliateOutboundLink>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
      <p className="mt-3 text-xs text-stone-500">
        <Link href="/den-sidste-flaske" className="font-medium text-rose-900 hover:underline">
          Flere kuraterede flasker hos Den Sidste Flaske
        </Link>
        {" · "}
        Annoncelinks — vi kan modtage provision.
      </p>
    </section>
  );
}
