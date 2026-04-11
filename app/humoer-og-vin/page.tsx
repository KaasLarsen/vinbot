import type { Metadata } from "next";
import Link from "next/link";
import { listGuides } from "@/lib/content/guides";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Humør og stemning — vælg vin efter lejlighed",
  description: "Hygge, romantik, fest og sommer: vælg vin der matcher stemningen. Link til guides, feeds og Den Sidste Flaske.",
  alternates: { canonical: `${siteUrl}/humoer-og-vin` },
};

export default function HumoerHubPage() {
  const guides = listGuides().filter((g) => g.hub === "humoer-og-vin" || (g.tags || []).some((t) => t.toLowerCase().includes("humør")));

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumbs items={[{ href: "/", label: "Forside" }, { href: "/humoer-og-vin", label: "Humør & vin" }]} />
      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-stone-900">Humør og stemning</h1>
      <p className="mt-4 text-lg text-stone-700">
        Vin er socialt — samme flaske kan føles festlig, rolig eller romantisk afhængigt af kontekst. Her samler vi guides, der hjælper dig med at vælge ud fra lejlighed, lys og selskab.
      </p>
      <ul className="mt-10 space-y-4">
        {(guides.length ? guides : listGuides().filter((g) => g.slug.includes("humoer"))).map((g) => (
          <li key={g.slug} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
            <Link href={`/guides/${g.slug}`} className="text-lg font-semibold text-rose-900 hover:underline">
              {g.title}
            </Link>
            <p className="mt-2 text-stone-600">{g.description}</p>
          </li>
        ))}
      </ul>
      <p className="mt-10 text-stone-700">
        Kombinér med{" "}
        <Link href="/mad-og-vin" className="text-rose-900 hover:underline">
          mad og vin
        </Link>{" "}
        og{" "}
        <Link href="/guides/komplet-guide-til-vin-og-mad" className="text-rose-900 hover:underline">
          den komplette parringsguide
        </Link>
        .
      </p>
    </div>
  );
}
