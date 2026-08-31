/** PriceRunner publisher partner — skal med i alle widget-URLs og klik-links for tracking. */
export const PRICERUNNER_PARTNER_ID = "adrunner_dk_vinbot";

/** Query-param PriceRunner bruger til publisher-klik (`ref-site` i widget-HTML). */
export const PRICERUNNER_REF_SITE_PARAM = "ref-site";

/** Tilføj partner-attribution til en PriceRunner produktside-URL. */
export function withPriceRunnerRefSite(url: string): string {
  try {
    const u = new URL(url);
    u.searchParams.set(PRICERUNNER_REF_SITE_PARAM, PRICERUNNER_PARTNER_ID);
    return u.toString();
  } catch {
    return url;
  }
}

/** Locale-segment i widget script-URL (dk = PriceRunner Danmark). */
export const PRICERUNNER_LOCALE = "dk";

export const PRICERUNNER_DEFAULT_OFFER_LIMIT = 3;
export const PRICERUNNER_DEFAULT_OFFER_ORIGIN = "NATIONAL";
export const PRICERUNNER_ONLY_IN_STOCK = true;
