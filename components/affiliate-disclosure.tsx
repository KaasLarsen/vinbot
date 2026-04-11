export function AffiliateDisclosure({ compact }: { compact?: boolean }) {
  if (compact) {
    return (
      <p className="text-sm text-stone-500">
        Annoncelinks: Når du køber via vores links, kan vi modtage provision. Priser og lagerstatus varierer hos forhandlerne.
      </p>
    );
  }
  return (
    <aside className="rounded-2xl border border-amber-200/80 bg-amber-50/80 p-5 text-stone-800">
      <p className="font-semibold text-stone-900">Kommercielt indhold</p>
      <p className="mt-2 text-sm leading-relaxed">
        Vinbot indeholder affiliate-links (fx Partner-Ads) og annoncer. Vi linker til forhandlere med produktfeeds, så du kan sammenligne
        udvalg. Vi opdaterer ikke priser manuelt i realtid — tjek altid pris, levering og vilkår hos forhandleren før køb.
      </p>
    </aside>
  );
}
