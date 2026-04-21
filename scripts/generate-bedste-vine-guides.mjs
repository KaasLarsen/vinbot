// Genererer 28 "bedste-*"-guides i content/guides/.
// Slettes når filerne er på plads.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "content", "guides");
const UPDATED = "2026-04-20";
const HUB = "bedste-vine";

const KOMPLET = "[komplet guide til vin og mad](/guides/komplet-guide-til-vin-og-mad)";
const TEMP = "[temperatur og opbevaring](/guides/opbevaring-af-vin-temperatur-og-aabnet-flaske)";
const BOBLER = "[bobler](/guides/bobler-champagne-cava-prosecco-og-cremant)";
const KOEB = "[køb vin online](/guides/koeb-vin-online-sadan-holder-du-styr-paa-det)";
const ETIKET = "[læs etiketten](/guides/sadan-laeser-du-vinflaskens-etiket)";
const BEGREB = "[vinbegreber](/guides/vin-begreber-i-praksis)";
const NATUR = "[naturvin](/guides/naturvin-hvad-er-det)";
const ALKFRI = "[alkoholsvag og alkoholfri vin](/guides/alkoholsvag-og-alkoholfri-vin)";
const GAVE = "[gavevin](/guides/gavevin-sadan-vaelger-du-den-rigtige-flaske)";

// Generisk bygger for "læs mere i klyngen"-sektion
function klynge(links) {
  return links.join(" · ");
}

function sa(href, label) {
  return `[${label}](/guides/${href})`;
}

// ---- 28 sider ----
const PAGES = [
  // ========== GENERELLE TOP-LISTER (6) ==========
  {
    slug: "bedste-rodvin",
    title: "Bedste rødvin: sådan finder du den rigtige til din smag og pris",
    description:
      "Bedste rødvin afhænger af smag, ret og pris. Guide til druer, stilarter og lande — fra pinot noir og sangiovese til malbec, syrah og cabernet.",
    tags: ["bedste", "rødvin", "top-liste", "køb vin"],
    searchQ: "rødvin%20pinot%20noir%20sangiovese%20malbec%20cabernet",
    sections: [
      {
        h: "Hvad betyder \u201Cbedste r\u00F8dvin\u201D?",
        body: "**\u201CBedste r\u00F8dvin\u201D** er ikke \u00E9n flaske \u2014 det er det rigtige m\u00F8de mellem **stil**, **pris** og **anledning**. En **pinot noir** til **julefrokosten** vinder ikke samme konkurrence som en **malbec** til **bearnaise**. Denne guide hj\u00E6lper dig med at finde **din** bedste r\u00F8dvin ved at zoome ind p\u00E5 **druer**, **stilarter** og **prisniveauer** \u2014 og linke videre til dybdeguides."
      },
      {
        h: "Tre stilarter du b\u00F8r kende",
        body: "**Let og frisk:** **gamay** (Beaujolais), **k\u00F8lig pinot noir**, **frappato** \u2014 rigtig til fisk, fjerkr\u00E6, charcuteri og let ost. Server **14\u201316 \u00B0C**. **Mellemfyldig og saftig:** **sangiovese** (Chianti), **tempranillo** (Rioja Crianza), **barbera**, **merlot** \u2014 alsidig til pasta, pizza, svin og hverdagsmad. **Kraftig og struktureret:** **cabernet sauvignon**, **malbec**, **syrah/shiraz**, **nebbiolo** \u2014 til gryderet, steak og kraftig ost. Se ogs\u00E5 " + KOMPLET + "."
      },
      {
        h: "Top anbefalinger efter drue og land",
        body: "**Italien:** **Chianti Classico** (sangiovese) og **Barbera d\u2019Asti** leverer ofte meget for pengene. **Frankrig:** **C\u00F4tes du Rh\u00F4ne** (grenache/syrah-blend) og **Beaujolais Villages** (gamay). **Spanien:** **Rioja Crianza** til kraftigere m\u00E5ltider. **Argentina:** **Malbec** fra **Mendoza**. **Chile:** **carm\u00E9n\u00E8re** og **cabernet**. **Portugal:** **Douro** og **D\u00E3o** med **touriga nacional**. Alle l\u00F8fter sig tydeligt i klassen **125\u2013200 kr**."
      },
      {
        h: "Prisniveauer \u2014 hvad f\u00E5r du for pengene?",
        body: "**70\u201399 kr:** hverdagsr\u00F8de \u2014 prioriter syrefulde italienere og Rh\u00F4ne-blends frem for flade nye verden-r\u00F8de. **100\u2013149 kr:** br\u00E6ndpunktet hvor **kvalitet** og **identitet** stiger markant \u2014 her finder du det meste **bedste for pengene**. **150\u2013249 kr:** enkelt-producenter med karakter, **moden frugt** og l\u00E6ngere f\u00F8r\u00E6nd. **250\u2013500 kr:** **festvine**, crus og modne \u00E5rgange \u2014 k\u00F8b kun n\u00E5r lejligheden fortjener det."
      },
      {
        h: "Hvad du med fordel undg\u00E5r",
        body: "**Flade, meget alkoholst\u00E6rke r\u00F8de uden syre** \u2014 de f\u00F8les ofte tunge uden at smage af noget bestemt. **Ukendte \u201Creserva\u201D-etiketter** uden omr\u00E5de eller producentinfo. **Ekstrem unge tannin-dominerede flasker** uden **luftning** \u2014 de kan virke h\u00E5rde mod hverdagsmad. Og **undg\u00E5 at lade vinen blive for varm**: r\u00F8dvin skal **ikke** v\u00E6re stuetemperatur i et moderne varmt rum. Se " + TEMP + "."
      },
      {
        h: "S\u00F8g flasker",
        body: "**[S\u00F8g r\u00F8dvin p\u00E5 Vinbot](/?q=r%C3%B8dvin)** for aktuelle priser og billeder p\u00E5 tv\u00E6rs af danske forhandlere."
      }
    ],
    links: [
      sa("bedste-rodvin-under-100-kr", "under 100 kr"),
      sa("bedste-rodvin-under-150-kr", "under 150 kr"),
      sa("bedste-italiensk-rodvin", "italiensk r\u00F8dvin"),
      sa("bedste-fransk-rodvin", "fransk r\u00F8dvin"),
      sa("pinot-noir-druen", "pinot noir"),
      sa("komplet-guide-til-vin-og-mad", "komplet guide til vin og mad")
    ]
  },
  {
    slug: "bedste-hvidvin",
    title: "Bedste hvidvin: guide til druer, stil og pris",
    description:
      "Bedste hvidvin: friske, aromatiske og fyldige stilarter. Top-liste til sauvignon blanc, chardonnay, riesling og albariño — med prisguide og mad-parring.",
    tags: ["bedste", "hvidvin", "top-liste", "køb vin"],
    searchQ: "hvidvin%20sauvignon%20blanc%20chardonnay%20riesling%20albarino",
    sections: [
      {
        h: "De tre hvide stilarter",
        body: "**Frisk og syrlig:** **sauvignon blanc**, **albari\u00F1o**, **muscadet**, **gr\u00FCner veltliner**, **t\u00F8r riesling** \u2014 til skaldyr, salater, sushi, asparges og urter. Server **8\u201310 \u00B0C**. **Aromatisk og blomst:** **riesling** (halvt\u00F8r/s\u00F8d), **gew\u00FCrztraminer**, **viognier** \u2014 til krydret mad, thai og blomst-baseret k\u00F8kken. **Fyldig og cremet:** **chardonnay** (fad/sur lie), **chenin blanc**, **pinot blanc/gris** med tekstur \u2014 til fisk i s\u00F8vs, fjerkr\u00E6 og osteretter."
      },
      {
        h: "Regioner der leverer hvidvin-v\u00E6rdi",
        body: "**Rueda** (Spanien, verdejo), **R\u00EDas Baixas** (albari\u00F1o), **Loire** (sauvignon fra Sancerre og muscadet), **M\u00E5selland** (riesling), **Alsace** (pinot gris, riesling, gew\u00FCrztraminer), **Nordl\u00EDgt Portugal** (Vinho Verde), **New Zealand** (Marlborough sauvignon), **Ch\u00E2teauneuf-du-Pape blanc** og **Chablis** i Bourgogne. Mange leverer fremragende hvidvin for **120\u2013180 kr**."
      },
      {
        h: "Top anbefalinger efter m\u00E5ltid",
        body: "**Hverdag og tapas:** albari\u00F1o eller gr\u00FCner veltliner i **100\u2013130 kr**-klassen. **Fisk og skaldyr:** muscadet sur lie, Chablis eller t\u00F8r riesling. **Kyllingeretter:** chardonnay med moderat fad eller chenin blanc fra Loire. **Krydret asiatisk:** off-dry riesling eller gew\u00FCrztraminer \u2014 s\u00F8den matcher chili. **Festlige retter:** Sancerre, premier cru Chablis eller moden chardonnay fra Bourgogne."
      },
      {
        h: "Prisniveauer",
        body: "**70\u201399 kr:** hverdagshvide \u2014 hold dig til **syrefulde** og **unge** flasker. **100\u2013149 kr:** sweet spot for albari\u00F1o, verdejo, gr\u00FCner veltliner, Chablis petit, gode rieslinge. **150\u2013249 kr:** Sancerre, Chablis, ordentlig Alsace-riesling, chardonnay fra Bourgogne-nabolande. **250\u2013500 kr:** premier cru Chablis, gamle rieslinge, Meursault light \u2014 fest og gaveniveau."
      },
      {
        h: "Hvad du b\u00F8r undg\u00E5",
        body: "**Fad-tunge, billige chardonnay** uden syre (\u201Choldt kul og vanilje\u201D uden frisk frugt). **Billig \u201Csauvignon blanc\u201D uden terroir-angivelse** \u2014 den smager ofte generisk. **Halvt\u00F8r vin uden at vide det:** tjek **restsukker/etiket** hvis du ville have en t\u00F8r vin. Se " + ETIKET + "."
      },
      {
        h: "S\u00F8g flasker",
        body: "**[S\u00F8g hvidvin p\u00E5 Vinbot](/?q=hvidvin)** \u2014 pris og billede fra danske forhandlere."
      }
    ],
    links: [
      sa("bedste-hvidvin-under-100-kr", "under 100 kr"),
      sa("bedste-hvidvin-under-150-kr", "under 150 kr"),
      sa("bedste-chardonnay", "bedste chardonnay"),
      sa("riesling-druen", "riesling"),
      sa("sauvignon-blanc-druen", "sauvignon blanc"),
      sa("komplet-guide-til-vin-og-mad", "komplet guide til vin og mad")
    ]
  },
  {
    slug: "bedste-rosevin",
    title: "Bedste rosévin: tørre, frugtige og bobler af rosé",
    description:
      "Bedste rosévin: tørre provence-stil, spanske rosado, italienske rosato og mousserende rosé. Prisguide, mad-parring og hvad du skal undgå.",
    tags: ["bedste", "rosévin", "rosé", "top-liste"],
    searchQ: "rosé%20provence%20bandol%20rosado%20rosato",
    sections: [
      {
        h: "T\u00F8r ros\u00E9 er standarden",
        body: "**Moderne god ros\u00E9 er t\u00F8r** \u2014 ikke s\u00F8d. De s\u00F8de \u201Cpink\u201D-vine fra halvfjerdserne er afl\u00F8st af friske, salt-mineralske flasker fra **Provence**, **Tavel** (Rh\u00F4ne), **Spanien** (rosado) og **Italien** (rosato). Se efter **bleg lakserosa** til rigtig mad-alsidighed; dybere r\u00F8d ros\u00E9 passer til kraftigere k\u00F8d."
      },
      {
        h: "Stilarter",
        body: "**Provence-stil:** bleg farve, citrus, gr\u00E6sk\u00E6r, salt \u2014 alsidig til salater, skaldyr og let k\u00F8d. **Tavel:** kraftigere, med mere frugt og struktur \u2014 egentlig en vin at servere til paella og lam. **Rosado fra Navarra/Rioja:** frugtigere, tempranillo-baseret, god til tapas. **Rosato fra Abruzzo og Puglia:** saftig, fin til tomat og pasta. **Mousserende ros\u00E9:** cr\u00E9mant ros\u00E9, cava rosado, champagne ros\u00E9 \u2014 fest og forret."
      },
      {
        h: "Top anbefalinger",
        body: "**Hverdag:** Provence AOP i **130\u2013170 kr**-klassen fra h\u00E6derlige producenter. **V\u00E6rdi:** spansk rosado fra Navarra i **80\u2013120 kr**. **Festbord:** cr\u00E9mant de Bourgogne ros\u00E9 eller cava reserva rosado. **Grill:** Tavel \u2014 den eneste ros\u00E9 der klarer bbq-k\u00F8d alene. **Som aperitif:** let Provence-ros\u00E9 eller ros\u00E9-prosecco. " + BOBLER + " har mere om mousserende."
      },
      {
        h: "Ros\u00E9 til maden",
        body: "**Nicoise-salat, tapas, ris-retter, grillet kylling, laks og fad-ost:** ros\u00E9 d\u00E6kker bredt. **Krydret asiatisk:** **lidt restfrugt** eller tempranillo-rosado fungerer godt. **Pizza margherita, bolognese:** ros\u00E9 er ofte bedre end tung r\u00F8d n\u00E5r det er varmt. **Undg\u00E5** ros\u00E9 til meget bitre b\u00F8nner, meget m\u00F8rkt k\u00F8d og tunge cremesaucer \u2014 her vinder hvid eller rod."
      },
      {
        h: "Prisniveauer og hvad du skal undg\u00E5",
        body: "**70\u2013120 kr:** hverdagsros\u00E9 \u2014 hold dig til **indev\u00E6rende \u00E5rgang** (ros\u00E9 drikkes ung). **120\u2013180 kr:** k\u00E6rne-Provence og kvalitetsrosado. **200+ kr:** premier-Provence, Bandol-ros\u00E9 og mousserende ros\u00E9. **Undg\u00E5:** gammel \u00E5rgang p\u00E5 billig ros\u00E9 \u2014 den bliver m\u00F8rk og flad. **Undg\u00E5 \u201Cwhite zinfandel\u201D**-stil med h\u00F8j restsukker, hvis du vil have en t\u00F8r vin."
      },
      {
        h: "S\u00F8g flasker",
        body: "**[S\u00F8g ros\u00E9 p\u00E5 Vinbot](/?q=ros%C3%A9)** \u2014 sammenlign pris og \u00E5rgang p\u00E5 tv\u00E6rs af danske forhandlere."
      }
    ],
    links: [
      sa("rosevin-til-mad-og-sommer", "ros\u00E9vin til mad og sommer"),
      sa("bedste-rosevin-under-150-kr", "under 150 kr"),
      sa("bedste-sommer-vin", "sommerens bedste vine"),
      sa("vin-til-tapas", "tapas"),
      sa("vin-til-grill-og-bbq", "grill og BBQ"),
      sa("komplet-guide-til-vin-og-mad", "komplet guide til vin og mad")
    ]
  },
  {
    slug: "bedste-bobler",
    title: "Bedste bobler: champagne, cava, crémant og prosecco i pris og stil",
    description:
      "Bedste bobler efter pris, stil og lejlighed: cava, crémant, prosecco og champagne. Sådan vælger du den rigtige brut, extra dry eller rosé.",
    tags: ["bedste", "bobler", "champagne", "cava", "crémant", "prosecco"],
    searchQ: "cava%20crémant%20champagne%20prosecco%20brut",
    sections: [
      {
        h: "Forskellen p\u00E5 bobler",
        body: "**Champagne** er traditionel flaskemetode fra Champagne-distriktet: brod, mineralitet, l\u00E6ngere lagring \u2014 og h\u00F8jere pris. **Cr\u00E9mant** er samme metode, men fra andre franske omr\u00E5der (Bourgogne, Loire, Limoux, Alsace) \u2014 ofte **60\u201370 % af champagne-kvaliteten for 40\u201350 % af prisen**. **Cava** bruger ogs\u00E5 flaskemetoden (Spanien, typisk Pened\u00E8s). **Prosecco** laves via tankmetode \u2014 friskere, frugtigere, ofte billigere."
      },
      {
        h: "Bedste v\u00E6rdi efter pris",
        body: "**80\u2013120 kr:** cava brut reserva eller god prosecco DOCG. **120\u2013180 kr:** **cr\u00E9mant** \u2014 her er den bedste pris/kvalitet i bobler. Pr\u00F8v Cr\u00E9mant de Bourgogne, Cr\u00E9mant de Loire eller Cr\u00E9mant de Limoux. **180\u2013300 kr:** cava gran reserva, premium cr\u00E9mant, enkelt-\u00E5rgangs prosecco. **300\u2013500 kr:** grower-champagne, brut-niveau NV fra gode huse. **500+ kr:** \u00E5rgangschampagne, ros\u00E9-champagne, de store huses tops."
      },
      {
        h: "Brut, extra dry og dosage",
        body: "**Brut nature / zero dosage:** 0\u20133 g/l restsukker \u2014 knast\u00F8r. **Brut:** <12 g/l \u2014 standard, t\u00F8r. **Extra dry:** 12\u201317 g/l \u2014 let s\u00F8dlig (ofte misforst\u00E5et som t\u00F8r). **Demi-sec / sec:** mere s\u00F8dme \u2014 til dessert eller som aperitif p\u00E5 varme dage. Se " + ETIKET + " hvis du vil v\u00E6re sikker p\u00E5 hvad du k\u00F8ber."
      },
      {
        h: "Bobler til maden",
        body: "**Forret og skaldyr:** brut eller extra brut \u2014 muscadet-niveau syre i en mousserende indpakning. **Frituremad og fried chicken:** cava brut eller bone-dry cr\u00E9mant. **Brunch:** prosecco eller cr\u00E9mant. **Ostebord:** champagne eller extra brut cava. **Dessert:** demi-sec eller asti \u2014 **aldrig brut til kage**, der f\u00F8les det ofte skarpt."
      },
      {
        h: "Hvad du skal undg\u00E5",
        body: "**Dybtsprunget prosecco** uden DOC/DOCG-m\u00E6rke \u2014 det er sj\u00E6ldent v\u00E6rd tiden. **Champagne alt for ung** \u2014 giv den mindst 2\u20133 m\u00E5neder hjemme hvis du k\u00F8ber en NV. **Billig \u201Cmousserende vin\u201D** uden oprindelse \u2014 bedre at bruge samme penge p\u00E5 god cava. **Serveringstemperatur:** bobler skal v\u00E6re **6\u20139 \u00B0C**; serveres de varmt, f\u00F8ler de sig klissede."
      },
      {
        h: "S\u00F8g flasker",
        body: "**[S\u00F8g bobler p\u00E5 Vinbot](/?q=bobler%20cava%20cr%C3%A9mant%20champagne)** for aktuelle priser."
      }
    ],
    links: [
      sa("bedste-champagne", "bedste champagne"),
      sa("bedste-bobler-under-200-kr", "bobler under 200 kr"),
      sa("bobler-champagne-cava-prosecco-og-cremant", "bobler-guiden"),
      sa("vin-til-nytaar-og-nytaarsmenu", "nyt\u00E5rsvin"),
      sa("prosecco-glera-druen", "prosecco"),
      sa("komplet-guide-til-vin-og-mad", "komplet guide til vin og mad")
    ]
  },
  {
    slug: "bedste-champagne",
    title: "Bedste champagne: huse, grower og prisniveau",
    description:
      "Bedste champagne i forskellige prisklasser: store huse, grower-champagne, rosé og vintage. Sådan læser du etiketten og undgår du fejlkøb.",
    tags: ["bedste", "champagne", "bobler", "luksus"],
    searchQ: "champagne%20brut%20grower%20blanc%20de%20blancs",
    sections: [
      {
        h: "Store huse vs. grower",
        body: "**Stor\u00E8-huse** (Moet, Veuve Clicquot, Pommery, Lanson) laver bredt blend fra mange marker \u2014 konsistent stil, altid til r\u00E5dighed. **Grower-champagne** (r\u00E9coltant-manipulant, m\u00E6rket **RM** p\u00E5 bagetiketten) er lavet af druerne fra producentens egne marker \u2014 mere terroir, ofte mere specifik karakter, **tit bedre v\u00E6rdi**. Kig efter **RM** \u2014 det er din guide til mere personlig champagne for samme penge."
      },
      {
        h: "Stilarter",
        body: "**Brut NV** (non-vintage): standardstilen \u2014 frugt, brod, syre. **Blanc de Blancs:** 100 % chardonnay \u2014 mineralsk, citron, langlivet. **Blanc de Noirs:** kun pinot noir + meunier \u2014 krop og r\u00F8dfrugt. **Ros\u00E9:** bl\u00E6rfarvet, klassisk til ostebord og jordb\u00E6rdessert. **Millesime / vintage:** en enkelt \u00E5rgang, lagret l\u00E6ngere \u2014 ofte 10+ \u00E5r. **Pr\u00E9stige cuv\u00E9e:** husets top (Dom P\u00E9rignon, Cristal, Krug)."
      },
      {
        h: "Prisniveauer",
        body: "**350\u2013500 kr:** standard brut NV fra store huse og gode grower \u2014 til mindre fejringer. **500\u2013800 kr:** premium brut NV, blanc de blancs fra mindre producenter, ros\u00E9 fra store huse. **800\u20131500 kr:** vintage-champagne og k\u00E6rne-premium. **1500+ kr:** pr\u00E9stige cuv\u00E9e og \u00E6ldre \u00E5rgange \u2014 til store anledninger og samling. Den **store value-zone** for de fleste hjem er **400\u2013600 kr** med en god grower."
      },
      {
        h: "Bedste champagne-valg efter lejlighed",
        body: "**Aperitif og fest:** brut NV, **serveret ved 8\u201310 \u00B0C**. **Mad og middag:** blanc de blancs eller vintage \u2014 de h\u00E5ndterer tekstur og dybde i maden. **Ros\u00E9-kagebord:** ros\u00E9-champagne (demi-sec hvis kagen er meget s\u00F8d). **Gave:** kig efter en grower med personlig historie \u2014 det ops\u00E6tter bedre end en generisk luksusetiket. Se ogs\u00E5 " + GAVE + "."
      },
      {
        h: "Hvad du skal undg\u00E5",
        body: "**Meget gamle NV-flasker** uden opbevarings-oplysninger \u2014 champagne **kan** forringes med tiden, is\u00E6r ikke-vintage. **Discount-champagne i supermarkeder** uden producent-navn \u2014 ofte overstock der er kedeligt. **Alt for kold servering** (<6 \u00B0C) skjuler aroma. Og hvis du vil spare: **l\u00E6r cr\u00E9mant at kende** \u2014 pris/kvalitet er ofte bedre end billige champagner."
      },
      {
        h: "S\u00F8g flasker",
        body: "**[S\u00F8g champagne p\u00E5 Vinbot](/?q=champagne)** for pris, billede og \u00E5rgang."
      }
    ],
    links: [
      sa("bedste-bobler", "bedste bobler"),
      sa("bobler-champagne-cava-prosecco-og-cremant", "bobler-guiden"),
      sa("vin-til-nytaar-og-nytaarsmenu", "nyt\u00E5rsvin"),
      sa("gavevin-sadan-vaelger-du-den-rigtige-flaske", "gavevin"),
      sa("komplet-guide-til-vin-og-mad", "komplet guide til vin og mad")
    ]
  },
  {
    slug: "bedste-dessertvin",
    title: "Bedste dessertvin: sauternes, portvin, tokaji og mere",
    description:
      "Bedste dessertvin: sauternes, portvin, tokaji, sød riesling og moscato. Prisguide, smagsprofiler og hvad der matcher chokolade, is og blåskimmel.",
    tags: ["bedste", "dessertvin", "sødvin", "port"],
    searchQ: "sauternes%20port%20tokaji%20dessert%20vin",
    sections: [
      {
        h: "De klassiske s\u00F8dvinsstilarter",
        body: "**Sauternes** (Bordeaux): botrytis, honning, abrikos \u2014 den store klassiker til foie gras og \u00E6ble. **Tokaji Asz\u00FA** (Ungarn): s\u00F8d, syrlig, orange marmelade \u2014 det bedste med ost. **Portvin** (Douro, Portugal): fortified, m\u00F8rkt og sirup-agtigt (ruby/tawny) \u2014 til chokolade og bl\u00E5skimmel. **Sherry PX og Oloroso Dulce** (Jerez): rosin-m\u00F8rk \u2014 genial til vaniljeis. **S\u00F8d riesling** (Sp\u00E4tlese, Auslese, Beerenauslese fra Tyskland): ren syre og fersken \u2014 til frugtdessert og asiatisk."
      },
      {
        h: "Top anbefalinger",
        body: "**Begynderv\u00E6rdi:** Moscato d\u2019Asti (100\u2013130 kr) \u2014 let, mousserende, 5 % alkohol. **Klassisk for livstid:** Sauternes premier cru eller Barsac, halvflaske 250\u2013400 kr. **Port til hverdag:** Late Bottled Vintage (LBV) i **180\u2013250 kr**. **Port til fest:** Vintage Port fra et anerkendt \u00E5rgang (600+ kr). **Tokaji Asz\u00FA 5 puttonyos** 250\u2013500 kr halvflaske. **Eiswein:** de dyreste, men uforglemmelige."
      },
      {
        h: "Dessertvin til maden",
        body: "**Chokoladekage / brownie:** tawny port, s\u00F8d rioja eller PX-sherry. **Cr\u00E8me br\u00FBl\u00E9e og flan:** sauternes eller tokaji. **Frugttarter:** s\u00F8d riesling eller moscato. **Bl\u00E5skimmelost:** sauternes, port eller s\u00F8d sherry \u2014 sammen vinder de alt andet. **Ingen dessert?** Dessertvin er ogs\u00E5 en **dessert i sig selv** efter maden. Server **8\u201312 \u00B0C** \u2014 koldt skjuler sukker og fremh\u00E6ver syre."
      },
      {
        h: "Hvorfor m\u00E5 vinen v\u00E6re s\u00F8dere end desserten?",
        body: "**Grundregel:** dessertvinen skal altid v\u00E6re **mindst lige s\u00E5 s\u00F8d** som det den drikkes til \u2014 ellers f\u00F8ler den sig sur og skarp. Derfor fejler **tr\u00F8r riesling til kage** og **brut bobler til marcipan**. Tjek **restsukker** p\u00E5 etiketten n\u00E5r muligt."
      },
      {
        h: "Hvad du b\u00F8r undg\u00E5",
        body: "**\u00C5ben port i k\u00F8leskab i m\u00E5neder** \u2014 tawny kan holde 4\u20136 uger, ruby f\u00E6rre. **Billige s\u00F8dvine** uden oprindelse \u2014 de f\u00F8les ofte en-dimensionelt s\u00F8de. **Dessertvin til meget salte oste** \u2014 s\u00F8d + salt er magi med blmeskimmel men fungerer ikke med alle oste."
      },
      {
        h: "S\u00F8g flasker",
        body: "**[S\u00F8g dessertvin p\u00E5 Vinbot](/?q=dessertvin%20port%20sauternes%20tokaji)**."
      }
    ],
    links: [
      sa("bedste-portvin", "bedste portvin"),
      sa("vin-til-dessert-og-kransekage", "vin til dessert"),
      sa("vin-til-ost-og-ostebord", "vin til ost"),
      sa("riesling-druen", "riesling"),
      sa("komplet-guide-til-vin-og-mad", "komplet guide til vin og mad")
    ]
  },

  // ========== PRIS-TOP-LISTER (6) ==========
  {
    slug: "bedste-rodvin-under-100-kr",
    title: "Bedste rødvin under 100 kr: sådan scorer du bedst for pengene",
    description:
      "Bedste rødvin under 100 kr: regioner, druer og strategier der over-performer prisen. Sicilien, Spanien, Portugal og Frankrigs syd — og hvad du skal undgå.",
    tags: ["bedste", "rødvin", "budget", "under 100 kr"],
    searchQ: "rødvin%20under%20100%20kr%20hverdagsvin",
    sections: [
      {
        h: "Forventning ved under 100 kr",
        body: "Under **100 kr** er du i **hverdagsr\u00F8dvinens** land. Her finder du vine, der d\u00E6kker **basis**: saftig frugt, ren lavet, uden uhensigtsm\u00E6ssige fejl. Du f\u00E5r sj\u00E6ldent **terroir-dybde** eller **l\u00E6ngere lagring** \u2014 men du kan finde **h\u00F8jst brugbare** flasker hvis du ved hvor du skal kigge. Nøglen er at fokusere p\u00E5 **regioner** der leverer meget for pengene."
      },
      {
        h: "Regioner der overperformer",
        body: "**Sicilien:** **Nero d\u2019Avola** og **Etna Rosso** leverer frisk frugt og struktur. **Spanien:** **Rioja Crianza**, **Navarra** (garnacha) og **Campo de Borja**. **Portugal:** **Alentejo** og **Douro** \u2014 kraftige blends med mange druer. **Frankrigs syd:** **C\u00F4tes du Rh\u00F4ne**, **Corbi\u00E8res**, **Minervois**. **Italien:** **Montepulciano d\u2019Abruzzo** og **Salice Salentino**. Disse zoner tilbyder ofte **autentisk stil** under 100 kr."
      },
      {
        h: "Stilarter og druer at kigge efter",
        body: "**Saftige hverdagsvine:** garnacha, tempranillo ung, primitivo/zinfandel, montepulciano, nero d\u2019Avola. **Frisk og syrlig:** sangiovese fra Abruzzo/Marche, frappato fra Sicilien. **Kraftig:** portugisiske blends, Rh\u00F4ne-blends. **Undg\u00E5** pinot noir og nebbiolo under 100 kr \u2014 de er sj\u00E6ldent gode i den prisklasse. Og undg\u00E5 n\u00F8gne \u201Cbrand\u201D-m\u00E6rker uden geografisk oprindelse."
      },
      {
        h: "Strategier for bedst v\u00E6rdi",
        body: "**1) K\u00F8b kasser p\u00E5 tilbud:** 6-flasker-tilbud sp\u00E4nder ofte **70\u201389 kr/flaske** fra gode forhandlere. **2) Kig efter \u201Cdeclassed\u201D-vine:** store producenter s\u00E6lger \u201Cbasis\u201D-label fra samme marker som deres dyrere vine \u2014 50\u201370 % af kvaliteten til 30\u201340 % af prisen. **3) Fokus p\u00E5 unge \u00E5rgange:** under-100 kr-r\u00F8d er ikke lavet til lagring \u2014 drik indenfor 1\u20132 \u00E5r. **4) Pr\u00F8v boksevin** af god kvalitet \u2014 se " + sa("bedste-box-vin", "bedste boxvin") + "."
      },
      {
        h: "Hvad du skal undg\u00E5",
        body: "**Supermarked-eksklusiv-label** uden producent-info. **\u201CReserva\u201D for under 100 kr** fra ukendte producenter \u2014 s\u00E6rlig Spanien: \u00E6gte reserva skal have l\u00E6ngere lagring end prisen typisk tillader. **Bordeaux-g\u00E9n\u00E9rique uden Chateau-navn** \u2014 ofte flad og ubalanceret. **Ikke-vintage r\u00F8d** \u2014 vin uden \u00E5rgang for hverdag er ofte s\u00E6rligt dagligdags."
      },
      {
        h: "S\u00F8g flasker",
        body: "**[S\u00F8g billig r\u00F8dvin p\u00E5 Vinbot](/?q=r%C3%B8dvin%20under%20100)** og sorter p\u00E5 pris."
      }
    ],
    links: [
      sa("bedste-rodvin", "bedste r\u00F8dvin"),
      sa("bedste-rodvin-under-150-kr", "under 150 kr"),
      sa("bedste-box-vin", "bedste boxvin"),
      sa("bedste-italiensk-rodvin", "italiensk r\u00F8dvin"),
      sa("bedste-spansk-rodvin", "spansk r\u00F8dvin"),
      sa("koeb-vin-online-sadan-holder-du-styr-paa-det", "k\u00F8b vin online")
    ]
  },
  {
    slug: "bedste-rodvin-under-150-kr",
    title: "Bedste rødvin under 150 kr: sweet spot for kvalitet",
    description:
      "Bedste rødvin under 150 kr: her stiger kvalitet og identitet markant. Guide til regioner, producenter og stilarter — fra Chianti Classico til Rioja og Rhône.",
    tags: ["bedste", "rødvin", "budget", "under 150 kr"],
    searchQ: "rødvin%20under%20150%20kr%20kvalitet",
    sections: [
      {
        h: "Hvorfor 150 kr er sweet spot",
        body: "Mellem **100 og 150 kr** stiger **kvalitet**, **identitet** og **terroir-tydelighed** markant. Du g\u00E5r fra *generelle omr\u00E5deblends* til **specifikke producenter** og **klassiske appellationer**. Her finder du **de bedste hverdagsvine** og **helnse-kl\u00E6de vine** til familie-middag. Forventning: **moden frugt**, **l\u00E6ngere finish** og **mere personlighed**."
      },
      {
        h: "De bedste regioner i 100\u2013150 kr",
        body: "**Chianti Classico** (basic): sangiovese-rigdom, rigtig til italiensk mad. **Rioja Crianza** fra kendte producenter: mellem-st\u00F8rrelse tanniner og fad. **C\u00F4tes du Rh\u00F4ne Villages:** grenache/syrah-struktur. **Beaujolais Villages / Morgon (cru):** gamay med m\u00F8rk frugt. **Douro** (Portugal): touriga nacional-blends. **Cahors:** rigtig malbec-hjemland. **Barbera d\u2019Asti:** h\u00F8j syre, frisk frugt. **Chilensk carm\u00E9n\u00E8re eller syrah** fra enkelt-producenter."
      },
      {
        h: "Druer at prioritere",
        body: "**Sangiovese** fra Chianti Classico og Montepulciano-omr\u00E5det. **Tempranillo** i Crianza-niveau. **Nebbiolo** fra **Langhe** (ikke Barolo \u2014 den er dyrere) giver rigtig nebbiolo-karakter for pengene. **Malbec** fra Cahors i Frankrig (ofte bedre end tilsvarende argentinske under 150 kr). **Syrah/Shiraz** fra kølige klimaer (Frankrigs Rh\u00F4ne eller Australiens kølige zoner)."
      },
      {
        h: "Top anbefalinger efter m\u00E5ltid",
        body: "**Pasta og pizza:** Chianti Classico eller Barbera d\u2019Asti. **Steak og lam:** Rioja Crianza, C\u00F4tes du Rh\u00F4ne Villages, eller Cahors malbec. **Gryderet og bolognese:** Douro-blend eller Salice Salentino. **Svin og fjerkr\u00E6 med smag:** Pinot noir fra k\u00F8ligere zoner, gamay cru (Morgon, Fleurie). **Ost og charcuteri:** Chianti, let rioja, Langhe nebbiolo."
      },
      {
        h: "Hvad du skal undg\u00E5",
        body: "**Billigere \u201Cpremium\u201D-m\u00E6rker** uden producent-troper\u00F8d \u2014 man betaler for et brand-navn, ikke kvalitet. **Amarone under 200 kr** \u2014 prisen r\u00E6kker sj\u00E6ldent til autentisk kvalitet. **Gamle \u00E5rgange af let-stil r\u00F8d** uden lagringshistorik. **\u201CReserva\u201D-vin under 150 kr** med kort lagring \u2014 kig efter Crianza-etiketter, som er krav-reguleret."
      },
      {
        h: "S\u00F8g flasker",
        body: "**[S\u00F8g r\u00F8dvin 100\u2013150 kr p\u00E5 Vinbot](/?q=r%C3%B8dvin%20chianti%20rioja%20rhone)**."
      }
    ],
    links: [
      sa("bedste-rodvin", "bedste r\u00F8dvin"),
      sa("bedste-rodvin-under-100-kr", "under 100 kr"),
      sa("bedste-italiensk-rodvin", "italiensk r\u00F8dvin"),
      sa("bedste-spansk-rodvin", "spansk r\u00F8dvin"),
      sa("bedste-fransk-rodvin", "fransk r\u00F8dvin"),
      sa("komplet-guide-til-vin-og-mad", "komplet guide til vin og mad")
    ]
  },
  {
    slug: "bedste-hvidvin-under-100-kr",
    title: "Bedste hvidvin under 100 kr: friskhed og frugt for pengene",
    description:
      "Bedste hvidvin under 100 kr: verdejo, grüner veltliner, vinho verde og unge sauvignon. Guide til frisk hverdagshvid med syre og karakter.",
    tags: ["bedste", "hvidvin", "budget", "under 100 kr"],
    searchQ: "hvidvin%20under%20100%20kr%20verdejo%20gruner",
    sections: [
      {
        h: "Hvilken hvidvin er bedst under 100 kr?",
        body: "Under **100 kr** er **friskhed** og **syre** de vigtigste ingredienser \u2014 ikke dybde eller fad. Prioriter **unge \u00E5rgange** og **frugtige regioner** der har naturlig syre og velsmag. Dette er **hverdagshvid**-land: aperitif, salat, fisk, fredagsbobler-alternativ."
      },
      {
        h: "De bedste regioner",
        body: "**Rueda** (Spanien, verdejo): grapefrugt, urter, frisk bid. **Vinho Verde** (Nordportugal): lav alkohol, frisk, let bobler. **Alsace** (Frankrig): pinot blanc og edelzwicker under 100 kr. **\u00D8strig** (Gr\u00FCner Veltliner fra basic-niveau): p\u00E6n syre og peber. **Sydfrankrig** (Picpoul de Pinet): salt, frisk. **Sydafrika** (Chenin blanc basic): meget for pengene."
      },
      {
        h: "Druer at fokusere p\u00E5",
        body: "**Verdejo** og **sauvignon blanc blend** fra Rueda. **Loureiro** og **alvarinho** i Vinho Verde. **Gr\u00FCner veltliner** unge \u00E5rgange (under 100 kr: Niederösterreich). **Pinot blanc** og **sylvaner** fra Alsace. **Picpoul**. **Chenin blanc** fra Sydafrika. **Undg\u00E5** chardonnay uden oprindelse og meget billig pinot gris \u2014 de er ofte flade."
      },
      {
        h: "Top anbefalinger til maden",
        body: "**Aperitif og tapas:** Vinho Verde eller gr\u00FCner veltliner. **Skaldyr:** Picpoul de Pinet eller verdejo. **Salater og urter:** sauvignon blanc-blend fra Rueda. **Kylling og fjerkr\u00E6:** pinot blanc fra Alsace eller chenin blanc. **Sushi og let asiatisk:** gr\u00FCner veltliner er geniale."
      },
      {
        h: "Hvad du skal undg\u00E5",
        body: "**\u00C6ldre \u00E5rgange (2+ \u00E5r)** af billig hvidvin \u2014 syren falder, frugten f\u00F8les tr\u00E6t. **Billig \u201Cchardonnay\u201D** uden region \u2014 ofte uinteressant. **S\u00F8dlig pinot grigio** uden identitet \u2014 medmindre det er det du vil have. **\u201COak-aged\u201D under 100 kr** \u2014 fad koster penge at lave ordentligt, og er sj\u00E6ldent god i denne klasse."
      },
      {
        h: "S\u00F8g flasker",
        body: "**[S\u00F8g billig hvidvin p\u00E5 Vinbot](/?q=hvidvin%20under%20100)**."
      }
    ],
    links: [
      sa("bedste-hvidvin", "bedste hvidvin"),
      sa("bedste-hvidvin-under-150-kr", "under 150 kr"),
      sa("verdejo-druen", "verdejo"),
      sa("gruener-veltliner-druen", "gr\u00FCner veltliner"),
      sa("sauvignon-blanc-druen", "sauvignon blanc"),
      sa("komplet-guide-til-vin-og-mad", "komplet guide til vin og mad")
    ]
  },
  {
    slug: "bedste-hvidvin-under-150-kr",
    title: "Bedste hvidvin under 150 kr: Sancerre, Chablis og kvalitets-riesling",
    description:
      "Bedste hvidvin under 150 kr: Sancerre, Chablis, Alsace-riesling og kvalitets-albariño. Guide til regioner og producenter der leverer mere end prisen antyder.",
    tags: ["bedste", "hvidvin", "under 150 kr", "kvalitet"],
    searchQ: "sancerre%20chablis%20riesling%20albarino",
    sections: [
      {
        h: "Sweet spot for hvidvin",
        body: "**Mellem 100 og 150 kr** begynder du at f\u00E5 **rigtig terroir-hvid**: Sancerre, Chablis AOC, Alsace riesling fra kendte producenter, kvalitets-albari\u00F1o fra R\u00EDas Baixas, premier gr\u00FCner veltliner. Her er **pris-v\u00E6rdi-zonen** hvor hvidvin f\u00F8ler sig **specifik**, ikke generisk."
      },
      {
        h: "De bedste flasker for pengene",
        body: "**Sancerre** (Loire, sauvignon blanc): citron, flint, stram syre. **Chablis AOC** (Bourgogne, chardonnay uden fad): mineralitet, grapefrugt. **Albari\u00F1o fra R\u00EDas Baixas:** salt, fersken. **Riesling fra Alsace** (tr\u00F8r): stenfrugt og peber. **Gr\u00FCner Veltliner Reserve** fra Wachau: fylde og snert. **Vouvray sec** (Loire, chenin blanc): honning, gra og syrlig."
      },
      {
        h: "Druer og stilarter",
        body: "**Mineralsk og stram:** sauvignon blanc fra Sancerre, chardonnay fra Chablis, assyrtiko fra Santorini. **Fyldig og cremet:** pinot gris fra Alsace, chardonnay fra Macon. **Aromatisk:** gew\u00FCrztraminer fra Alsace, riesling Sp\u00E4tlese troken. **Salt og kyst-orienteret:** albari\u00F1o, muscadet sur lie, vermentino fra Sardinien."
      },
      {
        h: "Top anbefalinger efter m\u00E5ltid",
        body: "**\u00D8sters og skaldyr:** Chablis eller muscadet sur lie. **Sushi og sashimi:** gr\u00FCner veltliner Reserve eller tr\u00F8r riesling. **Kyllingeretter med fl\u00F8de:** pinot gris fra Alsace. **Asparges og gedeost:** Sancerre. **Sommer-aperitif:** albari\u00F1o eller vermentino. **Thai og let indisk:** gew\u00FCrztraminer eller off-dry riesling Sp\u00E4tlese."
      },
      {
        h: "Hvad du skal undg\u00E5",
        body: "**\u201CBourgogne blanc\u201D** for under 150 kr uden producent-navn \u2014 kvaliteten varierer meget. **\u201CPremier cru Chablis\u201D** under 150 kr \u2014 f\u00E5 er autentiske i den prisklasse. **Generisk Alsace-blend** uden drue-angivelse. **Pinot grigio med \u00E5rgange 3+ \u00E5r** \u2014 den drikkes ung."
      },
      {
        h: "S\u00F8g flasker",
        body: "**[S\u00F8g hvidvin p\u00E5 Vinbot](/?q=sancerre%20chablis%20albarino%20riesling)**."
      }
    ],
    links: [
      sa("bedste-hvidvin", "bedste hvidvin"),
      sa("bedste-hvidvin-under-100-kr", "under 100 kr"),
      sa("bedste-chardonnay", "bedste chardonnay"),
      sa("bedste-riesling", "bedste riesling"),
      sa("albarino-druen", "albari\u00F1o"),
      sa("komplet-guide-til-vin-og-mad", "komplet guide til vin og mad")
    ]
  },
  {
    slug: "bedste-rosevin-under-150-kr",
    title: "Bedste rosévin under 150 kr: Provence, Spanien og Rhône",
    description:
      "Bedste rosévin under 150 kr: tør Provence, spansk rosado og italiensk rosato. Guide til årgang, stil og hvilke flasker der over-performer prisen.",
    tags: ["bedste", "rosévin", "under 150 kr"],
    searchQ: "rosé%20provence%20rosado%20under%20150",
    sections: [
      {
        h: "Ros\u00E9 er tidskritisk",
        body: "**Ros\u00E9 skal v\u00E6re ung** \u2014 sjaeldnere \u00E5rgange end den indev\u00E6rende. Under 150 kr f\u00E5r du den **unge, friske ros\u00E9** der er formalet dagen for. Prioriter **aktuelle \u00E5rgange** uden kompromis. Farve skal v\u00E6re **blegt lakserosa til ferskenfarvet** \u2014 bliver den dyb m\u00F8rkr\u00F8d, er den ofte for gammel eller for tung."
      },
      {
        h: "Regioner under 150 kr",
        body: "**Provence AOP:** C\u00F4tes de Provence basic og Coteaux d\u2019Aix-en-Provence \u2014 bleg, salt, frisk. **Languedoc-Roussillon:** Pic Saint-Loup ros\u00E9 eller Corbi\u00E8res ros\u00E9 \u2014 kraftigere, mere frugt. **Spanien:** Navarra eller Rioja rosado \u2014 tempranillo-baseret, friskere rustikt. **Italien:** Cerasuolo d\u2019Abruzzo (montepulciano) eller Bardolino Chiaretto \u2014 v\u00E6rdi-vinere."
      },
      {
        h: "Top anbefalinger",
        body: "**Hverdag:** Provence AOP i 120\u2013140 kr. **Grill og tomatret:** Tavel eller Cerasuolo d\u2019Abruzzo. **Tapas:** Navarra rosado eller spansk garnacha rosado. **Skaldyr:** bleg Provence-ros\u00E9. **Lam og kraftigere k\u00F8d:** Tavel eller Bandol rosr (ofte lige over 150 kr, men nogle vintager rammer prisen). **Aperitif:** enhver bleg Provence-ros\u00E9 i rigtig \u00E5rgang."
      },
      {
        h: "Ros\u00E9 til maden",
        body: "**Salater med m\u00F8rk frugt eller feta:** bleg Provence-ros\u00E9. **Grillet kylling med urter:** Cerasuolo d\u2019Abruzzo. **Paella:** Navarra rosado eller dybere Provence. **Ostebord:** Tavel eller rosado \u2014 ros\u00E9 slavisk alle ostetyper lyse nok. **Asiatisk med chili:** garnacha rosado med let restfrugt (ikke s\u00F8d) h\u00E5ndterer krydderi bedre end tung rod."
      },
      {
        h: "Hvad du skal undg\u00E5",
        body: "**Gammel \u00E5rgang af billig ros\u00E9** \u2014 den er flad og m\u00F8rk. **\u201CPink zinfandel\u201D** \u2014 s\u00F8d og generelt uinteressant i denne klasse. **M\u00F8rk, druebyttet ros\u00E9 uden oprindelse** \u2014 ofte en eftertanke. **Discount Proven\u00E7e-ros\u00E9 i slut\u00E5rgange** \u2014 sj\u00E6ldent v\u00E6rd prisforskellen."
      },
      {
        h: "S\u00F8g flasker",
        body: "**[S\u00F8g ros\u00E9vin p\u00E5 Vinbot](/?q=ros%C3%A9%20provence%20rosado)**."
      }
    ],
    links: [
      sa("bedste-rosevin", "bedste ros\u00E9vin"),
      sa("rosevin-til-mad-og-sommer", "ros\u00E9vin til mad og sommer"),
      sa("bedste-sommer-vin", "sommerens bedste vine"),
      sa("vin-til-grill-og-bbq", "vin til grill og BBQ"),
      sa("vin-til-tapas", "vin til tapas"),
      sa("komplet-guide-til-vin-og-mad", "komplet guide til vin og mad")
    ]
  },
  {
    slug: "bedste-bobler-under-200-kr",
    title: "Bedste bobler under 200 kr: cava, crémant og kvalitets-prosecco",
    description:
      "Bedste bobler under 200 kr: cava brut reserva, crémant de Bourgogne og DOCG-prosecco. Guide til husvalg, mad-parring og årgang.",
    tags: ["bedste", "bobler", "under 200 kr", "crémant", "cava"],
    searchQ: "cava%20crémant%20bobler%20under%20200",
    sections: [
      {
        h: "Hvorfor bobler under 200 kr er klog k\u00F8b",
        body: "**Under 200 kr** er **cava**, **cr\u00E9mant** og **god prosecco** ofte **70\u201380 % af champagnes kvalitet**. Hvis du serverer bobler ugentligt eller til selskaber, er dette **pris-zonen** hvor kvaliteten knytter sig til dagen \u2014 ikke en sj\u00E6lden festflaske."
      },
      {
        h: "Cr\u00E9mant \u2014 det bedste k\u00F8b",
        body: "**Cr\u00E9mant** bruger samme metode som champagne (anden g\u00E6ring p\u00E5 flaske), men fra andre franske omr\u00E5der. Pr\u00F8v: **Cr\u00E9mant de Bourgogne** (chardonnay-baseret, klassisk elegance), **Cr\u00E9mant de Loire** (let og frisk), **Cr\u00E9mant de Limoux** (en af de \u00E6ldste mousserende traditioner). Pris: **120\u2013180 kr**. Kvalitet: ofte **s\u00F8lvkvalitet** for bronze-pris."
      },
      {
        h: "Cava \u2014 klassisk pris/v\u00E6rdi",
        body: "**Cava brut reserva** skal have mindst 15 m\u00E5neders lagring \u2014 **cava brut gran reserva** mindst 30 m\u00E5neder. Pr\u00F8v: **Gramona**, **Recaredo**, **Llopart**, **Pared\u00E9s** \u2014 alle producerer kvalitet for **150\u2013200 kr**. Se efter **Paraje Calificado**-label for autentisk topkvalitet. Cava har udviklet sig markant siden 2010, is\u00E6r hvis du kigger efter BIO og grower-niveau producenter."
      },
      {
        h: "Prosecco \u2014 gem niveau",
        body: "**Prosecco DOCG** fra **Conegliano Valdobbiadene** eller **Asolo** er bedre end basic DOC. **Prosecco Superiore** fra disse zoner rammer **140\u2013180 kr** og er langt mere nuanceret. Se efter **Extra Brut** eller **Brut Nature** hvis du vil have det t\u00F8rreste. **Asolo Prosecco** er mindre kendt men meget fint. **Rive**- og **Cartizze**-m\u00E6rkning angiver enkelt-vingrub\u00E9."
      },
      {
        h: "Bobler til maden under 200 kr",
        body: "**Forret og skaldyr:** cr\u00E9mant de Bourgogne eller cava brut reserva. **Pizza og pasta:** prosecco DOCG eller frisk cava. **Fredagsbobler:** lammeland cava eller prosecco superiore. **Dessert:** moscato d\u2019Asti eller demi-sec prosecco. **Aperitif:** alle ovenst\u00E5ende \u2014 servered 6\u20139 \u00B0C."
      },
      {
        h: "Hvad du skal undg\u00E5",
        body: "**Almindelig DOC-prosecco uden DOCG** \u2014 mindre reguleret, ofte billigere, men sj\u00E6ldent v\u00E6rd opgraderingen fra 80 til 150 kr. **Cava uden reserva-m\u00E6rkning** \u2014 minimums-lagring g\u00F8r forskellen. **\u201CSpanish Sparkling Wine\u201D** der er billigere end cava-niveau \u2014 uden oprindelse tit ikke \u00E6gte flaskemetode."
      },
      {
        h: "S\u00F8g flasker",
        body: "**[S\u00F8g bobler under 200 kr p\u00E5 Vinbot](/?q=cava%20cr%C3%A9mant%20prosecco)**."
      }
    ],
    links: [
      sa("bedste-bobler", "bedste bobler"),
      sa("bedste-champagne", "bedste champagne"),
      sa("bobler-champagne-cava-prosecco-og-cremant", "bobler-guiden"),
      sa("vin-til-brunch", "vin til brunch"),
      sa("vin-til-nytaar-og-nytaarsmenu", "nyt\u00E5rsvin"),
      sa("komplet-guide-til-vin-og-mad", "komplet guide til vin og mad")
    ]
  },

  // ========== LEJLIGHED/INTENT (6) ==========
  {
    slug: "bedste-vin-til-gave",
    title: "Bedste vin til gave: sådan vælger du den rigtige flaske",
    description:
      "Bedste vin til gave efter modtager og budget: klassisk rødvin, bobler, dessertvin og specialflasker. Guide til indpakning, historie og budget-opdeling.",
    tags: ["bedste", "gave", "gavevin", "lejlighed"],
    searchQ: "gavevin%20rødvin%20champagne%20flaskevalg",
    sections: [
      {
        h: "Gaven handler om modtageren",
        body: "Den **bedste gavevin** matcher **modtagerens smag** \u2014 ikke din egen og ikke flaskens pris. Kend du modtageren godt? Vælg det de ville velge. Kender du dem ikke? **Kvalitetsbobler** eller en **klassisk r\u00F8dvin** fra et velkendt omr\u00E5de er aldrig forkert. Pakning, historie og præsentation betyder ofte lige s\u00E5 meget som prisen."
      },
      {
        h: "Budget-opdeling",
        body: "**150\u2013300 kr:** god hverdagsgave til f\u00F8dselsdag eller vertindegave. Kig efter **cr\u00E9mant**, **Chianti Classico**, **Rioja Crianza** eller **kvalitets-riesling**. **300\u2013500 kr:** sikker topgave \u2014 champagne brut NV, **Barolo**, **Sancerre**, **s\u00F8d tokaji**. **500\u2013800 kr:** s\u00E6rlige anledninger \u2014 vintage-champagne, **premier cru Chablis**, kvalitets-Amarone, moden Barolo. **800+ kr:** jubil\u00E6er og store gaver."
      },
      {
        h: "Gavevin efter modtager",
        body: "**Vinkyndige:** giv noget **specifikt** eller **sj\u00E6ldent** \u2014 grower-champagne, cru Beaujolais, en enkelt-\u00E5rgang riesling. **Begyndere:** klassisk og genkendelig \u2014 Rioja, Chianti, kvalitets-cava, Prosecco DOCG. **Venner:** deres smag eller et tvist p\u00E5 den \u2014 elsker de chardonnay? Pr\u00F8v en Chablis. Elsker de pinot noir? Pr\u00F8v en k\u00F8lig-klima pinot fra New Zealand eller Elgin. **Fest:** champagne eller mousserende i ros\u00E9-stil."
      },
      {
        h: "Vert- og middagsgaver",
        body: "**Vertindegave** til middag hjemme hos andre: spørg dem ikke hvad de drikker \u2014 bare giv en flaske **i deres prisklasse** der er **drikkeklar nu**. Dyrere betyder ikke bedre til vertind: en velproduceret 200-kr cr\u00E9mant er ofte det **varmere valg** end en 500-kr flaske de m\u00E5 gemme. Se mere i " + GAVE + " for pakning og historie-tips."
      },
      {
        h: "Hvad du skal undg\u00E5",
        body: "**Flaskevin med mystisk oprindelse** \u2014 vis omtanke med et producentnavn. **Meget unge tannintunge vine** der ikke er drikkeklare uden lagring, hvis du ikke ved om modtageren har kapacitet til det. **Personlige favoriter uden bagv\u00E6rk** \u2014 hvis modtageren ikke kender stilen, kan de miste pointen. **Sup\u00E9rdyre hele gaveflasker til folk der ikke drikker meget**: mindre og bedre oftest."
      },
      {
        h: "S\u00F8g flasker",
        body: "**[S\u00F8g gavevin p\u00E5 Vinbot](/?q=gavevin%20champagne)**."
      }
    ],
    links: [
      sa("gavevin-sadan-vaelger-du-den-rigtige-flaske", "gavevin-guiden"),
      sa("bedste-julegavevin", "julegavevin"),
      sa("bedste-vaertindegave-vin", "vertindegave"),
      sa("bedste-champagne", "bedste champagne"),
      sa("bedste-bobler", "bedste bobler"),
      sa("komplet-guide-til-vin-og-mad", "komplet guide til vin og mad")
    ]
  },
  {
    slug: "bedste-vin-til-begynder",
    title: "Bedste vin til begyndere: sådan finder du din smag",
    description:
      "Bedste vin til begyndere: blid rødvin, frugtig hvidvin og let mousserende. Guide til at finde din smag uden at købe forkert — og hvad du skal undgå.",
    tags: ["bedste", "begynder", "introduktion", "vinkøb"],
    searchQ: "begynder%20nybegynder%20rødvin%20hvidvin",
    sections: [
      {
        h: "Find din smag f\u00F8rst",
        body: "For en **begynder** handler **bedste vin** om at **finde din smag** \u2014 ikke om at k\u00F8be den \u201Crigtige\u201D flaske efter regler. Start med stilarter der er **tilgivende**: blide r\u00F8de, frugtige hvide og let mousserende. Kig efter **moden frugt**, **moderat alkohol** og **ikke for meget fad eller tannin**. V\u00E6r \u00E5ben og tag noter."
      },
      {
        h: "Bl\u00F8de r\u00F8de at begynde med",
        body: "**Pinot noir** fra k\u00F8lige klimaer (Burgund basic, New Zealand, Oregon): let, silkeblid. **Gamay** (Beaujolais): frugt uden tunge tanniner. **Merlot** fra v\u00E6rdi-zoner (Languedoc, Chile): bl\u00F8d og frugtig. **Chianti Classico basic**: balance mellem syre og struktur \u2014 god at \u00F8ve sig p\u00E5. Undg\u00E5 **unge tannin-dominerede vine** og **meget fad-tunge stilarter** i starten."
      },
      {
        h: "Hvide at begynde med",
        body: "**Pinot gris fra Alsace**: blid, aromatisk. **Albari\u00F1o**: frisk, salt, frugtig. **Chenin blanc fra Loire (Vouvray demi-sec)**: let, balanceret. **S\u00F8d/halvt\u00F8r riesling** fra Tyskland (Kabinett): frugt, syre, lav alkohol. **Gew\u00FCrztraminer**: aromatisk og let at smage \u2014 mange kan lide det som introduktion. **Undg\u00E5 sur sauvignon blanc-overdosis** som dit f\u00F8rste forsøg."
      },
      {
        h: "Bobler og ros\u00E9",
        body: "**Prosecco DOCG Extra Dry**: frugtig og nem at drikke \u2014 perfekt begynderbobler. **Moscato d\u2019Asti**: s\u00F8d, lav alkohol, fejer af fred. **Cava brut**: t\u00F8r men ikke h\u00E5rd. **Provence-ros\u00E9**: salt, frugtig, ikke s\u00F8d \u2014 en neutral indgang til vin-verdenen."
      },
      {
        h: "S\u00E5dan l\u00E6rer du hurtigst",
        body: "**1) K\u00F8b ikke \u00E9n flaske ad gangen** \u2014 k\u00F8b 3 forskellige stilarter i dagligvare og sammenlign dem. **2) Skriv noter:** farve, frugt, syre, krop, hvad du kan lide. **3) Pr\u00F8v samme drue fra forskellige omr\u00E5der** \u2014 fx chardonnay fra Bourgogne, Chile og Australien. **4) Sm\u00E5 smagninger er nemmere end middag-flasker:** 2\u20133 venner, 4 vine, noter. **5) L\u00E6s " + BEGREB + "** for at forst\u00E5 ord som *tannin*, *syre*, *krop*."
      },
      {
        h: "Hvad du skal undg\u00E5 som begynder",
        body: "**Meget dyre vine** f\u00F8r du kender din smag \u2014 du kan ikke v\u00E6rdsette dem fuldt ud endnu. **Ekstremt tannintunge** unge cabernet sauvignon fra nye verden. **Naturvin** som f\u00F8rste forsøg \u2014 stilen er for eksperimental til begynderne. **Dessertvin som hovedvin** \u2014 den er til sin egen lejlighed."
      },
      {
        h: "S\u00F8g flasker",
        body: "**[S\u00F8g nybegyndervin p\u00E5 Vinbot](/?q=pinot%20noir%20albarino%20cava)**."
      }
    ],
    links: [
      sa("vin-begreber-i-praksis", "vinbegreber"),
      sa("bedste-rodvin-under-100-kr", "r\u00F8dvin under 100 kr"),
      sa("bedste-hvidvin-under-100-kr", "hvidvin under 100 kr"),
      sa("pinot-noir-druen", "pinot noir"),
      sa("sadan-laeser-du-vinflaskens-etiket", "l\u00E6s etiketten"),
      sa("komplet-guide-til-vin-og-mad", "komplet guide til vin og mad")
    ]
  },
  {
    slug: "bedste-vin-til-hverdag",
    title: "Bedste vin til hverdag: pris, stil og alsidighed",
    description:
      "Bedste vin til hverdag: alsidige flasker under 120 kr der fungerer til pasta, pizza, salat og grillmad. Guide til rød, hvid, rosé og bobler til hverdagen.",
    tags: ["bedste", "hverdag", "hverdagsvin", "under 120 kr"],
    searchQ: "hverdagsvin%20rødvin%20hvidvin%20under%20120",
    sections: [
      {
        h: "Hverdagsvin skal v\u00E6re alsidig",
        body: "**Hverdagsvin** er ikke en enkelt flaske \u2014 det er en **reserve p\u00E5 et par stilarter** der d\u00E6kker aftensmad, fredagspizza og improviseret selskab. Nøglen er **alsidighed**, **frisk frugt** og **drikbarhed**. Du skal kunne \u00E5bne flasken p\u00E5 10 sekunder uden at t\u00E6nke over om du \u201Cruinerer\u201D en sjaelden \u00E5rgang."
      },
      {
        h: "Seks stilarter til hverdagen",
        body: "**1) Chianti basic eller Montepulciano d\u2019Abruzzo** \u2014 alsidig rod til pasta og pizza. **2) Gamay (Beaujolais)** \u2014 let rod til hverdagsmad og ost. **3) Verdejo fra Rueda** \u2014 frisk hvid til salat og skaldyr. **4) Pinot grigio fra Alto Adige** \u2014 neutral hvid til \u00E6g, pasta med fl\u00F8de, laks. **5) Navarra rosado** \u2014 ros\u00E9 til alt. **6) Prosecco DOC** \u2014 hverdagsbobler."
      },
      {
        h: "Bedste v\u00E6rdi under 120 kr",
        body: "**C\u00F4tes du Rh\u00F4ne** (rod): saftig, flexibel. **Navarra garnacha** (rod): frugtig og alsidig. **Portugisisk tinto fra Alentejo** (rod): kraftig men ikke tung. **Vinho Verde** (hvid): frisk, let. **Pinot grigio Alto Adige** (hvid): ren. **Chenin blanc fra Sydafrika** (hvid): citrus og pæreerne."
      },
      {
        h: "K\u00F8b-strategi for hverdagen",
        body: "**1) K\u00F8b kasser p\u00E5 tilbud:** 6 flasker for 450 kr er ofte bedre end 1 flaske for 120 kr. **2) Hav mindst \u00E9n r\u00F8d og \u00E9n hvid klar** \u2014 gerne ogs\u00E5 en ros\u00E9 om sommeren. **3) Pr\u00F8v boxvin** \u2014 2 liter god boks-rod er nogle gange bedre end 3 billige glasflasker \u2014 se " + sa("bedste-box-vin", "bedste boxvin") + ". **4) Gem dyre vine til fest** \u2014 du skal ikke \u00E5bne en 400 kr flaske til pizza torsdag aften."
      },
      {
        h: "Hvad du skal undg\u00E5",
        body: "**Meget billige discount-vine** uden geografisk oprindelse \u2014 ofte flade. **Bordeaux g\u00E9n\u00E9rique uden Chateau-navn** \u2014 kvaliteten varierer for meget. **\u201CReserva\u201D under 70 kr** \u2014 regulerede markedskrav betyder at rigtig reserva tager tid og penge at producere. **Ros\u00E9 med \u00E5rgang 2+ \u00E5r** \u2014 ros\u00E9 drikkes ung."
      },
      {
        h: "S\u00F8g flasker",
        body: "**[S\u00F8g hverdagsvin p\u00E5 Vinbot](/?q=hverdagsvin%20chianti%20verdejo)**."
      }
    ],
    links: [
      sa("bedste-rodvin-under-100-kr", "r\u00F8dvin under 100 kr"),
      sa("bedste-hvidvin-under-100-kr", "hvidvin under 100 kr"),
      sa("bedste-box-vin", "bedste boxvin"),
      sa("bedste-weekendvin", "weekendvin"),
      sa("vin-til-pizza-og-pasta", "vin til pizza og pasta"),
      sa("komplet-guide-til-vin-og-mad", "komplet guide til vin og mad")
    ]
  },
  {
    slug: "bedste-vaertindegave-vin",
    title: "Bedste værtindegave: vin der passer til middagen uden at stjæle showet",
    description:
      "Bedste værtindegave i vin: elegante bobler, klassisk rødvin og dessertvin. Guide til pris, pakning og hvordan du rammer smagen uden at kende menuen.",
    tags: ["bedste", "gave", "værtindegave", "middag"],
    searchQ: "værtindegave%20vin%20champagne%20chianti",
    sections: [
      {
        h: "V\u00E6rtindegave-regler",
        body: "**En v\u00E6rtindegave** skal v\u00E6re **drikbar samme aften** eller **let at gemme**. Den skal **ikke pres v\u00E6rtsindet** til at \u00E5bne flasken hvis menuen ikke passer, og den skal **ikke konkurrere med deres egne valg**. Prioriter **klassisk, pris-sikker kvalitet** frem for esoteriske kuriositeter."
      },
      {
        h: "Sikre valg (h\u00F8j sandsynlighed for succes)",
        body: "**Kvalitets-bobler** (cr\u00E9mant, cava gran reserva eller brut NV champagne) \u2014 kan altid \u00E5bnes som aperitif. **Chianti Classico riserva** \u2014 klassisk, meget italiensk mad-venlig. **Rioja reserva** \u2014 sikker til lam, svin, ost. **Sancerre eller moden riesling** \u2014 hvid der klassisk kan gemmes. **Demi-flaske Sauternes** \u2014 elegant slutning efter middag."
      },
      {
        h: "Budget-opdeling",
        body: "**150\u2013200 kr:** god mainstream gave \u2014 cr\u00E9mant eller Chianti Classico. **200\u2013350 kr:** kvalitetsgave til middag \u2014 grower-cava, Rioja reserva, Chianti Classico riserva. **350\u2013500 kr:** fest- eller taksigelsesgave \u2014 champagne brut NV, Barolo-venner, moden Sancerre. **500+ kr:** tak for mege-noget \u2014 vintage-champagne eller premier cru klassikerer."
      },
      {
        h: "Tips til pakning og timing",
        body: "**Giv flasken ved ankomst**, ikke til slut \u2014 s\u00E5 har v\u00E6rterne mulighed for at servere den hvis de vil. **Sig h\u00F8jt at den er til sp\u00E6jning** hvis du ikke forventer at de \u00E5bner den, s\u00E5 de ikke f\u00F8ler forpligtelse. **Gave-p\u00E5klaede bag** eller **enkelt indpakningspapir** slavisk 90 % af luksuriteringsg\u00E6ngener. Skriv en **kort personlig note**."
      },
      {
        h: "Hvad du skal undg\u00E5",
        body: "**Dine egne h\u00F8je-personlige favoritter** uden bagv\u00E6rk \u2014 modtageren ved ikke nødvendigvis hvorfor. **Meget unge uloft-tunge flasker** \u2014 de kan ikke \u00E5bnes i n\u00E6ste \u00E5r, hvad nu hvis v\u00E6rterne ikke har lagring. **Halvt\u00F8r hvidvin ved en uklar middag** \u2014 kan forvirre n\u00E5r det er t\u00F8rt. **Sikkerhedskopi af kvalitet:** kendte appellationer er sikrere end 'cool natural'-flasker for f\u00F8rstegangs-gaven."
      },
      {
        h: "S\u00F8g flasker",
        body: "**[S\u00F8g v\u00E6rtindegave p\u00E5 Vinbot](/?q=gavevin%20cr%C3%A9mant%20rioja)**."
      }
    ],
    links: [
      sa("bedste-vin-til-gave", "bedste vin til gave"),
      sa("gavevin-sadan-vaelger-du-den-rigtige-flaske", "gavevin-guiden"),
      sa("bedste-champagne", "bedste champagne"),
      sa("bedste-bobler", "bedste bobler"),
      sa("bedste-julegavevin", "julegavevin"),
      sa("komplet-guide-til-vin-og-mad", "komplet guide til vin og mad")
    ]
  },
  {
    slug: "bedste-julegavevin",
    title: "Bedste julegavevin: sikre klassikere og prisrigtige specialflasker",
    description:
      "Bedste vin til julegaver: port, champagne, Chianti Classico og kvalitets-riesling. Guide til at vælge efter modtager, budget og lagringskapacitet.",
    tags: ["bedste", "gave", "jul", "julegave"],
    searchQ: "julegave%20vin%20port%20champagne%20chianti",
    sections: [
      {
        h: "Julegavevin: sikker og gennemt\u00E6nkt",
        body: "**Julegaven** er ofte til nogen du k\u00F8ber gaver til uden at kende deres vinsk\u00F8nne \u2014 familie, kolleger, svigerfor\u00E6ldre. Prioriter **sikre klassikere** og **genkendelige navne** frem for esoteriske valg. **Port** og **kvalitets-bobler** er s\u00E6r\u00E6gne til jul: de tolker \u2018festtid\u2019 og kan drikkes til julen eller nyt\u00E5r."
      },
      {
        h: "Sikre klassikere",
        body: "**Port LBV** (120\u2013180 kr): samler den som sidder stille til juleaften \u2014 passer til jule-dessert. **Vintage port** (400+ kr): storj, til vin-entusiaster. **Chianti Classico riserva** (150\u2013250 kr): passer til ribbensteg, andekonfit, julemiddag. **Cr\u00E9mant eller champagne NV** (150\u2013450 kr): fest til juleaften. **Tokaji Asz\u00FA halvflaske** (250\u2013400 kr): ekstravagance til s\u00F8dtand."
      },
      {
        h: "Julegaver efter modtager",
        body: "**Ventindegave til juledag:** cr\u00E9mant eller Chianti riserva. **\u00C6ldre slaegtninge:** port LBV eller moden riesling. **Vinkendere:** vintage port, grower-champagne, Barolo. **Kolleger:** godt besuppe-hvid eller Provence-ros\u00E9 (180\u2013250 kr). **B\u00F8rn af vinkendere:** pinot noir fra k\u00F8lig klima eller Chianti Classico. **Par der holder vinsamling:** vine med **5\u201310 \u00E5rs lagringspotentiale**."
      },
      {
        h: "Indpakning og timing",
        body: "**Gave i gavepose eller tr\u00E6kasse** fra forhandleren hvis muligt. **Navneetiket eller personlig note** h\u00E6ver opfattelsen. **K\u00F8b i god tid** \u2014 dansk forsendelse kan v\u00E6re problem i begyndelsen af december, og gode producenter s\u00E6lger s\u00F8re \u00E5rgange. **Tjek levering** mindst 10 dage f\u00F8r jul."
      },
      {
        h: "Hvad du skal undg\u00E5",
        body: "**Alt for unge vine** uden drikkeklar note \u2014 modtageren skal ikke skulle gemme den 5 \u00E5r for at **m\u00E5ske** gentlerne den. **Mystisk nye naturvine** \u2014 sj\u00E6lden jule-sikker. **Bulk-gaver fra 79-kr-discount** \u2014 signalerer minimal omtanke. **Amarone under 200 kr** \u2014 prisen r\u00E6kker sj\u00E6ldent til autentisk kvalitet."
      },
      {
        h: "S\u00F8g flasker",
        body: "**[S\u00F8g julegavevin p\u00E5 Vinbot](/?q=julegave%20port%20champagne%20chianti)**."
      }
    ],
    links: [
      sa("bedste-vin-til-gave", "bedste gavevin"),
      sa("bedste-portvin", "bedste portvin"),
      sa("bedste-champagne", "bedste champagne"),
      sa("vin-til-julemad-den-store-guide", "vin til julemad"),
      sa("gavevin-sadan-vaelger-du-den-rigtige-flaske", "gavevin-guiden"),
      sa("komplet-guide-til-vin-og-mad", "komplet guide til vin og mad")
    ]
  },
  {
    slug: "bedste-weekendvin",
    title: "Bedste weekendvin: lidt dyrere end hverdag, men stadig drikkeklart",
    description:
      "Bedste weekendvin: 150-250 kr flasker der løfter weekenden uden at være festflasker. Guide til rød, hvid og bobler med karakter og alsidighed.",
    tags: ["bedste", "weekend", "weekendvin"],
    searchQ: "weekendvin%20rødvin%20hvidvin%20150-250",
    sections: [
      {
        h: "Weekenden fortjener lidt mere",
        body: "**Weekendvin** ligger mellem **hverdag** og **fest**: **150\u2013250 kr** er sweet spot. Du vil have **karakter**, **moden frugt** og **terroir-tydelighed** \u2014 men ikke noget der skal gemmes flere \u00E5r. Weekenden er til at eksperimentere: pr\u00F8v nye druer, nye regioner, nye producenter."
      },
      {
        h: "R\u00F8d weekendvin",
        body: "**Beaujolais cru** (Morgon, Fleurie, Moulin-\u00E0-Vent): rigtig gamay med terroir. **Chianti Classico riserva**: l\u00E6ngere fad, mere integration. **Rioja reserva**: struktur og modenhed. **Douro**: touriga-blends med krop. **Cru Bourgeois Bordeaux**: klassisk struktur. **Chianti**, **Langhe nebbiolo** og **Rh\u00F4ne-crus** passer ogs\u00E5 fint i denne klasse."
      },
      {
        h: "Hvid weekendvin",
        body: "**Sancerre**: stram mineralitet, klassisk sauvignon. **Chablis AOC**: mineralsk chardonnay uden fad. **Alsace riesling**: t\u00F8r eller halvt\u00F8r, kompleks. **Premier cru Mâcon**: chardonnay med karakter. **Wachau Gr\u00FCner Veltliner Smaragd**: cremet, kraftig. **Meursault village** (hvis tilbud findes): smørrig og rigtig."
      },
      {
        h: "Bobler og ros\u00E9 til weekenden",
        body: "**Cr\u00E9mant prestige** (200\u2013250 kr): ofte s\u00F8lvkvalitet. **Grower-champagne basic**: fra **250 kr** f\u00E5r du en rigtig champagne-oplevelse. **Bandol ros\u00E9**: kraftig, mad-venlig ros\u00E9. **Provence premier cru**: bleg og sofistikeret."
      },
      {
        h: "Hvornår er weekendvin v\u00E6rd det?",
        body: "**N\u00E5r der er folk med:** venner, familie, g\u00E6ster \u2014 flasken betyder noget. **Til en ret med tid og t\u00E6nke:** lam med urter, fiskegryde, osteplade. **Til selvomsorg:** efter en l\u00E6ngere uge fortjener du lidt mere end hverdagsniveau. **Ikke til takeaway pizza** \u2014 der er hverdagsvin bedre."
      },
      {
        h: "S\u00F8g flasker",
        body: "**[S\u00F8g weekendvin p\u00E5 Vinbot](/?q=cru%20riserva%20premier)**."
      }
    ],
    links: [
      sa("bedste-rodvin", "bedste r\u00F8dvin"),
      sa("bedste-hvidvin", "bedste hvidvin"),
      sa("bedste-rodvin-under-150-kr", "r\u00F8dvin under 150 kr"),
      sa("bedste-bobler", "bedste bobler"),
      sa("bedste-vin-til-hverdag", "hverdagsvin"),
      sa("komplet-guide-til-vin-og-mad", "komplet guide til vin og mad")
    ]
  },

  // ========== STIL (5) ==========
  {
    slug: "bedste-okologiske-vin",
    title: "Bedste økologiske vin: certificering, stilarter og pris",
    description:
      "Bedste økologiske vin: certificering, biodynamiske producenter og naturvin. Guide til hvad mærkerne betyder og hvilke regioner der leverer bedst.",
    tags: ["bedste", "økologisk", "biodynamisk", "bæredygtig"],
    searchQ: "økologisk%20vin%20biodynamisk%20demeter",
    sections: [
      {
        h: "Hvad betyder \u00F8kologisk vin?",
        body: "**\u00D8kologisk vin** kommer fra **certificerede \u00F8kologisk-drykkede druer**. EU-\u00F8ko-lovgivningen g\u00E6lder for hele vinen (dyrkning + vinifikation), mens **organic** i USA ikke altid d\u00E6kker hele processen. **Biodynamisk** (**Demeter** eller **Biodyvin**-certificeret) er et skridt videre \u2014 strammere regler for kælder og mark. **Naturvin** er ofte \u00F8kologisk men **ikke certificeret** og har sj\u00E6ldent strenge regler. Se " + NATUR + "."
      },
      {
        h: "Bedste regioner for \u00F8kologisk vin",
        body: "**Loire** (Frankrig): en af de mest fremtr\u00E6dende zoner med **Nicolas Joly** og **Coulee de Serrant** som pionerer. **Alsace**: biodynamisk hjemland med **Zind-Humbrecht** og **Ostertag**. **Piemonte og Toscana**: stigende \u00F8ko-andel. **Languedoc-Roussillon**: alsidig \u00F8ko-region. **\u00D8strig**: meget h\u00F8j \u00F8ko-andel, is\u00E6r Wachau og Kamptal. **Californien**: store biodynamiske ejendomme."
      },
      {
        h: "Top anbefalinger",
        body: "**Under 150 kr:** certificeret \u00F8ko-Rioja, \u00F8ko-Chianti, \u00F8ko-Rh\u00F4ne. **150\u2013250 kr:** **Paolo Sarette** (Piemonte, biodynamisk), **Ostertag** (Alsace, biodynamisk riesling), **Marcel Lapierre** (Beaujolais, naturvin), **Nikolaihof** (\u00D8strig, Demeter). **250+ kr:** **Ch\u00E2teau Climens** (Sauternes, biodynamisk), **Domaine Leflaive** (Bourgogne hvid, biodynamisk). **Bobler:** Champagne Fleury (Demeter), cava **Raventos i Blanc**."
      },
      {
        h: "\u00D8kologisk vs. naturvin vs. traditionel",
        body: "**\u00D8kologisk** = certificeret. **Biodynamisk** = certificeret + l\u00E6ngere. **Naturvin** = **filosofi**, ikke certificering, minimal tilsatning. Alle tre er **ikke automatisk bedre** smag \u2014 de er **produktionsv\u00E6rdier**. God traditional vin er bedre end dårlig \u00F8kologisk. Men den bedste \u00F8ko-producent kan ofte matche toppen af traditional vin, fordi der er en engageret tankegang bag."
      },
      {
        h: "Hvad du skal kigge efter p\u00E5 etiketten",
        body: "**EU-\u00F8ko-blad** (gr\u00F8n \u00D8kologi-blad med hvide stjerner): EU-\u00F8kologi-cert. **Demeter** eller **Biodyvin**: biodynamisk. **Sans soufre ajout\u00E9** eller **zero SO2**: ingen tilsatning af svovldioxid (typisk naturvin). **Vegan** eller **vegansk vin**: uden animalsk klaring. Se ogs\u00E5 " + ETIKET + "."
      },
      {
        h: "S\u00F8g flasker",
        body: "**[S\u00F8g \u00F8kologisk vin p\u00E5 Vinbot](/?q=%C3%B8kologisk%20biodynamisk)**."
      }
    ],
    links: [
      sa("naturvin-hvad-er-det", "naturvin"),
      sa("bedste-rodvin", "bedste r\u00F8dvin"),
      sa("bedste-hvidvin", "bedste hvidvin"),
      sa("sadan-laeser-du-vinflaskens-etiket", "l\u00E6s etiketten"),
      sa("bedste-alkoholfri-vin", "alkoholfri vin"),
      sa("komplet-guide-til-vin-og-mad", "komplet guide til vin og mad")
    ]
  },
  {
    slug: "bedste-alkoholfri-vin",
    title: "Bedste alkoholfri vin: top-liste og hvad du skal undgå",
    description:
      "Bedste alkoholfri vin: de-alkoholiserede rødvine, hvidvine og bobler. Guide til stilarter, smag og hvilke mærker der over-performer kategorien.",
    tags: ["bedste", "alkoholfri", "sund", "uden alkohol"],
    searchQ: "alkoholfri%20vin%20de-alcoholized%200%25",
    sections: [
      {
        h: "Hvad er alkoholfri vin?",
        body: "**Alkoholfri vin** (<0,5 % alkohol) produceres ved at **fjerne alkoholen** fra f\u00E6rdig vin \u2014 ofte via **vakuum-destillation** eller **reverse osmosis**. Kvaliteten er kraftigt forbedret de sidste 5 \u00E5r, s\u00E6rligt inden for **bobler** og **hvidvin**. **R\u00F8dvin** er stadig kategoriens sv\u00E6rste \u2014 tanninerne og syren f\u00F8les uden alkoholens krop. Se " + ALKFRI + "."
      },
      {
        h: "Bedste alkoholfri bobler",
        body: "**Leitz Eins-Zwei-Zero Sparkling Riesling** (Tyskland): de bedste alkoholfri bobler p\u00E5 markedet, ren tysk riesling-karakter. **Noughty Sparkling Chardonnay** (England): engelsk bobler-stil uden alkohol. **Torres Natureo Sparkling** (Spanien): cava-stil uden alkohol. **Giesen 0 % Sparkling**: nyzealands-stil. Pris: **80\u2013160 kr**."
      },
      {
        h: "Bedste alkoholfri hvidvin",
        body: "**Leitz Eins-Zwei-Zero Riesling** (Tyskland): frisk riesling-karakter, citrus og syre. **Noughty Chardonnay**: let cremet chardonnay-stil. **Torres Natureo Muscat** (Spanien): aromatisk, et godt introduktion. **Giesen 0 % Sauvignon Blanc** (NZ): klassisk NZ-profil uden alkohol. **Leitz har den mest autentiske profil** fordi de starter med stor riesling."
      },
      {
        h: "Alkoholfri r\u00F8d \u2014 mest udfordrende",
        body: "**Torres Natureo Red** (garnacha-based): fungerer til pizza og hverdagsmad. **Leitz Eins-Zwei-Zero Pinot Noir**: bedste alkoholfri pinot-stil. **Giesen 0 % Merlot**: lidt tyndere, men drikkeligt. **Vintense Zero Cabernet**: fungerer til hverdagsmad. Realistisk forventning: **alkoholfri r\u00F8d er aldrig som rigtig r\u00F8d** \u2014 men den er **drikkeligt alternativ** n\u00E5r alkohol ikke er en mulighed."
      },
      {
        h: "N\u00E5r alkoholfri giver mening",
        body: "**Gravide og ammende**. **Dry January / januar-pause**. **K\u00F8reture og sociale events** hvor du ikke vil drikke. **Dehydrering eller efter tr\u00E6ning**. **Sundhed og kulori-indtag** (alkoholfri vin har ca. 1/3 af kalorier fra alkoholisk). **Blandet selskab**: de der drikker og de der ikke drikker kan have noget i glasset der f\u00F8les \u2018voksent\u2019."
      },
      {
        h: "Hvad du skal undg\u00E5",
        body: "**Billig \u201Cde-alcoholized\u201D** uden producentoprindelse \u2014 smager ofte tyndt og s\u00F8dt. **\u201CLow-alcohol wines\u201D med 5\u20137 %** er **ikke alkoholfri** \u2014 tjek etiketten. **Alkoholfri med meget tilsat sukker** \u2014 l\u00E6s n\u00E6ringsindhold. **Alt der lugter af syltet frugt eller druesaft** \u2014 god alkoholfri vin har stadig syre og mineralitet."
      },
      {
        h: "S\u00F8g flasker",
        body: "**[S\u00F8g alkoholfri vin p\u00E5 Vinbot](/?q=alkoholfri%20vin%200%25)**."
      }
    ],
    links: [
      sa("alkoholsvag-og-alkoholfri-vin", "alkoholsvag og alkoholfri vin"),
      sa("bedste-bobler", "bedste bobler"),
      sa("bedste-hvidvin", "bedste hvidvin"),
      sa("bedste-okologiske-vin", "\u00F8kologisk vin"),
      sa("vin-til-brunch", "vin til brunch"),
      sa("komplet-guide-til-vin-og-mad", "komplet guide til vin og mad")
    ]
  },
  {
    slug: "bedste-box-vin",
    title: "Bedste box-vin: 3 liter der slår glasflasker på pris",
    description:
      "Bedste box-vin: bag-in-box der leverer kvalitet og holdbarhed. Guide til regioner, mærker og hvornår karton faktisk er det bedste valg.",
    tags: ["bedste", "box-vin", "bag-in-box", "hverdag"],
    searchQ: "box%20vin%20bag%20in%20box%203%20liter",
    sections: [
      {
        h: "Box-vin har udviklet sig markant",
        body: "**Box-vin** eller **bag-in-box** (BiB) er ikke l\u00E6ngere \u00E6gte kategori-nederste. Moderne producenter leverer **kvalitetsvin i 3 og 5 liter-poser** til priser der ofte **sl\u00E5r glasflasker med 30\u201340 %**. Plus-bonus: **luftt\u00E6t pose** betyder \u00E5bnet vin holder **4\u20136 uger** i stedet for 2\u20134 dage. Perfekt til **hverdag**, **familie** og **lange selskaber**."
      },
      {
        h: "Kvaliteter at kigge efter",
        body: "**3 liter = 4 flasker**. **5 liter = 6,7 flasker**. Regionen betyder mere end formatet. **Sydfrankrig** (Languedoc-Roussillon): h\u00F8j kvalitet for pengene i box. **Italien** (Toscana og Abruzzo): moderne producenter i box. **Spanien** (Navarra, Rioja): ogs\u00E5 tilg\u00E6ngelige i box. **Argentinske malbec** fra etablerede producenter. **Tysk riesling i box** er overraskende god."
      },
      {
        h: "Top anbefalinger",
        body: "**R\u00F8dvin-box:** **La Cour des Dames C\u00F4tes du Rh\u00F4ne** 3L, **Torres Sangre de Toro** 3L (Spanien), **Arturo Quintano** fra Rioja, **Bodegas Juan Gil** Monastrell 3L. **Hvidvin-box:** **Torres Vi\u00F1a Esmeralda** 3L, **Vinho Verde** 3L (Casa de Vila Verde), **Verdejo fra Rueda** box. **Ros\u00E9 box:** **C\u00F4tes de Provence box** fra etablerede producenter. Pris ofte **250\u2013450 kr for 3 liter** = **60\u2013100 kr/flaske**."
      },
      {
        h: "Hvorfor box er smartest til hverdag",
        body: "**1) Pris pr. glas** er 30\u201340 % lavere end samme kvalitet i flaske. **2) Luftt\u00E6t pose** \u2014 vinen holder 4\u20136 uger i k\u00F8leskab efter \u00E5bning uden iltskade. **3) Ingen lutter-problem** \u2014 ingen korkfejl. **4) Mindre affald** \u2014 pose + karton er mere milj\u00F8venligt end gla\u00DFflasker. **5) Praktiskt til fest** \u2014 3 liter = 20 glas, nem afvejing pa buffet."
      },
      {
        h: "Hvad du skal undg\u00E5",
        body: "**Billige \u201C\u00F8konomiklasse\u201D-bokse** uden producent-info \u2014 de er stadig den gamle kategori. **Box med d\u00E5rlig karton-konstruktion** \u2014 skal have t\u00E6t posl\u00E5g. **\u201CWine-in-can\u201D dos\u00E9r som ikke er box** \u2014 ofte d\u00E5rligere kvalitet end box. **Box med \u00E5rgang 2+ \u00E5r** (hvis datoen star p\u00E5) \u2014 frisk er altid bedre for hverdagsbox."
      },
      {
        h: "S\u00F8g flasker",
        body: "**[S\u00F8g boxvin p\u00E5 Vinbot](/?q=box%20vin%20bag%20in%20box)**."
      }
    ],
    links: [
      sa("bedste-rodvin-under-100-kr", "r\u00F8dvin under 100 kr"),
      sa("bedste-hvidvin-under-100-kr", "hvidvin under 100 kr"),
      sa("bedste-vin-til-hverdag", "hverdagsvin"),
      sa("opbevaring-af-vin-temperatur-og-aabnet-flaske", "opbevaring og temperatur"),
      sa("vin-til-pizza-og-pasta", "vin til pizza og pasta"),
      sa("komplet-guide-til-vin-og-mad", "komplet guide til vin og mad")
    ]
  },
  {
    slug: "bedste-portvin",
    title: "Bedste portvin: LBV, tawny, vintage og white port",
    description:
      "Bedste portvin: late bottled vintage, tawny 10/20 år, vintage port og white port. Guide til hvem der laver bedst og hvordan du matcher til mad.",
    tags: ["bedste", "portvin", "dessertvin", "fortified"],
    searchQ: "portvin%20port%20LBV%20tawny%20vintage",
    sections: [
      {
        h: "Port-kategorier forklaret",
        body: "**Port** er **fortified wine** fra Douro-dalen i Portugal \u2014 drue-saft, der **stoppes i g\u00E6ringen** med neutral sprit, s\u00E5 sukker og alkohol bliver h\u00F8j. Hovedtypen er: **Ruby** (ung, m\u00F8rk, frugtig), **Tawny** (lagret p\u00E5 fad, n\u00F8d-kar\u00E6mel), **LBV** (late bottled vintage), **Vintage Port** (enkelt-\u00E5rgang, premium), **White Port** (hvid, ofte som aperitif med tonic)."
      },
      {
        h: "Bedste port-valg efter type",
        body: "**LBV** (**150\u2013200 kr**): Taylor\u2019s, Warre\u2019s, Graham\u2019s \u2014 samme \u00E5rgang som vintage, men lagret l\u00E6ngere p\u00E5 fad f\u00F8r tapning. Drikkeklar. **Tawny 10 \u00E5r** (**250\u2013350 kr**): Grahams 10, Dow\u2019s 10, Taylor\u2019s 10 \u2014 n\u00F8d-kar\u00E6mel, genial til bl\u00E5skimmel og dessert. **Tawny 20 \u00E5r** (**400\u2013600 kr**): gem-kvalitet, meget kompleks. **Vintage port** (**400\u20131000+ kr**): enkelt-\u00E5rgang, skal **dekanteres** \u2014 til festmiddage. **White port** (**120\u2013200 kr**): god aperitif med tonic og lime."
      },
      {
        h: "Port til maden",
        body: "**Bl\u00E5skimmel (roquefort, stilton, gorgonzola):** LBV eller tawny 10 \u2014 det klassiske match. **M\u00F8rk chokolade:** tawny eller LBV. **N\u00F8ddetarter og caramel:** tawny 20 (fad-n\u00F8d matcher fad-n\u00F8d). **Foie gras:** white port eller tawny. **Rosin-kage og \u00E6ble-dessert:** LBV. **Uden mad:** tawny 20 som selskab efter middag."
      },
      {
        h: "Holdbarhed",
        body: "**LBV og vintage:** efter \u00E5bning 2\u20135 dage. **Tawny (10 eller 20):** **4\u20136 uger** i k\u00F8leskab! Derfor er tawny sm\u00E5rtere til m\u00E5nedligt brug. **White port:** 1\u20132 uger i k\u00F8leskab. **Ruby og \u00E6ldre vintage:** 3\u20137 dage efter \u00E5bning. Se ogs\u00E5 " + TEMP + "."
      },
      {
        h: "Hvad du skal undg\u00E5",
        body: "**Billigere \u201Creserva ruby\u201D** uden specifik producent-navn \u2014 kvaliteten varierer. **Vintage port yngre end 5 \u00E5r** \u2014 den er ikke klar, medmindre du kan gemme 10+ \u00E5r. **Port der har st\u00E5et \u00E5bent l\u00E6nge** (ruby, LBV) \u2014 den bliver flad. **S\u00E6t dine \u00E5bne porter i k\u00F8leskab** \u2014 varme oxyderer dem hurtigt."
      },
      {
        h: "S\u00F8g flasker",
        body: "**[S\u00F8g portvin p\u00E5 Vinbot](/?q=port%20LBV%20tawny)**."
      }
    ],
    links: [
      sa("bedste-dessertvin", "bedste dessertvin"),
      sa("vin-til-dessert-og-kransekage", "vin til dessert"),
      sa("vin-til-ost-og-ostebord", "vin til ost"),
      sa("touriga-nacional-druen", "touriga nacional"),
      sa("vinregion-portugal", "vinregion Portugal"),
      sa("komplet-guide-til-vin-og-mad", "komplet guide til vin og mad")
    ]
  },
  {
    slug: "bedste-dansk-vin",
    title: "Bedste danske vin: de bedste producenter og stilarter",
    description:
      "Bedste danske vin: solaris, rondo og danske hybrid-druer. Guide til landets stærkeste producenter, besøgsmuligheder og prisniveau.",
    tags: ["bedste", "dansk vin", "danske producenter", "solaris"],
    searchQ: "dansk%20vin%20solaris%20rondo%20danske%20producenter",
    sections: [
      {
        h: "Dansk vin 2026 \u2014 er den god?",
        body: "**Dansk vin** har udviklet sig markant de sidste 15 \u00E5r. Med **klimaforandringer** og **hybrid-druer** som **solaris**, **rondo** og **riv\u00E5ner** producerer danske avlere nu **respekterede flasker**. Prisniveauet er **h\u00F8jere end import-vin i tilsvarende kvalitet** \u2014 fordi produktionen er sm\u00E5 og klimaet udfordrende \u2014 men de bedste flasker er **gen\u00E4gte og dansksmagende**."
      },
      {
        h: "Bedste danske producenter",
        body: "**Dyrh\u00F8j** (R\u00F8snæs): etableret, bredt sortiment med solaris og cremant-stil bobler. **Skaersogaard** (Kolding): en af de \u00E6ldste og mest respekterede, bobler-fokus. **Ren\u00E9 Rode** (Fyn): solaris fra meget kontrollerede marker. **Elverdams** (Ledre borg): kvalitetsproduktion. **Lille Gadegaard** (Bornholm): unik Bornholms-terroir. **Cold Hand Winery** (Jutland): moderne producent med eksperimentelle stilarter."
      },
      {
        h: "Bedste danske stilarter",
        body: "**Dansk solaris hvid** (de bedste): frisk, citrus, ofte med lidt fyldige fra sur lie-lagring. Pris **180\u2013280 kr**. **Dansk cr\u00E9mant-stil bobler** (fx Skaersogaard): anden g\u00E6ring p\u00E5 flaske, overrasker mange. **250\u2013400 kr**. **Dansk rondo rod** (koldere \u00E5rgange): let, frugtig, pinot noir-stil. **Dansk is-vin** (sj\u00E6lden, men findes): naturlig is-h\u00F8st i rigtige vintre."
      },
      {
        h: "Danske vin-bes\u00F8g",
        body: "De fleste danske producenter **tager imod bes\u00F8g** \u2014 **Dyrh\u00F8j** og **Skaersogaard** har regelm\u00E6ssige smagninger. **Lille Gadegaard** har en vin-kro. **Bornholm** er en natursk\u00F8n destination for vinentusiaster med et par producenter. **Sommerens vinfestival** i Roskilde og København samler mange."
      },
      {
        h: "Hvad du skal undg\u00E5",
        body: "**\u201CDansk frugtvin\u201D** fra æbler eller ribs \u2014 det er ikke druevin, selvom det er interessant som kategori. **Meget unge danske røde** uden luftning \u2014 de kan føles tynde. **Overpris p\u00E5 \u201Cdansk vin\u201D** uden producent-historie \u2014 god dansk vin kommer fra **engagerede avlere**, ikke fra generiske brands. **Ikke forvent Bordeaux-kvalitet** \u2014 pris for pris vinder importeret stadig, men dansk har **lokal historie** og **gørøkring**."
      },
      {
        h: "S\u00F8g flasker",
        body: "**[S\u00F8g dansk vin p\u00E5 Vinbot](/?q=dansk%20vin%20solaris%20rondo)**."
      }
    ],
    links: [
      sa("saesonvin-i-danmark", "s\u00E6sonvin i Danmark"),
      sa("bedste-bobler", "bedste bobler"),
      sa("bedste-hvidvin", "bedste hvidvin"),
      sa("bedste-okologiske-vin", "\u00F8kologisk vin"),
      sa("koeb-vin-online-sadan-holder-du-styr-paa-det", "k\u00F8b vin online"),
      sa("komplet-guide-til-vin-og-mad", "komplet guide til vin og mad")
    ]
  },

  // ========== REGION (3) ==========
  {
    slug: "bedste-italiensk-rodvin",
    title: "Bedste italiensk rødvin: Chianti, Barolo, Amarone og Primitivo",
    description:
      "Bedste italiensk rødvin: guide til sangiovese, nebbiolo, aglianico og primitivo. Fra hverdags-Chianti til Barolo og Amarone — pris og producenter.",
    tags: ["bedste", "italiensk", "rødvin", "sangiovese", "nebbiolo"],
    searchQ: "italiensk%20rødvin%20chianti%20barolo%20amarone%20primitivo",
    sections: [
      {
        h: "Italienske r\u00F8dvins-verdenen",
        body: "**Italien** producerer mere vin end noget andet land og har **den st\u00F8rste stilartsdiversitet**. Hovedgrupperingen er: **Piemonte** (nebbiolo i Barolo og Barbaresco, barbera, dolcetto), **Toscana** (sangiovese i Chianti Classico og Brunello), **Veneto** (Amarone, Valpolicella), **Apulien** (primitivo, negroamaro), **Sicilien** (nero d\u2019Avola, Etna rosso), og mange mindre regioner."
      },
      {
        h: "Top anbefalinger efter region",
        body: "**Piemonte:** **Barbera d\u2019Asti** (**150\u2013200 kr** \u2014 frisk syre, frugtigt), **Barolo** (**400\u20131000 kr** \u2014 kompleksitet og lagring). **Toscana:** **Chianti Classico** (**150\u2013250 kr**), **Chianti Classico Riserva** (**250\u2013400 kr**), **Brunello di Montalcino** (**500+ kr** \u2014 premium sangiovese). **Veneto:** **Valpolicella Classico Superiore** (**150\u2013250 kr**), **Amarone della Valpolicella** (**400+ kr**). **Apulien:** **Primitivo di Manduria** (**120\u2013180 kr**). **Sicilien:** **Etna Rosso** (**180\u2013300 kr**), **Nero d\u2019Avola** (**100\u2013180 kr**)."
      },
      {
        h: "Italienske vine til maden",
        body: "**Pasta med tomat og ragu:** Chianti Classico, Barbera, Montepulciano d\u2019Abruzzo. **Pizza:** samme \u2014 syren matcher tomat. **Steak fiorentina:** Brunello, Chianti Riserva, eller Barolo. **Bolognese og lasagne:** Chianti, primitivo eller nero d\u2019Avola. **Svamperetter og risotto:** nebbiolo (Barolo/Barbaresco) eller pinot nero fra Alto Adige. **Ost (parmesan, pecorino):** Chianti, Nero d\u2019Avola."
      },
      {
        h: "Prisniveauer for italiensk r\u00F8d",
        body: "**100\u2013150 kr:** solid hverdag \u2014 Chianti basic, Nero d\u2019Avola, Valpolicella basic. **150\u2013250 kr:** sweet spot \u2014 Chianti Classico, Barbera d\u2019Asti, primitivo. **250\u2013500 kr:** Riserva-niveau \u2014 Chianti Classico Riserva, Barbaresco, Brunello under-line. **500\u20131500 kr:** Barolo, Brunello, Amarone fra h\u00E6derlige producenter, moderne Super Tuscans. **1500+ kr:** premium \u00E5rgange af Barolo, Brunello og **Sassicaia/Tignanello**."
      },
      {
        h: "Producenter at l\u00E6re at kende",
        body: "**Toscana:** Fontodi, Felsina, Castello di Ama, Antinori (Tignanello, Sassicaia). **Piemonte:** Giacomo Conterno, Bartolo Mascarello, Giuseppe Rinaldi (Barolo), Gaja. **Veneto:** Quintarelli, Allegrini, Bertani (Amarone). **Apulien:** Gianfranco Fino (primitivo), Cantine San Marzano. **Sicilien:** Planeta, Tasca d\u2019Almerita, Passopisciaro (Etna)."
      },
      {
        h: "Hvad du skal undg\u00E5",
        body: "**\u201CChianti\u201D uden Classico-stempel i lav priskategori** \u2014 generisk Chianti DOCG er mindre reguleret. **Amarone under 200 kr** \u2014 prisen r\u00E6kker sj\u00E6ldent. **Ung Barolo uden luftning** \u2014 den skal **dekanteres** eller **gemmes**. **Mass-producerede \u201CSuper Tuscan\u201D** uden producent-navn. **Super billig primitivo** \u2014 ofte overmoden og syltet."
      },
      {
        h: "S\u00F8g flasker",
        body: "**[S\u00F8g italiensk r\u00F8d p\u00E5 Vinbot](/?q=italiensk%20r%C3%B8dvin%20chianti%20barolo)**."
      }
    ],
    links: [
      sa("bedste-rodvin", "bedste r\u00F8dvin"),
      sa("vinregion-italien", "vinregion Italien"),
      sa("sangiovese-druen", "sangiovese"),
      sa("nebbiolo-druen", "nebbiolo"),
      sa("vin-til-pizza-og-pasta", "vin til pizza og pasta"),
      sa("komplet-guide-til-vin-og-mad", "komplet guide til vin og mad")
    ]
  },
  {
    slug: "bedste-fransk-rodvin",
    title: "Bedste fransk rødvin: Bordeaux, Bourgogne, Rhône og Beaujolais",
    description:
      "Bedste fransk rødvin: klassiske appellationer fra Bordeaux, Bourgogne og Rhône. Guide til druer, cru-niveau og prisopdeling for franske terroir-vine.",
    tags: ["bedste", "fransk", "rødvin", "bordeaux", "bourgogne"],
    searchQ: "fransk%20rødvin%20bordeaux%20bourgogne%20rhone",
    sections: [
      {
        h: "Fransk r\u00F8dvins-landskab",
        body: "**Frankrig** er **klassisk-vin-hjemland** \u2014 hvorfra mange druer og stilarter er opst\u00E5et. De fire hovedzoner for r\u00F8dvin: **Bordeaux** (cabernet/merlot-blend), **Bourgogne** (pinot noir), **Rh\u00F4ne** (grenache-syrah-blend eller pure syrah), **Beaujolais** (gamay). Plus: **Sydfrankrig** (Languedoc, Provence), **Loire** (cabernet franc), **Alsace** (pinot noir)."
      },
      {
        h: "Bordeaux",
        body: "**Bordeaux** er **blends**: cabernet sauvignon dominant p\u00E5 venstre bred (Médoc, Haut-Médoc, Pauillac), merlot dominant p\u00E5 h\u00F8jre bred (Saint-Émilion, Pomerol). **Cru Bourgeois** (**200\u2013400 kr**) er rigtig v\u00E6rdi \u2014 klassisk struktur og moden frugt. **Classified growths** starter fra **400 kr** og g\u00E5r til **tusindvis**. **Saint-Émilion Grand Cru** (**350\u2013600 kr**) og **Pomerol** (**400+ kr**) er merlot-fokuseret og typisk blødere."
      },
      {
        h: "Bourgogne, Rh\u00F4ne og Beaujolais",
        body: "**Bourgogne rouge** (**250\u2013500 kr**): pinot noir, basic-niveau. **Premier cru Burgundy** (**500+ kr**): enkelt-mark pinot. **Grand cru** (**1000+ kr**): ekstravagant. **C\u00F4tes du Rh\u00F4ne** (**120\u2013180 kr**) og **C\u00F4tes du Rh\u00F4ne Villages** (**150\u2013250 kr**) \u2014 gode hverdag-rhone. **Ch\u00E2teauneuf-du-Pape** (**300\u2013600 kr**) \u2014 flagskibet, grenache-tung blend. **Beaujolais cru** (Morgon, Fleurie, Moulin-\u00E0-Vent, **130\u2013200 kr**) \u2014 terroir-pinot for gamay-pris."
      },
      {
        h: "Fransk r\u00F8d til maden",
        body: "**Steak og lam:** Bordeaux (cabernet-tung), Rh\u00F4ne (syrah), Cru Bourgeois. **And og fed fjerkr\u00E6:** Bourgogne pinot, cru Beaujolais. **Pasta og pizza:** C\u00F4tes du Rh\u00F4ne. **Coq au vin:** pinot noir (Bourgogne) naturligvis. **Jagt og vildt:** moden Bordeaux eller Ch\u00E2teauneuf-du-Pape. **Ost:** cru Beaujolais eller let Bordeaux."
      },
      {
        h: "Prisopdeling og strategi",
        body: "**Under 150 kr:** C\u00F4tes du Rh\u00F4ne og Beaujolais. **150\u2013300 kr:** Cru Beaujolais, C\u00F4tes du Rh\u00F4ne Villages, basic Bordeaux AOC. **300\u2013600 kr:** Cru Bourgeois, premier cru Beaujolais, basic Bourgogne Village. **600\u20131500 kr:** klassificerede Bordeaux, Ch\u00E2teauneuf-du-Pape, premier cru Bourgogne. **1500+ kr:** Grand cru Bourgogne og premium Bordeaux."
      },
      {
        h: "Hvad du skal undg\u00E5",
        body: "**Basic \u201CBordeaux\u201D AOC uden Chateau-navn** \u2014 kvaliteten varierer meget. **Billig \u201CBourgogne\u201D** \u2014 virkelig god pinot fra Bourgogne koster penge. **Champagne-fokus kun** \u2014 husk at Frankrig har mere end bobler. **Unge Bordeaux uden luftning** \u2014 kabinetterne skal **dekanteres** i unge \u00E5r."
      },
      {
        h: "S\u00F8g flasker",
        body: "**[S\u00F8g fransk r\u00F8d p\u00E5 Vinbot](/?q=fransk%20r%C3%B8dvin%20bordeaux%20bourgogne)**."
      }
    ],
    links: [
      sa("bedste-rodvin", "bedste r\u00F8dvin"),
      sa("vinregion-frankrig", "vinregion Frankrig"),
      sa("bedste-pinot-noir", "bedste pinot noir"),
      sa("pinot-noir-druen", "pinot noir"),
      sa("cabernet-sauvignon-druen", "cabernet sauvignon"),
      sa("komplet-guide-til-vin-og-mad", "komplet guide til vin og mad")
    ]
  },
  {
    slug: "bedste-spansk-rodvin",
    title: "Bedste spansk rødvin: Rioja, Ribera del Duero, Priorat og mere",
    description:
      "Bedste spansk rødvin: guide til tempranillo, garnacha og monastrell. Fra Rioja Crianza til Priorat og Ribera del Duero — producenter, pris og stil.",
    tags: ["bedste", "spansk", "rødvin", "tempranillo", "garnacha"],
    searchQ: "spansk%20rødvin%20rioja%20ribera%20priorat",
    sections: [
      {
        h: "Spanske r\u00F8dvins-regioner",
        body: "**Spanien** er **v\u00E6rdi-vinens** hjem. Hovedregionerne: **Rioja** (tempranillo), **Ribera del Duero** (tempranillo i tungere stil), **Priorat** (garnacha-blend, premium), **Ribera del Guadiana og Extremadura** (garnacha), **Navarra** (blend-central), **Bierzo** (menc\u00EDa), **Pened\u00E8s** (diverse), **Jumilla og Yecla** (monastrell)."
      },
      {
        h: "Rioja \u2014 den spanske klassiker",
        body: "**Rioja** har 4 lagringsniveauer: **Joven** (ung, minimalt fad), **Crianza** (mindst 2 \u00E5r, 1 \u00E5r p\u00E5 fad), **Reserva** (mindst 3 \u00E5r, 1 p\u00E5 fad), **Gran Reserva** (mindst 5 \u00E5r, 2 p\u00E5 fad). **Pris:** Crianza **120\u2013200 kr**, Reserva **200\u2013350 kr**, Gran Reserva **350\u2013600 kr**. **Producenter:** CVNE, La Rioja Alta, Lopez de Heredia (klassisk), Artadi (moderne), Remelluri, Roda, Muga."
      },
      {
        h: "Ribera, Priorat og nye zoner",
        body: "**Ribera del Duero:** Vega Sicilia (legendarisk), Pesquera, Cillar de Silos \u2014 tempranillo i **mere koncentreret** stil end Rioja. **300\u20132000 kr**. **Priorat:** Clos Mogador, \u00C1lvaro Palacios, Mas Martinet \u2014 garnacha-cari\u00F1ena-blends p\u00E5 skifer, premium. **Pris 300\u2013800 kr**. **Bierzo:** Descendientes de J. Palacios \u2014 menc\u00EDa-r\u00F8dvine med blomster og frugt, **150\u2013300 kr**. **Jumilla:** Monastrell kraftig og v\u00E6rdi-drykket, **80\u2013150 kr**."
      },
      {
        h: "Top anbefalinger efter pris",
        body: "**80\u2013130 kr:** Navarra tempranillo, ung Rioja, Jumilla monastrell \u2014 hverdag. **130\u2013200 kr:** Rioja Crianza, Ribera del Duero basic, cru Bierzo \u2014 sweet spot. **200\u2013400 kr:** Rioja Reserva, moderne Priorat, Ribera-cru \u2014 fest. **400+ kr:** Rioja Gran Reserva, Priorat premium, moden Vega Sicilia-niveau."
      },
      {
        h: "Spansk r\u00F8d til maden",
        body: "**Tapas:** Rioja Crianza eller let Navarra garnacha \u2014 klassisk. **Jam\u00F3n ib\u00E9rico:** Rioja Reserva eller ung Ribera del Duero. **Lam og grillet k\u00F8d:** Priorat eller Ribera del Duero. **Paella:** garnacha ros\u00E9 eller let Rioja. **Chorizo:** Monastrell fra Jumilla. **Manchego:** Rioja Reserva."
      },
      {
        h: "Hvad du skal undg\u00E5",
        body: "**\u201CSpansk blend\u201D uden region** \u2014 kvaliteten varierer. **\u201CCrianza\u201D under 80 kr** fra ukendte producenter \u2014 regelkravene betyder noget. **Meget ung Priorat** \u2014 den skal **luftes i timer** eller **dekanteres**. **Gran Reserva af tvivlsom \u00E5rgang** \u2014 \u00E6ldre Rioja bliver til tider tr\u00E6t. **\u201CWine in a box\u201D fra udvalgte m\u00E6rker** uden producent-historie."
      },
      {
        h: "S\u00F8g flasker",
        body: "**[S\u00F8g spansk r\u00F8d p\u00E5 Vinbot](/?q=spansk%20r%C3%B8dvin%20rioja%20ribera)**."
      }
    ],
    links: [
      sa("bedste-rodvin", "bedste r\u00F8dvin"),
      sa("vinregion-spanien", "vinregion Spanien"),
      sa("tempranillo-druen", "tempranillo"),
      sa("vin-til-tapas", "vin til tapas"),
      sa("vin-til-paella", "vin til paella"),
      sa("komplet-guide-til-vin-og-mad", "komplet guide til vin og mad")
    ]
  },

  // ========== DRUE (2) ==========
  {
    slug: "bedste-pinot-noir",
    title: "Bedste pinot noir: Bourgogne, New Zealand og Oregon",
    description:
      "Bedste pinot noir: Bourgogne basic til grand cru, New Zealand Central Otago og Oregon Willamette. Guide til stil, pris og hvornår pinot er værd det.",
    tags: ["bedste", "pinot noir", "drue", "bourgogne"],
    searchQ: "pinot%20noir%20bourgogne%20new%20zealand%20oregon",
    sections: [
      {
        h: "Pinot noir er k\u00F8lig-klima-druen",
        body: "**Pinot noir** trives i **k\u00F8lige klimaer** \u2014 derfor Bourgogne, New Zealand Central Otago, Oregon Willamette, Sonoma Coast og tyske Pfalz og Baden. Den er **tynd-skindet**, hvilket betyder **lysere farve**, **l\u00E6ngere tekstur** og **mindre tannin** end de fleste andre r\u00F8dvins-druer. Det er ogs\u00E5 en **sv\u00E6r drue at lave god billig** \u2014 kvalitet koster."
      },
      {
        h: "Bourgogne \u2014 hjemlandet",
        body: "**Bourgogne rouge** (**180\u2013300 kr**): basic-niveau. **Village-wines** som Gevrey-Chambertin, Nuits-Saint-Georges, Chambolle-Musigny (**300\u2013600 kr**): karakterfuld pinot fra specifikke landsbyer. **Premier cru** (**500\u20131500 kr**): enkelt-mark niveau. **Grand cru** (**1500\u20139999+ kr**): top af verdenen \u2014 Romanée-Conti, Chambertin, Musigny. For v\u00E6rdi: pr\u00F8v **Savigny-l\u00E8s-Beaune**, **Santenay**, **Mercurey** i C\u00F4te Chalonnaise."
      },
      {
        h: "Verdens pinot noir",
        body: "**New Zealand:** Central Otago (de bedste: Felton Road, Rippon, Mount Difficulty), Martinborough, Marlborough \u2014 **200\u2013450 kr**. Stil: frisk, r\u00F8dfrugt, tydelige urter. **Oregon:** Willamette Valley (Ken Wright, Beaux Fr\u00E8res, Bergstr\u00F6m) \u2014 **300\u2013600 kr**. **Sonoma Coast og Russian River Valley:** kølig Californien-pinot, **350\u2013700 kr**. **Tyskland:** Pfalz og Baden producerer sofistikeret pinot noir under etikette **Sp\u00E4tburgunder**, **250\u2013500 kr**. **Chile:** Casablanca Valley \u2014 **150\u2013250 kr**, v\u00E6rdi-niveau."
      },
      {
        h: "Pinot noir til maden",
        body: "**Fjerkr\u00E6 (and, g\u00E5s, kalkun):** klassisk Bourgogne-match. **Svampe og jordskokker:** village-Bourgogne eller Willamette. **Laks og tun:** let pinot noir k\u00F8lt. **Sv\u00F8mme og k\u00F8d:** pinot fra k\u00F8ligere klimaer, Central Otago. **Frokost og hverdag:** basic Bourgogne rouge eller chilensk. **Kinesisk peking-and:** klassisk Bourgogne eller pinot."
      },
      {
        h: "Prisstrategi og value-zones",
        body: "**150\u2013250 kr:** chilensk (Casablanca), tysk Sp\u00E4tburgunder, Oregon-basic. **250\u2013400 kr:** New Zealand Central Otago, Willamette AVA, Bourgogne rouge kvalitet-producent. **400\u2013700 kr:** village-Bourgogne, premier cru single-vineyard Oregon. **700\u20131500 kr:** premier cru Bourgogne, top Central Otago. **1500+ kr:** grand cru Bourgogne, \u00E6ldre \u00E5rgange."
      },
      {
        h: "Hvad du skal undg\u00E5",
        body: "**Meget billig \u201Cpinot noir\u201D** under 100 kr \u2014 druen er for dyr at producere ordentligt i den prisklasse. **Pinot fra varme zoner** (Sydaustralien, meget varm Californien) \u2014 den mister sin delikatesse. **Overmoden, fad-tung pinot** \u2014 det er en modning, ikke **rigtig** pinot-karakter. **Ung Bourgogne uden luftning** \u2014 den har brug for 30 minutter i karaffe."
      },
      {
        h: "S\u00F8g flasker",
        body: "**[S\u00F8g pinot noir p\u00E5 Vinbot](/?q=pinot%20noir%20bourgogne)**."
      }
    ],
    links: [
      sa("bedste-rodvin", "bedste r\u00F8dvin"),
      sa("bedste-fransk-rodvin", "fransk r\u00F8dvin"),
      sa("pinot-noir-druen", "pinot noir-druen"),
      sa("vin-til-and", "vin til and"),
      sa("vinregion-australien-new-zealand", "New Zealand"),
      sa("komplet-guide-til-vin-og-mad", "komplet guide til vin og mad")
    ]
  },
  {
    slug: "bedste-chardonnay",
    title: "Bedste chardonnay: Chablis, Meursault og nye verden",
    description:
      "Bedste chardonnay: fra stål-Chablis til smørrig Meursault og frisk nye verden. Guide til stil, fad-niveau og pris for verdens mest alsidige hvide drue.",
    tags: ["bedste", "chardonnay", "drue", "chablis"],
    searchQ: "chardonnay%20chablis%20meursault%20burgundy",
    sections: [
      {
        h: "Chardonnay er alsidighedens drue",
        body: "**Chardonnay** er **verdens mest dyrkede hvide drue** \u2014 fra k\u00F8lig Chablis til varm Californien. Smag varierer enormt: **stenet mineralsk** (k\u00F8lig, uden fad), **cremet smørrig** (moderat klima, med fad), **rigt tropiskfrugt** (varmt klima, fad-tungt). L\u00E6r **stilarterne** \u2014 det hj\u00E6lper dig med at v\u00E6lge fra landets verdensniveau."
      },
      {
        h: "Chablis \u2014 stenet-chardonnay",
        body: "**Chablis** er chardonnay uden fad (eller med meget moderate tranch\u00E9er) i k\u00F8lig klima. **Petit Chablis** (**100\u2013130 kr**): basis, lys og frisk. **Chablis AOC** (**130\u2013200 kr**): sweet spot. **Chablis premier cru** (**200\u2013350 kr**): enkelt-mark, mere kompleksitet. **Chablis grand cru** (**400\u20131000 kr**): top-niveau. **Producenter:** Raveneau, Dauvissat (klassiske), Billaud, Long-Depaquit, William F\u00E8vre."
      },
      {
        h: "Bourgogne-chardonnay",
        body: "**C\u00F4te de Beaune** er hjemlandet for **smørrige**, **mineralske chardonnays**. **Meursault** (**400\u20131000 kr**): klassisk. **Puligny-Montrachet** og **Chassagne-Montrachet** (**500\u20131500 kr**): premier niveau. **M\u00E2con-villages** (**150\u2013250 kr**) og **Pouilly-Fuiss\u00E9** (**250\u2013450 kr**): v\u00E6rdi-niveau fra sydlige Bourgogne. **Saint-V\u00E9ran** er en skjult perle."
      },
      {
        h: "Nye verden chardonnay",
        body: "**Californien Sonoma Coast:** cool-climate chardonnay, **250\u2013600 kr** \u2014 frisk, cremet, moderat fad. **Oregon Willamette:** stilmageri med fin syre, **200\u2013450 kr**. **New Zealand Marlborough og Hawke\u2019s Bay:** **200\u2013400 kr**. **Sydafrika Elgin og Hemel-en-Aarde:** voksende kvalitetszoner, **250\u2013500 kr**. **Chile Casablanca Valley:** \u00E8rd-prisdygtig, **150\u2013300 kr**."
      },
      {
        h: "Chardonnay til maden",
        body: "**Chablis:** \u00F8sters, skaldyr, grillet fisk, kyllingeretter med citron. **Meursault:** hummer, k\u00E6rnem\u00E6lk-s\u00F8vs, kylling med fl\u00F8de, mushroom-retter. **Oak-heavy Californien:** kraftig kylling, lobster, rich pasta. **Ikke-fadet nye verden:** laks, pork-tenderloin, thai med kokos. **Ostepasta og cremet sauce:** fad-chardonnay matcher tekstur."
      },
      {
        h: "Hvad du skal undg\u00E5",
        body: "**Billig fad-tung chardonnay** \u2014 vanilje og sav\u00E6rks f\u00F8lelse uden frugt er kategoriens kliche. **Over-oaked Californien** der har **mere fad end frugt**. **Meget gammel Chardonnay** uden god lagring \u2014 den bliver kedelig. **Generic \u201Cwhite Burgundy\u201D uden appellation** \u2014 kvaliteten varierer."
      },
      {
        h: "S\u00F8g flasker",
        body: "**[S\u00F8g chardonnay p\u00E5 Vinbot](/?q=chardonnay%20chablis%20meursault)**."
      }
    ],
    links: [
      sa("bedste-hvidvin", "bedste hvidvin"),
      sa("bedste-hvidvin-under-150-kr", "hvidvin under 150 kr"),
      sa("chardonnay-druen", "chardonnay-druen"),
      sa("bedste-fransk-rodvin", "fransk vin"),
      sa("vin-til-fisk-og-skaldyr", "vin til fisk og skaldyr"),
      sa("komplet-guide-til-vin-og-mad", "komplet guide til vin og mad")
    ]
  },
];

// Tilf\u00F8j bedste-sommer-vin bonus til lejligheder-sektionen (29. side skjult).
// Scriptet har 28 sider \u2014 ingen bonus.

function renderMdx(p) {
  const body = p.sections.map((s) => `## ${s.h}\n\n${s.body}`).join("\n\n");
  const klyngeLinks = klynge(p.links);
  const tags = JSON.stringify(p.tags);

  return `---\ntitle: "${p.title.replace(/"/g, "\\\"")}"\ndescription: "${p.description.replace(/"/g, "\\\"")}"\nslug: ${p.slug}\ntags: ${tags}\nupdated: "${UPDATED}"\nhub: ${HUB}\n---\n\n${body}\n\n## L\u00E6s mere i klyngen\n\n${klyngeLinks}\n`;
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
