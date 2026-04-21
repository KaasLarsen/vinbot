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
  "dolcetto-druen": [
    {
      question: "Hvad smager dolcetto af?",
      answer:
        "Kirsebær, blomme og urt med lav til mellem tannin — ofte lettere og mere drikbar ung end nebbiolo fra samme region.",
    },
    {
      question: "Er dolcetto en sød vin?",
      answer:
        "Sjældent. Navnet henviser til sødmefulde bær på planten; de fleste vine er tørre rødvine til mad som pizza, pasta og salumi.",
    },
  ],
  "montepulciano-druen": [
    {
      question: "Er Montepulciano d’Abruzzo det samme som Vino Nobile?",
      answer:
        "Nej. Vino Nobile di Montepulciano er en toscansk vin baseret på sangiovese fra byen Montepulciano. Montepulciano d’Abruzzo er lavet på druen montepulciano i Abruzzo.",
    },
    {
      question: "Hvilken mad passer til montepulciano?",
      answer:
        "Tomatbaseret pasta, pizza, grillet kød og italiensk hverdag — ofte blødere og mere frugtforwards end stram sangiovese.",
    },
  ],
  "mencia-druen": [
    {
      question: "Hvor dyrkes mencía?",
      answer:
        "Især Bierzo, Ribeira Sacra og Valdeorras i nordvestlige Spanien — ofte på skifer og bakker med frisk syre.",
    },
    {
      question: "Er mencía som rioja?",
      answer:
        "Begge er spanske røde, men mencía er ofte mere blomstret og stram i frugten, mens klassisk rioja-tempranillo kan være bredere med mere fad og krydderi.",
    },
  ],
  "sadan-laeser-du-vinflaskens-etiket": [
    {
      question: "Hvad skal jeg kigge efter først på etiketten?",
      answer:
        "Område eller appellation giver ofte mest kontekst for stil og regler. Derefter årgang, alkoholprocent og om vinen er tør eller har restsødme — især på tysk riesling og bobler.",
    },
    {
      question: "Betyder 'Reserve' altid lang lagring?",
      answer:
        "Ikke nødvendigvis. Reserva/riserva kan være regelstyret i nogle lande, mens 'Reserve' uden beskyttet oprindelse ofte er marketing — tjek land, appellation og producent.",
    },
  ],
  "vin-til-pizza-og-pasta": [
    {
      question: "Hvilken vin passer til pizza og pasta med tomat?",
      answer:
        "Røde med tydelig syre og saft passer ofte bedst: sangiovese/chianti, barbera, montepulciano d’Abruzzo eller primitivo afhængigt af hvor kraftig skorre og pålæg er. Syrlig rosé og frisk hvid fungerer til lettere pizza og til skaldyr.",
    },
    {
      question: "Kan man drikke hvidvin til pasta?",
      answer:
        "Ja — til pesto, hvidløg, skaldyr og pasta uden tung tomatsovs. Cremede saucer kan tåle chardonnay med frisk syre eller sydlig hvid; tomatelsker oftere syrefuld rød eller rosé.",
    },
    {
      question: "Hvad er den største fejl ved vin til pizza?",
      answer:
        "At vælge en flad, meget alkoholstærk rød uden syre til syrlig tomat og salt ost — vinen kan føles tung eller bitter uden at løfte maden.",
    },
    {
      question: "Hvad med vin til pizza uden tomat (bianco)?",
      answer:
        "Prioritér frisk syre i hvidvin eller let rød uden grove tanniner: fx chardonnay med bid, middelhavshvid eller let pinot — så fed ost og olie ikke dominerer glasset.",
    },
  ],
  "vin-til-rejer": [
    {
      question: "Hvilken vin passer bedst til rejer?",
      answer:
        "Hvidvin med tydelig syre og frisk frugt: muscadet, albariño, verdejo eller tør riesling. Bobler (cremant, cava, champagne) fungerer også til smør, citron og jomfruhummeragtige retter.",
    },
    {
      question: "Kan man drikke rødvin til rejer?",
      answer:
        "Sjældent til klassiske kogte eller hvidløgsrejer — her vinder frisk hvid. Til retter med tomat, paprika eller kraft krydderi kan let gamay, kølig pinot noir eller lettere sangiovese fungere, stadig gerne 14–16 °C.",
    },
    {
      question: "Hvorfor smager tung rødvin ofte dårligt til rejer?",
      answer:
        "Rejer er sarte i smagen; grove tanniner og meget høj alkohol uden frugtfriskhed kan føles bittert eller dominerende sammen med salt og fedme — syren i hvid og bobler matcher ofte bedre.",
    },
  ],
  "vin-til-tacos": [
    {
      question: "Hvilken vin passer til tacos med kød?",
      answer:
        "Let rød med syre og saft: gamay, ung tempranillo eller primitivo i lettere stil. Server køligt (14–16 °C), især hvis der er chili — meget alkohol forstærker ofte varmen.",
    },
    {
      question: "Hvilken vin til fisketacos?",
      answer:
        "Frisk hvid med syre: albariño, verdejo eller tør rosé. Lime, koriander og rå løg kræver friskhed; undgå alkoholstærk, fad-tung hvid uden bid.",
    },
    {
      question: "Hvad skal man undgå til stærk salsa og chili?",
      answer:
        "Meget tanninrige røde og meget høj alkohol uden syre — de forstærker ofte brænden fra capsaicin. Prioritér syre og evt. off-dry hvid eller let restsødme ved meget stærk krydderi.",
    },
  ],
  "bedste-rodvin": [
    {
      question: "Hvilken rødvin er den bedste?",
      answer:
        "Der findes ikke én bedste rødvin — det afhænger af smag, ret og pris. Som regel leverer Chianti Classico, Rioja Crianza, Côtes du Rhône Villages og Douro mest for pengene i 120–200 kr-klassen. Kraftige stilarter som Barolo, Amarone og klassificeret Bordeaux er til særlige anledninger.",
    },
    {
      question: "Hvilken rødvin passer til de fleste måltider?",
      answer:
        "Mellemfyldige og saftige røde med god syre og moderat tannin er mest alsidige: sangiovese (Chianti), tempranillo (Rioja Crianza), barbera, Côtes du Rhône-blends og pinot noir. De fungerer til pasta, pizza, svin, fjerkræ og hverdagsmad.",
    },
    {
      question: "Hvor meget skal en god rødvin koste?",
      answer:
        "Sweet spot for hverdag er 100–150 kr, hvor kvalitet og identitet stiger markant. 150–250 kr giver enkelt-producenter med karakter og moden frugt. Over 300 kr betaler du ofte for lagring og prestige.",
    },
    {
      question: "Skal rødvin være stuetemperatur?",
      answer:
        "Nej — stuetemperatur-idealet stammer fra gamle huse med 16–18 °C. I moderne varme hjem bliver rødvin ofte for varm (22+ °C), hvor alkohol dominerer. Optimal serveringstemperatur er 14–16 °C for let rød og 16–18 °C for kraftig.",
    },
  ],
  "bedste-hvidvin": [
    {
      question: "Hvilken hvidvin er den bedste?",
      answer:
        "Det afhænger af stil og ret. Frisk og syrlig: sauvignon blanc, albariño, muscadet, tør riesling. Aromatisk: off-dry riesling, gewürztraminer, viognier. Fyldig: chardonnay med fad, chenin blanc, pinot gris. Sweet spot ligger i 120–180 kr.",
    },
    {
      question: "Hvad er forskellen på tør og halvtør hvidvin?",
      answer:
        "Tør hvidvin har ingen mærkbar restsødme (under 4 g/l). Halvtør (tysk: halbtrocken) har 4–12 g/l — mærkbar lidt sødme, god til krydret mad. Sødme afgøres af etiketten; spørg forhandleren hvis det ikke fremgår.",
    },
    {
      question: "Hvilken hvidvin passer til fisk og skaldyr?",
      answer:
        "Muscadet sur lie, Chablis, albariño og tør riesling er klassiske matches. Syren skærer igennem fedme og salt uden at dominere delikat fisk. Tung fad-chardonnay bør undgås til let fisk.",
    },
    {
      question: "Hvor længe holder en åbnet hvidvin?",
      answer:
        "Tommelfingerregel: let hvid 2–4 dage i køleskab; fyldig chardonnay med fad ofte 4–5 dage. Sødere hvide (riesling, sauternes) holder ofte længere. Altid på køl med god prop.",
    },
  ],
  "bedste-bobler": [
    {
      question: "Hvilke bobler giver mest for pengene?",
      answer:
        "Crémant (Bourgogne, Loire, Limoux) laves efter samme metode som champagne og leverer ofte 70–80 % af champagnes kvalitet for halv pris. Cava brut reserva og Prosecco DOCG er også stærke valg i 100–200 kr.",
    },
    {
      question: "Hvad er forskellen på brut, extra dry og demi-sec?",
      answer:
        "Brut har under 12 g/l restsukker — tør. Extra dry har 12–17 g/l — let sødligt trods navnet. Demi-sec har 32–50 g/l — tydelig sødme, god til dessert. Brut nature/zero dosage er knastør (0–3 g/l).",
    },
    {
      question: "Hvilke bobler passer til hvilken mad?",
      answer:
        "Forret og skaldyr: brut eller extra brut. Pizza og pasta: prosecco eller frisk cava. Friture: cava brut eller crémant. Ostebord: champagne eller extra brut cava. Dessert: demi-sec eller asti.",
    },
    {
      question: "Hvor kolde skal bobler serveres?",
      answer:
        "6–9 °C er optimalt. Champagne typisk 8–10 °C; cava og prosecco ofte 6–8 °C. For koldt skjuler aroma; for varmt bliver alkoholen dominerende.",
    },
  ],
  "bedste-vin-til-gave": [
    {
      question: "Hvad er en sikker gavevin?",
      answer:
        "Klassiske kvalitetsbobler (crémant, cava gran reserva, champagne brut NV) eller respekterede rødvine (Chianti Classico, Rioja reserva) er aldrig forkert. For 300–500 kr får du champagne NV, Barolo eller moden Sancerre.",
    },
    {
      question: "Hvor meget skal en god gavevin koste?",
      answer:
        "150–300 kr er god hverdagsgave. 300–500 kr er sikker topgave — champagne, Barolo, Sancerre. 500+ kr er særlige anledninger som jubilæer. Dyrere betyder ikke bedre: en 200 kr crémant med personlig note slår ofte en 500 kr generisk luksusflaske.",
    },
    {
      question: "Skal jeg vælge flasker modtageren kender?",
      answer:
        "Ja, hvis du ikke kender deres smag godt. Klassiske appellationer (Rioja, Chianti, champagne) er sikrere end eksperimentelle naturvine. For vinkendere kan grower-champagne eller cru Beaujolais være mere personligt.",
    },
    {
      question: "Hvor finder jeg historie bag flasken?",
      answer:
        "Ordentlige producent-sider og forhandlerbeskrivelser fortæller om familie-drift, vinmarker og metode. Små skrevne notekort med flaskens historie hæver gave-opfattelsen betydeligt.",
    },
  ],
  "bedste-vin-til-begynder": [
    {
      question: "Hvilken vin skal jeg starte med som begynder?",
      answer:
        "Blide og frugtige stilarter: pinot noir fra kølige klimaer, gamay (Beaujolais), merlot fra Languedoc eller Chile. I hvid: albariño, pinot gris, chenin blanc fra Loire og halvtør riesling. Moscato d’Asti og prosecco er nemme bobler.",
    },
    {
      question: "Hvordan lærer jeg min smag hurtigt?",
      answer:
        "Køb ikke én flaske ad gangen — køb 3 forskellige stilarter og sammenlign. Skriv noter: farve, frugt, syre, krop, hvad du kan lide. Små smagninger med venner er mere lærerige end middag-flasker.",
    },
    {
      question: "Skal jeg undgå dyre vine som begynder?",
      answer:
        "Ja. Meget dyre vine kan du ikke værdsætte fuldt ud uden referencer. Start i 80–180 kr-klassen, hvor du får kvalitet uden at brænde penge på noget du ikke kan bedømme.",
    },
    {
      question: "Hvilke vine bør begyndere undgå?",
      answer:
        "Ekstremt tannintunge unge cabernet sauvignon, naturvin i starten (for eksperimental), tør sauvignon blanc med meget høj syre, og dessertvin som hovedvin. De har hver deres tid, men ikke som introduktion.",
    },
  ],
  "bedste-okologiske-vin": [
    {
      question: "Hvad betyder økologisk vin?",
      answer:
        "Økologisk vin er lavet af certificeret økologisk dyrkede druer. EU-reglerne dækker både mark og kælder. Biodynamisk (Demeter, Biodyvin) er et skridt videre med strammere regler og filosofi bag.",
    },
    {
      question: "Er økologisk vin automatisk bedre?",
      answer:
        "Nej. Økologi er en produktionsværdi, ikke en kvalitetsgaranti. Men toppen af økologisk producenter leverer høj kvalitet, fordi engagementet er stort. Dårlig økologisk er stadig dårlig.",
    },
    {
      question: "Hvor finder jeg certificeringen på etiketten?",
      answer:
        "Kig efter EU’s grønne økologi-blad, Demeter- eller Biodyvin-logo. ’Sans soufre ajouté’ eller ’zero SO2’ angiver ingen tilsat svovl. ’Vegan’ betyder uden animalsk klaring.",
    },
    {
      question: "Hvilke regioner leverer bedst økologisk vin?",
      answer:
        "Loire (Frankrig), Alsace, Piemonte, Toscana, Languedoc, Østrig og dele af Californien har stor andel af økologiske og biodynamiske producenter med international anerkendelse.",
    },
  ],
  "bedste-rodvin-under-100-kr": [
    {
      question: "Kan man få god rødvin under 100 kr?",
      answer:
        "Ja — fokusér på regioner der overperformer. Sicilien (Nero d’Avola), Spanien (Navarra, Campo de Borja), Portugal (Alentejo, Douro) og Sydfrankrig (Côtes du Rhône, Corbières) leverer autentisk stil under 100 kr.",
    },
    {
      question: "Hvilke druer skal jeg prioritere under 100 kr?",
      answer:
        "Garnacha, tempranillo ung, primitivo, montepulciano, nero d’Avola og portugisiske blends. Undgå pinot noir og nebbiolo under 100 kr — de er sjældent gode i den prisklasse.",
    },
    {
      question: "Hvad skal jeg undgå under 100 kr?",
      answer:
        "Supermarked-eksklusiv-label uden producent-info, ’reserva’ fra ukendte producenter (lagring koster penge), Bordeaux générique uden Chateau-navn, og ikke-vintage rødvin uden årgang.",
    },
    {
      question: "Kan boksevin være bedre end flasker under 100 kr?",
      answer:
        "Ja — moderne 3-liters bag-in-box leverer ofte bedre kvalitet per glas end billige flasker. Plus: lufttæt pose betyder vinen holder 4–6 uger efter åbning. Se også bedste boxvin-guiden.",
    },
  ],
  "vin-til-blaaskimmelost": [
    {
      question: "Hvilken vin passer bedst til blåskimmelost?",
      answer:
        "Sødvin er klassens bedste match. Sauternes til roquefort (ikonisk parring), tawnyport til stilton, rubinport til danablu. Tokaji Aszú og Pedro Ximénez er alternative. Sødmen balancerer ostens salt, syren skærer fedmen, rig frugt matcher intensiteten.",
    },
    {
      question: "Kan man drikke tør rødvin til blåskimmel?",
      answer:
        "Kun specifikke stilarter — gammel Amarone della Valpolicella, moden Rioja Gran Reserva eller kraftig zinfandel med restsukker. Unge tannintunge røde bliver bitre mod blåskimmel. Klassens råd: vælg sødvin, ikke tør rød.",
    },
    {
      question: "Hvad er den klassiske match til roquefort?",
      answer:
        "Sauternes — kombinationen er en af gastronomiens mest ikoniske parringer. Châteaux Rieussec, Suduiraut eller Guiraud i 200–500 kr-klassen. Servér ved 8–10 °C. Alternativt Barsac fra samme område eller late-harvest riesling med botrytis.",
    },
  ],
  "vin-til-brie-og-camembert": [
    {
      question: "Hvilken vin passer bedst til brie?",
      answer:
        "Champagne er klassens bedste match. Blanc de blancs til ung mild brie; blanc de noirs eller vintage til moden brie de Meaux. Crémant de Loire i 100–150 kr er fremragende værdi-alternativ. Chablis AOC og let pinot noir fungerer også.",
    },
    {
      question: "Kan man drikke rødvin til camembert?",
      answer:
        "Ja, men hold dig til lette røde. Kølig pinot noir fra bourgogne village, gamay (Beaujolais cru), eller let Chinon/Bourgueil fra Loire. Undgå unge cabernet, syrah og malbec — tanninerne er for hårde. Server rødvin kølig (14–16 °C) til brie.",
    },
    {
      question: "Skal brie være kold eller stuetemperatur?",
      answer:
        "Stuetemperatur — tag brie ud af køleskabet 1 time før servering. Kold brie smager næsten ikke af noget; stuetemperatur (18–20 °C) giver fuld smagsprofil. Gælder også camembert og andre hvidskimmel-oste.",
    },
  ],
  "vin-til-hard-ost": [
    {
      question: "Hvilken vin passer bedst til comté?",
      answer:
        "Jura vin jaune er klassens lærebogsmatch — begge kommer fra samme region og er udviklet sammen gennem århundreder. Oxidativ lagring under flor-hinde giver nøddeagtig profil der matcher comtéens umami. Alternativer: amontillado sherry, gammel Chablis grand cru.",
    },
    {
      question: "Er tør sherry virkelig et godt match til hård ost?",
      answer:
        "Ja — amontillado og palo cortado er klassens bedste sherry-match til comté, gruyère og gammel gouda. Oxidativ lagring skaber nødde- og karamelnoter der matcher ostens proteinkrystaller. Manzanilla og fino passer specifikt til manchego.",
    },
    {
      question: "Hvorfor fungerer ung rødvin dårligt til lagret hård ost?",
      answer:
        "Tanninerne kolliderer med ostens proteinkrystaller og kan virke bittert. Moden rødvin (10+ år) har bløde tanniner og komplekse sekundære aromaer der matcher bedre. Vælg moden Rioja Gran Reserva eller gammel Bordeaux frem for ungdommelige flasker.",
    },
  ],
  "vin-til-gedeost": [
    {
      question: "Hvorfor er Sancerre klassens bedste match til gedeost?",
      answer:
        "Geografisk og smagsmæssigt perfekt. Sancerre og Crottin de Chavignol produceres i samme Loire-område og er udviklet sammen gennem århundreder. Sauvignon blancs høje syre, mineralitet og grønne aromaer matcher gedeostens mælkesyrlighed og urtede toner.",
    },
    {
      question: "Kan Marlborough sauvignon blanc erstatte Sancerre?",
      answer:
        "Ja til moderne gedeostretter (salater, chèvre på pizza). Marlborough er mere tropisk frugt-dominerd end mineralsk Sancerre. Til traditionel chèvre frais eller Crottin de Chavignol foretrækkes Loire-sauvignon. Pris: Marlborough typisk 120–200 kr vs. Sancerre 140–250 kr.",
    },
    {
      question: "Fungerer rødvin til gedeost?",
      answer:
        "Sjældent, men let gamay (Beaujolais cru) eller kølig pinot noir kan matche lagret gedeost. Undgå tanninrig rød til frisk gedeost — bliver bitter. Klassens standardvalg er altid hvidvin, især Loire-sauvignon eller chenin blanc.",
    },
  ],
  "vin-til-feta": [
    {
      question: "Hvilken vin passer bedst til feta og græsk salat?",
      answer:
        "Assyrtiko fra Santorini er klassens absolut bedste match — både geografisk og smagsmæssigt. Vulkansk mineralitet, høj syre og saltige havsnoter komplementerer feta perfekt. 180–350 kr hos specialbutikker. Alternativ: albariño fra Rías Baixas med samme salt-mineralske profil.",
    },
    {
      question: "Kan jeg drikke rødvin til feta?",
      answer:
        "Kun til feta i retter med tomat og kraftige urter (bagt feta, pizza med feta). Rosé fra Provence eller Tavel fungerer også til bagt feta. Ren feta og græsk salat er altid hvidvin-territorium. Undgå tannintung rødvin — dominerer fetas delikate syrlighed.",
    },
    {
      question: "Er retsina et godt match til feta?",
      answer:
        "Traditionelt ja — retsina (fyrretræs-harpiks-vin fra Grækenland) serveres traditionelt med feta. Men moderne gastronomisk vurdering foretrækker ofte assyrtiko for bedre smagsbalance. Retsina er mere kulturel tradition end optimal gastronomi.",
    },
  ],
  "rosevin-til-grill": [
    {
      question: "Hvilken rosévin passer bedst til grill?",
      answer:
        "En mellem-kraftig tør rosé fra Provence eller Tavel — frisk nok til fisk og salater, kraftig nok til grillet kød. Server 8–10 °C. Undgå søde 'blush'-roséer og de blegeste Provence-basis, der ikke kan bære grillmarinader.",
    },
    {
      question: "Kan jeg bruge samme rosévin til fisk og oksekød på grillen?",
      answer:
        "Ja — det er netop rosévinens styrke. Vælg en mellem-kraft Provence eller en let Tavel. Begge har nok struktur til kraftigere kød og nok friskhed til laks eller kylling. En Côtes de Provence AOC i 130–180 kr-klassen dækker typisk hele grillmenuen.",
    },
    {
      question: "Er Bandol rosé det værd til grill?",
      answer:
        "Ja, hvis du grillet kraftigt kød (lam, entrecôte, merguez). Bandol har mourvèdre-base, med mere tannin og struktur end typisk Provence-rosé. Til lettere grillret (fisk, kylling) er Bandol ofte overkill.",
    },
  ],
  "champagne-til-mad": [
    {
      question: "Kan champagne serveres til hele måltidet?",
      answer:
        "Ja — champagne er en af gastronomiens mest alsidige vine. Blanc de blancs passer til fisk og skaldyr; blanc de noirs og vintage til kød og kraftigere retter. Den franske tradition serverer ofte champagne gennem hele måltidet — ikke kun som aperitif.",
    },
    {
      question: "Hvilken champagne passer bedst til østers?",
      answer:
        "Blanc de blancs (100 % chardonnay) er det klassiske match. Den høje syre, mineralitet og kridt-toner komplementerer østerens salte friskhed. Non-vintage blanc de blancs fra Taittinger eller Nicolas Feuillatte i 250–300 kr-klassen fungerer fremragende.",
    },
    {
      question: "Hvornår er champagne forkert valg til mad?",
      answer:
        "Til meget krydrede retter (thai, indisk curry) — her slår off-dry riesling champagne. Til stor tanninrig kødret (grillet ribeye) er klassisk rødvin bedre. Og til meget søde desserter er sødvin eller dessertvin mere passende end tør champagne.",
    },
  ],
  "bobler-til-brunch": [
    {
      question: "Hvad er bedste boble til brunch?",
      answer:
        "Prosecco Extra Dry er klassens populære brunch-valg — let sødme matcher pandekager og søde morgenretter. Cava brut eller Crémant de Loire giver mere struktur pr. krone til æg og salt brunch. Champagne til speciel brunch (konfirmation, fødselsdag).",
    },
    {
      question: "Hvilken boble er bedst til mimosa?",
      answer:
        "Prosecco Extra Dry — lidt sødme og frisk frugt matcher appelsinsaften uden at forsvinde. Undgå at bruge champagne til mimosa; den nuancerede champagne-aroma forsvinder i saften, og det er spild af pengene. 1:1 eller 2:1 bobler:saft.",
    },
    {
      question: "Hvor mange flasker brunch-bobler pr. person?",
      answer:
        "En flaske (75 cl) giver 6–8 glas. Til 4 personer brunch: 1–2 flasker. Til 8 personer: 2–3 flasker. Med mimosa: beregn 1 flaske pr. 3 personer plus 75 cl appelsinsaft pr. flaske. Åbn flasken lige før servering for bedst boble.",
    },
  ],
  "rodvin-til-pizza": [
    {
      question: "Hvilken rødvin passer bedst til pizza?",
      answer:
        "Sangiovese er klassens bedste valg — Chianti Classico eller Chianti DOCG i 100–150 kr. Syren matcher tomat, tanninerne er moderate, og vinen er designet til italiensk mad. Alternativer: Montepulciano d'Abruzzo (hverdag) og Primitivo di Manduria (kød-pizza).",
    },
    {
      question: "Kan jeg drikke kraftig rødvin som cabernet til pizza?",
      answer:
        "Bedre at undgå. Cabernet sauvignon og malbec har hårde tanniner, der ikke harmonerer med syrligt pizzatomat. Fadet, tung rødvin begraver pizzens smag. Hold dig til italienske vine med god syre og moderate tanniner — de er bygget til italiensk mad.",
    },
    {
      question: "Hvilken vin til hvid pizza (uden tomat)?",
      answer:
        "Hvidvin slår ofte rødvin til hvid pizza. Vermentino, Greco di Tufo, Fiano di Avellino og Soave matcher mozzarella, ricotta og artiskokker. Hvis du vil have rødvin, så vælg en let barbera eller pinot noir med lav tannin.",
    },
  ],
  "riesling-til-asiatisk-mad": [
    {
      question: "Hvorfor er riesling bedst til asiatisk mad?",
      answer:
        "Riesling har laserpræcis syre, lav alkohol (9–12 %) og kan variere i sødme (fra tør til off-dry). Sødmen balancerer chili-varme; syren rydder ganen efter fed mad; aromaprofilen matcher lime og ingefær. Ingen anden drue dækker hele bredden af asiatisk mad.",
    },
    {
      question: "Tør eller off-dry riesling til thai-curry?",
      answer:
        "Off-dry — en Mosel Kabinett (20–50 g/l restsukker) er klassens bedste match til thai grøn og rød curry. Sødmen balancerer chili-varmen, syren skærer kokosmælkens fedme. Tør riesling fungerer også, men mangler balance-elementet mod chili.",
    },
    {
      question: "Kan jeg drikke rødvin til kinesisk mad?",
      answer:
        "Til nogle retter ja — kantonesisk and, char siu og kraftig szechuan-kød kan fungere med let pinot noir eller gamay. Men til det brede register af kinesisk mad (stir-fry, dim sum, sur-sød, noodle-supper) er off-dry riesling overlegen.",
    },
  ],
  "pinot-noir-til-and": [
    {
      question: "Hvilken pinot noir passer bedst til andesteg?",
      answer:
        "Village-level Bourgogne (Gevrey-Chambertin, Vosne-Romanée) i 250–450 kr-klassen er klassens gastronomiske sweet spot. Alternativer: Oregon Willamette Valley eller tysk spätburgunder fra Baden/Pfalz i 200–350 kr — samme stil, lidt billigere.",
    },
    {
      question: "Kan spätburgunder matche bourgogne pinot noir til and?",
      answer:
        "Ja — tyske spätburgunder fra Ahr, Baden og Pfalz har vundet markant frem de sidste 10 år. I 150–250 kr-klassen leverer de ofte bedre pr. krone end tilsvarende bourgogne. Til stegt and med frugtsauce er de fremragende.",
    },
    {
      question: "Skal pinot noir dekanteres før servering til and?",
      answer:
        "Ung pinot noir (under 3 år) har typisk gavn af 30 minutters dekanter. Ældre bourgogne village eller premier cru kan holdes i flasken — de er mere fragile. Server ved 15–17 °C, ikke stuetemperatur.",
    },
  ],
  "bedste-rodvin-under-75-kr": [
    {
      question: "Findes der god rødvin under 75 kr?",
      answer:
        "Ja — men vær selektiv. Fokusér på Montepulciano d'Abruzzo, Sicilien (Nero d'Avola), Castilla-La Mancha (tempranillo/monastrell), Chile (merlot, carménère) og Pays d'Oc. Køb i 6- eller 12-flasker-kasser for at ramme 55–70 kr pr. flaske.",
    },
    {
      question: "Er boksevin bedre end flasker under 75 kr?",
      answer:
        "Ofte ja. En 3-liters bag-in-box giver typisk 40–55 kr pr. flaske i tilsvarende kvalitet, og den holder 4–6 uger efter åbning takket være den lufttætte pose. I denne prisklasse slår de bedste bokse billige flasker i blindsmagning.",
    },
    {
      question: "Hvilke druer skal jeg undgå under 75 kr?",
      answer:
        "Pinot noir, nebbiolo og cabernet sauvignon er sjældent gode under 75 kr — de kræver kvalitet og tid, som ikke passer med prisklassens omkostninger. Undgå også 'reserva' uden producent-info og ikke-vintage rød uden årgang.",
    },
  ],
  "bedste-rodvin-under-200-kr": [
    {
      question: "Hvad får jeg mere i 200 kr-klassen end under 150 kr?",
      answer:
        "Enkelt-producenter, navngivne appellationer og længere lagring på fad. Du betaler ikke længere kun for et område men for identitet. Forvent moden frugt, nuanceret tannin og længere finish. Det er sweet spot til weekend-middage og gaver under 250 kr.",
    },
    {
      question: "Hvilke regioner leverer bedst under 200 kr?",
      answer:
        "Rioja Reserva, Chianti Classico Riserva, Côtes du Rhône-Villages (Cairanne, Rasteau), Langhe Nebbiolo, Bordeaux Supérieur og Primitivo di Manduria. I nye verden: argentinsk malbec fra Uco Valley og chilensk carménère fra Apalta/Colchagua.",
    },
    {
      question: "Kan jeg lagre rødvin under 200 kr?",
      answer:
        "Nogle ja. Rioja Reserva holder 5–10 år, Chianti Classico Riserva 5–8 år, Langhe Nebbiolo 3–7 år, Bordeaux Supérieur 5–10 år. Nye verden-malbec og carménère bør drikkes indenfor 3–5 år. Opbevaring ved 12–16 °C uden temperaturudsving er afgørende.",
    },
  ],
  "bedste-rodvin-under-300-kr": [
    {
      question: "Hvad koster klassiske italienere som Barolo og Brunello?",
      answer:
        "Basis Barolo og Brunello di Montalcino starter typisk ved 250–300 kr fra gode producenter. Chianti Classico Gran Selezione og Amarone della Valpolicella findes også i 200–300 kr-klassen. Meget under 250 kr er sjældent ægte top-kvalitet i disse appellationer.",
    },
    {
      question: "Er Napa Valley cabernet mulig under 300 kr?",
      answer:
        "Kun lige — 250–300 kr er nederste grænse for ægte Napa cabernet fra solide producenter. Under 250 kr er 'Napa'-label ofte generisk eller restparti. Bedre værdi i klassen: argentinsk malbec fra Uco Valley, Barossa Shiraz eller Oregon pinot noir.",
    },
    {
      question: "Hvornår er 250–300 kr pengene værd?",
      answer:
        "Til jul, fødselsdage, værtindegaver og milepæle. Her får du lagringsdygtige vine med terroir-præg og håndværk. Til daglig drikkevin er niveauet overkill — hold dig til 100–200 kr. Men til den årlige middag eller som gave er forskellen tydelig.",
    },
  ],
  "bedste-hvidvin-under-75-kr": [
    {
      question: "Er hvidvin under 75 kr bedre end rødvin i samme pris?",
      answer:
        "Ofte ja. Hvidvin kræver færre investeringer i lagring, tanniner og fad. Frisk syre og ren frugt er det primære, og det kan laves godt til lav pris. Vinho Verde, Rueda verdejo, Muscadet sur lie og grüner veltliner basis leverer konsistent kvalitet i denne pris.",
    },
    {
      question: "Hvilke druer skal jeg vælge under 75 kr?",
      answer:
        "Verdejo (Rueda), grüner veltliner (Østrig basis), muscadet (Loire), sauvignon blanc (Pays d'Oc, Chile), og italienske alberginier som Soave. Undgå chardonnay med fad, riesling fra Mosel og Sancerre — de kræver højere pris for at være gode.",
    },
    {
      question: "Kan hvidvin under 75 kr gemmes?",
      answer:
        "Nej. Hvidvin i denne prisklasse er designet til at drikkes ungt, typisk indenfor 1–2 år efter årgang. 2024/2025-årgange er ideelle pt. Ældre flasker mister ofte friskhed uden at udvikle kompleksitet. Prioritér seneste årgang og skruelåg for garanteret friskhed.",
    },
  ],
  "bedste-bobler-under-100-kr": [
    {
      question: "Kan jeg få champagne under 100 kr?",
      answer:
        "Nej — ikke ægte champagne. Appellationen kræver minimum 15 måneder lagring på bunden, flaskegæring og dyre druer fra en begrænset region. Under 100 kr er du i prosecco- og cava-land. Ægte champagne starter typisk ved 200 kr for basis non-vintage.",
    },
    {
      question: "Hvad er bedst pr. krone: prosecco eller cava under 100 kr?",
      answer:
        "Cava har teknisk fordel: den laves med traditionel metode (flaskegæring) ligesom champagne, mens prosecco laves i tank. Cava brut eller Cava de Guarda Superior giver ofte mere kompleksitet pr. krone, mens prosecco er friskere og mere frugtig.",
    },
    {
      question: "Hvad er forskellen på 'brut' og 'extra dry' prosecco?",
      answer:
        "Brut har under 12 g/l restsukker (tørrest). Extra Dry har faktisk 12–17 g/l (let sødere, mest solgt). Dry har 17–32 g/l. Navnene er forvirrende — Brut er den tørreste stil. Kig efter Brut hvis du vil have ren, tør boble.",
    },
  ],
  "bedste-champagne-under-300-kr": [
    {
      question: "Hvor lidt kan ægte champagne koste?",
      answer:
        "Realistisk starter ægte champagne ved 200–230 kr for basis non-vintage fra store huse som Nicolas Feuillatte, Piper-Heidsieck eller Lanson. Alt under 200 kr er typisk supermarkedsflasker, restpartier eller ikke ægte champagne-AOC.",
    },
    {
      question: "Hvad er forskellen på grower-champagne og store huse?",
      answer:
        "Grower-champagne (RM = Récoltant-Manipulant) betyder producenten selv dyrker og laver vinen. Små producenter med enkelt-mark-fokus giver mere karakter pr. krone, mens store huse leverer konsistens. I 200–300 kr-klassen giver grower-producenter som Larmandier-Bernier ofte mere for pengene.",
    },
    {
      question: "Skal jeg vælge Brut, Extra Brut eller Brut Nature?",
      answer:
        "Brut (under 12 g/l sukker) er standarden og passer til de fleste. Extra Brut (0–6 g/l) er tørrere, fint til fine middage og ren aperitif. Brut Nature (0 g/l, ingen dosage) er ultra-tør og kræver moden grundvin — ofte i 300 kr+ klassen.",
    },
    {
      question: "Kan jeg lagre champagne under 300 kr?",
      answer:
        "Non-vintage champagne er designet til at drikkes relativt ungt (1–3 år efter køb). Den kan holde længere, men udvikler sig ikke markant som vintage-champagne gør. Til lagring bør du vælge vintage-champagne fra 300 kr+ klassen.",
    },
  ],
  "bedste-vin-under-100-kr": [
    {
      question: "Hvad er bedst pr. krone under 100 kr: rød, hvid, rosé eller bobler?",
      answer:
        "Hvidvin og cava overperformer ofte pr. krone i denne pris, fordi de kræver mindre investering i lagring og tanniner. Rødvin under 100 kr varierer mest — vælg Sicilien, Spanien eller Portugal. Bobler: cava slår prosecco i rå kvalitet.",
    },
    {
      question: "Er boksevin en god strategi under 100 kr?",
      answer:
        "Ja. Moderne 3-liters bag-in-box leverer ofte 40–55 kr pr. flaske-kvalitet, og posen holder vinen frisk 4–6 uger efter åbning. Især til hverdags-hvid og hverdags-rød er bokse et overlegent valg pr. krone.",
    },
    {
      question: "Skal jeg foretrække skruelåg under 100 kr?",
      answer:
        "Ja — skruelåg er mere pålidelig end billig prop i denne pris. Risikoen for prop-smag (TCA) er stort set elimineret, og vinen kommer frisk ind i glasset. For hvidvin og rosé er skruelåg særligt anbefalet.",
    },
  ],
  "bedste-alkoholfri-vin": [
    {
      question: "Smager alkoholfri vin som rigtig vin?",
      answer:
        "Ikke præcis, men kvaliteten er markant forbedret de sidste 5 år — særligt bobler og hvidvin. Alkoholfri rødvin er stadig kategoriens største udfordring, fordi tanninerne føles uden alkoholens krop.",
    },
    {
      question: "Hvilken alkoholfri vin er bedst?",
      answer:
        "Leitz Eins-Zwei-Zero (Tyskland) er generelt kategoriens bedste — både riesling og sparkling riesling. Torres Natureo (Spanien) og Giesen 0 % (New Zealand) er også anerkendte. Noughty fra England laver god chardonnay-stil.",
    },
    {
      question: "Hvordan laves alkoholfri vin?",
      answer:
        "Alkoholen fjernes fra færdig vin via vakuum-destillation eller reverse osmosis. Det tager aromaer og noget krop, som bedste producenter kompenserer for med omhyggelig vinifikation.",
    },
    {
      question: "Hvor mange kalorier har alkoholfri vin?",
      answer:
        "Cirka 1/3 af alkoholisk vin, typisk 15–25 kcal per 100 ml mod 70–85 kcal. Tjek etiket — nogle alkoholfri vine har tilsat sukker for at kompensere for tabt krop.",
    },
  ],
  "vin-til-stegt-flaesk": [
    {
      question: "Hvilken vin passer til stegt flæsk med persillesovs?",
      answer:
        "Vin med frisk syre: grüner veltliner, tør riesling, sauvignon eller tør rosé med bid. Let rød med saft (gamay, pinot noir, dolcetto) kan også fungere — undgå unge tannintunge røde uden moden frugt til sød brun sovs og syrlig persillesovs.",
    },
    {
      question: "Hvorfor er hvidvin ofte god til stegt flæsk?",
      answer:
        "Salt og fedt fra flæsket kalder på syre i vinen; cremet eller syrlig sovs gør det samme. Hvid og rosé skærer igennem fedmen uden at føles tung som meget struktur-rød ofte kan mod sur sovs.",
    },
    {
      question: "Passer rødvin til stegt flæsk og kartofler?",
      answer:
        "Ja — vælg let til mellemfyldig rød med moden frugt og lav/mellem tannin (fx gamay, pinot noir, lettere sangiovese). Meget ung bordeaux-agtig tannin kan føles hård mod både salt og sødlig sovs.",
    },
  ],
  "hvor-laenge-holder-rodvin": [
    {
      question: "Hvor længe holder åbnet rødvin?",
      answer:
        "Typisk 3-5 dage i køleskabet med prop i. Lette røde (pinot noir, gamay) 2-3 dage; kraftige røde (cabernet, malbec, nebbiolo) 5-7 dage. Vakuumpumpe eller Coravin forlænger markant.",
    },
    {
      question: "Hvor længe holder uåbnet rødvin?",
      answer:
        "Hverdagsrødvin skal drikkes inden 2-3 år. Kvalitetsvine 150-300 kr holder 3-8 år. Klassiske lagringsvine (Bordeaux, Barolo, Rioja Gran Reserva) udvikler sig 10-30 år i god kælder.",
    },
    {
      question: "Hvordan ser jeg om rødvinen er blevet dårlig?",
      answer:
        "Tegn: eddikelugt, neglelakfjerner-lugt, brun farve på en ung vin, prop-/mug-lugt (korksmag) eller fuldstændigt flad smag uden frugt. Korket vin kan typisk reklameres hos forhandleren.",
    },
    {
      question: "Skal åbnet rødvin stå i køleskabet?",
      answer:
        "Ja. Kulden bremser oxidationen. Tag flasken ud 15-20 minutter før næste servering, så temperaturen når 15-18 °C.",
    },
  ],
  "hvor-laenge-holder-hvidvin": [
    {
      question: "Hvor længe holder åbnet hvidvin?",
      answer:
        "3-5 dage i køleskabet med prop i. Lette friske hvide (sauvignon blanc, pinot grigio) mister karakter efter 2-3 dage; fyldig fadet chardonnay kan holde 5-7 dage og er ofte bedre dag 2.",
    },
    {
      question: "Hvor længe holder uåbnet hvidvin?",
      answer:
        "De fleste friske hvide 1-2 år. Fadet chardonnay 3-10 år. Tør riesling 2-8 år. Sød riesling Spätlese/Auslese og Sauternes 10-30 år ved korrekt opbevaring.",
    },
    {
      question: "Kan hvidvin stå i køleskabet længe?",
      answer:
        "Uåbnet hvidvin skal ideelt opbevares ved 12-14 °C. Uger i et kølig køleskab er fint; måneder udtørrer proppen og påvirker smagen. Flyt gerne til et vinkøleskab eller køligt kammer.",
    },
  ],
  "hvor-laenge-holder-bobler-og-champagne": [
    {
      question: "Hvor længe holder åbnet champagne?",
      answer:
        "1-3 dage i køleskabet med en tætsluttende champagne-lukke med metalvinger. Uden rigtig lukke mister vinen brus på få timer. Prosecco holder typisk 1-2 dage.",
    },
    {
      question: "Hvor længe holder uåbnet champagne?",
      answer:
        "Non-vintage champagne holder 3-5 år fra køb. Årgangschampagne 10-25 år i god kælder. Prosecco skal drikkes indenfor 1-3 år; cava indenfor 2-4 år.",
    },
    {
      question: "Virker en ske i flaskehalsen?",
      answer:
        "Nej — det er en myte. Brug i stedet en champagne-lukke med metalvinger, og hold flasken på 6-9 °C. Kulde holder CO₂ opløst i vinen og brusen intakt.",
    },
  ],
  "hvor-mange-glas-i-en-flaske-vin": [
    {
      question: "Hvor mange glas er der i en flaske vin?",
      answer:
        "5-6 glas i en standardflaske (75 cl). Restaurant-portion 15 cl giver 5 glas. Hjemme-hygge 12,5 cl giver 6 glas. Champagne/bobler-portion 10 cl giver 7-8 glas.",
    },
    {
      question: "Hvor meget vin per person til middag?",
      answer:
        "Tommelfingerregel: 1/2 flaske per voksen gæst hvis der drikkes hele aftenen. Middag med 4 personer = 2 flasker. 8 personer = 4 flasker. Tilføj 10-20 % buffer.",
    },
    {
      question: "Hvor mange glas i en magnum?",
      answer:
        "En magnum (1,5 l) giver 10-12 glas — ideelt til 4-6 personer. Magnum modner også langsommere og bedre end standardflasker, fordi forholdet mellem luft og vin er lavere.",
    },
  ],
  "hvad-er-tanniner": [
    {
      question: "Hvad er tanniner i vin?",
      answer:
        "Naturlige plantestoffer (polyfenoler) fra drueskaller, kerner, stilke og egetræsfad. De giver den snerpende, tørre fornemmelse i munden og rødvinens struktur samt aldringsevne.",
    },
    {
      question: "Hvorfor har hvidvin ikke tanniner?",
      answer:
        "Hvidvin gæres uden skal-kontakt, så tanninerne bliver i presserester. Rødvin gæres med skaller og kerner i dage eller uger. Orange vin (hvid med skal-kontakt) har også tannin.",
    },
    {
      question: "Hvilke druer har mest tannin?",
      answer:
        "Nebbiolo (Barolo), tannat (Madiran), cabernet sauvignon, syrah/shiraz og malbec er høj-tannin-druer. Pinot noir, gamay og grenache er lav-tannin. Tynde drueskaller giver lav tannin; tykke giver høj.",
    },
  ],
  "sadan-dekanterer-du-vin": [
    {
      question: "Hvornår skal man dekantere vin?",
      answer:
        "Unge kraftige rødvine (ung cabernet, barolo, syrah, malbec) for at lufte tanninerne. Og gamle modne flasker (10+ år) for at skille bundfald fra. Lette røde, hvidvin og bobler dekanteres normalt ikke.",
    },
    {
      question: "Hvor længe skal vinen luftes i karaffel?",
      answer:
        "Unge stramme røde: 30-60 minutter. Modne vine med bundfald: kun 5-10 minutter — de er skrøbelige. Lette delikate vine skal ikke dekanteres, det kan ødelægge subtil profil.",
    },
    {
      question: "Er en karaffel bedre end en aerator?",
      answer:
        "Klassisk karaffel med bred bund maksimerer luftkontakten over tid — bedst til unge tanniner. Aeratorer (flaske-toppe) virker hurtigt men mindre kontrollerbart. Ingen af dem er nødvendige for lette eller modne vine.",
    },
  ],
  "vin-til-konfirmation": [
    {
      question: "Hvilken vin skal man servere til konfirmation?",
      answer:
        "Start med bobler (cava eller crémant) til velkomst og skål. Til frokost og smørrebrød: frisk hvidvin som sauvignon blanc, riesling Kabinett eller albariño. Til aftensmaden (oksesteg, lam): mellemfyldig rødvin som Chianti Classico, Rioja Crianza eller Côtes du Rhône.",
    },
    {
      question: "Hvor meget vin per gæst til konfirmation?",
      answer:
        "Regn med 3/4 til 1 flaske vin per voksen gæst plus 1 glas bobler til velkomst og skål. 30 voksne = ca. 25-30 flasker vin + 5-6 flasker bobler. Køb 10-20 % ekstra og få aftale om returnering af uåbnede flasker.",
    },
    {
      question: "Hvad koster en god konfirmations-vin?",
      answer:
        "Sweet spot er 100-150 kr per flaske: crémant til bobler, Chianti Classico eller Rioja Crianza til rødvin, riesling Kabinett til hvidvin. Stramt budget: 60-90 kr med spansk cava, chilensk hvid og italiensk hverdags-rødvin.",
    },
  ],
  "vin-til-studenterfest": [
    {
      question: "Hvilken bobler skal man drikke til studenterfest?",
      answer:
        "Cava Brut eller Prosecco DOC (70-110 kr) er det praktiske valg — festligt nok, billigt nok til at dele ud og lav alkohol nok til at dagen kan fortsætte. Undgå dyr champagne før klokken 14; gem den til aftenens skål.",
    },
    {
      question: "Hvor meget vin per person til studenterfest?",
      answer:
        "Regn med 1-1,5 flaske vin per gæst plus ekstra bobler til en 8-12 timers dag. 20 gæster = 25-30 flasker. Fordeling: 40 % bobler, 40 % hvid/rosé, 20 % rødvin. Tilføj 20 % buffer — løber I tør, er festen forbi.",
    },
    {
      question: "Skal jeg vælge champagne eller cava til studentervognen?",
      answer:
        "Cava eller prosecco. De tåler bedre at blive rystet på vognen og serveret ukolde. Lavere pris per flaske, stadig fint håndværk. Regn med 1 flaske bobler per 2-3 studenter på vognen — frys nogle ekstra i forvejen som backup-køling.",
    },
  ],
  "vin-til-mors-dag": [
    {
      question: "Hvilken vin er bedst til mors dag?",
      answer:
        "Start med bobler (crémant eller rosé-champagne) til velkomst. Til brunch og laks: frisk hvidvin som Sancerre, Chablis eller tysk riesling Kabinett. Til kage: sød Moscato d'Asti. Rosé fra Provence er et stærkt alternativ hele vejen igennem.",
    },
    {
      question: "Hvilken vin er god som gave til mors dag?",
      answer:
        "Prioriter elegance: en Provence-rosé (150-250 kr), en flot crémant (150-220 kr), en Sancerre (200-300 kr) eller en prestige-champagne (300-500 kr). Tilføj en lille ekstra som blomster eller håndskrevet note — den samlede oplevelse vejer mere end prisen.",
    },
    {
      question: "Hvor meget vin til mors-dag-frokost for 4-8 personer?",
      answer:
        "Regn med 2-4 flasker samlet: 1 flaske bobler til velkomst, 2 flasker hvidvin eller rosé til frokost, og evt. 1 flaske dessertvin eller Moscato d'Asti til kagen. Tilføj 1 ekstra flaske per 3 gæster som buffer.",
    },
  ],
  "vin-til-haveselskab": [
    {
      question: "Hvilken vin er bedst til haveselskab om sommeren?",
      answer:
        "Rosé, frisk hvidvin og bobler er de tre hjørner. Tør Provence-rosé, riesling Kabinett, albariño og cava Brut fungerer alle fremragende. Undgå kraftige rødvine og fadet chardonnay — de føles tunge i solen.",
    },
    {
      question: "Hvor kold skal vinen være til haveselskab?",
      answer:
        "Bobler og hvidvin 6-10 °C. Rosé 8-11 °C. Rødvin 14-16 °C (kort i køleskab før servering) — kold rød er bedre end varm rød ved 25+ grader. Brug iskøler med is og vand, ikke kun is. Hold vinen i skygge — direkte sol i 1 time kan ødelægge friskheden.",
    },
    {
      question: "Kan man drikke rødvin til haveselskab?",
      answer:
        "Ja, men vælg lette, lav-tannin rødvine som gamay (Beaujolais), kølig pinot noir eller Frappato — og køl dem kort til 14-16 °C. Undgå kraftig shiraz, malbec og ung cabernet, der føles klistrede i sommervarme.",
    },
  ],
  "vinregion-bourgogne": [
    {
      question: "Hvad adskiller Bourgogne-vin fra andre franske vine?",
      answer:
        "Bourgogne bygger næsten udelukkende på to druer: pinot noir (rødvin) og chardonnay (hvidvin). Det er desuden hjemstedet for moderne terroir-tænkning — enkelte vinmarker (climats) er klassificeret fra regional og landsby op til premier cru og grand cru, og producentens håndtering af pladsen betyder alt.",
    },
    {
      question: "Hvad er forskellen på premier cru og grand cru i Bourgogne?",
      answer:
        "Grand cru er den absolutte top med 33 specifikke vinmarker (fx Chambertin, Romanée-Conti, Montrachet). Premier cru er niveauet under med omkring 600 klassificerede marker. Begge skal stå på etiketten med markens navn. Landsby og regional ligger under — fx Gevrey-Chambertin eller blot Bourgogne Rouge.",
    },
    {
      question: "Hvad er en god Bourgogne til begyndere?",
      answer:
        "Start med Mâcon-Villages (chardonnay, 100-180 kr) eller Bourgogne Rouge (pinot noir, 150-250 kr) fra en anerkendt producent. Beaujolais-Villages eller Chablis er også gode indgange. Undgå grand cru i starten — du lærer regionen bedst ved at prøve flere landsby- og premier cru-vine først.",
    },
  ],
  "vinregion-bordeaux": [
    {
      question: "Hvad er forskellen på venstre og højre bred i Bordeaux?",
      answer:
        "Venstre bred (Médoc, Graves) har grusjord og er cabernet sauvignon-domineret — klassiske appellationer er Pauillac, Margaux og Saint-Julien. Højre bred (Saint-Émilion, Pomerol) har kalk og ler og er merlot-domineret — giver blødere, rundere vine der kan drikkes tidligere.",
    },
    {
      question: "Hvad betyder klassifikationen fra 1855?",
      answer:
        "Klassifikationen blev lavet til Verdensudstillingen i Paris 1855 og rangerer 61 slotte i Médoc plus Haut-Brion i fem niveauer (1er til 5ème Cru). Listen er næsten uændret siden — kun Mouton Rothschild blev opgraderet til 1. Cru i 1973. De fem 1er Cru er Lafite, Latour, Margaux, Mouton og Haut-Brion.",
    },
    {
      question: "Hvor længe kan Bordeaux-vin lagres?",
      answer:
        "Basal Bordeaux (under 200 kr) drikkes 2-8 år efter årgang. Cru Bourgeois: 5-15 år. Klassificerede châteaux: 10-30 år, ofte længere for stjerne-årgange som 1982, 2005, 2009, 2010, 2015 og 2016. Unge tannin-rige flasker bør dekanteres 30-60 minutter før servering.",
    },
  ],
  "vinregion-champagne": [
    {
      question: "Hvad er forskellen på champagne og anden mousserende vin?",
      answer:
        "Kun mousserende vin fra regionen Champagne i Frankrig kan lovligt kalde sig champagne. Den skal laves med méthode champenoise (flaske-gæring) på de tre hoveddruer chardonnay, pinot noir og pinot meunier. Cava (Spanien) og crémant (Frankrig) bruger samme metode men andre druer og lavere prisniveau.",
    },
    {
      question: "Hvad betyder Brut, Extra Brut og Demi-Sec?",
      answer:
        "Det angiver sødme via tilsat dosage. Brut Nature: 0-3 g/l (tørrest). Extra Brut: 0-6 g/l. Brut: 0-12 g/l (standard). Extra Dry: 12-17 g/l. Sec: 17-32 g/l. Demi-Sec: 32-50 g/l. Doux: over 50 g/l. Brut er langt det mest populære — Demi-Sec bruges til kage og dessert.",
    },
    {
      question: "Hvad er grower champagne (RM)?",
      answer:
        "Grower champagne betyder at samme person både dyrker druerne og laver vinen, i modsætning til de store huse (Moët, Veuve Clicquot, Bollinger) der køber druer fra hundreder af dyrkere. Markeres med RM (Récoltant-Manipulant) på etiketten. Typisk fra én eller få landsbyer, med mere transparens om terroir og mindre produktion.",
    },
  ],
  "vinregion-toscana": [
    {
      question: "Hvad er forskellen på Chianti og Chianti Classico?",
      answer:
        "Chianti Classico kommer fra den historiske kerne mellem Firenze og Siena og markeres med sort hane (Gallo Nero) på flasken. Det kræver min. 80 % sangiovese og har hierarkiet Annata, Riserva og Gran Selezione. Almindelig Chianti kommer fra et større område udenfor Classico-zonen og har oftest blødere stil.",
    },
    {
      question: "Hvad er Brunello di Montalcino?",
      answer:
        "Brunello di Montalcino er Toscanas prestigevinland og laves af 100 % sangiovese grosso fra Montalcino i syd-Toscana. Kræver 5 års modning (2 år i fad) før salg — Riserva kræver 6 år. Kraftig, tanninrig stil med mørke kirsebær, læder og tobak. Pris typisk 400-2000 kr, kan lagres 10-25+ år.",
    },
    {
      question: "Hvad er en Super Tuscan?",
      answer:
        "Super Tuscan er en uofficiel term for kvalitetsvine udenfor DOCG-reglerne, typisk baseret på internationale druer som cabernet sauvignon og merlot — enten alene eller blandet med sangiovese. De mest berømte kommer fra Bolgheri (Sassicaia, Ornellaia, Masseto). De startede bevægelsen i 1970'erne med bordeaux-inspireret stil.",
    },
  ],
  "vinregion-rioja": [
    {
      question: "Hvad betyder Crianza, Reserva og Gran Reserva?",
      answer:
        "Klassifikation efter modningstid: Crianza kræver min. 2 år total modning (1 år i fad), Reserva min. 3 år (1 i fad), Gran Reserva min. 5 år (2 i fad). Gran Reserva laves kun i ekstraordinære årgange. Pris typisk: Crianza 100-200 kr, Reserva 150-400 kr, Gran Reserva 250-1500 kr.",
    },
    {
      question: "Hvad er forskellen på Rioja og Ribera del Duero?",
      answer:
        "Begge baseres på tempranillo, men Rioja er elegant, syrefrisk og balanceret med lidt lavere alkohol (13-14 %), mens Ribera del Duero på 800-1000 m højde er kraftigere og mere struktureret med 14-15 % alkohol. Rioja kan lagres længere; Ribera er typisk mere tilgængelig ung.",
    },
    {
      question: "Hvad er Rioja Alavesa?",
      answer:
        "Rioja Alavesa er en af tre sub-zoner i Rioja og ligger i Baskerland nord for Ebro-floden. Kalkjord og køligere klima giver ofte en moderne, elegant stil. Klassiske producenter: Artadi, Contino, Remelluri og Remírez de Ganuza. De andre zoner er Rioja Alta (vest, klassisk) og Rioja Oriental (syd, kraftig).",
    },
  ],
  "hvor-laenge-holder-uaabnet-vin": [
    {
      question: "Hvor længe kan uåbnet vin holde sig?",
      answer:
        "Hverdagsvin drikkes 1-5 år efter køb og bliver sjældent bedre med alderen. Kvalitetsvine som Rioja Reserva, Chianti Classico Riserva og Bordeaux Cru Bourgeois kan lagres 5-15 år. Top-Bordeaux, Barolo og Bourgogne Grand Cru kan lagre 15-50+ år. Rosé og prosecco bør drikkes inden for 1-2 år.",
    },
    {
      question: "Bliver uåbnet vin bedre med alderen?",
      answer:
        "Kun en lille procentdel af al vin — typisk med høj tannin, høj syre eller høj sødme. Hverdagsvin under 150 kr bliver kun ringere med tiden. Signaler for lagringsevne: høj tannin (cabernet, nebbiolo), høj syre (riesling, nebbiolo) eller høj sødme/alkohol (Sauternes, portvin).",
    },
    {
      question: "Hvordan ved jeg om en flaske er for gammel?",
      answer:
        "Vin har ikke lovpligtig holdbarhedsdato, så du må åbne og smage. Tegn på ældet vin: brun-oransje farve i rødvin, dyb gylden farve i hvidvin, muggen duft fra korken (korkfejl), eddike-/lak-lugt eller flad smag uden frugt.",
    },
  ],
  "hvor-laenge-holder-boks-vin": [
    {
      question: "Hvor længe holder en åben bag-in-box vin?",
      answer:
        "En åbnet bag-in-box vin holder 4-6 uger i køleskab — langt længere end en åbnet flaske. Det skyldes vakuumposen inde i boksen, der trækker sig sammen når vinen tappes og forhindrer ilt i at komme ind. Efter 6-8 uger kan smagen begynde at falde, selv i BiB.",
    },
    {
      question: "Hvor længe kan uåbnet bag-in-box vin holde?",
      answer:
        "En uåbnet BiB holder typisk 6-9 måneder efter produktion — kortere end en flaske, da plastposen ikke er 100 % iltet som glas. Tjek best-before-datoen på boksen før køb.",
    },
    {
      question: "Skal bag-in-box vin stå i køleskab?",
      answer:
        "Efter anbrud er køleskab optimalt, også for rødvin — lad flasken varme kort op før servering. Før anbrud skal BiB bare stå køligt og mørkt (under 18 °C), ikke nødvendigvis i køleskab.",
    },
  ],
  "hvor-meget-alkohol-i-vin": [
    {
      question: "Hvor mange procent alkohol er der i vin?",
      answer:
        "Almindelig vin ligger på 11-15 % alkohol (volumenprocent). Hvidvin typisk 10-13 %, rødvin 12-15 %, mousserende 11-12,5 %, dessertvin 8-13 % og hedvin som portvin og sherry 15-22 %. Alkoholindholdet står på etiketten som '% vol.' og er lovpligtigt i EU.",
    },
    {
      question: "Hvorfor varierer alkoholprocenten i vin?",
      answer:
        "Alkohol kommer fra druens sukker, som gær omdanner. Varmt klima giver mere sukker og mere alkohol; køligt klima giver mindre. Producentens høsttidspunkt påvirker også: sent høstede, overmodne druer giver kraftig vin; tidligt høstede giver friskere stil med lavere alkohol.",
    },
    {
      question: "Hvad er den højeste alkoholprocent i vin?",
      answer:
        "Ikke-styrkede vine topper typisk ved 15-16 % — gæren dør ved højere koncentration. Højere procenter kræver tilsat sprit (fortification), som i portvin (19-22 %), sherry (15-20 %) og madeira (17-22 %). Bemærk: høj alkohol er ikke synonym med kvalitet.",
    },
  ],
  "hvor-mange-enheder-alkohol-i-et-glas-vin": [
    {
      question: "Hvor mange genstande er der i et glas vin?",
      answer:
        "En genstand i Danmark er 12 gram ren alkohol. Et normalt glas vin (12 cl ved 12 % alkohol) er ca. 1 genstand. Et stort glas (15 cl ved 13,5 %) er ca. 1,3 genstand. En hel flaske vin (75 cl ved 12,5 %) svarer til ca. 7,4 genstande.",
    },
    {
      question: "Hvordan beregner man genstande i vin?",
      answer:
        "Formel: (ml × % alkohol × 0,789) ÷ 12 = antal genstande. Eksempel: 15 cl (150 ml) × 13 % × 0,789 ÷ 12 = ca. 1,28 genstand. Tallet 0,789 er alkoholens vægtfylde. Hurtig approksimation: cl × % ÷ 10 = ca. antal genstande.",
    },
    {
      question: "Hvor mange genstande må jeg drikke?",
      answer:
        "Sundhedsstyrelsen anbefaler maks. 10 genstande om ugen for voksne og maks. 4 genstande på én dag — men understreger samtidig at jo mindre du drikker, jo lavere er risikoen. Gravide frarådes alkohol helt.",
    },
  ],
  "hvad-er-sulfit-i-vin": [
    {
      question: "Hvad er sulfit i vin?",
      answer:
        "Sulfit (svovldioxid, SO₂) er et konserveringsmiddel der beskytter vin mod oxidation og mikrobiel aktivitet. 99 % af al vin indeholder sulfit — enten naturligt dannet under gæring (0-40 mg/L) eller tilsat af vinmageren. EU kræver at etiketten viser 'indeholder sulfit' hvis vinen har over 10 mg/L.",
    },
    {
      question: "Giver sulfit hovedpine?",
      answer:
        "Sjældent. Hovedpine efter rødvin skyldes oftere histaminer, dehydrering eller for meget alkohol — ikke sulfit. Reel sulfit-allergi er kun dokumenteret hos 0,5-1 % af befolkningen, primært astmatikere. Tørrede abrikoser indeholder 5-10 gange mere sulfit end vin.",
    },
    {
      question: "Er økologisk vin sulfit-fri?",
      answer:
        "Nej — men har strammere grænser: 100 mg/L for rødvin og 150 mg/L for hvidvin (mod 150 og 200 mg/L for konventionel). Biodynamisk (Demeter) er endnu strengere: 70 mg/L rød, 90 mg/L hvid. Kun 'naturvin' uden tilsat svovl nærmer sig sulfit-fri — men naturlig gæring producerer stadig små mængder.",
    },
  ],
  "hvad-er-fadlagring": [
    {
      question: "Hvad betyder fadlagring på vin?",
      answer:
        "Fadlagring betyder at vinen gærer eller lagres i egetræs-tønder — typisk 225 L barriques eller større foudres. Egetræet afgiver aromaer som vanilje, kokos og krydderier og tillader langsom iltning der blødgør vinen. Nye fade giver kraftigere smagspåvirkning; brugte fade giver kun subtil ilt-effekt.",
    },
    {
      question: "Hvad er forskellen på amerikansk og fransk eg?",
      answer:
        "Amerikansk eg (quercus alba) giver mere vanilje, kokos og dild — klassisk i Rioja, Napa Cab og zinfandel. Fransk eg (quercus robur) giver subtile krydderier som kanel og muskat, finere tannin — brugt i Bordeaux og Bourgogne. Franske fade er 2-3 gange dyrere end amerikanske.",
    },
    {
      question: "Hvor længe lagres vin i fad?",
      answer:
        "Rødvin typisk 6-36 måneder, op til 60 måneder for top som Brunello Riserva og Rioja Gran Reserva. Hvidvin 4-18 måneder. Længere fadlagring betyder ikke altid bedre vin — balancen mellem frugt, fad og struktur er nøglen.",
    },
  ],
  "hvordan-aabner-du-champagne": [
    {
      question: "Hvordan åbner man en champagneflaske trygt?",
      answer:
        "Drej flasken — ikke proppen. Hold proppen fast med én hånd og drej flaskens bund langsomt med den anden. Lad proppen komme ud med et blidt 'suk', ikke et knald. Peg aldrig flasken mod mennesker — proppen kan skyde ud ved 40-80 km/t.",
    },
    {
      question: "Hvor koldt skal champagne være når man åbner det?",
      answer:
        "6-10 °C er ideelt. Koldere flaske har lavere tryk, hvilket gør åbning lettere og forhindrer overdreven skumning. Køl i køleskab 2-3 timer eller i en spand med is og vand i 20 minutter. Undgå fryseren — risiko for at glasset springer.",
    },
    {
      question: "Skal man dreje proppen eller flasken?",
      answer:
        "Flasken. Hold proppen fast og drej flasken med den anden hånd. Det er lettere, sikrere og mere elegant end at dreje proppen. Klassikeren fra champagnehusene er at dreje flaskebunden mens muselet (trådkurven) stadig holder proppen delvist fast.",
    },
  ],
};
