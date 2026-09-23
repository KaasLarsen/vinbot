/** Data: Asia10 + snacks — batch 2 (sidste 4 huller). */
export const UPDATED = "2026-09-23";

export const SLUG_EXPANSIONS = {
  "asparges-med-mousserende-sabayon":
    "Sabayon piskes over vandbad til tyk og luftig — for høj varme giver scrambled æg. Asparges blancheres eller dampes sprøde. Server sauce med det samme.",
  "loegeringe-i-hvidvinsdej":
    "Dejen skal være iskold og let — mousserende vin giver brus og sprødhed. Frityr ved ca. 180 °C. Dryp godt af, så de ikke bliver fede.",
  "jordskokkesuppe-med-hvidvinsreduktion":
    "Skær jordskokker jævnt. Reducer hvidvin med skalotteløg først for dybde, før fond og fløde. Blend silkeblødt og si gerne.",
  "svinekoteletter-med-sennep-og-hvidvin":
    "Brun koteletterne godt. Simr i tør hvidvin med grov sennep; fløde til sidst. Undgå at koge fløden hårdt — saucen kan skille.",
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
    slug: "asparges-med-mousserende-sabayon",
    title: "Dampede asparges med mousserende vinsauce (sabayon)",
    description:
      "Sprøde grønne asparges med luftig, varm sabayon pisket på tør mousserende vin eller Champagne. Opskrift til 4 — elegant forret eller tilbehør.",
    tags: ["opskrift", "asparges", "sabayon", "champagne", "mousserende", "forret", "sauce"],
    prepTime: "PT15M",
    cookTime: "PT20M",
    difficulty: "medium",
    wineInRecipe: {
      style: "Tør mousserende vin — Champagne, Crémant, Cava eller Prosecco Brut",
      amount: "1–1½ dl til sabayon",
      note: "Mousserende vin piskes med æggeblommer over vandbad til luftig sabayon.",
    },
    wineToDrink: {
      guideSlug: "champagne-til-mad",
      searchQuery: "champagne cremant asparges sabayon",
      searchMax: 200,
      label: "bobler til asparges",
    },
    relatedGuides: [
      "champagne-til-mad",
      "vin-til-asparges",
      "bedste-bobler",
      "bobler-champagne-cava-prosecco-og-cremant",
    ],
    ingredients: [
      "500 g grønne asparges, trimmet",
      "3 æggeblommer",
      "1–1½ dl tør mousserende vin (Champagne/Crémant/Cava)",
      "1 spsk citronsaft",
      "Salt og hvid peber",
      "Evt. 1 spsk koldt smør",
      "Flagesalt til servering",
    ],
    instructions: [
      "Damp eller blanchér asparges 3–5 minutter, til de er sprøde-møre. Dryp og hold lune.",
      "Sæt en skål over simmerende vandbad (skålen må ikke røre vandet). Pisk æggeblommer, mousserende vin, citron og en knivspids salt.",
      "Pisk konstant 5–8 minutter, til sabayonen er tyk, luftig og dobbelt så stor. Tag af varmen. Pisk evt. smør i.",
      "Anret asparges. Ske sabayon over. Drys flagesalt. Server straks.",
    ],
    intro: `**Dampede asparges med mousserende sabayon** er den luftige, festlige variant: sprøde asparges under en varm sauce pisket på bobler. Mere elegant end [asparges i hvidvinsauce](/opskrifter/asparges-i-hvidvinsauce), og samme teknik som [østers med Champagne-sabayonne](/opskrifter/oesters-med-champagne-sabayonne) — her til sæsongrønt.`,
    why: `Mousserende vin giver **syre og aroma** til æggeblommerne. Vandbadet koagulerer forsigtigt til en luftig emulsion. For høj varme = scrambled æg. Se [Champagne til mad](/guides/champagne-til-mad) og [vin til asparges](/guides/vin-til-asparges).`,
    tips: [
      ["Konstant piskning", "Ellers skiller eller sætter saucen."],
      ["Lunken skål", "Ikke kogende — max simmer under."],
      ["Server med det samme", "Sabayon falder sammen ved venten."],
      ["Brut", "Tør bobler — sød Prosecco Dolce bliver klaimatisk."],
    ],
    serving: `Som forret eller til fisk/kylling. Brød til at suge. Drik samme stil bobler i glasset.`,
    mistakes: [
      "For høj varme — scrambled æg.",
      "At stoppe med at piske — skilt sauce.",
      "Overkogte asparges — bløde og kedelige.",
      "Søde bobler — for sød sauce.",
    ],
    storage: `Bedst frisk. Asparges 1 dag; sabayon laves nyt.`,
    glass: `Champagne, Crémant eller Cava Brut — se [bedste bobler](/guides/bedste-bobler).`,
    faq: [
      [
        "Kan jeg bruge stille hvidvin?",
        "Ja — klassisk sabayon. Bobler giver mere lift.",
      ],
      [
        "Hvide asparges?",
        "Ja — skræl og kog lidt længere.",
      ],
      [
        "Uden vandbad?",
        "Risikabelt. Brug lav varme og pisk uafbrudt — vandbad er sikrere.",
      ],
      [
        "Til dessert?",
        "Sød sabayon med Moscato — anden ret. Her er det tør til asparges.",
      ],
    ],
  }),

  r({
    slug: "loegeringe-i-hvidvinsdej",
    title: "Hvidvinsdej-indbagte løgringe",
    description:
      "Sprøde friturerede løgringe i luftig dej af iskold mousserende hvidvin og mel. Opskrift til 4 som snack eller tilbehør.",
    tags: ["opskrift", "snack", "løgringe", "mousserende", "hvidvin", "friture", "tilbehør"],
    prepTime: "PT20M",
    cookTime: "PT20M",
    servings: 4,
    difficulty: "medium",
    wineInRecipe: {
      style: "Iskold mousserende hvidvin — Cava, Prosecco Brut eller Crémant",
      amount: "2–2½ dl i dejen",
      note: "Mousserende vin erstatter øl i classic beer batter — brus og syre giver let, sprød dej.",
    },
    wineToDrink: {
      guideSlug: "bedste-bobler",
      searchQuery: "cava prosecco snack fritter løgringe",
      searchMax: 180,
      label: "bobler til snack",
    },
    relatedGuides: [
      "bedste-bobler",
      "bobler-til-fredag",
      "bobler-champagne-cava-prosecco-og-cremant",
    ],
    ingredients: [
      "2 store løg",
      "150 g hvedemel",
      "50 g majsstivelse eller ekstra mel",
      "2–2½ dl iskold mousserende hvidvin",
      "1 tsk salt",
      "½ tsk bagepulver (valgfrit)",
      "Olie til friture (ca. 1 liter)",
      "Flagesalt til servering",
    ],
    instructions: [
      "Skær løg i 1 cm skiver. Adskil til ringe. Dup tørre.",
      "Bland mel, majsstivelse, salt og evt. bagepulver. Pisk kold mousserende vin i til en tyk, glat dej (som pandekagedej). Stil koldt 10 minutter.",
      "Varm olie til 175–180 °C.",
      "Dyp løgringe i dej. Fritér i hold 2–3 minutter, til gyldne. Dryp på køkkenrulle.",
      "Drys flagesalt. Server straks.",
    ],
    intro: `**Hvidvinsdej-indbagte løgringe** er beer-batter-tricket med bobler i stedet for øl: iskold mousserende vin giver en luftig, sprød skorpe. Perfekt snack til fredagsbobler — eller tilbehør til [burger med rødvinsglace](/opskrifter/burger-med-rodvinsglace) og [gorgonzolasauce](/opskrifter/gorgonzolasauce-med-hvidvin).`,
    why: `Brus i dejen skaber **luftlommer** under fritering; syren holder dejen let. Iskold væske = sprødere resultat. Se [bedste bobler](/guides/bedste-bobler).`,
    tips: [
      ["Iskold vin", "Flasken lige fra køleskab."],
      ["Ikke for tynd dej", "Skal hænge på ringen."],
      ["Hold temperatur", "For lav = fedtede ringe."],
      ["Små hold", "Ellers falder olietemperaturen."],
    ],
    serving: `Med aioli, spicy mayo eller bare salt. Drik Cava/Prosecco til.`,
    mistakes: [
      "Varm dejvæske — slap skorpe.",
      "For lav olietemperatur — fedtede ringe.",
      "For tyk dej — dejklump uden knas.",
      "At stable dem varme — bliver bløde.",
    ],
    storage: `Bedst friske. Genopvarm i ovn 200 °C 5 min — aldrig mikrobølge.`,
    glass: `Samme Cava/Prosecco — se [bobler til fredag](/guides/bobler-til-fredag).`,
    faq: [
      [
        "Kan jeg bruge øl?",
        "Ja — klassisk beer batter. Vin giver finere syre.",
      ],
      [
        "Uden frituregryde?",
        "Dybt i en gryde med termometer. Eller airfryer med sprayolie — mindre knas.",
      ],
      [
        "Glutenfri?",
        "Prøv glutenfri melblanding + majsstivelse.",
      ],
      [
        "Andet end løg?",
        "Æbleringe eller rejer i samme dej.",
      ],
    ],
  }),

  r({
    slug: "jordskokkesuppe-med-hvidvinsreduktion",
    title: "Cremet jordskokkesuppe med hvidvinsreduktion",
    description:
      "Fløjlsblød jordskokkesuppe hvor skalotteløg og jordskokker reduceres med hvidvin før fløde. Opskrift til 4 — elegant forret.",
    tags: ["opskrift", "suppe", "jordskok", "hvidvin", "fløde", "forret", "vegetar"],
    prepTime: "PT20M",
    cookTime: "PT35M",
    servings: 4,
    difficulty: "easy",
    wineInRecipe: {
      style: "Tør hvidvin — Chablis, Sauvignon Blanc, Pinot Grigio eller Riesling tør",
      amount: "2 dl hvidvin",
      note: "Hvidvin reduceres med skalotteløg og jordskokker for syre og dybde, før fond og fløde blendes i.",
    },
    wineToDrink: {
      guideSlug: "vin-til-suppe",
      searchQuery: "jordskok chablis sauvignon blanc cremet suppe",
      searchMax: 180,
      label: "vin til jordskokkesuppe",
    },
    relatedGuides: [
      "vin-til-suppe",
      "vin-til-vegetar-og-gront",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "600 g jordskokker, skrællet og skåret",
      "2 dl tør hvidvin",
      "2 skalotteløg, finthakkede",
      "1 kartoffel, i tern (valgfrit, til tykkelse)",
      "8 dl grøntsags- eller kyllingefond",
      "2 dl piskefløde",
      "2 spsk smør",
      "1 spsk olivenolie",
      "Salt, peber og citronsaft",
      "Evt. ristede hasselnødder til pynt",
    ],
    instructions: [
      "Svits skalotteløg i smør og olie 3–4 minutter. Tilsæt jordskokker (og kartoffel). Steg 5 minutter.",
      "Hæld hvidvin i. Kog ind til næsten tørt (4–5 minutter) — det er reduktionen.",
      "Tilsæt fond. Simr 20–25 minutter, til jordskokker er møre.",
      "Blend silkeblødt. Si gerne. Tilsæt fløde. Varm op uden at koge hårdt. Smag til med salt, peber og citron.",
      "Server med nødder eller et skvæt olivenolie.",
    ],
    intro: `**Cremet jordskokkesuppe med hvidvinsreduktion** er den fløjlsbløde forret, hvor hvidvin koges hårdt ind med skalotteløg og jordskokker, før fløden afrunder. Mere vinøs end [sellerisuppe med hvidvin](/opskrifter/sellerisuppe-med-hvidvin) — reduktionen er hele pointen.`,
    why: `Jordskokker er nøddeagtige og søde. **Hvidvin** reduceret væk giver syre uden rå alkoholsmaq, så fløden ikke bliver tung. Se [vin til suppe](/guides/vin-til-suppe).`,
    tips: [
      ["Skræl under vand", "Jordskokker oxiderer/misfarves."],
      ["Reduktion", "Næsten tør pandebund før fond."],
      ["Si", "Giver restaurant-silke."],
      ["Citron", "Lille skvæt til sidst — friskhed."],
    ],
    serving: `Som forret med brød. Til festmenu før [côte de bœuf](/opskrifter/cote-de-boeuf-med-rodvin) eller fisk.`,
    mistakes: [
      "At springe reduktionen over — flad, «rå» vinsmag.",
      "For meget fløde uden syre — kedelig.",
      "Underkogte jordskokker — grynet blend.",
      "At koge hårdt efter fløde — kan skille.",
    ],
    storage: `Køleskab 3 dage. Frys uden fløde; tilsæt fløde ved genvarmning.`,
    glass: `Chablis eller Sauvignon Blanc — se [vin til suppe](/guides/vin-til-suppe).`,
    faq: [
      [
        "Uden fløde?",
        "Blend med ekstra fond og en klat smør — stadig cremet.",
      ],
      [
        "Vegansk?",
        "Olie i stedet for smør, havrefløde eller kokosmælk mild.",
      ],
      [
        "Kan jeg bruge topinambur færdige?",
        "Friske er bedst. Færdige kogte: kortere tid, stadig reducer vin først.",
      ],
      [
        "Pynt?",
        "Ristede hasselnødder, crutoner eller et skvæt trøffelolie.",
      ],
    ],
  }),

  r({
    slug: "svinekoteletter-med-sennep-og-hvidvin",
    title: "Hvidvinsbraiserede svinekoteletter med sennep",
    description:
      "Tykke svinekoteletter brunet og simret i tør hvidvin, grov sennep og fløde. Opskrift til 4 — saftig hverdagssteg.",
    tags: ["opskrift", "svinekød", "koteletter", "hvidvin", "sennep", "fløde", "hovedret"],
    prepTime: "PT15M",
    cookTime: "PT30M",
    servings: 4,
    difficulty: "easy",
    wineInRecipe: {
      style: "Tør hvidvin — Riesling, Pinot Grigio, Chablis eller Chenin Blanc",
      amount: "2 dl hvidvin",
      note: "Hvidvin deglacerer efter bruning; grov sennep og fløde afrunder saucen.",
    },
    wineToDrink: {
      guideSlug: "vin-til-svinekoed",
      searchQuery: "svinekoteletter riesling pinot noir sennep",
      searchMax: 200,
      label: "vin til svinekoteletter",
    },
    relatedGuides: [
      "vin-til-svinekoed",
      "vin-til-svinemoerbrad",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "4 tykke svinekoteletter (ca. 200 g hver)",
      "2 dl tør hvidvin",
      "2 spsk grov dijonsennep",
      "1½ dl piskefløde",
      "2 skalotteløg, finthakkede",
      "2 fed hvidløg",
      "2 spsk smør",
      "1 spsk olie",
      "1 kvist timian",
      "Salt og peber",
      "Frisk persille",
    ],
    instructions: [
      "Salt og peber koteletterne. Brun i olie og smør 3–4 minutter pr. side. Tag op.",
      "Steg skalotteløg 3 minutter. Tilsæt hvidløg — rist 30 sekunder.",
      "Hæld hvidvin i. Kog 2 minutter under omrøring. Skrab bunden fri.",
      "Rør sennep i. Læg koteletter og timian tilbage. Simr under låg 8–12 minutter, til kødet er gennemstegt (ca. 65–68 °C).",
      "Tag koteletter op. Tilsæt fløde. Kog let ind 2–3 minutter. Smag til. Hæld sauce over. Drys persille.",
    ],
    intro: `**Hvidvinsbraiserede svinekoteletter med sennep** er den cremede, sennepsrige variant: bruning, hvidvin, grov dijon og fløde. Tæt på [svinekoteletter i hvidvin](/opskrifter/svinekoteletter-i-hvidvin), men her er sennep og fløde i centrum — samme familie som [kanin i hvidvin med sennep](/opskrifter/kanin-i-hvidvin).`,
    why: `Sennep og svinekød er klassisk. **Hvidvin** giver syre, der skærer fedme; fløde binder til en blank sauce. Se [vin til svinekød](/guides/vin-til-svinekoed).`,
    tips: [
      ["Tykke koteletter", "Tynde bliver tørre."],
      ["Termometer", "65–68 °C — ikke 80 °C."],
      ["Grov sennep", "Giver tekstur og mildere varme end glat."],
      ["Fløde til sidst", "Efter kødet er mørt."],
    ],
    serving: `Kartoffelmos, æbler eller [hvidvinsbraiserede porrer](/opskrifter/hvidvinsbraiserede-porrer).`,
    mistakes: [
      "Overstegning — tørt kød.",
      "At koge fløde hårdt længe — kan skille.",
      "For lidt sennep — kedelig sauce.",
      "Sød hvidvin — klaimatisk.",
    ],
    storage: `Køleskab 2 dage. Genvarm blidt i sauce. Frys 1 måned.`,
    glass: `Riesling eller Pinot Noir — se [vin til svinekød](/guides/vin-til-svinekoed).`,
    faq: [
      [
        "Forskel på den anden kotelet-opskrift?",
        "Den eksisterende er paneret/braiseret klassisk. Denne er sennep-fløde-fokus.",
      ],
      [
        "Uden fløde?",
        "Pisk koldt smør i reduceret vin+sennep.",
      ],
      [
        "Benfrie eller med ben?",
        "Begge. Med ben tager lidt længere.",
      ],
      [
        "Kan jeg grille koteletterne?",
        "Ja — lav saucen i en gryde og hæld over.",
      ],
    ],
  }),
];

export const GUIDE_RECIPE_ADDITIONS = {
  "champagne-til-mad": [
    { slug: "asparges-med-mousserende-sabayon", label: "Asparges med mousserende sabayon" },
  ],
  "vin-til-asparges": [
    { slug: "asparges-med-mousserende-sabayon", label: "Asparges med mousserende sabayon" },
  ],
  "bedste-bobler": [
    { slug: "asparges-med-mousserende-sabayon", label: "Asparges med sabayon" },
    { slug: "loegeringe-i-hvidvinsdej", label: "Løgringe i hvidvinsdej" },
  ],
  "bobler-til-fredag": [
    { slug: "loegeringe-i-hvidvinsdej", label: "Løgringe i hvidvinsdej" },
  ],
  "bobler-champagne-cava-prosecco-og-cremant": [
    { slug: "asparges-med-mousserende-sabayon", label: "Asparges med sabayon" },
    { slug: "loegeringe-i-hvidvinsdej", label: "Løgringe i hvidvinsdej" },
  ],
  "vin-til-suppe": [
    { slug: "jordskokkesuppe-med-hvidvinsreduktion", label: "Jordskokkesuppe med hvidvinsreduktion" },
  ],
  "vin-til-vegetar-og-gront": [
    { slug: "jordskokkesuppe-med-hvidvinsreduktion", label: "Jordskokkesuppe" },
  ],
  "vin-til-svinekoed": [
    { slug: "svinekoteletter-med-sennep-og-hvidvin", label: "Svinekoteletter med sennep og hvidvin" },
  ],
  "vin-til-svinemoerbrad": [
    { slug: "svinekoteletter-med-sennep-og-hvidvin", label: "Svinekoteletter med sennep" },
  ],
  "sadan-bruger-du-vin-til-sauce-og-simren": [
    { slug: "asparges-med-mousserende-sabayon", label: "Mousserende sabayon" },
    { slug: "svinekoteletter-med-sennep-og-hvidvin", label: "Sennep-hvidvinssauce" },
    { slug: "jordskokkesuppe-med-hvidvinsreduktion", label: "Hvidvinsreduktion til suppe" },
  ],
};
