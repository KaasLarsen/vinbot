"use client";

import Link from "next/link";
import { useMemo } from "react";

import { MerchantAffiliateOutboundLink } from "@/components/merchant-affiliate-outbound-link";
import { listCuratedPicksForSearchQuery, detailSlugForCuratedPick } from "@/lib/growth/search-curated";
import { getMerchantWineConfig } from "@/lib/wine-detail-pages/merchants";
import type { MerchantWineId } from "@/lib/wine-detail-pages/merchants";
import { trackAffiliateClick } from "@/lib/affiliate-track";

const IMAGE_FRAME =
  "mx-auto mt-3 flex size-28 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-stone-100 sm:size-32";

type Props = {
  query: string;
  maxBudget: number | null;
  prominent?: boolean;
};

/** Kuraterede flasker (DSF + øvrige forhandlere) — vises ikke i feed-søgningen. */
export function SearchCuratedWineStrip({ query, maxBudget, prominent = false }: Props) {
  const picks = useMemo(() => listCuratedPicksForSearchQuery(query, maxBudget, 3), [query, maxBudget]);
  if (picks.length === 0) return null;

  const hasDsf = picks.some((p) => p.merchantId === "den-sidste-flaske");
  const hasOther = picks.some((p) => p.merchantId !== "den-sidste-flaske");

  return (
    <section
      className={
        prominent
          ? "rounded-2xl border-2 border-rose-300 bg-gradient-to-br from-rose-50/90 via-white to-amber-50/60 p-5 shadow-md ring-1 ring-rose-200/80"
          : "rounded-2xl border-2 border-rose-200/80 bg-gradient-to-br from-rose-50/50 via-white to-stone-50 p-5 shadow-sm"
      }
      aria-labelledby="search-curated-wine-heading"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-rose-800/90">Ud over feed-søgningen</p>
      <h2 id="search-curated-wine-heading" className="mt-1 text-lg font-semibold text-stone-900">
        {hasDsf && hasOther
          ? "Kuraterede flasker — også fra Den Sidste Flaske"
          : hasDsf
            ? "Har du set hos Den Sidste Flaske?"
            : "Kuraterede flasker med shop-link"}
      </h2>
      <p className="mt-1 text-sm text-stone-600">
        Vinbot har egne sider om udvalgte flasker med affiliatelink. De kommer ikke med i søgeresultaterne fra produktfeed
        ovenfor{hasDsf ? " — inkl. Den Sidste Flaske, som ikke er i feedet" : ""}.
      </p>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {picks.map((pick) => (
          <CuratedPickCard key={`${pick.merchantId}-${pick.productUrl}`} pick={pick} query={query} />
        ))}
      </ul>
      <p className="mt-3 text-xs text-stone-500">
        <Link href="/den-sidste-flaske" className="font-medium text-rose-900 hover:underline">
          Den Sidste Flaske
        </Link>
        {" · "}
        <Link href="/vine" className="font-medium text-rose-900 hover:underline">
          Vin-katalog
        </Link>
        {" · "}
        Annoncelinks — vi kan modtage provision.
      </p>
    </section>
  );
}

/** @deprecated Brug SearchCuratedWineStrip */
export const SearchCuratedDsfStrip = SearchCuratedWineStrip;

function CuratedPickCard({ pick, query }: { pick: ReturnType<typeof listCuratedPicksForSearchQuery>[number]; query: string }) {
  const cfg = getMerchantWineConfig(pick.merchantId);
  const detailSlug = detailSlugForCuratedPick(pick);
  const price =
    pick.listPrice != null
      ? new Intl.NumberFormat("da-DK", {
          style: "currency",
          currency: pick.priceCurrency || "DKK",
        }).format(pick.listPrice)
      : null;

  const trackImage = () =>
    trackAffiliateClick({
      merchant: cfg.displayName,
      placement: "search-curated-wine",
      slug: query.slice(0, 80),
      url: pick.productUrl,
    });

  return (
    <li>
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200/90 bg-white shadow-sm">
        <a
          href={pick.productUrl}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          onClick={trackImage}
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
          <p className="text-[10px] font-medium uppercase tracking-wide text-rose-800/90">{cfg.displayName}</p>
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
            merchantId={pick.merchantId as MerchantWineId}
            productUrl={pick.productUrl}
            placement="search-curated-wine"
            slug={query.slice(0, 80)}
            className="mt-auto inline-flex items-center justify-center rounded-xl bg-rose-900 px-3 py-2 text-xs font-medium text-white hover:bg-rose-950"
          >
            Se hos {cfg.displayName}
          </MerchantAffiliateOutboundLink>
        </div>
      </article>
    </li>
  );
}
