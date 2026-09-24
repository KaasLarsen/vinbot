import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BreadcrumbJsonLd, CollectionPageJsonLd } from "@/components/json-ld";
import { GuideTopicHubExtras } from "@/components/guide-topic-hub-extras";
import { HomeDrinksStripClient } from "@/components/home-drinks-strip-client";
import { PartnerAdsLeaderboard } from "@/components/partner-ads-leaderboard";
import { DrinkHubBrowser } from "@/components/drink-hub-browser";
import { getAllDrinks, getDrinkBySlug } from "@/lib/content/drinks";
import { DRINK_HUB_CLASSICS, parseDrinkHubSearchParams } from "@/lib/drink-browse";
import { allHomeMomentDrinkSlugs } from "@/lib/home-moment";
import { siteUrl } from "@/lib/site";
import { PageShell } from "@/components/page-shell";

const PAGE_TITLE = "Drinks med vin — cocktails, spritz og bowle";
const PAGE_DESCRIPTION =
  "Drink-opskrifter hvor vin er hovedrollen: Aperol Spritz, Hugo, Port & Tonic, French 75, sangria og mere. Find flasken hos danske forhandlere.";
const PAGE_URL = `${siteUrl}/drinks`;

const FAQ = [
  {
    question: "Hvilken vin skal jeg bruge i cocktails?",
    answer:
      "Brug en vin, du også vil drikke alene — ikke den billigste egnsvin. Til spritz: tør prosecco eller cava. Til sangria: ung, frugtig rød. Til Port & Tonic: tør white port. Dyre flasker er spild, når de fortyndes.",
  },
  {
    question: "Hvad er forskellen på spritz og en klassisk cocktail?",
    answer:
      "Spritz er bobler + bitter/likør + sodavand — let, lang og lav-alkohol pr. glas. Klassiske cocktails som French 75 eller New York Sour er mere koncentrerede og ofte spiritus-baserede med vin som lag eller top.",
  },
  {
    question: "Kan jeg lave drinks uden bartender-udstyr?",
    answer:
      "Ja. De fleste vin-drinks kræver kun glas, is, målebæger (eller et shotglas) og en ske. Frosé kræver blender; New York Sour kræver shaker eller lukket jar.",
  },
];

type PageProps = {
  searchParams?: Promise<{
    q?: string;
    wine?: string;
    style?: string;
  }>;
};

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
};

export default async function DrinksHubPage({ searchParams }: PageProps) {
  const sp = (await searchParams) ?? {};
  const initialFilters = parseDrinkHubSearchParams(sp);
  const drinks = getAllDrinks();
  const cards = drinks.map((d) => ({
    slug: d.slug,
    title: d.title,
    description: d.description,
    updated: d.updated,
    tags: d.tags,
    prepTime: d.prepTime,
    cookTime: d.cookTime,
    servings: d.servings,
    difficulty: d.difficulty,
  }));

  const featuredCatalog = allHomeMomentDrinkSlugs()
    .map((slug) => getDrinkBySlug(slug))
    .filter((d): d is NonNullable<typeof d> => d != null)
    .map((d) => ({
      slug: d.slug,
      title: d.title,
      tags: d.tags,
    }));

  const collectionItems = drinks.map((d) => ({
    name: d.title,
    url: `${siteUrl}/drinks/${d.slug}`,
  }));

  const breadcrumbItems = [
    { name: "Forside", url: `${siteUrl}/` },
    { name: "Mad & vin", url: `${siteUrl}/mad-og-vin` },
    { name: "Drinks", url: PAGE_URL },
  ];

  const count = drinks.length;

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
          { href: "/drinks", label: "Drinks" },
        ]}
      />
      <header className="mt-6 max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight text-stone-900">Drinks med vin</h1>
        <p className="mt-4 text-lg text-stone-700">
          {count} drink-opskrifter — spritz, cocktails og bowle, hvor{" "}
          <strong className="font-medium text-stone-800">vinen er hovedrollen</strong>.
        </p>
        <p className="mt-3 text-sm text-stone-600">
          Baggrund og teknik? Se{" "}
          <Link href="/guides/vin-i-cocktails-spritz-og-drikke" className="text-rose-900 hover:underline">
            vin i cocktails
          </Link>
          {" "}eller{" "}
          <Link href="/opskrifter" className="text-rose-900 hover:underline">
            mad-opskrifter med vin
          </Link>
          .
        </p>
      </header>

      <div className="mt-10">
        <DrinkHubBrowser drinks={cards} initialFilters={initialFilters}>
          {featuredCatalog.length > 0 ? (
            <HomeDrinksStripClient
              catalog={featuredCatalog}
              heading="Udvalgt lige nu"
              intro="Sæson og anledninger — fire drinks at starte med, før du graver i hele listen."
              allHref="#alle-drinks"
              allLabel="Se alle nedenfor →"
              headingId="drink-hub-featured-heading"
              className=""
            />
          ) : null}

          <section aria-labelledby="drink-classics-heading">
            <h2 id="drink-classics-heading" className="text-xl font-semibold tracking-tight text-stone-900">
              Must-haves
            </h2>
            <p className="mt-1 text-sm text-stone-600">De mest søgte drinks med vin — start her.</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {DRINK_HUB_CLASSICS.map((item) => (
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
        </DrinkHubBrowser>
      </div>

      <GuideTopicHubExtras
        hub="mad-og-vin"
        slug="drinks-hub"
        products={[]}
        seoHeading="Drinks med vin: spritz, cocktails og bowle"
        faq={FAQ}
      >
        <p>
          Vinbot’s drinks-hub samler opskrifter, hvor flasken er en ingrediens — ikke bare tilbehør. Start med{" "}
          <Link href="/drinks/aperol-spritz" className="text-rose-900 hover:underline">
            Aperol Spritz
          </Link>
          ,{" "}
          <Link href="/drinks/hugo-spritz" className="text-rose-900 hover:underline">
            Hugo
          </Link>{" "}
          eller{" "}
          <Link href="/drinks/portvin-tonic" className="text-rose-900 hover:underline">
            Port &amp; Tonic
          </Link>
          , når du vil have noget nemt. Til fest:{" "}
          <Link href="/drinks/sangria-med-rodvin" className="text-rose-900 hover:underline">
            sangria
          </Link>{" "}
          og{" "}
          <Link href="/drinks/frose" className="text-rose-900 hover:underline">
            frosé
          </Link>
          .
        </p>
        <p>
          Teknik, bobler og mixer-tips står i{" "}
          <Link href="/guides/vin-i-cocktails-spritz-og-drikke" className="text-rose-900 hover:underline">
            vin i cocktails, spritz og drikke
          </Link>
          . Mad med vin i gryden ligger under{" "}
          <Link href="/opskrifter" className="text-rose-900 hover:underline">
            opskrifter
          </Link>
          .
        </p>
        <p>
          Vinbot sælger ikke vin. Når du er klar til flasken, går du videre til forhandlerne via affiliate-links —
          samme pris for dig, og det er med til at holde opskrifterne gratis.
        </p>
      </GuideTopicHubExtras>

      <section className="mt-12 max-w-3xl" aria-labelledby="drink-hub-faq-heading">
        <h2 id="drink-hub-faq-heading" className="text-2xl font-semibold text-stone-900">
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

      <PartnerAdsLeaderboard className="mt-12" hub="mad-og-vin" slug="drinks-hub" />
    </PageShell>
  );
}
