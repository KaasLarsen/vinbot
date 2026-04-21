import type { Metadata } from "next";
import Link from "next/link";
import { GuideHubBrowser } from "@/components/guide-hub-browser";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PartnerAdsLeaderboard } from "@/components/partner-ads-leaderboard";
import { listSaesonHubGuides } from "@/lib/content/guides";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sæson og vin — forår, sommer, efterår, vinter",
  description:
    "Sæsonvin i Danmark: jul, påske, nytår, fastelavn, Mortensaften, Sankt Hans, sommer, grill, højtider og klassisk dansk mad — søg i guiderne her.",
  alternates: { canonical: `${siteUrl}/saeson` },
};

export default function SaesonHubPage() {
  const guides = listSaesonHubGuides();
  const cards = guides.map((g) => ({
    slug: g.slug,
    title: g.title,
    description: g.description,
    updated: g.updated,
    tags: g.tags,
  }));

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <Breadcrumbs items={[{ href: "/", label: "Forside" }, { href: "/saeson", label: "Sæson" }]} />
      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-stone-900">Sæson og vin</h1>
      <p className="mt-4 max-w-3xl text-lg text-stone-700">
        Årstiden påvirker både køkkenet og lysten i glasset. Her finder du{" "}
        <strong className="font-medium text-stone-800">højtider</strong>,{" "}
        <strong className="font-medium text-stone-800">grill og sommer</strong>,{" "}
        <strong className="font-medium text-stone-800">vinter og hygge</strong> og praktiske sider om fx temperatur og gavevin. Søg nedenfor, eller gå til{" "}
        <Link href="/guides" className="text-rose-900 hover:underline">
          alle guides
        </Link>
        .
      </p>

      <section className="mt-10 rounded-lg bg-rose-50 p-6">
        <h2 className="text-xl font-semibold text-stone-900">Forår og sommer lige nu — maj/juni</h2>
        <p className="mt-3 text-stone-700">
          Sæson-højdepunkter: {" "}
          <Link href="/guides/vin-til-konfirmation" className="text-rose-900 hover:underline">
            vin til konfirmation
          </Link>
          ,{" "}
          <Link href="/guides/vin-til-studenterfest" className="text-rose-900 hover:underline">
            vin til studenterfest
          </Link>
          ,{" "}
          <Link href="/guides/vin-til-mors-dag" className="text-rose-900 hover:underline">
            vin til mors dag
          </Link>
          ,{" "}
          <Link href="/guides/vin-til-fars-dag" className="text-rose-900 hover:underline">
            vin til fars dag
          </Link>
          ,{" "}
          <Link href="/guides/vin-til-haveselskab" className="text-rose-900 hover:underline">
            vin til haveselskab
          </Link>
          ,{" "}
          <Link href="/guides/vin-til-sommerbryllup" className="text-rose-900 hover:underline">
            sommerbryllup
          </Link>{" "}
          og {" "}
          <Link href="/guides/bedste-sommervin" className="text-rose-900 hover:underline">
            bedste sommervin
          </Link>
          .
        </p>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-semibold text-stone-900">Sæsonguides</h2>
        <GuideHubBrowser guides={cards} showKindTabs={false} showTagChips tagMinCount={1} />
      </section>

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
        <Link href="/guides/vin-til-fastelavn" className="text-rose-900 hover:underline">
          fastelavn
        </Link>
        ,{" "}
        <Link href="/guides/vin-til-mortensaften" className="text-rose-900 hover:underline">
          Mortensaften
        </Link>
        ,{" "}
        <Link href="/guides/vin-til-sankt-hans" className="text-rose-900 hover:underline">
          Sankt Hans
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
