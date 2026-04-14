import type { GuideFrontmatter } from "@/lib/content/guide-types";

/** Til kategorisering i hub-browser (slug-baseret — ingen ekstra frontmatter). */
export type GuideBrowseKind = "vin-til" | "druer" | "baggrund";

export function classifyGuideSlug(slug: string): GuideBrowseKind {
  const s = slug.toLowerCase();
  if (s.startsWith("vin-til-")) return "vin-til";
  if (s.endsWith("-druen")) return "druer";
  return "baggrund";
}

export type GuideCardData = Pick<GuideFrontmatter, "slug" | "title" | "description" | "updated" | "tags">;

const KIND_LABELS: Record<GuideBrowseKind | "alle", string> = {
  alle: "Alle",
  "vin-til": "Vin til retter",
  druer: "Druesorter",
  baggrund: "Begreber & overblik",
};

export function kindFilterLabel(kind: GuideBrowseKind | "alle"): string {
  return KIND_LABELS[kind];
}

/** Tags der bruges som filtre — kun dem der forekommer mindst `minCount` gange. */
export function topTagsForGuides(guides: GuideCardData[], minCount = 2, max = 16): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  const skip = new Set(["mad og vin", "humør", "sæson"]);
  for (const g of guides) {
    for (const raw of g.tags || []) {
      const t = raw.trim().toLowerCase();
      if (t.length < 2 || skip.has(t)) continue;
      counts.set(t, (counts.get(t) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .filter(([, n]) => n >= minCount)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "da"))
    .slice(0, max)
    .map(([tag, count]) => ({ tag, count }));
}

export function guideMatchesSearch(g: GuideCardData, q: string): boolean {
  const s = q.trim().toLowerCase();
  if (!s) return true;
  const hay = `${g.title} ${g.description} ${g.slug} ${(g.tags || []).join(" ")}`.toLowerCase();
  return hay.includes(s);
}
