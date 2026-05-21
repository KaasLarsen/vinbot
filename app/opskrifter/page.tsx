import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BreadcrumbJsonLd, CollectionPageJsonLd } from "@/components/json-ld";
import { filterIndexableRecipes, getAllRecipes } from "@/lib/content/recipes";
import { difficultyLabel, formatIsoDuration } from "@/lib/recipe-format";
import { siteUrl } from "@/lib/site";

const PAGE_TITLE = "Opskrifter med vin — klassiske retter";
const PAGE_DESCRIPTION =
  "Fulde opskrifter hvor vin er en del af retten: coq au vin, bourguignon, risotto og mere. Med vin i gryden og anbefalinger til glasset.";
const PAGE_URL = `${siteUrl}/opskrifter`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
};

export default function OpskrifterHubPage() {
  const recipes = filterIndexableRecipes(getAllRecipes());

  const collectionItems = recipes.map((r) => ({
    name: r.title,
    url: `${siteUrl}/opskrifter/${r.slug}`,
  }));

  const breadcrumbItems = [
    { name: "Forside", url: `${siteUrl}/` },
    { name: "Mad & vin", url: `${siteUrl}/mad-og-vin` },
    { name: "Opskrifter", url: PAGE_URL },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <CollectionPageJsonLd
        name={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        url={PAGE_URL}
        items={collectionItems}
      />
      <Breadcrumbs
        items={[
          { href: "/", label: "Forside" },
          { href: "/mad-og-vin", label: "Mad & vin" },
          { href: "/opskrifter", label: "Opskrifter" },
        ]}
      />
      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-stone-900">Opskrifter med vin</h1>
      <p className="mt-4 max-w-3xl text-lg text-stone-700">
        Her finder du klassiske retter hvor <strong className="font-medium text-stone-800">vin er en del af opskriften</strong> — ikke
        kun i glasset. Hver opskrift linker til vores parrings-guides og til{" "}
        <Link href="/guides/sadan-bruger-du-vin-til-sauce-og-simren" className="text-rose-900 hover:underline">
          madlavning med vin
        </Link>
        .
      </p>
      <p className="mt-3 text-sm text-stone-600">
        Leder du efter «hvad drikker jeg til retten?» i stedet for selve opskriften? Start på{" "}
        <Link href="/mad-og-vin" className="text-rose-900 hover:underline">
          mad &amp; vin
        </Link>{" "}
        eller{" "}
        <Link href="/guides" className="text-rose-900 hover:underline">
          alle guides
        </Link>
        .
      </p>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {recipes.map((r) => {
          const prep = formatIsoDuration(r.prepTime);
          const cook = formatIsoDuration(r.cookTime);
          const diff = difficultyLabel(r.difficulty);
          return (
            <li key={r.slug}>
              <Link
                href={`/opskrifter/${r.slug}`}
                className="block rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:border-rose-200 hover:shadow-md"
              >
                <h2 className="text-lg font-semibold text-stone-900">{r.title}</h2>
                <p className="mt-2 text-sm text-stone-600 line-clamp-2">{r.description}</p>
                <p className="mt-3 text-xs text-stone-500">
                  {[r.servings ? `${r.servings} pers.` : null, prep ? `forberedelse ${prep}` : null, cook ? `tilberedning ${cook}` : null, diff]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
