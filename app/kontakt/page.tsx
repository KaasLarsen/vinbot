import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { contactEmail, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Skriv til Vinbot om feedback, presse, samarbejde eller fejl på sitet. Vi svarer på info@vinbot.dk.",
  alternates: { canonical: `${siteUrl}/kontakt` },
};

const mailtoHref = `mailto:${contactEmail}?subject=Kontakt%20Vinbot`;

export default function KontaktPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumbs items={[{ href: "/", label: "Forside" }, { href: "/kontakt", label: "Kontakt" }]} />
      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-stone-900">Kontakt</h1>
      <p className="mt-4 text-lg leading-relaxed text-stone-700">
        Har du spørgsmål, idéer eller noget, der ikke fungerer som det skal? Vi læser alle henvendelser og vender tilbage, så hurtigt vi kan.
      </p>

      <section className="mt-10 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-rose-900/90">Skriv til os</h2>
        <p className="mt-3 text-stone-700">
          Brug e-mailen herunder — gerne med en kort overskrift i emnefeltet, så vi nemmere kan finde din besked.
        </p>
        <a
          href={mailtoHref}
          className="mt-5 inline-flex break-all rounded-xl bg-rose-900 px-5 py-3 text-sm font-semibold text-white hover:bg-rose-950"
        >
          {contactEmail}
        </a>
        <p className="mt-4 text-sm text-stone-500">
          Vi har ikke telefon eller chat på Vinbot; e-mail er den eneste officielle kanal.
        </p>
      </section>

      <section className="mt-10 space-y-6 text-stone-700">
        <h2 className="text-xl font-semibold text-stone-900">Det hjælper os, hvis du skriver …</h2>
        <ul className="list-disc space-y-3 pl-6 leading-relaxed">
          <li>
            <strong>Feedback og forslag</strong> til guider, søgning eller indhold — hvad savner du?
          </li>
          <li>
            <strong>Fejl på siden</strong> — gerne med link til siden og kort beskrivelse (og hvilken browser du bruger, hvis det er teknisk).
          </li>
          <li>
            <strong>Presse og samarbejde</strong> — kort om dig eller jeres medie/projekt og hvad I ønsker.
          </li>
          <li>
            <strong>Spørgsmål om persondata eller cookies</strong> — du kan også læse vores{" "}
            <Link href="/privatliv" className="text-rose-900 hover:underline">
              privatlivspolitik
            </Link>{" "}
            først.
          </li>
        </ul>
      </section>

      <p className="mt-10 text-sm text-stone-600">
        Vil du vide mere om Vinbot før du skriver? Se{" "}
        <Link href="/om-os" className="text-rose-900 hover:underline">
          Om os
        </Link>
        . Juridiske forhold:{" "}
        <Link href="/betingelser" className="text-rose-900 hover:underline">
          Betingelser
        </Link>
        .
      </p>
    </div>
  );
}
