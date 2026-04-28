/** Eksternt link til Vivino — ingen scores på Vinbot (kræver officielt syndikerings-setup). */

export function VivinoCommunityLink({ href }: { href: string }) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-stone-900">Brugerbedømmelser på Vivino</h2>
      <p className="mt-3 text-sm leading-relaxed text-stone-700">
        Se community-score, antal bedømmelser og flaskedetaljer på Vivino — åbn herfra og søg på navnet på flasken.
      </p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex rounded-xl bg-[#a61a30] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#8c1428]"
      >
        Åbn Vivino
      </a>
    </div>
  );
}
