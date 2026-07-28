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
};

const BOCCANTINO_PRODUCT =
  "https://densidsteflaske.dk/products/primitivo-susumaniello-salento-boccantino-2024";

const RIESLING_PRODUCT = "https://densidsteflaske.dk/products/alte-reben-riesling-trocken-2022";

export const OL_VIN_FACEBOOK_POSTS: OlVinFacebookPost[] = [
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
];

export { facebookOlVinUrl };
