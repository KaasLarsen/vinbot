import type { LandConfig, LandContinent } from "@/lib/lande/types";

export const LANDE: LandConfig[] = [
  {
    slug: "frankrig",
    displayName: "Frankrig",
    continent: "europa",
    teaser: "Champagne til Roussillon: Loire, Bordeaux, Bourgogne, Alsace, Rhône, Provence og mere.",
    title: "Vin fra Frankrig — regioner, stil og forslag | Vinbot",
    description:
      "Frankrig som vinland: kendetegn, klassiske regioner, druer og konkrete søg til danske forhandlere. Bordeaux, Bourgogne, Champagne, Loire, Rhône og mere.",
    introParagraphs: [
      "Frankrig er stadig målestokken for mange stilarter — fra mineralsk chablis til kraftig rhône og festlige champagne-bobler. Etiketten fortæller ofte mere om sted end om drue, så region er et godt startpunkt.",
      "Hos danske forhandlere finder du både hverdagsvine og klassikere. Brug søgningen med franske regionsnavne, eller start med forslagene nedenfor.",
    ],
    kendetegn: [
      "Appellation og sted betyder ofte mere end druenavn på etiketten.",
      "Bred stilskala: let og mineralsk (Loire, Chablis) til kraftig og fadpræget (Bordeaux, Rhône).",
      "Klassiske parringer: fisk og hvid Bourgogne, okse og Bordeaux, fest og Champagne.",
      "God værdi uden for prestige-navne — kig fx Loire, Languedoc og mindre Bordeaux-appellationer.",
    ],
    searchTerms: ["frankrig", "france", "french", "fransk", "franske"],
    primaryQuery: "frankrig",
    wineSuggestions: [
      { title: "Bordeaux og cabernet-merlot", q: "bordeaux" },
      { title: "Bourgogne — pinot og chardonnay", q: "bourgogne" },
      { title: "Champagne og bobler", q: "champagne" },
      { title: "Loire og sancerre", q: "sancerre sauvignon" },
      { title: "Rhône — grenache og syrah", q: "cotes du rhone" },
    ],
    regions: [
      { name: "Bordeaux", q: "bordeaux", guideSlug: "vinregion-bordeaux", note: "Struktur og klassisk cabernet-merlot — okse og langtidsgryder." },
      { name: "Bourgogne", q: "bourgogne", guideSlug: "vinregion-bourgogne", note: "Pinot og chardonnay i høj klasse — fjerkræ, svampe og fisk." },
      { name: "Champagne", q: "champagne", guideSlug: "vinregion-champagne", note: "Bobler til fest, salt og fed ost." },
      { name: "Loire / Sancerre", q: "sancerre sauvignon", guideSlug: "vinregion-loire", note: "Frisk sauvignon og mineralsk hvid — fisk, ged og salater." },
      { name: "Rhône", q: "cotes du rhone", guideSlug: "vinregion-rhone", note: "Grenache/syrah — krydret mad og gryderetter." },
      { name: "Alsace", q: "alsace riesling", guideSlug: "vinregion-alsace", note: "Aromatiske hvide — ost, svinekød og asiatisk." },
      { name: "Provence", q: "provence rosé", note: "Tør, bleg rosé — salat, grill og middelhavsmad." },
    ],
    deepGuideSlug: "vinregion-frankrig",
    drueRegionLinks: [
      { slug: "chardonnay-fra-chablis", label: "Chardonnay fra Chablis" },
      { slug: "pinot-noir-fra-bourgogne", label: "Pinot noir fra Bourgogne" },
      { slug: "sauvignon-blanc-fra-sancerre", label: "Sauvignon blanc fra Sancerre" },
      { slug: "cabernet-sauvignon-fra-bordeaux", label: "Cabernet sauvignon fra Bordeaux" },
      { slug: "syrah-fra-nord-rhone", label: "Syrah fra Nord-Rhône" },
    ],
    faq: [
      {
        question: "Hvad kendetegner fransk vin?",
        answer:
          "Ofte sted og appellation først — stil forventes ud fra region mere end fra et enkelt druenavn. Der er stor forskel mellem fx Loire, Bordeaux og Rhône.",
      },
      {
        question: "Hvilken fransk vin skal jeg starte med?",
        answer:
          "Til hverdag: Côtes du Rhône, Beaujolais eller en god Loire-hvid. Til weekend: Bourgogne eller Bordeaux i det prisleje, du er tryg ved.",
      },
    ],
  },
  {
    slug: "italien",
    displayName: "Italien",
    continent: "europa",
    teaser: "Piemonte, Toscana, Veneto, Syditalien, Sicilien — nebbiolo, sangiovese, aglianico, etna.",
    title: "Vin fra Italien — regioner, stil og forslag | Vinbot",
    description:
      "Italien som vinland: kendetegn, regioner, klassiske druer og søg til danske forhandlere. Chianti, Barolo, Amarone, Etna og mere.",
    introParagraphs: [
      "Italien er et patchwork af lokale druer og madkultur. Fra elegant nebbiolo i nord til vulkansk Etna og solrige syditalienske røde.",
      "På danske hylder er Chianti, Prosecco og Amarone ofte nemme indgange — men der er masser af værdi i mindre kendte DOC’er.",
    ],
    kendetegn: [
      "Stærk kobling mellem lokal mad og lokal vin.",
      "Mange autochtone druer (sangiovese, nebbiolo, nero d’Avola, garganega).",
      "Stil spænder fra let og frisk (Soave, Vermentino) til kraftig og koncentreret (Amarone, Barolo).",
      "God værdi i Syditalien, Abruzzo og mindre toscanske appellationer.",
    ],
    searchTerms: ["italien", "italy", "italian", "italiensk", "italienske", "italiano"],
    primaryQuery: "italien",
    wineSuggestions: [
      { title: "Chianti og Toscana", q: "chianti" },
      { title: "Barolo og Piemonte", q: "barolo" },
      { title: "Amarone og Veneto", q: "amarone" },
      { title: "Prosecco og bobler", q: "prosecco" },
      { title: "Etna og Sicilien", q: "etna nerello" },
    ],
    regions: [
      { name: "Toscana / Chianti", q: "chianti", guideSlug: "vinregion-toscana", note: "Sangiovese og tomat — italiensk hverdag og weekend." },
      { name: "Piemonte", q: "barolo", guideSlug: "vinregion-piemonte", note: "Nebbiolo — kraftige retter og tålmodighed i glasset." },
      { name: "Veneto", q: "valpolicella amarone", guideSlug: "vinregion-veneto", note: "Amarone, ripasso, soave — kraft og elegance." },
      { name: "Sicilien / Etna", q: "etna nerello mascalese", note: "Mineral rød og hvid fra vulkanjord." },
    ],
    deepGuideSlug: "vinregion-italien",
    drueRegionLinks: [
      { slug: "nebbiolo-fra-barolo", label: "Nebbiolo fra Barolo" },
      { slug: "sangiovese-fra-chianti-classico", label: "Sangiovese fra Chianti Classico" },
      { slug: "sangiovese-fra-montalcino", label: "Sangiovese fra Montalcino" },
    ],
    faq: [
      {
        question: "Hvad skal jeg vælge fra Italien til pasta?",
        answer:
          "Tomat-baseret: Chianti eller anden sangiovese. Fløde/svampe: nebbiolo eller barbera. Fisk og skaldyr: Soave, Vermentino eller Etna bianco.",
      },
    ],
  },
  {
    slug: "spanien",
    displayName: "Spanien",
    continent: "europa",
    teaser: "Rioja, Ribera, Priorat, Galicien, sherry og cava — tempranillo, garnacha, albariño.",
    title: "Vin fra Spanien — regioner, stil og forslag | Vinbot",
    description:
      "Spanien som vinland: Rioja, Ribera del Duero, Priorat, sherry og cava. Kendetegn, regioner og søg hos danske forhandlere.",
    introParagraphs: [
      "Spanien byder på både fadmodnet klassik (Rioja), kraftig højlands-tempranillo (Ribera) og frisk kysthvid (Albariño).",
      "Cava og sherry er ofte undervurderede — og Priorat giver mineral og dybde, når budgettet tillader det.",
    ],
    kendetegn: [
      "Tempranillo er rygraden i mange røde — men stil varierer kraftigt mellem regioner.",
      "Fadlagring (crianza, reserva) er en vigtig del af klassisk Rioja-identitet.",
      "Kyst og kølige zoner giver friske hvide; indland og højde giver kraftigere røde.",
      "God værdi i Rioja, Rueda, Bierzo og mange cava’er.",
    ],
    searchTerms: ["spanien", "spain", "spanish", "spansk", "spanske", "espana", "españa"],
    primaryQuery: "spanien",
    wineSuggestions: [
      { title: "Rioja", q: "rioja" },
      { title: "Ribera del Duero", q: "ribera del duero" },
      { title: "Priorat", q: "priorat" },
      { title: "Albariño", q: "albariño rias baixas" },
      { title: "Cava", q: "cava" },
    ],
    regions: [
      { name: "Rioja", q: "rioja", guideSlug: "vinregion-rioja", note: "Tempranillo og fad — tapas, grill og simremad." },
      { name: "Ribera del Duero", q: "ribera del duero tempranillo", guideSlug: "vinregion-ribera-del-duero", note: "Kraftig tempranillo fra højland." },
      { name: "Priorat", q: "priorat garnacha", note: "Kraft og mineral fra skifer." },
      { name: "Jerez / sherry", q: "sherry jerez", note: "Fin sherry til tapas, suppe og ost." },
    ],
    deepGuideSlug: "vinregion-spanien",
    drueRegionLinks: [
      { slug: "tempranillo-fra-rioja", label: "Tempranillo fra Rioja" },
      { slug: "tempranillo-fra-ribera-del-duero", label: "Tempranillo fra Ribera del Duero" },
      { slug: "albarino-fra-rias-baixas", label: "Albariño fra Rías Baixas" },
    ],
    faq: [
      {
        question: "Er Rioja altid fadpræget?",
        answer:
          "Klassisk Rioja er ofte fadmodnet, men der findes også frugtige, mindre fadede stilarter. Kig efter crianza/reserva hvis du vil have den klassiske profil.",
      },
    ],
  },
  {
    slug: "tyskland",
    displayName: "Tyskland",
    continent: "europa",
    teaser: "Mosel, Rheingau, Pfalz, Franken — riesling og spätburgunder, Prädikat og trocken.",
    title: "Vin fra Tyskland — riesling, regioner og forslag | Vinbot",
    description:
      "Tysk vin: Mosel, Rheingau, Pfalz. Riesling, spätburgunder og konkrete søg hos danske forhandlere.",
    introParagraphs: [
      "Tyskland er riesling-landet — fra knastør trocken til sød kabinett. Mosel er det klassiske startpunkt, men Pfalz og Rheingau byder på bredere stil.",
      "Spätburgunder (pinot noir) er i vækst og ofte et godt alternativ til dyr Bourgogne.",
    ],
    kendetegn: [
      "Riesling med høj syre og præcis frugt — tør eller med restsødme.",
      "Køligt klima giver elegance frem for tung alkohol.",
      "Prädikat-systemet (kabinett, spätlese …) fortæller om modenhed — ikke nødvendigvis sødme alene.",
      "God værdi i Mosel, Nahe og Pfalz uden for de dyreste producenter.",
    ],
    searchTerms: ["tyskland", "germany", "german", "tysk", "tyske", "deutschland"],
    primaryQuery: "tyskland riesling",
    wineSuggestions: [
      { title: "Mosel riesling", q: "mosel riesling" },
      { title: "Rheingau riesling", q: "rheingau riesling" },
      { title: "Spätburgunder", q: "spätburgunder pinot noir" },
      { title: "Trocken riesling", q: "riesling trocken" },
    ],
    regions: [
      { name: "Mosel", q: "mosel riesling trocken", guideSlug: "vinregion-mosel", note: "Tysk riesling med syre — asiatisk, fisk og lettere kød." },
      { name: "Rheingau / Pfalz", q: "rheingau riesling", note: "Riesling og spätburgunder — alsidige til både hvid og rød." },
    ],
    deepGuideSlug: "vinregion-tyskland",
    drueRegionLinks: [{ slug: "riesling-fra-mosel", label: "Riesling fra Mosel" }],
    faq: [
      {
        question: "Er tysk riesling altid sød?",
        answer:
          "Nej. Mange moderne flasker er trocken (tør). Kabinett og spätlese kan have restsødme — læs etiketten, eller spørg efter trocken.",
      },
    ],
  },
  {
    slug: "portugal",
    displayName: "Portugal",
    continent: "europa",
    teaser: "Douro, vinho verde, Dão, Bairrada, Alentejo — touriga, baga, portvin.",
    title: "Vin fra Portugal — Douro, vinho verde og forslag | Vinbot",
    description:
      "Portugal som vinland: Douro, Vinho Verde, Alentejo, portvin. Kendetegn, regioner og søg hos danske forhandlere.",
    introParagraphs: [
      "Portugal er ofte undervurderet i forhold til kvalitet pr. krone. Douro leverer strukturerede røde, Vinho Verde frisk hverdagshvid, og Alentejo bredere, frugtige stilarter.",
      "Portvin er klassikeren — men tørre vine fra samme regioner er mindst lige så interessante til mad.",
    ],
    kendetegn: [
      "Mange lokale druer (touriga nacional, arinto, baga, alvarinho).",
      "Douro: struktur og dybde; Vinho Verde: friskhed og lav alkohol.",
      "Stærk madparring til grill, fisk og portugisiske klassikere.",
      "Ofte god værdi sammenlignet med naboregioner i Spanien og Frankrig.",
    ],
    searchTerms: ["portugal", "portugisisk", "portugisiske", "portuguese", "portugis"],
    primaryQuery: "portugal",
    wineSuggestions: [
      { title: "Douro rød", q: "douro touriga" },
      { title: "Vinho Verde", q: "vinho verde" },
      { title: "Alentejo", q: "alentejo" },
      { title: "Portvin", q: "portvin tawny" },
    ],
    regions: [
      { name: "Douro", q: "douro touriga nacional", note: "Struktureret rød og portvinens hjemstavn." },
      { name: "Vinho Verde", q: "vinho verde alvarinho", note: "Frisk, lav alkohol — fisk, salat og frokost." },
      { name: "Alentejo", q: "alentejo", note: "Frugtige røde og hvide — grill og hverdag." },
    ],
    deepGuideSlug: "vinregion-portugal",
    faq: [
      {
        question: "Er portugisisk vin kun portvin?",
        answer:
          "Nej. Port er ikonisk, men tørre vine fra Douro, Dão, Bairrada og Alentejo er i høj kurs — og ofte stærke til prisen.",
      },
    ],
  },
  {
    slug: "oestrig",
    displayName: "Østrig",
    continent: "europa",
    teaser: "Wachau, Kamptal, Burgenland — grüner veltliner, riesling og blaufränkisch.",
    title: "Vin fra Østrig — grüner, regioner og forslag | Vinbot",
    description:
      "Østrigsk vin: Wachau, grüner veltliner, riesling og blaufränkisch. Kendetegn og søg hos danske forhandlere.",
    introParagraphs: [
      "Østrig er synonym med præcis, mineralsk hvidvin — især grüner veltliner og riesling fra Donau-dalene.",
      "Til rød er blaufränkisch og zweigelt spændende alternativer til de store klassikere.",
    ],
    kendetegn: [
      "Høj syre, ren frugt og ofte tør stil.",
      "Grüner veltliner: peber, citrus og madvenlighed.",
      "Wachau-klassifikation (Steinfeder, Federspiel, Smaragd) fortæller om intensitet.",
      "God værdi uden for de mest prestigefyldte Wachau-flasker.",
    ],
    searchTerms: ["oestrig", "østrig", "austria", "austrian", "østrigsk", "oestrigsk", "osterreich"],
    primaryQuery: "østrig gruner",
    wineSuggestions: [
      { title: "Grüner veltliner", q: "grüner veltliner" },
      { title: "Wachau", q: "wachau riesling" },
      { title: "Blaufränkisch", q: "blaufränkisch" },
    ],
    regions: [
      { name: "Wachau", q: "wachau gruner veltliner", note: "Grüner og riesling på terrasser — alsidig hvid." },
      { name: "Kamptal / Kremstal", q: "kamptal gruner veltliner", note: "Frisk grüner — fisk, asparges og lette retter." },
    ],
    deepGuideSlug: "vinregion-europa-central-og-oest",
    faq: [
      {
        question: "Hvornår vælger jeg østrigsk vin?",
        answer:
          "Når du vil have frisk, tør hvid til fisk, asparges eller asiatisk — eller en peberagtig grüner til hverdagsmad.",
      },
    ],
  },
  {
    slug: "schweiz",
    displayName: "Schweiz",
    continent: "europa",
    teaser: "Valais, Vaud og Genève — chasselas, pinot noir og alpine hvide.",
    title: "Vin fra Schweiz — chasselas, regioner og forslag | Vinbot",
    description:
      "Schweizisk vin: Valais, Vaud, chasselas, pinot noir og Ticino-merlot. Kendetegn, regioner, madparring og søg hos danske forhandlere.",
    introParagraphs: [
      "Schweiz er et alpint vinland med stejl dyrkning og ofte høje omkostninger — derfor ser du færre flasker på danske hylder end fra Frankrig, Italien eller Østrig. Når de dukker op hos specialforhandlere, er de typisk rene, præcise og mere madvenlige end mange forventer.",
      "Chasselas (ofte solgt som Fendant i Valais) er den lokale hvids signatur: let, mineralsk og uden tung fad. Pinot noir præger mange røde i nord og vest; i det italiensktalende Ticino er merlot den klare hovedrolle.",
      "Prislejet ligger ofte i det øvre segment. Brug schweizisk vin bevidst — til ostebord, fisk eller når du vil smage noget, der ikke ligner de klassiske eksportlande. Start med chasselas eller en kølig pinot, før du går efter de dyreste kultflasker.",
    ],
    kendetegn: [
      "Køligt, alpint klima — elegance og syre frem for tung, solmoden frugt.",
      "Chasselas / Fendant: let, mineralsk hvid — god til fisk, ost og fondue-agtige retter.",
      "Små mængder og høj produktionspris — meget drikkes i Schweiz, lidt eksporteres.",
      "Valais er det største område; Vaud (Lavaux) er UNESCO-terrasser ved Genèvesøen.",
      "Ticino giver merlot i køligere, mere struktureret stil end mange nye verdens-merlot’er.",
      "Lokale specialty-druer (fx petite arvine, amigne) dukker op hos nysgerrige importører.",
    ],
    searchTerms: ["schweiz", "switzerland", "swiss", "schweizisk", "schweiziske", "suisse"],
    primaryQuery: "schweiz chasselas",
    wineSuggestions: [
      { title: "Chasselas / Fendant", q: "chasselas fendant" },
      { title: "Schweizisk pinot noir", q: "schweiz pinot noir" },
      { title: "Valais", q: "valais wine" },
      { title: "Ticino merlot", q: "ticino merlot" },
      { title: "Petite arvine", q: "petite arvine" },
    ],
    regions: [
      {
        name: "Valais",
        q: "valais chasselas",
        note: "Største kanton langs Rhône — Fendant, pinot noir og lokale specialty-druer som petite arvine.",
      },
      {
        name: "Vaud / Lavaux",
        q: "vaud lavaux",
        note: "Terrasser ved Genèvesøen (UNESCO) — mineralsk chasselas med sø-påvirkning.",
      },
      {
        name: "Genève",
        q: "geneve wine",
        note: "Bredere sortiment tæt på byen — gamay, chasselas og internationale druer.",
      },
      {
        name: "Ticino",
        q: "ticino merlot",
        note: "Italiensktalende syd — merlot i kølig, struktureret stil til kød og pasta.",
      },
    ],
    deepGuideSlug: "vinregion-europa-central-og-oest",
    faq: [
      {
        question: "Hvorfor er schweizisk vin dyr?",
        answer:
          "Stejl dyrkning, høje lønninger og lille eksport betyder, at meget drikkes hjemme. Når flaskerne når Danmark, ligger de ofte i det øvre prisleje — vælg bevidst til mad eller nysgerrighed.",
      },
      {
        question: "Hvad er Fendant?",
        answer:
          "Fendant er navnet på chasselas fra Valais — en let, tør hvidvin. God til ost, fisk og lettere schweiziske/alpine retter.",
      },
      {
        question: "Hvad skal jeg starte med fra Schweiz?",
        answer:
          "Chasselas/Fendant til fisk og ost, eller en pinot noir fra Valais/Vaud til fjerkræ og svampe. Ticino-merlot er et godt næste skridt, hvis du vil have mere krop.",
      },
      {
        question: "Findes schweizisk vin hos danske forhandlere?",
        answer:
          "Ja, men sortimentet er smalt og skifter. Brug vinsøgningen med ord som chasselas, Valais eller schweiz — og sammenlign pris med østrigsk eller tysk kvalitet i samme leje.",
      },
    ],
  },
  {
    slug: "ungarn",
    displayName: "Ungarn",
    continent: "europa",
    teaser: "Tokaj, furmint og egri bikavér — sød klassik og moderne tørre vine.",
    title: "Vin fra Ungarn — Tokaj, furmint og forslag | Vinbot",
    description:
      "Ungarsk vin: Tokaj, furmint og røde fra Eger. Kendetegn og søg hos danske forhandlere.",
    introParagraphs: [
      "Ungarn er mest kendt for Tokaj — men furmint i tør stil og klassiske blends som egri bikavér er værd at kigge efter.",
    ],
    kendetegn: [
      "Tokaj: botrytis, sødme og syre i balance.",
      "Furmint: høj syre, god til både sød og tør stil.",
      "Historisk vinkultur med moderne comeback på eksportmarkeder.",
    ],
    searchTerms: ["ungarn", "hungary", "hungarian", "ungarsk", "magyar"],
    primaryQuery: "tokaj furmint",
    wineSuggestions: [
      { title: "Tokaj", q: "tokaj" },
      { title: "Furmint", q: "furmint" },
      { title: "Egri bikavér", q: "egri bikaver" },
    ],
    regions: [
      { name: "Tokaj", q: "tokaj", note: "Sød klassik og moderne tør furmint." },
      { name: "Eger", q: "egri bikaver", note: "Røde blends — grill og simremad." },
    ],
    deepGuideSlug: "vinregion-europa-central-og-oest",
    faq: [
      {
        question: "Er Tokaj kun sød?",
        answer:
          "Den klassiske aszú er sød, men der produceres også tør furmint fra samme område — god til fisk og asiatisk.",
      },
    ],
  },
  {
    slug: "georgien",
    displayName: "Georgien",
    continent: "europa",
    teaser: "Qvevri, saperavi og orangevin — en af verdens ældste vinkulturer.",
    title: "Vin fra Georgien — saperavi, qvevri og forslag | Vinbot",
    description:
      "Georgisk vin: saperavi, qvevri og orangevin. Kendetegn og søg hos danske forhandlere.",
    introParagraphs: [
      "Georgien kaldes ofte vinens vugge. Qvevri-metoden (lagring i lerkrukker) giver karakteristiske orangevine og rustikke røde.",
    ],
    kendetegn: [
      "Saperavi: mørk, saftig rød med god syre.",
      "Qvevri / kvevri: traditionel lagring i ler — ofte skin-contact hvide (orangevin).",
      "Autentisk, madvenlig stil der skiller sig ud fra europæiske klassikere.",
    ],
    searchTerms: ["georgien", "georgia", "georgian", "georgisk", "qvevri", "kvevri"],
    primaryQuery: "saperavi georgien",
    wineSuggestions: [
      { title: "Saperavi", q: "saperavi" },
      { title: "Qvevri / orangevin", q: "qvevri orangevin" },
    ],
    regions: [
      { name: "Kakheti", q: "saperavi kakheti", note: "Hjerte af georgisk vinproduktion." },
    ],
    deepGuideSlug: "vinregion-europa-central-og-oest",
    faq: [
      {
        question: "Hvad er qvevri-vin?",
        answer:
          "Vin gæret og/eller lagret i store lerkrukker gravet ned i jorden. Ofte giver det mere tekstur og tannin i hvide vine (orangevin).",
      },
    ],
  },
  {
    slug: "graekenland",
    displayName: "Grækenland",
    continent: "europa",
    teaser: "Assyrtiko, moschofilero og ø-røde — salt fisk, grønt og græsk middagsmad.",
    title: "Vin fra Grækenland — assyrtiko, regioner og forslag | Vinbot",
    description:
      "Græsk vin: Santorini assyrtiko, Naoussa xinomavro, moschofilero og ø-røde. Kendetegn, madparring og søg hos danske forhandlere.",
    introParagraphs: [
      "Grækenland har fået et tydeligt kvalitetsløft de seneste år. Det er ikke længere kun «ferievin»: mineralsk assyrtiko fra Santorini er den internationale stjerne, og flere lokale druer dukker op hos danske forhandlere.",
      "Klimaet er middelhavsk, men højde, vind og vulkansk jord giver friskhed. På øerne er stil ofte salt, citrusagtig og tør; på fastlandet (fx Naoussa i nord) finder du mere strukturerede røde som xinomavro.",
      "Til græsk mad er valget ofte ligetil: fisk, salat og citron kalder på assyrtiko; grill, lam og krydrede retter på xinomavro eller en frisk rosé fra Peloponnes. Moschofilero er det aromatiske, lettere hvide valg.",
    ],
    kendetegn: [
      "Assyrtiko: høj syre, mineralitet, salt finish — ideel til fisk og skaldyr.",
      "Lokale druer frem for rene internationale kopi-stilarter.",
      "Santorini: vulkanjord og vind — koncentreret, tør hvid med lang finish.",
      "Xinomavro (nord): struktur, syre og alderingspotentiale — tænk «græsk nebbiolo-agtig».",
      "Moschofilero: blomstret, let hvid — god til mezze og sommer.",
      "God værdi uden for de dyreste Santorini-etiketter — kig Peloponnes og fastlandet.",
    ],
    searchTerms: ["graekenland", "grækenland", "greece", "greek", "græsk", "graesk"],
    primaryQuery: "assyrtiko santorini",
    wineSuggestions: [
      { title: "Assyrtiko", q: "assyrtiko" },
      { title: "Santorini", q: "santorini" },
      { title: "Moschofilero", q: "moschofilero" },
      { title: "Xinomavro", q: "xinomavro" },
      { title: "Agiorgitiko", q: "agiorgitiko" },
    ],
    regions: [
      {
        name: "Santorini",
        q: "assyrtiko santorini",
        note: "Vulkanjord og saltsprøjt — den klare top for assyrtiko til fisk og skaldyr.",
      },
      {
        name: "Naoussa / Makedonien",
        q: "xinomavro naoussa",
        note: "Xinomavro med struktur og syre — lam, grill og simrede retter.",
      },
      {
        name: "Peloponnes",
        q: "agiorgitiko nemea",
        note: "Agiorgitiko og moschofilero — frugtige røde og aromatiske hvide til hverdag.",
      },
      {
        name: "Kreta",
        q: "crete wine",
        note: "Ø-vin med både friske hvide og mørkere røde — madvenlig middelhavsstil.",
      },
    ],
    faq: [
      {
        question: "Hvad drikker jeg til græsk mad?",
        answer:
          "Fisk, salat og citron: assyrtiko. Mezze og sommer: moschofilero eller tør rosé. Grill, lam og krydderier: xinomavro eller agiorgitiko.",
      },
      {
        question: "Er al assyrtiko fra Santorini?",
        answer:
          "Nej. Santorini er det mest berømte udtryk, men assyrtiko dyrkes også andre steder. Santorini er typisk mere mineralsk og koncentreret — og ofte dyrere.",
      },
      {
        question: "Er græsk vin kun til ferieminder?",
        answer:
          "Ikke længere. Moderne græsk vin er præcis, tør og drue-drevet. Start med assyrtiko eller xinomavro, hvis du vil se, hvor langt kvaliteten er kommet.",
      },
      {
        question: "Hvad ligner xinomavro?",
        answer:
          "Mange sammenligner den med nebbiolo: høj syre, tannin og rød frugt. Den er mere mad end «blød sofa-rød» — giv den luft og server til kraftigere retter.",
      },
    ],
  },
  {
    slug: "england",
    displayName: "England",
    continent: "europa",
    teaser: "Køligt klima og mousserende i vækst — god til skaldyr, ost og lette forretter.",
    title: "Vin fra England — sparkling, regioner og forslag | Vinbot",
    description:
      "Engelsk vin: sparkling wine fra Sussex og Kent, champagne-metode og kølig stil. Kendetegn, madparring og søg hos danske forhandlere.",
    introParagraphs: [
      "England har haft medvind på mousserende vin. Køligt klima, kridtholdig jord i sydøst og samme klassiske druer som Champagne (chardonnay, pinot noir, pinot meunier) giver bobler med høj syre og elegant frugt.",
      "Still wine findes også — især hvide og pinot — men sparkling er det, de fleste danske forhandlere importerer, og det, der får anmelderroser. Forvent premium-pris: engelsk sparkling konkurrerer ofte med champagne mere end med cava.",
      "Vælg engelsk sparkling til skaldyr, røget laks, blød ost eller som gave, når du vil have noget genkendeligt «champagne-agtigt» med britisk præg. Til hverdagsbobler er crémant og cava stadig bedre værdi.",
    ],
    kendetegn: [
      "Fokus på sparkling: chardonnay, pinot noir, pinot meunier — ofte traditionel metode.",
      "Høj syre, fine bobler og kølig citrus/æble-frugt.",
      "Kridt og køligt klima i Sussex/Kent minder om Champagne-forhold.",
      "Ofte premium-pris — vælg bevidst til fest, gave eller smagning.",
      "Still wines er niche i DK; boblerne er hovedattraktionen.",
      "Brut og blanc de blancs er de mest almindelige stilarter på hylden.",
    ],
    searchTerms: ["england", "english", "engelsk", "britisk", "britiske"],
    primaryQuery: "english sparkling",
    wineSuggestions: [
      { title: "English sparkling", q: "english sparkling wine" },
      { title: "Engelsk champagne-metode", q: "english sparkling brut" },
      { title: "Blanc de blancs", q: "english blanc de blancs" },
      { title: "Engelsk rosé sparkling", q: "english sparkling rose" },
    ],
    regions: [
      {
        name: "Sussex",
        q: "sussex sparkling",
        note: "Et af kerneområderne for britisk mousserende — kridt, kølighed og klassiske druer.",
      },
      {
        name: "Kent",
        q: "kent english sparkling",
        note: "Sydøstengland — mange nye vineyards med fokus på sparkling.",
      },
      {
        name: "Hampshire / øvrige syd",
        q: "english sparkling wine",
        note: "Flere counties i syd bidrager — stil er typisk mere region «England» end ét navn.",
      },
    ],
    faq: [
      {
        question: "Kan engelsk sparkling erstatte champagne?",
        answer:
          "Stilmæssigt ofte ja — samme druer og metode. Prisen er dog typisk i det øvre leje, så sammenlign med crémant og cava, hvis budgettet er stramt.",
      },
      {
        question: "Hvorfor smager engelsk sparkling som champagne?",
        answer:
          "Klima, jord (ofte kridt) og traditionel metode med de samme tre druer. Resultatet er høj syre og fine bobler — ikke den søde «party-prosecco»-profil.",
      },
      {
        question: "Findes der engelsk still wine værd at købe?",
        answer:
          "Ja, men udvalget i Danmark er lille. Hvis du ser en engelsk chardonnay eller pinot, er det typisk kølig og elegant — men sparkling er det sikreste udgangspunkt.",
      },
      {
        question: "Hvornår er engelsk sparkling pengene værd?",
        answer:
          "Til fest, gave eller når du vil smage noget tæt på champagne uden at gå efter et fransk prestige-label. Til ugentlig boble er billigere alternativer oftere smartere.",
      },
    ],
  },
  {
    slug: "kroatien",
    displayName: "Kroatien",
    continent: "europa",
    teaser: "Dalmatiske kyster — kraftige røde og friske hvide til fisk og lam.",
    title: "Vin fra Kroatien — plavac mali og forslag | Vinbot",
    description:
      "Kroatisk vin: Dalmatien, plavac mali og friske hvide. Kendetegn og søg hos danske forhandlere.",
    introParagraphs: [
      "Kroatien byder på solrige kystvine og indlandsfriskhed. Plavac mali er den mest kendte røde; malvazija og graševina er gode hvide valg.",
    ],
    kendetegn: [
      "Middelhavsklima langs Adriaterhavet.",
      "Plavac mali: kraftig, mørk rød — ofte til lam og grill.",
      "Hvide med citrus og urter til fisk og skaldyr.",
    ],
    searchTerms: ["kroatien", "croatia", "croatian", "kroatisk"],
    primaryQuery: "plavac mali croatia",
    wineSuggestions: [
      { title: "Plavac mali", q: "plavac mali" },
      { title: "Malvazija", q: "malvazija" },
    ],
    regions: [
      { name: "Dalmatien", q: "plavac mali croatia", note: "Kystnære røde — grill og lam." },
    ],
    faq: [
      {
        question: "Ligner kroatisk vin italiensk?",
        answer:
          "Delvist i klima og madkultur, men druerne er lokale. Forvent mere solmoden frugt i dalmatiske røde end i norditalienske klassikere.",
      },
    ],
  },
  {
    slug: "usa",
    displayName: "USA",
    continent: "amerika",
    teaser: "Napa, Sonoma, Willamette, Washington — cabernet, pinot, zinfandel.",
    title: "Vin fra USA — Napa, Oregon og forslag | Vinbot",
    description:
      "Amerikansk vin: Napa Valley, Sonoma, Willamette. Cabernet, pinot noir og søg hos danske forhandlere.",
    introParagraphs: [
      "USA dækker mange klimaer. Californien er frugt og sol; Oregon (Willamette) er køligere pinot; Washington giver både cabernet og riesling.",
    ],
    kendetegn: [
      "Ofte drue-først på etiketten (cabernet, pinot noir, chardonnay).",
      "Californien: moden frugt, mere alkohol; Oregon: elegant, køligere stil.",
      "Zinfandel som amerikansk signatur — krydret og saftig.",
      "Priserne kan være høje på kultnavne — kig efter AVA’er uden for Napa til værdi.",
    ],
    searchTerms: ["usa", "america", "american", "amerikansk", "californien", "california"],
    primaryQuery: "napa cabernet",
    wineSuggestions: [
      { title: "Napa cabernet", q: "napa valley cabernet" },
      { title: "Oregon pinot", q: "willamette pinot noir" },
      { title: "Zinfandel", q: "zinfandel" },
      { title: "Californisk chardonnay", q: "california chardonnay" },
    ],
    regions: [
      { name: "Napa Valley", q: "napa valley cabernet", guideSlug: "vinregion-napa-valley", note: "Kraftig cabernet — grill, okse og fest." },
      { name: "Willamette Valley", q: "willamette valley pinot noir", note: "Oregon pinot — laks, svampe og fjerkræ." },
      { name: "Sonoma", q: "sonoma pinot chardonnay", note: "Bredt sortiment — fra kølig kyst til varme dale." },
    ],
    deepGuideSlug: "vinregion-usa",
    drueRegionLinks: [
      { slug: "cabernet-sauvignon-fra-napa-valley", label: "Cabernet sauvignon fra Napa Valley" },
      { slug: "pinot-noir-fra-willamette-valley", label: "Pinot noir fra Willamette Valley" },
    ],
    faq: [
      {
        question: "Er amerikansk vin altid kraftig?",
        answer:
          "Californisk cabernet og chardonnay kan være det, men Oregon pinot og kølige kystzoner er mere elegante. Læs region, ikke kun «USA».",
      },
    ],
  },
  {
    slug: "canada",
    displayName: "Canada",
    continent: "amerika",
    teaser: "Okanagan og Niagara — kølig pinot, chardonnay og icewine.",
    title: "Vin fra Canada — Okanagan, icewine og forslag | Vinbot",
    description:
      "Canadisk vin: Okanagan Valley, Niagara Peninsula, pinot noir, chardonnay og icewine. Kendetegn, madparring og søg hos danske forhandlere.",
    introParagraphs: [
      "Canada er et køligt vinland med to hovedscener: Okanagan Valley i British Columbia og Niagara Peninsula i Ontario. Klimaet giver høj syre, ren frugt og lavere alkohol end solrige New World-lande — stilmæssigt tættere på Oregon eller Tyskland end på Californien.",
      "Icewine er det internationale ikon (ofte vidal eller riesling), men still wines fra Okanagan er ofte det mest spændende til hverdagsmad: pinot noir, chardonnay og enkelte kølige syrah’er. Niagara leverer både icewine og friske hvide.",
      "I danske butikker er udvalget begrænset, men når flaskerne er der, er de værd at prøve — især hvis du kan lide elegant pinot eller vil have en sød dessertvin med syre, der ikke bare er «klam sød».",
    ],
    kendetegn: [
      "Køligt klima — høj syre, ren frugt, lavere alkohol end varme New World-lande.",
      "Okanagan: ørkenagtig dal med sø-påvirkning — pinot noir, chardonnay, syrah i kølig stil.",
      "Niagara: icewine (vidal, riesling) plus friske hvide og enkelte røde.",
      "Stilmæssigt tættere på Oregon/Tyskland end på Napa.",
      "Icewine: intens sødme balanceret af syre — dessert, blåost, foie-agtige retter.",
      "Sortimentet i DK er smalt — søg på Okanagan, Niagara eller icewine.",
    ],
    searchTerms: ["canada", "canadian", "canadisk", "canadiske"],
    primaryQuery: "okanagan pinot noir",
    wineSuggestions: [
      { title: "Okanagan pinot", q: "okanagan pinot noir" },
      { title: "Canadisk chardonnay", q: "okanagan chardonnay" },
      { title: "Icewine", q: "icewine canada" },
      { title: "Niagara riesling", q: "niagara riesling" },
      { title: "Canadisk syrah", q: "okanagan syrah" },
    ],
    regions: [
      {
        name: "Okanagan Valley",
        q: "okanagan pinot noir",
        note: "British Columbia — pinot, chardonnay og elegant rød; den vigtigste still-wine scene.",
      },
      {
        name: "Niagara Peninsula",
        q: "niagara icewine",
        note: "Ontario — icewine, riesling og kølige hvide tæt på søen.",
      },
      {
        name: "Prince Edward County",
        q: "prince edward county pinot",
        note: "Ontario — kølig pinot og chardonnay; mere niche i eksport.",
      },
    ],
    faq: [
      {
        question: "Er canadisk vin kun icewine?",
        answer:
          "Icewine er det mest kendte eksportprodukt, men Okanagan og Niagara laver også stærke tørre vine — især pinot noir og chardonnay i kølig stil.",
      },
      {
        question: "Hvornår vælger jeg canadisk vin?",
        answer:
          "Når du vil have kølig elegance (laks, svampe, fjerkræ) eller en sød icewine til dessert og blåost.",
      },
      {
        question: "Hvad er forskellen på Okanagan og Niagara?",
        answer:
          "Okanagan er bedst kendt for tørre vine i elegant stil. Niagara er især stærk på icewine og friske hvide — begge er kølige, men fokus er forskelligt.",
      },
      {
        question: "Hvordan serverer jeg icewine?",
        answer:
          "Koldt, i små glas, til dessert eller kraftig ost. Syren holder sødmen i skak — det er derfor icewine ofte fungerer bedre end mange søde vine uden friskhed.",
      },
    ],
  },
  {
    slug: "chile",
    displayName: "Chile",
    continent: "amerika",
    teaser: "Andes, kølig kyst og Central Valley — carménère, cabernet og chardonnay.",
    title: "Vin fra Chile — carménère, regioner og forslag | Vinbot",
    description:
      "Chilensk vin: carménère, cabernet og kyst-chardonnay. Kendetegn og søg hos danske forhandlere.",
    introParagraphs: [
      "Chile giver ofte god værdi: solrige dale, kølige kyststrøg og Andes som naturlig barriere. Carménère er signaturdruen.",
    ],
    kendetegn: [
      "Carménère: grøn peber, mørk frugt — typisk chilensk.",
      "Bredt spektrum fra budget til premium cabernet.",
      "Kystdale (Casablanca, Limarí) giver friskere hvide og pinot.",
    ],
    searchTerms: ["chile", "chilensk", "chilenske", "chilean"],
    primaryQuery: "chile carmenere",
    wineSuggestions: [
      { title: "Carménère", q: "chile carmenere" },
      { title: "Chilensk cabernet", q: "chile cabernet" },
      { title: "Casablanca chardonnay", q: "casablanca chardonnay" },
    ],
    regions: [
      { name: "Central Valley", q: "chile carmenere", note: "Carménère, cabernet — grill og hverdag." },
      { name: "Casablanca / Limarí", q: "casablanca chardonnay", note: "Kølig kyst — friske hvide." },
    ],
    deepGuideSlug: "vinregion-chile-argentina",
    drueRegionLinks: [
      { slug: "cabernet-sauvignon-fra-maipo-valley", label: "Cabernet sauvignon fra Maipo Valley" },
    ],
    faq: [
      {
        question: "Hvad er carménère?",
        answer:
          "En bordeaux-drue der fandt hjem i Chile. Forvent mørk frugt, urter og ofte en pebernote — god til grill.",
      },
    ],
  },
  {
    slug: "argentina",
    displayName: "Argentina",
    continent: "amerika",
    teaser: "Mendoza og malbec — højland, intens frugt og grillvenlige røde.",
    title: "Vin fra Argentina — malbec, Mendoza og forslag | Vinbot",
    description:
      "Argentinsk vin: Mendoza malbec, torrontés og højlandsvine. Kendetegn og søg hos danske forhandlere.",
    introParagraphs: [
      "Argentina er malbec-landet. Højde i Mendoza giver intens farve, moden frugt og bløde tanniner — perfekt til grill og okse.",
    ],
    kendetegn: [
      "Malbec som national signatur — saftig, mørk og madvenlig.",
      "Højde (ofte 1000+ m) giver friskhed trods sol.",
      "Torrontés: aromatisk hvid til krydret og asiatisk mad.",
    ],
    searchTerms: ["argentina", "argentinsk", "argentinske", "argentine"],
    primaryQuery: "malbec mendoza",
    wineSuggestions: [
      { title: "Mendoza malbec", q: "malbec mendoza" },
      { title: "Torrontés", q: "torrontes argentina" },
      { title: "Argentinsk cabernet", q: "argentina cabernet" },
    ],
    regions: [
      { name: "Mendoza", q: "malbec mendoza", note: "Argentinsk malbec — BBQ, okse og simreret." },
      { name: "Salta / højland", q: "torrontes salta", note: "Aromatisk hvid fra ekstrem højde." },
    ],
    deepGuideSlug: "vinregion-chile-argentina",
    drueRegionLinks: [{ slug: "malbec-fra-mendoza", label: "Malbec fra Mendoza" }],
    faq: [
      {
        question: "Er al malbec ens?",
        answer:
          "Nej. Entry-level er blød og frugtig; højere flasker fra Uco Valley kan være mere strukturerede og mineralske.",
      },
    ],
  },
  {
    slug: "uruguay",
    displayName: "Uruguay",
    continent: "amerika",
    teaser: "Tannat og atlantisk klima — grill, okse og kraftige saucer.",
    title: "Vin fra Uruguay — tannat og forslag | Vinbot",
    description:
      "Uruguayansk vin: tannat og atlantisk klima. Kendetegn og søg hos danske forhandlere.",
    introParagraphs: [
      "Uruguay er lille, men tydelig: tannat er signaturdruen, og Atlanterhavet holder klimaet mere tempereret end i indlandet.",
    ],
    kendetegn: [
      "Tannat: mørk, tanninrig rød — blødgøres ofte med fad og blending.",
      "Atlantisk påvirkning giver friskhed.",
      "God til kraftig mad og grill.",
    ],
    searchTerms: ["uruguay", "uruguayansk"],
    primaryQuery: "tannat uruguay",
    wineSuggestions: [
      { title: "Tannat", q: "tannat uruguay" },
    ],
    regions: [
      { name: "Canelones / Maldonado", q: "tannat uruguay", note: "Kerneområder for uruguayansk tannat." },
    ],
    faq: [
      {
        question: "Hvordan er tannat i forhold til malbec?",
        answer:
          "Tannat er typisk mere tanninrig og robust; malbec er blødere og mere umiddelbart frugtig. Begge elsker grill.",
      },
    ],
  },
  {
    slug: "australien",
    displayName: "Australien",
    continent: "afrika-oceanien",
    teaser: "Barossa, Margaret River — shiraz, riesling og cabernet.",
    title: "Vin fra Australien — shiraz, regioner og forslag | Vinbot",
    description:
      "Australsk vin: Barossa shiraz, Margaret River cabernet og Clare Valley riesling. Kendetegn og søg hos danske forhandlere.",
    introParagraphs: [
      "Australien spænder fra varm Barossa-shiraz til køligere Margaret River og elegante riesling fra Clare/Eden Valley.",
    ],
    kendetegn: [
      "Shiraz (syrah) som nationalt ikon — ofte moden og krydret.",
      "Store regionale forskelle: varm indland vs. kølig kyst.",
      "Clare Valley riesling: tør, citrus og petroleum med alder.",
    ],
    searchTerms: ["australien", "australia", "australian", "australsk"],
    primaryQuery: "barossa shiraz",
    wineSuggestions: [
      { title: "Barossa shiraz", q: "barossa shiraz" },
      { title: "Margaret River cabernet", q: "margaret river cabernet" },
      { title: "Clare Valley riesling", q: "clare valley riesling" },
    ],
    regions: [
      { name: "Barossa", q: "barossa shiraz", note: "Koncentreret shiraz — røget kød og kraftige saucer." },
      { name: "Margaret River", q: "margaret river cabernet", note: "Elegant cabernet og chardonnay." },
      { name: "Clare Valley", q: "clare valley riesling", note: "Tør riesling — fisk og asiatisk." },
    ],
    deepGuideSlug: "vinregion-australien-new-zealand",
    drueRegionLinks: [
      { slug: "syrah-fra-barossa-valley", label: "Shiraz fra Barossa Valley" },
      { slug: "chardonnay-fra-margaret-river", label: "Chardonnay fra Margaret River" },
      { slug: "riesling-fra-clare-valley", label: "Riesling fra Clare Valley" },
    ],
    faq: [
      {
        question: "Er australsk shiraz altid tung?",
        answer:
          "Barossa kan være det. Køligere områder og moderne stilarter er mere elegante — kig efter region, ikke kun «shiraz».",
      },
    ],
  },
  {
    slug: "new-zealand",
    displayName: "New Zealand",
    continent: "afrika-oceanien",
    teaser: "Marlborough og Central Otago — sauvignon blanc og pinot noir.",
    title: "Vin fra New Zealand — sauvignon, pinot og forslag | Vinbot",
    description:
      "Nyzealandsk vin: Marlborough sauvignon blanc og Central Otago pinot noir. Kendetegn og søg hos danske forhandlere.",
    introParagraphs: [
      "New Zealand er verdenskendt for intens sauvignon blanc fra Marlborough — og for kølig, frugtig pinot noir fra Central Otago.",
    ],
    kendetegn: [
      "Sauvignon blanc: passionsfrugt, stikkelsbær, urter — umiskendelig stil.",
      "Køligt klima giver høj syre og ren frugt.",
      "Pinot noir fra sydøen: frisk, rød frugt, ofte elegant.",
    ],
    searchTerms: [
      "new zealand",
      "newzealand",
      "nyzealand",
      "ny zeeland",
      "nyzeelandsk",
      "new zealandsk",
    ],
    primaryQuery: "marlborough sauvignon",
    wineSuggestions: [
      { title: "Marlborough sauvignon", q: "marlborough sauvignon blanc" },
      { title: "Central Otago pinot", q: "central otago pinot noir" },
    ],
    regions: [
      { name: "Marlborough", q: "marlborough sauvignon blanc", note: "Intens sauvignon — grønt, fisk og sommer." },
      { name: "Central Otago", q: "central otago pinot noir", note: "Nyzealandsk pinot — lyst kød og ost." },
    ],
    deepGuideSlug: "vinregion-australien-new-zealand",
    drueRegionLinks: [
      { slug: "sauvignon-blanc-fra-marlborough", label: "Sauvignon blanc fra Marlborough" },
      { slug: "pinot-noir-fra-central-otago", label: "Pinot noir fra Central Otago" },
    ],
    faq: [
      {
        question: "Hvorfor smager NZ-sauvignon så intenst?",
        answer:
          "Køligt klima, lang vækstsæson og typisk stil med thiol-aromaer (passionsfrugt/stikkelsbær). Det er en bevidst, genkendelig profil.",
      },
    ],
  },
  {
    slug: "sydafrika",
    displayName: "Sydafrika",
    continent: "afrika-oceanien",
    teaser: "Stellenbosch, Swartland, Hemel-en-Aarde — chenin, pinotage, cabernet.",
    title: "Vin fra Sydafrika — chenin, pinotage og forslag | Vinbot",
    description:
      "Sydafrikansk vin: Stellenbosch, Swartland, chenin blanc og pinotage. Kendetegn og søg hos danske forhandlere.",
    introParagraphs: [
      "Sydafrika kombinerer gammel verdens struktur med ny verdens frugt. Chenin blanc er undervurderet; pinotage er den lokale signatur.",
    ],
    kendetegn: [
      "Chenin blanc i mange stilarter — fra frisk til fadlagret.",
      "Pinotage: lokal krydsning — krydret, mørk frugt.",
      "Stellenbosch: klassisk cabernet-struktur; Swartland: mere rustikt og naturvenligt.",
      "Ofte stærk værdi for pengene.",
    ],
    searchTerms: ["sydafrika", "south africa", "southafrican", "sydafrikansk"],
    primaryQuery: "stellenbosch",
    wineSuggestions: [
      { title: "Stellenbosch cabernet", q: "stellenbosch cabernet" },
      { title: "Swartland chenin", q: "swartland chenin blanc" },
      { title: "Pinotage", q: "pinotage" },
    ],
    regions: [
      { name: "Stellenbosch", q: "stellenbosch cabernet", note: "Sydafrikansk struktur — grill og gryde." },
      { name: "Swartland", q: "swartland chenin blanc", note: "Chenin og naturven — grønt, fisk og ost." },
    ],
    deepGuideSlug: "vinregion-sydafrika",
    drueRegionLinks: [{ slug: "chenin-blanc-fra-swartland", label: "Chenin blanc fra Swartland" }],
    faq: [
      {
        question: "Er pinotage det bedste fra Sydafrika?",
        answer:
          "Det er det mest lokale — men mange synes chenin blanc og cabernet-blends er stærkere hverdagsvalg. Smag dig frem.",
      },
    ],
  },
  {
    slug: "israel",
    displayName: "Israel",
    continent: "europa",
    teaser: "Middelhavsklima og moderne teknik — strukturerede røde og aromatiske hvide.",
    title: "Vin fra Israel — Galilæa og forslag | Vinbot",
    description:
      "Israelsk vin: Galilæa, cabernet og moderne middelhavsstil. Kendetegn og søg hos danske forhandlere.",
    introParagraphs: [
      "Israel har en moderne vinindustri med fokus på kvalitet i højere områder som Galilæa. Forvent internationale druer i middelhavsstil.",
    ],
    kendetegn: [
      "Middelhavsklima med køligere højder.",
      "Cabernet, merlot, syrah og chardonnay dominerer.",
      "Kosher-produktion er udbredt, men ikke synonym med stil.",
    ],
    searchTerms: ["israel", "israeli", "israelsk"],
    primaryQuery: "israeli cabernet",
    wineSuggestions: [
      { title: "Israelsk cabernet", q: "israeli cabernet galilee" },
      { title: "Galilæa", q: "galilee wine" },
    ],
    regions: [
      { name: "Galilæa", q: "israeli cabernet galilee", note: "Højland — strukturerede røde og friske hvide." },
    ],
    faq: [
      {
        question: "Er al israelsk vin kosher?",
        answer:
          "Meget er det, men ikke alt. Kosher siger mere om produktion end om smagsstil — vurder flasken på region og drue som ellers.",
      },
    ],
  },
];

const bySlug = new Map(LANDE.map((l) => [l.slug, l]));

export function getAllLande(): LandConfig[] {
  return LANDE;
}

export function getLand(slug: string): LandConfig | undefined {
  return bySlug.get(slug);
}

export function getLandeByContinent(continent: LandContinent): LandConfig[] {
  return LANDE.filter((l) => l.continent === continent);
}

export function getRelatedLande(slug: string, limit = 6): LandConfig[] {
  const current = bySlug.get(slug);
  if (!current) return LANDE.filter((l) => l.slug !== slug).slice(0, limit);
  const same = LANDE.filter((l) => l.continent === current.continent && l.slug !== slug);
  const rest = LANDE.filter((l) => l.continent !== current.continent && l.slug !== slug);
  return [...same, ...rest].slice(0, limit);
}

/** Map: normalized term → alle landets searchTerms (til expandQuery). */
export function buildCountrySynonymMap(): Record<string, string[]> {
  const map: Record<string, string[]> = {};
  for (const land of LANDE) {
    const terms = land.searchTerms.map((t) => t.toLowerCase());
    for (const term of terms) {
      const others = terms.filter((t) => t !== term);
      const existing = map[term] || [];
      const merged = Array.from(new Set([...existing, ...others]));
      map[term] = merged;
    }
  }
  return map;
}

/**
 * Hvis query nævner et land (via searchTerms), returnér landets searchTerms.
 * Undgår at dumpe alle regionshints — kun synonymer.
 */
export function countryIntentTermsFromQuery(q: string): string[] {
  const txt = q.toLowerCase();
  const out = new Set<string>();
  for (const land of LANDE) {
    const hit = land.searchTerms.some((term) => {
      const t = term.toLowerCase();
      if (t.includes(" ")) return txt.includes(t);
      return new RegExp(`\\b${escapeRegExp(t)}\\b`, "i").test(txt);
    });
    if (hit) {
      for (const t of land.searchTerms) out.add(t);
    }
  }
  return Array.from(out);
}

/** Guide-slug → bedre søgestreng til live picks. */
export function searchQueryForGuideSlug(guideSlug: string): string | null {
  const land = LANDE.find((l) => l.deepGuideSlug === guideSlug);
  if (land) return land.primaryQuery;
  return null;
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export const CONTINENT_LABELS: Record<LandContinent, string> = {
  europa: "Europa",
  amerika: "Amerika",
  "afrika-oceanien": "Afrika & Oceanien",
};
