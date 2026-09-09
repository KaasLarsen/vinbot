/**
 * Kurateret PriceRunner-katalog: vintilbehør plus et lille flaske-eksperiment
 * (pairing-guides). productId + compareUrl fra PriceRunner produktsider.
 */
export type PriceRunnerProduct = {
  productId: string;
  title: string;
  category:
    | "vinkoleskab"
    | "vinglas"
    | "karaffel"
    | "proptrekker"
    | "vinreol"
    | "vinprop"
    | "flaskekoeler"
    | "vinudstyr"
    | "vin";
  /** Attribution-link til PriceRunner produktside (nofollow). */
  compareUrl: string;
};

export const priceRunnerProducts = {
  "witt-classic-ef5483i": {
    productId: "3257002512",
    title: "Witt Classic EF5483I-1B48",
    category: "vinkoleskab",
    compareUrl:
      "https://www.pricerunner.dk/pl/480-3257002512/Vinkoeleskabe-Vinskabe/Witt-Classic-Ef5483i-1b48-Sort-Sammenlign-Priser",
  },
  "witt-ef4352i-1b15": {
    productId: "3329373643",
    title: "Witt EF4352I-1B15 (15 flasker)",
    category: "vinkoleskab",
    compareUrl:
      "https://www.pricerunner.dk/pl/480-3329373643/Vinkoeleskabe-Vinskabe/Witt-EF4352I-1B15-Sort-Sammenlign-Priser",
  },
  "witt-wf50128i-2b77": {
    productId: "3329381526",
    title: "Witt WF50128I-2B77 (2 zoner, 77 flasker)",
    category: "vinkoleskab",
    compareUrl:
      "https://www.pricerunner.dk/pl/480-3329381526/Vinkoeleskabe-Vinskabe/Witt-WF50128I-2B77-Sort-Sammenlign-Priser",
  },
  "scandomestic-sv-45-b": {
    productId: "5272254",
    title: "Scandomestic SV 45 B",
    category: "vinkoleskab",
    compareUrl:
      "https://www.pricerunner.dk/pl/480-5272254/Vinkoeleskabe-Vinskabe/Scandomestic-SV-45-B-Sort-Sammenlign-Priser",
  },
  "scandomestic-wc105bg": {
    productId: "3392121004",
    title: "Scandomestic WC105BG (105 flasker)",
    category: "vinkoleskab",
    compareUrl:
      "https://www.pricerunner.dk/pl/480-3392121004/Vinkoeleskabe-Vinskabe/Scandomestic-WC105BG-Vinkoeleskab-105-Flasker-Sort-Sammenlign-Priser",
  },
  "spiegelau-definition-roedvinsglas": {
    productId: "3200245642",
    title: "Spiegelau Definition Rødvinsglas 96 cl (2 stk)",
    category: "vinglas",
    compareUrl:
      "https://www.pricerunner.dk/pl/461-3200245642/Koekkentilbehoer/Spiegelau-Definition-Roedvinsglas-96cl-2stk-Sammenlign-Priser",
  },
  "luigi-bormioli-optica-roedvinsglas": {
    productId: "3200449668",
    title: "Luigi Bormioli Optica Rødvinsglas 70 cl (4 stk)",
    category: "vinglas",
    compareUrl:
      "https://www.pricerunner.dk/pl/461-3200449668/Koekkentilbehoer/Luigi-Bormioli-Optica-Roedvinsglas-70cl-4stk-Sammenlign-Priser",
  },
  "spiegelau-definition-champagneglas": {
    productId: "3200248821",
    title: "Spiegelau Definition Champagneglas 25 cl (2 stk)",
    category: "vinglas",
    compareUrl:
      "https://www.pricerunner.dk/pl/461-3200248821/Koekkentilbehoer/Spiegelau-Definition-Champagneglas-25cl-2stk-Sammenlign-Priser",
  },
  "holmegaard-cabernet-vinkaraffel": {
    productId: "3228182",
    title: "Holmegaard Cabernet Vinkaraffel 1,7 L",
    category: "karaffel",
    compareUrl:
      "https://www.pricerunner.dk/pl/461-3228182/Koekkentilbehoer/Holmegaard-Cabernet-Vinkaraffel-1.7L-Sammenlign-Priser",
  },
  "riedel-ultra-vinkaraffel": {
    productId: "3285979",
    title: "Riedel Ultra Vinkaraffel 1,23 L",
    category: "karaffel",
    compareUrl:
      "https://www.pricerunner.dk/pl/461-3285979/Koekkentilbehoer/Riedel-Ultra-Vinkaraffel-1.23L-Sammenlign-Priser",
  },
  "laguiole-haws-proptrekker": {
    productId: "3200147939",
    title: "Haws Laguiole Proptrækker",
    category: "proptrekker",
    compareUrl:
      "https://www.pricerunner.dk/pl/461-3200147939/Koekkentilbehoer/Haws-Laguiole-Proptraekker-Sammenlign-Priser",
  },
  "day-12-bottles-vinreol": {
    productId: "3200280310",
    title: "DAY Vinreol 12 flasker",
    category: "vinreol",
    compareUrl:
      "https://www.pricerunner.dk/pl/459-3200280310/Brugskunst/DAY-12-Bottles-Vinreol-56x26cm-Sammenlign-Priser",
  },
  "le-creuset-waiters-friend-classic": {
    productId: "3357972024",
    title: "Le Creuset Classic Waiter's Friend",
    category: "proptrekker",
    compareUrl:
      "https://www.pricerunner.dk/pl/461-3357972024/Koekkentilbehoer/Le-Creuset-Premium-Tjenerproptraekker-Black-12-8-cm-Proptraekker-Sammenlign-Priser",
  },
  "spiegelau-definition-hvidvinsglas": {
    productId: "3201389919",
    title: "Spiegelau Definition Hvidvinsglas 43 cl (2 stk)",
    category: "vinglas",
    compareUrl:
      "https://www.pricerunner.dk/pl/461-3201389919/Koekkentilbehoer/Spiegelau-Definition-Hvidvinsglas-43cl-2stk-Sammenlign-Priser",
  },
  "vacu-vin-wine-saver-gift-pack": {
    productId: "3200042945",
    title: "Vacu Vin Wine Saver Gift Pack (pumpe + 2 propper)",
    category: "vinprop",
    compareUrl:
      "https://www.pricerunner.dk/pl/461-3200042945/Koekkentilbehoer/Vacu-Vin-Wine-Saver-Gift-Pack-Vinpumpe-3stk-Sammenlign-Priser",
  },
  "vacu-vin-champagne-prop": {
    productId: "3440434",
    title: "Vacu Vin Champagne Saver",
    category: "vinprop",
    compareUrl:
      "https://www.pricerunner.dk/pl/461-3440434/Koekkentilbehoer/Vacu-Vin-Saver-Barudstyr-Sammenlign-Priser",
  },
  "vacu-vin-active-flaskekoeler": {
    productId: "3224096",
    title: "Vacu Vin Active Flaskekøler",
    category: "flaskekoeler",
    compareUrl:
      "https://www.pricerunner.dk/pl/461-3224096/Koekkentilbehoer/Vacu-Vin-Active-Flaskekoeler-Sammenlign-Priser",
  },
  "fontodi-chianti-classico": {
    productId: "3214173268",
    title: "Fontodi Chianti Classico",
    category: "vin",
    compareUrl:
      "https://www.pricerunner.dk/pl/465-3214173268/Vine/Fontodi-Chianti-Classico-2017-Toscana-DOCG-OEKO-Sammenlign-Priser",
  },
  "san-marzano-primitivo": {
    productId: "3200123548",
    title: "Cantina San Marzano Primitivo Puglia",
    category: "vin",
    compareUrl:
      "https://www.pricerunner.dk/pl/465-3200123548/Vine/Marzano-Primitivo-2017-14.5-Sammenlign-Priser",
  },
  "trapiche-oak-cask-malbec": {
    productId: "5232720",
    title: "Trapiche Oak Cask Malbec",
    category: "vin",
    compareUrl:
      "https://www.pricerunner.dk/pl/465-5232720/Vine/Trapiche-Oak-Cask-Malbec-Mendoza-Maipo-Valley-14-75cl-Sammenlign-Priser",
  },
  "chablis-la-pierrelee": {
    productId: "3214945209",
    title: "La Chablisienne Chablis La Pierrelée",
    category: "vin",
    compareUrl:
      "https://www.pricerunner.dk/pl/465-3214945209/Vine/Chablis-La-Pierrelee-174.50-kr.-pr.-flaske-Sammenlign-Priser",
  },
  "grahams-10-tawny": {
    productId: "5199014",
    title: "Graham's 10 Years Old Tawny Port",
    category: "vin",
    compareUrl:
      "https://www.pricerunner.dk/pl/465-5199014/Vine/Graham-s-10-Years-Old-Tawny-Port-Douro-20-75cl-Sammenlign-Priser",
  },
  "chateau-tanunda-grand-shiraz": {
    productId: "5231215",
    title: "Château Tanunda Grand Barossa Shiraz",
    category: "vin",
    compareUrl:
      "https://www.pricerunner.dk/pl/465-5231215/Vine/Chateau-Tanunda-Grand-2015-Shiraz-Barossa-Valley-South-Australia-14.5-75cl-Sammenlign-Priser",
  },
  "louis-jadot-pinot-noir": {
    productId: "3216391975",
    title: "Louis Jadot Pinot Noir / Bourgogne Rouge",
    category: "vin",
    compareUrl:
      "https://www.pricerunner.dk/pl/465-3216391975/Vine/Louis-Jadot-Pinot-Noir-2021-Sammenlign-Priser",
  },
  "duc-de-foix-cava-brut": {
    productId: "4718668",
    title: "Duc de Foix Cava Brut",
    category: "vin",
    compareUrl:
      "https://www.pricerunner.dk/pl/465-4718668/Vine/Duc-de-Foix-Cava-Brut-12-75cl-Sammenlign-Priser",
  },
  "ribeauville-cremant-alsace": {
    productId: "3443060271",
    title: "Cave de Ribeauvillé Crémant d'Alsace Giersberger Brut",
    category: "vin",
    compareUrl:
      "https://www.pricerunner.dk/pl/465-3443060271/Vine/Cave-de-Ribeauville-Cremant-d-Alsace-Giersberger-Brut-Sammenlign-Priser",
  },
  "scavi-ray-prosecco-doc": {
    productId: "4754695",
    title: "Scavi & Ray Prosecco DOC",
    category: "vin",
    compareUrl:
      "https://www.pricerunner.dk/pl/465-4754695/Vine/Scavi-Ray-Prosecco-DOC-11-75cl-Sammenlign-Priser",
  },
  "faustino-1-gran-reserva": {
    productId: "3200192122",
    title: "Faustino I Gran Reserva Rioja",
    category: "vin",
    compareUrl:
      "https://www.pricerunner.dk/pl/465-3200192122/Vine/Faustino-1-Gran-Reserva-Tempranillo-Rioja-14.5-75cl-Sammenlign-Priser",
  },
  "bodegas-muga-reserva": {
    productId: "3200123264",
    title: "Bodegas Muga Reserva Rioja",
    category: "vin",
    compareUrl:
      "https://www.pricerunner.dk/pl/465-3200123264/Vine/Bodegas-Muga-Reserva-2017-Tempranillo-Rioja-14-75cl-Sammenlign-Priser",
  },
  "chateau-maucoil-cdr-villages": {
    productId: "3214923127",
    title: "Château Maucoil Côtes du Rhône Villages",
    category: "vin",
    compareUrl:
      "https://www.pricerunner.dk/pl/465-3214923127/Vine/Villages-2021-Grenache-Syrah-Carignan-Cotes-du-Rhone-14.5-75cl-Sammenlign-Priser",
  },
  "guigal-cotes-du-rhone-rouge": {
    productId: "3222430955",
    title: "E. Guigal Côtes du Rhône Rouge",
    category: "vin",
    compareUrl:
      "https://www.pricerunner.dk/pl/465-3222430955/Vine/E.-Guigal-2019-Cuvee-Philipson-Cotes-du-Rhone-Rouge-Guigal-Syrah-Roedvin-fra-Rhone-Frankrig-Sammenlign-Priser",
  },
  "latelier-du-vin-vintermometer": {
    productId: "5163357",
    title: "L'Atelier du Vin Vintermometer",
    category: "vinudstyr",
    compareUrl:
      "https://www.pricerunner.dk/pl/461-5163357/Koekkentilbehoer/-Vintermometer-Sammenlign-Priser",
  },
  "vacu-vin-wine-aerator": {
    productId: "3273041",
    title: "Vacu Vin Wine Aerator",
    category: "vinudstyr",
    compareUrl:
      "https://www.pricerunner.dk/pl/461-3273041/Koekkentilbehoer/Vacu-Vin-Wine-Aerator-Vinilter-Sammenlign-Priser",
  },
  "funktion-wing-proptrekker": {
    productId: "3444414",
    title: "Funktion Wing Proptrækker",
    category: "proptrekker",
    compareUrl:
      "https://www.pricerunner.dk/pl/461-3444414/Koekkentilbehoer/Funktion-Wing-Proptraekker-Sammenlign-Priser",
  },
  "coravin-pivot-plus": {
    productId: "3200426905",
    title: "Coravin Pivot+",
    category: "vinudstyr",
    compareUrl:
      "https://www.pricerunner.dk/pl/461-3200426905/Koekkentilbehoer/Coravin-Pivot-Vinpumpe-Sammenlign-Priser",
  },
  "leitz-eins-zwei-zero-sparkling-rose": {
    productId: "3329835248",
    title: "Leitz Eins Zwei Zero Sparkling Rosé Riesling",
    category: "vin",
    compareUrl:
      "https://www.pricerunner.dk/pl/465-3329835248/Vine/Leitz-Eins-Zwei-Zero-Sparkling-Rose-Riesling-75cl-Sammenlign-Priser",
  },
  "torres-natureo-rose": {
    productId: "3214874998",
    title: "Torres Natureo Rosé Syrah/Cabernet 0,0 %",
    category: "vin",
    compareUrl:
      "https://www.pricerunner.dk/pl/465-3214874998/Vine/Torres-Natureo-Rose-Syrah-Cabernet-0-0-Sammenlign-Priser",
  },
} as const satisfies Record<string, PriceRunnerProduct>;

export type PriceRunnerProductKey = keyof typeof priceRunnerProducts;

export function getPriceRunnerProduct(key: string): PriceRunnerProduct | null {
  if (key in priceRunnerProducts) {
    return priceRunnerProducts[key as PriceRunnerProductKey];
  }
  return null;
}
