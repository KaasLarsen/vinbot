import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BreadcrumbJsonLd, CollectionPageJsonLd } from "@/components/json-ld";
import { GuideTopicHubExtras } from "@/components/guide-topic-hub-extras";
import { HomeRecipesStripClient } from "@/components/home-recipes-strip-client";
import { PartnerAdsLeaderboard } from "@/components/partner-ads-leaderboard";
import { RecipeHubBrowser } from "@/components/recipe-hub-browser";
import { getAllRecipes, getRecipeBySlug } from "@/lib/content/recipes";
import { allHomeMomentRecipeSlugs } from "@/lib/home-moment";
import { parseRecipeHubSearchParams, RECIPE_HUB_CLASSICS } from "@/lib/recipe-browse";
import { siteUrl } from "@/lib/site";
import { PageShell } from "@/components/page-shell";

const PAGE_TITLE = "Opskrifter med vin — i gryden og til glasset";
const PAGE_DESCRIPTION =
  "Opskrifter med vin i retten eller vin til maden: coq au vin, pizza, burger, flæskesteg og mere. Filtrér efter køkken og tid — og køb flasken hos danske forhandlere.";
const PAGE_URL = `${siteUrl}/opskrifter`;

const FAQ = [
  {
    question: "Hvad betyder “vin i retten” vs. “vin til maden”?",
    answer:
      "Vin i retten er madlavning, hvor vinen er en ingrediens — sauce, simring eller deglasering, som i coq au vin. Vin til maden er en fuld opskrift, hvor vi anbefaler, hvad du hælder i glasset til retten, fx pizza eller burger.",
  },
  {
    question: "Kan jeg bruge hverdagsvin i gryden?",
    answer:
      "Ja. Vælg en tør vin, du også ville drikke: undgå “madlavningsvin” med salt, og skip de dyreste flasker. Til rødvinssauce og gryderetter virker en frugtig, ikke for fadpræget rød; til fisk og risotto en tør hvid med syre. Se også guiden om vin til sauce og simring.",
  },
  {
    question: "Hvilken vin til pizza, burger og flæskesteg?",
    answer:
      "Pizza og burger er “vin til maden”: sangiovese, chianti eller en saftig rød til pizza; til burger en merlot eller malbec. Flæskesteg med rødvin i brun sovs er vin i gryden — brug en medium rød i saucen, og server gerne samme stil til glasset.",
  },
];

type PageProps = {
  searchParams?: Promise<{
    q?: string;
    role?: string;
    wine?: string;
    cuisine?: string;
    time?: string;
    tag?: string;
  }>;
};

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
};

export default async function OpskrifterHubPage({ searchParams }: PageProps) {
  const sp = (await searchParams) ?? {};
  const initialFilters = parseRecipeHubSearchParams(sp);
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
    recipeRole: r.recipeRole,
  }));

  const featuredCatalog = allHomeMomentRecipeSlugs()
    .map((slug) => getRecipeBySlug(slug))
    .filter((r): r is NonNullable<typeof r> => r != null)
    .map((r) => ({
      slug: r.slug,
      title: r.title,
      recipeRole: r.recipeRole,
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

  const count = recipes.length;

  return (
    <PageShell className="py-10">
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
      <header className="mt-6 max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight text-stone-900">Opskrifter</h1>
        <p className="mt-4 text-lg text-stone-700">
          {count} opskrifter med vin i to spor:{" "}
          <strong className="font-medium text-stone-800">vin i retten</strong> (madlavning med vin i gryde, pande
          eller sauce) og <strong className="font-medium text-stone-800">vin til maden</strong> (fuld opskrift +
          anbefalet vin til glasset). Brug “hvad leder du efter”, filtrér efter køkken og tid — eller hop til en
          klassiker.
        </p>
        <p className="mt-3 text-sm text-stone-600">
          Leder du efter dybere parrings-guides i stedet for en fuld opskrift? Se{" "}
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
      </header>

      <div className="mt-10">
        <RecipeHubBrowser recipes={cards} initialFilters={initialFilters}>
          {featuredCatalog.length > 0 ? (
            <HomeRecipesStripClient
              catalog={featuredCatalog}
              heading="Udvalgt lige nu"
              intro="Sæson og hverdag — fire opskrifter at starte med, før du graver i hele listen."
              allHref="#alle-opskrifter"
              allLabel="Se alle nedenfor →"
              headingId="recipe-hub-featured-heading"
              className=""
            />
          ) : null}

          <section aria-labelledby="recipe-classics-heading">
            <h2 id="recipe-classics-heading" className="text-xl font-semibold tracking-tight text-stone-900">
              Klassikere
            </h2>
            <p className="mt-1 text-sm text-stone-600">De mest søgte retter med vin i gryden eller til glasset.</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {RECIPE_HUB_CLASSICS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-block rounded-full border border-stone-200 bg-white px-3.5 py-1.5 text-sm font-medium text-rose-900 shadow-sm hover:border-rose-300 hover:bg-rose-50"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </RecipeHubBrowser>
      </div>

      <GuideTopicHubExtras
        hub="opskrifter"
        slug="opskrifter-hub"
        products={[]}
        seoHeading="Opskrifter med vin: i gryden og til glasset"
        faq={FAQ}
      >
        <p>
          Forskellen på de to spor er enkel: i gryden er vinen en ingrediens, der giver syre, sødme og dybde til
          saucen. Til glasset matcher vi retten med en flaske, du kan købe hos danske forhandlere. Start med{" "}
          <Link href="/opskrifter?role=cooking" className="text-rose-900 hover:underline">
            vin i retten
          </Link>{" "}
          når du simrer, eller{" "}
          <Link href="/opskrifter?role=pairing" className="text-rose-900 hover:underline">
            vin til maden
          </Link>{" "}
          når opskriften er pizza, burger eller anden mad uden vin i dejen.
        </p>
        <p>
          Til sauce og simring: vælg en tør vin, du også vil drikke — ikke “madlavningsvin”. Teknik og mængder står i{" "}
          <Link href="/guides/sadan-bruger-du-vin-til-sauce-og-simren" className="text-rose-900 hover:underline">
            vin til sauce og simring
          </Link>
          . Klassikere at øve på:{" "}
          <Link href="/opskrifter/coq-au-vin" className="text-rose-900 hover:underline">
            coq au vin
          </Link>
          ,{" "}
          <Link href="/opskrifter/boeuf-bourguignon" className="text-rose-900 hover:underline">
            boeuf bourguignon
          </Link>{" "}
          og{" "}
          <Link href="/opskrifter/risotto-med-hvidvin" className="text-rose-900 hover:underline">
            risotto med hvidvin
          </Link>
          .
        </p>
        <p>
          Dansk hverdag og højtider har egne opskrifter:{" "}
          <Link href="/opskrifter/flaesketesteg-med-rodvin-i-brun-sovs" className="text-rose-900 hover:underline">
            flæskesteg med rødvin i brun sovs
          </Link>
          ,{" "}
          <Link href="/opskrifter/juleand" className="text-rose-900 hover:underline">
            juleand
          </Link>{" "}
          og{" "}
          <Link href="/opskrifter/frikadeller-i-hvidvinsauce" className="text-rose-900 hover:underline">
            frikadeller i hvidvinsauce
          </Link>
          . Parrings-guides uden fuld opskrift ligger under{" "}
          <Link href="/mad-og-vin" className="text-rose-900 hover:underline">
            mad og vin
          </Link>
          .
        </p>
        <p>
          Vinbot sælger ikke vin. Når du er klar til flasken, går du videre til forhandlerne via affiliate-links —
          samme pris for dig, og det er med til at holde opskrifterne gratis.
        </p>
      </GuideTopicHubExtras>

      <section className="mt-12 max-w-3xl" aria-labelledby="recipe-hub-faq-heading">
        <h2 id="recipe-hub-faq-heading" className="text-2xl font-semibold text-stone-900">
          Ofte stillede spørgsmål
        </h2>
        <dl className="mt-6 space-y-6">
          {FAQ.map((item) => (
            <div key={item.question}>
              <dt className="font-semibold text-stone-900">{item.question}</dt>
              <dd className="mt-2 text-stone-700">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      <PartnerAdsLeaderboard className="mt-12" hub="opskrifter" slug="opskrifter-hub" />
    </PageShell>
  );
}
