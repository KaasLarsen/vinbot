/**
 * Vinskabe og aromasæt har ofte «vin»/«wine»/«champagne» i titel eller kategori.
 * Kun titel og kategori — vinbeskrivelser nævner køleskab ved servering.
 */
const CABINET_OR_KIT_TITLE_MARKERS: readonly string[] = [
  "køleskab",
  "koleskab",
  "multifunktionsskab",
  "vinlagringsskab",
  "winecave",
  "wine cave",
  "duftsæt",
  "duftsaet",
  "duft sæt",
  "aromasæt",
  "aromasaet",
  "aroma sæt",
  "le nez du vin",
  "nez du vin",
];

const CABINET_CATEGORY_MARKERS: readonly string[] = [
  "wine - built-in",
  "wine - ageing",
  "wine - free-standing",
  "wine - accessories",
  "wine - wine cooler",
  "freestanding wine",
  "built-in wine",
  "undercounter wine",
  "slide-in wine",
  "integrated wine",
  "ageing cabinet",
];

export function looksLikeWineCabinetOrAromaKit(p: { title?: string; category?: string }): boolean {
  const title = (p.title || "").toLowerCase();
  const category = (p.category || "").toLowerCase();
  if (CABINET_OR_KIT_TITLE_MARKERS.some((m) => title.includes(m))) return true;
  if (/\b\d+\s+aromas\b/.test(title)) return true;
  return CABINET_CATEGORY_MARKERS.some((m) => category.includes(m));
}
