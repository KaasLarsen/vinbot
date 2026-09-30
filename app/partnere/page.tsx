import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/json-ld";
import { PageShell } from "@/components/page-shell";
import { PartnerSignupForm } from "@/components/partner-signup-form";
import { siteName, siteUrl } from "@/lib/site";

const PAGE_TITLE = "Direkte CPC-partner";
const PAGE_DESCRIPTION =
  "Bliv direkte CPC-partner på Vinbot. Vi tracker klik til jeres shop — I logger ind og ser statistik. CPC aftales med os.";
const PAGE_URL = `${siteUrl}/partnere`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
};

export default function PartnerePage() {
  return (
    <PageShell className="py-10">
      <BreadcrumbJsonLd
        items={[
          { name: "Forside", url: `${siteUrl}/` },
          { name: "Partnere", url: PAGE_URL },
        ]}
      />
      <WebPageJsonLd name={PAGE_TITLE} description={PAGE_DESCRIPTION} url={PAGE_URL} />
      <Breadcrumbs
        items={[
          { href: "/", label: "Forside" },
          { href: "/partnere", label: "Partnere" },
        ]}
      />

      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-stone-900">{PAGE_TITLE}</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-stone-700">
        Direkte aftale med {siteName}: vi sender trafik til jeres shop via tracked links, og I betaler
        et aftalt beløb pr. klik (CPC). Ingen plugin hos jer — ingen betaling i portalen. Vi sender
        regning hver måned ud fra kliktallene.
      </p>

      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-14">
        <section className="space-y-4 text-stone-700">
          <h2 className="text-xl font-semibold text-stone-900">Sådan virker det</h2>
          <ul className="ml-5 list-disc space-y-2 leading-relaxed">
            <li>I ansøger herunder. Vi aftaler CPC og aktiverer jeres konto.</li>
            <li>Links fra Vinbot går via vores tracking (`/go/…`) — kun klik, ikke salg.</li>
            <li>I logger ind og ser klik + estimeret skyldigt beløb. CPC kan kun sættes af os.</li>
            <li>
              Bruger I allerede Partner-Ads eller lignende? Se{" "}
              <Link href="/forhandlere" className="text-rose-900 underline underline-offset-2">
                forhandlere
              </Link>
              .
            </li>
          </ul>
          <p className="text-sm text-stone-500">
            Har I allerede en konto?{" "}
            <Link href="/partnere/login" className="font-medium text-rose-900 underline underline-offset-2">
              Log ind på dashboard
            </Link>
          </p>
        </section>

        <section className="rounded-2xl border border-stone-200 bg-stone-50/80 p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-stone-900">Ansøg</h2>
          <p className="mt-1 text-sm text-stone-600">Opret login samtidig med ansøgningen.</p>
          <div className="mt-5">
            <PartnerSignupForm />
          </div>
        </section>
      </div>
    </PageShell>
  );
}
