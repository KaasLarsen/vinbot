/** Gemmes i localStorage når brugeren har svaret på 18+-spørgsmålet. */
export const AGE_CONFIRM_KEY = "vinbot_age_confirm_v1";
export const AGE_CONFIRM_EVENT = "vinbot-age-confirm-change";

export type AgeConfirmChoice = "adult" | "under";

export function getStoredAgeConfirm(): AgeConfirmChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const v = localStorage.getItem(AGE_CONFIRM_KEY);
    if (v === "adult" || v === "under") return v;
  } catch {
    /* private mode */
  }
  return null;
}

export function setStoredAgeConfirm(value: AgeConfirmChoice): void {
  localStorage.setItem(AGE_CONFIRM_KEY, value);
  window.dispatchEvent(new Event(AGE_CONFIRM_EVENT));
}

export function clearStoredAgeConfirm(): void {
  localStorage.removeItem(AGE_CONFIRM_KEY);
  window.dispatchEvent(new Event(AGE_CONFIRM_EVENT));
}

/** Sider en bruger under 18 må se: alkoholfri hub og de juridiske sider. */
export function isUnder18AllowedPath(pathname: string): boolean {
  return (
    pathname === "/alkoholfri-vin" ||
    pathname === "/privatliv" ||
    pathname === "/cookiepolitik" ||
    pathname === "/betingelser" ||
    pathname === "/om-os" ||
    pathname === "/kontakt" ||
    pathname === "/redaktionel-proces"
  );
}
