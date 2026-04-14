import type { Metadata } from "next";
import Link from "next/link";
import { GuideHubBrowser } from "@/components/guide-hub-browser";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PartnerAdsLeaderboard } from "@/components/partner-ads-leaderboard";
import { listGuides } from "@/lib/content/guides";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Humør og stemning — vælg vin efter lejlighed",
  description: "Hygge, romantik, fest og sommer: søg og find guides der matcher stemningen.",
  alternates: { canonical: `${siteUrl}/humoer-og-vin` },
};

export default function HumoerHubPage() {
  const raw = listGuides().filter(
    (g) => g.hub === "humoer-og-vin" || (g.tags || []).some((t) => t.toLowerCase().includes("humør")),
  );
  const guides = raw.length ? raw : listGuides().filter((g) => g.slug.includes("humoer"));
  const cards = guides.map((g) => ({
    slug: g.slug,
    title: g.title,
    description: g.description,
    updated: g.updated,
    tags: g.tags,
  }));

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <Breadcrumbs items={[{ href: "/", label: "Forside" }, { href: "/humoer-og-vin", label: "Humør & vin" }]} />
      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-stone-900">Humør og stemning</h1>
      <p className="mt-4 max-w-3xl text-lg text-stone-700">
        Vin er socialt — samme flaske kan føles festlig, rolig eller romantisk afhængigt af kontekst. Søg her eller se{" "}
        <Link href="/guides" className="text-rose-900 hover:underline">
          alle guides
        </Link>
        .
      </p>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-semibold text-stone-900">Guides efter stemning</h2>
        <GuideHubBrowser guides={cards} showKindTabs={false} showTagChips tagMinCount={1} />
      </section>

      <PartnerAdsLeaderboard className="mt-12" />
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
