/**
 * Kurateret PriceRunner-katalog (udstyr/tilbehør — ikke vinflasker).
 * productId + compareUrl kommer fra https://www.pricerunner.dk/widget / produktsider.
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
    | "flaskekoeler";
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
} as const satisfies Record<string, PriceRunnerProduct>;

export type PriceRunnerProductKey = keyof typeof priceRunnerProducts;

export function getPriceRunnerProduct(key: string): PriceRunnerProduct | null {
  if (key in priceRunnerProducts) {
    return priceRunnerProducts[key as PriceRunnerProductKey];
  }
  return null;
}
