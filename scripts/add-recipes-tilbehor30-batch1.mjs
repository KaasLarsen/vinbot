#!/usr/bin/env node
/** Vin-tilbehør batch 1: burger/sandwich-toppings + guide-recipe-links.
 *  Billeder: generér madfotos og kopiér til public/images/recipes/. */
import { runBatch } from "./add-recipes-tilbehor30-lib.mjs";
import {
  RECIPES,
  GUIDE_RECIPE_ADDITIONS,
  SLUG_EXPANSIONS,
  UPDATED,
} from "./recipes-tilbehor30-batch1-data.mjs";

runBatch({
  RECIPES,
  GUIDE_RECIPE_ADDITIONS,
  SLUG_EXPANSIONS,
  UPDATED,
  label: "Tilbehør batch 1",
});
