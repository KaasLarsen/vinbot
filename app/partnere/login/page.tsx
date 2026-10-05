import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageShell } from "@/components/page-shell";
import { PartnerLoginForm } from "@/components/partner-login-form";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Partner-login",
  description: "Log ind på Vinbot CPC-partnerdashboard.",
  robots: { index: false, follow: false },
  alternates: { canonical: `${siteUrl}/partnere/login` },
};

export default async function PartnerLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) redirect("/partnere/dashboard");
  }

  const params = await searchParams;
  const authError = params.error === "auth";

  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[22rem] bg-[radial-gradient(ellipse_at_top,_rgba(136,19,55,0.06),_transparent_55%)]"
      />
      <PageShell className="relative py-10 sm:py-12">
        <Breadcrumbs
          items={[
            { href: "/", label: "Forside" },
            { href: "/partnere", label: "Partnere" },
            { href: "/partnere/login", label: "Login" },
          ]}
        />
        <header className="mt-8 max-w-lg">
          <p className="text-sm font-semibold uppercase tracking-wider text-rose-900/85">
            CPC-partner
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
            Log ind
          </h1>
          <p className="mt-3 text-stone-600">Se klikstatistik og månedligt CPC-beløb.</p>
        </header>
        {authError ? (
          <p className="mt-4 max-w-md rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-900" role="alert">
            Login fejlede. Prøv igen.
          </p>
        ) : null}
        <div className="mt-8 max-w-md rounded-2xl border border-stone-200/90 bg-white/90 p-6 shadow-[0_20px_50px_-28px_rgba(28,25,23,0.35)] backdrop-blur-sm sm:p-7">
          <PartnerLoginForm />
        </div>
        <p className="mt-6 text-sm text-stone-500">
          Ny partner?{" "}
          <Link href="/partnere" className="font-medium text-rose-900 underline underline-offset-2">
            Ansøg her
          </Link>
        </p>
      </PageShell>
    </div>
  );
}
