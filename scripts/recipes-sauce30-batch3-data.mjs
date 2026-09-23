/** Sauce expansion batch 3: asiatisk + ekstra/eksklusivt (7). */
import { r } from "./add-recipes-tilbehor30-lib.mjs";

export const UPDATED = "2026-09-23";

export const SLUG_EXPANSIONS = {
  "aegte-teriyakisauce":
    "Hjemmelavet glaze af sake, mirin og soja kogt tyk — ikke flaske-teriyaki. Pensling og dyp.",
  "shaoxing-hoisin-glace":
    "Kinesisk glaze: Shaoxing-risvin, hoisin og femkrydderi til andebryst og spareribs.",
  "miso-sakesauce":
    "Hvid miso pisket med varm sake, mirin og smør — til bagt laks eller torsk.",
  "aeble-hvidvins-skysauce":
    "Pandesky kogt af med syrlig hvidvin og ufiltreret æblemost — til svinemørbrad/flæskesteg.",
  "cidresauce-med-skalotteloeg":
    "Normandisk sauce på tør æblecider (eller mousserende æblevin) og fløde — til svinekød.",
  "gloegg-sauce-til-julestegen":
    "Enebær, rødvin og portvin reduceret med julekrydderier og andesky — intens julesauce.",
  "sherry-groen-pebersauce":
    "Grønne peberkorn flamberet i cognac, kogt af med Amontillado, før fløde — opgraderet pebersauce.",
};

export const GUIDE_RECIPE_ADDITIONS = {
  "vin-til-asiatisk-mad": [
    { slug: "aegte-teriyakisauce", label: "Ægte teriyakisauce" },
    { slug: "shaoxing-hoisin-glace", label: "Shaoxing-hoisin-glace" },
    { slug: "miso-sakesauce", label: "Miso- og sakesauce" },
  ],
  "vin-til-and": [
    { slug: "shaoxing-hoisin-glace", label: "Shaoxing-hoisin-glace" },
    { slug: "gloegg-sauce-til-julestegen", label: "Gløgg-sauce til julestegen" },
  ],
  "vin-til-laks": [
    { slug: "miso-sakesauce", label: "Miso- og sakesauce" },
  ],
  "vin-til-svinekoed": [
    { slug: "aeble-hvidvins-skysauce", label: "Æble-hvidvins-skysauce" },
    { slug: "cidresauce-med-skalotteloeg", label: "Cidresauce" },
  ],
  "vin-til-flaesketesteg": [
    { slug: "aeble-hvidvins-skysauce", label: "Æble-hvidvins-skysauce" },
    { slug: "cidresauce-med-skalotteloeg", label: "Cidresauce" },
  ],
  "vin-til-julemad-den-store-guide": [
    { slug: "gloegg-sauce-til-julestegen", label: "Gløgg-sauce til julestegen" },
  ],
  "vin-til-juleand": [
    { slug: "gloegg-sauce-til-julestegen", label: "Gløgg-sauce til julestegen" },
  ],
  "vin-til-boeff": [
    { slug: "sherry-groen-pebersauce", label: "Sherry- og grøn pebersauce" },
  ],
  "sadan-bruger-du-vin-til-sauce-og-simren": [
    { slug: "aegte-teriyakisauce", label: "Ægte teriyakisauce" },
    { slug: "shaoxing-hoisin-glace", label: "Shaoxing-hoisin-glace" },
    { slug: "miso-sakesauce", label: "Miso-sakesauce" },
    { slug: "aeble-hvidvins-skysauce", label: "Æble-hvidvins-skysauce" },
    { slug: "cidresauce-med-skalotteloeg", label: "Cidresauce" },
    { slug: "gloegg-sauce-til-julestegen", label: "Gløgg-sauce" },
    { slug: "sherry-groen-pebersauce", label: "Sherry-grøn pebersauce" },
  ],
};

export const RECIPES = [
  r({
    slug: "aegte-teriyakisauce",
    title: "Ægte teriyakisauce",
    description:
      "Hjemmelavet glaze af sake, mirin og sojasauce kogt tyk. Opskrift til ca. 2 dl — pensling og dyp.",
    tags: ["opskrift", "sauce", "glaze", "japansk", "sake", "mirin", "tilbehør"],
    prepTime: "PT5M",
    cookTime: "PT15M",
    servings: 8,
    difficulty: "easy",
    wineInRecipe: {
      style: "Japansk sake (junmai) + mirin",
      amount: "100 ml sake + 100 ml mirin",
      note: "Sake og mirin koges med soja til blank teriyaki-glace — ikke flaske-sirup.",
    },
    wineToDrink: {
      guideSlug: "vin-til-asiatisk-mad",
      searchQuery: "teriyaki riesling sake",
      searchMax: 150,
      label: "vin til asiatisk mad",
    },
    relatedGuides: [
      "vin-til-asiatisk-mad",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "100 ml sake",
      "100 ml mirin",
      "100 ml japansk sojasauce",
      "1 spsk sukker (eller mere efter smag)",
      "1 fed hvidløg, knust (valgfri)",
      "1 skive ingefær (valgfri)",
    ],
    instructions: [
      "Kom sake, mirin, soja, sukker og evt. hvidløg/ingefær i en gryde.",
      "Kog op. Skum evt. af. Simr 10–12 minutter til blank og let tyk (coat'er ske).",
      "Si hvis du brugte hvidløg/ingefær. Afkøl — tykner yderligere.",
      "Pensl kød/fisk de sidste minutter af stegning, eller server som dyp.",
    ],
    intro: `**Ægte teriyakisauce** er sake + mirin + soja kogt til glaze — ikke den søde flaske. Adskilt fra [klassisk teriyaki-marinade](/opskrifter/klassisk-teriyaki-marinade) (til at marinere) og [kylling teriyaki](/opskrifter/kylling-teriyaki-med-sake-og-mirin) (hel ret): her er det selve saucen på flaske i køleskabet.`,
    why: `Sake giver **dybde**, mirin glans, soja salt. Læs [vin til asiatisk mad](/guides/vin-til-asiatisk-mad).`,
    tips: [
      ["Hon mirin", "Ægte mirin — ikke «mirin-style» kun sukker.", ],
      ["Pensling", "Sent i stegningen — brænder ellers."],
      ["Konsistens", "Varm er tyndere."],
      ["Opbevaring", "Glasflaske i køl."],
    ],
    serving: `Laks, kylling, tofu, grøntsager. Ris.`,
    mistakes: [
      "For meget sukker — slik.",
      "At pensle for tidligt — brændt.",
      "At bruge kun soja — saltbombe uden glans.",
      "At koge til karamel — bitter.",
    ],
    storage: `Køleskab 2 uger.`,
    glass: `Riesling eller sake — se [vin til asiatisk mad](/guides/vin-til-asiatisk-mad).`,
    faq: [
      ["Uden sake?", "Tør sherry — nødplan."],
      ["Honning i stedet for sukker?", "Ja — 1 spsk."],
      ["Til poke?", "Fortynd med lidt vand."],
    ],
  }),

  r({
    slug: "shaoxing-hoisin-glace",
    title: "Shaoxing- og hoisin-glace",
    description:
      "Intens kinesisk glaze af Shaoxing-risvin, hoisin og femkrydderi. Opskrift til ca. 2 dl — til and og ribs.",
    tags: ["opskrift", "sauce", "glaze", "kinesisk", "shaoxing", "and", "tilbehør"],
    prepTime: "PT5M",
    cookTime: "PT15M",
    servings: 8,
    difficulty: "easy",
    wineInRecipe: {
      style: "Shaoxing-risvin (kinesisk madlavningsvin)",
      amount: "100 ml Shaoxing",
      note: "Shaoxing koges med hoisin og krydderier til blank glaze.",
    },
    wineToDrink: {
      guideSlug: "vin-til-and",
      searchQuery: "andebryst pinot hoisin",
      searchMax: 150,
      label: "vin til and",
    },
    relatedGuides: [
      "vin-til-and",
      "vin-til-asiatisk-mad",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "100 ml Shaoxing-risvin",
      "4 spsk hoisinsauce",
      "2 spsk sojasauce",
      "1 spsk brunt sukker eller honning",
      "1 tsk femkrydderi",
      "1 fed hvidløg, presset",
      "1 tsk sesamolie (til sidst)",
    ],
    instructions: [
      "Rør alle ingredienser undtagen sesamolie sammen i gryde.",
      "Kog op. Simr 8–12 minutter til tyk og blank.",
      "Tag af varmen. Rør sesamolie i.",
      "Pensl andebryst, spareribs eller kylling de sidste minutter, eller server ved siden af.",
    ],
    intro: `**Shaoxing- og hoisin-glace** er den intense kinesiske pensling: risvin, hoisin og femkrydderi. Tæt på [char siu-marinade](/opskrifter/char-siu-marinade-med-shaoxing) men som færdig glaze til tallerkenen — ideel til andebryst.`,
    why: `Shaoxing giver **dybde**; hoisin sødme og umami. Læs [vin til and](/guides/vin-til-and).`,
    tips: [
      ["Kvalitet Shaoxing", "Ikke den billigste «cooking wine» med salt, hvis muligt."],
      ["Pensling", "Sent — sukker brænder."],
      ["Femkrydderi", "Start med ½ tsk hvis usikker."],
      ["Tykkelse", "Skal hænge på kødet."],
    ],
    serving: `Andebryst, spareribs, [sticky pork belly](/opskrifter/sticky-pork-belly-med-shaoxing).`,
    mistakes: [
      "For meget femkrydderi — medicinsk.",
      "At brænde glazen.",
      "For tynd — kog længere.",
      "At bruge kun hoisin uden vin — fladt.",
    ],
    storage: `Køleskab 1 uge.`,
    glass: `Pinot noir — se [vin til and](/guides/vin-til-and).`,
    faq: [
      ["Uden Shaoxing?", "Tør sherry."],
      ["Til tofu?", "Ja — bagt tofu."],
      ["Chiliflager?", "Efter smag."],
    ],
  }),

  r({
    slug: "miso-sakesauce",
    title: "Miso- og sakesauce",
    description:
      "Hvid miso pisket med varm sake, mirin og smør — til bagt laks eller torsk. Opskrift til 4.",
    tags: ["opskrift", "sauce", "japansk", "miso", "sake", "fisk", "tilbehør"],
    prepTime: "PT5M",
    cookTime: "PT10M",
    servings: 4,
    difficulty: "easy",
    wineInRecipe: {
      style: "Japansk sake + mirin",
      amount: "80 ml sake + 2 spsk mirin",
      note: "Varm sake løser miso; mirin og smør giver glans — til fisk.",
    },
    wineToDrink: {
      guideSlug: "vin-til-laks",
      searchQuery: "laks miso pinot gris",
      searchMax: 150,
      label: "vin til laks",
    },
    relatedGuides: [
      "vin-til-laks",
      "vin-til-asiatisk-mad",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "3 spsk hvid misopasta (shiro)",
      "80 ml sake",
      "2 spsk mirin",
      "1 spsk soja",
      "30 g koldt smør",
      "1 tsk citronsaft eller yuzu",
      "Evt. 1 tsk honning",
    ],
    instructions: [
      "Varm sake og mirin i lille gryde (ikke kog voldsomt). Tag af varmen.",
      "Pisk miso i, til glat. Rør soja og honning i.",
      "Pisk smør i. Smag til med citron.",
      "Server over bagt laks/torsk, eller pensl let før bagning (pas på salt).",
    ],
    intro: `**Miso- og sakesauce** er den silkebløde japanske finish: hvid miso, varm sake, mirin og smør. Adskilt fra [sake-misomarinade](/opskrifter/sake-misomarinade) — her er det den færdige sauce til tallerkenen.`,
    why: `Miso = **umami**; sake bærer aroma uden tung soja. Læs [vin til laks](/guides/vin-til-laks).`,
    tips: [
      ["Hvid miso", "Mildere end rød — bedre til fisk."],
      ["Ikke koge miso", "Bitter aroma."],
      ["Salt", "Miso + soja er salte — smag."],
      ["Konsistens", "Tilføj lidt vand hvis for tyk."],
    ],
    serving: `Bagt laks, torsk, aubergine, broccoli.`,
    mistakes: [
      "At koge miso hårdt.",
      "Rød miso til mild fisk — for kraftig.",
      "For meget soja — saltbombe.",
      "At glemme syre — flat.",
    ],
    storage: `Køleskab 3 dage. Genvarm blidt.`,
    glass: `Pinot gris eller sake — se [vin til laks](/guides/vin-til-laks).`,
    faq: [
      ["Uden smør?", "Sesamolie — anden stil."],
      ["Til kylling?", "Ja."],
      ["Vegetar?", "Perfekt over grøntsager."],
    ],
  }),

  r({
    slug: "aeble-hvidvins-skysauce",
    title: "Æble- og hvidvins-skysauce",
    description:
      "Pandesky kogt af med syrlig hvidvin og ufiltreret æblemost — til svin. Opskrift til 4.",
    tags: ["opskrift", "sauce", "hvidvin", "æble", "svinekød", "dansk", "tilbehør"],
    prepTime: "PT5M",
    cookTime: "PT15M",
    servings: 4,
    difficulty: "easy",
    wineInRecipe: {
      style: "Syrlig hvidvin — riesling tør, grüner eller sauvignon",
      amount: "150 ml hvidvin + æblemost",
      note: "Hvidvin og æblemost deglaze'r pandesky efter svin — nordisk skysauce.",
    },
    wineToDrink: {
      guideSlug: "vin-til-flaesketesteg",
      searchQuery: "flæskesteg riesling æble",
      searchMax: 150,
      label: "vin til flæskesteg",
    },
    relatedGuides: [
      "vin-til-flaesketesteg",
      "vin-til-svinekoed",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "Pandesky fra svinemørbrad eller flæskesteg",
      "150 ml tør, syrlig hvidvin",
      "150 ml ufiltreret æblemost",
      "1 skalotteløg",
      "1 tsk æbleeddike eller citron (valgfri)",
      "30 g koldt smør",
      "Salt, peber",
    ],
    instructions: [
      "Efter kød er taget op: sauter skalotteløg i panden. Hæld vin i — skrab bunden. Kog 2 minutter.",
      "Tilsæt æblemost (og evt. mere sky/fond). Simr 8–10 minutter til let koncentreret.",
      "Smag til med eddike, salt og peber. Pisk smør i af varmen.",
      "Server til skivet svin.",
    ],
    intro: `**Æble- og hvidvins-skysauce** er den danske hverdags-finish: pandesky, syrlig hvidvin og æblemost. Perfekt til svinemørbrad og flæskesteg — frugt uden at blive syltetøj.`,
    why: `Æble + svin er klassisk; hvidvin giver **syre og præcision**. Læs [vin til flæskesteg](/guides/vin-til-flaesketesteg).`,
    tips: [
      ["Ufiltreret most", "Mere æblekarakter."],
      ["Ikke sød dessertvin", "For slik."],
      ["Sky", "Fedtsky: hæld overflødig fedt fra først."],
      ["Balance", "Eddike hvis mosten er sød."],
    ],
    serving: `Flæskesteg, svinemørbrad, medister. Brune kartofler.`,
    mistakes: [
      "For sød most uden syre.",
      "At glemme at skille fedt fra.",
      "For tynd — kog længere.",
      "At bruge kraftig egede rødvin — forkert stil.",
    ],
    storage: `Bedst frisk. Køleskab 1 dag.`,
    glass: `Riesling — se [vin til flæskesteg](/guides/vin-til-flaesketesteg).`,
    faq: [
      ["Cider i stedet for most?", "Se cidresauce."],
      ["Uden smør?", "Ja — mere rustik."],
      ["Til and?", "Ja — med mere reduktion."],
    ],
  }),

  r({
    slug: "cidresauce-med-skalotteloeg",
    title: "Cidresauce med skalotteløg",
    description:
      "Normandisk sauce på tør æblecider og fløde — til svinekød. Opskrift til 4.",
    tags: ["opskrift", "sauce", "cider", "fransk", "svinekød", "tilbehør"],
    prepTime: "PT10M",
    cookTime: "PT20M",
    servings: 4,
    difficulty: "easy",
    wineInRecipe: {
      style: "Tør æblecider eller mousserende æblevin (cidre brut)",
      amount: "300 ml tør cider",
      note: "Cider reduceres med skalotteløg; fløde afslutter — Normandiet i gryden.",
    },
    wineToDrink: {
      guideSlug: "vin-til-svinekoed",
      searchQuery: "svinekød cider chardonnay",
      searchMax: 150,
      label: "vin til svinekød",
    },
    relatedGuides: [
      "vin-til-svinekoed",
      "vin-til-flaesketesteg",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "300 ml tør æblecider (brut)",
      "2 skalotteløg, finthakkede",
      "150 ml piskefløde",
      "100 ml kalve- eller kyllingefond",
      "1 tsk dijonsennep",
      "30 g smør",
      "Salt, peber, evt. æbleeddike",
    ],
    instructions: [
      "Sauter skalotteløg i smør. Hæld cider i. Kog ind til ca. halvdelen.",
      "Tilsæt fond. Simr 5 minutter. Rør fløde og dijon i. Simr til cremet.",
      "Smag til — eddike hvis for sødt. Server til svin.",
    ],
    intro: `**Cidresauce med skalotteløg** er Normandiets svar på flødesauce: tør æblecider, skalotteløg og fløde. Perfekt til svinekød — og tæt på æble-hvidvinssky, men med cider som hovedvin.`,
    why: `Tør cider giver **æble og syre** uden mostens sødme. Læs [vin til svinekød](/guides/vin-til-svinekoed).`,
    tips: [
      ["Brut", "Sød cider = sliksauce."],
      ["Reduktion", "Halvér før fløde."],
      ["Dijon", "Binder og giver kant."],
      ["Calvados", "1 spsk til sidst — fest."],
    ],
    serving: `Svinemørbrad, koteletter, kylling. Kartoffelmos.`,
    mistakes: [
      "Sød cider.",
      "For lidt reduktion — vandig.",
      "At koge fløde itu.",
      "At glemme salt.",
    ],
    storage: `Køleskab 2 dage.`,
    glass: `Chardonnay eller cider i glasset — se [vin til svinekød](/guides/vin-til-svinekoed).`,
    faq: [
      ["Mousserende æblevin?", "Ja — samme metode."],
      ["Uden fløde?", "Mere smør + fond."],
      ["Til fisk?", "Lettere version uden dijon."],
    ],
  }),

  r({
    slug: "gloegg-sauce-til-julestegen",
    title: "Gløgg-sauce til julestegen",
    description:
      "Enebær, rødvin og portvin reduceret med julekrydderier og andesky. Opskrift til 6 — julesauce.",
    tags: ["opskrift", "sauce", "jul", "rødvin", "portvin", "and", "tilbehør"],
    prepTime: "PT10M",
    cookTime: "PT35M",
    servings: 6,
    difficulty: "medium",
    wineInRecipe: {
      style: "Rødvin + rød portvin med julekrydderier",
      amount: "250 ml rødvin + 80 ml portvin",
      note: "Gløgg-krydderier + vin reduceres med andesky — intens julesauce til stegen.",
    },
    wineToDrink: {
      guideSlug: "vin-til-julemad-den-store-guide",
      searchQuery: "and jul pinot noir",
      searchMax: 150,
      label: "vin til julemad",
    },
    relatedGuides: [
      "vin-til-julemad-den-store-guide",
      "vin-til-juleand",
      "vin-til-and",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "250 ml rødvin",
      "80 ml rød portvin",
      "250 ml ande- eller kalvefond / pandesky",
      "6 enebær, knuste",
      "2 nelliker, 1 kanelstang, 2 stjerneanis (lette)",
      "1 spsk ribsgelé eller solbærgele",
      "1 skalotteløg",
      "30 g smør",
      "Salt, peber",
    ],
    instructions: [
      "Sauter skalotteløg. Tilsæt krydderier 30 sekunder. Hæld rødvin og portvin i. Kog ind til ca. halvdelen.",
      "Tilsæt fond. Simr 15–20 minutter. Si — pres enebær let.",
      "Rør gele i. Pisk smør i af varmen. Smag til.",
      "Server til and, gås eller vildt til jul.",
    ],
    intro: `**Gløgg-sauce til julestegen** er nytænkning med rodfæste: enebær, rødvin, portvin og julekrydderier reduceret med andesky. Samme krydderikasse som [rødvinssgløgg](/opskrifter/roedvinsgloegg) — men som intens sauce til stegen.`,
    why: `Port + enebær spejler **vildt og and**; gele giver glans. Læs [vin til julemad](/guides/vin-til-julemad-den-store-guide).`,
    tips: [
      ["Krydderier", "Let hånd — ellers julelys-duft."],
      ["Si", "Obligatorisk."],
      ["Make-ahead", "Lav basis dagen før — montér smør friskt."],
      ["Balance", "Gele efter smag — ikke for sødt."],
    ],
    serving: `Andesteg, gås, vildt. Rødkål og brunede kartofler.`,
    mistakes: [
      "For mange krydderier.",
      "For sød — slik.",
      "At springe si over — grus.",
      "For tynd — mere reduktion.",
    ],
    storage: `Basis 3 dage i køl. Frys 1 måned.`,
    glass: `Pinot eller syrah — se [vin til julemad](/guides/vin-til-julemad-den-store-guide).`,
    faq: [
      ["Uden port?", "Mere rødvin + 1 tsk sukker."],
      ["Til flæskesteg?", "Ja — mildere krydderi."],
      ["Børnevenlig?", "Alkohol koges væk — aroma bliver."],
    ],
  }),

  r({
    slug: "sherry-groen-pebersauce",
    title: "Sherry- og grøn pebersauce",
    description:
      "Grønne peberkorn flamberet i cognac, kogt af med Amontillado og fløde. Opskrift til 4 — til bøf.",
    tags: ["opskrift", "sauce", "sherry", "peber", "bøf", "fransk", "tilbehør"],
    prepTime: "PT5M",
    cookTime: "PT15M",
    servings: 4,
    difficulty: "medium",
    wineInRecipe: {
      style: "Tør Amontillado-sherry + cognac til flambé",
      amount: "100 ml Amontillado + cognac",
      note: "Peberkorn flamberes i cognac; sherry og fløde bygger den klassiske pebersauce.",
    },
    wineToDrink: {
      guideSlug: "vin-til-boeff",
      searchQuery: "peberbøf cabernet sherry",
      searchMax: 150,
      label: "vin til bøf",
    },
    relatedGuides: [
      "vin-til-boeff",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "2 spsk grønne peberkorn (i lage), afløbne og let knuste",
      "2 spsk cognac eller brandy",
      "100 ml Amontillado-sherry",
      "150 ml piskefløde",
      "100 ml oksefond eller pandesky",
      "1 skalotteløg",
      "20 g smør",
      "Salt",
    ],
    instructions: [
      "Efter bøf er stegt: sauter skalotteløg og peberkorn i panden 1 minut.",
      "Hæld cognac i — flambér forsigtigt (eller kog 30 sekunder uden flamme). Hæld sherry i. Kog 2 minutter.",
      "Tilsæt fond og fløde. Simr 5–8 minutter til cremet. Smag til (forsigtig med salt).",
      "Server over peberbøf eller entrecôte.",
    ],
    intro: `**Sherry- og grøn pebersauce** opgraderer klassikeren: Madagaskar-peber flamberes i cognac og koges af med Amontillado, før fløden går i. Mere nøddeagtig end [peberbøf med rødvinssauce](/opskrifter/peberboef-med-rodvinsauce).`,
    why: `Amontillado giver **nød og dybde**, som rødvin ikke matcher i pebersauce. Læs [vin til bøf](/guides/vin-til-boeff).`,
    tips: [
      ["Flambé", "Sluk emhætte; pas på. Eller kog uden flamme."],
      ["Peber", "Grønne i lage — ikke kun sort peber."],
      ["Amontillado", "Ikke sweet cream sherry."],
      ["Fløde", "Fuldfed."],
    ],
    serving: `Entrecôte, culotte, oksemørbrad. Pommes.`,
    mistakes: [
      "Sød sherry.",
      "For meget peber — brændende.",
      "At glemme reduktion — vandig.",
      "Usikker flambé uden sikkerhed.",
    ],
    storage: `Bedst frisk. Køleskab 1 dag.`,
    glass: `Cabernet eller syrah — se [vin til bøf](/guides/vin-til-boeff).`,
    faq: [
      ["Uden cognac?", "Kun sherry — stadig god."],
      ["Uden flamme?", "Kog cognac 30–60 sek."],
      ["Til kylling?", "Ja — mildere peber."],
    ],
  }),
];
