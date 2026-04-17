import type { Metadata } from "next";
import Link from "next/link";
import { GuideHubBrowser } from "@/components/guide-hub-browser";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PartnerAdsLeaderboard } from "@/components/partner-ads-leaderboard";
import { listHumoerHubGuides } from "@/lib/content/guides";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Humør og stemning — vælg vin efter lejlighed",
  description:
    "Hygge, romantik, fest, bobler, brunch, sommer og gavevin: søg i guider til stemning og lejlighed — kombinér med mad & vin når menuen er klar.",
  alternates: { canonical: `${siteUrl}/humoer-og-vin` },
};

export default function HumoerHubPage() {
  const guides = listHumoerHubGuides();
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
        Vin er socialt — samme flaske kan føles festlig, rolig eller romantisk afhængigt af kontekst. Her samler vi guider om{" "}
        <strong className="font-medium text-stone-800">hygge</strong>,{" "}
        <strong className="font-medium text-stone-800">fest og bobler</strong>,{" "}
        <strong className="font-medium text-stone-800">sommer og terrasse</strong>,{" "}
        <strong className="font-medium text-stone-800">gave</strong> og mere. Søg i listen, eller gå til{" "}
        <Link href="/guides" className="text-rose-900 hover:underline">
          alle guides
        </Link>
        .
      </p>
      <p className="mt-3 max-w-3xl text-sm text-stone-600">
        Når retten er bestemt, er{" "}
        <Link href="/mad-og-vin" className="font-medium text-rose-900 hover:underline">
          mad &amp; vin
        </Link>{" "}
        og{" "}
        <Link href="/saeson" className="font-medium text-rose-900 hover:underline">
          sæson
        </Link>{" "}
        ofte hurtigere vej — men du kan sagtens starte med stemningen her og søge derefter.
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
        </Link>
        ,{" "}
        <Link href="/guides/komplet-guide-til-vin-og-mad" className="text-rose-900 hover:underline">
          den komplette parringsguide
        </Link>{" "}
        og{" "}
        <Link href="/regioner" className="text-rose-900 hover:underline">
          vinregioner
        </Link>
        .
      </p>
    </div>
  );
}
