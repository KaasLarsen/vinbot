import { facebookOlVinUrl } from "@/lib/site";

/**
 * Kuraterede opslag fra Øl & Vin på Facebook.
 * Tilføj nye øverst. `href` bør være direkte link til opslaget, når du har det;
 * ellers bruges Facebook-siden. Læg gerne billede i /public/images/ol-vin/ og sæt `image`.
 */
export type OlVinFacebookPost = {
  id: string;
  /** Kort overskrift / første linje */
  title: string;
  /** Brødtekst vist på kortet */
  excerpt: string;
  /** ISO-dato (YYYY-MM-DD) til sortering/visning */
  date: string;
  /** Direkte Facebook-opslag eller siden */
  href: string;
  /** Valgfri lokal sti, fx /images/ol-vin/tilbud-marts.jpg */
  image?: string | null;
};

export const OL_VIN_FACEBOOK_POSTS: OlVinFacebookPost[] = [
  {
    id: "2026-07-weekend-tilbud",
    title: "Weekendens vin-tilbud",
    excerpt:
      "Vi har samlet de skarpeste nedsættelser lige nu — rød, hvid og bobler fra danske netbutikker. Se mere på Vinbot og følg med her for næste runde.",
    date: "2026-07-25",
    href: facebookOlVinUrl,
    image: null,
  },
  {
    id: "2026-07-foer-pris",
    title: "Er «før-prisen» altid reel?",
    excerpt:
      "En høj rabatprocent ser godt ud — men slutprisen er det, der tæller. Vi deler tips til at spotte de gode handler (og undgå de dårlige).",
    date: "2026-07-18",
    href: facebookOlVinUrl,
    image: null,
  },
  {
    id: "2026-07-under-150",
    title: "Gode flasker under 150 kr",
    excerpt:
      "Hverdagsvin behøver ikke være kedelig. Her er fund under 150 kr med reel nedsættelse — perfekt til mad, hygge og gæster midt på ugen.",
    date: "2026-07-11",
    href: facebookOlVinUrl,
    image: null,
  },
  {
    id: "2026-07-sammenlign",
    title: "Samme flaske, forskellig pris",
    excerpt:
      "Nogle gange er den bedste «tilbud» ikke procenten i én shop, men at en anden forhandler er markant billigere på samme vin. Det tjekker vi på Vinbot.",
    date: "2026-07-04",
    href: facebookOlVinUrl,
    image: null,
  },
  {
    id: "2026-06-foelg",
    title: "Følg Øl & Vin",
    excerpt:
      "Få vin-tilbud, tips og små fund direkte i dit Facebook-feed. Vi poster, når der er noget værd at kigge på — uden støj.",
    date: "2026-06-28",
    href: facebookOlVinUrl,
    image: null,
  },
];
