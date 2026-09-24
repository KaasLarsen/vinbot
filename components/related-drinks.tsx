import Link from "next/link";
import type { RelatedDrinkCard } from "@/lib/content/related-drinks";

export function RelatedDrinks({ drinks }: { drinks: RelatedDrinkCard[] }) {
  if (drinks.length === 0) return null;

  return (
    <section className="not-prose mt-10 rounded-2xl border border-stone-200 bg-stone-50/60 p-6">
      <h2 className="text-xl font-semibold text-stone-900">Flere drinks</h2>
      <p className="mt-2 text-sm text-stone-700">
        Andre drinks med vin — spritz, cocktails og bowle.
      </p>
      <ul className="mt-4 space-y-3 text-sm">
        {drinks.map((d) => (
          <li key={d.slug}>
            <Link href={`/drinks/${d.slug}`} className="font-medium text-rose-900 hover:underline">
              {d.title}
            </Link>
            <p className="mt-0.5 text-stone-600">{d.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
