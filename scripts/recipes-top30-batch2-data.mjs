/** Data: Top 30 vinretter — batch 2 (næste 5 manglende huller). */
export const UPDATED = "2026-09-23";

export const SLUG_EXPANSIONS = {
  "kanin-i-hvidvin":
    "Bed slagteren om udskåret kanin i portioner (lår, saddel, forben). Kanin er magert — brun godt og simr under låg, så kødet ikke tørrer. Sennep tilsættes til sidst eller midtvejs, så den ikke bliver bitter.",
  "hvidvinsbraiseret-fennikel":
    "Skær fennikel i både på langs, så kernen holder bådene sammen. Brun først i smør, så tilsæt hvidvin og simr til møre. Lang simring fjerner den skarpe anissmag.",
  "gambas-al-jerez":
    "Brug store rå rejer med skal (eller uden — men skal giver mere smag i olien). Tør spansk sherry (Fino eller Manzanilla) afkoges kort — sød cream sherry hører ikke hjemme her.",
  "zuppa-di-pesce":
    "Bland fisk og skaldyr: fast hvid fisk, muslinger, rejer. Tomater og hvidvin danner basen. Tilsæt skaldyr til sidst, så de ikke bliver gummiagtige. Server med ristet brød.",
  "glaseret-skinke-med-madeirasauce":
    "Brug kogt eller røget skinke til at glasere i ovnen. Madeira reduceres med fond til blank sauce. Tør Madeira (Sercial/Verdelho) til sauce; Bual/Malmsey er for søde til hovedret.",
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
    slug: "kanin-i-hvidvin",
    title: "Lapin au Vin Blanc — kanin i hvidvin med sennep",
    description:
      "Rustik fransk kanin braiseret i tør hvidvin med sennep, skalotteløg og krydderurter. Opskrift til 4 — mørt kød og syrlig-cremet sauce.",
    tags: ["opskrift", "fransk", "kanin", "hvidvin", "sennep", "gryderet", "hovedret"],
    prepTime: "PT25M",
    cookTime: "PT75M",
    difficulty: "medium",
    wineInRecipe: {
      style: "Tør fransk hvidvin — Chablis, Sancerre, Muscadet eller Bourgogne blanc",
      amount: "400 ml hvidvin + fond",
      note: "Hvidvin braiserer kaninen sammen med sennep og urter — syre og frugt til magert kød.",
    },
    wineToDrink: {
      guideSlug: "vin-til-gryderet",
      searchQuery: "chablis sancerre kanin hvidvin",
      searchMax: 200,
      label: "vin til kanin",
    },
    relatedGuides: [
      "vin-til-gryderet",
      "vin-til-kylling-og-lyst-koed",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "1 kanin à ca. 1,2–1,4 kg, udskåret i portioner",
      "400 ml tør hvidvin (Chablis, Sancerre eller Muscadet)",
      "250 ml kyllinge- eller kalvefond",
      "3 spsk dijonsennep",
      "3 spsk creme fraiche eller fløde",
      "200 g skalotteløg, halverede",
      "3 fed hvidløg, knuste",
      "2 spsk olivenolie",
      "2 spsk smør",
      "2 kviste timian",
      "1 laurbærblad",
      "2 spsk hakket persille",
      "Salt og peber",
    ],
    instructions: [
      "Dup kaninen tør. Salt og peber. Brun i olie og smør på alle sider (5–7 min). Tag op.",
      "Brun skalotteløg og hvidløg 4–5 minutter i samme gryde.",
      "Hæld hvidvin i. Kog 3 minutter under omrøring — skrab bunden fri.",
      "Tilsæt fond, timian og laurbær. Læg kaninen tilbage. Simr under låg 50–60 minutter, til kødet er mørt.",
      "Tag kød og skalotteløg op. Rør sennep og creme fraiche i saucen. Simr 2–3 minutter uden låg. Smag til.",
      "Læg kaninen tilbage kort. Drys persille over. Server.",
    ],
    intro: `**Lapin au Vin Blanc** er den rustikke franske klassiker, hvor kanin simrer i tør hvidvin med sennep og urter. Magert kød, syrlig sauce og den samme braising-logik som [poulet à l'estragon](/opskrifter/poulet-a-lestragon) og [blanquette de veau](/opskrifter/blanquette-de-veau-med-hvidvin) — men med kaninens mildere, lidt nøddeagtige smag. Vil du have rødvin i gryden i stedet, er [coq au vin](/opskrifter/coq-au-vin) det klassiske søskende.`,
    why: `Kanin er magert og tørrer nemt. **Hvidvin** giver syre og fugt under simringen; sennep binder saucen og giver varme. Chablis, Sancerre eller Muscadet er tørre nok til ikke at søde retten. Se [vin til sauce og simren](/guides/sadan-bruger-du-vin-til-sauce-og-simren) og [vin til gryderet](/guides/vin-til-gryderet).`,
    tips: [
      ["Bruning", "God skorpe = dybere sauce. Skynd dig ikke."],
      ["Sennep", "Rør i til sidst — lang kogning kan gøre den bitter."],
      ["Mørhed", "Låret skal næsten falde fra benet. Hellere 10 min for længe."],
      ["Vin", "Drikkelig hvidvin — ikke «madlavningsvin»."],
    ],
    serving: `Server med kogte kartofler, kartoffelmos eller rustikt brød. Grøn salat ved siden af. Til fransk aften: start med [fransk løgsuppe](/opskrifter/loegsuppe-med-hvidvin).`,
    mistakes: [
      "For kort simring — sejt kød.",
      "Sød hvidvin i gryden — klaimatisk sauce.",
      "At springe bruningen over — flad smag.",
      "At koge sennep for længe — bitterhed.",
    ],
    storage: `Smager ofte bedre dagen efter. Køleskab 3 dage. Genvarm blidt i sauce. Frys op til 2 måneder.`,
    glass: `Samme stil som i gryden: Chablis, Sancerre, Muscadet — eller en let pinot noir hvis du foretrækker rød. Se [vin til gryderet](/guides/vin-til-gryderet).`,
    faq: [
      [
        "Kan jeg bruge kylling i stedet?",
        "Ja — samme teknik med kyllingelår. Se også [poulet à l'estragon](/opskrifter/poulet-a-lestragon).",
      ],
      [
        "Hvor køber jeg kanin?",
        "Slagter, specialbutik eller frost. Bed om udskåret i portioner.",
      ],
      [
        "Skal der fløde i?",
        "Creme fraiche eller fløde gør saucen rund. Du kan droppe den for en lettere version.",
      ],
      [
        "Hvilken sennep?",
        "Dijon. Grofthakket sennep fungerer også, men giv den lidt længere til at blande sig.",
      ],
    ],
  }),

  r({
    slug: "hvidvinsbraiseret-fennikel",
    title: "Hvidvinsbraiseret fennikel — mild og smørblød",
    description:
      "Fennikelbåde brunet og simret i hvidvin og smør, til den skarpe anissmag bliver mild. Opskrift til 4 — elegant tilbehør til fisk, kylling og kalv.",
    tags: ["opskrift", "tilbehør", "fennikel", "hvidvin", "vegetar", "fransk"],
    prepTime: "PT10M",
    cookTime: "PT35M",
    servings: 4,
    difficulty: "easy",
    wineInRecipe: {
      style: "Tør hvidvin — Pinot Grigio, Vermentino, Muscadet eller Chablis",
      amount: "200 ml hvidvin",
      note: "Hvidvin og smør braiserer fenniklen mør og mild — anissmagen blødgøres af syre og fedt.",
    },
    wineToDrink: {
      guideSlug: "vin-til-grillet-gront",
      searchQuery: "fennikel hvidvin pinot grigio muscadet",
      searchMax: 180,
      label: "vin til fennikel",
    },
    relatedGuides: [
      "vin-til-grillet-gront",
      "vin-til-vegetar-og-gront",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "3 store fennikelknolde",
      "200 ml tør hvidvin",
      "40 g smør",
      "1 spsk olivenolie",
      "1 fed hvidløg, knust (valgfrit)",
      "1 kvist timian eller ½ tsk fennikelfrø",
      "Salt og peber",
      "Skallen af ½ citron (valgfrit)",
    ],
    instructions: [
      "Skær fennikel i både på langs (ca. 1–1,5 cm). Bevar lidt af kernen, så bådene holder.",
      "Varm olie og halvdelen af smørret i en bred pande. Brun fennikel 4–5 minutter pr. side.",
      "Tilsæt evt. hvidløg og timian. Hæld hvidvin i. Salt og peber.",
      "Simr under låg 20–25 minutter, til fenniklen er mør. Vend forsigtigt undervejs.",
      "Tag låg af. Kog væsken ind 2–3 minutter. Pisk resten af smørret i. Smag til med citronskal.",
      "Server lune.",
    ],
    intro: `**Hvidvinsbraiseret fennikel** forvandler den skarpe anissmag til noget smørblødt og mildt. Perfekt tilbehør til [hvidvinsdampet torsk](/opskrifter/hvidvinsdampet-torsk-med-porrer-og-safran), [saltimbocca](/opskrifter/saltimbocca-alla-romana) eller [kanin i hvidvin](/opskrifter/kanin-i-hvidvin). I modsætning til [fennikelkylling med hvidvin](/opskrifter/fennikelkylling-med-hvidvin) er dette et rent tilbehør — enkelt, elegant og klar på under 45 minutter.`,
    why: `Fennikelens æteriske olier møder **hvidvinens syre** og smørrets fedt. Lang, blid braising gør knolden sød og mild uden at den bliver grød. Samme princip som andre hvidvins-grøntsager — se [vin til grillet grønt](/guides/vin-til-grillet-gront).`,
    tips: [
      ["Både med kerne", "Ellers falder fenniklen fra hinanden."],
      ["Bruning", "Gylden farve før vinen — ellers bliver smagen flad."],
      ["Vin", "Tør og mineralsk. Undgå egede Chardonnay'er."],
      ["Restvin", "Brug resten i glasset eller til fiskesauce."],
    ],
    serving: `Server til fisk, kylling, kalv eller som vegetarisk hovedret med quinoa eller polenta. Passer også til [pasta vongole](/opskrifter/pasta-vongole-med-hvidvin).`,
    mistakes: [
      "For kort tid — skarp anissmag og sej midte.",
      "For meget vin uden reduktion — vandig tallerken.",
      "At skære for tyndt — fenniklen bliver mos.",
      "Sød hvidvin — klaimatisk tilbehør.",
    ],
    storage: `Køleskab 3–4 dage. Genvarm blidt med en skvæt vin. Spises også kolde i salat. Frys ikke — teksturen lider.`,
    glass: `Match hovedretten. Til fennikel alene: Muscadet, Pinot Grigio eller Vermentino. Se [vin til vegetar](/guides/vin-til-vegetar-og-gront).`,
    faq: [
      [
        "Kan jeg bruge pastis i stedet for vin?",
        "En teskefuld pastis forstærker anis. Brug det som ekstra — ikke som erstatning for vinen.",
      ],
      [
        "Virker grøn fennikel (stilke)?",
        "Knolden er bedst til braising. Stilke og top kan bruges som urter.",
      ],
      [
        "Er retten vegansk?",
        "Erstat smør med olivenolie eller vegansk smør.",
      ],
      [
        "Hvad hvis fenniklen er meget stor?",
        "Fjern den hårde yderste kerne i midten, eller skær i tyndere både og forlæng simringen.",
      ],
    ],
  }),

  r({
    slug: "gambas-al-jerez",
    title: "Gambas al Jerez — rejer i sherry",
    description:
      "Store rejer lynstegt i olivenolie og hvidløg, afkogt med tør spansk sherry. Opskrift til 4 som tapas — klar på 15 minutter.",
    tags: ["opskrift", "spansk", "rejer", "sherry", "tapas", "hvidløg", "skaldyr"],
    prepTime: "PT10M",
    cookTime: "PT8M",
    servings: 4,
    difficulty: "easy",
    wineInRecipe: {
      style: "Tør sherry — Fino eller Manzanilla (ikke cream/sweet)",
      amount: "80–100 ml sherry",
      note: "Tør sherry afkoges i den varme olie med hvidløg — nøddeagtig dybde på få sekunder.",
    },
    wineToDrink: {
      guideSlug: "vin-til-rejer",
      searchQuery: "fino manzanilla sherry rejer albariño",
      searchMax: 200,
      label: "vin til rejer",
    },
    relatedGuides: [
      "vin-til-rejer",
      "vin-til-tapas",
      "vin-til-spansk-mad",
      "vin-til-fisk-og-skaldyr",
    ],
    ingredients: [
      "600 g store rå rejer (gerne med skal, hoved valgfrit)",
      "80–100 ml tør sherry (Fino eller Manzanilla)",
      "6 fed hvidløg i tynde skiver",
      "100 ml god olivenolie",
      "1 tsk chiliflager eller 1 tørret chili",
      "1 spsk hakket persille",
      "Salt",
      "Citronbåde til servering",
    ],
    instructions: [
      "Dup rejerne tørre. Salt let.",
      "Varm olivenolie i en bred pande eller cazuela på medium-høj varme. Steg hvidløg og chili 30–45 sekunder — må ikke brænde.",
      "Tilsæt rejerne. Steg 1–2 minutter pr. side, til de bliver lyserøde.",
      "Hæld sherry i. Lad det boble 30–60 sekunder under omrøring.",
      "Tag panden af varmen. Drys persille over. Server straks med citron og brød til at dyppe i olien.",
    ],
    intro: `**Gambas al Jerez** er den spanske tapas-klassiker, hvor rejer lynsteges i olie og hvidløg og afkoges med **tør sherry**. Tæt på vores [gambas al ajillo med hvidvin](/opskrifter/rejer-i-hvidvin), men her er det Fino eller Manzanilla, der giver den nøddeagtige, let saltede dybde. Server med [chorizo i rødvin](/opskrifter/chorizo-i-rodvin) til en fuld tapasplatte.`,
    why: `Sherry er forstærket vin fra Jerez. **Fino/Manzanilla** er tørre, friske og salte — perfekte til skaldyr. De afkoges kort, så alkoholen fordamper, og den nøddeagtige aroma sætter sig i olien. Se [vin til rejer](/guides/vin-til-rejer) og [vin til tapas](/guides/vin-til-tapas).`,
    tips: [
      ["Tør sherry", "Fino eller Manzanilla. Cream sherry gør retten sød."],
      ["Høj varme", "Rejer skal steges, ikke koges. 2–3 minutter i alt."],
      ["Hvidløg", "Gyldent, ikke brunt — brændt hvidløg ødelægger olien."],
      ["Brød", "Obligatorisk til at suge olien."],
    ],
    serving: `Tapas med brød, citron og gerne en skål [marinerede oliven](/opskrifter/marinerede-oliven-med-hvidvin). Til hovedret: fordobl mængden og server med salat.`,
    mistakes: [
      "Sød sherry — dessert-smag i tapas.",
      "Overstegte rejer — gummiagtige.",
      "Brændt hvidløg — bitter olie.",
      "For lidt olie — retten skal næsten svømme.",
    ],
    storage: `Bedst frisk. Rester 1 dag i køleskab — genvarm meget kort. Frys ikke.`,
    glass: `Samme Fino/Manzanilla i glasset, eller Albariño/Verdejo. Se [vin til rejer](/guides/vin-til-rejer) og [vin til spansk mad](/guides/vin-til-spansk-mad).`,
    faq: [
      [
        "Hvad er forskellen på Gambas al Jerez og al ajillo?",
        "Al ajillo afkoges ofte med hvidvin eller slet ikke; al Jerez bruger specifikt tør sherry.",
      ],
      [
        "Kan jeg bruge frosne rejer?",
        "Ja — tø dem helt op og dup dem meget tørre, ellers sprøjter olien.",
      ],
      [
        "Skal rejerne have skal på?",
        "Skal og gerne hoved giver mere smag. Uden skal er nemmere at spise.",
      ],
      [
        "Hvilken sherry til glasset?",
        "Samme Fino eller Manzanilla — kold. Alternativt Albariño.",
      ],
    ],
  }),

  r({
    slug: "zuppa-di-pesce",
    title: "Zuppa di Pesce — italiensk fiskesuppe med hvidvin",
    description:
      "Kraftig italiensk fiskesuppe med tomat, hvidvin, fisk og skaldyr. Opskrift til 4 — mere tomatiseret end bouillabaisse, perfekt til fest og weekend.",
    tags: ["opskrift", "italiensk", "fisk", "skaldyr", "hvidvin", "suppe", "tomat", "fest"],
    prepTime: "PT30M",
    cookTime: "PT45M",
    servings: 4,
    difficulty: "medium",
    wineInRecipe: {
      style: "Tør italiensk hvidvin — Vermentino, Pinot Grigio, Orvieto eller Soave",
      amount: "250 ml hvidvin",
      note: "Hvidvin giver syre til tomat- og skaldyrsbasen og damper muslinger åbne.",
    },
    wineToDrink: {
      guideSlug: "vin-til-fisk-og-skaldyr",
      searchQuery: "vermentino pinot grigio fiskesuppe skaldyr",
      searchMax: 200,
      label: "vin til fiskesuppe",
    },
    relatedGuides: [
      "vin-til-fisk-og-skaldyr",
      "vin-til-suppe",
      "vin-til-italiensk-mad",
      "vin-til-muslinger",
    ],
    ingredients: [
      "400 g fast hvid fisk (torsk, sej, havkat) i store tern",
      "300 g muslinger, rensede",
      "200 g rejer",
      "250 ml tør hvidvin",
      "400 g hakkede tomater",
      "2 spsk tomatpuré",
      "1 løg, finthakket",
      "2 fed hvidløg, finthakket",
      "1 selleristil i skiver",
      "1 spsk olivenolie",
      "½ tsk chiliflager",
      "1 kvist timian eller oregano",
      "5 dl fiskefond eller vand",
      "2 spsk hakket persille",
      "Salt og peber",
      "Ristet brød til servering",
    ],
    instructions: [
      "Steg løg, selleri og hvidløg i olie 6–8 minutter. Tilsæt tomatpuré og chili — rist 1 minut.",
      "Hæld hvidvin i. Kog 2–3 minutter. Tilsæt tomater, fond og timian. Simr 15 minutter.",
      "Tilsæt fisketern. Simr 5 minutter.",
      "Tilsæt muslinger og rejer. Kog under låg 4–5 minutter, til muslingerne åbner. Kassér dem der forbliver lukkede.",
      "Smag til med salt, peber og persille. Server med ristet brød.",
    ],
    intro: `**Zuppa di Pesce** er den italienske, tomatiserede fiskesuppe — kraftigere og rødere end fransk [bouillabaisse](/opskrifter/bouillabaisse-med-hvidvin), tættere på [caldeirada](/opskrifter/caldeirada-med-hvidvin) i udtrykket. Hvidvin giver syre til tomaterne og damper skaldyrene åbne. Server med brød, og du har en festret der rivaliserer [pasta vongole](/opskrifter/pasta-vongole-med-hvidvin) som skaldyrsfavorit.`,
    why: `Tomat og skaldyr er rige og salte. **Tør hvidvin** skærer igennem med syre og hjælper muslingerne med at åbne. Vermentino og Pinot Grigio er klassiske valg. Se [vin til fisk og skaldyr](/guides/vin-til-fisk-og-skaldyr) og [vin til muslinger](/guides/vin-til-muslinger).`,
    tips: [
      ["Rækkefølge", "Fisk først, skaldyr til sidst — ellers bliver rejerne gummiagtige."],
      ["Muslinger", "Kassér dem der ikke åbner."],
      ["Fond", "Fiskefond er bedst; grøntsagsfond fungerer i nødsfald."],
      ["Chili", "En smule varme løfter tomaten — ikke en curry."],
    ],
    serving: `Ristet brød gnides gerne med hvidløg. Til forret: mindre portion. Afslut med [zabaglione](/opskrifter/zabaglione-med-hvidvin).`,
    mistakes: [
      "At koge skaldyr for længe — sej tekstur.",
      "For tynd suppe — kog basen ind før fisken går i.",
      "Sød hvidvin — klaimatisk tomatbase.",
      "At glemme at rense muslinger — sand i suppen.",
    ],
    storage: `Køleskab 1–2 dage. Genvarm blidt — undgå at koge skaldyr igen. Frys basen uden skaldyr op til 1 måned; tilsæt friske skaldyr ved servering.`,
    glass: `Vermentino, Pinot Grigio, Etna Bianco — eller en let rosato. Se [vin til fisk og skaldyr](/guides/vin-til-fisk-og-skaldyr).`,
    faq: [
      [
        "Hvad er forskellen på zuppa di pesce og bouillabaisse?",
        "Bouillabaisse er provençalsk med safran og ofte uden så meget tomat. Zuppa di pesce er mere tomatiseret og italiensk.",
      ],
      [
        "Kan jeg bruge frossen fisk?",
        "Ja — tø op og dup tør. Tilsæt lidt senere end frisk, så den ikke smuldrer.",
      ],
      [
        "Skal der blæksprutte i?",
        "Valgfrit — tilsæt ringe 10 minutter før skaldyrene, så de bliver møre.",
      ],
      [
        "Hvilken vin i gryden?",
        "Tør italiensk hvidvin, du også vil drikke. Undgå egede vine.",
      ],
    ],
  }),

  r({
    slug: "glaseret-skinke-med-madeirasauce",
    title: "Glaseret skinke med Madeirasauce",
    description:
      "Ovnglaset skinke med blank sauce af portugisisk Madeira-hedvin. Opskrift til 6–8 — klassisk gæsteret til påske, jul og søndagsmiddag.",
    tags: ["opskrift", "skinke", "madeira", "hedvin", "fest", "hovedret", "påske", "jul"],
    prepTime: "PT20M",
    cookTime: "PT90M",
    servings: 8,
    difficulty: "medium",
    wineInRecipe: {
      style: "Tør til halvtør Madeira — Sercial eller Verdelho (ikke for sød Malmsey)",
      amount: "200 ml Madeira til sauce + glasur",
      note: "Madeira reduceres med fond til blank, nøddeagtig sauce og bruges i glasuren på skinken.",
    },
    wineToDrink: {
      guideSlug: "vin-til-svinekoed",
      searchQuery: "madeira skinke pinot noir riesling fest",
      searchMax: 200,
      label: "vin til skinke",
    },
    relatedGuides: [
      "vin-til-svinekoed",
      "vin-til-svinekam",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "1 kogt eller røget skinke à ca. 2–2,5 kg (gerne uden for meget lake)",
      "200 ml Madeira (Sercial eller Verdelho)",
      "3 dl okse- eller kalvefond",
      "2 spsk dijonsennep",
      "2 spsk brun farin eller honning",
      "1 spsk smør",
      "10–12 nelliker (valgfrit, til at stikke i fedtlaget)",
      "1 kvist rosmarin",
      "Peber",
    ],
    instructions: [
      "Forvarm ovn til 180 °C. Snit fedtlaget i ruder. Stik evt. nelliker i. Pensl med sennep blandet med 1 spsk Madeira og farin.",
      "Læg skinken i bradepande. Hæld 1 dl fond i bunden. Steg 50–70 minutter, pensl med glasur 2–3 gange undervejs, til skorpen er blank og gylden.",
      "Tag skinken ud og lad den hvile 15 minutter under folie.",
      "Hæld stegeskyen i en gryde. Tilsæt resten af Madeira og fond. Kog ind 8–10 minutter til blank sauce. Pisk smør i. Smag til med peber.",
      "Skær skinken i skiver. Server med Madeirasaucen.",
    ],
    intro: `**Glaseret skinke med Madeirasauce** er gæsterettens klassiker: sød-salt skorpe og en nøddeagtig sauce lavet på portugisisk hedvin. Mere festlig end hverdags-[svinekam med rødvin](/opskrifter/svinekam-med-rodvin), og et naturligt søskende til andre hedvinssaucer som [andebryst med port](/opskrifter/andebaer-portvin-sauce). Perfekt til påske, jul eller søndagsmiddag for 6–8.`,
    why: `Madeira er **oxideret hedvin** med nødde- og karamelnoter. Tørre stile (Sercial/Verdelho) giver dybde uden dessert-sødme i saucen. Reduktionen koncentrerer smagen sammen med fond. Se [vin til svinekød](/guides/vin-til-svinekoed) og [vin til sauce](/guides/sadan-bruger-du-vin-til-sauce-og-simren).`,
    tips: [
      ["Madeira-stil", "Sercial eller Verdelho til sauce. Gem Bual/Malmsey til ost/dessert."],
      ["Pensling", "Flere lag glasur = blankere skorpe."],
      ["Hvile", "15 minutter — ellers løber saften ud ved udskæring."],
      ["Saucetykkelse", "Skal coat'e en ske. For tynd: kog mere. For tyk: skvæt fond."],
    ],
    serving: `Server med kartoffelmos, [rødkål med rødvin](/opskrifter/roedkaal-med-rodvin) eller grønne bønner. Til jul: brune kartofler. Rester bliver til smørrebrød dagen efter.`,
    mistakes: [
      "Meget sød Malmsey i saucen — klaimatisk hovedret.",
      "For høj ovnvarme — brændt sukkerglasur.",
      "At springe hvilen over — tørre skiver.",
      "For salt lake-skinke uden at smage saucen til — saltbombe.",
    ],
    storage: `Skinke 4–5 dage i køleskab. Sauce 3 dage. Genvarm sauce blidt. Frys skiver med sauce op til 2 måneder.`,
    glass: `Pinot noir, Riesling med restsødme, eller en tør Madeira til aperitif. Se [vin til svinekød](/guides/vin-til-svinekoed).`,
    faq: [
      [
        "Kan jeg bruge portvin i stedet for Madeira?",
        "Ja — tør eller tawny port giver en anden, frugtigere sauce. Se også portvinsopskrifter på Vinbot.",
      ],
      [
        "Rå eller kogt skinke?",
        "Denne opskrift passer til kogt/røget skinke, der skal glases. Rå skinke kræver længere stegetid og termometer.",
      ],
      [
        "Hvor meget Madeira skal jeg købe?",
        "En halv flaske rækker til sauce og glasur. Resten drikkes til ost.",
      ],
      [
        "Kan saucen laves dagen før?",
        "Ja — genvarm blidt og pisk evt. lidt smør i lige før servering.",
      ],
    ],
  }),
];

export const GUIDE_RECIPE_ADDITIONS = {
  "vin-til-gryderet": [
    { slug: "kanin-i-hvidvin", label: "Kanin i hvidvin (Lapin au Vin Blanc)" },
  ],
  "vin-til-kylling-og-lyst-koed": [
    { slug: "kanin-i-hvidvin", label: "Kanin i hvidvin" },
  ],
  "vin-til-grillet-gront": [
    { slug: "hvidvinsbraiseret-fennikel", label: "Hvidvinsbraiseret fennikel" },
  ],
  "vin-til-vegetar-og-gront": [
    { slug: "hvidvinsbraiseret-fennikel", label: "Hvidvinsbraiseret fennikel" },
  ],
  "vin-til-rejer": [
    { slug: "gambas-al-jerez", label: "Gambas al Jerez" },
  ],
  "vin-til-tapas": [
    { slug: "gambas-al-jerez", label: "Gambas al Jerez" },
  ],
  "vin-til-spansk-mad": [
    { slug: "gambas-al-jerez", label: "Gambas al Jerez" },
  ],
  "vin-til-fisk-og-skaldyr": [
    { slug: "zuppa-di-pesce", label: "Zuppa di Pesce" },
    { slug: "gambas-al-jerez", label: "Gambas al Jerez" },
  ],
  "vin-til-suppe": [
    { slug: "zuppa-di-pesce", label: "Zuppa di Pesce" },
  ],
  "vin-til-italiensk-mad": [
    { slug: "zuppa-di-pesce", label: "Zuppa di Pesce" },
  ],
  "vin-til-muslinger": [
    { slug: "zuppa-di-pesce", label: "Zuppa di Pesce" },
  ],
  "vin-til-svinekoed": [
    { slug: "glaseret-skinke-med-madeirasauce", label: "Glaseret skinke med Madeirasauce" },
  ],
  "vin-til-svinekam": [
    { slug: "glaseret-skinke-med-madeirasauce", label: "Glaseret skinke med Madeirasauce" },
  ],
  "sadan-bruger-du-vin-til-sauce-og-simren": [
    { slug: "kanin-i-hvidvin", label: "Kanin i hvidvin" },
    { slug: "hvidvinsbraiseret-fennikel", label: "Hvidvinsbraiseret fennikel" },
    { slug: "glaseret-skinke-med-madeirasauce", label: "Glaseret skinke med Madeira" },
  ],
};
