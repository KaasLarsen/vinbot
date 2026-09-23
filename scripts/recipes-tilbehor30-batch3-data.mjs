/** Data: Vin-tilbehør batch 3 — middag + dessert-sirupper. */
import { r } from "./add-recipes-tilbehor30-lib.mjs";

export const UPDATED = "2026-09-23";

export const SLUG_EXPANSIONS = {
  "rodvinssyltede-tyttebaer":
    "Klassiske tyttebær, men sukkerlagen er skiftet ud med frugtig rødvin. Bærrene skal stadig «poppe» — kog kort. Perfekt til vildt, kødboller og julemad. Brug friske eller frosne tyttebær; undgå den færdige søde dåseversion som udgangspunkt.",
  "madeira-glaseret-rosenkaal":
    "Halvér rosenkål, rist hårdt i baconfedt eller olie, tilsæt Madeira og kog ind til nøddeagtig glasur. Madeira (secco eller medium) giver karamel og dybde. Undgå at koge kålene til mos — de skal have bid og bruning.",
  "rodvinssirup-med-vanilje":
    "Ren sirup: rødvin, sukker og ægte vaniljestang reduceret til blank dessert-sirup. Ingen gelatine — det er ikke gelé. Hæld over vaniljeis, pandekager eller yoghurt. Vælg en frugtig, ikke for tannin-tung rødvin.",
  "champagne-jordbaersirup":
    "Jordbærsaft eller mosede jordbær reduceret med tør mousserende vin eller champagne. Siruppen skal være intens og lyserød. Brug til vafler, panna cotta og champagne-cocktails. Billigere crémant eller cava fungerer fint i gryden.",
  "rabarberkompot-med-rose":
    "Spæde forårsrabarber kogt ind med tør rosévin — bevarer lyserød farve og frisk syre. Ikke for meget sukker. Server til ost, yoghurt eller som dessert med vaniljeis. Undgå tung, sød rosé i gryden.",
};

export const GUIDE_RECIPE_ADDITIONS = {
  "vin-til-vildt": [
    { slug: "rodvinssyltede-tyttebaer", label: "Rødvinssyltede tyttebær" },
  ],
  "vin-til-julefrokost": [
    { slug: "rodvinssyltede-tyttebaer", label: "Rødvinssyltede tyttebær" },
  ],
  "vin-til-vegetar-og-gront": [
    { slug: "madeira-glaseret-rosenkaal", label: "Madeira-glaseret rosenkål" },
  ],
  "vin-til-flaesketesteg": [
    { slug: "madeira-glaseret-rosenkaal", label: "Madeira-glaseret rosenkål" },
  ],
  "vin-til-dessert-og-kransekage": [
    { slug: "rodvinssirup-med-vanilje", label: "Rødvinssirup med vanilje" },
    { slug: "champagne-jordbaersirup", label: "Champagne- og jordbærsirup" },
    { slug: "rabarberkompot-med-rose", label: "Rabarberkompot med rosé" },
  ],
  "vin-til-ost-og-ostebord": [
    { slug: "rabarberkompot-med-rose", label: "Rabarberkompot med rosé" },
  ],
  "sadan-bruger-du-vin-til-sauce-og-simren": [
    { slug: "rodvinssirup-med-vanilje", label: "Rødvinssirup med vanilje" },
    { slug: "madeira-glaseret-rosenkaal", label: "Madeira-glaseret rosenkål" },
  ],
};

export const RECIPES = [
  r({
    slug: "rodvinssyltede-tyttebaer",
    title: "Rødvinssyltede tyttebær",
    description:
      "Klassiske tyttebær, hvor sukkerlagen er skiftet ud med frugtig rødvin. Opskrift til 1 glas — genialt til vildtretter.",
    tags: ["opskrift", "tilbehør", "rødvin", "tyttebær", "vildt", "jul", "vegetar"],
    prepTime: "PT5M",
    cookTime: "PT15M",
    servings: 8,
    difficulty: "easy",
    wineInRecipe: {
      style: "Frugtig rødvin — pinot noir, gamay eller ung grenache",
      amount: "150 ml rødvin",
      note: "Tyttebær syltes i rødvin i stedet for ren sukkerlage — vinen er lagen.",
    },
    wineToDrink: {
      guideSlug: "vin-til-vildt",
      searchQuery: "pinot noir vildt tyttebær",
      searchMax: 150,
      label: "vin til vildt",
    },
    relatedGuides: [
      "vin-til-vildt",
      "vin-til-julefrokost",
      "vin-til-and",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "250 g tyttebær (friske eller frosne)",
      "150 ml frugtig rødvin",
      "100 g sukker",
      "1 kanelstang eller 2 nelliker (valgfri)",
      "1 knivspids salt",
    ],
    instructions: [
      "Bring vin, sukker, krydderi og salt i kog under omrøring, til sukkeret er opløst.",
      "Tilsæt tyttebær. Simr blidt 5–8 minutter, til bærrene springer og lagen er let sirupagtig — bærrene skal stadig have bid.",
      "Fjern krydderi. Hæld på steriliseret glas. Køl af.",
      "Smager bedst efter 1 dag i køleskab.",
    ],
    intro: `**Rødvinssyltede tyttebær** er den klassiske danske tyttebærsyltetøj med et vinløft: sukkerlagen er skiftet ud med frugtig rødvin. Resultatet er dybere, mere rund smag til vildt, kødboller og julemad. Tæt på [tranebærkompot med Grand Marnier](/opskrifter/tranebaekompot-grand-marnier-rodvin), men med den nordiske tyttebær-syre.`,
    why: `Rødvin tilfører **frugt og farve**, så du kan bruge lidt mindre «flad» sødme. Pinot og gamay matcher vildtets elegante profil. Læs [vin til vildt](/guides/vin-til-vildt).`,
    tips: [
      ["Kort kog", "Lange kog = grød. Bærrene skal poppe."],
      ["Sukker", "Justér efter bærrenes syre — tyttebær er sure."],
      ["Vin", "Frugtig, let. Kraftig cabernet bliver bitter."],
      ["Glas", "Steriliseret glas forlænger holdbarheden."],
    ],
    serving: `Vildtstege, kødboller, [and](/guides/vin-til-and), leverpostej og julefrokost. Også god til blåskimmel.`,
    mistakes: [
      "For lang kogning — mistet tekstur.",
      "For tannin-tung vin — bitter syltetøj.",
      "For lidt sukker — skarp uden balance (medmindre du vil have meget syrligt).",
      "At bruge færdig sød tyttebærkompot som base — for sødt i forvejen.",
    ],
    storage: `Køleskab 2–3 uger. Frys op til 3 måneder. Server kold eller stuetemperatur.`,
    glass: `Pinot noir eller gamay — se [vin til vildt](/guides/vin-til-vildt).`,
    faq: [
      ["Tyttebær vs tranebær?", "Tyttebær er mindre og mere aromatiske. Tranebær kan bruges med samme metode."],
      ["Uden krydderi?", "Ja — ren vin+sukker+bær er klassisk."],
      ["Til frikadeller?", "Ja — klassisk dansk kombination med et vin-twist."],
    ],
  }),

  r({
    slug: "madeira-glaseret-rosenkaal",
    title: "Madeira-glaseret rosenkål",
    description:
      "Rosenkål halveret, ristet hårdt i baconfedt og kogt ind med Madeira til nøddeagtig glasur. Opskrift til 4.",
    tags: ["opskrift", "tilbehør", "madeira", "rosenkål", "grønt", "jul"],
    prepTime: "PT15M",
    cookTime: "PT25M",
    servings: 4,
    difficulty: "easy",
    wineInRecipe: {
      style: "Madeira — secco eller medium-dry (ikke meget sød malmsey til denne)",
      amount: "100 ml Madeira",
      note: "Madeira reduceres med rosenkål til nøddeagtig glasur.",
    },
    wineToDrink: {
      guideSlug: "vin-til-flaesketesteg",
      searchQuery: "pinot noir flæskesteg rosenkål",
      searchMax: 150,
      label: "vin til flæskesteg og kål",
    },
    relatedGuides: [
      "vin-til-flaesketesteg",
      "vin-til-vegetar-og-gront",
      "vin-til-julefrokost",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "500 g rosenkål, putset og halveret",
      "100 g bacon i tern (eller 2 spsk olie til vegetar)",
      "100 ml Madeira",
      "1 spsk smør",
      "1 spsk dijonsennep (valgfri)",
      "Salt og peber",
      "Evt. 1 spsk hakkede hasselnødder til servering",
    ],
    instructions: [
      "Steg bacon sprødt i en bred pande. Tag bacon op. Behold fedtet (eller brug olie).",
      "Læg rosenkål snitflade ned i det varme fedt. Rist 6–8 minutter uden at vende for meget, til de er mørke og karamelliserede.",
      "Vend kålene. Hæld Madeira i. Simr 5–8 minutter, til væsken er reduceret til glasur. Rør smør og sennep i.",
      "Vend bacon tilbage. Smag til. Server med det samme, evt. med nødder.",
    ],
    intro: `**Madeira-glaseret rosenkål** vender den kedelige kogte kål til noget nøddeagtigt og festligt. Halverede rosenkål ristes hårdt i baconfedt og koges ind med portugisisk Madeira. Tæt på [rosenkål med hvidvin og østerssauce](/opskrifter/rosenkaal-med-hvidvin-og-oestersauce), men Madeira giver dybere, mere karamelagtig karakter — perfekt til flæskesteg og juleand.`,
    why: `Madeira har **oxideret nødde- og karamelnote**, der matcher ristet kål og bacon. Reduktionen binder fedt og grønt. Læs [vin til flæskesteg](/guides/vin-til-flaesketesteg).`,
    tips: [
      ["Bruning", "Lad snitfladen få farve — det er smagen.", ],
      ["Madeira", "Secco/medium. Meget sød malmsey gør retten dessertagtig."],
      ["Vegetar", "Brug olie + 1 tsk soyasauce for umami."],
      ["Størrelse", "Små kål hele; store halveres eller kvarteres."],
    ],
    serving: `Til [flæskesteg](/guides/vin-til-flaesketesteg), and, stegt kylling eller som vegetarisk hovedret med polenta. Del af julemenuer.`,
    mistakes: [
      "At koge kålene bløde før stegning — mistet bid og bruning.",
      "For meget Madeira uden reduktion — rå alkohols mag.",
      "For lav varme — dampede, grønne kål uden glasur.",
      "At salte for tidligt med bacon — for salt.",
    ],
    storage: `Bedst frisk. Køleskab 2 dage. Genvarm i pande med en skvæt Madeira.`,
    glass: `Pinot noir, cru beaujolais eller let syrah — se [vin til flæskesteg](/guides/vin-til-flaesketesteg).`,
    faq: [
      ["Kan jeg bruge portvin?", "Ja — ruby port giver sødere glasur. Justér sennep/salt."],
      ["Børn og alkohol?", "Alkoholen reduceres; smagen bliver. Spring over og brug fond + 1 tsk sherryeddike."],
      ["Ovnen i stedet?", "Rist kål ved 220 °C 15–20 min, hæld Madeira over bradepanden og reducér på komfur."],
    ],
  }),

  r({
    slug: "rodvinssirup-med-vanilje",
    title: "Rødvinssirup med vanilje",
    description:
      "Ren sirup af reduceret rødvin, sukker og ægte vaniljestang. Opskrift til ca. 2 dl — til is, pandekager og desserter.",
    tags: ["opskrift", "dessert", "sirup", "rødvin", "vanilje", "vegetar"],
    prepTime: "PT5M",
    cookTime: "PT30M",
    servings: 10,
    difficulty: "easy",
    wineInRecipe: {
      style: "Frugtig rødvin — merlot, grenache, zinfandel eller ung pinot",
      amount: "500 ml rødvin",
      note: "Rødvin reduceres med sukker og vanilje til blank dessert-sirup — ikke gelé.",
    },
    wineToDrink: {
      guideSlug: "vin-til-dessert-og-kransekage",
      searchQuery: "portvin dessert rødvin",
      searchMax: 150,
      label: "vin til dessert",
    },
    relatedGuides: [
      "vin-til-dessert-og-kransekage",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "500 ml frugtig rødvin",
      "150 g sukker",
      "1 vaniljestang, flækket",
      "1 strimmel citronskal (valgfri)",
      "1 knivspids salt",
    ],
    instructions: [
      "Hæld vin, sukker, vaniljestang, citronskal og salt i en gryde. Bring i kog under omrøring.",
      "Simr uden låg på middel-lav varme 25–35 minutter, til væsken er reduceret til ca. 2 dl og er sirupagtig.",
      "Fjern citronskal. Lad vaniljestangen blive eller tag den op og skrab kornene i.",
      "Køl af. Siruppen tykner. Opbevar på flaske i køleskab.",
    ],
    intro: `**Rødvinssirup med vanilje** er den rene, blanke dessert-sirup — reduceret rødvin, sukker og ægte vaniljestang. Ingen gelatine, ingen bær: bare koncentreret vinfrugt til at hælde over vaniljeis og pandekager. Hvor [klar rødvinsgelé med vanilje](/opskrifter/klar-rodvinsgele-med-vanilje) er fast til ost, er denne flydende luksus til det søde køkken.`,
    why: `Langsom reduktion fordamper alkohol og efterlader **frugt, syre og farve**. Vanilje runder tanniner. Læs [vin til dessert](/guides/vin-til-dessert-og-kransekage).`,
    tips: [
      ["Konsistens", "Varm sirup er tyndere end kold — tag den af lidt før du synes den er færdig."],
      ["Vin", "Frugtig. Undgå meget egede, bitre vine."],
      ["Vanilje", "Ægte stang. Vaniljesukker er nødplan."],
      ["Brug", "1–2 spsk pr. portion is er nok."],
    ],
    serving: `Vaniljeis, pandekager, yoghurt, [pærer i rødvin](/opskrifter/paerer-i-rodvin), chokoladekage eller i drinks. Prøv med [plommetrifli](/opskrifter/plommetrifli-med-rodvinssirup)-inspiration.`,
    mistakes: [
      "For hård kogning — bitter, brændt sukker.",
      "At forveksle med gelé — denne skal forblive flydende.",
      "For meget reduktion — karamel der ikke kan hældes.",
      "At bruge «madlavningsvin» — dårlig eftersmag.",
    ],
    storage: `Køleskab 2–3 uger. Frys i isterninger. Ryst/rør før brug hvis den skiller let.`,
    glass: `Samme rødvin, portvin eller mousserende til desserten — se [vin til dessert](/guides/vin-til-dessert-og-kransekage).`,
    faq: [
      ["Kan jeg bruge restvin?", "Ja, hvis den stadig smager friskt — ikke oxideret eller eddikeagtig.", ],
      ["Med bær?", "Tilsæt 100 g brombær/hindbær midtvejs og si — eller lav [brombærmarmelade](/opskrifter/brombaermarmelade-med-rodvin)."],
      ["Til cocktails?", "Ja — 1–2 cl i gin eller champagne.", ],
    ],
  }),

  r({
    slug: "champagne-jordbaersirup",
    title: "Champagne- og jordbærsirup",
    description:
      "Jordbær reduceret med tør mousserende vin eller champagne til luksus-sirup. Opskrift til ca. 2 dl — til vafler og panna cotta.",
    tags: ["opskrift", "dessert", "sirup", "bobler", "champagne", "jordbær", "vegetar"],
    prepTime: "PT10M",
    cookTime: "PT25M",
    servings: 10,
    difficulty: "easy",
    wineInRecipe: {
      style: "Tør mousserende — champagne, crémant, cava eller prosecco brut",
      amount: "300 ml mousserende vin + jordbær",
      note: "Jordbær og bobler reduceres til intens, lyserød sirup.",
    },
    wineToDrink: {
      guideSlug: "vin-til-dessert-og-kransekage",
      searchQuery: "champagne jordbær dessert",
      searchMax: 150,
      label: "champagne til dessert",
    },
    relatedGuides: [
      "vin-til-dessert-og-kransekage",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "400 g jordbær, rensede og halverede",
      "300 ml tør mousserende vin",
      "80 g sukker",
      "1 spsk citronsaft",
      "1 knivspids salt",
    ],
    instructions: [
      "Læg jordbær, sukker, citron og salt i en gryde. Mos let med ske. Varm op, til bærrene slipper saft (5 min).",
      "Hæld mousserende vin i. Simr 15–20 minutter, til væsken er reduceret og sirupagtig.",
      "Si gennem fin si under let tryk, så du får mest muligt saft uden for mange kerner. (Eller lad være at sie for mere «compote»-agtig topping.)",
      "Køl af. Opbevar på flaske. Siruppen tykner.",
    ],
    intro: `**Champagne- og jordbærsirup** er den ultimative luksustopping til vafler, panna cotta og vaniljeis. Jordbærsaft reduceres med tør mousserende vin — boblerne forsvinder, smagen bliver. Tæt på [champagne-jordbærsorbet](/opskrifter/champagne-jordbaersorbet) og [mousserende vingelé med friske bær](/opskrifter/mousserende-vingele-med-friske-baer), men her er produktet en hældbar sirup.`,
    why: `Mousserende vin tilfører **syre og gær-aroma**, der løfter jordbær uden tung rødvin. Brut er bedre end sød asti i gryden. Læs [vin til dessert](/guides/vin-til-dessert-og-kransekage).`,
    tips: [
      ["Bobler i gryden", "Brug gerne en god cava/crémant — gem prestigecuvée til glasset."],
      ["Si eller ej", "Si for elegant sirup; uden si for rustik topping."],
      ["Frosne jordbær", "Fungerer — giv lidt længere tid til saft."],
      ["Farve", "Lyserød er målet; for lang kogning bliver brunlig."],
    ],
    serving: `Vafler, pandekager, panna cotta, yoghurt, champagne-cocktails eller over [Moscato-pocherede ferskner](/opskrifter/moscato-pocherede-ferskner).`,
    mistakes: [
      "Sød dessert-mousserende + meget sukker — slik.",
      "For hård kogning — brun, karamelagtig jordbær.",
      "At forvente bobler i den færdige sirup — de er kogt væk.",
      "At bruge jordbærsyltetøj som genvej — forkert konsistens og sødme.",
    ],
    storage: `Køleskab 1–2 uger. Frys i portioner. Ryst før brug.`,
    glass: `Samme stil bobler, eller rosé champagne — se [vin til dessert](/guides/vin-til-dessert-og-kransekage).`,
    faq: [
      ["Uden alkohol?", "Brug æblemost + 1 spsk hvidvinseddike i stedet for bobler."],
      ["Med hele jordbær?", "Tag nogle bær op før si — pynt desserten med dem."],
      ["Til drinks?", "1–2 cl i champagne = hurtig kir-agtig drink med jordbær."],
    ],
  }),

  r({
    slug: "rabarberkompot-med-rose",
    title: "Rabarberkompot med rosé",
    description:
      "Forårets spæde rabarber kogt ind med tør rosévin. Opskrift til 6 — bevarer lyserød farve og frisk syre.",
    tags: ["opskrift", "tilbehør", "dessert", "rosé", "rabarber", "forår", "vegetar", "ost"],
    prepTime: "PT15M",
    cookTime: "PT20M",
    servings: 6,
    difficulty: "easy",
    wineInRecipe: {
      style: "Tør, frisk rosé — Provence-stil, navarra eller tør rosé fra Loire",
      amount: "200 ml rosévin",
      note: "Rabarber koges i rosé — vinen bevarer farve og giver frisk syre.",
    },
    wineToDrink: {
      guideSlug: "vin-til-ost-og-ostebord",
      searchQuery: "rosé ost rabarber",
      searchMax: 150,
      label: "rosé til ost og rabarber",
    },
    relatedGuides: [
      "vin-til-ost-og-ostebord",
      "vin-til-dessert-og-kransekage",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "500 g rabarber, skåret i 2 cm stykker",
      "200 ml tør rosévin",
      "80–100 g sukker",
      "1 vaniljestang eller 1 tsk vaniljepasta (valgfri)",
      "1 strimmel appelsinskal (valgfri)",
      "1 knivspids salt",
    ],
    instructions: [
      "Bring rosé, sukker, vanilje, appelsinskal og salt i kog.",
      "Tilsæt rabarber. Simr blidt 8–12 minutter, til stykkerne er møre men stadig holder formen.",
      "Tag rabarber op med hulske. Kog lagen ind 3–5 minutter til let sirup. Fjern skal og vanilje.",
      "Hæld sirup over rabarber. Køl af. Server lun eller kold.",
    ],
    intro: `**Rabarberkompot med rosé** er forårets lyserøde tilbehør: spæde rabarber kogt ind med tør rosévin, så farven bevares og syren forbliver frisk. Perfekt til ost, yoghurt og vaniljeis. Tæt på [hvidvins-abrikoskompot](/opskrifter/hvidvins-abrikoskompot) og [rosé-syltede rødløg](/opskrifter/rose-syltede-roedloeg-med-timian) — her er det frugten, der er stjernen.`,
    why: `Tør rosé har **røde bær-aromaer og syre** uden tung tannin. Den understøtter rabarberens farve bedre end hvidvin. Læs [vin til ost](/guides/vin-til-ost-og-ostebord).`,
    tips: [
      ["Rabarber", "Tykke, grønne stængler kræver mere sukker. Røde er sødere og flottere."],
      ["Sukker", "Start lavt — rabarber skal smage syrligt."],
      ["Kogning", "For hård = grød. Blid simren."],
      ["Rosé", "Tør. Sød white zinfandel-rosé gør kompotten flad."],
    ],
    serving: `Gedeost, brie, yoghurt, pandekager, vaniljeis eller som [dessert](/guides/vin-til-dessert-og-kransekage) med marcipan. Også til svinekød.`,
    mistakes: [
      "Sød rosé + meget sukker — mister kant.",
      "For lang kogning — brunlig grød.",
      "At smide bladene i — de er giftige.",
      "At servere iskold til ost uden at smage til — kan mangle salt.",
    ],
    storage: `Køleskab 5 dage. Frys op til 2 måneder. Siruppen geléer let ved køl — det er fint.`,
    glass: `Samme tørre rosé eller let pinot noir — se [vin til ost](/guides/vin-til-ost-og-ostebord).`,
    faq: [
      ["Med jordbær?", "Ja — tilsæt 150 g jordbær de sidste 3 minutter."],
      ["Til kød?", "Ja, til flæsk og kylling som syrligt tilbehør."],
      ["Kan jeg bruge frossen rabarber?", "Ja — direkte i gryden, lidt længere tid."],
    ],
  }),
];
