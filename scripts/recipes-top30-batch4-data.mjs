/** Data: Top 30 vinretter — batch 4 (sidste huller + valgfrie variationer). */
export const UPDATED = "2026-09-23";

export const SLUG_EXPANSIONS = {
  "sherry-trifle":
    "Vælg sød sherry (cream eller PX) til at væde lagkagebundene — tør Fino er for skarp. Byg lagene i et gennemsigtigt fad, så gæsterne kan se lagene. Køl mindst 4 timer, gerne overnight.",
  "paerer-i-hvidvin-og-safran":
    "Vælg faste pærer (Conference eller Williams). Safran udblødes i lidt varm vin før den går i pocheringsvæsken. Simr blidt — pærerne skal blive møre uden at falde fra hinanden.",
  "plommetrifli-med-rodvinssirup":
    "Kog blommerne i krydret rødvin til møre, reducer saften til sirup. Makroner eller digistive-kiks vædes let. Byg i glas — flot lagdelt efterårsdessert.",
  "hvidvinsdampet-torsk-en-papillote":
    "Pak fisk, urter, smør og hvidvin tæt i bagepapir eller folie. Dampen tilbereder fisken jævnt. Åbn forsigtigt — dampen er meget varm. Fisken er færdig, når den flager.",
  "hummerbisque-med-cognac-og-hvidvin":
    "Rist skallerne godt — det er smagen. Flambeer cognac væk fra emhætten. Si bisquen fin. Hvidvin giver syre; cognac giver dybde. Fløde til sidst, så den ikke skiller.",
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
    slug: "sherry-trifle",
    title: "Sherry Trifle — engelsk lagdessert med sød sherry",
    description:
      "Klassisk engelsk trifle med lagkage vædet i sød sherry, vaniljecreme, bær og flødeskum. Opskrift til 8 — festlig dessert der laves dagen før.",
    tags: ["opskrift", "dessert", "sherry", "engelsk", "trifle", "fest", "bær"],
    prepTime: "PT40M",
    cookTime: "PT20M",
    servings: 8,
    difficulty: "medium",
    wineInRecipe: {
      style: "Sød sherry — cream sherry eller Pedro Ximénez (PX)",
      amount: "1–1½ dl til at væde kagen",
      note: "Sød sherry væder lagkagebundene og giver nøddeagtig dybde under creme og bær.",
    },
    wineToDrink: {
      guideSlug: "bedste-dessertvin",
      searchQuery: "cream sherry pedro ximenez dessertvin",
      searchMax: 180,
      label: "dessertvin til trifle",
    },
    relatedGuides: [
      "hvad-er-sherry-vin",
      "bedste-dessertvin",
      "vin-til-dessert-og-kransekage",
    ],
    ingredients: [
      "1 lagkagebund eller 200 g savoiardi/makroner",
      "1–1½ dl sød sherry (cream eller PX)",
      "400 g blandede bær (friske eller optøede)",
      "2 spsk sukker til bær",
      "Vaniljecreme: 5 dl sødmælk, 4 æggeblommer, 80 g sukker, 3 spsk maizena, 1 vaniljestang eller 2 tsk vaniljesukker",
      "3 dl piskefløde",
      "1 spsk florsukker",
      "Evt. ristede mandelflager til pynt",
    ],
    instructions: [
      "Lav vaniljecreme: Varm mælk med vanilje. Pisk blommer, sukker og maizena. Hæld varm mælk i under piskning. Kog op under omrøring til tyk creme. Køl af med film direkte på overfladen.",
      "Læg kage/makroner i bunden af et glasfad. Dryp sherry over, til de er fugtige men ikke gennemvædet.",
      "Vend bær med sukker. Fordel over kagen.",
      "Smør den kolde creme over bærrene. Køl mindst 2 timer.",
      "Pisk fløde med florsukker til bløde toppe. Fordel over cremen. Pynt med mandler og evt. flere bær. Køl gerne overnight.",
    ],
    intro: `**Sherry Trifle** er den engelske lagdessert, hvor lagkage vædes i sød sherry og stables med vaniljecreme, bær og flødeskum. Mere festlig end [mousserende vingelé](/opskrifter/mousserende-vingele-med-friske-baer), og et søskende til [plommetrifli med rødvinssirup](/opskrifter/plommetrifli-med-rodvinssirup) — her er det sherryens nøddeagtige sødme, der bærer smagen. Læs mere om [sherry](/guides/hvad-er-sherry-vin).`,
    why: `Sød sherry (cream/PX) har **tørrede frugt- og nøddeagtige noter**, der klæder vanilje og bær. Tør Fino er for skarp til trifle. Vinen absorberes i kagen, så hver ske får lidt hedvin. Se [dessertvin](/guides/bedste-dessertvin).`,
    tips: [
      ["Ikke for våd", "Kagen skal være fugtig, ikke en sump."],
      ["Overnight", "Smager bedst dagen efter."],
      ["Gennemsigtigt fad", "Lagene er halvdelen af charmen."],
      ["PX", "Meget sød — brug lidt mindre end cream sherry."],
    ],
    serving: `Server kold i glasset eller i portionsskåle. Til jul eller nytår. Afslut med kaffe eller et lille glas samme sherry.`,
    mistakes: [
      "Tør sherry — skarp, forkert dessert.",
      "Varm creme over bær — bliver grødet.",
      "For meget sherry — kagen falder sammen.",
      "At servere med det samme — lagene har ikke sat sig.",
    ],
    storage: `Køleskab 2–3 dage. Frys ikke — creme og fløde skiller.`,
    glass: `Samme cream sherry eller PX — eller tawny port. Se [dessertvin](/guides/bedste-dessertvin).`,
    faq: [
      [
        "Kan jeg bruge portvin i stedet?",
        "Ja — ruby eller tawny. Smagen bliver frugtigere end sherry.",
      ],
      [
        "Færdig vaniljecreme?",
        "Ja i en knibe — hjemmelavet smager bedre og sætter sig finere.",
      ],
      [
        "Uden alkohol?",
        "Væd med æblejuice + vanilje. Det er en anden dessert, men lagene fungerer.",
      ],
      [
        "Hvilke bær?",
        "Jordbær, hindbær, blåbær — friske eller frosne (drænede).",
      ],
    ],
  }),

  r({
    slug: "paerer-i-hvidvin-og-safran",
    title: "Pærer i hvidvin og safran",
    description:
      "Pærer pocheret i hvidvin med safran til smukt gult, syrligt-krydret dessert. Opskrift til 4 — elegant alternativ til rødvinspærer.",
    tags: ["opskrift", "dessert", "pærer", "hvidvin", "safran", "frugt", "fest"],
    prepTime: "PT15M",
    cookTime: "PT35M",
    servings: 4,
    difficulty: "easy",
    wineInRecipe: {
      style: "Tør til halvtør hvidvin — Riesling, Chenin Blanc eller Sauvignon Blanc",
      amount: "5 dl hvidvin",
      note: "Hvidvin og safran pocherer pærerne — gul farve, syre og krydret aroma.",
    },
    wineToDrink: {
      guideSlug: "vin-til-dessert-og-kransekage",
      searchQuery: "riesling dessertvin safran pærer",
      searchMax: 180,
      label: "vin til pocherede pærer",
    },
    relatedGuides: [
      "vin-til-dessert-og-kransekage",
      "bedste-dessertvin",
    ],
    ingredients: [
      "4 faste pærer (Conference eller Williams)",
      "5 dl tør eller halvtør hvidvin",
      "80 g sukker",
      "1 knivspids safran (ca. 10–15 tråde)",
      "1 vaniljestang, flækket (eller 1 tsk vaniljesukker)",
      "Skræl af ½ citron",
      "1 spsk citronsaft",
      "Evt. creme fraiche eller vaniljeis til servering",
    ],
    instructions: [
      "Udblød safran i 2 spsk varm hvidvin 5 minutter.",
      "Skræl pærerne, behold stilken. Pensl med citronsaft, så de ikke bliver brune.",
      "Læg pærer, resten af vinen, sukker, vanilje, citronskræl og safranblandingen i en gryde. Væsken skal næsten dække.",
      "Simr under låg 25–35 minutter, til pærerne er møre (prøv med en knivspids). Vend forsigtigt undervejs.",
      "Tag pærerne op. Kog væsken ind til en let sirup (5–10 min). Hæld over pærerne. Server lune eller kolde.",
    ],
    intro: `**Pærer i hvidvin og safran** er det smukke, gule alternativ til klassiske [pærer i rødvin](/opskrifter/paerer-i-rodvin). Safran giver farve og krydret aroma; hvidvinen holder syren skarp. Lettere end [hvidvins-pærechutney](/opskrifter/hvidvins-paerechutney) — her er det dessert, ikke tilbehør til ost.`,
    why: `Safran og hvidvin er en klassisk duo (tænk bouillabaisse og risotto). Til pærer giver safran **gul farve og honningagtige noter**, mens vinen tilføjer syre, så desserten ikke bliver klaimatisk. Riesling eller Chenin passer bedst. Se [dessertvin](/guides/bedste-dessertvin).`,
    tips: [
      ["Faste pærer", "Bløde pærer falder fra hinanden."],
      ["Safran", "Lidt rækker — for meget bliver medicinsk."],
      ["Sirup", "Reducer til den coat'er en ske."],
      ["Servering", "Lune med is — temperaturkontrast."],
    ],
    serving: `Server med vaniljeis, creme fraiche eller [Moscato-sorbet](/opskrifter/moscato-dasti-sorbet). Pynt med safranstrå.`,
    mistakes: [
      "For hård kogning — mosede pærer.",
      "For meget safran — bitter.",
      "At smide siruppen ud — det er smagen.",
      "Meget egede Chardonnay — tung dessert.",
    ],
    storage: `Køleskab 3–4 dage i sirup. Server kolde eller genvarm blidt. Frys ikke.`,
    glass: `Samme stil Riesling, eller et glas Sauternes/Moscato. Se [vin til dessert](/guides/vin-til-dessert-og-kransekage).`,
    faq: [
      [
        "Kan jeg bruge rødvin i stedet?",
        "Ja — se [pærer i rødvin](/opskrifter/paerer-i-rodvin). Så mister du den gule safran-effekt.",
      ],
      [
        "Virker pærekonserves?",
        "Nej — for bløde. Brug friske, faste pærer.",
      ],
      [
        "Hvor køber jeg safran?",
        "Specialbutik eller godt supermarked. Køb tråde, ikke pulver.",
      ],
      [
        "Til ostebordet?",
        "Ja — især til blåskimmel. Eller se [hvidvins-pærechutney](/opskrifter/hvidvins-paerechutney).",
      ],
    ],
  }),

  r({
    slug: "plommetrifli-med-rodvinssirup",
    title: "Plommetrifli med rødvinssirup",
    description:
      "Efterårsdessert i glas med makroner, flødeskum og blommer kogt i krydret rødvinssirup. Opskrift til 6 — lagdelt og klar til gæster.",
    tags: ["opskrift", "dessert", "blommer", "rødvin", "trifli", "efterår", "fest"],
    prepTime: "PT25M",
    cookTime: "PT25M",
    servings: 6,
    difficulty: "easy",
    wineInRecipe: {
      style: "Frugtig rødvin — merlot, zinfandel eller ung tempranillo",
      amount: "4 dl rødvin til sirup",
      note: "Rødvin koges med sukker og krydderier til sirup, der mørner blommerne og væder makronerne.",
    },
    wineToDrink: {
      guideSlug: "vin-til-dessert-og-kransekage",
      searchQuery: "portvin dessertvin blommer rødvin",
      searchMax: 180,
      label: "vin til blommedessert",
    },
    relatedGuides: [
      "vin-til-dessert-og-kransekage",
      "bedste-dessertvin",
      "portvin-til-chokolade",
    ],
    ingredients: [
      "800 g blommer, stenet og halveret",
      "4 dl frugtig rødvin",
      "100 g sukker",
      "1 kanelstang",
      "2 nelliker",
      "1 stjerneanis (valgfrit)",
      "Skræl af ½ appelsin",
      "150 g makroner eller digestivekiks",
      "3 dl piskefløde",
      "1 spsk florsukker",
      "Evt. 2 spsk portvin ekstra til at væde",
    ],
    instructions: [
      "Kog rødvin, sukker, kanel, nelliker, stjerneanis og appelsinskræl 5 minutter. Tilsæt blommer. Simr 10–15 minutter, til de er møre men hele.",
      "Tag blommerne op. Kog saften ind til tyk sirup (5–8 min). Køl blommer og sirup.",
      "Knus makroner let. Fordel i 6 glas. Dryp med lidt sirup (og evt. port).",
      "Læg blommer over. Pisk fløde med florsukker. Fordel over. Dryp resten af siruppen over toppen.",
      "Køl mindst 1 time før servering.",
    ],
    intro: `**Plommetrifli med rødvinssirup** er efterårets lagdessert: møre blommer, krydret rødvinssirup, makroner og flødeskum. Tæt på [sherry trifle](/opskrifter/sherry-trifle) i opbygning, men med dansk efterårssmag. Server den, når blommerne er i sæson — eller brug frosne.`,
    why: `Blommer er syrlige og saftige. **Rødvin** + sukker bliver til sirup, der koncentrer frugt og krydderi. Samme princip som pocheret frugt — se [pærer i rødvin](/opskrifter/paerer-i-rodvin) og [dessertvin](/guides/bedste-dessertvin).`,
    tips: [
      ["Hele blommer", "Simr forsigtigt, så de ikke bliver grød."],
      ["Sirup", "Skal være blank og tyktflydende."],
      ["Glas", "Portioner ser flotte ud og er nemme at servere."],
      ["Frosne blommer", "Virker — lad dem tø lidt, inden de går i gryden."],
    ],
    serving: `Server kold. Pynt med ristede mandler eller et makron-smuld. Til voksenbord: lille glas port.`,
    mistakes: [
      "For tynd sirup — vandig dessert.",
      "Overkogte blommer — babymos.",
      "For søde blommer + for meget sukker — klaimatisk.",
      "At bygge med varm sirup over fløde — smelter.",
    ],
    storage: `Køleskab 2 dage. Byg gerne samme dag for sprødere makroner. Frys ikke.`,
    glass: `Tawny port eller frugtig dessertvin. Se [vin til dessert](/guides/vin-til-dessert-og-kransekage).`,
    faq: [
      [
        "Kan jeg bruge andre stenfrugter?",
        "Ja — ferskner eller nektariner om sommeren. Tilpas sukker efter sødme.",
      ],
      [
        "Uden fløde?",
        "Brug creme fraiche eller græsk yoghurt til en syrligere version.",
      ],
      [
        "Hvilken rødvin?",
        "Frugtig og ikke for tannin-tung. Restflaske er fin.",
      ],
      [
        "Forskel på trifli og trifle?",
        "Samme idé — lagdessert. Trifle er den engelske stavemåde; trifli bruges ofte på dansk.",
      ],
    ],
  }),

  r({
    slug: "hvidvinsdampet-torsk-en-papillote",
    title: "Hvidvinsdampet torsk en papillote",
    description:
      "Torsk bagt i pakke med urter, smør og hvidvin, så dampen tilbereder fisken perfekt. Opskrift til 4 — saftig, mild og næsten uden opvask.",
    tags: ["opskrift", "torsk", "hvidvin", "fisk", "papillote", "hurtig", "hovedret"],
    prepTime: "PT15M",
    cookTime: "PT20M",
    servings: 4,
    difficulty: "easy",
    wineInRecipe: {
      style: "Tør hvidvin — Muscadet, Pinot Grigio, Chablis eller Sauvignon Blanc",
      amount: "8–12 spsk (ca. 1–1½ dl i alt)",
      note: "Hvidvin skaber damp i pakken sammen med smør og urter — fisken pocherer i sin egen aroma.",
    },
    wineToDrink: {
      guideSlug: "vin-til-torsk",
      searchQuery: "torsk chablis muscadet pinot grigio",
      searchMax: 200,
      label: "vin til torsk",
    },
    relatedGuides: [
      "vin-til-torsk",
      "vin-til-fisk-og-skaldyr",
      "chardonnay-til-fisk",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "4 torskefileter à ca. 150–180 g",
      "8–12 spsk tør hvidvin",
      "40 g smør",
      "1 porre i tynde skiver (hvide/lyse dele)",
      "1 citron i tynde skiver",
      "4 kviste dild eller timian",
      "2 spsk olivenolie",
      "Salt og peber",
      "Bagepapir eller folie til 4 pakker",
    ],
    instructions: [
      "Forvarm ovn til 200 °C. Klip 4 store stykker bagepapir.",
      "Fordel porre midt på hvert papir. Læg torsk ovenpå. Salt og peber. Top med citron, urter, en klat smør og 2–3 spsk hvidvin. Dryp olie over.",
      "Fold papiret tæt til en pakke — ingen damp må slippe ud. Læg på bageplade.",
      "Bag 15–18 minutter, til fisken flager let. Åbn forsigtigt (varm damp).",
      "Server direkte i pakken eller på tallerken med saften over.",
    ],
    intro: `**Hvidvinsdampet torsk en papillote** er pakke-metoden: fisk, smør, urter og hvidvin bages tæt, så dampen gør arbejdet. Mere præcis end [torsk i hvidvin](/opskrifter/torsk-i-hvidvin) på pande, og en variation af [hvidvinsdampet torsk med porrer og safran](/opskrifter/hvidvinsdampet-torsk-med-porrer-og-safran) — her er det den individuelle pakke, der sikrer saftighed.`,
    why: `I en lukket pakke bliver hvidvin til **damp + let sauce**. Alkoholen forsvinder delvist; syren og aromaen bliver. Fisken tørrer ikke ud. Se [vin til torsk](/guides/vin-til-torsk) og [vin til fisk](/guides/vin-til-fisk-og-skaldyr).`,
    tips: [
      ["Tæt pakke", "Ellers forsvinder dampen, og fisken tørrer."],
      ["Tykkelse", "Tykkere fileter: +3–5 min."],
      ["Grøntsager", "Tynde skiver — ellers er fisken færdig før grønt."],
      ["Åbn forsigtigt", "Dampen brænder."],
    ],
    serving: `Server med kogte kartofler, [hvidvinsbraiseret fennikel](/opskrifter/hvidvinsbraiseret-fennikel) eller grøn salat. Brød til at suge saften.`,
    mistakes: [
      "Utæt pakke — tør fisk.",
      "For lang tid — kedelig, overkogt torsk.",
      "For meget vin — fisken koger i stedet for at dampe.",
      "Sød hvidvin — klaimatisk sauce.",
    ],
    storage: `Bedst frisk. Rester 1 dag i køleskab — spis kolde i salat. Frys ikke.`,
    glass: `Muscadet, Chablis, Pinot Grigio — se [vin til torsk](/guides/vin-til-torsk).`,
    faq: [
      [
        "Folie eller bagepapir?",
        "Begge virker. Bagepapir ser pænere ud ved bordet.",
      ],
      [
        "Anden fisk?",
        "Ja — laks, mørksej eller ørred. Tilpas tiden efter tykkelse.",
      ],
      [
        "Kan jeg tilsætte rejer?",
        "Ja — læg dem ovenpå de sidste 8–10 minutter, eller i egen lille pakke.",
      ],
      [
        "Uden ovn?",
        "Damp pakkerne i en dampkurv 12–15 minutter.",
      ],
    ],
  }),

  r({
    slug: "hummerbisque-med-cognac-og-hvidvin",
    title: "Hummerbisque med cognac og hvidvin",
    description:
      "Silkeblød hummerbisque hvor skallerne ristes og koges ind med cognac og hvidvin. Opskrift til 4 — ultimativ nytårsforret.",
    tags: ["opskrift", "hummer", "bisque", "cognac", "hvidvin", "suppe", "nytår", "fest", "forret"],
    prepTime: "PT30M",
    cookTime: "PT60M",
    servings: 4,
    difficulty: "medium",
    wineInRecipe: {
      style: "Tør hvidvin — Chablis, Chardonnay eller Pinot Grigio — plus cognac",
      amount: "2 dl hvidvin + 4 cl cognac",
      note: "Cognac flambeeres med skallerne; hvidvin giver syre til den cremede bisque.",
    },
    wineToDrink: {
      guideSlug: "vin-til-hummer",
      searchQuery: "hummer chablis champagne chardonnay bisque",
      searchMax: 220,
      label: "vin til hummer",
    },
    relatedGuides: [
      "vin-til-hummer",
      "vin-til-fisk-og-skaldyr",
      "champagne-til-mad",
      "chardonnay-til-fisk",
    ],
    ingredients: [
      "Skaller fra 2 hummere (eller 400 g jomfruhummerskaller) + evt. 150 g hummerkød til pynt",
      "2 dl tør hvidvin",
      "4 cl cognac",
      "1 løg, hakket",
      "1 gulerod i tern",
      "1 selleristil i skiver",
      "2 fed hvidløg",
      "2 spsk tomatpuré",
      "1 spsk olivenolie",
      "1 spsk smør",
      "1 laurbærblad",
      "1 kvist timian",
      "1 l fiskefond eller vand",
      "2 dl piskefløde",
      "Salt, peber og cayenne",
      "Evt. 1 spsk cognac ekstra til finish",
    ],
    instructions: [
      "Knus skallerne groft. Rist i olie og smør på høj varme 8–10 minutter, til de dufter og får farve.",
      "Tilsæt løg, gulerod, selleri og hvidløg — steg 5 minutter. Rør tomatpuré i 1 minut.",
      "Hæld cognac over (væk fra emhætte). Flambeer eller lad koge kraftigt 1 minut.",
      "Hæld hvidvin i. Kog 2–3 minutter. Tilsæt fond, laurbær og timian. Simr 30–40 minutter.",
      "Si fra — pres skallerne godt. Blend den siede væske glat (eller kør gennem fin si igen).",
      "Tilsæt fløde. Simr 5 minutter. Smag til med salt, peber, cayenne og evt. lidt cognac. Server med hummerkød ovenpå.",
    ],
    intro: `**Hummerbisque med cognac og hvidvin** er nytårsforrettens tungvægter: ristede skaller, flambeeret cognac og hvidvin kogt ind til en silkeblød suppe. Tæt på [hummersuppe med cognac og bobler](/opskrifter/hummersuppe-med-cognac-og-bobler), men her er fokus på klassisk bisque-teknik — skal, cognac, hvidvin, fløde. Se også [hummer i hvidvinsauce](/opskrifter/hummer-i-hvidvinsauce).`,
    why: `Skallerne rummer smagen. **Cognac** løfter de ristede noter; **hvidvin** giver syre, så fløden ikke bliver tung. Bisque er koncentration — tålmodighed belønnes. Se [vin til hummer](/guides/vin-til-hummer) og [Champagne til mad](/guides/champagne-til-mad).`,
    tips: [
      ["Rist skallerne", "Uden farve = flad bisque."],
      ["Pres godt", "Meget smag sidder i skallerne ved sining."],
      ["Fløde til sidst", "Ellers kan den skille ved lang kogning."],
      ["Resteskaller", "Gem fra en hummermiddag — perfekt næste dag."],
    ],
    serving: `Server i varme skåle med lidt hummerkød, creme fraiche og dild. Brød ved siden af. Til nytår: start her, gå videre til [côte de bœuf](/opskrifter/cote-de-boeuf-med-rodvin).`,
    mistakes: [
      "At springe ristningen over — kedelig smag.",
      "For meget cayenne — maskerer hummer.",
      "At blende skalstykker med i — sandet tekstur (si altid).",
      "For tynd — kog ind før fløden.",
    ],
    storage: `Køleskab 2 dage. Genvarm blidt uden at koge. Frys uden fløde op til 1 måned; tilsæt fløde ved genvarmning.`,
    glass: `Chablis, hvid Bourgogne eller Champagne — se [vin til hummer](/guides/vin-til-hummer).`,
    faq: [
      [
        "Kan jeg bruge jomfruhummer?",
        "Ja — skallerne fungerer fint. Se også [grillede jomfruhummere](/opskrifter/grillede-jomfruhummere-med-hvidloegssmoer).",
      ],
      [
        "Uden flambeering?",
        "Lad cognac koge kraftigt 1–2 minutter i gryden — alkoholen fordamper alligevel.",
      ],
      [
        "Er bisque det samme som hummersuppe?",
        "Bisque er typisk mere koncentreret og silket via skal + si. Suppe kan være lettere.",
      ],
      [
        "Kan jeg droppe fløde?",
        "Ja — mere bouillabaisse-agtig. Smør en klat i til gloss.",
      ],
    ],
  }),
];

export const GUIDE_RECIPE_ADDITIONS = {
  "hvad-er-sherry-vin": [
    { slug: "sherry-trifle", label: "Sherry Trifle" },
  ],
  "bedste-dessertvin": [
    { slug: "sherry-trifle", label: "Sherry Trifle" },
    { slug: "paerer-i-hvidvin-og-safran", label: "Pærer i hvidvin og safran" },
    { slug: "plommetrifli-med-rodvinssirup", label: "Plommetrifli med rødvinssirup" },
  ],
  "vin-til-dessert-og-kransekage": [
    { slug: "sherry-trifle", label: "Sherry Trifle" },
    { slug: "paerer-i-hvidvin-og-safran", label: "Pærer i hvidvin og safran" },
    { slug: "plommetrifli-med-rodvinssirup", label: "Plommetrifli med rødvinssirup" },
  ],
  "portvin-til-chokolade": [
    { slug: "plommetrifli-med-rodvinssirup", label: "Plommetrifli med rødvinssirup" },
  ],
  "vin-til-torsk": [
    { slug: "hvidvinsdampet-torsk-en-papillote", label: "Hvidvinsdampet torsk en papillote" },
  ],
  "vin-til-fisk-og-skaldyr": [
    { slug: "hvidvinsdampet-torsk-en-papillote", label: "Torsk en papillote" },
    { slug: "hummerbisque-med-cognac-og-hvidvin", label: "Hummerbisque" },
  ],
  "chardonnay-til-fisk": [
    { slug: "hvidvinsdampet-torsk-en-papillote", label: "Torsk en papillote" },
    { slug: "hummerbisque-med-cognac-og-hvidvin", label: "Hummerbisque" },
  ],
  "vin-til-hummer": [
    { slug: "hummerbisque-med-cognac-og-hvidvin", label: "Hummerbisque med cognac og hvidvin" },
  ],
  "champagne-til-mad": [
    { slug: "hummerbisque-med-cognac-og-hvidvin", label: "Hummerbisque" },
  ],
  "sadan-bruger-du-vin-til-sauce-og-simren": [
    { slug: "hvidvinsdampet-torsk-en-papillote", label: "Torsk en papillote" },
    { slug: "hummerbisque-med-cognac-og-hvidvin", label: "Hummerbisque" },
  ],
};
