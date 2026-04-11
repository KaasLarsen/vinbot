import type { ComponentProps } from "react";

export const guideMdxComponents = {
  a: (props: ComponentProps<"a">) => (
    <a {...props} className="text-rose-800 underline decoration-rose-300 underline-offset-2 hover:text-rose-950" />
  ),
  h2: (props: ComponentProps<"h2">) => (
    <h2 {...props} className="mt-12 scroll-mt-24 text-2xl font-semibold tracking-tight text-stone-900 first:mt-0" />
  ),
  h3: (props: ComponentProps<"h3">) => <h3 {...props} className="mt-8 text-xl font-semibold text-stone-900" />,
  p: (props: ComponentProps<"p">) => <p {...props} className="mt-4 text-lg leading-relaxed text-stone-700" />,
  ul: (props: ComponentProps<"ul">) => (
    <ul {...props} className="mt-4 list-disc space-y-2 pl-6 text-lg text-stone-700" />
  ),
  ol: (props: ComponentProps<"ol">) => (
    <ol {...props} className="mt-4 list-decimal space-y-2 pl-6 text-lg text-stone-700" />
  ),
  strong: (props: ComponentProps<"strong">) => <strong {...props} className="font-semibold text-stone-900" />,
};
