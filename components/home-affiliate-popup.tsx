"use client";

import { useEffect, useId, useSyncExternalStore } from "react";
import { AGE_CONFIRM_EVENT, getStoredAgeConfirm } from "@/lib/age-confirm";
import { useIsClient } from "@/lib/use-is-client";
import { useMarketingConsent } from "@/lib/use-marketing-consent";

const DISMISS_KEY = "vinbot_home_affiliate_popup_dismissed_v1";
const DISMISS_EVENT = "vinbot-home-affiliate-popup-dismiss";

const BANNER_HREF = "https://rkn3.net/c/?si=8715&li=1753811&wi=399526&ws=";
const BANNER_SRC = "https://static-dscn.net/8715/1753811/?wi=399526&ws=";

function subscribeAge(onChange: () => void) {
  window.addEventListener(AGE_CONFIRM_EVENT, onChange);
  return () => window.removeEventListener(AGE_CONFIRM_EVENT, onChange);
}

function subscribeDismiss(onChange: () => void) {
  window.addEventListener(DISMISS_EVENT, onChange);
  return () => window.removeEventListener(DISMISS_EVENT, onChange);
}

function getDismissed(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return localStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    return true;
  }
}

function dismissPopup() {
  try {
    localStorage.setItem(DISMISS_KEY, "1");
  } catch {
    /* private mode */
  }
  window.dispatchEvent(new Event(DISMISS_EVENT));
}

/**
 * Daisycon-banner (Danske Meninger) som lukbar popup kun på forsiden.
 * Vises efter 18+ og marketing-samtykke. Lukning huskes i browseren.
 */
export function HomeAffiliatePopup() {
  const titleId = useId();
  const isClient = useIsClient();
  const allowAds = useMarketingConsent();
  const age = useSyncExternalStore(subscribeAge, getStoredAgeConfirm, () => null);
  const dismissed = useSyncExternalStore(subscribeDismiss, getDismissed, () => true);

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

  return (
    <div
      className="fixed inset-0 z-[90] flex items-end justify-center bg-stone-950/50 p-4 sm:items-center"
      role="presentation"
      onClick={dismissPopup}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full max-w-[22rem] rounded-2xl border border-stone-200 bg-white p-3 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-2 flex items-center justify-between gap-3">
          <p id={titleId} className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            Annonce
          </p>
          <button
            type="button"
            onClick={dismissPopup}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-stone-600 hover:bg-stone-100"
            aria-label="Luk annonce"
          >
            <span aria-hidden="true" className="text-lg leading-none">
              ×
            </span>
          </button>
        </div>
        <a href={BANNER_HREF} rel="sponsored noopener noreferrer" target="_blank">
          <img
            src={BANNER_SRC}
            alt="Danske Meninger — tilmeld dig og optjen belønninger"
            width={336}
            height={280}
            className="h-auto w-full border-0"
          />
        </a>
      </div>
    </div>
  );
}
