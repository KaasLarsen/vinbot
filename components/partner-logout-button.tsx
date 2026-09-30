"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export function PartnerLogoutButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onLogout() {
    setBusy(true);
    try {
      const supabase = createSupabaseBrowserClient();
      await supabase.auth.signOut();
      router.push("/partnere/login");
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={onLogout}
      disabled={busy}
      className="text-sm font-medium text-stone-600 underline decoration-stone-300 underline-offset-4 hover:text-rose-900 disabled:opacity-60"
    >
      {busy ? "Logger ud…" : "Log ud"}
    </button>
  );
}
