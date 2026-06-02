import { listWineDetailPagesForGuide } from "@/lib/wine-detail-pages/registry";
import type { WineDetailPage } from "@/lib/wine-detail-pages/types";

/** Opskrift → guides der bruges til at finde kuraterede enkeltvin-sider. */
const RECIPE_GUIDE_SLUGS: Record<string, readonly string[]> = {
  "coq-au-vin": ["vin-til-gryderet", "vin-til-kylling", "vin-til-fransk-mad"],
  "boeuf-bourguignon": ["vin-til-gryderet", "vin-til-oksekoed", "vin-til-fransk-mad"],
  "braiseret-lammeskank-med-rodvin": ["vin-til-gryderet", "vin-til-lam"],
  "braiseret-oksekaebe-med-rodvin": ["vin-til-gryderet", "vin-til-oksekoed"],
  "svinekaebber-i-rodvinssky": ["vin-til-gryderet", "vin-til-svinekoed"],
  "chorizo-i-rodvin": ["vin-til-tapas", "vin-til-spansk-mad"],
  "champignons-al-ajillo-med-hvidvin": ["vin-til-tapas", "vin-til-spansk-mad"],
  "estofado-oksestuvning-i-rodvin": ["vin-til-gryderet", "vin-til-spansk-mad"],
  "spansk-koedboller-i-rodvinsauce": ["vin-til-tapas", "vin-til-spansk-mad"],
  "risotto-med-rodvin-barolo": ["vin-til-risotto", "vin-til-italiensk-mad"],
  "figner-og-dadler-i-rodvin": ["vin-til-tapas", "vin-til-dessert"],
  "roedvinsgele-til-charcuteri": ["vin-til-ost-og-ostebord", "vin-til-tapas"],
};

function guidesFromTags(tags: string[]): string[] {
  const t = new Set(tags.map((x) => x.toLowerCase()));
  const out: string[] = [];
  if (t.has("tapas") || t.has("spansk")) out.push("vin-til-tapas");
  if (t.has("fransk") || t.has("gryderet")) out.push("vin-til-gryderet");
  if (t.has("italiensk")) out.push("vin-til-italiensk-mad", "vin-til-risotto");
  if (t.has("rødvin") || t.has("rodvin")) out.push("vin-til-gryderet");
  if (t.has("hvidvin")) out.push("vin-til-fisk-og-skaldyr");
  if (t.has("dessert")) out.push("vin-til-dessert");
  if (out.length === 0) out.push("komplet-guide-til-vin-og-mad");
  return out;
}

export function guideSlugsForRecipe(slug: string, tags: string[], relatedGuides: string[] = []): string[] {
  const set = new Set<string>([...(RECIPE_GUIDE_SLUGS[slug] ?? []), ...relatedGuides, ...guidesFromTags(tags)]);
  return [...set];
}

/** Kuraterede enkeltvin-sider til opskrift — DSF først, derefter øvrige forhandlere. */
export function listWineDetailPagesForRecipe(
  slug: string,
  tags: string[],
  relatedGuides: string[] = [],
  limit = 3,
): readonly WineDetailPage[] {
  const guideSlugs = guideSlugsForRecipe(slug, tags, relatedGuides);
  const seen = new Set<string>();
  const pages: WineDetailPage[] = [];

  for (const guideSlug of guideSlugs) {
    for (const p of listWineDetailPagesForGuide(guideSlug, limit)) {
      const key = `${p.merchantId}:${p.slug}`;
      if (seen.has(key)) continue;
      seen.add(key);
      pages.push(p);
    }
  }

  pages.sort((a, b) => {
    if (a.merchantId === "den-sidste-flaske" && b.merchantId !== "den-sidste-flaske") return -1;
    if (b.merchantId === "den-sidste-flaske" && a.merchantId !== "den-sidste-flaske") return 1;
    return 0;
  });

  return pages.slice(0, limit);
}
