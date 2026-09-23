/** Data: Asia10 + snacks — batch 1 (5 nye huller). */
export const UPDATED = "2026-09-23";

export const SLUG_EXPANSIONS = {
  "kylling-i-hvidvinssauce-med-porrer-og-vindruer":
    "Brun kyllingen godt. Porrer skal være møre, men ikke grød. Vindruer vendes i saucen de sidste 2–3 minutter, så de bliver varme uden at sprænge helt.",
  "kylling-teriyaki-med-sake-og-mirin":
    "Ægte teriyaki er sake + mirin + soja kogt ind til glace — ikke flaskesauce alene. Mirin er sød japansk madlavningsvin; sake er tørrere risvin. Reduktionen skal coat'e kødet.",
  "gyoza-dampet-i-sake":
    "Steg gyoza sprøde i bunden, hæld sake i, sæt låg på og damp færdig. Væsken fordamper og giver aroma til dejen. Åbn forsigtigt — dampen er hot.",
  "sticky-pork-belly-med-shaoxing":
    "Shaoxing er kinesisk risvin til madlavning. Brun svinebryst, simr længe i shaoxing, soja, sukker og femkrydderi til sticky, fløjlsblødt kød.",
  "rosenkaal-med-hvidvin-og-oestersauce":
    "Rist rosenkål hårdt, så de får kulsmag. Hvidvin og østerssauce koges ind til en blank, umami-rig glaze. Undgå at koge dem bløde i væsken fra start.",
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
    slug: "kylling-i-hvidvinssauce-med-porrer-og-vindruer",
    title: "Kylling i hvidvinssauce med porrer og vindruer",
    description:
      "Cremet hverdagsret hvor kylling simrer i hvidvin med porrer, og søde vindruer vendes i saucen til sidst. Opskrift til 4.",
    tags: ["opskrift", "kylling", "hvidvin", "porre", "vindruer", "fløde", "hverdag", "hovedret"],
    prepTime: "PT20M",
    cookTime: "PT40M",
    difficulty: "easy",
    wineInRecipe: {
      style: "Tør hvidvin — Chardonnay, Pinot Grigio, Chablis eller Riesling tør",
      amount: "3 dl hvidvin + fløde",
      note: "Hvidvin braiserer kylling og porrer; syren balances af søde vindruer til sidst.",
    },
    wineToDrink: {
      guideSlug: "vin-til-kylling-og-lyst-koed",
      searchQuery: "kylling chardonnay riesling vindruer porrer",
      searchMax: 200,
      label: "vin til kylling",
    },
    relatedGuides: [
      "vin-til-kylling-og-lyst-koed",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "8 kyllingelår eller 4 kyllingebryst",
      "3 dl tør hvidvin",
      "2 porrer i skiver (lyse dele)",
      "200 g kernefrie vindruer, halverede",
      "2 dl piskefløde",
      "2 skalotteløg, finthakkede",
      "2 fed hvidløg",
      "2 spsk smør",
      "1 spsk olivenolie",
      "1 kvist timian",
      "Salt og peber",
      "Frisk persille",
    ],
    instructions: [
      "Salt og peber kyllingen. Brun i olie og smør på alle sider. Tag op.",
      "Steg skalotteløg og porrer 6–8 minutter. Tilsæt hvidløg — rist 30 sekunder.",
      "Hæld hvidvin i. Kog 2 minutter. Læg kylling og timian tilbage. Simr under låg 20–25 minutter (bryst kortere).",
      "Tag kylling op. Tilsæt fløde. Kog ind 3–4 minutter. Vend vindruer i 2–3 minutter.",
      "Læg kylling tilbage. Smag til. Drys persille over. Server.",
    ],
    intro: `**Kylling i hvidvinssauce med porrer og vindruer** er den cremede hverdagsret, hvor hvidvinens syre møder søde vindruer. Lettere end [poulet à l'estragon](/opskrifter/poulet-a-lestragon) og mere frugtig end [stuvet kylling med hvidvin](/opskrifter/stuvet-kylling-med-hvidvin) — porrer og vindruer gør den både rustik og elegant.`,
    why: `Porrer er milde og søde; kylling er magert. **Hvidvin** giver syre i saucen; **vindruer** balancerer med frisk sødme uden sukker. Se [vin til kylling](/guides/vin-til-kylling-og-lyst-koed).`,
    tips: [
      ["Vindruer til sidst", "Ellers bliver de mos."],
      ["Kernefrie", "Nemmere at spise."],
      ["Bruning", "God skorpe = dybere sauce."],
      ["Fløde", "Efter reduktion — ellers tynd sauce."],
    ],
    serving: `Server med ris, kartoffelmos eller [hvidvinsbraiserede porrer](/opskrifter/hvidvinsbraiserede-porrer) ekstra. Grøn salat ved siden af.`,
    mistakes: [
      "Vindruer for tidligt — grød i saucen.",
      "For sød hvidvin — klaimatisk.",
      "Overkogt bryst — tørt.",
      "At springe bruningen over — flad smag.",
    ],
    storage: `Køleskab 2–3 dage. Genvarm blidt. Frys uden vindruer op til 1 måned.`,
    glass: `Chardonnay, Riesling eller Pinot Grigio — se [vin til kylling](/guides/vin-til-kylling-og-lyst-koed).`,
    faq: [
      [
        "Røde eller grønne vindruer?",
        "Begge virker. Grønne er syrligere; røde er sødere.",
      ],
      [
        "Uden fløde?",
        "Kog saucen ind og pisk lidt smør i — lettere resultat.",
      ],
      [
        "Kan jeg bruge lår?",
        "Ja — mere tilgivende end bryst. Lidt længere tid.",
      ],
      [
        "Hvilken hvidvin?",
        "Tør og frisk. Undgå meget egede vine.",
      ],
    ],
  }),

  r({
    slug: "kylling-teriyaki-med-sake-og-mirin",
    title: "Kylling Teriyaki med sake og mirin",
    description:
      "Japansk klassiker hvor teriyaki-glace laves fra bunden af sake, mirin og soja. Opskrift til 4 — blank, sød-salt sauce.",
    tags: ["opskrift", "japansk", "kylling", "teriyaki", "sake", "mirin", "asiatisk", "hovedret"],
    prepTime: "PT15M",
    cookTime: "PT25M",
    difficulty: "easy",
    wineInRecipe: {
      style: "Japansk sake (risvin) + mirin (sød madlavningsvin)",
      amount: "1 dl sake + 1 dl mirin",
      note: "Sake og mirin koges ind med soja til den klassiske teriyaki-glace.",
    },
    wineToDrink: {
      guideSlug: "vin-til-japansk-mad",
      searchQuery: "teriyaki riesling pinot noir sake japansk",
      searchMax: 200,
      label: "vin til teriyaki",
    },
    relatedGuides: [
      "vin-til-japansk-mad",
      "vin-til-asiatisk-mad",
      "riesling-til-asiatisk-mad",
      "vin-til-kylling-og-lyst-koed",
    ],
    ingredients: [
      "800 g kyllingelår uden ben (eller bryst i skiver)",
      "1 dl sake",
      "1 dl mirin",
      "80 ml japansk sojasauce",
      "1 spsk sukker (valgfrit, hvis mirin er mild)",
      "1 spsk olie",
      "1 tsk frisk ingefær, reven",
      "1 fed hvidløg, finthakket",
      "Sesamfrø og forårsløg til pynt",
      "Ris til servering",
    ],
    instructions: [
      "Bland sake, mirin, soja og evt. sukker.",
      "Steg kylling i olie på medium-høj varme 4–5 minutter pr. side, til gylden. Tag op midlertidigt hvis panden er fuld.",
      "Tilsæt ingefær og hvidløg — rist 20 sekunder. Hæld sauce over kyllingen.",
      "Kog ind under omrøring 5–8 minutter, til saucen er tyk og blank og coat'er kødet. Vend undervejs.",
      "Drys sesam og forårsløg over. Server med ris.",
    ],
    intro: `**Kylling Teriyaki med sake og mirin** er den ægte japanske klassiker — ikke kun flaskesauce. Sake og mirin koges ind med soja til en sticky glace. Et naturligt søskende til [gyoza dampet i sake](/opskrifter/gyoza-dampet-i-sake) og [Tom Kha Gai](/opskrifter/tom-kha-gai-med-hvidvin) på en asiatisk aften.`,
    why: `**Sake** giver tørhed og umami; **mirin** giver sødme og glans. Sammen med soja bliver det teriyaki. Reduktionen er afgørende. Se [vin til japansk mad](/guides/vin-til-japansk-mad) og [Riesling til asiatisk mad](/guides/riesling-til-asiatisk-mad).`,
    tips: [
      ["Ægte mirin", "Ikke kun «mirin-smag»-sirup hvis muligt."],
      ["Ikke for høj varme", "Sukker/mirin brænder nemt."],
      ["Lår", "Saftigere end bryst til teriyaki."],
      ["Glace", "Skal hungere på skeen — ikke være tynd soja."],
    ],
    serving: `Ris, agurkesalat og sesam. Til vin: Riesling eller let pinot noir.`,
    mistakes: [
      "Kun flaske-teriyaki uden reduktion — flad smag.",
      "At brænde saucen — bitter.",
      "For magert bryst overkogt — tørt.",
      "At springe sake over — mangler dybde.",
    ],
    storage: `Køleskab 2–3 dage. Genvarm blidt med skvæt vand. Frys 1 måned.`,
    glass: `Tør/halvtør Riesling, Grüner Veltliner eller sake — se [vin til japansk mad](/guides/vin-til-japansk-mad).`,
    faq: [
      [
        "Hvad er forskellen på sake og mirin?",
        "Sake er (ofte) tørrere risvin til drikke/mad; mirin er sødere madlavningsvin med lavere alkohol.",
      ],
      [
        "Kan jeg bruge kinesisk risvin?",
        "Til nød — men smagen bliver anderledes. Shaoxing er mere til kinesisk sticky pork.",
      ],
      [
        "Uden alkohol?",
        "Æblejuice + lidt sukker + soja er en nødløsning — ikke ægte teriyaki.",
      ],
      [
        "Til laks?",
        "Ja — kortere stegetid. Pensl glace til sidst.",
      ],
    ],
  }),

  r({
    slug: "gyoza-dampet-i-sake",
    title: "Gyoza dampet i sake — japanske dumplings",
    description:
      "Sprødstegte gyoza der dampes færdige under låg med sake for den rigtige aroma. Opskrift til 4 som forret eller snack.",
    tags: ["opskrift", "japansk", "gyoza", "sake", "dumplings", "asiatisk", "forret", "snack"],
    prepTime: "PT40M",
    cookTime: "PT15M",
    servings: 4,
    difficulty: "medium",
    wineInRecipe: {
      style: "Japansk sake (tør eller junmai) — evt. tør Riesling som nødløsning til damp",
      amount: "80–100 ml sake til dampning",
      note: "Sake hældes i panden efter stegning; under låg damper gyoza færdige og får risvinsaroma.",
    },
    wineToDrink: {
      guideSlug: "vin-til-dim-sum",
      searchQuery: "gyoza sake riesling dim sum",
      searchMax: 200,
      label: "vin til gyoza",
    },
    relatedGuides: [
      "vin-til-dim-sum",
      "vin-til-japansk-mad",
      "riesling-til-asiatisk-mad",
      "vin-til-asiatisk-mad",
    ],
    ingredients: [
      "30–35 gyoza-skind (færdige)",
      "300 g hakket svinekød",
      "100 g hvidkål, finthakket og saltet/presset",
      "2 forårsløg, finthakkede",
      "1 spsk reven ingefær",
      "1 fed hvidløg",
      "1 spsk soja",
      "1 tsk sesamolie",
      "80–100 ml sake",
      "1–2 spsk olie til stegning",
      "Dip: soja, riskeddike, chiliolie",
    ],
    instructions: [
      "Bland fyld: svinekød, presset kål, forårsløg, ingefær, hvidløg, soja og sesamolie.",
      "Læg 1 tsk fyld i hvert skind. Luk med folder (eller tryk kanter sammen med vand).",
      "Varm olie i en bred pande. Sæt gyoza tæt med flad side ned. Steg 2–3 minutter til bunden er gylden.",
      "Hæld sake i panden (pas på sprøjt). Sæt låg på med det samme. Damp 4–6 minutter, til væsken er væk og dejen er mør.",
      "Tag låg af. Lad evt. bunden sprøde 30 sekunder mere. Server med dip.",
    ],
    intro: `**Gyoza dampet i sake** er den klassiske pandeteknik: sprød bund, dampet top — med sake i stedet for vand. Mere autentisk end vores [gyoza med Riesling i fyldet](/opskrifter/gyoza-svinekoed-med-riesling), hvor vinen sidder i farcen; her er det dampen, der bærer aromaen. Se [vin til dim sum](/guides/vin-til-dim-sum).`,
    why: `Sake i dampen giver **risvinsaroma** til dejen uden at gøre fyldet vådt. Alkoholen fordamper; duften bliver. Vand virker teknisk — sake smager bedre. Se [vin til japansk mad](/guides/vin-til-japansk-mad).`,
    tips: [
      ["Tæt låg", "Ellers forsvinder dampen."],
      ["Ikke for meget sake", "80–100 ml rækker til én pande."],
      ["Presset kål", "Ellers bliver fyldet vandigt."],
      ["Frys rå", "Steg direkte fra frost — lidt længere damp."],
    ],
    serving: `Som forret eller snack med dip. Til større menu: [kylling teriyaki](/opskrifter/kylling-teriyaki-med-sake-og-mirin).`,
    mistakes: [
      "At hælde sake i før bunden er sprød — blød bund.",
      "For meget væske — kogte dumplings.",
      "Utæt låg — rå midte.",
      "Overfyldte skind — sprækker.",
    ],
    storage: `Rå gyoza fryses i ét lag. Stegte spises friske; rester 1 dag i køleskab.`,
    glass: `Sake, Riesling eller Grüner — se [vin til dim sum](/guides/vin-til-dim-sum) og [Riesling til asiatisk](/guides/riesling-til-asiatisk-mad).`,
    faq: [
      [
        "Kan jeg bruge vand?",
        "Ja — teknikken er den samme. Sake giver mere aroma.",
      ],
      [
        "Færdigkøbte gyoza?",
        "Ja — steg og damp med sake alligevel.",
      ],
      [
        "Forskel på den anden gyoza-opskrift?",
        "Den anden har Riesling i fyld/dip. Denne damper med sake under låg.",
      ],
      [
        "Vegetarisk fyld?",
        "Svampe, tofu og kål fungerer — samme dampeteknik.",
      ],
    ],
  }),

  r({
    slug: "sticky-pork-belly-med-shaoxing",
    title: "Sticky Chinese Pork Belly med Shaoxing-risvin",
    description:
      "Langtidsstegt svinebryst i Shaoxing-risvin, soja, sukker og femkrydderi til sticky, fløjlsblødt kød. Opskrift til 4.",
    tags: ["opskrift", "kinesisk", "svinebryst", "shaoxing", "risvin", "asiatisk", "hovedret"],
    prepTime: "PT20M",
    cookTime: "PT150M",
    servings: 4,
    difficulty: "medium",
    wineInRecipe: {
      style: "Shaoxing-risvin (kinesisk madlavningsvin) — evt. tør sherry som nødløsning",
      amount: "2 dl Shaoxing",
      note: "Shaoxing danner basen for den mørke, sticky sauce sammen med soja, sukker og femkrydderi.",
    },
    wineToDrink: {
      guideSlug: "vin-til-kinesisk-mad",
      searchQuery: "kinesisk svinekød riesling pinot noir shaoxing",
      searchMax: 200,
      label: "vin til kinesisk svinekød",
    },
    relatedGuides: [
      "vin-til-kinesisk-mad",
      "vin-til-asiatisk-mad",
      "vin-til-svinekoed",
      "riesling-til-asiatisk-mad",
    ],
    ingredients: [
      "1 kg svinebryst i store tern (ca. 4 cm)",
      "2 dl Shaoxing-risvin",
      "80 ml mørk soja",
      "40 ml lys soja",
      "3 spsk brunt sukker eller rock sugar",
      "4 skiver frisk ingefær",
      "3 forårsløg i store stykker",
      "2 stjerneanis",
      "1 kanelstang",
      "½ tsk femkrydderi",
      "1 spsk olie",
      "3–4 dl vand eller fond",
      "Ris og pak choi til servering",
    ],
    instructions: [
      "Brun svinebryst i olie på alle sider (5–7 min). Tag op.",
      "Tilsæt ingefær og forårsløg — rist 1 minut. Hæld Shaoxing i. Kog 2 minutter.",
      "Tilsæt soja, sukker, stjerneanis, kanel, femkrydderi og vand. Læg kødet tilbage — væsken skal næsten dække.",
      "Simr under låg 2–2½ time, til kødet er mørt. Rør af og til.",
      "Tag låg af. Kog ind til sticky, blank sauce (10–15 min). Smag til.",
      "Server med ris og grønt.",
    ],
    intro: `**Sticky Chinese Pork Belly med Shaoxing** er den fløjlsbløde, klæbrige klassiker, hvor kinesisk risvin bærer saucen. Anderledes end [svinebryst braiseret i rødvin](/opskrifter/svinebryst-braiseret-i-rodvin) — her er det Shaoxing, soja og femkrydderi. Perfekt ved siden af [teriyaki](/opskrifter/kylling-teriyaki-med-sake-og-mirin) på en asiatisk menu.`,
    why: `Shaoxing har **nøddeagtige, oxiderede noter**, der klæder fedt svinebryst. Sukker og soja giver sticky glaze; femkrydderi giver dybde. Se [vin til kinesisk mad](/guides/vin-til-kinesisk-mad).`,
    tips: [
      ["Lang tid", "Mørhed før sticky — ikke omvendt."],
      ["Rock sugar", "Giver blankere sauce end almindeligt sukker."],
      ["Fedtside", "Lad gerne lidt fedt sidde — det er smagen."],
      ["Dagen efter", "Smager ofte bedre."],
    ],
    serving: `Jasminris, pak choi eller broccoli. Drys forårsløg over.`,
    mistakes: [
      "For kort simring — sejt kød.",
      "At reducere før kødet er mørt — brændt sauce, sejt kød.",
      "Kun mørk soja uden lys — for salt/tung.",
      "At bruge drikke-sherry med saltet «cooking wine» uden at smage til.",
    ],
    storage: `Køleskab 3–4 dage. Frys 2 måneder. Genvarm blidt med skvæt vand.`,
    glass: `Riesling med restsødme, Pinot Noir eller Gewürztraminer — se [vin til kinesisk mad](/guides/vin-til-kinesisk-mad).`,
    faq: [
      [
        "Hvor køber jeg Shaoxing?",
        "Asiatiske købmandsforretninger. Vælg gerne en til madlavning uden for meget tilsat salt.",
      ],
      [
        "Nødløsning uden Shaoxing?",
        "Tør sherry + skvæt soja. Ikke identisk, men tættere end rødvin.",
      ],
      [
        "Kan jeg bruge ovnen?",
        "Ja — 150 °C tæt fad 2½–3 timer, reducér sauce på komfur til sidst.",
      ],
      [
        "For fed?",
        "Skær synligt fedt fra, eller køl ned og fjern størknet fedt fra toppen.",
      ],
    ],
  }),

  r({
    slug: "rosenkaal-med-hvidvin-og-oestersauce",
    title: "Hvidvins- og østerssauce-glaserede rosenkål",
    description:
      "Hårdt ristede rosenkål kogt ind med hvidvin og østerssauce til umami-rig glaze. Opskrift til 4 som tilbehør.",
    tags: ["opskrift", "tilbehør", "rosenkål", "hvidvin", "østerssauce", "asiatisk", "grønt"],
    prepTime: "PT10M",
    cookTime: "PT25M",
    servings: 4,
    difficulty: "easy",
    wineInRecipe: {
      style: "Tør hvidvin — Pinot Grigio, Riesling tør eller Sauvignon Blanc",
      amount: "1 dl hvidvin",
      note: "Hvidvin deglacerer panden efter ristning og koges ind med østerssauce til blank glaze.",
    },
    wineToDrink: {
      guideSlug: "vin-til-grillet-gront",
      searchQuery: "rosenkål riesling pinot noir østerssauce",
      searchMax: 180,
      label: "vin til rosenkål",
    },
    relatedGuides: [
      "vin-til-grillet-gront",
      "vin-til-vegetar-og-gront",
      "vin-til-asiatisk-mad",
      "riesling-til-asiatisk-mad",
    ],
    ingredients: [
      "600 g rosenkål, halverede",
      "1 dl tør hvidvin",
      "2 spsk østerssauce",
      "1 spsk soja",
      "1 spsk honning eller brun farin",
      "2 spsk olie",
      "1 fed hvidløg, finthakket",
      "1 tsk sesamolie (valgfrit)",
      "Sesamfrø og chili-flager til pynt",
    ],
    instructions: [
      "Varm olie i en bred pande eller bradepande. Rist rosenkål snitflade ned 6–8 minutter på høj varme, til de er mørkebrune. Vend og rist 3–4 minutter mere.",
      "Tilsæt hvidløg — rist 20 sekunder. Hæld hvidvin i. Kog 1–2 minutter.",
      "Rør østerssauce, soja og honning i. Kog ind under omrøring 3–5 minutter, til blank glaze.",
      "Dryp sesamolie over. Drys sesam og chili. Server straks.",
    ],
    intro: `**Hvidvins- og østerssauce-glaserede rosenkål** er tilbehøret, der får folk til at spise rosenkål: hård ristning, hvidvin og østerssauce til umami-glace. Mere asiatisk end [hvidvinsbraiserede porrer](/opskrifter/hvidvinsbraiserede-porrer) — perfekt til [sticky pork belly](/opskrifter/sticky-pork-belly-med-shaoxing) eller stegt kylling.`,
    why: `Rosenkål bliver nøddeagtige ved høj varme. **Hvidvin** løfter de brune smagsstoffer; **østerssauce** giver salt umami. Honning binder glasuren. Se [vin til grillet grønt](/guides/vin-til-grillet-gront).`,
    tips: [
      ["Høj varme", "Ellers bliver de kogte og kål-agtige."],
      ["Snitflade ned", "Maksimal karamelisering."],
      ["Ikke for meget væske", "Glaze, ikke suppe."],
      ["Friske rosenkål", "Ikke frosne — for våde."],
    ],
    serving: `Til kød, fisk eller som vegetarisk hovedret med ris. Serveres lune.`,
    mistakes: [
      "At dampe dem først — mister sprødhed.",
      "For meget østerssauce — for salt.",
      "Lav varme — kogt kålsmag.",
      "At bruge frosne uden at tørre — sprøjter og damp.",
    ],
    storage: `Bedst frisk. Rester 1–2 dage — genvarm i pande på høj varme.`,
    glass: `Riesling eller Pinot Noir — se [Riesling til asiatisk mad](/guides/riesling-til-asiatisk-mad).`,
    faq: [
      [
        "Vegetarisk uden østerssauce?",
        "Brug vegetarisk «østerssauce» af svampe eller ekstra soja + lidt miso.",
      ],
      [
        "Ovnen i stedet?",
        "Ja — 220 °C 20 min, vend, hæld glaze over, 5 min mere.",
      ],
      [
        "For bitter?",
        "Halvér og fjern yderste blade. Honning i glasuren hjælper.",
      ],
      [
        "Til juleand?",
        "Ja — umami-rosenkål er et moderne tilbehør.",
      ],
    ],
  }),
];

export const GUIDE_RECIPE_ADDITIONS = {
  "vin-til-kylling-og-lyst-koed": [
    { slug: "kylling-i-hvidvinssauce-med-porrer-og-vindruer", label: "Kylling med porrer og vindruer" },
    { slug: "kylling-teriyaki-med-sake-og-mirin", label: "Kylling Teriyaki" },
  ],
  "vin-til-japansk-mad": [
    { slug: "kylling-teriyaki-med-sake-og-mirin", label: "Kylling Teriyaki med sake og mirin" },
    { slug: "gyoza-dampet-i-sake", label: "Gyoza dampet i sake" },
  ],
  "vin-til-dim-sum": [
    { slug: "gyoza-dampet-i-sake", label: "Gyoza dampet i sake" },
  ],
  "vin-til-asiatisk-mad": [
    { slug: "kylling-teriyaki-med-sake-og-mirin", label: "Kylling Teriyaki" },
    { slug: "sticky-pork-belly-med-shaoxing", label: "Sticky pork belly med Shaoxing" },
    { slug: "rosenkaal-med-hvidvin-og-oestersauce", label: "Rosenkål med hvidvin og østerssauce" },
  ],
  "riesling-til-asiatisk-mad": [
    { slug: "kylling-teriyaki-med-sake-og-mirin", label: "Kylling Teriyaki" },
    { slug: "gyoza-dampet-i-sake", label: "Gyoza dampet i sake" },
    { slug: "sticky-pork-belly-med-shaoxing", label: "Sticky pork belly" },
  ],
  "vin-til-kinesisk-mad": [
    { slug: "sticky-pork-belly-med-shaoxing", label: "Sticky pork belly med Shaoxing" },
  ],
  "vin-til-svinekoed": [
    { slug: "sticky-pork-belly-med-shaoxing", label: "Sticky pork belly med Shaoxing" },
  ],
  "vin-til-grillet-gront": [
    { slug: "rosenkaal-med-hvidvin-og-oestersauce", label: "Rosenkål med hvidvin og østerssauce" },
  ],
  "vin-til-vegetar-og-gront": [
    { slug: "rosenkaal-med-hvidvin-og-oestersauce", label: "Rosenkål med hvidvin og østerssauce" },
  ],
  "sadan-bruger-du-vin-til-sauce-og-simren": [
    { slug: "kylling-i-hvidvinssauce-med-porrer-og-vindruer", label: "Kylling med vindruer" },
    { slug: "kylling-teriyaki-med-sake-og-mirin", label: "Teriyaki-glace" },
  ],
};
