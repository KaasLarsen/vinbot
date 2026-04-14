"use client";

import { useEffect, useState } from "react";
import { COOKIE_CONSENT_EVENT, getStoredConsent, type CookieConsentChoice } from "@/lib/cookie-consent";
import { GoogleAnalytics } from "@/components/google-analytics";

type Props = { measurementId: string };

/** Indlæser GA4 kun når brugeren har valgt &quot;Accepter&quot; (all). */
export function AnalyticsConsentGate({ measurementId }: Props) {
  const [allowAnalytics, setAllowAnalytics] = useState(false);

  useEffect(() => {
    if (getStoredConsent() === "all") {
      setAllowAnalytics(true);
    }

    const onConsent = (e: Event) => {
      const choice = (e as CustomEvent<{ choice: CookieConsentChoice }>).detail?.choice;
      if (choice === "all") setAllowAnalytics(true);
      if (choice === "essential") setAllowAnalytics(false);
    };

    window.addEventListener(COOKIE_CONSENT_EVENT, onConsent);
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, onConsent);
  }, []);

  if (!allowAnalytics) return null;
  return <GoogleAnalytics measurementId={measurementId} />;
}
