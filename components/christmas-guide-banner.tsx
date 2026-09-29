import Link from "next/link";

/** Banneret ligger på hverdagsopskrifter frem til og med 6. januar 2027. */
const VISIBLE_UNTIL_MS = Date.parse("2027-01-07T00:00:00+01:00");

const RECIPE_SLUGS = new Set([
  "roedvinssauce-til-boef",
  "peberboef-med-rodvinsauce",
  "hakkeboef-i-rodvinssauce",
  "medister-i-rodvinssauce",
  "bolognese-med-rodvin",
  "boeuf-bourguignon",
  "svinefilet-i-rodvinssauce",
]);

type Props = { slug: string };

export function ChristmasGuideBanner({ slug }: Props) {
  if (!RECIPE_SLUGS.has(slug) || Date.now() >= VISIBLE_UNTIL_MS) return null;

  return (
    <aside className="not-prose mt-8 overflow-hidden rounded-2xl border border-rose-200 bg-rose-950 text-rose-50 shadow-md">
      <div className="px-5 py-6 sm:px-7 sm:py-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-rose-200/90">Julen 2026</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Vin til hele julebordet
        </h2>
        <p className="mt-2 max-w-2xl text-base text-rose-100/90">
          And, flæskesteg, risalamande og bobler — samlet i den store julevinsguide, med flasker du kan købe nu.
        </p>
        <Link
          href="/guides/vin-til-julemad-den-store-guide"
          className="mt-5 inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-rose-950 shadow-sm hover:bg-rose-100"
        >
          Åbn den store julevinsguide →
        </Link>
        <p className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          <Link href="/guides/vin-til-juleaften" className="font-medium text-white underline decoration-rose-300/80 underline-offset-4 hover:decoration-white">
            Vin til juleaften
          </Link>
          <Link href="/opskrifter/flaesketesteg" className="font-medium text-white underline decoration-rose-300/80 underline-offset-4 hover:decoration-white">
            Flæskesteg
          </Link>
          <Link href="/opskrifter/juleand" className="font-medium text-white underline decoration-rose-300/80 underline-offset-4 hover:decoration-white">
            Juleand
          </Link>
          <Link href="/opskrifter/risalamande" className="font-medium text-white underline decoration-rose-300/80 underline-offset-4 hover:decoration-white">
            Risalamande
          </Link>
        </p>
      </div>
    </aside>
  );
}
