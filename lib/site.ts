import { PARTNER_ADS_KLIK_BANNERS, partnerAdsKlikUrl } from "@/lib/partner-ads-links";

/** Primær host skal matche Vercel “primary domain”. Apex (vinbot.dk) 307’er til www — undgå apex i sitemap/canonical hvis jeres setup er www-first. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.vinbot.dk").replace(/\/$/, "");
export const siteName = "Vinbot";
/** Redaktionelt byline på guides — ikke personligt navn. */
export const editorialTeamName = "Vinbot-redaktionen";
export const editorialTeamDescription =
  "Vinbots redaktionelle team skriver og opdaterer vinguides på dansk — madparring, druer, regioner og praktisk vin-viden.";
export const contactEmail = "info@vinbot.dk";

/** Mob.nr. til hobbyprojektet — `tel:` uden mellemrum. */
export const contactPhoneDisplay = "27 29 91 06";
export const contactPhoneTelHref = "tel:+4527299106";

/**
 * Dato vist på privatliv, betingelser og cookiepolitik — bump ved meningsfulde ændringer
 * (fx efter deploy af nye tekster).
 */
export const legalPagesUpdatedDisplay = "10. maj 2026";

/** Fast @id til Organization i JSON-LD (samme på tværs af sider). */
export const organizationSchemaId = `${siteUrl}/#organization`;
/** Forfatter-entity for artikler (underordnet Vinbot som udgiver). */
export const editorialTeamSchemaId = `${siteUrl}/#editorial-team`;

/** Google anbefaler logo ≥112px; apple-icon er 180×180. */
export const organizationLogoUrl = `${siteUrl}/apple-icon`;

/** Kommaseparerede profil-URL'er (fx SoMe), valgfrit. */
export function organizationSameAs(): string[] {
  const raw = process.env.NEXT_PUBLIC_ORG_SAME_AS?.trim();
  if (!raw) return [];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}
export const siteDescription =
  "Når du skal finde den rigtige vin: søg på tværs af danske forhandlere, og læs grundige guider om mad og vin, humør og årstid.";

/** Omslutter en DSF-produktside med Partner-Ads klikbanner (samme mønster som legacy Vinbot). */
export function partnerAdsDsfClickUrl(productPageUrl: string): string {
  return partnerAdsKlikUrl(PARTNER_ADS_KLIK_BANNERS.denSidsteFlaske, productPageUrl.trim());
}
