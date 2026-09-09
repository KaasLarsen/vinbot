import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import { getBlackFridayPhase } from "@/lib/black-friday/phase";

export const maxDuration = 60;

/**
 * Timevis cron: revaliderer kun feeds under Black Week (live-fase).
 */
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET?.trim();
  const onVercel = Boolean(process.env.VERCEL);

  if (onVercel && !secret) {
    return NextResponse.json({ error: "CRON_SECRET is not configured." }, { status: 503 });
  }
  if (secret) {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  if (getBlackFridayPhase() !== "live") {
    return new NextResponse(null, { status: 204 });
  }

  revalidateTag("vinbot-feeds", "max");
  return NextResponse.json({ revalidated: true, phase: "live" });
}
