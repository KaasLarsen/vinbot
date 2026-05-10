import { unstable_cache } from "next/cache";

import { isThinGuide, listGuides } from "@/lib/content/guides";
import { normalize } from "@/lib/search/helpers";
import type { GuideFrontmatter } from "@/lib/content/guide-types";

import type { CanonicalWine } from "./types";

const cachedGuides = unstable_cache(async () => listGuides(), ["vinbot-guide-index-for-vine-links"], {
  revalidate: 7200,
});

function tokenizeForMatch(wine: CanonicalWine): string[] {
  const raw = normalize(`${wine.displayTitle} ${wine.category} ${wine.brand}`)
    .replace(/[^a-z0-9æøå\s-]/gi, " ")
    .replace(/-/g, " ");
  const parts = raw.split(/\s+/).filter((t) => t.length >= 4);
  return [...new Set(parts)];
}

function guideHaystack(g: GuideFrontmatter): string {
  return normalize(`${g.title} ${g.description} ${g.slug} ${(g.tags || []).join(" ")} ${g.hub || ""}`);
}

/** Evergreen fallback når overlap er lav — stadig dybt redaktionelt indhold. */
const FALLBACK_SLUGS = [
  "komplet-guide-til-vin-og-mad",
  "vin-begreber-i-praksis",
  "opbevaring-af-vin-temperatur-og-aabnet-flaske",
] as const;

export type VineGuideLinkPick = {
  title: string;
  href: string;
  hint: string;
};

/**
 * Finder op til `limit` guides der overlapper titel/kategori — supplerer vinprofiler med dybt redaktionelt indhold.
 */
export async function relatedGuidesForWineProfile(wine: CanonicalWine, limit = 3): Promise<VineGuideLinkPick[]> {
  const guides = await cachedGuides();
  const tokens = tokenizeForMatch(wine);

  const scored = guides.map((g) => {
    const hay = guideHaystack(g);
    let score = 0;
    for (const tok of tokens) {
      if (hay.includes(tok)) score += tok.length >= 10 ? 6 : 4;
    }
    return { g, score };
  });

  scored.sort((a, b) => b.score - a.score || a.g.title.localeCompare(b.g.title, "da"));

  const picked: VineGuideLinkPick[] = [];
  const seen = new Set<string>();

  const MIN_SCORE = 5;

  for (const { g, score } of scored) {
    if (picked.length >= limit) break;
    if (score < MIN_SCORE) break;
    if (seen.has(g.slug)) continue;
    if (isThinGuide(g.slug)) continue;
    seen.add(g.slug);
    picked.push({
      title: g.title,
      href: `/guides/${g.slug}`,
      hint:
        score >= 14
          ? "Overlap mellem din vin og guidens tema — udvidet baggrund fra Vinbots egne artikler."
          : "Ekstra læsning på Vinbot om vin og måltider ud over selve produktoplysningerne.",
    });
  }

  for (const slug of FALLBACK_SLUGS) {
    if (picked.length >= limit) break;
    if (seen.has(slug)) continue;
    const g = guides.find((x) => x.slug === slug);
    if (!g) continue;
    seen.add(slug);
    picked.push({
      title: g.title,
      href: `/guides/${g.slug}`,
      hint: "Grundlæggende eller ofte efterspurgt — companion til vinprofiler.",
    });
  }

  return picked.slice(0, limit);
}
