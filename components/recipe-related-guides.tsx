import Link from "next/link";
import { listGuides } from "@/lib/content/guides";

export function RecipeRelatedGuides({ slugs }: { slugs: string[] }) {
  if (slugs.length === 0) return null;

  const titles = new Map(listGuides().map((g) => [g.slug, g.title]));

  return (
    <section className="not-prose mt-10 rounded-2xl border border-stone-200 bg-stone-50/60 p-6">
      <h2 className="text-xl font-semibold text-stone-900">Læs også</h2>
      <p className="mt-2 text-sm text-stone-700">
        Guides til madlavning med vin og parring til tallerkenen.
      </p>
      <ul className="mt-4 space-y-2 text-sm">
        {slugs.map((slug) => (
          <li key={slug}>
            <Link href={`/guides/${slug}`} className="font-medium text-rose-900 hover:underline">
              {titles.get(slug) ?? slug.replace(/-/g, " ")}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
