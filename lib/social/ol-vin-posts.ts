import { PARTNER_ADS_KLIK_BANNERS, partnerAdsKlikUrl } from "@/lib/partner-ads-links";
import { facebookOlVinUrl } from "@/lib/site";

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
  /** Partner-Ads klik til butik (vinbot-ejet uid — ikke Facebook-kampagnelink). */
  orderHref: string;
  /** Billede fra opslaget under /public */
  image: string;
  /** CTA-knaptekst (standard: Bestil her) */
  ctaLabel?: string;
  /** object-fit for billedet (standard: contain til flaskebilleder) */
  imageFit?: "contain" | "cover";
  /** Merchant-navn til analytics på Bestil her-klik. */
  merchant?: string;
};

const BOCCANTINO_PRODUCT =
  "https://densidsteflaske.dk/products/primitivo-susumaniello-salento-boccantino-2024";

const RIESLING_PRODUCT = "https://densidsteflaske.dk/products/alte-reben-riesling-trocken-2022";

const GUVNOR_ROSE_PRODUCT = "https://densidsteflaske.dk/products/the-guv-nor-rose";

const IMMORTALIS_PRIORAT_PRODUCT = "https://lauridsenvine.dk/products/immortalis-priorat";

const NEBBIOLO_PRODUCT = "https://densidsteflaske.dk/products/langhe-nebbiolo-la-farghetta-2021";

/** Unik Partner-Ads uid pr. opslag (må ikke indeholde `/`). */
function olVinOrderLink(bannerId: string, productUrl: string, trackingUid: string): string {
  return partnerAdsKlikUrl(bannerId, productUrl, trackingUid);
}

export const OL_VIN_FACEBOOK_POSTS: OlVinFacebookPost[] = [
  {
    id: "2026-07-17-guvnor-rose",
    title: "Prisvindende rosé til en vild pris!",
    excerpt:
      "Kun 55 kr. pr. flaske ved køb af 12 flasker (normalpris 109 kr.). The Guv'nor Rosé — frisk spansk rosé med jordbær, ribs og citrus. Perfekt til terrasse, tapas og fisk.",
    date: "2026-07-17",
    orderHref: olVinOrderLink(PARTNER_ADS_KLIK_BANNERS.denSidsteFlaske, GUVNOR_ROSE_PRODUCT, "olvin-fb-guvnor-rose"),
    image: "/images/ol-vin/post-guvnor-rose-bottle.png",
    merchant: "Den Sidste Flaske",
  },
  {
    id: "2026-07-17-riesling",
    title: "Fantastisk tysk Riesling til en vanvittig pris!",
    excerpt:
      "Kun 55 kr. pr. flaske ved køb af 12 flasker (normalpris 119 kr.). Frisk, sprød og tør Riesling med citrus, grønne æbler og mineralitet — perfekt til fisk, skaldyr og terrassen.",
    date: "2026-07-17",
    orderHref: olVinOrderLink(PARTNER_ADS_KLIK_BANNERS.denSidsteFlaske, RIESLING_PRODUCT, "olvin-fb-riesling-jul17"),
    image: "/images/ol-vin/post-riesling-bottle.png",
    merchant: "Den Sidste Flaske",
  },
  {
    id: "2026-07-17-boccantino",
    title: "Måske den bedste rødvin, du kan købe til 55 kr.!",
    excerpt:
      "Kun 55 kr. pr. flaske ved køb af 12 flasker (normalpris 109 kr.). Boccantino Primitivo & Susumaniello — fyldig, blød og frugtig italiensk rødvin.",
    date: "2026-07-17",
    orderHref: olVinOrderLink(PARTNER_ADS_KLIK_BANNERS.denSidsteFlaske, BOCCANTINO_PRODUCT, "olvin-fb-boccantino-jul17"),
    image: "/images/ol-vin/post-boccantino-bottle.png",
    merchant: "Den Sidste Flaske",
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
  },
  {
    id: "2026-06-02-nebbiolo",
    title: "Konkurrence – vind 2 flasker fantastisk Nebbiolo!",
    excerpt:
      "Langhe Nebbiolo La Farghetta 2021 fra Piemonte. Vinen kan også købes hos vores partner Den Sidste Flaske — autentisk Nebbiolo med kirsebær, rose og klassisk struktur.",
    date: "2026-06-02",
    orderHref: olVinOrderLink(PARTNER_ADS_KLIK_BANNERS.denSidsteFlaske, NEBBIOLO_PRODUCT, "olvin-fb-nebbiolo-jun2"),
    image: "/images/ol-vin/post-nebbiolo-bottle.png",
    merchant: "Den Sidste Flaske",
  },
];

export { facebookOlVinUrl };
