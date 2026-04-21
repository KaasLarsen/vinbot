import type { Metadata } from "next";
import Link from "next/link";
import { GuideHubBrowser } from "@/components/guide-hub-browser";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PartnerAdsLeaderboard } from "@/components/partner-ads-leaderboard";
import { listVinVidenHubGuides, listGuides } from "@/lib/content/guides";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Vin-viden — hvor længe, hvor mange, hvad er og sådan",
  description:
    "Korte svar på de spørgsmål folk googler om vin: hvor længe holder rødvin, hvor mange glas i en flaske, hvad er tanniner, sådan dekanterer du — samlet på ét sted.",
  alternates: { canonical: `${siteUrl}/vin-viden` },
};

export default function VinVidenHubPage() {
  const raw = listVinVidenHubGuides();
  const guides = raw.length ? raw : listGuides().slice(0, 8);
  const cards = guides.map((g) => ({
    slug: g.slug,
    title: g.title,
    description: g.description,
    updated: g.updated,
    tags: g.tags,
  }));

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <Breadcrumbs items={[{ href: "/", label: "Forside" }, { href: "/vin-viden", label: "Vin-viden" }]} />
      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-stone-900">Vin-viden</h1>
      <p className="mt-4 max-w-3xl text-lg text-stone-700">
        Korte, konkrete svar på de spørgsmål folk typisk googler om vin: <strong className="font-medium text-stone-800">hvor længe holder</strong> åbnet og uåbnet vin, <strong className="font-medium text-stone-800">hvor mange glas</strong> i en flaske, <strong className="font-medium text-stone-800">hvad er</strong> tanniner, syre og terroir — og <strong className="font-medium text-stone-800">sådan gør du</strong> det praktiske (dekantering, servering, smagning).
      </p>
      <p className="mt-3 text-sm text-stone-600">
        Start et sted:{" "}
        <Link href="/guides/hvor-laenge-holder-rodvin" className="text-rose-900 hover:underline">
          hvor længe holder rødvin
        </Link>
        ,{" "}
        <Link href="/guides/hvor-mange-glas-i-en-flaske-vin" className="text-rose-900 hover:underline">
          glas i en flaske
        </Link>
        ,{" "}
        <Link href="/guides/hvad-er-tanniner" className="text-rose-900 hover:underline">
          hvad er tanniner
        </Link>
        ,{" "}
        <Link href="/guides/sadan-dekanterer-du-vin" className="text-rose-900 hover:underline">
          sådan dekanterer du
        </Link>{" "}
        og{" "}
        <Link href="/guides/kan-vin-blive-daarlig" className="text-rose-900 hover:underline">
          kan vin blive dårlig
        </Link>
        . Hele samlingen:{" "}
        <Link href="/guides" className="font-medium text-rose-900 hover:underline">
          alle guides
        </Link>
        .
      </p>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-semibold text-stone-900">Søg i vinviden-guiderne</h2>
        <GuideHubBrowser guides={cards} showKindTabs={false} showTagChips tagMinCount={2} />
      </section>

      <PartnerAdsLeaderboard className="mt-12" />
      <section className="mt-12 text-stone-700">
        <h2 className="text-2xl font-semibold text-stone-900">Relaterede emner</h2>
        <p className="mt-4">
          Skal vinen matches til en ret? Se{" "}
          <Link href="/mad-og-vin" className="text-rose-900 hover:underline">
            mad og vin
          </Link>
          . Leder du efter en konkret flaske? Gå til{" "}
          <Link href="/bedste-vine" className="text-rose-900 hover:underline">
            bedste vine
          </Link>
          . For dybdegående opslag og terminologi, se{" "}
          <Link href="/guides/vin-begreber-i-praksis" className="text-rose-900 hover:underline">
            vinbegreber i praksis
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
