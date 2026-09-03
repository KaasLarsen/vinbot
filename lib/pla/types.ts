export type PlaCatalogItem = {
  slug: string;
  merchantId: "sps-wine";
  title: string;
  description: string;
  brand: string;
  category: string;
  gtin: string | null;
  mpn: string | null;
  price: number;
  currency: string;
  imageUrl: string;
  shopUrl: string;
  feedUrl: string;
};
