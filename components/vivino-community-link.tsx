/**
 * Link til Vivino-søgning med visuelle stjerner (ingen score på Vinbot —
 * Vivino leverer ikke et officielt syndikerings-API til små sites).
 */

export function VivinoCommunityLink({
  href,
}: {
  href: string;
}) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-stone-900">Vivino-brugerbedømmelse</h2>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <div className="flex gap-1 text-2xl leading-none text-stone-300" aria-hidden>
          {"☆☆☆☆☆".split("").map((ch, i) => (
            <span key={i}>{ch}</span>
          ))}
        </div>
        <span className="text-xs font-medium uppercase tracking-wide text-stone-500">Community-score på Vivino</span>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-stone-700">
        Vivinos egne tal (gennemsnit ud af fem og antal stemmer) vises på Vivinos side — åbn linket herunder for den aktuelle score på denne vin og flere detaljer.
      </p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex rounded-xl bg-[#a61a30] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#8c1428]"
      >
        Åbn på Vivino og se score
      </a>
    </div>
  );
}
