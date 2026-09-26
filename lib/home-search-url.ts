/** Klient-side læsning af forsidesøgnings-URL uden useSearchParams (beholder statisk cache). */

export const HOME_WINE_SEARCH_EVENT = "vinbot:home-search";

export function readHomeSearchUrl(): { q?: string; initialMax?: number } {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const q = params.get("q") ?? undefined;
  const maxRaw = params.get("max");
  const parsedMax = maxRaw != null ? parseInt(maxRaw, 10) : Number.NaN;
  const initialMax = Number.isFinite(parsedMax) ? parsedMax : undefined;
  return { q, initialMax };
}

export function hasHomeSearchQuery(): boolean {
  return Boolean(readHomeSearchUrl().q?.trim());
}

/** Eksplicit signal når noget har opdateret `/?q=` (fx efter etiket-scan). */
export function notifyHomeSearchUrlChanged() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(HOME_WINE_SEARCH_EVENT));
}

let historyPatched = false;

/**
 * Sørg for at client-side navigations (router.push / Link til `/?q=…`)
 * også triggere HOME_WINE_SEARCH_EVENT — popstate dækker kun tilbage/frem.
 */
function ensureHistoryPatched() {
  if (historyPatched || typeof window === "undefined") return;
  if (typeof history === "undefined" || typeof history.pushState !== "function") return;
  historyPatched = true;

  const wrap =
    (fn: History["pushState"]) =>
    function (this: History, ...args: Parameters<History["pushState"]>) {
      const prev = window.location.href;
      const ret = fn.apply(this, args);
      if (window.location.href !== prev) {
        queueMicrotask(() => notifyHomeSearchUrlChanged());
      }
      return ret;
    };

  history.pushState = wrap(history.pushState);
  history.replaceState = wrap(history.replaceState);
}

/** Abonnér på ændringer i forsidesøgnings-URL. Returnerer cleanup. */
export function subscribeHomeSearchUrl(onChange: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  ensureHistoryPatched();
  window.addEventListener("popstate", onChange);
  window.addEventListener(HOME_WINE_SEARCH_EVENT, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(HOME_WINE_SEARCH_EVENT, onChange);
  };
}
