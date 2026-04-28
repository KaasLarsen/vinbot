/**
 * Vin-produktsider (hub /vine) — adskilt fra forsøgning (runSearch).
 *
 * ID-strategi (MVP): primært GTIN/EAN når feeds leverer det; ellers stabil signatur-hash
 * af (brand + titel uden årgang). Kan udvides med manuel merge senere.
 *
 * Ratings: ingen kopierede Vivino-tal på sitet — kun valgfrit link til Vivinos søgning
 * (ingen licenskrav til deres logo/tal). Redaktionelle stjerner kan tilføjes i CMS senere.
 */

export type VineOffer = {
  merchant: string;
  price: number | null;
  currency: string;
  url: string;
  /** Oprindelig listetitel fra forhandleren. */
  listingTitle: string;
};

export type CanonicalWine = {
  /** Intern nøgle, fx gtin:xxxx eller sig:hex */
  id: string;
  /** URL-slug (unik). */
  slug: string;
  /** Vist navn (typisk den korteste matchende titel). */
  displayTitle: string;
  brand: string;
  category: string;
  image: string | null;
  gtin: string | null;
  offers: VineOffer[];
  /** Seneste pris-opdatering (server). */
  updated: string;
};

export type WineCatalog = {
  wines: CanonicalWine[];
  offerCount: number;
  /** ISO */
  generatedAt: string;
};
