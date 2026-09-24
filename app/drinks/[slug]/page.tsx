import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BreadcrumbJsonLd, FaqJsonLd, RecipeJsonLd } from "@/components/json-ld";
import { PartnerAdsLeaderboard } from "@/components/partner-ads-leaderboard";
import { RecipeIngredients } from "@/components/recipe-ingredients";
import { RecipeRelatedGuides } from "@/components/recipe-related-guides";
import { RecipeSteps } from "@/components/recipe-steps";
import { DrinkWineBox } from "@/components/drink-wine-box";
import { DrinkShopSection } from "@/components/drink-shop-section";
import { DrinkHeroImage } from "@/components/drink-hero-image";
import { getAllDrinkSlugs, getDrink } from "@/lib/content/drinks";
import { drinkPublicationAndModified } from "@/lib/drink-dates";
import { difficultyLabel, formatIsoDuration } from "@/lib/recipe-format";
import { editorialTeamName, siteUrl } from "@/lib/site";
import {
  drinkCategoryForSchema,
  drinkTotalTimeIso,
  getDrinkImageAbsoluteUrl,
} from "@/lib/drink-images";
import { buildDrinkSerpDescription, buildDrinkSerpTitle } from "@/lib/seo/serp-meta";
import { PageShell } from "@/components/page-shell";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = true;

export async function generateStaticParams() {
  return getAllDrinkSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getDrink(slug);
  if (!data) return {};
  const canonical = `${siteUrl}/drinks/${slug}`;
  const imageUrl = getDrinkImageAbsoluteUrl(slug, siteUrl);
  const serpTitle = buildDrinkSerpTitle(data.frontmatter.title, slug);
  const serpDescription = buildDrinkSerpDescription(
    data.frontmatter.description,
    slug,
    data.frontmatter.title,
  );
  return {
    title: serpTitle,
    description: serpDescription,
    alternates: { canonical },
    openGraph: {
      url: canonical,
      type: "article",
      title: serpTitle,
      description: serpDescription,
      images: [{ url: imageUrl, width: 1200, height: 900, alt: data.frontmatter.title }],
    },
    twitter: {
      card: "summary_large_image",
      images: [imageUrl],
    },
  };
}

function absoluteUrl(pathname: string): string {
  if (pathname === "/") return `${siteUrl}/`;
  return `${siteUrl}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}

export default async function DrinkPage({ params }: Props) {
  const { slug } = await params;
  const data = await getDrink(slug);
  if (!data) notFound();

  const { frontmatter, content, readingMinutes } = data;
  const url = `${siteUrl}/drinks/${slug}`;
  const { datePublished, dateModified } = drinkPublicationAndModified(
    frontmatter,
    frontmatter.fallbackDate,
  );
  const showBothDates = datePublished !== dateModified;
  const imageUrl = getDrinkImageAbsoluteUrl(slug, siteUrl);
  const recipeCategory = drinkCategoryForSchema(frontmatter.tags);
  const totalTime = drinkTotalTimeIso(frontmatter.prepTime, frontmatter.cookTime);

  const crumbs = [
    { href: "/", label: "Forside" },
    { href: "/mad-og-vin", label: "Mad & vin" },
    { href: "/drinks", label: "Drinks" },
    { href: `/drinks/${slug}`, label: frontmatter.title },
  ];

  const breadcrumbLdItems = crumbs.map((c) => ({
    name: c.label,
    url: absoluteUrl(c.href),
  }));

  const prep = formatIsoDuration(frontmatter.prepTime);
  const cook = formatIsoDuration(frontmatter.cookTime);
  const diff = difficultyLabel(frontmatter.difficulty);
  const metaParts = [
    "Drink med vin",
    frontmatter.servings ? `${frontmatter.servings} glas` : null,
    prep ? `forberedelse ${prep}` : null,
    cook && cook !== "0 min" ? `tilberedning ${cook}` : null,
    diff,
  ].filter(Boolean);

  const faqItems = (frontmatter.faq ?? []).map((f) => ({
    question: f.question,
    answer: f.answer,
  }));

  return (
    <PageShell as="article" variant="article" className="py-10">
      <RecipeJsonLd
        name={frontmatter.title}
        description={frontmatter.description}
        url={url}
        datePublished={datePublished}
        dateModified={dateModified}
        image={imageUrl}
        prepTime={frontmatter.prepTime}
        cookTime={frontmatter.cookTime}
        totalTime={totalTime}
        recipeYield={frontmatter.servings ? `${frontmatter.servings} glas` : undefined}
        recipeCategory={recipeCategory}
        recipeIngredient={frontmatter.ingredients}
        recipeInstructions={frontmatter.instructions}
        keywords={frontmatter.tags}
      />
      <BreadcrumbJsonLd items={breadcrumbLdItems} />
      {faqItems.length > 0 ? <FaqJsonLd items={faqItems} /> : null}
      <Breadcrumbs items={crumbs} />

      <header className="mt-8 border-b border-stone-200 pb-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">Drink med vin</p>
        <h1 className="mt-2 text-balance text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
          {frontmatter.title}
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-stone-600">{frontmatter.description}</p>
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

      <DrinkHeroImage slug={slug} title={frontmatter.title} />

      <div className="mt-8">
        <DrinkWineBox wineInRecipe={frontmatter.wineInRecipe} wineToDrink={frontmatter.wineToDrink} />
        <DrinkShopSection
          drinkSlug={slug}
          tags={frontmatter.tags}
          relatedGuides={frontmatter.relatedGuides}
          wineToDrink={frontmatter.wineToDrink}
          maxItems={3}
        />
      </div>

      <div className="mt-10 space-y-10">
        <RecipeIngredients items={frontmatter.ingredients} />
        <RecipeSteps steps={frontmatter.instructions} />
      </div>

      <div className="prose prose-stone mt-10 max-w-none">{content}</div>

      {frontmatter.relatedGuides?.length ? (
        <RecipeRelatedGuides slugs={frontmatter.relatedGuides} />
      ) : null}

      <PartnerAdsLeaderboard className="mt-12" hub="mad-og-vin" slug={slug} />
    </PageShell>
  );
}
