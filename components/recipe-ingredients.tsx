export function RecipeIngredients({ items }: { items: string[] }) {
  return (
    <section className="not-prose">
      <h2 className="text-xl font-semibold text-stone-900">Ingredienser</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-stone-800">
        {items.map((item, i) => (
          <li key={i} className="leading-relaxed">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
