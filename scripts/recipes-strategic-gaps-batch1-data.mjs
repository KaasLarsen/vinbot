/** Strategic gaps batch 1: Iberia + Asia sake + Greek start (5). */
import { r } from "./add-recipes-tilbehor30-lib.mjs";

export const UPDATED = "2026-09-23";

export const SLUG_EXPANSIONS = {
  "churrasco-med-hvidvin-og-hvidloeg":
    "Portugisisk-inspireret grillkød: svinekød eller kylling marineret i hvidvin, hvidløg, citron og piri-piri/paprika. Grill eller pandesteg. Marinér mindst 4 timer. Server med salat og kartofler — og samme stil Vinho Verde eller Alvarinho i glasset.",
  "carne-de-porco-a-alentejana":
    "Portugisisk signaturret: svinekød brunet og simret med muslinger i hvidvin, koriander og paprika. Timing: kød først, muslinger til sidst så de ikke bliver seje. Klassisk Alentejo / kystnær portugisisk festmad.",
  "polbo-a-feira-med-albarino":
    "Galicisk blæksprutte a feira: kogt blæksprutte med olivenolie, paprika og groft salt. Albariño i glasset er det lokale match — evt. en skvæt i dressingen. Ikke den rødvin-braiserede spanske blæksprutte.",
  "sake-dampede-muslinger":
    "Asari no Sakamushi: muslinger dampet i sake, ingefær og soyasauce — den japanske, minimalistiske fætter til moules marinières. Kort dampning; kasser uåbnede. Server med dashi-agtig sake-bouillon.",
  "kleftiko-med-hvidvin":
    "Græsk langtidsbagt lam i fad: marineret i hvidvin, citron, oregano og hvidløg, pakket ind og bagt til det falder fra benet. Lav temperatur, lang tid. Server med kartofler der har suget saften.",
};

export const GUIDE_RECIPE_ADDITIONS = {
  "vin-til-portugisisk-mad": [
    { slug: "churrasco-med-hvidvin-og-hvidloeg", label: "Churrasco med hvidvin" },
    { slug: "carne-de-porco-a-alentejana", label: "Carne de Porco à Alentejana" },
  ],
  "vin-til-spansk-mad": [
    { slug: "polbo-a-feira-med-albarino", label: "Polbo á Feira med Albariño" },
  ],
  "vin-til-japansk-mad": [
    { slug: "sake-dampede-muslinger", label: "Sake-dampede muslinger" },
  ],
  "vin-til-graesk-mad": [
    { slug: "kleftiko-med-hvidvin", label: "Kleftiko med hvidvin" },
  ],
  "vin-til-lam": [
    { slug: "kleftiko-med-hvidvin", label: "Kleftiko med hvidvin" },
  ],
  "vin-til-muslinger": [
    { slug: "sake-dampede-muslinger", label: "Sake-dampede muslinger" },
  ],
  "vin-til-svinekoed": [
    { slug: "carne-de-porco-a-alentejana", label: "Carne de Porco à Alentejana" },
    { slug: "churrasco-med-hvidvin-og-hvidloeg", label: "Churrasco med hvidvin" },
  ],
  "vin-til-blaeksprutte": [
    { slug: "polbo-a-feira-med-albarino", label: "Polbo á Feira" },
  ],
  "sadan-bruger-du-vin-til-sauce-og-simren": [
    { slug: "carne-de-porco-a-alentejana", label: "Carne de Porco à Alentejana" },
    { slug: "kleftiko-med-hvidvin", label: "Kleftiko" },
  ],
};

export const RECIPES = [
  r({
    slug: "churrasco-med-hvidvin-og-hvidloeg",
    title: "Churrasco — grillet kød marineret i hvidvin og hvidløg",
    description:
      "Portugisisk-inspireret grillkød i hvidvins-hvidløgsmarinade med citron og paprika. Opskrift til 4 — klassisk churrasco-stil.",
    tags: ["opskrift", "portugisisk", "grill", "svinekød", "hvidvin", "hovedret", "marinade"],
    prepTime: "PT20M",
    cookTime: "PT20M",
    servings: 4,
    difficulty: "easy",
    wineInRecipe: {
      style: "Tør portugisisk hvid — Vinho Verde, Alvarinho eller tør Lisboa-hvid",
      amount: "200 ml hvidvin i marinade",
      note: "Hvidvin, hvidløg og citron mørner og krydrer kødet før grillning.",
    },
    wineToDrink: {
      guideSlug: "vin-til-portugisisk-mad",
      searchQuery: "vinho verde alvarinho grill svinekød",
      searchMax: 180,
      label: "vin til portugisisk grill",
    },
    relatedGuides: [
      "vin-til-portugisisk-mad",
      "vin-til-grill-og-bbq",
      "vin-til-svinekoed",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "800 g svinekoteletter, nakkefilet eller kyllingeoverlår",
      "200 ml tør hvidvin (gerne Vinho Verde)",
      "6 fed hvidløg, knust",
      "Saft af 1 citron",
      "3 spsk olivenolie",
      "1 spsk røget paprika eller piri-piri",
      "1 tsk oregano eller laurbær",
      "1 tsk salt",
      "Friskkværnet peber",
      "Frisk koriander eller persille til servering",
    ],
    instructions: [
      "Bland vin, hvidløg, citron, olie, paprika, oregano, salt og peber. Læg kødet i marinaden. Køl 4–12 timer; vend undervejs.",
      "Tag kødet op, dup let. Grill eller pandesteg på høj varme 3–5 min pr. side (afhængigt af tykkelse), til gennemstegt/rosa efter type.",
      "Hvile 5 minutter. Skær i skiver. Dryp evt. lidt frisk citron og koriander over.",
      "Server med salat, kartofler eller ris.",
    ],
    intro: `**Churrasco med hvidvin og hvidløg** er den portugisiske grillklassiker i Vinbot-format: kød marineret i tør hvidvin, masser af hvidløg, citron og paprika, derefter grillet hårdt. Enklere end [carne de porco à alentejana](/opskrifter/carne-de-porco-a-alentejana), men samme vinøse Iberiske DNA.`,
    why: `Hvidvinens **syre** mørner overfladen og bærer hvidløg og citrus ind i kødet. Vinho Verde og Alvarinho er det lokale match. Læs [vin til portugisisk mad](/guides/vin-til-portugisisk-mad).`,
    tips: [
      ["Marinade", "Mindst 4 timer. Overnight er bedst for nakkefilet."],
      ["Varme", "Høj grill — stegeskorpe, ikke gråt kogt kød."],
      ["Kylling", "Overlår tåler marinaden bedre end bryst."],
      ["Piri-piri", "Justér efter gæsterne — paprika er mildere."],
    ],
    serving: `Med grøn salat, ovnkartofler og [hvidvins-jalapeñorelish](/opskrifter/hvidvins-jalapenorelish) eller oliven. Drik samme stil hvidvin kold.`,
    mistakes: [
      "For kort marinade — overfladisk smag.",
      "At stege direkte fra køleskab — ujævn kerne.",
      "Meget sød hvidvin i marinaden — brænder på grillen.",
      "At genbruge marinade som sauce uden at koge den.",
    ],
    storage: `Marineret råt kød 1 dag. Tilberedt 2–3 dage. Genvarm blidt eller spis koldt i sandwich.`,
    glass: `Vinho Verde, Alvarinho eller crisp Vinho Regional — se [vin til portugisisk mad](/guides/vin-til-portugisisk-mad).`,
    faq: [
      ["Oksekød?", "Ja — tynde skiver eller skewer. Kortere grilltid."],
      ["Uden grill?", "Støbejernspande på høj varme."],
      ["Vegetar?", "Halloumi eller tykke svampeskiver i samme marinade — kort tid."],
    ],
  }),

  r({
    slug: "carne-de-porco-a-alentejana",
    title: "Carne de Porco à Alentejana",
    description:
      "Portugisisk signaturret: svinekød og muslinger simret i hvidvin med paprika og koriander. Opskrift til 4.",
    tags: ["opskrift", "portugisisk", "svinekød", "muslinger", "hvidvin", "hovedret", "skaldyr"],
    prepTime: "PT30M",
    cookTime: "PT45M",
    servings: 4,
    difficulty: "medium",
    wineInRecipe: {
      style: "Tør portugisisk hvid — Alentejo-hvid, Vinho Verde eller Alvarinho",
      amount: "250 ml hvidvin",
      note: "Svinekød og muslinger mødes i hvidvin — vinen er grydens væske.",
    },
    wineToDrink: {
      guideSlug: "vin-til-portugisisk-mad",
      searchQuery: "alentejo hvidvin svinekød muslinger",
      searchMax: 180,
      label: "vin til Alentejana",
    },
    relatedGuides: [
      "vin-til-portugisisk-mad",
      "vin-til-svinekoed",
      "vin-til-muslinger",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "700 g svinekød i tern (nakke eller skulder)",
      "500 g rensede muslinger",
      "250 ml tør hvidvin",
      "1 løg, hakket",
      "4 fed hvidløg, hakket",
      "1 rød peberfrugt i tern",
      "1 spsk røget paprika (pimentón)",
      "2 spsk olivenolie",
      "1 laurbærblad",
      "1 stor håndfuld frisk koriander",
      "Salt og peber",
      "Citronbåde til servering",
    ],
    instructions: [
      "Salt svinekødet. Brun i olie i hold på høj varme. Tag op.",
      "Sænk varmen. Sauter løg og peber 5–7 minutter. Tilsæt hvidløg og paprika 1 minut.",
      "Hæld vin i, skrab bunden. Læg kød og laurbær tilbage. Simr med låg 25–30 minutter, til kødet er mørt. Smag til.",
      "Tilsæt muslinger. Damp 4–6 minutter med låg, til de åbner. Smid uåbnede væk. Rør koriander i. Server med citron.",
    ],
    intro: `**Carne de Porco à Alentejana** er Portugals kød-og-skaldyr-klassiker: svinekød simret i hvidvin, muslinger til sidst, paprika og masser af koriander. Land møder hav i samme gryde — og vinen binder det. Tæt på [muslinger i hvidvin](/opskrifter/muslinger-i-hvidvin), men med braiseret svinekød som stjerne.`,
    why: `Hvidvin løfter **fedt svinekød og iod fra muslinger** uden at tunge saucen. Paprika giver røg og farve. Læs [vin til portugisisk mad](/guides/vin-til-portugisisk-mad).`,
    tips: [
      ["Muslinger", "Først til sidst — ellers seje gummi-muslinger."],
      ["Kød", "Nakke/skulder > mørbrad til lang simren."],
      ["Koriander", "Frisk og generøs. Persille er nødplan."],
      ["Brød", "Server med brød til at suge saucen."],
    ],
    serving: `Med kogte kartofler eller brød. Start med oliven. Drik samme hvidvin kold.`,
    mistakes: [
      "Muslinger for tidligt — seje.",
      "For lidt vin — tør gryde.",
      "At glemme at smide uåbnede muslinger.",
      "For mild paprika — mangler Alentejo-karakter.",
    ],
    storage: `Kød+sauce 2 dage (uden muslinger bedst). Muslinger spises friske. Frys kun køddelen.`,
    glass: `Alentejo-hvid, Vinho Verde eller Alvarinho — se [vin til portugisisk mad](/guides/vin-til-portugisisk-mad).`,
    faq: [
      ["Uden muslinger?", "Ja — så er det mere en paprika-svinegryde. Tilsæt gerne oliven."],
      ["Kan jeg bruge rejer?", "Ja, de sidste 3 minutter i stedet for muslinger."],
      ["Pimentón dulce eller picante?", "Dulce til hverdag; picante hvis du vil have varme."],
    ],
  }),

  r({
    slug: "polbo-a-feira-med-albarino",
    title: "Polbo á Feira — galicisk blæksprutte med Albariño",
    description:
      "Galicisk blæksprutte a feira med olivenolie, paprika og groft salt — plus guide til Albariño. Opskrift til 4.",
    tags: ["opskrift", "spansk", "galicien", "blæksprutte", "hvidvin", "albariño", "skaldyr", "hovedret"],
    prepTime: "PT20M",
    cookTime: "PT50M",
    servings: 4,
    difficulty: "medium",
    wineInRecipe: {
      style: "Albariño / Rías Baixas — tør, mineralsk galicisk hvid (i glasset + evt. i lagen)",
      amount: "50 ml Albariño i olie-dressing (valgfri) + vin til glasset",
      note: "Klassisk a feira er olie/paprika; Albariño er det lokale match — en skvæt i dressingen binder retten til Vinbot.",
    },
    wineToDrink: {
      guideSlug: "vin-til-spansk-mad",
      searchQuery: "albariño rias baixas blæksprutte",
      searchMax: 200,
      label: "Albariño til blæksprutte",
    },
    relatedGuides: [
      "vin-til-spansk-mad",
      "vin-til-blaeksprutte",
      "albarino-fra-rias-baixas",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "1–1,2 kg renset blæksprutte (gerne frisk eller tøet)",
      "1 løg",
      "2 laurbærblade",
      "Groft salt (flor de sal eller flakes)",
      "100 ml god olivenolie",
      "2 tsk sød røget paprika (pimentón dulce)",
      "Evt. 50 ml Albariño til dressingen",
      "Friskkværnet peber",
    ],
    instructions: [
      "Bring en stor gryde vand i kog med løg, laurbær og salt. Dyp blæksprutten 3 gange i det kogende vand (traditionelt «asustar»), læg den derefter i og simr 30–45 minutter, til den er mør (prøv med kniv).",
      "Tag op, køl let. Skær i skiver (ca. 1 cm) og læg på træfad eller tallerken.",
      "Bland olivenolie, paprika og evt. Albariño. Dryp over blæksprutten. Drys groft salt og peber.",
      "Server straks — lunkent er klassisk.",
    ],
    intro: `**Polbo á Feira** er Galiciens blæksprutte-ikon: kogt blæksprutte, olivenolie, paprika og groft salt — serveret på træfad. Hvor [blæksprutte i rødvin](/opskrifter/blaeksprutte-i-rodvin) er braiseret og kraftig, er a feira ren, iodholdig og bygget til **Albariño**. Læs også [Albariño fra Rías Baixas](/guides/albarino-fra-rias-baixas).`,
    why: `Albariños **syre og saltinentalitet** spejler blækspruttens iod. Paprika og olie giver fedme uden tung sauce. En skvæt vin i dressingen er Valbots twist — ikke obligatorisk i Galicia, men logisk her.`,
    tips: [
      ["Mørhed", "Prøv efter 30 min. For lang kogning = gummi eller grød."],
      ["Frossen", "Ofte mere mør — cellevægge brydes. Tø langsomt i køl."],
      ["Paprika", "Sød røget. Picante kun hvis du vil have varme."],
      ["Fad", "Træ er tradition — keramik virker også."],
    ],
    serving: `Som hovedret med cachelos (kogte kartofler) eller som tapas. Drik iskold Albariño.`,
    mistakes: [
      "At forveksle med rødvinsbraiseret blæksprutte — anden ret.",
      "For lidt salt — flad smag.",
      "At overkoge — gummiagtig tekstur.",
      "Billig bitter olie — ødelægger enkelheden.",
    ],
    storage: `Bedst frisk. Køleskab 1 dag; spis kold som salat med ekstra olie.`,
    glass: `Albariño, Rías Baixas — se [Albariño-guiden](/guides/albarino-fra-rias-baixas) og [vin til blæksprutte](/guides/vin-til-blaeksprutte).`,
    faq: [
      ["Kan jeg grille den?", "A feira er kogt. Grillet blæksprutte er en anden (også god) ret."],
      ["Babyblæksprutte?", "For lille til klassisk a feira — brug hel blæksprutte."],
      ["Uden vin i dressingen?", "Ja — så er det 100 % klassisk. Vin i glasset er stadig pointen."],
    ],
  }),

  r({
    slug: "sake-dampede-muslinger",
    title: "Sake-dampede muslinger (Asari no Sakamushi)",
    description:
      "Japanske muslinger dampet i sake, ingefær og soja — minimalistisk fætter til moules marinières. Opskrift til 2–3.",
    tags: ["opskrift", "japansk", "muslinger", "sake", "asiatisk", "skaldyr", "hovedret"],
    prepTime: "PT15M",
    cookTime: "PT10M",
    servings: 2,
    difficulty: "easy",
    wineInRecipe: {
      style: "Japansk sake — junmai eller honjozo (uden salt)",
      amount: "150 ml sake",
      note: "Muslinger dampes i sake — risvinen er både damp og bouillon.",
    },
    wineToDrink: {
      guideSlug: "vin-til-japansk-mad",
      searchQuery: "sake muslinger riesling japansk",
      searchMax: 150,
      label: "sake eller riesling til muslinger",
    },
    relatedGuides: [
      "vin-til-japansk-mad",
      "vin-til-muslinger",
      "vin-til-asiatisk-mad",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "800 g rensede muslinger (asari/vongole eller blåmuslinger)",
      "150 ml sake",
      "1 spsk soja",
      "20 g frisk ingefær i tynde skiver",
      "1 fed hvidløg, knust (valgfri)",
      "2 forårsløg i skrå skiver",
      "1 tsk sesamolie (valgfri)",
    ],
    instructions: [
      "Skyl muslinger. Smid åbne, der ikke lukker ved bank.",
      "Læg muslinger, sake, soja, ingefær og hvidløg i en bred gryde. Sæt låg på.",
      "Damp på høj varme 4–6 minutter, til muslingerne åbner. Ryst gryden undervejs.",
      "Smid uåbnede væk. Drys forårsløg og evt. sesamolie over. Server med det samme med bouillonen.",
    ],
    intro: `**Sake-dampede muslinger** — Asari no Sakamushi — er den japanske, minimalistiske fætter til [muslinger i hvidvin](/opskrifter/muslinger-i-hvidvin): ingen fløde, ingen løgsuppe — bare sake, ingefær og soja. Hurtig, ren og umami-klar på under 15 minutter.`,
    why: `Sake giver **umami og let sødme** uden at tunge skaldyrene. Ingefær skærer igennem. Læs [vin til japansk mad](/guides/vin-til-japansk-mad).`,
    tips: [
      ["Rensning", "Sandede muslinger: læg i saltvand 20 min før."],
      ["Tid", "Hellere under- end overdampet."],
      ["Sake", "Drikkelig — ikke saltet cooking sake."],
      ["Brød/ris", "Server med ris eller brød til bouillonen."],
    ],
    serving: `Som forret eller let hovedret med ris. Drik kold sake eller tør riesling.`,
    mistakes: [
      "Cooking sake med salt — for salt bouillon.",
      "For lang dampning — seje muslinger.",
      "At fylde gryden for meget — ujævn damp.",
      "At sammenligne 1:1 med fløde-moules — anden stil.",
    ],
    storage: `Spises med det samme. Opvarm ikke — bliver sejt.`,
    glass: `Junmai sake eller riesling — se [vin til japansk mad](/guides/vin-til-japansk-mad).`,
    faq: [
      ["Blåmuslinger eller vongole?", "Begge. Vongole er tættere på asari."],
      ["Uden soja?", "Brug 1/2 tsk salt — mildere, stadig god."],
      ["Med smør?", "En knivspids i slutningen er ok, men klassisk er uden."],
    ],
  }),

  r({
    slug: "kleftiko-med-hvidvin",
    title: "Kleftiko — græsk lam i fad med hvidvin",
    description:
      "Langtidsbagt lam marineret i hvidvin, citron og oregano, bagt til det falder fra benet. Opskrift til 6.",
    tags: ["opskrift", "græsk", "lam", "hvidvin", "steg", "hovedret", "fest"],
    prepTime: "PT25M",
    cookTime: "PT210M",
    servings: 6,
    difficulty: "medium",
    wineInRecipe: {
      style: "Tør græsk eller middelhavs-hvid — Assyrtiko, Moschofilero eller tør verdicchio",
      amount: "250 ml hvidvin",
      note: "Lam marineres og bages i hvidvin, citron og oregano — vinen er syre og væske.",
    },
    wineToDrink: {
      guideSlug: "vin-til-graesk-mad",
      searchQuery: "assyrtiko lam kleftiko græsk",
      searchMax: 180,
      label: "vin til græsk lam",
    },
    relatedGuides: [
      "vin-til-graesk-mad",
      "vin-til-lam",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "1,5–1,8 kg lammeskank eller skulder i store stykker",
      "250 ml tør hvidvin",
      "Saft af 2 citroner",
      "6 fed hvidløg, knust",
      "3 spsk olivenolie",
      "2 spsk tørret oregano",
      "1 kg kartofler i både",
      "2 rødløg i både",
      "2 laurbærblade",
      "Salt og peber",
    ],
    instructions: [
      "Bland vin, citron, hvidløg, olie, oregano, salt og peber. Marinér lammet 4–12 timer i køl.",
      "Forvarm ovn til 160 °C. Læg kartofler og løg i et fad. Læg lam ovenpå med marinade og laurbær. Dæk tæt med folie (eller låg).",
      "Bag 2,5–3,5 timer, til kødet er mørt. Fjern folie de sidste 20–30 minutter for farve.",
      "Hvile 10 minutter. Server lam og kartofler med saften fra fadet.",
    ],
    intro: `**Kleftiko** er græsk lam i fad: langtidsbagt, citron-oregano-hvidvinsmarineret kød, der falder fra benet. Navnet henviser til «tyvene», der bagte kød nedgravet — i dag er det ovnen. Tæt på [souvlaki med hvidvin](/opskrifter/souvlaki-med-hvidvin) i smagsprofil, men langsom og søndagsagtig.`,
    why: `Hvidvin og citron skærer **fedt lam**; oregano er det græske fingerprint. Lang bagning mørner bindevæv. Læs [vin til græsk mad](/guides/vin-til-graesk-mad).`,
    tips: [
      ["Tæt låg", "Fugtigheden skal blive i fadet — ellers tørt kød."],
      ["Kartofler", "Læg under kødet, så de suger saft."],
      ["Udskæring", "Skank/skulder > mørbrad til denne metode."],
      ["Make-ahead", "Marinér natten før.", ],
    ],
    serving: `Med græsk salat, tzatziki og brød. Drik Assyrtiko eller frugtig Agiorgitiko.`,
    mistakes: [
      "For høj ovntemperatur — tørt ydre, sej indre.",
      "For lidt væske — brændte kartofler.",
      "At springe marinaden over — flad smag.",
      "At skære for småt — tørrer ud.",
    ],
    storage: `Køleskab 3 dage. Genvarm dækket i ovn med lidt fond/vin. Frys 2 måneder.`,
    glass: `Assyrtiko eller let græsk rød — se [vin til græsk mad](/guides/vin-til-graesk-mad).`,
    faq: [
      ["Kanin eller kylling?", "Kylling: kortere tid (ca. 1,5 t). Kanin: tættere på lammetid."],
      ["Uden folie?", "Brug låg eller hollandsk ovn. Folie skal være tæt."],
      ["Feta ovenpå?", "De sidste 10 minutter — smelter flot."],
    ],
  }),
];
