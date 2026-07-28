import { facebookOlVinUrl } from "@/lib/site";

/**
 * Kuraterede opslag fra Øl & Vin på Facebook.
 *
 * Sådan tilføjer du et opslag:
 * 1. Gem screenshot/billede i /public/images/ol-vin/ (fx tilbud-1.jpg)
 * 2. Tilføj objekt øverst i listen med title, excerpt, date, image og gerne direkte href til opslaget
 */
export type OlVinFacebookPost = {
  id: string;
  title: string;
  excerpt: string;
  /** ISO-dato YYYY-MM-DD */
  date: string;
  href: string;
  /** Påkrævet for at vise kortet — lokal sti under /public */
  image: string;
};

/** Tom indtil I lægger rigtige opslags-billeder ind. */
export const OL_VIN_FACEBOOK_POSTS: OlVinFacebookPost[] = [];

export { facebookOlVinUrl };
