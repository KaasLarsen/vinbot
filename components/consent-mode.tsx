"use client";

import { useEffect } from "react";
import { COOKIE_CONSENT_EVENT, getStoredConsent, type CookieConsentChoice } from "@/lib/cookie-consent";
import { updateGoogleConsent } from "@/lib/google-consent";

/** Sender consent update, når brugeren trykker i banneret på denne sidevisning. */
export function ConsentModeUpdater() {
  useEffect(() => {
    updateGoogleConsent(getStoredConsent());

    const onConsent = (event: Event) => {
      const choice = (event as CustomEvent<{ choice: CookieConsentChoice }>).detail?.choice ?? null;
      updateGoogleConsent(choice);
    };

    window.addEventListener(COOKIE_CONSENT_EVENT, onConsent);
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, onConsent);
  }, []);

  return null;
}
