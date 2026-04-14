/**
 * Håndplukkede flasker fra Den Sidste Flaske på DSF-siden.
 * Udfyld listen — når den er tom, vises sektionen ikke.
 *
 * @example
 * {
 *   title: "Champagne X",
 *   blurb: "Tør, mineralsk — perfekt som aperitif.",
 *   productUrl: "https://densidsteflaske.dk/products/dit-slug",
 *   imageUrl: "https://cdn.shopify.com/...", // valgfrit
 * }
 */
export type DsfFeaturedPick = {
  title: string;
  blurb?: string;
  /** Fuld produktside-URL på densidsteflaske.dk */
  productUrl: string;
  imageUrl?: string;
  /** Sæt true for at linke direkte uden Partner-Ads (fx lokal test) */
  directLink?: boolean;
};

export const dsfFeaturedPicks: DsfFeaturedPick[] = [
  {
    title: "Primitivo Susumaniello Salento Boccantino 2025",
    blurb: "Folkets favorit fra Salento — primitivo og susumaniello, blød bærfrugt og god til både pasta og grill.",
    productUrl: "https://densidsteflaske.dk/products/primitivo-susumaniello-salento-boccantino-2024",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0076/1515/2192/files/primitivo-susumaniello-salento-boccantino-2024-boccantino-rodvin-1190752698.png?v=1756829918",
  },
  {
    title: "Weinhof 519 Alte Reben Rheingau Riesling Trocken 2025",
    blurb: "Riesling fra gamle vinstokke i Rheingau — sprød frugt, syre og mineralitet til hverdag og gæster.",
    productUrl: "https://densidsteflaske.dk/products/alte-reben-riesling-trocken-2022",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0076/1515/2192/files/weinhof-519-alte-reben-rheingau-riesling-trocken-2024-weinhof-519-hvidvin-1166619551.png?v=1747124324",
  },
  {
    title: "Weinhof 519 Alte Reben Rosé 2025",
    blurb: "Samme Rheingau-hus som Alte Reben-hvidvinen — tør rosé med saft og syre til lækre salater, fisk og sommer på terrassen.",
    productUrl: "https://densidsteflaske.dk/products/alte-reben-rose-weinhof-519-2024",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0076/1515/2192/files/weinhof-519-alte-reben-rose-2025-weinhof-519-rose-1224966837.png?v=1772641270",
  },
  {
    title: "The Guv'nor Tinto",
    blurb: "Spansk rød med kant — ligetil, frugtig og oplagt til tapas, pølser og aftener uden snobberi.",
    productUrl: "https://densidsteflaske.dk/products/the-guv-nor-tinto",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0076/1515/2192/files/the-guv-nor-tinto-felix-solis-avantis-rodvin-1172580197.png?v=1749550958",
  },
];
