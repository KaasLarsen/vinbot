import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import { siteUrl } from "@/lib/site";
import { warmWineCatalog } from "@/lib/vine/catalog";
import { FEATURED_WINE_SLUGS } from "@/lib/vine/featured-slugs";

/**
 * Beskytter feed-cache revalidering.
 * - På Vercel: sæt CRON_SECRET — Vercel Cron sender `Authorization: Bearer <CRON_SECRET>`.
 * - Lokalt (uden VERCEL): tilladt uden secret så I kan køre `curl localhost:3000/...` under udvikling.
 * - Opvarmer vin-katalog efter revalidate så cold-start ikke giver 5xx ved mass-crawl.
 * - Hitter forsides-udvalget `/vine/[slug]` så ISR er varm når brugere klikker fra hjem.
 */
export const maxDuration = 60;

async function warmFeaturedWinePages(): Promise<{ warmed: string[]; failed: string[] }> {
  const warmed: string[] = [];
  const failed: string[] = [];
  await Promise.all(
    FEATURED_WINE_SLUGS.map(async (slug) => {
      const url = `${siteUrl}/vine/${slug}`;
      try {
        const res = await fetch(url, {
          method: "GET",
          headers: { "user-agent": "VinbotCronWarm/1.0" },
          cache: "no-store",
        });
        if (res.ok) warmed.push(slug);
        else failed.push(slug);
      } catch {
        failed.push(slug);
      }
    }),
  );
  return { warmed, failed };
}

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET?.trim();
  const onVercel = Boolean(process.env.VERCEL);

  if (onVercel && !secret) {
    return NextResponse.json(
      { error: "CRON_SECRET is not configured. Add it in Vercel → Project → Environment Variables." },
      { status: 503 },
    );
  }

  if (secret) {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  revalidateTag("vinbot-feeds", "max");
  const catalog = await warmWineCatalog();
  const featured = await warmFeaturedWinePages();
  return NextResponse.json({
    revalidated: true,
    tag: "vinbot-feeds",
    catalogWines: catalog.wines.length,
    catalogGeneratedAt: catalog.generatedAt,
    featuredWarmed: featured.warmed,
    featuredFailed: featured.failed,
  });
}
