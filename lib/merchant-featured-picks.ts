import type { MerchantWineId } from "@/lib/wine-detail-pages/merchants";
import type { WineDetailFeaturedPick } from "@/lib/wine-detail-pages/types";

export type MerchantFeaturedPick = WineDetailFeaturedPick;

export const MERCHANT_FEATURED_PICKS: MerchantFeaturedPick[] = [
  // Den Sidste Flaske
  {
    merchantId: "den-sidste-flaske",
    title: "Primitivo Susumaniello Salento Boccantino 2025",
    blurb: "Folkets favorit fra Salento — primitivo og susumaniello, blød bærfrugt og god til både pasta og grill.",
    productUrl: "https://densidsteflaske.dk/products/primitivo-susumaniello-salento-boccantino-2024",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0076/1515/2192/files/primitivo-susumaniello-salento-boccantino-2024-boccantino-rodvin-1190752698.png?v=1756829918",
    listPrice: 79,
    priceCurrency: "DKK",
  },
  {
    merchantId: "den-sidste-flaske",
    title: "Weinhof 519 Alte Reben Rheingau Riesling Trocken 2025",
    blurb: "Riesling fra gamle vinstokke i Rheingau — sprød frugt, syre og mineralitet til hverdag og gæster.",
    productUrl: "https://densidsteflaske.dk/products/alte-reben-riesling-trocken-2022",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0076/1515/2192/files/weinhof-519-alte-reben-rheingau-riesling-trocken-2024-weinhof-519-hvidvin-1166619551.png?v=1747124324",
    listPrice: 119,
    priceCurrency: "DKK",
  },
  {
    merchantId: "den-sidste-flaske",
    title: "Weinhof 519 Alte Reben Rosé 2025",
    blurb: "Tør rosé fra Rheingau — saft, syre og sommerstemning til salater, fisk og terrasse.",
    productUrl: "https://densidsteflaske.dk/products/alte-reben-rose-weinhof-519-2024",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0076/1515/2192/files/weinhof-519-alte-reben-rose-2025-weinhof-519-rose-1224966837.png?v=1772641270",
    listPrice: 119,
    priceCurrency: "DKK",
  },
  {
    merchantId: "den-sidste-flaske",
    title: "The Guv'nor Tinto",
    blurb: "Spansk rød med kant — ligetil, frugtig og oplagt til tapas, pølser og aftener uden snobberi.",
    productUrl: "https://densidsteflaske.dk/products/the-guv-nor-tinto",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0076/1515/2192/files/the-guv-nor-tinto-felix-solis-avantis-rodvin-1172580197.png?v=1749550958",
    listPrice: 109,
    priceCurrency: "DKK",
  },
  {
    merchantId: "den-sidste-flaske",
    title: "Spritz & Roll Aperitivo Originale",
    blurb: "Mousserende aperitivo på flaske — klar til is, skål og let snacking på terrassen.",
    productUrl: "https://densidsteflaske.dk/products/spritz-roll-aperetivo-originale-nv",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0076/1515/2192/files/spritz-roll-aperitivo-originale-nv-spritz-roll-mousserende-1228834449.png?v=1774340289",
    listPrice: 99,
    priceCurrency: "DKK",
  },
  {
    merchantId: "den-sidste-flaske",
    title: "Coli Chianti DOCG 2024",
    blurb: "Klassisk chianti til pasta, pizza og italiensk hverdag — sangiovese med syre og moden kirsebær.",
    productUrl: "https://densidsteflaske.dk/products/coli-chianti-docg-2024",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0076/1515/2192/files/coli-chianti-docg-2024-cantine-coli-rodvin-1167863105.png?v=1747650043",
    listPrice: 119,
    priceCurrency: "DKK",
  },
  // Lauridsen Vine
  {
    merchantId: "lauridsen-vine",
    title: "J. Moreau & Fils · Chablis 1er Cru Vaillons",
    blurb: "Premier cru chablis med mineralsk syre og cremet midte — Bourgogne-hvid til fisk, skaldyr og lyse retter.",
    productUrl: "https://lauridsenvine.dk/products/j-moreau-fils-chablis-1er-cru-vaillons",
    imageUrl: "https://cdn.shopify.com/s/files/1/0712/8101/7152/files/chablis.webp?v=1765394986",
    listPrice: 399,
    priceCurrency: "DKK",
  },
  {
    merchantId: "lauridsen-vine",
    title: "Mommessin Bourgogne Pinot Noir",
    blurb: "Let, elegant pinot fra Bourgogne — hverdagsrød til kylling, svinekød og blød ost.",
    productUrl: "https://lauridsenvine.dk/products/mommessin-bourgogne-pinot-noir",
    imageUrl: "https://cdn.shopify.com/s/files/1/0712/8101/7152/files/pinot.webp?v=1765398614",
    listPrice: 209,
    priceCurrency: "DKK",
  },
  // Winther Vin
  {
    merchantId: "winther-vin",
    title: "Weingut Lenhardt Mehringer Riesling Feinherb 2022",
    blurb: "Halvtør mosel-riesling med saft og syre — alsatisk mad, asiatisk og fede retter med krydderi.",
    productUrl: "https://winthervin.dk/shop/weingut-lenhardt-mehringer-riesling-feinherb-2022/",
    imageUrl:
      "https://winthervin.dk/wp-content/uploads/2023/12/Weingut_Lenhardt_Mehringer_Riesling_Feinherb_winthervin.png",
    listPrice: 149,
    priceCurrency: "DKK",
  },
  {
    merchantId: "winther-vin",
    title: "Château de Colombe · Castillon Côtes de Bordeaux 2021",
    blurb: "Merlot-dominant bordeaux fra Castillon — moden frugt og blød struktur til steg, gryde og ost.",
    productUrl: "https://winthervin.dk/shop/chateau-de-colombe-sainte-castillon-cotes-de-bordeaux-2021/",
    imageUrl: "https://winthervin.dk/wp-content/uploads/2023/05/Design-uden-navn-4.png",
    listPrice: 159,
    priceCurrency: "DKK",
  },
  // DH Wines
  {
    merchantId: "dh-wines",
    title: "Gagliole Chianti Classico Riserva DOCG 2019",
    blurb: "Struktureret chianti classico med dybde og syre — til pasta, bøf og modne oste.",
    productUrl: "https://dhwines.dk/products/gagliole-chianti-classico-riserva-docg-2019",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0816/5435/0170/products/gagliole-chianti-classico-riserva-docg-2019-738488.jpg?v=1779432197",
    listPrice: 188,
    priceCurrency: "DKK",
  },
  {
    merchantId: "dh-wines",
    title: "Borgo Scopeto Chianti Classico Riserva",
    blurb: "Riserva fra Chianti Classico — kirsebær, urter og tanniner der tåler simrede retter.",
    productUrl: "https://dhwines.dk/products/borgo-scopeto-2019-chianti-classico-riserva",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0816/5435/0170/products/borgo-scopeto-2019-chianti-classico-riserva-608783.jpg?v=1779431866",
    listPrice: 179,
    priceCurrency: "DKK",
  },
  // Johnsen Wine
  {
    merchantId: "johnsen-wine",
    title: "Bodegas Ondarre · Rioja Reserva 2020",
    blurb: "Klassisk reserva-rioja med moden frugt og blød fad — til lam, steg og tapas.",
    productUrl: "https://www.johnsenwine.dk/produkt/2020-rioja-reserva-bodegas-ondarre/",
    imageUrl: "https://www.johnsenwine.dk/wp-content/uploads/2025/12/57501320-1-1.jpeg",
    listPrice: 115,
    priceCurrency: "DKK",
  },
  {
    merchantId: "johnsen-wine",
    title: "Bodegas Montebaco · Parcela Cara Norte Ribera del Duero 2021",
    blurb: "100 % tempranillo fra høj mark i Ribera — mørk bærfrugt og struktur til grill og okse.",
    productUrl: "https://www.johnsenwine.dk/produkt/parcela-cara-norte-ribera-del-duero-bodegas-montebaco-2021/",
    imageUrl: "https://www.johnsenwine.dk/wp-content/uploads/2026/01/montebaco.png",
    listPrice: 195,
    priceCurrency: "DKK",
  },
];

export function getFeaturedPicksForMerchant(merchantId: MerchantWineId): MerchantFeaturedPick[] {
  return MERCHANT_FEATURED_PICKS.filter((p) => p.merchantId === merchantId);
}

export function dsfFeaturedPicks(): MerchantFeaturedPick[] {
  return getFeaturedPicksForMerchant("den-sidste-flaske");
}
