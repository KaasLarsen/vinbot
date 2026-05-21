export function RecipeSteps({ steps }: { steps: string[] }) {
  return (
    <section className="not-prose">
      <h2 className="text-xl font-semibold text-stone-900">Fremgangsmåde</h2>
      <ol className="mt-4 list-decimal space-y-4 pl-5 text-stone-800">
        {steps.map((step, i) => (
          <li key={i} className="leading-relaxed pl-1">
            {step}
          </li>
        ))}
      </ol>
    </section>
  );
}
