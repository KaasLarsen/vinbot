import Image from "next/image";
import { getRecipeImageAlt, getRecipeImagePath } from "@/lib/recipe-images";

type Props = {
  slug: string;
  title: string;
  priority?: boolean;
};

export function RecipeHeroImage({ slug, title, priority = true }: Props) {
  const src = getRecipeImagePath(slug);
  const alt = getRecipeImageAlt(title);

  return (
    <figure className="relative mx-auto mt-8 aspect-[16/10] w-full max-w-2xl overflow-hidden rounded-2xl bg-stone-100 shadow-sm ring-1 ring-stone-200/80 sm:max-w-3xl">
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 672px, 768px"
        className="object-cover object-center"
      />
    </figure>
  );
}
