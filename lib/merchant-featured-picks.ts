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
  {
    merchantId: "den-sidste-flaske",
    title: "Saint-Amour Beaujolais 2022",
    blurb: "Gamay fra Beaujolais cru — saft, syre og blød struktur til kylling og charcuteri.",
    productUrl: "https://densidsteflaske.dk/products/saint-amour-beaujolais-2022",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0076/1515/2192/files/saint-amour-beaujolais-2022-den-sidste-flaske-1150005030.png?v=1742557488",
    listPrice: 159,
    priceCurrency: "DKK",
  },
  {
    merchantId: "den-sidste-flaske",
    title: "Corte Antica Barbera d'Asti 2022",
    blurb: "Barbera med syre og mørk frugt — piemontesisk hverdagsrød til pasta og pizza.",
    productUrl: "https://densidsteflaske.dk/products/corte-antica-barbera-dasti",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0076/1515/2192/files/corte-antica-barbera-d-asti-den-sidste-flaske-1224924399.png?v=1772623389",
    listPrice: 145,
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
  {
    merchantId: "lauridsen-vine",
    title: "Immortalis Albariño",
    blurb: "Albariño med citrus og syre — sprød hvidvin til fisk, skaldyr og sommerretter.",
    productUrl: "https://lauridsenvine.dk/products/immortalis-albarino-2021",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0712/8101/7152/files/3064936-2022.w1200.webp?v=1693494754",
    listPrice: 199,
    priceCurrency: "DKK",
  },
  {
    merchantId: "lauridsen-vine",
    title: "Serendipia Cava Reserva Brut",
    blurb: "Cava reserva brut — tør perlende vin til tapas, forret og fest.",
    productUrl: "https://lauridsenvine.dk/products/serendipia-cava-reserva-brut",
    imageUrl: "https://cdn.shopify.com/s/files/1/0712/8101/7152/files/cava.webp?v=1765533144",
    listPrice: 209,
    priceCurrency: "DKK",
  },
  {
    merchantId: "lauridsen-vine",
    title: "Immortalis Priorat",
    blurb: "Priorat med koncentreret bær og mineralitet — spansk rød til lam og grill.",
    productUrl: "https://lauridsenvine.dk/products/immortalis-priorat",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0712/8101/7152/products/Immortalispriorat_720x_e5607652-8d64-4772-9afe-7cbfeebb4323.jpg?v=1680090044",
    listPrice: 149,
    priceCurrency: "DKK",
  },
  {
    merchantId: "lauridsen-vine",
    title: "Châteauneuf-du-Pape Le Parvis",
    blurb: "Rhône-klassiker med krydret bær og varme — til lam og gryderetter.",
    productUrl: "https://lauridsenvine.dk/products/chateauneuf-du-pape-le-parvis",
    imageUrl: "https://cdn.shopify.com/s/files/1/0712/8101/7152/files/pape.webp?v=1765466791",
    listPrice: 389,
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
  {
    merchantId: "winther-vin",
    title: "Tenuta Garetto Barbera d'Asti",
    blurb: "Barbera d'Asti med syre og mørk frugt — piemontesisk hverdagsrød til pasta.",
    productUrl: "https://winthervin.dk/shop/tenuta-garetto-rosina-barbera-dasti-2019-75-cl/",
    imageUrl: "https://winthervin.dk/wp-content/uploads/2023/02/Design-uden-navn-19.png",
    listPrice: 149,
    priceCurrency: "DKK",
  },
  {
    merchantId: "winther-vin",
    title: "Marcel Deiss Gewürztraminer Alsace",
    blurb: "Aromatisk gewürztraminer til asiatisk mad, krydderi og modne oste.",
    productUrl: "https://winthervin.dk/shop/marcel-deiss-gewurztraminer-2015-alsace-aoc/",
    imageUrl:
      "https://winthervin.dk/wp-content/uploads/2021/03/MArcel_deiss_gewurztraminer_winthervin.png",
    listPrice: 319,
    priceCurrency: "DKK",
  },
  {
    merchantId: "winther-vin",
    title: "Marlborough Sun Sauvignon Blanc 2023",
    blurb: "NZ sauvignon med tropisk frugt og syre — sommer-hvid til fisk og salat.",
    productUrl: "https://winthervin.dk/shop/marlborough-sun-sauvignon-blanc-2022-75-cl/",
    imageUrl: "https://winthervin.dk/wp-content/uploads/2023/04/Design-uden-navn-15.png",
    listPrice: 159,
    priceCurrency: "DKK",
  },
  {
    merchantId: "winther-vin",
    title: "Opi Malbec Reserve 2021",
    blurb: "Argentinsk malbec med mørk frugt — oplagt til grill og burger.",
    productUrl: "https://winthervin.dk/shop/opi-malbec-reserve-2019/",
    imageUrl: "https://winthervin.dk/wp-content/uploads/2021/02/Design-uden-navn-8.png",
    listPrice: 199,
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
  {
    merchantId: "dh-wines",
    title: "Mauro Sebaste Barbera Nizza 2020",
    blurb: "Premium barbera fra Nizza DOCG — dybde og syre til pasta og kød.",
    productUrl: "https://dhwines.dk/products/mauro-sebaste-barbera-nizza-costemonhisio-2020",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0816/5435/0170/files/mauro-sebaste-barbera-nizza-costemonhisio-2020-226696.jpg?v=1779432681",
    listPrice: 224,
    priceCurrency: "DKK",
  },
  {
    merchantId: "dh-wines",
    title: "Mille Vite Langhe Nebbiolo 2021",
    blurb: "Langhe nebbiolo med kirsebær og struktur — piemontesisk rød til pasta og svampe.",
    productUrl: "https://dhwines.dk/products/mille-vite-langhe-nebbiolo-doc-2021",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0816/5435/0170/products/mille-vite-langhe-nebbiolo-doc-2021-739801.jpg?v=1779432607",
    listPrice: 206,
    priceCurrency: "DKK",
  },
  {
    merchantId: "dh-wines",
    title: "Kaiken Malbec Estate 2022 Mendoza",
    blurb: "Mendoza malbec med mørk frugt — budgetvenlig rød til grill og burger.",
    productUrl: "https://dhwines.dk/products/malbec-kaiken-estate-2022-mendoza",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0816/5435/0170/files/Kaiken-Estate-Malbec.jpg?v=1752578663",
    listPrice: 109,
    priceCurrency: "DKK",
  },
  {
    merchantId: "dh-wines",
    title: "Viña Salceda Crianza Rioja 2021",
    blurb: "Rioja crianza med tempranillo — moden frugt til tapas og steg.",
    productUrl: "https://dhwines.dk/products/vina-salceda-crianza-2021-rioja",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0816/5435/0170/files/Vina-Salceda-Ceianza.jpg?v=1755360233",
    listPrice: 129,
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
  {
    merchantId: "johnsen-wine",
    title: "Pesquera Crianza Ribera del Duero 2021",
    blurb: "Klassisk Ribera crianza — tempranillo med struktur til steg og gryde.",
    productUrl: "https://www.johnsenwine.dk/produkt/2021-pesquera-crianza-ribera-del-duero/",
    imageUrl: "https://www.johnsenwine.dk/wp-content/uploads/2026/01/57601321.jpeg",
    listPrice: 200,
    priceCurrency: "DKK",
  },
  {
    merchantId: "johnsen-wine",
    title: "Telmo Rodriguez Gazur Ribera del Duero 2022",
    blurb: "Frugtig Ribera-tempranillo til tapas, grill og spansk hverdag.",
    productUrl: "https://www.johnsenwine.dk/produkt/2022-gazur-ribera-del-duero-telmo-rodriguez/",
    imageUrl: "https://www.johnsenwine.dk/wp-content/uploads/2026/01/56471322.jpeg",
    listPrice: 170,
    priceCurrency: "DKK",
  },
  {
    merchantId: "johnsen-wine",
    title: "Château de la Roulerie Chenin Blanc 2024",
    blurb: "Loire chenin med syre og honning — alsidig hvid til ost og gris.",
    productUrl: "https://www.johnsenwine.dk/produkt/2024-chenin-blanc-chateau-de-la-roulerie/",
    imageUrl:
      "https://www.johnsenwine.dk/wp-content/uploads/2025/06/0130392_Roulerie_CHENIN_BLANC_OeKO.jpg",
    listPrice: 199,
    priceCurrency: "DKK",
  },
  {
    merchantId: "johnsen-wine",
    title: "Rio Cassero Brunello di Montalcino 2020",
    blurb: "Brunello med sangiovese grosso — struktur til pasta, lam og ost.",
    productUrl: "https://www.johnsenwine.dk/produkt/2020-rio-cassero-brunello-di-montalcino/",
    imageUrl: "https://www.johnsenwine.dk/wp-content/uploads/2026/02/a_0_0_341_0_0-2.jpeg",
    listPrice: 249,
    priceCurrency: "DKK",
  },
];

export function getFeaturedPicksForMerchant(merchantId: MerchantWineId): MerchantFeaturedPick[] {
  return MERCHANT_FEATURED_PICKS.filter((p) => p.merchantId === merchantId);
}

export function dsfFeaturedPicks(): MerchantFeaturedPick[] {
  return getFeaturedPicksForMerchant("den-sidste-flaske");
}
