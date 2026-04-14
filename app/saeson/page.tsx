import type { Metadata } from "next";
import Link from "next/link";
import { listGuides } from "@/lib/content/guides";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PartnerAdsLeaderboard } from "@/components/partner-ads-leaderboard";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sæson og vin — forår, sommer, efterår, vinter",
  description:
    "Sæsonvin i Danmark: forår, sommer, grill og fest. Guides til påske, jul, nytår, brunch og udendørsmad.",
  alternates: { canonical: `${siteUrl}/saeson` },
};

export default function SaesonHubPage() {
  const guides = listGuides().filter((g) => g.hub === "saeson");

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumbs items={[{ href: "/", label: "Forside" }, { href: "/saeson", label: "Sæson" }]} />
      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-stone-900">Sæson og vin</h1>
      <p className="mt-4 text-lg text-stone-700">
        Årstiden påvirker både køkkenet og lysten i glasset. Her finder du sæsonbetonet inspiration og nem adgang til relaterede guides.
      </p>
      <ul className="mt-10 space-y-4">
        {(guides.length ? guides : listGuides().filter((g) => g.slug.includes("saeson"))).map((g) => (
          <li key={g.slug} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
            <Link href={`/guides/${g.slug}`} className="text-lg font-semibold text-rose-900 hover:underline">
              {g.title}
            </Link>
            <p className="mt-2 text-stone-600">{g.description}</p>
          </li>
        ))}
      </ul>
      <PartnerAdsLeaderboard className="mt-12" />
      <p className="mt-10 text-stone-700">
        Se også{" "}
        <Link href="/guides/vin-til-julemad-den-store-guide" className="text-rose-900 hover:underline">
          vin til julemad
        </Link>
        ,{" "}
        <Link href="/guides/vin-til-nytaar-og-nytaarsmenu" className="text-rose-900 hover:underline">
          nytår og nytårsmenu
        </Link>
        ,{" "}
        <Link href="/guides/vin-til-paaske-og-paaskefrokost" className="text-rose-900 hover:underline">
          påske og påskefrokost
        </Link>
        ,{" "}
        <Link href="/guides/vin-til-brunch" className="text-rose-900 hover:underline">
          brunch
        </Link>
        ,{" "}
        <Link href="/guides/vin-til-sommer" className="text-rose-900 hover:underline">
          vin til sommer
        </Link>
        ,{" "}
        <Link href="/guides/rosevin-til-mad-og-sommer" className="text-rose-900 hover:underline">
          rosévin
        </Link>
        ,{" "}
        <Link href="/guides/vin-i-cocktails-spritz-og-drikke" className="text-rose-900 hover:underline">
          vin i cocktails
        </Link>
        ,{" "}
        <Link href="/guides/vin-til-grill-og-bbq" className="text-rose-900 hover:underline">
          grill og BBQ
        </Link>{" "}
        og{" "}
        <Link href="/humoer-og-vin" className="text-rose-900 hover:underline">
          humør og stemning
        </Link>
        .
      </p>
    </div>
  );
}
