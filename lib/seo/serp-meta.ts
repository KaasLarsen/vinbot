/** Maks. tegn Google typisk viser i SERP-snippet (dansk). */
export const SERP_DESCRIPTION_MAX = 155;

/** Primær titel i SERP inkl. «| Vinbot» (~10 tegn). */
export const SERP_TITLE_BUDGET = 52;

const GENERIC_BEDSTE_DESC =
  /Bedste .+ under \d+ kr:\s*hvor finder du reel kvalitet,\s*hvilke producenter er sikre valg og hvad du skal undgå/i;

/**
 * Målrettet SERP for GSC-top med høj eksponering og lav CTR (maj 2026).
 * Fuldt H1 på siden ændres ikke — kun metadata.
 */
const GUIDE_SERP_OVERRIDES: Record<string, { title?: string; description?: string }> = {
  "hvor-mange-enheder-alkohol-i-et-glas-vin": {
    title: "Hvor mange ml i et glas vin? Enheder",
    description:
      "125 ml rødvin (13 %) ≈ 1,5 genstande. 1 genstand = 12 g alkohol. Tabel for ml, cl, hvidvin og hel flaske — dansk beregning til promille og sundhed.",
  },
  "hvor-meget-fylder-en-flaske-vin": {
    title: "Hvor meget fylder en flaske vin? (75 cl)",
    description:
      "Standardflaske = 750 ml (75 cl). Piccolo, magnum og jeroboam i tabel. Hvor mange glas per flaske — og hvornår størrelsen giver bedre smag.",
  },
  "hvor-laenge-holder-boks-vin": {
    title: "Hvor længe holder papvin uåbnet og åben?",
    description:
      "Bag-in-box holder 4–6 uger åben i køleskab. Uåbnet papvin typisk 6–12 mdr. Tabel, opbevaring og hvornår boks-vin smager bedst.",
  },
  "hvor-laenge-holder-uaabnet-vin": {
    title: "Hvor længe holder uåbnet vin?",
    description:
      "Uåbnet hverdagsvin: drik inden for 1–5 år. Lagringsvine 10–50+ år. Tabel for rød, hvid, rosé og bobler — og hvornår flasken er for gammel.",
  },
  "hvor-laenge-holder-aabnet-vin": {
    title: "Hvor længe holder åbnet vin i køleskab?",
    description:
      "Åbnet rødvin 3–5 dage, hvidvin 3–7 dage, bobler 1–3 dage. Vakuum, køl og genlukning forlænger. Tabel pr. vintype og hvornår du skal smide den.",
  },
  "hvor-meget-alkohol-i-vin": {
    title: "Hvor meget alkohol er der i vin? (%)",
    description:
      "Vin er typisk 11–15 % alkohol. Hvidvin 10–13 %, rødvin 12–15 %, port 19–22 %. Tabel pr. vintype og hvad ABV betyder på etiketten.",
  },
  "opbevaring-af-vin-temperatur-og-aabnet-flaske": {
    title: "Rødvin temperatur i °C — komplet tabel",
    description:
      "Rødvin 14–18 °C, hvidvin 8–12 °C, bobler 6–8 °C. Vintemperatur-guide med tabeller for rosé, riesling og port. Opbevaring af åbnet vin.",
  },
  "bedste-alkoholfri-hvidvin": {
    title: "Alkoholfri hvidvin bedst i test 2026",
    description:
      "God alkoholfri hvidvin: Leitz, Giesen og sauvignon med bid — ikke saft. Bedst i test i DK, ca. 80–160 kr. Til sushi, salat og fisk. Server 8–10 °C.",
  },
  "bedste-alkoholfri-bobler": {
    title: "Alkoholfri bobler bedst i test 2026",
    description:
      "Bedste alkoholfri bobler og champagne: Noughty, Leitz, French Bloom. God alkoholfri mousserende til nytår, brunch og fest — server 6–8 °C.",
  },
  "bedste-alkoholfri-rose": {
    title: "Alkoholfri rosévin bedst i test 2026",
    description:
      "God alkoholfri rosé: Leitz, Torres og Noughty til terrasse, grill og tapas. Alkoholfri rosévin bedst i test i Danmark — server velafkølet.",
  },
  "bedste-alkoholfri-rodvin": {
    title: "Alkoholfri rødvin bedst i test 2026",
    description:
      "Bedste alkoholfri rødvin: Leitz pinot og Torres til pizza og grill. God alkoholfri rød er svær — hvornår rosé eller bobler er bedre valg i DK.",
  },
  "vin-til-ost-og-ostebord": {
    title: "Vin til ostebord: port, sherry og bobler",
    description:
      "Vin til ost: bobler til milde oste, sherry til lagrede, port til blåskimmel. Dansk osteboard-guide med syre, fad og serveringstemperatur.",
  },
  "vin-til-laks": {
    title: "Vin til laks og grillet laks",
    description:
      "Bedste vin til laks: tør riesling, chardonnay med syre og let rosé. Røget, grill, dild og sauce — konkrete flasketyper du kan købe i DK.",
  },
  "vin-til-kylling-og-lyst-koed": {
    title: "Vin til kylling: hvid, rosé og let rød",
    description:
      "Vin til kylling efter sauce: chardonnay til fløde, pinot til grill, riesling til karry. Kylling, kalkun og kalv — flasker der passer i danske butikker.",
  },
  "vin-til-sushi": {
    title: "Vin til sushi: riesling, bobler og grüner",
    description:
      "Bedste vin til sushi og sashimi: tør riesling, muscadet, champagne og grüner veltliner. Syre, temperatur og parring til nigiri og maki.",
  },

  // Bølge 2 — GSC lav CTR (jun 2026)
  "bedste-alkoholfri-vin": {
    title: "Alkoholfri vin bedst i test 2026",
    description:
      "Sammenligning: Leitz, French Bloom, Giesen, Torres og Noughty. Top 10 alkoholfri bobler, hvid, rosé og rød med pris og madparring — dansk guide.",
  },
  "bedste-alkoholfri-champagne": {
    title: "Bedste alkoholfri champagne (0 %)",
    description:
      "God alkoholfri champagne: French Bloom, Noughty, Leitz og Oddbird. Premium 0 % mousserende til nytår og kransekage — fest uden promille.",
  },
  "alkoholsvag-og-alkoholfri-vin": {
    title: "Alkoholsvag og alkoholfri vin — forskellen",
    description:
      "Alkoholfri (0,5 %) vs. lavalkohol (5–11 %): de-alkoholiseret, most og vinho verde. Hvad smagen kan, og hvordan du parrer med mad.",
  },
  "vin-til-boeff": {
    title: "Vin til bøf: cabernet, malbec og syrah",
    description:
      "Hvilken vin til bøf? Cabernet og malbec til steg og grill, pinot til tyndt kød. Bearnaise, rødvinssauce og sauce på tallerkenen — konkret guide.",
  },
  "vin-til-oksefilet": {
    title: "Vin til oksefilet: pinot og Chianti",
    description:
      "Vin til oksefilet og mørbrad: pinot noir, Chianti og Rioja til magert kød. Sauce, grill og temperatur — uden at overdøve filetten.",
  },
  "vin-til-peberboef": {
    title: "Vin til peberbøf: syrah og malbec",
    description:
      "Vin til peberbøf og peppersauce: syrah, malbec og frugtig rød. Cognac, fløde og peber — flasker der står saucen.",
  },
  "vin-til-pulled-pork": {
    title: "Vin til pulled pork: BBQ og røg",
    description:
      "Vin til pulled pork: zinfandel, primitivo og malbec til BBQ-sauce og røg. Hvid og rosé når menuen er mild — dansk guide.",
  },
  "vin-til-butter-chicken": {
    title: "Vin til butter chicken og karry",
    description:
      "Vin til butter chicken, kylling curry og boller i karry: riesling, gewürztraminer og rosé. Chili, fløde og tomat forklaret.",
  },
  "vin-til-gazpacho": {
    title: "Vin til gazpacho: rosé og albariño",
    description:
      "Vin til gazpacho: tør rosé, albariño og manzanilla til kold tomat. Sommer, tapas og hvad der skærer med eddike og hvidløg.",
  },
  "vin-til-dyreryg": {
    title: "Vin til dyreryg: pinot og Beaujolais",
    description:
      "Vin til dyreryg: pinot noir, cru Beaujolais og nebbiolo til magert vildt. Sauce, bær og temperatur — uden at overdøve kødet.",
  },
  "vin-til-kalvemoerbrad": {
    title: "Vin til kalvemørbrad: pinot og chardonnay",
    description:
      "Vin til kalvemørbrad: pinot noir, Beaujolais og fad-chardonnay. Fløde, svampe og citronsauce — elegant gæstemiddag.",
  },
  "vin-til-svinemoerbrad": {
    title: "Vin til svinemørbrad: pinot og riesling",
    description:
      "Vin til svinemørbrad og svinefilet: pinot, Beaujolais og riesling. Fløde, æble og sennep — hvad der skærer forklaret.",
  },
  "vin-til-ribeye": {
    title: "Vin til ribeye: malbec og cabernet",
    description:
      "Vin til ribeye og entrecôte: malbec, cabernet og syrah til fedt og skorpe. Grill vs. pande — forskellen fra oksefilet.",
  },
  "vin-til-roastbeef": {
    title: "Vin til roastbeef: kold og varm",
    description:
      "Vin til roastbeef: Beaujolais og pinot til koldt smørrebrød, malbec/cabernet til varm stege. Peberrod og remoulade.",
  },
  "vin-til-boef-stroganoff": {
    title: "Vin til bøf stroganoff: pinot og fløde",
    description:
      "Vin til bøf stroganoff: pinot, Beaujolais og chardonnay til fløde og svampe. Undgå tung tannin — dansk flaskeguide.",
  },
  "vin-til-bearnaise": {
    title: "Vin til bearnaise: chardonnay og Bordeaux",
    description:
      "Vin til bearnaise: fad-chardonnay eller struktureret rød. Estragon, smør og syre — hvad der skærer med saucen.",
  },
  "vin-til-chokolademousse": {
    title: "Vin til chokolademousse: port og banyuls",
    description:
      "Vin til chokolademousse: port, banyuls og sød riesling. Match sødme til kakao — ellers smager vinen sur.",
  },
  "vin-til-tunboef": {
    title: "Vin til tunbøf: pinot og Beaujolais",
    description:
      "Vin til tunbøf: pinot noir, Beaujolais og let syrah. Grill, sesame og soya — undgå tung cabernet.",
  },
  "vin-til-stjerneskud": {
    title: "Vin til stjerneskud: riesling og cava",
    description:
      "Vin til stjerneskud: riesling, albariño og cava til fisk, rejer og remoulade. Dansk smørrebrød-klassiker.",
  },
  "vin-til-krydret-og-staerk-mad": {
    title: "Vin til krydret mad og asiatisk",
    description:
      "Vin til thai, indisk og stærk mad: tør riesling, gewürztraminer og lavalkohol-bobler. Syre og mild sødme slår tung tannin når chili dominerer.",
  },
  "vin-til-dessert-og-kransekage": {
    title: "Vin til kransekage og dessert",
    description:
      "Bobler til kransekage: demi-sec, moscato og sød riesling. Vin til dessert skal matche kagens sødme — ellers smager glasset surt.",
  },
  "hvor-meget-vin-til-bryllup": {
    title: "Hvor meget vin til bryllup? Flasker per gæst",
    description:
      "1 flaske vin per drikkende gæst + bobler til skål. Beregning til 50, 100 og 150 gæster — fordeling af rød, hvid og rosé.",
  },
  "vivino-app-til-vin-anmeldelser": {
    title: "Vivino-app: ratings og priser i DK",
    description:
      "Sådan bruger du Vivino smart: hvad ratings kan og ikke kan, og hvordan du tjekker pris i supermarkedet. Vinbot supplerer med madparring og guides.",
  },
  "hvor-mange-kalorier-i-vin": {
    title: "Hvor mange kalorier i et glas vin?",
    description:
      "Ca. 80–120 kcal per glas (12,5 cl) og 600–700 per flaske. Tabel for rødvin, hvidvin, bobler og sød vin — plus alkoholfri alternativ.",
  },
  "bedste-hvidvin-under-200-kr": {
    title: "Bedste hvidvin under 200 kr i Danmark",
    description:
      "Fransk og italiensk hvidvin under 200 kr: Chablis-entry, Loire og Alto Adige. Regioner, producenter og flasker der slår supermarkedets blend-navne.",
  },
  "bedste-fransk-rodvin": {
    title: "Bedste fransk rødvin til hverdag",
    description:
      "Fransk rødvin under budget: Côtes du Rhône, Languedoc og Bordeaux entry. Regioner, stilarter og flasker du finder i danske butikker nu.",
  },
  "vin-til-burger": {
    title: "Vin til burger: zinfandel, syrah og rosé",
    description:
      "Vin til burger med cheddar, bacon og BBQ: syre mod fedme, kraftig rød eller frisk rosé. Okse, ost og vegetar-bøf — flasker til hverdag.",
  },
  "vin-til-smorrebrod": {
    title: "Vin til smørrebrød: sild, lever og roastbeef",
    description:
      "Vin til dansk smørrebrød: bobler og syre til sild og fisk, let rød til kød og paté. Uden at overdøve remoulade og salt pålæg.",
  },
  "rodvin-til-pizza": {
    title: "Rødvin til pizza: sangiovese og barbera",
    description:
      "Bedste rødvin til pizza: sangiovese, barbera og montepulciano til margherita, pepperoni og salami. Italiensk match med syre og lav tannin.",
  },
  "hvor-laenge-holder-hvidvin": {
    title: "Hvor længe holder hvidvin åbnet?",
    description:
      "Åbnet hvidvin holder 3–7 dage på køl. Uåbnet hverdags-hvid 1–3 år. Tabel, vakuum og hvornår du skal drikke flasken før den falder.",
  },
  "bobler-til-brunch": {
    title: "Bobler til brunch: mimosa og spritz",
    description:
      "Hvilken boble til brunch? Prosecco, cava og crémant til æg, laks og morgenretter. Mimosa, temperatur og praktiske mængder per gæst.",
  },
  "vin-til-georgisk-mad": {
    title: "Vin til georgisk mad og khachapuri",
    description:
      "Vin til georgisk mad: amber wine, orange vin og kraftig hvid til khachapuri og grill. Lav tannin-rød til krydret kød og saucer.",
  },

  // Bølge 3 — GSC lav CTR (jun 2026)
  "vin-til-stegt-flaesk": {
    title: "Vin til stegt flæsk og persillesovs",
    description:
      "Bedste vin til stegt flæsk: grüner, riesling og gamay mod salt og fedme. Syre til persillesovs — undgå unge tanniner til brun sovs.",
  },
  "vin-til-tarteletter": {
    title: "Vin til tarteletter med kylling",
    description:
      "Hvilken vin til tarteletter? Chardonnay, aligoté og bobler til kylling i asparges og cremet fyld. Syre til sauce og butterdej.",
  },
  "bedste-hvidvin": {
    title: "Bedste hvidvin: sauvignon, chardonnay, riesling",
    description:
      "Bedste hvidvin i DK: frisk sauvignon, chardonnay og riesling med prisguide. Druesorter, regioner og madparring — fra hverdag til fest.",
  },
  "bedste-rosevin": {
    title: "Bedste rosévin: Provence, rosado og bobler",
    description:
      "Bedste rosévin til sommer: tør Provence-stil, spansk rosado og mousserende rosé. Prisguide, servering og madparring på dansk.",
  },
  "bedste-hvidvin-under-75-kr": {
    title: "Bedste hvidvin under 75 kr",
    description:
      "Hvidvin under 75 kr der smager: Verdejo, grüner og Muscadet fra rigtige regioner — ikke vandig supermarkeds-bulk. Tilbud og faldgruber.",
  },
  "bedste-rosevin-under-200-kr": {
    title: "Bedste rosévin under 200 kr",
    description:
      "Premium rosé under 200 kr: Provence, Tavel og Bandol med karakter. Enkelt-producenter og gastronomisk rosé — ikke bare lyserød saft.",
  },
  "bedste-rodvin-under-200-kr": {
    title: "Bedste rødvin under 200 kr",
    description:
      "Rødvin under 200 kr med identitet: Rioja Reserva, Chianti Classico og Rhône Villages. Moden frugt og struktur — ikke smarte blend-navne.",
  },
  "vin-til-fars-dag": {
    title: "Vin til fars dag 5. juni: grill og bøf",
    description:
      "Vin til fars dag: cabernet og malbec til grill og bøf, pinot til kylling. Gaveidéer og menu-match til dansk fars-dag-middag.",
  },
  "bedste-box-vin": {
    title: "Bedste box-vin og papvin i Danmark",
    description:
      "Bedste bag-in-box: kvalitets-papvin til hverdag og fest. Holdbarhed, pris per glas og producenter der slår billig bulk-boks.",
  },
  "bedste-champagne-under-300-kr": {
    title: "Bedste champagne under 300 kr",
    description:
      "Champagne under 300 kr: entry fra mindre huse og grower-champagne. Hvad du får for pengene — og hvornår cava eller crémant er smartere.",
  },
  "vin-til-nytaar-og-nytaarsmenu": {
    title: "Vin til nytår og nytårsmenu",
    description:
      "Vin til nytår: bobler til skål, hvid til fisk og rød til hovedret. Kransekage, tapas og menu-match — plus alkoholfri alternativ.",
  },
  "bedste-rodvin-under-75-kr": {
    title: "Bedste rødvin under 75 kr",
    description:
      "Rødvin under 75 kr til hverdag: Rhône Villages, Chile-entry og spansk blend med moden frugt. Regioner og flasker der holder i glasset.",
  },

  // Bølge 4 — GSC lav CTR + mad/bedste-hubs (jun 2026)
  "vin-til-graesk-mad": {
    title: "Vin til græsk mad: moussaka, meze og grill",
    description:
      "Hvilken vin til græsk mad? Assyrtiko til fisk, rosé til meze, agiorgitiko til moussaka. Souvlaki, tzatziki og horiatiki — konkrete flasketyper.",
  },
  "vin-til-fisk-og-skaldyr": {
    title: "Vin til fisk og skaldyr",
    description:
      "Hvilken vin til fisk? Tør hvidvin, bobler og let rosé til laks, tun og hummer. Syre, mineralitet og serveringstemperatur — med konkrete flasker.",
  },
  "vin-til-grill-og-bbq": {
    title: "Vin til grill og BBQ",
    description:
      "Vin til grill: syrah, malbec og afkølet gamay til kød, spareribs og burger. Kraftig rød eller rosé — match fedme og røg fra grillen.",
  },
  "vin-til-asiatisk-mad": {
    title: "Vin til asiatisk mad: riesling og gewürz",
    description:
      "Vin til asiatisk mad og takeaway: tør riesling, gewürztraminer og bobler til wok, sushi og karry. Syre slår tung tannin når soja og chili dominerer.",
  },
  "bedste-rodvin": {
    title: "Bedste rødvin: pinot, malbec og cabernet",
    description:
      "Bedste rødvin til din smag og budget: sangiovese, pinot noir, malbec og syrah. Druesorter, regioner og madparring — fra hverdag til gæster.",
  },
  "bedste-bobler": {
    title: "Bedste bobler: champagne, cava og crémant",
    description:
      "Bedste bobler efter pris og stil: cava, crémant, prosecco og champagne. Brut, extra dry og rosé — til fest, brunch og mad.",
  },
  "bedste-sommervin": {
    title: "Bedste sommervin: rosé og frisk hvid",
    description:
      "Bedste sommervin til terrasse: Provence-rosé, sauvignon og afkølet rød. Top-liste med pris, regioner og servering til varme aftener.",
  },
  "rosevin-til-mad-og-sommer": {
    title: "Rosévin til mad og sommer",
    description:
      "Rosé til grill, salat og tapas: tør Provence-stil og spansk rosado. Servering, temperatur og madparring — dansk sommerguide.",
  },
  "bedste-champagne-under-500-kr": {
    title: "Bedste champagne under 500 kr",
    description:
      "Champagne under 500 kr: NV fra etablerede huse og seriøs årgang-entry. Hvad du får for pengene — og hvornår crémant er smartere.",
  },
  "bedste-cava-under-150-kr": {
    title: "Bedste cava under 150 kr",
    description:
      "Cava under 150 kr: reserva og long lees aging med mere fad og brød. Spansk mousserende til fest og mad — bedre end billig prosecco.",
  },
  "bobler-champagne-cava-prosecco-og-cremant": {
    title: "Bobler: champagne, cava og prosecco",
    description:
      "Forskellen på champagne, cava, prosecco og crémant. Stil, pris og madparring — så du vælger den rigtige boble til fest og hverdag.",
  },
  "afkoelt-roedvin": {
    title: "Afkølet rødvin: gamay og pinot køligt",
    description:
      "Afkølet rødvin smager bedre om sommeren: gamay, pinot og let grenache ved 12–14 °C. Hvilke rødvine du skal køle — og hvilke du ikke skal.",
  },
  "vin-til-sommer": {
    title: "Vin til sommer: terrasse, grill og strand",
    description:
      "Sommervin i Danmark: rosé, frisk hvid og afkølet rød til grill, picnic og bål. Temperatur, alkohol i varmen og konkrete flasketyper du kan købe nu.",
  },
  "vin-til-piknik": {
    title: "Vin til piknik: rosé, cava og skruelåg",
    description:
      "Vin til piknik og udendørs: tør rosé, grüner og cava i køletaske. Sandwich, ost, temperatur og transport — undgå tunge røde i solen.",
  },
  "vin-til-haveselskab": {
    title: "Vin til haveselskab: rosé og bobler",
    description:
      "Vin til haveselskab: 40 % rosé, 40 % hvid, 20 % bobler. Mængde per gæst, iskøler og madmatch til grill, tapas og kage i sommerhaven.",
  },
  "vin-til-julemad-den-store-guide": {
    title: "Vin til julemad: and, flæsk og risalamande",
    description:
      "Vin til julemad: rød til and og flæskesteg, hvid til fisk, bobler til velkomst. Komplet guide til julefrokost og juleaften i Danmark.",
  },
  "komplet-guide-til-vin-og-mad": {
    title: "Vin og mad: komplet parringsguide",
    description:
      "Den store danske guide til vin og mad: rød og hvid til kød, fisk, ost og grønt. Temperatur, syre, tanniner og praktiske regler der virker.",
  },
  "kan-vin-blive-daarlig": {
    title: "Kan vin blive dårlig? Tegn og holdbarhed",
    description:
      "Kan vin blive sur? Ja — efter åbning, varme eller korkfejl. Sådan spotter du oxideret, korket og gammel vin — og hvornår den stadig kan drikkes.",
  },
  "hvor-laenge-holder-rodvin": {
    title: "Hvor længe holder rødvin åbnet?",
    description:
      "Åbnet rødvin holder 3–5 dage på køl. Uåbnet hverdags-rød 2–5 år. Tabel, vakuum og hvornår du skal drikke flasken før den falder.",
  },
  "bedste-vin-til-gave": {
    title: "Bedste vin til gave",
    description:
      "Vin til gave: bobler til fest, seriøs rød til kødelskeren, hvid til fisk. Budget, personlighed og hvornår magnum eller årgang giver mening.",
  },
  "vin-til-brunch": {
    title: "Vin til brunch: bobler og frisk hvid",
    description:
      "Vin til brunch: prosecco, crémant og let hvid til æg, laks og avokado. Mimosa, temperatur og mængder — plus alkoholfri alternativ.",
  },
  "hvor-meget-vin-til-fest": {
    title: "Hvor meget vin til fest per gæst?",
    description:
      "Regn med ½–1 flaske vin per voksen til middag og fest. Fordeling af rød, hvid og bobler — og hvornår du skal have ekstra til skål.",
  },
  "hvor-laenge-kan-vin-lagres": {
    title: "Hvor længe kan vin lagres?",
    description:
      "Hverdagsvin drikkes inden for få år. Lagringsvine 10–50+ år i køl, mørkt og liggende. Tabel pr. stil — og hvornår flasken er klar nu.",
  },
  "vin-til-julefrokost": {
    title: "Vin til julefrokost: flæsk, fisk og risalamande",
    description:
      "Vin til dansk julefrokost: bobler til start, hvid til fisk, rød til flæskesteg og medister. Mængde per gæst og klassiske flasketyper.",
  },

  // Bølge 5 — GSC vinbot-15 (jul 2026): lav CTR, brand og striking distance
  "vin-til-pizza": {
    title: "Vin til pizza: sangiovese, barbera og bobler",
    description:
      "Hvilken vin til pizza? Sangiovese og barbera til margherita og pepperoni, bobler til fredag. Syre til tomat og saft til ost — dansk parringsguide.",
  },
  "vin-til-oksekoed": {
    title: "Vin til oksekød: cabernet, malbec og syrah",
    description:
      "Hvilken vin til oksekød? Cabernet og malbec til steg og grill, pinot til tyndt kød. Okse, entrecôte og simreret — konkrete flasketyper i DK.",
  },
  "vin-til-kalkun": {
    title: "Vin til kalkun: hvid, rosé og let rød",
    description:
      "Vin til kalkunsteg og julemad: chardonnay, pinot noir og bobler til hvidt kød. Syre til sauce og urter — servering og flasker du finder i butikken.",
  },
  "hvad-er-fadlagring": {
    title: "Hvad er fadlagring af vin?",
    description:
      "Fadlagring giver vanilje, krydderi og blødere tannin fra egetræsfade. Hvor længe, hvilke vine og smagsforskellen på fad vs. ståltank — kort forklaret.",
  },
  "vin-til-tatar-og-carpaccio": {
    title: "Vin til tatar og carpaccio",
    description:
      "Vin til oksetatar og carpaccio: let rød som pinot noir, gamay eller rosé med syre. Undgå tung cabernet — match råt kød, citron og parmesan.",
  },
  "vin-til-rejer": {
    title: "Vin til rejer og skaldyr",
    description:
      "Vin til rejer: tør hvidvin, albariño og bobler med syre og salt. Grillede rejer, gambas og skaldyrspasta — servering og flasker til dansk sommer.",
  },
};

/** Opskrift → målrettet SERP (GSC striking distance, jul 2026). */
const RECIPE_SERP_OVERRIDES: Record<string, { title?: string; description?: string }> = {
  "coq-au-vin": {
    title: "Coq au vin opskrift — kylling i rødvin",
    description:
      "Klassisk coq au vin med kylling braiseret i pinot noir eller gamay. Opskrift til 4 personer — vin i gryde og glas, step-by-step på dansk.",
  },
  "gullasch-med-rodvin": {
    title: "Gullasch opskrift med rødvin",
    description:
      "Ungarsk gullasch med oksekød, paprika og rødvin i saucen. Opskrift til 6 — krydret gryderet med syre og frugt fra vinen. Vin til glasset inkl.",
  },
  "ratatouille-med-hvidvin": {
    title: "Ratatouille opskrift med hvidvin",
    description:
      "Provence-ratatouille braiseret i hvidvin med aubergine, squash og tomater. Vegetar opskrift til 4 — vin i gryden giver syre og dybde.",
  },
  "tomatsuppe-med-hvidvin": {
    title: "Tomatsuppe med hvidvin — opskrift",
    description:
      "Cremet tomatsuppe simret med hvidvin, basilikum og fløde. Vegetar opskrift til 4 personer — vinen løfter syren mod tomaternes sødme.",
  },
  "spansk-koedboller-i-rodvinsauce": {
    title: "Almóndigas opskrift — kødboller i rødvin",
    description:
      "Spanske kødboller (almóndigas) simret i mørk rødvins- eller sherrysauce. Tapas-opskrift til 4–6 med vin i saucen — server med brød.",
  },
  "chorizo-i-rodvin": {
    title: "Chorizo al vino — opskrift med rødvin",
    description:
      "Chorizo stegt og glaceret i rødvin med hvidløg — klassisk tapas. Hurtig opskrift med vin i gryden og tips til rødvin i glasset.",
  },
  "rodvinsmarinade-til-oksekod": {
    title: "Rødvinsmarinade opskrift til oksekød",
    description:
      "Klassisk rødvinsmarinade med hvidløg og timian til entrecôte og grill. 250 ml rødvin mørner kødet — natten over i køleskab.",
  },
  "kylling-piccata-med-hvidvin": {
    title: "Kylling piccata opskrift med hvidvin",
    description:
      "Italiensk piccata: paneret kylling i citron-hvidvinsauce med kapers. Opskrift til 4 personer — vin deglacerer panden.",
  },
  "pasta-amatriciana-med-rodvin": {
    title: "Pasta amatriciana opskrift med rødvin",
    description:
      "Amatriciana med guanciale, tomater og rødvin i saucen. Klassisk italiensk pasta til 4 — pecorino og ung sangiovese.",
  },
};

/** Unik SERP-tekst for bedste-*-under-* (erstatter copy-paste-frontmatter). */
const BEDSTE_SERP_BY_SLUG: Record<string, string> = {
  "bedste-albarino-under-150-kr":
    "Albariño under 150 kr: Rías Baixas og Minho med salt og citrus til skaldyr. Danske producenter, regioner og typiske fejl i prisklassen.",
  "bedste-cabernet-sauvignon-under-100-kr":
    "Cabernet under 100 kr: Haut-Médoc, Castillon og Maipo slår smarte blend-navne. Hvor du får mest struktur for pengene — og hvad du skal undgå.",
  "bedste-cabernet-sauvignon-under-150-kr":
    "Cabernet 100–150 kr: junior-Médoc og seriøs Chile-Reserva med tydelig frugt. Regioner, producenter og faldgruber forklaret på dansk.",
  "bedste-cabernet-sauvignon-under-200-kr":
    "Cabernet under 200 kr: Cru Bourgeois, modne årgange og seriøse Napa-entry. Sådan vælger du uden at betale for prestige-marketing.",
  "bedste-chardonnay-under-100-kr":
    "Chardonnay under 100 kr: Mâcon, Limoux og unwooded Australien slår fad-tung supermarkeds-hvid. Friske flasker til fisk og hverdag.",
  "bedste-chardonnay-under-150-kr":
    "Chardonnay 100–150 kr: Petit Chablis, Saint-Véran og Oregon-entry. Stål eller fad — sådan finder du den rigtige stil til maden.",
  "bedste-chenin-blanc-under-150-kr":
    "Chenin under 150 kr: Loire og Swartland med sec, demi-sec eller moelleux. Tjek sødme på etiketten — og undgå fejlkøb til mad.",
  "bedste-grenache-under-100-kr":
    "Grenache under 100 kr: Rhône Villages, Borja og Fitou til gryde og grill. Varm frugt uden Châteauneuf-pris — producenter og faldgruber.",
  "bedste-grenache-under-150-kr":
    "Grenache 100–150 kr: Gigondas, Vacqueyras og Montsant med mere peber og urter. Upgrade fra hverdagsflasken uden prestige-etiket.",
  "bedste-malbec-under-100-kr":
    "Malbec under 100 kr: Mendoza Luján og Uco til bøf og burger. Mørk frugt, blød struktur — undgå «premium» uden subregion.",
  "bedste-malbec-under-150-kr":
    "Malbec 100–150 kr: Reserva Mendoza eller pebret Cahors til grill. Sammenlign stilarter, producenter og årgang før du køber.",
  "bedste-merlot-under-100-kr":
    "Merlot under 100 kr: Côtes de Bourg og blød Chile-merlot til pasta og svinekød. Venlig frugt uden tung tannin-stress.",
  "bedste-merlot-under-150-kr":
    "Merlot 100–150 kr: Saint-Émilion Grand Cru og Pomerol-satellitter med mere lag. Regioner, flasker og faldgruber på dansk.",
  "bedste-pinot-grigio-under-100-kr":
    "Pinot grigio under 100 kr: Alto Adige og Friuli slår generisk norditaliensk bulk. Frisk aperitivo-hvid til fisk og salat.",
  "bedste-pinot-grigio-under-150-kr":
    "Pinot grigio 100–150 kr: mere tekstur fra Alto Adige, Friuli eller Oregon pinot gris. Sådan vælger du mellem let og struktureret.",
  "bedste-pinot-noir-under-150-kr":
    "Pinot noir 100–150 kr: Oregon, Marlborough og Bourgogne Chalonnaise til kylling og svampe. Madpinot uden Côte de Nuits-pris.",
  "bedste-pinot-noir-under-250-kr":
    "Pinot noir under 250 kr: Villages, Premier Cru og Oregon single-vineyard. Lagring, årgang og opbevaring forklaret for danske købere.",
  "bedste-riesling-under-100-kr":
    "Riesling under 100 kr: tør Mosel, Nahe og Pfalz til asiatisk mad og fisk. Tjek trocken på etiketten — undgå halvtør overraskelse.",
  "bedste-riesling-under-150-kr":
    "Riesling 100–150 kr: Gutswein, Alsace og Clare Valley med mineral og frugt. Tør, feinherb eller sød — vælg bevidst til retten.",
  "bedste-sangiovese-under-100-kr":
    "Sangiovese under 100 kr: Chianti Classico og Rosso di Montalcino til pasta og pizza. Syre og kirsebær uden Riserva-pris.",
  "bedste-sangiovese-under-150-kr":
    "Sangiovese 100–150 kr: Riserva Chianti og Rosso med mere fad og struktur. Italiensk hverdagsrød til gæster — producenter og tips.",
  "bedste-sauvignon-blanc-under-100-kr":
    "Sauvignon under 100 kr: Touraine, Pays d'Oc og Marlborough entry til salat og fisk. Frisk hvid — drik ung for max aromatik.",
  "bedste-sauvignon-blanc-under-150-kr":
    "Sauvignon 100–150 kr: Sancerre village eller seriøs Marlborough. Loire sten vs. NZ tropisk frugt — samme pris, to stilarter.",
  "bedste-syrah-under-100-kr":
    "Syrah under 100 kr: Côtes du Rhône og Crozes til grill og gryde. Peber og frugt uden overmoden shiraz-bombe fra varme år.",
  "bedste-syrah-under-150-kr":
    "Syrah 100–150 kr: Saint-Joseph, Cornas-junior eller Swartland med mere struktur. Nord-Rhône peber vs. Barossa frugt — vælg til mad.",
  "bedste-tempranillo-under-100-kr":
    "Tempranillo under 100 kr: Rioja Crianza og Ribera Roble til tapas og lam. Moden frugt nu — spar Reserva til 150 kr+.",
  "bedste-tempranillo-under-150-kr":
    "Tempranillo 100–150 kr: Rioja Reserva og seriøs Ribera med tydelig fad. Ældring, producenter og faldgruber på dansk.",
};

export function truncateMetaDescription(text: string, max = SERP_DESCRIPTION_MAX): string {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (cleaned.length <= max) return cleaned;
  const slice = cleaned.slice(0, max - 1);
  const lastSpace = slice.lastIndexOf(" ");
  const cut = lastSpace > max * 0.6 ? slice.slice(0, lastSpace) : slice;
  return `${cut.trim()}…`;
}

function bedsteSerpFromSlug(slug: string, title: string): string | null {
  if (BEDSTE_SERP_BY_SLUG[slug]) return BEDSTE_SERP_BY_SLUG[slug];
  const m = slug.match(/^bedste-(.+)-under-(\d+)-kr$/);
  if (!m) return null;
  const grape = m[1].replace(/-/g, " ");
  const price = m[2];
  return truncateMetaDescription(
    `${title.split(":")[0].trim()}: dansk guide til regioner, producenter og faldgruber omkring ${price} kr — uden marketing-fælder.`,
  );
}

/**
 * Meta description til Google — unik, inden for ~155 tegn.
 */
export function buildGuideSerpDescription(description: string, slug: string, title: string): string {
  const override = GUIDE_SERP_OVERRIDES[slug]?.description;
  if (override) return truncateMetaDescription(override);

  const cleaned = description.replace(/\s+/g, " ").trim();

  if (GENERIC_BEDSTE_DESC.test(cleaned) || slug.startsWith("bedste-") && slug.includes("-under-")) {
    const custom = bedsteSerpFromSlug(slug, title);
    if (custom) return truncateMetaDescription(custom);
  }

  if (cleaned.length > SERP_DESCRIPTION_MAX) {
    const sentences = cleaned.split(/(?<=[.!?])\s+/).filter(Boolean);
    if (sentences.length >= 2) {
      const two = `${sentences[0]} ${sentences[1]}`;
      if (two.length <= SERP_DESCRIPTION_MAX + 10) return truncateMetaDescription(two);
    }
  }

  return truncateMetaDescription(cleaned);
}

/**
 * Kortere titel til SERP — fuld titel bruges stadig som H1 på siden.
 */
export function buildGuideSerpTitle(title: string, slug: string): string {
  const override = GUIDE_SERP_OVERRIDES[slug]?.title;
  if (override) return override.length <= SERP_TITLE_BUDGET ? override : truncateMetaDescription(override, SERP_TITLE_BUDGET).replace(/…$/, "");

  const base = title.split(":")[0]?.trim() || title;
  if (base.length <= SERP_TITLE_BUDGET) return base;

  if (slug.startsWith("bedste-") && slug.includes("-under-")) {
    const m = slug.match(/^bedste-(.+)-under-(\d+)-kr$/);
    if (m) {
      const grape = m[1].replace(/-/g, " ");
      return `Bedste ${grape} under ${m[2]} kr`;
    }
  }

  if (slug.startsWith("vin-til-")) {
    return truncateMetaDescription(base, SERP_TITLE_BUDGET).replace(/…$/, "");
  }

  return truncateMetaDescription(base, SERP_TITLE_BUDGET).replace(/…$/, "");
}

export function buildRecipeSerpDescription(description: string, slug: string, title: string): string {
  const override = RECIPE_SERP_OVERRIDES[slug]?.description;
  if (override) return truncateMetaDescription(override);

  const cleaned = description.replace(/\s+/g, " ").trim();
  if (cleaned.length <= SERP_DESCRIPTION_MAX) return cleaned;
  return truncateMetaDescription(cleaned);
}

export function buildRecipeSerpTitle(title: string, slug: string): string {
  const override = RECIPE_SERP_OVERRIDES[slug]?.title;
  if (override) return override.length <= SERP_TITLE_BUDGET ? override : truncateMetaDescription(override, SERP_TITLE_BUDGET).replace(/…$/, "");

  const base = title.trim();
  if (base.length <= SERP_TITLE_BUDGET) return base;
  return truncateMetaDescription(base, SERP_TITLE_BUDGET).replace(/…$/, "");
}
