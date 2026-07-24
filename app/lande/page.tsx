import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PartnerAdsLeaderboard } from "@/components/partner-ads-leaderboard";
import { BreadcrumbJsonLd, CollectionPageJsonLd } from "@/components/json-ld";
import { PageShell } from "@/components/page-shell";
import {
  CONTINENT_LABELS,
  getAllLande,
  getLandeByContinent,
} from "@/lib/lande/registry";
import type { LandConfig, LandContinent } from "@/lib/lande/types";
import { siteUrl } from "@/lib/site";

const PAGE_TITLE = "Vinlande — overblik, kendetegn og forslag";
const PAGE_DESCRIPTION =
  "Vinlande med kendetegn, regioner og konkrete vinforslag: Frankrig, Italien, Spanien, Tyskland, Portugal, USA, Chile, Argentina, Australien, New Zealand, Sydafrika og flere.";
const PAGE_URL = `${siteUrl}/lande`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
};

const CONTINENT_ORDER: LandContinent[] = ["europa", "amerika", "afrika-oceanien"];

function LandCard({ land }: { land: LandConfig }) {
  return (
    <li className="flex flex-col rounded-2xl border border-rose-100 bg-rose-50/50 p-5 shadow-sm ring-1 ring-rose-100/60">
      <h3 className="text-lg font-semibold text-stone-900">
        <Link href={`/lande/${land.slug}`} className="text-rose-950 hover:underline">
          {land.displayName}
        </Link>
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">{land.teaser}</p>
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm">
        <Link href={`/lande/${land.slug}`} className="font-medium text-rose-900 hover:underline">
          Se landesiden →
        </Link>
        <Link
          href={`/?q=${encodeURIComponent(land.primaryQuery)}`}
          className="font-medium text-rose-900 hover:underline"
        >
          Søg vine →
        </Link>
      </div>
    </li>
  );
}

export default function LandeHubPage() {
  const all = getAllLande();
  const collectionItems = all.map((l) => ({
    name: l.displayName,
    url: `${siteUrl}/lande/${l.slug}`,
  }));

  return (
    <PageShell className="py-10">
      <BreadcrumbJsonLd
        items={[
          { name: "Forside", url: `${siteUrl}/` },
          { name: "Vinlande", url: PAGE_URL },
        ]}
      />
      <CollectionPageJsonLd
        name={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        url={PAGE_URL}
        items={collectionItems}
      />
      <Breadcrumbs items={[{ href: "/", label: "Forside" }, { href: "/lande", label: "Vinlande" }]} />

      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-stone-900">Vinlande</h1>
      <p className="mt-4 max-w-3xl text-lg text-stone-700">
        Land giver en hurtig stilforventning — klima, typiske druer og madparring. Hver landeside har{" "}
        <strong className="font-medium text-stone-800">kendetegn</strong>,{" "}
        <strong className="font-medium text-stone-800">regioner</strong> og{" "}
        <strong className="font-medium text-stone-800">vinforslag</strong> fra danske forhandlere.
      </p>
      <p className="mt-3 max-w-3xl text-sm text-stone-600">
        Vil du dykke ned i sub-regioner som Bordeaux, Rioja eller Napa? Se også{" "}
        <Link href="/regioner" className="text-rose-900 hover:underline">
          vinregioner
        </Link>{" "}
        og de lange guides.
      </p>

      {CONTINENT_ORDER.map((continent) => {
        const lande = getLandeByContinent(continent);
        if (!lande.length) return null;
        return (
          <section key={continent} id={continent} className="mt-14 scroll-mt-20">
            <h2 className="text-2xl font-semibold tracking-tight text-stone-900">
              {CONTINENT_LABELS[continent]}
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {lande.map((land) => (
                <LandCard key={land.slug} land={land} />
              ))}
            </ul>
          </section>
        );
      })}

      <PartnerAdsLeaderboard className="mt-16" hub="lande" slug="lande-hub" />

      <p className="mt-10 text-stone-700">
        Udforsk også{" "}
        <Link href="/regioner" className="text-rose-900 hover:underline">
          regioner
        </Link>
        ,{" "}
        <Link href="/druesorter" className="text-rose-900 hover:underline">
          druesorter
        </Link>{" "}
        og{" "}
        <Link href="/" className="text-rose-900 hover:underline">
          vinsøgning
        </Link>
        .
      </p>
    </PageShell>
  );
}
