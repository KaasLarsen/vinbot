"use client";

import { useEffect, useState } from "react";
import { COOKIE_CONSENT_EVENT, getStoredConsent, type CookieConsentChoice } from "@/lib/cookie-consent";

/** Sandt når brugeren har valgt &quot;Accepter&quot; (marketing + statistik). */
export function useMarketingConsent(): boolean {
  const [allow, setAllow] = useState(false);

  useEffect(() => {
    if (getStoredConsent() === "all") setAllow(true);

    const onConsent = (e: Event) => {
      const choice = (e as CustomEvent<{ choice: CookieConsentChoice }>).detail?.choice;
      if (choice === "all") setAllow(true);
      if (choice === "essential") setAllow(false);
    };

    window.addEventListener(COOKIE_CONSENT_EVENT, onConsent);
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, onConsent);
  }, []);

  return allow;
}
