/** Sauce expansion batch 2: elegante/lyse + smør/æg (8). */
import { r } from "./add-recipes-tilbehor30-lib.mjs";

export const UPDATED = "2026-09-23";

export const SLUG_EXPANSIONS = {
  "sauce-noilly-prat":
    "Fransk fiskesauce på tør vermouth Noilly Prat, skalotteløg og fløde. Reducer vermouth før fløde — klassisk til fisk.",
  "sauce-albufera":
    "Klassisk hvidvins-/fjerkrævelouté monteret med fløde og tør sherry. Luksus til kylling og kalkun.",
  "sauce-bercy":
    "Fransk fiskesauce: hvidvin reduceret med skalotteløg og fiskefond, monteret med koldt smør. Uden fløde.",
  "hvidvins-dijonsauce":
    "Hurtig pandesauce af hvidvin og dijonsennep, jævnet med fløde — til svinemørbrad.",
  "sherrysauce-med-svampe":
    "Tør Fino/Amontillado sherry kogt op med svampe og fløde — nøddeagtig umami til kylling.",
  "beurre-rouge":
    "Søster til beurre blanc: rødvin + skalotteløg reduceret og pisket med koldt smør.",
  "champagne-hollandaise":
    "Hollandaisesauce hvor citron suppleres af champagne-reduktion — til asparges og æg.",
  "hvidvins-veloute-med-urter":
    "Lys fond + hvidvin + finthakkede krydderurter (kørvel, dild, persille) — til lyst kød og fisk.",
};

export const GUIDE_RECIPE_ADDITIONS = {
  "vin-til-fisk": [
    { slug: "sauce-noilly-prat", label: "Sauce Noilly Prat" },
    { slug: "sauce-bercy", label: "Sauce Bercy" },
    { slug: "hvidvins-veloute-med-urter", label: "Hvidvins-velouté med urter" },
  ],
  "vin-til-kylling": [
    { slug: "sauce-albufera", label: "Sauce Albuféra" },
    { slug: "sherrysauce-med-svampe", label: "Sherrysauce med svampe" },
  ],
  "vin-til-svinekoed": [
    { slug: "hvidvins-dijonsauce", label: "Hvidvins-dijonsauce" },
  ],
  "vin-til-boeff": [
    { slug: "beurre-rouge", label: "Beurre rouge" },
  ],
  "vin-til-asparges": [
    { slug: "champagne-hollandaise", label: "Champagne-hollandaise" },
  ],
  "sadan-bruger-du-vin-til-sauce-og-simren": [
    { slug: "sauce-noilly-prat", label: "Sauce Noilly Prat" },
    { slug: "sauce-albufera", label: "Sauce Albuféra" },
    { slug: "sauce-bercy", label: "Sauce Bercy" },
    { slug: "hvidvins-dijonsauce", label: "Hvidvins-dijonsauce" },
    { slug: "sherrysauce-med-svampe", label: "Sherrysauce med svampe" },
    { slug: "beurre-rouge", label: "Beurre rouge" },
    { slug: "champagne-hollandaise", label: "Champagne-hollandaise" },
    { slug: "hvidvins-veloute-med-urter", label: "Hvidvins-velouté med urter" },
  ],
};

export const RECIPES = [
  r({
    slug: "sauce-noilly-prat",
    title: "Sauce Noilly Prat",
    description:
      "Legendarisk fransk sauce til fisk på tør vermouth, skalotteløg og fløde. Opskrift til 4.",
    tags: ["opskrift", "sauce", "fransk", "vermouth", "fisk", "tilbehør"],
    prepTime: "PT10M",
    cookTime: "PT20M",
    servings: 4,
    difficulty: "medium",
    wineInRecipe: {
      style: "Tør fransk vermouth — Noilly Prat (eller lignende dry vermouth)",
      amount: "150 ml Noilly Prat",
      note: "Vermouth reduceres med skalotteløg, før fløde — aromatisk uden rå alkohol.",
    },
    wineToDrink: {
      guideSlug: "vin-til-fisk",
      searchQuery: "hvidvin fisk flødesauce chablis",
      searchMax: 180,
      label: "vin til fisk",
    },
    relatedGuides: [
      "vin-til-fisk",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "150 ml Noilly Prat (tør vermouth)",
      "2 skalotteløg, finthakkede",
      "250 ml piskefløde",
      "50 ml fiskefond eller vand",
      "30 g smør",
      "Salt, hvid peber, citronsaft",
      "Evt. 1 spsk finthakket kørvel",
    ],
    instructions: [
      "Sauter skalotteløg i smør uden farve. Hæld vermouth i. Kog ind til næsten tørt (2–3 spsk tilbage).",
      "Tilsæt fond og fløde. Simr 8–10 minutter til cremet. Si gerne for silke.",
      "Smag til med salt, peber og citron. Rør kørvel i til sidst.",
      "Server til dampet eller stegt hvid fisk.",
    ],
    intro: `**Sauce Noilly Prat** er den franske fiskesauce, hvor tør vermouth — ikke bare hvidvin — giver krydret dybde. Mere aromatisk end [fisk i hvidvinsauce](/opskrifter/fisk-i-hvidvinsauce); Noilly Prat er stjernen.`,
    why: `Vermouths **urter og oxidation** løfter fløde uden at blive tungt. Læs [vin til fisk](/guides/vin-til-fisk).`,
    tips: [
      ["Reduktion", "Næsten tør — ellers alkoholisk."],
      ["Si", "Restaurant-finish."],
      ["Citron", "Åbner fløden."],
      ["Alternativ", "Anden god dry vermouth virker."],
    ],
    serving: `Torsk, rødspætte, kammuslinger. Dampede grøntsager.`,
    mistakes: [
      "At springe reduktion over.",
      "For meget fløde — flat.",
      "Sød vermouth — forkert stil.",
      "At koge efter urter — grå.",
    ],
    storage: `Køleskab 1 dag. Genvarm blidt.`,
    glass: `Chablis eller muscadet — se [vin til fisk](/guides/vin-til-fisk).`,
    faq: [
      ["Uden fløde?", "Mere fond + smør — tættere på Bercy."],
      ["Til kylling?", "Ja — lettere version."],
      ["Hvor køber jeg Noilly Prat?", "Velassorterede vinhandlere."],
    ],
  }),

  r({
    slug: "sauce-albufera",
    title: "Sauce Albuféra",
    description:
      "Klassisk fjerkræsauce: hvidvins-velouté med fløde og tør sherry. Opskrift til 4.",
    tags: ["opskrift", "sauce", "fransk", "hvidvin", "sherry", "kylling", "tilbehør"],
    prepTime: "PT15M",
    cookTime: "PT30M",
    servings: 4,
    difficulty: "medium",
    wineInRecipe: {
      style: "Tør hvidvin + tør sherry (Fino eller Amontillado)",
      amount: "100 ml hvidvin + 2 spsk sherry",
      note: "Hvidvin i velouté-basen; sherry til sidst for nøddeagtig finish.",
    },
    wineToDrink: {
      guideSlug: "vin-til-kylling",
      searchQuery: "kylling chardonnay sherry",
      searchMax: 150,
      label: "vin til kylling",
    },
    relatedGuides: [
      "vin-til-kylling",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "30 g smør + 30 g hvedemel (roux)",
      "400 ml kyllingefond",
      "100 ml tør hvidvin",
      "100 ml piskefløde",
      "2 spsk tør sherry",
      "1 skalotteløg",
      "Salt, peber, evt. muskatnød",
    ],
    instructions: [
      "Sauter skalotteløg i smør. Rør mel i — kog 1 minut (lys roux).",
      "Pisk fond og hvidvin i gradvist. Simr 15 minutter til blank velouté. Si.",
      "Tilsæt fløde. Simr 5 minutter. Tag af varmen — rør sherry i. Smag til.",
      "Server til stegt eller pocheret kylling/kalkun.",
    ],
    intro: `**Sauce Albuféra** er den klassiske fjerkræsauce: lys velouté, fløde og et skvæt tør sherry. Luksus uden at være bearnaise — ideel til festkylling.`,
    why: `Sherry giver **nød og dybde**, som fløde alene mangler. Læs [vin til kylling](/guides/vin-til-kylling).`,
    tips: [
      ["Roux", "Lys — ikke brun.", ],
      ["Sherry til sidst", "Bevarer aroma."],
      ["Si", "Silke."],
      ["Make-ahead", "Velouté uden fløde/sherry — afslut før servering."],
    ],
    serving: `Kyllingebryst, kalkun, [poulet à l'estragon](/opskrifter/poulet-a-lestragon)-agtige middage.`,
    mistakes: [
      "Brun roux — forkert farve.",
      "At koge sherry længe — aroma væk.",
      "Klumper — pisk ordentligt.",
      "For tynd — kog længere eller mere roux.",
    ],
    storage: `Køleskab 2 dage. Genvarm under omrøring.`,
    glass: `Chardonnay eller Fino — se [vin til kylling](/guides/vin-til-kylling).`,
    faq: [
      ["Uden sherry?", "Lidt Madeira — anden stil."],
      ["Glutenfri?", "Majsstivelse i stedet for mel."],
      ["Til fisk?", "Brug fiskefond — tættere på Nantua-agtig."],
    ],
  }),

  r({
    slug: "sauce-bercy",
    title: "Sauce Bercy",
    description:
      "Fransk fiskesauce: hvidvin, skalotteløg og fiskefond monteret med koldt smør. Opskrift til 4.",
    tags: ["opskrift", "sauce", "fransk", "hvidvin", "fisk", "tilbehør"],
    prepTime: "PT10M",
    cookTime: "PT20M",
    servings: 4,
    difficulty: "medium",
    wineInRecipe: {
      style: "Tør, mineralisk hvidvin — muscadet, sauvignon blanc",
      amount: "200 ml hvidvin",
      note: "Hvidvin reduceres hårdt med skalotteløg og fiskefond, før smør monteres.",
    },
    wineToDrink: {
      guideSlug: "vin-til-fisk",
      searchQuery: "muscadet fisk beurre",
      searchMax: 150,
      label: "vin til fisk",
    },
    relatedGuides: [
      "vin-til-fisk",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "200 ml tør hvidvin",
      "200 ml fiskefond",
      "2 skalotteløg, finthakkede",
      "100 g koldt smør i tern",
      "1 spsk finthakket persille",
      "Salt, hvid peber, citronsaft",
    ],
    instructions: [
      "Sauter skalotteløg uden farve. Hæld vin i — kog ind til ca. 3 spsk.",
      "Tilsæt fiskefond. Kog ind til ca. 1 dl koncentreret væske.",
      "Tag ned til lav varme. Pisk smør i tern for tern, til emulsion. Tag af varmen.",
      "Smag til. Rør persille i. Server straks.",
    ],
    intro: `**Sauce Bercy** er fiskens [beurre blanc](/opskrifter/beurre-blanc)-fætter med fiskefond i reduktionen. Ingen fløde — kun vin, fond og smør. Klassisk til dampet hvid fisk.`,
    why: `Hård reduktion + koldt smør = **blank emulsion**. Læs [vin til fisk](/guides/vin-til-fisk).`,
    tips: [
      ["Temp", "For varm = skilt. For kold = stiv."],
      ["Fond", "God fiskefond er afgørende."],
      ["Server straks", "Emulsion holder kort."],
      ["Persille", "Til sidst."],
    ],
    serving: `Dampet torsk, rødspætte, [dampet laks](/opskrifter/dampet-laks-med-rosevinssauce) (uden den anden sauce).`,
    mistakes: [
      "At koge efter smør — skilt.",
      "For lidt reduktion — tynd og alkoholisk.",
      "At bruge bouillonterning alene — saltbombe.",
      "At lade saucen stå 20 min — skilles.",
    ],
    storage: `Bedst frisk. Kan ikke genopvarmes godt.`,
    glass: `Muscadet — se [vin til fisk](/guides/vin-til-fisk).`,
    faq: [
      ["Forskel på beurre blanc?", "Bercy har fiskefond; beurre blanc er vin+eddike+smør."],
      ["Uden fond?", "Mere vin — nærmere beurre blanc."],
      ["Til kylling?", "Brug kyllingefond — anden klassiker."],
    ],
  }),

  r({
    slug: "hvidvins-dijonsauce",
    title: "Hvidvins- og dijonsauce",
    description:
      "Hurtig pandesauce af hvidvin og dijonsennep, jævnet med fløde — til svinemørbrad. Opskrift til 4.",
    tags: ["opskrift", "sauce", "hvidvin", "sennep", "svinekød", "hverdag", "tilbehør"],
    prepTime: "PT5M",
    cookTime: "PT12M",
    servings: 4,
    difficulty: "easy",
    wineInRecipe: {
      style: "Tør hvidvin — chardonnay eller pinot blanc",
      amount: "150 ml hvidvin",
      note: "Hvidvin deglaze'r panden; dijon og fløde afslutter.",
    },
    wineToDrink: {
      guideSlug: "vin-til-svinekoed",
      searchQuery: "svinemørbrad chardonnay sennep",
      searchMax: 150,
      label: "vin til svinekød",
    },
    relatedGuides: [
      "vin-til-svinekoed",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "150 ml tør hvidvin",
      "2 spsk dijonsennep",
      "150 ml piskefløde",
      "1 skalotteløg",
      "1 tsk honning (valgfri)",
      "20 g smør",
      "Salt, peber",
    ],
    instructions: [
      "Efter stegning af svin: sauter skalotteløg i panden. Hæld vin i — skrab bunden. Kog 2–3 minutter.",
      "Rør dijon og fløde i. Simr 5 minutter til cremet. Smag til med honning, salt og peber.",
      "Pisk smør i af varmen. Hæld over skivet svinemørbrad.",
    ],
    intro: `**Hvidvins- og dijonsauce** er den hurtige bistro-sauce til svinemørbrad: vin, dijon, fløde. Klar på under et kvarter — hverdagsgourmet.`,
    why: `Dijon giver **varme og syre**; hvidvin holder saucen lys. Læs [vin til svinekød](/guides/vin-til-svinekoed).`,
    tips: [
      ["Dijon", "Ægte dijon — ikke sød «sennepsdressing»."],
      ["Ikke koge dijon længe", "Kan blive bitter — rør ind midtvejs."],
      ["Pandesky", "Guld."],
      ["Tykkelse", "Fløde jævner; undgå mel."],
    ],
    serving: `Svinemørbrad, kylling, kalv. Kartoffelmos.`,
    mistakes: [
      "For meget sennep — skarp.",
      "At glemme reduktion — vandig.",
      "Sød sennep — forkert stil.",
      "At koge fløde i stykker.",
    ],
    storage: `Bedst frisk. Køleskab 1 dag.`,
    glass: `Chardonnay — se [vin til svinekød](/guides/vin-til-svinekoed).`,
    faq: [
      ["Uden fløde?", "Mere fond + smør."],
      ["Hel sennep?", "1 tsk oveni dijon — tekstur."],
      ["Til pasta?", "Ja — med bacon."],
    ],
  }),

  r({
    slug: "sherrysauce-med-svampe",
    title: "Sherrysauce med svampe",
    description:
      "Tør sherry kogt op med svampemix og fløde — nøddeagtig umami til kylling. Opskrift til 4.",
    tags: ["opskrift", "sauce", "sherry", "svampe", "kylling", "tilbehør"],
    prepTime: "PT15M",
    cookTime: "PT25M",
    servings: 4,
    difficulty: "easy",
    wineInRecipe: {
      style: "Tør sherry — Fino eller Amontillado",
      amount: "120 ml sherry",
      note: "Sherry deglaze'r svampe — fløde giver cremet finish.",
    },
    wineToDrink: {
      guideSlug: "vin-til-kylling",
      searchQuery: "kylling svampe sherry",
      searchMax: 150,
      label: "vin til kylling",
    },
    relatedGuides: [
      "vin-til-kylling",
      "vin-til-svampe",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "300 g blandede svampe, skåret",
      "120 ml tør sherry",
      "200 ml piskefløde",
      "1 skalotteløg",
      "1 fed hvidløg",
      "1 spsk olie + 20 g smør",
      "Salt, peber, persille",
    ],
    instructions: [
      "Sauter svampe i olie/smør ved høj varme, til brunede og væske er væk. Tilsæt skalotteløg og hvidløg.",
      "Hæld sherry i — kog 2–3 minutter.",
      "Tilsæt fløde. Simr 8–10 minutter til cremet. Smag til. Rør persille i.",
      "Server over kylling eller pasta.",
    ],
    intro: `**Sherrysauce med svampe** er nøddeagtig umami: Fino/Amontillado, svampe og fløde. Mere sherry-drevet end [svampesovs med hvidvin](/opskrifter/svampesovs-med-hvidvin) — og en sauce, ikke bare tilbehør.`,
    why: `Sherry spejler **svampenes jord**; fløde binder. Læs [vin til svampe](/guides/vin-til-svampe).`,
    tips: [
      ["Brun svampe", "Vigtigt — ellers vandig."],
      ["Fino vs Amontillado", "Fino = lys; Amontillado = dybere."],
      ["Bland svampe", "Champignon + portobello + evt. tørrede."],
      ["Salt til sidst", "Sherry + fløde."],
    ],
    serving: `Kyllingebryst, kalv, tagliatelle. Se også [sherry-glaseret svampemix](/opskrifter/sherry-glaseret-svampemix).`,
    mistakes: [
      "At overfylde panden — damp i stedet for steg.",
      "Sød cream sherry — forkert.",
      "For lidt reduktion — alkoholisk.",
      "At undervurdere peber.",
    ],
    storage: `Køleskab 2 dage. Genvarm blidt.`,
    glass: `Amontillado eller chardonnay — se [vin til kylling](/guides/vin-til-kylling).`,
    faq: [
      ["Uden fløde?", "Fond + smør."],
      ["Til steak?", "Ja — især med Amontillado."],
      ["Vegetar?", "Perfekt over polenta."],
    ],
  }),

  r({
    slug: "beurre-rouge",
    title: "Beurre rouge (rødvinssmørsauce)",
    description:
      "Søster til beurre blanc: fyldig rødvin og skalotteløg reduceret og pisket med koldt smør. Opskrift til 4.",
    tags: ["opskrift", "sauce", "rødvin", "smør", "fransk", "tilbehør"],
    prepTime: "PT10M",
    cookTime: "PT20M",
    servings: 4,
    difficulty: "medium",
    wineInRecipe: {
      style: "Fyldig, frugtig rødvin — pinot noir eller merlot",
      amount: "250 ml rødvin",
      note: "Rødvin reduceres med skalotteløg, før koldt smør monteres til emulsion.",
    },
    wineToDrink: {
      guideSlug: "vin-til-boeff",
      searchQuery: "pinot noir beurre rouge",
      searchMax: 150,
      label: "vin til bøf",
    },
    relatedGuides: [
      "vin-til-boeff",
      "vin-til-fisk",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "250 ml fyldig rødvin",
      "2 skalotteløg, finthakkede",
      "1 spsk rødvinsseddike (valgfri)",
      "150 g koldt smør i tern",
      "Salt, peber",
    ],
    instructions: [
      "Sauter skalotteløg. Hæld vin (+ eddike) i. Kog ind til ca. 2–3 spsk sirupagtig væske.",
      "Tag ned til lav varme. Pisk smør i tern for tern, til blank emulsion.",
      "Smag til. Si gerne. Server straks.",
    ],
    intro: `**Beurre rouge** er [beurre blanc](/opskrifter/beurre-blanc)s røde søster: rødvin i stedet for hvidvin, samme emulsionsteknik. Fantastisk til laks, and og lette bøffer.`,
    why: `Rødvin giver **farve og frugt**; smør giver silke. Læs [vin til sauce](/guides/sadan-bruger-du-vin-til-sauce-og-simren).`,
    tips: [
      ["Samme regler som beurre blanc", "Temp er alt."],
      ["Pinot", "Giver elegant farve."],
      ["Si", "Fjerner skalotteløg-bidder."],
      ["Server straks", "Skilles ved stand."],
    ],
    serving: `Laks, andebryst, culotte, asparges.`,
    mistakes: [
      "At koge efter smør.",
      "For lidt reduktion.",
      "For tung, egede vin — bitter.",
      "At lade den vente.",
    ],
    storage: `Bedst frisk.`,
    glass: `Pinot noir — se [vin til bøf](/guides/vin-til-boeff).`,
    faq: [
      ["Til hvid fisk?", "Ja — flot kontrast."],
      ["Fløde?", "Ikke klassisk — men 1 spsk stabiliserer."],
      ["Uden eddike?", "Ja — ren vin-reduktion."],
    ],
  }),

  r({
    slug: "champagne-hollandaise",
    title: "Champagne-hollandaise",
    description:
      "Klassisk hollandaise med champagne-reduktion i stedet for (eller udover) ren citron. Opskrift til 4.",
    tags: ["opskrift", "sauce", "champagne", "æg", "asparges", "brunch", "tilbehør"],
    prepTime: "PT10M",
    cookTime: "PT15M",
    servings: 4,
    difficulty: "hard",
    wineInRecipe: {
      style: "Tør champagne eller crémant / cava brut",
      amount: "100 ml mousserende vin",
      note: "Mousserende vin reduceres med skalotteløg; bruges i æggeblomme-emulsionen.",
    },
    wineToDrink: {
      guideSlug: "vin-til-asparges",
      searchQuery: "champagne asparges hollandaise",
      searchMax: 120,
      label: "vin til asparges",
    },
    relatedGuides: [
      "vin-til-asparges",
      "vin-til-aeggekage-og-frittata",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "100 ml tør champagne eller crémant",
      "1 skalotteløg, finthakket",
      "3 æggeblommer",
      "150 g smør, smeltet og lunkent",
      "1–2 tsk citronsaft",
      "Salt, cayenne eller hvid peber",
    ],
    instructions: [
      "Kog champagne med skalotteløg ind til 2 spsk. Si. Afkøl lidt.",
      "Pisk æggeblommer med champagne-reduktion over vandbad, til tyk og luftig (sabayon-agtig).",
      "Dryp smeltet smør i under piskning, til tyk hollandaise. Smag til med citron, salt og cayenne.",
      "Hold varm over lunkent vandbad — ikke for varmt.",
    ],
    intro: `**Champagne-hollandaise** opgraderer klassikeren: bobler reduceres ind i æggeemulsionen. Til asparges, eggs benedict og festbrunch — mere vinøs end ren citron-hollandaise.`,
    why: `Champagne giver **syre og aroma** uden at vande saucen ud. Læs [vin til asparges](/guides/vin-til-asparges).`,
    tips: [
      ["Temp", "For varm = scrambled eggs."],
      ["Smør", "Klarificeret smør er mere stabilt."],
      ["Crémant", "Billigere end champagne — samme trick."],
      ["Redning", "Kold æggeblomme + pisk i skilt sauce."],
    ],
    serving: `Asparges, eggs benedict, [mousserende sabayon](/opskrifter/asparges-med-mousserende-sabayon)-aftener.`,
    mistakes: [
      "For varmt vandbad.",
      "At hælde alt smør på én gang.",
      "At springe reduktion over — for tynd.",
      "At genvarme i mikroovn — skilt.",
    ],
    storage: `Bedst frisk. Hold max 1 time lunkent.`,
    glass: `Champagne — se [vin til asparges](/guides/vin-til-asparges).`,
    faq: [
      ["Uden alkohol?", "Citron + hvidvinseddike."],
      ["Blender?", "Ja — hot butter-metode."],
      ["Forskel på sabayon?", "Hollandaise har mere smør; sabayon er lettere."],
    ],
  }),

  r({
    slug: "hvidvins-veloute-med-urter",
    title: "Hvidvins-velouté med friske krydderurter",
    description:
      "Lys fransk grundsauce på fond og hvidvin med kørvel, dild og persille. Opskrift til 4.",
    tags: ["opskrift", "sauce", "hvidvin", "fransk", "krydderurter", "tilbehør"],
    prepTime: "PT10M",
    cookTime: "PT25M",
    servings: 4,
    difficulty: "medium",
    wineInRecipe: {
      style: "Tør hvidvin — sauvignon blanc eller pinot blanc",
      amount: "100 ml hvidvin",
      note: "Hvidvin indgår i velouté-basen; urter til sidst for friskhed.",
    },
    wineToDrink: {
      guideSlug: "vin-til-fisk",
      searchQuery: "hvidvin fisk urter",
      searchMax: 150,
      label: "vin til fisk",
    },
    relatedGuides: [
      "vin-til-fisk",
      "vin-til-kylling",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "30 g smør + 30 g hvedemel",
      "400 ml lys fond (kylling eller fisk)",
      "100 ml tør hvidvin",
      "2 spsk finthakket kørvel",
      "1 spsk dild",
      "1 spsk persille",
      "2 spsk fløde (valgfri)",
      "Salt, peber, citronsaft",
    ],
    instructions: [
      "Lav lys roux af smør og mel. Pisk fond og hvidvin i. Simr 15 minutter. Si.",
      "Smag til. Rør fløde i hvis ønsket.",
      "Tag af varmen. Rør alle urter i lige før servering.",
      "Server til pocheret kylling, fisk eller grøntsager.",
    ],
    intro: `**Hvidvins-velouté med friske krydderurter** er den grønne, lette grundsauce: fond, hvidvin og et tæppe af kørvel, dild og persille. Mere urtefokuseret end [persillesovs med hvidvin](/opskrifter/persillesovs-med-hvidvin) — fransk velouté-teknik.`,
    why: `Urter til sidst bevarer **farve og aroma**; vin giver syre. Læs [vin til fisk](/guides/vin-til-fisk).`,
    tips: [
      ["Hak fint", "Silkeblød fornemmelse."],
      ["Ikke koge urter", "Grå og bitter."],
      ["Fond", "Hjemmelavet er mærkbart bedre."],
      ["Variation", "Estragon i stedet for dild til kylling."],
    ],
    serving: `Lyst kød, fisk, asparges, nye kartofler.`,
    mistakes: [
      "At koge urterne i 10 min.",
      "Brun roux — forkert farve.",
      "For tyk — mere fond.",
      "At glemme citron — flat.",
    ],
    storage: `Basis uden urter 2 dage. Urter friskt.`,
    glass: `Sauvignon blanc — se [vin til fisk](/guides/vin-til-fisk).`,
    faq: [
      ["Uden mel?", "Reducer fond + montér smør."],
      ["Til pasta?", "Ja — med rejer."],
      ["Frosne urter?", "Friske er bedre."],
    ],
  }),
];
