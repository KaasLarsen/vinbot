import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kontakt Vinbot ved spørgsmål om indhold, affiliate eller presse.",
  alternates: { canonical: `${siteUrl}/kontakt` },
};

export default function KontaktPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumbs items={[{ href: "/", label: "Forside" }, { href: "/kontakt", label: "Kontakt" }]} />
      <h1 className="mt-6 text-3xl font-semibold text-stone-900">Kontakt</h1>
      <p className="mt-4 text-stone-700">
        Skriv til{" "}
        <a href="mailto:hej@vinbot.dk" className="text-rose-900 hover:underline">
          hej@vinbot.dk
        </a>{" "}
        ved presse, partnerskaber eller fejl i feeds. Vi svarer så hurtigt vi kan.
      </p>
    </div>
  );
}
