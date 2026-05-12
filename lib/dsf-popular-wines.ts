import type { DsfFeaturedPick } from "@/lib/dsf-featured";
import { sanitizeDsfProductUrl } from "@/lib/dsf-product-url";

export type DsfPopularWineGuideRef = {
  slug: string;
  /** Overskriver linktekst — ellers bruges guidens titel fra frontmatter. */
  anchorText?: string;
};

export type DsfPopularWineSpec = { label: string; value: string };

/** Valgfri mad- og lejlighedssektion — konkrete forslag der gør siden «spillende». */
export type DsfPopularWineFoodPairing = {
  heading: string;
  /** Kort afsnit før listen (hvorfor vin+mad fungerer). */
  lead?: string;
  readonly dishes: readonly string[];
  /** Fx retter eller stilarter der typisk kolliderer — valgfrit. */
  lessIdeal?: string;
};

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
  /** Mad, lejligheder og konkrete tallerkener — vises som egen sektion på siden. */
  foodPairing?: DsfPopularWineFoodPairing;
  specs: readonly DsfPopularWineSpec[];
  guideRefs: readonly DsfPopularWineGuideRef[];
};

const PAGES: readonly DsfPopularWinePage[] = [
  {
    slug: "primitivo-susumaniello-salento-boccantino",
    displayTitle: "Primitivo & Susumaniello — Boccantino (Salento)",
    metaDescription:
      "Salento-rød med primitivo og susumaniello: varm bærfrugt, mild krydrethed og blød struktur. Vinbots guide til mad, servering og flasken hos Den Sidste Flaske (affiliate).",
    productPageUrl: "https://densidsteflaske.dk/products/primitivo-susumaniello-salento-boccantino-2024",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/0076/1515/2192/files/primitivo-susumaniello-salento-boccantino-2024-boccantino-rodvin-1190752698.png?v=1756829918",
    listPrice: 79,
    priceCurrency: "DKK",
    structuredDescriptionSnippet:
      "Italiensk rødvin fra Salento med primitivo og susumaniello — moden frugt, blød struktur. Oplagt til pizza og pasta med tomat, grillede kødretter og moden ost.",
    bodyParagraphs: [
      "Boccantino-linjen fra Salento er for mange en genvej til det, Syditalien gør bedst i hverdagsklassen: varm frugt, venlig struktur og en vin der tilbyder mere end den kræver — du behøver hverken aerator, jargon eller en forelæsning om jordbund for at få den til at ligne noget ud over sunde skillinger.",
      "Her møder du en klassisk sydblanding: primitivo giver dybde, mørk bærfrugt og typisk også et strejf af tørret frugt, lakrids og peber, mens susumaniello ofte løfter friskheden og frugtens saft, så vinen ikke blot bliver ét stort pund karamel. Balancepunktet er sjældent stram akademisk klasse, men heller ikke cola-sødt: tænk grillfest i Puglia frem for borgmesterens gallamiddag.",
      "Smagsmæssigt lander flasken som regel som et bredt match til almindeligt italiensk hverdagsmåltid med tomat og ost: syren skærer ned i fedmen, mens den varme frugt møder urter, hvidløg og salt kødpålæg uden at knække nakken på retten.",
      "Ifølge forhandleren er vinen primært primitivo med en tydelig andel susumaniello, lagret på træ i den mere afdæmpede end tunge ende af fadskalaen (markeret struktur og krydderi frem for cremet vaniljesuppe). Lad producentens ord være en indgang — dine smagsløg er dommeren.",
      "Hvem er den til? Dig der vil have en rød der tåler både afslappet aften foran skærmen og med gæster ved bordet, uden at du skal binde an med timelang research. God som hus-rød, når du vil have mørk frugt, men stadig vin der forsvinder i flasker i et realistisk tempo.",
      "Temperatur gør overraskende meget: server for varmt og alkohollen kan virke direktere end smagen fortjener — især ved salte eller stegte retter. 16–18 °C er et pragmatisk pejlemærke; lad flasken lufte kort eller hæld første halve glas, så vinen ikke føles sovende ud af skænkekanden.",
      "Åbn gerne vin et kvarter før maden hvis muligt; fuld luksus-decantering kræves sjældent i den her stil, men luft hjælper ofte fadpræg og unge tanniner til at falde på plads. Har du blot et kælderrit og et køleskab med kølig hylde, er du videre på vejen end de fleste.",
    ],
    foodPairing: {
      heading: "Mad og lejligheder der spiller",
      lead:
        "Tænk varme krydderier, tomatbaserede saucer og fedtstof du gerne vil balancere, frem for bleg fisk eller syrlige salater på tom mave. Listen herunder er konkrete idéer — justér krydderi efter tallerkenen:",
      dishes: [
        "Pizza: margherita, napolitana eller pepperoni — syren møder tomat, frugten matcher salami og ost.",
        "Pasta med kødsauce: bolognese, lasagne eller kartoffel- og rodfrugtgratin med ost og kødsaft (pas på salt på tallerken og i køkkenet).",
        "Grill og pande: krydret flanksteak, bøf med cheddar eller blåskimmel, nakkekam med bbq eller glace, grove pølser og chorizo.",
        "Italiensk hverdagsgryde: kylling med tomater og oliven, cacciatore eller kødboller i passata.",
        "Fra ovn: moussaka, gratineret selleri eller kartoffellasagne med parmesan.",
        "Ost og pålæg: parmesan, pecorino, moden cheddar eller taleggio, plus en tallerken med skinker, spegepølser og oliven.",
        "Vegetar med bid: grillede portobello, ratatouille med urter eller bagt aubergine med mozzarella.",
        "Lejligheder: aftener med takeaway-pizza, taco med krydret okse- eller svinefyld, eller når I ikke gider kokkerere, men stadig vil have rødvin der føles som mening.",
      ],
      lessIdeal:
        "Sværere parring ved meget fine, neutrale retter eller meget stærk chili, hvor alkohol og varme frugt kan føles for dominerende eller forstærke brændingen. Til sådanne menuer henviser vi til de mere målrettede guider under afsnittet «Guider der matcher».",
    },
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
