/**
 * FAQ til FAQPage JSON-LD for "bedste-*"-guides uden manuel post i guide-faq.ts.
 * Manuel FAQ i guide-faq.ts har altid forrang.
 */

export type BedsteFaqItem = { question: string; answer: string };

type Kat =
  | "price"
  | "general"
  | "region"
  | "grape"
  | "style-bobler"
  | "style-desert"
  | "style-organic"
  | "style-alcfree"
  | "style-box"
  | "style-dansk"
  | "occasion-gave"
  | "occasion-weekday"
  | "generic";

const KOMPLET = "[komplet guide til vin og mad](/guides/komplet-guide-til-vin-og-mad)";
const KOEB = "[køb vin online](/guides/koeb-vin-online-sadan-holder-du-styr-paa-det)";
const ETIKET = "[læs etiketten](/guides/sadan-laeser-du-vinflaskens-etiket)";
const FORSIDE = "Brug søgningen på forsiden for at sammenligne flasker med pris fra flere forhandlere.";

function kategori(slug: string): Kat {
  if (/under-\d+-kr/.test(slug)) return "price";
  if (/bedste-(italiensk|fransk|spansk)-/.test(slug)) return "region";
  if (/bedste-(pinot-noir|chardonnay|riesling|sauvignon|merlot|cabernet)/.test(slug)) return "grape";
  if (/bedste-bobler|bedste-champagne/.test(slug)) return "style-bobler";
  if (/bedste-dessertvin|bedste-portvin/.test(slug)) return "style-desert";
  if (/bedste-okologiske/.test(slug)) return "style-organic";
  if (/bedste-alkoholfri/.test(slug)) return "style-alcfree";
  if (/bedste-box/.test(slug)) return "style-box";
  if (/bedste-dansk/.test(slug)) return "style-dansk";
  if (/bedste-vin-til-(gave|begynder)|vaertindegave|julegave/.test(slug)) return "occasion-gave";
  if (/bedste-(vin-til-hverdag|weekendvin)/.test(slug)) return "occasion-weekday";
  if (/^bedste-(rodvin|hvidvin|rosevin)$/.test(slug)) return "general";
  return "generic";
}

function emneFraTitle(title: string): string {
  const uden = title.replace(/^\s*bedste\s+/i, "").trim();
  const foerKolon = uden.split(":")[0]?.trim() ?? uden;
  return foerKolon.charAt(0).toLowerCase() + foerKolon.slice(1) || "vin";
}

export function getBedsteFallbackFaq(slug: string, title: string): BedsteFaqItem[] | null {
  if (!slug.startsWith("bedste-")) return null;
  const emne = emneFraTitle(title);
  const kat = kategori(slug);

  const byKat: Record<Kat, BedsteFaqItem[]> = {
    price: [
      {
        question: `Kan man få god ${emne}?`,
        answer: `Ja — nøglen er at fokusere på regioner der leverer meget for pengene, unge årgange og producenter med dokumenteret kvalitet. Prioriter ordentlig oprindelse frem for brands uden historie. Se også ${KOMPLET}.`,
      },
      {
        question: "Er dyrere vin altid bedre?",
        answer:
          "Nej. Pris-kvalitet er ikke lineær — mange af de bedste hverdagsvine ligger i 120–180 kr-zonen, hvor kvalitet og identitet stiger markant uden at blive luksus. Over 300 kr betaler du ofte for sjældenhed eller modning, ikke nødvendigvis smag.",
      },
      {
        question: "Hvor finder jeg aktuelle priser?",
        answer: FORSIDE,
      },
    ],
    general: [
      {
        question: `Hvad er den bedste ${emne}?`,
        answer: `Der findes ikke én bedste flaske — kun det rigtige match mellem stil, pris og anledning. Lær de tre hovedstilarter (let, mellemfyldig, kraftig) og eksperimenter indenfor hver. Se ${KOMPLET} for princip-oversigt.`,
      },
      {
        question: "Hvordan læser jeg etiketten rigtigt?",
        answer: `Prioriter område/appellation, årgang, producent og alkoholprocent. Se ${ETIKET} for at forstå forskellen på reserva, crianza, cru og andre betegnelser.`,
      },
      {
        question: "Hvor finder jeg konkrete flasker?",
        answer: FORSIDE,
      },
    ],
    region: [
      {
        question: `Hvilken region er bedst for ${emne}?`,
        answer: `Der er flere stærke zoner afhængigt af stil og pris. Start med de klassiske appellationer i området og arbejd dig udad til mindre kendte sub-regioner. Se ${KOMPLET} for lande-overblik.`,
      },
      {
        question: "Hvordan vælger jeg mellem producenter?",
        answer:
          "Kig efter producenter med dokumenteret historie, familie-drift og specifik geografisk oprindelse. Anmeldelser og producent-navn er bedre indikatorer end flashy etikette-design.",
      },
      {
        question: "Er ung vin bedre end lagret?",
        answer:
          "Afhænger af stilen: frisk vin (rosé, let hvid, gamay) drikkes ung; klassiske kraftige røde (Bordeaux, Barolo, Amarone) vinder på tid. Læs om appellationens anbefalede lagringsperiode.",
      },
    ],
    grape: [
      {
        question: `Hvilket land laver bedst ${emne}?`,
        answer: `Hjemlandet sætter stilen, men nye verden leverer ofte stærk kvalitet for pengene. Eksperimenter med forskellige klimaer for at finde din stil — varme klimaer giver frugt, kølige giver syre og elegance. Se ${KOMPLET}.`,
      },
      {
        question: "Hvor meget kostar en god flaske?",
        answer:
          "Sweet spot for de fleste druer ligger i 150–300 kr — her finder du kvalitetsproducenter uden at betale for sjældenhed. Under 100 kr bliver det svært med mange druer, over 500 kr betaler du ofte for lagring og prestige.",
      },
      {
        question: "Hvordan serverer jeg den bedst?",
        answer:
          "Temperatur betyder mere end mange tror: rødvin 15–18 °C, hvidvin 8–12 °C, bobler 6–9 °C. Glas og luftning kan også løfte oplevelsen — se opbevaringsguiden for detaljer.",
      },
    ],
    "style-bobler": [
      {
        question: `Hvilken ${emne} passer bedst til fest?`,
        answer: `Brut NV champagne eller kvalitets-cava er de klassiske festvalg. Vælg crémant hvis du vil have kvalitet til halv champagne-pris. Se ${KOMPLET} for stilarter.`,
      },
      {
        question: "Hvad er forskellen på brut og extra dry?",
        answer:
          "Brut har under 12 g/l restsukker — tør. Extra dry har 12–17 g/l — let sødligt trods navnet. Extra brut er knastør (0–6 g/l). Tjek altid etiketten hvis du vil være sikker.",
      },
      {
        question: "Hvor koldt skal bobler serveres?",
        answer:
          "6–9 °C er optimalt. For koldt skjuler aroma; for varmt bliver alkoholen dominerende. Champagne ofte 8–10 °C, cava og prosecco ofte 6–8 °C.",
      },
    ],
    "style-desert": [
      {
        question: `Hvornår drikker man ${emne}?`,
        answer: `Efter middag, sammen med dessert eller ost — eller som dessert i sig selv. Grundregel: vinen skal være mindst lige så sød som det, den drikkes til. Se ${KOMPLET}.`,
      },
      {
        question: "Hvor længe holder åbnet dessertvin?",
        answer:
          "Tawny port og madeira holder 4–6 uger i køleskab. Sauternes og tokaji 2–4 uger. Vintage port og ruby 3–7 dage. Altid på køl efter åbning.",
      },
      {
        question: "Er dessertvin altid meget sød?",
        answer:
          "De fleste har tydelig restsødme, men også tydelig syre — god dessertvin balancerer sukker med friskhed, så den ikke bliver klæg. Eiswein har ofte højest syre i kategorien.",
      },
    ],
    "style-organic": [
      {
        question: `Hvad betyder ${emne}?`,
        answer: `Økologisk vin er lavet af certificeret økologisk dyrkede druer efter EU-regler. Biodynamisk (Demeter, Biodyvin) er et skridt videre med strammere regler for mark og kælder. Se ${KOMPLET}.`,
      },
      {
        question: "Er økologisk vin automatisk bedre?",
        answer:
          "Nej. Økologi er en produktionsværdi, ikke en kvalitetsgaranti. Men fordi engagementet er højt, leverer toppen af økologisk ofte meget høj kvalitet. Dårlig økologisk er stadig dårlig.",
      },
      {
        question: "Hvordan kender jeg certificeringen?",
        answer:
          "Kig efter EU’s grønne økologi-blad, Demeter- eller Biodyvin-logo på etiketten. ’Sans soufre ajouté’ angiver ingen tilsat svovl. ’Vegan’ betyder uden animalsk klaring.",
      },
    ],
    "style-alcfree": [
      {
        question: `Hvordan laves ${emne}?`,
        answer: `Alkoholen fjernes fra færdig vin via vakuum-destillation eller reverse osmosis. Kvaliteten er markant forbedret de sidste 5 år, særligt inden for bobler og hvidvin. Se ${KOMPLET}.`,
      },
      {
        question: "Smager det som rigtig vin?",
        answer:
          "Nej, men det kan være drikkeligt alternativ. Bobler og hvid er tættest på rigtig vin; rødvin er mest udfordrende fordi tanninerne føles tynde uden alkohol.",
      },
      {
        question: "Hvornår giver alkoholfri vin mening?",
        answer:
          "Gravide, dry january, køreture, sundhedshensyn eller blandet selskab. Kalori-indholdet er typisk 1/3 af alkoholisk vin.",
      },
    ],
    "style-box": [
      {
        question: `Hvordan er kvaliteten af ${emne}?`,
        answer: `Markant bedre end kategoriens rygte. Moderne bag-in-box leverer kvalitet på niveau med glasflasker 30–40 % billigere. 3 liter svarer til 4 flasker. Se ${KOMPLET}.`,
      },
      {
        question: "Hvor længe holder box-vin efter åbning?",
        answer:
          "4–6 uger i køleskab takket være lufttæt pose. Det er kategoriens store fordel: ingen iltskade indtil posen er tømt.",
      },
      {
        question: "Er box-vin miljøvenligt?",
        answer:
          "Ja, målt i forbrug — karton og pose er langt lettere end glasflasker, så transporten udleder mindre CO2 og emballageaffaldet er mindre.",
      },
    ],
    "style-dansk": [
      {
        question: `Hvor god er ${emne} blevet?`,
        answer: `Markant bedre siden 2010 takket være klimaforandringer og hybrid-druer som solaris og rondo. Toppen er nu internationalt respekteret. Prisen er højere end tilsvarende import fordi produktionen er lille. Se ${KOMPLET}.`,
      },
      {
        question: "Hvor finder jeg danske producenter?",
        answer:
          "De fleste tager imod besøg. Dyrhøj (Røsnæs), Skaersogaard (Kolding) og Lille Gadegaard (Bornholm) er etablerede og anbefalede. Vinfestivaler i København og Roskilde samler mange.",
      },
      {
        question: "Hvilken stil er dansk vin bedst til?",
        answer:
          "Solaris-hvid og crémant-stil bobler er kategoriens stærkeste. Dansk rondo-rød kan i kølige årgange levere pinot-agtig karakter, men er stadig mest eksperimenterende.",
      },
    ],
    "occasion-gave": [
      {
        question: `Hvad er en sikker ${emne}?`,
        answer: `Klassiske kvalitetsbobler (crémant, cava gran reserva, champagne brut NV) eller respekterede rødvine (Chianti Classico, Rioja reserva). Prioriter klassiske appellationer over eksperimentelle valg. Se ${KOMPLET}.`,
      },
      {
        question: "Hvor meget skal en gavevin koste?",
        answer:
          "Hverdagsgave 150–300 kr, middag-vertindegave 200–400 kr, fest-gave 400–700 kr. Dyrere betyder ikke bedre — en 250 kr crémant med personlig note slår ofte en 500 kr generisk luksusflaske.",
      },
      {
        question: "Skal jeg forvente flasken åbnet?",
        answer:
          "Giv flasken ved ankomst og sig gerne at den er til senere, hvis du ikke forventer den åbnet. Så har modtageren valget uden at føle forpligtelse.",
      },
    ],
    "occasion-weekday": [
      {
        question: `Hvad gør en god ${emne}?`,
        answer: `Alsidighed, frisk frugt og drikbarhed — ikke prestigeflasker. Hav mindst én rød og én hvid klar. 70–120 kr-klassen er sweet spot hvis du fokuserer på værdi-regioner. Se ${KOMPLET}.`,
      },
      {
        question: "Er box-vin godt nok til hverdag?",
        answer:
          "Ja, moderne box-vin slår ofte glasflasker i samme prisklasse. Og posen holder i 4–6 uger efter åbning, så du kan drikke et glas ad gangen uden spild.",
      },
      {
        question: "Hvor finder jeg de bedste tilbud?",
        answer: FORSIDE,
      },
    ],
    generic: [
      {
        question: `Hvad skal jeg kigge efter ved ${emne}?`,
        answer: `Match stil, pris og anledning frem for at jage en bestemt flaske. Lær regionerne at kende og find din egen smag gennem eksperimenter. Se ${KOMPLET}.`,
      },
      {
        question: "Hvor meget skal jeg bruge på en god flaske?",
        answer:
          "Det afhænger af formål. Hverdag: 80–130 kr. Weekend: 150–250 kr. Fest: 300–600 kr. Over 600 kr betaler du ofte for sjældenhed mere end smag. Se også " + KOEB + ".",
      },
      {
        question: "Hvor finder jeg aktuelle priser?",
        answer: FORSIDE,
      },
    ],
  };

  return byKat[kat];
}
