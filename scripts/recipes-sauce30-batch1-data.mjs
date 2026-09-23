/** Sauce expansion batch 1: kraftige & mørke (8). */
import { r } from "./add-recipes-tilbehor30-lib.mjs";

export const UPDATED = "2026-09-23";

export const SLUG_EXPANSIONS = {
  "sauce-bordelaise":
    "Klassisk fransk rødvinssauce med skalotteløg, oksefond og gerne marv. Reducer vinen hårdt, før fonden går i. Server til entrecôte eller culotte — ikke for tynd.",
  "portvins-morkelsauce":
    "Tørrede morkler udblødes, portvin reduceres med fløde. Luksus til oksemørbrad. Si gerne for silkeblød sauce.",
  "madeirasauce":
    "Standalone Madeira-sauce: reduceret Madeira + sky/fond, monteret med smør. Til skinke, oksebryst eller kalv — adskilt fra glaseret-skinke-retten.",
  "rodvins-chokoladesauce":
    "Rødvin reduceret med fond og en smule 70% chokolade til vildt. Chokoladen runder bitterhed — brug sparsomt.",
  "sauce-grand-veneur":
    "Fransk vildtsauce: rødvin, vildtfond, ribsgelé og fløde. Sød-syrlig kant til rådyr og hjort.",
  "portvinsglace":
    "Tæt portvins-kalvefond-reduktion til at trække striber på tallerkenen. Ikke den samme som pensle-glasering til and.",
  "marsalasauce-til-svinekoed":
    "Tør Marsala reduceret med pandesky, smør og salvie — tip til svinemørbrad og koteletter.",
  "rodvins-balsamicosauce":
    "Hurtig pandesauce: rødvin + balsamico efter stegning af koteletter. Hverdags-bistro på 5 minutter.",
};

export const GUIDE_RECIPE_ADDITIONS = {
  "vin-til-boeff": [
    { slug: "sauce-bordelaise", label: "Sauce Bordelaise" },
    { slug: "portvins-morkelsauce", label: "Portvins-morkelsauce" },
    { slug: "portvinsglace", label: "Portvinsglace" },
  ],
  "vin-til-oksekoed": [
    { slug: "sauce-bordelaise", label: "Sauce Bordelaise" },
    { slug: "madeirasauce", label: "Madeirasauce" },
  ],
  "vin-til-vildt": [
    { slug: "rodvins-chokoladesauce", label: "Rødvins-chokoladesauce" },
    { slug: "sauce-grand-veneur", label: "Sauce Grand Veneur" },
  ],
  "vin-til-svinekoed": [
    { slug: "marsalasauce-til-svinekoed", label: "Marsalasauce til svinekød" },
    { slug: "rodvins-balsamicosauce", label: "Rødvins-balsamicosauce" },
  ],
  "vin-til-flaesketesteg": [
    { slug: "madeirasauce", label: "Madeirasauce" },
  ],
  "sadan-bruger-du-vin-til-sauce-og-simren": [
    { slug: "sauce-bordelaise", label: "Sauce Bordelaise" },
    { slug: "portvins-morkelsauce", label: "Portvins-morkelsauce" },
    { slug: "sauce-grand-veneur", label: "Sauce Grand Veneur" },
    { slug: "portvinsglace", label: "Portvinsglace" },
    { slug: "marsalasauce-til-svinekoed", label: "Marsalasauce" },
    { slug: "rodvins-balsamicosauce", label: "Rødvins-balsamicosauce" },
    { slug: "madeirasauce", label: "Madeirasauce" },
    { slug: "rodvins-chokoladesauce", label: "Rødvins-chokoladesauce" },
  ],
};

export const RECIPES = [
  r({
    slug: "sauce-bordelaise",
    title: "Sauce Bordelaise",
    description:
      "Klassisk fransk rødvinssauce med skalotteløg, oksefond og gerne marv. Opskrift til 4 — til entrecôte.",
    tags: ["opskrift", "sauce", "fransk", "rødvin", "bøf", "tilbehør"],
    prepTime: "PT10M",
    cookTime: "PT35M",
    servings: 4,
    difficulty: "medium",
    wineInRecipe: {
      style: "Tør, frugtig rødvin — Bordeaux rouge, merlot eller cabernet franc",
      amount: "400 ml rødvin",
      note: "Rødvin reduceres hårdt med skalotteløg, før oksefond går i — vinen er saucens skelet.",
    },
    wineToDrink: {
      guideSlug: "vin-til-boeff",
      searchQuery: "bordeaux entrecôte bordelaise",
      searchMax: 200,
      label: "vin til bøf",
    },
    relatedGuides: [
      "vin-til-boeff",
      "vin-til-oksekoed",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "400 ml tør rødvin (gerne Bordeaux-stil)",
      "2 skalotteløg, finthakkede",
      "300 ml oksefond",
      "1 kvist timian, 1 laurbærblad",
      "50 g okse-/kalvemarv i skiver (valgfri men klassisk)",
      "40 g koldt smør",
      "1 spsk olie",
      "Salt og peber",
    ],
    instructions: [
      "Sauter skalotteløg i olie uden farve. Hæld vin i med timian og laurbær. Kog ind til ca. 1 dl.",
      "Tilsæt fond. Simr 15–20 minutter til saucen coat'er en ske. Si.",
      "Pocher marvskiver 1–2 minutter i let saltet vand (hvis brugt). Hold varme.",
      "Tag sauce af varmen. Pisk smør i. Smag til. Læg marv ovenpå bøffen, hæld sauce over.",
    ],
    intro: `**Sauce Bordelaise** er den ultimative franske rødvinssauce til entrecôte: vin reduceret med skalotteløg, oksefond og gerne et strejf af marv. Mere specifik end [rødvinssauce til bøf](/opskrifter/roedvinssauce-til-boef) — Bordeaux i gryden og i glasset.`,
    why: `Hård reduktion fjerner rå alkohol og koncentrerer **frugt og syre**. Marv giver silke. Læs [vin til bøf](/guides/vin-til-boeff).`,
    tips: [
      ["Reduktion", "Vinen skal næsten være sirup, før fonden går i."],
      ["Marv", "Valgfri — stadig klassisk uden."],
      ["Smør", "Af varmen — ellers skiller saucen."],
      ["Restvin", "Brug noget du også vil drikke."],
    ],
    serving: `Entrecôte, culotte, [côte de bœuf](/opskrifter/cote-de-boeuf-med-rodvin). Pommes eller kartoffelmos.`,
    mistakes: [
      "For tynd sauce — mangler reduktion.",
      "At koge efter smør — skilt.",
      "Meget egede, bitre vine — hård eftersmag.",
      "At salte fonden for tidligt — for salt slutresultat.",
    ],
    storage: `Køleskab 3 dage før smør. Montér smør friskt. Frys basis 1 måned.`,
    glass: `Bordeaux eller cabernet franc — se [vin til bøf](/guides/vin-til-boeff).`,
    faq: [
      ["Uden marv?", "Ja — stadig Bordelaise-agtig."],
      ["Kan jeg bruge pandesky?", "Ja — erstat del af fonden."],
      ["Til lam?", "Ja — især med cabernet franc."],
    ],
  }),

  r({
    slug: "portvins-morkelsauce",
    title: "Portvins- og morkelsauce",
    description:
      "Luksuriøs sauce af rød portvin, fløde og tørrede morkler. Opskrift til 4 — til oksemørbrad.",
    tags: ["opskrift", "sauce", "portvin", "morkler", "svampe", "bøf", "tilbehør"],
    prepTime: "PT20M",
    cookTime: "PT30M",
    servings: 4,
    difficulty: "medium",
    wineInRecipe: {
      style: "Rød portvin — ruby eller tawny",
      amount: "150 ml portvin",
      note: "Portvin reduceres med morkelvæske og fløde — dybde til mørbrad.",
    },
    wineToDrink: {
      guideSlug: "vin-til-oksefilet",
      searchQuery: "oksemørbrad pinot portvin",
      searchMax: 180,
      label: "vin til oksemørbrad",
    },
    relatedGuides: [
      "vin-til-oksefilet",
      "vin-til-boeff",
      "vin-til-svampe",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "30 g tørrede morkler",
      "150 ml rød portvin",
      "200 ml piskefløde",
      "100 ml oksefond eller morkelvæske",
      "1 skalotteløg, finthakket",
      "1 spsk smør + 1 spsk olie",
      "Salt, peber, evt. 1 tsk cognac",
    ],
    instructions: [
      "Udblød morkler i varmt vand 20 minutter. Si — gem væsken (klar). Hak morkler groft.",
      "Sauter skalotteløg i smør/olie. Tilsæt morkler. Hæld portvin i — kog ind til næsten tørt.",
      "Tilsæt fond/morkelvæske og fløde. Simr 8–10 minutter til cremet. Smag til.",
      "Server over stegt oksemørbrad.",
    ],
    intro: `**Portvins- og morkelsauce** er luksus på skeen: tørrede morkler, rød portvin og fløde. Mere svampe-fokuseret end [portvinssauce til oksemørbrad](/opskrifter/portvinssauce-til-oksemoerbrad) — her er morklerne stjernen.`,
    why: `Portvin spejler **morklernes jordede sødme**; fløde giver mundfølelse. Læs [vin til oksemørbrad](/guides/vin-til-oksefilet).`,
    tips: [
      ["Væske", "Si morkelvæske gennem kaffefilter — sand."],
      ["Friske morkler", "I sæson — brug 150 g, spring udblødning over."],
      ["Tykkelse", "Skal coat'e skeen."],
      ["Salt", "Fond + port er allerede salte/søde — smag til sidst."],
    ],
    serving: `Oksemørbrad, kalvemedaljoner eller [svampe-bourguignon](/opskrifter/svampe-bourguignon)-agtige retter.`,
    mistakes: [
      "At smide blødevand uden at sie — grus.",
      "For lidt reduktion — tynd, alkoholisk.",
      "For meget fløde — slikkende, flat.",
      "At koge voldsomt efter fløde — skilt.",
    ],
    storage: `Køleskab 2 dage. Genvarm blidt. Frys ikke ideelt.`,
    glass: `Pinot noir eller et lille glas tawny — se [vin til oksemørbrad](/guides/vin-til-oksefilet).`,
    faq: [
      ["Uden fløde?", "Mere fond + smør — lettere sauce."],
      ["Champignon i stedet?", "Muligt — men ikke samme aroma."],
      ["Til pasta?", "Ja — luksus tagliatelle."],
    ],
  }),

  r({
    slug: "madeirasauce",
    title: "Madeirasauce",
    description:
      "Klassisk, nøddeagtig Madeira-sauce på reduceret hedvin og sky. Opskrift til 4 — til skinke og oksebryst.",
    tags: ["opskrift", "sauce", "madeira", "tilbehør", "jul"],
    prepTime: "PT5M",
    cookTime: "PT25M",
    servings: 4,
    difficulty: "easy",
    wineInRecipe: {
      style: "Madeira — medium-dry eller rainwater",
      amount: "200 ml Madeira",
      note: "Madeira reduceres med fond/sky — nøddeagtig glans til kød.",
    },
    wineToDrink: {
      guideSlug: "vin-til-flaesketesteg",
      searchQuery: "skinke madeira pinot",
      searchMax: 150,
      label: "vin til skinke",
    },
    relatedGuides: [
      "vin-til-flaesketesteg",
      "vin-til-oksekoed",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "200 ml Madeira",
      "250 ml kalve- eller oksefond (eller pandesky)",
      "1 skalotteløg, finthakket",
      "40 g koldt smør",
      "1 tsk dijonsennep (valgfri)",
      "Salt og peber",
    ],
    instructions: [
      "Sauter skalotteløg kort. Hæld Madeira i. Kog ind til ca. halvdelen.",
      "Tilsæt fond. Simr 10–15 minutter til blank og koncentreret. Si gerne.",
      "Tag af varmen. Pisk smør og evt. sennep i. Smag til.",
      "Server til glaseret skinke, sprængt oksebryst eller kalv.",
    ],
    intro: `**Madeirasauce** som selvstændigt produkt: nøddeagtig hedvin reduceret med sky og monteret med smør. Hvor [glaseret skinke med Madeirasauce](/opskrifter/glaseret-skinke-med-madeirasauce) er en hel ret, er dette saucen du kan lave til flere formål.`,
    why: `Madeiras **oxidation** giver dybde, som bordvin mangler. Læs [vin til sauce](/guides/sadan-bruger-du-vin-til-sauce-og-simren).`,
    tips: [
      ["Stil", "Medium-dry. Meget sød malmsey: mindre reduktion/sukker."],
      ["Sky", "Pandesky fra steg gør underværker."],
      ["Glans", "Koldt smør af varmen."],
      ["Make-ahead", "Basis uden smør — montér før servering."],
    ],
    serving: `Juleskinke, roastbeef, kalvekoteletter. Se også [sherry-honning-glace](/opskrifter/sherry-honning-glace-til-skinke).`,
    mistakes: [
      "For sød Madeira uden syre — slik.",
      "At koge efter smør — skilt.",
      "For tynd — kog længere.",
      "At bruge oxideret, dårlig flaske.",
    ],
    storage: `Basis 3 dage i køl. Frys 1 måned.`,
    glass: `Pinot eller Madeira i små glas — se [vin til flæskesteg](/guides/vin-til-flaesketesteg).`,
    faq: [
      ["Sherry i stedet?", "Amontillado — tæt på."],
      ["Uden smør?", "Lidt fløde — anden karakter."],
      ["Til vegetar?", "Svampefond + Madeira."],
    ],
  }),

  r({
    slug: "rodvins-chokoladesauce",
    title: "Rødvins- og chokoladesauce",
    description:
      "Dyb vildtsauce med rødvin og en smule 70% chokolade. Opskrift til 4 — til rådyr og hjort.",
    tags: ["opskrift", "sauce", "rødvin", "chokolade", "vildt", "tilbehør"],
    prepTime: "PT10M",
    cookTime: "PT30M",
    servings: 4,
    difficulty: "medium",
    wineInRecipe: {
      style: "Kraftig frugtig rød — syrah, ripasso eller cabernet",
      amount: "300 ml rødvin",
      note: "Rødvin reduceres med fond; chokolade runder bitterhed — sparsomt.",
    },
    wineToDrink: {
      guideSlug: "vin-til-vildt",
      searchQuery: "syrah vildt chokolade",
      searchMax: 150,
      label: "vin til vildt",
    },
    relatedGuides: [
      "vin-til-vildt",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "300 ml rødvin",
      "250 ml vildt- eller oksefond",
      "1 skalotteløg",
      "15–20 g mørk chokolade (70%), hakket",
      "1 spsk solbær- eller ribsgelé",
      "20 g smør",
      "Salt, peber",
    ],
    instructions: [
      "Sauter skalotteløg. Hæld vin i — kog ind til ca. 1 dl.",
      "Tilsæt fond og gele. Simr 12–15 minutter. Si.",
      "Tag af varmen. Rør chokolade og smør i, til blank. Smag til — chokolade skal mærkes som dybde, ikke dessert.",
      "Server til vildtstege.",
    ],
    intro: `**Rødvins- og chokoladesauce** runder vildts bitterhed med en smule 70% chokolade. Ikke en dessert-sauce — mere mexicansk mole-logik på fransk. Perfekt til [rådyrskank](/opskrifter/braiseret-raadyrskank-med-rodvin).`,
    why: `Chokolade binder **tannin og vildtaroma**; rødvin giver syre. Læs [vin til vildt](/guides/vin-til-vildt).`,
    tips: [
      ["Mængde", "Start med 15 g — for meget smager af kage."],
      ["Gele", "Giver glans og frugt."],
      ["Si", "Silkeblød finish."],
      ["Temp", "Chokolade af varmen."],
    ],
    serving: `Rådyr, hjort, vildsvin. Kartoffelmos og tyttebær.`,
    mistakes: [
      "Mælkechokolade — for sødt.",
      "For meget chokolade — dessert.",
      "At koge chokolade — grynet.",
      "Tynd sauce — mangler reduktion.",
    ],
    storage: `Køleskab 2 dage. Genvarm meget blidt.`,
    glass: `Syrah — se [vin til vildt](/guides/vin-til-vildt).`,
    faq: [
      ["Kakao i stedet?", "1 tsk usødet — nødplan."],
      ["Til okse?", "Ja — især kraftige stege."],
      ["Uden gele?", "Lidt mere reduktion."],
    ],
  }),

  r({
    slug: "sauce-grand-veneur",
    title: "Sauce Grand Veneur",
    description:
      "Klassisk fransk vildtsauce med rødvin, vildtfond, ribsgelé og fløde. Opskrift til 4.",
    tags: ["opskrift", "sauce", "fransk", "rødvin", "vildt", "tilbehør"],
    prepTime: "PT10M",
    cookTime: "PT35M",
    servings: 4,
    difficulty: "medium",
    wineInRecipe: {
      style: "Kraftig rødvin — pinot noir, syrah eller Bourgogne rouge",
      amount: "350 ml rødvin",
      note: "Rødvin reduceres med fond; ribsgelé og fløde afslutter — grand veneur-profil.",
    },
    wineToDrink: {
      guideSlug: "vin-til-vildt",
      searchQuery: "pinot noir vildt grand veneur",
      searchMax: 150,
      label: "vin til vildt",
    },
    relatedGuides: [
      "vin-til-vildt",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "350 ml rødvin",
      "300 ml vildt- eller oksefond",
      "2 skalotteløg",
      "2 spsk ribsgelé eller solbærgele",
      "100 ml piskefløde",
      "1 kvist timian",
      "30 g smør",
      "Salt, peber, evt. 1 spsk cognac",
    ],
    instructions: [
      "Sauter skalotteløg. Hæld vin + timian i. Kog ind til ca. 1 dl.",
      "Tilsæt fond. Simr 15 minutter. Si.",
      "Rør gele i. Tilsæt fløde — simr 5 minutter til blank. Pisk smør i af varmen. Smag til.",
      "Server til stegt eller braiseret vildt.",
    ],
    intro: `**Sauce Grand Veneur** er jægerens sauce: rødvin, fond, ribsgelé og fløde. Sød-syrlig kant til vildt uden at blive marmelade. Klassisk fransk — nu i Vinbot-saucekartoteket.`,
    why: `Ribsgelé spejler **skovens bær**; rødvin giver struktur. Læs [vin til vildt](/guides/vin-til-vildt).`,
    tips: [
      ["Gele", "Ribs er klassisk; solbær virker."],
      ["Fløde", "Fuldfed — ellers tynd."],
      ["Balance", "Smag: syre, sødme, salt."],
      ["Cognac", "Flambér valgfrit for aroma."],
    ],
    serving: `Rådyrfilet, hjortesadel, [vildsvinegryde](/opskrifter/vildsvinegryde-med-rodvin).`,
    mistakes: [
      "For meget gele — slik.",
      "For lidt reduktion — vandig.",
      "At koge fløde i stykker — skilt.",
      "For let vin — mangler krop til vildt.",
    ],
    storage: `Køleskab 2 dage. Genvarm blidt.`,
    glass: `Pinot noir — se [vin til vildt](/guides/vin-til-vildt).`,
    faq: [
      ["Uden fløde?", "Mere smør — lettere.", ],
      ["Til and?", "Ja — især vildand."],
      ["Uden gele?", "Chokoladesauce-varianten i stedet."],
    ],
  }),

  r({
    slug: "portvinsglace",
    title: "Portvinsglace",
    description:
      "Tæt, sirupsagtig reduktion af portvin og kalvefond til at trække striber på tallerkenen. Opskrift til ca. 1 dl.",
    tags: ["opskrift", "sauce", "glaze", "portvin", "tilbehør", "gourmet"],
    prepTime: "PT5M",
    cookTime: "PT40M",
    servings: 8,
    difficulty: "medium",
    wineInRecipe: {
      style: "Rød portvin — ruby",
      amount: "300 ml portvin",
      note: "Portvin og fond reduceres til tyk glace — til dekoration og dryp.",
    },
    wineToDrink: {
      guideSlug: "vin-til-boeff",
      searchQuery: "bøf portvin fine dining",
      searchMax: 120,
      label: "vin til bøf",
    },
    relatedGuides: [
      "vin-til-boeff",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "300 ml rød portvin",
      "300 ml kalvefond",
      "1 skalotteløg",
      "1 kvist timian",
      "Evt. 1 tsk sherryeddike",
    ],
    instructions: [
      "Sauter skalotteløg. Hæld portvin og timian i. Kog ind til ca. halvdelen.",
      "Tilsæt fond. Simr uden låg 25–35 minutter, til væsken er tyk, blank og drypper i strenge fra skeen (ca. 1 dl).",
      "Si. Smag til med eddike hvis for sødt.",
      "Træk striber på tallerkenen eller dryp over kød.",
    ],
    intro: `**Portvinsglace** er den tætte tallerken-dekoration: port + kalvefond kogt til sirup. Ikke [portvinsglasering til and](/opskrifter/portvinsglasering-til-and-og-flaeskesteg) (pensling) — her er det den koncentrerede stripe-glace.`,
    why: `Lang reduktion giver **intensitet uden fortykningsmiddel**. Læs [vin til sauce](/guides/sadan-bruger-du-vin-til-sauce-og-simren).`,
    tips: [
      ["Konsistens", "Varm er tyndere end kold — stop lidt før."],
      ["Fond", "God kalvefond = glans."],
      ["Opbevaring", "I squirt-flaske til servering."],
      ["Salt", "Fonden bærer salt — smag forsigtigt."],
    ],
    serving: `Fine dining-tallerkenen til bøf, andebryst, kalv.`,
    mistakes: [
      "For tynd — mangler tålmodighed.",
      "For sødt uden eddike-balance.",
      "At brænde bunden ved hård kogning.",
      "At forveksle med pensle-glace til steg.",
    ],
    storage: `Køleskab 1 uge. Frys i isterninger 2 måneder.`,
    glass: `Samme stil som hovedretten — se [vin til bøf](/guides/vin-til-boeff).`,
    faq: [
      ["Uden fond?", "Kun port — sødere, mindre umami."],
      ["Ruby eller tawny?", "Ruby = frugt; tawny = nødde."],
      ["Til vegetar?", "Svampefond."],
    ],
  }),

  r({
    slug: "marsalasauce-til-svinekoed",
    title: "Marsalasauce til svinekød",
    description:
      "Siciliansk Marsala kogt ind med pandesky, smør og salvie — til svinemørbrad. Opskrift til 4.",
    tags: ["opskrift", "sauce", "marsala", "svinekød", "italiensk", "tilbehør"],
    prepTime: "PT5M",
    cookTime: "PT15M",
    servings: 4,
    difficulty: "easy",
    wineInRecipe: {
      style: "Tør Marsala (secco) — ikke sød dessert-Marsala",
      amount: "150 ml Marsala",
      note: "Marsala deglaze'r panden efter svinekød — salvie og smør afslutter.",
    },
    wineToDrink: {
      guideSlug: "vin-til-svinekoed",
      searchQuery: "svinemørbrad pinot grigio marsala",
      searchMax: 150,
      label: "vin til svinekød",
    },
    relatedGuides: [
      "vin-til-svinekoed",
      "vin-til-italiensk-mad",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "150 ml tør Marsala",
      "100 ml kalve- eller kyllingefond (eller pandesky + vand)",
      "2 skalotteløg eller 1 spsk hakket løg",
      "6–8 friske salvieblade",
      "40 g koldt smør",
      "Salt, peber",
    ],
    instructions: [
      "Efter stegning af svin: sauter skalotteløg i panden. Hæld Marsala i — skrab brune bidder fri. Kog 2–3 minutter.",
      "Tilsæt fond og salvie. Simr 5–8 minutter til let tyknet.",
      "Tag af varmen. Pisk smør i. Smag til.",
      "Hæld over skiver af svinemørbrad eller koteletter.",
    ],
    intro: `**Marsalasauce til svinekød** er den hurtige sicilianske pandesauce: tør Marsala, sky, smør og salvie. Samme vin-familie som [chicken marsala](/opskrifter/chicken-marsala), men bygget til svin og som ren sauce-opskrift.`,
    why: `Marsala giver **tørret frugt og nød**; salvie er klassisk med svin. Læs [vin til svinekød](/guides/vin-til-svinekoed).`,
    tips: [
      ["Secco", "Sød Marsala gør saucen dessertagtig."],
      ["Pandesky", "Guld — undgå at brænde den før deglaze."],
      ["Salvie", "Frisk. Tør er bleg."],
      ["Tykkelse", "Smør jævner; undgå mel hvis muligt."],
    ],
    serving: `Svinemørbrad, koteletter, kalv. Kartoffelmos eller polenta.`,
    mistakes: [
      "Sød Marsala — for slik.",
      "At glemme at skrabbe panden — mistet smag.",
      "For meget fond — tynd.",
      "At koge salvie i 20 min — bitter.",
    ],
    storage: `Bedst frisk. Køleskab 1 dag.`,
    glass: `Pinot grigio eller let rød — se [vin til svinekød](/guides/vin-til-svinekoed).`,
    faq: [
      ["Til kylling?", "Ja — klassisk."],
      ["Uden salvie?", "Timian."],
      ["Fløde?", "2 spsk — mere «cream marsala»."],
    ],
  }),

  r({
    slug: "rodvins-balsamicosauce",
    title: "Rødvins- og balsamicosauce",
    description:
      "Hurtig pandesauce af rødvin og balsamico efter stegning af koteletter. Opskrift til 4.",
    tags: ["opskrift", "sauce", "rødvin", "balsamico", "hverdag", "tilbehør"],
    prepTime: "PT5M",
    cookTime: "PT10M",
    servings: 4,
    difficulty: "easy",
    wineInRecipe: {
      style: "Frugtig rødvin — merlot eller sangiovese",
      amount: "150 ml rødvin + balsamico",
      note: "Panden koges af med rødvin og balsamico — hurtig hverdagssovs.",
    },
    wineToDrink: {
      guideSlug: "vin-til-svinekoed",
      searchQuery: "koteletter sangiovese",
      searchMax: 150,
      label: "vin til koteletter",
    },
    relatedGuides: [
      "vin-til-svinekoed",
      "vin-til-boeff",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "150 ml rødvin",
      "2 spsk balsamicoeddike",
      "1 skalotteløg, finthakket",
      "1 tsk honning eller sukker",
      "30 g koldt smør",
      "Salt, peber",
      "Pandesky fra stegning",
    ],
    instructions: [
      "Efter kød er taget op: sauter skalotteløg i panden 1 minut.",
      "Hæld vin og balsamico i. Skrab bunden. Kog 3–5 minutter til let sirupagtig. Rør honning i.",
      "Tag af varmen. Pisk smør i. Smag til.",
      "Hæld over koteletter eller bøf.",
    ],
    intro: `**Rødvins- og balsamicosauce** er hverdagens pandesovs: 5–10 minutter efter koteletterne er stegt. Syrlig-sød, blank og uden fløde. Enklere end [balsamico-rødvinssirup til steak](/opskrifter/balsamico-rodvinssirup-til-steak) — lavet direkte i panden.`,
    why: `Balsamico + rødvin = **syre og frugt** der løfter fedt kød. Læs [vin til sauce](/guides/sadan-bruger-du-vin-til-sauce-og-simren).`,
    tips: [
      ["Ikke brændt pande", "Sorte bidder = bitter sauce."],
      ["Honning", "Balancerer balsamico."],
      ["Smør", "Glans."],
      ["Kød", "Virker til svin, kalv og kylling."],
    ],
    serving: `Koteletter, medister, hakkebøf. Salat og kartofler.`,
    mistakes: [
      "For meget balsamico — skarp.",
      "For lidt reduktion — vandig.",
      "At glemme salt.",
      "At bruge billig «balsamico»-eddike alene uden vin.",
    ],
    storage: `Bedst frisk.`,
    glass: `Samme rødvin — se [vin til svinekød](/guides/vin-til-svinekoed).`,
    faq: [
      ["Uden smør?", "Lidt olie — mindre blank."],
      ["Hvidvin?", "Ja — lettere version til kylling."],
      ["Til vegetar?", "Stegte svampe i samme deglaze."],
    ],
  }),
];
