/**
 * FAQ til FAQPage JSON-LD for "vin-viden"-guides (hvor længe, hvor mange, hvad er, sådan).
 * Manuel FAQ i guide-faq.ts har altid forrang.
 */

export type VidenFaqItem = { question: string; answer: string };

type Kat =
  | "holdbarhed-rodvin"
  | "holdbarhed-hvidvin"
  | "holdbarhed-bobler"
  | "holdbarhed-rosevin"
  | "holdbarhed-generisk"
  | "mængde-glas"
  | "mængde-kalorier"
  | "mængde-fest"
  | "mængde-bryllup"
  | "hvad-tannin"
  | "hvad-syre"
  | "hvad-terroir"
  | "hvad-restsukker"
  | "hvad-orange"
  | "hvad-biodynamisk"
  | "sadan-dekanter"
  | "sadan-server"
  | "sadan-smag"
  | "generic";

const TEMP = "[opbevaring og temperatur](/guides/opbevaring-af-vin-temperatur-og-aabnet-flaske)";
const BEGREB = "[vinbegreber i praksis](/guides/vin-begreber-i-praksis)";
const KOMPLET = "[komplet guide til vin og mad](/guides/komplet-guide-til-vin-og-mad)";

function kategori(slug: string): Kat {
  if (slug === "hvor-laenge-holder-rodvin") return "holdbarhed-rodvin";
  if (slug === "hvor-laenge-holder-hvidvin") return "holdbarhed-hvidvin";
  if (slug === "hvor-laenge-holder-bobler-og-champagne") return "holdbarhed-bobler";
  if (slug === "hvor-laenge-holder-rosevin") return "holdbarhed-rosevin";
  if (slug === "kan-vin-blive-daarlig") return "holdbarhed-generisk";
  if (slug === "hvor-mange-glas-i-en-flaske-vin") return "mængde-glas";
  if (slug === "hvor-mange-kalorier-i-vin") return "mængde-kalorier";
  if (slug === "hvor-meget-vin-til-fest") return "mængde-fest";
  if (slug === "hvor-meget-vin-til-bryllup") return "mængde-bryllup";
  if (slug === "hvad-er-tanniner") return "hvad-tannin";
  if (slug === "hvad-er-syre-i-vin") return "hvad-syre";
  if (slug === "hvad-er-terroir") return "hvad-terroir";
  if (slug === "hvad-er-restsukker-i-vin") return "hvad-restsukker";
  if (slug === "hvad-er-orange-vin") return "hvad-orange";
  if (slug === "hvad-er-biodynamisk-vin") return "hvad-biodynamisk";
  if (slug === "sadan-dekanterer-du-vin") return "sadan-dekanter";
  if (slug === "sadan-serverer-du-vin") return "sadan-server";
  if (slug === "sadan-smager-du-vin") return "sadan-smag";
  return "generic";
}

function isVidenSlug(slug: string): boolean {
  return (
    slug === "kan-vin-blive-daarlig" ||
    /^hvor-laenge-holder-/.test(slug) ||
    /^hvor-mange-/.test(slug) ||
    /^hvor-meget-vin-/.test(slug) ||
    /^hvad-er-/.test(slug) ||
    /^sadan-(dekanterer|serverer|smager)-/.test(slug)
  );
}

export function getVidenFallbackFaq(slug: string, _title: string): VidenFaqItem[] | null {
  if (!isVidenSlug(slug)) return null;
  const kat = kategori(slug);

  const byKat: Record<Kat, VidenFaqItem[]> = {
    "holdbarhed-rodvin": [
      {
        question: "Hvor længe holder åbnet rødvin i køleskabet?",
        answer:
          "Typisk 3-5 dage med prop i og flasken på køl. Lette røde (pinot noir, gamay) taber karakter efter 2-3 dage, mens kraftige røde (cabernet, malbec) kan holde 5-7 dage.",
      },
      {
        question: "Hvor længe holder uåbnet rødvin?",
        answer:
          "Hverdagsrødvin (under 100 kr) skal drikkes inden 2-3 år. Kvalitetsrødvin (150-300 kr) holder 3-8 år. Lagringsvine (Bordeaux, Barolo, Rioja Gran Reserva) kan udvikle sig 10-30 år ved korrekt opbevaring.",
      },
      {
        question: "Hvordan ved jeg om rødvinen er blevet dårlig?",
        answer: `Tegn: eddike-/neglelakfjerner-lugt, brun farve på ung vin, prop-/mug-lugt (korksmag), flad og kedelig smag uden frugt. Se ${TEMP} for korrekt opbevaring.`,
      },
    ],
    "holdbarhed-hvidvin": [
      {
        question: "Hvor længe holder åbnet hvidvin?",
        answer:
          "3-5 dage på køl med prop i. Lette hvide (sauvignon blanc, pinot grigio) mister friskhed efter 2-3 dage; fyldig fadet chardonnay kan holde 5-7 dage og er ofte bedre dag 2.",
      },
      {
        question: "Hvor længe holder uåbnet hvidvin?",
        answer:
          "De fleste friske hvide (sauvignon blanc, pinot grigio, albariño) 1-2 år. Fadet chardonnay 3-10 år. Tør riesling 2-8 år. Sød Auslese/Sauternes 10-30 år.",
      },
      {
        question: "Skal hvidvin altid opbevares i køleskabet?",
        answer: `Uåbnet hvidvin opbevares bedst ved 12-14 °C — ikke i et varmt køkken, og ikke i uger i køleskab (for tørt). Åbnet hvidvin skal på køl og drikkes indenfor en uge. Se ${TEMP}.`,
      },
    ],
    "holdbarhed-bobler": [
      {
        question: "Hvor længe holder åbnet champagne?",
        answer:
          "1-3 dage i køleskabet, hvis du bruger en champagne-lukke med metalvinger. Uden tætlukke mister vinen brus på få timer. Prosecco holder typisk 1-2 dage; champagne lidt længere.",
      },
      {
        question: "Hvor længe holder uåbnet champagne og bobler?",
        answer:
          "Prosecco 1-3 år. Cava 2-4 år. Non-vintage champagne 3-5 år fra køb. Årgangschampagne 10-25 år i god kælder. Vintage-bobler udvikler brødagtighed og honning med tiden.",
      },
      {
        question: "Kan en ske i flaskehalsen holde brusen?",
        answer:
          "Nej — det er en myte. Brug i stedet en champagne-lukke med metalvinger og hold flasken kold. Kulde holder CO₂ opløst i vinen.",
      },
    ],
    "holdbarhed-rosevin": [
      {
        question: "Hvor længe holder åbnet rosévin?",
        answer:
          "3-4 dage i køleskabet. Rosé er frugt- og syre-drevet, så den taber karakter relativt hurtigt. Brug rest til madlavning eller en rosé-spritz.",
      },
      {
        question: "Hvor længe holder uåbnet rosévin?",
        answer:
          "Drik indenfor 1-2 år fra årgangen. Rosé er designet til ungdom — efter 2 år bliver farven orange og frugten fader. Undtagelse: top-rosé fra Provence, Tavel og Bandol kan holde 3-5 år.",
      },
      {
        question: "Hvordan ved jeg om rosé er for gammel?",
        answer:
          "Mørk oransk/laksefarve i stedet for lyserød, flad smag uden frisk frugt, og gærpreget/madeira-agtig duft. Tjek altid årgangen på flasken.",
      },
    ],
    "holdbarhed-generisk": [
      {
        question: "Kan vin blive farlig at drikke?",
        answer:
          "Nej — dårlig vin smager ubehageligt (eddike, prop, oxidation) men er ikke sundhedsfarlig. Det værste der sker er en skuffende oplevelse. Kassér eller brug til madlavning.",
      },
      {
        question: "Hvad er korksmag (TCA)?",
        answer:
          "TCA er en kemisk forbindelse fra naturkorken der giver vinen en fugtig pap-/mugagtig lugt. Rammer 2-5 % af flasker med naturkork. Reklamer altid hos forhandleren — de tager typisk vinen retur.",
      },
      {
        question: "Kan jeg redde en vin der virker død?",
        answer:
          "Prøv 30 minutter luftning i karaffel — mange unge tannin-dominerede røde åbner markant op. Hvis vinen er oxideret eller korket, kan den ikke reddes.",
      },
    ],
    "mængde-glas": [
      {
        question: "Hvor mange glas vin er der i en flaske?",
        answer:
          "5-6 glas i en standardflaske (75 cl). Restaurant-portion 15 cl giver 5 glas. Hjemme-hygge 12,5 cl giver 6 glas. Champagne/bobler 10 cl giver 7-8 glas.",
      },
      {
        question: "Hvor meget vin er en normal portion?",
        answer:
          "Standardportion er 12,5-15 cl. Champagne ofte 10 cl. Smagning/flight 5 cl. En 'skyllemundfuld' er ca. 5 cl — nok til at vurdere aromaer uden at tømme glasset.",
      },
      {
        question: "Hvor meget vin skal jeg regne med per gæst?",
        answer:
          "Til middag med vin hele aftenen: 1/2 flaske per drikkende gæst. Til cocktailparty uden middag: 2-3 glas per gæst i 3-4 timer. Til bryllup eller lang fest: 1 flaske per voksen gæst.",
      },
    ],
    "mængde-kalorier": [
      {
        question: "Hvor mange kalorier er der i et glas rødvin?",
        answer:
          "90-115 kcal per glas (12,5 cl) for tør rødvin ved 12-13,5 % alkohol. En hel flaske giver 600-700 kcal. Højere alkohol = flere kalorier.",
      },
      {
        question: "Har hvidvin færre kalorier end rødvin?",
        answer:
          "Lidt — fordi hvidvin typisk har lavere alkoholprocent. Men det er ikke farven der afgør; det er alkohol og restsukker. En 11 % hvidvin har færre kalorier end en 14 % rødvin.",
      },
      {
        question: "Hvordan vælger jeg vin med færre kalorier?",
        answer:
          "Vælg tør vin frem for sød, lav alkoholprocent (tysk riesling 8-10 %), bobler (lavere alkohol), mindre glas, eller alkoholfri vin (20-40 kcal/glas).",
      },
    ],
    "mængde-fest": [
      {
        question: "Hvor meget vin skal jeg købe til en fest?",
        answer:
          "Middag: 1/2 flaske per voksen gæst. Cocktailparty uden middag: 2-3 glas per gæst i 3-4 timer. 20 gæster i 3 timer cocktailparty = 8-12 flasker.",
      },
      {
        question: "Hvordan fordeler jeg mellem hvid, rød og bobler?",
        answer:
          "Standardfordeling: 60 % rødvin, 30 % hvidvin, 10 % bobler. Sommer: flip til 40/40/20 med mere hvid og rosé. Vinter/jul: 70/20/10 med tyngden på rødvin.",
      },
      {
        question: "Hvor meget buffer skal jeg regne med?",
        answer:
          "10-20 % ekstra — bedre for meget end for lidt. Mange danske forhandlere tager uåbnede flasker retur efter event. Spørg ved bestilling.",
      },
    ],
    "mængde-bryllup": [
      {
        question: "Hvor meget vin til bryllup per gæst?",
        answer:
          "1 flaske vin per voksen drikkende gæst + 1 glas bobler til velkomst/skål. 100 gæster ≈ 85 fl. vin + 20 fl. bobler. Lang fest: 1,25-1,5 flaske per gæst.",
      },
      {
        question: "Skal jeg vælge champagne eller cava til bryllup?",
        answer:
          "Cava Brut Reserva eller god crémant fungerer perfekt til velkomst og skål — ofte 1/3 pris af champagne med kvalitet der matcher mange brut NV champagner.",
      },
      {
        question: "Hvor tidligt skal jeg bestille?",
        answer:
          "Minimum 3-4 uger før for at sikre leverance og aftale returnering af uåbnede flasker. Kølefad til 50+ gæster bør lejes 1-2 uger før.",
      },
    ],
    "hvad-tannin": [
      {
        question: "Hvad er tanniner, og hvor kommer de fra?",
        answer:
          "Tanniner er naturlige plantestoffer (polyfenoler) fra drueskaller, kerner, stilke og egetræsfad. De giver den snerpende, tørre fornemmelse i munden — og rødvinens struktur og aldringsevne.",
      },
      {
        question: "Hvorfor har rødvin tanniner men ikke hvidvin?",
        answer:
          "Rødvin gæres med skaller og kerner — det trækker tanniner ud. Hvidvin gæres uden skal-kontakt, så tanninerne bliver i presserester. Orange vin (hvid med skal-kontakt) har derfor også tannin.",
      },
      {
        question: "Hvorfor føles unge tanniner så stramme?",
        answer:
          "Unge tanniner er små, skarpe molekyler. Over år polymeriserer de til større molekyler og afsætter som bundfald — vinen bliver blødere. Luftning i karaffel 30-60 min gør unge tanniner mere tilgængelige.",
      },
    ],
    "hvad-syre": [
      {
        question: "Hvad er syre i vin?",
        answer:
          "Naturlige syrer fra druen — primært vinsyre, æblesyre og mælkesyre. Syre giver vinen friskhed, saftighed på siden af tungen, balance og aldringsevne.",
      },
      {
        question: "Hvilke druer har høj syre?",
        answer:
          "Meget høj syre: riesling, sauvignon blanc, chenin blanc, albariño, assyrtiko, champagne. Høj: pinot noir (kølig), gamay, barbera. Lav syre: viognier, grenache, moden cabernet fra varmt klima.",
      },
      {
        question: "Hvorfor er syre vigtig til mad?",
        answer:
          "Syre skærer igennem fedt (smør, fløde, olie) og matcher syre i maden (vinaigrette, citron, tomat). Tommelfingerregel: din vin skal have mindst lige så meget syre som din ret.",
      },
    ],
    "hvad-terroir": [
      {
        question: "Hvad betyder terroir?",
        answer:
          "Et fransk begreb for stedets fingeraftryk i vinen — jord, klima, eksponering, højde, vind og menneskelig tradition. Det er grunden til at samme drue smager forskelligt fra forskellige steder.",
      },
      {
        question: "Kan man smage terroir i vinen?",
        answer:
          "Ja, når produktionen er minimalistisk. En Chablis har stenet mineralitet du ikke finder i californisk chardonnay. En Barolo har tjære og rose som nebbiolo fra andre steder ikke udtrykker på samme måde.",
      },
      {
        question: "Hvorfor er 'single-vineyard' vine dyrere?",
        answer:
          "Fordi terroir-udtrykket er mere afgrænset og ofte mere intenst. Enkelt-mark (crus) har specifik geologi og mikroklima der skaber unikke karaktertræk — og produktionen er lille.",
      },
    ],
    "hvad-restsukker": [
      {
        question: "Hvad er restsukker i vin?",
        answer:
          "Den sukker der bliver tilbage efter gæring. Måles i gram per liter (g/l). Tør vin: under 4 g/l. Halvtør: 4-12 g/l. Halvsød: 12-45 g/l. Sød dessertvin: 45-200+ g/l.",
      },
      {
        question: "Hvorfor smager 'Extra Dry' prosecco sødt?",
        answer:
          "Fordi 'Extra Dry' faktisk er den næstsødeste champagne-/prosecco-kategori (12-17 g/l). 'Brut' er den tørre standard (under 12 g/l). Navngivningen er forvirrende historisk.",
      },
      {
        question: "Hvorfor smager jeg ikke sukkeret i moden riesling?",
        answer:
          "Fordi høj syre maskerer sødme. En tysk Kabinett med 40 g/l restsukker og høj syre smager mindre sødt end en californisk chardonnay med 6 g/l og lav syre.",
      },
    ],
    "hvad-orange": [
      {
        question: "Hvad er orange vin?",
        answer:
          "Hvid vin lavet som rødvin — dvs. gæret med drueskallerne. Det giver gylden-orange farve, tannin (som rødvin) og karakter som tør abrikos, valnød og krydderier. Kategorien stammer fra Georgien for 8.000 år siden.",
      },
      {
        question: "Er orange vin det samme som naturvin?",
        answer:
          "Nej — men der er stort overlap. Orange vin er en teknik (skin-contact). Naturvin er en filosofi (minimal intervention). En orange vin kan være både konventionel og naturvin; en naturvin behøver ikke være orange.",
      },
      {
        question: "Hvad passer orange vin til?",
        answer:
          "Krydret asiatisk mad (thai, indisk, koreansk), fermenteret mad (kimchi, miso), svampe, hård gul ost og charcuteri. Undgå delikate fiskeretter og søde retter.",
      },
    ],
    "hvad-biodynamisk": [
      {
        question: "Hvad er biodynamisk vin?",
        answer:
          "Vin produceret efter Rudolf Steiners biodynamiske landbrugsprincipper (1924). Det er økologisk+ med specielle præparater (kohorn-kompost, kvartspræparater), en kosmisk kalender og holistisk filosofi om vinmarken som levende organisme.",
      },
      {
        question: "Smager biodynamisk vin anderledes?",
        answer:
          "Ofte ja — livligere, klarere frugt, dybere mineralitet. Men det kan også skyldes at biodynamiske producenter generelt er mere omhyggelige end gennemsnittet. Smag og vurder flasken, ikke mærket.",
      },
      {
        question: "Hvordan genkender jeg biodynamisk vin?",
        answer:
          "Demeter eller Biodyvin logo på etiketten. Mange producenter følger biodynamikken uden at betale for certifikat — spørg forhandleren eller producentens hjemmeside.",
      },
    ],
    "sadan-dekanter": [
      {
        question: "Hvornår skal jeg dekantere vin?",
        answer:
          "Unge kraftige rødvine (cabernet, barolo, ung syrah, malbec, bordeaux) for at lufte tanninerne. Og gamle modne flasker (10+ år) for at skille bundfald fra. Lette røde, hvidvin og bobler dekanteres normalt ikke.",
      },
      {
        question: "Hvor længe skal vinen stå i karaffel?",
        answer:
          "Unge, stramme røde: 30-60 minutter for luftning. Modne vine med bundfald: kun 5-10 minutter — de er skrøbelige og tåler ikke for meget luft.",
      },
      {
        question: "Skal jeg bruge en særlig karaffel?",
        answer: `En bred karaffel med stor bund maksimerer luftkontakten. Slanke høje karafler er elegante ved bordet men giver mindre luftning. Se ${TEMP} for øvrige servering-tip.`,
      },
    ],
    "sadan-server": [
      {
        question: "Ved hvilken temperatur skal rødvin serveres?",
        answer:
          "Lette røde (pinot, gamay) 14-16 °C. Mellemfyldige (sangiovese, merlot) 15-17 °C. Kraftige (cabernet, malbec, barolo) 16-18 °C. Aldrig stuetemperatur på 22+ °C — 15 min i køleskab redder ofte dagen.",
      },
      {
        question: "I hvilken rækkefølge skal vinene serveres?",
        answer:
          "Let før kraftig, hvid før rød, tør før sød, ung før gammel. Middag med 3 vine: velkomstbobler → hvidvin til forret → rødvin til hovedret → evt. dessertvin.",
      },
      {
        question: "Hvilket glas passer til hvilken vin?",
        answer:
          "Bourgogne-glas (bred bug) til delikate røde og hvide. Bordeaux-glas (høj smal) til kraftige røde. Hvidvin-glas til friske hvide. Hvidvin-glas fungerer også bedre end flute til champagne.",
      },
    ],
    "sadan-smag": [
      {
        question: "Hvordan smager jeg systematisk en vin?",
        answer:
          "Følg de 5 S'er: Se (farve, klarhed), Svæng (viskositet), Smell (aromaer i 3 lag: primær, sekundær, tertiær), Sip (syre, tannin, alkohol, krop), Savor (finish, balance, helhed).",
      },
      {
        question: "Hvor længe skal jeg holde vinen i munden?",
        answer:
          "3-5 sekunder. Lad vinen fylde hele munden og sug luft ind over tungen — det forstærker aromaerne. Spyt eller slug; professionelle smagere spytter for at kunne smage mange vine i træk.",
      },
      {
        question: "Hvad er 'finish' i en vin?",
        answer: `Hvor længe smagen hænger i munden efter du har slukket. Kort (under 5 sek): simpel vin. Middel (5-15 sek): god hverdagsvin. Lang (15-30+ sek): kvalitetsvin. Se også ${BEGREB}.`,
      },
    ],
    generic: [
      {
        question: "Hvor finder jeg mere viden om vin?",
        answer: `Vinbots vin-viden samler svar på de mest googlede spørgsmål. Se også ${BEGREB} for terminologi og ${KOMPLET} for praktiske parringer.`,
      },
      {
        question: "Skal jeg blive sommelier for at drikke god vin?",
        answer:
          "Nej. Lidt systematik hjælper, men smagen er din. Start med at lære 3-5 klassiske regioner og deres druer — så har du en base du kan udvide fra.",
      },
      {
        question: "Hvor finder jeg konkrete flasker?",
        answer: "Brug søgningen på forsiden for at sammenligne flasker med pris fra flere forhandlere.",
      },
    ],
  };

  return byKat[kat];
}
