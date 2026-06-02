import { MERCHANT_FEATURED_PICKS, type MerchantFeaturedPick } from "@/lib/merchant-featured-picks";
import {
  listAllWineDetailPages,
  listWineDetailPagesForGuide,
  wineDetailPageToFeaturedPick,
  wineDetailSlugForProductUrl,
} from "@/lib/wine-detail-pages/registry";
import type { WineDetailPage } from "@/lib/wine-detail-pages/types";

const DSF_DEFAULT_URLS = [
  "https://densidsteflaske.dk/products/primitivo-susumaniello-salento-boccantino-2024",
  "https://densidsteflaske.dk/products/the-guv-nor-tinto",
  "https://densidsteflaske.dk/products/spritz-roll-aperetivo-originale-nv",
] as const;

/** Druer og stilarter → relevante guide-slugs (kuraterede enkeltvin-sider). */
const GRAPE_AND_STYLE_GUIDES: Record<string, readonly string[]> = {
  nebbiolo: ["nebbiolo-druen", "nebbiolo-fra-barolo", "nebbiolo-fra-barbaresco", "vinregion-piemonte"],
  barolo: ["nebbiolo-fra-barolo", "nebbiolo-druen", "vinregion-piemonte"],
  barbaresco: ["nebbiolo-fra-barbaresco", "nebbiolo-druen"],
  sangiovese: ["sangiovese-druen", "sangiovese-til-pasta", "vin-til-lasagne", "vin-til-italiensk-mad"],
  chianti: ["sangiovese-druen", "sangiovese-til-pasta", "vin-til-italiensk-mad"],
  gamay: ["gamay-druen", "vin-til-gryderet"],
  beaujolais: ["gamay-druen"],
  "pinot noir": ["pinot-noir-druen", "vin-til-kylling-og-lyst-koed"],
  pinot: ["pinot-noir-druen"],
  riesling: ["riesling-druen", "vin-til-fisk-og-skaldyr"],
  chardonnay: ["chardonnay-druen", "vin-til-fisk-og-skaldyr"],
  sauvignon: ["sauvignon-blanc-druen", "vin-til-fisk-og-skaldyr"],
  merlot: ["merlot-druen", "vin-til-oksekoed"],
  cabernet: ["cabernet-sauvignon-druen", "vin-til-oksekoed"],
  tempranillo: ["tempranillo-druen", "vin-til-spansk-mad", "vin-til-tapas"],
  rioja: ["vin-til-spansk-mad", "vin-til-tapas"],
  primitivo: ["zinfandel-druen", "rodvin-til-pizza"],
  barbera: ["vin-til-italiensk-mad", "vin-til-lasagne"],
  grenache: ["grenache-druen", "vin-til-grill-og-bbq"],
  garnacha: ["grenache-druen"],
};

/** Map fri søgetekst → guide-slugs med kuraterede enkeltvin-sider. */
export function guideSlugsForSearchQuery(q: string): string[] {
  const t = q.toLowerCase();
  const out: string[] = [];

  for (const [key, slugs] of Object.entries(GRAPE_AND_STYLE_GUIDES)) {
    if (t.includes(key)) out.push(...slugs);
  }

  if (/tapas|chorizo|jamón|jamon|charcuteri|aperitivo|spritz/i.test(t)) out.push("vin-til-tapas");
  if (/gryderet|bourguignon|coq|braiser|stuvning|oksekae|lammeskank|estofado/i.test(t)) out.push("vin-til-gryderet");
  if (/nytår|nytaar|champagne|bobler|cava|prosecco|cremant|fest/i.test(t)) out.push("vin-til-nytaar-og-nytaarsmenu");
  if (/pizza|pasta|lasagne|italien/i.test(t)) out.push("rodvin-til-pizza", "vin-til-pizza", "vin-til-lasagne");
  if (/fisk|skaldyr|laks|torsk|sushi|musling|reje|hvidvin/i.test(t)) out.push("vin-til-fisk-og-skaldyr");
  if (/grill|bbq|malbec|entrecôte|entrecote|bøf|boef/i.test(t)) out.push("vin-til-grill-og-bbq", "vin-til-oksekoed");
  if (/gave|konfirmation|bryllup/i.test(t)) out.push("bedste-vin-til-gave");
  if (/påske|paaske/i.test(t)) out.push("vin-til-paaske");
  if (/jule|jul/i.test(t)) out.push("vin-til-julefrokost");
  if (/ost|cheese|brie|parmesan/i.test(t)) out.push("vin-til-ost-og-ostebord");
  if (/piemonte|piemont|langhe|barolo|barbaresco/i.test(t)) {
    out.push("nebbiolo-druen", "nebbiolo-fra-barolo", "vinregion-piemonte");
  }
  if (/rødvin|rodvin/i.test(t) && !out.includes("vin-til-gryderet")) out.push("vin-til-gryderet");

  if (out.length === 0) out.push("komplet-guide-til-vin-og-mad");
  return [...new Set(out)];
}

function dsfPicks(): MerchantFeaturedPick[] {
  return MERCHANT_FEATURED_PICKS.filter((p) => p.merchantId === "den-sidste-flaske");
}

function queryTokens(q: string): string[] {
  return q
    .toLowerCase()
    .split(/[\s,.-]+/)
    .filter((w) => w.length > 2);
}

function pageSearchHaystack(page: WineDetailPage): string {
  return [
    page.displayTitle,
    page.metaDescription,
    page.structuredDescriptionSnippet ?? "",
    ...page.bodyParagraphs,
    ...page.specs.map((s) => `${s.label} ${s.value}`),
  ]
    .join(" ")
    .toLowerCase();
}

function pageMatchScore(page: WineDetailPage, tokens: string[]): number {
  if (tokens.length === 0) return 0;
  const hay = pageSearchHaystack(page);
  let score = 0;
  for (const tok of tokens) {
    if (hay.includes(tok)) score += tok.length >= 6 ? 3 : 1;
  }
  return score;
}

function matchesFeaturedPick(pick: MerchantFeaturedPick, tokens: string[]): boolean {
  if (tokens.length === 0) return false;
  const hay = `${pick.title} ${pick.blurb ?? ""}`.toLowerCase();
  return tokens.some((tok) => hay.includes(tok));
}

function withinBudget(pick: MerchantFeaturedPick, max: number | null): boolean {
  if (max == null) return true;
  if (pick.listPrice == null) return true;
  return pick.listPrice <= max;
}

function sortPicksDsfFirst(pages: MerchantFeaturedPick[]): MerchantFeaturedPick[] {
  return [...pages].sort((a, b) => {
    if (a.merchantId === "den-sidste-flaske" && b.merchantId !== "den-sidste-flaske") return -1;
    if (b.merchantId === "den-sidste-flaske" && a.merchantId !== "den-sidste-flaske") return 1;
    return 0;
  });
}

function picksFromGuides(guideSlugs: string[], limit: number, max: number | null): MerchantFeaturedPick[] {
  const seen = new Set<string>();
  const pages: MerchantFeaturedPick[] = [];

  for (const guideSlug of guideSlugs) {
    for (const page of listWineDetailPagesForGuide(guideSlug, limit)) {
      const key = `${page.merchantId}:${page.slug}`;
      if (seen.has(key)) continue;
      seen.add(key);
      const pick = wineDetailPageToFeaturedPick(page);
      if (!withinBudget(pick, max)) continue;
      pages.push(pick);
    }
  }

  return sortPicksDsfFirst(pages).slice(0, limit);
}

function picksFromPageTextMatch(tokens: string[], limit: number, max: number | null): MerchantFeaturedPick[] {
  const scored = listAllWineDetailPages()
    .map((page) => ({ page, score: pageMatchScore(page, tokens) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);

  const out: MerchantFeaturedPick[] = [];
  for (const { page } of scored) {
    const pick = wineDetailPageToFeaturedPick(page);
    if (!withinBudget(pick, max)) continue;
    out.push(pick);
    if (out.length >= limit) break;
  }
  return sortPicksDsfFirst(out);
}

function fallbackDsfPicks(tokens: string[], max: number | null, limit: number): MerchantFeaturedPick[] {
  const all = dsfPicks();
  const matched = all.filter((p) => matchesFeaturedPick(p, tokens) && withinBudget(p, max));
  const pool = matched.length > 0 ? matched : all.filter((p) => withinBudget(p, max));

  const seen = new Set<string>();
  const out: MerchantFeaturedPick[] = [];
  for (const url of DSF_DEFAULT_URLS) {
    const p = pool.find((x) => x.productUrl === url) ?? all.find((x) => x.productUrl === url);
    if (p && withinBudget(p, max) && !seen.has(p.productUrl)) {
      seen.add(p.productUrl);
      out.push(p);
    }
  }
  for (const p of pool) {
    if (seen.has(p.productUrl)) continue;
    seen.add(p.productUrl);
    out.push(p);
    if (out.length >= limit) break;
  }
  return out.slice(0, limit);
}

function mergePicks(primary: MerchantFeaturedPick[], extra: MerchantFeaturedPick[], limit: number): MerchantFeaturedPick[] {
  const seen = new Set(primary.map((p) => `${p.merchantId}:${p.productUrl}`));
  const merged = [...primary];
  for (const p of extra) {
    const key = `${p.merchantId}:${p.productUrl}`;
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(p);
    if (merged.length >= limit) break;
  }
  return merged.slice(0, limit);
}

/** Kuraterede enkeltvin-forslag til søgning (alle forhandlere — DSF først). */
export function listCuratedPicksForSearchQuery(q: string, max: number | null = null, limit = 3): MerchantFeaturedPick[] {
  const trimmed = q.trim();
  if (!trimmed) return fallbackDsfPicks([], max, limit);

  const tokens = queryTokens(trimmed);
  const guideSlugs = guideSlugsForSearchQuery(trimmed);

  const fromText = picksFromPageTextMatch(tokens, limit, max);
  const fromGuides = picksFromGuides(guideSlugs, limit, max);
  const merged = mergePicks(
    mergePicks(fromText, fromGuides, limit),
    fallbackDsfPicks(tokens, max, limit),
    limit,
  );

  if (merged.length > 0) return merged;

  return fallbackDsfPicks(tokens, max, limit);
}

export function detailSlugForCuratedPick(pick: MerchantFeaturedPick): string | undefined {
  return wineDetailSlugForProductUrl(pick.merchantId, pick.productUrl);
}

/** Om mindst én kurateret pick matcher søgningen men ikke nødvendigvis DSF. */
export function hasRelevantCuratedPicksForQuery(q: string, max: number | null = null): boolean {
  const tokens = queryTokens(q.trim());
  if (tokens.length === 0) return false;
  return listAllWineDetailPages().some((p) => pageMatchScore(p, tokens) > 0 && withinBudget(wineDetailPageToFeaturedPick(p), max));
}
