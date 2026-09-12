export type PlaMerchantId = "sps-wine" | "dh-wines" | "lauridsen-vine";

export type PlaCatalogItem = {
  offerId: string;
  slug: string;
  merchantId: PlaMerchantId;
  title: string;
  description: string;
  brand: string;
  category: string;
  gtin: string | null;
  mpn: string | null;
  /** Aktuel pris (kampagnepris hvis på tilbud). */
  price: number;
  /** Før-pris når produktet er på tilbud. */
  referencePrice?: number;
  discountPercent?: number;
  currency: string;
  imageUrl: string;
  shopUrl: string;
  feedUrl: string;
};
