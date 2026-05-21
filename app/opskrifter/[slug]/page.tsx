import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AffiliateDisclosure } from "@/components/affiliate-disclosure";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BreadcrumbJsonLd, RecipeJsonLd } from "@/components/json-ld";
import { PartnerAdsLeaderboard } from "@/components/partner-ads-leaderboard";
import { RecipeIngredients } from "@/components/recipe-ingredients";
import { RecipeRelatedGuides } from "@/components/recipe-related-guides";
import { RecipeSteps } from "@/components/recipe-steps";
import { RecipeWineBox } from "@/components/recipe-wine-box";
import {
  getAllRecipeSlugs,
  getRecipe,
  MIN_INDEXABLE_RECIPE_WORDS,
} from "@/lib/content/recipes";
import { recipePublicationAndModified } from "@/lib/recipe-dates";
import { difficultyLabel, formatIsoDuration } from "@/lib/recipe-format";
import { editorialTeamName, siteUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllRecipeSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getRecipe(slug);
  if (!data) return {};
  const canonical = `${siteUrl}/opskrifter/${slug}`;
  const tooThin = data.wordCount < MIN_INDEXABLE_RECIPE_WORDS;
  return {
    title: data.frontmatter.title,
    description: data.frontmatter.description,
    alternates: { canonical },
    openGraph: {
      url: canonical,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
    },
    ...(tooThin
      ? {
          robots: {
            index: false,
            follow: true,
            googleBot: { index: false, follow: true },
          },
        }
      : {}),
  };
}

function absoluteUrl(pathname: string): string {
  if (pathname === "/") return `${siteUrl}/`;
  return `${siteUrl}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}

export default async function RecipePage({ params }: Props) {
  const { slug } = await params;
  const data = await getRecipe(slug);
  if (!data) notFound();

  const { frontmatter, content, readingMinutes } = data;
  const url = `${siteUrl}/opskrifter/${slug}`;
  const { datePublished, dateModified } = recipePublicationAndModified(
    frontmatter,
    frontmatter.fallbackDate,
  );
  const showBothDates = datePublished !== dateModified;

  const crumbs = [
    { href: "/", label: "Forside" },
    { href: "/mad-og-vin", label: "Mad & vin" },
    { href: "/opskrifter", label: "Opskrifter" },
    { href: `/opskrifter/${slug}`, label: frontmatter.title },
  ];

  const breadcrumbLdItems = crumbs.map((c) => ({
    name: c.label,
    url: absoluteUrl(c.href),
  }));

  const prep = formatIsoDuration(frontmatter.prepTime);
  const cook = formatIsoDuration(frontmatter.cookTime);
  const diff = difficultyLabel(frontmatter.difficulty);
  const metaParts = [
    frontmatter.servings ? `${frontmatter.servings} portioner` : null,
    prep ? `forberedelse ${prep}` : null,
    cook ? `tilberedning ${cook}` : null,
    diff,
  ].filter(Boolean);

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <RecipeJsonLd
        name={frontmatter.title}
        description={frontmatter.description}
        url={url}
        datePublished={datePublished}
        dateModified={dateModified}
        prepTime={frontmatter.prepTime}
        cookTime={frontmatter.cookTime}
        recipeYield={frontmatter.servings ? `${frontmatter.servings} portioner` : undefined}
        recipeCategory="Hovedret"
        recipeIngredient={frontmatter.ingredients}
        recipeInstructions={frontmatter.instructions}
        keywords={frontmatter.tags}
      />
      <BreadcrumbJsonLd items={breadcrumbLdItems} />
      <Breadcrumbs items={crumbs} />

      <header className="mt-8 border-b border-stone-200 pb-8">
        <h1 className="text-4xl font-semibold tracking-tight text-stone-900">{frontmatter.title}</h1>
        <p className="mt-4 text-xl text-stone-600">{frontmatter.description}</p>
        <p className="mt-3 text-sm text-stone-600">
          Af{" "}
          <Link href="/om-os" className="font-medium text-rose-900 hover:underline">
            {editorialTeamName}
          </Link>
          {" "}·{" "}
          <Link href="/redaktionel-proces" className="text-rose-900 hover:underline">
            Sådan laver vi guides
          </Link>
        </p>
        {metaParts.length > 0 ? (
          <p className="mt-2 text-sm text-stone-500">{metaParts.join(" · ")}</p>
        ) : null}
        <p className="mt-2 text-sm text-stone-500">
          {showBothDates ? (
            <>
              Publiceret {datePublished} · Opdateret {dateModified} · ca. {readingMinutes} min læsetid
            </>
          ) : (
            <>
              Opdateret {dateModified} · ca. {readingMinutes} min læsetid
            </>
          )}
        </p>
      </header>

      <div className="mt-8">
        <RecipeWineBox wineInRecipe={frontmatter.wineInRecipe} wineToDrink={frontmatter.wineToDrink} />
      </div>

      <div className="mt-10 space-y-10">
        <RecipeIngredients items={frontmatter.ingredients} />
        <RecipeSteps steps={frontmatter.instructions} />
      </div>

      <div className="prose prose-stone mt-10 max-w-none">
        <AffiliateDisclosure compact />
        {content}
      </div>

      {frontmatter.relatedGuides?.length ? (
        <RecipeRelatedGuides slugs={frontmatter.relatedGuides} />
      ) : null}

      <PartnerAdsLeaderboard className="mt-12" hub="mad-og-vin" slug={slug} />
    </article>
  );
}
