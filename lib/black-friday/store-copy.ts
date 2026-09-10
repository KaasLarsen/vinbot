export const BLACK_FRIDAY_STORE_CATEGORY_IDS = [
  "chains",
  "online-lots",
  "importers",
  "gourmet",
] as const;

export type BlackFridayStoreCategoryId = (typeof BLACK_FRIDAY_STORE_CATEGORY_IDS)[number];

export const BLACK_FRIDAY_STORE_CATEGORIES: {
  id: BlackFridayStoreCategoryId;
  heading: string;
}[] = [
  {
    id: "chains",
    heading: "Store danske vin-supermarkeder og kæder",
  },
  {
    id: "online-lots",
    heading: "Specialister i online salg og restpartier",
  },
  {
    id: "importers",
    heading: "Eksklusive vinimportører (premium vine)",
  },
  {
    id: "gourmet",
    heading: "Gourmet, drinks og specialudvalg",
  },
];

const STORE_CATEGORY_BY_SLUG: Record<string, BlackFridayStoreCategoryId> = {
  "skjold-burne": "chains",
  "holte-vinlager": "chains",
  vinoble: "chains",
  supervin: "chains",
  vildmedvin: "chains",
  "jysk-vin": "chains",
  vinmedmere: "chains",
  "hj-hansen-vin": "chains",
  "wine-store": "chains",
  "den-sidste-flaske": "online-lots",
  winefamly: "online-lots",
  "8wines": "online-lots",
  vinpalle: "online-lots",
  "bottles-with-history": "online-lots",
  "philipson-wine": "importers",
  "erik-sorensen-vin": "importers",
  "kjaer-sommerfeldt": "importers",
  "laudrup-vin": "importers",
  "theis-vine": "importers",
  "sigurd-muller": "importers",
  "poetzsch-wine": "importers",
  "andrup-vin": "importers",
  "bichel-vine": "importers",
  "lauridsen-vine": "importers",
  "winther-vin": "importers",
  "dh-wines": "importers",
  "johnsen-wine": "importers",
  "havnens-vin": "importers",
  "sps-wine": "importers",
  winefriends: "importers",
  "d-wine": "importers",
  winesommelier: "importers",
  "vin-og-vin": "importers",
  gourmetshoppen: "gourmet",
  "westjysk-smag": "gourmet",
  barlife: "gourmet",
  whiskystack: "gourmet",
};

/** Unikke Black Friday-tekster — kun betalende partnere. */
const PARTNER_BLURBS: Record<string, string> = {
  "den-sidste-flaske":
    "Den Sidste Flaske er kendt for restpartier og daglige kup på alt fra hverdagsvin til flasker, der ellers er svære at finde. Hold øje med deres Black Friday-bølger, hvis du jagter ægte nedsættelser — ikke bare pyntet procent.",
  "lauridsen-vine":
    "Lauridsen Vine er en dansk importør med fokus på vin, der kan stå på både hverdagsbordet og juleaften. På Black Friday er det værd at tjekke, om de rydder lageret for kendte huse, du allerede kender fra deres sortiment.",
  "winther-vin":
    "Winther Vin blander klassiske europæiske vine med skarpe kampagner. Hold øje med Black Friday, hvis du vil have julevin med navn på etiketten — og stadig sammenligne før-prisen, før du køber kassen.",
  "dh-wines":
    "DH Wines er en mindre importør med personligt udvalg. Black Friday er ofte tidspunktet, hvor de giver plads til nye årgange ved at sætte ældre flasker ned — godt, hvis du vil have noget andet end kædernes massevarer.",
  "johnsen-wine":
    "Johnsen Wine satser på et overskueligt, kurateret sortiment. Hold øje med Black Friday, hvis du leder efter flasker til gaver eller julebordet uden at skulle lede i et kæmpe supermarkedslager.",
  "havnens-vin":
    "Havnens Vin er en dansk shop med både vin og et mere afslappet udvalg til hverdagen. Black Friday er et godt tidspunkt at tjekke, om deres kampagnepriser slår de større kæder på de flasker, du alligevel ville købe.",
  "sps-wine":
    "SPS Wine er en online vinbutik med bredt sortiment i Vinbots feed. Hold øje med Black Friday, hvis du vil stable kasser til jul og samtidig se, om prisen faktisk er lavere end hos de andre forhandlere.",
  winefriends:
    "Winefriends er en dansk vinwebshop med et blandet sortiment til både hverdag og selskab. Hold øje med deres Black Friday, hvis du vil finde flasker, der matcher julemaden, uden at gå på kompromis med prisen.",
  barlife:
    "Barlife blander vin og spiritus til hjemmebaren. Hold øje med Black Friday, hvis du skal bruge både rødvin til and og noget at blande drinks af til nytår — og sammenlign flaskeprisen, ikke kun kampagneprocenten.",
  "d-wine":
    "D’Wine er en dansk forhandler med vin i Vinbots sammenligning. På Black Friday er de værd at tjekke, hvis du vil have et mindre, overskueligt udvalg frem for kædernes uendelige hylder.",
  gourmetshoppen:
    "Gourmetshoppen samler vin med delikatesser. Hold øje med Black Friday, hvis julegavekurven skal rumme både flaske og noget spiseligt — og hold øje med, at rabatten sidder på vinen, ikke kun på tilbehøret.",
  "westjysk-smag":
    "Westjysk Smag er en regional forhandler med vin og smag fra Jylland. Black Friday kan være tidspunktet, hvor de rydder lageret inden jul — godt, hvis du vil støtte en mindre shop og stadig jagte en reel nedsættelse.",
  winesommelier:
    "Winesommelier henvender sig til dig, der vil have lidt mere vejledning i glasset. Hold øje med Black Friday, hvis du leder efter flasker til julebordet, der ikke bare er de billigste, men stadig er på tilbud.",
  "bottles-with-history":
    "Bottles With History er specialister i flasker med en historie — ældre årgange og mere særlige fund. Black Friday er tidspunktet at tjekke, om de slipper sjældenheder til en pris, der faktisk er lavere end til hverdag.",
  "8wines":
    "8wines er en international online-shop med et stort katalog og skarpe priser. Hold øje med Black Friday, hvis du jager volumen og kendte etiketter — og husk at medregne fragt, før du sammenligner med danske butikker.",
  "wine-store":
    "Wine Store er en dansk kæde/webshop med et bredt, tilgængeligt sortiment. På Black Friday er de relevante, hvis du vil handle vin, som du kender fra hylderne, og stadig tjekke, om kampagneprisen holder i sammenligningen.",
  whiskystack:
    "Whiskystack er primært whisky og rom, men har også vin i feedet. Hold øje med Black Friday, hvis julegaverne skal være spiritus frem for endnu en flaske rødvin — og sammenlign stadig før-prisen, før du klikker køb.",
};

const DEFAULT_CATEGORY: BlackFridayStoreCategoryId = "importers";

export function blackFridayStoreCategory(slug: string): BlackFridayStoreCategoryId {
  return STORE_CATEGORY_BY_SLUG[slug] ?? DEFAULT_CATEGORY;
}

export function blackFridayPartnerBlurb(slug: string): string | undefined {
  return PARTNER_BLURBS[slug];
}
