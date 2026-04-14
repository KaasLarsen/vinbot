/** Gemmes i localStorage når brugeren har valgt. */
export const COOKIE_CONSENT_KEY = "vinbot_cookie_consent_v1";

export type CookieConsentChoice = "all" | "essential";

export function getStoredConsent(): CookieConsentChoice | null {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem(COOKIE_CONSENT_KEY);
  if (v === "all" || v === "essential") return v;
  return null;
}

export function setStoredConsent(value: CookieConsentChoice): void {
  localStorage.setItem(COOKIE_CONSENT_KEY, value);
}

export function clearStoredConsent(): void {
  localStorage.removeItem(COOKIE_CONSENT_KEY);
}

export const COOKIE_CONSENT_EVENT = "vinbot-cookie-consent";

export function dispatchConsentChoice(choice: CookieConsentChoice): void {
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: { choice } }));
}
