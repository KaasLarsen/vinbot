/** Data: 20 nye vinretter — batch 2. */
export const UPDATED = "2026-09-23";

export const SLUG_EXPANSIONS = {
  "skaldyrsrisotto-med-hvidvin":
    "Varm fonden. Tilsæt skaldyr til sidst, så rejer og muslinger ikke bliver gummiagtige. Risotto skal være all'onda — cremet og bølgende, ikke grød.",
  "hvidvins-safransauce-til-laks":
    "Reducer hvidvin med safran først. Tag gryden af varmen og pisk koldt smør i (monter au beurre) — ellers skiller saucen. Server over dampet eller stegt laks.",
  "hvidvinsbraiserede-porrer":
    "Brug de hvide og lysegrønne dele. Brun først, simr i hvidvin og smør til møre. Reduktionen skal blive til en tyk glace.",
  "morbradgryde-med-paprika-og-hvidvin":
    "Klassisk dansk familiemiddag: mørbrad, bacon og cocktailpølser i paprika, tomat og hvidvin. Ikke den cremede svampevariant — her er det paprikabase.",
  "hvidvinsgele-med-sommerbaer":
    "Gelatine udblødes koldt. Vin må ikke koge efter gelatine — kun smeltes. Friske bær støbes ind, når geleen er lunken.",
};

function r(opts) {
  return {
    slug: opts.slug,
    title: opts.title,
    description: opts.description,
    tags: opts.tags,
    prepTime: opts.prepTime ?? "PT20M",
    cookTime: opts.cookTime ?? "PT40M",
    servings: opts.servings ?? 4,
    difficulty: opts.difficulty ?? "medium",
    wineInRecipe: opts.wineInRecipe,
    wineToDrink: opts.wineToDrink,
    relatedGuides: opts.relatedGuides,
    ingredients: opts.ingredients,
    instructions: opts.instructions,
    intro: opts.intro,
    whyTitle: opts.whyTitle ?? "Hvorfor vin i retten",
    why: opts.why,
    tips: opts.tips,
    serving: opts.serving,
    mistakes: opts.mistakes,
    storage: opts.storage,
    glass: opts.glass,
    faq: opts.faq,
  };
}

export const RECIPES = [
  r({
    slug: "skaldyrsrisotto-med-hvidvin",
    title: "Skaldyrsrisotto med hvidvin",
    description:
      "Cremet risotto med rejer, blæksprutte og muslinger, hvor risene først suger tør italiensk hvidvin. Opskrift til 4 — festlig skaldyrsret.",
    tags: ["opskrift", "italiensk", "risotto", "skaldyr", "hvidvin", "rejer", "muslinger", "hovedret"],
    prepTime: "PT25M",
    cookTime: "PT35M",
    difficulty: "medium",
    wineInRecipe: {
      style: "Tør italiensk hvidvin — Vermentino, Pinot Grigio, Orvieto eller Soave",
      amount: "2 dl hvidvin + fond",
      note: "Hvidvin suger ind i risen først; resten damper skaldyrene åbne og giver syre til risotton.",
    },
    wineToDrink: {
      guideSlug: "vin-til-risotto",
      searchQuery: "vermentino pinot grigio skaldyrsrisotto",
      searchMax: 200,
      label: "vin til skaldyrsrisotto",
    },
    relatedGuides: [
      "vin-til-risotto",
      "vin-til-fisk-og-skaldyr",
      "vin-til-rejer",
      "vin-til-muslinger",
    ],
    ingredients: [
      "320 g risotto-ris (arborio eller carnaroli)",
      "2 dl tør hvidvin",
      "1 l fiskefond, varm",
      "200 g rejer",
      "200 g blæksprutteringe (eller små blæksprutter)",
      "300 g muslinger, renset",
      "1 skalotteløg, finthakket",
      "2 fed hvidløg",
      "3 spsk olivenolie",
      "30 g smør",
      "2 spsk hakket persille",
      "Salt og peber",
      "Evt. chili og citronskal",
    ],
    instructions: [
      "Varm fonden. Svits skalotteløg og hvidløg i olie 3–4 minutter. Tilsæt ris — rist 1–2 minutter.",
      "Hæld hvidvin i. Rør til vinen er absorberet.",
      "Tilsæt fond øse for øse under omrøring, ca. 15–18 minutter, til risen er al dente.",
      "Steg blæksprutte kort i en pande (2–3 min). Tilsæt rejer og muslinger til risotton sammen med lidt fond. Kog under låg 3–4 minutter, til muslingerne åbner. Kassér lukkede.",
      "Rør smør og persille i. Smag til. Server straks.",
    ],
    intro: `**Skaldyrsrisotto med hvidvin** er den cremede italienske festret, hvor risene først drikker tør hvidvin, før rejer, blæksprutte og muslinger går i. Mere skaldyrsfokus end basis-[risotto med hvidvin](/opskrifter/risotto-med-hvidvin), og et søskende til [pasta vongole](/opskrifter/pasta-vongole-med-hvidvin) og [zuppa di pesce](/opskrifter/zuppa-di-pesce).`,
    why: `Risotto kræver **syre og aroma** tidligt. Hvidvin giver begge dele, før fonden tager over. Skaldyr tilsættes sent, så de ikke bliver sej. Se [vin til risotto](/guides/vin-til-risotto) og [vin til fisk og skaldyr](/guides/vin-til-fisk-og-skaldyr).`,
    tips: [
      ["Varm fond", "Kold fond stopper kogningen."],
      ["Skaldyr til sidst", "Ellers gummiagtige rejer."],
      ["All'onda", "Cremet, ikke stiv. Tilføj lidt fond lige før servering."],
      ["Ingen parmesan", "Klassisk skaldyrsrisotto er uden ost — citron og persille i stedet."],
    ],
    serving: `Server i varme dybe tallerkener. Grønt salatblad ved siden af. Afslut med [zabaglione](/opskrifter/zabaglione-med-hvidvin) eller [Moscato-sorbet](/opskrifter/moscato-dasti-sorbet).`,
    mistakes: [
      "Ost i skaldyrsrisotto — maskerer havsmag.",
      "At tilsætte al fond på én gang — grød.",
      "Overkogte muslinger — sej tekstur.",
      "Sød hvidvin — klaimatisk risotto.",
    ],
    storage: `Bedst frisk. Rester 1 dag — genvarm med fond til cremet igen. Frys ikke.`,
    glass: `Vermentino, Pinot Grigio eller Etna Bianco — se [vin til risotto](/guides/vin-til-risotto).`,
    faq: [
      [
        "Kan jeg bruge kun rejer?",
        "Ja — forenkl. Behold hvidvinstrinnet.",
      ],
      [
        "Frossen blæksprutte?",
        "Ja — tø op og dup tør. Steg kort på høj varme.",
      ],
      [
        "Carnaroli eller arborio?",
        "Carnaroli er mere tilgivende. Arborio fungerer fint.",
      ],
      [
        "Uden muslinger?",
        "Brug ekstra rejer eller kamskjell.",
      ],
    ],
  }),

  r({
    slug: "hvidvins-safransauce-til-laks",
    title: "Hvidvins- og safransauce til dampet laks",
    description:
      "Luksuriøs lysegul sauce af hvidvinsreduktion, safran og koldt smør pisket i. Opskrift til 4 — til dampet eller stegt laks.",
    tags: ["opskrift", "sauce", "laks", "hvidvin", "safran", "fisk", "tilbehør"],
    prepTime: "PT10M",
    cookTime: "PT15M",
    servings: 4,
    difficulty: "medium",
    wineInRecipe: {
      style: "Tør hvidvin — Chablis, Sauvignon Blanc, Muscadet eller Riesling",
      amount: "2 dl hvidvin",
      note: "Hvidvin reduceres med safran; koldt smør piskes i til en blank, lysegul sauce (monter au beurre).",
    },
    wineToDrink: {
      guideSlug: "vin-til-laks",
      searchQuery: "laks chablis pinot noir riesling safran",
      searchMax: 200,
      label: "vin til laks",
    },
    relatedGuides: [
      "vin-til-laks",
      "vin-til-fisk-og-skaldyr",
      "chardonnay-til-fisk",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "4 laksefileter à ca. 150 g (til servering)",
      "2 dl tør hvidvin",
      "1 knivspids safran (ca. 10 tråde)",
      "1 skalotteløg, finthakket",
      "100 g koldt usaltet smør i tern",
      "1 spsk creme fraiche (valgfrit)",
      "Saft af ½ citron",
      "Salt og peber",
      "Dild til pynt",
    ],
    instructions: [
      "Udblød safran i 2 spsk varm hvidvin 5 minutter.",
      "Damp eller steg laksen separat. Hold varm.",
      "Svits skalotteløg i en lille gryde 2 minutter. Hæld resten af vinen og safranblandingen i. Kog ind til ca. 3–4 spsk er tilbage.",
      "Tag gryden af varmen. Pisk koldt smør i lidt ad gangen, til saucen er blank og tyk. Rør evt. creme fraiche og citron i. Smag til.",
      "Hæld sauce over laksen. Pynt med dild. Server straks.",
    ],
    intro: `**Hvidvins- og safransauce til dampet laks** er den luksuriøse, lysegule sauce, hvor reduceret hvidvin og safran møder koldt smør. Mere præcis end [dampet laks med rosévinssauce](/opskrifter/dampet-laks-med-rosevinssauce), og samme safran-duo som i [pærer i hvidvin og safran](/opskrifter/paerer-i-hvidvin-og-safran) — her til fisk.`,
    why: `Safran farver og dufter; **hvidvin** giver syre. Teknikken *monter au beurre* binder fedt og væske til en emulsion. For høj varme skiller saucen. Se [vin til laks](/guides/vin-til-laks).`,
    tips: [
      ["Af varmen", "Smør piskes i uden for kogning."],
      ["Koldt smør", "Varmt smør emulgerer dårligere."],
      ["Reduktion", "For tynd base = slap sauce."],
      ["Server med det samme", "Emulsionen venter ikke."],
    ],
    serving: `Over dampet, ovnbagt eller pandestegt laks. Tilbehør: [hvidvinsbraiserede porrer](/opskrifter/hvidvinsbraiserede-porrer) eller asparges.`,
    mistakes: [
      "At koge efter smørret er i — skilt sauce.",
      "For meget safran — bitter.",
      "For lidt reduktion — vandig.",
      "At holde saucen på høj varme — skiller.",
    ],
    storage: `Sauce bedst frisk. Laks 1 dag i køleskab. Genvarm sauce meget blidt under piskning — ofte bedre at lave nyt.`,
    glass: `Chablis, Riesling eller let pinot noir — se [vin til laks](/guides/vin-til-laks).`,
    faq: [
      [
        "Kan saucen laves til torsk?",
        "Ja — perfekt til [torsk en papillote](/opskrifter/hvidvinsdampet-torsk-en-papillote).",
      ],
      [
        "Uden safran?",
        "Stadig god hvidvins-smørsauce. Safran er farve og aroma.",
      ],
      [
        "Fløde i stedet for smør?",
        "Ja — tilsæt fløde efter reduktion og kog let ind. Anden tekstur.",
      ],
      [
        "Safran er dyrt — hvor meget?",
        "En knivspids (10–15 tråde) rækker til 4 personer.",
      ],
    ],
  }),

  r({
    slug: "hvidvinsbraiserede-porrer",
    title: "Hvidvinsbraiserede porrer",
    description:
      "Porrestykker brunet og simret i smør, hvidvin og timian til en tyk glace. Opskrift til 4 — elegant tilbehør til fisk og kylling.",
    tags: ["opskrift", "tilbehør", "porre", "hvidvin", "vegetar", "fransk"],
    prepTime: "PT10M",
    cookTime: "PT30M",
    servings: 4,
    difficulty: "easy",
    wineInRecipe: {
      style: "Tør hvidvin — Muscadet, Chablis, Pinot Grigio eller Sauvignon Blanc",
      amount: "2 dl hvidvin",
      note: "Hvidvin og smør braiserer porrerne møre; vinen reduceres til glace.",
    },
    wineToDrink: {
      guideSlug: "vin-til-grillet-gront",
      searchQuery: "porre hvidvin muscadet chablis",
      searchMax: 180,
      label: "vin til porrer",
    },
    relatedGuides: [
      "vin-til-grillet-gront",
      "vin-til-vegetar-og-gront",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "4 store porrer (hvide og lysegrønne dele)",
      "2 dl tør hvidvin",
      "40 g smør",
      "1 spsk olivenolie",
      "2 kviste timian",
      "1 fed hvidløg, knust (valgfrit)",
      "Salt og peber",
    ],
    instructions: [
      "Rens porrerne grundigt. Skær i stykker à 8–10 cm (eller i skiver på sned).",
      "Varm olie og halvdelen af smørret. Brun porrer 4–5 minutter pr. side.",
      "Tilsæt timian, evt. hvidløg og hvidvin. Salt og peber.",
      "Simr under låg 15–20 minutter, til porrerne er møre.",
      "Tag låg af. Kog ind til tyk glace (3–5 min). Pisk resten af smørret i. Server.",
    ],
    intro: `**Hvidvinsbraiserede porrer** er det milde, elegante tilbehør, hvor porrer simrer i smør og hvidvin, til vinen bliver en tyk glace. Søskende til [hvidvinsbraiseret fennikel](/opskrifter/hvidvinsbraiseret-fennikel) — perfekt til [laks med safransauce](/opskrifter/hvidvins-safransauce-til-laks) eller kylling.`,
    why: `Porrer er søde og milde. **Hvidvin** giver syre og aroma; reduktionen koncentrerer smagen til glace. Se [vin til grillet grønt](/guides/vin-til-grillet-gront).`,
    tips: [
      ["Rens godt", "Sand gemmer sig mellem lagene."],
      ["Bruning", "Farve før vin = mere smag."],
      ["Glace", "Skal coat'e porrerne, ikke svømme."],
      ["Kun lyse dele", "Mørkegrønne toppe er bitrere til braising."],
    ],
    serving: `Til fisk, kylling, kalv eller som vegetarisk hovedret med æg og brød.`,
    mistakes: [
      "For kort tid — sej midte.",
      "For meget vin uden reduktion — vandigt.",
      "Dårlig rensning — sand mellem tænderne.",
      "Sød hvidvin — klaimatisk tilbehør.",
    ],
    storage: `Køleskab 3 dage. Genvarm blidt. Frys ikke — teksturen bliver slap.`,
    glass: `Match hovedretten. Alene: Muscadet eller Chablis. Se [vin til vegetar](/guides/vin-til-vegetar-og-gront).`,
    faq: [
      [
        "Kan jeg bruge baby-porrer?",
        "Ja — kortere simring. Hele baby-porrer ser flotte ud.",
      ],
      [
        "Vegansk?",
        "Erstat smør med olivenolie eller vegansk smør.",
      ],
      [
        "Til flæskesteg?",
        "Ja — milde porrer balancerer fedt. Eller se [hvidvinsmarineret svinekam](/opskrifter/hvidvinsmarineret-svinekam).",
      ],
      [
        "Ovnen i stedet?",
        "Ja — 180 °C i tæt fad med vin og smør 25–35 min.",
      ],
    ],
  }),

  r({
    slug: "morbradgryde-med-paprika-og-hvidvin",
    title: "Mørbradgryde med paprika og hvidvin",
    description:
      "Dansk familiemiddag: mørbrad, bacon og cocktailpølser i paprika, tomat og hvidvin. Opskrift til 4 — hverdagsgryde med vin i basen.",
    tags: ["opskrift", "dansk", "mørbrad", "hvidvin", "paprika", "gryderet", "hverdag", "hovedret"],
    prepTime: "PT20M",
    cookTime: "PT45M",
    servings: 4,
    difficulty: "easy",
    wineInRecipe: {
      style: "Tør hvidvin — Pinot Grigio, Riesling tør eller Chardonnay uden tung eg",
      amount: "2 dl hvidvin",
      note: "Hvidvin deglacerer efter bruning og simrer med tomat og paprika til en syrlig-sød base.",
    },
    wineToDrink: {
      guideSlug: "vin-til-svinemoerbrad",
      searchQuery: "mørbradgryde riesling pinot noir paprika",
      searchMax: 180,
      label: "vin til mørbradgryde",
    },
    relatedGuides: [
      "vin-til-svinemoerbrad",
      "vin-til-svinekoed",
      "vin-til-gryderet",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "500 g svinemørbrad i tern",
      "150 g bacon i tern",
      "1 dåse cocktailpølser (ca. 200–250 g), dryppet",
      "2 dl tør hvidvin",
      "1 dåse hakkede tomater (400 g)",
      "2 spsk tomatpuré",
      "2 spsk sødpaprika",
      "1 tsk røget paprika (valgfrit)",
      "2 løg i båter",
      "2 fed hvidløg",
      "2 dl fløde eller creme fraiche",
      "1 spsk smør",
      "1 spsk olie",
      "Salt og peber",
      "Ris eller kartofler til servering",
    ],
    instructions: [
      "Brun bacon i gryde. Tag op. Brun mørbrad i hold i baconfedt + olie/smør. Tag op.",
      "Steg løg 5 minutter. Tilsæt hvidløg, tomatpuré og paprika — rist 1 minut.",
      "Hæld hvidvin i. Kog 2–3 minutter. Skrab bunden fri.",
      "Tilsæt tomater, bacon og mørbrad. Simr under låg 20–25 minutter.",
      "Tilsæt cocktailpølser og fløde. Simr 5–10 minutter. Smag til.",
      "Server med ris eller kartofler.",
    ],
    intro: `**Mørbradgryde med paprika og hvidvin** er den velkendte danske familiemiddag med cocktailpølser, bacon og paprika — her med hvidvin i basen. Anderledes end den cremede [mørbradgryde med svampe](/opskrifter/morbradgryde-med-hvidvin): her er det tomat, paprika og pølser, der definerer retten.`,
    why: `Paprika og tomat er søde og fyldige. **Hvidvin** giver syre, der holder gryden frisk, og løfter de brune smagsstoffer fra panden. Se [vin til svinemørbrad](/guides/vin-til-svinemoerbrad).`,
    tips: [
      ["Rist paprika", "1 minut i fedt — ellers rå smag."],
      ["Cocktailpølser til sidst", "De skal bare varmes."],
      ["Sødpaprika", "Ikke kun røget — ellers for BBQ-agtig."],
      ["Fløde", "Afrunder. Creme fraiche giver mere syre."],
    ],
    serving: `Ris, kartoffelmos eller pasta. Grøn ærter eller agurkesalat ved siden af.`,
    mistakes: [
      "At brænde paprika — bitter.",
      "For magert kød uden bacon — kedelig.",
      "At koge cocktailpølser længe — sprænger og bliver tørre.",
      "Sød hvidvin — klaimatisk tomatbase.",
    ],
    storage: `Køleskab 3 dage. Smager ofte bedre dagen efter. Frys op til 2 måneder.`,
    glass: `Tør Riesling, Pinot Grigio eller let pinot noir — se [vin til svinemørbrad](/guides/vin-til-svinemoerbrad).`,
    faq: [
      [
        "Uden cocktailpølser?",
        "Ja — brug ekstra mørbrad eller chorizo-skiver.",
      ],
      [
        "Forskel på den anden mørbradgryde?",
        "Den eksisterende er cremet med svampe. Denne er paprika-tomat med pølser.",
      ],
      [
        "Kan børnene spise den?",
        "Alkoholen koger væk. Smagen af vin er mild i den færdige ret.",
      ],
      [
        "Rødvin i stedet?",
        "Ja — dybere farve. Hvidvin holder den klassiske lyse danske profil.",
      ],
    ],
  }),

  r({
    slug: "hvidvinsgele-med-sommerbaer",
    title: "Hvidvinsgelé med sommerbær",
    description:
      "Gennemsigtig dessertgelé af aromatisk hvidvin (fx Riesling) med friske hindbær og jordbær støbt indeni. Opskrift til 6.",
    tags: ["opskrift", "dessert", "gelé", "hvidvin", "bær", "sommer", "fest"],
    prepTime: "PT20M",
    cookTime: "PT10M",
    servings: 6,
    difficulty: "easy",
    wineInRecipe: {
      style: "Aromatisk hvidvin — Riesling, Moscato (tør/halvtør) eller Gewürztraminer let",
      amount: "5 dl hvidvin",
      note: "Hvidvin stivnes med gelatine til klar gelé; sommerbær støbes ind.",
    },
    wineToDrink: {
      guideSlug: "vin-til-dessert-og-kransekage",
      searchQuery: "riesling dessertvin sommerbær gelé",
      searchMax: 180,
      label: "vin til bærdessert",
    },
    relatedGuides: [
      "vin-til-dessert-og-kransekage",
      "bedste-dessertvin",
    ],
    ingredients: [
      "5 dl aromatisk hvidvin (fx Riesling)",
      "80–100 g sukker (efter vinens sødme)",
      "6 blade gelatine (eller 2½ tsk pulver)",
      "250 g jordbær, halverede",
      "150 g hindbær",
      "Saft af ½ citron",
      "Evt. mynte til pynt",
    ],
    instructions: [
      "Udblød gelatine i koldt vand 5 minutter.",
      "Varm vin, sukker og citronsaft til sukkeret er opløst — må ikke koge voldsomt. Tag af varmen.",
      "Vrid gelatine og rør i, til opløst. Køl til lunken (ca. kropstemperatur).",
      "Fordel bær i 6 glas eller en form. Hæld gele over. Køl mindst 4 timer, gerne overnight.",
      "Server kold. Pynt med mynte.",
    ],
    intro: `**Hvidvinsgelé med sommerbær** er den klare, elegante dessert, hvor Riesling (eller lignende) stivnes omkring jordbær og hindbær. Lysere end [mousserende vingelé](/opskrifter/mousserende-vingele-med-friske-baer) og [klar rødvinsgelé](/opskrifter/klar-rodvinsgele-med-vanilje) — her er det stille hvidvin og sommerbær i centrum.`,
    why: `Aromatisk hvidvin har **blomster- og frugtnoter**, der klæder bær. Gelatine giver struktur uden at maskere vinen. Citron holder smagen skarp. Se [dessertvin](/guides/bedste-dessertvin).`,
    tips: [
      ["Lunken gele", "For varm = bærene koger. For kold = sætter for tidligt."],
      ["Sødme", "Tør Riesling kræver mere sukker end halvtør."],
      ["Klare glas", "Lagene/bærrene er visuelt vigtige."],
      ["Overnight", "Bedst sat og smagfuld dagen efter."],
    ],
    serving: `Server med let flødeskum eller alene. Til brunch eller sommerfest. Se også [Moscato-sorbet](/opskrifter/moscato-dasti-sorbet).`,
    mistakes: [
      "At koge efter gelatine — geleen stivner dårligt.",
      "For lidt gelatine — slap dessert.",
      "Meget egede vine — tunge i gelé.",
      "At bruge frosne bær uden at tø/dræne — vandig gele.",
    ],
    storage: `Køleskab 3 dage tildækket. Frys ikke.`,
    glass: `Samme Riesling eller et glas Moscato. Se [vin til dessert](/guides/vin-til-dessert-og-kransekage).`,
    faq: [
      [
        "Forskel på mousserende vingelé?",
        "Mousserende bruger bobler; denne bruger stille hvidvin — klarere vinaroma.",
      ],
      [
        "Agar i stedet for gelatine?",
        "Ja — følg pakkens dosering. Agar sætter firmer.",
      ],
      [
        "Andre bær?",
        "Blåbær, ribs eller ferskenskiver om sommeren.",
      ],
      [
        "Alkohol i den færdige gele?",
        "Noget forsvinder ikke. Den er ikke alkoholfri.",
      ],
    ],
  }),
];

export const GUIDE_RECIPE_ADDITIONS = {
  "vin-til-risotto": [
    { slug: "skaldyrsrisotto-med-hvidvin", label: "Skaldyrsrisotto med hvidvin" },
  ],
  "vin-til-fisk-og-skaldyr": [
    { slug: "skaldyrsrisotto-med-hvidvin", label: "Skaldyrsrisotto" },
    { slug: "hvidvins-safransauce-til-laks", label: "Hvidvins-safransauce til laks" },
  ],
  "vin-til-rejer": [
    { slug: "skaldyrsrisotto-med-hvidvin", label: "Skaldyrsrisotto" },
  ],
  "vin-til-muslinger": [
    { slug: "skaldyrsrisotto-med-hvidvin", label: "Skaldyrsrisotto" },
  ],
  "vin-til-laks": [
    { slug: "hvidvins-safransauce-til-laks", label: "Hvidvins-safransauce til laks" },
  ],
  "chardonnay-til-fisk": [
    { slug: "hvidvins-safransauce-til-laks", label: "Hvidvins-safransauce til laks" },
  ],
  "vin-til-grillet-gront": [
    { slug: "hvidvinsbraiserede-porrer", label: "Hvidvinsbraiserede porrer" },
  ],
  "vin-til-vegetar-og-gront": [
    { slug: "hvidvinsbraiserede-porrer", label: "Hvidvinsbraiserede porrer" },
  ],
  "vin-til-svinemoerbrad": [
    { slug: "morbradgryde-med-paprika-og-hvidvin", label: "Mørbradgryde med paprika og hvidvin" },
  ],
  "vin-til-svinekoed": [
    { slug: "morbradgryde-med-paprika-og-hvidvin", label: "Mørbradgryde med paprika" },
  ],
  "vin-til-gryderet": [
    { slug: "morbradgryde-med-paprika-og-hvidvin", label: "Mørbradgryde med paprika" },
  ],
  "vin-til-dessert-og-kransekage": [
    { slug: "hvidvinsgele-med-sommerbaer", label: "Hvidvinsgelé med sommerbær" },
  ],
  "bedste-dessertvin": [
    { slug: "hvidvinsgele-med-sommerbaer", label: "Hvidvinsgelé med sommerbær" },
  ],
  "sadan-bruger-du-vin-til-sauce-og-simren": [
    { slug: "hvidvins-safransauce-til-laks", label: "Hvidvins-safransauce" },
    { slug: "hvidvinsbraiserede-porrer", label: "Hvidvinsbraiserede porrer" },
  ],
};
