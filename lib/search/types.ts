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
  price: number | null;
  currency: string;
  image: string;
  url: string;
  _search: string;
};

export type ProductHit = Omit<FeedProduct, "image"> & { image: string | null };

export type SearchMeta = {
  feeds_total: number;
  feeds_ok: number;
  feeds_failed: number;
  priceMin: number | null;
  priceMax: number | null;
};

export type SearchResult = {
  source: "feed" | "fallback" | "error";
  products: ProductHit[];
  meta: SearchMeta;
};
