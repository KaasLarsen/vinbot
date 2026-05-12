import type { DsfFeaturedPick } from "@/lib/dsf-featured";
import { sanitizeDsfProductUrl } from "@/lib/dsf-product-url";

export type DsfPopularWineGuideRef = {
  slug: string;
  /** Overskriver linktekst — ellers bruges guidens titel fra frontmatter. */
  anchorText?: string;
};

export type DsfPopularWineSpec = { label: string; value: string };

export type DsfPopularWinePage = {
  slug: string;
  displayTitle: string;
  metaDescription: string;
  /** Rå eller ren DSF-produkt-URL — normaliseres via sanitizeDsfProductUrl ved lookup. */
  productPageUrl: string;
  imageUrl?: string;
  /** Ca.-pris til JSON-LD — kontrollér altid hos Den Sidste Flaske før publicering. */
  listPrice?: number;
  priceCurrency?: string;
  /** Kort teaser brugt i Product JSON-LD hvis ønsket. */
  structuredDescriptionSnippet?: string;
  bodyParagraphs: string[];
  specs: readonly DsfPopularWineSpec[];
  guideRefs: readonly DsfPopularWineGuideRef[];
};

const PAGES: readonly DsfPopularWinePage[] = [
  {
    slug: "primitivo-susumaniello-salento-boccantino",
    displayTitle: "Primitivo & Susumaniello — Boccantino (Salento)",
    metaDescription:
      "Salento-rød med primitivo og susumaniello: saft, krydderi og hverdagsvenlig krop. Læs Vinbots take og find flasken hos Den Sidste Flaske (affiliate).",
    productPageUrl: "https://densidsteflaske.dk/products/primitivo-susumaniello-salento-boccantino-2024",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0076/1515/2192/files/primitivo-susumaniello-salento-boccantino-2024-boccantino-rodvin-1190752698.png?v=1756829918",
    listPrice: 79,
    priceCurrency: "DKK",
    structuredDescriptionSnippet:
      "Italiensk rødvin fra Salento med primitivo og susumaniello — moden frugt, blød struktur og oplagt til pizza, pasta og grill.",
    bodyParagraphs: [
      "Boccantino-linjen fra Salento er for mange en genvej til det, Syditalien gør bedst i hverdagsklassen: varm frugt, tydelig venlighed i glasset og en profil der finder friktion mod tomat, ost og urter uden at kræve timevis med decanter og snak om terroir.",
      "Her møder du en klassisk sydblanding på hverdagsniveau: primitivo giver dybde, mørk bærfrugt og ofte en anelse tørret frugt og krydderi, mens susumaniello typisk bidrager med friskhed, saft og en mere lysnet afslutning. Resultatet er en vin der føles fyldig, men stadig relativt ligetil at åbne en almindelig onsdag — og som ofte også fungerer, når du har gjort ekstra ud af kryddergryde, pølse eller en burger med stærk ost.",
      "Ifølge forhandleren er vinen primært primitivo med en tydelig andel susumaniello, med lagring på træ i den lette ende af spektret (fadpræg frem for tung toast). Brug formuleringerne som pejlemærker — flasken finder du altid først ved at smage.",
      "Serveringen er enkel: lidt under stuetemperatur hvis lokalet er varmt (så alkoholen ikke overdøver maden). Har du ikke en vinkælder fra 1890 — et kvarters kølig luft eller en kælderplade gør mere end du tror.",
    ],
    specs: [
      { label: "Område", value: "Salento, Puglia (Italien)" },
      {
        label: "Druer",
        value: "Ifølge forhandler: ca. 70 % primitivo, 30 % susumaniello",
      },
      { label: "Lagring", value: "Ifølge forhandler: blandt andet egetræ i ca. seks måneder" },
      {
        label: "Årgang",
        value: "Se aktuel årgang og etiket hos Den Sidste Flaske — webadressens «2024» er produktsti, ikke nødvendigvis årgangen på flasken.",
      },
    ],
    guideRefs: [
      { slug: "zinfandel-druen", anchorText: "Zinfandel og primitivo (samme genetiske familie)" },
      { slug: "vinregion-italien" },
      { slug: "rodvin-til-pizza" },
      { slug: "vin-til-pizza" },
      { slug: "vin-til-pizza-og-pasta" },
      { slug: "vin-til-grill-og-bbq" },
      { slug: "vin-til-burger" },
      { slug: "vin-til-gulasch" },
    ],
  },
];

function normalizedProductKey(url: string): string {
  return sanitizeDsfProductUrl(url);
}

/** Alle kendte slugs til `generateStaticParams` og sitemap. */
export function listDsfPopularWineSlugs(): string[] {
  return PAGES.map((p) => p.slug);
}

export function getDsfPopularWineBySlug(slug: string): DsfPopularWinePage | undefined {
  return PAGES.find((p) => p.slug === slug);
}

/** Til krydslinks fra hub/featured-kort — match på sanitiseret produkt-URL. */
export function dsfPopularWineDetailSlugForProductUrl(productUrl: string): string | undefined {
  const key = normalizedProductKey(productUrl);
  for (const page of PAGES) {
    if (normalizedProductKey(page.productPageUrl) === key) return page.slug;
  }
  return undefined;
}

export function popularWineToFeaturedPick(page: DsfPopularWinePage): DsfFeaturedPick {
  const productUrl = sanitizeDsfProductUrl(page.productPageUrl);
  return {
    title: page.displayTitle,
    blurb: page.structuredDescriptionSnippet ?? page.metaDescription.slice(0, 240),
    productUrl,
    imageUrl: page.imageUrl,
    listPrice: page.listPrice,
    priceCurrency: page.priceCurrency ?? "DKK",
  };
}
