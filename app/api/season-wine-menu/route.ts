import { NextRequest, NextResponse } from "next/server";
import { buildSeasonMenu } from "@/lib/season-menu/build";
import { getSeasonBudget, type SeasonBudgetId } from "@/lib/season-menu/roles";
import type { SeasonDish, SeasonEvent, SeasonRedStyle } from "@/lib/wine-quantity/season";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const EVENTS: SeasonEvent[] = ["juleaften", "julefrokost", "nytaar"];
const STYLES: SeasonRedStyle[] = ["classic", "kraftig"];
const DISHES: SeasonDish[] = ["and", "flaesk", "begge"];

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      event?: string;
      guests?: number;
      budgetId?: string;
      redStyle?: string;
      dish?: string;
    };
    const event = EVENTS.includes(body.event as SeasonEvent) ? (body.event as SeasonEvent) : null;
    const budgetId = getSeasonBudget(body.budgetId)?.id as SeasonBudgetId | undefined;
    const redStyle = STYLES.includes(body.redStyle as SeasonRedStyle)
      ? (body.redStyle as SeasonRedStyle)
      : "classic";
    const dish = DISHES.includes(body.dish as SeasonDish) ? (body.dish as SeasonDish) : "begge";
    const guests = Math.max(1, Math.min(80, Math.floor(Number(body.guests) || 0)));

    if (!event || !budgetId) {
      return NextResponse.json({ error: "Ugyldigt valg" }, { status: 400 });
    }

    const menu = await buildSeasonMenu({ event, guests, budgetId, redStyle, dish });
    return NextResponse.json(menu);
  } catch (e) {
    console.error("[season-wine-menu]", e);
    return NextResponse.json({ error: "Kunne ikke beregne menuen" }, { status: 500 });
  }
}
