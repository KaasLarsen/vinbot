import { PARTNER_ADS_KLIK_BANNERS, partnerAdsKlikUrl } from "@/lib/partner-ads-links";
import { facebookOlVinUrl, siteUrl } from "@/lib/site";

/**
 * Kuraterede opslag fra Øl & Vin på Facebook.
 * Tilføj nye øverst. Brug produktbillede (fx fra butikken) under /public/images/ol-vin/.
 */
export type OlVinFacebookPost = {
  id: string;
  title: string;
  excerpt: string;
  /** ISO-dato YYYY-MM-DD */
  date: string;
  /** Partner-Ads klik til butik, eller intern Vinbot-URL for gratis butikker. */
  orderHref: string;
  /** Billede fra opslaget under /public */
  image: string;
  /** CTA-knaptekst (standard: Bestil her) */
  ctaLabel?: string;
  /** object-fit for billedet (standard: contain til flaskebilleder) */
  imageFit?: "contain" | "cover";
  /** Merchant-navn til analytics på Bestil her-klik. */
  merchant?: string;
  /** False = ingen affiliate-tracking / sponsored-rel (gratis butik eller intern side). */
  affiliate?: boolean;
};

const IMMORTALIS_PRIORAT_PRODUCT = "https://lauridsenvine.dk/products/immortalis-priorat";

/** Unik Partner-Ads uid pr. opslag (må ikke indeholde `/`). */
function olVinOrderLink(bannerId: string, productUrl: string, trackingUid: string): string {
  return partnerAdsKlikUrl(bannerId, productUrl, trackingUid);
}

function vinbotPath(path: string): string {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export const OL_VIN_FACEBOOK_POSTS: OlVinFacebookPost[] = [
  {
    id: "2026-07-17-guvnor-rose",
    title: "Prisvindende rosé til en vild pris!",
    excerpt:
      "Kun 55 kr. pr. flaske ved køb af 12 flasker (normalpris 109 kr.). The Guv'nor Rosé — frisk spansk rosé med jordbær, ribs og citrus. Perfekt til terrasse, tapas og fisk.",
    date: "2026-07-17",
    orderHref: vinbotPath("/den-sidste-flaske"),
    image: "/images/ol-vin/post-guvnor-rose-bottle.webp",
    ctaLabel: "Læs på Vinbot",
    merchant: "Den Sidste Flaske",
    affiliate: false,
  },
  {
    id: "2026-07-17-riesling",
    title: "Fantastisk tysk Riesling til en vanvittig pris!",
    excerpt:
      "Kun 55 kr. pr. flaske ved køb af 12 flasker (normalpris 119 kr.). Frisk, sprød og tør Riesling med citrus, grønne æbler og mineralitet — perfekt til fisk, skaldyr og terrassen.",
    date: "2026-07-17",
    orderHref: vinbotPath("/den-sidste-flaske/vin/weinhof-519-alte-reben-rheingau-riesling-trocken"),
    image: "/images/ol-vin/post-riesling-bottle.webp",
    ctaLabel: "Læs på Vinbot",
    merchant: "Den Sidste Flaske",
    affiliate: false,
  },
  {
    id: "2026-07-17-boccantino",
    title: "Måske den bedste rødvin, du kan købe til 55 kr.!",
    excerpt:
      "Kun 55 kr. pr. flaske ved køb af 12 flasker (normalpris 109 kr.). Boccantino Primitivo & Susumaniello — fyldig, blød og frugtig italiensk rødvin.",
    date: "2026-07-17",
    orderHref: vinbotPath("/den-sidste-flaske/vin/primitivo-susumaniello-salento-boccantino"),
    image: "/images/ol-vin/post-boccantino-bottle.webp",
    ctaLabel: "Læs på Vinbot",
    merchant: "Den Sidste Flaske",
    affiliate: false,
  },
  {
    id: "2026-07-01-vinbot",
    title: "Er du i tvivl om, hvilken vin du skal vælge?",
    excerpt:
      "På Vinbot.dk kan du blive inspireret og finde den rigtige vin — til bøffen, sushi, terrassen eller festen. Korte guider om druer, regioner og meget mere.",
    date: "2026-07-01",
    orderHref: "https://www.vinbot.dk/",
    image: "/images/ol-vin/post-vinbot-og.jpg",
    ctaLabel: "Besøg Vinbot",
    imageFit: "cover",
    merchant: "Vinbot",
    affiliate: false,
  },
  {
    id: "2026-06-16-immortalis-priorat",
    title: "Denne vin skal bare prøves!",
    excerpt:
      "Immortalis Priorat — fyldig spansk rødvin med mørke bær og krydderier. Nu kun 149 kr. (før 199 kr.). Bonus: 10% rabat ved tilmelding til Lauridsen Vines nyhedsbrev.",
    date: "2026-06-16",
    orderHref: olVinOrderLink(
      PARTNER_ADS_KLIK_BANNERS.lauridsenVine,
      IMMORTALIS_PRIORAT_PRODUCT,
      "olvin-fb-immortalis-jun16",
    ),
    image: "/images/ol-vin/post-immortalis-priorat.jpg",
    merchant: "Lauridsen Vine",
    affiliate: true,
  },
  {
    id: "2026-06-02-nebbiolo",
    title: "Konkurrence – vind 2 flasker fantastisk Nebbiolo!",
    excerpt:
      "Langhe Nebbiolo La Farghetta 2021 fra Piemonte. Vinen kan også købes hos Den Sidste Flaske — autentisk Nebbiolo med kirsebær, rose og klassisk struktur.",
    date: "2026-06-02",
    orderHref: vinbotPath("/den-sidste-flaske/vin/langhe-nebbiolo-la-farghetta-2021"),
    image: "/images/ol-vin/post-nebbiolo-bottle.webp",
    ctaLabel: "Læs på Vinbot",
    merchant: "Den Sidste Flaske",
    affiliate: false,
  },
];

export { facebookOlVinUrl };
