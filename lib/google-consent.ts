import type { CookieConsentChoice } from "@/lib/cookie-consent";

export type GoogleConsentValue = "granted" | "denied";

export type GoogleConsentState = {
  ad_storage: GoogleConsentValue;
  ad_user_data: GoogleConsentValue;
  ad_personalization: GoogleConsentValue;
  analytics_storage: GoogleConsentValue;
};

export function googleConsentState(choice: CookieConsentChoice | null): GoogleConsentState {
  const value: GoogleConsentValue = choice === "all" ? "granted" : "denied";
  return {
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
    analytics_storage: value,
  };
}

/** Opdaterer Consent Mode, når brugeren har valgt. Kræver at gtag-stubben allerede findes. */
export function updateGoogleConsent(choice: CookieConsentChoice | null): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("consent", "update", googleConsentState(choice));
}
