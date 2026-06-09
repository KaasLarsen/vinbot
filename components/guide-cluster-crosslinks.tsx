import Link from "next/link";

import { GUIDE_CLUSTER_LINKS } from "@/lib/growth/guide-cluster-links";

export function GuideClusterCrosslinks({ guideSlug }: { guideSlug: string }) {
  const block = GUIDE_CLUSTER_LINKS[guideSlug];
  if (!block?.links.length) return null;

  return (
    <section
      className="not-prose mt-10 rounded-2xl border border-emerald-200/80 bg-emerald-50/50 p-6 shadow-sm"
      aria-labelledby="guide-cluster-heading"
    >
      <h2 id="guide-cluster-heading" className="text-xl font-semibold text-stone-900">
        {block.clusterTitle}
      </h2>
      {block.intro ? <p className="mt-2 text-sm text-stone-600">{block.intro}</p> : null}
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {block.links.map((link) => (
          <li key={link.slug}>
            <Link
              href={`/guides/${link.slug}`}
              className="font-medium text-emerald-900 underline decoration-emerald-200 underline-offset-4 hover:text-emerald-950"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      {!guideSlug.startsWith("bedste-alkoholfri") &&
      !guideSlug.startsWith("alkoholfri-vin-til-") &&
      guideSlug !== "alkoholsvag-og-alkoholfri-vin" ? (
        <p className="mt-4 text-sm text-stone-600">
          <Link href="/guides/bedste-alkoholfri-vin" className="font-medium text-emerald-900 hover:underline">
            Se hele alkoholfri-overblikket
          </Link>
        </p>
      ) : null}
    </section>
  );
}
