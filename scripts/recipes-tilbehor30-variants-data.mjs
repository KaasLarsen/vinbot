/** Data: Vin-tilbehør variants — tydelige varianter af allerede dækkede temaer. */
import { r } from "./add-recipes-tilbehor30-lib.mjs";

export const UPDATED = "2026-09-23";

export const SLUG_EXPANSIONS = {
  "moscato-abrikoskompot":
    "Brug lyse eller sorte abrikoser — gerne lidt faste. Moscato d'Asti er sød og let mousserende; den mister boblerne i gryden, men beholder floral sødme og abrikos-aroma. Vanilje understreger dessert-siden; server primært til gedeost og yoghurt. Tæt på hvidvins-abrikoskompot, men sødere og mere italiensk i karakter.",
  "rodvinssyltede-roedloeg":
    "Klassiske pink burger-løg, men med rødvin og rødvinseddike i stedet for hvidvin. Giver dybere rød farve og rundere smag. Skær tynde ringe, hæld kogende lage over, og lad trække mindst 2 timer. Adskiller sig fra hvidvinssyltede og rosé-syltede ved farve og dybde.",
  "portvinsglasering-til-and-og-flaeskesteg":
    "Tyk glace af rød portvin, andefedt (eller smør), appelsinsaft og brun farin. Pensles på and eller flæskesteg de sidste 10 minutter i ovnen. Dette er selve glaseringen som produkt — ikke en færdig andebryst-ret. Gem resten til at dryppe ved servering.",
  "sherry-honning-glace-til-skinke":
    "Pedro Ximénez (PX) eller anden sød sherry + honning til pensling af juleskinke. Mere sirupsagtig og sød end Madeira-skinke-sauce. Pensl flere gange de sidste 20–30 minutter. Undgå at brænde sukkeret — sænk ovntemperaturen hvis det mørkner for hurtigt.",
  "pocherede-blommer-i-rodvin-og-nelliker":
    "Halverede blommer pocheret og lagt på glas i krydret, tyk rødvinssirup med nelliker. Selvstændigt tilbehør til trifli, ost og is — ikke en færdig trifli-dessert. Vælg faste blommer, så de ikke falder fra hinanden.",
};

export const GUIDE_RECIPE_ADDITIONS = {
  "vin-til-ost-og-ostebord": [
    { slug: "moscato-abrikoskompot", label: "Moscato-abrikoskompot" },
    { slug: "pocherede-blommer-i-rodvin-og-nelliker", label: "Pocherede blommer i rødvin" },
  ],
  "vin-til-dessert-og-kransekage": [
    { slug: "moscato-abrikoskompot", label: "Moscato-abrikoskompot" },
    { slug: "pocherede-blommer-i-rodvin-og-nelliker", label: "Pocherede blommer i rødvin" },
  ],
  "vin-til-burger": [
    { slug: "rodvinssyltede-roedloeg", label: "Rødvinssyltede rødløg" },
  ],
  "vin-til-tapas": [
    { slug: "rodvinssyltede-roedloeg", label: "Rødvinssyltede rødløg" },
  ],
  "vin-til-and": [
    { slug: "portvinsglasering-til-and-og-flaeskesteg", label: "Portvinsglasering til and" },
  ],
  "vin-til-flaesketesteg": [
    { slug: "portvinsglasering-til-and-og-flaeskesteg", label: "Portvinsglasering til flæskesteg" },
    { slug: "sherry-honning-glace-til-skinke", label: "Sherry-honning-glace til skinke" },
  ],
  "vin-til-julefrokost": [
    { slug: "sherry-honning-glace-til-skinke", label: "Sherry-honning-glace til skinke" },
    { slug: "rodvinssyltede-roedloeg", label: "Rødvinssyltede rødløg" },
  ],
  "sadan-bruger-du-vin-til-sauce-og-simren": [
    { slug: "portvinsglasering-til-and-og-flaeskesteg", label: "Portvinsglasering" },
    { slug: "sherry-honning-glace-til-skinke", label: "Sherry-honning-glace" },
  ],
};

export const RECIPES = [
  r({
    slug: "moscato-abrikoskompot",
    title: "Moscato d'Asti-abrikoskompot med vanilje",
    description:
      "Abrikoser kogt møre i sød Moscato d'Asti med et strejf af vanilje. Opskrift til 6 — genial til gedeost og yoghurt.",
    tags: ["opskrift", "tapas", "tilbehør", "dessert", "moscato", "hvidvin", "abrikos", "vegetar", "ost"],
    prepTime: "PT15M",
    cookTime: "PT20M",
    servings: 6,
    difficulty: "easy",
    wineInRecipe: {
      style: "Moscato d'Asti eller anden sød, aromatisk mousserende muscat",
      amount: "250 ml Moscato d'Asti",
      note: "Abrikoser pocheres i Moscato — den søde vin er både lagen og sødmen.",
    },
    wineToDrink: {
      guideSlug: "vin-til-ost-og-ostebord",
      searchQuery: "moscato d asti gedeost abrikos",
      searchMax: 150,
      label: "Moscato til gedeost",
    },
    relatedGuides: [
      "vin-til-ost-og-ostebord",
      "vin-til-dessert-og-kransekage",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "500 g abrikoser, halverede og udstenede (lyse eller sorte)",
      "250 ml Moscato d'Asti",
      "40–60 g sukker (justér efter vinens sødme)",
      "1/2 vaniljestang, flækket (eller 1/2 tsk vaniljepasta)",
      "1 strimmel citronskal",
      "1 knivspids salt",
    ],
    instructions: [
      "Bring Moscato, sukker, vanilje, citronskal og salt i kog i en gryde. Rør til sukkeret er opløst.",
      "Læg abrikoser i. Simr blidt 8–12 minutter, til de er møre men stadig hele.",
      "Tag frugten op. Kog lagen ind 4–6 minutter til let sirup. Fjern citronskal; skrab vaniljekorn i.",
      "Hæld sirup over abrikoserne. Server lun eller kold.",
    ],
    intro: `**Moscato d'Asti-abrikoskompot** er den søde, italienske søster til [hvidvins-abrikoskompot](/opskrifter/hvidvins-abrikoskompot): samme frugt, men med floral Moscato og vanilje i stedet for tør hvidvin og rosmarin. Boblerne forsvinder i gryden — smagen af fersken, blomst og honning bliver. Genial til gedeost, yoghurt og lyse desserter.`,
    why: `Moscato har **naturlig abrikos- og blomsteraroma**, så vinen og frugten spejler hinanden. Mindre ekstra sukker er nødvendigt end med tør vin. Læs [vin til ost](/guides/vin-til-ost-og-ostebord) og [vin til dessert](/guides/vin-til-dessert-og-kransekage).`,
    tips: [
      ["Sødme", "Smag vinen først — meget sød Moscato kræver næsten intet sukker."],
      ["Frugt", "Lidt faste abrikoser. Overmodne falder fra hinanden."],
      ["Vanilje", "Ægte stang. For meget bliver parfumeret."],
      ["Forskel", "Vil du have savoury/urtet: brug den tørre [hvidvins-abrikoskompot](/opskrifter/hvidvins-abrikoskompot) i stedet."],
    ],
    serving: `Chèvre, ricotta, yoghurt, pandekager eller som topping på [Moscato-pocherede ferskner](/opskrifter/moscato-pocherede-ferskner)-agtige desserter. Også god til brie.`,
    mistakes: [
      "For meget sukker oveni sød vin — slik-kompot.",
      "Hård kogning — mos i stedet for hele halvdele.",
      "At forvente bobler i den færdige kompot — de er kogt væk.",
      "At bruge tør prosecco i stedet — så er det en anden opskrift (mere som hvidvinsversionen).",
    ],
    storage: `Køleskab 5 dage. Frys op til 2 måneder. Siruppen geléer let ved køl — det er fint.`,
    glass: `Samme Moscato d'Asti eller anden sød muscat — se [vin til ost](/guides/vin-til-ost-og-ostebord).`,
    faq: [
      ["Kan jeg bruge tørrede abrikoser?", "Ja — udblød 30 min i Moscato før kogning. Brug lidt mindre sukker."],
      ["Uden alkohol?", "Druesaft + 1 spsk citron. Mangler dog Moscato-aromaen."],
      ["Til kød?", "Bedre til ost/dessert. Til flæsk: vælg den tørre hvidvinsversion med rosmarin."],
    ],
  }),

  r({
    slug: "rodvinssyltede-roedloeg",
    title: "Rødvinssyltede rødløg",
    description:
      "Klassiske pink burger-løg syltet i rødvin og rødvinseddike for dybere farve og rundere smag. Opskrift til 1 glas.",
    tags: ["opskrift", "tilbehør", "tapas", "rødvin", "løg", "syltet", "burger", "vegetar"],
    prepTime: "PT10M",
    cookTime: "PT5M",
    servings: 8,
    difficulty: "easy",
    wineInRecipe: {
      style: "Frugtig tør rødvin — grenache, merlot eller ung Côtes du Rhône",
      amount: "100 ml rødvin + 100 ml rødvinseddike",
      note: "Rødvin og rødvinseddike er lagen — dybere farve og rundere syre end hvidvinssyltning.",
    },
    wineToDrink: {
      guideSlug: "vin-til-burger",
      searchQuery: "zinfandel burger rødvin",
      searchMax: 150,
      label: "vin til burger",
    },
    relatedGuides: [
      "vin-til-burger",
      "vin-til-tapas",
      "vin-til-julefrokost",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "2 store rødløg, skåret i fine ringe",
      "100 ml frugtig rødvin",
      "100 ml rødvinseddike",
      "2 spsk sukker",
      "1 tsk salt",
      "1 tsk sorte peberkorn",
      "1 laurbærblad (valgfri)",
      "1 kvist timian (valgfri)",
    ],
    instructions: [
      "Læg løgringe i et steriliseret glas. Pres dem let sammen.",
      "Bring rødvin, eddike, sukker, salt, peberkorn og krydderi i kog. Rør til sukkeret er opløst — kog 1 minut.",
      "Hæld den kogende lage over løgene, så de er helt dækket. Luk glasset.",
      "Køl til stuetemperatur, stil i køleskab mindst 2 timer — helst natten over.",
    ],
    intro: `**Rødvinssyltede rødløg** er den klassiske pink burger-topping med ekstra dybde: rødvin og rødvinseddike giver mørkere rød farve og rundere smag end [syltede rødløg med hvidvin](/opskrifter/syltede-roedloeg-med-hvidvin) og [rosé-syltede rødløg](/opskrifter/rose-syltede-roedloeg-med-timian). Sprøde, syrlige og klar på under en time (plus trækketid).`,
    why: `Rødvin tilfører **farve og frugt**, så lagen ikke kun smager af skarp eddike. Perfekt mod fedt kød og cheddar. Læs [vin til burger](/guides/vin-til-burger).`,
    tips: [
      ["Skæring", "Fine ringe — tykke skiver bliver ikke gennemsyrede."],
      ["Lage", "Skal dække. Lav mere i samme forhold ved behov."],
      ["Make-ahead", "Dag 2–3 er bedst. Bliver mildere med tiden."],
      ["Vs kompot", "Vil du have sød, kogt topping: brug [rødvins-løgkompot](/opskrifter/rodvins-loegkompot)."],
    ],
    serving: `Burgere, smash burgers, pølser, [tapas](/guides/vin-til-tapas), ostebord og roastbeef-smørrebrød. Prøv sammen med [portvins-baconmarmelade](/opskrifter/portvins-baconmarmelade).`,
    mistakes: [
      "For tykke løgskiver — rå midte.",
      "Meget tannin-tung vin — bitter lage.",
      "At spise efter 10 minutter — smagen er ikke trukket ind.",
      "At forveksle med løgkompot — denne skal være sprød, ikke kogt blød.",
    ],
    storage: `Køleskab 2–3 uger. Hold løgene under lagen. Frys ikke.`,
    glass: `Zinfandel eller samme frugtige rødvin — se [vin til burger](/guides/vin-til-burger).`,
    faq: [
      ["Hvidvin eller rødvin?", "Hvidvin = lysere og skarpere. Rødvin = dybere farve og rundere. Begge er gode."],
      ["Kan jeg bruge kun eddike?", "Ja, men du mister vinens frugt. Halv vin / halv eddike er pointen her."],
      ["Til julefrokost?", "Ja — klassisk syltet indslag på bordet."],
    ],
  }),

  r({
    slug: "portvinsglasering-til-and-og-flaeskesteg",
    title: "Portvinsglasering til and og flæskesteg",
    description:
      "Tyk glace af rød portvin, andefedt, appelsinsaft og brun farin til at pensle på kødet de sidste 10 minutter. Opskrift til 1 steg.",
    tags: ["opskrift", "sauce", "glaze", "portvin", "and", "flæskesteg", "jul"],
    prepTime: "PT5M",
    cookTime: "PT20M",
    servings: 8,
    difficulty: "easy",
    wineInRecipe: {
      style: "Rød portvin — ruby eller tawny",
      amount: "200 ml portvin",
      note: "Portvin reduceres med appelsin og farin til tyk pensle-glace.",
    },
    wineToDrink: {
      guideSlug: "vin-til-and",
      searchQuery: "pinot noir and portvin",
      searchMax: 180,
      label: "vin til and",
    },
    relatedGuides: [
      "vin-til-and",
      "vin-til-flaesketesteg",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "200 ml rød portvin",
      "100 ml appelsinsaft (gerne friskpresset)",
      "2 spsk brun farin",
      "1 spsk andefedt eller smør",
      "1 tsk dijonsennep (valgfri)",
      "1 knivspids salt",
      "Evt. 1 strimmel appelsinskal",
    ],
    instructions: [
      "Hæld portvin, appelsinsaft, farin, andefedt, sennep, salt og skal i en lille gryde. Bring i kog.",
      "Simr 12–18 minutter, til glacen er tyk og blank og coat'er en ske (ca. 1 dl tilbage).",
      "Fjern appelsinskal. Hold lun.",
      "Pensl and eller flæskesteg de sidste 8–10 minutter i ovnen. Gentag 1–2 gange. Dryp resten ved servering.",
    ],
    intro: `**Portvinsglasering til and og flæskesteg** er den tykke, fedtede glace, du pensler på kødet de sidste minutter i ovnen — ikke en færdig anderet. Rød portvin, andefedt, appelsin og brun farin koges ind til blank pensel. Hvor [andebryst med portvins- og figneglasering](/opskrifter/andebryst-med-portvins-og-figneglasering) er en komplet ret, er dette glaseringen som selvstændigt værktøj til hele stegen.`,
    why: `Portvin giver **sødme og dybde**; appelsin skærer fedtet; andefedt binder og giver glans. Læs [vin til and](/guides/vin-til-and) og [vin til flæskesteg](/guides/vin-til-flaesketesteg).`,
    tips: [
      ["Timing", "Først til sidst — ellers brænder sukkeret."],
      ["Konsistens", "Skal kunne pensles, ikke løbe som vand."],
      ["Flæskesteg", "Pensl kun kødsiden / skorpen let — pas på sværen hvis den skal holde sig sprød."],
      ["Rest", "Varm op og server som dryp ved siden af."],
    ],
    serving: `Hel and, andebryst, flæskesteg eller juleskinke. Tilbehør: [æble-hvidvinskompot](/opskrifter/aeble-hvidvinskompot-med-timian) eller [rødvinssyltede tyttebær](/opskrifter/rodvinssyltede-tyttebaer).`,
    mistakes: [
      "At pensle for tidligt — brændt, bitter skorpe.",
      "For tynd glace — drypper af uden at sætte sig.",
      "Kun port uden syre — sliksød. Appelsin er vigtig.",
      "At forveksle med færdig sauce til tallerkenen — dette er primært pensling.",
    ],
    storage: `Køleskab 1 uge. Genvarm blidt. Frys i isterninger op til 2 måneder.`,
    glass: `Pinot noir til and, frugtig rød til flæsk — se [vin til and](/guides/vin-til-and).`,
    faq: [
      ["Uden andefedt?", "Brug smør eller 1 spsk olie. Andefedt er mest autentisk til and."],
      ["Til kalkun?", "Ja — samme metode de sidste 10–15 minutter."],
      ["Ruby eller tawny?", "Ruby = mere frugt; tawny = mere nøddeagtig. Begge virker."],
    ],
  }),

  r({
    slug: "sherry-honning-glace-til-skinke",
    title: "Sherry- og honning-glace til skinke",
    description:
      "Marinade og glace af sød sherry (Pedro Ximénez) og honning til at pensle på juleskinke. Opskrift til 1 skinke.",
    tags: ["opskrift", "sauce", "glaze", "sherry", "skinke", "jul", "honning"],
    prepTime: "PT5M",
    cookTime: "PT15M",
    servings: 10,
    difficulty: "easy",
    wineInRecipe: {
      style: "Sød sherry — Pedro Ximénez (PX) eller cream sherry",
      amount: "150 ml sød sherry",
      note: "PX og honning reduceres til tyk glace til skinke.",
    },
    wineToDrink: {
      guideSlug: "vin-til-flaesketesteg",
      searchQuery: "skinke riesling pinot noir jul",
      searchMax: 150,
      label: "vin til skinke",
    },
    relatedGuides: [
      "vin-til-flaesketesteg",
      "vin-til-julefrokost",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "150 ml Pedro Ximénez eller cream sherry",
      "3 spsk honning",
      "1 spsk dijonsennep",
      "1 spsk smør",
      "1 tsk æblecidereddike eller sherryeddike",
      "1 knivspids nellike eller allehånde (valgfri)",
      "Friskkværnet peber",
    ],
    instructions: [
      "Hæld sherry, honning, sennep, smør, eddike og krydderi i en lille gryde. Bring i kog under omrøring.",
      "Simr 8–12 minutter, til glacen er tyk og blank.",
      "Pensl skinken de sidste 20–30 minutter i ovnen — gerne 2–3 gange med 5–8 minutters mellemrum.",
      "Server resten som dryp ved siden af. Smag til med peber.",
    ],
    intro: `**Sherry- og honning-glace til skinke** er den søde, mørke pensling til juleskinken: Pedro Ximénez og honning kogt ind til sirupsagtig glace. Hvor [glaseret skinke med Madeirasauce](/opskrifter/glaseret-skinke-med-madeirasauce) er mere nøddeagtig og sauce-agtig, er denne PX-version dybere, sødere og mere «sticky» — klassisk glaze-karakter.`,
    why: `PX har **tørrede frugt- og rosinnnoter**, der matcher salt skinke og honning. Eddike og sennep holder sødmen i skak. Læs [vin til flæskesteg](/guides/vin-til-flaesketesteg) og [julefrokost](/guides/vin-til-julefrokost).`,
    tips: [
      ["Ovntemperatur", "Hvis glacen brænder: sænk 10–15 °C og pensl sjældnere."],
      ["Sennep", "Giver kant — spring ikke over, medmindre du vil have ren sødme."],
      ["Skinke", "Virker på kogt skinke, der varmes i ovnen, og på bagt skinke."],
      ["Vs Madeira", "Madeira = nøddeagtig. PX = mere sød og mørk. Begge er jul."],
    ],
    serving: `Juleskinke, pålægsskinke til buffet, eller penslet på svinekam. Server med [hvidvinssyltede agurker](/opskrifter/hvidvinssyltede-agurker-med-dild) og sennep.`,
    mistakes: [
      "At pensle fra start — brændt sukker.",
      "Kun honning uden sherry — flad sødme.",
      "For tynd glace — sætter sig ikke.",
      "At glemme syre — bliver slik.",
    ],
    storage: `Køleskab 2 uger. Genvarm blidt med en skvæt sherry. Frys op til 2 måneder.`,
    glass: `Riesling, pinot noir eller øl til skinken — se [vin til flæskesteg](/guides/vin-til-flaesketesteg).`,
    faq: [
      ["Kan jeg bruge tør sherry?", "Ja, men tilsæt 1 ekstra spsk honning. PX er mere autentisk her."],
      ["Til and?", "Muligt, men [portvinsglasering](/opskrifter/portvinsglasering-til-and-og-flaeskesteg) passer bedre til and."],
      ["Børn?", "Alkoholen reduceres; smagen bliver. Lav en portion honning+sennep uden sherry til dem, der ønsker det."],
    ],
  }),

  r({
    slug: "pocherede-blommer-i-rodvin-og-nelliker",
    title: "Pocherede blommer i rødvin og nelliker",
    description:
      "Halverede blommer lagt på glas i krydret, tyk rødvinssirup med nelliker. Opskrift til 6–8 — til trifli, ost og is.",
    tags: ["opskrift", "tilbehør", "dessert", "rødvin", "blommer", "syltet", "vegetar"],
    prepTime: "PT15M",
    cookTime: "PT25M",
    servings: 8,
    difficulty: "easy",
    wineInRecipe: {
      style: "Frugtig rødvin — merlot, grenache, zinfandel eller ung pinot",
      amount: "400 ml rødvin",
      note: "Blommer pocheres i rødvin med nelliker — vinen bliver til tyk sirup på glas.",
    },
    wineToDrink: {
      guideSlug: "vin-til-dessert-og-kransekage",
      searchQuery: "rødvin dessert blommer portvin",
      searchMax: 150,
      label: "vin til dessert",
    },
    relatedGuides: [
      "vin-til-dessert-og-kransekage",
      "vin-til-ost-og-ostebord",
      "sadan-bruger-du-vin-til-sauce-og-simren",
    ],
    ingredients: [
      "800 g faste blommer, halverede og udstenede",
      "400 ml frugtig rødvin",
      "120 g sukker",
      "4–5 hele nelliker",
      "1 kanelstang",
      "1 strimmel citronskal",
      "1 knivspids salt",
    ],
    instructions: [
      "Bring vin, sukker, nelliker, kanel, citronskal og salt i kog under omrøring.",
      "Læg blommerne i snitflade ned. Simr blidt 8–12 minutter, til de er møre men stadig holder formen.",
      "Tag blommerne op med hulske og læg dem i steriliserede glas. Kog lagen ind 8–10 minutter til tyk sirup. Fjern krydderi.",
      "Hæld sirup over blommerne, så de er dækket. Luk glassene. Køl af.",
    ],
    intro: `**Pocherede blommer i rødvin og nelliker** er efterårets glas: halverede blommer i krydret, tyk rødvinssirup. Fantastisk til trifli, ost og vaniljeis. Hvor [plommetrifli med rødvinssirup](/opskrifter/plommetrifli-med-rodvinssirup) er en færdig dessert, er dette tilbehøret på lager — klar når du skal bygge trifli eller ostebord.`,
    why: `Rødvin og nelliker giver **krydret dybde**; indkogning koncentrerer sødme og farve. Faste blommer beholder tekstur. Læs [vin til dessert](/guides/vin-til-dessert-og-kransekage).`,
    tips: [
      ["Blommer", "Faste sorter. Overmodne bliver mos."],
      ["Nelliker", "Hele — 4–5 er nok. For mange smager medicinsk."],
      ["Sirup", "Skal nappe. For tynd: kog længere efter frugten er taget op."],
      ["Trifli", "Brug blommer + sirup i lag med creme og kiks."],
    ],
    serving: `Trifli, vaniljeis, yoghurt, blåskimmel eller cheddar. Dryp også [rødvinssirup med vanilje](/opskrifter/rodvinssirup-med-vanilje) over, hvis du vil have ekstra glans.`,
    mistakes: [
      "For hård kogning — blommemos.",
      "For mange nelliker — apotek-smag.",
      "At fylde glasset uden nok sirup — frugt tørrer ud.",
      "Meget tannin-tung vin — bitter sirup.",
    ],
    storage: `Køleskab 1–2 uger. Frys blommer med sirup op til 3 måneder. Server kold eller let lunkent.`,
    glass: `Samme frugtige rødvin, portvin eller Moscato — se [vin til dessert](/guides/vin-til-dessert-og-kransekage).`,
    faq: [
      ["Med skræl?", "Ja — skrællen holder formen. Dup gerne let."],
      ["Andre frugter?", "Pærer og ferskner virker med samme metode — justér kogetid."],
      ["Til vildt?", "Ja, som syrlig-sød tilbehør — mindre sukker i lagen."],
    ],
  }),
];
