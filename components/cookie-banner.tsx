"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  COOKIE_CONSENT_KEY,
  dispatchConsentChoice,
  getStoredConsent,
  setStoredConsent,
  type CookieConsentChoice,
} from "@/lib/cookie-consent";

/**
 * Simpelt cookie-banner: Accepter (statistik m.m.) eller kun nødvendige.
 * GA4 og AdSense indlæses først efter "Accepter" — se AnalyticsConsentGate og AdSenseConsentGate.
 */
export function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const existing = getStoredConsent();
    setOpen(existing === null);
  }, []);

  const choose = (choice: CookieConsentChoice) => {
    setStoredConsent(choice);
    dispatchConsentChoice(choice);
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-stone-200 bg-white/95 px-4 py-4 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] backdrop-blur-sm"
      role="dialog"
      aria-label="Om cookies"
      aria-live="polite"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <p className="text-sm leading-relaxed text-stone-700">
          Vi bruger cookies til statistik (Google Analytics) og annoncer (Google AdSense), når det er slået til på sitet. Ved at trykke{" "}
          <strong className="font-medium text-stone-900">Accepter</strong> siger du ja til det. Læs mere under{" "}
          <Link href="/privatliv" className="font-medium text-rose-900 underline decoration-rose-300 underline-offset-2 hover:text-rose-950">
            Privatliv
          </Link>
          .
        </p>
        <div className="flex shrink-0 flex-wrap items-center gap-2 sm:justify-end">
          <button
            type="button"
            onClick={() => choose("essential")}
            className="rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm font-medium text-stone-800 transition hover:bg-stone-50"
          >
            Kun nødvendige
          </button>
          <button
            type="button"
            onClick={() => choose("all")}
            className="rounded-xl bg-rose-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-950"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
