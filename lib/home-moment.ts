import { FOOD_PICKER_DISHES, type FoodPickerDish } from "./food-picker/dishes.ts";

export type HomeMomentId =
  | "jul"
  | "nytaar"
  | "fastelavn"
  | "paaske"
  | "konfirmation"
  | "mortens"
  | "friday"
  | "sunday"
  | "grill"
  | "efteraar"
  | "vinter"
  | "foraar"
  | "weekday";

export type HomeMomentLink = {
  href: string;
  label: string;
};

export type HomeMoment = {
  id: HomeMomentId;
  /** Short label for the home strip */
  headline: string;
  blurb: string;
  links: HomeMomentLink[];
  dishIds: string[];
  recipeSlugs: string[];
  saesonHeadline: string;
  saesonIntro: string;
  saesonGuideLinks: HomeMomentLink[];
  saesonRecipeLinks: HomeMomentLink[];
};

export type CopenhagenParts = {
  year: number;
  month: number;
  day: number;
  weekday: number;
  hour: number;
  isoWeek: number;
};

const WEEKDAY_INDEX: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

/** ISO week (Mon-start) for a calendar date in Copenhagen. */
export function isoWeekFromYmd(year: number, month: number, day: number): number {
  const date = new Date(Date.UTC(year, month - 1, day));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

export function copenhagenParts(now: Date = new Date()): CopenhagenParts {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Copenhagen",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    weekday: "short",
    hour: "numeric",
    hourCycle: "h23",
  });
  const map: Record<string, string> = {};
  for (const part of dtf.formatToParts(now)) {
    if (part.type !== "literal") map[part.type] = part.value;
  }
  const year = Number(map.year);
  const month = Number(map.month);
  const day = Number(map.day);
  const weekday = WEEKDAY_INDEX[map.weekday] ?? 0;
  const hour = Number(map.hour);
  return {
    year,
    month,
    day,
    weekday,
    hour,
    isoWeek: isoWeekFromYmd(year, month, day),
  };
}

function g(slug: string, label: string): HomeMomentLink {
  return { href: `/guides/${slug}`, label };
}

function r(slug: string, label: string): HomeMomentLink {
  return { href: `/opskrifter/${slug}`, label };
}

const DEFAULT_DISH_IDS = FOOD_PICKER_DISHES.map((d) => d.id);

const DEFAULT_RECIPES = [
  "coq-au-vin",
  "risotto-med-hvidvin",
  "pizza-margherita",
  "klassisk-burger",
] as const;

function momentFromId(id: HomeMomentId): HomeMoment {
  switch (id) {
    case "jul":
      return {
        id,
        headline: "December: vin til julemaden",
        blurb: "Flæskesteg, and og det søde bord — tre guides der redder juleindkøbet.",
        links: [
          g("vin-til-flaesketesteg", "Flæskesteg"),
          g("vin-til-juleand", "Juleand"),
          g("vin-til-julemad-den-store-guide", "Hele julemaden"),
        ],
        dishIds: prioritizeDishes(["flaeskesteg", "boef", "kylling", "pasta-tomat"]),
        recipeSlugs: [
          "flaesketesteg-med-rodvin-i-brun-sovs",
          "juleand",
          "risalamande-med-hvidvin",
          "coq-au-vin",
        ],
        saesonHeadline: "Lige nu: jul og julemad",
        saesonIntro:
          "Hele december handler om syre til fedtet, sødme til desserten og flasker der kan følge et langt julebord.",
        saesonGuideLinks: [
          g("vin-til-flaesketesteg", "vin til flæskesteg"),
          g("vin-til-juleaften", "juleaften"),
          g("vin-til-juleand", "juleand"),
          g("bedste-julevin", "bedste julevin"),
          g("vin-til-julemad-den-store-guide", "julemad"),
        ],
        saesonRecipeLinks: [
          r("flaesketesteg-med-rodvin-i-brun-sovs", "flæskesteg med rødvin i brun sovs"),
          r("juleand", "juleand"),
          r("risalamande-med-hvidvin", "risalamande"),
        ],
      };
    case "nytaar":
      return {
        id,
        headline: "Nytår: bobler og menuen",
        blurb: "Velkomst, hovedret og det sidste glas — uden at gætte i mørket.",
        links: [
          g("vin-til-nytaar-og-nytaarsmenu", "Nytårsmenu"),
          g("vin-til-tapas", "Tapas og snacks"),
          g("vin-til-sushi", "Sushi"),
        ],
        dishIds: prioritizeDishes(["tapas", "sushi", "fisk", "boef"]),
        recipeSlugs: ["pizza-margherita", "klassisk-burger", "risotto-med-hvidvin", "coq-au-vin"],
        saesonHeadline: "Lige nu: nytår",
        saesonIntro: "Bobler til midnat, og en plan for menuen så I ikke står med tre tilfældige flasker.",
        saesonGuideLinks: [
          g("vin-til-nytaar-og-nytaarsmenu", "nytår og nytårsmenu"),
          g("vin-til-tapas", "tapas"),
          g("vin-til-sushi", "sushi"),
        ],
        saesonRecipeLinks: [r("risotto-med-hvidvin", "risotto"), r("coq-au-vin", "coq au vin")],
      };
    case "fastelavn":
      return {
        id,
        headline: "Fastelavn: boller og hverdagsvin",
        blurb: "Lettere rød og hvid til fastelavnsmad — og det der lander på bordet bagefter.",
        links: [
          g("vin-til-fastelavn", "Fastelavn"),
          g("vin-til-burger", "Burger"),
          g("vin-til-pizza", "Pizza"),
        ],
        dishIds: prioritizeDishes(["burger", "pizza", "pasta-tomat", "kylling"]),
        recipeSlugs: ["klassisk-burger", "pizza-margherita", "coq-au-vin", "risotto-med-hvidvin"],
        saesonHeadline: "Lige nu: fastelavn",
        saesonIntro: "Fastelavn er hverdagsfest: boller, masker og vin der ikke skal være højtidelig.",
        saesonGuideLinks: [g("vin-til-fastelavn", "fastelavn"), g("vin-til-burger", "burger")],
        saesonRecipeLinks: [r("klassisk-burger", "klassisk burger")],
      };
    case "paaske":
      return {
        id,
        headline: "Påske: frokost og lam",
        blurb: "Sild, æg og lam — vine der kan følge et langt påskebord.",
        links: [
          g("vin-til-paaske-og-paaskefrokost", "Påskefrokost"),
          g("vin-til-lam", "Lam"),
          g("vin-til-fisk-og-skaldyr", "Fisk"),
        ],
        dishIds: prioritizeDishes(["fisk", "kylling", "boef", "tapas"]),
        recipeSlugs: ["risotto-med-hvidvin", "coq-au-vin", "gazpacho", "pizza-margherita"],
        saesonHeadline: "Lige nu: påske",
        saesonIntro: "Påsken blander frokost, lam og forår — planlæg både hvidvin til sild og rød til lammet.",
        saesonGuideLinks: [
          g("vin-til-paaske-og-paaskefrokost", "påske og påskefrokost"),
          g("vin-til-lam", "lam"),
          g("vin-til-asparges", "asparges"),
        ],
        saesonRecipeLinks: [r("risotto-med-hvidvin", "risotto")],
      };
    case "konfirmation":
      return {
        id,
        headline: "Fest: konfirmation, student og selskab",
        blurb: "Bobler, hvidvin til 50 og et budget der holder — start her.",
        links: [
          g("vin-til-konfirmation", "Konfirmation"),
          { href: "/fest-og-vin", label: "Fest og selskab" },
          g("vin-til-sommerbryllup", "Bryllup"),
        ],
        dishIds: prioritizeDishes(["tapas", "fisk", "sushi", "kylling"]),
        recipeSlugs: ["gazpacho", "risotto-med-hvidvin", "pizza-margherita", "grillet-kylling-med-hvidvin"],
        saesonHeadline: "Lige nu: konfirmation, student og selskab",
        saesonIntro:
          "Maj og juni er højsæson for store borde. Tænk mængde, bobler og flasker der smager godt uden at sprænge budgettet.",
        saesonGuideLinks: [
          g("vin-til-konfirmation", "konfirmation"),
          { href: "/fest-og-vin", label: "fest og selskab" },
          g("vin-til-sommerbryllup", "sommerbryllup"),
        ],
        saesonRecipeLinks: [r("gazpacho", "gazpacho"), r("grillet-kylling-med-hvidvin", "grillet kylling")],
      };
    case "mortens":
      return {
        id,
        headline: "Mortensaften: and og kraftig rødvin",
        blurb: "And, sauce og vine med krop — før juletravlheden tager over.",
        links: [g("vin-til-mortensaften", "Mortensaften"), g("vin-til-and", "And"), g("vin-til-vildt", "Vildt")],
        dishIds: prioritizeDishes(["boef", "kylling", "flaeskesteg", "grill"]),
        recipeSlugs: ["juleand", "coq-au-vin", "boeuf-bourguignon", "lasagne-med-rodvin"],
        saesonHeadline: "Lige nu: Mortensaften og efterår",
        saesonIntro: "Anden på Mortensaften kalder på rødvin med fylde — og er en god generalprøve til juleanden.",
        saesonGuideLinks: [
          g("vin-til-mortensaften", "Mortensaften"),
          g("vin-til-and", "and"),
          g("vin-til-vildt", "vildt"),
        ],
        saesonRecipeLinks: [r("juleand", "juleand"), r("boeuf-bourguignon", "boeuf bourguignon")],
      };
    case "friday":
      return {
        id,
        headline: "Fredag: takeaway og weekend-gear",
        blurb: "Pizza, burger og det der lander på sofaen — tre hurtige match.",
        links: [g("vin-til-pizza", "Pizza"), g("vin-til-burger", "Burger"), g("vin-til-tapas", "Tapas")],
        dishIds: prioritizeDishes(["pizza", "burger", "tapas", "grill"]),
        recipeSlugs: ["pizza-margherita", "klassisk-burger", "risotto-med-hvidvin", "coq-au-vin"],
        saesonHeadline: "Lige nu: fredag og weekend",
        saesonIntro: "Købslysten topper torsdag–fredag. Match vinen til takeaway og det I faktisk spiser i aften.",
        saesonGuideLinks: [g("vin-til-pizza", "pizza"), g("vin-til-burger", "burger"), g("vin-til-grill-og-bbq", "grill")],
        saesonRecipeLinks: [r("pizza-margherita", "pizza"), r("klassisk-burger", "burger")],
      };
    case "sunday":
      return {
        id,
        headline: "Søndag: simre og planlæg ugen",
        blurb: "Lasagne, oksekød og vine med krop til det lange måltid.",
        links: [
          g("vin-til-bolognese", "Bolognese"),
          g("vin-til-oksekoed", "Oksekød"),
          g("vin-til-gryderet", "Gryderet"),
        ],
        dishIds: prioritizeDishes(["pasta-tomat", "boef", "pasta-floede", "kylling"]),
        recipeSlugs: ["lasagne-med-rodvin", "boeuf-bourguignon", "coq-au-vin", "risotto-med-hvidvin"],
        saesonHeadline: "Lige nu: søndagssimmer",
        saesonIntro: "Søndag er til langtidssimring og at planlægge ugen — ikke til nørdet teori.",
        saesonGuideLinks: [
          g("vin-til-bolognese", "bolognese"),
          g("vin-til-oksekoed", "oksekød"),
          g("vin-til-gryderet", "gryderetter"),
        ],
        saesonRecipeLinks: [r("lasagne-med-rodvin", "lasagne"), r("boeuf-bourguignon", "boeuf bourguignon")],
      };
    case "grill":
      return {
        id,
        headline: "Grill og terrasse",
        blurb: "Rosé, sprød hvid og saftig rød til bøffen — det I åbner når det er lunt.",
        links: [
          g("vin-til-grill-og-bbq", "Grill og BBQ"),
          g("rosevin-til-mad-og-sommer", "Rosé"),
          g("bedste-sommervin", "Sommervin"),
        ],
        dishIds: prioritizeDishes(["grill", "fisk", "tapas", "vegetar"]),
        recipeSlugs: ["grillet-kylling-med-hvidvin", "gazpacho", "pizza-margherita", "klassisk-burger"],
        saesonHeadline: "Lige nu: grill og sommer",
        saesonIntro: "Når det er terrassevejr, vinder kold rosé, sprød hvid og saftig rød til grillen.",
        saesonGuideLinks: [
          g("vin-til-grill-og-bbq", "grill og BBQ"),
          g("bedste-sommervin", "bedste sommervin"),
          g("rosevin-til-mad-og-sommer", "rosévin"),
          g("vin-til-sankt-hans", "Sankt Hans"),
        ],
        saesonRecipeLinks: [
          r("grillet-kylling-med-hvidvin", "grillet kylling"),
          r("gazpacho", "gazpacho"),
        ],
      };
    case "efteraar":
      return {
        id,
        headline: "Efterår: vildt, gryde og hygge",
        blurb: "Kraftigere rødvin til simre og det der kommer ind fra køkkenet.",
        links: [g("vin-til-vildt", "Vildt"), g("vin-til-gryderet", "Gryderet"), g("vin-til-and", "And")],
        dishIds: prioritizeDishes(["boef", "grill", "flaeskesteg", "pasta-tomat"]),
        recipeSlugs: ["boeuf-bourguignon", "coq-au-vin", "lasagne-med-rodvin", "risotto-med-hvidvin"],
        saesonHeadline: "Lige nu: efterår",
        saesonIntro: "Vildt, svampe og gryder — her rykker glasset over på rødvin med mere krop.",
        saesonGuideLinks: [
          g("vin-til-mortensaften", "Mortensaften"),
          g("vin-til-vildt", "vildt"),
          g("vin-til-and", "and"),
          g("vin-til-gryderet", "gryderetter"),
        ],
        saesonRecipeLinks: [r("boeuf-bourguignon", "boeuf bourguignon"), r("coq-au-vin", "coq au vin")],
      };
    case "vinter":
      return {
        id,
        headline: "Vinter: hygge og kraftig rødvin",
        blurb: "Simreretter, ost og vine der varmer — uden at vente på december.",
        links: [
          g("bedste-vintervin", "Vintervin"),
          g("vin-til-gryderet", "Gryderet"),
          g("vin-til-oksekoed", "Oksekød"),
        ],
        dishIds: prioritizeDishes(["boef", "flaeskesteg", "pasta-floede", "kylling"]),
        recipeSlugs: ["boeuf-bourguignon", "coq-au-vin", "lasagne-med-rodvin", "risotto-med-hvidvin"],
        saesonHeadline: "Lige nu: vinter og hygge",
        saesonIntro: "Når det er mørkt og koldt, passer tungere rødvin, gryder og det lange måltid.",
        saesonGuideLinks: [
          g("bedste-vintervin", "bedste vintervin"),
          g("vin-til-gryderet", "gryderetter"),
          g("vin-til-oksekoed", "oksekød"),
        ],
        saesonRecipeLinks: [r("boeuf-bourguignon", "boeuf bourguignon")],
      };
    case "foraar":
      return {
        id,
        headline: "Forår: lettere mad og friskere vin",
        blurb: "Fisk, asparges og det første lyse køkken — før grillsæsonen.",
        links: [
          g("vin-til-fisk-og-skaldyr", "Fisk"),
          g("vin-til-asparges", "Asparges"),
          g("vin-til-lam", "Lam"),
        ],
        dishIds: prioritizeDishes(["fisk", "vegetar", "kylling", "tapas"]),
        recipeSlugs: ["risotto-med-hvidvin", "gazpacho", "grillet-kylling-med-hvidvin", "pizza-margherita"],
        saesonHeadline: "Lige nu: forår",
        saesonIntro: "Lysere mad og lettere vine — riesling, grüner og det der passer til forårskøkkenet.",
        saesonGuideLinks: [
          g("vin-til-asparges", "asparges"),
          g("vin-til-lam", "lam"),
          g("vin-til-fisk-og-skaldyr", "fisk"),
        ],
        saesonRecipeLinks: [r("risotto-med-hvidvin", "risotto")],
      };
    default:
      return {
        id: "weekday",
        headline: "Hvad skal du spise i aften?",
        blurb: "Klik på retten nedenfor, eller hop direkte i en guide.",
        links: [
          g("vin-til-pizza", "Pizza"),
          g("vin-til-bolognese", "Pasta"),
          g("vin-til-kylling-og-lyst-koed", "Kylling"),
        ],
        dishIds: DEFAULT_DISH_IDS,
        recipeSlugs: [...DEFAULT_RECIPES],
        saesonHeadline: "Lige nu: hverdag og sæson",
        saesonIntro: "Årstiden styrer køkkenet — vælg en sæson eller højtid, og find vinen der passer.",
        saesonGuideLinks: [
          g("vin-til-grill-og-bbq", "grill"),
          g("vin-til-julemad-den-store-guide", "julemad"),
          { href: "/fest-og-vin", label: "fest og selskab" },
        ],
        saesonRecipeLinks: [r("pizza-margherita", "pizza"), r("klassisk-burger", "burger")],
      };
  }
}

export function resolveHomeMomentId(parts: CopenhagenParts): HomeMomentId {
  const { month, day, weekday, isoWeek } = parts;

  if (month === 12 && day >= 27) return "nytaar";
  if (month === 1 && day <= 6) return "nytaar";
  if (month === 12) return "jul";

  if (month === 2 && day <= 20) return "fastelavn";

  if ((month === 3 && day >= 20) || (month === 4 && day <= 20)) return "paaske";

  if (isoWeek >= 18 && isoWeek <= 24) return "konfirmation";

  if (month === 11 && day <= 15) return "mortens";

  if (weekday === 5) return "friday";
  if (weekday === 0) return "sunday";

  if (month >= 6 && month <= 8) return "grill";
  if (month === 5 && isoWeek > 24) return "grill";
  if (month === 9 || month === 10 || (month === 11 && day > 15)) return "efteraar";
  if (month === 1 || month === 2) return "vinter";
  if (month === 3 || month === 4) return "foraar";

  return "weekday";
}

export function getHomeMoment(now: Date = new Date()): HomeMoment {
  const parts = copenhagenParts(now);
  return momentFromId(resolveHomeMomentId(parts));
}

export function prioritizeDishes(first: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const id of first) {
    if (FOOD_PICKER_DISHES.some((d) => d.id === id) && !seen.has(id)) {
      seen.add(id);
      out.push(id);
    }
  }
  for (const d of FOOD_PICKER_DISHES) {
    if (!seen.has(d.id)) out.push(d.id);
  }
  return out;
}

export function dishesForMoment(moment: HomeMoment): FoodPickerDish[] {
  const byId = new Map(FOOD_PICKER_DISHES.map((d) => [d.id, d]));
  return moment.dishIds.map((id) => byId.get(id)).filter((d): d is FoodPickerDish => Boolean(d));
}

export function allHomeMomentRecipeSlugs(): string[] {
  const ids: HomeMomentId[] = [
    "jul",
    "nytaar",
    "fastelavn",
    "paaske",
    "konfirmation",
    "mortens",
    "friday",
    "sunday",
    "grill",
    "efteraar",
    "vinter",
    "foraar",
    "weekday",
  ];
  const set = new Set<string>();
  for (const id of ids) {
    for (const slug of momentFromId(id).recipeSlugs) set.add(slug);
  }
  return [...set];
}
