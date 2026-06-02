import { MERCHANT_FEATURED_PICKS, type MerchantFeaturedPick } from "@/lib/merchant-featured-picks";
import {
  listWineDetailPagesForGuide,
  wineDetailPageToFeaturedPick,
  wineDetailSlugForProductUrl,
} from "@/lib/wine-detail-pages/registry";

const DSF_DEFAULT_URLS = [
  "https://densidsteflaske.dk/products/primitivo-susumaniello-salento-boccantino-2024",
  "https://densidsteflaske.dk/products/the-guv-nor-tinto",
  "https://densidsteflaske.dk/products/spritz-roll-aperetivo-originale-nv",
] as const;

/** Map fri søgetekst → guide-slugs med kuraterede enkeltvin-sider. */
export function guideSlugsForSearchQuery(q: string): string[] {
  const t = q.toLowerCase();
  const out: string[] = [];

  if (/tapas|chorizo|jamón|jamon|charcuteri|aperitivo|spritz/i.test(t)) out.push("vin-til-tapas");
  if (/gryderet|bourguignon|coq|braiser|stuvning|oksekae|lammeskank|estofado/i.test(t)) out.push("vin-til-gryderet");
  if (/nytår|nytaar|champagne|bobler|cava|prosecco|cremant|fest/i.test(t)) out.push("vin-til-nytaar-og-nytaarsmenu");
  if (/pizza|pasta|lasagne|italien/i.test(t)) out.push("rodvin-til-pizza", "vin-til-pizza");
  if (/fisk|skaldyr|laks|torsk|sushi|musling|reje|hvidvin|riesling|sauvignon/i.test(t)) out.push("vin-til-fisk-og-skaldyr");
  if (/grill|bbq|malbec|entrecôte|entrecote|bøf|boef/i.test(t)) out.push("vin-til-grill-og-bbq");
  if (/gave|fest|konfirmation|bryllup/i.test(t)) out.push("bedste-vin-til-gave");
  if (/påske|paaske/i.test(t)) out.push("vin-til-paaske");
  if (/jule|jul/i.test(t)) out.push("vin-til-julefrokost");
  if (/ost|cheese|brie|parmesan/i.test(t)) out.push("vin-til-ost-og-ostebord");
  if (/rødvin|rodvin|pinot noir|merlot|cabernet|syrah|rioja/i.test(t) && !out.includes("vin-til-gryderet")) {
    out.push("vin-til-gryderet");
  }

  if (out.length === 0) out.push("komplet-guide-til-vin-og-mad");
  return [...new Set(out)];
}

function dsfPicks(): MerchantFeaturedPick[] {
  return MERCHANT_FEATURED_PICKS.filter((p) => p.merchantId === "den-sidste-flaske");
}

function matchesQuery(pick: MerchantFeaturedPick, q: string): boolean {
  const hay = `${pick.title} ${pick.blurb ?? ""}`.toLowerCase();
  const tokens = q
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w.length > 2);
  return tokens.some((tok) => hay.includes(tok));
}

function withinBudget(pick: MerchantFeaturedPick, max: number | null): boolean {
  if (max == null) return true;
  if (pick.listPrice == null) return true;
  return pick.listPrice <= max;
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

  pages.sort((a, b) => {
    if (a.merchantId === "den-sidste-flaske" && b.merchantId !== "den-sidste-flaske") return -1;
    if (b.merchantId === "den-sidste-flaske" && a.merchantId !== "den-sidste-flaske") return 1;
    return 0;
  });

  return pages.slice(0, limit);
}

function fallbackDsfPicks(q: string, max: number | null, limit: number): MerchantFeaturedPick[] {
  const all = dsfPicks();
  const matched = all.filter((p) => matchesQuery(p, q) && withinBudget(p, max));
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

/** Kuraterede DSF-/enkeltvin-forslag til søgning uden feed. */
export function listCuratedPicksForSearchQuery(q: string, max: number | null = null, limit = 3): MerchantFeaturedPick[] {
  const trimmed = q.trim();
  if (!trimmed) return fallbackDsfPicks("vin", max, limit);

  const guideSlugs = guideSlugsForSearchQuery(trimmed);
  const fromGuides = picksFromGuides(guideSlugs, limit, max).filter((p) => p.merchantId === "den-sidste-flaske");

  if (fromGuides.length >= limit) return fromGuides.slice(0, limit);

  const fallback = fallbackDsfPicks(trimmed, max, limit);
  const seen = new Set(fromGuides.map((p) => p.productUrl));
  const merged = [...fromGuides];
  for (const p of fallback) {
    if (seen.has(p.productUrl)) continue;
    seen.add(p.productUrl);
    merged.push(p);
    if (merged.length >= limit) break;
  }
  return merged.slice(0, limit);
}

export function detailSlugForCuratedPick(pick: MerchantFeaturedPick): string | undefined {
  return wineDetailSlugForProductUrl(pick.merchantId, pick.productUrl);
}
