"use client";

import { useEffect, useId, useSyncExternalStore } from "react";

import { trackAffiliateClick } from "@/lib/affiliate-track";
import { AGE_CONFIRM_EVENT, getStoredAgeConfirm } from "@/lib/age-confirm";
import { copenhagenDateKey } from "@/lib/deals/dagens-shared";
import type { TilbudCardItem } from "@/lib/deals/types";
import { productOutboundRel } from "@/lib/feeds/outbound-link";
import { useIsClient } from "@/lib/use-is-client";
import { useMarketingConsent } from "@/lib/use-marketing-consent";

const DISMISS_KEY = "vinbot_dagens_popup_dismissed_date_v1";
const DISMISS_EVENT = "vinbot-dagens-popup-dismiss";
const PLACEMENT = "dagens";

function formatPrice(amount: number) {
  return new Intl.NumberFormat("da-DK", { style: "currency", currency: "DKK" }).format(amount);
}

function subscribeAge(onChange: () => void) {
  window.addEventListener(AGE_CONFIRM_EVENT, onChange);
  return () => window.removeEventListener(AGE_CONFIRM_EVENT, onChange);
}

function subscribeDismiss(onChange: () => void) {
  window.addEventListener(DISMISS_EVENT, onChange);
  return () => window.removeEventListener(DISMISS_EVENT, onChange);
}

function getDismissedToday(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return localStorage.getItem(DISMISS_KEY) === copenhagenDateKey();
  } catch {
    return true;
  }
}

function dismissPopup() {
  try {
    localStorage.setItem(DISMISS_KEY, copenhagenDateKey());
  } catch {
    /* private mode */
  }
  window.dispatchEvent(new Event(DISMISS_EVENT));
}

/**
 * Lukbar «Dagens tilbud»-popup på forsiden.
 * Vises efter 18+ og marketing-samtykke; lukning gælder resten af kalenderdagen (DK).
 */
export function DagensTilbudPopup({ deal }: { deal: TilbudCardItem }) {
  const titleId = useId();
  const isClient = useIsClient();
  const allowAds = useMarketingConsent();
  const age = useSyncExternalStore(subscribeAge, getStoredAgeConfirm, () => null);
  const dismissed = useSyncExternalStore(subscribeDismiss, getDismissedToday, () => true);

  const open = isClient && allowAds && age === "adult" && !dismissed;

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismissPopup();
    };
    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  if (!open) return null;

  const saleLabel = formatPrice(deal.salePrice);
  const refLabel = deal.referencePrice != null ? formatPrice(deal.referencePrice) : null;
  const linkRel = productOutboundRel(deal.tier);
  const onClick = () =>
    trackAffiliateClick({ merchant: deal.merchant, placement: PLACEMENT, url: deal.url });

  return (
    <div
      className="dagens-popup-backdrop fixed inset-0 z-[90] flex items-end justify-center bg-stone-950/55 p-4 backdrop-blur-[2px] sm:items-center"
      role="presentation"
      onClick={dismissPopup}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="dagens-popup-panel relative w-full max-w-[22rem] overflow-hidden rounded-2xl border border-rose-200/70 bg-white shadow-2xl shadow-rose-950/20 sm:max-w-md"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-rose-800 via-rose-600 to-amber-600" />

        <div className="flex items-start justify-between gap-3 px-4 pb-1 pt-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-rose-800">
              Dagens tilbud
            </p>
            <p id={titleId} className="mt-0.5 text-sm text-stone-600">
              Bedste kup lige nu hos {deal.merchant}
            </p>
          </div>
          <button
            type="button"
            onClick={dismissPopup}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-stone-500 transition hover:bg-stone-100 hover:text-stone-800"
            aria-label="Luk dagens tilbud"
          >
            <span aria-hidden="true" className="text-xl leading-none">
              ×
            </span>
          </button>
        </div>

        <div className="relative mx-4 mt-2 flex h-44 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b from-rose-50 to-stone-50 ring-1 ring-rose-100/80 sm:h-52">
          {deal.discountPercent > 0 ? (
            <span className="absolute left-3 top-3 z-10 rounded-full bg-rose-900 px-3 py-1 text-sm font-semibold text-white shadow-sm">
              −{deal.discountPercent}%
            </span>
          ) : null}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={deal.image!}
            alt=""
            className="max-h-full max-w-full object-contain p-4 drop-shadow-md transition duration-500 hover:scale-[1.03]"
            width={220}
            height={220}
          />
        </div>

        <div className="space-y-3 px-4 pb-4 pt-3">
          <p className="text-xs font-medium uppercase tracking-wide text-rose-800/90">
            {deal.merchant}
          </p>
          <h2 className="line-clamp-2 text-lg font-semibold leading-snug tracking-tight text-stone-900">
            {deal.title}
          </h2>
          <div className="flex flex-wrap items-baseline gap-2">
            <p className="text-2xl font-semibold tabular-nums text-stone-900">{saleLabel}</p>
            {refLabel ? (
              <p className="text-sm text-stone-500 line-through">{refLabel}</p>
            ) : null}
          </div>
          <a
            href={deal.url}
            target="_blank"
            rel={linkRel}
            onClick={onClick}
            className="flex w-full items-center justify-center rounded-xl bg-rose-900 px-4 py-3.5 text-center text-sm font-semibold text-white shadow-md shadow-rose-950/20 transition hover:bg-rose-950 active:scale-[0.99]"
          >
            Se tilbud hos {deal.merchant}
          </a>
          <p className="text-center text-[11px] leading-relaxed text-stone-500">
            Du sendes videre til forhandleren. Pris og lager kan ændre sig.
          </p>
        </div>
      </div>
    </div>
  );
}
