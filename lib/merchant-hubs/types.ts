import type { MerchantWineId } from "@/lib/wine-detail-pages/merchants";

export type MerchantHubFaq = {
  question: string;
  answer: string;
};

export type MerchantHubGuideLink = {
  href: string;
  label: string;
};

export type MerchantHubProductSection = {
  title: string;
  queries: string[];
  placement: string;
};

export type MerchantHubAffiliate =
  | { kind: "partner-ads"; bannerId: string; shopUrl: string }
  | { kind: "daisycon"; shopHref: string }
  | { kind: "direct"; shopUrl: string }
  /** Flaske-CTA’er tracked via feed; ingen shop-landing med tracking. */
  | { kind: "feed-only" };

export type MerchantHubConfig = {
  slug: string;
  /** Visningsnavn (H1, footer, indeks). */
  displayName: string;
  /** Eksakt merchant-navn i produktfeed (null = ingen merchant-filter, fx DSF). */
  feedMerchant: string | null;
  blurb: string;
  title: string;
  description: string;
  /** 2–4 afsnit — plain tekst; interne links håndteres i template via guideLinks. */
  introParagraphs: string[];
  matchHeading: string;
  matchBullets: string[];
  guideLinks: MerchantHubGuideLink[];
  shopCtaLabel: string;
  shopIntro: string;
  showRabatkoderLink?: boolean;
  /** Kuraterede picks (Partner-Ads wine-detail merchants). */
  featuredWineId?: MerchantWineId;
  /** Den Sidste Flaske har egne featured picks uden feed. */
  showDsfFeatured?: boolean;
  productIntro: string;
  productSections: MerchantHubProductSection[];
  faq: MerchantHubFaq[];
  affiliate: MerchantHubAffiliate;
};
