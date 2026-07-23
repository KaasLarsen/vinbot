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
  "mere-om-vin": { src: "/images/merchants/mere-om-vin.png" },
  winefriends: { src: "/images/merchants/winefriends.png" },
  vinea: { src: "/images/merchants/vinea.png" },
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
};

export function getMerchantLogo(slug: string): MerchantLogo | null {
  const logo = MERCHANT_LOGOS[slug];
  if (!logo?.src) return null;
  return logo;
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
