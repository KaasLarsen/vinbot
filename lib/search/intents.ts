/** Mad, humør, stemning og sæson → søgetermer der matcher vin i feeds */

export function intentTermsFromQuery(q = ""): string[] {
  const txt = q.toLowerCase();
  const out: string[] = [];

  const add = (...terms: string[]) => out.push(...terms);

  if (/(juleaften|julemad|flæskesteg|flaeskesteg|andesteg|andebryst|juleand|ribbensteg|julefrokost)/.test(txt)) {
    add(
      "rødvin",
      "pinot noir",
      "bourgogne",
      "valpolicella",
      "amarone",
      "barolo",
      "rioja",
      "cotes du rhone",
    );
  }

  if (/(nytår|nytaar|nytarsaften|nytaarsaften|nytårsaften)/.test(txt)) {
    if (/(rødvin|rodvin|rød\s*vin|rod\s*vin)/.test(txt)) {
      add("pinot noir", "rioja", "barolo", "beaujolais", "gamay", "cotes du rhone", "cabernet sauvignon");
    } else if (/(hvidvin|hvid\s*vin|white\s*wine)/.test(txt)) {
      add("chardonnay", "riesling", "sauvignon blanc", "chablis", "crémant", "cremant", "hvidvin");
    } else {
      add("champagne", "cava", "prosecco", "cremant", "crémant", "sparkling", "mousserende");
    }
  }

  if (
    /(bøf|bof|boef|oksekød|oksekoed|oksekod|steak|entrecote|entrecôte|ribeye|rib-eye|culotte|culottesteg|cuvette)/.test(
      txt,
    )
  ) {
    add("cabernet sauvignon", "malbec", "barolo", "bordeaux", "syrah", "shiraz", "rioja");
  }

  if (/(svinekød|svinekoed|svinekod|gris|kamsteg|flæskesteg|flaeskesteg)/.test(txt)) {
    add("pinot noir", "bourgogne", "cotes du rhone", "chianti");
  }

  if (/(fisk|torsk|kuller|kabelau|kabeljau|laks|ørred|orred|rejer|skaldyr|muslinger|østers|oesters)/.test(txt)) {
    add("hvidvin", "riesling", "sauvignon blanc", "chardonnay", "albariño", "albarino", "chablis");
  }

  if (/(tapas|ostebord|oste|ost|charcuteri|pølsebord|pølse|pålæg|palaeg)/.test(txt)) {
    add("cava", "rioja", "tempranillo", "garnacha", "sherry");
  }

  if (/(kylling|kyllingebryst|kyllingelaar|høne|hoene)/.test(txt)) {
    add("chardonnay", "pinot noir", "riesling halbtrocken", "riesling", "chablis", "beaujolais", "gamay");
  }

  if (/(lam|lammekød|lammekeule|lammekølle)/.test(txt)) {
    add("bordeaux", "rioja", "syrah", "shiraz", "cabernet sauvignon", "malbec");
  }

  if (/(vegetar|vegan|grøntsag|grontsag|salat|quiche)/.test(txt)) {
    add("rosé", "rose", "sauvignon blanc", "pinot grigio", "riesling", "prosecco");
  }

  if (/(sushi|sashimi|poke|japansk|asiatisk)/.test(txt)) {
    add("riesling", "gewurztraminer", "pinot gris", "champagne", "sake", "hvidvin");
  }

  if (/(dessert|kage|chokolade|is|tiramisu)/.test(txt)) {
    add("portvin", "port", "sauternes", "moscato", "dessertvin", "late harvest");
  }

  if (/(pizza|pasta|bolognese|carbonara|lasagne)/.test(txt)) {
    add("chianti", "sangiovese", "barbera", "primitivo", "nebbiolo", "montepulciano");
  }

  if (/(grill|bbq|barbecue|pølser|pølse|grillkød)/.test(txt)) {
    add("zinfandel", "malbec", "shiraz", "syrah", "rioja", "cabernet sauvignon");
  }

  if (/(burger|fast food|junk)/.test(txt)) {
    add("zinfandel", "malbec", "syrah", "rioja", "merlot");
  }

  if (/(picnic|strand|sommer|have|terrasse|grillaften)/.test(txt)) {
    add("rosé", "rose", "prosecco", "riesling", "sauvignon blanc", "pinot grigio");
  }

  if (/(vinter|hygge|pejs|koldt|gryderet|simremad)/.test(txt)) {
    add("rødvin", "barolo", "rioja", "syrah", "cabernet sauvignon", "portvin");
  }

  if (/(romantisk|date|middag for to|bryllupsdag)/.test(txt)) {
    add("champagne", "chablis", "pinot noir", "bourgogne", "chianti classico");
  }

  if (/(fest|selskab|galla|konfirmation|student|fødselsdag|fodselsdag)/.test(txt)) {
    add("champagne", "cava", "prosecco", "crémant", "cremant", "mousserende");
  }

  /* Danske mærkdage — forekommer sjældent i produkttekst; udvider så feed-matchen giver mening. */
  if (/(morsdag|mors\s*dag|mors-dag)/.test(txt)) {
    add("champagne", "cava", "rosé", "rose", "prosecco", "crémant", "cremant", "pinot noir", "chardonnay", "riesling");
  }
  if (/(farsdag|fars\s*dag|fars-dag)/.test(txt)) {
    add("shiraz", "malbec", "rioja", "cabernet sauvignon", "syrah", "zinfandel", "bobler", "champagne");
  }

  if (/(afslappet|casual|fredag|hverdag|let)/.test(txt)) {
    add("beaujolais", "pinot grigio", "vinho verde", "riesling", "merlot");
  }

  if (/(forår|foraar|påske|paaske)/.test(txt)) {
    add("rosé", "rose", "riesling", "sauvignon blanc", "prosecco");
  }

  /** Geografisk — danske feeds skriver sjældent «Balkan» på etiket, men ofte land. */
  if (
    /(balkan|serbien|serbian|srbij|kroatien|croatia|hrvatsk|montenegro|crna gora|bosnien|bosnia|makedonien|macedon|north macedonia|bulgarien|bulgaria|slovenien|slovenia|rumænien|romania|transsylvan|ungarn|hungary|magyar)/i.test(
      txt,
    )
  ) {
    add(
      "serbien",
      "kroatien",
      "montenegro",
      "makedonien",
      "bosnien",
      "slovenien",
      "bulgarien",
      "rumænien",
      "ungarn",
      "østrig",
      "oestrig",
      "vranec",
      "prokupac",
      "saperavi",
      "furmint",
      "tokaj",
    );
  }

  if (/(bag[\s-]?in[\s-]?box|bib|papvin|boxvin|boks[\s-]?vin)/.test(txt)) {
    add("bib", "bag-in-box", "papvin");
  }

  return out;
}
