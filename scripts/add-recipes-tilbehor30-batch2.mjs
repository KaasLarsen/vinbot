#!/usr/bin/env node
/** Vin-tilbehør batch 2: ost/tapas + middagsglace + guide-recipe-links. */
import { runBatch } from "./add-recipes-tilbehor30-lib.mjs";
import {
  RECIPES,
  GUIDE_RECIPE_ADDITIONS,
  SLUG_EXPANSIONS,
  UPDATED,
} from "./recipes-tilbehor30-batch2-data.mjs";

runBatch({
  RECIPES,
  GUIDE_RECIPE_ADDITIONS,
  SLUG_EXPANSIONS,
  UPDATED,
  label: "Tilbehør batch 2",
});
