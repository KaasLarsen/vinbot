import { NextRequest, NextResponse } from "next/server";

import { parsePriceAlertSignupBody } from "@/lib/price-alerts/parse";
import { subscribeToPriceAlert } from "@/lib/price-alerts/subscribe";

export const dynamic = "force-dynamic";

const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 5;
const rateBuckets = new Map<string, { count: number; resetAt: number }>();

function clientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip")?.trim() ||
    "unknown"
  );
}

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const cur = rateBuckets.get(ip);
  if (!cur || now > cur.resetAt) {
    rateBuckets.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (cur.count >= RATE_MAX) return false;
  cur.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  if (!rateLimit(clientIp(req))) {
    return NextResponse.json({ error: "For mange forsøg. Prøv igen om et øjeblik." }, { status: 429 });
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: "Ugyldigt JSON." }, { status: 400 });
  }

  const parsed = parsePriceAlertSignupBody(raw);
  if (parsed.error || !parsed.data) {
    return NextResponse.json({ error: parsed.error?.message || "Ugyldig tilmelding." }, { status: 400 });
  }

  const result = await subscribeToPriceAlert(parsed.data.email, parsed.data.slug);
  if (!result.ok) {
    return NextResponse.json({ error: result.message }, { status: result.status });
  }

  return NextResponse.json({ ok: true, already: result.already });
}
