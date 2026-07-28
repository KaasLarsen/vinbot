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
  /** Link når man klikker (typisk Partner-Ads / produkt) */
  href: string;
  /** Billede fra opslaget under /public */
  image: string;
  /** CTA-knaptekst (standard: Bestil her) */
  ctaLabel?: string;
  /** object-fit for billedet (standard: contain til flaskebilleder) */
  imageFit?: "contain" | "cover";
};

const BOCCANTINO_PRODUCT =
  "https://densidsteflaske.dk/products/primitivo-susumaniello-salento-boccantino-2024";

const RIESLING_PRODUCT = "https://densidsteflaske.dk/products/alte-reben-riesling-trocken-2022";

const GUVNOR_ROSE_PRODUCT = "https://densidsteflaske.dk/products/the-guv-nor-rose";

const IMMORTALIS_PRIORAT_PRODUCT = "https://lauridsenvine.dk/products/immortalis-priorat";

export const OL_VIN_FACEBOOK_POSTS: OlVinFacebookPost[] = [
  {
    id: "2026-07-17-guvnor-rose",
    title: "Prisvindende rosé til en vild pris!",
    excerpt:
      "Kun 55 kr. pr. flaske ved køb af 12 flasker (normalpris 109 kr.). The Guv'nor Rosé — frisk spansk rosé med jordbær, ribs og citrus. Perfekt til terrasse, tapas og fisk.",
    date: "2026-07-17",
    href: partnerAdsKlikUrl(PARTNER_ADS_KLIK_BANNERS.denSidsteFlaske, GUVNOR_ROSE_PRODUCT),
    image: "/images/ol-vin/post-guvnor-rose-bottle.png",
  },
  {
    id: "2026-07-17-riesling",
    title: "Fantastisk tysk Riesling til en vanvittig pris!",
    excerpt:
      "Kun 55 kr. pr. flaske ved køb af 12 flasker (normalpris 119 kr.). Frisk, sprød og tør Riesling med citrus, grønne æbler og mineralitet — perfekt til fisk, skaldyr og terrassen.",
    date: "2026-07-17",
    href: partnerAdsKlikUrl(PARTNER_ADS_KLIK_BANNERS.denSidsteFlaske, RIESLING_PRODUCT),
    image: "/images/ol-vin/post-riesling-bottle.png",
  },
  {
    id: "2026-07-17-boccantino",
    title: "Måske den bedste rødvin, du kan købe til 55 kr.!",
    excerpt:
      "Kun 55 kr. pr. flaske ved køb af 12 flasker (normalpris 109 kr.). Boccantino Primitivo & Susumaniello — fyldig, blød og frugtig italiensk rødvin.",
    date: "2026-07-17",
    href: partnerAdsKlikUrl(PARTNER_ADS_KLIK_BANNERS.denSidsteFlaske, BOCCANTINO_PRODUCT),
    image: "/images/ol-vin/post-boccantino-bottle.png",
  },
  {
    id: "2026-07-01-vinbot",
    title: "Er du i tvivl om, hvilken vin du skal vælge?",
    excerpt:
      "På Vinbot.dk kan du blive inspireret og finde den rigtige vin — til bøffen, sushi, terrassen eller festen. Korte guider om druer, regioner og meget mere.",
    date: "2026-07-01",
    href: "https://www.vinbot.dk/",
    image: "/images/ol-vin/post-vinbot-og.jpg",
    ctaLabel: "Besøg Vinbot",
    imageFit: "cover",
  },
  {
    id: "2026-06-16-immortalis-priorat",
    title: "Denne vin skal bare prøves!",
    excerpt:
      "Immortalis Priorat — fyldig spansk rødvin med mørke bær og krydderier. Nu kun 149 kr. (før 199 kr.). Bonus: 10% rabat ved tilmelding til Lauridsen Vines nyhedsbrev.",
    date: "2026-06-16",
    href: partnerAdsKlikUrl(PARTNER_ADS_KLIK_BANNERS.lauridsenVine, IMMORTALIS_PRIORAT_PRODUCT),
    image: "/images/ol-vin/post-immortalis-priorat.jpg",
  },
];

export { facebookOlVinUrl };
