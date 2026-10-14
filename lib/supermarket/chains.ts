export type ShelfPick = {
  title: string;
  lookFor: string;
  skip: string;
};

export type StapleLine = {
  name: string;
  note: string;
};

export type ChainLink = {
  href: string;
  label: string;
};

export type ChainFaq = {
  question: string;
  answer: string;
};

export type SupermarketChain = {
  slug: string;
  /** Kort navn til H1 og title, fx «Netto» eller «Rema 1000». */
  name: string;
  teaser: string;
  /** Evergreen-guide. Føtex og Bilka deler én. */
  guideSlug: string;
  intro: string;
  seek: string;
  alternative: string;
  avoid: string;
  shelf: ShelfPick[];
  staples: StapleLine[];
  onlineQueries: string[];
  onlineMaxPrice: number;
  meals: ChainLink[];
  occasions: ChainLink[];
  /** Skabelon med `{month}` og `{year}`. */
  descriptionTemplate: string;
  faq: ChainFaq[];
};

function meals(name: string): ChainLink[] {
  return [
    { href: "/guides/vin-til-kylling-og-lyst-koed", label: `Vin til ${name}-kylling` },
    { href: "/guides/vin-til-oksekoed", label: "Oksekød" },
    { href: "/guides/vin-til-pizza", label: "Pizza" },
  ];
}

function occasions(name: string): ChainLink[] {
  return [
    { href: "/guides/vin-til-julemad-den-store-guide", label: `${name}-vin til julemad` },
    { href: "/guides/vin-til-konfirmation", label: `${name}-vin til konfirmation` },
  ];
}

export const SUPERMARKET_CHAINS: SupermarketChain[] = [
  {
    slug: "netto",
    name: "Netto",
    teaser: "Discount-hylde: primitivo, tempranillo og brut — ikke søde blends.",
    guideSlug: "bedste-vin-i-netto-under-70-kr",
    intro:
      "Netto er volumen og kendte hverdagsmærker. Gå efter italiensk primitivo. Alternativet er spansk tempranillo. Undgå de sødeste «velour»-røde, hvis vinen skal til mad.",
    seek: "Primitivo fra Puglia med region på etiketten.",
    alternative: "Tempranillo eller Rioja joven til pizza og grill.",
    avoid: "Søde blends og guldmedaljer uden land eller drue.",
    shelf: [
      {
        title: "Primitivo",
        lookFor: "Puglia eller Manduria. Saftig rød til pasta og fredag.",
        skip: "«Premium Reserve» uden region.",
      },
      {
        title: "Montepulciano d'Abruzzo",
        lookFor: "DOC på etiketten. Blød hverdagsrød.",
        skip: "En flaske der bare hedder «rødvin».",
      },
      {
        title: "Tempranillo",
        lookFor: "Rioja joven eller tydelig spansk tempranillo.",
        skip: "Medalje uden oprindelse.",
      },
      {
        title: "Bobler til skål",
        lookFor: "Cava eller prosecco med brut og DO/DOC.",
        skip: "Sød Asti, hvis den skal følge mad.",
      },
    ],
    staples: [
      {
        name: "Italiensk hverdagsrød",
        note: "Primitivo eller montepulciano. Kig efter region, ikke et fancy serienavn.",
      },
      {
        name: "Spansk tempranillo",
        note: "Rioja joven er det faste discount-spor til tapas og pizza.",
      },
      {
        name: "Frisk hvid",
        note: "Vinho verde eller sauvignon. Server den kold. Alkohol omkring 9–12 % er et godt tegn på vinho verde.",
      },
    ],
    onlineQueries: ["primitivo", "montepulciano", "tempranillo", "cava"],
    onlineMaxPrice: 80,
    meals: meals("Netto"),
    occasions: occasions("Netto"),
    descriptionTemplate:
      "Bedste rødvin i Netto i {month} {year}. Gå efter primitivo og tempranillo, undgå søde blends. Prisen står på hylden — samme stil online.",
    faq: [
      {
        question: "Hvad er den bedste rødvin i Netto?",
        answer:
          "Gå efter primitivo fra Puglia eller montepulciano d'Abruzzo med region på etiketten. Tempranillo er alternativet til pizza og grill. Vi viser ikke live hyldepriser — prisen står i butikken.",
      },
      {
        question: "Er primitivo fra Netto god?",
        answer:
          "En primitivo med Puglia eller Manduria på etiketten er et solidt hverdagsvalg til pasta. Vi giver ikke point. Drop flasken, hvis den kun lover «blød og rund» uden land og drue.",
      },
      {
        question: "Hvilken Netto-vin passer til julemad?",
        answer:
          "Til and og flæskesteg: en tør rød med region slår en sød blend. Se guiden Vin til julemad for retten, og brug samme stil online, hvis hylden er tom.",
      },
      {
        question: "Hvilken Netto-vin passer til konfirmation?",
        answer:
          "Til skål: cava eller prosecco brut, ikke sød Asti til maden. Se guiden Vin til konfirmation.",
      },
    ],
  },
  {
    slug: "foetex",
    name: "Føtex",
    teaser: "Bredere end discount. Riesling og Løgismose, når bagsiden nævner druen.",
    guideSlug: "bedste-vin-i-foetex-og-bilka",
    intro:
      "Føtex er bredere end Netto, men en lille butik kan ligne discount. Gå efter riesling eller en anden tør hvid med region. Alternativet er Rioja eller Chianti til rødt kød. Undgå en permanent «før-pris», hvis du ikke kender stilen.",
    seek: "Riesling eller grüner med region — det sikre hvidvinsvalg.",
    alternative: "Rioja eller Chianti, når maden er rød.",
    avoid: "Tung flaske med «reserva» og ingen oprindelse.",
    shelf: [
      {
        title: "Tør hvid",
        lookFor: "Riesling eller grüner. Region på etiketten, ikke kun «hvidvin».",
        skip: "Sød hvid til fisk og salat.",
      },
      {
        title: "Løgismose",
        lookFor: "Sallings egen linje. Læs drue og stil på bagsiden.",
        skip: "Serienavnet alene, hvis bagsiden ikke siger hvad der er i flasken.",
      },
      {
        title: "Rioja eller Chianti",
        lookFor: "Crianza eller en Chianti med årgang, hvis budgettet er over discount.",
        skip: "En spansk blend uden DO.",
      },
      {
        title: "Bobler",
        lookFor: "Crémant eller cava brut.",
        skip: "Den sødeste prosecco til middagen.",
      },
    ],
    staples: [
      {
        name: "Løgismose",
        note: "Sallings faste linje i Føtex. Kvaliteten følger serien: drue og region på bagsiden betyder mere end navnet.",
      },
      {
        name: "Faustino",
        note: "Rioja du ofte møder på Salling-hylden. Vælg den tørre røde til mad, ikke den sødeste variant i familien.",
      },
      {
        name: "Baron de Ley",
        note: "Rioja der ofte står ved siden af Faustino. Kig efter årgang og DOCa.",
      },
    ],
    onlineQueries: ["riesling", "rioja", "chianti", "cremant"],
    onlineMaxPrice: 120,
    meals: meals("Føtex"),
    occasions: occasions("Føtex"),
    descriptionTemplate:
      "God hvidvin i Føtex i {month} {year}: riesling med region på etiketten. Undgå søde blends. Prisen står på hylden — samme stil online.",
    faq: [
      {
        question: "Hvad er god hvidvin i Føtex?",
        answer:
          "Riesling eller grüner med region på etiketten. Vinho verde er det lettere alternativ. Undgå sød hvid til fisk. Prisen står på hylden — vi viser den ikke her.",
      },
      {
        question: "Er Løgismose fra Føtex god?",
        answer:
          "Løgismose er Sallings egen linje, ikke en point-anmeldelse værd i sig selv. Læs drue og region på bagsiden. En navngiven riesling eller rioja er et sikrere køb end en sød blend uden oprindelse.",
      },
      {
        question: "Hvor finder jeg Føtex-vinanmeldelser?",
        answer:
          "Vi giver ikke point og opdigter ikke hyldescores. Siden siger, hvad du går efter, og viser samme stil online, hvis butikken er udsolgt.",
      },
      {
        question: "Hvilken Føtex-vin passer til konfirmation?",
        answer:
          "Til skål: crémant, cava eller prosecco brut. Se guiden Vin til konfirmation. Til julemad: se guiden Vin til julemad og vælg en tør rød med region.",
      },
    ],
  },
  {
    slug: "bilka",
    name: "Bilka",
    teaser: "Den store Salling-hylde: mere Rioja, Chianti og Løgismose i samme gang.",
    guideSlug: "bedste-vin-i-foetex-og-bilka",
    intro:
      "Bilka er den store Salling-hylde, så du oftere finder både discount-stil og flasker i mellempris i samme gang. Gå efter Rioja crianza eller Chianti. Alternativet er Løgismose, når bagsiden nævner drue og region. Undgå «reserva» uden oprindelse.",
    seek: "Rioja crianza eller Chianti med årgang.",
    alternative: "Løgismose, når drue og region står på bagsiden.",
    avoid: "Tung flaske og en før-pris, du ikke kan gennemskue.",
    shelf: [
      {
        title: "Rioja crianza",
        lookFor: "DOCa og årgang. Mere struktur end en ren joven.",
        skip: "Spansk rød uden region.",
      },
      {
        title: "Chianti",
        lookFor: "Sangiovese og Toscana på etiketten. Til pasta og tomatsovs.",
        skip: "«Italiensk rødvin» uden område.",
      },
      {
        title: "Løgismose",
        lookFor: "Egen Salling-linje. Brug den, når stilen på bagsiden matcher maden.",
        skip: "At købe serien blindt, fordi navnet er kendt.",
      },
      {
        title: "Bobler og kasser",
        lookFor: "Cava eller crémant brut. En kasse kun hvis du kender stilen.",
        skip: "Sød mousserende til en lang middag.",
      },
    ],
    staples: [
      {
        name: "Løgismose",
        note: "Samme Salling-linje som i Føtex, bare med flere facings i Bilka. Læs stadig bagsiden.",
      },
      {
        name: "Baron de Ley",
        note: "Rioja du ofte finder på den store hylde. Årgang og DOCa er det, du tjekker.",
      },
      {
        name: "Faustino",
        note: "Klassisk Rioja-hus i danske supermarkeder. Vælg den tørre røde til mad.",
      },
    ],
    onlineQueries: ["rioja crianza", "chianti", "riesling", "cava"],
    onlineMaxPrice: 120,
    meals: meals("Bilka"),
    occasions: occasions("Bilka"),
    descriptionTemplate:
      "Bedste vin i Bilka i {month} {year}. Rioja, Chianti og Løgismose på den store hylde. Prisen står i butikken — samme stil online.",
    faq: [
      {
        question: "Hvad er den bedste vin i Bilka?",
        answer:
          "På den store hylde: Rioja crianza eller Chianti, hvis budgettet er over ren discount. Løgismose er alternativet, når bagsiden nævner drue og region. Prisen står i butikken.",
      },
      {
        question: "Er Baron de Ley fra Bilka god?",
        answer:
          "Baron de Ley er en Rioja, du ofte møder i Bilka. Den er et fornuftigt hverdagsvalg, når årgang og DOCa står på etiketten. Vi giver ikke point.",
      },
      {
        question: "Hvilken Bilka-vin passer til julemad?",
        answer:
          "En tør Rioja eller Chianti til and og steg. Se guiden Vin til julemad for retten. Samme stil kan købes online, hvis hylden er tom.",
      },
      {
        question: "Hvilken Bilka-vin passer til konfirmation?",
        answer:
          "Cava eller crémant brut til skål. Se guiden Vin til konfirmation, før du køber en sød mousserende til hele menuen.",
      },
    ],
  },
  {
    slug: "rema-1000",
    name: "Rema 1000",
    teaser: "Smalt og hurtigt. Tempranillo, primitivo og cava brut.",
    guideSlug: "bedste-vin-i-rema-1000",
    intro:
      "Rema 1000 er pris og tempo, og udvalget er smallere end i Føtex. Gå efter tempranillo. Alternativet er primitivo til pasta og grill. Undgå «Premium Red» uden land.",
    seek: "Tempranillo eller Rioja joven.",
    alternative: "Primitivo fra Puglia til pasta og grill.",
    avoid: "«Premium Red» og billig Bourgogne-lookalike.",
    shelf: [
      {
        title: "Tempranillo",
        lookFor: "Rioja joven eller Spanien tydeligt på etiketten.",
        skip: "En rød blend uden drue.",
      },
      {
        title: "Primitivo",
        lookFor: "Puglia. Saftig rød til hverdag.",
        skip: "Alkohol et godt stykke over 14 % i den billigste røde — den bliver ofte varm.",
      },
      {
        title: "Vinho verde",
        lookFor: "Portugal, lav alkohol, grøn flaske. Til fisk og let mad.",
        skip: "Sød hvid uden drue.",
      },
      {
        title: "Cava brut",
        lookFor: "Cava DO og brut. Bedre end anonym mousserende.",
        skip: "Kun sød sparkling til maden.",
      },
    ],
    staples: [
      {
        name: "Tempranillo",
        note: "Det faste Rema-spor til pizza og tapas. Joven er nok — du behøver ikke reserva.",
      },
      {
        name: "Primitivo",
        note: "Puglia på etiketten. Det er alternativet, når tempranillo-hylden er tynd.",
      },
      {
        name: "Cava brut",
        note: "Boblen du kan stole mere på end en flaske, der bare siger «mousserende».",
      },
    ],
    onlineQueries: ["tempranillo", "primitivo", "cava", "vinho verde"],
    onlineMaxPrice: 80,
    meals: meals("Rema 1000"),
    occasions: occasions("Rema 1000"),
    descriptionTemplate:
      "Hvilken Rema 1000-vin er bedst i {month} {year}? Tempranillo og primitivo. Undgå anonyme blends. Prisen står på hylden.",
    faq: [
      {
        question: "Hvilken Rema 1000-vin er bedst?",
        answer:
          "Tempranillo til pizza og tapas, primitivo til pasta og grill. Cava brut til skål. Udvalget skifter, så køb stilen — ikke et kampagnenavn. Prisen står på hylden.",
      },
      {
        question: "Er Rema 1000-vin god?",
        answer:
          "Ja, når etiketten viser land og drue. Nej, når den kun siger «Premium Red». Vi anmelder ikke enkeltflasker med point.",
      },
      {
        question: "Hvilken Rema 1000-vin passer til julemad?",
        answer:
          "En tør tempranillo eller primitivo til det salte og fede. Se guiden Vin til julemad. Samme stil findes online, hvis butikken er udsolgt.",
      },
      {
        question: "Hvilken Rema 1000-vin passer til konfirmation?",
        answer:
          "Cava brut til skål. Se guiden Vin til konfirmation, hvis menuen er laks, rejer eller roastbeef.",
      },
    ],
  },
  {
    slug: "lidl",
    name: "Lidl",
    teaser: "Egne serier der skifter. Cava brut, primitivo og tempranillo holder.",
    guideSlug: "bedste-vin-i-lidl",
    intro:
      "Lidl kører egne serier, og kampagnerne skifter mellem uger og butikker. Gå efter cava brut. Alternativet er primitivo fra Puglia. Undgå «Smooth Red» uden drue.",
    seek: "Cava DO, brut.",
    alternative: "Primitivo eller tempranillo med region.",
    avoid: "Anonyme «Smooth Red / Soft White» uden land.",
    shelf: [
      {
        title: "Cava brut",
        lookFor: "Cava DO og ordet brut. Den sikre boble.",
        skip: "Sød Asti eller «festdrik» til middag.",
      },
      {
        title: "Primitivo",
        lookFor: "Puglia eller Manduria.",
        skip: "Zinfandel-blend uden land.",
      },
      {
        title: "Tempranillo",
        lookFor: "Rioja joven eller Castilla.",
        skip: "«Pinot Prestige» i discount-pris. Det er sjældent pinot, du vil have.",
      },
      {
        title: "Frisk hvid",
        lookFor: "Vinho verde eller sauvignon med citrus og lav alkohol.",
        skip: "Sød hvid uden drue.",
      },
    ],
    staples: [
      {
        name: "Cava brut",
        note: "Den faste Lidl-boble. Brut først, sødme kun hvis desserten er sød.",
      },
      {
        name: "Primitivo",
        note: "Saftig rød der overlever discount-hylden, når Puglia står på etiketten.",
      },
      {
        name: "Tempranillo",
        note: "Til tapas og pizza. Joven er det rigtige leje her.",
      },
    ],
    onlineQueries: ["cava", "primitivo", "tempranillo", "vinho verde"],
    onlineMaxPrice: 80,
    meals: meals("Lidl"),
    occasions: occasions("Lidl"),
    descriptionTemplate:
      "Bedste vin i Lidl i {month} {year}. Gå efter cava brut, primitivo og tempranillo. Undgå anonyme blends. Prisen står på hylden.",
    faq: [
      {
        question: "Hvad er den bedste vin i Lidl?",
        answer:
          "Cava brut til skål, primitivo eller tempranillo til mad. Serierne skifter, så stilen er det stabile. Prisen står på hylden.",
      },
      {
        question: "Er Lidl-vin god?",
        answer:
          "Den er god, når der står drue og region. En «Smooth Red» uden land er et nej. Vi laver ikke point-anmeldelser af ugens kampagne.",
      },
      {
        question: "Hvilken Lidl-vin passer til julemad?",
        answer:
          "Tør primitivo eller tempranillo til det salte. Se guiden Vin til julemad. Cava brut er til skålen, ikke til hele menuen.",
      },
      {
        question: "Hvilken Lidl-vin passer til konfirmation?",
        answer:
          "Cava brut. Se guiden Vin til konfirmation, hvis du skal ramme flere retter.",
      },
    ],
  },
  {
    slug: "coop",
    name: "Coop",
    teaser: "365 er discount. Kvickly har bredere hylde — samme stilregler.",
    guideSlug: "vin-i-coop-365-og-kvickly",
    intro:
      "Coop 365 opfører sig som discount. Kvickly er bredere. Gå efter tempranillo i 365. I Kvickly er alternativet Rioja eller Chianti, hvis budgettet er der. Undgå anonyme rødvins-kartoner uden producent.",
    seek: "Tempranillo eller primitivo i Coop 365.",
    alternative: "Rioja eller Chianti i Kvickly, når du kan gå et trin op.",
    avoid: "Karton der bare hedder «rødvin» uden producent.",
    shelf: [
      {
        title: "Coop 365 — rød",
        lookFor: "Tempranillo eller primitivo. Land og drue på etiketten.",
        skip: "Discount-blend uden oprindelse.",
      },
      {
        title: "Kvickly — et trin op",
        lookFor: "Rioja eller Chianti, hvis du har luft over ren discount.",
        skip: "At betale mellempris for en flaske uden region.",
      },
      {
        title: "Hvid til fisk",
        lookFor: "Vinho verde eller sauvignon.",
        skip: "Sød hvid til salat og fisk.",
      },
      {
        title: "Bobler",
        lookFor: "Cava eller prosecco brut.",
        skip: "Sød mousserende til middagen.",
      },
    ],
    staples: [
      {
        name: "Tempranillo i 365",
        note: "Det hurtige discount-valg. Samme logik som i Netto og Rema.",
      },
      {
        name: "Primitivo",
        note: "Alternativet til pasta, når tempranillo-hylden er tynd.",
      },
      {
        name: "Rioja i Kvickly",
        note: "Her giver mellempris mening, hvis årgang og region står på flasken.",
      },
    ],
    onlineQueries: ["tempranillo", "primitivo", "cava", "rioja"],
    onlineMaxPrice: 80,
    meals: meals("Coop"),
    occasions: occasions("Coop"),
    descriptionTemplate:
      "Bedste vin i Coop i {month} {year}: tempranillo i 365, mere udvalg i Kvickly. Prisen står på hylden — samme stil online.",
    faq: [
      {
        question: "Hvilken vin i Coop 365 er bedst?",
        answer:
          "Tempranillo eller primitivo med land og drue. 365 er en discount-hylde. Prisen står i butikken.",
      },
      {
        question: "Er Kvickly-vin bedre end Coop 365?",
        answer:
          "Kvickly har typisk bredere hylde, så du oftere finder Rioja eller Chianti. Reglen er den samme: stil før marketing. Vi giver ikke point.",
      },
      {
        question: "Hvilken Coop-vin passer til julemad?",
        answer:
          "En tør rød med region til and og steg. Se guiden Vin til julemad. I Kvickly er Rioja et naturligt trin op fra 365.",
      },
      {
        question: "Hvilken Coop-vin passer til konfirmation?",
        answer:
          "Cava eller prosecco brut til skål. Se guiden Vin til konfirmation.",
      },
    ],
  },
];

const bySlug = new Map(SUPERMARKET_CHAINS.map((c) => [c.slug, c]));

export function getAllChains(): SupermarketChain[] {
  return SUPERMARKET_CHAINS;
}

export function getChain(slug: string): SupermarketChain | undefined {
  return bySlug.get(slug);
}

export function getChainsByGuideSlug(guideSlug: string): SupermarketChain[] {
  return SUPERMARKET_CHAINS.filter((c) => c.guideSlug === guideSlug);
}
