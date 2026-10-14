import Link from "next/link";
import { getChainsByGuideSlug } from "@/lib/supermarket/chains";

/** Kort bannér på evergreen-kædeguides, op til månedens /vin-i-side. */
export function SupermarketGuideBanner({ guideSlug }: { guideSlug: string }) {
  const chains = getChainsByGuideSlug(guideSlug);
  if (chains.length === 0) return null;

  return (
    <aside className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm text-stone-800">
      <p className="font-medium text-stone-900">Lige nu på hylden</p>
      <p className="mt-1 text-stone-700">
        Månedens side siger, hvad du går efter — og samme stil online, hvis hylden er tom.
      </p>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
        {chains.map((chain) => (
          <li key={chain.slug}>
            <Link href={`/vin-i/${chain.slug}`} className="font-medium text-rose-900 hover:underline">
              Bedste vin i {chain.name} lige nu
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
