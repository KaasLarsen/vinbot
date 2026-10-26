import type { Metadata } from "next";
import { headers } from "next/headers";

import { VineGonePage } from "@/components/vine-gone-page";
import { getWineBySlug } from "@/lib/vine/catalog";
import { FEATURED_WINE_SLUGS } from "@/lib/vine/featured-slugs";
import { parseGoneWineSlug } from "@/lib/vine/gone-slug";
import type { CanonicalWine } from "@/lib/vine/types";

export const metadata: Metadata = {
  title: "Vin ikke længere i kataloget",
  description:
    "Denne vin findes ikke længere i Vinbots feed-baserede katalog. Sammenlign aktuelle vine og priser på vinbot.dk.",
  robots: {
    index: false,
    follow: true,
    googleBot: { index: false, follow: true },
  },
};

function slugFromPathname(pathname: string): string {
  const m = pathname.match(/^\/vine\/([^/]+)\/?$/);
  return m?.[1]?.trim() ?? "";
}

/** Kun featured-slugs — undgå loadWineCatalog() på crawl-404'er. */
async function featuredSuggestions(excludeSlug: string): Promise<CanonicalWine[]> {
  const wines = await Promise.all(FEATURED_WINE_SLUGS.map((slug) => getWineBySlug(slug)));
  return wines.filter((w): w is CanonicalWine => w != null && w.slug !== excludeSlug);
}

export default async function VineSlugNotFound() {
  const pathname = (await headers()).get("x-pathname") ?? "";
  const slug = slugFromPathname(pathname);
  const suggestions = await featuredSuggestions(slug);
  const hint = slug ? parseGoneWineSlug(slug) : null;

  return <VineGonePage slug={slug || "ukendt"} hintLabel={hint?.label ?? null} suggestions={suggestions} />;
}
