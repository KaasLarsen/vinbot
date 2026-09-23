#!/usr/bin/env node
/** Vin-tilbehør 40 batch 1: 10 nye kondimenter (#31–40). */
import { runBatch } from "./add-recipes-tilbehor30-lib.mjs";
import {
  RECIPES,
  GUIDE_RECIPE_ADDITIONS,
  SLUG_EXPANSIONS,
  UPDATED,
} from "./recipes-tilbehor40-batch1-data.mjs";

runBatch({
  RECIPES,
  GUIDE_RECIPE_ADDITIONS,
  SLUG_EXPANSIONS,
  UPDATED,
  label: "Tilbehør 40 batch 1",
});
