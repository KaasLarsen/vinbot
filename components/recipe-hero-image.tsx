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
    <figure className="relative -mx-4 mt-8 aspect-[4/3] overflow-hidden sm:mx-0 sm:rounded-2xl sm:ring-1 sm:ring-stone-200/80">
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, 768px"
        className="object-cover object-center"
      />
    </figure>
  );
}
