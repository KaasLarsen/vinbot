/** Data: Vin-tilbehør batch 1 — burgere, toast & sandwiches. */
import { r } from "./add-recipes-tilbehor30-lib.mjs";

export const UPDATED = "2026-09-23";

export const SLUG_EXPANSIONS = {
  "rodvins-loegkompot":
    "Vælg store, faste rødløg — de bliver søde uden at falde helt fra hinanden. Skær i tynde halvmåner, så de karamelliserer jævnt. Brug en kraftig, frugtig rødvin (zinfandel, ripasso eller ung syrah), ikke en meget tannin-tung cabernet. Kompotten skal koges helt ind til smørbar konsistens — den er topping, ikke sauce.",
  "portvins-baconmarmelade":
    "Steg bacon til det er sprødt, men gem fedtet — det bærer smagen sammen med portvinen. Skalotteløg og hvidløg skal blødgøres i fedtet, før farin og portvin går i. Rød portvin (ruby eller tawny) giver sødme og dybde; undgå hvid port. Marmeladen er færdig, når den er tyk og blank og kan smøres på toast.",
  "hvidvins-jalapenorelish":
    "Fjern frø og membraner fra jalapeños, hvis du vil have mindre varme — eller behold dem til hotdog-niveau. Grøn peberfrugt giver fylde uden kun chili. Tør hvidvin (sauvignon blanc eller verdejo) tilfører syre; kog ind til relish-konsistens, ikke tynd sauce. Smag til med salt og evt. mere eddike til sidst.",
  "oel-rodvinssennep":
    "Gule og brune sennepsfrø trækker i øl+rødvin mindst 8 timer (gerne natten over), så frøene blødgøres. Blend kun delvist, hvis du vil have grov tekstur. Mørkt øl (porter, stout eller dunkles) og frugtig rødvin erstatter klassisk eddike+vand — smagen bliver dybere og mere «pub». Holdbarhed kræver steriliserede glas.",
  "sherry-glaseret-svampemix":
    "Bland marks-svampe og østershatte for teksturkontrast. Steg hårdt af i hold, så de bruner i stedet for at koge. Tør Amontillado eller oloroso giver nøddeagtig dybde — undgå søde cream-sherry. Reducér til blank, smørbar topping til toast eller pariserbøf.",
};

export const GUIDE_RECIPE_ADDITIONS = {
  "vin-til-burger": [
    { slug: "rodvins-loegkompot", label: "Rødvins-løgkompot" },
    { slug: "portvins-baconmarmelade", label: "Portvins-baconmarmelade" },
    { slug: "hvidvins-jalapenorelish", label: "Hvidvins-jalapeñorelish" },
    { slug: "oel-rodvinssennep", label: "Øl- og rødvinssennep" },
  ],
  "vin-til-tapas": [
    { slug: "portvins-baconmarmelade", label: "Portvins-baconmarmelade" },
    { slug: "sherry-glaseret-svampemix", label: "Sherry-glaseret svampemix" },
    { slug: "oel-rodvinssennep", label: "Øl- og rødvinssennep" },
  ],
  "vin-til-svampe": [
    { slug: "sherry-glaseret-svampemix", label: "Sherry-glaseret svampemix" },
  ],
  "sadan-bruger-du-vin-til-sauce-og-simren": [
    { slug: "rodvins-loegkompot", label: "Rødvins-løgkompot" },
    { slug: "sherry-glaseret-svampemix", label: "Sherry-glaseret svampemix" },
  ],
  "vin-til-smorrebrod": [
    { slug: "oel-rodvinssennep", label: "Øl- og rødvinssennep" },
    { slug: "hvidvins-jalapenorelish", label: "Hvidvins-jalapeñorelish" },
  ],
};

export const RECIPES = [
  r({
    slug: "rodvins-loegkompot",
    title: "Rødvins- og løgkompot — den du faldt for",
    description:
      "Rødløg langsomt karamelliseret og kogt ind med kraftig rødvin og frisk timian. Opskrift til ca. 2 glas — ultimativ burger-topping.",
    tags: ["opskrift", "tilbehør", "tapas", "rødvin", "løg", "burger", "vegetar"],
    prepTime: "PT15M",
    cookTime: "PT45M",
    servings: 8,
    difficulty: "easy",
    wineInRecipe: {
      style: "Kraftig, frugtig rødvin — zinfandel, ripasso, ung syrah eller primitivo",
      amount: "250 ml rødvin",
      note: "Rødvin koges helt ind med løgene — den er sødme, syre og farve i kompotten.",
    },
    wineToDrink: {
      guideSlug: "vin-til-burger",
      searchQuery: "zinfandel ripasso burger rødvin",
      searchMax: 180,
      label: "vin til burger",
    },
    relatedGuides: [
      "vin-til-burger",
      "sadan-bruger-du-vin-til-sauce-og-simren",
      "vin-til-grill-og-bbq",
    ],
    ingredients: [
      "4 store rødløg (ca. 700 g), skåret i tynde halvmåner",
      "250 ml kraftig rødvin",
      "2 spsk olivenolie eller smør",
      "1 spsk brun farin",
      "2 kviste frisk timian",
      "1 spsk balsamicoeddike (valgfri)",
      "Salt og friskkværnet peber",
    ],
    instructions: [
      "Varm olie i en bred gryde på middel varme. Tilsæt løg og en knivspids salt. Steg 15–20 minutter under omrøring, til løgene er bløde og gyldne.",
      "Drys farin over. Rør rundt 1 minut. Hæld rødvin i, skrab bunden fri, og tilsæt timian.",
      "Simr uden låg 20–25 minutter, til væsken er næsten kogt ind og kompotten er tyk og blank. Fjern timiankviste.",
      "Smag til med salt, peber og evt. balsamico. Køl af — den tykner yderligere.",
    ],
    intro: `**Rødvins-løgkompot** er den søde-syrlige topping, der løfter en simpel burger til noget, du husker. Rødløg karamelliseres langsomt og koges ind med kraftig rødvin og timian, til massen er smørbar og mørkerød. Tæt på [syltede rødløg med hvidvin](/opskrifter/syltede-roedloeg-med-hvidvin), men her er det den dybe, kogte kompot — ikke den sprøde syltede — du vil have på [burger med rødvinglace](/opskrifter/burger-med-rodvinsglace) eller en luksus toast.`,
    why: `Rødvinens **frugt og syre** erstatter den flade sødme fra kun sukker. Zinfandel, ripasso eller ung syrah har nok krop til at stå imod løgenes sødme uden at smage bittert. Timian binder det savoury. Læs [vin til burger](/guides/vin-til-burger) og [vin til sauce og simren](/guides/sadan-bruger-du-vin-til-sauce-og-simren).`,
    tips: [
      ["Lav varme", "Løgene skal karamellisere, ikke brænde. Sænk varmen, hvis de bliver mørke for hurtigt."],
      ["Indkogning", "Kompotten er færdig, når skeen efterlader et spor i bunden — ikke når der stadig er «suppe»."],
      ["Vinvalg", "Frugtig og kraftig — undgå meget egede, tannin-tunge vine til denne mængde."],
      ["Make-ahead", "Lav dagen før. Smagen runder, og konsistensen bliver mere smørbar."],
    ],
    serving: `Server på burgere, smash burgers, pølsehorn eller toast med gedeost. Passer også til [gedeost-crostini med skalotteløg](/opskrifter/gedeost-crostini-med-skalotteloeg) og grillkød. Til glasset: samme stil rødvin som i gryden.`,
    mistakes: [
      "For høj varme — brændte, bitre løg.",
      "For lidt indkogning — vandig topping der løber af bollen.",
      "Meget tannin-tung cabernet — bitter kompot.",
      "At glemme salt — sødme uden dybde.",
    ],
    storage: `Køleskab i steriliseret glas 1–2 uger. Frys i små portioner op til 2 måneder. Genvarm blidt eller server kold.`,
    glass: `Zinfandel, ripasso eller frugtig syrah — se [vin til burger](/guides/vin-til-burger).`,
    faq: [
      ["Kan jeg bruge gule løg?", "Ja, men rødløg giver sødere smag og flottere farve. Bland gerne."],
      ["Skal der sukker i?", "Lidt farin hjælper karamelliseringen. Justér efter vinens frugtighed."],
      ["Virker det til vegetarburger?", "Ja — kompotten er vegetarisk og er ofte det, der mangler på plant-based burgers."],
    ],
  }),

  r({
    slug: "portvins-baconmarmelade",
    title: "Portvins-baconmarmelade (bacon jam)",
    description:
      "Sprødstegt bacon, skalotteløg og hvidløg kogt ind til smørbar masse med rød portvin og brun farin. Opskrift til ca. 2 glas.",
    tags: ["opskrift", "tilbehør", "tapas", "portvin", "bacon", "burger"],
    prepTime: "PT15M",
    cookTime: "PT40M",
    servings: 10,
    difficulty: "easy",
    wineInRecipe: {
      style: "Rød portvin — ruby eller tawny (ikke hvid port)",
      amount: "150 ml portvin",
      note: "Portvin koges ind med baconfedt og løg — den er sødme og dybde i marmeladen.",
    },
    wineToDrink: {
      guideSlug: "vin-til-burger",
      searchQuery: "portvin zinfandel burger bacon",
      searchMax: 150,
      label: "vin til burger med bacon",
    },
    relatedGuides: [
      "vin-til-burger",
      "vin-til-tapas",
      "portvin-til-ost",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "300 g bacon i tern",
      "3 skalotteløg, finthakkede",
      "2 fed hvidløg, finthakkede",
      "150 ml rød portvin",
      "3 spsk brun farin",
      "1 spsk æblecidereddike eller rødvinseddike",
      "1 knivspids cayenne eller sort peber",
      "Evt. 1 spsk dijonsennep",
    ],
    instructions: [
      "Steg bacon i en kold pande på middel varme, til det er sprødt og fedtet er smeltet. Tag bacon op med hulske. Hæld det meste fedt fra — behold ca. 2 spsk i panden.",
      "Sæt skalotteløg i fedtet. Steg 5–7 minutter til bløde. Tilsæt hvidløg 1 minut.",
      "Drys farin over. Hæld portvin og eddike i. Kog under omrøring, til massen bobler og tykner (8–12 minutter).",
      "Vend bacon tilbage. Simr 5 minutter mere til blank, smørbar konsistens. Smag til med peber og evt. sennep. Køl af.",
    ],
    intro: `**Portvins-baconmarmelade** — også kaldet bacon jam — er den salte-søde smøre, der får hotdogs, burgere og ostetoast til at smage af pub-luksus. Sprødt bacon koges ind med skalotteløg, brun farin og rød portvin til en tyk, smørbar masse. Tæt på [portvinsglaserede dadler med bacon](/opskrifter/portvinsglaserede-dadler-med-bacon), men her er baconen selve produktet — ikke pynt.`,
    why: `Portvinens **sødme og tørrede frugt** balancerer baconens salt og fedt. Ruby giver frisk frugt; tawny mere nøddeagtig dybde. Eddike holder sødmen i skak. Læs [vin til burger](/guides/vin-til-burger) og [portvin til ost](/guides/portvin-til-ost).`,
    tips: [
      ["Baconfedt", "Gem 2 spsk — det er smagsbæreren. For meget fedt gør marmeladen fedtet."],
      ["Konsistens", "Den skal kunne smøres på toast, når den er kølet. For tynd: kog 5 min mere."],
      ["Hakning", "Vil du have mere «jam»: hak bacon let med kniv efter stegning, før det vendes i."],
      ["Varme", "Cayenne eller chili flakes giver et lille kick uden at stjæle showet."],
    ],
    serving: `Smør på burger, toast med cheddar, baguette med brie eller som topping på bagte kartofler. Server også til [tapas](/guides/vin-til-tapas) med oliven og nødder. Pas på salt — bacon bærer allerede meget.`,
    mistakes: [
      "At smide alt fedtet ud — flad smag.",
      "For lidt indkogning — løber af brødet.",
      "Hvid port eller sød dessertvin i stedet for rød port — forkert profil.",
      "At glemme syre — bliver slik-sød.",
    ],
    storage: `Køleskab 1 uge i lukket glas. Frys i isterningeform til portioner (op til 2 måneder). Genvarm blidt eller server stuetemperatur.`,
    glass: `Zinfandel, frugtig rød eller et lille glas tawny port — se [vin til burger](/guides/vin-til-burger).`,
    faq: [
      ["Kan jeg bruge kalkunbacon?", "Ja, men tilsæt 1 spsk olie — der er mindre fedt at stege i."],
      ["Er det det samme som bacon relish?", "Næsten — denne version er sødere og mere «jam» pga. port og farin."],
      ["Kan den steriliseres til langtidsopbevaring?", "Kort holdbarhed i køl er sikrest pga. fedtindhold. Frys hellere."],
    ],
  }),

  r({
    slug: "hvidvins-jalapenorelish",
    title: "Hvidvins- og jalapeñorelish",
    description:
      "Finthakkede jalapeños og grøn peberfrugt kogt til stærk-syrlig relish med tør hvidvin. Opskrift til ca. 2 glas — til hotdogs og spicy sandwiches.",
    tags: ["opskrift", "tilbehør", "hvidvin", "chili", "relish", "vegetar", "burger"],
    prepTime: "PT20M",
    cookTime: "PT25M",
    servings: 10,
    difficulty: "easy",
    wineInRecipe: {
      style: "Tør, syrlig hvidvin — sauvignon blanc, verdejo eller pinot grigio",
      amount: "200 ml hvidvin",
      note: "Hvidvin koges ind med chili og peber — den er syre og aroma i relishen.",
    },
    wineToDrink: {
      guideSlug: "vin-til-burger",
      searchQuery: "sauvignon blanc spicy food chili",
      searchMax: 150,
      label: "hvidvin til spicy mad",
    },
    relatedGuides: [
      "vin-til-burger",
      "vin-til-smorrebrod",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "4–5 friske jalapeños (ca. 100 g), finthakkede",
      "1 grøn peberfrugt, finthakket",
      "1 lille rødløg, finthakket",
      "200 ml tør hvidvin",
      "3 spsk hvidvinseddike",
      "2 spsk sukker",
      "1 tsk sennepsfrø",
      "1/2 tsk salt",
      "1 knivspids spidskommen (valgfri)",
    ],
    instructions: [
      "Fjern frø og membraner fra jalapeños for mildere relish — eller behold dem for mere varme. Hak peber, løg og chili fint.",
      "Bring vin, eddike, sukker, sennepsfrø, salt og spidskommen i kog i en gryde.",
      "Tilsæt grøntsagerne. Simr 15–20 minutter under omrøring, til væsken er næsten kogt ind og relishen er tyk.",
      "Smag til — mere eddike for syre, mere sukker for balance. Køl af i steriliseret glas.",
    ],
    intro: `**Hvidvins-jalapeñorelish** er det stærk-syrlige modspil til fede hotdogs, spicy kyllingesandwiches og smash burgers. Finthakket jalapeño og grøn peber koges ind med tør hvidvin, til du har en sprød-syrlig relish — ikke en blandet salsa. Hvor [rødvins-løgkompot](/opskrifter/rodvins-loegkompot) er sød og dyb, er denne lys, skarp og vågen.`,
    why: `Tør hvidvin tilfører **syre og grønne aromaer**, som eddike alene ikke giver. Sauvignon blanc og verdejo matcher chiliens friskhed. Sukker og sennepsfrø runder uden at gøre det til chutney. Læs [vin til burger](/guides/vin-til-burger).`,
    tips: [
      ["Handsker", "Brug handsker når du hakker jalapeños — og rør dig ikke i øjnene."],
      ["Varme", "Frø og membraner = mest capsaicin. Justér efter gæsterne."],
      ["Konsistens", "Relish skal kunne ligge på en pølse uden at dryppe som sauce."],
      ["Make-ahead", "Smager bedre efter 1 dag i køleskab."],
    ],
    serving: `Hotdogs, pulled chicken, tacos, cheddar-toast eller ved siden af [øl- og rødvinssennep](/opskrifter/oel-rodvinssennep). Til [smørrebrød](/guides/vin-til-smorrebrod) med leverpostej eller roastbeef som syrligt kick.`,
    mistakes: [
      "For tynd indkogning — løber af brødet.",
      "Kun chili uden peberfrugt — for skarp, for lidt fylde.",
      "Sød dessertvin i stedet for tør hvid — flad, sliksød relish.",
      "At glemme salt — smagen bliver «hul».",
    ],
    storage: `Køleskab 2–3 uger i steriliseret glas. Frys op til 2 måneder. Server kold.`,
    glass: `Sauvignon blanc, verdejo eller øl til hotdoggen — se [vin til burger](/guides/vin-til-burger).`,
    faq: [
      ["Kan jeg bruge dåsejalapeños?", "Friske er bedst. Dåse: skyl, hak, og reducer sukker lidt — de er ofte syrlige i forvejen."],
      ["Virker habanero?", "Ja, men brug færre — starten er meget højere. Bland med peberfrugt."],
      ["Er det det samme som salsa verde?", "Nej — relish er kogt ind og sød-syrlig; salsa er friskere og mere «rå»."],
    ],
  }),

  r({
    slug: "oel-rodvinssennep",
    title: "Øl- og rødvinssennep",
    description:
      "Hjemmelavet grov sennep, hvor sennepsfrøene har trukket i mørkt øl og rødvin inden de blendes. Opskrift til ca. 2 glas.",
    tags: ["opskrift", "tilbehør", "rødvin", "sennep", "øl", "tapas", "vegetar"],
    prepTime: "PT15M",
    cookTime: "PT10M",
    servings: 12,
    difficulty: "easy",
    wineInRecipe: {
      style: "Frugtig tør rødvin — grenache, merlot eller ung Côtes du Rhône (plus mørkt øl)",
      amount: "100 ml rødvin + 100 ml mørkt øl",
      note: "Sennepsfrø trækker i øl og rødvin — væsken er både lage og smag.",
    },
    wineToDrink: {
      guideSlug: "vin-til-smorrebrod",
      searchQuery: "rødvin sennep charcuteri",
      searchMax: 150,
      label: "vin til sennep og charcuteri",
    },
    relatedGuides: [
      "vin-til-smorrebrod",
      "vin-til-tapas",
      "vin-til-burger",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "80 g gule sennepsfrø",
      "40 g brune sennepsfrø",
      "100 ml mørkt øl (porter, stout eller dunkles)",
      "100 ml frugtig rødvin",
      "2 spsk æblecidereddike eller rødvinseddike",
      "1 spsk honning eller brun farin",
      "1 tsk salt",
      "Evt. 1/2 tsk gurkemeje for farve",
    ],
    instructions: [
      "Bland sennepsfrø, øl og rødvin i en skål. Dæk til og lad trække mindst 8 timer, gerne natten over, i køleskab.",
      "Hæld blanding i blender eller foodprocessor sammen med eddike, honning og salt. Blend til ønsket grovhed — korte pulse for hel-korn-agtig, længere for mere cremet.",
      "Smag til. Sennep bliver skarpere de første timer, derefter mildere. Stil i glas og lad hvile 1–2 dage i køleskab før servering for bedste smag.",
      "Opbevar koldt. Rør igennem før brug.",
    ],
    intro: `**Øl- og rødvinssennep** er hjemmelavet grov sennep med pub-dybde: sennepsfrøene trækker i mørkt øl og frugtig rødvin, før de blendes til en smørbar, kornede masse. Hvor [hvidvins-sennepsmarinade](/opskrifter/hvidvins-sennepsmarinade) er til kød, er denne sennep selv produktet — til pølser, smørrebrød og burger.`,
    why: `Øl giver **maltet sødme og bitterhed**; rødvin giver frugt og farve. Sammen erstatter de den flade vand+eddike-lage i mange hjemmelavede sennep. Hviletiden er vigtig — smagen runder. Læs [vin til smørrebrød](/guides/vin-til-smorrebrod).`,
    tips: [
      ["Trækketid", "Mindst 8 timer. For kort: hårde frø og rå smag."],
      ["Grovhed", "Blend kort for «wholegrain»; længere for mere dijon-agtig."],
      ["Skarphed", "Sennep topper i skarphed dag 1–2, derefter mildere. Smag før du serverer gæster."],
      ["Ølvalg", "Porter/stout = dyb; dunkles = rundere. Undgå meget humlede IPA — kan blive bitter."],
    ],
    serving: `Pølser, [burgere](/guides/vin-til-burger), roastbeef-smørrebrød, ostebord og grillkød. Prøv sammen med [portvins-baconmarmelade](/opskrifter/portvins-baconmarmelade) på samme toast — salt, sød og skarp.`,
    mistakes: [
      "At servere med det samme uden hvile — for skarp og «rå».",
      "Kun gule frø — mangler dybde fra brune.",
      "For meget honning — slik-sennep.",
      "At bruge oxideret vin — muggen eftersmag.",
    ],
    storage: `Køleskab 1–2 måneder i lukket glas. Frys ikke nødvendigt. Rør før brug — væske kan skille lidt.`,
    glass: `Samme frugtige rødvin som i senneppen, eller øl — se [vin til smørrebrød](/guides/vin-til-smorrebrod).`,
    faq: [
      ["Kan jeg kun bruge øl?", "Ja, men rødvinen giver ekstra frugt og farve. 200 ml øl alene fungerer."],
      ["Hvorfor er min sennep bitter?", "For humlet øl, for mange brune frø, eller for kort hvile. Tilføj lidt honning og vent en dag."],
      ["Er den stærk som dijon?", "Grov hjemmelavet er ofte skarpere først. Hvile og honning mildner."],
    ],
  }),

  r({
    slug: "sherry-glaseret-svampemix",
    title: "Sherry-glaseret svampemix",
    description:
      "Marksvampe og østershatte stegt hårdt af og kogt ind med tør sherry (Amontillado) til intens svampetopping. Opskrift til 4 — til toast og pariserbøf.",
    tags: ["opskrift", "tilbehør", "tapas", "sherry", "svampe", "vegetar", "sauce"],
    prepTime: "PT15M",
    cookTime: "PT25M",
    servings: 4,
    difficulty: "easy",
    wineInRecipe: {
      style: "Tør sherry — Amontillado eller oloroso (ikke cream)",
      amount: "120 ml sherry",
      note: "Sherry reduceres med svampene til blank, nøddeagtig glasur.",
    },
    wineToDrink: {
      guideSlug: "vin-til-svampe",
      searchQuery: "amontillado sherry svampe pinot",
      searchMax: 150,
      label: "vin til svampe",
    },
    relatedGuides: [
      "vin-til-svampe",
      "vin-til-tapas",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "250 g marks-svampe (champignon), skåret i skiver",
      "250 g østershatte, revet i strimler",
      "2 spsk olivenolie",
      "1 spsk smør",
      "2 skalotteløg, finthakkede",
      "2 fed hvidløg, finthakkede",
      "120 ml tør Amontillado eller oloroso",
      "1 tsk frisk timian",
      "1 spsk hakket persille",
      "Salt og peber",
    ],
    instructions: [
      "Varm olie på høj varme. Steg svampene i hold uden at fylde panden, til de er gyldne og væsken er fordampet. Tag op.",
      "Sænk varmen. Smelt smør, steg skalotteløg 3–4 minutter. Tilsæt hvidløg 30 sekunder.",
      "Hæld sherry i, skrab bunden fri. Kog 2–3 minutter. Vend svampene tilbage med timian.",
      "Simr 5–8 minutter, til sherryen er reduceret til blank glasur omkring svampene. Smag til, drys persille over.",
    ],
    intro: `**Sherry-glaseret svampemix** er den intense, nøddeagtige topping til pariserbøf, luksustoast og tapasbræt. Marksvampe og østershatte steges hårdt af og koges ind med tør Amontillado, til hver bid er blank og umami-tung. Tæt på [champignons al ajillo med hvidvin](/opskrifter/champignons-al-ajillo-med-hvidvin) og [svampetoast med hvidvin](/opskrifter/svampetoast-med-hvidvin-og-timian), men sherryen giver dybere, mere spansk karakter.`,
    why: `Amontillado og oloroso har **nøddeagtig oxidation**, der matcher svampenes umami bedre end frisk hvidvin. Alkoholen fordamper; smagen sætter sig. Læs [vin til svampe](/guides/vin-til-svampe) og [vin til tapas](/guides/vin-til-tapas).`,
    tips: [
      ["Brun i hold", "Fyld ikke panden — ellers koger svampene grå."],
      ["Sherry", "Tør Amontillado/oloroso. Cream sherry gør retten for sød."],
      ["Salt", "Salt først når svampene er brunet — ellers trækker de væske."],
      ["Servering", "Lun er bedst. Kold som tapas fungerer også på crostini."],
    ],
    serving: `På toast med ricotta, ved siden af pariserbøf, som topping på polenta eller til [gedeost-crostini](/opskrifter/gedeost-crostini-med-skalotteloeg). Del som tapas med [marinerede oliven med hvidvin](/opskrifter/marinerede-oliven-med-hvidvin).`,
    mistakes: [
      "Sød cream sherry — sliksød topping.",
      "At stege alle svampe på én gang — vandede.",
      "For kort reduktion — rå alkohols mag.",
      "At glemme syre/salt til sidst — flad umami.",
    ],
    storage: `Køleskab 3–4 dage. Genvarm blidt i pande med lidt smør eller sherry. Frys op til 1 måned.`,
    glass: `Amontillado i små glas, pinot noir eller rioja crianza — se [vin til svampe](/guides/vin-til-svampe).`,
    faq: [
      ["Kan jeg kun bruge champignon?", "Ja, men østershatte giver bedre tekstur. Shiitake fungerer også."],
      ["Er Fino ok?", "Fino er lettere — brug mere, og reducér længere. Amontillado er mere tilgivende."],
      ["Vegetarisk hovedret?", "Server generøst på polenta eller toast med blød ost — så er det en ret."],
    ],
  }),
];
