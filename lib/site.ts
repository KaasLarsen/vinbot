export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://vinbot.vercel.app").replace(/\/$/, "");
export const siteName = "Vinbot";
export const contactEmail = "info@vinbot.dk";
export const siteDescription =
  "Når du skal finde den rigtige vin: søg på tværs af danske forhandlere, og læs grundige guider om mad og vin, humør og årstid.";

/** Partner-Ads klik til DSF-produkter (skift bannerid i Partner-Ads-dashboard hvis nødvendigt). */
const PARTNER_ADS_PARTNER_ID = "50537";
const PARTNER_ADS_DSF_BANNER_ID = "68720";

/** Omslutter en DSF-produktside med Partner-Ads klikbanner (samme mønster som legacy Vinbot). */
export function partnerAdsDsfClickUrl(productPageUrl: string): string {
  const u = productPageUrl.trim();
  return `https://www.partner-ads.com/dk/klikbanner.php?partnerid=${PARTNER_ADS_PARTNER_ID}&bannerid=${PARTNER_ADS_DSF_BANNER_ID}&htmlurl=${encodeURIComponent(u)}`;
}
