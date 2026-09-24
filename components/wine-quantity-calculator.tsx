"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { WineSearch } from "@/components/wine-search";
import {
  calculateWineQuantity,
  wineQuantitySearchQuery,
  type PartyType,
} from "@/lib/wine-quantity/formula";

type WineQuantityCalculatorProps = {
  heading?: string;
  intro?: string;
  defaultPartyType?: PartyType;
  defaultGuests?: number;
  /** `full` = guide/hub med finjustering; `compact` = forside hurtig beregning */
  variant?: "full" | "compact";
  /** Start sammenklappet (kun relevant for `compact` — fx forsiden). */
  defaultCollapsed?: boolean;
  className?: string;
};

const PARTY_OPTIONS: { id: PartyType; label: string; hint: string }[] = [
  { id: "middag", label: "Middag", hint: "½ flaske/gæst" },
  { id: "cocktail", label: "Cocktail", hint: "2–3 glas" },
  { id: "bryllup", label: "Bryllup / lang fest", hint: "1 flaske/gæst" },
];

function guideHrefForPartyType(partyType: PartyType): string {
  return partyType === "bryllup"
    ? "/guides/hvor-meget-vin-til-bryllup"
    : "/guides/hvor-meget-vin-til-fest";
}

export function WineQuantityCalculator({
  heading = "Beregn flasker til festen",
  intro = "Antal drikkende gæster + festtype — så får du Vinbot-formlen med 15 % buffer. Find derefter festvine til indkøbet.",
  defaultPartyType = "middag",
  defaultGuests = 40,
  variant = "full",
  defaultCollapsed = false,
  className = "",
}: WineQuantityCalculatorProps) {
  const isCompact = variant === "compact";
  const canCollapse = isCompact && defaultCollapsed;
  const [expanded, setExpanded] = useState(!canCollapse);
  const [guestsInput, setGuestsInput] = useState(String(defaultGuests));
  const [partyType, setPartyType] = useState<PartyType>(defaultPartyType);
  const [hoursInput, setHoursInput] = useState("3");
  const [withPhases, setWithPhases] = useState(true);
  const [withDessert, setWithDessert] = useState(false);
  const [showPicks, setShowPicks] = useState(false);
  const picksRef = useRef<HTMLDivElement>(null);

  const guests = Math.max(0, Math.min(500, parseInt(guestsInput, 10) || 0));
  const hours = Math.max(1, Math.min(8, parseInt(hoursInput, 10) || 3));

  const result = useMemo(
    () =>
      calculateWineQuantity({
        guests,
        partyType,
        hours: isCompact ? 3 : hours,
        withPhases: isCompact ? false : withPhases,
        withDessert: isCompact ? false : partyType !== "cocktail" && withDessert,
      }),
    [guests, partyType, hours, withPhases, withDessert, isCompact],
  );

  const picksQuery = wineQuantitySearchQuery(result);
  const guideHref = guideHrefForPartyType(partyType);
  const padding = isCompact ? "p-4 sm:p-5" : "p-5 sm:p-6";

  useEffect(() => {
    if (!showPicks) return;
    const node = picksRef.current;
    if (!node) return;
    // Scroll så vin-forslagene fylder skærmen — ikke op til hero-søgningen
    requestAnimationFrame(() => {
      node.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [showPicks, picksQuery]);

  const partyLabel = PARTY_OPTIONS.find((o) => o.id === partyType)?.label ?? partyType;

  if (canCollapse && !expanded) {
    return (
      <section
        className={`rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50 via-white to-stone-50 shadow-sm ${padding} ${className}`}
        aria-labelledby="wine-qty-calc-heading"
      >
        <button
          type="button"
          onClick={() => setExpanded(true)}
          aria-expanded={false}
          className="flex w-full items-start gap-3 text-left"
        >
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-900/80">Vinbot-formlen</p>
            <h2
              id="wine-qty-calc-heading"
              className="mt-1 text-lg font-semibold tracking-tight text-stone-900 sm:text-xl"
            >
              {heading}
            </h2>
            <p className="mt-1.5 text-sm text-stone-600">
              Ca. <strong className="font-semibold text-stone-800">{result.totalBottles} flasker</strong>
              {" · "}
              {result.guests} gæster · {partyLabel}
            </p>
          </div>
          <span className="mt-1 shrink-0 rounded-full border border-amber-300 bg-white px-3 py-1.5 text-xs font-semibold text-amber-950 shadow-sm">
            Åbn
          </span>
        </button>
      </section>
    );
  }

  return (
    <section
      className={`rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50 via-white to-stone-50 shadow-sm ${padding} ${className}`}
      aria-labelledby="wine-qty-calc-heading"
    >
      <div className={canCollapse ? "flex items-start justify-between gap-3" : undefined}>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-900/80">Vinbot-formlen</p>
          <h2
            id="wine-qty-calc-heading"
            className={`mt-1 font-semibold tracking-tight text-stone-900 ${isCompact ? "text-lg sm:text-xl" : "text-xl sm:text-2xl"}`}
          >
            {heading}
          </h2>
          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-stone-700">{intro}</p>
        </div>
        {canCollapse ? (
          <button
            type="button"
            onClick={() => {
              setExpanded(false);
              setShowPicks(false);
            }}
            aria-expanded={true}
            className="mt-1 shrink-0 rounded-full border border-stone-300 bg-white px-3 py-1.5 text-xs font-semibold text-stone-700 shadow-sm hover:border-amber-300 hover:bg-amber-50"
          >
            Luk
          </button>
        ) : null}
      </div>

      <div className={`mt-5 grid gap-4 ${isCompact ? "grid-cols-1" : "gap-5 sm:grid-cols-2"}`}>
        <label className="block">
          <span className="text-xs font-medium uppercase tracking-wide text-stone-500">
            Antal voksne der drikker vin
          </span>
          <input
            type="number"
            inputMode="numeric"
            min={1}
            max={500}
            value={guestsInput}
            onChange={(e) => setGuestsInput(e.target.value)}
            onBlur={() => {
              const n = Math.max(1, Math.min(500, parseInt(guestsInput, 10) || defaultGuests));
              setGuestsInput(String(n));
            }}
            onFocus={(e) => e.currentTarget.select()}
            className="mt-1.5 w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-lg font-semibold text-stone-900 shadow-sm outline-none ring-rose-300 focus:ring-2"
          />
        </label>

        {!isCompact && partyType === "cocktail" ? (
          <label className="block">
            <span className="text-xs font-medium uppercase tracking-wide text-stone-500">Varighed (timer)</span>
            <input
              type="number"
              inputMode="numeric"
              min={1}
              max={8}
              value={hoursInput}
              onChange={(e) => setHoursInput(e.target.value)}
              onBlur={() => {
                const n = Math.max(1, Math.min(8, parseInt(hoursInput, 10) || 3));
                setHoursInput(String(n));
              }}
              onFocus={(e) => e.currentTarget.select()}
              className="mt-1.5 w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-lg font-semibold text-stone-900 shadow-sm outline-none ring-rose-300 focus:ring-2"
            />
          </label>
        ) : null}

        {!isCompact && partyType !== "cocktail" ? (
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
        ) : null}
      </div>

      <p className="mt-5 text-xs font-medium uppercase tracking-wide text-stone-500">Festtype</p>
      <div className={`mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3 ${isCompact ? "lg:grid-cols-1" : ""}`}>
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

      <div className={`mt-6 rounded-xl border border-stone-200 bg-white/90 ${isCompact ? "p-3.5" : "p-4"}`}>
        <p className="text-xs text-stone-500">
          {result.formulaLabel} · +{Math.round(result.bufferPct * 100)} % buffer
        </p>
        <p className={`mt-2 font-semibold tracking-tight text-stone-900 ${isCompact ? "text-2xl" : "text-3xl"}`}>
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

        {!isCompact && result.breakdown ? (
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

        <p className="mt-3 text-xs leading-relaxed text-stone-500">
          Ca. {result.casesOf6} kasser à 6 flasker. Mængderabat får du typisk ved storkøb hos forhandleren.
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setShowPicks(true)}
            className="inline-flex items-center justify-center rounded-full bg-rose-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-rose-800"
          >
            {showPicks ? "Opdater festvine" : "Find festvine til indkøbet"}
          </button>
          {isCompact ? (
            <Link
              href={guideHref}
              className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-4 py-2.5 text-sm font-medium text-stone-800 hover:border-rose-300 hover:bg-rose-50"
            >
              Finjustér i guiden
            </Link>
          ) : (
            <Link
              href="/fest-og-vin"
              className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white px-4 py-2.5 text-sm font-medium text-stone-800 hover:border-rose-300 hover:bg-rose-50"
            >
              Fest- og selskab-hub
            </Link>
          )}
        </div>

        {showPicks ? (
          <div
            ref={picksRef}
            id="fest-wine-picks"
            className="mt-5 scroll-mt-24 border-t border-stone-200 pt-4"
          >
            <h3 className="text-sm font-semibold text-stone-900">
              Festvine til dig — ca. {result.totalBottles} flasker
            </h3>
            <p className="mt-1 text-xs text-stone-500">
              Forslag fra danske forhandlere. Skift festtype ovenfor for andre vine.
            </p>
            <div className="mt-3">
              <WineSearch key={picksQuery} initialQuery={picksQuery} variant="compact" />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
