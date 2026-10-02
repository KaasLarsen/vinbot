import { createSupabaseAnonClient } from "@/lib/supabase/anon";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createSupabaseServiceClient, hasSupabaseServiceRole } from "@/lib/supabase/service";
import { getWineBySlug } from "@/lib/vine/catalog";

import { minPaidPrice, qualifyingOffers } from "./match";
import { optInPriceAlertTopic, optOutPriceAlertTopic } from "./resend-topic";

function priceAlertDb() {
  if (!isSupabaseConfigured()) return null;
  if (hasSupabaseServiceRole()) return createSupabaseServiceClient();
  return createSupabaseAnonClient();
}

export type SubscribeResult =
  | { ok: true; already: boolean }
  | { ok: false; status: number; message: string };

export async function subscribeToPriceAlert(email: string, slug: string): Promise<SubscribeResult> {
  const supabase = priceAlertDb();
  if (!supabase) {
    return { ok: false, status: 503, message: "Tilmelding er ikke konfigureret. Prøv igen senere." };
  }

  const wine = await getWineBySlug(slug);
  if (!wine) {
    return { ok: false, status: 404, message: "Vinen kunne ikke findes." };
  }

  const seeds = qualifyingOffers(wine.offers, null, Date.now(), []).map((offer) => ({
    merchant: offer.merchant,
    price: offer.price,
    discount_percent: offer.discountPercent,
    affiliate_url: offer.url,
  }));

  const { data, error } = await supabase.rpc("subscribe_price_alert", {
    p_email: email,
    p_wine_id: wine.id,
    p_wine_slug: wine.slug,
    p_wine_title: wine.displayTitle,
    p_baseline: minPaidPrice(wine.offers),
    p_seeds: seeds,
  });

  if (error || !data || typeof data !== "object") {
    console.error("subscribe_price_alert:", error);
    return { ok: false, status: 502, message: "Kunne ikke tilmelde dig. Prøv igen senere." };
  }

  const result = data as { ok?: boolean; already?: boolean; error?: string };
  if (!result.ok) {
    if (result.error === "limit") {
      return {
        ok: false,
        status: 400,
        message: "Du kan følge op til 20 vine. Afmeld en vin fra en tidligere mail, hvis du vil tilføje en ny.",
      };
    }
    return { ok: false, status: 400, message: "Kunne ikke tilmelde dig. Tjek e-mailen og prøv igen." };
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (apiKey && !result.already) void optInPriceAlertTopic(apiKey, email);

  return { ok: true, already: Boolean(result.already) };
}

export type UnsubscribeAlert = {
  id: string;
  email: string;
  wineTitle: string;
  status: "active" | "unsubscribed";
};

export async function getPriceAlertById(alertId: string): Promise<UnsubscribeAlert | null> {
  const supabase = priceAlertDb();
  if (!supabase) return null;
  const { data, error } = await supabase.rpc("get_price_alert", { p_id: alertId });
  if (error) {
    console.error("get_price_alert:", error);
    return null;
  }
  const row = Array.isArray(data) ? data[0] : data;
  if (!row?.id) return null;
  const status = row.status === "unsubscribed" ? "unsubscribed" : "active";
  return {
    id: row.id as string,
    email: row.email as string,
    wineTitle: row.wine_title as string,
    status,
  };
}

export async function unsubscribePriceAlert(alertId: string): Promise<"ok" | "missing" | "error"> {
  const supabase = priceAlertDb();
  if (!supabase) return "error";
  const { data, error } = await supabase.rpc("unsubscribe_price_alert", { p_id: alertId });
  if (error || !data || typeof data !== "object") {
    console.error("unsubscribe_price_alert:", error);
    return "error";
  }
  const result = data as { ok?: boolean; missing?: boolean; email?: string; active_remaining?: number };
  if (result.missing) return "missing";
  if (!result.ok) return "error";

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (apiKey && result.email && result.active_remaining === 0) {
    void optOutPriceAlertTopic(apiKey, result.email);
  }
  return "ok";
}
