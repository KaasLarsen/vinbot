import type { Metadata } from "next";
import Link from "next/link";
import { GuideHubBrowser } from "@/components/guide-hub-browser";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PartnerAdsLeaderboard } from "@/components/partner-ads-leaderboard";
import { listGuides, listMadOgVinHubGuides } from "@/lib/content/guides";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mad og vin — guides og parring",
  description:
    "Guides til vin og mad: søg og filtrér efter ret, drue eller begreb. Julemad, nytår, tapas, ost, fisk, grill, pizza, burger, italiensk og spansk — plus vinbegreber og temperatur.",
  alternates: { canonical: `${siteUrl}/mad-og-vin` },
};

export default function MadOgVinHubPage() {
  const raw = listMadOgVinHubGuides();
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
      <Breadcrumbs items={[{ href: "/", label: "Forside" }, { href: "/mad-og-vin", label: "Mad & vin" }]} />
      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-stone-900">Mad og vin</h1>
      <p className="mt-4 max-w-3xl text-lg text-stone-700">
        Vinbot samler danske guides om parring, temperatur og praktiske valg.{" "}
        <strong className="font-medium text-stone-800">Søg nedenfor</strong> eller vælg kategori — så finder du hurtigere frem, når listen vokser.
        Brug også søgningen på forsiden til konkrete flasker med pris og billede.
      </p>
      <p className="mt-3 text-sm text-stone-600">
        Startklassikere:{" "}
        <Link href="/guides/komplet-guide-til-vin-og-mad" className="text-rose-900 hover:underline">
          den komplette mad-guide
        </Link>
        ,{" "}
        <Link href="/guides/vin-begreber-i-praksis" className="text-rose-900 hover:underline">
          vinbegreber
        </Link>
        ,{" "}
        <Link href="/guides/opbevaring-af-vin-temperatur-og-aabnet-flaske" className="text-rose-900 hover:underline">
          temperatur og opbevaring
        </Link>{" "}
        og{" "}
        <Link href="/guides/vin-til-grill-og-bbq" className="text-rose-900 hover:underline">
          vin til grill
        </Link>
        ,{" "}
        <Link href="/guides/koeb-vin-online-sadan-holder-du-styr-paa-det" className="text-rose-900 hover:underline">
          køb vin online
        </Link>{" "}
        og{" "}
        <Link href="/regioner" className="text-rose-900 hover:underline">
          vinregioner
        </Link>
        . Hele oversigten:{" "}
        <Link href="/guides" className="font-medium text-rose-900 hover:underline">
          alle guides
        </Link>
        .
      </p>

      <section className="mt-10 rounded-lg bg-rose-50 p-6">
        <h2 className="text-xl font-semibold text-stone-900">Forår og sommer — konkrete lejligheder</h2>
        <p className="mt-3 text-stone-700">
          Skal du planlægge en fest?{" "}
          <Link href="/guides/vin-til-konfirmation" className="text-rose-900 hover:underline">
            Vin til konfirmation
          </Link>
          ,{" "}
          <Link href="/guides/vin-til-mors-dag" className="text-rose-900 hover:underline">
            mors dag
          </Link>
          ,{" "}
          <Link href="/guides/vin-til-fars-dag" className="text-rose-900 hover:underline">
            fars dag
          </Link>
          ,{" "}
          <Link href="/guides/vin-til-sommerbryllup" className="text-rose-900 hover:underline">
            sommerbryllup
          </Link>{" "}
          og{" "}
          <Link href="/guides/vin-til-haveselskab" className="text-rose-900 hover:underline">
            haveselskab
          </Link>{" "}
          — plus{" "}
          <Link href="/guides/bedste-sommervin" className="text-rose-900 hover:underline">
            bedste sommervin
          </Link>
          .
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-amber-200 bg-amber-50/60 p-6">
        <h2 className="text-xl font-semibold text-stone-900">Ost-specialiseret: dyk ned i oste-parring</h2>
        <p className="mt-2 text-sm text-stone-700">
          Vi har lavet dybdeguider til de mest populære ostetyper — blåskimmel, hvidskimmel, hård ost, chèvre, feta, cheddar, mozzarella og parmesan.
        </p>
        <div className="mt-4 grid gap-x-6 gap-y-2 text-sm text-rose-900 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/guides/vin-til-ost-og-ostebord" className="hover:underline">Generel ost og ostebord</Link>
          <Link href="/guides/vin-til-blaaskimmelost" className="hover:underline">Blåskimmelost</Link>
          <Link href="/guides/vin-til-brie-og-camembert" className="hover:underline">Brie og camembert</Link>
          <Link href="/guides/vin-til-hard-ost" className="hover:underline">Hård ost (comté, gruyère)</Link>
          <Link href="/guides/vin-til-parmesan" className="hover:underline">Parmesan</Link>
          <Link href="/guides/vin-til-gedeost" className="hover:underline">Gedeost (chèvre)</Link>
          <Link href="/guides/vin-til-feta" className="hover:underline">Feta</Link>
          <Link href="/guides/vin-til-cheddar" className="hover:underline">Cheddar</Link>
          <Link href="/guides/vin-til-mozzarella-og-burrata" className="hover:underline">Mozzarella og burrata</Link>
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-rose-200 bg-rose-50/60 p-6">
        <h2 className="text-xl font-semibold text-stone-900">Nye guides: drue/stil × mad og anledning</h2>
        <p className="mt-2 text-sm text-stone-700">
          Start fra vinen i stedet for maden — klassiske match mellem specifikke druer/stilarter og retter/anledninger.
        </p>
        <div className="mt-4 grid gap-x-6 gap-y-2 text-sm text-rose-900 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/guides/rosevin-til-grill" className="hover:underline">Rosévin til grill</Link>
          <Link href="/guides/champagne-til-mad" className="hover:underline">Champagne til mad</Link>
          <Link href="/guides/bobler-til-brunch" className="hover:underline">Bobler til brunch</Link>
          <Link href="/guides/bobler-til-fredag" className="hover:underline">Bobler til fredag</Link>
          <Link href="/guides/rodvin-til-pizza" className="hover:underline">Rødvin til pizza</Link>
          <Link href="/guides/hvidvin-til-sushi" className="hover:underline">Hvidvin til sushi</Link>
          <Link href="/guides/pinot-noir-til-and" className="hover:underline">Pinot noir til and</Link>
          <Link href="/guides/chardonnay-til-fisk" className="hover:underline">Chardonnay til fisk</Link>
          <Link href="/guides/riesling-til-asiatisk-mad" className="hover:underline">Riesling til asiatisk mad</Link>
          <Link href="/guides/sauvignon-blanc-til-salat" className="hover:underline">Sauvignon blanc til salat</Link>
          <Link href="/guides/malbec-til-boef" className="hover:underline">Malbec til bøf</Link>
          <Link href="/guides/sangiovese-til-pasta" className="hover:underline">Sangiovese til pasta</Link>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-semibold text-stone-900">Find den rigtige guide</h2>
        <GuideHubBrowser guides={cards} showKindTabs showTagChips tagMinCount={2} />
      </section>

      <PartnerAdsLeaderboard className="mt-12" />
      <section className="mt-12 text-stone-700">
        <h2 className="text-2xl font-semibold text-stone-900">Relaterede emner</h2>
        <p className="mt-4">
          Leder du efter en konkret flaske?{" "}
          <Link href="/bedste-vine" className="text-rose-900 hover:underline">
            Bedste vine
          </Link>{" "}
          samler top-lister efter pris, lejlighed og stil —{" "}
          <Link href="/guides/bedste-rodvin" className="text-rose-900 hover:underline">
            bedste rødvin
          </Link>
          ,{" "}
          <Link href="/guides/bedste-hvidvin" className="text-rose-900 hover:underline">
            hvidvin
          </Link>{" "}
          og{" "}
          <Link href="/guides/bedste-bobler" className="text-rose-900 hover:underline">
            bobler
          </Link>{" "}
          er gode startpunkter.
        </p>
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
        <p className="mt-4">
          Praktiske spørgsmål om vin i hverdagen?{" "}
          <Link href="/vin-viden" className="text-rose-900 hover:underline">
            Vin-viden
          </Link>{" "}
          samler korte svar:{" "}
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
          </Link>{" "}
          og{" "}
          <Link href="/guides/sadan-serverer-du-vin" className="text-rose-900 hover:underline">
            sådan serverer du vin
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
