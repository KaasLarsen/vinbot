import { listCrossMerchantDeals } from "@/lib/deals/cross-merchant";
import { listFeedDeals } from "@/lib/deals/engine";
import { crossMerchantDealToCard, feedDealToCard, type TilbudCardItem } from "@/lib/deals/types";
import { runSearch } from "@/lib/search/engine";
import { pickDealForRole, productHitToCard } from "./match";
import { getSeasonBudget, rolesForMenu, type SeasonBudgetId } from "./roles";
import {
  calculateSeasonWineQuantity,
  seasonGuideHref,
  type SeasonDish,
  type SeasonEvent,
  type SeasonQuantityResult,
  type SeasonRedStyle,
} from "@/lib/wine-quantity/season";

export type SeasonMenuSlot = {
  roleId: string;
  label: string;
  courseLabel: string;
  bottles: number;
  guideHref: string;
  searchHref: string;
  deal: TilbudCardItem | null;
};

export type SeasonMenuResult = {
  quantity: SeasonQuantityResult;
  slots: SeasonMenuSlot[];
  guideHref: string;
};

export async function loadSeasonDealPool(): Promise<TilbudCardItem[]> {
  const [feedDealsRaw, crossDealsRaw] = await Promise.all([
    listFeedDeals({ limit: 140, minDiscount: 8 }),
    listCrossMerchantDeals({ limit: 80, minSavingsPercent: 10 }),
  ]);
  return [...feedDealsRaw.map(feedDealToCard), ...crossDealsRaw.map(crossMerchantDealToCard)];
}

async function searchFallback(
  roleQuery: string,
  budgetId: SeasonBudgetId,
  usedUrls: Set<string>,
): Promise<TilbudCardItem | null> {
  const budget = getSeasonBudget(budgetId);
  if (!budget) return null;
  const result = await runSearch(roleQuery, budget.max, budget.min);
  const hits = result.products || [];
  const card = hits.map(productHitToCard).find((d) => !usedUrls.has(d.url) && d.salePrice > 0);
  return card ?? null;
}

export async function buildSeasonMenu(input: {
  event: SeasonEvent;
  guests: number;
  budgetId: SeasonBudgetId;
  redStyle: SeasonRedStyle;
  dish?: SeasonDish;
  pool?: TilbudCardItem[];
}): Promise<SeasonMenuResult> {
  const quantity = calculateSeasonWineQuantity({ event: input.event, guests: input.guests });
  const roles = rolesForMenu({
    event: input.event,
    redStyle: input.redStyle,
    dish: input.dish,
    welcomeBubbles: quantity.breakdown.welcomeBubbles,
    white: quantity.breakdown.white,
    red: quantity.breakdown.red,
    dessert: quantity.breakdown.dessert,
  });

  const pool = input.pool ?? (await loadSeasonDealPool());
  const usedIds = new Set<string>();
  const usedMerchants = new Set<string>();
  const usedUrls = new Set<string>();
  const slots: SeasonMenuSlot[] = [];

  for (const role of roles) {
    let deal = pickDealForRole(pool, role, input.budgetId, usedIds, usedMerchants);
    if (!deal) {
      deal = await searchFallback(role.searchQuery, input.budgetId, usedUrls);
    }
    if (deal) {
      usedIds.add(deal.id);
      usedMerchants.add(deal.merchant);
      usedUrls.add(deal.url);
    }
    const budget = getSeasonBudget(input.budgetId);
    const params = new URLSearchParams({ q: role.searchQuery });
    if (budget?.max != null) params.set("max", String(budget.max));
    if (budget?.min != null) params.set("min", String(budget.min));
    slots.push({
      roleId: role.id,
      label: role.label,
      courseLabel: role.courseLabel,
      bottles: role.bottles,
      guideHref: role.guideHref,
      searchHref: `/?${params.toString()}#home-wine-search`,
      deal,
    });
  }

  return {
    quantity,
    slots,
    guideHref: seasonGuideHref(input.event),
  };
}
