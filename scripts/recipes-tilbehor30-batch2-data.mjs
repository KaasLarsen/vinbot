/** Data: Vin-tilbehør batch 2 — ost/tapas + middagsglace. */
import { r } from "./add-recipes-tilbehor30-lib.mjs";

export const UPDATED = "2026-09-23";

export const SLUG_EXPANSIONS = {
  "balsamico-rodvinssirup-til-steak":
    "Brug en frugtig rødvin og en god balsamico (ikke den billigste «balsamico-eddike» til salat). Reducér langsomt til sirupagtig konsistens — den skal dryppe i tykke strenge fra skeen. Honning binder og giver glans. Siruppen er til at dryppe over grillet kød lige før servering, ikke til at koge kød i.",
  "tranebaekompot-grand-marnier-rodvin":
    "Friske eller frosne tranebær fungerer — frosne behøver ikke optøs. Rødvin og Grand Marnier (eller Cointreau) giver dybde og appelsin; appelsinskal forstærker. Kompotten skal være tyk men stadig have hele bær. Klassisk til ostebord og julemad.",
  "chorizomarmelade-med-sherry":
    "Brug spansk chorizo (gerne mild eller semi-pimentón), finthakket. Steg fedtet ud, tilsæt løg og brun farin, derefter tør sherry. Marmeladen skal være intens, salt-sød og smørbar — tapas-smører til brød og ost. Undgå rå mexicansk chorizo til denne opskrift.",
  "hvidvins-estragonglace-til-kylling":
    "Reducer hvidvin og kyllingefond til koncentreret base, tilsæt masser af frisk estragon, og montér med koldt smør af varmen. Glacen skal være blank og coat'e skeen. Pensles på kylling de sidste minutter eller serveres ved siden af. Estragon må ikke koge længe — den bliver bitter.",
  "aeble-hvidvinskompot-med-timian":
    "Vælg syrlige æbler (Ingrid Marie, Granny Smith, Discovery). Tør hvidvin og frisk timian holder kompotten savoury — perfekt til flæskesteg og and, ikke kun dessert. Kog til grove stykker stadig er synlige; det er ikke æblemos.",
};

export const GUIDE_RECIPE_ADDITIONS = {
  "vin-til-boeff": [
    { slug: "balsamico-rodvinssirup-til-steak", label: "Balsamico- og rødvinssirup til steak" },
  ],
  "vin-til-oksekoed": [
    { slug: "balsamico-rodvinssirup-til-steak", label: "Balsamico- og rødvinssirup til steak" },
  ],
  "vin-til-ost-og-ostebord": [
    { slug: "tranebaekompot-grand-marnier-rodvin", label: "Tranebærkompot med Grand Marnier" },
    { slug: "chorizomarmelade-med-sherry", label: "Chorizomarmelade med sherry" },
  ],
  "vin-til-tapas": [
    { slug: "chorizomarmelade-med-sherry", label: "Chorizomarmelade med sherry" },
    { slug: "tranebaekompot-grand-marnier-rodvin", label: "Tranebærkompot med Grand Marnier" },
  ],
  "vin-til-kylling-og-lyst-koed": [
    { slug: "hvidvins-estragonglace-til-kylling", label: "Hvidvins-estragonglace til kylling" },
  ],
  "vin-til-flaesketesteg": [
    { slug: "aeble-hvidvinskompot-med-timian", label: "Æble- og hvidvinskompot med timian" },
  ],
  "vin-til-and": [
    { slug: "aeble-hvidvinskompot-med-timian", label: "Æble- og hvidvinskompot med timian" },
    { slug: "tranebaekompot-grand-marnier-rodvin", label: "Tranebærkompot med Grand Marnier" },
  ],
  "vin-til-spansk-mad": [
    { slug: "chorizomarmelade-med-sherry", label: "Chorizomarmelade med sherry" },
  ],
  "sadan-bruger-du-vin-til-sauce-og-simren": [
    { slug: "balsamico-rodvinssirup-til-steak", label: "Balsamico-rødvinssirup" },
    { slug: "hvidvins-estragonglace-til-kylling", label: "Hvidvins-estragonglace" },
  ],
};

export const RECIPES = [
  r({
    slug: "balsamico-rodvinssirup-til-steak",
    title: "Balsamico- og rødvinssirup til steaks",
    description:
      "Tyk, sirupsagtig reduktion af rødvin, god balsamico og honning til at dryppe over grillet kød. Opskrift til 4–6 steaks.",
    tags: ["opskrift", "sauce", "tilbehør", "rødvin", "balsamico", "steak", "glaze"],
    prepTime: "PT5M",
    cookTime: "PT25M",
    servings: 6,
    difficulty: "easy",
    wineInRecipe: {
      style: "Frugtig tør rødvin — merlot, sangiovese eller ung Côtes du Rhône",
      amount: "300 ml rødvin",
      note: "Rødvin og balsamico reduceres til tyk sirup — den er glasuren, ikke stegesaucen alene.",
    },
    wineToDrink: {
      guideSlug: "vin-til-boeff",
      searchQuery: "steak merlot malbec balsamico",
      searchMax: 200,
      label: "vin til bøf",
    },
    relatedGuides: [
      "vin-til-boeff",
      "vin-til-oksekoed",
      "vin-til-grill-og-bbq",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "300 ml frugtig rødvin",
      "80 ml god balsamicoeddike",
      "2 spsk honning",
      "1 skalotteløg, finthakket (valgfri)",
      "1 kvist rosmarin eller timian",
      "1 knivspids salt",
      "Friskkværnet peber",
    ],
    instructions: [
      "Hæld vin, balsamico, honning, skalotteløg og urt i en lille gryde. Bring i kog.",
      "Simr uden låg på middel-lav varme 15–25 minutter, til væsken er reduceret til ca. 1 dl og drypper i tykke strenge fra skeen.",
      "Fjern urt. Smag til med salt og peber. Siruppen tykner mere ved afkøling.",
      "Dryp over grillet steak lige før servering — eller pensel let de sidste 2 minutter på grillen.",
    ],
    intro: `**Balsamico- og rødvinssirup** er den tykke, blanke reduktion, du drypper over grillet kød i stedet for en tung sauce. Rødvin, god balsamico og en smule honning koges ind til sirupagtig glans. Tæt på glasuren i [balsamico-rødvinsglaserede skalotteløg](/opskrifter/balsamico-rodvinsglaserede-skalotteloeg), men her er produktet selve siruppen — klar til steak, culotte og grillaften.`,
    why: `Reduktion koncentrerer **syre, frugt og sødme**, så et par skeer er nok. Honning giver glans uden at smage af slik, hvis balsamicoen er god. Læs [vin til bøf](/guides/vin-til-boeff) og [vin til sauce og simren](/guides/sadan-bruger-du-vin-til-sauce-og-simren).`,
    tips: [
      ["Konsistens", "Skeen skal efterlade et spor i bunden. For tynd: kog videre. For tyk: tilsæt 1 spsk vin."],
      ["Balsamico", "En bedre flaske betaler sig — billig «balsamico» smager skarpt og fladt."],
      ["Timing", "Lav siruppen før kødet — den holder sig varm på lav blus."],
      ["Mængde", "Lidt er luksus; for meget er klæbrig sødmefælde."],
    ],
    serving: `Dryp over ribeye, culotte, [côte de bœuf](/opskrifter/cote-de-boeuf-med-rodvin) eller grillet lam. Server med [balsamico-rødvinsglaserede skalotteløg](/opskrifter/balsamico-rodvinsglaserede-skalotteloeg) og grøn salat.`,
    mistakes: [
      "For hård kogning — brændt, bitter sirup.",
      "Kun eddike uden vin — mangler frugt og dybde.",
      "At overhælde steaken — dominerer kødet.",
      "At bruge siruppen som marinade i timevis — for sødt og syrligt på overfladen.",
    ],
    storage: `Køleskab 2 uger i glas. Genvarm blidt med en skvæt vin. Frys i isterninger op til 2 måneder.`,
    glass: `Samme stil som i gryden — merlot, malbec eller Côtes du Rhône. Se [vin til bøf](/guides/vin-til-boeff).`,
    faq: [
      ["Kan jeg lave den uden honning?", "Ja — erstat med 1 spsk sukker, eller spring over hvis balsamicoen er sød nok."],
      ["Virker det til kylling?", "Ja, men brug sparsomt — kylling tåler mindre sød-syrlig glasur end okse."],
      ["Forskel på glaze og sauce?", "Denne er koncentreret dryp; en klassisk rødvinsauce er tyndere og mere «fond»."],
    ],
  }),

  r({
    slug: "tranebaekompot-grand-marnier-rodvin",
    title: "Tranebærkompot med Grand Marnier og rødvin",
    description:
      "Friske tranebær kogt op med rødvin, appelsinskal og Grand Marnier. Opskrift til 6–8 — til ostebord og julemad.",
    tags: ["opskrift", "tilbehør", "tapas", "rødvin", "tranebær", "jul", "ost", "vegetar"],
    prepTime: "PT10M",
    cookTime: "PT20M",
    servings: 8,
    difficulty: "easy",
    wineInRecipe: {
      style: "Frugtig rødvin — merlot, grenache eller ung pinot noir",
      amount: "150 ml rødvin + 2 spsk Grand Marnier",
      note: "Tranebær koges i rødvin og appelsinlikør — vinen er lagen.",
    },
    wineToDrink: {
      guideSlug: "vin-til-ost-og-ostebord",
      searchQuery: "rødvin ost tranebær pinot",
      searchMax: 150,
      label: "vin til ost og tranebær",
    },
    relatedGuides: [
      "vin-til-ost-og-ostebord",
      "vin-til-and",
      "vin-til-julefrokost",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "300 g friske eller frosne tranebær",
      "150 ml frugtig rødvin",
      "80 g sukker",
      "2 spsk Grand Marnier eller Cointreau",
      "Saft og skal af 1/2 appelsin",
      "1 kanelstang (valgfri)",
      "1 knivspids salt",
    ],
    instructions: [
      "Bring vin, sukker, appelsinsaft, skal, kanel og salt i kog i en gryde.",
      "Tilsæt tranebær. Simr 10–15 minutter under omrøring, til bærrene springer og kompotten tykner.",
      "Tag af varmen. Rør Grand Marnier i. Fjern kanelstang.",
      "Køl af — kompotten tykner yderligere. Server lun eller kold.",
    ],
    intro: `**Tranebærkompot med Grand Marnier og rødvin** er det røde, syrlige modspil til blåskimmel, cheddar og juleanden. Tranebær koges op med rødvin, appelsin og en skvæt likør — klassisk amerikansk sauce med europæisk vinløft. Tæt på [rødvinsgelé til charcuteri](/opskrifter/roedvinsgele-til-charcuteri), men her er det kompot med hele bær.`,
    why: `Rødvin giver **dybde og farve**; Grand Marnier forstærker appelsinen uden at gøre det til dessertlikør-bombe. Syren fra bærrene skærer igennem fed ost og andefedt. Læs [vin til ost](/guides/vin-til-ost-og-ostebord) og [vin til and](/guides/vin-til-and).`,
    tips: [
      ["Sukker", "Start med 80 g — tranebær er sure. Justér efter smag."],
      ["Likør", "Tilsæt af varmen, så alkoholaromaen bevares."],
      ["Konsistens", "Skal kunne ligge på ost — ikke løbe som saft."],
      ["Frosne bær", "Kommer direkte i gryden — ingen optøning."],
    ],
    serving: `Ostebord, [julefrokost](/guides/vin-til-julefrokost), and, kalkun og grilled cheese. Prøv med brie eller blåskimmel — samme rolle som [portvins-fignemarmelade](/opskrifter/portvins-fignemarmelade-med-rosmarin).`,
    mistakes: [
      "For meget sukker — mister den skærende syre.",
      "At koge likøren længe — aroma forsvinder.",
      "For tynd kompot — drypper af osten.",
      "Meget tannin-tung vin — bitter eftersmag med bærrene.",
    ],
    storage: `Køleskab 1–2 uger. Frys op til 3 måneder. Server kold eller let lunkent.`,
    glass: `Pinot noir, frugtig merlot eller champagne til ostebordet — se [vin til ost](/guides/vin-til-ost-og-ostebord).`,
    faq: [
      ["Uden alkohol?", "Erstat vin med appelsinsaft + 1 spsk eddike; spring likør over."],
      ["Kan jeg bruge tørrede tranebær?", "Nej til denne — de er allerede søde og rehydrerer anderledes. Brug friske/frosne."],
      ["Til risalamande?", "Muligt, men [kirsebærsovs med portvin](/opskrifter/kirsebaersovs-med-portvin) er mere klassisk til dessert."],
    ],
  }),

  r({
    slug: "chorizomarmelade-med-sherry",
    title: "Chorizomarmelade med tør sherry",
    description:
      "Finthakket chorizo kogt ind med løg, brun farin og tør spansk sherry. Opskrift til ca. 2 glas — intens salt-sød tapas-smører.",
    tags: ["opskrift", "tilbehør", "tapas", "sherry", "chorizo", "spansk"],
    prepTime: "PT15M",
    cookTime: "PT35M",
    servings: 10,
    difficulty: "easy",
    wineInRecipe: {
      style: "Tør sherry — Amontillado, oloroso eller manzanilla (ikke cream)",
      amount: "120 ml sherry",
      note: "Sherry koges ind med chorizo og løg — den er sødme og nøddeagtig dybde.",
    },
    wineToDrink: {
      guideSlug: "vin-til-tapas",
      searchQuery: "sherry tapas chorizo rioja",
      searchMax: 150,
      label: "vin til tapas",
    },
    relatedGuides: [
      "vin-til-tapas",
      "vin-til-spansk-mad",
      "vin-til-ost-og-ostebord",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "250 g spansk chorizo, skindet af og finthakket",
      "2 skalotteløg eller 1 lille løg, finthakket",
      "1 fed hvidløg, finthakket",
      "120 ml tør sherry",
      "2 spsk brun farin",
      "1 spsk sherryeddike eller rødvinseddike",
      "1/2 tsk røget paprika (hvis chorizoen er mild)",
      "Friskkværnet peber",
    ],
    instructions: [
      "Steg hakket chorizo i en pande på middel varme, til fedtet smelter og kødet er gennemstegt (8–10 min). Hæld det meste fedt fra — behold 1–2 spsk.",
      "Tilsæt løg. Steg 5–7 minutter til bløde. Tilsæt hvidløg og paprika 1 minut.",
      "Drys farin over. Hæld sherry og eddike i. Simr 15–20 minutter under omrøring, til massen er tyk og blank.",
      "Smag til med peber. Køl af — marmeladen tykner. Hak finere med kniv hvis du vil have mere smørbar konsistens.",
    ],
    intro: `**Chorizomarmelade med tør sherry** er den intense, salt-søde tapas-smører, der får brød og manchego til at forsvinde. Finthakket chorizo koges ind med løg, brun farin og Amontillado til en marmelade-agtig masse. Tæt på [chorizo i rødvin](/opskrifter/chorizo-i-rodvin) og [portvins-baconmarmelade](/opskrifter/portvins-baconmarmelade), men med spansk pimentón og sherry i stedet for port.`,
    why: `Tør sherry matcher **pimentón og fedt** med nøddeagtig dybde. Farin og eddike skaber den søde-syrlige «jam»-balance. Læs [vin til tapas](/guides/vin-til-tapas) og [vin til spansk mad](/guides/vin-til-spansk-mad).`,
    tips: [
      ["Chorizo", "Spansk, kureret. Mexicansk rå chorizo er en anden vare."],
      ["Fedt", "Hæld det meste fra — ellers bliver marmeladen fedtet."],
      ["Konsistens", "Skal kunne smøres. For grov: kort pulse i foodprocessor."],
      ["Varme", "Stærk chorizo behøver ikke ekstra paprika."],
    ],
    serving: `Crostini, omelet, bagte kartofler, ostebord med manchego eller som topping på burger. Server med [sherry-glaseret svampemix](/opskrifter/sherry-glaseret-svampemix) på samme tapasbræt.`,
    mistakes: [
      "Cream sherry — for sødt med chorizo.",
      "For meget fedt i glasset — spekket mundfølelse.",
      "For kort indkogning — løs «hash» i stedet for marmelade.",
      "At glemme syre — kun salt og sødme.",
    ],
    storage: `Køleskab 5–7 dage. Frys i portioner op til 2 måneder. Genvarm blidt eller server stuetemperatur.`,
    glass: `Amontillado, manzanilla eller ung rioja — se [vin til tapas](/guides/vin-til-tapas).`,
    faq: [
      ["Kan jeg bruge chorizo-pølse fra køledisken?", "Ja, hvis den er spansk-stil med pimentón. Smag til med paprika hvis den er mild."],
      ["Vegetarisk variant?", "Brug røget tofu eller svampe + paprika — men det er en anden ret."],
      ["Til æg?", "Fremragende i omelet eller på avocado-toast med æg."],
    ],
  }),

  r({
    slug: "hvidvins-estragonglace-til-kylling",
    title: "Hvidvins- og estragonglace til kylling",
    description:
      "Intens reduktion af hvidvin, kyllingefond og frisk estragon, monteret med koldt smør til blank glace. Opskrift til 4.",
    tags: ["opskrift", "sauce", "hvidvin", "estragon", "kylling", "glace"],
    prepTime: "PT10M",
    cookTime: "PT25M",
    servings: 4,
    difficulty: "medium",
    wineInRecipe: {
      style: "Tør, aromatisk hvidvin — chardonnay uden tung eg, chablis eller pinot blanc",
      amount: "200 ml hvidvin",
      note: "Hvidvin reduceres med fond og montéres med smør — den er glacens skelet.",
    },
    wineToDrink: {
      guideSlug: "vin-til-kylling-og-lyst-koed",
      searchQuery: "chardonnay kylling estragon",
      searchMax: 180,
      label: "vin til kylling",
    },
    relatedGuides: [
      "vin-til-kylling-og-lyst-koed",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "200 ml tør hvidvin",
      "250 ml kyllingefond (gerne hjemmelavet eller god karton)",
      "2 skalotteløg, finthakkede",
      "3 spsk frisk estragon, hakket (gem lidt til pynt)",
      "80 g koldt smør i tern",
      "1 tsk dijonsennep (valgfri)",
      "Salt og hvid peber",
      "1 spsk olie til stegning af skalotteløg",
    ],
    instructions: [
      "Sauter skalotteløg i olie 3–4 minutter uden farve. Hæld hvidvin i. Kog ind til ca. 3 spsk er tilbage.",
      "Tilsæt fond. Simr 10–12 minutter, til saucen er reduceret til ca. 1,5 dl og smager koncentreret.",
      "Si gerne saucen for silkeblød glace. Tag af varmen. Rør dijon og det meste estragon i.",
      "Pisk koldt smør i lidt ad gangen, til glacen er blank. Smag til med salt og peber. Server med det samme — eller hold lun (ikke kogende).",
    ],
    intro: `**Hvidvins-estragonglace** er den blanke, urtede glace, der får stegt kylling til at smage af fransk bistro. Hvidvin og fond reduceres, estragon går i, og koldt smør monteres til spejlblank sauce. Tæt på [poulet à l'estragon](/opskrifter/poulet-a-lestragon) og [beurre blanc](/opskrifter/beurre-blanc) — her er fokus glacen som selvstændigt produkt til at pensle eller øse.`,
    why: `Reduktion fjerner rå alkohol og koncentrerer **syre og fond-umami**. Estragon er klassisk med kylling; smør giver glans og mundfølelse. Læs [vin til kylling](/guides/vin-til-kylling-og-lyst-koed).`,
    tips: [
      ["Ikke koge efter smør", "Glacen skiller hvis den koger. Hold under kogepunkt."],
      ["Estragon", "Frisk er afgørende. Tør er bleg erstatning — brug mindre."],
      ["Fond", "For salt fond: fortynd med vand før reduktion."],
      ["Pensling", "Pensl kylling de sidste 5 minutter i ovnen, og server rest ved siden af."],
    ],
    serving: `Stegt eller ovnbagt kylling, kyllingebryst, [kylling cacciatore](/opskrifter/kylling-cacciatore-med-rodvin) som lys kontrast, eller grøntsager. Server med kogte kartofler eller ris.`,
    mistakes: [
      "At koge efter smør — skilt sauce.",
      "For lidt reduktion — tynd, vandig «suppe».",
      "At koge estragon længe — bitter, græsagtig smag.",
      "Meget egetræet chardonnay — tung og smør-på-smør.",
    ],
    storage: `Bedst frisk. Køleskab 1–2 dage. Genvarm meget blidt under omrøring — tilsæt en skvæt fond hvis den tykner for meget. Frys ikke (smør skiller).`,
    glass: `Chablis, pinot blanc eller let chardonnay — se [vin til kylling](/guides/vin-til-kylling-og-lyst-koed).`,
    faq: [
      ["Kan jeg bruge tarragoneddike?", "Ja, 1 tsk til sidst for ekstra estragon-aroma."],
      ["Til fisk?", "Ja — især torsk og braiset fisk. Brug fiskefond i stedet."],
      ["Uden smør?", "Prøv 2 spsk creme fraiche af varmen — anden karakter, stadig god."],
    ],
  }),

  r({
    slug: "aeble-hvidvinskompot-med-timian",
    title: "Æble- og hvidvinskompot med timian",
    description:
      "Syrlige æbler kogt ind med hvidvin og frisk timian. Opskrift til 6 — perfekt modspil til flæskesteg og and.",
    tags: ["opskrift", "tilbehør", "hvidvin", "æble", "timian", "jul", "vegetar"],
    prepTime: "PT15M",
    cookTime: "PT25M",
    servings: 6,
    difficulty: "easy",
    wineInRecipe: {
      style: "Tør, frisk hvidvin — riesling tør, pinot blanc eller chenin blanc",
      amount: "200 ml hvidvin",
      note: "Æbler pocheres i hvidvin med timian — vinen er syre og aroma.",
    },
    wineToDrink: {
      guideSlug: "vin-til-flaesketesteg",
      searchQuery: "riesling flæskesteg æble",
      searchMax: 180,
      label: "vin til flæskesteg",
    },
    relatedGuides: [
      "vin-til-flaesketesteg",
      "vin-til-and",
      "vin-til-stegt-flaesk",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "4 syrlige æbler (ca. 700 g), skrællet, udstenet og i både",
      "200 ml tør hvidvin",
      "2 spsk sukker eller honning",
      "2 kviste frisk timian",
      "1 spsk smør",
      "1 knivspids salt",
      "Evt. 1 spsk citronsaft",
    ],
    instructions: [
      "Smelt smør i en gryde. Vend æblebådene rundt 2–3 minutter.",
      "Hæld vin, sukker, timian og salt i. Bring i kog.",
      "Simr uden låg 12–18 minutter, til æblerne er møre men stadig holder formen. Tag timian fra.",
      "Kog lagen ind 2–3 minutter hvis den er tynd. Smag til med citron. Server lun.",
    ],
    intro: `**Æble- og hvidvinskompot med timian** er det syrlige, urtede modspil til flæskesteg, sprængt and og stegt flæsk — ikke den søde dessertæblemos. Syrlige æbler koges ind med tør hvidvin og frisk timian. Tæt på [æble-hvidvinsmarinade](/opskrifter/aeble-hvidvinsmarinade), men her er kompotten tilbehøret på tallerkenen.`,
    why: `Hvidvinens **syre** holder æblerne vågne mod fedt kød. Timian gør det savoury. Riesling tør og chenin har æble-aroma i forvejen. Læs [vin til flæskesteg](/guides/vin-til-flaesketesteg) og [vin til and](/guides/vin-til-and).`,
    tips: [
      ["Æblesort", "Syrlige sorter. Søde æbler bliver grød uden kant."],
      ["Tekstur", "Stop før mos — grove stykker er pointen."],
      ["Timian", "Frisk. Rosmarin kan erstatte i mindre mængde."],
      ["Make-ahead", "Lav tidligere på dagen; genvarm blidt."],
    ],
    serving: `Flæskesteg, [stegt flæsk](/guides/vin-til-stegt-flaesk), and, medister eller ridderhat med leverpostej. Også god til ost — især cheddar og comté.`,
    mistakes: [
      "Søde æbler + for meget sukker — dessert uden kant.",
      "For lang kogning — æblemos.",
      "At glemme salt — flad sødme.",
      "Sød dessertvin i gryden — for tung til flæsk.",
    ],
    storage: `Køleskab 4–5 dage. Frys op til 2 måneder. Genvarm blidt med en skvæt vin.`,
    glass: `Tør riesling, pinot blanc eller cider — se [vin til flæskesteg](/guides/vin-til-flaesketesteg).`,
    faq: [
      ["Med skræl?", "Ja, hvis æblerne er fine — giver mere tekstur og farve."],
      ["Kan jeg tilsætte løg?", "Ja, 1 finthakket skalotteløg sauteres først — mere savoury."],
      ["Til juleanden?", "Ja — klassisk æble + syre. Prøv også [tranebærkompot](/opskrifter/tranebaekompot-grand-marnier-rodvin)."],
    ],
  }),
];
