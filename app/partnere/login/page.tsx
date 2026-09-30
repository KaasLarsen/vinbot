import type { Metadata } from "next";
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
    <PageShell className="py-10">
      <Breadcrumbs
        items={[
          { href: "/", label: "Forside" },
          { href: "/partnere", label: "Partnere" },
          { href: "/partnere/login", label: "Login" },
        ]}
      />
      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-stone-900">Partner-login</h1>
      <p className="mt-3 max-w-lg text-stone-600">Se jeres klik og månedlige CPC-beløb.</p>
      {authError ? (
        <p className="mt-4 text-sm text-rose-800" role="alert">
          Login fejlede. Prøv igen.
        </p>
      ) : null}
      <div className="mt-8 max-w-md rounded-2xl border border-stone-200 bg-stone-50/80 p-5 sm:p-6">
        <PartnerLoginForm />
      </div>
    </PageShell>
  );
}
