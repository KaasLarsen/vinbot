import { NextRequest, NextResponse } from "next/server";

import { parseForceFlag } from "@/lib/cron/force-flag";

/** Standard cron-auth: CRON_SECRET påkrævet på Vercel. */
export function authorizeCron(req: NextRequest): NextResponse | null {
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

  return null;
}

export function wantsForceRevalidate(req: NextRequest): boolean {
  return parseForceFlag(req.nextUrl.searchParams.get("force"));
}

export { parseForceFlag } from "@/lib/cron/force-flag";
