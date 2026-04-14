"use client";

import { clearStoredConsent } from "@/lib/cookie-consent";

/** Nulstiller cookie-valg og genindlæser, så banneret vises igen. */
export function CookieConsentReset() {
  return (
    <button
      type="button"
      onClick={() => {
        clearStoredConsent();
        window.location.reload();
      }}
      className="rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm font-medium text-stone-800 hover:bg-stone-50"
    >
      Nulstil cookie-valg og genindlæs
    </button>
  );
}
