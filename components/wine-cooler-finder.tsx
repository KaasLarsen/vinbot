"use client";

import { useState } from "react";
import {
  buildWineCoolerFinderSearch,
  type CoolerFinderBudget,
  type CoolerFinderCapacity,
  type CoolerFinderPlacement,
  type CoolerFinderSearch,
  type CoolerFinderZones,
} from "@/lib/search/wine-cooler-finder";

type Step = 1 | 2 | 3 | 4;

const btnBase =
  "rounded-2xl border px-4 py-3 text-left text-sm font-semibold shadow-sm transition";
const btnIdle = "border-stone-200/90 bg-white text-stone-800 hover:border-rose-300 hover:bg-rose-50";

export function WineCoolerFinder({
  onComplete,
  onCancel,
}: {
  onComplete: (result: CoolerFinderSearch) => void;
  onCancel: () => void;
}) {
  const [step, setStep] = useState<Step>(1);
  const [placement, setPlacement] = useState<CoolerFinderPlacement | null>(null);
  const [capacity, setCapacity] = useState<CoolerFinderCapacity | null>(null);
  const [zones, setZones] = useState<CoolerFinderZones | null>(null);

  function finish(budget: CoolerFinderBudget) {
    if (!placement || !capacity || !zones) return;
    onComplete(buildWineCoolerFinderSearch({ placement, capacity, zones, budget }));
  }

  return (
    <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-rose-900/85">Vinkøleskab-vælger</p>
          <p className="mt-1 text-sm font-medium text-stone-800">Trin {step} af 4</p>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="text-sm font-medium text-stone-600 hover:text-stone-900"
        >
          Luk
        </button>
      </div>

      {step === 1 ? (
        <fieldset className="mt-4">
          <legend className="text-base font-semibold text-stone-900">Skal skabet bygges ind i køkkenet?</legend>
          <p className="mt-1 text-sm text-stone-600">
            Integrerbare modeller kræver niche, ventilation og ofte køkkenlåge. Fritstående er nemmere at stille op.
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {(
              [
                { id: "integrerbar", label: "Integrerbart", hint: "Køkkenniche / 60 cm" },
                { id: "fritstaende", label: "Fritstående", hint: "Stue, kælder, bryggers" },
                { id: "unknown", label: "Ved ikke", hint: "Vis begge typer" },
              ] as { id: CoolerFinderPlacement; label: string; hint: string }[]
            ).map((opt) => (
              <button
                key={opt.id}
                type="button"
                className={`${btnBase} ${btnIdle}`}
                onClick={() => {
                  setPlacement(opt.id);
                  setStep(2);
                }}
              >
                {opt.label}
                <span className="mt-0.5 block text-xs font-normal text-stone-500">{opt.hint}</span>
              </button>
            ))}
          </div>
        </fieldset>
      ) : null}

      {step === 2 ? (
        <fieldset className="mt-4">
          <legend className="text-base font-semibold text-stone-900">Hvor mange flasker skal der være plads til?</legend>
          <p className="mt-1 text-sm text-stone-600">
            Flasketal er typisk Bordeaux-størrelse — magnum og høje flasker fylder mere. Køb gerne lidt større end din samling nu.
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {(
              [
                { id: "small", label: "Op til ca. 30", hint: "Kompakt / weekendbrug" },
                { id: "medium", label: "30–80 flasker", hint: "Hverdagssamling" },
                { id: "large", label: "80+ flasker", hint: "Lagring og seriøs samling" },
                { id: "unknown", label: "Ved ikke", hint: "Vis flere størrelser" },
              ] as { id: CoolerFinderCapacity; label: string; hint: string }[]
            ).map((opt) => (
              <button
                key={opt.id}
                type="button"
                className={`${btnBase} ${btnIdle}`}
                onClick={() => {
                  setCapacity(opt.id);
                  setStep(3);
                }}
              >
                {opt.label}
                <span className="mt-0.5 block text-xs font-normal text-stone-500">{opt.hint}</span>
              </button>
            ))}
          </div>
        </fieldset>
      ) : null}

      {step === 3 ? (
        <fieldset className="mt-4">
          <legend className="text-base font-semibold text-stone-900">Én eller to temperaturzoner?</legend>
          <p className="mt-1 text-sm text-stone-600">
            To zoner er populært, hvis du både vil have kølig hvid/rosé og lidt varmere rød. Én zone er enklere og ofte billigere.
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {(
              [
                { id: "one", label: "Én zone", hint: "Én type vin ad gangen" },
                { id: "two", label: "To zoner", hint: "Hvid og rød samtidig" },
                { id: "unknown", label: "Ved ikke", hint: "Vis begge" },
              ] as { id: CoolerFinderZones; label: string; hint: string }[]
            ).map((opt) => (
              <button
                key={opt.id}
                type="button"
                className={`${btnBase} ${btnIdle}`}
                onClick={() => {
                  setZones(opt.id);
                  setStep(4);
                }}
              >
                {opt.label}
                <span className="mt-0.5 block text-xs font-normal text-stone-500">{opt.hint}</span>
              </button>
            ))}
          </div>
        </fieldset>
      ) : null}

      {step === 4 ? (
        <fieldset className="mt-4">
          <legend className="text-base font-semibold text-stone-900">Hvad er dit max-budget?</legend>
          <p className="mt-1 text-sm text-stone-600">Valgfrit — du kan altid søge igen uden prisloft.</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {(
              [
                { id: 8000, label: "Under 8.000 kr" },
                { id: 15000, label: "Under 15.000 kr" },
                { id: 25000, label: "Under 25.000 kr" },
                { id: null, label: "Ingen grænse" },
              ] as { id: CoolerFinderBudget; label: string }[]
            ).map((opt) => (
              <button
                key={String(opt.id)}
                type="button"
                className={`${btnBase} ${btnIdle}`}
                onClick={() => finish(opt.id)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </fieldset>
      ) : null}

      {step > 1 ? (
        <button
          type="button"
          className="mt-4 text-sm font-medium text-rose-900 hover:underline"
          onClick={() => setStep((s) => (s > 1 ? ((s - 1) as Step) : s))}
        >
          ← Forrige
        </button>
      ) : null}
    </div>
  );
}
