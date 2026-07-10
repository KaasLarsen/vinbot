import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BreadcrumbJsonLd, CollectionPageJsonLd } from "@/components/json-ld";
import { RecipeHubBrowser } from "@/components/recipe-hub-browser";
import { getAllRecipes } from "@/lib/content/recipes";
import { siteUrl } from "@/lib/site";

const PAGE_TITLE = "Opskrifter med vin — klassiske retter";
const PAGE_DESCRIPTION =
  "141+ opskrifter hvor vin er en del af retten: boeuf bourguignon, gullaschsuppe, helleflynder, caponata, cassoulet, chimichurri, caldeirada, æbletærte med calvados, svinekæber i rødvinssky, chorizo al vino, estofado, risotto al Barolo, torsk i hvidvin, sauerbraten, stegt flæsk og mere. Filtrér efter rød/hvidvin, køkken og tid.";
const PAGE_URL = `${siteUrl}/opskrifter`;

type PageProps = { searchParams?: Promise<{ q?: string }> };

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
};

export default async function OpskrifterHubPage({ searchParams }: PageProps) {
  const qParam = ((await searchParams)?.q ?? "").trim();
  const recipes = getAllRecipes();
  const cards = recipes.map((r) => ({
    slug: r.slug,
    title: r.title,
    description: r.description,
    updated: r.updated,
    tags: r.tags,
    prepTime: r.prepTime,
    cookTime: r.cookTime,
    servings: r.servings,
    difficulty: r.difficulty,
  }));

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
    <div className="mx-auto max-w-6xl px-4 py-10">
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
        Klassiske retter hvor <strong className="font-medium text-stone-800">vin er en del af opskriften</strong> — ikke
        kun i glasset. Filtrér efter vin-type, køkken og tid, eller søg direkte.
      </p>
      <p className="mt-3 text-sm text-stone-600">
        Leder du efter parring i stedet for opskriften? Se{" "}
        <Link href="/mad-og-vin" className="text-rose-900 hover:underline">
          mad &amp; vin
        </Link>
        ,{" "}
        <Link href="/guides/sadan-bruger-du-vin-til-sauce-og-simren" className="text-rose-900 hover:underline">
          madlavning med vin
        </Link>{" "}
        eller{" "}
        <Link href="/guides" className="text-rose-900 hover:underline">
          alle guides
        </Link>
        .
      </p>

      <div className="mt-10">
        <RecipeHubBrowser recipes={cards} initialQuery={qParam} />
      </div>
    </div>
  );
}
