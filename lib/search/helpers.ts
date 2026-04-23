import type { FeedProduct, ProductHit } from "./types";
import { intentTermsFromQuery } from "./intents";

export const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36";

export function parsePriceFilter(qRaw: string, budgetMaxParam: number | null): { min: number | null; max: number | null } {
  const txt = (qRaw || "").toLowerCase();

  let min: number | null = null;
  let max: number | null = null;

  const money = "(?:\\s*(?:kr\\.?)|\\s*dkk|\\s*,-)?";

  let m = txt.match(new RegExp(`(\\d{2,5})\\s*[-–]\\s*(\\d{2,5})${money}`));
  if (m) {
    const a = parseInt(m[1], 10);
    const b = parseInt(m[2], 10);
    min = Math.min(a, b);
    max = Math.max(a, b);
  }

  if (!m) {
    m = txt.match(new RegExp(`(?:fra|mellem)\\s*(\\d{2,5})\\s*(?:til|og)\\s*(\\d{2,5})${money}`));
    if (m) {
      const a = parseInt(m[1], 10);
      const b = parseInt(m[2], 10);
      min = Math.min(a, b);
      max = Math.max(a, b);
    }
  }

  if (max == null) {
    m = txt.match(new RegExp(`(?:under|max)\\s*(\\d{2,5})${money}`));
    if (m) max = parseInt(m[1], 10);
  }

  if (min == null) {
    m = txt.match(new RegExp(`(?:mindst|over|fra)\\s*(\\d{2,5})${money}`));
    if (m) min = parseInt(m[1], 10);
  }

  if (budgetMaxParam != null) {
    if (max == null || budgetMaxParam < max) max = budgetMaxParam;
  }

  if (max == null && /billig|budget/.test(txt)) max = 100;

  if (min == null && max == null) {
    const lone = txt.match(new RegExp(`(\\d{2,5})${money}`));
    if (lone) max = parseInt(lone[1], 10);
  }

  return { min, max };
}

export function isWineLike(p: Pick<FeedProduct, "title" | "desc" | "category">): boolean {
  const text = `${p.title || ""} ${p.desc || ""} ${p.category || ""}`.toLowerCase();

  const hardNegative = [
    "glas",
    "vinglas",
    "wine glass",
    "ølglas",
    "champagneglas",
    "karaffel",
    "karafel",
    "dekanter",
    "decanter",
    "vinreol",
    "vinskab",
    "vinkøleskab",
    "vinkoleskab",
    "wine cooler",
    "wine cellar",
    "vinholder",
    "oplukker",
    "proptrækker",
    "korkskruer",
    "iskøler",
    "vinkøler",
    "shotglas",
    "shotsglas",
    "cocktailglas",
    "martiniglas",
    "tallerken",
    "tallerkener",
    "skål",
    "skaal",
    "skåle",
    "fad",
    "serveringsfad",
    "tapastallerken",
    "kop",
    "kopper",
    "krus",
    "glas sæt",
    "glassæt",
    "bestik",
    "gaffel",
    "gafler",
    "kniv",
    "knive",
    "ske",
    "skeer",
    "serviet",
    "servietter",
    "dug",
    "oscar",
    "oscarstatuette",
    "oscar statuette",
    "statuette",
    "statuet",
    "prisfigur",
    "pris statuette",
    "trofæ",
    "trofae",
    "pokal",
    "figur",
    "kosteskaft",
    "fejekost",
    "kost",
    "fejeblad",
    "moppe",
    "spand",
    "eddike",
    "vineddike",
    "hvidvinseddike",
    "rødvinseddike",
    "rodvinseddike",
    "balsamico",
    "balsamic",
    "vinegar",
    "olie",
    "olivenolie",
    "rapsolie",
    "trøffelolie",
    "troffelolie",
    "salt",
    "havsalt",
    "flagesalt",
    "krydderisalt",
    "peber",
    "pebermix",
    "krydderi",
    "krydderier",
    "juice",
    "æblejuice",
    "applejuice",
    "appelsinjuice",
    "saft",
    "frugtsaft",
    "most",
    "æblemost",
    "aeblemost",
    "smoothie",
    "soft drink",
    "gavekort",
    "postkort",
    "ballon",
    "ballonbuket",
    "ballonbuketter",
    "balloner",
    "balloons",
    "balloon",
    "balloon bouquet",
  ];

  if (hardNegative.some((w) => text.includes(w))) return false;

  const positive = [
    "vin",
    "wine",
    "rødvin",
    "hvidvin",
    "dessertvin",
    "mousserende",
    "sparkling",
    "riesling",
    "chardonnay",
    "sauvignon",
    "sauvignon blanc",
    "pinot",
    "pinot noir",
    "nebbiolo",
    "barolo",
    "cabernet",
    "cabernet sauvignon",
    "merlot",
    "malbec",
    "tempranillo",
    "zinfandel",
    "primitivo",
    "bordeaux",
    "bourgogne",
    "burgundy",
    "chianti",
    "valpolicella",
    "amarone",
    "ripasso",
    "rioja",
    "ribera del duero",
    "ribera",
    "cava",
    "prosecco",
    "champagne",
    "crémant",
    "cremant",
    "spumante",
    "moscato",
    "sauternes",
    "portvin",
    "port",
    "sherry",
    "tinto",
    "rosso",
    "rouge",
    "blanc",
    "rosé",
    "rose",
  ];

  const negative = [
    "øl",
    "oel",
    "beer",
    "bryg",
    "brew",
    "gin",
    "rum",
    "rom",
    "whisky",
    "whiskey",
    "vodka",
    "tequila",
    "cognac",
    "brandy",
    "likør",
    "liqueur",
    "akvavit",
    "snaps",
    "gavekurv",
    "gavekurve",
    "gaveæske",
    "gaveboks",
    "chokolade",
    "kaffe",
    "sirup",
    "sodavand",
    "lemonade",
  ];

  /* Bruger ordgrænser for at undgå falsk-positive matches som "vin" i "vinyl",
     "vinter", "vinylcoated" eller "wine" i andre ord. */
  const hasWord = (word: string) => {
    const esc = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`(?:^|[^a-zæøå])${esc}(?:[^a-zæøå]|$)`, "i").test(text);
  };

  const hasPos = positive.some(hasWord);
  const hasNeg = negative.some(hasWord);

  if (hasNeg && !hasPos) return false;

  if (!hasPos && !hasWord("vin") && !hasWord("wine")) return false;

  return true;
}

export function expandQuery(q: string): string[] {
  const base = normalize(q);

  const stopwords = new Set([
    "vin",
    "vine",
    "til",
    "for",
    "med",
    "og",
    "eller",
    "en",
    "et",
    "den",
    "det",
    "de",
    /* pris/filter-ord — læses af parsePriceFilter og må ikke bruges som søgeord,
       ellers dukker irrelevante produkter op, der bare indeholder fx "under" eller et pris-tal. */
    "under",
    "over",
    "mindst",
    "max",
    "maksimum",
    "maks",
    "fra",
    "mellem",
    "billig",
    "billige",
    "budget",
    "kr",
    "dkk",
  ]);

  const eq: Record<string, string[]> = {
    barolo: ["nebbiolo"],
    nebbiolo: ["barolo"],
    rioja: ["tempranillo"],
    tempranillo: ["rioja"],
    ribera: ["ribera del duero", "tempranillo"],
    "ribera del duero": ["ribera", "tempranillo"],
    shiraz: ["syrah"],
    syrah: ["shiraz"],
    rose: ["rosé"],
    "rosé": ["rose"],
    cab: ["cabernet", "cabernet sauvignon"],
    cabernet: ["cab", "cabernet sauvignon"],
    "cabernet sauvignon": ["cab", "cabernet"],
  };

  const set = new Set<string>();

  base.split(/\s+/).forEach((t) => {
    if (!t) return;
    const n = normalize(t);
    if (stopwords.has(n)) return;
    /* Rent numeriske tokens er typisk pris-tal (fx "80") — ikke søgeord. */
    if (/^\d+$/.test(n)) return;
    set.add(n);
    (eq[n] || []).forEach((x) => set.add(normalize(x)));
  });

  intentTermsFromQuery(q).forEach((term) => {
    set.add(normalize(term));
  });

  if (!set.size) set.add("vin");

  return Array.from(set);
}

export function normalize(s = ""): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function toNumber(s: string | null | undefined): number | null {
  if (!s) return null;
  let str = String(s).trim();

  str = str.replace(/\s*(kr\.?|dkk)\s*$/i, "").replace(/\s/g, "");

  if (/^\d{1,3}(\.\d{3})+(,\d+)?$/.test(str)) {
    str = str.replace(/\./g, "").replace(",", ".");
    const v = parseFloat(str);
    return Number.isFinite(v) ? v : null;
  }

  if (/^\d+,\d+$/.test(str)) {
    const v = parseFloat(str.replace(",", "."));
    return Number.isFinite(v) ? v : null;
  }

  if (/^\d{1,3}(,\d{3})+(\.\d+)?$/.test(str)) {
    const v = parseFloat(str.replace(/,/g, ""));
    return Number.isFinite(v) ? v : null;
  }

  const v = parseFloat(str);
  return Number.isFinite(v) ? v : null;
}

export function decodeHTMLEntities(t: string): string {
  return (t || "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
}

export function stripCdata(s = ""): string {
  return s.replace(/^<!\[CDATA\[/, "").replace(/\]\]>$/, "");
}

export function looksLikeXML(txt: string): boolean {
  return /<\?xml|<rss|<feed|<channel|<products|<product|<item|<produkter|<produkt/i.test(txt);
}

export function proxyImg(src: string): string {
  return `/api/img?src=${encodeURIComponent(src)}`;
}

export function normalizeUrl(maybe: string, pageUrl: string): string | null {
  if (!maybe) return null;
  let s = maybe.trim().replace(/&amp;/g, "&");
  if (s.startsWith("//")) s = "https:" + s;
  try {
    new URL(s);
    return s;
  } catch {
    /* relative */
  }
  try {
    return new URL(s, pageUrl).toString();
  } catch {
    return null;
  }
}

export function score(p: Pick<ProductHit, "_search" | "title" | "image" | "price">, terms: string[]): number {
  const s = p._search || "";
  let sc = 0;
  terms.forEach((t) => {
    if (s.includes(t)) sc += 5;
  });
  if (p.title && terms.some((t) => (p.title || "").toLowerCase().includes(t))) sc += 3;
  if (p.image) sc += 2;
  if (p.price != null) sc += 1;
  return sc;
}

export function decodeText(buf: ArrayBuffer): string {
  try {
    const head = new TextDecoder("utf-8").decode(buf.slice(0, 200));
    const m = head.match(/encoding=["']([^"']+)["']/i);
    const enc = (m ? m[1] : "utf-8").toLowerCase();
    if (enc.includes("8859") || enc.includes("latin1")) {
      return new TextDecoder("iso-8859-1").decode(buf);
    }
    return new TextDecoder("utf-8").decode(buf);
  } catch {
    return new TextDecoder("utf-8").decode(buf);
  }
}

function cleanPrice(s: string): string {
  return (s || "").replace(/[A-Z]{3}/gi, "").replace(/kr\./gi, "kr").trim();
}

function extractCurrency(s: string): string | null {
  const m = (s || "").match(/\b([A-Z]{3})\b/);
  if (m) return m[1];
  if (/\skr/.test(s || "")) return "DKK";
  return null;
}

function splitBlocks(xml: string, tag: string): string[] {
  return xml
    .split(new RegExp(`<${tag}\\b[^>]*>`, "i"))
    .slice(1)
    .map((b) => b.split(new RegExp(`</${tag}>`, "i"))[0]);
}

function pickTag(block: string, tag: string): string {
  const m = block.match(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return m ? decodeHTMLEntities(stripCdata(m[1].trim())) : "";
}

function pickOne(block: string, tags: string[]): string {
  for (const t of tags) {
    const v = pickTag(block, t);
    if (v) return v;
  }
  return "";
}

function pickFirstMatch(block: string, regs: RegExp[]): string {
  for (const re of regs) {
    const m = block.match(re);
    if (m) return decodeHTMLEntities(stripCdata(m[1].trim()));
  }
  return "";
}

function genericXmlBlocks(xml: string, containers: string[], urlFields: string[]): string[] {
  const out: string[] = [];
  const openRe = new RegExp(`<(${containers.join("|")})\\b[^>]*>`, "ig");
  let m: RegExpExecArray | null;
  while ((m = openRe.exec(xml))) {
    const tag = m[1];
    const start = m.index + m[0].length;
    const closeRe = new RegExp(`</${tag}>`, "ig");
    closeRe.lastIndex = start;
    const close = closeRe.exec(xml);
    if (!close) continue;
    const block = xml.slice(m.index, close.index + close[0].length);
    const hasUrl = urlFields.some((f) => new RegExp(`<${f}\\b[^>]*>`, "i").test(block));
    if (hasUrl) out.push(block);
    openRe.lastIndex = close.index + close[0].length;
  }
  if (!out.length) {
    const urlRe = new RegExp(`<(${urlFields.join("|")})\\b[^>]*>([\\s\\S]*?)<\\/\\1>`, "ig");
    let mu: RegExpExecArray | null;
    while ((mu = urlRe.exec(xml))) {
      const start = Math.max(0, mu.index - 800);
      const end = Math.min(xml.length, urlRe.lastIndex + 800);
      out.push(xml.slice(start, end));
    }
  }
  return out;
}

export function parseXMLProducts(xml: string, merchant: string): FeedProduct[] {
  const out: FeedProduct[] = [];
  const txt = xml.replace(/<([a-z0-9]+):/gi, "<$1_").replace(/<\/([a-z0-9]+):/gi, "</$1_");

  let blocks = splitBlocks(txt, "product");
  if (!blocks.length) blocks = splitBlocks(txt, "item");
  if (!blocks.length) blocks = splitBlocks(txt, "produkt");
  if (!blocks.length)
    blocks = genericXmlBlocks(
      txt,
      ["product", "item", "row", "entry", "offer", "record", "node", "produkt"],
      ["deeplink", "link", "producturl", "url", "g_link", "vareurl"],
    );

  for (const b of blocks) {
    const title = pickOne(b, ["name", "title", "g_title", "produktnavn"]);
    const desc = pickOne(b, ["description", "shortdescription", "longdescription", "long_description", "content_encoded", "beskrivelse"]);
    const category = pickOne(b, [
      "categorypath",
      "category",
      "categories",
      "kategorinavn",
      "g_product_type",
      "product_type",
    ]);
    const brand = pickOne(b, ["brand", "g_brand", "manufacturer", "producer", "vendor", "creator", "forhandler"]);

    const priceStr = pickOne(b, [
      "nypris",
      "saleprice",
      "ourprice",
      "current_price",
      "price_inc_vat",
      "price_with_vat",
      "g_price",
      "pris",
      "price",
      "price_old",
    ]);
    const price = toNumber(cleanPrice(priceStr));
    const currency = pickOne(b, ["currency", "currency_iso"]) || extractCurrency(priceStr) || "DKK";

    const url = pickOne(b, ["deeplink", "link", "producturl", "url", "g_link", "vareurl"]);

    let image = pickOne(b, [
      "default_image",
      "imageurl",
      "image_url",
      "image",
      "largeimage",
      "large_image",
      "g_image_link",
      "picture",
      "picture_url",
      "img",
      "imgurl",
      "thumbnail",
      "thumb",
      "smallimage",
      "enclosure url",
      "billedurl",
    ]);
    if (!image)
      image = pickFirstMatch(b, [
        /<images>[\s\S]*?<image>([\s\S]*?)<\/image>[\s\S]*?<\/images>/i,
        /<additionalimage>([\s\S]*?)<\/additionalimage>/i,
        /<media_content[^>]+url=["']([^"']+)["']/i,
      ]);
    if (image && image.includes("|")) image = image.split("|")[0].trim();

    if (!title || !url) continue;

    out.push({
      merchant,
      title: decodeHTMLEntities(title),
      desc: decodeHTMLEntities(desc),
      category: decodeHTMLEntities(category),
      brand: decodeHTMLEntities(brand),
      price,
      currency,
      image: image || "",
      url,
      _search: normalize([title, desc, category, brand, merchant].filter(Boolean).join(" ")),
    });
  }
  return out;
}

function parseCSV(text: string, delim: string): string[][] {
  const rows: string[][] = [];
  let f = "";
  let row: string[] = [];
  let q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const n = text[i + 1];
    if (q) {
      if (c === '"' && n === '"') {
        f += '"';
        i++;
        continue;
      }
      if (c === '"') {
        q = false;
        continue;
      }
      f += c;
      continue;
    }
    if (c === '"') {
      q = true;
      continue;
    }
    if (c === delim) {
      row.push(f);
      f = "";
      continue;
    }
    if (c === "\n") {
      row.push(f);
      rows.push(row);
      f = "";
      row = [];
      continue;
    }
    if (c === "\r") continue;
    f += c;
  }
  if (f.length || row.length) {
    row.push(f);
    rows.push(row);
  }
  return rows.filter((r) => r.some((x) => (x || "").trim().length));
}

export function parseCSVProducts(text: string, merchant: string): FeedProduct[] {
  const head = text.slice(0, 1024);
  const delim = head.includes("\t") ? "\t" : head.includes(";") ? ";" : ",";
  const rows = parseCSV(text, delim);
  const headers =
    rows
      .shift()
      ?.map((n) => n.toLowerCase().replace(/\s+/g, "").replace(/[^a-z0-9:_-]/g, "")) || [];
  const pick = (names: string[]) => {
    for (const n of names) {
      const i = headers.indexOf(n);
      if (i !== -1) return i;
    }
    return -1;
  };
  const it = pick(["name", "title", "productname", "product", "navn", "produktnavn"]);
  const iu = pick(["deeplink", "link", "producturl", "url", "vareurl"]);
  const ii = pick([
    "default_image",
    "imageurl",
    "image_url",
    "image",
    "largeimage",
    "large_image",
    "picture",
    "picture_url",
    "img",
    "imgurl",
    "thumbnail",
    "thumb",
    "smallimage",
    "g:image_link",
    "image_link",
    "billedurl",
  ]);

  const ip = pick([
    "nypris",
    "saleprice",
    "ourprice",
    "current_price",
    "price_inc_vat",
    "pricewithvat",
    "g:price",
    "pris",
    "price",
    "price_old",
  ]);

  const ic = pick(["currency", "currency_iso", "valuta"]);
  const ib = pick(["brand", "manufacturer", "producer", "vendor", "forhandler"]);
  const out: FeedProduct[] = [];
  for (const r of rows) {
    const title = r[it] || "";
    const url = r[iu] || "";
    let image = r[ii] || "";
    if (image && image.includes("|")) image = image.split("|")[0].trim();
    const price = toNumber(r[ip] || "");
    const currency = r[ic] || "DKK";
    const brand = r[ib] || "";
    if (!title || !url) continue;
    out.push({
      merchant,
      title,
      desc: "",
      category: "",
      brand,
      price,
      currency,
      image,
      url,
      _search: normalize([title, brand, merchant].filter(Boolean).join(" ")),
    });
  }
  return out;
}
