"use client";

import { useState, type ReactNode } from "react";
import { WineQuantityCalculator } from "@/components/wine-quantity-calculator";

export function HomeFeatureGrid({
  deals,
  moment,
  codes,
}: {
  deals: ReactNode;
  moment: ReactNode;
  codes: ReactNode;
}) {
  const [calcOpen, setCalcOpen] = useState(false);

  return (
    <div className="mt-6 grid items-stretch gap-4 md:grid-cols-2 md:gap-5">
      <WineQuantityCalculator
        variant="compact"
        defaultCollapsed
        heading="Hvor mange flasker til festen?"
        intro="Angiv gæster og festtype — få Vinbot-formlen med 15 % buffer."
        className="h-full"
        onExpandedChange={setCalcOpen}
      />
      <div className={calcOpen ? "md:self-start" : "flex h-full flex-col [&>*]:h-full [&>*]:flex-1"}>
        {deals}
      </div>
      <div className="flex h-full flex-col [&>*]:h-full [&>*]:flex-1">{moment}</div>
      <div className="flex h-full flex-col [&>*]:h-full [&>*]:flex-1">{codes}</div>
    </div>
  );
}
