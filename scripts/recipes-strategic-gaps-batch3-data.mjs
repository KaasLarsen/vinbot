/** Strategic gaps batch 3: green kitchen + Mexican (5). */
import { r } from "./add-recipes-tilbehor30-lib.mjs";

export const UPDATED = "2026-09-23";

export const SLUG_EXPANSIONS = {
  "braiseret-spidskaal-i-hvidvin":
    "Halveret spidskål brunet hårdt, derefter braiseret i hvidvin, smør og parmesan. Umami og sødme uden kød. Server som hovedret med brød eller tilbehør til fisk/kylling.",
  "svampe-rodvinspostej":
    "Vegetarisk postej af svampe, nødder og rødvin — julefrokostens grønne indslag. Bag i form, server kold i skiver med syltede løg og sennep. Vin erstatter kødets dybde.",
  "belugalinser-i-rodvin":
    "Belugalinser simret i rødvin med røget paprika, skalotteløg og urter. Mættende vegetarisk hovedret. Linserne skal holde form — ikke koge til mos.",
  "carnitas-med-hvidvin":
    "Mexicansk taco-fyld: svinekød langtidsstegt i egen saft, appelsin og tør hvidvin, til det kan trækkes. Finish under grill for sprøde kanter. Soft tacos med løg og koriander.",
  "chili-verde-med-hvidvin":
    "Langtidsstegt svinekød i grøn sauce af tomatillos, jalapeños og hvidvin. Syre og chili uden tung tomat-rød chili. Server med ris eller tortilla.",
};

export const GUIDE_RECIPE_ADDITIONS = {
  "vin-til-vegetar-og-gront": [
    { slug: "braiseret-spidskaal-i-hvidvin", label: "Braiseret spidskål i hvidvin" },
    { slug: "svampe-rodvinspostej", label: "Svampe-rødvinspostej" },
    { slug: "belugalinser-i-rodvin", label: "Belugalinser i rødvin" },
  ],
  "vin-til-julefrokost": [
    { slug: "svampe-rodvinspostej", label: "Svampe-rødvinspostej" },
  ],
  "vin-til-mexicansk-mad": [
    { slug: "carnitas-med-hvidvin", label: "Carnitas med hvidvin" },
    { slug: "chili-verde-med-hvidvin", label: "Chili Verde med hvidvin" },
  ],
  "vin-til-tacos": [
    { slug: "carnitas-med-hvidvin", label: "Carnitas med hvidvin" },
  ],
  "vin-til-svinekoed": [
    { slug: "carnitas-med-hvidvin", label: "Carnitas med hvidvin" },
    { slug: "chili-verde-med-hvidvin", label: "Chili Verde med hvidvin" },
  ],
  "vin-til-svampe": [
    { slug: "svampe-rodvinspostej", label: "Svampe-rødvinspostej" },
  ],
  "sadan-bruger-du-vin-til-sauce-og-simren": [
    { slug: "braiseret-spidskaal-i-hvidvin", label: "Braiseret spidskål" },
    { slug: "belugalinser-i-rodvin", label: "Belugalinser i rødvin" },
    { slug: "chili-verde-med-hvidvin", label: "Chili Verde" },
  ],
};

export const RECIPES = [
  r({
    slug: "braiseret-spidskaal-i-hvidvin",
    title: "Braiseret spidskål i hvidvin, smør og parmesan",
    description:
      "Spidskål brunet og braiseret i hvidvin med smør og parmesan — vegetarisk umami. Opskrift til 4 som hovedret eller tilbehør.",
    tags: ["opskrift", "vegetar", "spidskål", "hvidvin", "grønt", "hovedret", "tilbehør"],
    prepTime: "PT15M",
    cookTime: "PT35M",
    servings: 4,
    difficulty: "easy",
    wineInRecipe: {
      style: "Tør, frugtig hvidvin — chardonnay uden tung eg, pinot blanc eller chenin",
      amount: "200 ml hvidvin",
      note: "Spidskål braiseres i hvidvin — vinen giver syre og dybde mod smør og parmesan.",
    },
    wineToDrink: {
      guideSlug: "vin-til-vegetar-og-gront",
      searchQuery: "chardonnay vegetar kål parmesan",
      searchMax: 150,
      label: "vin til vegetarisk kål",
    },
    relatedGuides: [
      "vin-til-vegetar-og-gront",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "2 spidskål, halveret eller i kvarte (rod beholdes)",
      "200 ml tør hvidvin",
      "50 g smør",
      "2 spsk olivenolie",
      "2 fed hvidløg, knust",
      "100 ml grøntsagsfond eller vand",
      "60 g parmesan, revet",
      "Salt og peber",
      "Frisk timian eller persille",
    ],
    instructions: [
      "Varm olie og halvdelen af smørret i en bred pande. Brun kålen snitflade ned 5–7 minutter, til mørk gylden.",
      "Tilsæt hvidløg 30 sekunder. Hæld vin og fond i. Sænk varmen, læg låg på. Simr 15–20 minutter, til kålen er mør men stadig har bid.",
      "Tag låg af, kog ind. Rør rest smør og halvdelen af parmesanen i. Smag til.",
      "Server med mere parmesan og urter.",
    ],
    intro: `**Braiseret spidskål i hvidvin** er den tunge, grønne dreng: hård bruning, derefter hvidvin, smør og parmesan. Vinens syre og umami erstatter kødkraft. Tæt på [madeira-glaseret rosenkål](/opskrifter/madeira-glaseret-rosenkaal), men med spidskål som hovedrolle.`,
    why: `Bruning giver **sødme**; hvidvin skærer fedtet fra smør/parmesan. Læs [vin til vegetar](/guides/vin-til-vegetar-og-gront).`,
    tips: [
      ["Rod", "Behold kerne/rod — holder kvarterne sammen."],
      ["Bruning", "Tålmodighed — farve = smag."],
      ["Parmesan", "Rigtig Parmigiano. Pecorino virker også."],
      ["Vegan", "Plantesmør + næringsgær i stedet for parmesan."],
    ],
    serving: `Som hovedret med [focaccia](/opskrifter/focaccia-med-hvidvin) eller tilbehør til fisk/kylling.`,
    mistakes: [
      "At dampe uden bruning — kedelig kål.",
      "For meget væske uden indkogning — suppe.",
      "At koge til mos — mistet struktur.",
      "Meget egetræet chardonnay — tung.",
    ],
    storage: `Køleskab 2 dage. Genvarm i pande med skvæt vin.`,
    glass: `Pinot blanc eller let chardonnay — se [vin til vegetar](/guides/vin-til-vegetar-og-gront).`,
    faq: [
      ["Hvidkål?", "Ja — længere tid. Spidskål er sødere og hurtigere."],
      ["Uden ost?", "Mere smør + citron + toastede nødder."],
      ["Airfryer?", "Brun først, braiser færdig i gryde — bedst smag."],
    ],
  }),

  r({
    slug: "svampe-rodvinspostej",
    title: "Svampe- og rødvinspostej",
    description:
      "Vegetarisk postej af svampe, nødder og rødvin — perfekt til julefrokost. Opskrift til 8–10 skiver.",
    tags: ["opskrift", "vegetar", "postej", "svampe", "rødvin", "jul", "tapas"],
    prepTime: "PT30M",
    cookTime: "PT55M",
    servings: 10,
    difficulty: "medium",
    wineInRecipe: {
      style: "Frugtig rødvin — pinot noir, merlot eller Côtes du Rhône",
      amount: "150 ml rødvin",
      note: "Rødvin reduceres med svampe — den erstatter kødets dybde i postejen.",
    },
    wineToDrink: {
      guideSlug: "vin-til-julefrokost",
      searchQuery: "pinot noir vegetar julefrokost",
      searchMax: 150,
      label: "vin til julefrokost",
    },
    relatedGuides: [
      "vin-til-julefrokost",
      "vin-til-svampe",
      "vin-til-vegetar-og-gront",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "500 g blandede svampe, finthakkede",
      "150 ml rødvin",
      "1 løg, finthakket",
      "2 fed hvidløg",
      "100 g valnødder eller pecannødder, hakkede",
      "80 g brødkrummer eller havregryn",
      "2 æg",
      "2 spsk olivenolie + 1 spsk smør",
      "1 spsk sojasauce eller miso",
      "1 tsk timian",
      "1/2 tsk røget paprika",
      "Salt og peber",
      "Smør til formen",
    ],
    instructions: [
      "Sauter løg i olie/smør 5 minutter. Tilsæt svampe — steg til væsken er væk og de er brunede (10–12 min). Tilsæt hvidløg.",
      "Hæld rødvin og soja i. Kog ind til næsten tørt. Køl 10 minutter.",
      "Rør nødder, brødkrummer, æg, timian, paprika, salt og peber i. Smag til.",
      "Pres i smurt form (ca. 1 L). Bag ved 180 °C i 40–45 minutter. Køl helt — gerne natten over — før udskæring.",
    ],
    intro: `**Svampe- og rødvinspostej** er julefrokostens vegetariske svar på leverpostej: svampe, nødder og rødvin bagt til skærbar postej. Vinens dybde erstatter kødets umami. Server med [rødvinssyltede rødløg](/opskrifter/rodvinssyltede-roedloeg) og sennep.`,
    why: `Rødvin + soja/miso + bruning = **kødagtig dybde** uden kød. Nødder giver fedme og tekstur. Læs [vin til julefrokost](/guides/vin-til-julefrokost).`,
    tips: [
      ["Tør stegning", "Svampene skal ikke være vandede i farsen."],
      ["Hvile", "Kold postej skærer renere."],
      ["Nødder", "Rist dem let for mere smag."],
      ["Form", "Alufolie-form eller brødform fungerer."],
    ],
    serving: `På rugbrød med agurkesalat, [øl-rødvinssennep](/opskrifter/oel-rodvinssennep) og syltede rødløg.`,
    mistakes: [
      "For våd fars — falder sammen.",
      "At skære lun — smuldrer.",
      "For lidt salt — flad «grød».",
      "Kun rå svampe uden bruning — mangler dybde.",
    ],
    storage: `Køleskab 5 dage. Frys skiver 2 måneder.`,
    glass: `Pinot noir eller let rød — se [vin til julefrokost](/guides/vin-til-julefrokost).`,
    faq: [
      ["Vegan?", "Erstat æg med 2 spsk kikærtemel + 3 spsk vand; brug olie."],
      ["Uden nødder?", "Flere brødkrummer + 2 spsk tahin — anden tekstur."],
      ["Til buffet?", "Ja — skær tyndt, pynt med urter."],
    ],
  }),

  r({
    slug: "belugalinser-i-rodvin",
    title: "Belugalinser simret i rødvin og røget paprika",
    description:
      "Belugalinser i rødvin med røget paprika og skalotteløg — mættende vegetarisk gryde. Opskrift til 4.",
    tags: ["opskrift", "vegetar", "linser", "rødvin", "gryderet", "hovedret"],
    prepTime: "PT15M",
    cookTime: "PT40M",
    servings: 4,
    difficulty: "easy",
    wineInRecipe: {
      style: "Frugtig rødvin — grenache, tempranillo eller Côtes du Rhône",
      amount: "250 ml rødvin",
      note: "Linser simrer i rødvin og fond — vinen giver dybde og syre.",
    },
    wineToDrink: {
      guideSlug: "vin-til-vegetar-og-gront",
      searchQuery: "tempranillo linser vegetar",
      searchMax: 150,
      label: "vin til linsegryde",
    },
    relatedGuides: [
      "vin-til-vegetar-og-gront",
      "vin-til-gryderet",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "300 g belugalinser (sorte linser), skyllede",
      "250 ml rødvin",
      "500 ml grøntsagsfond",
      "2 skalotteløg, hakkede",
      "2 gulerødder i små tern",
      "3 fed hvidløg",
      "1 spsk tomatpuré",
      "1–2 tsk røget paprika",
      "2 spsk olivenolie",
      "1 laurbærblad",
      "1 spsk sherryeddike eller rødvinseddike",
      "Salt og peber",
      "Persille til servering",
    ],
    instructions: [
      "Sauter skalotteløg og gulerod i olie 5–7 minutter. Tilsæt hvidløg, tomatpuré og paprika — rist 1 minut.",
      "Tilsæt linser. Hæld vin i. Kog 2 minutter. Tilsæt fond og laurbær.",
      "Simr uden låg 25–35 minutter, til linserne er møre men stadig har bid. Tilføj vand hvis for tørt.",
      "Smag til med eddike, salt og peber. Drys persille over.",
    ],
    intro: `**Belugalinser i rødvin** er den vegetariske «kødgryde»: små sorte linser simret med røget paprika og rødvin, til de er mættende og dybe. Holder formen bedre end røde linser — ideel som hovedret.`,
    why: `Rødvin + røget paprika = **kraft uden kød**. Beluga bliver cremet udenpå og fast indeni. Læs [vin til vegetar](/guides/vin-til-vegetar-og-gront).`,
    tips: [
      ["Ikke udblød", "Beluga kræver typisk ikke blødning."],
      ["Bid", "Stop før mos — al dente-agtigt."],
      ["Paprika", "Røget er pointen. Sød paprika er bleg erstatning."],
      ["Topping", "Græsk yoghurt eller ristede nødder."],
    ],
    serving: `Med brød, [braiseret spidskål](/opskrifter/braiseret-spidskaal-i-hvidvin) eller stegte æg.`,
    mistakes: [
      "Røde linser i stedet — bliver grød.",
      "For lidt syre til sidst — flad smag.",
      "At salte hårdt for tidligt — kan gøre linser seje.",
      "Meget tannin-tung vin — bitter.",
    ],
    storage: `Køleskab 4 dage. Frys 2 måneder. Genvarm med skvæt fond.`,
    glass: `Tempranillo eller grenache — se [vin til vegetar](/guides/vin-til-vegetar-og-gront).`,
    faq: [
      ["Puy-linser?", "Ja — samme metode."],
      ["Med chorizo?", "Vegetarisk her — men en teskefuld røget paprika efterligner røgen."],
      ["Meal prep?", "Ja — smager bedre dag 2."],
    ],
  }),

  r({
    slug: "carnitas-med-hvidvin",
    title: "Carnitas med hvidvin og appelsin",
    description:
      "Mexicansk taco-fyld: svinekød simret i egen saft, appelsin og tør hvidvin, til det kan trækkes. Opskrift til 6–8.",
    tags: ["opskrift", "mexicansk", "svinekød", "hvidvin", "taco", "hovedret"],
    prepTime: "PT20M",
    cookTime: "PT180M",
    servings: 8,
    difficulty: "medium",
    wineInRecipe: {
      style: "Tør hvidvin — verdicchio, pinot grigio eller tør riesling",
      amount: "200 ml hvidvin",
      note: "Svinekød braiseres med appelsin og hvidvin — vinen mørner og giver syre.",
    },
    wineToDrink: {
      guideSlug: "vin-til-mexicansk-mad",
      searchQuery: "tacos svinekød albariño cerveza",
      searchMax: 180,
      label: "vin til tacos",
    },
    relatedGuides: [
      "vin-til-mexicansk-mad",
      "vin-til-tacos",
      "vin-til-svinekoed",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "1,5 kg svineskulder i store tern",
      "200 ml tør hvidvin",
      "Saft af 2 appelsiner + 1 strimmel skal",
      "1 løg, kvarte",
      "6 fed hvidløg",
      "1 tsk spidskommen",
      "1 tsk oregano",
      "2 laurbærblade",
      "1 spsk salt",
      "2 spsk olie til finish",
      "Tortillas, løg, koriander, lime til servering",
    ],
    instructions: [
      "Læg svinekød, vin, appelsinsaft/skal, løg, hvidløg, krydderi og salt i en gryde. Væsken skal nå ca. 2/3 op — supplér med vand.",
      "Bring i kog. Simr med låg 2,5–3 timer, til kødet trækkes let. Tag op, træk i strimler. Gem lidt af saften.",
      "Forvarm ovn til 230 °C eller brug pande. Fordel kødet, dryp med lidt saft og olie. Rist/steg til sprøde kanter.",
      "Server i tortillas med løg, koriander og lime.",
    ],
    intro: `**Carnitas med hvidvin** er taco-fyld, der falder fra hinanden: svineskulder langtidsstegt med appelsin og tør hvidvin, derefter ristet sprød. Hvor [tacos med rødvin-okse](/opskrifter/tacos-med-rodvin-okse) er røde og kraftige, er carnitas gyldne, citrusfriske og sprøde.`,
    why: `Hvidvin og appelsin skærer **fedt svinekød**; lang tid mørner. Finish under høj varme = klassisk carnitas-crunch. Læs [vin til mexicansk mad](/guides/vin-til-mexicansk-mad).`,
    tips: [
      ["Fedt", "Skulder > mørbrad — fedtet er smagen."],
      ["Sprødhed", "Undlad at springe finish over."],
      ["Saft", "Gem braiseringsvæske til at væde tortillas.", ],
      ["Make-ahead", "Braisér dagen før; rist før servering."],
    ],
    serving: `Soft corn tortillas, salsa, [hvidvins-jalapeñorelish](/opskrifter/hvidvins-jalapenorelish), lime.`,
    mistakes: [
      "For magert kød — tørt.",
      "At trække for tidligt — sej.",
      "At servere uden sprød finish — kedelig tekstur.",
      "For søde appelsiner + sød vin — slik-taco.",
    ],
    storage: `Køleskab 3–4 dage. Frys 2 måneder. Rist ved genopvarmning.`,
    glass: `Albariño, crisp lager eller frugtig rød — se [vin til tacos](/guides/vin-til-tacos).`,
    faq: [
      ["Slow cooker?", "Ja — 6–8 t på low, derefter rist."],
      ["Uden vin?", "Mere appelsin + 1 spsk eddike — mangler dog dybde."],
      ["Til burrito?", "Ja — med ris og bønner."],
    ],
  }),

  r({
    slug: "chili-verde-med-hvidvin",
    title: "Chili Verde med hvidvin",
    description:
      "Langtidsstegt svinekød i grøn sauce af tomatillos, jalapeños og hvidvin. Opskrift til 6 — syrlig Tex-Mex-klassiker.",
    tags: ["opskrift", "mexicansk", "svinekød", "hvidvin", "chili", "hovedret"],
    prepTime: "PT25M",
    cookTime: "PT120M",
    servings: 6,
    difficulty: "medium",
    wineInRecipe: {
      style: "Tør, syrlig hvidvin — sauvignon blanc, verdicchio eller Vinho Verde",
      amount: "200 ml hvidvin",
      note: "Hvidvin i den grønne sauce — syre sammen med tomatillos og chili.",
    },
    wineToDrink: {
      guideSlug: "vin-til-mexicansk-mad",
      searchQuery: "sauvignon blanc mexicansk chili verde",
      searchMax: 180,
      label: "vin til chili verde",
    },
    relatedGuides: [
      "vin-til-mexicansk-mad",
      "vin-til-svinekoed",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "1,2 kg svineskulder i tern",
      "500 g tomatillos, hakkede (eller dåse)",
      "2–3 jalapeños, hakkede",
      "1 grøn peberfrugt",
      "1 løg",
      "4 fed hvidløg",
      "200 ml tør hvidvin",
      "300 ml kyllingefond eller vand",
      "1 tsk spidskommen",
      "1 håndfuld koriander",
      "2 spsk olie",
      "Salt og peber",
      "Lime til servering",
    ],
    instructions: [
      "Brun svinekød i olie i hold. Tag op. Sauter løg og peber 5 minutter. Tilsæt hvidløg og jalapeño.",
      "Tilsæt tomatillos, vin, fond, spidskommen, salt. Læg kød tilbage. Bring i kog.",
      "Simr med låg 1,5–2 timer, til kødet er mørt. Tag låg af og kog ind til ønsket tykkelse.",
      "Rør koriander i. Smag til med lime, salt og peber. Server.",
    ],
    intro: `**Chili Verde med hvidvin** er den grønne, syrlige kusine til rød chili: svinekød i tomatillo-jalapeño-sauce, løftet med tør hvidvin. Ingen mørk bønne-chili — her er det frisk syre og grøn chili. Tæt på [carnitas](/opskrifter/carnitas-med-hvidvin) i kødvalg, men med sauce som stjerne.`,
    why: `Tomatillos og hvidvin deler **syreprofil**; chili giver varme. Sammen skærer de fedt svinekød. Læs [vin til mexicansk mad](/guides/vin-til-mexicansk-mad).`,
    tips: [
      ["Tomatillos", "Friske: fjern bæger, skyl klæbrighed. Dåse: fin genvej."],
      ["Varme", "Fjern frø fra jalapeño for mildere."],
      ["Tykkelse", "Skal coat'e kødet — ikke som suppe."],
      ["Blend", "For glattere sauce: blend noget af grøntsagerne før kød går i."],
    ],
    serving: `Med ris, tortillas, creme fraiche, avocado og lime. Eller over nachos.`,
    mistakes: [
      "At erstatte tomatillos med røde tomater — anden ret.",
      "For kort braising — sej svinekød.",
      "For lidt syre — flad grøn sauce.",
      "At forveksle med chili con carne — helt anden profil.",
    ],
    storage: `Køleskab 3–4 dage. Frys 2 måneder. Smager bedre dag 2.`,
    glass: `Sauvignon blanc eller crisp lager — se [vin til mexicansk mad](/guides/vin-til-mexicansk-mad).`,
    faq: [
      ["Kylling i stedet?", "Ja — kortere tid (ca. 45 min)."],
      ["Uden alkohol?", "Ekstra lime + lidt fond — mangler dog dybde."],
      ["Til burrito bowl?", "Ja — med ris, bønner og salsa."],
    ],
  }),
];
