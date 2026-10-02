import { NextRequest, NextResponse } from "next/server";
import { hasOpenAi, openAiChatJson } from "@/lib/openai/client";
import { runSearch } from "@/lib/search/engine";
import type { ProductHit } from "@/lib/search/types";
import { tasteSimilarity } from "@/lib/taste/vector";
import type { TasteVector } from "@/lib/taste/types";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

const MAX_MESSAGE_LEN = 600;
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 8;

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

type TasteCtx = {
  styles?: TasteVector["styles"];
  tokens?: string[];
  body?: number;
  oak?: number;
};

function vectorFromCtx(ctx: TasteCtx | null | undefined): TasteVector | null {
  if (!ctx) return null;
  const tokens: Record<string, number> = {};
  for (const t of ctx.tokens ?? []) {
    if (t) tokens[t] = 1;
  }
  return {
    styles: ctx.styles ?? {},
    tokens,
    body: typeof ctx.body === "number" ? ctx.body : 0,
    oak: typeof ctx.oak === "number" ? ctx.oak : 0,
  };
}

const SYSTEM = `Du er Vinbots danske vinsommelier. Brugeren beskriver mad/ingredienser («hvad har jeg i køleskabet»).
Svar KUN med JSON:
{"reply":"kort dansk forklaring (2-4 sætninger)","searchQueries":["søgestreng1","søgestreng2"],"budgetMax":null}
- searchQueries: 1–3 korte danske søgestrenge der finder vin i en webshop (fx "vin til gedeost kylling", "barbera", "tør hvidvin under 120").
- budgetMax: antal kroner eller null.
- Undgå alkoholpromille/rådgivning om beruselse. Foreslå vin til mad.
- Hvis smagsprofil er givet, skævvred stil (fx tung rød vs let hvid) derefter.`;

export async function POST(req: NextRequest) {
  if (!hasOpenAi()) {
    return NextResponse.json(
      {
        ok: false,
        error: "AI-chat er ikke konfigureret endnu. Brug mad-vælgeren eller søgefeltet i stedet.",
        code: "no_ai",
      },
      { status: 503 },
    );
  }

  const ip = clientIp(req);
  if (!rateLimit(ip)) {
    return NextResponse.json(
      { ok: false, error: "For mange forespørgsler. Vent et øjeblik.", code: "rate_limit" },
      { status: 429 },
    );
  }

  try {
    const body = (await req.json()) as {
      message?: string;
      taste?: TasteCtx | null;
    };
    const message = typeof body.message === "string" ? body.message.trim() : "";
    if (!message || message.length < 3) {
      return NextResponse.json(
        { ok: false, error: "Skriv gerne hvad du har i køleskabet.", code: "bad_request" },
        { status: 400 },
      );
    }
    if (message.length > MAX_MESSAGE_LEN) {
      return NextResponse.json(
        { ok: false, error: "Beskeden er for lang.", code: "too_long" },
        { status: 400 },
      );
    }

    const taste = body.taste ?? null;
    const tasteNote = taste
      ? `Smagsprofil: styles=${JSON.stringify(taste.styles ?? {})}, tokens=${(taste.tokens ?? []).join(", ")}, body=${taste.body ?? 0}, oak=${taste.oak ?? 0}`
      : "Ingen smagsprofil.";

    const parsed = await openAiChatJson({
      system: SYSTEM,
      user: `${tasteNote}\n\nBruger: ${message}`,
      maxTokens: 400,
      temperature: 0.5,
    });

    if (!parsed) {
      return NextResponse.json(
        { ok: false, error: "AI svarede ikke. Prøv igen om lidt.", code: "ai_failed" },
        { status: 502 },
      );
    }

    const reply = String(parsed.reply ?? "").trim() || "Her er vine, der kan passe til det, du har.";
    const queriesRaw = Array.isArray(parsed.searchQueries) ? parsed.searchQueries : [];
    const queries = queriesRaw
      .map((q) => String(q ?? "").trim())
      .filter(Boolean)
      .slice(0, 3);
    const budgetMax =
      typeof parsed.budgetMax === "number" && Number.isFinite(parsed.budgetMax)
        ? parsed.budgetMax
        : null;

    if (!queries.length) {
      queries.push(message.slice(0, 80));
    }

    const vector = vectorFromCtx(taste);
    const seen = new Set<string>();
    const products: ProductHit[] = [];

    for (const q of queries) {
      const result = await runSearch(q, budgetMax, null);
      for (const p of result.products) {
        const key = p.url || `${p.merchant}:${p.title}`;
        if (seen.has(key)) continue;
        seen.add(key);
        products.push(p);
      }
    }

    products.sort((a, b) => {
      const blobA = `${a.title} ${a.brand} ${a.desc}`;
      const blobB = `${b.title} ${b.brand} ${b.desc}`;
      const sa = tasteSimilarity(blobA, vector) * 30 + (a.discountPercent ?? 0);
      const sb = tasteSimilarity(blobB, vector) * 30 + (b.discountPercent ?? 0);
      return sb - sa;
    });

    return NextResponse.json({
      ok: true,
      reply,
      queries,
      products: products.slice(0, 4),
    });
  } catch (e) {
    console.error("[wine-chat]", e);
    return NextResponse.json(
      { ok: false, error: "Noget gik galt. Prøv igen.", code: "server" },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({ available: hasOpenAi() });
}
