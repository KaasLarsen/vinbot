/** Data: 20 nye vinretter — batch 1 (første 5 huller). */
export const UPDATED = "2026-09-23";

export const SLUG_EXPANSIONS = {
  "boef-stroganoff-med-rodvin":
    "Skær oksekødet i strimler på tværs af fibrene. Brun i hold på høj varme. Rødvin reduceres godt, før fløden går i — ellers bliver saucen tynd og «rå».",
  "vildtgryde-med-portvin-og-enebaer":
    "Brug kronvildt, dåvildt eller råvildt i tern. Enebær knuses let. Portvin og fløde giver fløjlsblød dybde — simr til kødet er mørt, ikke tørt.",
  "gorgonzolasauce-med-hvidvin":
    "Reducer hvidvin først, smelt ost i fløde på lav varme. For høj varme gør saucen grynet. Server straks til steak eller kalv.",
  "hvidvinsmarineret-svinekam":
    "Marinér mindst 12 timer, gerne et døgn. Tag stegen ud 45 min før. Brug stegetermometer — ca. 65–68 °C kerne for saftig svinekam.",
  "pintxos-txakoli-chorizo":
    "Txakoli er baskisk, let mousserende hvidvin. Chorizo dampes kort i vinen, skæres og sættes på brød med tandstik — klassisk pintxo-stil.",
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
    slug: "boef-stroganoff-med-rodvin",
    title: "Boeuf Stroganoff med rødvin — cremet oksekød med svampe",
    description:
      "Klassisk stroganoff opgraderet: oksekød og svampe afkoges med kraftig rødvin, før fløden tilsættes. Opskrift til 4 — dybere end hvidvinsversionen.",
    tags: ["opskrift", "oksekød", "rødvin", "svampe", "fløde", "hovedret", "russisk"],
    prepTime: "PT20M",
    cookTime: "PT30M",
    difficulty: "medium",
    wineInRecipe: {
      style: "Kraftig frugtig rødvin — cabernet, merlot, syrah eller ung bordeaux-blend",
      amount: "2 dl rødvin",
      note: "Rødvin deglacerer panden efter bruning og reduceres, før fløden giver den cremede finish.",
    },
    wineToDrink: {
      guideSlug: "vin-til-boef-stroganoff",
      searchQuery: "stroganoff cabernet merlot pinot noir",
      searchMax: 200,
      label: "vin til stroganoff",
    },
    relatedGuides: [
      "vin-til-boef-stroganoff",
      "vin-til-oksekoed-i-sauce",
      "vin-til-oksekoed",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "600 g oksefilet eller mør culotte i strimler",
      "2 dl kraftig rødvin",
      "250 g champignon i skiver",
      "2 skalotteløg, finthakkede",
      "2 dl piskefløde",
      "1 spsk dijonsennep",
      "2 spsk smør",
      "1 spsk olivenolie",
      "1 spsk cognac (valgfrit)",
      "Salt og peber",
      "Frisk persille",
      "Ris eller tagliatelle til servering",
    ],
    instructions: [
      "Salt og peber kødet. Brun i hold i olie og smør på høj varme 1–2 minutter — tag ud (skal være rosa indeni).",
      "Steg skalotteløg og svampe 5–7 minutter, til de er gyldne.",
      "Hæld rødvin (og evt. cognac) i. Kog ind til ca. det halve under omrøring — skrab bunden fri.",
      "Tilsæt fløde og sennep. Simr 3–4 minutter til saucen coat'er en ske.",
      "Vend kødet i saucen 1 minut — må ikke koge længe. Smag til. Drys persille over.",
      "Server straks med ris eller pasta.",
    ],
    intro: `**Boeuf Stroganoff med rødvin** er den klassiske cremede oksekødsret, hvor panden koges af med kraftig rødvin, før fløden går i. Dybere og mørkere end vores [stroganoff med hvidvin](/opskrifter/boef-stroganoff-med-hvidvin) — samme teknik, anden vinprofil. Perfekt når du vil have steakhouse-agtig sauce uden at stege en hel [côte de bœuf](/opskrifter/cote-de-boeuf-med-rodvin).`,
    why: `Rødvin giver **farve, frugt og syre**, der skærer igennem fløden. Cabernet eller merlot matcher oksekødets kraft bedre end let hvidvin. Reduktionen er afgørende — ellers smager saucen af rå alkohol. Se [vin til stroganoff](/guides/vin-til-boef-stroganoff) og [vin til oksekød i sauce](/guides/vin-til-oksekoed-i-sauce).`,
    tips: [
      ["Høj varme", "Kød i hold — ellers koger det."],
      ["Reduktion", "Vin skal reduceres før fløde."],
      ["Kød til sidst", "Ellers bliver det gråt og sejt."],
      ["Sennep", "Dijon binder og giver varme uden at dominere."],
    ],
    serving: `Server med ris, tagliatelle eller kartoffelmos. Grøn salat ved siden af. Til steaksauce-stemning: se også [gorgonzolasauce med hvidvin](/opskrifter/gorgonzolasauce-med-hvidvin).`,
    mistakes: [
      "At koge kødet i fløden — sejt resultat.",
      "For lidt reduktion — tynd, rå vinsmag.",
      "For magert kød uden fedt — tørt.",
      "At bruge sød rødvin — klaimatisk sauce.",
    ],
    storage: `Køleskab 2 dage. Genvarm blidt — undgå at koge kødet igen. Frys sauce uden kød op til 1 måned.`,
    glass: `Samme stil som i gryden: merlot, cabernet eller pinot noir. Se [vin til stroganoff](/guides/vin-til-boef-stroganoff).`,
    faq: [
      [
        "Hvidvin eller rødvin?",
        "Begge virker. Rødvin er dybere; hvidvin er lettere — se [stroganoff med hvidvin](/opskrifter/boef-stroganoff-med-hvidvin).",
      ],
      [
        "Kan jeg bruge sovsekød?",
        "Filet eller mør culotte er bedst til hurtig stegning. Grydeudskæringer kræver længere simring.",
      ],
      [
        "Uden fløde?",
        "Brug creme fraiche til en syrligere, klassisk russisk finish.",
      ],
      [
        "Hvilken pasta?",
        "Bred tagliatelle eller eggehvidebånd — ris er også klassisk.",
      ],
    ],
  }),

  r({
    slug: "vildtgryde-med-portvin-og-enebaer",
    title: "Vildtgryde med portvin og enebær",
    description:
      "Rustik vildtgryde med portvin, enebær og fløde til fløjlsblød sauce. Opskrift til 4–6 — kronvildt, då eller rådyr.",
    tags: ["opskrift", "vildt", "portvin", "enebær", "gryderet", "efterår", "hovedret"],
    prepTime: "PT30M",
    cookTime: "PT120M",
    servings: 6,
    difficulty: "medium",
    wineInRecipe: {
      style: "Rød portvin — ruby eller tawny",
      amount: "2 dl portvin + fond",
      note: "Portvin og enebær braiserer vildtet; fløde afrunder saucen til sidst.",
    },
    wineToDrink: {
      guideSlug: "vin-til-vildt",
      searchQuery: "vildt pinot noir syrah portvin enebær",
      searchMax: 220,
      label: "vin til vildt",
    },
    relatedGuides: [
      "vin-til-vildt",
      "bedste-portvin",
      "vin-til-gryderet",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "1 kg vildtkød i tern (kronvildt, då eller rådyr)",
      "2 dl rød portvin",
      "4 dl vildt- eller oksefond",
      "2 dl piskefløde",
      "8–10 enebær, let knuste",
      "2 løg i båter",
      "2 gulerødder i skiver",
      "200 g champignon eller kantareller",
      "3 fed hvidløg",
      "2 spsk tomatpuré",
      "2 spsk olivenolie",
      "2 spsk smør",
      "2 kviste timian",
      "2 laurbærblade",
      "Salt og peber",
    ],
    instructions: [
      "Dup kødet tørt. Salt og peber. Brun i hold i olie og smør. Tag op.",
      "Steg løg, gulerod og svampe 8 minutter. Tilsæt hvidløg og tomatpuré — rist 1 minut.",
      "Hæld portvin i. Kog 3–4 minutter. Skrab bunden fri.",
      "Tilsæt fond, enebær, timian og laurbær. Læg kødet tilbage.",
      "Simr under låg 1½–2 timer, til kødet er mørt. Rør fløde i de sidste 10 minutter. Smag til.",
      "Fjern laurbær og timian. Server.",
    ],
    intro: `**Vildtgryde med portvin og enebær** er efterårets rustikke klassiker: mørt vildtkød i en fløjlsblød sauce, hvor portvin giver dybde og enebær den skovagtige aroma. Tættere på [svinekæber i portvinsreduktion](/opskrifter/svinekaeber-i-portvinsreduktion) end på hverdags-[mørbradgryde](/opskrifter/morbradgryde-med-hvidvin) — her er det vildtet og hedvinen, der bærer smagen.`,
    why: `Vildt er magert og intens. **Portvin** tilfører sødme og koncentration; **enebær** er den klassiske krydderi-partner. Fløde afrunder tanniner og vildtsmag. Se [vin til vildt](/guides/vin-til-vildt) og [bedste portvin](/guides/bedste-portvin).`,
    tips: [
      ["Enebær", "Knus let — hele bær er for hårde i munden."],
      ["Tid", "Hellere for længe end for kort. Mørhed er målet."],
      ["Fedt", "Brun i smør/olie — vildt mangler fedtmarmorering."],
      ["Dagen efter", "Smager ofte dybere."],
    ],
    serving: `Server med kartoffelmos, rødkål eller ovnbagte rodfrugter. Til fest: [rødkål med portvin](/opskrifter/roedkaal-med-portvin).`,
    mistakes: [
      "For kort simring — sejt kød.",
      "For mange enebær — sæbeagtig smag.",
      "At tilsætte fløde for tidligt — kan skille ved lang kogning.",
      "Meget sød dessertport i hele gryden — klaimatisk.",
    ],
    storage: `Køleskab 3–4 dage. Frys op til 3 måneder. Genvarm blidt.`,
    glass: `Pinot noir, syrah eller elegant Bourgogne — se [vin til vildt](/guides/vin-til-vildt). Lille glas tawny port efter maden.`,
    faq: [
      [
        "Hvilket vildt?",
        "Kronvildt, då eller rådyr. Oksekød kan bruges i nødsfald — smagen bliver mildere.",
      ],
      [
        "Ruby eller tawny?",
        "Ruby er frugtigere i gryden; tawny er mere nøddeagtig.",
      ],
      [
        "Kan jeg droppe fløde?",
        "Ja — kog saucen ind længere. Den bliver mere kraftig og mindre silket.",
      ],
      [
        "Enebær er for stærke?",
        "Start med 6 og smag til. De skal mærkes, ikke dominere.",
      ],
    ],
  }),

  r({
    slug: "gorgonzolasauce-med-hvidvin",
    title: "Gorgonzolasauce med hvidvin — steaksauce",
    description:
      "Kraftig steaksauce hvor gorgonzola smeltes med reduceret hvidvin og fløde. Opskrift til 4 — klar på 15 minutter.",
    tags: ["opskrift", "sauce", "gorgonzola", "hvidvin", "steak", "tilbehør", "italiensk"],
    prepTime: "PT5M",
    cookTime: "PT15M",
    servings: 4,
    difficulty: "easy",
    wineInRecipe: {
      style: "Tør hvidvin — Pinot Grigio, Soave, Chardonnay eller Verdicchio",
      amount: "1 dl hvidvin",
      note: "Hvidvin reduceres og giver syre, så den fede gorgonzola ikke bliver tung.",
    },
    wineToDrink: {
      guideSlug: "vin-til-boeff",
      searchQuery: "steak gorgonzola cabernet barolo pinot noir",
      searchMax: 200,
      label: "vin til steak",
    },
    relatedGuides: [
      "vin-til-boeff",
      "vin-til-oksefilet",
      "vin-til-blaaskimmelost",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "150 g gorgonzola (dolce eller piccante)",
      "1 dl tør hvidvin",
      "2 dl piskefløde",
      "1 spsk smør",
      "1 lille skalotteløg, finthakket (valgfrit)",
      "Friskkværnet peber",
      "Evt. 1 tsk cognac",
    ],
    instructions: [
      "Smelt smør i en lille gryde. Svits evt. skalotteløg 2 minutter.",
      "Hæld hvidvin i. Kog ind til ca. 2 spsk er tilbage (3–4 minutter).",
      "Tilsæt fløde. Simr 2–3 minutter på lav varme.",
      "Smuldr gorgonzola i. Rør til osten er smeltet — må ikke koge kraftigt.",
      "Smag til med peber (og evt. cognac). Server straks over steak.",
    ],
    intro: `**Gorgonzolasauce med hvidvin** er den ultimative steaksauce: kraftig blåskimmel smeltet med reduceret hvidvin og fløde. Hurtigere end [rødvinsauce til bøf](/opskrifter/roedvinssauce-til-boef) og et søskende til [gorgonzola-creme med portvin](/opskrifter/gorgonzola-creme-med-portvin) — her er det hvidvinens syre, der holder saucen elegant til [oksehøjreb](/opskrifter/oksehojreb-marineret-i-rodvin) eller entrecôte.`,
    why: `Gorgonzola er salt og fed. **Hvidvin** reduceret til et koncentrat giver syre og aroma uden at farve saucen mørk. Fløden binder. Se [vin til bøf](/guides/vin-til-boeff) og [vin til blåskimmel](/guides/vin-til-blaaskimmelost).`,
    tips: [
      ["Lav varme", "Ellers bliver osten grynet."],
      ["Dolce vs piccante", "Dolce er mildere; piccante er skarpere."],
      ["Reduktion", "Vin skal næsten være væk, før fløden går i."],
      ["Salt", "Osten er salt — smag før du salter."],
    ],
    serving: `Hæld over nybagt steak, kalvefilet eller grillede grøntsager. Brød til at suge. Passer også til pasta — tynd med lidt pastavand.`,
    mistakes: [
      "At koge saucen efter osten er i — grynet.",
      "For lidt reduktion — vandig og vinsmagende.",
      "For meget ost — cement-agtig.",
      "At salte blindt — for salt.",
    ],
    storage: `Køleskab 2 dage. Genvarm meget blidt under omrøring. Frys ikke.`,
    glass: `Kraftig rødvin til steaken — cabernet, Barolo eller malbec. Se [vin til oksefilet](/guides/vin-til-oksefilet).`,
    faq: [
      [
        "Kan jeg bruge anden blåskimmel?",
        "Ja — Roquefort eller dansk blue. Juster mængden efter styrke.",
      ],
      [
        "Uden fløde?",
        "Brug creme fraiche — syrligere resultat.",
      ],
      [
        "Til pasta?",
        "Ja — fortynd med pastavand til en cremet pasta sauce.",
      ],
      [
        "Portvin i stedet?",
        "Se [gorgonzola-creme med portvin](/opskrifter/gorgonzola-creme-med-portvin) — sødere profil.",
      ],
    ],
  }),

  r({
    slug: "hvidvinsmarineret-svinekam",
    title: "Hvidvinsmarineret svinekam — saftig flæskesteg",
    description:
      "Svinekam marineret et døgn i hvidvin, hvidløg og urter, stegt saftig i ovnen. Opskrift til 6 — opgraderet søndagssteg.",
    tags: ["opskrift", "svinekød", "hvidvin", "steg", "marinade", "hovedret", "søndag"],
    prepTime: "PT25M",
    cookTime: "PT90M",
    servings: 6,
    difficulty: "medium",
    wineInRecipe: {
      style: "Tør hvidvin — Riesling, Pinot Grigio, Grüner Veltliner eller Chablis",
      amount: "4 dl i marinade (del bruges til sauce)",
      note: "Hvidvin tenderiserer og krydrer svinekammen; resten bliver til let stegesauce.",
    },
    wineToDrink: {
      guideSlug: "vin-til-svinekam",
      searchQuery: "svinekam riesling pinot noir spätburgunder",
      searchMax: 200,
      label: "vin til svinekam",
    },
    relatedGuides: [
      "vin-til-svinekam",
      "vin-til-svinekoed",
      "vin-til-flaesketesteg",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "1,5–1,8 kg svinekam med eller uden svær",
      "4 dl tør hvidvin",
      "4 fed hvidløg, knuste",
      "2 kviste rosmarin",
      "4 kviste timian",
      "2 laurbærblade",
      "2 spsk olivenolie",
      "1 spsk dijonsennep",
      "1 spsk honning",
      "Salt og peber",
      "2 dl fond eller vand til bradepanden",
    ],
    instructions: [
      "Bland vin, hvidløg, urter, olie, sennep og honning. Læg svinekam i pose/skål, hæld marinade over. Køleskab 12–24 timer. Vend et par gange.",
      "Tag stegen ud 45 min før. Dup tør, salt godt (især svær). Si marinaden og gem den.",
      "Forvarm ovn til 180 °C (svær: start 200 °C 20 min, så 170 °C). Steg til kerne 65–68 °C (ca. 60–90 min).",
      "Hvil 15 minutter under folie.",
      "Hæld stegesky og siede marinade i gryde. Kog ind til sauce. Smag til.",
      "Skær og server med saucen.",
    ],
    intro: `**Hvidvinsmarineret svinekam** er søndagsstegen, der har ligget i hvidvin, hvidløg og urter et døgn. Lysere og mere aromatisk end [svinekam med rødvin](/opskrifter/svinekam-med-rodvin), og et alternativ til klassisk [flæskesteg med rødvin i brun sovs](/opskrifter/flaesketesteg-med-rodvin-i-brun-sovs) når du vil have hvidvinens syre i kødet.`,
    why: `Hvidvinens **syre** mørner overfladen og trækker urter ind. Riesling eller Grüner giver frugt uden tung eg. Marinaden bliver til sauce, så intet spildes. Se [vin til svinekam](/guides/vin-til-svinekam).`,
    tips: [
      ["Døgnmarinade", "12 timer minimum. 24 timer er bedst."],
      ["Tør før stegning", "Ellers steger sværen ikke sprød."],
      ["Termometer", "65–68 °C — over 75 °C bliver tørt."],
      ["Hvile", "15 minutter er obligatorisk."],
    ],
    serving: `Server med kartofler, [hvidvinsbraiseret fennikel](/opskrifter/hvidvinsbraiseret-fennikel) eller æblekompot. Til jul: [rødkål](/opskrifter/roedkaal-med-portvin).`,
    mistakes: [
      "For kort marinade — overfladisk smag.",
      "Overstegning — tør kam.",
      "At springe hvilen over — saften løber ud.",
      "Sød hvidvin i marinade — klaimatisk kød.",
    ],
    storage: `Køleskab 3–4 dage. Spis koldt som pålæg eller genvarm i sauce. Frys skiver 2 måneder.`,
    glass: `Riesling, Pinot Noir eller Spätburgunder — se [vin til svinekam](/guides/vin-til-svinekam) og [vin til flæskesteg](/guides/vin-til-flaesketesteg).`,
    faq: [
      [
        "Med eller uden svær?",
        "Med svær til klassisk flæskesteg-look. Uden er nemmere at marinere jævnt.",
      ],
      [
        "Kan jeg grille den?",
        "Ja — indirekte varme til samme kernetemperatur. Sauce laves på komfur.",
      ],
      [
        "Hvilken hvidvin?",
        "Tør og frisk. Undgå egede Chardonnay'er i marinaden.",
      ],
      [
        "Rødvin i stedet?",
        "Se [svinekam med rødvin](/opskrifter/svinekam-med-rodvin).",
      ],
    ],
  }),

  r({
    slug: "pintxos-txakoli-chorizo",
    title: "Pintxos med txakoli-dampet chorizo",
    description:
      "Baskiske pintxos: chorizo dampet i txakoli (let mousserende hvidvin), serveret på brød med tandstik. Opskrift til 4 som tapas.",
    tags: ["opskrift", "baskisk", "tapas", "pintxos", "chorizo", "hvidvin", "txakoli"],
    prepTime: "PT10M",
    cookTime: "PT15M",
    servings: 4,
    difficulty: "easy",
    wineInRecipe: {
      style: "Txakoli (Txakolina) — baskisk, let mousserende tør hvidvin — eller tør Vinho Verde/Albariño",
      amount: "2 dl txakoli",
      note: "Txakoli damper chorizoen og giver frisk, syrlig kontrast til den krydrede pølse.",
    },
    wineToDrink: {
      guideSlug: "vin-til-baskisk-mad",
      searchQuery: "txakoli albariño chorizo pintxos tapas",
      searchMax: 200,
      label: "vin til pintxos",
    },
    relatedGuides: [
      "vin-til-baskisk-mad",
      "vin-til-tapas",
      "vin-til-spansk-mad",
    ],
    ingredients: [
      "300 g chorizo (gerne mild eller semi-picante)",
      "2 dl txakoli (eller tør Vinho Verde/Albariño)",
      "1 baguette eller rustikt brød i skiver",
      "2 spsk olivenolie",
      "Evt. 1 fed hvidløg til at gnide brødet",
      "Frisk persille",
      "Tandstikkere",
    ],
    instructions: [
      "Skær chorizo i skiver à 1 cm (eller lad hele pølser dampe og skær efter).",
      "Varm olie i en pande. Steg chorizo 2–3 minutter. Hæld txakoli i — lad det boble og dampe 4–6 minutter, til pølsen er gennemvarm og væsken er reduceret til en let glaze.",
      "Rist brødskiver. Gnid evt. med hvidløg.",
      "Læg 1–2 skiver chorizo på hvert brød. Fastgør med tandstik. Drys persille over. Dryp med lidt af glasuren.",
      "Server straks med kold txakoli i glasset.",
    ],
    intro: `**Pintxos med txakoli-dampet chorizo** er den baskiske tapas-klassiker i miniformat: chorizo dampet i let mousserende txakoli, sat på brød med tandstik. Friskere end [chorizo i rødvin](/opskrifter/chorizo-i-rodvin), og et naturligt match til [gambas al Jerez](/opskrifter/gambas-al-jerez) på samme bord. Læs [vin til baskisk mad](/guides/vin-til-baskisk-mad).`,
    why: `Txakoli har **høj syre og let brus**, der skærer igennem chorizoens fedt og paprika. Dampen gør pølsen saftig; reduktionen bliver til glaze på brødet. Albariño eller Vinho Verde er gode erstatninger. Se [vin til tapas](/guides/vin-til-tapas).`,
    tips: [
      ["Kort damp", "Chorizo er ofte færdigstegt — den skal bare varmes og smage af vin."],
      ["Tandstik", "Det er pintxo — ikke en tapas-tallerken."],
      ["Kold vin", "Txakoli serveres iskold."],
      ["Brød", "Rustikt og ristet, så det ikke bliver blødt."],
    ],
    serving: `Tapas med oliven, ost og flere pintxos. Drik samme txakoli. Til større bord: [chorizo i rødvin](/opskrifter/chorizo-i-rodvin) som variation.`,
    mistakes: [
      "For lang kogning — tør pølse.",
      "At bruge sød hvidvin — klaimatisk.",
      "Blødt brød — vædet og kedeligt.",
      "For stærk chorizo uden brød — overvældende.",
    ],
    storage: `Bedst frisk. Rester 1 dag — genvarm chorizo kort. Frys ikke samlede pintxos.`,
    glass: `Txakoli, Albariño eller Vinho Verde — se [vin til baskisk mad](/guides/vin-til-baskisk-mad).`,
    faq: [
      [
        "Hvad er txakoli?",
        "Baskisk hvidvin, ofte let mousserende og meget tør. Findes hos specialforhandlere.",
      ],
      [
        "Uden txakoli?",
        "Brug tør Albariño eller Vinho Verde — samme princip.",
      ],
      [
        "Mild eller stærk chorizo?",
        "Mild er nemmest til gæster. Picante til dem der kan lide chili.",
      ],
      [
        "Kan det være forret?",
        "Ja — 2–3 pintxos pr. person før hovedretten.",
      ],
    ],
  }),
];

export const GUIDE_RECIPE_ADDITIONS = {
  "vin-til-boef-stroganoff": [
    { slug: "boef-stroganoff-med-rodvin", label: "Boeuf Stroganoff med rødvin" },
  ],
  "vin-til-oksekoed-i-sauce": [
    { slug: "boef-stroganoff-med-rodvin", label: "Boeuf Stroganoff med rødvin" },
  ],
  "vin-til-oksekoed": [
    { slug: "boef-stroganoff-med-rodvin", label: "Boeuf Stroganoff med rødvin" },
  ],
  "vin-til-vildt": [
    { slug: "vildtgryde-med-portvin-og-enebaer", label: "Vildtgryde med portvin og enebær" },
  ],
  "bedste-portvin": [
    { slug: "vildtgryde-med-portvin-og-enebaer", label: "Vildtgryde med portvin og enebær" },
  ],
  "vin-til-gryderet": [
    { slug: "vildtgryde-med-portvin-og-enebaer", label: "Vildtgryde med portvin" },
  ],
  "vin-til-boeff": [
    { slug: "gorgonzolasauce-med-hvidvin", label: "Gorgonzolasauce med hvidvin" },
  ],
  "vin-til-oksefilet": [
    { slug: "gorgonzolasauce-med-hvidvin", label: "Gorgonzolasauce med hvidvin" },
  ],
  "vin-til-blaaskimmelost": [
    { slug: "gorgonzolasauce-med-hvidvin", label: "Gorgonzolasauce med hvidvin" },
  ],
  "vin-til-svinekam": [
    { slug: "hvidvinsmarineret-svinekam", label: "Hvidvinsmarineret svinekam" },
  ],
  "vin-til-svinekoed": [
    { slug: "hvidvinsmarineret-svinekam", label: "Hvidvinsmarineret svinekam" },
  ],
  "vin-til-flaesketesteg": [
    { slug: "hvidvinsmarineret-svinekam", label: "Hvidvinsmarineret svinekam" },
  ],
  "vin-til-baskisk-mad": [
    { slug: "pintxos-txakoli-chorizo", label: "Pintxos med txakoli-chorizo" },
  ],
  "vin-til-tapas": [
    { slug: "pintxos-txakoli-chorizo", label: "Pintxos med txakoli-chorizo" },
  ],
  "vin-til-spansk-mad": [
    { slug: "pintxos-txakoli-chorizo", label: "Pintxos med txakoli-chorizo" },
  ],
  "sadan-bruger-du-vin-til-sauce-og-simren": [
    { slug: "boef-stroganoff-med-rodvin", label: "Stroganoff med rødvin" },
    { slug: "gorgonzolasauce-med-hvidvin", label: "Gorgonzolasauce med hvidvin" },
    { slug: "vildtgryde-med-portvin-og-enebaer", label: "Vildtgryde med portvin" },
  ],
};
