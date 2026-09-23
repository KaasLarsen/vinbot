/** Data: Vin-tilbehør batch 4 — dessert + syltede. */
import { r } from "./add-recipes-tilbehor30-lib.mjs";

export const UPDATED = "2026-09-23";

export const SLUG_EXPANSIONS = {
  "kirsebaersovs-med-portvin":
    "Klassisk risalamande-kirsebærsovs, hvor halvdelen af væsken er tung rød portvin (ruby eller LBV). Brug surkirsebær fra glas eller frosne. Maizena binder; portvin giver dybde. Sovsen skal være blank og bærene hele.",
  "espresso-marsalasirup":
    "Mørk, intens sirup af stærk espresso og siciliansk Marsala (gerne tør eller semi til denne brug). Perfekt over tiramisu, chokoladekage og vaniljeis. Reducér til tyk sirup — den skal dryppe, ikke løbe som kaffe.",
  "hvidvinssyltede-agurker-med-dild":
    "Agurkesalat eller asier syltet i lage baseret på hvidvin, hvidvinseddike og dildfrø. Sprød tekstur kræver saltudtræk først og ikke for lang kogning af lagen. Klassisk til smørrebrød og grill.",
  "sherrysyltede-sennepsfro":
    "Sennepsfrø der koger op og «popper» i munden, syltet i tør sherry og sukker. Crunch til leverpostej, tatar og ost. Frøene skal blødgøres men stadig have bid — ikke til mos.",
  "hvidvinssyltede-gronne-tomater":
    "Sensommerens umodne grønne tomater syltet i krydret hvidvinslage med vanilje og sennepsfrø. Klassisk til smørrebrød. Skær i skiver eller både; lagen skal dække. Smager bedst efter et par dage.",
};

export const GUIDE_RECIPE_ADDITIONS = {
  "vin-til-dessert-og-kransekage": [
    { slug: "kirsebaersovs-med-portvin", label: "Kirsebærsovs med portvin" },
    { slug: "espresso-marsalasirup", label: "Espresso- og Marsalasirup" },
  ],
  "vin-til-smorrebrod": [
    { slug: "hvidvinssyltede-agurker-med-dild", label: "Hvidvinssyltede agurker med dild" },
    { slug: "sherrysyltede-sennepsfro", label: "Sherrysyltede sennepsfrø" },
    { slug: "hvidvinssyltede-gronne-tomater", label: "Hvidvinssyltede grønne tomater" },
  ],
  "vin-til-julefrokost": [
    { slug: "kirsebaersovs-med-portvin", label: "Kirsebærsovs med portvin" },
    { slug: "hvidvinssyltede-agurker-med-dild", label: "Hvidvinssyltede agurker" },
    { slug: "hvidvinssyltede-gronne-tomater", label: "Hvidvinssyltede grønne tomater" },
  ],
  "vin-til-tapas": [
    { slug: "sherrysyltede-sennepsfro", label: "Sherrysyltede sennepsfrø" },
  ],
  "portvin-til-ost": [
    { slug: "kirsebaersovs-med-portvin", label: "Kirsebærsovs med portvin" },
  ],
  "sadan-bruger-du-vin-til-sauce-og-simren": [
    { slug: "espresso-marsalasirup", label: "Espresso-Marsalasirup" },
    { slug: "kirsebaersovs-med-portvin", label: "Kirsebærsovs med portvin" },
  ],
};

export const RECIPES = [
  r({
    slug: "kirsebaersovs-med-portvin",
    title: "Kirsebærsovs med portvin",
    description:
      "Klassisk risalamande-sovs opgraderet med rød portvin (ruby eller LBV). Opskrift til 6–8 — til risalamande og desserter.",
    tags: ["opskrift", "dessert", "sauce", "portvin", "kirsebær", "jul"],
    prepTime: "PT10M",
    cookTime: "PT15M",
    servings: 8,
    difficulty: "easy",
    wineInRecipe: {
      style: "Rød portvin — ruby eller LBV (Late Bottled Vintage)",
      amount: "100 ml portvin + kirsebærsaft",
      note: "Portvin erstatter halvdelen af væsken i kirsebærsovsen — dybde og sødme.",
    },
    wineToDrink: {
      guideSlug: "vin-til-dessert-og-kransekage",
      searchQuery: "portvin risalamande dessert",
      searchMax: 150,
      label: "portvin til dessert",
    },
    relatedGuides: [
      "vin-til-dessert-og-kransekage",
      "vin-til-julefrokost",
      "portvin-til-ost",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "1 glas surkirsebær (ca. 350–400 g med saft) eller 300 g frosne surkirsebær + 150 ml saft/vand",
      "100 ml rød portvin",
      "50–70 g sukker (justér efter bærrenes sødme)",
      "1 spsk maizena (hvedestivelse)",
      "1 spsk koldt vand til udrøring",
      "1 knivspids salt",
      "Evt. 1 tsk citronsaft",
    ],
    instructions: [
      "Si kirsebær fra saften. Mål saft + portvin til ca. 3 dl væske (supplér med vand hvis nødvendigt).",
      "Bring væske, sukker og salt i kog. Tilsæt kirsebær. Simr 3–5 minutter.",
      "Rør maizena ud i koldt vand. Pisk i under omrøring. Kog 1 minut til blank, tyknet sovs.",
      "Smag til med citron. Server lun til risalamande — eller køl til andre desserter.",
    ],
    intro: `**Kirsebærsovs med portvin** er den klassiske risalamande-sovs med et seriøst løft: halvdelen af væsken er god, tung rød portvin. Ruby eller LBV giver dybde uden at ødelægge den danske julestemning. Tæt på [risalamande med hvidvin](/opskrifter/risalamande-med-hvidvin) og [rødvinssirup med vanilje](/opskrifter/rodvinssirup-med-vanilje) — her er bærrene i centrum.`,
    why: `Portvinens **tørrede frugt og sødme** matcher surkirsebær bedre end bordvin alene. Alkoholen koger delvist væk; smagen bliver. Læs [vin til dessert](/guides/vin-til-dessert-og-kransekage).`,
    tips: [
      ["Maizena", "Udrør koldt — ellers klumper."],
      ["Sødme", "Port er sød; smag før du hælder al sukker i."],
      ["Bær", "Surkirsebær er klassiske. Søde friske kræver mere syre."],
      ["Make-ahead", "Lav dagen før; genvarm blidt."],
    ],
    serving: `Risalamande, vaniljeis, pandekager, chokoladekage eller ost (blåskimmel). Til [julefrokost](/guides/vin-til-julefrokost) er det et must.`,
    mistakes: [
      "For meget maizena — geleagtig sovs.",
      "At koge porten væk helt uden smag — kort simren er nok.",
      "Kun sød syltetøj som base — for sødt og «færdigt».",
      "At servere iskold til risalamande — lun er traditionen.",
    ],
    storage: `Køleskab 4–5 dage. Frys op til 2 måneder. Genvarm under omrøring; tilsæt skvæt port hvis for tyk.`,
    glass: `Ruby port, mousserende eller sød hvid — se [vin til dessert](/guides/vin-til-dessert-og-kransekage).`,
    faq: [
      ["Kan børn spise den?", "Det meste alkohol koger væk, men ikke alt. Lav en portion uden port til børnene."],
      ["Uden maizena?", "Reducér længere — eller brug 1 tsk arrowroot."],
      ["Til vildt?", "Ja, som syrlig-sød sauce til and og vildt — mindre sukker."],
    ],
  }),

  r({
    slug: "espresso-marsalasirup",
    title: "Espresso- og Marsalasirup",
    description:
      "Mørk, intens sirup af stærk kaffe og siciliansk Marsala. Opskrift til ca. 1,5 dl — til tiramisu og chokoladekage.",
    tags: ["opskrift", "dessert", "sirup", "marsala", "kaffe", "vegetar"],
    prepTime: "PT5M",
    cookTime: "PT20M",
    servings: 8,
    difficulty: "easy",
    wineInRecipe: {
      style: "Marsala — tør (secco) eller semi-secco til sirup",
      amount: "150 ml Marsala + espresso",
      note: "Marsala og espresso reduceres til mørk, intens dessert-sirup.",
    },
    wineToDrink: {
      guideSlug: "vin-til-dessert-og-kransekage",
      searchQuery: "marsala tiramisu dessert",
      searchMax: 120,
      label: "Marsala til dessert",
    },
    relatedGuides: [
      "vin-til-dessert-og-kransekage",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "100 ml frisk espresso eller meget stærk kaffe",
      "150 ml Marsala",
      "80 g sukker",
      "1 knivspids salt",
      "Evt. 1 tsk kakao eller 1/2 tsk vaniljeekstrakt",
    ],
    instructions: [
      "Hæld espresso, Marsala, sukker og salt i en lille gryde. Bring i kog under omrøring.",
      "Simr 12–18 minutter, til væsken er reduceret til ca. 1,5 dl og drypper tykt fra skeen.",
      "Rør evt. kakao eller vanilje i. Køl af — siruppen tykner.",
      "Opbevar på flaske. Dryp over dessert eller brug til at væde savoiardi.",
    ],
    intro: `**Espresso- og Marsalasirup** er den mørke, bittersøde sirup, der får tiramisu og chokoladekage til at smage af siciliansk café. Stærk kaffe og Marsala koges ind til blank, intens topping. Tæt på [tiramisu med Marsala og hvidvin](/opskrifter/tiramisu-med-marsala-og-hvidvin) — her er siruppen det selvstændige produkt, du kan have på flaske.`,
    why: `Marsala bringer **tørret frugt og oxidation**; espresso bringer bitterhed. Sammen balancerer de sukkeret. Læs [vin til dessert](/guides/vin-til-dessert-og-kransekage).`,
    tips: [
      ["Kaffe", "Ægte espresso eller mokka — ikke tynd filterkaffe."],
      ["Marsala", "Secco/semi til sirup. Meget sød dolce: mindre sukker."],
      ["Konsistens", "Skal coat'e en ske. For tynd: kog videre."],
      ["Brug", "Væd kiks til tiramisu, eller dryp over is."],
    ],
    serving: `Tiramisu, brownie, chokolademousse, vaniljeis eller i kaffedrinks. Prøv med [chokolademousse med portvin](/opskrifter/chokolademousse-med-portvin).`,
    mistakes: [
      "Tynd kaffe — vandig sirup uden punch.",
      "At koge til karamel — bitter og for tyk.",
      "At bruge kaffelikør i stedet for Marsala — anden profil (kan dog være lækkert).",
      "At hælde for meget på — overdøver desserten.",
    ],
    storage: `Køleskab 2 uger. Frys i isterninger. Ryst før brug.`,
    glass: `Marsala, vin santo eller kaffe — se [vin til dessert](/guides/vin-til-dessert-og-kransekage).`,
    faq: [
      ["Uden kaffe?", "Kun Marsala + sukker bliver en enklere marsalasirup — stadig god."],
      ["Til cocktail?", "Ja — 1–2 cl i espresso martini-agtige drinks."],
      ["Instant kaffe?", "Nødløsning: 2 tsk instant opløst i 100 ml vand. Espresso er bedre."],
    ],
  }),

  r({
    slug: "hvidvinssyltede-agurker-med-dild",
    title: "Hvidvinssyltede agurker med dildfrø",
    description:
      "Agurkesalat eller asier syltet i lage af hvidvin, hvidvinseddike og dild. Opskrift til 1–2 glas — til smørrebrød og grill.",
    tags: ["opskrift", "tilbehør", "hvidvin", "agurk", "syltet", "smørrebrød", "vegetar"],
    prepTime: "PT20M",
    cookTime: "PT10M",
    servings: 10,
    difficulty: "easy",
    wineInRecipe: {
      style: "Tør hvidvin — riesling tør, pinot blanc eller muscadet",
      amount: "150 ml hvidvin + eddike",
      note: "Agurker syltes i hvidvin og eddike — vinen er del af lagen.",
    },
    wineToDrink: {
      guideSlug: "vin-til-smorrebrod",
      searchQuery: "hvidvin smørrebrød agurk",
      searchMax: 150,
      label: "vin til smørrebrød",
    },
    relatedGuides: [
      "vin-til-smorrebrod",
      "vin-til-julefrokost",
      "vin-til-grill-og-bbq",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "2 agurker (ca. 600 g), skåret i tynde skiver eller stave",
      "1 spsk salt til udtræk",
      "150 ml tør hvidvin",
      "100 ml hvidvinseddike",
      "50 g sukker",
      "1 tsk dildfrø (eller 2 spsk frisk dild)",
      "1 tsk sennepsfrø",
      "1/2 tsk sorte peberkorn",
      "1 lille løg i tynde ringe (valgfri)",
    ],
    instructions: [
      "Bland agurk med salt i en si. Lad trække 30–45 minutter. Skyl let og dup tør.",
      "Bring vin, eddike, sukker og krydderier i kog. Simr 2 minutter. Køl lagen lidt af.",
      "Læg agurk (og løg) i steriliseret glas. Hæld lagen over, så alt er dækket.",
      "Køl mindst 4 timer, gerne natten over. Holdbare i køleskab.",
    ],
    intro: `**Hvidvinssyltede agurker med dildfrø** er den sprøde, syrlige indslag til smørrebrød, pølser og grill. Lagen bygger på hvidvin og hvidvinseddike — rundere end ren eddike-lage. Tæt på klassisk agurkesalat, men med vin i flasken og mere «syltet» holdbarhed.`,
    why: `Hvidvin giver **aroma og blødere syre** end eddike alene. Dildfrø er den danske klassiker. Læs [vin til smørrebrød](/guides/vin-til-smorrebrod).`,
    tips: [
      ["Udtræk", "Salt trækker vand — sprødere resultat."],
      ["Skære", "Tynde skiver til smørrebrød; stave til grill."],
      ["Lagen", "Skal dække. Lav mere lage ved behov (samme forhold)."],
      ["Frisk dild", "Tilføj ovenpå ved servering for aroma."],
    ],
    serving: `Leverpostej, roastbeef, [frikadeller](/guides/vin-til-frikadeller), hotdogs og ost. Perfekt til [julefrokost](/guides/vin-til-julefrokost).`,
    mistakes: [
      "At springe saltudtræk over — vandede agurker.",
      "Varm lage direkte på meget tynde skiver uden afkøling — kan blive bløde.",
      "For meget sukker — agurkesalat-slik.",
      "At bruge søde agurker uden at smage lagen til.",
    ],
    storage: `Køleskab 2–3 uger. Bliver mildere med tiden. Frys ikke.`,
    glass: `Riesling tør, grüner veltliner eller øl — se [vin til smørrebrød](/guides/vin-til-smorrebrod).`,
    faq: [
      ["Asier i stedet?", "Ja — samme lage, længere skiver, evt. mere sukker."],
      ["Uden vin?", "Brug 250 ml eddike + vand 1:1 — anden smag."],
      ["Sprødhed efter en uge?", "De blødgøres lidt. Spis inden for 2 uger for bedst crunch."],
    ],
  }),

  r({
    slug: "sherrysyltede-sennepsfro",
    title: "Sherrysyltede sennepsfrø",
    description:
      "Sennepsfrø syltet i tør sherry og sukker, så de popper i munden. Opskrift til 1 glas — crunch til leverpostej og tatar.",
    tags: ["opskrift", "tilbehør", "sherry", "sennep", "syltet", "tapas", "smørrebrød", "vegetar"],
    prepTime: "PT5M",
    cookTime: "PT15M",
    servings: 12,
    difficulty: "easy",
    wineInRecipe: {
      style: "Tør sherry — Amontillado, fino eller oloroso",
      amount: "100 ml sherry",
      note: "Sennepsfrø syltes i sherry-lage — vinen er sødme og dybde.",
    },
    wineToDrink: {
      guideSlug: "vin-til-smorrebrod",
      searchQuery: "sherry smørrebrød leverpostej",
      searchMax: 120,
      label: "vin til smørrebrød",
    },
    relatedGuides: [
      "vin-til-smorrebrod",
      "vin-til-tapas",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "80 g sennepsfrø (gule, eller blandet gul/brun)",
      "100 ml tør sherry",
      "50 ml sherryeddike eller hvidvinseddike",
      "40 g sukker",
      "1/2 tsk salt",
      "50 ml vand",
      "Evt. 1 laurbærblad",
    ],
    instructions: [
      "Bring sherry, eddike, vand, sukker, salt og laurbær i kog. Rør til sukker er opløst.",
      "Tilsæt sennepsfrø. Simr blidt 8–12 minutter, til frøene er bløde men stadig har bid (de «popper» når du bider).",
      "Fjern laurbær. Hæld på glas med lagen. Køl af.",
      "Smager bedst efter 1–2 dage. Rør før brug.",
    ],
    intro: `**Sherrysyltede sennepsfrø** er det lille crunch, der løfter leverpostej, tatar og ost. Sennepsfrøene koges i tør sherry og sukker, til de er bløde udenfor og springer i munden. Tæt på [øl- og rødvinssennep](/opskrifter/oel-rodvinssennep), men her er frøene hele — ikke blendet til sennep.`,
    why: `Sherry giver **nøddeagtig dybde**, som vand+eddike mangler. Sukker balancerer sennepsfrøenes bitterhed. Læs [vin til smørrebrød](/guides/vin-til-smorrebrod) og [vin til tapas](/guides/vin-til-tapas).`,
    tips: [
      ["Bid", "Smag undervejs — frøene skal ikke være hårde som sten, men heller ikke mos."],
      ["Blanding", "Gule = mildere; brune = skarpere."],
      ["Portion", "1 tsk ovenpå en leverpostej-mad er nok."],
      ["Lage", "Gem lagen — den er god i dressinger."],
    ],
    serving: `Leverpostej, beef tartare, røget laks, ostebord og grillpølser. Drys på [hvidvinssyltede agurker](/opskrifter/hvidvinssyltede-agurker-med-dild) for ekstra tekstur.`,
    mistakes: [
      "For kort kogning — hårde frø.",
      "For lang kogning — grød uden crunch.",
      "Cream sherry — for sødt.",
      "At bruge for meget på én gang — overdøver retten.",
    ],
    storage: `Køleskab 1–2 måneder. Bliver mildere med tiden. Frys ikke nødvendigt.`,
    glass: `Amontillado eller tør hvidvin — se [vin til smørrebrød](/guides/vin-til-smorrebrod).`,
    faq: [
      ["Er det stærkt?", "Mildt-skarpt. Brune frø er skarpere. Skyl kort for mildere version."],
      ["Kan jeg blende dem?", "Ja — så får du en grov sherry-sennep i stil med [øl-rødvinssennep](/opskrifter/oel-rodvinssennep)."],
      ["Til ost?", "Fremragende til cheddar og comté."],
    ],
  }),

  r({
    slug: "hvidvinssyltede-gronne-tomater",
    title: "Hvidvinssyltede grønne tomater",
    description:
      "Umodne grønne tomater syltet i krydret hvidvinslage med vanilje og sennepsfrø. Opskrift til 1–2 glas — klassisk til smørrebrød.",
    tags: ["opskrift", "tilbehør", "hvidvin", "tomat", "syltet", "smørrebrød", "vegetar"],
    prepTime: "PT20M",
    cookTime: "PT15M",
    servings: 10,
    difficulty: "easy",
    wineInRecipe: {
      style: "Tør, aromatisk hvidvin — riesling tør, chenin eller pinot blanc",
      amount: "200 ml hvidvin",
      note: "Grønne tomater syltes i hvidvinslage — vinen er aroma og syre.",
    },
    wineToDrink: {
      guideSlug: "vin-til-smorrebrod",
      searchQuery: "hvidvin smørrebrød syltet",
      searchMax: 150,
      label: "vin til smørrebrød",
    },
    relatedGuides: [
      "vin-til-smorrebrod",
      "vin-til-julefrokost",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "600 g grønne (umodne) tomater, i skiver eller både",
      "1 spsk salt til udtræk",
      "200 ml tør hvidvin",
      "100 ml hvidvinseddike",
      "80 g sukker",
      "1 tsk sennepsfrø",
      "1/2 vaniljestang eller 1/2 tsk vaniljepasta",
      "1 tsk sorte peberkorn",
      "1 lille løg i ringe",
      "1 knivspids chili flakes (valgfri)",
    ],
    instructions: [
      "Bland tomatskiver med salt. Lad trække 45–60 minutter i si. Dup tør.",
      "Bring vin, eddike, sukker, sennepsfrø, vanilje, peber og chili i kog. Simr 3 minutter.",
      "Læg tomat og løg i steriliseret glas. Hæld kogende lage over, så alt er dækket. Luk.",
      "Køl af. Smager bedst efter 2–3 dage i køleskab.",
    ],
    intro: `**Hvidvinssyltede grønne tomater** er sensommerens redning, når tomaterne ikke nåede at modne: syrlige, faste skiver i krydret hvidvinslage med vanilje og sennepsfrø. Klassisk til smørrebrød — den danske cousin til southern fried green tomatoes, bare syltet. Tæt på [hvidvinssyltede agurker](/opskrifter/hvidvinssyltede-agurker-med-dild) i metode, men med mere sød-syrlig dybde.`,
    why: `Hvidvin og vanilje giver **aroma**, der løfter den grønne tomats greb. Sennepsfrø tilføjer crunch og klassisk sylte-karakter. Læs [vin til smørrebrød](/guides/vin-til-smorrebrod).`,
    tips: [
      ["Tomater", "Helt grønne og faste. Halvmodne bliver bløde."],
      ["Vanilje", "Lille mængde — den skal være baggrund, ikke dessert."],
      ["Hvile", "Mindst 2 dage før servering."],
      ["Lage", "Skal dække. Pres tomaterne let ned i glasset."],
    ],
    serving: `Smørrebrød med leverpostej, ost, æg eller skinke. Også til grillpølser og cheddar-toast. Del af [julefrokost](/guides/vin-til-julefrokost)-syltebordet.`,
    mistakes: [
      "Røde, bløde tomater — bliver grød.",
      "For meget vanilje — sliksød syltning.",
      "At spise efter 1 time — smagen er ikke trukket ind.",
      "For tynd lage uden nok eddike — dårligere holdbarhed.",
    ],
    storage: `Køleskab 3–4 uger. Hold tomatene under lagen. Frys ikke.`,
    glass: `Tør riesling eller øl — se [vin til smørrebrød](/guides/vin-til-smorrebrod).`,
    faq: [
      ["Kan jeg bruge røde tomater?", "Ikke ideelt — for bløde. Grønne er pointen."],
      ["Uden vanilje?", "Ja — mere klassisk «sur-sød» syltning med kun sennep og peber."],
      ["Stege dem bagefter?", "Ja — dup tørre, vend i mel/æg/rasp og steg — southern style med vin-syltning først."],
    ],
  }),
];
