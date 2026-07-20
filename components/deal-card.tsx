"use client";

import Link from "next/link";

import { trackAffiliateClick } from "@/lib/affiliate-track";
import { productOutboundRel } from "@/lib/feeds/outbound-link";
import type { TilbudCardItem } from "@/lib/deals/types";

const IMAGE_FRAME_DEFAULT =
  "mx-auto mt-3 flex size-36 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-stone-100 sm:size-40";
const IMAGE_FRAME_COMPACT =
  "mx-auto mt-2 flex size-32 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-stone-100 sm:size-36";
const IMAGE_FRAME_FEATURED =
  "flex size-36 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white ring-1 ring-stone-100 sm:size-44";

function formatPrice(amount: number, currency = "DKK") {
  return new Intl.NumberFormat("da-DK", { style: "currency", currency }).format(amount);
}

export function DealCard({
  deal,
  placement = "tilbud-hub",
  variant = "default",
}: {
  deal: TilbudCardItem;
  placement?: string;
  variant?: "default" | "compact" | "featured";
}) {
  const onClick = () =>
    trackAffiliateClick({ merchant: deal.merchant, placement, url: deal.url });

  const saleLabel = formatPrice(deal.salePrice);
  const refLabel = deal.referencePrice != null ? formatPrice(deal.referencePrice) : null;
  const linkRel = productOutboundRel(deal.tier);
  const isFree = deal.tier === "free";
  const merchantLine = (
    <div className="flex flex-wrap items-center gap-2">
      <p className="text-xs font-medium uppercase tracking-wide text-rose-800/90">{deal.merchant}</p>
      {isFree ? (
        <span className="rounded bg-stone-100 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-stone-600">
          Gratis butik
        </span>
      ) : null}
    </div>
  );

  const badge = (
    <span
      className={`rounded-full bg-rose-900 font-semibold text-white ${
        variant === "featured" ? "px-3 py-1 text-sm" : "px-2.5 py-1 text-xs"
      }`}
    >
      −{deal.discountPercent}%
    </span>
  );

  if (variant === "featured") {
    return (
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-rose-200/60 bg-gradient-to-br from-rose-50/80 via-white to-white shadow-md ring-1 ring-rose-100/80 sm:flex-row">
        <div className="relative flex shrink-0 items-center justify-center p-5 sm:w-48">
          <span className="absolute left-4 top-4 z-10">{badge}</span>
          <a
            href={deal.url}
            target="_blank"
            rel={linkRel}
            onClick={onClick}
            className={IMAGE_FRAME_FEATURED}
          >
            {deal.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={deal.image} alt="" className="max-h-full max-w-full object-contain p-2" loading="lazy" />
            ) : (
              <div className="px-2 text-center text-xs text-stone-400">Intet billede</div>
            )}
          </a>
        </div>
        <div className="flex flex-1 flex-col gap-2 border-t border-rose-100/80 p-5 sm:border-l sm:border-t-0">
          {merchantLine}
          <h3 className="line-clamp-2 text-lg font-semibold leading-snug text-stone-900">
            <a
              href={deal.url}
              target="_blank"
              rel={linkRel}
              onClick={onClick}
              className="hover:underline"
            >
              {deal.title}
            </a>
          </h3>
          <div className="flex flex-wrap items-baseline gap-2">
            <p className="text-2xl font-semibold tabular-nums text-stone-900">{saleLabel}</p>
            {refLabel ? <p className="text-sm text-stone-500 line-through">{refLabel}</p> : null}
          </div>
          <p className="text-sm text-stone-600">
            {deal.kind === "cross" && deal.highestMerchant
              ? `Billigst hos ${deal.merchant} — spar op mod ${deal.highestMerchant}`
              : "Nedsat i butikkens feed lige nu"}
          </p>
          <div className="mt-auto flex flex-wrap gap-2 pt-2">
            <a
              href={deal.url}
              target="_blank"
              rel={linkRel}
              onClick={onClick}
              className="inline-flex items-center justify-center rounded-xl bg-rose-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-rose-950"
            >
              Se tilbud
            </a>
            {deal.catalogSlug ? (
              <Link
                href={`/vine/${deal.catalogSlug}`}
                className="inline-flex items-center justify-center rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-medium text-stone-800 hover:bg-stone-50"
              >
                Sammenlign priser
              </Link>
            ) : null}
          </div>
        </div>
      </article>
    );
  }

  const imageFrame = variant === "compact" ? IMAGE_FRAME_COMPACT : IMAGE_FRAME_DEFAULT;
  const padding = variant === "compact" ? "gap-1.5 p-3.5" : "gap-2 p-4";
  const titleClass = variant === "compact" ? "line-clamp-2 text-sm font-semibold" : "line-clamp-2 text-base font-semibold";

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200/90 bg-white shadow-sm transition hover:border-stone-300 hover:shadow-md">
      <div className="relative">
        <span className="absolute left-3 top-3 z-10">{badge}</span>
        <a
          href={deal.url}
          target="_blank"
          rel={linkRel}
          onClick={onClick}
          className={imageFrame}
        >
          {deal.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={deal.image} alt="" className="max-h-full max-w-full object-contain p-2" loading="lazy" />
          ) : (
            <div className="px-2 text-center text-xs text-stone-400">Intet billede</div>
          )}
        </a>
      </div>
      <div className={`flex flex-1 flex-col ${padding}`}>
        {merchantLine}
        <h3 className={`leading-snug text-stone-900 ${titleClass}`}>
          <a
            href={deal.url}
            target="_blank"
            rel={linkRel}
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
          <p className={`font-semibold tabular-nums text-stone-800 ${variant === "compact" ? "text-base" : "text-lg"}`}>
            {saleLabel}
          </p>
          {refLabel ? (
            <p className="text-sm text-stone-500 line-through" aria-label={`Før-pris ${refLabel}`}>
              {refLabel}
            </p>
          ) : null}
        </div>
        <div className={`mt-auto flex flex-col gap-2 ${variant === "compact" ? "pt-1" : ""} sm:flex-row`}>
          <a
            href={deal.url}
            target="_blank"
            rel={linkRel}
            onClick={onClick}
            className={`inline-flex flex-1 items-center justify-center rounded-xl bg-rose-900 font-medium text-white hover:bg-rose-950 ${
              variant === "compact" ? "px-3 py-2 text-xs" : "px-4 py-2.5 text-sm"
            }`}
          >
            Se hos forhandler
          </a>
          {deal.catalogSlug ? (
            <Link
              href={`/vine/${deal.catalogSlug}`}
              className={`inline-flex flex-1 items-center justify-center rounded-xl border border-stone-200 bg-white font-medium text-stone-800 hover:border-stone-300 hover:bg-stone-50 ${
                variant === "compact" ? "px-3 py-2 text-xs" : "px-4 py-2.5 text-sm"
              }`}
            >
              Sammenlign
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
