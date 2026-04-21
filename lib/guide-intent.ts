/**
 * Afled søgeintent (q + max-pris) fra en guide-slug.
 * Returnerer null hvis slug ikke naturligt mapper til produktsøgning.
 *
 * Strategi:
 * - `bedste-*-under-NN-kr` → base-kategori som `q`, NN som `max`.
 * - `rodvin-til-<mad>` / `hvidvin-til-<mad>` osv. → drue + mad som `q`.
 * - `vin-til-<mad>` → mad + retningsgivende vin-hints (via intents.ts).
 * - `vinregion-<navn>` → regionnavn som `q`.
 * - Kendte drue-slugs (`<drue>-druen`) → druenavn som `q`.
 */

export type GuideIntent = {
  q: string;
  /** Øvre grænse i DKK (inklusive). Null = ingen max. */
  max: number | null;
  /** Kort label til CTA-knap, fx "rødvin under 75 kr" eller "vin til sushi". */
  label: string;
};

/** Synlig i JSX — brug hvis frontmatter ikke overstyrer. */
export function deriveGuideIntent(
  slug: string,
  overrides?: { searchIntent?: string; searchMax?: number; searchLabel?: string },
): GuideIntent | null {
  if (overrides?.searchIntent || overrides?.searchMax) {
    return {
      q: overrides.searchIntent?.trim() || "vin",
      max: overrides.searchMax ?? null,
      label: overrides.searchLabel?.trim() || "vin",
    };
  }

  const m = slug.match(/^bedste-(.+?)-under-(\d+)-kr$/);
  if (m) {
    const cat = m[1];
    const max = parseInt(m[2], 10);
    const q = categoryToSearchTerm(cat);
    const label = `${categoryToLabel(cat)} under ${max} kr`;
    return { q, max, label };
  }

  if (slug.startsWith("bedste-")) {
    const rest = slug.replace(/^bedste-/, "");
    const q = categoryToSearchTerm(rest);
    const label = `bedste ${categoryToLabel(rest)}`;
    return { q, max: null, label };
  }

  const drueFood = slug.match(
    /^(rodvin|hvidvin|rosevin|bobler|champagne|prosecco|cava|pinot-noir|chardonnay|sauvignon-blanc|riesling|malbec|sangiovese|syrah)-til-(.+)$/,
  );
  if (drueFood) {
    const drue = drueFood[1].replace(/-/g, " ");
    const food = drueFood[2].replace(/-/g, " ");
    return {
      q: `${drue} ${food}`.trim(),
      max: null,
      label: `${drue} til ${food}`,
    };
  }

  if (slug.startsWith("vin-til-")) {
    const food = slug.replace(/^vin-til-/, "").replace(/-/g, " ");
    return {
      q: food,
      max: null,
      label: `vin til ${food}`,
    };
  }

  if (slug.startsWith("alkoholfri-vin-til-")) {
    const occasion = slug.replace(/^alkoholfri-vin-til-/, "").replace(/-/g, " ");
    return {
      q: `alkoholfri vin 0% ${occasion}`.trim(),
      max: null,
      label: `alkoholfri vin til ${occasion}`,
    };
  }

  if (slug.startsWith("vinregion-")) {
    const region = slug.replace(/^vinregion-/, "").replace(/-/g, " ");
    return {
      q: region,
      max: null,
      label: `vin fra ${region}`,
    };
  }

  if (slug.endsWith("-druen")) {
    const drue = slug.replace(/-druen$/, "").replace(/-/g, " ");
    return {
      q: drue,
      max: null,
      label: drue,
    };
  }

  const drueRegion = matchDrueRegionSlug(slug);
  if (drueRegion) {
    const { drue, region } = drueRegion;
    const drueLabel = drue.replace(/-/g, " ");
    const regionLabel = region.replace(/-/g, " ");
    return {
      q: `${drueLabel} ${regionLabel}`.trim(),
      max: null,
      label: `${drueLabel} fra ${regionLabel}`,
    };
  }

  return null;
}

/** Kendte drue-prefixer for <drue>-fra-<region>-long-tail-sider. */
const DRUE_PREFIXES_FOR_REGION = [
  "chardonnay",
  "sauvignon-blanc",
  "riesling",
  "pinot-grigio",
  "albarino",
  "chenin-blanc",
  "cabernet-sauvignon",
  "merlot",
  "syrah",
  "malbec",
  "tempranillo",
  "sangiovese",
  "pinot-noir",
  "nebbiolo",
  "grenache",
];

export function matchDrueRegionSlug(slug: string): { drue: string; region: string } | null {
  for (const prefix of DRUE_PREFIXES_FOR_REGION) {
    const marker = `${prefix}-fra-`;
    if (slug.startsWith(marker)) {
      const region = slug.slice(marker.length);
      if (region.length > 0) {
        return { drue: prefix, region };
      }
    }
  }
  return null;
}

function categoryToSearchTerm(cat: string): string {
  const table: Record<string, string> = {
    rodvin: "rødvin",
    hvidvin: "hvidvin",
    rosevin: "rosé",
    bobler: "bobler champagne prosecco cava",
    champagne: "champagne",
    vin: "vin",
    "pinot-noir": "pinot noir",
    chardonnay: "chardonnay",
    "sauvignon-blanc": "sauvignon blanc",
    riesling: "riesling",
    "pinot-grigio": "pinot grigio pinot gris",
    albarino: "albariño",
    "chenin-blanc": "chenin blanc",
    "cabernet-sauvignon": "cabernet sauvignon",
    merlot: "merlot",
    syrah: "syrah shiraz",
    malbec: "malbec",
    tempranillo: "tempranillo rioja",
    sangiovese: "sangiovese chianti",
    nebbiolo: "nebbiolo barolo barbaresco",
    grenache: "grenache garnacha",
    "box-vin": "box vin bag in box",
    portvin: "portvin",
    dessertvin: "dessertvin sauternes",
    "okologiske-vin": "økologisk",
    "dansk-vin": "dansk",
    "italiensk-rodvin": "italiensk rødvin chianti barolo",
    "fransk-rodvin": "fransk rødvin bordeaux bourgogne",
    "spansk-rodvin": "spansk rødvin rioja tempranillo",
    "vin-til-gave": "vin gave",
    "vaertindegave-vin": "vin gave",
    "julegavevin": "vin gave jul",
    "vin-til-begynder": "vin hverdag letdrikkelig",
    "vin-til-hverdag": "vin hverdag",
    "weekendvin": "vin weekend",
    "sommervin": "sommer rosé hvidvin",
    "alkoholfri-rodvin": "alkoholfri rødvin 0%",
    "alkoholfri-hvidvin": "alkoholfri hvidvin 0%",
    "alkoholfri-rose": "alkoholfri rosé 0%",
    "alkoholfri-bobler": "alkoholfri bobler mousserende 0%",
    "alkoholfri-champagne": "alkoholfri champagne bobler 0%",
    "alkoholfri-vin": "alkoholfri vin 0%",
    "lavalkohol-vin": "kabinett moscato vinho verde lav alkohol",
  };
  return table[cat] || cat.replace(/-/g, " ");
}

function categoryToLabel(cat: string): string {
  const table: Record<string, string> = {
    rodvin: "rødvin",
    hvidvin: "hvidvin",
    rosevin: "rosévin",
    bobler: "bobler",
    champagne: "champagne",
    vin: "vin",
    "pinot-noir": "pinot noir",
    chardonnay: "chardonnay",
    "sauvignon-blanc": "sauvignon blanc",
    riesling: "riesling",
    "pinot-grigio": "pinot grigio",
    albarino: "albariño",
    "chenin-blanc": "chenin blanc",
    "cabernet-sauvignon": "cabernet sauvignon",
    merlot: "merlot",
    syrah: "syrah/shiraz",
    malbec: "malbec",
    tempranillo: "tempranillo",
    sangiovese: "sangiovese",
    nebbiolo: "nebbiolo",
    grenache: "grenache",
    "box-vin": "box-vin",
    portvin: "portvin",
    dessertvin: "dessertvin",
    "okologiske-vin": "økologisk vin",
    "dansk-vin": "dansk vin",
    "italiensk-rodvin": "italiensk rødvin",
    "fransk-rodvin": "fransk rødvin",
    "spansk-rodvin": "spansk rødvin",
    "alkoholfri-rodvin": "alkoholfri rødvin",
    "alkoholfri-hvidvin": "alkoholfri hvidvin",
    "alkoholfri-rose": "alkoholfri rosé",
    "alkoholfri-bobler": "alkoholfri bobler",
    "alkoholfri-champagne": "alkoholfri champagne",
    "alkoholfri-vin": "alkoholfri vin",
    "lavalkohol-vin": "lavalkohol-vin",
  };
  return table[cat] || cat.replace(/-/g, " ");
}
