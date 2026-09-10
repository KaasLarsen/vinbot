export type CoolerFinderPlacement = "integrerbar" | "fritstaende" | "unknown";
export type CoolerFinderCapacity = "small" | "medium" | "large" | "unknown";
export type CoolerFinderZones = "one" | "two" | "unknown";
export type CoolerFinderBudget = 8000 | 15000 | 25000 | null;

export type CoolerFinderAnswers = {
  placement: CoolerFinderPlacement;
  capacity: CoolerFinderCapacity;
  zones: CoolerFinderZones;
  budget: CoolerFinderBudget;
};

export type CoolerFinderSearch = {
  q: string;
  max: number | null;
  summary: string;
};

const PLACEMENT_TERMS: Record<CoolerFinderPlacement, string[]> = {
  integrerbar: ["integrerbar", "indbygning"],
  fritstaende: ["fritstående"],
  unknown: [],
};

const CAPACITY_TERMS: Record<CoolerFinderCapacity, string[]> = {
  small: ["15", "18", "24", "30", "flasker", "kompakt"],
  medium: ["50", "60", "70", "77", "flasker"],
  large: ["vinlagring", "100", "150", "flasker"],
  unknown: [],
};

const PLACEMENT_LABEL: Record<CoolerFinderPlacement, string | null> = {
  integrerbar: "Integrerbart",
  fritstaende: "Fritstående",
  unknown: null,
};

const CAPACITY_LABEL: Record<CoolerFinderCapacity, string | null> = {
  small: "op til ca. 30 flasker",
  medium: "30–80 flasker",
  large: "80+ flasker",
  unknown: null,
};

const ZONES_LABEL: Record<CoolerFinderZones, string | null> = {
  one: null,
  two: "to zoner",
  unknown: null,
};

export function buildWineCoolerFinderSearch(answers: CoolerFinderAnswers): CoolerFinderSearch {
  const parts: string[] = [];
  parts.push(...PLACEMENT_TERMS[answers.placement]);
  parts.push(...CAPACITY_TERMS[answers.capacity]);
  if (answers.zones === "two") parts.push("to", "temperaturzoner");

  const q = parts.length ? parts.join(" ") : "vinkøleskab";
  const max = answers.budget;

  const summaryBits = [
    PLACEMENT_LABEL[answers.placement],
    CAPACITY_LABEL[answers.capacity],
    ZONES_LABEL[answers.zones],
    max != null ? `max ${max.toLocaleString("da-DK")} kr` : null,
  ].filter((bit): bit is string => Boolean(bit));

  return {
    q,
    max,
    summary: summaryBits.length ? summaryBits.join(" · ") : "Alle vinkøleskabe",
  };
}
