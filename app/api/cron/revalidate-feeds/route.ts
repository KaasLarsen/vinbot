import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * Beskytter feed-cache revalidering.
 * - På Vercel: sæt CRON_SECRET — Vercel Cron sender `Authorization: Bearer <CRON_SECRET>`.
 * - Lokalt (uden VERCEL): tilladt uden secret så I kan køre `curl localhost:3000/...` under udvikling.
 */
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
  return NextResponse.json({ revalidated: true, tag: "vinbot-feeds" });
}
