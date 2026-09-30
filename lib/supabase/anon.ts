import { createClient } from "@supabase/supabase-js";

import { getSupabaseAnonKey, getSupabaseUrl } from "@/lib/supabase/env";

/** Stateless anon client for public RPC (fx klik-logging i /go). */
export function createSupabaseAnonClient() {
  return createClient(getSupabaseUrl(), getSupabaseAnonKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
