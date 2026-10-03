export type GuideFrontmatter = {
  title: string;
  description: string;
  slug: string;
  tags: string[];
  /** Seneste væsentlige opdatering (ISO-dato, fx YYYY-MM-DD). */
  updated: string;
  /** Første publicering; udelades = antages samme som `updated`. */
  published?: string;
  hub?: string;
  /** Drue/stil til feed-søgning. Bruges i stedet for slug-fallback, når den er sat. */
  searchQuery?: string;
};
