import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageShell } from "@/components/page-shell";
import { getAllMerchantHubs } from "@/lib/merchant-hubs";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Vinforhandlere — danske shops Vinbot samarbejder med | Vinbot",
  description:
    "Oversigt over vinforhandlere Vinbot linker til: Lauridsen, Winther, DH Wines, SPS Wine, Den Sidste Flaske og flere. Inspiration, flasker og affiliate-links.",
  alternates: { canonical: `${siteUrl}/vinforhandlere` },
  openGraph: {
    url: `${siteUrl}/vinforhandlere`,
    title: "Vinforhandlere hos Vinbot",
    description:
      "Alle vinforhandlere Vinbot samarbejder med — hubs med inspiration og direkte flaske-links.",
  },
};

export default function VinforhandlereIndexPage() {
  const hubs = getAllMerchantHubs();

  return (
    <PageShell className="py-10">
      <Breadcrumbs
        items={[
          { href: "/", label: "Forside" },
          { href: "/vinforhandlere", label: "Vinforhandlere" },
        ]}
      />
      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-stone-900">Vinforhandlere</h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-stone-700">
        Vinbot sælger ikke vin selv. Vi hjælper dig med at finde flasker via søgning og guider — og linker videre til danske (og udvalgte internationale) forhandlere, når du er klar til at købe. Nedenfor er alle shops, vi har dedikerede sider til.
      </p>
      <p className="mt-3 max-w-3xl text-stone-700 leading-relaxed">
        Mange links er affiliate: når du køber efter et klik fra Vinbot, kan vi modtage provision — typisk uden merpris for dig. Se også{" "}
        <Link href="/rabatkoder" className="font-medium text-rose-900 hover:underline">
          rabatkoder
        </Link>
        ,{" "}
        <Link href="/tilbud" className="font-medium text-rose-900 hover:underline">
          vin tilbud
        </Link>{" "}
        og{" "}
        <Link href="/" className="font-medium text-rose-900 hover:underline">
          vinsøgningen
        </Link>
        .
      </p>

      <ul className="mt-12 divide-y divide-stone-200 border-y border-stone-200">
        {hubs.map((hub) => (
          <li key={hub.slug} className="py-5">
            <Link href={`/${hub.slug}`} className="group block">
              <h2 className="text-xl font-semibold text-stone-900 group-hover:text-rose-900">
                {hub.displayName}
              </h2>
              <p className="mt-1 max-w-2xl text-stone-600">{hub.blurb}</p>
              <span className="mt-2 inline-block text-sm font-medium text-rose-900 underline-offset-4 group-hover:underline">
                Læs mere og se flasker
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-10 text-sm text-stone-600">
        Er du selv forhandler?{" "}
        <Link href="/forhandlere" className="text-rose-900 hover:underline">
          Bliv listet hos Vinbot
        </Link>
        .
      </p>
    </PageShell>
  );
}
