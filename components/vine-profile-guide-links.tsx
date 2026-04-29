import Link from "next/link";

import { relatedGuidesForWineProfile } from "@/lib/vine/guide-links-for-wine";
import type { CanonicalWine } from "@/lib/vine/types";

/** Dybdegående guides fra samme site — signalerer redaktionel kerne ud over vinprofiler. */
export async function VineProfileGuideLinks({ wine }: { wine: CanonicalWine }) {
  const items = await relatedGuidesForWineProfile(wine, 3);
  if (items.length === 0) return null;
  return (
    <section
      className="mt-10 rounded-2xl border border-stone-200 bg-stone-50/80 px-5 py-6"
      aria-labelledby="vine-guides-heading"
    >
      <h2 id="vine-guides-heading" className="text-xl font-semibold text-stone-900">
        Guides på Vinbot der udvider konteksten
      </h2>
      <ul className="mt-4 space-y-4">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="font-medium text-rose-900 underline decoration-rose-300 underline-offset-4 hover:text-rose-950"
            >
              {item.title}
            </Link>
            <p className="mt-1 text-sm leading-relaxed text-stone-700">{item.hint}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
