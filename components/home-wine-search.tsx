"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { WineSearch } from "@/components/wine-search";

type HomeWineSearchProps = {
  controlsClassName?: string;
  resultsClassName?: string;
};

function HomeWineSearchInner({ controlsClassName, resultsClassName }: HomeWineSearchProps) {
  const params = useSearchParams();
  const q = params.get("q") ?? undefined;
  const maxRaw = params.get("max");
  const parsedMax = maxRaw != null ? parseInt(maxRaw, 10) : Number.NaN;
  const initialMax = Number.isFinite(parsedMax) ? parsedMax : undefined;

  return (
    <WineSearch
      initialQuery={q}
      initialMax={initialMax}
      controlsClassName={controlsClassName}
      resultsClassName={resultsClassName}
    />
  );
}

/** Læser ?q= og ?max= på klienten så forsiden kan caches statisk uden searchParams på serveren. */
export function HomeWineSearch(props: HomeWineSearchProps) {
  return (
    <Suspense
      fallback={
        <WineSearch
          controlsClassName={props.controlsClassName}
          resultsClassName={props.resultsClassName}
        />
      }
    >
      <HomeWineSearchInner {...props} />
    </Suspense>
  );
}
