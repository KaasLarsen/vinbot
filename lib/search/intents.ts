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
    add("champagne", "cava", "prosecco", "cremant", "crémant", "sparkling", "mousserende");
  }

  if (/(bøf|bof|boef|oksekød|oksekoed|oksekod|steak|entrecote|entrecôte|ribeye|rib-eye)/.test(txt)) {
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

  if (/(afslappet|casual|fredag|hverdag|let)/.test(txt)) {
    add("beaujolais", "pinot grigio", "vinho verde", "riesling", "merlot");
  }

  if (/(forår|foraar|påske|paaske)/.test(txt)) {
    add("rosé", "rose", "riesling", "sauvignon blanc", "prosecco");
  }

  return out;
}
