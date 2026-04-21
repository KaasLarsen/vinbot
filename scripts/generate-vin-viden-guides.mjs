// Genererer 18 "vin-viden"-guides (hvor længe holder, hvor mange, hvad er, sådan gør).
// Slettes når filerne er på plads.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "content", "guides");
const UPDATED = "2026-04-21";
const HUB = "vin-viden";

function sa(href, label) {
  return `[${label}](/guides/${href})`;
}

const TEMP = sa("opbevaring-af-vin-temperatur-og-aabnet-flaske", "temperatur og opbevaring");
const BEGREB = sa("vin-begreber-i-praksis", "vinbegreber i praksis");
const KOMPLET = sa("komplet-guide-til-vin-og-mad", "komplet guide til vin og mad");
const NATUR = sa("naturvin-hvad-er-det", "naturvin");
const BOBLER = sa("bobler-champagne-cava-prosecco-og-cremant", "bobler, champagne og cava");
const ETIKET = sa("sadan-laeser-du-vinflaskens-etiket", "læs etiketten");
const ALKFRI = sa("alkoholsvag-og-alkoholfri-vin", "alkoholsvag og alkoholfri vin");

const PAGES = [
  // ========== HOLDBARHED (5) ==========
  {
    slug: "hvor-laenge-holder-rodvin",
    title: "Hvor længe holder rødvin? Åbnet, uåbnet og i karaffel",
    description:
      "Hvor længe holder rødvin? 3-5 dage åbnet på køl, mange år uåbnet. Guide til holdbarhed, opbevaring og tegn på at rødvinen er blevet dårlig.",
    tags: ["viden", "holdbarhed", "rødvin", "opbevaring"],
    sections: [
      {
        h: "Kort svar: 3-5 dage åbnet, år uåbnet",
        body: "**Åbnet rødvin** holder typisk **3-5 dage** i køleskabet med prop i. **Lette røde** (pinot noir, gamay) taber karakter hurtigere — regn med **2-3 dage**. **Kraftige røde** (cabernet, malbec, nebbiolo) kan holde **5-7 dage**. **Uåbnet rødvin** holder alt fra **2 år** (hverdagsvin) til **20+ år** (kvalitetsproducenter fra Bordeaux, Barolo, Napa). Nøgleordet er **mørk, kølig og rolig** opbevaring — uanset om flasken er åbnet eller ej."
      },
      {
        h: "Åbnet flaske: så længe holder den typisk",
        body: "**Dag 1:** vinen er ofte bedst — tanninerne er afrundet efter luftning. **Dag 2-3:** stabilt niveau hvis proppen er sat tilbage og flasken står på køl. **Dag 4-5:** frugten fader, men vinen er stadig drikkelig til madlavning eller hverdagsbrug. **Efter dag 5:** syre og oxideret tone tager over. **Tip:** kom **resten i en mindre flaske med skruelåg** — mindre luft = længere holdbarhed. En **vakuumpumpe (Vacuvin)** eller **Coravin** forlænger holdbarheden med flere dage."
      },
      {
        h: "Uåbnet flaske: afhænger af vinens type",
        body: "**Hverdagsrødvin under 100 kr:** drik inden **2-3 år** fra årgangen — frugten toppes tidligt. **Kvalitetsrødvin 150-300 kr:** **3-8 år** afhængigt af stil. **Lagringsvine 400+ kr:** **10-30 år** for top-Bordeaux, Barolo, Rioja Gran Reserva. **Naturvin og letsvovlede vine:** ofte mere ustabile — drik indenfor **1-2 år**. Se " + TEMP + " for korrekt opbevaring."
      },
      {
        h: "Tegn på at rødvinen er blevet dårlig",
        body: "**Eddike-agtig lugt (VA):** vinen er oxideret eller begyndt bakteriel nedbrydning — kassér. **Brun farve** (på en ung vin): oxidation. **Flad, kedelig smag uden frugt:** vinen er gået i stå — stadig ufarlig, men ikke rar. **Prop-smag (TCA):** lugter af fugtig papkælder eller våd hund — flasken er **korket** og bør reklameres. **Undgå at kassere for tidligt:** giv vinen **15-30 minutter i karaffel** — mange unge røde åbner markant op efter luftning."
      },
      {
        h: "Sådan forlænger du holdbarheden",
        body: "**1. Proppen i og på køl** — også rødvin. Kold temperatur bremser oxidation. **2. Mindre flaske** — skift til en halv flaske med skruelåg for mindre luft. **3. Vakuumpumpe** — fjerner luft via en prop med ventil; giver **2-3 ekstra dage**. **4. Coravin** — nål gennem proppen og argon-gas ind; vinen holder **uger til måneder** uåbnet. **5. Frys restvinen** i isterning-bakker til madlavning — holder måneder."
      },
      {
        h: "Søg vin",
        body: "**[Søg rødvin på Vinbot](/?q=r%C3%B8dvin)** — eller læs " + KOMPLET + " for at finde vine der passer til maden."
      }
    ],
    links: [
      sa("hvor-laenge-holder-hvidvin", "hvor længe holder hvidvin"),
      sa("hvor-laenge-holder-bobler-og-champagne", "hvor længe holder bobler"),
      sa("kan-vin-blive-daarlig", "kan vin blive dårlig"),
      sa("sadan-dekanterer-du-vin", "sådan dekanterer du vin"),
      sa("opbevaring-af-vin-temperatur-og-aabnet-flaske", "opbevaring og temperatur"),
      sa("bedste-rodvin", "bedste rødvin")
    ]
  },
  {
    slug: "hvor-laenge-holder-hvidvin",
    title: "Hvor længe holder hvidvin? Åbnet og uåbnet",
    description:
      "Hvor længe holder hvidvin? 3-5 dage åbnet på køl, 1-3 år uåbnet for de fleste. Guide til holdbarhed, opbevaring og hvornår du skal drikke den.",
    tags: ["viden", "holdbarhed", "hvidvin", "opbevaring"],
    sections: [
      {
        h: "Kort svar: 3-5 dage åbnet, 1-3 år uåbnet",
        body: "**Åbnet hvidvin** holder **3-5 dage** i køleskabet med prop i. **Sart hvidvin** (sauvignon blanc, pinot grigio) mister friskhed hurtigere — regn med **2-3 dage**. **Fyldigere hvidvin** (chardonnay på fad, viognier, moden riesling) kan holde **5-7 dage** eller endda bedre på dag 2 end dag 1. **Uåbnet hvidvin** holder **1-3 år** for typiske hvide, men **10-20 år** for Chablis grand cru, tysk riesling Auslese og andre lagringshvide."
      },
      {
        h: "Åbnet: så længe holder den",
        body: "**Dag 1:** klassisk frisk profil. **Dag 2:** ofte bedre for fadede chardonnay og moden riesling (let oxidation giver dybde). **Dag 3-4:** lette hvide taber aroma, fyldigere holder stadig. **Dag 5+:** kun velegnet til madlavning eller tapas i gryde. **Skruelåg vs. prop:** skruelåg er **bedre** til at holde frisk aroma fordi de tætner mere end naturkork. **Kulsyreperler** (spritz) forsvinder hurtigt — og det er ofte det første tegn på aldring."
      },
      {
        h: "Uåbnet: hvornår skal den drikkes?",
        body: "**Sauvignon blanc, pinot grigio, albariño, grüner veltliner:** drik indenfor **1-2 år** — ung, frugtpræget stil. **Chardonnay ikke-fad:** **1-3 år**. **Fadet chardonnay (Meursault-stil):** **3-10 år**. **Tør riesling:** **2-8 år**. **Sød riesling Spätlese/Auslese:** **10-30 år**. **Champagne årgang:** **5-15 år**. Se også " + ETIKET + " for at finde årgang på flasken."
      },
      {
        h: "Tegn på at hvidvinen er dårlig",
        body: "**Mørkgul eller brun farve:** oxidation — vinen har fået for meget luft. **Flad, uden syre:** frugten er fordampet. **Eddike-lugt:** bakteriel nedbrydning. **Prop-smag (TCA):** lugter af fugtigt papir; reklamer hos forhandleren. **Saffran eller karamel-toner** i en ung frisk hvidvin: oxidation. En moden riesling må gerne dufte af honning og petroleum — det er **karakter, ikke fejl**."
      },
      {
        h: "Sådan forlænger du holdbarheden",
        body: "**Kold, ustabil temperatur er fjenden** — sæt flasken tilbage på køl inden for 30 minutter. **Brug et vin-dutter** eller **vakuumpumpe**. **Skift til halv flaske**. **Coravin** med argon giver weeks/måneder. **Frys ikke uåbnet hvidvin** — risiko for at proppen presses ud ved udvidelse. **Restvin** kan fryses i isterning-bakker til madlavning eller drinks."
      },
      {
        h: "Søg vin",
        body: "**[Søg hvidvin på Vinbot](/?q=hvidvin)**. Se også " + KOMPLET + "."
      }
    ],
    links: [
      sa("hvor-laenge-holder-rodvin", "hvor længe holder rødvin"),
      sa("hvor-laenge-holder-rosevin", "hvor længe holder rosévin"),
      sa("kan-vin-blive-daarlig", "kan vin blive dårlig"),
      sa("opbevaring-af-vin-temperatur-og-aabnet-flaske", "opbevaring og temperatur"),
      sa("sadan-serverer-du-vin", "sådan serverer du vin"),
      sa("bedste-hvidvin", "bedste hvidvin")
    ]
  },
  {
    slug: "hvor-laenge-holder-bobler-og-champagne",
    title: "Hvor længe holder champagne og bobler? Åbnet og uåbnet",
    description:
      "Hvor længe holder åbnet champagne, cava og prosecco? 1-3 dage med champagnelukke. Uåbnet: 3-15 år. Guide til holdbarhed og brus-bevarelse.",
    tags: ["viden", "holdbarhed", "champagne", "bobler"],
    sections: [
      {
        h: "Kort svar: 1-3 dage åbnet, år uåbnet",
        body: "**Åbnet champagne og cava** holder **1-3 dage** i køleskabet **hvis du bruger en champagne-lukke** (den med metalvinger) — ikke silikone-prop eller ske i halsen. **Prosecco** taber brus hurtigere (**1-2 dage**) fordi den er lavere i trykket. **Uåbnet non-vintage champagne** holder **3-5 år** fra køb — producenterne har allerede modnet den. **Årgangschampagne** kan modne **10-25 år**. **Prosecco og de fleste cava** skal drikkes **indenfor 2-3 år** — de er designet til ungdom."
      },
      {
        h: "Bevar brusen åbnet",
        body: "**1. Champagne-lukke med metalvinger** — holder trykket indefra. **2. Straks på køl** — kulde holder CO₂ opløst i vinen. **3. Undgå skeen:** myten om en ske i halsen **virker ikke** videnskabeligt. **4. Drik det kolde glas først** — når temperaturen stiger, mister vinen brus. **5. Brug ikke kork-stopper** uden vinger — den lækker tryk. En **åben flaske champagne med rigtig lukke** kan holde **2-3 dage** med fin brus."
      },
      {
        h: "Uåbnet: holdbarhed efter type",
        body: "**Prosecco DOC/DOCG:** **1-3 år** — friskhed er pointen. **Cava brut:** **2-4 år**. **Non-vintage champagne (Brut NV):** **3-5 år** fra køb, **5-7 år** fra produktion. **Vintage/årgangs-champagne:** **10-25 år** i god kælder — udvikler brødagtighed, hasselnød og honning. **Crémant:** **3-5 år**. **Franciacorta:** som champagne. Mere om typerne i " + BOBLER + "."
      },
      {
        h: "Tegn på dårlig bobler",
        body: "**Ingen brus ved åbning:** flasken har mistet trykket — prop-utæt. **Mørkgul eller brun:** for gammel, oxideret. **Æble-/eddike-lugt:** oxidation. **Flad, uden frugt:** non-vintage der har stået for længe. **Kork-smag (TCA):** fugtig pap-lugt — reklamer. En gammel champagne må gerne være **gylden og dufte af brioche og honning** — det er modning, ikke fejl."
      },
      {
        h: "Opbevaring: mørkt, koldt, på siden",
        body: "**12-15 °C** er optimalt — tæt på et vinkøleskab. **Fladen eller siden:** for champagne med naturprop er sideopbevaring ikke strengt nødvendigt (CO₂ holder prop fugtig), men **mørkt og stabilt** betyder meget. **Køleskab i uger er fint** — men **måneder** udtørrer andre ting i køleskabet og kan påvirke proppen. **Frys aldrig** uåbnet — flasken eksploderer."
      },
      {
        h: "Søg bobler",
        body: "**[Søg champagne og bobler på Vinbot](/?q=champagne%20bobler%20cava%20prosecco)**."
      }
    ],
    links: [
      sa("bobler-champagne-cava-prosecco-og-cremant", "bobler, champagne og cava"),
      sa("bedste-bobler", "bedste bobler"),
      sa("bedste-champagne", "bedste champagne"),
      sa("hvor-laenge-holder-hvidvin", "hvor længe holder hvidvin"),
      sa("sadan-serverer-du-vin", "sådan serverer du vin"),
      sa("opbevaring-af-vin-temperatur-og-aabnet-flaske", "opbevaring og temperatur")
    ]
  },
  {
    slug: "hvor-laenge-holder-rosevin",
    title: "Hvor længe holder rosévin? Åbnet og uåbnet",
    description:
      "Hvor længe holder rosévin? 3-4 dage åbnet på køl, 1-2 år uåbnet. Guide til holdbarhed, opbevaring og hvornår rosé smager bedst.",
    tags: ["viden", "holdbarhed", "rosévin", "opbevaring"],
    sections: [
      {
        h: "Kort svar: 3-4 dage åbnet, 1-2 år uåbnet",
        body: "**Åbnet rosévin** holder **3-4 dage** i køleskabet med prop i. Rosé er **frugt- og syre-drevet** — ikke tannin-drevet — så den taber karakter relativt hurtigt. **Uåbnet rosé** skal typisk drikkes **indenfor 1-2 år** fra årgangen. En 2024-rosé er bedst i 2024 og 2025 — **drik den ung**, mens frugten stadig er levende."
      },
      {
        h: "Hvorfor rosé skal drikkes ungt",
        body: "Rosé laves for at fange **frisk frugt** (jordbær, hindbær, citrus), **lys farve** og **knivskarp syre**. Det er aldrig en lagringsvin. Efter 2 år begynder den at: **blive dyb oransk**, **miste aroma**, og **smage fladt**. Undtagelsen er **top-rosé fra Provence, Tavel og Bandol** — de kan holde **3-5 år** og udvikle mere kompleksitet, men er i mindretal. Almindelig supermarkeds-rosé er bedst lige nu."
      },
      {
        h: "Åbnet rosé: så længe holder den",
        body: "**Dag 1-2:** friskest, bedste udtryk. **Dag 3:** stadig god, let afrundet frugt. **Dag 4:** sidste dag — brug evt. til at lave rosé-spritz med bobler. **Dag 5+:** ikke værd at drikke — lav en madvin ud af den (risotto, sauce). **Tip:** rosé har **tæt-høj syre** som hjælper den holde lidt bedre end en lige så letfyldig hvidvin."
      },
      {
        h: "Uåbnet: hvornår bedst?",
        body: "**Provence rosé, dansk rosé, spansk rosado:** drik **indenfor 1-2 år** fra årgangen. **Rosé champagne:** **3-8 år** er fint. **Tavel, Bandol rosé:** kan holde **3-5 år**, undertiden længere. **Tip:** tjek **årgangen på flasken** — rosé uden årgang (NV) eller med gammel årgang er kategoriens svageste."
      },
      {
        h: "Tegn på at rosé er for gammel",
        body: "**Mørk oransk eller laksefarve** hvor du forventede lyserød. **Flad, uden frisk frugt**. **Oxideret, gærpreget duft** (madeira-agtig). **Saffran-toner** i glasset. **Modsat:** moderne Provence-rosé har bevidst lys orange-pink farve — det er **stil, ikke fejl**. Kig på årgangen: er den 2 år gammel eller mere, er der grund til forsigtighed."
      },
      {
        h: "Søg rosé",
        body: "**[Søg rosévin på Vinbot](/?q=ros%C3%A9%20provence)**."
      }
    ],
    links: [
      sa("bedste-rosevin", "bedste rosévin"),
      sa("bedste-rosevin-under-150-kr", "rosé under 150 kr"),
      sa("rosevin-til-mad-og-sommer", "rosévin til mad og sommer"),
      sa("hvor-laenge-holder-hvidvin", "hvor længe holder hvidvin"),
      sa("kan-vin-blive-daarlig", "kan vin blive dårlig"),
      sa("opbevaring-af-vin-temperatur-og-aabnet-flaske", "opbevaring og temperatur")
    ]
  },
  {
    slug: "kan-vin-blive-daarlig",
    title: "Kan vin blive dårlig? Tegn, fejl og hvornår du skal kassere",
    description:
      "Kan vin blive dårlig? Ja — men det er sjældent farligt. Lær at genkende prop, oxidation, eddike og hvornår flasken bare skal kasseres.",
    tags: ["viden", "holdbarhed", "fejl", "prop"],
    sections: [
      {
        h: "Kort svar: ja, men sjældent farligt",
        body: "**Vin kan godt blive dårlig** — enten fejlproduceret fra flasken eller gået dårligt over tid. **Men det er næsten aldrig farligt** at smage — det smager bare ubehageligt. De tre mest almindelige fejl er **korksmag (TCA)**, **oxidation** og **eddike (VA)**. En flaske der står for længe eller forkert, kan også blive **flad og kedelig** uden direkte fejl. Lær tegnene, så du ved hvornår du skal kassere og hvornår flasken bare skal luftes eller bruges til madlavning."
      },
      {
        h: "Korksmag (TCA) — den hyppigste fejl",
        body: "**TCA** (trichloranisol) er et kemisk stof der dannes i naturkorken og spreder sig til vinen. **Lugten er umiskendelig:** fugtigt papir, våd hund, muggen kælder, vådt pap. Fejlen rammer **2-5 % af alle flasker med naturkork** — derfor skifter mange producenter til **skruelåg, DIAM eller agglomereret kork**. Hvis du får en korket flaske: **reklamer hos forhandleren**, de er typisk meget imødekommende. TCA er **ikke farligt**, men vinen er ubrugelig."
      },
      {
        h: "Oxidation — brun farve og kedelig frugt",
        body: "**Oxidation** opstår når vinen får for meget luft over lang tid. **Tegn:** mørkgul/brun farve (på hvid), brunlig-rødlig (på rød), **kedelig frugt**, **sherry-/æble-agtig duft** på en ung vin. Årsager: utæt prop, for varm opbevaring, flasken er for gammel. **Nogle vine (oloroso sherry, tawny port, orange vin)** er oxideret **med vilje** — det er deres stil. Men en ung Chablis der smager af sherry er ødelagt."
      },
      {
        h: "Eddike (VA/flygtige syrer) — den klare fejl",
        body: "**VA (volatile acidity)** er ofte eddikesyre og giver vinen **stikkende, eddike-/neglelakfjerner-lugt**. Alle vine har **lidt** VA — det er en del af kompleksiteten — men på et vist niveau bliver det overdrevent og ødelæggende. **Naturvin** har ofte høj VA som stil-valg; **konventionel vin** skal have lavt niveau. Hvis vinen lugter som en **æblecider der er gået dårligt**, så er den. Kassér eller brug til vinaigrette."
      },
      {
        h: "Flad og kedelig — ikke fejl, bare død",
        body: "En vin kan være **uden egentlige fejl** men stadig smage kedeligt: frugten er fordampet, syren er fladet ud, og der er ikke liv i glasset. **Ofte årsag:** for gammel for sin type (fx 5 år gammel pinot grigio), opbevaret varmt eller i sollys, eller en hverdagsvin der er drukket over lang tid efter åbning. **Tip:** prøv **luftning i karaffel 30 minutter** — mange vine vågner op. Hvis ikke, lav en rødvinssovs eller risotto."
      },
      {
        h: "Hvornår skal du kassere?",
        body: "**Kassér hvis:** tydelig eddike eller neglelakfjerner, kraftig prop-/mug-lugt, brun farve på en ung vin kombineret med kedelig smag, **eller** vinen smager så ubehageligt at du ikke har lyst. **Reklamer:** hvis flasken er nyåbnet og tydeligt korket eller fejlproduceret, tag den med tilbage til forhandleren — de giver næsten altid pengene igen eller en ny flaske. **Gem aldrig** ubehagelig vin i håb om at den bliver bedre — den bliver værre."
      }
    ],
    links: [
      sa("hvor-laenge-holder-rodvin", "hvor længe holder rødvin"),
      sa("hvor-laenge-holder-hvidvin", "hvor længe holder hvidvin"),
      sa("hvor-laenge-holder-bobler-og-champagne", "hvor længe holder champagne"),
      sa("opbevaring-af-vin-temperatur-og-aabnet-flaske", "opbevaring og temperatur"),
      sa("hvad-er-syre-i-vin", "hvad er syre i vin"),
      sa("naturvin-hvad-er-det", "naturvin")
    ]
  },
  // ========== MÆNGDE / PRAKTISK (4) ==========
  {
    slug: "hvor-mange-glas-i-en-flaske-vin",
    title: "Hvor mange glas vin i en flaske? 5-6 glas for 75 cl",
    description:
      "Hvor mange glas vin får du ud af en flaske? 5-6 glas af 12,5-15 cl i en standardflaske på 75 cl. Guide til portionering, fest og bryllup.",
    tags: ["viden", "mængde", "fest", "portion"],
    sections: [
      {
        h: "Kort svar: 5-6 glas per flaske",
        body: "En **standardflaske vin** er **75 cl (750 ml)**. Med et **standardglas** på **12,5-15 cl** får du **5-6 glas** ud af flasken. Restaurant-portioner er typisk **15 cl** (= 5 glas per flaske), mens hjemme-hygge ofte er **12,5 cl** (= 6 glas). Til **champagne** og bobler bruges **10 cl** (= 7-8 glas per flaske)."
      },
      {
        h: "Standardportioner i glas og cl",
        body: "**Restaurant/hverdag:** 15 cl = **5 glas per flaske**. **Hjemme-hygge/aften:** 12,5 cl = **6 glas per flaske**. **Smagning/flight:** 5 cl = **15 glas per flaske**. **Champagne/bobler:** 10 cl = **7-8 glas per flaske**. **Cocktail med vin (spritz):** 10-12 cl vin = **6-7 servings**. Husk: restaurant-stjerner som Noma serverer kun **7 cl** i en wine pairing — meget små portioner."
      },
      {
        h: "Hvor meget vin til middag?",
        body: "**Tommelfingerregel:** **½ flaske per person** hvis der drikkes hele aftenen. **Middag med 4 personer:** regn med **2 flasker**. **6 personer:** **3 flasker**. **8-10 personer:** **4-5 flasker**. Hvis du serverer **velkomstdrink + vin til 3 retter**, så **1 flaske per 2 personer** er et sikkert udgangspunkt. **Bobler/champagne til velkomst:** regn med **1 flaske per 4-5 personer**."
      },
      {
        h: "Hvor meget til fest (20+ personer)?",
        body: "Ved **fest eller cocktailparty** (over 2-4 timer uden middag): **2-3 glas per gæst** i snit. **20 personer** = **40-60 glas** = **8-12 flasker** (regn med mix af hvid/rød/bobler). **50 personer** = **20-25 flasker**. **100 personer** = **40-50 flasker**. **Tip:** **10 % flere flasker** hvis event er over 4 timer eller med mange vin-entusiaster. Se også " + sa("hvor-meget-vin-til-fest", "hvor meget vin til fest") + "."
      },
      {
        h: "Flaskestørrelser — fra halv til Nebukadnezar",
        body: "**Piccolo (20 cl):** **1-2 glas**, typisk prosecco. **Halv flaske (37,5 cl):** **2-3 glas**. **Standardflaske (75 cl):** **5-6 glas**. **Magnum (1,5 l):** **10-12 glas** — ideelt til 4-6 personer, langsommere oxidation. **Jéroboam (3 l):** **20 glas**. **Imperial/Methuselah (6 l):** **40 glas**. **Salmanazar (9 l):** **60 glas**. Magnum modner **langsommere og bedre** end standard — en klassisk fest-investering."
      },
      {
        h: "Søg vin",
        body: "**[Søg fest-vin på Vinbot](/?q=fest%20selskab%20kasse)**."
      }
    ],
    links: [
      sa("hvor-meget-vin-til-fest", "hvor meget vin til fest"),
      sa("hvor-meget-vin-til-bryllup", "hvor meget vin til bryllup"),
      sa("hvor-mange-kalorier-i-vin", "kalorier i vin"),
      sa("bedste-vin-til-gave", "bedste vin til gave"),
      sa("bedste-bobler", "bedste bobler"),
      sa("sadan-serverer-du-vin", "sådan serverer du vin")
    ]
  },
  {
    slug: "hvor-mange-kalorier-i-vin",
    title: "Hvor mange kalorier er der i vin? Per glas og flaske",
    description:
      "Hvor mange kalorier i vin? Ca. 80-120 kcal per glas (12,5 cl) og 600-700 kcal per flaske. Guide til rødvin, hvidvin, bobler og sød vin.",
    tags: ["viden", "kalorier", "sundhed", "alkohol"],
    sections: [
      {
        h: "Kort svar: 80-120 kcal per glas",
        body: "En **almindelig tør vin** har **80-120 kcal per glas** (12,5 cl) og **600-750 kcal per flaske**. Jo højere **alkoholprocent** og **restsukker**, jo flere kalorier. **Tør rødvin** og **tør hvidvin** ligger omtrent ens i kalorier — det er ikke farven, men **alkohol + sukker** der afgør. **Champagne** og **bobler** er typisk **lidt færre kalorier** (80-95 kcal per glas) pga. lavere alkoholprocent. **Dessertvin** og **portvin** er de mest kaloriefulde."
      },
      {
        h: "Kalorier efter vintype",
        body: "**Tør rødvin (12-13,5 %):** 90-115 kcal/glas · 600-700 kcal/flaske · **Tør hvidvin (11-13 %):** 80-110 kcal/glas · 550-650 kcal/flaske · **Rosé tør (11-12,5 %):** 80-105 kcal/glas · 550-650 kcal/flaske · **Champagne/bobler brut (11-12 %):** 80-95 kcal/glas · 550-600 kcal/flaske · **Sød vin (riesling Auslese, Sauternes):** 130-180 kcal/glas · 800-1100 kcal/flaske · **Portvin/sherry (18-20 %):** 150-200 kcal/glas · meget højere ved større glas · **Alkoholfri vin:** **20-40 kcal/glas** — op til 2/3 færre kalorier."
      },
      {
        h: "Hvor kommer kalorierne fra?",
        body: "**Alkohol:** 7 kcal per gram — det meste af kalorierne. **Restsukker:** 4 kcal per gram — betyder mest i søde vine. **Fedt og protein:** ingen — vin indeholder ikke det. Derfor er **tør hvidvin ved 11 %** lavere i kalorier end **tør rødvin ved 14 %** — alkoholen er forskellen. **Alkoholprocent på etiketten** er den bedste indikator. Se " + ETIKET + "."
      },
      {
        h: "Sådan holder du kalorierne nede",
        body: "**Vælg tør vin** frem for sød eller halvtør. **Vælg lavere alkoholprocent** — tysk riesling ved 8-10 % har langt færre kalorier end californisk zinfandel ved 15 %. **Drik bobler** — de har ofte lavere alkohol. **Brug mindre glas** — 10 cl i stedet for 15 cl sparer 30 %. **Prøv " + ALKFRI + "** — 20-40 kcal/glas i stedet for 100+. **Undgå spritz med sukkerholdig tonic** — det øger markant."
      },
      {
        h: "Vin vs. andre drikke — sammenligning",
        body: "**Glas tør rødvin (12,5 cl, 13%):** ~105 kcal. **Glas øl (33 cl, 4,6%):** ~150 kcal. **Glas stærk øl (33 cl, 7,5%):** ~230 kcal. **Gin & tonic (30 cl):** ~180 kcal. **Aperol spritz:** ~150-200 kcal. **Cocktail med sukkersirup:** ofte 250-400 kcal. Pointen: **vin er ikke den kaloriefulde drink** — sukker i cocktails og kraftig øl overgår vin markant."
      },
      {
        h: "Søg vin",
        body: "**[Søg alkoholfri vin på Vinbot](/?q=alkoholfri%20lav%20alkohol)**."
      }
    ],
    links: [
      sa("alkoholsvag-og-alkoholfri-vin", "alkoholsvag og alkoholfri vin"),
      sa("bedste-alkoholfri-vin", "bedste alkoholfri vin"),
      sa("hvor-mange-glas-i-en-flaske-vin", "glas i en flaske"),
      sa("hvad-er-restsukker-i-vin", "restsukker i vin"),
      sa("sadan-laeser-du-vinflaskens-etiket", "læs etiketten"),
      sa("bedste-hvidvin", "bedste hvidvin")
    ]
  },
  {
    slug: "hvor-meget-vin-til-fest",
    title: "Hvor meget vin til fest? Beregn flasker per gæst",
    description:
      "Hvor meget vin til fest? Regn med 1/2 flaske per gæst til middag, 2-3 glas til cocktailparty. Guide til beregning efter længde og type.",
    tags: ["viden", "fest", "mængde", "portion"],
    sections: [
      {
        h: "Kort svar: 1/2 flaske per gæst",
        body: "**Tommelfingerregel for middag med vin:** **1/2 flaske (ca. 3 glas) per voksen gæst**. Til **cocktailparty uden middag** regner du med **2-3 glas per gæst i 3-4 timer**. For **fest med middag + velkomst + efter-middag:** **3/4 til 1 flaske per gæst** hvis der drikkes aktivt. **Børn, kørende og ikke-drikkende** trækker fra beregningen — regn kun flasker på de der drikker vin."
      },
      {
        h: "Middag — regn efter retter",
        body: "**Velkomstdrink (bobler):** 1 glas per gæst = **1 flaske per 6 personer**. **Forret (hvidvin):** 1 glas per gæst = **1 flaske per 6**. **Hovedret (rødvin):** 2 glas per gæst = **1 flaske per 3**. **Dessert (sød vin eller kaffe):** 1 glas per 3 gæster = **1 flaske per 15**. **Eksempel: 12 personer til 3-retters middag med velkomst:** 2 fl. bobler + 2 fl. hvidvin + 4 fl. rødvin + 1 fl. dessertvin = **9 flasker**."
      },
      {
        h: "Cocktailparty / reception",
        body: "**Kort event (1-2 timer):** **1-1,5 glas per gæst**. **Middel event (2-4 timer):** **2-3 glas per gæst**. **Lang aften (4+ timer):** **3-5 glas per gæst**. Typisk **50/50 mix** af hvid/bobler og rød. **50 gæster i 3 timer:** ca. **100-125 glas** = **20-25 flasker**. **100 gæster i 4 timer:** **50-70 flasker**. Tilføj **10-20 % buffer** — løber du tør, er festen forbi."
      },
      {
        h: "Fordeling mellem typer",
        body: "**Standardfordeling til middagsselskab:** **60 % rødvin**, **30 % hvidvin**, **10 % bobler** (for velkomst/dessert). **Sommer/terrasse:** flip til **40 % rødvin, 40 % hvidvin, 20 % rosé/bobler**. **Vinter/julemad:** **70 % rødvin, 20 % hvidvin, 10 % bobler**. **Justér** efter gæsterne — spørg evt. inviterede om de foretrækker hvid eller rød."
      },
      {
        h: "Tip til indkøb og opbevaring",
        body: "**Køb 10-20 % for meget** — for lidt vin er værre end for meget. **Uåbnede flasker** kan returneres mange steder — spørg forhandleren. **Køl hvidvin og bobler 2-4 timer før** servering — aldrig i fryseren (risiko for eksplosion). **Dekanter kraftig rødvin 1 time før gæsterne kommer**. **Flere flasker i iskøler** — erstat med lunere flasker løbende. Se " + TEMP + "."
      },
      {
        h: "Søg vin til fest",
        body: "**[Søg vin til fest på Vinbot](/?q=fest%20selskab%20kasse)**."
      }
    ],
    links: [
      sa("hvor-meget-vin-til-bryllup", "hvor meget vin til bryllup"),
      sa("hvor-mange-glas-i-en-flaske-vin", "glas i en flaske"),
      sa("bedste-bobler", "bedste bobler"),
      sa("bedste-vin-til-hverdag", "bedste hverdagsvin"),
      sa("sadan-serverer-du-vin", "sådan serverer du vin"),
      sa("vin-til-julefrokost", "vin til julefrokost")
    ]
  },
  {
    slug: "hvor-meget-vin-til-bryllup",
    title: "Hvor meget vin til bryllup? Beregn flasker per gæst",
    description:
      "Hvor meget vin til bryllup? Regn med 1 flaske per voksen gæst til fest med middag. Komplet guide til beregning, fordeling og indkøb.",
    tags: ["viden", "bryllup", "fest", "mængde"],
    sections: [
      {
        h: "Kort svar: 1 flaske per voksen gæst",
        body: "**Til et typisk bryllup med velkomst + 3-retters middag + fest** regnes der **1 flaske vin per voksen drikkende gæst**. **100 gæster** (heraf fx 85 drikkende) = **85 flasker vin** + **1 glas bobler per gæst til velkomst/skål** (ca. **20 flasker bobler**). **Kort reception uden middag:** **1/2 flaske per gæst**. **Hele dagen inkl. efter-fest:** **1,25-1,5 flaske per gæst** er realistisk."
      },
      {
        h: "Bryllupsmenu — fordeling per ret",
        body: "**Velkomstbobler/champagne:** **1 glas per gæst** = **1 flaske per 6**. **Forret (hvidvin):** **1-1,5 glas per gæst**. **Hovedret (rødvin):** **2-3 glas per gæst**. **Skåltale-bobler:** **1 glas per gæst**. **Dessertvin (valgfri):** **1 glas per 3-4 gæster**. **Efter-middag (kaffe + dram/cognac/portvin):** tillægsflasker til dem der bliver. **100 gæster samlet:** ca. **85-100 flasker vin + 30-35 flasker bobler**."
      },
      {
        h: "Fordeling af typer til bryllup",
        body: "**Standard:** **55 % rødvin**, **30 % hvidvin**, **15 % bobler/champagne**. **Sommerbryllup:** **40 % rødvin, 40 % hvidvin, 20 % bobler/rosé**. **Vinterbryllup:** **60 % rødvin, 25 % hvidvin, 15 % bobler**. **Glem ikke:** nogle gæster vil have **hvidvin også til hovedretten** — sørg for en **ekstra kasse hvidvin** som buffer. **Rosé** er populær om sommeren — ofte undervurderet ved bryllupper."
      },
      {
        h: "Buffer, backup og returnering",
        body: "**Regn med 10-15 % buffer** — bedre for meget end for lidt. **Spørg vinleverandør om returnering:** mange danske forhandlere tager **uåbnede flasker retur** efter event. **Bestil tidligt** — min. **3-4 uger før** for at sikre leverancen. **Opbevaring på dagen:** rødvin ved **16-18 °C**, hvidvin og bobler i **iskøler med is+vand** (ikke kun is — mangler kontakt). **Lej kølefad** hvis der er over 50 gæster."
      },
      {
        h: "Budget og valg",
        body: "**Under 100 kr/fl.:** hverdagsvin, fint til selskab. **100-150 kr/fl.:** sweet spot for kvalitet per krone i bryllupsfest. **150-250 kr/fl.:** markant bedre karakter — værd for hovedretten. **Champagne vs. cava vs. prosecco** til velkomst: cava er **1/3 pris af champagne** og fungerer perfekt i velkomstglas. Se " + sa("bedste-bobler-under-200-kr", "bedste bobler under 200 kr") + "."
      },
      {
        h: "Søg bryllupsvin",
        body: "**[Søg bryllupsvin på Vinbot](/?q=bryllup%20fest%20kasse)**."
      }
    ],
    links: [
      sa("hvor-meget-vin-til-fest", "hvor meget vin til fest"),
      sa("hvor-mange-glas-i-en-flaske-vin", "glas i en flaske"),
      sa("bedste-bobler", "bedste bobler"),
      sa("bedste-bobler-under-200-kr", "bobler under 200 kr"),
      sa("bedste-rodvin", "bedste rødvin"),
      sa("bedste-hvidvin", "bedste hvidvin")
    ]
  },
  // ========== HVAD ER / BEGREBER (6) ==========
  {
    slug: "hvad-er-tanniner",
    title: "Hvad er tanniner i vin? Den snerpende fornemmelse forklaret",
    description:
      "Hvad er tanniner? Plantestoffer fra drueskaller og kerner der giver rødvin struktur og den snerpende fornemmelse. Guide til tanniner, mad og aldring.",
    tags: ["viden", "begreber", "tanniner", "rødvin"],
    sections: [
      {
        h: "Kort svar: strukturgivende plantestoffer",
        body: "**Tanniner** er **naturlige plantestoffer (polyfenoler)** der findes i **drueskaller, kerner og stilke** — samt i egetræ fra fad-lagring. Når du drikker rødvin og får **den snerpende, tørre fornemmelse på tungen** og **kanten af tandkødet** — det er tanninerne. De giver **struktur, bid og aldringspotentiale**. Hvidvin har **meget lidt tannin** (intet skal-kontakt), mens rødvin har **betydelig tannin**. **Orange vin** (hvid med skal-kontakt) har også tannin."
      },
      {
        h: "Hvor kommer tanniner fra?",
        body: "**Drueskaller:** den største kilde — jo længere skal-kontakt, jo mere tannin. Cabernet, nebbiolo, syrah har **tykke skaller og masser af tannin**. Pinot noir og gamay har **tynde skaller og lav tannin**. **Kerner:** mere bitre tanniner — derfor pressen ikke må være for hård. **Stilke:** giver grønne, stramme tanniner — nogle producenter bruger dem bevidst (whole-cluster). **Egefad:** tilfører **eg-tannin** (vanilje, kokos, ristet toast)."
      },
      {
        h: "Hvorfor tanniner betyder noget",
        body: "**1. Struktur:** tanniner er vinens **skelet** — de holder frugt og syre sammen. **2. Aldringspotentiale:** tanniner **polymeriserer** over tid og afsætter som **bundfald** — vinen bliver blødere og mere harmonisk. **3. Sundhed:** tanniner er **antioxidanter** (samme familie som i grøn te og mørk chokolade). **4. Mad-parring:** tanniner binder sig til **protein og fedt** i kød — de føles blødere med en bøf end med en salat."
      },
      {
        h: "Tannin og mad — klassikeren",
        body: "**Høj-tannin vin kræver protein:** bøf, lam, gryderet, hård ost. Uden protein føles tanniner **stramme og bitre**. **Klassiske parringer:** cabernet + bøf, barolo + braiseret okse, malbec + lam. **Undgå:** høj-tannin vin + magre retter (fx salat, fisk) — det smager forkert. **Whirlpool-regel:** **jo mere umami og fedt i retten, jo mere tannin kan vinen bære.** Se " + KOMPLET + " for flere matches."
      },
      {
        h: "Høj vs. lav tannin — druer",
        body: "**Meget høj tannin:** nebbiolo (Barolo), tannat (Madiran), sagrantino, mourvèdre. **Høj:** cabernet sauvignon, syrah/shiraz, malbec, petit verdot. **Moderat:** sangiovese (Chianti), tempranillo (Rioja), merlot. **Lav:** pinot noir, gamay (Beaujolais), grenache, dolcetto. **Meget lav/næsten ingen:** hvidvin generelt, rosé, lette røde. **Ved unge, stramme tanniner:** luft vinen i karaffel 30-60 min for afrunding. Se " + sa("sadan-dekanterer-du-vin", "sådan dekanterer du vin") + "."
      },
      {
        h: "Søg vin",
        body: "**[Søg tannin-rig vin på Vinbot](/?q=cabernet%20nebbiolo%20malbec)**."
      }
    ],
    links: [
      sa("hvad-er-syre-i-vin", "hvad er syre i vin"),
      sa("hvad-er-restsukker-i-vin", "hvad er restsukker"),
      sa("sadan-dekanterer-du-vin", "sådan dekanterer du vin"),
      sa("vin-begreber-i-praksis", "vinbegreber i praksis"),
      sa("komplet-guide-til-vin-og-mad", "komplet guide til vin og mad"),
      sa("bedste-rodvin", "bedste rødvin")
    ]
  },
  {
    slug: "hvad-er-syre-i-vin",
    title: "Hvad er syre i vin? Friskhed, balance og aldring",
    description:
      "Hvad er syre i vin? Naturlige syrer fra druen der giver friskhed, balance og aldringsevne. Guide til høj syre, lav syre og syre til mad.",
    tags: ["viden", "begreber", "syre", "balance"],
    sections: [
      {
        h: "Kort svar: vinens friskhed og ryggrad",
        body: "**Syre** er **naturlige syrer i druen** — primært **vinsyre**, **æblesyre** og **mælkesyre** — der giver vinen **friskhed, liv og balance**. Uden syre smager vin **flad og tung**, som en limonade uden citron. Syre føles som **saftighed** på siden af tungen og **get-me-more**-effekten der får dig til at tage et nyt sug. **Hvid vin, bobler og let rødvin** er ofte højt i syre; **kraftig moden rødvin** og **søde vine** ligger lavere."
      },
      {
        h: "De tre hovedsyrer i vin",
        body: "**Vinsyre (tartaric acid):** mest i druer; stabil og tåler varme. **Æblesyre (malic acid):** skarp, grøn-æble-agtig; mest i kølige druer og druer høstet tidligt. **Mælkesyre (lactic acid):** blød, cremet; dannes ved **malolaktisk fermentering (MLF)** hvor æblesyre omdannes til mælkesyre. **De fleste rødvine** gennemgår MLF — giver blødere, smørrig profil. **Friske hvide** (sauvignon blanc, riesling) gennemgår **ikke** MLF — de beholder den sprøde syre."
      },
      {
        h: "Hvorfor syre er vigtig",
        body: "**1. Friskhed og drikkelighed:** syre giver **saftighed og energi** i glasset. **2. Balance:** syre modvirker sukker, alkohol og frugt — uden den er vinen **tung og slap**. **3. Mad-parring:** syre **skærer igennem fedt** (smør, fløde, oliedressing) og **matcher syre i maden** (vinaigrette, citron, tomater). **4. Aldring:** syre er en **konserveringsmiddel** — højere syre = længere lagringsevne. Champagne, tysk riesling og Chablis har syre der bærer vinen i årtier."
      },
      {
        h: "Høj vs. lav syre — druer og stile",
        body: "**Meget høj syre:** riesling (især tysk), sauvignon blanc, albariño, chenin blanc, assyrtiko, champagne, chablis. **Høj:** pinot noir (kølig klima), gamay, barbera, tempranillo (Rioja Crianza). **Moderat:** chardonnay (moderat klima), sangiovese, merlot, syrah. **Lav:** viognier, grenache, moden cabernet fra varmt klima, amarone, portvin. **Tip:** jo koldere klima, jo højere syre — tyske og østrigske hvide er syre-konger."
      },
      {
        h: "Syre til maden — klassikere",
        body: "**Høj syre + fed fisk:** riesling med laks, sauvignon blanc med skaldyr i smør, chablis med østers. **Høj syre + tomat-retter:** italiensk vin med pizza/pasta — tomatens egen syre matches. **Høj syre + friture:** champagne med kartoffelchips eller fish&chips — klassikeren. **Undgå lav-syre vin til tung fed mad** — den føles klistret. **Syre-gyldne regel:** **din vin skal have mindst lige så meget syre som din ret.**"
      },
      {
        h: "Søg vin",
        body: "**[Søg frisk hvidvin på Vinbot](/?q=riesling%20sauvignon%20blanc%20chablis)**."
      }
    ],
    links: [
      sa("hvad-er-tanniner", "hvad er tanniner"),
      sa("hvad-er-restsukker-i-vin", "hvad er restsukker"),
      sa("vin-begreber-i-praksis", "vinbegreber i praksis"),
      sa("komplet-guide-til-vin-og-mad", "komplet guide til vin og mad"),
      sa("bedste-hvidvin", "bedste hvidvin"),
      sa("riesling-druen", "riesling-druen")
    ]
  },
  {
    slug: "hvad-er-terroir",
    title: "Hvad er terroir? Stedets signatur i vinen",
    description:
      "Hvad er terroir? Det franske begreb for jord, klima, eksponering og tradition der giver en vin dens stedbestemte karakter. Guide til terroir i praksis.",
    tags: ["viden", "begreber", "terroir", "region"],
    sections: [
      {
        h: "Kort svar: stedets fingeraftryk",
        body: "**Terroir** er et **fransk begreb** der beskriver **hvordan et bestemt sted udtrykker sig i vinen** — gennem **jord, klima, eksponering, højde, vind og menneskelig tradition**. Det er grunden til at **samme drue** (fx pinot noir) smager **radikalt forskelligt** fra Bourgogne, Oregon og New Zealand. Terroir kan **ikke kopieres** — det er derfor en Chablis aldrig bliver en Sonoma chardonnay, uanset hvor dygtig vinmageren er."
      },
      {
        h: "De 4 byggesten i terroir",
        body: "**1. Jord:** kalk, skifer, ler, vulkansk, sand — hver jordtype påvirker druens vækst, **mineralitet** og aromaer. **2. Klima:** temperatur, nedbør, solindstråling — **kølige** klimaer giver **syrefulde, delikate vine**; **varme** klimaer giver **frugtige, alkoholrige vine**. **3. Eksponering:** en bakke der vender **mod syd** får mere sol end en **nordvendt** — det giver modnere druer. **4. Menneskelig tradition:** hvilke druer, dyrkningsmetoder og vinmagerstile der er **udviklet over generationer**."
      },
      {
        h: "Terroir i praksis — klassiske eksempler",
        body: "**Chablis (kalkjord, kølig):** chardonnay med stenet mineralitet, knivskarp syre — intet tidligere chardonnay kan gøre det samme. **Mosel (skifer, stejle skrænter):** riesling med petroleumsnote og laserskarp syre. **Champagne (kridt, kølig):** basis for verdens finest bobler. **Barolo (kalk/ler, tågedale):** nebbiolo med tjære, rose og stramme tanniner. **Napa Valley (vulkansk, varm):** kraftig cabernet med mørke bær og moden tannin. **Mendoza (høj højde, ørken):** malbec med koncentration og ren frugt."
      },
      {
        h: "Hvorfor terroir betyder noget for dig",
        body: "**1. Forudsigelighed:** når du lærer at en **Chablis er stram og mineralsk**, kan du vælge den til østers uden at smage den først. **2. Variation:** samme drue fra **forskellige steder** giver **forskellige oplevelser** — pinot noir fra Oregon vs. Bourgogne vs. Central Otago er tre forskellige verdener. **3. Autenticitet:** ægte terroir-vin **smager af sit sted** — ikke af moden generisk frugt. **4. Pris vs. værdi:** **enkelt-mark (single-vineyard)** vine er dyrere fordi terroir er mere udtalt og afgrænset."
      },
      {
        h: "Naturvin, biodynamisk og terroir",
        body: "**Naturvin-bevægelsen** fremhæver terroir som kerneargument — mindre intervention betyder mere af stedets stemme. **Biodynamisk landbrug** (Demeter, Biodyvin) arbejder intensivt med jordens sundhed som terroir-udtryk. **Konventionel vin** bruger ofte gær-, syre- og sukker-justering der kan **maskere terroir**. Terroir er **ikke eksklusivt** for naturvin — klassiske Bourgogne- og Piemonte-producenter er de bedste terroir-ambassadører overhovedet. Se " + NATUR + "."
      },
      {
        h: "Søg vin",
        body: "**[Søg terroir-vin på Vinbot](/?q=bourgogne%20chablis%20barolo%20mosel)**."
      }
    ],
    links: [
      sa("vin-begreber-i-praksis", "vinbegreber i praksis"),
      sa("naturvin-hvad-er-det", "naturvin"),
      sa("hvad-er-biodynamisk-vin", "hvad er biodynamisk"),
      sa("vinregion-frankrig", "vinregion Frankrig"),
      sa("vinregion-italien", "vinregion Italien"),
      sa("bedste-pinot-noir", "bedste pinot noir")
    ]
  },
  {
    slug: "hvad-er-restsukker-i-vin",
    title: "Hvad er restsukker? Tør vs. sød vin forklaret",
    description:
      "Hvad er restsukker i vin? Den sukker der bliver tilbage efter gæring. Guide til tør, halvtør, halvsød og sød vin — plus hvorfor du aldrig smager det du tror.",
    tags: ["viden", "begreber", "restsukker", "sødme"],
    sections: [
      {
        h: "Kort svar: ugærede sukker tilbage efter gæring",
        body: "**Restsukker (RS)** er **den mængde sukker der bliver tilbage i vinen** efter gæring. Under gæring omdanner gær sukkerets glukose og fruktose til **alkohol og CO₂**. **Stoppes gæringen tidligt** eller **har druen så meget sukker at gæren dør af alkohol**, forbliver der **restsukker**. RS måles i **gram per liter (g/l)**. **Tør vin** har under 4 g/l; **sød dessertvin** kan have over 200 g/l."
      },
      {
        h: "Sødhedsklasser — hvidvin og rosé",
        body: "**Tør (Trocken):** 0-4 g/l. **Halvtør (Halbtrocken / Off-dry):** 4-12 g/l — riesling Kabinett ligger ofte her. **Halvsød (Lieblich):** 12-45 g/l. **Sød (Süß):** over 45 g/l. **Dessertvin (Spätlese, Auslese, Sauternes, Tokaji):** 60-200+ g/l. **EU-regler:** 'tør' må i visse tilfælde have op til 9 g/l **hvis syren er tilsvarende høj** — derfor smager mange tyske rieslings tørre selvom de teknisk har restsukker."
      },
      {
        h: "Champagne-sødheder — forvirrende",
        body: "**Brut Nature / Zero Dosage:** 0-3 g/l — knastør. **Extra Brut:** 0-6 g/l. **Brut:** 0-12 g/l — **standard, tør**. **Extra Dry:** 12-17 g/l — **modsat navnet: let sødlig**. **Sec:** 17-32 g/l. **Demi-Sec:** 32-50 g/l. **Doux:** 50+ g/l. **OBS:** **'Extra Dry' prosecco er ikke tør** — det er den næstsødeste standardkategori. Det modsatte af hvad sprog antyder."
      },
      {
        h: "Hvorfor du smager mindre sødt end RS'et viser",
        body: "**Syre og sødme er modsatte rettede** — høj syre **maskerer** sødme. En tysk Kabinett med **40 g/l restsukker** og **høj syre** kan smage **mindre sødt** end en californisk chardonnay med **6 g/l** og **lav syre**. **Alkohol** giver også fornemmelse af sødme. **Derfor:** en **'tør' californisk rødvin** kan have **5-8 g/l restsukker** og **14,5 % alkohol** og smage **sødlig og tung**, mens en **'halvtør' riesling** med **25 g/l og 9 %** smager **frisk og balanceret**."
      },
      {
        h: "Sødme og mad — klassiske parringer",
        body: "**Halvtør/halvsød hvidvin** er genial til **stærk mad** (thai, indisk, kinesisk, mexicansk) — sødmen **afkøler chili** og matcher ofte sød i retten. **Tør vin til stærk mad** føles ofte tynd og bitter. **Sød dessertvin + ost:** klassiker — Sauternes med blåskimmel (Roquefort), Tokaji med hård gedeost. **Sød vin skal være sødere end desserten** — ellers smager vinen sur."
      },
      {
        h: "Søg vin",
        body: "**[Søg halvtør riesling på Vinbot](/?q=riesling%20kabinett%20off-dry)**."
      }
    ],
    links: [
      sa("hvad-er-syre-i-vin", "hvad er syre i vin"),
      sa("hvad-er-tanniner", "hvad er tanniner"),
      sa("vin-begreber-i-praksis", "vinbegreber i praksis"),
      sa("sadan-laeser-du-vinflaskens-etiket", "læs etiketten"),
      sa("bedste-dessertvin", "bedste dessertvin"),
      sa("riesling-druen", "riesling-druen")
    ]
  },
  {
    slug: "hvad-er-orange-vin",
    title: "Hvad er orange vin? Hvid vin med skal-kontakt",
    description:
      "Hvad er orange vin? Hvid drue gæret med skaller — hvilket giver farve, tannin og karakter. Guide til orange vin, typer, mad og hvor den kommer fra.",
    tags: ["viden", "begreber", "orange vin", "naturvin"],
    sections: [
      {
        h: "Kort svar: hvid drue gæret med skaller",
        body: "**Orange vin** (også kaldet **skin-contact white** eller **amber wine**) er **hvid vin lavet som rødvin** — dvs. med **forlænget skal-kontakt** under gæringen. Hvide druer gæres med skallerne i **dage til måneder**, hvilket giver vinen **gylden-orange farve**, **tannin** (som rødvin), og **nye aromaer** som tør frugt, valnødder, krydderier og honning. Stilen er **ældgammel** (stammer fra Georgien for 8.000 år siden), men er blevet et fænomen i moderne **naturvin**-bevægelsen."
      },
      {
        h: "Hvordan orange vin laves",
        body: "**Traditionel metode (Georgien):** hvide druer (typisk rkatsiteli eller mtsvane) gæres i **kvevri** — store lertøjskar begravet i jorden — med skaller, stilke og kerner i **4-6 måneder**. **Moderne metode (Italien, Frankrig, Slovenien):** hvide druer (friulano, pinot grigio, ribolla gialla, chenin blanc) gæres i stål- eller træfad med **skaller i 2-30 dage**. Jo længere skal-kontakt, jo mere tannin og farve. **Nogle producenter** bruger også **stilke** for ekstra struktur."
      },
      {
        h: "Smag og tekstur",
        body: "**Aromatisk profil:** tør abrikos, valnød, appelsinskal, honning, te, krydderier, peber. **Teksturelt:** **tannin** (som lys rødvin), **syre** (som hvidvin), **længere finish**. **Ikke sødme** — orange vin er næsten altid tør. **Farve:** fra lys ravfarvet til dyb mørk orange. **Mineralitet:** ofte meget markant. En orange vin smager **som krydset mellem hvidvin, rosé og let rødvin** — det er sin egen kategori."
      },
      {
        h: "Orange vin til maden",
        body: "**Orange vin er måltidsvin-kategori over gennemsnittet** — tannin + syre gør den alsidig. **Klassiske parringer:** **krydret asiatisk** (thai, indisk, koreansk), **fermenteret mad** (kimchi, miso, dashi), **svampe og jordskokker**, **hård gul ost**, **pølser og charcuteri**, **hele kyllingeretter**. **Undgå:** **fine delikate fiskeretter** (orange vin er for kraftig) og **sødder retter** (sødme + bitter tannin = dårligt match). Se " + KOMPLET + "."
      },
      {
        h: "Hvor kommer orange vin fra?",
        body: "**Georgien:** hjemlandet — kvevri-vin er UNESCO-kulturarv. **Italien Friuli-Venezia Giulia:** den moderne renæssance — Gravner, Radikon, Le Dute. **Slovenien:** overlapper med Friuli — Movia. **Frankrig Loire og Alsace:** vinmagere som Pithon-Paillé, Pierre Frick. **Danmark:** få danske producenter (fx Frederiksdal i naturvin-ånden). **USA Oregon og Californien:** voksende scene. Prisniveau: **200-500 kr** for godt niveau, **500-1500 kr** for kultflasker."
      },
      {
        h: "Søg vin",
        body: "**[Søg orange vin på Vinbot](/?q=orange%20skin%20contact%20amber)**."
      }
    ],
    links: [
      sa("naturvin-hvad-er-det", "naturvin"),
      sa("hvad-er-biodynamisk-vin", "hvad er biodynamisk vin"),
      sa("hvad-er-tanniner", "hvad er tanniner"),
      sa("bedste-hvidvin", "bedste hvidvin"),
      sa("vin-begreber-i-praksis", "vinbegreber i praksis"),
      sa("vinregion-europa-central-og-oest", "Central- og Østeuropa")
    ]
  },
  {
    slug: "hvad-er-biodynamisk-vin",
    title: "Hvad er biodynamisk vin? Rudolf Steiner i vinmarken",
    description:
      "Hvad er biodynamisk vin? Økologisk+ med kosmisk kalender og præparater efter Rudolf Steiner. Guide til Demeter, Biodyvin og hvordan biodynamik smager.",
    tags: ["viden", "begreber", "biodynamisk", "økologisk"],
    sections: [
      {
        h: "Kort svar: økologisk+ med holistisk filosofi",
        body: "**Biodynamisk vin** er **vin produceret efter biodynamiske principper** — udviklet af den østrigske filosof **Rudolf Steiner** i 1924. Det er **et skridt ud over økologisk**: ingen pesticider, ingen kunstgødning, men **også** specielle **biodynamiske præparater** (fermenteret komposting, urter i kohorn), en **kosmisk kalender** (frugt-, blad-, rod-, blomsterdage efter månens position) og filosofien om at **vinmarken er et levende økosystem**. Certificering: **Demeter** eller **Biodyvin**."
      },
      {
        h: "De centrale biodynamiske praksisser",
        body: "**Præparat 500 (kohorn-kompost):** ko-gødning fermenteret i kohorn nedgravet vinter — sprøjtes på jorden som **bakterie-booster**. **Præparat 501 (kiselkvarts):** findelt kvarts nedgravet sommer — sprøjtes i meget små mængder på bladene for **fotosyntese-stimulation**. **Kompostpræparater (502-507):** urter som kamille, røllike, egebark fermenteret — styrker jordens liv. **Kalender:** arbejde med druen udføres på dage klassificeret som frugt/blad/rod/blomst efter månens zodiak-position."
      },
      {
        h: "Demeter vs. Biodyvin — certificering",
        body: "**Demeter:** det internationale hovedmærke — grundlagt 1928, strengt regelsæt for mark og kælder. **Biodyvin:** fransk specialiseret biodynamisk organisation — typisk for prestige-producenter i Frankrig (Bourgogne, Loire). **Ikke-certificeret men biodynamisk drevet:** mange producenter følger biodynamikken uden at betale for certifikat — spørg producenten. **Alt biodynamisk er også økologisk** — men ikke omvendt. **Biodynamisk ≠ naturvin**, selvom der er stort overlap — mange store biodynamiske producenter bruger stadig sulfitter moderat i kælderen."
      },
      {
        h: "Hvorfor biodynamik tiltrækker store producenter",
        body: "Mange **absolut verdensklasse-producenter** er biodynamiske: **Domaine Leroy** og **Domaine de la Romanée-Conti** i Bourgogne, **Zind-Humbrecht** i Alsace, **Château Pontet-Canet** i Bordeaux, **Nicolas Joly** i Loire. Argumentet: **sunde vinmarker giver bedre druer og ærligere terroir-udtryk**. Kritikere: **videnskaben bag Steiners kosmologi er tvivlsom**; men **de praktiske resultater** (sund jord, mikrolivet, dybere rødder) er dokumenteret. Se " + sa("hvad-er-terroir", "hvad er terroir") + "."
      },
      {
        h: "Smager biodynamisk vin anderledes?",
        body: "**Mange smagspaneler viser at ja** — biodynamisk vin smager ofte **mere livligt, med klarere frugt og dybere mineralitet** end konventionel. **Men** det kan også skyldes at biodynamiske producenter generelt er **dygtigere, mere omhyggelige og fokuserede på kvalitet** frem for volumen. **Uden blindsmagninger** er det svært at adskille præparater fra filosofi fra håndværk. **Praktisk råd:** lad dig ikke diktere — **smag og vurder flasken, ikke mærket**. Biodynamisk er en stærk indikator for **omhu**, ikke en garanti for kvalitet."
      },
      {
        h: "Søg vin",
        body: "**[Søg økologisk og biodynamisk vin på Vinbot](/?q=demeter%20biodynamisk%20%C3%B8kologisk)**."
      }
    ],
    links: [
      sa("naturvin-hvad-er-det", "naturvin"),
      sa("hvad-er-orange-vin", "hvad er orange vin"),
      sa("hvad-er-terroir", "hvad er terroir"),
      sa("bedste-okologiske-vin", "bedste økologiske vin"),
      sa("vin-begreber-i-praksis", "vinbegreber i praksis"),
      sa("vinregion-frankrig", "vinregion Frankrig")
    ]
  },
  // ========== SÅDAN GØR DU (3) ==========
  {
    slug: "sadan-dekanterer-du-vin",
    title: "Sådan dekanterer du vin: hvornår og hvorfor",
    description:
      "Sådan dekanterer du vin: luftning for unge tanniner, bundfald for modne flasker. Guide til dekantering, karaffel-valg og hvor længe.",
    tags: ["viden", "sådan", "dekantering", "servering"],
    sections: [
      {
        h: "Kort svar: luftning eller bundfald",
        body: "**Dekantering** har **to formål**: **1) Luftning** af **unge, stramme rødvine** så tanninerne afrundes og frugten åbner op. **2) Afskillelse af bundfald** fra **modne rødvine** (over 10-15 år) så du ikke får grums i glasset. **Langt de fleste hjemme-situationer** handler om luftning — ikke bundfald. **Hvidvin, rosé og bobler** dekanteres normalt **ikke** — syre og frugt drager ikke fordel af luft, og bobler mister brus."
      },
      {
        h: "Hvornår skal du dekantere?",
        body: "**Dekantér disse:** **unge kraftige rødvine** (cabernet under 5 år, barolo under 10 år, ung syrah/shiraz, malbec, bordeaux-ung, rioja reserva), **stramme ustabile naturvine**, og **modne flasker med bundfald** (over 10-15 år). **Dekantér ikke:** **lette røde** (pinot noir, gamay) — de skal ikke åbnes op så hårdt. **Delikate modne vine** — risiko for at ødelægge den subtile profil med for meget luft. **Hvidvin** — meget sjældent behov. **Champagne/bobler** — aldrig (tab af brus)."
      },
      {
        h: "Sådan lufter du en ung rødvin",
        body: "**1. Skænk forsigtigt fra flasken** til en **bred karaffel** (ingen strainer nødvendigt). **2. Hold glashælden i 45 grader** og lad vinen **løbe ned ad siden** — det maksimerer ilt-kontakten. **3. Vent 30-60 minutter** før servering. **4. Tumbler/karaffel-valg:** en **bred bund** er bedre end en tall-narrow — jo mere overflade, jo mere luftning. **Tip:** hvis du har meget lidt tid, **hæld vinen højt** ned fra flasken til karaffel — mere ilt på én gang."
      },
      {
        h: "Sådan dekanterer du en gammel vin (bundfald)",
        body: "**1. Stil flasken lodret** i **mindst 24 timer** før åbning — bundfaldet falder til bunden. **2. Lad karaffel være klar**, og placer en **stearinlyst eller lommelygte** bag flasken. **3. Skænk langsomt** i én jævn bevægelse — stop når du ser **mørkere materiale nå flaskens skulder**. **4. Den sidste skvæt (ca. 2-3 cl)** smides væk — eller bruges til en sauce. **5. Vinen skal kun **luftes 5-10 minutter**, ikke længere — modne vine er skrøbelige."
      },
      {
        h: "Karaffel vs. aeratoere",
        body: "**Klassisk karaffel (bred bund):** bedst til luftning af unge røde — giver stor overflade. **Slank høj karaffel:** elegant til bordet, men dårlig luftning. **Mekaniske aeratorer** (flaske-toppe der blander luft mens du skænker): **virker**, men er mindre kontrollerbare. **Blendere/whiskers (at omrøre vinen):** radikalt effektiv — men kan **overlufte** og ødelægge en delikat vin. **Sikkerhed:** har du ikke karaffel, kan du **bruge en glaskande** eller **sætte vinen i glasset 15 min før servering** for mild luftning."
      },
      {
        h: "Søg vin",
        body: "**[Søg karaffel-værdig rødvin på Vinbot](/?q=barolo%20bordeaux%20cabernet)**."
      }
    ],
    links: [
      sa("sadan-serverer-du-vin", "sådan serverer du vin"),
      sa("sadan-smager-du-vin", "sådan smager du vin"),
      sa("hvad-er-tanniner", "hvad er tanniner"),
      sa("opbevaring-af-vin-temperatur-og-aabnet-flaske", "opbevaring og temperatur"),
      sa("bedste-rodvin", "bedste rødvin"),
      sa("bedste-italiensk-rodvin", "bedste italiensk rødvin")
    ]
  },
  {
    slug: "sadan-serverer-du-vin",
    title: "Sådan serverer du vin: temperatur, glas og rækkefølge",
    description:
      "Sådan serverer du vin: rigtige temperatur for rødvin, hvidvin og bobler, valg af glas, rækkefølge ved flere vine og praktiske tip til middagen.",
    tags: ["viden", "sådan", "servering", "temperatur"],
    sections: [
      {
        h: "Kort svar: temperatur, glas, rækkefølge",
        body: "**Rigtig vinservering** handler om tre ting: **korrekt temperatur** (for kold dæmper aroma, for varm gør vinen slap), **rigtigt glas** (tulipanformet for rød, slankere for hvid, flute eller hvidvinsglas for bobler), og **rigtig rækkefølge** (let før kraftig, ung før gammel, tør før sød). Få dette rigtigt, og selv en billig vin smager markant bedre."
      },
      {
        h: "Serveringstemperatur — den vigtigste detalje",
        body: "**Lette rødvine (pinot, gamay, beaujolais):** **14-16 °C** — **let kølige**. **Mellemfyldige røde (sangiovese, merlot, tempranillo):** **15-17 °C**. **Kraftige røde (cabernet, malbec, syrah, barolo):** **16-18 °C** — **aldrig stuetemperatur på 22+°C**. **Fyldige hvide (chardonnay fad, viognier):** **10-13 °C**. **Lette hvide (sauvignon, pinot grigio):** **8-11 °C**. **Rosé:** **8-11 °C**. **Bobler og champagne:** **6-9 °C**. **Dessertvin:** **7-12 °C**. Se " + TEMP + "."
      },
      {
        h: "Sådan rammer du temperaturen",
        body: "**Rødvin er typisk for varm** i et 22 °C rum. **15 min i køleskabet** kommer den ned på 17-18 °C. **Hvidvin er typisk for kold** fra køleskab på 4 °C — **tag den ud 15-20 min før servering**. **Hurtigt-køl bobler:** **iskøler med halv is + halv vand** i 15 min — **ikke frostfryser** (risiko for eksplosion). **Termometer:** en lille **flaske-termometer** koster 50 kr og er den bedste investering du kan gøre i vinen."
      },
      {
        h: "Glas — stort set afgørende for oplevelsen",
        body: "**Tulipanformet glas med bugede sider:** standard til alt. **Bourgogne-glas (bred bug, smalt brim):** samler aromaer for delikate røde (pinot noir) og lette hvide. **Bordeaux-glas (høj og smal):** for kraftige røde (cabernet). **Hvidvin-glas (slankere):** fokuserer syre og friskhed. **Flute vs. hvidvin-glas til champagne:** **champagne fungerer bedst i hvidvin-glas** — flute begrænser aromaen. **Universalglas:** et godt Riedel Performance eller Zalto fungerer til **alle vine**."
      },
      {
        h: "Rækkefølge ved flere vine",
        body: "**Generel regel:** **let før kraftig, hvid før rød, tør før sød, ung før gammel**. **Middagsselskab med 3 vine:** velkomstbobler → hvidvin til forret → rødvin til hovedret → evt. dessertvin. **Undtagelser:** en kraftig fadet chardonnay kan servere efter en let rødvin. **Samme drue forskellige årgange:** drik **ung før moden** — det modsatte skuffer. **Tip:** skift glas mellem forskellige vine — eller skyl med lidt af den nye vin."
      },
      {
        h: "Praktiske servering-tip",
        body: "**Skænk 1/3 glasset** — giver plads til at aromaerne udvikler sig. **Hold flasken midt på** — label op er hygge, men ingen nødvendighed. **Tør flaskens hals** med serviet efter skænk — forhindrer dryp. **Genopfyld gæsters glas løbende**, men ikke før de er næsten tomme — ellers mister vinen temperatur og udvikling. **Gæster vælger tempo:** pres aldrig nogen til at tømme glasset hurtigere end de vil."
      },
      {
        h: "Søg vin",
        body: "**[Søg vin på Vinbot](/?q=vin)**."
      }
    ],
    links: [
      sa("sadan-dekanterer-du-vin", "sådan dekanterer du vin"),
      sa("sadan-smager-du-vin", "sådan smager du vin"),
      sa("opbevaring-af-vin-temperatur-og-aabnet-flaske", "opbevaring og temperatur"),
      sa("hvor-laenge-holder-rodvin", "hvor længe holder rødvin"),
      sa("hvor-mange-glas-i-en-flaske-vin", "glas i en flaske"),
      sa("bobler-champagne-cava-prosecco-og-cremant", "bobler og champagne")
    ]
  },
  {
    slug: "sadan-smager-du-vin",
    title: "Sådan smager du vin: systematisk smagning i 5 trin",
    description:
      "Sådan smager du vin: se, svæng, lugt, smag, vurdér. En systematisk smageteknik der hjælper dig med at forstå og huske vin bedre.",
    tags: ["viden", "sådan", "smagning", "nybegynder"],
    sections: [
      {
        h: "Kort svar: se, svæng, lugt, smag, vurdér",
        body: "**Struktureret smagning** forvandler et glas vin fra **'det smager okay'** til **'jeg ved hvad jeg drikker'**. Den klassiske metode hedder **'De 5 S'er'** (Sight, Swirl, Smell, Sip, Savor) — eller på dansk: **se, svæng, lugt, smag, vurdér**. Teknikken tager **2-3 minutter per glas** og er brugt af sommelier'er, dommere og seriøse entusiaster verden over. Du behøver ikke blive ekspert — men lidt struktur hjælper dig **huske** og **vælge** bedre."
      },
      {
        h: "1. Se — farve og klarhed",
        body: "**Hold glasset mod hvidt baggrund** (serviet, væg) ved **45 graders hæld**. **Farve:** rødvin går fra **lilla (ung)** til **rubin (midaldrende)** til **mursten-brun (gammel/moden)**. Hvidvin går fra **bleg-citrongul (ung)** til **guldgul (modnet)** til **brunorange (for gammel/oxideret)**. **Intensitet:** dyb og mørk = koncentreret; lys og transparent = delikat. **Klarhed:** klart og blankt = sundt; mudret = fejl eller naturvin-stil."
      },
      {
        h: "2. Svæng — se viskositet",
        body: "**Svæng glasset** i 5-10 sekunder og se **hvordan vinen løber ned ad siderne**. **'Tårer' eller 'ben'** (de striber der løber ned) fortæller om **alkohol og sukker**: **tykke langsomme tårer** = højere alkohol eller sukker. **Hurtige tynde** = lav alkohol, let vin. **Svænging ilter også vinen** — den åbner aromaerne før du dufter. **Tip:** hold glasset på bordet mens du svænger — mindre risiko for spild."
      },
      {
        h: "3. Lugt — aromaer i 3 lag",
        body: "**Første lugt (kort):** det umiddelbare indtryk — frugt, træ, krydderier. **Anden lugt (dybere):** identificér **tre aroma-lag**: **primær** (druen: bær, æble, citrus), **sekundær** (gæring: brød, hasselnød, smør), **tertiær** (modning: læder, tobak, jord). **Svæng en gang til** og lugt igen — aromaer udvikler sig. **Træn næsen:** at identificere duften af **hindbær vs. sortbær** eller **citron vs. lime** bliver nemmere med øvelse."
      },
      {
        h: "4. Smag — 3 sek i munden",
        body: "**Tag et lille sug** — ca. 2-3 cl. **Lad vinen fylde hele munden** i 3-5 sekunder. **Sug luft ind over tungen** (den lyde-producerende teknik) — det forstærker aromaerne. **Mærk efter:** **syre** (saftighed på siden af tungen), **sødme** (spids af tungen), **tannin** (snerpende på tandkødet — kun rødvin), **alkohol** (varme ned gennem halsen), **krop** (let som vand eller fyldig som mælk). **Spyt eller slug** — professionelle smagere spytter for at kunne smage 30+ vine i træk."
      },
      {
        h: "5. Vurdér — længde og helhed",
        body: "**Finish/afterstate:** hvor længe hænger smagen i munden efter du har slukket? **Kort (under 5 sek):** simpel vin. **Middel (5-15 sek):** god hverdagsvin. **Lang (15-30+ sek):** kvalitetsvin — mange komplekse aromaer der udvikler sig. **Helhed:** er vinen **balanceret** (syre, tannin, alkohol, frugt i harmoni) eller **skæv** (fx for meget alkohol, for lidt syre)? **Skriv 2-3 ord ned** om vinen — det hjælper dig huske og **udvikle smagssans** over tid."
      },
      {
        h: "Søg vin",
        body: "**[Søg vin til smagning på Vinbot](/?q=smagning%20flight)**. Se også " + BEGREB + "."
      }
    ],
    links: [
      sa("sadan-serverer-du-vin", "sådan serverer du vin"),
      sa("sadan-dekanterer-du-vin", "sådan dekanterer du vin"),
      sa("hvad-er-tanniner", "hvad er tanniner"),
      sa("hvad-er-syre-i-vin", "hvad er syre i vin"),
      sa("vin-begreber-i-praksis", "vinbegreber i praksis"),
      sa("bedste-vin-til-begynder", "bedste vin til begynder")
    ]
  },
];

function renderMdx(p) {
  const body = p.sections.map((s) => `## ${s.h}\n\n${s.body}`).join("\n\n");
  const klyngeLinks = p.links.join(" · ");
  const tags = JSON.stringify(p.tags);

  return `---\ntitle: "${p.title.replace(/"/g, "\\\"")}"\ndescription: "${p.description.replace(/"/g, "\\\"")}"\nslug: ${p.slug}\ntags: ${tags}\nupdated: "${UPDATED}"\nhub: ${HUB}\n---\n\n${body}\n\n## Læs mere i klyngen\n\n${klyngeLinks}\n`;
}

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

let written = 0;
for (const p of PAGES) {
  const file = path.join(OUT_DIR, `${p.slug}.mdx`);
  fs.writeFileSync(file, renderMdx(p), "utf8");
  written++;
}

console.log(`Wrote ${written} MDX files to ${OUT_DIR}`);
