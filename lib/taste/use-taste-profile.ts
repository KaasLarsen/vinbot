"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import {
  TASTE_PROFILE_EVENT,
  TASTE_PROFILE_KEY,
  clearStoredTasteProfile,
  getStoredTasteProfile,
  profileIsReady,
  setStoredTasteProfile,
} from "@/lib/taste/storage";
import type { TasteProfile, TasteRatedWine } from "@/lib/taste/types";

/** Cache snapshot så useSyncExternalStore ikke får nyt objekt hver gang (uendelige re-renders). */
let snapshotRaw: string | null | undefined = undefined;
let snapshotProfile: TasteProfile | null = null;

function readCachedSnapshot(): TasteProfile | null {
  if (typeof window === "undefined") return null;
  let raw: string | null;
  try {
    raw = localStorage.getItem(TASTE_PROFILE_KEY);
  } catch {
    raw = null;
  }
  if (raw === snapshotRaw) return snapshotProfile;
  snapshotRaw = raw;
  snapshotProfile = getStoredTasteProfile();
  return snapshotProfile;
}

function invalidateSnapshotCache() {
  snapshotRaw = undefined;
  snapshotProfile = null;
}

function subscribe(onStoreChange: () => void) {
  const notify = () => {
    invalidateSnapshotCache();
    onStoreChange();
  };
  window.addEventListener(TASTE_PROFILE_EVENT, notify);
  window.addEventListener("storage", notify);
  return () => {
    window.removeEventListener(TASTE_PROFILE_EVENT, notify);
    window.removeEventListener("storage", notify);
  };
}

function getSnapshot(): TasteProfile | null {
  return readCachedSnapshot();
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
