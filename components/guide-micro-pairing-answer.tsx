import type { MicroPairing } from "@/lib/growth/micro-pairings";

function titleCaseWine(wine: string): string {
  return wine
    .split(/\s+/)
    .map((part) => {
      if (!part) return part;
      if (part.includes("'")) {
        return part
          .split("'")
          .map((bit) => (bit ? bit.charAt(0).toUpperCase() + bit.slice(1) : bit))
          .join("'");
      }
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join(" ");
}

type Row = { label: string; wine: string; tone: "default" | "alt" | "avoid" };

export function GuideMicroPairingAnswer({ pairing }: { pairing: MicroPairing }) {
  const rows: Row[] = [
    { label: "Default", wine: pairing.defaultWine, tone: "default" },
    { label: "Alternativ", wine: pairing.altWine, tone: "alt" },
    { label: "Undgå", wine: pairing.avoidWine, tone: "avoid" },
  ];

  return (
    <section
      className="not-prose mt-8 border-b border-stone-200 pb-8"
      aria-labelledby="micro-pairing-answer"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">Kort svar</p>
      <h2 id="micro-pairing-answer" className="mt-1 text-xl font-semibold text-stone-900">
        Vinvalget
      </h2>
      <dl className="mt-5 divide-y divide-stone-200 border-y border-stone-200">
        {rows.map((row) => (
          <div key={row.label} className="grid grid-cols-[7.5rem_1fr] gap-3 py-3 sm:grid-cols-[9rem_1fr]">
            <dt
              className={
                row.tone === "avoid"
                  ? "text-sm font-medium text-stone-500"
                  : "text-sm font-medium text-stone-700"
              }
            >
              {row.label}
            </dt>
            <dd
              className={
                row.tone === "avoid"
                  ? "text-base text-stone-500 line-through decoration-stone-300"
                  : "text-base font-semibold text-stone-900"
              }
            >
              {titleCaseWine(row.wine)}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-base leading-relaxed text-stone-600">{pairing.delta}</p>
    </section>
  );
}
