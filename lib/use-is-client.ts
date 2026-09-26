"use client";

import { useSyncExternalStore } from "react";

function subscribe() {
  return () => {};
}

/** Sandt efter hydration, så server-HTML ikke afhænger af localStorage. */
export function useIsClient(): boolean {
  return useSyncExternalStore(subscribe, () => true, () => false);
}
