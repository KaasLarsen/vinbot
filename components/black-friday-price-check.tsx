"use client";

import { WineSearch } from "@/components/wine-search";

export function BlackFridayPriceCheck() {
  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-8" aria-labelledby="bf-pristjek-heading">
      <h2 id="bf-pristjek-heading" className="text-2xl font-semibold tracking-tight text-stone-900">
        Pris-tjekkeren
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-stone-600">
        Har du set et tilbud et andet sted? Indtast vinens navn her og se, om en anden forhandler har den billigere.
      </p>
      <div className="mt-6">
        <WineSearch
          productCardPlacement="black-friday-search"
          inputPlaceholder="Har du set et tilbud et andet sted? Indtast vinens navn…"
        />
      </div>
    </section>
  );
}
