"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { DealCard } from "@/components/deal-card";
import { SEASON_BUDGETS, type SeasonBudgetId } from "@/lib/season-menu/roles";
import type { SeasonMenuResult } from "@/lib/season-menu/build";
import {
  calculateSeasonWineQuantity,
  seasonGuideHref,
  type SeasonDish,
  type SeasonEvent,
  type SeasonRedStyle,
} from "@/lib/wine-quantity/season";

type SeasonWineCalculatorProps = {
  heading?: string;
  intro?: string;
  defaultEvent?: SeasonEvent;
  defaultGuests?: number;
  className?: string;
};

const EVENTS: { id: SeasonEvent; label: string; hint: string }[] = [
  { id: "juleaften", label: "Juleaften", hint: "And, flæskesteg, rødkål" },
  { id: "nytaar", label: "Nytårsaften", hint: "Menu + bobler til midnat" },
  { id: "julefrokost", label: "Julefrokost", hint: "Tung, salt og fed mad" },
];

const DISHES: { id: SeasonDish; label: string }[] = [
  { id: "and", label: "And" },
  { id: "flaesk", label: "Flæskesteg" },
  { id: "begge", label: "Begge" },
];

export function SeasonWineCalculator({
  heading = "Beregn julevin og nytårsvin",
  intro = "Tre klik: begivenhed, gæster og budget. Så får du antal flasker og konkrete vine til salg hos danske forhandlere.",
  defaultEvent = "juleaften",
  defaultGuests = 6,
  className = "",
}: SeasonWineCalculatorProps) {
  const [event, setEvent] = useState<SeasonEvent>(defaultEvent);
  const [dish, setDish] = useState<SeasonDish>("begge");
  const [redStyle, setRedStyle] = useState<SeasonRedStyle>("classic");
  const [guestsInput, setGuestsInput] = useState(String(defaultGuests));
  const [budgetId, setBudgetId] = useState<SeasonBudgetId | null>(null);
  const [menu, setMenu] = useState<SeasonMenuResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const guests = Math.max(1, Math.min(80, parseInt(guestsInput, 10) || defaultGuests));
  const preview = useMemo(() => calculateSeasonWineQuantity({ guests, event }), [guests, event]);
  const budget = SEASON_BUDGETS.find((b) => b.id === budgetId);

  async function runCalculate() {
    if (!budgetId) return;
    setLoading(true);
    setFailed(false);
    try {
      const r = await fetch("/api/season-wine-menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event, guests, budgetId, redStyle, dish }),
      });
      if (!r.ok) throw new Error("bad status");
      const json = (await r.json()) as SeasonMenuResult;
      setMenu(json);
      requestAnimationFrame(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } catch {
      setFailed(true);
      setMenu(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      className={`rounded-2xl border border-rose-200/80 bg-gradient-to-br from-rose-50 via-white to-stone-50 shadow-sm p-5 sm:p-6 ${className}`}
      aria-labelledby="season-wine-calc-heading"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-rose-900/80">Jule- og nytårsvin</p>
      <h2 id="season-wine-calc-heading" className="mt-1 text-xl font-semibold tracking-tight text-stone-900 sm:text-2xl">
        {heading}
      </h2>
      <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-stone-700">{intro}</p>

      <p className="mt-5 text-xs font-medium uppercase tracking-wide text-stone-500">1. Begivenhed</p>
      <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
        {EVENTS.map((opt) => {
          const selected = opt.id === event;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => setEvent(opt.id)}
              className={`rounded-2xl border px-4 py-3 text-left shadow-sm transition ${
                selected
                  ? "border-rose-800 bg-rose-900 text-white ring-2 ring-rose-300"
                  : "border-stone-200 bg-white text-stone-800 hover:border-rose-300 hover:bg-rose-50"
              }`}
            >
              <span className="block text-sm font-semibold">{opt.label}</span>
              <span className={`mt-0.5 block text-xs ${selected ? "text-rose-100" : "text-stone-500"}`}>{opt.hint}</span>
            </button>
          );
        })}
      </div>

      {event === "juleaften" ? (
        <div className="mt-4">
          <p className="text-xs font-medium uppercase tracking-wide text-stone-500">Hovedret</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {DISHES.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setDish(d.id)}
                className={`rounded-full border px-3 py-1.5 text-sm ${
                  dish === d.id ? "border-rose-800 bg-rose-900 text-white" : "border-stone-200 bg-white text-stone-700"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs font-medium uppercase tracking-wide text-stone-500">Stil på rødvinen</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setRedStyle("classic")}
              className={`rounded-full border px-3 py-1.5 text-sm ${
                redStyle === "classic" ? "border-rose-800 bg-rose-900 text-white" : "border-stone-200 bg-white text-stone-700"
              }`}
            >
              Pinot / gamay / chianti
            </button>
            <button
              type="button"
              onClick={() => setRedStyle("kraftig")}
              className={`rounded-full border px-3 py-1.5 text-sm ${
                redStyle === "kraftig" ? "border-rose-800 bg-rose-900 text-white" : "border-stone-200 bg-white text-stone-700"
              }`}
            >
              Kraftig julevin
            </button>
          </div>
        </div>
      ) : null}

      <label className="mt-5 block">
        <span className="text-xs font-medium uppercase tracking-wide text-stone-500">2. Antal voksne der drikker vin</span>
        <input
          type="number"
          inputMode="numeric"
          min={1}
          max={80}
          value={guestsInput}
          onChange={(e) => setGuestsInput(e.target.value)}
          onBlur={() => setGuestsInput(String(Math.max(1, Math.min(80, parseInt(guestsInput, 10) || defaultGuests))))}
          onFocus={(e) => e.currentTarget.select()}
          className="mt-1.5 w-full max-w-xs rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-lg font-semibold text-stone-900 shadow-sm outline-none ring-rose-300 focus:ring-2"
        />
      </label>

      <p className="mt-5 text-xs font-medium uppercase tracking-wide text-stone-500">3. Budget pr. flaske</p>
      <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
        {SEASON_BUDGETS.map((b) => {
          const selected = b.id === budgetId;
          return (
            <button
              key={b.id}
              type="button"
              onClick={() => setBudgetId(b.id)}
              className={`rounded-2xl border px-4 py-3 text-left shadow-sm transition ${
                selected
                  ? "border-rose-800 bg-rose-900 text-white ring-2 ring-rose-300"
                  : "border-stone-200 bg-white text-stone-800 hover:border-rose-300 hover:bg-rose-50"
              }`}
            >
              <span className="block text-sm font-semibold">{b.label}</span>
              <span className={`mt-0.5 block text-xs ${selected ? "text-rose-100" : "text-stone-500"}`}>{b.hint}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-5 rounded-xl border border-stone-200 bg-white/90 p-4">
        <p className="text-xs text-stone-500">
          {preview.formulaLabel} · +{Math.round(preview.bufferPct * 100)} % buffer
        </p>
        <p className="mt-2 text-2xl font-semibold tracking-tight text-stone-900">
          {preview.totalBottles} <span className="text-lg font-medium text-stone-600">flasker</span>
        </p>
        <ul className="mt-3 grid grid-cols-2 gap-2 text-sm text-stone-700 sm:grid-cols-4">
          {preview.breakdown.welcomeBubbles > 0 ? (
            <li className="rounded-lg bg-stone-50 px-2.5 py-2">
              <span className="block text-xs text-stone-500">Bobler</span>
              <span className="font-semibold">{preview.breakdown.welcomeBubbles}</span>
            </li>
          ) : null}
          {preview.breakdown.white > 0 ? (
            <li className="rounded-lg bg-stone-50 px-2.5 py-2">
              <span className="block text-xs text-stone-500">Hvid</span>
              <span className="font-semibold">{preview.breakdown.white}</span>
            </li>
          ) : null}
          <li className="rounded-lg bg-stone-50 px-2.5 py-2">
            <span className="block text-xs text-stone-500">Rød</span>
            <span className="font-semibold">{preview.breakdown.red}</span>
          </li>
          {preview.breakdown.dessert > 0 ? (
            <li className="rounded-lg bg-stone-50 px-2.5 py-2">
              <span className="block text-xs text-stone-500">{event === "nytaar" ? "Midnat" : "Dessert"}</span>
              <span className="font-semibold">{preview.breakdown.dessert}</span>
            </li>
          ) : null}
        </ul>
      </div>

      <button
        type="button"
        disabled={!budgetId || loading}
        onClick={() => void runCalculate()}
        className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-rose-900 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-rose-800 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        {loading ? "Finder vine…" : "Beregn min vinmenu"}
      </button>

      <p className="mt-3 text-xs text-stone-500">
        Priser er aktuelle hos forhandleren. Shoppens før-pris er ikke nødvendigvis historisk lavpris.{" "}
        <Link href={seasonGuideHref(event)} className="font-medium text-rose-900 hover:underline">
          Læs guiden
        </Link>
      </p>

      <div ref={resultsRef} className="scroll-mt-24">
        {failed ? (
          <p className="mt-4 text-sm text-rose-800">Kunne ikke hente vine lige nu. Prøv igen om lidt.</p>
        ) : null}
        {menu ? (
          <div className="mt-6 border-t border-stone-200 pt-5">
            <h3 className="text-lg font-semibold text-stone-900">
              Din vinmenu til {menu.quantity.guests} personer
            </h3>
            <p className="mt-1 text-sm text-stone-600">
              Til {event === "juleaften" ? "juleaften" : event === "julefrokost" ? "julefrokost" : "nytårsaften"} skal I bruge{" "}
              <strong className="font-semibold text-stone-800">{menu.quantity.totalBottles} flasker</strong>
              {budget ? ` i båndet ${budget.hint.toLowerCase()}` : ""}.
            </p>
            <div className="mt-5 grid gap-6">
              {menu.slots.map((slot) => (
                <div key={slot.roleId}>
                  <p className="text-sm font-semibold text-stone-900">{slot.courseLabel}</p>
                  <p className="text-xs text-stone-500">
                    {slot.bottles} flaske{slot.bottles === 1 ? "" : "r"}
                  </p>
                  {slot.deal ? (
                    <div className="mt-2 max-w-sm">
                      <DealCard deal={slot.deal} placement={`season-menu-${slot.roleId}`} variant="compact" />
                    </div>
                  ) : (
                    <p className="mt-2 text-sm text-stone-600">
                      Ingen match i dit prisbånd lige nu.{" "}
                      <Link href={slot.searchHref} className="font-medium text-rose-900 hover:underline">
                        Søg bredere
                      </Link>{" "}
                      eller læs{" "}
                      <Link href={slot.guideHref} className="font-medium text-rose-900 hover:underline">
                        guiden
                      </Link>
                      .
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
