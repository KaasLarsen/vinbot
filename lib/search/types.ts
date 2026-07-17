export type FeedProduct = {
  merchant: string;
  title: string;
  desc: string;
  category: string;
  brand: string;
  /** Oprindelig stregkode/GTIN/EAN/UPC (kun cifre), hvis feed leverer det — bruges til vin-samlings-sider. */
  gtin: string | null;
  /** Producent-/modelnr. nogle feeds — sekundær nøgle. */
  mpn: string | null;
  /** Nuværende/kampagnepris — alias for salePrice (bagudkompatibilitet med søgning). */
  price: number | null;
  salePrice: number | null;
  /** Før-pris / listepris fra feed, hvis tilgængelig. */
  referencePrice: number | null;
  /** Beregnet rabat i procent når referencePrice > salePrice (min. 5 %). */
  discountPercent: number | null;
  currency: string;
  image: string;
  url: string;
  _search: string;
};

export type ProductHit = Omit<FeedProduct, "image"> & { image: string | null };

export type DealHit = ProductHit & {
  referencePrice: number;
  discountPercent: number;
};

export type SearchMeta = {
  feeds_total: number;
  feeds_ok: number;
  feeds_failed: number;
  priceMin: number | null;
  priceMax: number | null;
  /** Antal match før `.slice(0, 48)` — til “48+” i UI. */
  matched_before_cap: number;
  results_capped: boolean;
};

export type SearchResult = {
  source: "feed" | "fallback" | "error";
  products: ProductHit[];
  meta: SearchMeta;
};
