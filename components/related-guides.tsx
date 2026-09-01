import Link from "next/link";
import { listGuides } from "@/lib/content/guides";

export function RelatedGuides({ tags, excludeSlug }: { tags: string[]; excludeSlug: string }) {
  const all = listGuides().filter((g) => g.slug !== excludeSlug);
  const tagSet = new Set(tags.map((t) => t.toLowerCase()));
  const scored = all
    .map((g) => ({
      g,
      score: (g.tags || []).filter((t) => tagSet.has(t.toLowerCase())).length,
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map((x) => x.g);

  const fallback = scored.length ? scored : all.slice(0, 5);

  return (
    <section className="rounded-2xl border border-stone-200 bg-stone-50/80 p-6">
      <h2 className="text-lg font-semibold text-stone-900">Læs også</h2>
      <ul className="mt-4 space-y-3">
        {fallback.map((g) => (
          <li key={g.slug}>
            <Link href={`/guides/${g.slug}`} className="font-medium text-rose-900 hover:underline">
              {g.title}
            </Link>
            <p className="text-sm text-stone-600">{g.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
