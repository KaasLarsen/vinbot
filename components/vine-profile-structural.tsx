import {
  vineStructuralExtraWhenThin,
  vineStructuralProfileParagraph,
} from "@/lib/vine/editorial-product-copy";
import type { CanonicalWine } from "@/lib/vine/types";

/** Redaktionelt resume af typisk struktur — supplerer «Mad og smag» uden at gentage måltidsforslag. */
export function VineStructuralSection({ wine }: { wine: CanonicalWine }) {
  const main = vineStructuralProfileParagraph(wine);
  const thin = vineStructuralExtraWhenThin(wine);
  return (
    <section
      className="mt-10 rounded-2xl border border-stone-200 bg-white px-5 py-6 shadow-sm"
      aria-labelledby="vine-struct-heading"
    >
      <h2 id="vine-struct-heading" className="text-xl font-semibold text-stone-900">
        Typisk udtryk og stil
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-stone-800">{main}</p>
      {thin ? <p className="mt-3 text-sm leading-relaxed text-stone-800">{thin}</p> : null}
      <p className="mt-3 text-xs text-stone-600">
        Ikke smagsbedømmelse af den konkrete flaske — ud fra åbne signaler om sort og producenttype.
      </p>
    </section>
  );
}
