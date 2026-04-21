import type { Metadata } from "next";
import Link from "next/link";
import { GuideHubBrowser } from "@/components/guide-hub-browser";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PartnerAdsLeaderboard } from "@/components/partner-ads-leaderboard";
import { listBedsteVineHubGuides, listGuides } from "@/lib/content/guides";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Bedste vine — top-lister, pris og lejlighed",
  description:
    "Find den bedste vin: top-lister efter pris, lejlighed, stil og region. Bedste rødvin, hvidvin, rosé, bobler og champagne — plus gaveguider og begyndervin.",
  alternates: { canonical: `${siteUrl}/bedste-vine` },
};

export default function BedsteVineHubPage() {
  const raw = listBedsteVineHubGuides();
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
      <Breadcrumbs items={[{ href: "/", label: "Forside" }, { href: "/bedste-vine", label: "Bedste vine" }]} />
      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-stone-900">Bedste vine</h1>
      <p className="mt-4 max-w-3xl text-lg text-stone-700">
        Hvilken vin er den <strong className="font-medium text-stone-800">bedste</strong> lige nu? Det afhænger af pris,
        stil og lejlighed — ikke en enkelt flaske. Her er Vinbots top-lister, så du hurtigt kan zoome ind på det
        rigtige valg. Brug også søgningen på forsiden til at sammenligne priser på tværs af danske forhandlere.
      </p>
      <p className="mt-3 text-sm text-stone-600">
        Startklassikere:{" "}
        <Link href="/guides/bedste-rodvin" className="text-rose-900 hover:underline">
          bedste rødvin
        </Link>
        ,{" "}
        <Link href="/guides/bedste-hvidvin" className="text-rose-900 hover:underline">
          hvidvin
        </Link>
        ,{" "}
        <Link href="/guides/bedste-bobler" className="text-rose-900 hover:underline">
          bobler
        </Link>
        ,{" "}
        <Link href="/guides/bedste-vin-til-gave" className="text-rose-900 hover:underline">
          gavevin
        </Link>{" "}
        og{" "}
        <Link href="/guides/bedste-vin-til-begynder" className="text-rose-900 hover:underline">
          begyndervin
        </Link>
        . Budget?{" "}
        <Link href="/guides/bedste-rodvin-under-100-kr" className="text-rose-900 hover:underline">
          Rødvin under 100 kr
        </Link>{" "}
        eller{" "}
        <Link href="/guides/bedste-hvidvin-under-150-kr" className="text-rose-900 hover:underline">
          hvidvin under 150 kr
        </Link>
        . Sæson?{" "}
        <Link href="/guides/bedste-sommervin" className="text-rose-900 hover:underline">
          Bedste sommervin
        </Link>
        . Hele oversigten:{" "}
        <Link href="/guides" className="font-medium text-rose-900 hover:underline">
          alle guides
        </Link>
        .
      </p>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-semibold text-stone-900">Find den rigtige top-liste</h2>
        <GuideHubBrowser guides={cards} showKindTabs showTagChips tagMinCount={2} />
      </section>

      <PartnerAdsLeaderboard className="mt-12" />
      <section className="mt-12 text-stone-700">
        <h2 className="text-2xl font-semibold text-stone-900">Relaterede emner</h2>
        <p className="mt-4">
          Skal vinen parres med en ret? Gå til{" "}
          <Link href="/mad-og-vin" className="text-rose-900 hover:underline">
            mad og vin
          </Link>
          . Ledt efter en bestemt druesort eller region? Se{" "}
          <Link href="/druesorter" className="text-rose-900 hover:underline">
            druesorter
          </Link>{" "}
          og{" "}
          <Link href="/regioner" className="text-rose-900 hover:underline">
            regioner
          </Link>
          . Kort om at købe vin online:{" "}
          <Link href="/guides/koeb-vin-online-sadan-holder-du-styr-paa-det" className="text-rose-900 hover:underline">
            sådan holder du styr på det
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
