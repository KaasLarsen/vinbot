/** Lokale logoer under /public/images/merchants — favicon/site-logo hvor muligt. */
export type MerchantLogo = {
  src: string;
  /** true = logo er hvidt/lys og skal have mørk baggrund. */
  onDark?: boolean;
  /** Bredt wordmark vs kvadratisk ikon. */
  wide?: boolean;
};

export const MERCHANT_LOGOS: Record<string, MerchantLogo> = {
  "den-sidste-flaske": { src: "/images/merchants/den-sidste-flaske.png" },
  "lauridsen-vine": { src: "/images/merchants/lauridsen-vine.png", wide: true },
  "winther-vin": { src: "/images/merchants/winther-vin.jpg", wide: true },
  "dh-wines": { src: "/images/merchants/dh-wines.png", wide: true },
  "johnsen-wine": { src: "/images/merchants/johnsen-wine.png" },
  "havnens-vin": { src: "/images/merchants/havnens-vin.png" },
  "sps-wine": { src: "/images/merchants/sps-wine.png", onDark: true, wide: true },
  winefriends: { src: "/images/merchants/winefriends.png" },
  barlife: { src: "/images/merchants/barlife.png" },
  "d-wine": { src: "/images/merchants/d-wine.png" },
  gourmetshoppen: { src: "" }, // monogram
  "westjysk-smag": { src: "" },
  winesommelier: { src: "/images/merchants/winesommelier.jpg" },
  "bottles-with-history": { src: "/images/merchants/bottles-with-history.png" },
  "8wines": { src: "/images/merchants/eight-wines.png" },
  "wine-store": { src: "/images/merchants/wine-store.png" },
  vinpalle: { src: "/images/merchants/vinpalle.png" },
  whiskystack: { src: "/images/merchants/whiskystack.png" },
  "beer-me": { src: "/images/merchants/beer-me.png" },
  /** BF-oversigt: outsiders uden fil endnu → monogram. */
  "philipson-wine": { src: "" },
  "theis-vine": { src: "" },
  "kjaer-sommerfeldt": { src: "" },
  "sigurd-muller": { src: "" },
  "poetzsch-wine": { src: "" },
  "hj-hansen-vin": { src: "" },
  vinoble: { src: "" },
  winefamly: { src: "" },
  "laudrup-vin": { src: "" },
  "erik-sorensen-vin": { src: "" },
  "jysk-vin": { src: "" },
  "skjold-burne": { src: "" },
  supervin: { src: "" },
  vildmedvin: { src: "" },
  vinmedmere: { src: "" },
  "andrup-vin": { src: "" },
  "bichel-vine": { src: "" },
  "holte-vinlager": { src: "" },
  "vin-og-vin": { src: "" },
};

export function getMerchantLogo(slug: string): MerchantLogo | null {
  const logo = MERCHANT_LOGOS[slug];
  if (!logo?.src) return null;
  return logo;
}

/** Gradient-accents til logo-bands (directory + hub-hero). */
export const MERCHANT_ACCENTS = [
  "from-rose-900/90 to-stone-800",
  "from-amber-900/85 to-stone-800",
  "from-stone-800 to-rose-950",
  "from-rose-800 to-amber-950",
  "from-stone-700 to-stone-900",
] as const;

export function merchantAccentForSlug(slug: string): (typeof MERCHANT_ACCENTS)[number] {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h + slug.charCodeAt(i) * (i + 1)) % MERCHANT_ACCENTS.length;
  return MERCHANT_ACCENTS[h];
}

/** Initialer til monogram-fallback (max 2 tegn). */
export function merchantMonogram(displayName: string): string {
  const cleaned = displayName.replace(/[’']/g, "").trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return cleaned.slice(0, 2).toUpperCase();
}
