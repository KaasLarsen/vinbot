import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Om Vinbot",
  description: "Vinbot er dansk vin-inspiration: dybdegående guides, vinsøgning på tværs af forhandlere og tydelig vej videre, når du vil handle.",
  alternates: { canonical: `${siteUrl}/om-os` },
};

export default function OmOsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumbs items={[{ href: "/", label: "Forside" }, { href: "/om-os", label: "Om os" }]} />
      <h1 className="mt-6 text-3xl font-semibold text-stone-900">Om Vinbot</h1>
      <p className="mt-4 text-lg text-stone-700">
        Vinbot er bygget til at være det naturlige sted at starte, når du skal finde vin til mad, humør og årstid. Vi kombinerer grundige guides med en vinsøgning, der samler forslag fra mange danske netbutikker — så du hurtigt kan sammenligne og vælge med ro i maven.
      </p>
      <p className="mt-4 text-stone-700">
        Indtægter kommer fra annoncer (Google AdSense) og affiliate-provision. Det påvirker ikke din pris hos forhandlerne. Vi markerer kommercielt indhold tydeligt — se{" "}
        <Link href="/privatliv" className="text-rose-900 hover:underline">
          privatliv
        </Link>{" "}
        og{" "}
        <Link href="/betingelser" className="text-rose-900 hover:underline">
          betingelser
        </Link>
        .
      </p>
    </div>
  );
}
