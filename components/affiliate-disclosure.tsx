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
        Vinbot indeholder annoncer og links, hvor vi kan få provision, når du handler hos en forhandler. Det er uden ekstra omkostning for
        dig hos butikken. Vi viser vej til udvalg hos flere forhandlere; tjek altid pris, levering og vilkår hos forhandleren før du køber.
      </p>
    </aside>
  );
}
