import { createSupabaseServiceClient, hasSupabaseServiceRole } from "@/lib/supabase/service";
import { getWineBySlug } from "@/lib/vine/catalog";

import { PRICE_ALERT_MAX_PER_EMAIL, minPaidPrice, qualifyingOffers } from "./match";
import { optInPriceAlertTopic, optOutPriceAlertTopic } from "./resend-topic";

export type SubscribeResult =
  | { ok: true; already: boolean }
  | { ok: false; status: number; message: string };

type AlertStatusRow = { id: string; status: string };

export async function subscribeToPriceAlert(email: string, slug: string): Promise<SubscribeResult> {
  if (!hasSupabaseServiceRole()) {
    return { ok: false, status: 503, message: "Tilmelding er ikke konfigureret. Prøv igen senere." };
  }

  const wine = await getWineBySlug(slug);
  if (!wine) {
    return { ok: false, status: 404, message: "Vinen kunne ikke findes." };
  }

  const supabase = createSupabaseServiceClient();
  const nowIso = new Date().toISOString();
  const baseline = minPaidPrice(wine.offers);

  const { data: existing, error: existingError } = await supabase
    .from("price_alerts")
    .select("id, status")
    .eq("email", email)
    .eq("wine_id", wine.id)
    .maybeSingle();

  if (existingError) {
    console.error("price_alerts lookup:", existingError);
    return { ok: false, status: 502, message: "Kunne ikke tilmelde dig. Prøv igen senere." };
  }

  const row = existing as AlertStatusRow | null;
  if (row?.status === "active") {
    return { ok: true, already: true };
  }

  const { count, error: countError } = await supabase
    .from("price_alerts")
    .select("id", { count: "exact", head: true })
    .eq("email", email)
    .eq("status", "active");

  if (countError) {
    console.error("price_alerts count:", countError);
    return { ok: false, status: 502, message: "Kunne ikke tilmelde dig. Prøv igen senere." };
  }

  if ((count ?? 0) >= PRICE_ALERT_MAX_PER_EMAIL) {
    return {
      ok: false,
      status: 400,
      message: "Du kan følge op til 20 vine. Afmeld en vin fra en tidligere mail, hvis du vil tilføje en ny.",
    };
  }

  const payload = {
    email,
    wine_id: wine.id,
    wine_slug: wine.slug,
    wine_title: wine.displayTitle,
    baseline_min_paid_price: baseline,
    consent_at: nowIso,
    status: "active" as const,
    unsubscribed_at: null,
    updated_at: nowIso,
  };

  let alertId = row?.id;

  if (row) {
    const { error } = await supabase.from("price_alerts").update(payload).eq("id", row.id);
    if (error) {
      console.error("price_alerts update:", error);
      return { ok: false, status: 502, message: "Kunne ikke tilmelde dig. Prøv igen senere." };
    }
  } else {
    const { data, error } = await supabase.from("price_alerts").insert(payload).select("id").single();
    if (error?.code === "23505") {
      return { ok: true, already: true };
    }
    if (error || !data?.id) {
      console.error("price_alerts insert:", error);
      return { ok: false, status: 502, message: "Kunne ikke tilmelde dig. Prøv igen senere." };
    }
    alertId = data.id as string;
  }

  if (alertId) {
    const seeds = qualifyingOffers(wine.offers, null, Date.now(), []);
    if (seeds.length > 0) {
      const { error: seedError } = await supabase.from("price_alert_sends").insert(
        seeds.map((offer) => ({
          alert_id: alertId,
          merchant: offer.merchant,
          price: offer.price,
          discount_percent: offer.discountPercent,
          affiliate_url: offer.url,
          kind: "seed",
        })),
      );
      if (seedError) console.error("price_alert seed:", seedError);
    }
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (apiKey) void optInPriceAlertTopic(apiKey, email);

  return { ok: true, already: false };
}

export type UnsubscribeAlert = {
  id: string;
  email: string;
  wineTitle: string;
  status: "active" | "unsubscribed";
};

export async function getPriceAlertById(alertId: string): Promise<UnsubscribeAlert | null> {
  if (!hasSupabaseServiceRole()) return null;
  const supabase = createSupabaseServiceClient();
  const { data, error } = await supabase
    .from("price_alerts")
    .select("id, email, wine_title, status")
    .eq("id", alertId)
    .maybeSingle();
  if (error || !data) {
    if (error) console.error("price_alerts get:", error);
    return null;
  }
  const status = data.status === "unsubscribed" ? "unsubscribed" : "active";
  return {
    id: data.id as string,
    email: data.email as string,
    wineTitle: data.wine_title as string,
    status,
  };
}

export async function unsubscribePriceAlert(alertId: string): Promise<"ok" | "missing" | "error"> {
  if (!hasSupabaseServiceRole()) return "error";
  const supabase = createSupabaseServiceClient();
  const nowIso = new Date().toISOString();
  const { data, error } = await supabase
    .from("price_alerts")
    .update({ status: "unsubscribed", unsubscribed_at: nowIso, updated_at: nowIso })
    .eq("id", alertId)
    .eq("status", "active")
    .select("email")
    .maybeSingle();

  if (error) {
    console.error("price_alerts unsubscribe:", error);
    return "error";
  }
  if (!data?.email) {
    const existing = await getPriceAlertById(alertId);
    return existing ? "ok" : "missing";
  }

  const email = data.email as string;
  const { count } = await supabase
    .from("price_alerts")
    .select("id", { count: "exact", head: true })
    .eq("email", email)
    .eq("status", "active");

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (apiKey && (count ?? 0) === 0) void optOutPriceAlertTopic(apiKey, email);
  return "ok";
}
