import type { Metadata } from "next";
import Link from "next/link";
import { listGuides } from "@/lib/content/guides";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mad og vin — guides og parring",
  description:
    "Guides om parring af rødvin og hvidvin til julemad, ost, kød, fisk og meget mere — skrevet til danske borde og lejligheder.",
  alternates: { canonical: `${siteUrl}/mad-og-vin` },
};

export default function MadOgVinHubPage() {
  const guides = listGuides().filter((g) => g.hub === "mad-og-vin" || (g.tags || []).some((t) => t.toLowerCase().includes("mad")));

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumbs items={[{ href: "/", label: "Forside" }, { href: "/mad-og-vin", label: "Mad & vin" }]} />
      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-stone-900">Mad og vin</h1>
      <p className="mt-4 text-lg text-stone-700">
        Vinbot samler danske guides om parring, temperatur og praktiske valg. Brug søgningen på forsiden til at gå fra idé til forslag — og læs videre her for at forstå, hvorfor visse vine fungerer til netop din ret.
      </p>
      <section className="mt-10 space-y-6">
        <h2 className="text-2xl font-semibold text-stone-900">Udvalgte guides</h2>
        <ul className="space-y-4">
          {(guides.length ? guides : listGuides().slice(0, 4)).map((g) => (
            <li key={g.slug} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
              <Link href={`/guides/${g.slug}`} className="text-lg font-semibold text-rose-900 hover:underline">
                {g.title}
              </Link>
              <p className="mt-2 text-stone-600">{g.description}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-12 text-stone-700">
        <h2 className="text-2xl font-semibold text-stone-900">Relaterede emner</h2>
        <p className="mt-4">
          Gå til{" "}
          <Link href="/humoer-og-vin" className="text-rose-900 hover:underline">
            humør og stemning
          </Link>{" "}
          når menuen er på plads, men du vil finjustere atmosfæren. Se{" "}
          <Link href="/saeson" className="text-rose-900 hover:underline">
            sæson
          </Link>{" "}
          for årstidens vine og{" "}
          <Link href="/den-sidste-flaske" className="text-rose-900 hover:underline">
            Den Sidste Flaske
          </Link>{" "}
          for ekstra inspiration og gode købsidéer.
        </p>
      </section>
    </div>
  );
}
