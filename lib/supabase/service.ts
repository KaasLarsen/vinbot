import { createClient } from "@supabase/supabase-js";

import { getSupabaseUrl } from "@/lib/supabase/env";

/** Service role — kun server-side. Bruges til partner-insert når e-mail-confirm er slået til. */
export function createSupabaseServiceClient() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!key) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY mangler");
  }
  return createClient(getSupabaseUrl(), key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export function hasSupabaseServiceRole(): boolean {
  return Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY?.trim());
}
