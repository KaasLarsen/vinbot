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

const STEPS = [
  {
    n: "01",
    title: "Ansøg",
    body: "Udfyld formularen og opret login. Vi kontakter jer og aftaler CPC.",
  },
  {
    n: "02",
    title: "Vi aktiverer",
    body: "Når aftalen er på plads, sætter vi CPC og åbner tracking + dashboard.",
  },
  {
    n: "03",
    title: "Følg klik",
    body: "Se klik og skyldigt beløb. Vi sender regning hver måned — uden betaling herinde.",
  },
] as const;

const BENEFITS = [
  {
    title: "Kun klik",
    body: "Ingen salgspixel eller plugin i jeres shop. Vi tracker udgående trafik fra Vinbot.",
  },
  {
    title: "Fast CPC",
    body: "Satsen aftales med os på forhånd. I kan ikke ændre den i portalen.",
  },
  {
    title: "Transparent dashboard",
    body: "Login og se klik pr. dag, uge og måned — plus estimeret skyldigt beløb.",
  },
] as const;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
};

export default function PartnerePage() {
  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(ellipse_at_top,_rgba(136,19,55,0.07),_transparent_55%),linear-gradient(to_bottom,_rgba(250,250,249,0.9),_transparent)]"
      />

      <PageShell className="relative py-10 sm:py-12">
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

        <div className="mt-8 grid items-start gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
          <header className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-rose-900/85">
              Direkte samarbejde
            </p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-stone-900 sm:text-[2.65rem] sm:leading-tight">
              Bliv CPC-partner på {siteName}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-stone-700">
              Vi sender kvalificeret trafik til jeres shop via tracked links. I betaler et aftalt
              beløb pr. klik — uden plugin, uden betaling i portalen, med månedlig regning.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              <a
                href="#ansog"
                className="inline-flex items-center justify-center rounded-xl bg-rose-900 px-5 py-2.5 font-semibold text-white transition hover:bg-rose-950"
              >
                Ansøg nu
              </a>
              <Link
                href="/partnere/login"
                className="font-medium text-rose-900 underline decoration-rose-300 underline-offset-4 transition hover:text-rose-950 hover:decoration-rose-500"
              >
                Log ind på dashboard
              </Link>
            </div>

            <ul className="mt-10 space-y-5 border-t border-stone-200/80 pt-8">
              {BENEFITS.map((item) => (
                <li key={item.title} className="grid gap-1 sm:grid-cols-[7.5rem_1fr] sm:gap-4">
                  <p className="text-sm font-semibold text-stone-900">{item.title}</p>
                  <p className="text-sm leading-relaxed text-stone-600">{item.body}</p>
                </li>
              ))}
            </ul>
          </header>

          <section
            id="ansog"
            className="scroll-mt-24 rounded-2xl border border-stone-200/90 bg-white/90 p-6 shadow-[0_20px_50px_-28px_rgba(28,25,23,0.35)] backdrop-blur-sm sm:p-7"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-rose-900/80">
              Ansøgning
            </p>
            <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-stone-900">
              Opret partnerkonto
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">
              Login oprettes samtidig. Vi aktiverer jer, når CPC er aftalt.
            </p>
            <div className="mt-6">
              <PartnerSignupForm />
            </div>
          </section>
        </div>

        <section className="mt-16 border-t border-stone-200/80 pt-12 sm:mt-20">
          <p className="text-sm font-semibold uppercase tracking-wider text-rose-900/85">
            Proces
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-stone-900">
            Sådan kommer I i gang
          </h2>
          <ol className="mt-8 grid gap-8 sm:grid-cols-3 sm:gap-6">
            {STEPS.map((step) => (
              <li key={step.n} className="relative">
                <p className="text-xs font-semibold tracking-[0.18em] text-rose-900/70">{step.n}</p>
                <h3 className="mt-2 text-lg font-semibold text-stone-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <p className="mt-12 max-w-2xl text-sm leading-relaxed text-stone-500">
          Bruger I allerede Partner-Ads, Daisycon eller Adtraction? Se{" "}
          <Link href="/forhandlere" className="font-medium text-rose-900 underline underline-offset-2">
            forhandlermuligheder
          </Link>{" "}
          — denne side er kun til direkte CPC-aftaler.
        </p>
      </PageShell>
    </div>
  );
}
