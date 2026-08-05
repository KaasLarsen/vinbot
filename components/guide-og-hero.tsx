type Props = {
  slug: string;
  title: string;
};

/** Viser guide-specifik OG-grafik som hero — matcher det Google/social ser i preview. */
export function GuideOgHero({ slug, title }: Props) {
  const src = `/guides/${slug}/opengraph-image`;
  return (
    <figure className="not-prose mt-8 overflow-hidden rounded-2xl border border-stone-200 bg-stone-50 shadow-sm ring-1 ring-stone-200/80">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        width={1200}
        height={630}
        className="h-auto w-full object-cover"
        loading="eager"
        decoding="async"
      />
      <figcaption className="px-4 py-2 text-center text-xs text-stone-500">{title}</figcaption>
    </figure>
  );
}
