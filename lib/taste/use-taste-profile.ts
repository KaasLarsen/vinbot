"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import {
  TASTE_PROFILE_EVENT,
  clearStoredTasteProfile,
  getStoredTasteProfile,
  profileIsReady,
  setStoredTasteProfile,
} from "@/lib/taste/storage";
import type { TasteProfile, TasteRatedWine } from "@/lib/taste/types";

function subscribe(onStoreChange: () => void) {
  window.addEventListener(TASTE_PROFILE_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(TASTE_PROFILE_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function getSnapshot(): TasteProfile | null {
  return getStoredTasteProfile();
}

function getServerSnapshot(): TasteProfile | null {
  return null;
}

export function useTasteProfile() {
  const profile = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const ready = profileIsReady(profile);

  const save = useCallback((ratings: TasteRatedWine[]) => {
    return setStoredTasteProfile(ratings);
  }, []);

  const clear = useCallback(() => {
    clearStoredTasteProfile();
  }, []);

  return { profile, ready, vector: ready ? profile?.vector ?? null : null, save, clear };
}

/** Én-gangs flag til at åbne wizard fra CTA. */
export function useTasteWizardOpen() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("vinbot-open-taste-wizard", onOpen);
    return () => window.removeEventListener("vinbot-open-taste-wizard", onOpen);
  }, []);
  return { open, setOpen };
}

export function openTasteWizard() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("vinbot-open-taste-wizard"));
}
