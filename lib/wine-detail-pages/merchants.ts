import { PARTNER_ADS_KLIK_BANNERS, partnerAdsKlikUrl } from "@/lib/partner-ads-links";
import { sanitizeProductUrlForHost } from "@/lib/wine-detail-pages/sanitize-product-url";

export type MerchantWineId =
  | "den-sidste-flaske"
  | "lauridsen-vine"
  | "winther-vin"
  | "dh-wines"
  | "johnsen-wine";

export type MerchantWineConfig = {
  id: MerchantWineId;
  hubPath: string;
  displayName: string;
  partnerAdsBannerId: string;
  shopBaseUrl: string;
  sanitizeProductUrl: (url: string) => string;
};

const DSF_HOST = "densidsteflaske.dk";

export const MERCHANT_WINE_CONFIGS: Record<MerchantWineId, MerchantWineConfig> = {
  "den-sidste-flaske": {
    id: "den-sidste-flaske",
    hubPath: "/den-sidste-flaske",
    displayName: "Den Sidste Flaske",
    partnerAdsBannerId: PARTNER_ADS_KLIK_BANNERS.denSidsteFlaske,
    shopBaseUrl: `https://${DSF_HOST}/`,
    sanitizeProductUrl: (url) => sanitizeProductUrlForHost(url, DSF_HOST),
  },
  "lauridsen-vine": {
    id: "lauridsen-vine",
    hubPath: "/lauridsen-vine",
    displayName: "Lauridsen Vine",
    partnerAdsBannerId: PARTNER_ADS_KLIK_BANNERS.lauridsenVine,
    shopBaseUrl: "https://lauridsenvine.dk/",
    sanitizeProductUrl: (url) => sanitizeProductUrlForHost(url, "lauridsenvine.dk"),
  },
  "winther-vin": {
    id: "winther-vin",
    hubPath: "/winther-vin",
    displayName: "Winther Vin",
    partnerAdsBannerId: PARTNER_ADS_KLIK_BANNERS.wintherVin,
    shopBaseUrl: "https://winthervin.dk/",
    sanitizeProductUrl: (url) => sanitizeProductUrlForHost(url, "winthervin.dk"),
  },
  "dh-wines": {
    id: "dh-wines",
    hubPath: "/dh-wines",
    displayName: "DH Wines",
    partnerAdsBannerId: PARTNER_ADS_KLIK_BANNERS.dhWines,
    shopBaseUrl: "https://dhwines.dk/",
    sanitizeProductUrl: (url) => sanitizeProductUrlForHost(url, "dhwines.dk"),
  },
  "johnsen-wine": {
    id: "johnsen-wine",
    hubPath: "/johnsen-wine",
    displayName: "Johnsen Wine",
    partnerAdsBannerId: PARTNER_ADS_KLIK_BANNERS.johnsenWine,
    shopBaseUrl: "https://www.johnsenwine.dk/",
    sanitizeProductUrl: (url) => sanitizeProductUrlForHost(url, "johnsenwine.dk"),
  },
};

export function getMerchantWineConfig(id: MerchantWineId): MerchantWineConfig {
  return MERCHANT_WINE_CONFIGS[id];
}

export function merchantPartnerAdsClickUrl(merchantId: MerchantWineId, productPageUrl: string): string {
  const cfg = getMerchantWineConfig(merchantId);
  const clean = cfg.sanitizeProductUrl(productPageUrl);
  return partnerAdsKlikUrl(cfg.partnerAdsBannerId, clean);
}

export function wineDetailPagePath(merchantId: MerchantWineId, slug: string): string {
  return `${getMerchantWineConfig(merchantId).hubPath}/vin/${slug}`;
}
