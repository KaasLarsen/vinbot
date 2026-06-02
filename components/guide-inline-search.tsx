"use client";

import { WineSearch, type WineSearchChip } from "@/components/wine-search";
import type { GuideIntent } from "@/lib/guide-intent";

function intentChipsForGuide(intent: GuideIntent): WineSearchChip[] {
  const chips: WineSearchChip[] = [{ label: intent.label, q: intent.q, max: intent.max ?? undefined }];
  if (intent.max != null) {
    chips.push({ label: `${intent.label} (ingen max)`, q: intent.q });
  }
  const q = intent.q.toLowerCase();
  if (/tapas|rioja|spanien/.test(q)) {
    chips.push({ label: "Tapas rød", q: "tapas rioja spanien" });
  } else if (/gryderet|bourgignon|coq/.test(q)) {
    chips.push({ label: "Gryderet", q: "gryderet pinot noir merlot" });
  } else if (/nytår|champagne|bobler/.test(q)) {
    chips.push({ label: "Bobler", q: "nytår champagne bobler cava" });
  } else if (/fisk|hvidvin|riesling/.test(q)) {
    chips.push({ label: "Hvid til fisk", q: "fisk hvidvin riesling" });
  } else {
    chips.push({ label: "Under 150 kr", q: intent.q, max: 150 });
  }
  return chips.slice(0, 3);
}

type Props = {
  slug: string;
  intent: GuideIntent;
};

/** Kompakt vinsøgning på guiden — samme feed + DSF-stribe som forsiden. */
export function GuideInlineSearch({ slug, intent }: Props) {
  return (
    <section className="not-prose mt-8 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6" aria-labelledby={`guide-inline-search-${slug}`}>
      <h2 id={`guide-inline-search-${slug}`} className="text-lg font-semibold text-stone-900">
        Søg flasker til guiden
      </h2>
      <p className="mt-1 text-sm text-stone-600">
        Sammenlign pris på tværs af danske forhandlere — plus kuraterede flasker fra Den Sidste Flaske.
      </p>
      <div className="mt-4">
        <WineSearch
          initialQuery={intent.q}
          initialMax={intent.max ?? undefined}
          productCardPlacement="guide-inline-search"
          variant="compact"
          intentChips={intentChipsForGuide(intent)}
        />
      </div>
    </section>
  );
}
