import { filterIndexableGuides, listGuides } from "@/lib/content/guides";
import { getAllRecipes } from "@/lib/content/recipes";
import { guideMatchesSearch } from "@/lib/guide-browse";

export type NavSearchKind = "guide" | "recipe" | "hub" | "quick";

export type NavSearchSuggestion = {
  href: string;
  label: string;
  description?: string;
  kind: NavSearchKind;
  score: number;
};

const HUB_LINKS: { label: string; href: string; keywords: string[] }[] = [
  { label: "Mad & vin", href: "/mad-og-vin", keywords: ["mad", "vin", "parring", "match"] },
  { label: "Opskrifter", href: "/opskrifter", keywords: ["opskrift", "opskrifter", "gryde", "coq", "bourguignon", "parring", "pizza", "burger"] },
  { label: "Bedste vine", href: "/bedste-vine", keywords: ["bedste", "køb", "pris", "anbefaling"] },
  { label: "Vin-viden", href: "/vin-viden", keywords: ["viden", "temperatur", "opbevaring", "glas"] },
  { label: "Alle guides", href: "/guides", keywords: ["guide", "guides", "artikel"] },
];

/** Populære genveje når feltet er tomt (roterer ikke — stabilt sæt). */
const QUICK_PICKS: NavSearchSuggestion[] = [
  { href: "/guides/vin-til-julefrokost", label: "Vin til julefrokost", kind: "quick", score: 0 },
  { href: "/guides/vin-til-pizza-og-pasta", label: "Vin til pizza og pasta", kind: "quick", score: 0 },
  { href: "/guides/vin-til-fisk-og-skaldyr", label: "Vin til fisk og skaldyr", kind: "quick", score: 0 },
  { href: "/guides/bedste-vin-under-150-kr", label: "Bedste vin under 150 kr", kind: "quick", score: 0 },
  { href: "/opskrifter", label: "Opskrifter — vin i retten og til maden", kind: "quick", score: 0 },
  { href: "/guides/pinot-noir-druen", label: "Pinot noir-druen", kind: "quick", score: 0 },
  { href: "/guides/riesling-druen", label: "Riesling-druen", kind: "quick", score: 0 },
  { href: "/mad-og-vin", label: "Mad & vin — overblik", kind: "quick", score: 0 },
];

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "");
}

function scoreHaystack(hay: string, q: string): number {
  const query = normalize(q.trim());
  if (!query) return 0;
  const h = normalize(hay);
  if (h.includes(query)) return 100 + (h.startsWith(query) ? 20 : 0);

  const tokens = query.split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return 0;
  let score = 0;
  for (const t of tokens) {
    if (h.includes(t)) score += 24;
  }
  return score;
}

function guideHaystack(slug: string, title: string, description: string, tags: string[]): string {
  return `${title} ${description} ${slug} ${tags.join(" ")}`;
}

function guideMatchesQuery(
  slug: string,
  title: string,
  description: string,
  tags: string[],
  updated: string,
  q: string,
): boolean {
  const card = { slug, title, description, tags, updated };
  if (guideMatchesSearch(card, q)) return true;
  const hay = normalize(guideHaystack(slug, title, description, tags));
  const tokens = normalize(q).split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return false;
  return tokens.every((t) => hay.includes(t));
}

function guideScore(
  slug: string,
  title: string,
  description: string,
  tags: string[],
  updated: string,
  q: string,
  mode: "vin" | "guides",
): number {
  if (!guideMatchesQuery(slug, title, description, tags, updated, q)) return 0;
  let s =
    scoreHaystack(title, q) * 2 +
    scoreHaystack(description, q) +
    scoreHaystack(slug.replace(/-/g, " "), q) +
    scoreHaystack(tags.join(" "), q);
  if (mode === "vin" && slug.startsWith("vin-til-")) s += 30;
  if (mode === "vin" && slug.startsWith("bedste-")) s += 10;
  if (mode === "guides" && slug.startsWith("bedste-")) s += 5;
  return s;
}

function recipeScore(title: string, slug: string, description: string, q: string): number {
  const hay = `${title} ${description} ${slug}`;
  const s = scoreHaystack(hay, q);
  return s > 0 ? s + 15 : 0;
}

export function searchNavSuggestions(q: string, mode: "vin" | "guides", limit = 8): NavSearchSuggestion[] {
  const trimmed = q.trim();
  if (!trimmed) {
    return QUICK_PICKS.slice(0, limit);
  }

  const out: NavSearchSuggestion[] = [];

  for (const hub of HUB_LINKS) {
    const hay = `${hub.label} ${hub.keywords.join(" ")}`;
    const s = scoreHaystack(hay, trimmed);
    if (s > 0) {
      out.push({ href: hub.href, label: hub.label, kind: "hub", score: s - 5 });
    }
  }

  for (const g of filterIndexableGuides(listGuides())) {
    const s = guideScore(g.slug, g.title, g.description, g.tags || [], g.updated, trimmed, mode);
    if (s > 0) {
      out.push({
        href: `/guides/${g.slug}`,
        label: g.title,
        description: g.description,
        kind: "guide",
        score: s,
      });
    }
  }

  if (mode === "vin") {
    for (const r of getAllRecipes()) {
      const s = recipeScore(r.title, r.slug, r.description, trimmed);
      if (s > 0) {
        out.push({
          href: `/opskrifter/${r.slug}`,
          label: r.title,
          description: r.description,
          kind: "recipe",
          score: s,
        });
      }
    }
  }

  return out
    .sort((a, b) => b.score - a.score || a.label.localeCompare(b.label, "da"))
    .slice(0, limit);
}
