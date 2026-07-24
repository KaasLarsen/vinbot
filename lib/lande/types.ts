export type LandContinent = "europa" | "amerika" | "afrika-oceanien";

export type LandRegion = {
  name: string;
  q: string;
  note: string;
  guideSlug?: string;
};

export type LandWineSuggestion = {
  title: string;
  q: string;
};

export type LandFaq = {
  question: string;
  answer: string;
};

export type LandDrueRegionLink = {
  slug: string;
  label: string;
};

/**
 * Struktureret lande-side + søge-synonymer.
 * Long-form ligger stadig i `/guides/vinregion-*` — lande-sider er overblik + shop.
 */
export type LandConfig = {
  slug: string;
  displayName: string;
  continent: LandContinent;
  teaser: string;
  title: string;
  description: string;
  introParagraphs: string[];
  /** Stil, klima, typiske smagsnoter — "kendetegn". */
  kendetegn: string[];
  /**
   * Termer der skal matche product._search (DA/EN/adjektiv).
   * Bruges i expandQuery + intents.
   */
  searchTerms: string[];
  /** Primær søgestreng til live picks (kort). */
  primaryQuery: string;
  wineSuggestions: LandWineSuggestion[];
  regions: LandRegion[];
  deepGuideSlug?: string;
  drueRegionLinks?: LandDrueRegionLink[];
  faq: LandFaq[];
};
