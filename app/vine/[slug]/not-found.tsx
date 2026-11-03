import type { Metadata } from "next";

import { VineGonePage } from "@/components/vine-gone-page";
import { getWineBySlug } from "@/lib/vine/catalog";
import { FEATURED_WINE_SLUGS } from "@/lib/vine/featured-slugs";
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

/** Kun featured-slugs — undgå loadWineCatalog() på crawl-404'er. Ingen headers() (holder ISR). */
async function featuredSuggestions(): Promise<CanonicalWine[]> {
  const wines = await Promise.all(FEATURED_WINE_SLUGS.map((slug) => getWineBySlug(slug)));
  return wines.filter((w): w is CanonicalWine => w != null);
}

export default async function VineSlugNotFound() {
  const suggestions = await featuredSuggestions();
  return <VineGonePage suggestions={suggestions} />;
}
