import Link from "next/link";

import { GUIDE_CLUSTER_LINKS, type GuideClusterBlock } from "@/lib/growth/guide-cluster-links";

const TONE_STYLES = {
  emerald: {
    section: "border-emerald-200/80 bg-emerald-50/50",
    link: "text-emerald-900 decoration-emerald-200 hover:text-emerald-950",
    footer: "text-emerald-900",
  },
  rose: {
    section: "border-rose-200/80 bg-rose-50/50",
    link: "text-rose-900 decoration-rose-200 hover:text-rose-950",
    footer: "text-rose-900",
  },
  amber: {
    section: "border-amber-200/80 bg-amber-50/50",
    link: "text-amber-950 decoration-amber-200 hover:text-stone-950",
    footer: "text-amber-950",
  },
} as const;

function ClusterSection({ block, guideSlug }: { block: GuideClusterBlock; guideSlug: string }) {
  const tone = block.tone ?? "emerald";
  const styles = TONE_STYLES[tone];
  const isAlkoholfriSlug =
    guideSlug.startsWith("bedste-alkoholfri") ||
    guideSlug.startsWith("alkoholfri-vin-til-") ||
    guideSlug === "alkoholsvag-og-alkoholfri-vin";

  return (
    <section
      className={`not-prose mt-10 rounded-2xl border p-6 shadow-sm ${styles.section}`}
      aria-labelledby={`guide-cluster-heading-${block.clusterTitle}`}
    >
      <h2 id={`guide-cluster-heading-${block.clusterTitle}`} className="text-xl font-semibold text-stone-900">
        {block.clusterTitle}
      </h2>
      {block.intro ? <p className="mt-2 text-sm text-stone-600">{block.intro}</p> : null}
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {block.links.map((link) => (
          <li key={link.slug}>
            <Link
              href={`/guides/${link.slug}`}
              className={`font-medium underline underline-offset-4 ${styles.link}`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      {tone === "emerald" && !isAlkoholfriSlug ? (
        <p className="mt-4 text-sm text-stone-600">
          <Link href="/guides/bedste-alkoholfri-vin" className={`font-medium hover:underline ${styles.footer}`}>
            Se hele alkoholfri-overblikket
          </Link>
        </p>
      ) : null}
      {tone === "rose" && guideSlug !== "komplet-guide-til-vin-og-mad" ? (
        <p className="mt-4 text-sm text-stone-600">
          <Link
            href="/guides/komplet-guide-til-vin-og-mad"
            className={`font-medium hover:underline ${styles.footer}`}
          >
            Se den komplette vin-og-mad-guide
          </Link>
        </p>
      ) : null}
      {tone === "amber" ? (
        <p className="mt-4 text-sm text-stone-600">
          <Link href="/vin-viden" className={`font-medium hover:underline ${styles.footer}`}>
            Se hele vin-viden-hubben
          </Link>
        </p>
      ) : null}
    </section>
  );
}

export function GuideClusterCrosslinks({ guideSlug }: { guideSlug: string }) {
  const raw = GUIDE_CLUSTER_LINKS[guideSlug];
  if (!raw) return null;
  const blocks = Array.isArray(raw) ? raw : [raw];
  if (!blocks.length) return null;

  return (
    <>
      {blocks.map((block) => (
        <ClusterSection key={block.clusterTitle} block={block} guideSlug={guideSlug} />
      ))}
    </>
  );
}
