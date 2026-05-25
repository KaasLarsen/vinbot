import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import { warmWineCatalog } from "@/lib/vine/catalog";

/**
 * Beskytter feed-cache revalidering.
 * - På Vercel: sæt CRON_SECRET — Vercel Cron sender `Authorization: Bearer <CRON_SECRET>`.
 * - Lokalt (uden VERCEL): tilladt uden secret så I kan køre `curl localhost:3000/...` under udvikling.
 * - Opvarmer vin-katalog efter revalidate så cold-start ikke giver 5xx ved mass-crawl.
 */
export const maxDuration = 60;

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
  return NextResponse.json({
    revalidated: true,
    tag: "vinbot-feeds",
    catalogWines: catalog.wines.length,
    catalogGeneratedAt: catalog.generatedAt,
  });
}
