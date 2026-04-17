/** FAQ til FAQPage JSON-LD — korte, rene svar (flere sider kan tilføjes efter behov). */
export const guideFaqBySlug: Record<string, { question: string; answer: string }[]> = {
  "vin-til-sushi": [
    {
      question: "Hvilken vin passer bedst til sushi og sashimi?",
      answer:
        "Tør hvidvin med tydelig syre og bobler er ofte bedst: riesling, grüner veltliner, muscadet, albariño eller champagne/cremant. De matcher rå fisk og renser ganen uden tung fad eller hårde tanniner.",
    },
    {
      question: "Kan man drikke rødvin til sushi?",
      answer:
        "Ja, primært til uramaki eller ruller med fed mayo, avocado eller sprød tempura. Vælg let rød med lav tannin, fx gamay eller kølig pinot noir, og undgå unge, kraftige røde med høj alkohol.",
    },
    {
      question: "Hvorfor smager tung rødvin ofte dårligt til sushi?",
      answer:
        "Kraftige tanniner og høj alkohol konkurrerer med soja, wasabi og delikat fisk og kan føles bittert eller dominerende. Sushi har typisk brug for friskhed og syre frem for struktur fra grove tanniner.",
    },
  ],
  "opbevaring-af-vin-temperatur-og-aabnet-flaske": [
    {
      question: "Hvilken temperatur skal rødvin have?",
      answer:
        "De fleste rødvine smager bedst omkring 15–18 °C afhængigt af krop og tanniner. Let rød kan med fordel serveres 14–16 °C; kraftig rød ofte 16–18 °C. Afkøl flasken kort, hvis rummet er over ca. 22 °C.",
    },
    {
      question: "Hvor kold skal hvidvin og rosé være?",
      answer:
        "Let hvid og rosé typisk 8–12 °C. Fyldig hvid (fx moden chardonnay) ofte 10–14 °C, så fad og frugt ikke forsvinder, hvis vinen er iskold.",
    },
    {
      question: "Hvilken temperatur skal champagne og bobler have?",
      answer:
        "Champagne og kvalitetsbobler ofte omkring 8–10 °C. Cava og prosecco ofte 6–9 °C. For koldt skjuler aroma; for varmt bliver alkoholen dominerende.",
    },
    {
      question: "Hvilken temperatur skal riesling have?",
      answer:
        "Riesling serveres typisk køligt: omkring 8–12 °C for tør riesling og lidt koldere for sødere udgaver, så syren forbliver frisk.",
    },
    {
      question: "Hvor længe holder en åbnet flaske vin?",
      answer:
        "Tommelfingerregel: let hvid og rosé 2–4 dage i køleskab; fyldig hvid ofte op til 4–5 dage; let rød 2–4 dage; tung ung rød ofte 4–6 dage eller mere; bobler 1–3 dage med god prop. Smag og lugt afgør altid.",
    },
  ],
  "komplet-guide-til-vin-og-mad": [
    {
      question: "Hvad er de vigtigste principper for vin og mad?",
      answer:
        "Balance: syre mod fedme, tanniner mod protein, sødme mod varme/krydderi, og alkohol mod rettens vægt. Region med region kan inspirere, men er ikke en lov — globale vine kan matche lige så godt.",
    },
    {
      question: "Hvilken rødvin passer til oksekød og bøf?",
      answer:
        "Mørke bær, struktur og tanniner passer godt: cabernet sauvignon, malbec, syrah/shiraz og bordeaux-lignende vine. Meget unge, ekstremt tanninrige vine kan have godt af kort luftning.",
    },
    {
      question: "Hvor finder jeg vin til specifikke retter?",
      answer:
        "Brug søgningen på forsiden for forslag fra danske forhandlere, og dyk ned i Vinbots korte guides (fx pizza, sushi, grill) samt vinregionerne for lande og zoner. Tjek altid pris, årgang og levering hos forhandleren.",
    },
  ],
  "vin-begreber-i-praksis": [
    {
      question: "Hvad er tanniner i vin?",
      answer:
        "Tanniner kommer fra drueskind, kerner og stilke og fra fad. De mærkes som en aftørende fornemmelse på tungen og tandkødet — ikke som syrens friske bid. Unge kraftige røde kan føles stramme; med kød bliver tanniner ofte blødere.",
    },
    {
      question: "Hvad betyder tør og halvtør på en vin?",
      answer:
        "Tør betyder typisk ingen mærkbar restsødme. Halvtør har lidt restsødme tilbage og kan passe til krydret mad. Sød og dessertvin har tydelig sødme og passer til dessert eller ost med salt og blåskimmel.",
    },
    {
      question: "Betyder reserva altid bedre vin?",
      answer:
        "Nej. Reserva og riserva er landespecifikke regler om lagring på fad og flaske — et hint om ofte mere sammensat smag, men ikke en garanti. Læs producent og årgang som ved enhver anden vin.",
    },
  ],
  "koeb-vin-online-sadan-holder-du-styr-paa-det": [
    {
      question: "Hvad skal jeg tjekke før jeg køber vin online?",
      answer:
        "Årgang, flaskestørrelse og antal, leveringsomkostninger og tid, minimumskøb, alkoholprocent og sødme i beskrivelsen. Tjek forhandlerens side for endelig pris, lager og returpolitik — på Vinbot sammenligner du overblik, men du handler hos butikken.",
    },
    {
      question: "Hvordan undgår jeg at miste overblik over tilbud?",
      answer:
        "Sammenlign få kandidater ad gangen, skriv dato, vin, forhandler, pris og årgang ned i et notat, og begræns nyhedsbreve til 1–2 seriøse forhandlere med filter i indbakken.",
    },
    {
      question: "Hvordan påvirker varme og frost forsendelse af vin?",
      answer:
        "Sommer: undgå at lade kassen stå i varm bil; vælg kølig levering eller pakkeshop. Vinter: hård frost kan skade flasker — gode forhandlere udskyder forsendelse. Bestil i god tid før jul og påske.",
    },
  ],
  "bobler-champagne-cava-prosecco-og-cremant": [
    {
      question: "Hvad er forskellen på champagne og crémant?",
      answer:
        "Champagne kommer kun fra Champagne i Frankrig og laves efter strenge regler med anden gæring på flasken; smagen er ofte kompleks med brød og mineralitet. Crémant er mousserende fra andre franske områder med lignende metode og kan give meget vin for pengene.",
    },
    {
      question: "Hvornår vælger man cava frem for prosecco?",
      answer:
        "Cava laves typisk med anden gæring på flaske og spænder fra knastør citrus til modnere frugt — ofte til tapas og grill. Prosecco er ofte frisk og frugtig med stor mousse; god til lette forretter og hverdagsbobler.",
    },
    {
      question: "Hvilken boble passer til ost og friture?",
      answer:
        "Champagne og andre tørre bobler med syre og finesse matcher ofte salt, ost og friture. Se også crémant som et prisvenligt alternativ med flaskefermenteret stil.",
    },
  ],
  "vin-til-julemad-den-store-guide": [
    {
      question: "Hvilken vin passer til flæskesteg og brun sovs?",
      answer:
        "En rød med syre og saft uden at dominere sovsen: pinot noir, gamay, sangiovese eller mellemfyldig côtes du rhône. Meget tannintunge unge vine kan virke hårde, hvis sovsen er bitter eller meget reduceret.",
    },
    {
      question: "Hvilken vin til and?",
      answer:
        "Pinot noir fra køligere klima, gamay eller nebbiolo/barolo med luftning kan matche andens fedme og smag. Surtilbehør som rødkål tåler ekstra syre i vinen.",
    },
    {
      question: "Hvad drikker man til risalamande og dessert?",
      answer:
        "Vinen skal have nok sødme — ellers smager den skarp. Mange vælger moscato, sød riesling eller portvin. Læs også guiden om dessert og kransekage for principper og bobler til kage.",
    },
  ],
  "naturvin-hvad-er-det": [
    {
      question: "Er naturvin det samme som økologisk vin?",
      answer:
        "Nej. Økologisk handler primært om certificeret dyrkning i marken. Naturvin beskriver ofte også kælderpraksis med få tilsætninger og minimal filtrering — men økologisk er ikke automatisk naturvin, og naturvin er ikke nødvendigvis økologisk uden dokumentation.",
    },
    {
      question: "Hvordan smager naturvin?",
      answer:
        "Meget varierende: høj syre, gærnoter, let bobler, oxidative toner eller rene lineære udtryk. Der er ingen fælles kvalitetsgaranti — vurder som ved al anden vin ud fra smag og producent.",
    },
    {
      question: "Hvad skal jeg være opmærksom på efter åbning?",
      answer:
        "Mange naturvine er følsomme over for varme og ilt. Køl efter åbning og drik ofte inden for kortere tid end konventionelle vine; se guiden om opbevaring og temperatur.",
    },
  ],
  "vin-til-grill-og-bbq": [
    {
      question: "Hvilken vin passer til BBQ med sød glasur?",
      answer:
        "Sød sauce kræver ofte lidt restsødme eller frugtrig rød eller rosé med moden frugt — ellers kan vinen smage bitter. Syre er stadig vigtig for at skære igennem fedme og røg.",
    },
    {
      question: "Hvilken vin til bøf fra grillen?",
      answer:
        "Syrah, malbec, zinfandel/primitivo eller cabernet-venlige blends med moden frugt. Meget unge tanninrige vine kan have godt af kort hvile eller luftning.",
    },
    {
      question: "Hvad drikker man til kylling og grøntsager på grill?",
      answer:
        "Rosé, grenache, pinot noir eller fyldig hvid (viognier, moden chardonnay) til marinader med citron, urter eller yoghurt — ofte nemmere end tung rød.",
    },
  ],
  "vin-til-ost-og-ostebord": [
    {
      question: "Hvilken vin til blåskimmelost?",
      answer:
        "Kraftig blåskimmel tåler ofte sødere vine: port, late-harvest riesling eller røde med moden frugt og lav tannin. Meget unge tannintunge røde kan smage bittert til blåskimmel.",
    },
    {
      question: "Hvad passer til faste lagrede oste?",
      answer:
        "Oxidative hvide, champagne eller tør sherry (fx amontillado/oloroso) fungerer ofte godt sammen med salt og fedme i ost som comté og parmesan.",
    },
    {
      question: "Kan man drikke rødvin til ost?",
      answer:
        "Ja — pinot noir, gamay og sangiovese med moden frugt er ofte nemmere end ung cabernet. Match styrken: kraftig ost kræver kraftigere vin eller sødme.",
    },
  ],
  "vin-til-pizza": [
    {
      question: "Hvilken vin passer til margherita og klassisk tomatpizza?",
      answer:
        "Vælg vine med god syre: sangiovese/chianti, montepulciano, barbera, dolcetto eller en syrlig rosé. Lettere primitivo kan også fungere; undgå flade, meget alkoholstærke røde uden friskhed.",
    },
    {
      question: "Hvilken vin til pepperoni og kødpizza?",
      answer:
        "Mere fedt og krydderi tåler lidt mere krop: primitivo, moden grenache/syrah, sydfransk blend eller aglianico i lettere stil. Undgå ekstremt tannin-dominerede unge røde til meget salt pålæg uden luftning.",
    },
    {
      question: "Hvilken vin til pizza bianco og ostetunge pizza?",
      answer:
        "Uden tomat passer chardonnay med friskhed, pinot gris, fyldig hvid fra syd eller let pinot noir. Til mange oste og salt smag fungerer tørre bobler som crémant eller cava også godt.",
    },
    {
      question: "Passer bobler til pizza?",
      answer:
        "Ja — tørre bobler med syre (cremant, cava, prosecco extra brut, lambrusco secco) skærer igennem salt ost og matcher tomat; de er særligt oplagt til sprød bund og hygge.",
    },
  ],
  "vinkoleskabe-sadan-vaelger-du": [
    {
      question: "Skal jeg vælge integrerbart eller fritstående vinkøleskab?",
      answer:
        "Integrerbart passer i køkkenet med køkkenlåge og kræver korrekt niche og ventilation. Fritstående er nemmere at placere og flytte, men skal stadig have luft omkring sig efter manualen.",
    },
    {
      question: "Hvor mange temperaturzoner har jeg brug for?",
      answer:
        "Én zone er enkelt og ofte billigere. To zoner er populært til både kølig hvid/rosé og lidt varmere rød. Flere zoner eller stor kapacitet giver mening til større samlinger eller når både lagring og servering skal dækkes.",
    },
    {
      question: "Hvor finder jeg vinkøleskabe med pris og billede?",
      answer:
        "På vinbot.dk/vinkoleskabe kan du søge på tværs af produktfeeds med billede og pris, blandt andet hos Vinkøleskabet.dk (partner). Du klikker videre til forhandleren for endelig pris, mål og levering.",
    },
  ],
  "vin-til-fastelavn": [
    {
      question: "Hvilken vin passer til fastelavnsboller?",
      answer:
        "Tørre bobler (cava brut, crémant, prosecco extra brut) eller frisk hvid med syre (riesling tør, sauvignon, albariño) balancerer creme og sød glasur uden at blive tungt.",
    },
    {
      question: "Hvad drikker man til fastelavn med børn?",
      answer:
        "Alkoholfri bobler, saft eller let mousserende uden alkohol er praktisk. Server voksen-vin til dem, der ønsker det, og hold mængden moderat når der er børn til stede.",
    },
  ],
  "vin-til-mortensaften": [
    {
      question: "Hvilken vin til and og brun sauce?",
      answer:
        "Let til mellemfyldig rød med syre og saft: pinot noir, gamay eller lettere sangiovese. Aromatisk hvid eller tør til halvtør riesling kan også matche and, rødkål og sauce.",
    },
    {
      question: "Er mortensvin det samme som julevin?",
      answer:
        "Mange af principperne overlapper juleand og mortensand — se også vin til and og julemad. Vælg efter hvor sød saucen er og hvor kraftig fuglen er tilberedt.",
    },
  ],
  "vin-til-sankt-hans": [
    {
      question: "Hvilken vin til grill på Sankt Hans?",
      answer:
        "Tør rosé, frisk hvid og let rød (gamay, pinot, lettere grenache) er alsidigt til grill, salater og skaldyr. Bobler fungerer godt som velkomst.",
    },
    {
      question: "Hvad hvis jeg ikke vil have alkohol på Sankt Hans?",
      answer:
        "Vælg kvalitets alkoholfri bobler eller frisk most. Vinbot har også en guide til alkoholsvag og alkoholfri vin.",
    },
  ],
  "prosecco-glera-druen": [
    {
      question: "Er prosecco det samme som glera?",
      answer:
        "Glera er druen; prosecco er den beskyttede boblevintype fra udvalgte områder i Norditalien, hvor glera dominerer. På etiketten ser du ofte prosecco, mens smagen kommer fra druen og metoden.",
    },
    {
      question: "Hvad betyder brut og extra dry på prosecco?",
      answer:
        "Brut og extra brut er de tørreste stilarter. Extra dry har ofte lidt mere restsødme end brut — tjek etiketten, hvis du vil undgå sødme.",
    },
    {
      question: "Hvad er forskellen på prosecco og champagne?",
      answer:
        "Prosecco laves typisk med tankmetode (Charmat) og giver ofte frisk frugt og blød mousse. Champagne gærer anden gang på flasken og giver oftere brød, dybde og højere pris — begge kan være fremragende til forskellige lejligheder.",
    },
  ],
  "muscadet-druen": [
    {
      question: "Hvad er muscadet for en drue?",
      answer:
        "Muscadet er vinenavnet på hvidvinet fra druen melon de Bourgogne ved Loires udløb. Den er kendt for høj syre, diskret frugt og ofte lagring på gærrester (sur lie), som giver mere fylde.",
    },
    {
      question: "Passer muscadet til østers?",
      answer:
        "Ja — den høje syre og det neutrale udtryk matcher ofte salt skaldyr, østers og let fisk. Se også guiden om vin til fisk og skaldyr.",
    },
  ],
  "verdejo-druen": [
    {
      question: "Hvor kommer verdejo typisk fra?",
      answer:
        "Rueda vest for Madrid er hovedområdet. Her får du ofte grapefrugt, urter og frisk syre — nogle vine blandes med lidt sauvignon blanc.",
    },
    {
      question: "Er verdejo som albariño?",
      answer:
        "Begge er friske hvide, men verdejo er ofte mere urtet og indlandspræget, mens albariño mod Atlanterhavet kan føles mere salt og mineralisk.",
    },
  ],
  "viognier-druen": [
    {
      question: "Hvordan smager viognier?",
      answer:
        "Aromatisk med blomst, fersken og abrikos og ofte lavere syre end sauvignon. Kan minde om fyldig hvid uden tung eg, afhængigt af vinifikation.",
    },
    {
      question: "Hvilken mad passer til viognier?",
      answer:
        "Fjerkræ med sauce, smagfuld fisk, thai med kokos og bløde oste. Meget syrlige retter kan få vinen til at føles flad — balancer syren i maden.",
    },
  ],
  "carmenere-druen": [
    {
      question: "Hvor dyrkes carménère i dag?",
      answer:
        "Druen kom oprindeligt fra Bordeaux, men er i dag særligt kendt fra Chile (fx Central Valley, Maipo, Colchagua) med urter, peber og mørke bær.",
    },
    {
      question: "Hvad er forskellen på carménère og malbec?",
      answer:
        "Malbec kan være dybere og mere blækagtig; carménère har oftere tydelige grønne peber- og urtenoter. Begge passer til grill og kraftigt kød.",
    },
  ],
  "zinfandel-druen": [
    {
      question: "Er zinfandel det samme som primitivo?",
      answer:
        "Ja, det er samme druesort. Zinfandel er klassisk i Californien; primitivo er italiensk navn, særligt i Apulien. Smagen varierer med klima og kælder.",
    },
    {
      question: "Hvad er hvid zinfandel?",
      answer:
        "Det er en lys rosé-lignende stil med ofte mere sødme end tør provence-rosé — ikke hvidvin trods navnet.",
    },
  ],
  "touriga-nacional-druen": [
    {
      question: "Hvad bruges touriga nacional til?",
      answer:
        "Den er en nøgledrue i røde vine fra Douro og Dão og indgår også i portvin. Alene eller i blend giver den mørk frugt, blomst og tanniner.",
    },
    {
      question: "Hvilken mad passer til touriga nacional?",
      answer:
        "Lam, vildt, grill, kraftige gryderetter og modne oste. Syre og tanniner tåler fedt og urter — se guiden om Portugal-vinregion.",
    },
  ],
  "pinotage-druen": [
    {
      question: "Hvad er pinotage?",
      answer:
        "En sydafrikansk krydsning af pinot noir og cinsaut. Smagen spænder fra saftig bærfrugt til røg, kaffe og modne toner med fad.",
    },
    {
      question: "Er pinotage som pinot noir?",
      answer:
        "Pinot noir er ofte lettere og mere silkeagtig; pinotage har typisk mere farve, krydderi og kan virke rustik — begge kan fungere til grill, men udtrykket er forskelligt.",
    },
  ],
  "gewurztraminer-druen": [
    {
      question: "Hvordan smager gewürztraminer?",
      answer:
        "Meget aromatisk med lychee, rose og krydderi, ofte lav syre og højere alkohol. Mange vine er halvtør eller off-dry — tjek beskrivelse eller smagsnoter.",
    },
    {
      question: "Hvilken mad passer til gewürztraminer?",
      answer:
        "Krydret asiatisk mad med kokos eller karry, thai, mellemøstlige retter og blåskimmelost. Fedme eller lidt sødme i maden matcher ofte bedre end meget syrlige retter uden tilsvarende sødme i vinen.",
    },
  ],
  "cabernet-franc-druen": [
    {
      question: "Hvad er forskellen på cabernet franc og cabernet sauvignon?",
      answer:
        "Cabernet franc er ofte lettere med rød frugt, urter og grøn peber; cabernet sauvignon er typisk mørkere, mere tanninrig og kraftigere. I Bordeaux blandes de ofte sammen.",
    },
    {
      question: "Hvor kommer cabernet franc typisk fra?",
      answer:
        "Som ren drue især Loire (Chinon, Bourgueil) og som vigtig komponent i Bordeaux-blends. Også plantet i Canada, USA og andre kølige til tempererede områder.",
    },
  ],
  "assyrtiko-druen": [
    {
      question: "Hvad er assyrtiko?",
      answer:
        "En græsk hvid drue kendt for høj syre, mineralitet og citrus — særligt fra Santorini med vulkansk jord og vindpåvirkede vinstokke.",
    },
    {
      question: "Passer assyrtiko til fisk?",
      answer:
        "Ja — grillet fisk, skaldyr, salat med feta og let meze er klassiske matches. Syren skærer igennem fedme og salt på samme måde som andre mineralske hvide.",
    },
  ],
};
