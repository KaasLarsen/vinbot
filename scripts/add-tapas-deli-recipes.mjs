#!/usr/bin/env node
/** 27 delikatesse-/tapasopskrifter med vin, portvin, sherry, sauternes, champagne eller rosé i retten. */
import fs from "node:fs";
import path from "node:path";

const UPDATED = "2026-09-12";
const RECIPES_DIR = path.join(process.cwd(), "content", "recipes");
const GUIDE_LINKS_PATH = path.join(process.cwd(), "lib", "growth", "guide-recipe-links.ts");

function yamlQuote(s) {
  return `"${String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}
function yamlList(items, indent = 0) {
  const pad = " ".repeat(indent);
  return items.map((i) => `${pad}- ${yamlQuote(i)}`).join("\n");
}

function r(o) {
  return {
    prepTime: "PT15M",
    cookTime: "PT25M",
    servings: 6,
    difficulty: "easy",
    ...o,
  };
}

const RECIPES = [
  r({
    slug: "portvins-fignemarmelade-med-rosmarin",
    title: "Portvins- og fignemarmelade med rosmarin",
    description:
      "Marmelade af tørrede figner, portvin og rosmarin til ostebord og charcuteri. Opskrift til ca. 2 glas — vin i gryden som smagsgrundlag.",
    tags: ["opskrift", "tapas", "tilbehør", "ost", "portvin", "figner", "vegetar"],
    prepTime: "PT10M",
    cookTime: "PT35M",
    servings: 8,
    wineInRecipe: {
      style: "Ruby eller tawny portvin — frugtig, ikke den dyreste vintage",
      amount: "200 ml portvin",
      note: "Portvinen koges ind med figner og sukker — den er selve smagsbasen, ikke pynt.",
    },
    wineToDrink: {
      guideSlug: "vin-til-ost-og-ostebord",
      searchQuery: "portvin ost figner tawny",
      searchMax: 200,
      label: "portvin til ost og figner",
    },
    relatedGuides: ["sadan-bruger-du-vin-til-sauce-og-simren", "vin-til-ost-og-ostebord", "vin-til-tapas"],
    ingredients: [
      "400 g tørrede figner, hakket",
      "200 ml portvin (ruby eller tawny)",
      "150 g rørsukker",
      "1 dl vand",
      "2 kviste rosmarin",
      "1 spsk citronsaft",
      "1 knivspids salt",
    ],
    instructions: [
      "Læg figner i gryde med vand og portvin. Bring i kog og simr 10 minutter til fignerne er bløde.",
      "Tilsæt sukker, rosmarin, citron og salt. Simr 20–25 minutter under omrøring, til marmeladen er tyk og skiller sig fra grydens bund.",
      "Fjern rosmarin. Mos let med ske, så der stadig er bidder.",
      "Hæld på rene, varme glas. Køl og sæt på køl. Holder 2–3 uger.",
    ],
    intro: "Portvins- og fignemarmelade er ostebordets genvej: sød figen, varm krydderi og den dybe, tørrede frugt fra portvin kogt ind i gryden. Det er ikke [figner og dadler i rødvin](/opskrifter/figner-og-dadler-i-rodvin) (varm tapas), men et holdbart tilbehør du smører på brie, manchego og blåskimmel. Vinen er central — uden port bliver marmeladen flad syltetøj.",
    whyTitle: "Hvorfor portvin i marmeladen",
    why: "Portvin har sødme, tørret frugt og alkohol der koger af, mens aromaen bliver. Ruby giver frisk bær; tawny giver nød og karamel. Samme logik som [rødvinsgelé til charcuteri](/opskrifter/roedvinsgele-til-charcuteri): vinen er ingrediens, ikke pynt. Se [vin til sauce og simren](/guides/sadan-bruger-du-vin-til-sauce-og-simren).",
    tips: [
      ["Figner", "Tørrede giver koncentration. Friske kan bruges, men så længere kogetid og mindre vand."],
      ["Konsistens", "Marmeladen skal falde i klatter fra skeen — ikke løbe som saft."],
      ["Rosmarin", "Hel kvist trækkes op. Hakket rosmarin kan blive bitter."],
    ],
    serving: "Server til gedeost, blåskimmel og serrano. Læg en ske ved siden af [rødvinsgelé til charcuteri](/opskrifter/roedvinsgele-til-charcuteri) på samme bræt. Brød eller kiks er obligatorisk.",
    mistakes: ["For lidt kogetid — vandig marmelade. For høj varme — brændt sukker. Vintage port — spild; hverdagsport er rigtigt."],
    storage: "Køleskab 2–3 uger. Fryses i små bøtter op til 3 måneder. Smag ofte bedre efter et døgn.",
    glass: "Samme port i glasset, eller tawny til ost — se [vin til ost og ostebord](/guides/vin-til-ost-og-ostebord).",
  }),
  r({
    slug: "klar-rodvinsgele-med-vanilje",
    title: "Klar rødvinsgelé med vanilje og stjerneanis",
    description:
      "Gennemsigtig rødvinsgelé med vanilje og stjerneanis til paté, foie gras og faste oste. Opskrift til 1 form — vin som hovedingrediens.",
    tags: ["opskrift", "tapas", "tilbehør", "rødvin", "ost", "charcuteri"],
    prepTime: "PT15M",
    cookTime: "PT20M",
    servings: 8,
    wineInRecipe: {
      style: "Frugtig, klar rødvin — pinot noir, gamay eller let merlot uden grov bundfald",
      amount: "500 ml rødvin",
      note: "Vinen koges med sukker, vanilje og anis og geleres — den skal være klar, ikke grumset.",
    },
    wineToDrink: {
      guideSlug: "vin-til-ost-og-ostebord",
      searchQuery: "pinot noir ost gelé",
      searchMax: 180,
      label: "vin til ost og gelé",
    },
    relatedGuides: ["sadan-bruger-du-vin-til-sauce-og-simren", "vin-til-ost-og-ostebord", "vin-til-tapas"],
    ingredients: [
      "500 ml frugtig rødvin",
      "180 g sukker",
      "1 vaniljestang, flækket",
      "2 stjerneanis",
      "1 spsk citronsaft",
      "12 g tør gelatine (følg pakken til 5 dl væske)",
      "Valgfrit: 1 spsk portvin efter si'ning",
    ],
    instructions: [
      "Bring vin, sukker, vanilje, anis og citron i kog. Simr 8 minutter. Si gennem fin si eller klud — det giver klar gelé.",
      "Udblød gelatine i koldt vand. Rør den i den varme, siede vin til den er opløst. Tilsæt evt. port.",
      "Hæld i en form eller små glas. Køl mindst 4 timer, helst natten over.",
      "Vend ud eller server i glassene i skiver til charcuteri.",
    ],
    intro: "Klar rødvinsgelé med vanilje og stjerneanis er den pænere fætter til [rødvinsgelé til charcuteri](/opskrifter/roedvinsgele-til-charcuteri): samme vin-i-gryden-logik, men sies til gennemsigtighed og parfumeres med vanilje. Den skærer fedme i paté og foie gras og ser ud som juveler på brættet.",
    whyTitle: "Klarhed og krydderi",
    why: "Grums og kerner slører geléen. Si, og brug en vin uden tung bund. Vanilje runder syren; stjerneanis giver vinteraroma uden at smage lakrids-slik. Læs [madlavning med vin](/guides/sadan-bruger-du-vin-til-sauce-og-simren).",
    tips: [
      ["Vinvalg", "Undgå meget tanninrig cabernet — geléen kan blive bitter."],
      ["Gelatine", "For meget giver gummi. Følg pakken."],
      ["Servering", "Skær med varm kniv."],
    ],
    serving: "Paté, foie gras, comté og serrano. En lille tern ved siden af [portvins-fignemarmelade](/opskrifter/portvins-fignemarmelade-med-rosmarin).",
    mistakes: ["Ikke at sie — uklar gelé. Kogende gelatine — den taber styrke. For sød vin — klister."],
    storage: "Køleskab 5 dage tildækket. Fryses dårligt.",
    glass: "Samme pinot i glasset, eller et glas tawny — [vin til ost](/guides/vin-til-ost-og-ostebord).",
  }),
  r({
    slug: "hvidvins-paerechutney",
    title: "Hvidvins- og pærechutney med sennepskorn",
    description:
      "Chutney af pærer, tør hvidvin og sennepskorn til ost, paté og stegt kød. Opskrift til ca. 2 glas — vin i lagen.",
    tags: ["opskrift", "tapas", "tilbehør", "hvidvin", "pærer", "ost", "vegetar"],
    cookTime: "PT40M",
    servings: 8,
    wineInRecipe: {
      style: "Tør, aromatisk hvidvin — riesling tør, chenin blanc eller pinot gris",
      amount: "200 ml hvidvin",
      note: "Hvidvinen koger ind med pærer og eddike — syre og frugt bliver chutneyens skelet.",
    },
    wineToDrink: {
      guideSlug: "vin-til-ost-og-ostebord",
      searchQuery: "chenin riesling ost chutney",
      searchMax: 150,
      label: "hvidvin til ost og chutney",
    },
    relatedGuides: ["sadan-bruger-du-vin-til-sauce-og-simren", "vin-til-ost-og-ostebord", "vin-til-tapas"],
    ingredients: [
      "4 faste pærer, skrællet og i tern",
      "200 ml tør hvidvin",
      "80 ml hvidvinseddike",
      "120 g rørsukker",
      "1 lille løg, finthakket",
      "1 spsk gule sennepskorn",
      "1 knivspids chili-flager",
      "1 knivspids salt",
    ],
    instructions: [
      "Steg løg bløde i en gryde uden farve. Tilsæt pærer, vin, eddike, sukker, sennep, chili og salt.",
      "Bring i kog og simr 30–35 minutter under omrøring, til chutneyen er tyk og pærerne møre men ikke mos.",
      "Smag til — den skal være sød-syrlig med bid fra sennepskorn.",
      "Hæld på glas. Køl. Smager bedst efter et døgn.",
    ],
    intro: "Pærechutney med hvidvin og sennepskorn er det salte ostebords syrlige modspil — tættere på indisk chutney-logik end på [pærer i rødvin](/opskrifter/paerer-i-rodvin). Vinen koger ind med eddike og giver floral syre, sennepskornet giver knas og varme.",
    whyTitle: "Hvidvin frem for kun eddike",
    why: "Ren eddike bliver skarp. Halv vin, halv eddike bløder kanten, som i [syltede rødløg med hvidvin](/opskrifter/syltede-roedloeg-med-hvidvin). Chenin og tør riesling har syre og pære-aroma i forvejen.",
    tips: [
      ["Pærer", "Conference holder formen. Bløde pærer bliver mos."],
      ["Sennep", "Hele korn, ikke sennep fra tube."],
      ["Tykkelse", "Chutney tykner mere når den køler."],
    ],
    serving: "Cheddar, comté, paté og koldt flæsk. God på crostini med gedeost.",
    mistakes: ["For bløde pærer. For lidt salt — chutney smager som marmelade. For sød hvidvin."],
    storage: "Køleskab 3 uger. Fryses fint.",
    glass: "Samme tørre hvidvin — [vin til ost](/guides/vin-til-ost-og-ostebord).",
  }),
  r({
    slug: "rose-syltede-roedloeg-med-timian",
    title: "Rosé-syltede rødløg med frisk timian",
    description:
      "Hurtigt syltede rødløg i tør rosé, eddike og timian til tapas, ost og burger. Opskrift til 1 glas — rosé i lagen.",
    tags: ["opskrift", "tapas", "tilbehør", "rosé", "løg", "vegetar"],
    prepTime: "PT10M",
    cookTime: "PT8M",
    servings: 8,
    wineInRecipe: {
      style: "Tør provence-rosé eller spansk rosado — ikke sød hvid zinfandel-rosé",
      amount: "150 ml tør rosé",
      note: "Roséen erstatter en del af eddiken og giver floral, rødfrugtet syre i lagen.",
    },
    wineToDrink: {
      guideSlug: "vin-til-tapas",
      searchQuery: "tør rosé provence tapas",
      searchMax: 150,
      label: "rosé til tapas",
    },
    relatedGuides: ["sadan-bruger-du-vin-til-sauce-og-simren", "vin-til-tapas", "vin-til-ost-og-ostebord"],
    ingredients: [
      "3 rødløg, skåret i fine halvmåner",
      "150 ml tør rosé",
      "100 ml hvidvinseddike",
      "2 spsk sukker",
      "1 tsk salt",
      "4 kviste frisk timian",
      "8 peberkorn",
    ],
    instructions: [
      "Læg løg i et rent glas med timian og peber.",
      "Bring rosé, eddike, sukker og salt i kog. Rør til sukkeret er opløst.",
      "Hæld den kogende lage over løgene, så de er dækket. Bank glasset let for luftbobler.",
      "Køl og sæt på køl mindst 2 timer — bedst natten over.",
    ],
    intro: "Rosé-syltede rødløg med timian er sommerversionen af [syltede rødløg med hvidvin](/opskrifter/syltede-roedloeg-med-hvidvin): samme hurtige metode, men lagen er tør rosé og timian i stedet for hvidvin. De er lyserøde, milde og skærer fed charcuteri.",
    whyTitle: "Rosé i lagen",
    why: "Tør rosé har syre, rød frugt og ofte en urtet note der matcher timian. Sød rosé gør løgene slikkede. Kog lagen kort — alkoholen letter, aromaen bliver.",
    tips: [
      ["Løg", "Fine skiver siver hurtigere. Tykke både tager natten."],
      ["Farve", "Løgene bliver dybere lyserøde efter et døgn."],
      ["Timian", "Frisk kvist, ikke tørret støv."],
    ],
    serving: "Tapasbræt, burger, [manchego marineret i hvidvin](/opskrifter/manchego-marineret-i-hvidvin) og fisketacos.",
    mistakes: ["Sød rosé. For lidt salt. At spise dem lune — de skal være kolde."],
    storage: "Køleskab 10 dage under lagen.",
    glass: "Samme tørre rosé — [vin til tapas](/guides/vin-til-tapas).",
  }),
  r({
    slug: "sauternes-gele-med-safran",
    title: "Sauternes-gelé med safran til foie gras og gedeost",
    description:
      "Sød hvidvinsgelé med sauternes og safran til foie gras og chèvre. Opskrift til små portioner — dessertvin i gryden.",
    tags: ["opskrift", "tapas", "tilbehør", "sauternes", "hvidvin", "foie gras", "ost"],
    cookTime: "PT15M",
    servings: 8,
    wineInRecipe: {
      style: "Sauternes, barsac eller anden ædelsød hvid — også god, billigere moelleux",
      amount: "250 ml sauternes eller lignende sød hvidvin",
      note: "Den søde vin geleres med safran — den er både sødme og syre i geléen.",
    },
    wineToDrink: {
      guideSlug: "vin-til-foie-gras",
      searchQuery: "sauternes foie gras",
      searchMax: 250,
      label: "sauternes til foie gras",
    },
    relatedGuides: ["vin-til-foie-gras", "vin-til-ost-og-ostebord", "sadan-bruger-du-vin-til-sauce-og-simren"],
    ingredients: [
      "250 ml sauternes eller anden ædelsød hvidvin",
      "40 g sukker (justér efter vinens sødme)",
      "8–10 safrantråde",
      "1 tsk citronsaft",
      "6 g tør gelatine (til ca. 2,5 dl)",
    ],
    instructions: [
      "Varm vinen med sukker, safran og citron til den damper — ikke voldsomt kog. Træk 10 minutter af varmen med låg.",
      "Udblød gelatine. Rør den i den lune vin til den er opløst. Si safran fra hvis du vil have helt klar gelé — eller lad trådene blive som pynt.",
      "Hæld i små forme. Køl 4 timer.",
      "Vend ud ved foie gras eller gedeost.",
    ],
    intro: "Sauternes-gelé med safran er den klassiske søde-syrlige kontrast til foie gras — og lige så god til chèvre. Hvor [klar rødvinsgelé](/opskrifter/klar-rodvinsgele-med-vanilje) er rød og krydret, er denne gylden og honningagtig. Vinen er ikke et strejf; den er geléen.",
    whyTitle: "Sød vin og fedt",
    why: "Foie gras og gedeost har fedme og salt. Sauternes har sødme og syre der skærer. Safran forstærker den gyldne farve og giver en let bitter finish. Se [vin til foie gras](/guides/vin-til-foie-gras).",
    tips: [
      ["Budget", "Barsac, coteaux du layon eller senhøst riesling virker, hvis sauternes er for dyrt."],
      ["Safran", "Lidt. For meget smager medicinsk."],
      ["Portioner", "Små forme — en teske per gæst."],
    ],
    serving: "Foie gras-terrine, bagt camembert, [gedeost-crostini](/opskrifter/gedeost-crostini-med-skalotteloeg).",
    mistakes: ["Hård kogning — aroma fordamper. For meget sukker til allerede sød vin. Store blokke gelé."],
    storage: "Køleskab 4 dage.",
    glass: "Samme sauternes koldt — [vin til foie gras](/guides/vin-til-foie-gras).",
  }),
  r({
    slug: "sherry-syltede-valnodder",
    title: "Sherry-syltede valnødder i mørk sirup",
    description:
      "Valnødder simret i oloroso-sherry og mørk sirup til ostebord og tapas. Opskrift til 1 skål — sherry i gryden.",
    tags: ["opskrift", "tapas", "tilbehør", "sherry", "nødder", "ost", "spansk", "vegetar"],
    cookTime: "PT20M",
    servings: 8,
    wineInRecipe: {
      style: "Oloroso eller amontillado sherry — tør til halvtør, nøddeagtig",
      amount: "120 ml sherry",
      note: "Nødderne koger i sherry og sirup, så vinen trækkes ind i kernerne.",
    },
    wineToDrink: {
      guideSlug: "vin-til-ost-og-ostebord",
      searchQuery: "oloroso sherry ost valnødder",
      searchMax: 180,
      label: "sherry til ost og nødder",
    },
    relatedGuides: ["vin-til-ost-og-ostebord", "vin-til-tapas", "vin-til-andalusisk-mad"],
    ingredients: [
      "200 g valnøddekerner",
      "120 ml oloroso- eller amontillado-sherry",
      "80 g mørk sirup eller honning",
      "1 spsk smør",
      "1 knivspids salt",
      "1 knivspids røget paprika (valgfrit)",
    ],
    instructions: [
      "Rist valnødder tørt på pande 3–4 minutter til de dufter. Tag af.",
      "Smelt smør, tilsæt sherry og sirup. Kog 2 minutter.",
      "Vend nødderne i. Simr 8–10 minutter under omrøring, til lagen klæber som tynd karamel.",
      "Drys salt og paprika. Køl på bagepapir i ét lag.",
    ],
    intro: "Sherry-syltede valnødder i mørk sirup er andalusisk ostelogik: oloroso smager allerede af nød, så valnødderne forstærkes i stedet for at kæmpe. De er sprøde, lidt klistrede og uundværlige ved blåskimmel.",
    whyTitle: "Oloroso som sirup",
    why: "Oloroso er oxideret, nøddeagtig og tåler kogning. Fino er for skrøbelig her. Siruppen binder sherryen til kernen. Samme tapas-tænkning som [marinerede oliven med hvidvin](/opskrifter/marinerede-oliven-med-hvidvin).",
    tips: [
      ["Nødder", "Friske kerner. Harsk valnød ødelægger retten."],
      ["Køling", "Adskil dem på papir — ellers bliver det én klump."],
      ["Salt", "Obligatorisk. Uden salt smager de som slik."],
    ],
    serving: "Blåskimmel, manchego, [gorgonzola-creme med portvin](/opskrifter/gorgonzola-creme-med-portvin).",
    mistakes: ["Fino/manzanilla i stedet for oloroso. For lang kogning — brændt sukker. Våde nødder."],
    storage: "Lufttæt dåse 1 uge. Bliver blødere med dagene.",
    glass: "Oloroso eller amontillado — [vin til ost](/guides/vin-til-ost-og-ostebord).",
  }),
  r({
    slug: "brombaermarmelade-med-rodvin",
    title: "Brombærmarmelade med rødvin og lakrids",
    description:
      "Brombærmarmelade kogt med rødvin og et strejf lakrids til ost, vildt og pandekager. Opskrift til 2 glas.",
    tags: ["opskrift", "tapas", "tilbehør", "rødvin", "bær", "ost", "vegetar"],
    cookTime: "PT30M",
    servings: 8,
    wineInRecipe: {
      style: "Frugtig rødvin — merlot, grenache eller ung syrah",
      amount: "150 ml rødvin",
      note: "Rødvinen koger med bærrene og giver dybde og farve uden at smage «vinagtigt».",
    },
    wineToDrink: {
      guideSlug: "vin-til-ost-og-ostebord",
      searchQuery: "merlot ost brombær",
      searchMax: 150,
      label: "rødvin til ost og bær",
    },
    relatedGuides: ["sadan-bruger-du-vin-til-sauce-og-simren", "vin-til-ost-og-ostebord", "vin-til-dessert-og-kransekage"],
    ingredients: [
      "500 g brombær (friske eller frosne)",
      "150 ml rødvin",
      "250 g sukker",
      "1 spsk citronsaft",
      "½ tsk lakridsgranulat eller 1 lille stykke ægte lakridsrod",
      "1 knivspids salt",
    ],
    instructions: [
      "Bring bær, vin, sukker, citron, lakrids og salt i kog. Mos let.",
      "Simr 20–25 minutter under omrøring, til marmeladen tykner. Skum evt. af.",
      "Fjern lakridsrod hvis du brugte stang. Smag til — lakrids skal være et ekko, ikke slik.",
      "Hæld på glas. Køl.",
    ],
    intro: "Brombær og rødvin er fætre i glasset; i gryden bliver de en mørk marmelade med et strejf lakrids, der elsker blåskimmel og vildt. Det er tapas-tilbehør, ikke kun morgenbrød.",
    whyTitle: "Rødvin og lakrids",
    why: "Brombær har syre og mørk frugt. Rødvin forstærker det. Lakrids i små mængder giver nordisk finish — for meget smager af pose. Samme reduktionslogik som [portvins-fignemarmelade](/opskrifter/portvins-fignemarmelade-med-rosmarin).",
    tips: [
      ["Frosne bær", "Fine. Kog et par minutter længere."],
      ["Lakrids", "Start med en knivspids. Du kan altid tilsætte."],
      ["Kerner", "Si hvis du vil have glat marmelade."],
    ],
    serving: "Blåskimmel, vildtpate, pandekager og [chokolade-trøfler med portvin](/opskrifter/chokolade-trofler-med-portvin) som kontrast.",
    mistakes: ["For meget lakrids. For kort kog — løbende marmelade. Tanninrig vin."],
    storage: "Køleskab 3 uger.",
    glass: "Frugtig merlot eller port — [vin til ost](/guides/vin-til-ost-og-ostebord).",
  }),
  r({
    slug: "hvidvins-abrikoskompot",
    title: "Hvidvins- og abrikoskompot med rosmarin",
    description:
      "Kompot af abrikoser pocheret i tør hvidvin med rosmarin til ost, yoghurt og tapas. Opskrift til 4–6.",
    tags: ["opskrift", "tapas", "tilbehør", "hvidvin", "abrikos", "vegetar"],
    cookTime: "PT20M",
    servings: 6,
    wineInRecipe: {
      style: "Tør, frugtig hvidvin — viognier, pinot gris eller tør muscat",
      amount: "250 ml hvidvin",
      note: "Abrikoserne pocheres i hvidvin — vinen er pocheringsvæsken.",
    },
    wineToDrink: {
      guideSlug: "vin-til-ost-og-ostebord",
      searchQuery: "viognier pinot gris ost",
      searchMax: 150,
      label: "hvidvin til ost og abrikos",
    },
    relatedGuides: ["sadan-bruger-du-vin-til-sauce-og-simren", "vin-til-ost-og-ostebord", "vin-til-dessert-og-kransekage"],
    ingredients: [
      "500 g abrikoser, halverede og udstenede (eller 300 g tørrede, udblødte)",
      "250 ml tør hvidvin",
      "80 g sukker",
      "2 kviste rosmarin",
      "1 strimmel citronskal",
      "1 knivspids salt",
    ],
    instructions: [
      "Bring vin, sukker, rosmarin, citronskal og salt i kog.",
      "Læg abrikoser i. Simr blidt 8–12 minutter til de er møre men hele.",
      "Tag frugten op. Kog lagen ind 5 minutter til let sirup. Fjern rosmarin.",
      "Hæld sirup over. Server lun eller kold.",
    ],
    intro: "Abrikoskompot med hvidvin og rosmarin er den lyse søster til fignemarmelade: stenfrugt, floral vin og en urtet kant. Den hører til gedeost og lune tapas, ikke kun dessertskålen.",
    whyTitle: "Pochering i hvidvin",
    why: "Som [pærer i rødvin](/opskrifter/paerer-i-rodvin), bare lyst: vinen er væsken. Viognier og pinot gris har abrikos-aroma i forvejen. Rosmarin holder det savoury.",
    tips: [
      ["Frugt", "Lidt faste abrikoser. Overmodne falder fra hinanden."],
      ["Tørrede", "Udblød 30 min i vin før kogning."],
      ["Sirup", "Den skal nappe, ikke karamellisere."],
    ],
    serving: "Chèvre, ricotta-crostini, yoghurt og [bagt camembert med hvidvin](/opskrifter/bagt-camembert-med-hvidvin).",
    mistakes: ["For sød dessertvin. For hård kogning. For meget rosmarin."],
    storage: "Køleskab 5 dage. Siruppen geléer lidt ved køl — det er fint.",
    glass: "Samme tørre hvidvin — [vin til ost](/guides/vin-til-ost-og-ostebord).",
  }),
  r({
    slug: "bagt-camembert-med-hvidvin",
    title: "Bagt Camembert med hvidvin, hvidløg og trøffelolie",
    description:
      "Hel camembert bagt med tør hvidvin, hvidløg og trøffelolie. Tapas-opskrift til 4 — vinen holder osten cremet.",
    tags: ["opskrift", "tapas", "ost", "hvidvin", "camembert", "fransk"],
    prepTime: "PT10M",
    cookTime: "PT15M",
    servings: 4,
    wineInRecipe: {
      style: "Tør hvidvin — chablis, muscadet eller sauvignon blanc",
      amount: "3 spsk hvidvin i osten",
      note: "Vinen hældes i riller i camemberten og bages med — den holder osten flydende og skærer fedmen.",
    },
    wineToDrink: {
      guideSlug: "vin-til-brie-og-camembert",
      searchQuery: "chablis camembert hvidvin",
      searchMax: 180,
      label: "hvidvin til camembert",
    },
    relatedGuides: ["vin-til-brie-og-camembert", "vin-til-ost-og-ostebord", "vin-til-tapas"],
    ingredients: [
      "1 hel camembert i trækasse (ca. 250 g)",
      "3 spsk tør hvidvin",
      "1 fed hvidløg, tynde skiver",
      "1 tsk trøffelolie (eller extra jomfruolie + sort peber)",
      "4 kviste timian",
      "Friskkværnet peber",
      "Brød og æblebåde til dipping",
    ],
    instructions: [
      "Varm ovn til 180 °C. Skær et kryds i ostens top. Sæt kassen på en bakke.",
      "Pres hvidløg og timian i rillerne. Hæld hvidvin over. Dryp trøffelolie og peber.",
      "Bag 12–15 minutter til osten bobler i midten men ikke løber helt ud.",
      "Server straks med brød. Rør i osten ved bordet.",
    ],
    intro: "Bagt camembert med hvidvin er tapas-fondue uden gryde: vinen siver ned i osten, holder den flydende og skærer den ammoniak-agtige fedme. Trøffelolie er et strejf — ikke en parfumebombe. Se også [fondue med hvidvin](/opskrifter/fondue-med-hvidvin) til den store gryde.",
    whyTitle: "Hvidvin i osten",
    why: "Camembert er fed og jordlig. Tør hvidvin med syre (chablis, muscadet) åbner den. For sød vin gør osten slimet-sød. Guiden [vin til brie og camembert](/guides/vin-til-brie-og-camembert) er den rigtige parring til glasset.",
    tips: [
      ["Kasse", "Trækasse tåler ovn. Plast skal ud."],
      ["Tid", "Hellere 12 min og tjek end 20 min ostesø."],
      ["Trøffel", "Et par dråber. For meget smager af chips."],
    ],
    serving: "Brød, [rose-syltede rødløg](/opskrifter/rose-syltede-roedloeg-med-timian) og [hvidvins-abrikoskompot](/opskrifter/hvidvins-abrikoskompot).",
    mistakes: ["For lang bagning. For meget vin — osten bliver suppe. Billig trøffelolie i mængder."],
    storage: "Spises med det samme. Rest kan røres i pasta næste dag.",
    glass: "Samme tørre hvidvin — [vin til brie og camembert](/guides/vin-til-brie-og-camembert).",
  }),
  r({
    slug: "gorgonzola-creme-med-portvin",
    title: "Gorgonzola-creme med portvin og valnødder",
    description:
      "Kold creme af gorgonzola rørt med portvin og valnødder til crostini. Tapas til 6 — portvin i fyldet.",
    tags: ["opskrift", "tapas", "ost", "portvin", "gorgonzola", "italiensk"],
    prepTime: "PT15M",
    cookTime: "PT0M",
    servings: 6,
    wineInRecipe: {
      style: "Ruby portvin — frugtig og sød nok til at møde blåskimmel",
      amount: "3–4 spsk portvin",
      note: "Portvinen røres koldt i osten — den er sødme og dybde i cremen, ikke kogt ind.",
    },
    wineToDrink: {
      guideSlug: "vin-til-ost-og-ostebord",
      searchQuery: "portvin gorgonzola ost",
      searchMax: 200,
      label: "portvin til blåskimmel",
    },
    relatedGuides: ["vin-til-ost-og-ostebord", "vin-til-tapas", "sadan-bruger-du-vin-til-sauce-og-simren"],
    ingredients: [
      "150 g gorgonzola dolce (eller dansk blåskimmel)",
      "75 g creme fraiche",
      "3 spsk ruby portvin",
      "50 g valnødder, grofthakkede",
      "Friskkværnet peber",
      "Crostini eller selleristænger",
    ],
    instructions: [
      "Rør gorgonzola og creme fraiche cremet. Tilsæt portvin skefuld for skefuld — cremen skal være smørbar, ikke løbende.",
      "Rør de fleste valnødder i. Smag med peber.",
      "Kom på skål, top med resten af nødderne. Køl 20 minutter.",
      "Server med crostini.",
    ],
    intro: "Gorgonzola-creme med portvin er den kolde tapas, hvor vinen ikke koges: sød ruby møder salt skimmel og bliver en dip på 10 minutter. Valnødder giver knas — eller brug [sherry-syltede valnødder](/opskrifter/sherry-syltede-valnodder) som topping.",
    whyTitle: "Portvin koldt i ost",
    why: "Klassisk parring i glasset flyttes ind i skålen. Portens sødme dæmper skimmelens bid. For meget vin splitter cremen. Se [vin til ost](/guides/vin-til-ost-og-ostebord).",
    tips: [
      ["Ost", "Dolce er cremet. Piccante kræver mere creme fraiche."],
      ["Konsistens", "For løs: mere ost. For stiv: 1 tsk port mere."],
      ["Make ahead", "Lav 4 timer før — smagen sætter sig."],
    ],
    serving: "Crostini, pærer, selleri og [klar rødvinsgelé](/opskrifter/klar-rodvinsgele-med-vanilje).",
    mistakes: ["Tawny i store mængder — cremen bliver slap. For kold ost — klumper. For salt ost uden creme fraiche."],
    storage: "Køleskab 3 dage tildækket.",
    glass: "Ruby port eller passito — [vin til ost](/guides/vin-til-ost-og-ostebord).",
  }),
  r({
    slug: "rodvinsglaserede-figner-med-gedeost",
    title: "Rødvinsglaserede figner med gedeost og parmaskinke",
    description:
      "Figner glaseret i rødvin, serveret med chèvre og parma. Varm tapas til 4 — vinen bliver til glasur.",
    tags: ["opskrift", "tapas", "figner", "rødvin", "gedeost", "italiensk"],
    prepTime: "PT10M",
    cookTime: "PT12M",
    servings: 4,
    wineInRecipe: {
      style: "Frugtig rødvin — barbera, pinot noir eller ung sangiovese",
      amount: "150 ml rødvin",
      note: "Fignerne koger i rødvin til lagen er sirup — vinen er glasuren.",
    },
    wineToDrink: {
      guideSlug: "vin-til-gedeost",
      searchQuery: "barbera pinot gedeost",
      searchMax: 160,
      label: "vin til gedeost og figner",
    },
    relatedGuides: ["vin-til-gedeost", "vin-til-tapas", "sadan-bruger-du-vin-til-sauce-og-simren"],
    ingredients: [
      "8 friske figner, halverede (eller 12 tørrede, udblødte)",
      "150 ml rødvin",
      "1 spsk honning",
      "1 tsk balsamico",
      "120 g frisk gedeost",
      "8 skiver parmaskinke",
      "Friskkværnet peber",
    ],
    instructions: [
      "Læg figner snitside ned i pande med vin, honning og balsamico. Simr 6–8 minutter. Vend og kog ind til glasur.",
      "Læg figner på fad. Top med gedeost. Svøb eller drapér parma.",
      "Ske resten af glasuren over. Peber. Server lun.",
    ],
    intro: "Rødvinsglaserede figner med gedeost og parma er den varme tapas-tallerken: sød frugt, syre fra vin, salt skinke. Tæt på [figner og dadler i rødvin](/opskrifter/figner-og-dadler-i-rodvin), men her er osten og skinken en del af anretningen.",
    whyTitle: "Glasur af rødvin",
    why: "Figner er sukker. Rødvin og balsamico giver syre, så det ikke smager af marmelade alene. Barbera har kirsebær og syre der elsker chèvre. Se [vin til gedeost](/guides/vin-til-gedeost).",
    tips: [
      ["Friske figner", "De skal give efter for et let tryk, ikke være grød."],
      ["Tørrede", "Udblød i vinen 20 min før glasering."],
      ["Parma", "Læg på til sidst, så den ikke koger."],
    ],
    serving: "Én tapas blandt flere, eller forret med rucola.",
    mistakes: ["For lang kogning — figner falder fra. For meget honning. Kold ost lige fra køl — lad den stå 10 min."],
    storage: "Figner + glasur 2 dage på køl. Samles ved servering.",
    glass: "Barbera eller pinot — [vin til gedeost](/guides/vin-til-gedeost).",
  }),
  r({
    slug: "gedeost-crostini-med-skalotteloeg",
    title: "Gedeost-crostini med rødvinspocherede skalotteløg",
    description:
      "Crostini med chèvre og skalotteløg pocheret i rødvin. Tapas til 6 — vinen er pocheringslage.",
    tags: ["opskrift", "tapas", "gedeost", "rødvin", "crostini", "fransk"],
    cookTime: "PT30M",
    servings: 6,
    wineInRecipe: {
      style: "Frugtig rødvin — pinot noir, gamay eller cabernet franc",
      amount: "250 ml rødvin",
      note: "Skalotteløgene pocheres møre i rødvin og sukker, til lagen er sirup.",
    },
    wineToDrink: {
      guideSlug: "vin-til-gedeost",
      searchQuery: "sancerre cabernet franc gedeost",
      searchMax: 160,
      label: "vin til gedeost-crostini",
    },
    relatedGuides: ["vin-til-gedeost", "vin-til-tapas", "sadan-bruger-du-vin-til-sauce-og-simren"],
    ingredients: [
      "12 skalotteløg, skrællede",
      "250 ml rødvin",
      "2 spsk sukker",
      "1 spsk smør",
      "1 kvist timian",
      "1 baguette, 12 skiver, ristet",
      "150 g frisk gedeost",
    ],
    instructions: [
      "Læg løg i gryde med vin, sukker, smør og timian. De skal næsten dækkes.",
      "Simr 20–25 minutter med låg på skrå, vend undervejs, til løgene er møre. Tag låg af og kog lagen ind til sirup.",
      "Smør crostini med gedeost. Top med 1–2 løg og en ske sirup.",
    ],
    intro: "Rødvinspocherede skalotteløg er den sødsure topping, gedeost mangler: bløde løg, mørk sirup, salt ost, sprødt brød. Det er tapas, ikke løgsuppe.",
    whyTitle: "Pochering i rødvin",
    why: "Skalotteløg tåler lang, blid vin. Sukkeret karamelliserer kanten. Pinot og gamay giver frugt uden hård tannin. Samme teknik som [rose-syltede rødløg](/opskrifter/rose-syltede-roedloeg-med-timian), bare varmt og rødt.",
    tips: [
      ["Løg", "Hele skalotteløg. For store: halvér."],
      ["Brød", "Rist i ovn med olie, så det holder til saften."],
      ["Ost", "Frisk chèvre, ikke fast rulleost alene."],
    ],
    serving: "Forret eller tapas. God ved siden af [rodvinsglaserede figner](/opskrifter/rodvinsglaserede-figner-med-gedeost).",
    mistakes: ["Hård kogning — løgene går i stykker. For lidt sukker — bitter vin. Blødt brød."],
    storage: "Løg og sirup 4 dage på køl. Crostini samles lige før.",
    glass: "Sancerre til osten eller let rød — [vin til gedeost](/guides/vin-til-gedeost).",
  }),
  r({
    slug: "mini-hvidvinsfondue-tapas",
    title: "Hvidvins-fondue i miniformat til tapasbordet",
    description:
      "Små skåle ostefondue med hvidvin til dipping — tapas til 6, ikke stor gryde. Vinen er fonden.",
    tags: ["opskrift", "tapas", "fondue", "ost", "hvidvin", "schweizisk"],
    cookTime: "PT15M",
    servings: 6,
    wineInRecipe: {
      style: "Tør, syrlig hvidvin — fendant, chasselas, sauvignon blanc",
      amount: "200 ml hvidvin",
      note: "Hvidvin smelter osten i små portioner — samme princip som klassisk fondue, tapas-skala.",
    },
    wineToDrink: {
      guideSlug: "vin-til-ost-og-ostebord",
      searchQuery: "sauvignon blanc fondue ost",
      searchMax: 150,
      label: "hvidvin til mini-fondue",
    },
    relatedGuides: ["vin-til-ost-og-ostebord", "vin-til-tapas", "sadan-bruger-du-vin-til-sauce-og-simren"],
    ingredients: [
      "200 ml tør hvidvin",
      "250 g gruyère, revet",
      "150 g emmentaler, revet",
      "1 fed hvidløg",
      "1 tsk majsstivelse rørt i 1 spsk vin",
      "Peber og muskat",
      "Brødtern, kogte kartofler i både, cornichons",
    ],
    instructions: [
      "Gnid en lille gryde med hvidløg. Varm vinen til dampe.",
      "Rør ost i, lidt ad gangen, i otte-form. Tilsæt stivelse. Smag med peber og muskat.",
      "Hæld i 6 forvarmede espresso- eller tapasskåle over varmeunderlag, eller hold i gryden på lavest blus.",
      "Server med spyd og tilbehør — gæsterne dypper selv.",
    ],
    intro: "Mini-hvidvinsfondue er tapasbordets svar på [fondue med hvidvin](/opskrifter/fondue-med-hvidvin): samme ost og vin, men i små skåle så den ikke stjæler hele aftenen. Vinen er stadig fonden — uden den ingen creme.",
    whyTitle: "Hvorfor ikke bare den store gryde",
    why: "En fuld fondue mætter. Mini-portioner passer med chorizo, ost og skaldyr. Teknikken er identisk: syrlig hvidvin, revet ost, lav varme. Se [vin til ost](/guides/vin-til-ost-og-ostebord).",
    tips: [
      ["Skåle", "Forvarm med varmt vand, ellers sætter osten sig."],
      ["Hold varm", "Tea light under en lille gryde, eller server med det samme."],
      ["Ost", "Revet, ikke i tern."],
    ],
    serving: "Brød, kartofler, [rose-syltede rødløg](/opskrifter/rose-syltede-roedloeg-med-timian).",
    mistakes: ["For høj varme — skiller. For lidt vin — klump. Kolde skåle."],
    storage: "Spises med det samme. Rest i omelet.",
    glass: "Samme tørre hvidvin — [vin til ost](/guides/vin-til-ost-og-ostebord).",
  }),
  r({
    slug: "manchego-marineret-i-hvidvin",
    title: "Manchego-tern marineret i hvidvin og olivenolie",
    description:
      "Manchego i tern, marineret i tør hvidvin, olie, citron og urter. Kold tapas til 6 — vinen i lagen.",
    tags: ["opskrift", "tapas", "ost", "hvidvin", "spansk", "manchego"],
    prepTime: "PT15M",
    cookTime: "PT0M",
    servings: 6,
    wineInRecipe: {
      style: "Tør spansk hvidvin — verdejo, albariño eller viura",
      amount: "80 ml hvidvin + 80 ml olivenolie",
      note: "Osten trækker i vin og olie i køleskabet — vinen giver syre i lagen.",
    },
    wineToDrink: {
      guideSlug: "vin-til-tapas",
      searchQuery: "verdejo albarino manchego tapas",
      searchMax: 140,
      label: "hvidvin til manchego og tapas",
    },
    relatedGuides: ["vin-til-tapas", "vin-til-ost-og-ostebord", "vin-til-spansk-mad"],
    ingredients: [
      "250 g manchego, 1,5 cm tern",
      "80 ml tør hvidvin",
      "80 ml extra jomfru olivenolie",
      "1 spsk citronsaft",
      "1 tsk citronskal",
      "1 kvist rosmarin, hakket",
      "½ tsk chili-flager",
      "Friskkværnet peber",
    ],
    instructions: [
      "Læg ost i et glas. Pisk vin, olie, citron, skal, rosmarin, chili og peber.",
      "Hæld over, så osten er dækket. Vend forsigtigt.",
      "Køl mindst 4 timer, vend en gang. Tag ud 20 minutter før servering.",
      "Server med tandenstikkere. Olien på brød.",
    ],
    intro: "Marineret manchego er den kolde, salte tapas, hvor hvidvin bløder ostens fåre-fedme uden at smelte den. Det er ikke bagt ost — det er lagen, der arbejder.",
    whyTitle: "Vin i marinade",
    why: "Olie alene er flad. Vin og citron giver syre, verdejo matcher spansk ost. Samme kold-marinade-tænkning som [marinerede oliven med hvidvin](/opskrifter/marinerede-oliven-med-hvidvin).",
    tips: [
      ["Ost", "Halvlagret manchego. Meget gammel ost smuldrer."],
      ["Tid", "4–24 timer. Længere bliver osten blød i kanten — fint, men ikke ugevis."],
      ["Temperatur", "Server kølig, ikke iskold."],
    ],
    serving: "Oliven, [rose-syltede rødløg](/opskrifter/rose-syltede-roedloeg-med-timian), mandler.",
    mistakes: ["For sød vin. For ung, våd ost. For meget chili."],
    storage: "Køleskab 3 dage i lagen.",
    glass: "Verdejo eller albariño — [vin til tapas](/guides/vin-til-tapas).",
  }),
  r({
    slug: "rodvinsmarineret-andebryst",
    title: "Rødvinsmarineret andebryst med prosciutto",
    description:
      "Andebryst marineret i rødvin, stegt og serveret tyndt med prosciutto. Tapas/forret til 4 — vin i marinaden.",
    tags: ["opskrift", "tapas", "and", "rødvin", "charcuteri", "fransk"],
    prepTime: "PT20M",
    cookTime: "PT15M",
    servings: 4,
    difficulty: "medium",
    wineInRecipe: {
      style: "Pinot noir eller let syrah — frugt og syre, ikke tung cabernet",
      amount: "150 ml rødvin til marinade",
      note: "Anden trækker i rødvin, soya og urter; en skefuld marinade reduceres til glasur.",
    },
    wineToDrink: {
      guideSlug: "vin-til-and",
      searchQuery: "pinot noir and",
      searchMax: 200,
      label: "pinot noir til and",
    },
    relatedGuides: ["vin-til-and", "sadan-bruger-du-vin-til-sauce-og-simren", "vin-til-tapas"],
    ingredients: [
      "2 andebryst (ca. 350 g hver)",
      "150 ml pinot noir eller let rødvin",
      "1 spsk soya",
      "1 spsk honning",
      "1 fed hvidløg, knust",
      "1 kvist timian",
      "8 skiver prosciutto",
      "Salt og peber",
    ],
    instructions: [
      "Rids skindet. Marinér 2–8 timer i vin, soya, honning, hvidløg og timian i køleskab.",
      "Dup tørre. Steg skindside ned 8–10 minutter på medium, til fedtet er sprødt. Vend 2–3 minutter. Hvile 5 minutter.",
      "Kog 3 spsk marinade ind til glasur.",
      "Skær tyndt. Anret med prosciutto og glasur.",
    ],
    intro: "Rødvinsmarineret andebryst med prosciutto er tapas-udgaven af and: marinaden giver dybde, skindet giver knas, skinken salt. Det er ikke [andesteg med port](/opskrifter/andesteg-med-port-og-hvidvin) til søndag — det er skiver på fad.",
    whyTitle: "Marinade af pinot",
    why: "And og pinot er klassikeren i glasset. I gryden/skålen giver vinen syre og rød frugt. Soya er umami, ikke asiatisk ret. Se [vin til and](/guides/vin-til-and) og [pinot noir til and](/guides/pinot-noir-til-and).",
    tips: [
      ["Marinade", "Ikke over 8 timer — vinen kan «koge» kødet koldt."],
      ["Skind", "Start i kold pande for jævnt fedt."],
      ["Snit", "Tyndt på skrå, som carpaccio-agtige skiver."],
    ],
    serving: "Rucola, [rodvinsglaserede figner](/opskrifter/rodvinsglaserede-figner-med-gedeost).",
    mistakes: ["Cabernet-marinade. Stegt and uden hvile. For meget soya."],
    storage: "Stegt and 2 dage. Skæres ved servering.",
    glass: "Pinot noir — [vin til and](/guides/vin-til-and).",
  }),
  r({
    slug: "portvinsglaserede-dadler-med-bacon",
    title: "Portvinsglaserede dadler svøbt i bacon",
    description:
      "Dadler glaseret i portvin og svøbt i bacon. Varm tapas til 6 — portvin i glasuren.",
    tags: ["opskrift", "tapas", "portvin", "dadler", "bacon"],
    prepTime: "PT15M",
    cookTime: "PT20M",
    servings: 6,
    wineInRecipe: {
      style: "Ruby portvin",
      amount: "80 ml portvin",
      note: "Dadlerne vendes i reduceret portvin før og efter ovn — sødme og dybde i glasuren.",
    },
    wineToDrink: {
      guideSlug: "vin-til-tapas",
      searchQuery: "portvin tapas ost",
      searchMax: 180,
      label: "portvin til tapas",
    },
    relatedGuides: ["vin-til-tapas", "sadan-bruger-du-vin-til-sauce-og-simren", "vin-til-ost-og-ostebord"],
    ingredients: [
      "18 store dadler, udstenede",
      "9 skiver bacon, halveret",
      "80 ml ruby portvin",
      "1 spsk honning",
      "Friskkværnet peber",
      "Valgfrit: 18 mandler i dadlerne",
    ],
    instructions: [
      "Kog port og honning 3–4 minutter til tynd sirup. Vend dadlerne i. Fyld evt. med mandel.",
      "Svøb bacon om hver dadel. Læg på rist over bakke. Peber.",
      "Bag 200 °C 12–15 minutter til bacon er sprød. Pensl med resten af glasuren sidste 2 minutter.",
      "Server lun med tandenstikkere.",
    ],
    intro: "Portvinsglaserede dadler i bacon er den søde-salte tapas, alle tager tre af. Portvinen koger til glasur; bacon giver røg. Tæt på [figner og dadler i rødvin](/opskrifter/figner-og-dadler-i-rodvin), men her er bacon og ovn det bærende.",
    whyTitle: "Port som glasur",
    why: "Dadler er sukker. Port tilføjer tørret frugt og alkohol der koger af. Uden vin er det bare bacon-dadler fra 90'erne. Ruby er rigtigt; vintage er spild.",
    tips: [
      ["Bacon", "Tyndt. Tykt bliver slapt før dadlen er varm."],
      ["Mandel", "Giver knas. Uden er de blødere."],
      ["Glasur", "Pensl til sidst, ellers brænder sukkeret."],
    ],
    serving: "Aperitif med [gorgonzola-creme](/opskrifter/gorgonzola-creme-med-portvin).",
    mistakes: ["For lang ovntid — tør dadel. For tyk glasur der brænder. Tawny i store mængder — bitter."],
    storage: "Bedst straks. Genopvarm 5 min i ovn.",
    glass: "Ruby port eller tør cava — [vin til tapas](/guides/vin-til-tapas).",
  }),
  r({
    slug: "pate-med-morkel-og-rodvin",
    title: "Hjemmelavet paté med morkel og rødvin",
    description:
      "Leverpaté med morkler og rødvin i farsen. Opskrift til 8 som tapas — vinen i farsen og glasuren.",
    tags: ["opskrift", "tapas", "paté", "rødvin", "svampe", "fransk"],
    prepTime: "PT30M",
    cookTime: "PT75M",
    servings: 8,
    difficulty: "medium",
    wineInRecipe: {
      style: "Pinot noir eller let bourgogne — jordbær og skovbund",
      amount: "120 ml rødvin",
      note: "Vinen reduceres med skalotteløg og røres i leverfarsen — den giver syre og dybde.",
    },
    wineToDrink: {
      guideSlug: "vin-til-tapas",
      searchQuery: "pinot noir paté",
      searchMax: 180,
      label: "pinot til paté",
    },
    relatedGuides: ["sadan-bruger-du-vin-til-sauce-og-simren", "vin-til-tapas", "vin-til-ost-og-ostebord"],
    ingredients: [
      "400 g kyllinge- eller kalvelever, renset",
      "150 g smør",
      "2 skalotteløg, hakket",
      "120 ml rødvin",
      "30 g tørrede morkler, udblødte og hakket (gem vandet)",
      "1 æg",
      "2 spsk cognac (valgfrit)",
      "Timian, salt, peber, muskat",
      "Clarificeret smør til at forsegle",
    ],
    instructions: [
      "Udblød morkler. Reducér vin og skalotteløg til 3 spsk. Tilsæt morkler og 2 spsk udblødningsvand. Køl.",
      "Blend lever, blødt smør, æg, vin-morkel, cognac og krydderier til ensartet fars. Smag (steg en teske).",
      "Kom i form. Dæk med folie. Vandbad 150 °C 50–65 minutter til midten er 68–70 °C.",
      "Køl. Forsegl med smeltet smør. Køl natten over.",
    ],
    intro: "Paté med morkel og rødvin er delikatessebrættets tyngde: jord, skov og vin i farsen. Vinen er ikke en klat i kanten — den reduceres og blandes ind, så patéen ikke smager af rå lever alene.",
    whyTitle: "Rødvin i leverfars",
    why: "Lever er metallisk. Reduceret pinot giver syre og rød frugt. Morkler forstærker skovbunden. Samme reduktion som i [klar rødvinsgelé](/opskrifter/klar-rodvinsgele-med-vanilje), bare i fars.",
    tips: [
      ["Temperatur", "Ikke over 72 °C — patéen bliver tør og grå."],
      ["Smag", "Steg altid en teske fars."],
      ["Hvile", "Natten over. Smagen sætter sig."],
    ],
    serving: "Cornichons, [klar rødvinsgelé](/opskrifter/klar-rodvinsgele-med-vanilje), brød.",
    mistakes: ["Rå vin i farsen uden reduktion. For høj ovn. Ingen salt."],
    storage: "Køleskab 5 dage under smør. Fryses 1 måned.",
    glass: "Pinot noir — [vin til tapas](/guides/vin-til-tapas).",
  }),
  r({
    slug: "svinekaeber-i-portvinsreduktion",
    title: "Langtidsbraiserede svinekæber i portvinsreduktion",
    description:
      "Svinekæber braiseret møre i portvin og fond. Tapas eller delemad til 4 — portvin som reduktion.",
    tags: ["opskrift", "tapas", "svinekød", "portvin", "gryderet", "spansk"],
    prepTime: "PT20M",
    cookTime: "PT150M",
    servings: 4,
    difficulty: "medium",
    wineInRecipe: {
      style: "Ruby portvin plus en skvæt tør rødvin",
      amount: "200 ml portvin + 150 ml rødvin",
      note: "Kæberne simrer i port og rødvin til kødet falder fra og saucen er lakrids-mørk.",
    },
    wineToDrink: {
      guideSlug: "vin-til-svinekoed",
      searchQuery: "rioja svinekød portvin",
      searchMax: 180,
      label: "rødvin til svinekæber",
    },
    relatedGuides: ["vin-til-svinekoed", "sadan-bruger-du-vin-til-sauce-og-simren", "vin-til-spansk-mad"],
    ingredients: [
      "800 g svinekæber, pudset",
      "200 ml ruby portvin",
      "150 ml tør rødvin",
      "300 ml fond",
      "1 løg, 1 gulerod, 2 fed hvidløg",
      "2 spsk tomatpuré",
      "Laurbær, timian, salt, peber",
      "Olie til bruning",
    ],
    instructions: [
      "Brun kæberne hårdt. Tag op. Steg grønt. Rør tomatpuré i.",
      "Deglacér med port og rødvin. Kog 3 minutter. Tilsæt fond og urter. Læg kød tilbage.",
      "Simr under låg 2–2½ time til kødet er mørt. Tag kød op. Si og reducér sauce til den nappes.",
      "Træk kødet i grove strimler. Vend i saucen. Server på brød som tapas eller med kartoffelmos.",
    ],
    intro: "Svinekæber i portvinsreduktion er den mørke, klæbrige tapas, spanierne serverer på skål med brød. Tæt på [svinekæber i rødvinssky](/opskrifter/svinekaebber-i-rodvinssky), men her er portvin med og saucen sødere, tykkere, mere lakrids.",
    whyTitle: "Portvin til kollagen",
    why: "Kæber skal have tid. Portvinens sødme balancerer den mørke fond. Tør rødvin holder syren. Se [vin til svinekød](/guides/vin-til-svinekoed).",
    tips: [
      ["Bruning", "Hård farve = smag. Grå kæber = kedelig sauce."],
      ["Tid", "Hellere 2½ time end 90 minutter."],
      ["Tapas", "Shred og server på ristet brød med persille."],
    ],
    serving: "Brød, [rose-syltede rødløg](/opskrifter/rose-syltede-roedloeg-med-timian).",
    mistakes: ["For kort tid. Kun sød port uden tør vin — saucen bliver sliksød. For lidt salt."],
    storage: "3 dage på køl. Bedre dag 2. Fryses fint.",
    glass: "Rioja crianza — [vin til svinekød](/guides/vin-til-svinekoed).",
  }),
  r({
    slug: "serrano-med-hvidvinsmarineret-melon",
    title: "Serranoskinke med hvidvinsmarineret melon",
    description:
      "Honningmelon marineret i tør hvidvin, citron og mynte, draperet med serrano. Kold tapas til 4.",
    tags: ["opskrift", "tapas", "hvidvin", "melon", "skinke", "spansk"],
    prepTime: "PT20M",
    cookTime: "PT0M",
    servings: 4,
    wineInRecipe: {
      style: "Tør, aromatisk hvidvin — albariño, verdejo eller pinot grigio",
      amount: "80 ml hvidvin",
      note: "Melonen trækker 20–40 minutter i hvidvin og citron — vinen er lagen, ikke dressing til sidst.",
    },
    wineToDrink: {
      guideSlug: "vin-til-tapas",
      searchQuery: "albarino tapas serrano",
      searchMax: 140,
      label: "hvidvin til serrano og melon",
    },
    relatedGuides: ["vin-til-tapas", "vin-til-spansk-mad", "sadan-bruger-du-vin-til-sauce-og-simren"],
    ingredients: [
      "½ honningmelon, udstenet, i halvmåner",
      "80 ml tør hvidvin",
      "1 spsk citronsaft",
      "1 tsk honning",
      "8–10 skiver serrano eller jamón",
      "Frisk mynte",
      "Friskkværnet peber",
    ],
    instructions: [
      "Pisk vin, citron og honning. Vend melon i. Køl 20–40 minutter.",
      "Dryp melon. Drapér med serrano. Drys mynte og peber.",
      "Ske et par teskefulde lage over. Server koldt.",
    ],
    intro: "Serrano og melon er klassikeren; hvidvinsmarinaden er drejet der gør den til Vinbot-opskrift. Vinen giver syre, så melon ikke kun er sliksød mod salt skinke.",
    whyTitle: "Kort marinade",
    why: "For lang tid bliver melon vandig. 20–40 min er nok. Albariño har salt-mineralitet der matcher skinke. Se [vin til tapas](/guides/vin-til-tapas).",
    tips: [
      ["Melon", "Moden men fast. Vandmelon er for våd."],
      ["Skinke", "Rumtemperatur 10 min, så fedtet dufter."],
      ["Lage", "Sparsom ved anretning."],
    ],
    serving: "Aperitif. God før [kaemperejer dampet i hvidvin](/opskrifter/kaemperejer-dampet-i-hvidvin).",
    mistakes: ["For lang marinade. Underkølet melon. For tyk skinke."],
    storage: "Melon i lage 4 timer max. Samles lige før.",
    glass: "Albariño — [vin til tapas](/guides/vin-til-tapas).",
  }),
  r({
    slug: "kaemperejer-dampet-i-hvidvin",
    title: "Hvidvins- og hvidløgsdampede kæmperejer",
    description:
      "Kæmperejer dampet i hvidvin, hvidløg og chili. Tapas til 4 — vinen er dampevæsken, ikke en pande-sauce alene.",
    tags: ["opskrift", "tapas", "rejer", "skaldyr", "hvidvin", "spansk"],
    prepTime: "PT10M",
    cookTime: "PT8M",
    servings: 4,
    wineInRecipe: {
      style: "Tør hvidvin — albariño, verdejo eller muscadet",
      amount: "200 ml hvidvin",
      note: "Rejerne dampes under låg i vin og hvidløg — vinen bliver til bouillon i bunden.",
    },
    wineToDrink: {
      guideSlug: "vin-til-rejer",
      searchQuery: "albarino rejer",
      searchMax: 150,
      label: "albariño til rejer",
    },
    relatedGuides: ["vin-til-rejer", "vin-til-fisk-og-skaldyr", "vin-til-tapas"],
    ingredients: [
      "12 kæmperejer med skal og hoved (eller 500 g store rejer)",
      "200 ml tør hvidvin",
      "6 fed hvidløg, skiver",
      "1 rød chili, skiver",
      "3 spsk olivenolie",
      "Persille, citron, salt",
    ],
    instructions: [
      "Varm olie i en gryde med tætsluttende låg. Steg hvidløg og chili 30 sekunder.",
      "Læg rejer i. Hæld vin over. Låg på. Damp 3–5 minutter til de er lyserøde. Ryst gryden én gang.",
      "Salt, persille, citron. Server med brød til bouillonen.",
    ],
    intro: "Dampede kæmperejer i hvidvin og hvidløg er gryde-tapas: vinen er damp, ikke en tyk sauce. Forskellen fra [rejer i hvidvin](/opskrifter/rejer-i-hvidvin) er metoden — her under låg, med skal på, mere bouillon.",
    whyTitle: "Damp frem for stegning",
    why: "Skal og hoved giver smag til vinen. Kort damp holder kødet saftigt. Albariño er naboen i glasset og gryden. Se [vin til rejer](/guides/vin-til-rejer).",
    tips: [
      ["Skal", "Lad den sidde. Gæster piller selv — det er tapas."],
      ["Tid", "Hellere 30 sekunder for lidt end gummi."],
      ["Bouillon", "Brød er obligatorisk."],
    ],
    serving: "Citron, brød, [muslinger i hvidvin og safran](/opskrifter/muslinger-i-hvidvin-og-safran).",
    mistakes: ["Uden låg. For lang tid. For lidt vin — brænder."],
    storage: "Spises med det samme.",
    glass: "Samme albariño — [vin til rejer](/guides/vin-til-rejer).",
  }),
  r({
    slug: "muslinger-i-hvidvin-og-safran",
    title: "Muslinger i cremet hvidvins- og safransauce",
    description:
      "Blåmuslinger i hvidvin, safran og fløde. Opskrift til 4 — vinen er dampevæske og saucebase.",
    tags: ["opskrift", "tapas", "muslinger", "skaldyr", "hvidvin", "safran", "fransk"],
    cookTime: "PT15M",
    servings: 4,
    wineInRecipe: {
      style: "Tør hvidvin — muscadet, albariño eller picpoul",
      amount: "300 ml hvidvin",
      note: "Muslingerne dampes i hvidvin; safran og fløde røres i den si'ede bouillon.",
    },
    wineToDrink: {
      guideSlug: "vin-til-muslinger",
      searchQuery: "muscadet muslinger safran",
      searchMax: 150,
      label: "hvidvin til muslinger",
    },
    relatedGuides: ["vin-til-muslinger", "vin-til-fisk-og-skaldyr", "sadan-bruger-du-vin-til-sauce-og-simren"],
    ingredients: [
      "2 kg blåmuslinger, rensede",
      "300 ml tør hvidvin",
      "1 skalotteløg, hakket",
      "2 fed hvidløg",
      "12 safrantråde, udblødt i 2 spsk varm vin",
      "100 ml piskefløde",
      "30 g smør",
      "Persille, peber, brød",
    ],
    instructions: [
      "Steg skalotteløg og hvidløg i smør. Hæld vin i, bring i kog. Tilsæt muslinger, låg på, damp 4–6 minutter. Kassér lukkede.",
      "Si bouillon. Kog den ind 2 minutter. Rør safran og fløde i. Smag til.",
      "Hæld over muslingerne. Persille. Server med brød.",
    ],
    intro: "Muslinger i cremet hvidvins- og safransauce er moules marinières i guld: samme damp i vin som [muslinger i hvidvin](/opskrifter/muslinger-i-hvidvin), plus safran og fløde. Det er tapas i dybe skåle eller forret.",
    whyTitle: "Safran i vinbouillon",
    why: "Safran elsker hvidvin og skaldyr. Fløden runder. Muscadet har salt syre der skærer. Se [vin til muslinger](/guides/vin-til-muslinger).",
    tips: [
      ["Safran", "Udblød først, ellers smager det af hø."],
      ["Fløde", "Kog ikke voldsomt efter — saucen kan skille."],
      ["Rens", "Skæg af, åbne der ikke lukker sig ud."],
    ],
    serving: "Brød, citron, hvidvin i karaffel.",
    mistakes: ["For meget fløde. Død musling i gryden. For lidt salt i bouillon."],
    storage: "Spises med det samme. Bouillon kan fryses til fiskesuppe.",
    glass: "Muscadet eller albariño — [vin til muslinger](/guides/vin-til-muslinger).",
  }),
  r({
    slug: "lakse-rilette-med-hvidvin",
    title: "Lakse-rilette rørt med tør hvidvin og dild",
    description:
      "Laks pocheret i hvidvin og rørt til riilette med dild. Kold tapas til 6 — vin i pocheringslagen.",
    tags: ["opskrift", "tapas", "laks", "fisk", "hvidvin", "fransk"],
    prepTime: "PT20M",
    cookTime: "PT12M",
    servings: 6,
    wineInRecipe: {
      style: "Tør hvidvin — muscadet, chablis eller pinot blanc",
      amount: "200 ml hvidvin til pochering",
      note: "Laksen pocheres i hvidvin; en skefuld lagen røres i rilletten.",
    },
    wineToDrink: {
      guideSlug: "vin-til-fisk-og-skaldyr",
      searchQuery: "chablis laks hvidvin",
      searchMax: 160,
      label: "hvidvin til laks",
    },
    relatedGuides: ["vin-til-fisk-og-skaldyr", "vin-til-tapas", "sadan-bruger-du-vin-til-sauce-og-simren"],
    ingredients: [
      "400 g laksefilet uden skind",
      "200 ml tør hvidvin",
      "1 skalotteløg",
      "80 g smør, blødt",
      "2 spsk creme fraiche",
      "1 bund dild",
      "Citronsaft, salt, peber",
      "Crostini",
    ],
    instructions: [
      "Pochér laks i vin og skalotteløg 8–10 minutter til den netop er gennemvarm. Køl. Gem 2 spsk lage.",
      "Flager laksen med gaffel. Rør smør, creme fraiche, dild, citron og lagen i. Smag til.",
      "Køl 1 time. Server med crostini.",
    ],
    intro: "Lakse-rilette med hvidvin er kold tapas med pocheringsvin i både fisk og creme. Den skal være grov, ikke blender-smoothie.",
    whyTitle: "Pochering i hvidvin",
    why: "Vand giver kedelig laks. Vin giver syre og aroma. En skefuld lage binder rilletten. Se [vin til fisk og skaldyr](/guides/vin-til-fisk-og-skaldyr).",
    tips: [
      ["Tekstur", "Gaffel, ikke stavblender."],
      ["Fedt", "Kold smør klumper. Blødt smør."],
      ["Salt", "Smag efter køl — koldt dæmper salt."],
    ],
    serving: "Crostini, [rose-syltede rødløg](/opskrifter/rose-syltede-roedloeg-med-timian), agurk.",
    mistakes: ["Overkogt tør laks. For meget lage — suppe. For finblendet."],
    storage: "Køleskab 2 dage.",
    glass: "Chablis eller muscadet — [vin til fisk](/guides/vin-til-fisk-og-skaldyr).",
  }),
  r({
    slug: "blaeksprutteringe-i-hvidvin",
    title: "Blæksprutteringe sauteret i hvidvin og chili",
    description:
      "Calamari sauteret i hvidvin, hvidløg og chili. Hurtig tapas til 4 — vin i panden.",
    tags: ["opskrift", "tapas", "blæksprutte", "skaldyr", "hvidvin", "chili", "spansk"],
    prepTime: "PT15M",
    cookTime: "PT6M",
    servings: 4,
    wineInRecipe: {
      style: "Tør hvidvin — albariño, verdejo eller pinot grigio",
      amount: "100 ml hvidvin",
      note: "Ringe sauteres kort; vinen deglacerer panden og bliver til let sauce.",
    },
    wineToDrink: {
      guideSlug: "vin-til-fisk-og-skaldyr",
      searchQuery: "albarino blæksprutte",
      searchMax: 150,
      label: "hvidvin til blæksprutte",
    },
    relatedGuides: ["vin-til-fisk-og-skaldyr", "vin-til-tapas", "vin-til-spansk-mad"],
    ingredients: [
      "500 g blæksprutteringe (rensede)",
      "100 ml tør hvidvin",
      "4 fed hvidløg, skiver",
      "1 rød chili, skiver",
      "3 spsk olivenolie",
      "Persille, citron, salt",
    ],
    instructions: [
      "Dup ringe tørre. Salt.",
      "Høj varme, olie. Sauter hvidløg og chili 20 sekunder. Læg ringe i ét lag. 1–1½ minut.",
      "Hæld vin i. Ryst 30–45 sekunder til saucen nappes. Persille, citron. Server straks.",
    ],
    intro: "Blæksprutteringe i hvidvin og chili er den lyse fætter til [blæksprutte i rødvin](/opskrifter/blaeksprutte-i-rodvin): kort pande, hvidvin, chili. For lang tid = gummi.",
    whyTitle: "Kort deglacering",
    why: "Calamari skal have enten 60 sekunder eller 45 minutter. Her er det det første. Vinen løfter fonden. Se [vin til fisk og skaldyr](/guides/vin-til-fisk-og-skaldyr).",
    tips: [
      ["Tørhed", "Våde ringe damper i stedet for at sautere."],
      ["Varme", "Panden skal næsten ryge."],
      ["Chili", "Frisk. Pulver brænder."],
    ],
    serving: "Citron, brød, [kaemperejer dampet i hvidvin](/opskrifter/kaemperejer-dampet-i-hvidvin).",
    mistakes: ["For lang stegning. For meget vin — kogning. Salt for sent."],
    storage: "Spises med det samme.",
    glass: "Albariño — [vin til tapas](/guides/vin-til-tapas).",
  }),
  r({
    slug: "champagne-jordbaersorbet",
    title: "Champagne- og jordbærsorbet som ganerenser",
    description:
      "Sorbet af jordbær og brut champagne. Ganerenser eller dessert til 6 — bobler i massen.",
    tags: ["opskrift", "dessert", "champagne", "bobler", "jordbær", "vegetar"],
    prepTime: "PT20M",
    cookTime: "PT10M",
    servings: 6,
    wineInRecipe: {
      style: "Brut champagne eller crémant — tør, ikke demisec",
      amount: "250 ml champagne",
      note: "Boblerne røres i den afkølede jordbærpuré før frysning — de giver syre og let alkohol i sorbeten.",
    },
    wineToDrink: {
      guideSlug: "champagne-til-mad",
      searchQuery: "champagne brut",
      searchMax: 250,
      label: "champagne til dessert",
    },
    relatedGuides: ["champagne-til-mad", "vin-til-dessert-og-kransekage", "sadan-bruger-du-vin-til-sauce-og-simren"],
    ingredients: [
      "500 g jordbær",
      "120 g sukker",
      "250 ml brut champagne eller crémant",
      "1 spsk citronsaft",
      "1 knivspids salt",
    ],
    instructions: [
      "Kog sukker med ½ dl vand til sirup. Køl.",
      "Blend jordbær, sirup, citron og salt. Si om du vil have glat sorbet.",
      "Rør champagne i den kolde puré. Kør i ismaskine, eller frys og blend to gange.",
      "Server i små skåle mellem tapas og dessert, eller som let dessert.",
    ],
    intro: "Champagne-jordbærsorbet er ganerenseren: kold, syrlig, let sød. Boblerne er i massen, ikke kun i glasset. Brut, ikke sød cava-slik.",
    whyTitle: "Bobler i sorbet",
    why: "Alkohol og CO2 sænker frysepunktet og giver blødere is. For meget vin fryser aldrig. Se [champagne til mad](/guides/champagne-til-mad).",
    tips: [
      ["Bobler", "Kold champagne i kold puré — ellers dør skummet som smag, ikke som mousse."],
      ["Ismaskine", "Bedst. Uden: frys, blend, frys."],
      ["Portion", "Lille kugle. Det er ganerenser."],
    ],
    serving: "Mellem tapas og ost, eller med [hvidvinsbagede fersken](/opskrifter/hvidvinsbagede-fersken).",
    mistakes: ["Demi-sec champagne. For meget vin. For store kugler."],
    storage: "Fryser 1 uge tildækket. Tag ud 5 min før.",
    glass: "Samme brut — [champagne til mad](/guides/champagne-til-mad).",
  }),
  r({
    slug: "chokolade-trofler-med-portvin",
    title: "Mørke chokoladetrøfler med et strejf af portvin",
    description:
      "Ganache-trøfler med mørk chokolade og ruby portvin. Sødt tapas/petit four til 20 stk.",
    tags: ["opskrift", "dessert", "portvin", "chokolade", "tapas"],
    prepTime: "PT25M",
    cookTime: "PT10M",
    servings: 8,
    wineInRecipe: {
      style: "Ruby portvin",
      amount: "4 spsk portvin i ganachen",
      note: "Portvinen røres i den varme ganache — den er aroma, ikke en klat på toppen.",
    },
    wineToDrink: {
      guideSlug: "vin-til-dessert-og-kransekage",
      searchQuery: "portvin chokolade",
      searchMax: 200,
      label: "portvin til chokolade",
    },
    relatedGuides: ["vin-til-dessert-og-kransekage", "bedste-dessertvin", "vin-til-ost-og-ostebord"],
    ingredients: [
      "200 g mørk chokolade (70 %)",
      "100 ml piskefløde",
      "4 spsk ruby portvin",
      "20 g smør",
      "Kakao til rulle",
    ],
    instructions: [
      "Bring fløde i kog. Hæld over hakket chokolade. Rør til blank ganache. Rør smør og port i.",
      "Køl 2 timer til formbar.",
      "Form kugler, rull i kakao. Køl.",
    ],
    intro: "Chokoladetrøfler med portvin er petit four til ost og tapas, ikke kun dessertbuffet. Porten løfter kakaoen, som i [chokolademousse med portvin](/opskrifter/chokolademousse-med-portvin), men her i bid-størrelse.",
    whyTitle: "Port i ganache",
    why: "Alkohol bærer aroma. For meget splittes ganachen. Ruby matcher mørk chokolade. Se [vin til dessert](/guides/vin-til-dessert-og-kransekage).",
    tips: [
      ["Chokolade", "70 %. 50 % bliver for sødt med port."],
      ["Køl", "For blød: 20 min i fryser. For hård: 10 min rumtemperatur."],
      ["Kakao", "Usødet."],
    ],
    serving: "Kaffe, [gorgonzola-creme](/opskrifter/gorgonzola-creme-med-portvin) som salt kontrast, eller alene.",
    mistakes: ["For meget port. Vand i chokolade. For varm fløde der brænder."],
    storage: "Køleskab 1 uge. Tag ud 15 min før.",
    glass: "Ruby port — [bedste dessertvin](/guides/bedste-dessertvin).",
  }),
  r({
    slug: "rose-granite-med-hindbaer",
    title: "Rosé-granité med friske hindbær",
    description:
      "Granité af tør rosé og hindbær som ganerenser. Opskrift til 6 — rosé i fryseren.",
    tags: ["opskrift", "dessert", "rosé", "hindbær", "tapas", "vegetar"],
    prepTime: "PT15M",
    cookTime: "PT5M",
    servings: 6,
    wineInRecipe: {
      style: "Tør provence-rosé",
      amount: "400 ml tør rosé",
      note: "Roséen fryses med sukkerlage og hindbær til krystaller — vinen er granitéen.",
    },
    wineToDrink: {
      guideSlug: "vin-til-tapas",
      searchQuery: "tør rosé provence",
      searchMax: 140,
      label: "rosé til tapas",
    },
    relatedGuides: ["vin-til-tapas", "vin-til-dessert-og-kransekage", "champagne-til-mad"],
    ingredients: [
      "400 ml tør rosé",
      "80 g sukker",
      "200 g hindbær",
      "1 spsk citronsaft",
    ],
    instructions: [
      "Kog sukker med ½ dl vand. Køl. Blend 100 g hindbær med lagen og citron. Si.",
      "Rør rosé i. Hæld i fad. Frys. Skrab med gaffel hver 30–40 minutter 3–4 gange til krystaller.",
      "Server i kolde glas med hele hindbær.",
    ],
    intro: "Rosé-granité med hindbær er den koldeste ganerenser på tapasbordet: krystaller, syre, bær. Tør rosé — sød rosé bliver is-slik.",
    whyTitle: "Vin som is",
    why: "Alkohol holder krystallerne bløde. For sød vin fryser klumpet. Skrab, ikke blend, hvis du vil have granité og ikke sorbet. Se også [champagne-jordbærsorbet](/opskrifter/champagne-jordbaersorbet).",
    tips: [
      ["Fad", "Lavt fad fryser hurtigere."],
      ["Skrab", "Gaffel til kanten. Glemmer du det, bliver det en blok — tø lidt og skrabe."],
      ["Glas", "Kold skål. Den smelter hurtigt."],
    ],
    serving: "Mellem tapas, eller til [serrano med melon](/opskrifter/serrano-med-hvidvinsmarineret-melon).",
    mistakes: ["Sød rosé. For meget sukker. At glemme at skrabe."],
    storage: "Fryser 3 dage. Skrab igen før servering.",
    glass: "Samme tørre rosé — [vin til tapas](/guides/vin-til-tapas).",
  }),
  r({
    slug: "hvidvinsbagede-fersken",
    title: "Hvidvinsbagede ferskenbåde med mascarpone",
    description:
      "Ferskner bagt i tør hvidvin, serveret med mascarpone. Dessert eller sødt tapas til 4 — vin i fadets bund.",
    tags: ["opskrift", "dessert", "hvidvin", "fersken", "tapas", "vegetar"],
    prepTime: "PT10M",
    cookTime: "PT25M",
    servings: 4,
    wineInRecipe: {
      style: "Tør, frugtig hvidvin — viognier, pinot gris eller tør muscat",
      amount: "200 ml hvidvin",
      note: "Fersknerne bages i hvidvin og sukker, til vinen er sirup i fadet.",
    },
    wineToDrink: {
      guideSlug: "vin-til-dessert-og-kransekage",
      searchQuery: "viognier dessert fersken",
      searchMax: 160,
      label: "hvidvin til fersken",
    },
    relatedGuides: ["vin-til-dessert-og-kransekage", "sadan-bruger-du-vin-til-sauce-og-simren", "vin-til-ost-og-ostebord"],
    ingredients: [
      "4 ferskner, halverede og udstenede",
      "200 ml tør hvidvin",
      "3 spsk sukker",
      "1 vaniljestang eller 1 tsk vanilje",
      "200 g mascarpone",
      "1 tsk honning til cremen",
    ],
    instructions: [
      "Læg ferskner snitside op i ildfast fad. Hæld vin over. Drys sukker og vanilje.",
      "Bag 190 °C 20–25 minutter til møre. Ske saften over undervejs.",
      "Kog saften ind 2 minutter på komfur hvis den er tynd.",
      "Rør mascarpone med honning. Server ferskner lune med creme og sirup.",
    ],
    intro: "Hvidvinsbagede ferskenbåde med mascarpone er sommerdessert og sødt tapas i ét. Vinen i fadet er både damp og sirup — samme tænkning som [hvidvins-abrikoskompot](/opskrifter/hvidvins-abrikoskompot), bare ovn.",
    whyTitle: "Bagning i hvidvin",
    why: "Fersken og viognier er fætre. Sukker og varme koncentrerer. Tør vin, ellers bliver det saft. Se [vin til dessert](/guides/vin-til-dessert-og-kransekage).",
    tips: [
      ["Frugt", "Moden men fast. Meget blød bliver mos."],
      ["Nektarin", "Virker 1:1."],
      ["Creme", "Mascarpone rumtemperatur, ellers klumper honning."],
    ],
    serving: "Alene, eller efter [champagne-jordbærsorbet](/opskrifter/champagne-jordbaersorbet).",
    mistakes: ["For sød vin. For lang bagning. Kold mascarpone lige fra køl oven på varm frugt uden at røre honning i først."],
    storage: "Bagt frugt 2 dage på køl. Cremen frisk.",
    glass: "Samme hvidvin eller moelleux — [vin til dessert](/guides/vin-til-dessert-og-kransekage).",
  }),
];

const GUIDE_RECIPE_ADDITIONS = {
  "vin-til-tapas": [
    { slug: "portvins-fignemarmelade-med-rosmarin", label: "Portvins-fignemarmelade" },
    { slug: "rose-syltede-roedloeg-med-timian", label: "Rosé-syltede rødløg" },
    { slug: "bagt-camembert-med-hvidvin", label: "Bagt camembert med hvidvin" },
    { slug: "manchego-marineret-i-hvidvin", label: "Manchego marineret i hvidvin" },
    { slug: "portvinsglaserede-dadler-med-bacon", label: "Portvinsglaserede dadler" },
    { slug: "kaemperejer-dampet-i-hvidvin", label: "Dampede kæmperejer i hvidvin" },
    { slug: "serrano-med-hvidvinsmarineret-melon", label: "Serrano med hvidvinsmelon" },
  ],
  "vin-til-ost-og-ostebord": [
    { slug: "portvins-fignemarmelade-med-rosmarin", label: "Portvins-fignemarmelade" },
    { slug: "gorgonzola-creme-med-portvin", label: "Gorgonzola-creme med portvin" },
    { slug: "mini-hvidvinsfondue-tapas", label: "Mini-hvidvinsfondue" },
    { slug: "klar-rodvinsgele-med-vanilje", label: "Klar rødvinsgelé" },
  ],
  "vin-til-gedeost": [
    { slug: "rodvinsglaserede-figner-med-gedeost", label: "Rødvinsglaserede figner med gedeost" },
    { slug: "gedeost-crostini-med-skalotteloeg", label: "Gedeost-crostini med skalotteløg" },
  ],
  "vin-til-brie-og-camembert": [
    { slug: "bagt-camembert-med-hvidvin", label: "Bagt camembert med hvidvin" },
  ],
  "vin-til-foie-gras": [{ slug: "sauternes-gele-med-safran", label: "Sauternes-gelé med safran" }],
  "vin-til-and": [{ slug: "rodvinsmarineret-andebryst", label: "Rødvinsmarineret andebryst" }],
  "vin-til-svinekoed": [{ slug: "svinekaeber-i-portvinsreduktion", label: "Svinekæber i portvinsreduktion" }],
  "vin-til-rejer": [{ slug: "kaemperejer-dampet-i-hvidvin", label: "Dampede kæmperejer i hvidvin" }],
  "vin-til-muslinger": [{ slug: "muslinger-i-hvidvin-og-safran", label: "Muslinger i hvidvin og safran" }],
  "vin-til-fisk-og-skaldyr": [
    { slug: "lakse-rilette-med-hvidvin", label: "Lakse-rilette med hvidvin" },
    { slug: "blaeksprutteringe-i-hvidvin", label: "Blæksprutteringe i hvidvin" },
  ],
  "vin-til-dessert-og-kransekage": [
    { slug: "champagne-jordbaersorbet", label: "Champagne-jordbærsorbet" },
    { slug: "chokolade-trofler-med-portvin", label: "Chokoladetrøfler med portvin" },
    { slug: "hvidvinsbagede-fersken", label: "Hvidvinsbagede ferskner" },
    { slug: "rose-granite-med-hindbaer", label: "Rosé-granité med hindbær" },
  ],
  "champagne-til-mad": [{ slug: "champagne-jordbaersorbet", label: "Champagne-jordbærsorbet" }],
};

function buildExpansion(recipe) {
  const dish = recipe.title.split("—")[0].trim();
  const g0 = recipe.relatedGuides[0];
  const g1 = recipe.relatedGuides[1];
  return `## Planlægning og råvarer

${dish} starter med flasken: ${recipe.wineInRecipe.style.toLowerCase()}. Mængden er ${recipe.wineInRecipe.amount.toLowerCase()} — det er ikke et strejf, det er opskriften. Læs relaterede guides [${g0}](/guides/${g0}) og [${g1}](/guides/${g1}) plus [vin til sauce og simren](/guides/sadan-bruger-du-vin-til-sauce-og-simren). Opskriften er til ${recipe.servings} personer som tapas, ostebord eller deling.

Køb vin du også vil drikke til resten af bordet. Undgå «madlavningsvin» med salt — den smager af bouillonterning, når den reduceres. Smag til undervejs: mangler syre, tilsæt citron eller eddike; mangler dybde, reducér længere; for sødt, mere salt eller peber. Samme princip som [chorizo i rødvin](/opskrifter/chorizo-i-rodvin) og [rødvinsgelé til charcuteri](/opskrifter/roedvinsgele-til-charcuteri): vinen skal smage integreret, aldrig som rå alkohol.

Tænk tapasbordet som helhed: én sød (marmelade, gelé, dadel), én salt (ost, skinke), én varm (rejer, fondue) og én kold ganerenser. Denne ret dækker ét af sporene. Brød er næsten altid rigtigt — ciabatta, baguette eller kiks til ost.

## Sådan rammer du timingen

Læs trinene igennem før du tænder blusset. Flere af tapasretterne tåler at laves før gæsterne kommer (marmelade, gelé, riilette, marineret ost); de varme skal ramme bordet med det samme (rejer, camembert, calamari). Hvis du laver flere vine-i-gryden-retter samme aften, åbn én flaske der kan bruges både i gryde og glas, så du ikke ender med tre anbrudte flasker.

Hold øje med salt: serrano, bacon, manchego og gorgonzola bærer allerede salt, så saucer og lager skal smages til sidst. Sødme fra port, sauternes og honning skal mødes af syre — ellers bliver tapasbordet sliksødt.

## Afsluttende bemærkninger

Retten hører til tapas- og delikatessebordet med vin i gryden, lagen eller farsen. ${recipe.wineInRecipe.note} Første gang: følg mængderne. Derefter justér efter den flaske du har åbnet. Har du rest af samme vin, brug den i glasset: [${recipe.wineToDrink.label}](/guides/${recipe.wineToDrink.guideSlug}). Søg gerne efter ${recipe.wineToDrink.searchQuery} på Vinbot, hvis du vil sammenligne pris og butik. God appetit.`;
}

function buildBody(recipe) {
  const tips = recipe.tips.map(([t, d]) => `- **${t}:** ${d}`).join("\n");
  const mistakes = recipe.mistakes.map((m) => `- ${m}`).join("\n");
  return `${recipe.intro}

## ${recipe.whyTitle}

${recipe.why}

## Tips til perfekt resultat

${tips}

## Tilbehør og servering

${recipe.serving}

## Fejl at undgå

${mistakes}

## Opbevaring og variationer

${recipe.storage}

## Vin i glasset

${recipe.glass}

${buildExpansion(recipe)}
`;
}

function buildMdx(recipe) {
  return `---
title: ${yamlQuote(recipe.title)}
description: ${yamlQuote(recipe.description)}
slug: ${recipe.slug}
updated: ${yamlQuote(UPDATED)}
published: ${yamlQuote(UPDATED)}
tags: [${recipe.tags.map(yamlQuote).join(", ")}]
prepTime: ${yamlQuote(recipe.prepTime)}
cookTime: ${yamlQuote(recipe.cookTime)}
servings: ${recipe.servings}
difficulty: ${recipe.difficulty}
wineInRecipe:
  style: ${yamlQuote(recipe.wineInRecipe.style)}
  amount: ${yamlQuote(recipe.wineInRecipe.amount)}
  note: ${yamlQuote(recipe.wineInRecipe.note)}
wineToDrink:
  guideSlug: ${recipe.wineToDrink.guideSlug}
  searchQuery: ${yamlQuote(recipe.wineToDrink.searchQuery)}
  searchMax: ${recipe.wineToDrink.searchMax}
  label: ${yamlQuote(recipe.wineToDrink.label)}
relatedGuides:
${yamlList(recipe.relatedGuides, 2)}
ingredients:
${yamlList(recipe.ingredients, 2)}
instructions:
${yamlList(recipe.instructions, 2)}
---

${buildBody(recipe)}`;
}

function updateGuideRecipeLinks(additions) {
  let content = fs.readFileSync(GUIDE_LINKS_PATH, "utf8");
  let added = 0;
  for (const [guideSlug, links] of Object.entries(additions)) {
    for (const link of links) {
      const already = new RegExp(`"${guideSlug}":[\\s\\S]*?slug: "${link.slug}"`);
      if (already.test(content)) continue;
      const keyRe = new RegExp(`"${guideSlug}":\\s*\\[`);
      if (keyRe.test(content)) {
        const insertRe = new RegExp(`("${guideSlug}":\\s*\\[[\\s\\S]*?)(\\n  \\],)`);
        if (insertRe.test(content)) {
          content = content.replace(
            insertRe,
            `$1\n    { slug: "${link.slug}", label: ${JSON.stringify(link.label)} },$2`,
          );
          added++;
        }
      } else {
        const closing = content.lastIndexOf("\n};");
        const entry = `  "${guideSlug}": [\n    { slug: "${link.slug}", label: ${JSON.stringify(link.label)} },\n  ],\n`;
        content = content.slice(0, closing) + "\n" + entry + content.slice(closing);
        added++;
      }
    }
  }
  fs.writeFileSync(GUIDE_LINKS_PATH, content);
  return added;
}

const force = process.argv.includes("--force");
if (!fs.existsSync(RECIPES_DIR)) fs.mkdirSync(RECIPES_DIR, { recursive: true });

const created = [];
const skipped = [];
for (const recipe of RECIPES) {
  const filePath = path.join(RECIPES_DIR, `${recipe.slug}.mdx`);
  if (fs.existsSync(filePath) && !force) {
    skipped.push(recipe.slug);
    continue;
  }
  const mdx = buildMdx(recipe);
  const body = mdx.split("---").slice(2).join("---");
  const words = body.split(/\s+/).filter(Boolean).length;
  if (words < 400) console.warn(`WARN: ${recipe.slug} har kun ${words} ord`);
  fs.writeFileSync(filePath, mdx);
  created.push(`${recipe.slug} (${words} ord)`);
}

const linksAdded = updateGuideRecipeLinks(GUIDE_RECIPE_ADDITIONS);
console.log(`Opskrifter: ${created.length} oprettet, ${skipped.length} sprunget over.`);
console.log(`Guide-links: ${linksAdded}`);
for (const line of created) console.log(`  - ${line}`);

