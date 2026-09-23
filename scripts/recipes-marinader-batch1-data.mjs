/** Data: 30 vinmarinader — batch 1 (okse/kalv). */
export const UPDATED = "2026-09-23";

export const SLUG_EXPANSIONS = {
  "klassisk-rodvins-rosmarinmarinade":
    "Brug kraftig cabernet eller syrah. Rosmarin i hele kviste — fjern før stegning. Flanksteak og bøffer: 4–12 timer. Tør kødet godt før grill.",
  "portvins-hvidloegsmarinade":
    "Rød portvin + hvidløg + balsamico giver mørk, karamelliseret skorpe. Ideel til oksemørbrad 4–8 timer. Reducer overskydende marinade til glaze.",
  "bourguignon-marinade":
    "Pinot Noir, perleløg, gulerod, laurbær og timian. Spræng skært oksekød 12–24 timer, inden du laver [Boeuf Bourguignon](/opskrifter/boeuf-bourguignon) eller [svampe bourguignon](/opskrifter/svampe-bourguignon).",
  "asiatisk-rodvin-ingefaermarinade":
    "Rødvin + soja + ingefær til lynstegt okse og wokstrimler. Kort marinade (30–90 min) — tynde strimler mørner hurtigt.",
  "rodvin-soya-glaze":
    "Lige dele rødvin og soja kogt ind med brun farin og chili. Brug både som marinade og pensling på grillede rullesteg.",
};

function r(opts) {
  return {
    slug: opts.slug,
    title: opts.title,
    description: opts.description,
    tags: opts.tags,
    prepTime: opts.prepTime ?? "PT10M",
    cookTime: opts.cookTime ?? "PT0M",
    servings: opts.servings ?? 4,
    difficulty: opts.difficulty ?? "easy",
    wineInRecipe: opts.wineInRecipe,
    wineToDrink: opts.wineToDrink,
    relatedGuides: opts.relatedGuides,
    ingredients: opts.ingredients,
    instructions: opts.instructions,
    intro: opts.intro,
    whyTitle: opts.whyTitle ?? "Hvorfor vin i marinaden",
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
    slug: "klassisk-rodvins-rosmarinmarinade",
    title: "Klassisk rødvins- og rosmarinmarinade",
    description:
      "Kraftig rødvin, hvidløg, frisk rosmarin og sorte peberkorn — marinade til flanksteak og bøffer. Opskrift til ca. 800 g kød.",
    tags: ["opskrift", "marinade", "oksekød", "rødvin", "rosmarin", "grill"],
    wineInRecipe: {
      style: "Kraftig rødvin — Cabernet Sauvignon, Syrah eller Malbec",
      amount: "3 dl rødvin",
      note: "Rødvinens syre mørner; alkoholen hjælper rosmarin og hvidløg ind i kødet.",
    },
    wineToDrink: {
      guideSlug: "vin-til-boeff",
      searchQuery: "cabernet syrah flanksteak grill",
      searchMax: 200,
      label: "vin til grillede bøffer",
    },
    relatedGuides: [
      "vin-til-boeff",
      "vin-til-grill-og-bbq",
      "vin-til-oksekoed",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "3 dl kraftig rødvin (Cabernet, Syrah eller Malbec)",
      "3 spsk olivenolie",
      "4 fed hvidløg, knuste",
      "3 kviste frisk rosmarin",
      "1 spsk sorte peberkorn, let knuste",
      "1 tsk salt",
      "Evt. 1 spsk balsamico",
      "800 g flanksteak, entrecôte eller bøffer",
    ],
    instructions: [
      "Bland rødvin, olie, hvidløg, rosmarin, peberkorn, salt og evt. balsamico.",
      "Læg kødet i pose eller skål. Hæld marinade over — kødet skal være dækket.",
      "Mariner 4–12 timer i køleskab (flank max 12 timer). Vend et par gange.",
      "Tag op 30 min før. Dup tørt. Fjern rosmarinkviste. Grill eller steg.",
      "Kog evt. restmarinade 5 minutter til sauce, eller brug frisk vin til reduktion.",
    ],
    intro: `**Klassisk rødvins- og rosmarinmarinade** er grillfavoritten: cabernet/syrah, hvidløg, rosmarin og peber. Mere rosmarin-fokuseret end [rødvinsmarinade til oksekød](/opskrifter/rodvinsmarinade-til-oksekod) — perfekt til flanksteak og bøffer. Brug den også som base før [entrecôte med rødvinsmarinade](/opskrifter/entrecote-med-rodvinsmarinade).`,
    why: `Syre mørner; alkohol binder **aromatiske stoffer** fra rosmarin og hvidløg. Kraftig rødvin matcher oksekødets fedme. Se [vin til bøf](/guides/vin-til-boeff).`,
    tips: [
      ["Tør før grill", "Ellers damper kødet."],
      ["Hele kviste", "Nemmere at fjerne end hakket rosmarin."],
      ["Ikke for længe", "Over 24 timer kan gøre overfladen grødet."],
      ["Restvin", "Samme flaske i glasset."],
    ],
    serving: `Grill flanksteak, bøffer eller spyd. Server med [balsamico-glaserede skalotteløg](/opskrifter/balsamico-rodvinsglaserede-skalotteloeg) eller [gorgonzolasauce](/opskrifter/gorgonzolasauce-med-hvidvin).`,
    mistakes: [
      "For lang marinade — grødet overflade.",
      "Vådt kød på grillen — ingen skorpe.",
      "Tung, sød dessertvin — forkert profil.",
      "At genbruge rå marinade uden kogning.",
    ],
    storage: `Marinade uden kød 3 dage kølet. Marineret kød 24 timer. Frys ikke.`,
    glass: `Cabernet, Syrah eller Malbec — se [vin til grill](/guides/vin-til-grill-og-bbq).`,
    faq: [
      [
        "Forskel på den gamle rødvinsmarinade?",
        "Den er mere generisk med timian. Denne er rosmarin + kraftig cabernet/syrah til flank/bøf.",
      ],
      [
        "Kan jeg bruge den til lam?",
        "Ja — 4–8 timer. Se også [lammesteg med rødvin og rosmarin](/opskrifter/lammesteg-med-rodvin-rosmarin).",
      ],
      [
        "Olie nødvendig?",
        "Ja — hjælper fedtopløselige aromaer ind i kødet.",
      ],
      [
        "Max tid?",
        "12–24 timer til okse. Tynde skiver kortere.",
      ],
    ],
  }),

  r({
    slug: "portvins-hvidloegsmarinade",
    title: "Portvins- og hvidløgsmarinade",
    description:
      "Rød portvin, hvidløg, timian og balsamico — marinade der giver mørk, karamelliseret overflade på oksemørbrad. Til ca. 800 g kød.",
    tags: ["opskrift", "marinade", "oksekød", "portvin", "hvidløg", "fest"],
    wineInRecipe: {
      style: "Rød portvin — ruby eller tawny",
      amount: "2 dl portvin",
      note: "Portvinens sødme og koncentration giver karamelliseret skorpe; hvidløg og balsamico balancerer.",
    },
    wineToDrink: {
      guideSlug: "vin-til-oksefilet",
      searchQuery: "oksemørbrad cabernet portvin premium",
      searchMax: 200,
      label: "vin til oksemørbrad",
    },
    relatedGuides: [
      "vin-til-oksefilet",
      "bedste-portvin",
      "vin-til-oksekoed",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "2 dl rød portvin",
      "4 fed hvidløg, fintrevet",
      "2 spsk balsamicoeddike",
      "2 spsk olivenolie",
      "2 kviste timian",
      "1 tsk salt",
      "1 tsk peber",
      "800 g oksemørbrad eller culotte",
    ],
    instructions: [
      "Bland port, hvidløg, balsamico, olie, timian, salt og peber.",
      "Læg kødet i. Mariner 4–8 timer i køleskab.",
      "Tag op 30–45 min før. Dup tørt.",
      "Steg eller ovnsteg. Pensl med kogt marinade/reduktion de sidste minutter for glaze.",
      "Reducer restmarinade 5–8 minutter til blank sauce.",
    ],
    intro: `**Portvins- og hvidløgsmarinade** giver den mørke, karamelliserede overflade på oksemørbrad, som balsamico-rødvinsversionen også jagter — se [balsamico-rødvinsmarineret oksemørbrad](/opskrifter/balsamico-rodvinsmarineret-oksemoerbrad). Her er portvin hovedrollen. Tæt på [portvinsglaserede](/opskrifter/portvinsglaserede-figner-med-gedeost)-universet, men til kød.`,
    why: `Port er koncentreret og sød. Sammen med balsamico og hvidløg får du **glaze og dybde** uden at kødet smager af dessert. Se [bedste portvin](/guides/bedste-portvin).`,
    tips: [
      ["Ruby vs tawny", "Ruby er frugtigere; tawny mere nøddeagtig."],
      ["Ikke for længe", "Port er sød — 8 timer er nok."],
      ["Dup tørt", "Ellers brænder sukkeret."],
      ["Pensling", "Kun kogt marinade på kødet."],
    ],
    serving: `Oksemørbrad, culotte eller [oksehøjreb](/opskrifter/oksehojreb-marineret-i-rodvin). Server med rodfrugter.`,
    mistakes: [
      "For lang marinade — for sød/overflade «kogt».",
      "At pensle med rå marinade — fødevaresikkerhed.",
      "For høj varme med sukkerholdig marinade — brændt.",
      "Meget sød dessertport alene uden balsamico — klaimatisk.",
    ],
    storage: `Marinade 3 dage. Marineret kød 24 timer. Frys ikke.`,
    glass: `Cabernet eller elegant Bordeaux — se [vin til oksefilet](/guides/vin-til-oksefilet). Lille port efter maden.`,
    faq: [
      [
        "Kan jeg bruge den til and?",
        "Ja — kort tid. Se også [andebryst med portvins-figneglasering](/opskrifter/andebryst-med-portvins-og-figneglasering).",
      ],
      [
        "Uden balsamico?",
        "Tilsæt lidt rødvinseddike for syre.",
      ],
      [
        "Til grill?",
        "Ja — medium varme, pensl sent.",
      ],
      [
        "Mængde til 1 kg?",
        "Forøg med 25–30 %.",
      ],
    ],
  }),

  r({
    slug: "bourguignon-marinade",
    title: "Bourguignon-marinade",
    description:
      "Pinot Noir, perleløg, gulerødder, laurbær og timian — døgnmarinade til skært oksekød før bourguignon-gryde. Til 1 kg kød.",
    tags: ["opskrift", "marinade", "oksekød", "rødvin", "bourgogne", "gryderet", "pinot noir"],
    prepTime: "PT20M",
    servings: 6,
    wineInRecipe: {
      style: "Pinot Noir eller Bourgogne rouge — frugtig, ikke for tannin-tung",
      amount: "7–8 dl rødvin",
      note: "Vinen sprænger kødet et døgn; samme væske bruges ofte videre i gryden.",
    },
    wineToDrink: {
      guideSlug: "vin-til-bourgogne-mad",
      searchQuery: "pinot noir bourgogne boeuf bourguignon",
      searchMax: 200,
      label: "vin til bourguignon",
    },
    relatedGuides: [
      "vin-til-bourgogne-mad",
      "vin-til-gryderet",
      "vin-til-oksekoed",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "7–8 dl Pinot Noir eller Bourgogne rouge",
      "1 kg skært oksekød i tern (chuck, højreb til gryde)",
      "200 g perleløg eller skalotteløg",
      "2 gulerødder i skiver",
      "2 laurbærblade",
      "4 kviste timian",
      "1 spsk sorte peberkorn",
      "2 fed hvidløg",
      "2 spsk olivenolie",
    ],
    instructions: [
      "Læg kød, perleløg, gulerod, laurbær, timian, peberkorn og hvidløg i en skål.",
      "Hæld rødvin over, så det dækker. Dryp olie over.",
      "Dæk og stil i køleskab 12–24 timer. Vend et par gange.",
      "Si kødet fra. Dup tørt. Brun i gryde. Brug den siede marinade (og grøntsager) videre i [Boeuf Bourguignon](/opskrifter/boeuf-bourguignon).",
      "Kog marinaden 5 minutter før den går i gryden, hvis du vil være ekstra sikker.",
    ],
    intro: `**Bourguignon-marinade** er døgnsprængningen, der gør skært oksekød mørt og vinøst, før simreretten begynder. Klassisk til [Boeuf Bourguignon](/opskrifter/boeuf-bourguignon) — og vegetarisk søskende-idé til [svampe bourguignon](/opskrifter/svampe-bourguignon) (uden kød). Pinot Noir er den rigtige stil.`,
    why: `Lang marinade i **Pinot Noir** med aromater mørner collagen-rigt grydekød og bygger smag allerede før bruning. Se [vin til Bourgogne-mad](/guides/vin-til-bourgogne-mad).`,
    tips: [
      ["Skært kød", "Ikke mørbrad — den bliver for blød."],
      ["Døgn", "12 timer minimum."],
      ["Si og brun", "Tørt kød = bedre skorpe."],
      ["Genbrug væske", "Det er grydens base."],
    ],
    serving: `Gå direkte til bourguignon-gryde med kartoffelmos eller brød.`,
    mistakes: [
      "Cabernet med hårde tanniner — bitter sauce.",
      "At smide marinaden ud — spild af smag.",
      "At brune vådt kød — gråt, ikke stegt.",
      "Over 48 timer — grødet tekstur.",
    ],
    storage: `Marineret kød 24–36 timer. Start gryden inden for det vindue.`,
    glass: `Pinot Noir / Bourgogne — se [vin til gryderet](/guides/vin-til-gryderet).`,
    faq: [
      [
        "Skal grøntsagerne med i gryden?",
        "Ja — de er allerede smagt til. Friske kan tilsættes også.",
      ],
      [
        "Uden perleløg?",
        "Skalotteløg eller almindelige løg i kvarte.",
      ],
      [
        "Til vildt?",
        "Ja — se også [vildtgryde med portvin](/opskrifter/vildtgryde-med-portvin-og-enebaer).",
      ],
      [
        "Kan jeg fryse marineret kød?",
        "Hellere fryse råt kød og marinere efter optøning.",
      ],
    ],
  }),

  r({
    slug: "asiatisk-rodvin-ingefaermarinade",
    title: "Asiatisk rødvin- og ingefærmarinade",
    description:
      "Rødvin, soja, friskrevet ingefær, hvidløg og sesamolie — marinade til lynstegt oksekød og wokstrimler. Til 600 g kød.",
    tags: ["opskrift", "marinade", "oksekød", "rødvin", "asiatisk", "ingefær", "wok"],
    wineInRecipe: {
      style: "Frugtig rødvin — merlot, grenache eller ung tempranillo",
      amount: "1 dl rødvin + soja",
      note: "Rødvin giver syre og frugt; soja og ingefær giver asiatisk umami til lynstegning.",
    },
    wineToDrink: {
      guideSlug: "vin-til-asiatisk-mad",
      searchQuery: "wok oksekød riesling pinot noir soja",
      searchMax: 200,
      label: "vin til asiatisk oksekød",
    },
    relatedGuides: [
      "vin-til-asiatisk-mad",
      "riesling-til-asiatisk-mad",
      "vin-til-wok",
      "vin-til-oksekoed",
    ],
    ingredients: [
      "1 dl frugtig rødvin",
      "3 spsk sojasauce",
      "2 spsk friskrevet ingefær",
      "3 fed hvidløg, finthakket",
      "1 tsk sesamolie",
      "1 tsk sukker eller honning",
      "1 spsk olie",
      "600 g oksekød i tynde strimler (til wok)",
    ],
    instructions: [
      "Bland rødvin, soja, ingefær, hvidløg, sesamolie, sukker og olie.",
      "Vend kødet i. Mariner 30–90 minutter i køleskab (ikke meget længere — tynde strimler).",
      "Tag op, lad overskydende dryppe af.",
      "Lynsteg i meget varm wok/pande. Brug evt. lidt marinade (kogt) som glaze til sidst.",
    ],
    intro: `**Asiatisk rødvin- og ingefærmarinade** er til lynstegt oksekød og wokstrimler — rødvin møder soja og ingefær. Hurtigere end klassiske grillmarinader og et godt match til [wok-kylling](/opskrifter/wok-kylling-med-hvidvin)-universet, bare med okse og rødvin.`,
    why: `Tynde strimler mørner hurtigt. **Rødvin** tilfører syre; soja/ingefær giver den asiatiske profil. Se [vin til wok](/guides/vin-til-wok) og [asiatisk mad](/guides/vin-til-asiatisk-mad).`,
    tips: [
      ["Kort tid", "30–90 min er nok."],
      ["Meget varm pande", "Ellers koger kødet."],
      ["Skær på tværs", "Af fibrene — mere mørt."],
      ["Sesamolie", "Lidt rækker — den er kraftig."],
    ],
    serving: `Wok med grøntsager og ris. Drys forårsløg og sesam over.`,
    mistakes: [
      "Marinade overnight på tynde strimler — for salt/grødet.",
      "Lav varme — gråt kød.",
      "For meget sesamolie — bitter.",
      "At hælde al rå marinade i wokken uden kogning.",
    ],
    storage: `Marinade 2 dage. Marineret kød bruges samme dag.`,
    glass: `Riesling eller let Pinot Noir — se [Riesling til asiatisk](/guides/riesling-til-asiatisk-mad).`,
    faq: [
      [
        "Kan jeg bruge hvidvin?",
        "Ja — lysere resultat. Rødvin giver mere farve og dybde.",
      ],
      [
        "Til kylling?",
        "Ja — 1–2 timer. Se også [teriyaki](/opskrifter/kylling-teriyaki-med-sake-og-mirin).",
      ],
      [
        "Uden alkohol?",
        "Æblejuice + soja + ingefær — anden smag.",
      ],
      [
        "Hvilket snit?",
        "Flank, skært tyndtskåret eller færdig wokstrimler.",
      ],
    ],
  }),

  r({
    slug: "rodvin-soya-glaze",
    title: "Rødvins- og soya-glaze",
    description:
      "Lige dele rødvin og sojasauce kogt ind med brun farin og chili — marinade og pensling til grillede rullesteg. Til 1 kg kød.",
    tags: ["opskrift", "marinade", "glaze", "rødvin", "soja", "grill", "rullesteg"],
    prepTime: "PT10M",
    cookTime: "PT15M",
    servings: 6,
    wineInRecipe: {
      style: "Frugtig rødvin — zinfandel, shiraz eller tempranillo",
      amount: "2 dl rødvin + 2 dl soja",
      note: "Rødvin og soja reduceres med farin og chili til sticky glaze til marinade og pensling.",
    },
    wineToDrink: {
      guideSlug: "vin-til-grill-og-bbq",
      searchQuery: "grill rullesteg zinfandel shiraz",
      searchMax: 200,
      label: "vin til grill",
    },
    relatedGuides: [
      "vin-til-grill-og-bbq",
      "vin-til-svinekoed",
      "vin-til-pulled-pork",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "2 dl frugtig rødvin",
      "2 dl sojasauce",
      "3 spsk brun farin",
      "1–2 tsk chiliflager eller frisk chili",
      "2 fed hvidløg, knuste",
      "1 tsk ingefær (valgfrit)",
      "1 kg rullesteg eller spareribs",
    ],
    instructions: [
      "Kog rødvin, soja, farin, chili, hvidløg og evt. ingefær op. Simr 10–15 minutter til tyk, blank glaze.",
      "Køl af. Brug ⅔ som marinade (2–6 timer). Gem ⅓ til pensling.",
      "Grill eller ovnsteg kødet. Pensl med den gemte glaze de sidste 10–15 minutter.",
      "Server med ekstra varm glaze ved siden af.",
    ],
    intro: `**Rødvins- og soya-glaze** er både marinade og pensling: sticky, salt-sød og med chili-kick. Perfekt til grillede rullesteg og spareribs — i familie med [pulled pork med rødvin](/opskrifter/pulled-pork-med-rodvin) og asiatiske glasurer som [sticky pork belly](/opskrifter/sticky-pork-belly-med-shaoxing).`,
    why: `Reduktion gør rødvin + soja til **klæbrig glaze**. Farin giver karamel; chili varme. Se [vin til grill](/guides/vin-til-grill-og-bbq).`,
    tips: [
      ["Del basen", "Aldrig pensl med den rå del, kødet har ligget i — brug den gemte."],
      ["Tykkelse", "Skal coat'e en ske."],
      ["Sent pensel", "Ellers brænder sukkeret."],
      ["Smagsjustering", "For salt: mere vin/sukker. For sødt: mere soja/chili."],
    ],
    serving: `Rullesteg, ribs eller kyllingelår. Ris og coleslaw ved siden af.`,
    mistakes: [
      "At pensle for tidligt — brændt glaze.",
      "At bruge hele marinaden til pensling efter rå kød — kog den først.",
      "For tynd — kog længere.",
      "Kun mørk soja uden at smage til — saltbombe.",
    ],
    storage: `Glaze 1 uge kølet. Marineret kød 24 timer.`,
    glass: `Zinfandel, Shiraz eller frugtig Malbec — se [vin til grill](/guides/vin-til-grill-og-bbq).`,
    faq: [
      [
        "Kan jeg lave den uden chili?",
        "Ja — stadig god sweet-salty glaze.",
      ],
      [
        "Til tofu?",
        "Ja — kort marinade, pensl under stegning.",
      ],
      [
        "Ovnen?",
        "Ja — 160–170 °C, pensl til sidst ved højere varme.",
      ],
      [
        "Er det det samme som teriyaki?",
        "Nej — teriyaki er sake/mirin. Denne er rødvin + soja.",
      ],
    ],
  }),
];

export const GUIDE_RECIPE_ADDITIONS = {
  "vin-til-boeff": [
    { slug: "klassisk-rodvins-rosmarinmarinade", label: "Klassisk rødvins-rosmarinmarinade" },
  ],
  "vin-til-grill-og-bbq": [
    { slug: "klassisk-rodvins-rosmarinmarinade", label: "Rødvins-rosmarinmarinade" },
    { slug: "rodvin-soya-glaze", label: "Rødvins-soya-glaze" },
  ],
  "vin-til-oksekoed": [
    { slug: "klassisk-rodvins-rosmarinmarinade", label: "Rødvins-rosmarinmarinade" },
    { slug: "portvins-hvidloegsmarinade", label: "Portvins-hvidløgsmarinade" },
    { slug: "bourguignon-marinade", label: "Bourguignon-marinade" },
  ],
  "vin-til-oksefilet": [
    { slug: "portvins-hvidloegsmarinade", label: "Portvins-hvidløgsmarinade" },
  ],
  "bedste-portvin": [
    { slug: "portvins-hvidloegsmarinade", label: "Portvins-hvidløgsmarinade" },
  ],
  "vin-til-bourgogne-mad": [
    { slug: "bourguignon-marinade", label: "Bourguignon-marinade" },
  ],
  "vin-til-gryderet": [
    { slug: "bourguignon-marinade", label: "Bourguignon-marinade" },
  ],
  "vin-til-asiatisk-mad": [
    { slug: "asiatisk-rodvin-ingefaermarinade", label: "Asiatisk rødvin-ingefærmarinade" },
    { slug: "rodvin-soya-glaze", label: "Rødvins-soya-glaze" },
  ],
  "vin-til-wok": [
    { slug: "asiatisk-rodvin-ingefaermarinade", label: "Asiatisk rødvin-ingefærmarinade" },
  ],
  "vin-til-svinekoed": [
    { slug: "rodvin-soya-glaze", label: "Rødvins-soya-glaze" },
  ],
  "sadan-bruger-du-vin-til-sauce-og-simren": [
    { slug: "klassisk-rodvins-rosmarinmarinade", label: "Rødvinsmarinade" },
    { slug: "bourguignon-marinade", label: "Bourguignon-marinade" },
    { slug: "rodvin-soya-glaze", label: "Rødvins-soya-glaze" },
  ],
};
