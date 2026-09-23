/** Strategic gaps batch 2: Greek continue + baking + green start (5). */
import { r } from "./add-recipes-tilbehor30-lib.mjs";

export const UPDATED = "2026-09-23";

export const SLUG_EXPANSIONS = {
  "stifado-med-rodvin":
    "Græsk okse- eller kaningryde med masser af skalotteløg, rødvin, kanel og nelliker. Sødsyrlig, krydret, langtidsimret. Skalotteløg er halvdelen af retten — spar ikke. Server med brød eller kartoffelmos.",
  "hvidvins-citrondampede-artiskokker":
    "Klassisk græsk meze: artiskokker dampet/simret i hvidvin, citron, dild og olivenolie. Friske eller frosne hjerter. Syre holder farven. Server lunkne med brød.",
  "guinness-olbrod":
    "Irsk-inspireret brown bread hvor Guinness (eller anden stout) giver malt, farve og saftighed. Hurtigt brød uden lang hævning — soda/bagepulver. Smør tykt på.",
  "taralli-med-hvidvin":
    "Italienske sprøde snack-kranse med hvidvin og fennikelfrø i dejen. Koges kort, derefter bages. Holder sig uger i dåse. Perfekt til aperitivo.",
  "focaccia-med-hvidvin":
    "Focaccia hvor dejen og/eller overfladen vædes med hvidvin og olivenolie før bagning. Åben krumme, vinøs aroma. Server til tapas eller supper.",
};

export const GUIDE_RECIPE_ADDITIONS = {
  "vin-til-graesk-mad": [
    { slug: "stifado-med-rodvin", label: "Stifado med rødvin" },
    { slug: "hvidvins-citrondampede-artiskokker", label: "Hvidvins-artiskokker" },
  ],
  "vin-til-oksekoed": [
    { slug: "stifado-med-rodvin", label: "Stifado med rødvin" },
  ],
  "vin-til-italiensk-mad": [
    { slug: "taralli-med-hvidvin", label: "Taralli med hvidvin" },
    { slug: "focaccia-med-hvidvin", label: "Focaccia med hvidvin" },
  ],
  "vin-til-tapas": [
    { slug: "taralli-med-hvidvin", label: "Taralli med hvidvin" },
    { slug: "hvidvins-citrondampede-artiskokker", label: "Artiskokker med hvidvin" },
  ],
  "vin-til-brittisk-mad": [
    { slug: "guinness-olbrod", label: "Guinness-ølbrød" },
  ],
  "sadan-bruger-du-vin-til-sauce-og-simren": [
    { slug: "stifado-med-rodvin", label: "Stifado" },
    { slug: "focaccia-med-hvidvin", label: "Focaccia med hvidvin" },
  ],
};

export const RECIPES = [
  r({
    slug: "stifado-med-rodvin",
    title: "Stifado — græsk oksegryde med rødvin og skalotteløg",
    description:
      "Græsk gryderet med oksekød, masser af skalotteløg, rødvin, kanel og nelliker. Opskrift til 6 — sød-krydret og mør.",
    tags: ["opskrift", "græsk", "oksekød", "rødvin", "gryderet", "hovedret"],
    prepTime: "PT30M",
    cookTime: "PT150M",
    servings: 6,
    difficulty: "medium",
    wineInRecipe: {
      style: "Frugtig græsk eller middelhavs-rød — Agiorgitiko, Xinomavro blend eller tempranillo",
      amount: "400 ml rødvin",
      note: "Oksekød og skalotteløg braiseres i rødvin med kanel og nelliker.",
    },
    wineToDrink: {
      guideSlug: "vin-til-graesk-mad",
      searchQuery: "agiorgitiko stifado oksekød",
      searchMax: 180,
      label: "vin til stifado",
    },
    relatedGuides: [
      "vin-til-graesk-mad",
      "vin-til-oksekoed",
      "vin-til-gryderet",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "1,2 kg oksekød i store tern (skank eller bog)",
      "500 g skalotteløg, pillede",
      "400 ml rødvin",
      "400 g hakkede tomater (dåse)",
      "4 fed hvidløg",
      "1 kanelstang",
      "4 nelliker",
      "2 laurbærblade",
      "2 spsk tomatpuré",
      "3 spsk olivenolie",
      "1 spsk rødvinseddike",
      "Salt og peber",
    ],
    instructions: [
      "Brun kødet i olie i hold. Tag op. Brun skalotteløg let — tag op.",
      "Rist tomatpuré 1 minut. Hæld vin i, skrab bunden. Tilsæt tomater, krydderi, eddike, salt og peber.",
      "Læg kød tilbage. Simr med låg 1,5 time. Tilsæt skalotteløg. Simr 45–60 minutter mere, til kød er mørt og sauce tyk.",
      "Fjern kanel, nelliker og laurbær. Smag til. Server.",
    ],
    intro: `**Stifado** er den græske oksegryde, hvor skalotteløg næsten overgår kødet i mængde: rødvin, kanel, nelliker og sød-syrlig sauce. Hvor [kleftiko](/opskrifter/kleftiko-med-hvidvin) er ovnbagt lam, er stifado komfur-braisering med krydderi-varme.`,
    why: `Rødvin giver **dybde**; kanel og nelliker giver den typiske græske sødme uden sukkerbombe. Skalotteløg bliver marmeladeagtige. Læs [vin til græsk mad](/guides/vin-til-graesk-mad).`,
    tips: [
      ["Skalotteløg", "Hele — de skal holde formen."],
      ["Kanin", "Klassisk variant: erstat okse med kanin, kortere tid."],
      ["Sauce", "Skal være blank og koncentreret til sidst."],
      ["Make-ahead", "Smager bedre dagen efter."],
    ],
    serving: `Med brød, kartoffelmos eller kritharaki (orzo). Græsk salat ved siden af.`,
    mistakes: [
      "For få skalotteløg — mangler karakter.",
      "For meget kanel — bagværk-agtig.",
      "For kort braising — sej okse.",
      "At koge uden låg hele tiden — tørt.",
    ],
    storage: `Køleskab 3–4 dage. Frys 3 måneder. Genvarm blidt.`,
    glass: `Agiorgitiko eller frugtig rød — se [vin til græsk mad](/guides/vin-til-graesk-mad).`,
    faq: [
      ["Kanin stifado?", "Ja — klassisk. Brun kanin, samme krydderi, ca. 1–1,5 t simren."],
      ["Uden nelliker?", "Brug ekstra laurbær — men nelliker er typiske."],
      ["Til fest?", "Ja — lav dagen før, genvarm."],
    ],
  }),

  r({
    slug: "hvidvins-citrondampede-artiskokker",
    title: "Hvidvins- og citrondampede artiskokker",
    description:
      "Klassisk græsk meze: artiskokker simret i hvidvin, citron, dild og olivenolie. Opskrift til 4 som forret.",
    tags: ["opskrift", "græsk", "meze", "artiskok", "hvidvin", "vegetar", "forret", "tilbehør"],
    prepTime: "PT20M",
    cookTime: "PT30M",
    servings: 4,
    difficulty: "easy",
    wineInRecipe: {
      style: "Tør, frisk hvidvin — Assyrtiko, Savatiano eller sauvignon blanc",
      amount: "200 ml hvidvin",
      note: "Artiskokker simrer i hvidvin og citron — vinen er lagen.",
    },
    wineToDrink: {
      guideSlug: "vin-til-graesk-mad",
      searchQuery: "assyrtiko artiskok meze",
      searchMax: 150,
      label: "vin til græsk meze",
    },
    relatedGuides: [
      "vin-til-graesk-mad",
      "vin-til-tapas",
      "vin-til-vegetar-og-gront",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "8 små friske artiskokker eller 400 g frosne artiskokhjerter",
      "200 ml tør hvidvin",
      "Saft af 2 citroner",
      "100 ml olivenolie",
      "2 fed hvidløg, skivet",
      "1 bundt frisk dild, hakket",
      "1 tsk salt",
      "Peber",
      "Evt. 1 spsk mel til at binde saucen let",
    ],
    instructions: [
      "Friske artiskokker: fjern hårde blade, snit toppen, fjern «skæg», gnid med citron. Frosne: tøes ikke nødvendigvis helt.",
      "Læg artiskokker i gryde med vin, halvdelen af citronsaften, olie, hvidløg, salt og peber. Væsken skal næsten dække — supplér med vand.",
      "Simr med låg 20–30 minutter, til møre. Tag låg af, kog ind lidt. Rør dild og rest citron i.",
      "Server lunkne med brød til at suge saucen.",
    ],
    intro: `**Hvidvins- og citrondampede artiskokker** er klassisk græsk meze: syrligt, urtet og olivenolie-rigt. Artiskokkerne simrer i hvidvin og citron, til de er møre, og dild afslutter. Let forret eller del af meze-bord — ikke tung gryde.`,
    why: `Citron og hvidvin holder **farve og friskhed**; olien giver mundfølelse. Assyrtiko matcher syren. Læs [vin til græsk mad](/guides/vin-til-graesk-mad).`,
    tips: [
      ["Oxidation", "Citron på snitflader med det samme."],
      ["Frosne hjerter", "Nem hverdagsgenvej — stadig autentisk smag."],
      ["Dild", "Frisk er afgørende."],
      ["Avgolemono", "For luksus: pisk æggeblomme + citron i lidt af saucen af varmen."],
    ],
    serving: `Meze med oliven, feta og [taralli](/opskrifter/taralli-med-hvidvin). Eller som tilbehør til fisk.`,
    mistakes: [
      "At glemme citron — brune artiskokker.",
      "For hård kogning — mos.",
      "For lidt olie — flad meze.",
      "Tør dild — mangler aroma.",
    ],
    storage: `Køleskab 2–3 dage. Server lunkne eller kolde. Frys ikke.`,
    glass: `Assyrtiko eller crisp hvid — se [vin til græsk mad](/guides/vin-til-graesk-mad).`,
    faq: [
      ["Dåseartiskokker?", "Skyl godt; kortere simren — de er allerede møre."],
      ["Uden dild?", "Persille + lidt mynte."],
      ["Vegan?", "Ja — spring ægge-varianter over."],
    ],
  }),

  r({
    slug: "guinness-olbrod",
    title: "Guinness-ølbrød (Brown Bread)",
    description:
      "Saftigt brown bread hvor mørk stout giver malt, farve og dybde. Opskrift til 1 form — hurtigt brød uden lang hævning.",
    tags: ["opskrift", "brød", "øl", "irsk", "bagværk", "vegetar"],
    prepTime: "PT15M",
    cookTime: "PT50M",
    servings: 10,
    difficulty: "easy",
    wineInRecipe: {
      style: "Mørk stout — Guinness eller lignende (øl i dejen)",
      amount: "330–440 ml stout",
      note: "Stout erstatter væske i dejen — malt og bitterhed giver dybde.",
    },
    wineToDrink: {
      guideSlug: "vin-til-brittisk-mad",
      searchQuery: "stout cheddar ølbrød",
      searchMax: 120,
      label: "øl eller rødvin til brød og ost",
    },
    relatedGuides: [
      "vin-til-brittisk-mad",
      "vin-til-ost-og-ostebord",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "250 g hvedemel",
      "200 g fuldkornshvedemel eller graham",
      "50 g havregryn",
      "2 tsk bagepulver",
      "1 tsk natron",
      "1 tsk salt",
      "2 spsk brun farin eller sirup",
      "400 ml Guinness eller anden stout (stuetemperatur)",
      "2 spsk smør, smeltet (eller olie)",
      "Evt. 100 g frø til topping",
    ],
    instructions: [
      "Forvarm ovn til 180 °C. Smør en brødform (ca. 1,5 L).",
      "Bland tørre ingredienser. Rør stout, smør og farin i — dejen skal være klæbrig, ikke stiv. Arbejd ikke for meget.",
      "Hæld i formen. Drys evt. frø. Bag 45–55 minutter, til en pind kommer ud næsten ren.",
      "Køl 10 minutter i formen, vend ud. Køl på rist. Skær når lunkent.",
    ],
    intro: `**Guinness-ølbrød** er «Drunken Master»-bagning i praksis: mørk stout i dejen giver malt, farve og saftighed uden lang gærhævning. Perfekt til ostebord og supper — og et sjovt brud med klassisk vin-i-sauce.`,
    why: `Øllets **kulsyre og malt** hæver og smager dejen. Natron reagerer med øllets syre. Læs [vin til britisk mad](/guides/vin-til-brittisk-mad) — eller drik stout til.`,
    tips: [
      ["Stuetemperatur", "Kold øl hæmmer hævningen."],
      ["Dej", "Klæbrig er korrekt — tilsæt ikke for meget mel."],
      ["Sirup", "Lidt farin forstærker maltnoten."],
      ["Dagen efter", "Rist skiver — endnu bedre."],
    ],
    serving: `Med smør, cheddar, [sherry-karamelliserede valnødder](/opskrifter/sherry-karamelliserede-valnodder) eller supper.`,
    mistakes: [
      "At ælte som gærbrød — sejt resultat.",
      "For meget mel — tørt brød.",
      "At skære for tidligt — klæbrig midte.",
      "Sød ale i stedet for stout — mindre dybde.",
    ],
    storage: `Rumtemperatur 2–3 dage i pose. Frys skiver 2 måneder.`,
    glass: `Samme stout, eller frugtig rød til ost — se [vin til ost](/guides/vin-til-ost-og-ostebord).`,
    faq: [
      ["Uden Guinness?", "Anden stout/porter. Alkoholfri stout virker også."],
      ["Gær i stedet?", "Anden opskrift — denne er soda bread-agtig."],
      ["Fuldkorn kun?", "Bliver tungere; bland med hvedemel."],
    ],
  }),

  r({
    slug: "taralli-med-hvidvin",
    title: "Taralli med hvidvin og fennikel",
    description:
      "Italienske sprøde snack-kranse bagt med hvidvin og fennikelfrø i dejen. Opskrift til ca. 40 stk — aperitivo.",
    tags: ["opskrift", "italiensk", "snack", "brød", "hvidvin", "fennikel", "tapas", "vegetar"],
    prepTime: "PT40M",
    cookTime: "PT30M",
    servings: 10,
    difficulty: "medium",
    wineInRecipe: {
      style: "Tør italiensk hvid — verdicchio, trebbiano eller pinot grigio",
      amount: "100 ml hvidvin i dejen",
      note: "Hvidvin gør dejen sprød og aromatisk sammen med olivenolie og fennikel.",
    },
    wineToDrink: {
      guideSlug: "vin-til-italiensk-mad",
      searchQuery: "prosecco verdicchio aperitivo",
      searchMax: 150,
      label: "vin til aperitivo",
    },
    relatedGuides: [
      "vin-til-italiensk-mad",
      "vin-til-tapas",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "400 g tipo 00 eller hvedemel",
      "100 ml tør hvidvin",
      "100 ml olivenolie",
      "1 tsk salt",
      "2 tsk fennikelfrø",
      "Evt. 1 tsk sort peber",
      "Vand til kogning",
    ],
    instructions: [
      "Bland mel, salt, fennikel og peber. Tilsæt vin og olie. Ælt 8–10 minutter til glat dej. Hvile 30 minutter tildækket.",
      "Del dejen. Rul tynde pølser (ca. 1 cm), form ringe (taralli) og pres enderne sammen.",
      "Bring vand i kog. Kog taralli i hold 1–2 minutter, til de flyder op. Tag op på viskestykke.",
      "Bag ved 190 °C i 20–25 minutter, til gyldne og sprøde. Køl helt.",
    ],
    intro: `**Taralli med hvidvin** er Apuliens sprøde snack-kranse: hvidvin og olivenolie i dejen, fennikelfrø som aroma, kort kogning og derefter bagning. Holder sig uger — perfekt aperitivo med oliven og ost.`,
    why: `Hvidvin giver **sprødhed og let syre** i dejen, som vand ikke kan. Fennikel er klassisk syditaliensk. Læs [vin til italiensk mad](/guides/vin-til-italiensk-mad).`,
    tips: [
      ["Kogning", "Som bagel — de skal flyde, før de bages."],
      ["Størrelse", "Små ringe = mere crunch."],
      ["Olie", "God olivenolie smager igennem."],
      ["Variation", "Rosmarin eller chili i stedet for fennikel."],
    ],
    serving: `Aperitivo med prosecco, oliven, [hvidløgsconfit](/opskrifter/hvidvins-hvidloegsconfit) og ost.`,
    mistakes: [
      "At springe kogning over — mindre karakteristisk tekstur.",
      "For tyk dejring — blød midte.",
      "For lav ovn — blege og bløde.",
      "At opbevare varme i lukket dåse — dug og blødhed.",
    ],
    storage: `Lufttæt dåse 2–3 uger. Frys rå formede taralli og bag fra frossen (+ par min).`,
    glass: `Prosecco, verdicchio eller vermouth — se [vin til italiensk mad](/guides/vin-til-italiensk-mad).`,
    faq: [
      ["Uden fennikel?", "Ja — sort peber eller sesam."],
      ["Kan jeg kun bage?", "Ja, men kogning er tradition og giver den rigtige skorpe."],
      ["Glutenfri?", "Svært — strukturen kræver hvedegluten."],
    ],
  }),

  r({
    slug: "focaccia-med-hvidvin",
    title: "Focaccia vædet med hvidvin og olivenolie",
    description:
      "Italiensk focaccia hvor dejen og overfladen får hvidvin og olivenolie før bagning. Opskrift til 1 bradepande.",
    tags: ["opskrift", "italiensk", "brød", "focaccia", "hvidvin", "vegetar", "bagværk"],
    prepTime: "PT30M",
    cookTime: "PT25M",
    servings: 8,
    difficulty: "medium",
    wineInRecipe: {
      style: "Tør hvidvin — pinot grigio, verdicchio eller trebbiano",
      amount: "80 ml i dejen + 40 ml til overfladen",
      note: "Hvidvin i dej og som vædning med olie før bagning — aroma og saftighed.",
    },
    wineToDrink: {
      guideSlug: "vin-til-italiensk-mad",
      searchQuery: "pinot grigio focaccia italiensk",
      searchMax: 150,
      label: "hvidvin til focaccia",
    },
    relatedGuides: [
      "vin-til-italiensk-mad",
      "vin-til-tapas",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "500 g hvedemel",
      "7 g tørgær (eller 20 g frisk)",
      "300 ml lunkent vand",
      "80 ml tør hvidvin",
      "2 tsk salt",
      "4 spsk olivenolie + mere til formen",
      "40 ml hvidvin + 3 spsk olivenolie til overfladen",
      "Flagesalt og frisk rosmarin",
    ],
    instructions: [
      "Opløs gær i vand. Bland mel, salt, 80 ml vin og 2 spsk olie. Ælt 10 minutter. Hæv 1–1,5 time til dobbelt størrelse.",
      "Hæld olie i bradepande. Læg dejen i, stræk forsigtigt. Prik dybe huller med fingrene. Hæv 30–45 minutter.",
      "Bland 40 ml vin + 3 spsk olie. Pensl/væd overfladen. Drys rosmarin og flagesalt.",
      "Bag ved 220 °C i 20–25 minutter, til gylden. Køl kort. Skær i firkanter.",
    ],
    intro: `**Focaccia med hvidvin** er den vinvædede søster til klassisk focaccia: vin i dejen og en sidste pensling af hvidvin+olie, før den går i ovnen. Åben krumme, sprød top, let vinøs duft — til supper, tapas og dunkning i olie.`,
    why: `Hvidvin tilfører **aroma og syre**; olien giver saftighed. Sammen giver de en focaccia med mere karakter end kun vand. Læs [vin til italiensk mad](/guides/vin-til-italiensk-mad).`,
    tips: [
      ["Hullerne", "Tryk helt ned — klassiske focaccia-dimples."],
      ["Vædning", "Generøs olie+vin på toppen = sprød/saftig skorpe."],
      ["Gær", "Lunken væske — ikke hot, ellers dræbes gæren."],
      ["Topping", "Oliven eller cherrytomater de sidste 10 min."],
    ],
    serving: `Til [hvidløgsconfit](/opskrifter/hvidvins-hvidloegsconfit), supper, salater eller som sandwichbrød.`,
    mistakes: [
      "For lidt olie i panden — klæber.",
      "At undlade anden hævning — tæt brød.",
      "For lav ovn — bleg og tør.",
      "At væde med kun vin uden olie — kan give hård skorpe.",
    ],
    storage: `Rumtemperatur 1–2 dage. Rist dagen efter. Frys 1 måned.`,
    glass: `Samme hvidvin eller prosecco — se [vin til italiensk mad](/guides/vin-til-italiensk-mad).`,
    faq: [
      ["Uden vin?", "Klassisk focaccia med vand — stadig god, mindre Vinbot."],
      ["Fuldkorn?", "Op til 30 % — mere gør den tung."],
      ["Lang hævning?", "Ja — køl overnight efter første hævning for mere smag."],
    ],
  }),
];
