/** Data: Top 30 vinretter — batch 1 (første 5 manglende huller). */
export const UPDATED = "2026-09-23";

export const SLUG_EXPANSIONS = {
  "svampe-bourguignon":
    "Brug en blanding af champignon, portobello og gerne lidt shiitake eller kantarel. Brun svampene i hold, så de karamelliserer i stedet for at koge i egen saft. Pearl onions (små skalotteløg) er klassiske; almindelige skalotteløg i kvarte fungerer også.",
  "oksehojreb-marineret-i-rodvin":
    "Højreb er en stor, smagfuld stegekød-udskæring med fedtmarmorering. Marinér mindst 8 timer, gerne natten over. Tag stegen ud af køleskab 45–60 min før stegning. Brug stegetermometer — 54–56 °C kerne for rosa medium-rare.",
  "balsamico-rodvinsglaserede-skalotteloeg":
    "Vælg jævnstore skalotteløg, så de bliver færdige samtidig. Brun dem først i smør, så tilsæt vin og balsamico og reducér til blank glasur. De er tilbehør — server til bøf, steg eller ost.",
  "saltimbocca-alla-romana":
    "Slå kalvekoteletterne tynde (ca. 5 mm). Fastgør salvie og parma med tandstikker. Steg kort på høj varme — retten hedder «hopper i munden» fordi den er klar på få minutter. Afkog panden med tør hvidvin.",
  "chicken-marsala":
    "Brug tør Marsala (secco), ikke sød dessert-Marsala. Bank kyllingebryst fladt til jævn tykkelse. Svampe brunnes godt før vinen går i. Sauce reduceres til den coat'er en ske.",
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
    slug: "svampe-bourguignon",
    title: "Svampe Bourguignon — vegetarisk rødvinsgryde",
    description:
      "Den vegetariske storebror til Boeuf Bourguignon: blandede svampe simret i pinot noir med skalotteløg, gulerødder og urter. Opskrift til 4 — rig umami og dyb rødvinssauce.",
    tags: ["opskrift", "fransk", "vegetar", "svampe", "rødvin", "gryderet", "hovedret", "bourgogne"],
    prepTime: "PT25M",
    cookTime: "PT55M",
    difficulty: "medium",
    wineInRecipe: {
      style: "Pinot noir, Bourgogne rouge eller let Côtes du Rhône — frugtig, ikke for tannin-tung",
      amount: "500 ml rødvin + fond",
      note: "Rødvin braiserer svampene og giver farve, syre og dybde — samme princip som klassisk bourguignon.",
    },
    wineToDrink: {
      guideSlug: "vin-til-svampe",
      searchQuery: "pinot noir bourgogne vegetar svampe",
      searchMax: 200,
      label: "vin til svampe",
    },
    relatedGuides: [
      "vin-til-svampe",
      "vin-til-bourgogne-mad",
      "vin-til-vegetar-og-gront",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "800 g blandede svampe (champignon, portobello, evt. shiitake/kantarel)",
      "500 ml pinot noir eller Bourgogne rouge",
      "250 ml grøntsagsfond",
      "200 g små skalotteløg (pearl onions) eller 6–8 skalotteløg i kvarte",
      "2 gulerødder i skiver",
      "3 fed hvidløg, finthakket",
      "2 spsk tomatpuré",
      "2 spsk olivenolie",
      "2 spsk smør",
      "1 spsk mel",
      "2 kviste timian",
      "1 laurbærblad",
      "1 spsk hakket persille",
      "Salt og peber",
      "Brød, kartoffelmos eller polenta til servering",
    ],
    instructions: [
      "Rens svampene og skær store i halvdele eller kvarte. Brun i hold i olie på høj varme, til de er gyldne. Salt let og tag op.",
      "Sænk varmen. Smelt smør, brun skalotteløg og gulerødder 6–8 minutter. Tilsæt hvidløg og tomatpuré — rist 1 minut.",
      "Drys mel over, rør rundt. Hæld rødvin i under omrøring. Kog 3–4 minutter og skrab bunden fri.",
      "Tilsæt fond, timian og laurbær. Læg svampene tilbage. Simr uden låg 25–35 minutter, til saucen er blank og koncentreret.",
      "Smag til med salt og peber. Fjern laurbær og timiankviste. Drys persille over.",
      "Server med brød, kartoffelmos eller cremet polenta.",
    ],
    intro: `**Svampe Bourguignon** er den vegetariske storebror til klassisk [Boeuf Bourguignon](/opskrifter/boeuf-bourguignon): samme rødvinsdybde, samme blanke sauce — men med svampenes umami i stedet for oksekød. Perfekt til gæster, der vil have en «stor» ret uden kød, og til dig der allerede elsker [risotto al Barolo](/opskrifter/risotto-med-rodvin-barolo) eller [svampetoast med hvidvin](/opskrifter/svampetoast-med-hvidvin-og-timian). Vinen er **i gryden**, ikke kun i glasset.`,
    why: `Svampe er rige på umami, men mangler fedt og collagen fra kød. **Pinot noir** og let Bourgogne giver syre, frugt og farve uden hårde tanniner, der kan smage bitre i en vegetarisk sauce. Vinen reduceres sammen med fond, så alkoholen fordamper og smagen sætter sig. Se [vin til svampe](/guides/vin-til-svampe) og [vin til sauce og simren](/guides/sadan-bruger-du-vin-til-sauce-og-simren).`,
    tips: [
      ["Brun i hold", "Fyld ikke panden — ellers koger svampene i stedet for at karamellisere."],
      ["Vinvalg", "Ung pinot eller lokal Bourgogne rouge er nok. Gem fin Premier Cru til glasset."],
      ["Saucetykkelse", "Simr uden låg til saucen coat'er en ske. For tynd: kog 5 min mere."],
      ["Svampeblanding", "Mindst to typer — champignon alene bliver ensformig."],
    ],
    serving: `Server med kartoffelmos, cremet polenta eller rustikt brød. Til festmenu: start med [gedeost-crostini med skalotteløg](/opskrifter/gedeost-crostini-med-skalotteloeg) og drik samme stil pinot i glasset. Vil du have kødvarianten, se [Boeuf Bourguignon](/opskrifter/boeuf-bourguignon).`,
    mistakes: [
      "For tannin-tung cabernet i gryden — bitter vegetarisk sauce.",
      "At stege alle svampe på én gang — de bliver grå og vandede.",
      "For kort reduktion — tynd, «rå» vinsmag.",
      "At glemme salt undervejs — umami kræver balance.",
    ],
    storage: `Smager ofte bedre dagen efter. Køleskab 3–4 dage. Genvarm blidt med lidt fond eller vand. Frys op til 2 måneder.`,
    glass: `Pinot noir, Bourgogne rouge eller elegant Côtes du Rhône — se [vin til svampe](/guides/vin-til-svampe) og [vin til Bourgogne-mad](/guides/vin-til-bourgogne-mad).`,
    faq: [
      [
        "Kan jeg bruge tørrede svampe?",
        "Ja — udblød 20–30 g tørrede porcini i varmt vand, si og brug blødevandet som del af fonden. Giver ekstra dybde.",
      ],
      [
        "Er retten vegansk?",
        "Erstat smør med olie eller vegansk smør. Resten er plantebaseret.",
      ],
      [
        "Hvilken rødvin skal i gryden?",
        "Noget du gerne vil drikke: pinot noir, Bourgogne rouge eller let Rhône. Undgå meget egede, tannin-tunge vine.",
      ],
      [
        "Hvad serverer jeg til?",
        "Kartoffelmos, polenta eller godt brød. Til glasset: samme stil som i gryden — se partnerforslagene på siden.",
      ],
    ],
  }),

  r({
    slug: "oksehojreb-marineret-i-rodvin",
    title: "Oksehøjreb marineret i rødvin — luksus weekendsteg",
    description:
      "Oksehøjreb sprængt og mørnet i krydret rødvinsmarinade, stegt rosa i ovnen. Opskrift til 6 — weekendsteg med dyb marinade og kraftig sauce.",
    tags: ["opskrift", "oksekød", "rødvin", "steg", "fest", "hovedret", "weekend"],
    prepTime: "PT30M",
    cookTime: "PT75M",
    servings: 6,
    difficulty: "medium",
    wineInRecipe: {
      style: "Kraftig rødvin — cabernet sauvignon, syrah, malbec eller ung bordeaux-blend",
      amount: "500 ml i marinade (del bruges til sauce)",
      note: "Rødvin tenderiserer og krydrer højreben; resten reduceres til sauce efter stegning.",
    },
    wineToDrink: {
      guideSlug: "vin-til-oksekoed",
      searchQuery: "oksehøjreb cabernet syrah malbec steak",
      searchMax: 220,
      label: "vin til oksehøjreb",
    },
    relatedGuides: [
      "vin-til-oksekoed",
      "vin-til-roastbeef",
      "vin-til-ribeye",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "1,5–1,8 kg oksehøjreb i ét stykke",
      "500 ml kraftig rødvin (cabernet, syrah eller malbec)",
      "4 fed hvidløg, knust",
      "2 kviste rosmarin",
      "4 kviste timian",
      "2 laurbærblade",
      "1 spsk sorte peberkorn, let knuste",
      "2 spsk olivenolie",
      "1 spsk dijonsennep",
      "1 spsk mørk sirup eller honning",
      "2 spsk smør",
      "200 ml oksefond",
      "Salt og peber",
    ],
    instructions: [
      "Bland vin, hvidløg, rosmarin, timian, laurbær, peberkorn, olie, sennep og sirup. Læg højreben i en pose eller skål, hæld marinade over, og stil i køleskab 8–24 timer. Vend et par gange.",
      "Tag stegen ud 45–60 min før. Tag op af marinaden, dup tør, salt og peber godt. Si marinaden og gem den.",
      "Forvarm ovn til 180 °C. Brun stegen på alle sider i varm pande med lidt olie (2–3 min pr. side).",
      "Overfør til bradepande. Steg til kerne 54–56 °C (ca. 45–65 min afhængigt af tykkelse). Hvil 15–20 min under folie.",
      "Hæld den siede marinade og fond i panden. Kog ind til blank sauce. Pisk smør i. Smag til.",
      "Skær højreben i skiver på tværs af fibrene. Server med saucen.",
    ],
    intro: `**Oksehøjreb marineret i rødvin** er weekendstegen, der mørnes i krydret rødvin før den steges rosa. Højreb har mere karakter end mørbrad og mere kød end [côte de bœuf](/opskrifter/cote-de-boeuf-med-rodvin) — ideel til 6 personer. Tæt på [entrecôte med rødvinsmarinade](/opskrifter/entrecote-med-rodvinsmarinade) og [balsamico-rødvinsmarineret oksemørbrad](/opskrifter/balsamico-rodvinsmarineret-oksemoerbrad), men her er det den store stegs fedtmarmorering og lange marinade, der bærer smagen.`,
    why: `Rødvinens **syre og alkohol** hjælper med at mørne overfladen og trække krydderier ind. Cabernet, syrah eller malbec matcher højrebens kraft — let pinot bliver væk. Efter stegning bliver marinaden til sauce, så intet går til spilde. Læs [vin til oksekød](/guides/vin-til-oksekoed) og [vin til roastbeef](/guides/vin-til-roastbeef).`,
    tips: [
      ["Termometer", "54–56 °C for rosa; 58–60 °C for medium. Tag ud 2 °C før — temperaturen stiger under hvile."],
      ["Marinade", "Mindst 8 timer. Overnight er bedst. Længere end 24 timer kan gøre overfladen «grødet»."],
      ["Bruning", "Høj varme, tørt kød — ellers steger du ikke, du koger."],
      ["Skæring", "Altid på tværs af fibrene, ellers bliver skiverne seje."],
    ],
    serving: `Server med ovnbagte kartofler, [balsamico-rødvinsglaserede skalotteløg](/opskrifter/balsamico-rodvinsglaserede-skalotteloeg) og grøn salat. Til gæstemenu: start med [fransk løgsuppe](/opskrifter/loegsuppe-med-hvidvin).`,
    mistakes: [
      "For kort marinade — overfladisk smag.",
      "At stege direkte fra køleskab — ujævn kernetemperatur.",
      "At springe hvilen over — saften løber ud på skærebrættet.",
      "At bruge hele marinaden uden at si — brændte urter i saucen.",
    ],
    storage: `Skåret kød 2–3 dage i køleskab. Sauce 3 dage. Spis koldt som roastbeef-agtige skiver eller genvarm blidt i sauce. Frys skiver med sauce op til 2 måneder.`,
    glass: `Cabernet, syrah, malbec eller kraftig Rioja — se [vin til oksekød](/guides/vin-til-oksekoed) og [vin til ribeye](/guides/vin-til-ribeye).`,
    faq: [
      [
        "Hvad er forskellen på højreb og culotte?",
        "Højreb er en større stegekød-udskæring med mere marmorering; culotte er mindre og ofte stegt som hel culottesteg. Begge tåler rødvinsmarinade.",
      ],
      [
        "Kan jeg grille højreben?",
        "Ja — brun først, stegt færdig indirekte på grillen til samme kernetemperatur. Marinaden bruges stadig til sauce på komfur.",
      ],
      [
        "Hvilken vin i marinaden?",
        "Samme stil du drikker til: cabernet, syrah eller malbec. Undgå meget sød eller defekt vin.",
      ],
      [
        "Hvor længe skal den hvile?",
        "Mindst 15 minutter under løst folie — ellers mister du saft ved udskæring.",
      ],
    ],
  }),

  r({
    slug: "balsamico-rodvinsglaserede-skalotteloeg",
    title: "Balsamico- og rødvinsglaserede skalotteløg",
    description:
      "Skalotteløg brunet og glaseret i rødvin og balsamico til syrligt-sødt tilbehør. Opskrift til 4 — perfekt til bøf, steg og ostebordet.",
    tags: ["opskrift", "tilbehør", "skalotteløg", "rødvin", "balsamico", "vegetar", "sauce"],
    prepTime: "PT15M",
    cookTime: "PT30M",
    servings: 4,
    difficulty: "easy",
    wineInRecipe: {
      style: "Frugtig tør rødvin — merlot, grenache eller ung Côtes du Rhône",
      amount: "200 ml rødvin + balsamico",
      note: "Rødvin og balsamico reduceres til blank, syrligt-sød glasur omkring skalotteløgene.",
    },
    wineToDrink: {
      guideSlug: "vin-til-boeff",
      searchQuery: "bøf merlot cotes du rhone skalotteløg",
      searchMax: 180,
      label: "vin til bøf",
    },
    relatedGuides: [
      "vin-til-boeff",
      "vin-til-oksekoed",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "500 g skalotteløg (gerne jævnstore)",
      "200 ml frugtig rødvin",
      "3 spsk balsamicoeddike (gerne aceto balsamico)",
      "2 spsk smør",
      "1 spsk olivenolie",
      "1 spsk brun farin eller honning",
      "2 kviste timian",
      "1 fed hvidløg, knust (valgfrit)",
      "Salt og peber",
    ],
    instructions: [
      "Skræl skalotteløgene. Lad små hele; skær store i halvdele på langs.",
      "Varm smør og olie i en bred pande. Brun skalotteløgene 8–10 minutter under lejlighedsvis omrøring, til de er gyldne.",
      "Tilsæt evt. hvidløg og timian. Hæld rødvin og balsamico i. Drys farin over.",
      "Simr uden låg 15–20 minutter, til løgene er møre og væsken er en blank glasur. Rør forsigtigt undervejs.",
      "Smag til med salt og peber. Server lune.",
    ],
    intro: `**Balsamico- og rødvinsglaserede skalotteløg** er det syrligt-søde tilbehør, der løfter en almindelig bøf til restaurantniveau. De hører hjemme ved siden af [oksehøjreb marineret i rødvin](/opskrifter/oksehojreb-marineret-i-rodvin), [côte de bœuf](/opskrifter/cote-de-boeuf-med-rodvin) eller en simpel stegt entrecôte. I modsætning til [gedeost-crostini med skalotteløg](/opskrifter/gedeost-crostini-med-skalotteloeg) er dette et rent tilbehør — blankt, koncentreret og klar på under en halv time.`,
    why: `Skalotteløg er mildere og sødere end almindelige løg. **Rødvin** giver farve og frugt; **balsamico** giver syre og dybde. Sammen reduceres de til en glasur, der coat'er løgene uden at smage af rå alkohol. Principperne er de samme som i [vin til sauce og simren](/guides/sadan-bruger-du-vin-til-sauce-og-simren).`,
    tips: [
      ["Jævn størrelse", "Ellers er nogle rå, mens andre er mos."],
      ["Balsamico", "Brug ægte eddike — ikke billig «creme» med farvestof."],
      ["Glasur", "Skal coat'e en ske. For tynd: kog 3–5 min mere. For tyk: tilsæt en spsk vand."],
      ["Forsigtig omrøring", "Skalotteløg går nemt i stykker, når de er møre."],
    ],
    serving: `Server til bøf, steg, grillkylling eller ostebordet. De er også gode ovenpå [burger med rødvinsglace](/opskrifter/burger-med-rodvinsglace) eller ved siden af [ossobuco med rødvin](/opskrifter/ossobuco-med-rodvin).`,
    mistakes: [
      "For høj varme til sidst — brændt sukker og bitter balsamico.",
      "For meget farin — dessert-sødme i stedet for balance.",
      "At bruge rødløg i stedet — skarpere smag og anden tekstur.",
      "At dække panden — damp gør dem bløde i stedet for glaserede.",
    ],
    storage: `Køleskab 4–5 dage. Genvarm blidt i pande. Smager også godt kolde i salat eller på smørrebrød. Frys op til 1 måned (tekstur bliver blødere).`,
    glass: `Server tilbehøret med den vin, der matcher hovedretten — typisk merlot, Côtes du Rhône eller cabernet. Se [vin til bøf](/guides/vin-til-boeff).`,
    faq: [
      [
        "Kan jeg bruge almindelige løg?",
        "Ja, men skær dem i både og forvent skarpere smag. Skalotteløg er mildere og sødere.",
      ],
      [
        "Hvilken balsamico?",
        "En god aceto balsamico di Modena. Undgå tyk «glasur» med tilsat sukker som eneste smag.",
      ],
      [
        "Kan de laves dagen før?",
        "Ja — genvarm blidt med en skvæt vin eller vand, så glasuren smelter op.",
      ],
      [
        "Passer de til vegetarisk menu?",
        "Absolut — server med [svampe bourguignon](/opskrifter/svampe-bourguignon) eller polenta.",
      ],
    ],
  }),

  r({
    slug: "saltimbocca-alla-romana",
    title: "Saltimbocca alla Romana — kalv med parma og salvie",
    description:
      "Tynde kalvefileter med parmaskinke og salvie, pandestegt og afkogt med tør hvidvin. Opskrift til 4 — romersk klassiker på under 20 minutter.",
    tags: ["opskrift", "italiensk", "kalv", "hvidvin", "parma", "hurtig", "hovedret", "romersk"],
    prepTime: "PT15M",
    cookTime: "PT12M",
    difficulty: "easy",
    wineInRecipe: {
      style: "Tør italiensk hvidvin — Pinot Grigio, Verdicchio, Orvieto eller Soave",
      amount: "120–150 ml til afkog",
      note: "Hvidvin deglacerer panden efter stegning og bliver til en let, aromatisk sauce på få minutter.",
    },
    wineToDrink: {
      guideSlug: "vin-til-italiensk-mad",
      searchQuery: "pinot grigio verdicchio saltimbocca kalv",
      searchMax: 200,
      label: "vin til saltimbocca",
    },
    relatedGuides: [
      "vin-til-italiensk-mad",
      "vin-til-kalvemoerbrad",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "8 tynde skiver kalvefilet eller kalvekotelet à ca. 60–80 g",
      "8 skiver parmaskinke",
      "8 friske salvieblade",
      "120–150 ml tør hvidvin (Pinot Grigio eller Verdicchio)",
      "2 spsk olivenolie",
      "2 spsk smør",
      "2 spsk mel til at drysse",
      "Salt og peber",
      "Tandstikker",
    ],
    instructions: [
      "Slå kalveskiverne tynde mellem plastfolie (ca. 5 mm). Salt og peber let på den side uden skinke.",
      "Læg et salvieblad på hver skive, dæk med parma. Fastgør med tandstikker.",
      "Drys let med mel på kødsiden.",
      "Varm olie og 1 spsk smør i en bred pande. Steg saltimbocca 1–2 minutter på kødsiden, vend og steg 1 minut på skinkesiden. Tag op og hold varme.",
      "Hæld hvidvin i panden. Kog 1–2 minutter under omrøring — skrab brune rester fri. Pisk resten af smørret i.",
      "Fjern tandstikker. Server straks med saucen over.",
    ],
    intro: `**Saltimbocca alla Romana** betyder bogstaveligt «hopper i munden» — og retten er klar på få minutter. Tynde kalveskiver, parmaskinke og salvie steges, hvorefter panden koges af med tør hvidvin. Hurtigere end [kylling piccata med hvidvin](/opskrifter/kylling-piccata-med-hvidvin), mere romersk end [ossobuco](/opskrifter/ossobuco-med-rodvin), og et oplagt midtugemåltid når du vil have italiensk klassiker uden lang simring. Se også [pasta vongole](/opskrifter/pasta-vongole-med-hvidvin) til en anden hvidvinsklassiker.`,
    why: `Hvidvinen **løfter pandens brune smagsstoffer** (fond) og giver syre, der skærer igennem skinkens salt og kalvens fedme. Pinot Grigio, Verdicchio eller Orvieto er tørre nok til ikke at søde saucen. Alkohol fordamper på 1–2 minutters kogning. Baggrund: [vin til italiensk mad](/guides/vin-til-italiensk-mad) og [vin til kalvemørbrad](/guides/vin-til-kalvemoerbrad).`,
    tips: [
      ["Tyndt kød", "5 mm er ideelt — for tykt bliver midten gråt, før skinken er varm."],
      ["Salvie", "Ét blad pr. skive. For meget bliver medicinsk."],
      ["Varme", "Panden skal være hot — ellers koger kødet i stedet for at brune."],
      ["Server straks", "Saltimbocca venter ikke. Sauce og tallerken klar, før du steger."],
    ],
    serving: `Server med saltede kartofler, grøn salat eller let risotto. Til forret: antipasti. Afslut med [zabaglione](/opskrifter/zabaglione-med-hvidvin) eller [tiramisu med marsala](/opskrifter/tiramisu-med-marsala-og-hvidvin).`,
    mistakes: [
      "For tykt kød — sej midte.",
      "At stege for længe — tørt kalv.",
      "Sød hvidvin i saucen — klæbrig dessert-smag.",
      "At glemme tandstikker — skinke og salvie falder af.",
    ],
    storage: `Bedst frisk. Rester 1 dag i køleskab — genvarm meget kort i sauce, ellers tørrer kødet. Frys ikke.`,
    glass: `Samme stil som i panden: Pinot Grigio, Verdicchio, Soave — eller en let Chianti hvis du foretrækker rød. Se [vin til italiensk mad](/guides/vin-til-italiensk-mad).`,
    faq: [
      [
        "Kan jeg bruge kylling i stedet for kalv?",
        "Ja — bank kyllingebryst fladt. Stegetiden er næsten den samme. Se også [chicken marsala](/opskrifter/chicken-marsala) for en anden kyllinge-vin-klassiker.",
      ],
      [
        "Hvilken parmaskinke?",
        "Tynde skiver Prosciutto di Parma. For tyk skinke bliver sej i panden.",
      ],
      [
        "Skal salvie være frisk?",
        "Ja. Tørret salvie smager støvet og passer ikke her.",
      ],
      [
        "Hvor meget vin i saucen?",
        "Ca. 120–150 ml — nok til at dække pandebunden og reducere til en let sauce.",
      ],
    ],
  }),

  r({
    slug: "chicken-marsala",
    title: "Chicken Marsala — kylling i marsalasauce med svampe",
    description:
      "Bankede kyllingebryst i cremet sauce af tør Marsala og svampe. Opskrift til 4 — italiensk-amerikansk klassiker med hedvin i panden.",
    tags: ["opskrift", "italiensk", "kylling", "marsala", "svampe", "hovedret", "hedvin"],
    prepTime: "PT20M",
    cookTime: "PT25M",
    difficulty: "medium",
    wineInRecipe: {
      style: "Tør Marsala (Marsala secco) — italiensk hedvin fra Sicilien",
      amount: "200 ml Marsala + lidt fond",
      note: "Marsala deglacerer panden og giver nøddeagtig, dyb sødme til svampe-saucen — ikke almindelig madvins-rød.",
    },
    wineToDrink: {
      guideSlug: "vin-til-kylling-og-lyst-koed",
      searchQuery: "marsala kylling pinot noir chardonnay italiensk",
      searchMax: 200,
      label: "vin til kylling",
    },
    relatedGuides: [
      "vin-til-kylling-og-lyst-koed",
      "vin-til-italiensk-mad",
      "vin-til-svampe",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "4 kyllingebryst (ca. 150–180 g hver)",
      "200 ml tør Marsala (secco)",
      "250 g champignon eller blandede svampe i skiver",
      "150 ml kyllingefond",
      "100 ml piskefløde (valgfrit, til cremet variant)",
      "3 spsk olivenolie",
      "2 spsk smør",
      "2 fed hvidløg, finthakket",
      "1 spsk mel",
      "2 spsk hakket persille",
      "Salt og peber",
    ],
    instructions: [
      "Bank kyllingebryst flade til ca. 1,5 cm tykkelse. Salt, peber og drys let med mel.",
      "Steg kylling i olie og 1 spsk smør 3–4 minutter pr. side, til gylden og gennemstegt. Tag op.",
      "Tilsæt resten af smørret. Brun svampene 5–7 minutter. Tilsæt hvidløg — rist 30 sekunder.",
      "Hæld Marsala i. Kog 2–3 minutter under omrøring, til alkoholen er fordampet og væsken er reduceret til ca. det halve.",
      "Tilsæt fond (og fløde hvis du vil have cremet sauce). Simr 3–4 minutter til saucen coat'er en ske.",
      "Læg kylling tilbage i saucen 1–2 minutter. Drys persille over. Server straks.",
    ],
    intro: `**Chicken Marsala** er den italiensk-amerikanske klassiker, hvor kyllingebryst møder svampe og **tør Marsala** i en dyb, blank sauce. Hurtigere end [poulet à l'estragon](/opskrifter/poulet-a-lestragon), mere hedvin-præget end [kylling piccata](/opskrifter/kylling-piccata-med-hvidvin), og et naturligt søskende til dessert-Marsala i [tiramisu](/opskrifter/tiramisu-med-marsala-og-hvidvin) — her bruger vi dog **secco**, ikke den søde. Elsker du svampe og vin, så se også [svampe bourguignon](/opskrifter/svampe-bourguignon).`,
    why: `Marsala er en **siciliansk hedvin** med nøddeagtige, tørrede frugtnoter. I panden giver den sødme og dybde, som almindelig hvidvin ikke kan. Tør (secco) Marsala balancerer fløde og svampe uden at blive dessert. Alkoholen reduceres væk; smagen bliver. Se [vin til kylling](/guides/vin-til-kylling-og-lyst-koed) og [vin til svampe](/guides/vin-til-svampe).`,
    tips: [
      ["Marsala secco", "Køb tør — «sweet» Marsala er til dessert og gør saucen klaimatisk sød."],
      ["Fladt kød", "Jævn tykkelse = jævn stegning. Ellers er midten rå, mens kanterne er tørre."],
      ["Svampe", "Brun dem godt, før vinen går i — ellers bliver saucen vandig."],
      ["Reduktion", "Sauce skal coat'e skeen. For tynd: kog mere. For tyk: skvæt fond."],
    ],
    serving: `Server med kartoffelmos, bløde polenta eller pasta. Grøn salat ved siden af. Til italiensk aften: start med antipasti og afslut med [zabaglione](/opskrifter/zabaglione-med-hvidvin).`,
    mistakes: [
      "Sød Marsala i hovedretten — dessert-sauce.",
      "At springe reduktionen over — rå alkoholsmaq.",
      "Overstegt kylling — tørt bryst.",
      "For meget fløde — maskerer Marsala-smagen.",
    ],
    storage: `Køleskab 2 dage. Genvarm blidt i sauce med lidt fond — undgå høj varme. Frys sauce og kylling op til 1 måned (fløde-varianter kan skille lidt).`,
    glass: `Let pinot noir, Chardonnay med mådeholdt eg, eller tør italiensk hvid. Nogle drikker en lille Marsala til — ellers se [vin til kylling](/guides/vin-til-kylling-og-lyst-koed).`,
    faq: [
      [
        "Hvad er forskellen på tør og sød Marsala?",
        "Secco (tør) til mad; dolce (sød) til dessert som tiramisu og zabaglione. Brug secco her.",
      ],
      [
        "Kan jeg erstatte Marsala med anden vin?",
        "Nødløsning: tør madeira eller en blanding af tør sherry og lidt brandy. Smagen bliver anderledes, men princippet ligner.",
      ],
      [
        "Skal der fløde i?",
        "Valgfrit. Klassisk restaurant-version er ofte cremet; traditionel italiensk er lettere uden fløde.",
      ],
      [
        "Virker kalkun eller svinekoteletter?",
        "Ja — samme teknik. Tilpas stegetid efter tykkelse.",
      ],
    ],
  }),
];

export const GUIDE_RECIPE_ADDITIONS = {
  "vin-til-svampe": [
    { slug: "svampe-bourguignon", label: "Svampe Bourguignon" },
    { slug: "chicken-marsala", label: "Chicken Marsala" },
  ],
  "vin-til-bourgogne-mad": [
    { slug: "svampe-bourguignon", label: "Svampe Bourguignon" },
  ],
  "vin-til-vegetar-og-gront": [
    { slug: "svampe-bourguignon", label: "Svampe Bourguignon" },
  ],
  "vin-til-oksekoed": [
    { slug: "oksehojreb-marineret-i-rodvin", label: "Oksehøjreb marineret i rødvin" },
  ],
  "vin-til-roastbeef": [
    { slug: "oksehojreb-marineret-i-rodvin", label: "Oksehøjreb marineret i rødvin" },
  ],
  "vin-til-ribeye": [
    { slug: "oksehojreb-marineret-i-rodvin", label: "Oksehøjreb marineret i rødvin" },
  ],
  "vin-til-boeff": [
    { slug: "balsamico-rodvinsglaserede-skalotteloeg", label: "Balsamico-rødvinsglaserede skalotteløg" },
  ],
  "vin-til-italiensk-mad": [
    { slug: "saltimbocca-alla-romana", label: "Saltimbocca alla Romana" },
    { slug: "chicken-marsala", label: "Chicken Marsala" },
  ],
  "vin-til-kalvemoerbrad": [
    { slug: "saltimbocca-alla-romana", label: "Saltimbocca alla Romana" },
  ],
  "vin-til-kylling-og-lyst-koed": [
    { slug: "chicken-marsala", label: "Chicken Marsala" },
  ],
  "sadan-bruger-du-vin-til-sauce-og-simren": [
    { slug: "svampe-bourguignon", label: "Svampe Bourguignon" },
    { slug: "balsamico-rodvinsglaserede-skalotteloeg", label: "Glaserede skalotteløg" },
    { slug: "chicken-marsala", label: "Chicken Marsala" },
  ],
};
