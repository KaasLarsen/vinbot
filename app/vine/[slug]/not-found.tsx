import type { Metadata } from "next";
import { headers } from "next/headers";

import { VineGonePage } from "@/components/vine-gone-page";
import { loadWineCatalog } from "@/lib/vine/catalog";
import { parseGoneWineSlug, suggestWinesForGoneSlug } from "@/lib/vine/gone-slug";

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

export default async function VineSlugNotFound() {
  const pathname = (await headers()).get("x-pathname") ?? "";
  const slug = slugFromPathname(pathname);
  const catalog = await loadWineCatalog();
  const suggestions = slug ? suggestWinesForGoneSlug(slug, catalog.wines) : [];
  const hint = slug ? parseGoneWineSlug(slug) : null;

  return <VineGonePage slug={slug || "ukendt"} hintLabel={hint?.label ?? null} suggestions={suggestions} />;
}
