"use client";

import { useSyncExternalStore } from "react";
import { COOKIE_CONSENT_EVENT, getStoredConsent } from "@/lib/cookie-consent";

function subscribe(onChange: () => void) {
  window.addEventListener(COOKIE_CONSENT_EVENT, onChange);
  return () => window.removeEventListener(COOKIE_CONSENT_EVENT, onChange);
}

function getSnapshot(): boolean {
  return getStoredConsent() === "all";
}

/** Sandt når brugeren har valgt "Accepter" (marketing + statistik). */
export function useMarketingConsent(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
