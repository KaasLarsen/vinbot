/** Data: vinmarinader — batch 6 (fisk/grønt + asiatisk). */
export const UPDATED = "2026-09-23";

export const SLUG_EXPANSIONS = {
  "champagne-mousserende-vinsmarinade":
    "Tør champagne/cava + hvidvinseddike + skalotteløg til fast fisk (pighvar, kulmule). 30–60 min max. Dup tørt — bobler giver fin syre.",
  "hvidvins-urtemarinade-groentsager":
    "Hvidvin + blandede urter + hvidløg til portobello, aubergine og peberfrugt. 1–3 timer. God til [vin til grillet grønt](/guides/vin-til-grillet-gront).",
  "klassisk-teriyaki-marinade":
    "Sake, mirin, soja og sukker — japansk base til kylling og laks. 30 min–4 timer. Se [kylling teriyaki med sake](/opskrifter/kylling-teriyaki-med-sake-og-mirin).",
  "shaoxing-femkrydderi-marinade":
    "Shaoxing, femkrydderi, hvidløg og mørk soja til svinebryst/andebryst. 4–8 timer. Match [sticky pork belly](/opskrifter/sticky-pork-belly-med-shaoxing).",
  "sake-misomarinade":
    "Sake, miso, mirin og ingefær til fed fisk (laks, helleflynder). 30–90 min. Balance salt fra miso.",
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
    slug: "champagne-mousserende-vinsmarinade",
    title: "Champagne- og mousserende vinsmarinade",
    description:
      "Tør champagne eller cava, hvidvinseddike, skalotteløg og hvid peber — elegant marinade til fast hvid fisk. Til ca. 600 g fisk.",
    tags: ["opskrift", "marinade", "fisk", "champagne", "mousserende", "fest"],
    wineInRecipe: {
      style: "Tør mousserende — champagne, cava, crémant eller prosecco brut",
      amount: "1½ dl mousserende vin",
      note: "Bobler og syre aromatiserer fast fisk kort — uden tung sauce.",
    },
    wineToDrink: {
      guideSlug: "champagne-til-mad",
      searchQuery: "pighvar champagne cava fisk",
      searchMax: 200,
      label: "champagne til mad",
    },
    relatedGuides: [
      "champagne-til-mad",
      "bobler-champagne-cava-prosecco-og-cremant",
      "vin-til-lys-fisk",
      "vin-til-grillet-fisk",
    ],
    ingredients: [
      "1½ dl tør mousserende vin (champagne, cava el.lign.)",
      "1 spsk hvidvinseddike",
      "1 skalotteløg, finthakket",
      "2 spsk raps- eller solsikkeolie",
      "½ tsk hvid peber, groft knust",
      "1 tsk salt",
      "Evt. 1 tsk citronsaft",
      "600 g fast fisk — pighvar, kulmule, monkfish eller torsk (tyk filet)",
    ],
    instructions: [
      "Pisk mousserende vin, eddike, skalotteløg, olie, peber, salt og evt. citron.",
      "Læg fisk i lav skål. Hæld marinade over — halv dybde er nok.",
      "Mariner 30–60 min kølet. Vend én gang.",
      "Tag op, dup tørt. Steg, grill eller ovnsteg.",
      "Server med [asparges med mousserende sabayon](/opskrifter/asparges-med-mousserende-sabayon)-energi — frisk og let.",
    ],
    intro: `**Champagne- og mousserende vinsmarinade** er fest til fast fisk: brut bobler, skalotteløg og hvid peber til pighvar og kulmule. Finere end [hvidvinsdampet torsk](/opskrifter/hvidvinsdampet-torsk-en-papillote), mere syre end [østers med champagne sabayonne](/opskrifter/oesters-med-champagne-sabayonne). Se [champagne til mad](/guides/champagne-til-mad).`,
    why: `Mousserende vin har **høj syre og finesse** — perfekt kort marinade til delikat fisk. Skalotteløg og peber giver klassisk fiskerestaurant-profil. Se [bobler-guide](/guides/bobler-champagne-cava-prosecco-og-cremant).`,
    tips: [
      ["Brut", "Ekstra brut undgår sødme på fisk."],
      ["Tyk filet", "Tåler 60 min — tynne skiver kortere."],
      ["Dup tørt", "Skorpe ved stegning."],
      ["Rest i glasset", "Samme flaske til maden."],
    ],
    serving: `Grønne asparges, citron og let sauce. Mousserende vin til bordet.`,
    mistakes: [
      "For lang marinade — melet fisk.",
      "Sød prosecco — klumpet smag.",
      "Billig balsamico-eddike — brug hvidvin.",
      "At koge fisk i rå champagne-marinade.",
    ],
    storage: `Marinade 1 dag uden fisk. Marineret fisk samme dag.`,
    glass: `Champagne, cava eller crémant — se [champagne til mad](/guides/champagne-til-mad).`,
    faq: [
      ["Til skaldyr?", "Ja — 20–30 min på rejer/scallops."],
      ["Uden champagne?", "Cava eller crémant — samme princip."],
      ["Til laks?", "Ja — 30 min, fed fisk elsker syre."],
      ["Kan jeg dampe i marinaden?", "Ja — papillote-stil, kort tid."],
    ],
  }),

  r({
    slug: "hvidvins-urtemarinade-groentsager",
    title: "Hvidvins- og urtemarinade til grøntsager",
    description:
      "Tør hvidvin, blandede urter, hvidløg og olie — marinade til portobello, aubergine og peberfrugt på grill. Til ca. 800 g grønt.",
    tags: ["opskrift", "marinade", "grøntsager", "hvidvin", "vegetar", "grill"],
    wineInRecipe: {
      style: "Tør hvidvin — Pinot Grigio, Verdicchio eller Sauvignon Blanc",
      amount: "1½ dl hvidvin",
      note: "Vin og olie bærer urter ind i svamp og aubergine — grønt tåler længere end fisk.",
    },
    wineToDrink: {
      guideSlug: "vin-til-grillet-gront",
      searchQuery: "grillede grøntsager pinot grigio urter",
      searchMax: 200,
      label: "vin til grillet grønt",
    },
    relatedGuides: [
      "vin-til-grillet-gront",
      "vin-til-vegetariske-og-veganske-retter",
      "vin-til-svampe",
      "vin-til-grill-og-bbq",
    ],
    ingredients: [
      "1½ dl tør hvidvin",
      "2 spsk blandede friske urter (timian, oregano, persille)",
      "3 fed hvidløg, skivede",
      "4 spsk olivenolie",
      "1 spsk balsamico eller hvidvinseddike",
      "1 tsk salt",
      "½ tsk peber",
      "800 g portobello, aubergine og peberfrugt i skiver",
    ],
    instructions: [
      "Pisk hvidvin, urter, hvidløg, olie, eddike/balsamico, salt og peber.",
      "Læg grøntsager i stor skål. Vend i marinade.",
      "Mariner 1–3 timer ved stuetemperatur eller kølet.",
      "Grill eller ovn 200 °C til møre kanter.",
      "Top med frisk urter og olie — som [bagt græskar med salviesmør](/opskrifter/bagt-graeskar-med-salviesmoer) i grill-universet.",
    ],
    intro: `**Hvidvins- og urtemarinade til grøntsager** løfter grillens grønne side: hvidvin, urter og hvidløg til portobello og aubergine. Vegetarisk svar på [provencalsk kyllingemarinade](/opskrifter/provencal-hvidvins-hvidloegsmarinade). Se [vin til grillet grønt](/guides/vin-til-grillet-gront) og [vin til svampe](/guides/vin-til-svampe).`,
    why: `Svamp og aubergine **suger smag** — vin giver syre mod olie og urter. Ingen kød nødvendig for dybde. Se [vin til vegetariske retter](/guides/vin-til-vegetariske-og-veganske-retter).`,
    tips: [
      ["Tykke skiver", "Holder saft på grill."],
      ["Salt aubergine", "Evt. 15 min dry-salt før marinade."],
      ["Portobello", "Skrab lameller — bedre indtrængning."],
      ["Restvin", "Let hvidvin i glasset."],
    ],
    serving: `Hummus, brød og salat. Pinot Grigio eller rosé.`,
    mistakes: [
      "For tynde skiver — falder igennem rist.",
      "For meget balsamico — dominerer.",
      "Kold grill — grønt bliver olieholdigt.",
      "At glemme salt — fladt grønt.",
    ],
    storage: `Marinade 3 dage. Marineret grønt 24 timer.`,
    glass: `Pinot Grigio eller Provence rosé — se [vin til grillet grønt](/guides/vin-til-grillet-gront).`,
    faq: [
      ["Til tofu?", "Ja — 2–4 timer, skær i bøffer."],
      ["Til halloumi?", "Ja — 30 min, pas på salt."],
      ["Vegan?", "Ja — opskriften er plantebaseret."],
      ["Til ovn?", "Ja — 200 °C til møre."],
    ],
  }),

  r({
    slug: "klassisk-teriyaki-marinade",
    title: "Klassisk teriyaki-marinade",
    description:
      "Sake, mirin, soja og sukker — japansk teriyaki-base til kylling og laks. Til ca. 700 g kød eller fisk.",
    tags: ["opskrift", "marinade", "teriyaki", "sake", "japansk", "kylling"],
    wineInRecipe: {
      style: "Sake + mirin (risvin) — junmai eller honjozo sake",
      amount: "1 dl sake + 3 spsk mirin",
      note: "Sake og mirin giver umami og sødme; soja og sukker balancerer til glace.",
    },
    wineToDrink: {
      guideSlug: "vin-til-japansk-mad",
      searchQuery: "teriyaki kylling riesling sake",
      searchMax: 200,
      label: "vin til japansk mad",
    },
    relatedGuides: [
      "vin-til-japansk-mad",
      "vin-til-asiatisk-mad",
      "vin-til-wok",
      "vin-til-kylling-og-lyst-koed",
    ],
    ingredients: [
      "1 dl sake",
      "3 spsk mirin",
      "3 spsk japansk sojasauce",
      "1 spsk sukker eller honning",
      "1 fed hvidløg, revet",
      "1 tsk frisk ingefær, revet",
      "700 g kylling (lår el. filet) eller laks",
    ],
    instructions: [
      "Rør sake, mirin, soja, sukker, hvidløg og ingefær.",
      "Mariner kylling 2–4 timer; laks 30–60 min.",
      "Tag op, dup tørt. Steg eller grill.",
      "Kog restmarinade til tyk glaze og pensl — som [kylling teriyaki med sake og mirin](/opskrifter/kylling-teriyaki-med-sake-og-mirin).",
      "Server med ris og sesam.",
    ],
    intro: `**Klassisk teriyaki-marinade** er sake, mirin og soja — grundopskriften bag [kylling teriyaki med sake og mirin](/opskrifter/kylling-teriyaki-med-sake-og-mirin). Mindre vin end [hvidvins-estragon](/opskrifter/hvidvins-estragonmarinade), mere umami. Se [vin til japansk mad](/guides/vin-til-japansk-mad) og [gyoza dampet i sake](/opskrifter/gyoza-dampet-i-sake).`,
    why: `Sake og mirin er **risbaserede «vine»** med naturlig sødme og umami — teriyaki er deres hjemmebane. Soja salt balancerer. Se [vin til wok](/guides/vin-til-wok).`,
    tips: [
      ["Kog glaze", "Rå soja-marinade skal reducere."],
      ["Kylling vs laks", "Fisk kortere tid."],
      ["Honjozo sake", "Fint til madlavning."],
      ["Sesam finish", "Dryss frø over glaze."],
    ],
    serving: `Jasminris, edamame og picklet ingefær. Off-dry Riesling eller sake i glasset.`,
    mistakes: [
      "For lang marinade på laks — saltet fisk.",
      "At pensle med rå soja-blanding.",
      "For høj varme — brændt sukker.",
      "Kinesisk soja — for salt; brug japansk.",
    ],
    storage: `Marinade 4 dage kølet. Marineret kylling 24 timer.`,
    glass: `Riesling eller grøn te-sake — se [vin til japansk mad](/guides/vin-til-japansk-mad).`,
    faq: [
      ["Til tofu?", "Ja — 1–2 timer."],
      ["Uden sake?", "Tør hvidvin + ekstra mirin — anden profil."],
      ["Til okse?", "Ja — yakiniku-stil, 2–4 timer."],
      ["Glutenfri?", "Brug tamari i stedet for soja."],
    ],
  }),

  r({
    slug: "shaoxing-femkrydderi-marinade",
    title: "Shaoxing- og femkrydderimarinade",
    description:
      "Shaoxing-risvin, femkrydderi, hvidløg og mørk soja — kinesisk marinade til svinebryst og andebryst. Til ca. 800 g kød.",
    tags: ["opskrift", "marinade", "kinesisk", "shaoxing", "svinekød", "and"],
    wineInRecipe: {
      style: "Shaoxing-risvin (kinesisk madlavningsvin)",
      amount: "2 dl Shaoxing",
      note: "Shaoxing og femkrydderi er klassisk til rød kød og and — dyb, aromatisk base.",
    },
    wineToDrink: {
      guideSlug: "vin-til-kinesisk-mad",
      searchQuery: "svinebryst and shaoxing gewurztraminer",
      searchMax: 200,
      label: "vin til kinesisk mad",
    },
    relatedGuides: [
      "vin-til-kinesisk-mad",
      "vin-til-asiatisk-mad",
      "vin-til-and",
      "vin-til-wok",
    ],
    ingredients: [
      "2 dl Shaoxing-vin",
      "1 tsk femkrydderi-pulver",
      "3 fed hvidløg, knuste",
      "2 spsk mørk sojasauce",
      "1 spsk lys soja",
      "1 spsk sukker",
      "1 spsk sesamolie",
      "800 g svinebryst i skiver eller andebryst",
    ],
    instructions: [
      "Bland Shaoxing, femkrydderi, hvidløg, soja, sukker og sesamolie.",
      "Vend kød i. Mariner 4–8 timer kølet.",
      "Dup tørt. Steg, ovn eller grill.",
      "Finish som [sticky pork belly med Shaoxing](/opskrifter/sticky-pork-belly-med-shaoxing) med reduktion.",
      "Skær andebryst tyndt mod fiberen.",
    ],
    intro: `**Shaoxing- og femkrydderimarinade** er køkkenets svar på rødvin-marinade i Kina: Shaoxing, femkrydderi og soja til svinebryst og and. Direkte i stamtræ med [sticky pork belly med Shaoxing](/opskrifter/sticky-pork-belly-med-shaoxing). Se [vin til kinesisk mad](/guides/vin-til-kinesisk-mad).`,
    why: `Shaoxing har **nøddeagtig, oxidativ dybde** som madeira; femkrydderi matcher fed and og svinebryst. Se [vin til and](/guides/vin-til-and).`,
    tips: [
      ["Ægte Shaoxing", "Madlavningsvin fra asiatisk butik."],
      ["Femkrydderi", "Lidt går langt — 1 tsk er nok."],
      ["Mørk soja", "Farve og umami — ikke kun salt."],
      ["Andebryst", "Score skind, kortere høj varme."],
    ],
    serving: `Riskager, pak choi og forårsløg. Gewürztraminer eller Pinot Noir.`,
    mistakes: [
      "For meget femkrydderi — medicin.",
      "At stege kold, våd and — fedt render ikke.",
      "Sherry som erstatning — anden smag, ok men ikke samme.",
      "For lang marinade på tynde skiver.",
    ],
    storage: `Marinade 4 dage. Marineret kød 24 timer.`,
    glass: `Gewürztraminer eller let Pinot Noir — se [vin til kinesisk mad](/guides/vin-til-kinesisk-mad).`,
    faq: [
      ["Til kylling?", "Ja — 2–4 timer, mindre femkrydderi."],
      ["Uden Shaoxing?", "Tør sherry + 1 spsk soja."],
      ["Til tofu?", "Ja — 2 timer, skær fast tofu."],
      ["Grill?", "Ja — svinebryst spyd."],
    ],
  }),

  r({
    slug: "sake-misomarinade",
    title: "Sake- og misomarinade",
    description:
      "Sake, hvid miso, mirin og ingefær — umami-marinade til fed fisk som laks og helleflynder. Til ca. 600 g fisk.",
    tags: ["opskrift", "marinade", "fisk", "sake", "miso", "japansk"],
    wineInRecipe: {
      style: "Sake + mirin — junmai sake og sød mirin",
      amount: "1 dl sake + 2 spsk mirin",
      note: "Miso giver salt umami; sake og mirin balancerer uden at overdøve fisk.",
    },
    wineToDrink: {
      guideSlug: "vin-til-laks",
      searchQuery: "miso laks sake riesling",
      searchMax: 200,
      label: "vin til miso-fisk",
    },
    relatedGuides: [
      "vin-til-laks",
      "vin-til-japansk-mad",
      "vin-til-fisk-og-skaldyr",
      "vin-til-asiatisk-mad",
    ],
    ingredients: [
      "1 dl sake",
      "2 spsk mirin",
      "2 spsk hvid miso",
      "1 spsk lys soja",
      "1 tsk revet ingefær",
      "1 spsk sesamolie",
      "600 g laks eller helleflynder (filet)",
    ],
    instructions: [
      "Pisk sake, mirin, miso, soja, ingefær og sesamolie glat.",
      "Smør marinade på fisk — tyndt lag.",
      "Mariner 30–90 min kølet.",
      "Grill, ovn eller pande — miso brænder let, medium varme.",
      "Server med ris og citron — som [sake-miso](/opskrifter/kylling-teriyaki-med-sake-og-mirin) til fisk.",
    ],
    intro: `**Sake- og misomarinade** er umami til fed fisk: sake, hvid miso og mirin til laks og helleflynder. Fisk-variant af [klassisk teriyaki](/opskrifter/klassisk-teriyaki-marinade) og [hvidvins-dildmarinade](/opskrifter/hvidvins-dildmarinade) i nordisk retning. Se [vin til laks](/guides/vin-til-laks).`,
    why: `Miso er **fermenteret umami**; sake fortynder og bærer smagen. Mirin giver glasur. Kort tid — salt trækker i fisk. Se [vin til japansk mad](/guides/vin-til-japansk-mad).`,
    tips: [
      ["Hvid miso", "Mildere end rød — bedre til fisk."],
      ["Tyndt lag", "Tyk miso brænder."],
      ["Skind på laks", "Grill skind ned."],
      ["Rens pande", "Miso sætter sig — medium varme."],
    ],
    serving: `Riskog, syltet agurk og edamame. Riesling eller junmai sake.`,
    mistakes: [
      "Rød miso uden fortyndning — for salt.",
      "For lang tid — tør fisk.",
      "Max varme — sort miso.",
      "At glemme at piske miso glat.",
    ],
    storage: `Marinade 5 dage kølet. Marineret fisk samme dag.`,
    glass: `Off-dry Riesling eller sake — se [vin til fisk](/guides/vin-til-fisk-og-skaldyr).`,
    faq: [
      ["Til torsk?", "Ja — 20–40 min, mager fisk."],
      ["Til kylling?", "Ja — 2–4 timer."],
      ["Glutenfri miso?", "Tjek label — ris/soja-miso findes."],
      ["Ovn?", "180 °C til laks — 12–15 min."],
    ],
  }),
];

export const GUIDE_RECIPE_ADDITIONS = {
  "champagne-til-mad": [
    { slug: "champagne-mousserende-vinsmarinade", label: "Mousserende fisk" },
  ],
  "bobler-champagne-cava-prosecco-og-cremant": [
    { slug: "champagne-mousserende-vinsmarinade", label: "Champagne-marinade" },
  ],
  "vin-til-lys-fisk": [
    { slug: "champagne-mousserende-vinsmarinade", label: "Bobler til fisk" },
  ],
  "vin-til-grillet-fisk": [
    { slug: "champagne-mousserende-vinsmarinade", label: "Fast fisk" },
  ],
  "vin-til-grillet-gront": [
    { slug: "hvidvins-urtemarinade-groentsager", label: "Urte-grønt" },
  ],
  "vin-til-vegetariske-og-veganske-retter": [
    { slug: "hvidvins-urtemarinade-groentsager", label: "Grøntsagsmarinade" },
  ],
  "vin-til-svampe": [
    { slug: "hvidvins-urtemarinade-groentsager", label: "Portobello" },
  ],
  "vin-til-japansk-mad": [
    { slug: "klassisk-teriyaki-marinade", label: "Teriyaki" },
    { slug: "sake-misomarinade", label: "Sake-miso" },
  ],
  "vin-til-asiatisk-mad": [
    { slug: "klassisk-teriyaki-marinade", label: "Teriyaki-base" },
    { slug: "shaoxing-femkrydderi-marinade", label: "Shaoxing" },
    { slug: "sake-misomarinade", label: "Miso-fisk" },
  ],
  "vin-til-kinesisk-mad": [
    { slug: "shaoxing-femkrydderi-marinade", label: "Femkrydderi" },
  ],
  "vin-til-wok": [
    { slug: "klassisk-teriyaki-marinade", label: "Sake-soja" },
    { slug: "shaoxing-femkrydderi-marinade", label: "Shaoxing" },
  ],
  "vin-til-laks": [
    { slug: "klassisk-teriyaki-marinade", label: "Teriyaki-laks" },
    { slug: "sake-misomarinade", label: "Miso-laks" },
  ],
  "vin-til-kylling-og-lyst-koed": [
    { slug: "klassisk-teriyaki-marinade", label: "Teriyaki-kylling" },
  ],
  "vin-til-and": [
    { slug: "shaoxing-femkrydderi-marinade", label: "Shaoxing-and" },
  ],
  "vin-til-grill-og-bbq": [
    { slug: "hvidvins-urtemarinade-groentsager", label: "Grillede grøntsager" },
  ],
  "vin-til-fisk-og-skaldyr": [
    { slug: "sake-misomarinade", label: "Miso-fisk" },
  ],
};
