import { NextRequest, NextResponse } from "next/server";
import { hasOpenAi, openAiChatJson, openAiKeyMeta, probeOpenAi } from "@/lib/openai/client";
import { runSearch } from "@/lib/search/engine";
import type { ProductHit } from "@/lib/search/types";
import { tasteSimilarity } from "@/lib/taste/vector";
import type { TasteVector } from "@/lib/taste/types";
import { heuristicWineChatPlan } from "@/lib/wine-chat/fallback";

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

async function collectProducts(
  queries: string[],
  budgetMax: number | null,
  vector: TasteVector | null,
): Promise<ProductHit[]> {
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

  return products.slice(0, 4);
}

export async function POST(req: NextRequest) {
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
    const vector = vectorFromCtx(taste);
    let reply: string;
    let queries: string[];
    let budgetMax: number | null;
    let source: "openai" | "fallback" = "fallback";
    let aiError: { status: number | null; code: string; message: string } | null = null;

    if (hasOpenAi()) {
      const tasteNote = taste
        ? `Smagsprofil: styles=${JSON.stringify(taste.styles ?? {})}, tokens=${(taste.tokens ?? []).join(", ")}, body=${taste.body ?? 0}, oak=${taste.oak ?? 0}`
        : "Ingen smagsprofil.";

      const ai = await openAiChatJson({
        system: SYSTEM,
        user: `${tasteNote}\n\nBruger: ${message}`,
        maxTokens: 400,
        temperature: 0.5,
      });

      if (ai.ok) {
        source = "openai";
        reply = String(ai.data.reply ?? "").trim() || "Her er vine, der kan passe til det, du har.";
        const queriesRaw = Array.isArray(ai.data.searchQueries) ? ai.data.searchQueries : [];
        queries = queriesRaw
          .map((q) => String(q ?? "").trim())
          .filter(Boolean)
          .slice(0, 3);
        budgetMax =
          typeof ai.data.budgetMax === "number" && Number.isFinite(ai.data.budgetMax)
            ? ai.data.budgetMax
            : null;
        if (!queries.length) {
          queries.push(message.slice(0, 80));
        }
      } else {
        aiError = ai.error;
        console.error("[wine-chat] openai failed, using fallback", ai.error);
        const plan = heuristicWineChatPlan(message);
        reply = plan.reply;
        queries = plan.searchQueries;
        budgetMax = plan.budgetMax;
      }
    } else {
      const plan = heuristicWineChatPlan(message);
      reply = plan.reply;
      queries = plan.searchQueries;
      budgetMax = plan.budgetMax;
    }

    const products = await collectProducts(queries, budgetMax, vector);

    return NextResponse.json({
      ok: true,
      reply,
      queries,
      products,
      source,
      ...(aiError
        ? {
            aiWarning: {
              code: aiError.code,
              message: aiError.message,
              status: aiError.status,
            },
          }
        : {}),
    });
  } catch (e) {
    console.error("[wine-chat]", e);
    return NextResponse.json(
      { ok: false, error: "Noget gik galt. Prøv igen.", code: "server" },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  // Chat er altid tilgængelig (OpenAI hvis sat, ellers katalog-fallback).
  const probe = req.nextUrl.searchParams.get("probe") === "1";
  const meta = openAiKeyMeta();
  if (!probe) {
    return NextResponse.json({ available: true, openai: hasOpenAi(), key: meta });
  }

  const result = await probeOpenAi();
  return NextResponse.json({
    available: true,
    openai: hasOpenAi(),
    key: meta,
    probe: result.ok
      ? { ok: true }
      : { ok: false, code: result.error.code, message: result.error.message, status: result.error.status },
  });
}
