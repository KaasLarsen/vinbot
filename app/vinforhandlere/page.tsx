import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageShell } from "@/components/page-shell";
import { VinforhandlereDirectory } from "@/components/vinforhandlere-directory";
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
    <div className="relative">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(ellipse_at_top,_rgba(136,19,55,0.08),_transparent_55%),linear-gradient(to_bottom,_#fafaf9_0%,_#f5f5f4_40%,_transparent_100%)]"
        aria-hidden
      />
      <PageShell className="relative py-10">
        <Breadcrumbs
          items={[
            { href: "/", label: "Forside" },
            { href: "/vinforhandlere", label: "Vinforhandlere" },
          ]}
        />

        <header className="mt-6 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-900/70">
            Affiliate-partnere · {hubs.length} shops
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl">
            Vinforhandlere
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-stone-700">
            Vinbot sælger ikke vin selv. Vi hjælper dig med at finde flasker via søgning og guider —
            og linker videre til danske (og udvalgte internationale) forhandlere, når du er klar til at
            købe.
          </p>
          <p className="mt-3 text-stone-600 leading-relaxed">
            Mange links er affiliate: når du køber efter et klik fra Vinbot, kan vi modtage provision —
            typisk uden merpris for dig. Se også{" "}
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
        </header>

        <VinforhandlereDirectory hubs={hubs} />

        <p className="mt-12 text-sm text-stone-600">
          Er du selv forhandler?{" "}
          <Link href="/forhandlere" className="font-medium text-rose-900 hover:underline">
            Bliv listet hos Vinbot
          </Link>
          .
        </p>
      </PageShell>
    </div>
  );
}
