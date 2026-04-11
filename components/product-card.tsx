import type { ProductHit } from "@/lib/search/types";

export function ProductCard({ product }: { product: ProductHit }) {
  const price =
    product.price != null
      ? new Intl.NumberFormat("da-DK", { style: "currency", currency: product.currency || "DKK" }).format(product.price)
      : null;

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-stone-200/90 bg-white shadow-sm transition hover:shadow-md">
      <a href={product.url} target="_blank" rel="nofollow sponsored noopener noreferrer" className="block aspect-square bg-stone-100">
        {product.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.image} alt="" className="h-full w-full object-contain p-3" loading="lazy" />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-stone-400">Intet billede</div>
        )}
      </a>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-rose-800/90">{product.merchant}</p>
        <h3 className="line-clamp-2 text-base font-semibold leading-snug text-stone-900">
          <a href={product.url} target="_blank" rel="nofollow sponsored noopener noreferrer" className="hover:underline">
            {product.title}
          </a>
        </h3>
        {price && <p className="text-lg font-semibold text-stone-800">{price}</p>}
        <a
          href={product.url}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          className="mt-auto inline-flex items-center justify-center rounded-xl bg-rose-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-rose-950"
        >
          Se hos forhandler
        </a>
      </div>
    </article>
  );
}
