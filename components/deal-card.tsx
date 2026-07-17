"use client";

import Link from "next/link";

import { trackAffiliateClick } from "@/lib/affiliate-track";
import type { TilbudCardItem } from "@/lib/deals/types";

const IMAGE_FRAME =
  "mx-auto mt-3 flex size-36 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-stone-100 sm:size-40";

function formatPrice(amount: number, currency = "DKK") {
  return new Intl.NumberFormat("da-DK", { style: "currency", currency }).format(amount);
}

export function DealCard({ deal, placement = "tilbud-hub" }: { deal: TilbudCardItem; placement?: string }) {
  const onClick = () =>
    trackAffiliateClick({ merchant: deal.merchant, placement, url: deal.url });

  const saleLabel = formatPrice(deal.salePrice);
  const refLabel = deal.referencePrice != null ? formatPrice(deal.referencePrice) : null;

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-stone-200/90 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative">
        <span className="absolute left-3 top-3 z-10 rounded-full bg-rose-900 px-2.5 py-1 text-xs font-semibold text-white">
          −{deal.discountPercent}%
        </span>
        <a
          href={deal.url}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          onClick={onClick}
          className={IMAGE_FRAME}
        >
          {deal.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={deal.image} alt="" className="max-h-full max-w-full object-contain p-2" loading="lazy" />
          ) : (
            <div className="px-2 text-center text-xs text-stone-400">Intet billede</div>
          )}
        </a>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-rose-800/90">{deal.merchant}</p>
        <h3 className="line-clamp-2 text-base font-semibold leading-snug text-stone-900">
          <a
            href={deal.url}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            onClick={onClick}
            className="hover:underline"
          >
            {deal.title}
          </a>
        </h3>
        {deal.kind === "cross" && deal.highestMerchant ? (
          <p className="text-xs text-stone-600">
            Billigst hos {deal.merchant}
            {deal.merchantCount && deal.merchantCount > 1 ? ` · ${deal.merchantCount} butikker` : ""}
            {typeof deal.savingsAmount === "number" ? ` · spar ${deal.savingsAmount.toLocaleString("da-DK")} kr` : ""}
          </p>
        ) : null}
        <div className="flex flex-wrap items-baseline gap-2">
          <p className="text-lg font-semibold text-stone-800">{saleLabel}</p>
          {refLabel ? (
            <p className="text-sm text-stone-500 line-through" aria-label={`Før-pris ${refLabel}`}>
              {refLabel}
            </p>
          ) : null}
        </div>
        <div className="mt-auto flex flex-col gap-2 sm:flex-row">
          <a
            href={deal.url}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            onClick={onClick}
            className="inline-flex flex-1 items-center justify-center rounded-xl bg-rose-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-rose-950"
          >
            Se hos forhandler
          </a>
          {deal.catalogSlug ? (
            <Link
              href={`/vine/${deal.catalogSlug}`}
              className="inline-flex flex-1 items-center justify-center rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-medium text-stone-800 hover:border-stone-300 hover:bg-stone-50"
            >
              Sammenlign
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
