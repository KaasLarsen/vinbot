import type { ComponentProps } from "react";
import { GuideMdxShopPicks } from "@/components/guide-mdx-shop-picks";

export function createGuideMdxComponents(headingIds: string[] = []) {
  let h2Index = 0;

  return {
    GuideMdxShopPicks,
    a: (props: ComponentProps<"a">) => (
      <a
        {...props}
        className="text-rose-800 underline decoration-rose-300 underline-offset-2 hover:text-rose-950"
      />
    ),
    h2: (props: ComponentProps<"h2">) => {
      const id = headingIds[h2Index++] ?? props.id;
      return (
        <h2
          {...props}
          id={id}
          className="mt-12 scroll-mt-24 text-2xl font-semibold tracking-tight text-stone-900 first:mt-0"
        />
      );
    },
    h3: (props: ComponentProps<"h3">) => (
      <h3 {...props} className="mt-8 text-xl font-semibold text-stone-900" />
    ),
    p: (props: ComponentProps<"p">) => (
      <p {...props} className="mt-4 text-lg leading-relaxed text-stone-700" />
    ),
    ul: (props: ComponentProps<"ul">) => (
      <ul {...props} className="mt-4 list-disc space-y-2 pl-6 text-lg text-stone-700" />
    ),
    ol: (props: ComponentProps<"ol">) => (
      <ol {...props} className="mt-4 list-decimal space-y-2 pl-6 text-lg text-stone-700" />
    ),
    strong: (props: ComponentProps<"strong">) => (
      <strong {...props} className="font-semibold text-stone-900" />
    ),
    table: (props: ComponentProps<"table">) => (
      <div className="mt-6 overflow-x-auto rounded-lg border border-stone-200">
        <table {...props} className="w-full min-w-[20rem] border-collapse text-left text-base text-stone-700" />
      </div>
    ),
    thead: (props: ComponentProps<"thead">) => (
      <thead {...props} className="bg-stone-100 text-stone-900" />
    ),
    tbody: (props: ComponentProps<"tbody">) => (
      <tbody {...props} className="divide-y divide-stone-200" />
    ),
    tr: (props: ComponentProps<"tr">) => <tr {...props} className="even:bg-stone-50/80" />,
    th: (props: ComponentProps<"th">) => (
      <th {...props} className="px-3 py-2.5 text-sm font-semibold sm:px-4" />
    ),
    td: (props: ComponentProps<"td">) => (
      <td {...props} className="px-3 py-2.5 align-top text-sm leading-relaxed sm:px-4 sm:text-base" />
    ),
  };
}

/** Default components when no TOC ids are needed. */
export const guideMdxComponents = createGuideMdxComponents();
