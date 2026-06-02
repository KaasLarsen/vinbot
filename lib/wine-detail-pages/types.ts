import type { MerchantWineId } from "@/lib/wine-detail-pages/merchants";

export type WineDetailGuideRef = {
  slug: string;
  /** Overskriver linktekst — ellers bruges guidens titel fra frontmatter. */
  anchorText?: string;
};

export type WineDetailSpec = { label: string; value: string };

/** Pris pr. flaske ved kasse/køb af N flasker (fx DSF 6/12). */
export type WineDetailVolumePrice = {
  bottles: number;
  pricePerBottle: number;
};

/** Indhold direkte under produktfoto (venstre kolonne). */
export type WineDetailAside = {
  heading: string;
  readonly bullets: readonly string[];
  footnote?: string;
};

export type WineDetailFoodPairing = {
  heading: string;
  lead?: string;
  readonly dishes: readonly string[];
  lessIdeal?: string;
};

export type WineDetailPage = {
  merchantId: MerchantWineId;
  slug: string;
  displayTitle: string;
  metaDescription: string;
  /** Rå produkt-URL — normaliseres via merchant-config ved lookup. */
  productPageUrl: string;
  imageUrl?: string;
  additionalGalleryImageUrls?: readonly string[];
  imageAside?: WineDetailAside;
  listPrice?: number;
  priceCurrency?: string;
  /** Valgfri kassepriser — vises som «X kr/fl» ved 6, 12 osv. */
  volumePrices?: readonly WineDetailVolumePrice[];
  structuredDescriptionSnippet?: string;
  bodyParagraphs: string[];
  foodPairing?: WineDetailFoodPairing;
  specs: readonly WineDetailSpec[];
  guideRefs: readonly WineDetailGuideRef[];
};

export type WineDetailFeaturedPick = {
  merchantId: MerchantWineId;
  title: string;
  blurb?: string;
  productUrl: string;
  imageUrl?: string;
  listPrice?: number;
  priceCurrency?: string;
  volumePrices?: readonly WineDetailVolumePrice[];
  directLink?: boolean;
};
