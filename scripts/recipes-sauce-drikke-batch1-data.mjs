/** Data: Sauce + drikke batch 1 — portvinssauce, beurre blanc, gløgg x2, Kir Royal. */
export const UPDATED = "2026-09-23";

export const SLUG_EXPANSIONS = {
  "portvinssauce-til-oksemoerbrad":
    "Ruby port giver frugt; tawny mere nøddeagtig dybde. Reducer til sirupagtig konsistens, før du monterer med smør. Sauce til 4 portioner oksemørbrad — fordobl til gæster.",
  "beurre-blanc":
    "Klassisk fransk smørsauce på hvidvin, skalotteløg og koldt smør. Hold under 60 °C når du monterer — ellers skiller den. Perfekt til fisk og asparges.",
  "roedvinsgloegg":
    "Klassisk dansk rødvinsgløgg med kanel, nelliker, appelsin og et skvæt port/rom. Må ikke koge efter vinen er i — alkoholen forsvinder, og smagen bliver flad.",
  "portvinsgloegg":
    "Fyldigere gløgg med ruby port som base, æblejuice og julekrydderier. Mere intens end rødvinsgløgg — server i mindre glas.",
  "kir-royal":
    "Crème de cassis i bunden, tør champagne eller crémant ovenpå. Forhold ca. 1:5. Server iskold i flute.",
};

function r(opts) {
  return {
    slug: opts.slug,
    title: opts.title,
    description: opts.description,
    tags: opts.tags,
    prepTime: opts.prepTime ?? "PT10M",
    cookTime: opts.cookTime ?? "PT20M",
    servings: opts.servings ?? 4,
    difficulty: opts.difficulty ?? "easy",
    wineInRecipe: opts.wineInRecipe,
    wineToDrink: opts.wineToDrink,
    relatedGuides: opts.relatedGuides,
    ingredients: opts.ingredients,
    instructions: opts.instructions,
    intro: opts.intro,
    whyTitle: opts.whyTitle ?? "Hvorfor vin i opskriften",
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
    slug: "portvinssauce-til-oksemoerbrad",
    title: "Portvinssauce til oksemørbrad",
    description:
      "Klassisk portvinssauce med fond, skalotteløg og smør — blank, sød-syrlig sauce til oksemørbrad og fest. Opskrift til 4 personer.",
    tags: ["opskrift", "sauce", "portvin", "oksekød", "mørbrad", "fest"],
    prepTime: "PT10M",
    cookTime: "PT25M",
    wineInRecipe: {
      style: "Rød portvin — ruby eller tawny",
      amount: "2 dl portvin",
      note: "Portvin reduceres med fond til en blank, koncentreret sauce, der balancerer fedt oksekød.",
    },
    wineToDrink: {
      guideSlug: "vin-til-oksefilet",
      searchQuery: "oksemørbrad cabernet bordeaux fest",
      searchMax: 200,
      label: "vin til oksemørbrad",
    },
    relatedGuides: [
      "vin-til-oksefilet",
      "bedste-portvin",
      "sadan-bruger-du-vin-til-sauce-og-simren",
      "vin-til-oksekoed-i-sauce",
    ],
    ingredients: [
      "2 dl rød portvin (ruby eller tawny)",
      "2 dl oksefond (gerne hjemmelavet eller god færdig)",
      "2 skalotteløg, finthakkede",
      "1 spsk smør til sautering",
      "50 g koldt smør i tern til montering",
      "1 kvist timian",
      "1 tsk balsamico eller rødvinseddike (valgfrit)",
      "Salt og friskkværnet peber",
      "Evt. stegesky fra mørbrad",
    ],
    instructions: [
      "Sauter skalotteløg i 1 spsk smør, til de er bløde og let gyldne (3–4 min).",
      "Hæld portvin i. Kog op og reducer til ca. halvdelen (5–8 min).",
      "Tilsæt fond, timian og evt. stegesky. Simr til saucen er sirupagtig og coater en ske (10–12 min).",
      "Fjern timian. Tag gryden af varmen. Monter med koldt smør under omrøring — saucen skal blive blank.",
      "Smag til med salt, peber og evt. balsamico. Si hvis du vil have den helt glat. Server straks til skåret oksemørbrad.",
    ],
    intro: `**Portvinssauce til oksemørbrad** er festklassikeren: sød-syrlig dybde, blank overflade og den rigtige tykkelse til rosa kød. Tæt på [rødvinsauce til bøf](/opskrifter/roedvinssauce-til-boef), men med portvins karakter. Passer også til [balsamico-rødvinsmarineret oksemørbrad](/opskrifter/balsamico-rodvinsmarineret-oksemoerbrad) og [andebryst med portvins-figneglasering](/opskrifter/andebryst-med-portvins-og-figneglasering).`,
    whyTitle: "Hvorfor portvin i saucen",
    why: `Portvin er koncentreret og let sød — den reducerer til **glasur-agtig sauce** uden ekstra sukker. Fond giver umami; koldt smør giver silke. Se [bedste portvin](/guides/bedste-portvin) og [vin til sauce](/guides/sadan-bruger-du-vin-til-sauce-og-simren).`,
    tips: [
      ["Ruby vs tawny", "Ruby er frugtagtig; tawny mere nøddeagtig og kompleks."],
      ["Ikke koge efter smør", "Ellers skiller saucen."],
      ["Stegesky", "Debrunede rester fra panden er guld — deglaze med lidt port først."],
      ["Konsistens", "Skal coat'e bagsiden af en ske."],
    ],
    serving: `Oksemørbrad, culotte eller [oksehøjreb](/opskrifter/oksehojreb-marineret-i-rodvin). Kartoffelmos, rodfrugter eller bønner. Til glasset: Cabernet eller elegant Bordeaux — se [vin til oksefilet](/guides/vin-til-oksefilet).`,
    mistakes: [
      "At koge saucen efter smørret er i — skiller.",
      "For sød dessertport uden syre — klaimatisk.",
      "For tynd — reducer længere før montering.",
      "At salte for tidligt — fonden kan være salt i forvejen.",
    ],
    storage: `Uden smørmontering: 3 dage kølet. Genopvarm forsigtigt og monter smør lige før servering. Fryses uden smør i op til 1 måned.`,
    glass: `Cabernet, Bordeaux eller kraftig Syrah — se [vin til oksekød i sauce](/guides/vin-til-oksekoed-i-sauce). Lille port efter maden er klassisk.`,
    faq: [
      [
        "Kan jeg bruge hvid port?",
        "Ja til lyst kød eller fisk — anden profil. Til mørbrad er rød port standard.",
      ],
      [
        "Uden fond?",
        "Brug koncentreret bouillon, men smag til for salt. Hjemmelavet fond er bedst.",
      ],
      [
        "Til vildt?",
        "Ja — se også [vildtgryde med portvin](/opskrifter/vildtgryde-med-portvin-og-enebaer).",
      ],
      [
        "Kan den laves dagen før?",
        "Ja — reducer basen, køl, og monter smør ved opvarmning.",
      ],
    ],
  }),

  r({
    slug: "beurre-blanc",
    title: "Beurre blanc — klassisk hvidvinssauce",
    description:
      "Fransk beurre blanc med hvidvin, skalotteløg og koldt smør — silkeblød sauce til fisk, kammuslinger og asparges. Opskrift til 4 personer.",
    tags: ["opskrift", "sauce", "hvidvin", "beurre blanc", "fisk", "fransk"],
    prepTime: "PT10M",
    cookTime: "PT15M",
    wineInRecipe: {
      style: "Tør, syrlig hvidvin — Sauvignon Blanc, Muscadet eller Chablis",
      amount: "1½ dl hvidvin",
      note: "Hvidvinens syre er rygraden i beurre blanc — den reduceres med skalotteløg, før smørret monteres.",
    },
    wineToDrink: {
      guideSlug: "vin-til-lys-fisk",
      searchQuery: "beurre blanc sauvignon blanc chablis fisk",
      searchMax: 200,
      label: "vin til fisk med beurre blanc",
    },
    relatedGuides: [
      "vin-til-lys-fisk",
      "vin-til-fisk-og-skaldyr",
      "sadan-bruger-du-vin-til-sauce-og-simren",
      "vin-til-asparges",
    ],
    ingredients: [
      "1½ dl tør hvidvin",
      "2 spsk hvidvinseddike (eller citronsaft)",
      "2 skalotteløg, meget finthakkede",
      "200 g koldt usaltet smør i små tern",
      "Salt og hvid peber",
      "Evt. 1 spsk fløde (stabiliserer for begyndere)",
      "Evt. finthakket estragon eller purløg til slut",
    ],
    instructions: [
      "Kom skalotteløg, hvidvin og eddike i en lille gryde. Kog ind til 2–3 spsk væske er tilbage (næsten tør, men ikke brændt).",
      "Sæt varmen på lav. Tilsæt evt. fløde. Begynd at piske smørtern i én ad gangen — gryden må ikke koge.",
      "Fortsæt til saucen er cremet og blank. Si skalotteløg fra, hvis du vil have den silkeagtig.",
      "Smag til med salt, hvid peber og evt. urter. Hold varm (ikke kogende) til servering — max 50–55 °C.",
    ],
    intro: `**Beurre blanc** er den franske klassiker: hvidvin, skalotteløg og smør pisket til silke. Den hører til fisk, [asparges i hvidvinsauce](/opskrifter/asparges-i-hvidvinsauce) og skaldyr — lettere og mere elegant end [gorgonzolasauce](/opskrifter/gorgonzolasauce-med-hvidvin). Navnet betyder bogstaveligt «hvid smør».`,
    whyTitle: "Hvorfor hvidvin i beurre blanc",
    why: `Syren fra **tør hvidvin** (og eddike) er det, der holder emulsionen stabil og giver friskhed mod fedt smør. Fadlagret Chardonnay er for tung. Se [vin til lys fisk](/guides/vin-til-lys-fisk).`,
    tips: [
      ["Koldt smør", "Varmt smør skiller saucen."],
      ["Lav varme", "Over 60–65 °C = skilt sauce."],
      ["Reduktion først", "Skalotteløg + vin skal næsten være væk."],
      ["Fløde-trick", "1 spsk fløde gør den mere tilgivende."],
    ],
    serving: `Torsk, rødspætte, [hvidvinsdampet torsk](/opskrifter/hvidvinsdampet-torsk-en-papillote), kammuslinger eller dampede asparges. Samme Sauvignon/Chablis i glasset.`,
    mistakes: [
      "At koge efter smørret er i.",
      "At tilsætte alt smør på én gang.",
      "For sød eller fadlagret vin.",
      "At holde saucen for varm på kanten af komfuret.",
    ],
    storage: `Bedst frisk. Kan holdes max 30–45 min i vandbad (varmt, ikke kogende). Genopvarmning er svær — lav frisk til gæster.`,
    glass: `Sauvignon Blanc, Muscadet eller Chablis — se [vin til fisk og skaldyr](/guides/vin-til-fisk-og-skaldyr).`,
    faq: [
      [
        "Beurre blanc vs hollandaise?",
        "Hollandaise er æggeblomme + smør. Beurre blanc er vinreduktion + smør — ingen æg.",
      ],
      [
        "Kan den laves med rosé?",
        "Ja — lyserød «beurre rosé». Samme teknik.",
      ],
      [
        "Skilt sauce — redning?",
        "Pisk lidt koldt smør eller en skvæt koldt vand i uden for varmen. Eller start forfra med 1 spsk fløde.",
      ],
      [
        "Til kylling?",
        "Ja — især bryst med estragon. Se også [hvidvins-estragonmarinade](/opskrifter/hvidvins-estragonmarinade).",
      ],
    ],
  }),

  r({
    slug: "roedvinsgloegg",
    title: "Rødvinsgløgg — klassisk dansk",
    description:
      "Hjemmelavet rødvinsgløgg med kanel, nelliker, appelsin, portvin og rom. Nem opskrift til julehygge — ca. 8–10 glas.",
    tags: ["opskrift", "gløgg", "rødvin", "jul", "drik", "varm"],
    prepTime: "PT15M",
    cookTime: "PT30M",
    servings: 8,
    wineInRecipe: {
      style: "Frugtig rødvin — merlot, tempranillo eller billig god hverdagsrødvin",
      amount: "1 flaske (75 cl) rødvin + port/rom",
      note: "Rødvin er basen; port og rom giver dybde. Krydderier trækkes i varmen uden at koge vinen.",
    },
    wineToDrink: {
      guideSlug: "bedste-julevin",
      searchQuery: "gløgg rødvin jul portvin",
      searchMax: 200,
      label: "vin og gløgg til jul",
    },
    relatedGuides: [
      "bedste-julevin",
      "vin-til-juleaften",
      "vin-til-julefrokost",
      "vin-i-cocktails-spritz-og-drikke",
    ],
    ingredients: [
      "1 flaske (75 cl) frugtig rødvin",
      "1–1½ dl portvin",
      "½–1 dl mørk rom (valgfrit)",
      "1–1½ dl rørsukker (smag til)",
      "1 appelsin (saft + skal uden pith)",
      "2 kanelstænger",
      "6–8 hele nelliker",
      "2 stjerneanis",
      "1 vaniljestang eller 1 tsk vaniljesukker",
      "Gløggmix: rosiner og mandelsplitter til servering",
    ],
    instructions: [
      "Kom ca. halvdelen af rødvinen i en gryde med kanel, nelliker, stjerneanis, vanilje, appelsinskal og -saft. Varm forsigtigt op — må ikke koge.",
      "Lad trække 30–60 minutter (eller natten over afkølet) under låg.",
      "Si krydderierne fra. Tilsæt resten af rødvinen, port, rom og sukker. Varm op til behagelig drikketemperatur — stadig uden at koge.",
      "Smag til. Server i varme glas med rosiner og mandler.",
    ],
    intro: `**Rødvinsgløgg** er den danske juleklassiker — varm, krydret og nem at lave i stor portion. Mere traditionel end [portvinsgløgg](/opskrifter/portvinsgloegg), og et oplagt match til æbleskiver og julefrokost. Brug en vin, du gerne drikker; dyre flasker er spild i gryden.`,
    whyTitle: "Hvorfor rødvin i gløggen",
    why: `Rødvin giver **farve, frugt og krop**. Port og rom forstærker; krydderierne skal trækkes i varmen — ikke koges ihjel. Se [bedste julevin](/guides/bedste-julevin) og [vin i cocktails](/guides/vin-i-cocktails-spritz-og-drikke).`,
    tips: [
      ["Må ikke koge", "Efter vinen er i — ellers flad smag."],
      ["Trækketid", "Længere = mere krydderi. Nat over er luksus."],
      ["Sukker", "Start lavt — smag til til sidst."],
      ["Hold varm", "Termokande eller lav varme."],
    ],
    serving: `Æbleskiver, pebernødder, brunkager. Til julefrokost — se [vin til julefrokost](/guides/vin-til-julefrokost).`,
    mistakes: [
      "At koge gløggen — alkohol og aroma forsvinder.",
      "For billig, bitter vin — bitter gløgg.",
      "For meget nellike — medicinsk smag.",
      "At glemme at si — nelliker i munden er træls.",
    ],
    storage: `Afkølet gløgg holder 3–4 dage i køleskab. Varm forsigtigt op. Kryddertræk kan fryses.`,
    glass: `Gløggen er drikkken — til mad: let rødvin eller øl. Se [vin til juleaften](/guides/vin-til-juleaften).`,
    faq: [
      [
        "Alkoholfri?",
        "Brug rød druemos eller solbærsaft + æblejuice, samme krydderier. Tilsæt evt. alkoholfri rødvin.",
      ],
      [
        "Kan jeg bruge hvidvin?",
        "Ja — lysere gløgg. Eller gå direkte til hvidvins-version en anden gang.",
      ],
      [
        "Hvor stærk?",
        "Juster rom og port. Til børnebord: separat gryde uden alkohol.",
      ],
      [
        "Forud?",
        "Lav kryddertræk dagen før — hurtigere på dagen.",
      ],
    ],
  }),

  r({
    slug: "portvinsgloegg",
    title: "Portvinsgløgg",
    description:
      "Fyldig gløgg med ruby port, æblejuice, kanel og appelsin — intens julevarme i glasset. Opskrift til ca. 6–8 glas.",
    tags: ["opskrift", "gløgg", "portvin", "jul", "drik", "varm"],
    prepTime: "PT10M",
    cookTime: "PT25M",
    servings: 6,
    wineInRecipe: {
      style: "Ruby portvin — frugtig og sød",
      amount: "5 dl portvin + æblejuice",
      note: "Portvin er hovedrollen — mere koncentreret end klassisk rødvinsgløgg, derfor fortyndes med æblejuice.",
    },
    wineToDrink: {
      guideSlug: "bedste-portvin",
      searchQuery: "portvin gløgg jul ruby",
      searchMax: 200,
      label: "portvin til jul",
    },
    relatedGuides: [
      "bedste-portvin",
      "hvad-er-portvin",
      "bedste-julevin",
      "vin-til-juleaften",
    ],
    ingredients: [
      "5 dl ruby portvin",
      "3 dl æblejuice (gerne ufiltreret)",
      "2–3 spsk brun farin eller rørsukker (smag til — port er allerede sød)",
      "1 appelsin i skiver",
      "2 kanelstænger",
      "4 nelliker",
      "1 stjerneanis",
      "Evt. ½ dl mørk rom",
      "Rosiner og mandler til servering",
    ],
    instructions: [
      "Kom port, æblejuice, farin, appelsinskiver og krydderier i en gryde.",
      "Varm forsigtigt op under låg i 15–20 minutter — må ikke koge.",
      "Smag til. Tilsæt evt. rom. Si krydderier fra, eller lad dem ligge til pynt (fjern nelliker).",
      "Server i små varme glas med rosiner og mandler.",
    ],
    intro: `**Portvinsgløgg** er den fyldigere kusine til [rødvinsgløgg](/opskrifter/roedvinsgloegg) — ruby port, æblejuice og julekrydderier. Mere intens, så server i mindre glas. Perfekt når du allerede har port i huset til [portvinssauce](/opskrifter/portvinssauce-til-oksemoerbrad) eller dessert.`,
    whyTitle: "Hvorfor portvin i gløggen",
    why: `Port er sød og koncentreret — den giver **krop og julevarme** med færre flasker end rødvinsgløgg. Æblejuice letter sødmen. Se [hvad er portvin](/guides/hvad-er-portvin).`,
    tips: [
      ["Ruby", "Bedst til gløgg — frugtigt og prisvenligt."],
      ["Mindre glas", "Den er stærkere end rødvinsgløgg."],
      ["Sukker forsigtigt", "Port er allerede sød."],
      ["Ikke koge", "Samme regel som al gløgg."],
    ],
    serving: `Æbleskiver, chokolade eller [portvinsglaserede dadler](/opskrifter/portvinsglaserede-dadler-med-bacon) til snacks. Se [portvin til chokolade](/guides/portvin-til-chokolade).`,
    mistakes: [
      "At bruge dyr vintage port — spild.",
      "At koge — flad og alkoholsvag.",
      "For meget sukker oveni port.",
      "Store ølglas — for kraftig drik.",
    ],
    storage: `3–4 dage kølet. Varm forsigtigt. Smager godt næste dag.`,
    glass: `Gløggen er drikkken. Til ostebordet bagefter: tawny — se [portvin til ost](/guides/portvin-til-ost).`,
    faq: [
      [
        "Tawny i stedet?",
        "Ja — mere nøddeagtig. Ruby er mere klassisk «rød» gløgg.",
      ],
      [
        "Uden æblejuice?",
        "Fortynd med rødvin eller solbærsaft.",
      ],
      [
        "Til mange gæster?",
        "Fordobl — hold varm i termokande.",
      ],
      [
        "Alkoholfri version?",
        "Drue-/solbærsaft + æblejuice + samme krydderier.",
      ],
    ],
  }),

  r({
    slug: "kir-royal",
    title: "Kir Royal",
    description:
      "Klassisk Kir Royal med crème de cassis og tør champagne eller crémant — elegant aperitif på 2 minutter. Opskrift til 1 glas (nem at scale).",
    tags: ["opskrift", "cocktail", "champagne", "aperitif", "cassis", "bobler"],
    prepTime: "PT2M",
    cookTime: "PT0M",
    servings: 1,
    difficulty: "easy",
    wineInRecipe: {
      style: "Tør champagne, crémant eller cava brut",
      amount: "12–14 cl bobler + 2 cl cassis",
      note: "Crème de cassis i bunden, tørre bobler ovenpå — sødme møder syre og mousse.",
    },
    wineToDrink: {
      guideSlug: "champagne-til-mad",
      searchQuery: "kir royal champagne cremant aperitif",
      searchMax: 200,
      label: "champagne og bobler",
    },
    relatedGuides: [
      "champagne-til-mad",
      "vin-i-cocktails-spritz-og-drikke",
      "bobler-champagne-cava-prosecco-og-cremant",
      "bedste-champagne",
    ],
    ingredients: [
      "2 cl crème de cassis (solbærlikør)",
      "12–14 cl tør champagne, crémant eller cava (kold)",
      "Evt. et par friske solbær eller et citronzest til pynt",
      "Flute- eller coupeglas, iskoldt",
    ],
    instructions: [
      "Hæld cassis i bunden af det kolde glas.",
      "Hæld boblerne forsigtigt op ad siden af glasset, så de blander sig uden at skumme over.",
      "Rør meget forsigtigt én gang, hvis nødvendigt. Pynt evt. Server med det samme.",
    ],
    intro: `**Kir Royal** er aperitif-klassikeren fra Bourgogne: crème de cassis + champagne. Simpel, festlig og klar på to minutter. Uden bobler hedder den bare Kir (hvidvin + cassis). Se også [vin i cocktails](/guides/vin-i-cocktails-spritz-og-drikke) og [sangria](/opskrifter/sangria-med-rodvin) til sommerbordet.`,
    whyTitle: "Hvorfor bobler i Kir Royal",
    why: `Tørre bobler klipper sødmen fra cassis og giver **mousse og elegance**. For sød prosecco + cassis bliver klaimatisk — vælg brut. Se [champagne til mad](/guides/champagne-til-mad).`,
    tips: [
      ["Forhold 1:5 til 1:7", "Mere cassis = sødere."],
      ["Koldt glas", "Boblerne holder længere."],
      ["Crémant/cava", "Fin erstatning for champagne til hverdagsfest."],
      ["Cassis-kvalitet", "Billig likør smager kunstig — vælg en god."],
    ],
    serving: `Aperitif før middag, nytår, brunch. Server med salte snacks — nødder, oliven, [pintxos](/opskrifter/pintxos-txakoli-chorizo).`,
    mistakes: [
      "For meget cassis — sodavandsagtig.",
      "Varm champagne — flad.",
      "Sød prosecco oveni cassis — for sødt.",
      "At røre voldsomt — boblerne forsvinder.",
    ],
    storage: `Laves per glas. Åbnet cassis holder længe kølet. Åbnede bobler: brug samme dag.`,
    glass: `Samme flaske som i drinken — eller ren champagne ved siden af. Se [bedste champagne](/guides/bedste-champagne).`,
    faq: [
      [
        "Kir vs Kir Royal?",
        "Kir = hvidvin + cassis. Kir Royal = champagne/crémant + cassis.",
      ],
      [
        "Uden cassis?",
        "Prøv crème de mûre (brombær) — Kir Impérial-agtig.",
      ],
      [
        "Alkoholfri?",
        "Alkoholfri bobler + solbærsirup — anden, men festlig.",
      ],
      [
        "Hvor mange pr. flaske?",
        "En 75 cl flaske giver ca. 5–6 Kir Royal.",
      ],
    ],
  }),
];

export const GUIDE_RECIPE_ADDITIONS = {
  "vin-til-oksefilet": [
    { slug: "portvinssauce-til-oksemoerbrad", label: "Portvinssauce til oksemørbrad" },
  ],
  "bedste-portvin": [
    { slug: "portvinssauce-til-oksemoerbrad", label: "Portvinssauce" },
    { slug: "portvinsgloegg", label: "Portvinsgløgg" },
  ],
  "sadan-bruger-du-vin-til-sauce-og-simren": [
    { slug: "portvinssauce-til-oksemoerbrad", label: "Portvinssauce" },
    { slug: "beurre-blanc", label: "Beurre blanc" },
  ],
  "vin-til-oksekoed-i-sauce": [
    { slug: "portvinssauce-til-oksemoerbrad", label: "Portvinssauce" },
  ],
  "vin-til-lys-fisk": [
    { slug: "beurre-blanc", label: "Beurre blanc" },
  ],
  "vin-til-fisk-og-skaldyr": [
    { slug: "beurre-blanc", label: "Beurre blanc" },
  ],
  "bedste-julevin": [
    { slug: "roedvinsgloegg", label: "Rødvinsgløgg" },
    { slug: "portvinsgloegg", label: "Portvinsgløgg" },
  ],
  "vin-til-juleaften": [
    { slug: "roedvinsgloegg", label: "Rødvinsgløgg" },
    { slug: "portvinsgloegg", label: "Portvinsgløgg" },
  ],
  "vin-i-cocktails-spritz-og-drikke": [
    { slug: "roedvinsgloegg", label: "Rødvinsgløgg" },
    { slug: "kir-royal", label: "Kir Royal" },
  ],
  "champagne-til-mad": [
    { slug: "kir-royal", label: "Kir Royal" },
  ],
  "bobler-champagne-cava-prosecco-og-cremant": [
    { slug: "kir-royal", label: "Kir Royal" },
  ],
  "hvad-er-portvin": [
    { slug: "portvinsgloegg", label: "Portvinsgløgg" },
  ],
};
