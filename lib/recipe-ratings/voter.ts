import { createHash, randomUUID } from "node:crypto";

import { getSupabaseAnonKey } from "@/lib/supabase/env";

/** httpOnly-cookie. Én browser, én stemme pr. opskrift. */
export const VOTER_COOKIE = "vb_voter";

const VOTER_COOKIE_MAX_AGE = 60 * 60 * 24 * 400;

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function voterCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: VOTER_COOKIE_MAX_AGE,
  };
}

export function readOrCreateVoterId(existing: string | undefined): { id: string; isNew: boolean } {
  if (existing && UUID_RE.test(existing)) return { id: existing, isNew: false };
  return { id: randomUUID(), isNew: true };
}

function pepper(): string {
  try {
    return getSupabaseAnonKey();
  } catch {
    return "vinbot-recipe-rating";
  }
}

export function hashVoterId(voterId: string): string {
  return createHash("sha256").update(`voter:${pepper()}:${voterId}`).digest("hex");
}

export function hashIp(ip: string): string {
  return createHash("sha256").update(`ip:${pepper()}:${ip}`).digest("hex");
}
