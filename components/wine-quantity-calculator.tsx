"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  calculateWineQuantity,
  wineQuantitySearchHref,
  type PartyType,
} from "@/lib/wine-quantity/formula";

type WineQuantityCalculatorProps = {
  heading?: string;
  intro?: string;
  defaultPartyType?: PartyType;
  defaultGuests?: number;
  className?: string;
};

const PARTY_OPTIONS: { id: PartyType; label: string; hint: string }[] = [
  { id: "middag", label: "Middag", hint: "½ flaske/gæst" },
  { id: "cocktail", label: "Cocktail", hint: "2–3 glas" },
  { id: "bryllup", label: "Bryllup / lang fest", hint: "1 flaske/gæst" },
];

export function WineQuantityCalculator({
  heading = "Beregn flasker til festen",
  intro = "Antal drikkende gæster + festtype — så får du Vinbot-formlen med 15 % buffer og et søgelink til kassekøb.",
  defaultPartyType = "middag",
  defaultGuests = 40,
  className = "",
}: WineQuantityCalculatorProps) {
  const [guests, setGuests] = useState(defaultGuests);
  const [partyType, setPartyType] = useState<PartyType>(defaultPartyType);
  const [hours, setHours] = useState(3);
  const [withPhases, setWithPhases] = useState(true);
  const [withDessert, setWithDessert] = useState(false);

  const result = useMemo(
    () =>
      calculateWineQuantity({
        guests,
        partyType,
        hours,
        withPhases: partyType === "cocktail" ? withPhases : withPhases,
        withDessert: partyType !== "cocktail" && withDessert,
      }),
    [guests, partyType, hours, withPhases, withDessert],
  );

  const searchHref = wineQuantitySearchHref(result);

  return (
    <section
      className={`rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50 via-white to-stone-50 p-5 shadow-sm sm:p-6 ${className}`}
      aria-labelledby="wine-qty-calc-heading"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-amber-900/80">Vinbot-formlen</p>
      <h2 id="wine-qty-calc-heading" className="mt-1 text-xl font-semibold tracking-tight text-stone-900 sm:text-2xl">
        {heading}
      </h2>
      <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-stone-700">{intro}</p>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs font-medium uppercase tracking-wide text-stone-500">
            Antal voksne der drikker vin
          </span>
          <input
            type="number"
            min={1}
            max={500}
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value) || 0)}
            className="mt-1.5 w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-lg font-semibold text-stone-900 shadow-sm outline-none ring-rose-300 focus:ring-2"
          />
        </label>

        {partyType === "cocktail" ? (
          <label className="block">
            <span className="text-xs font-medium uppercase tracking-wide text-stone-500">Varighed (timer)</span>
            <input
              type="number"
              min={1}
              max={8}
              value={hours}
              onChange={(e) => setHours(Number(e.target.value) || 1)}
              className="mt-1.5 w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-lg font-semibold text-stone-900 shadow-sm outline-none ring-rose-300 focus:ring-2"
            />
          </label>
        ) : (
          <div className="flex flex-col justify-end gap-2 pb-1">
            <label className="flex items-center gap-2 text-sm text-stone-700">
              <input
                type="checkbox"
                checked={withPhases}
                onChange={(e) => setWithPhases(e.target.checked)}
                className="size-4 rounded border-stone-300 text-rose-800 focus:ring-rose-400"
              />
              Fordel på bobler / hvid / rød
            </label>
            <label className="flex items-center gap-2 text-sm text-stone-700">
              <input
                type="checkbox"
                checked={withDessert}
                disabled={!withPhases}
                onChange={(e) => setWithDessert(e.target.checked)}
                className="size-4 rounded border-stone-300 text-rose-800 focus:ring-rose-400 disabled:opacity-40"
              />
              Inkluder dessertvin
            </label>
          </div>
        )}
      </div>

      <p className="mt-5 text-xs font-medium uppercase tracking-wide text-stone-500">Festtype</p>
      <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
        {PARTY_OPTIONS.map((opt) => {
          const selected = opt.id === partyType;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => setPartyType(opt.id)}
              className={`rounded-2xl border px-4 py-3 text-left shadow-sm transition ${
                selected
                  ? "border-rose-800 bg-rose-900 text-white ring-2 ring-rose-300"
                  : "border-stone-200 bg-white text-stone-800 hover:border-rose-300 hover:bg-rose-50"
              }`}
            >
              <span className="block text-sm font-semibold">{opt.label}</span>
              <span className={`mt-0.5 block text-xs ${selected ? "text-rose-100" : "text-stone-500"}`}>
                {opt.hint}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 rounded-xl border border-stone-200 bg-white/90 p-4">
        <p className="text-xs text-stone-500">{result.formulaLabel} · +{Math.round(result.bufferPct * 100)} % buffer</p>
        <p className="mt-2 text-3xl font-semibold tracking-tight text-stone-900">
          {result.totalBottles}{" "}
          <span className="text-lg font-medium text-stone-600">flasker</span>
        </p>
        <p className="mt-1 text-sm text-stone-600">
          Ca. <strong className="font-semibold text-stone-800">{result.casesOf6} kasser</strong> à 6 flasker
          {result.guests > 0 ? (
            <>
              {" "}
              · {result.guests} gæster
            </>
          ) : null}
        </p>

        {result.breakdown ? (
          <ul className="mt-3 grid grid-cols-2 gap-2 text-sm text-stone-700 sm:grid-cols-4">
            <li className="rounded-lg bg-stone-50 px-2.5 py-2">
              <span className="block text-xs text-stone-500">Bobler</span>
              <span className="font-semibold">{result.breakdown.bubbles}</span>
            </li>
            <li className="rounded-lg bg-stone-50 px-2.5 py-2">
              <span className="block text-xs text-stone-500">Hvid</span>
              <span className="font-semibold">{result.breakdown.white}</span>
            </li>
            <li className="rounded-lg bg-stone-50 px-2.5 py-2">
              <span className="block text-xs text-stone-500">Rød</span>
              <span className="font-semibold">{result.breakdown.red}</span>
            </li>
            {result.breakdown.dessert > 0 ? (
              <li className="rounded-lg bg-stone-50 px-2.5 py-2">
                <span className="block text-xs text-stone-500">Dessert</span>
                <span className="font-semibold">{result.breakdown.dessert}</span>
              </li>
            ) : null}
          </ul>
        ) : null}

        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href={searchHref}
            className="inline-flex items-center justify-center rounded-full bg-rose-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-rose-800"
          >
            Søg kasser og storkøb
          </Link>
          <Link
            href="/fest-og-vin"
            className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-4 py-2.5 text-sm font-medium text-stone-800 hover:border-rose-300 hover:bg-rose-50"
          >
            Fest- og selskab-hub
          </Link>
        </div>
      </div>
    </section>
  );
}
