import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { PartnerLogoutButton } from "@/components/partner-logout-button";
import { PageShell } from "@/components/page-shell";
import {
  daysAgoUtc,
  formatCpcOre,
  formatDueDkk,
  startOfUtcDay,
  startOfUtcMonth,
} from "@/lib/cpc/helpers";
import type { CpcPartner } from "@/lib/cpc/types";
import { siteUrl } from "@/lib/site";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Partner-dashboard",
  robots: { index: false, follow: false },
  alternates: { canonical: `${siteUrl}/partnere/dashboard` },
};

async function countClicks(
  supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>,
  partnerId: string,
  sinceIso: string,
): Promise<number> {
  const { count, error } = await supabase
    .from("clicks")
    .select("id", { count: "exact", head: true })
    .eq("partner_id", partnerId)
    .gte("created_at", sinceIso);
  if (error) {
    console.error("click count failed:", error);
    return 0;
  }
  return count ?? 0;
}

export default async function PartnerDashboardPage() {
  if (!isSupabaseConfigured()) {
    redirect("/partnere");
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/partnere/login");

  const { data: partner, error: partnerError } = await supabase
    .from("partners")
    .select("*")
    .eq("auth_user_id", user.id)
    .maybeSingle();

  if (partnerError) {
    console.error("partner fetch failed:", partnerError);
  }

  const p = partner as CpcPartner | null;

  if (!p) {
    return (
      <PageShell className="py-10">
        <h1 className="text-2xl font-semibold text-stone-900">Ingen partnerprofil</h1>
        <p className="mt-3 text-stone-600">
          Vi fandt ingen CPC-profil på denne konto.{" "}
          <Link href="/partnere" className="text-rose-900 underline">
            Ansøg her
          </Link>
          .
        </p>
        <div className="mt-6">
          <PartnerLogoutButton />
        </div>
      </PageShell>
    );
  }

  const now = new Date();
  const clicksToday = await countClicks(supabase, p.id, startOfUtcDay(now).toISOString());
  const clicks7d = await countClicks(supabase, p.id, daysAgoUtc(7, now).toISOString());
  const clicksMonth = await countClicks(supabase, p.id, startOfUtcMonth(now).toISOString());

  const cpcLabel = p.cpc_ore != null ? formatCpcOre(p.cpc_ore) : "Ikke sat endnu";
  const dueLabel =
    p.cpc_ore != null ? formatDueDkk(clicksMonth, p.cpc_ore) : "—";

  const statusLabel =
    p.status === "active" ? "Aktiv" : p.status === "paused" ? "Pauseret" : "Afventer godkendelse";

  return (
    <PageShell className="py-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
            CPC-partner
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-stone-900">{p.name}</h1>
          <p className="mt-2 text-sm text-stone-600">
            Status: <span className="font-medium text-stone-800">{statusLabel}</span>
            {" · "}
            slug: <code className="text-stone-800">{p.slug}</code>
          </p>
        </div>
        <PartnerLogoutButton />
      </div>

      {p.status !== "active" || p.cpc_ore == null ? (
        <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
          Jeres aftale er endnu ikke aktiv, eller CPC er ikke sat. Tracking-links virker først, når
          vi har aktiveret jer og indsat CPC.
        </p>
      ) : null}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Klik i dag" value={String(clicksToday)} />
        <Stat label="Klik seneste 7 dage" value={String(clicks7d)} />
        <Stat label="Klik denne måned" value={String(clicksMonth)} />
        <Stat label="CPC (sat af Vinbot)" value={cpcLabel} />
      </div>

      <section className="mt-10 max-w-xl">
        <h2 className="text-lg font-semibold text-stone-900">Denne måned</h2>
        <p className="mt-2 text-stone-700">
          Estimeret skyldigt beløb:{" "}
          <strong className="text-stone-900">{dueLabel}</strong>
        </p>
        <p className="mt-2 text-sm leading-relaxed text-stone-500">
          Beløbet er klik × CPC. Betaling sker via den månedlige regning, I får fra os — ikke i
          denne portal.
        </p>
      </section>

      {p.status === "active" && p.cpc_ore != null ? (
        <section className="mt-10 max-w-2xl">
          <h2 className="text-lg font-semibold text-stone-900">Jeres tracking-link</h2>
          <p className="mt-2 text-sm text-stone-600">
            Eksempel (erstat URL med jeres produktside på {p.allowed_host}):
          </p>
          <pre className="mt-3 overflow-x-auto rounded-xl border border-stone-200 bg-stone-50 p-4 text-xs text-stone-800">
            {`${siteUrl}/go/${p.slug}?url=${encodeURIComponent(`https://${p.allowed_host}/`)}`}
          </pre>
        </section>
      ) : null}
    </PageShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white px-4 py-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-stone-900">{value}</p>
    </div>
  );
}
