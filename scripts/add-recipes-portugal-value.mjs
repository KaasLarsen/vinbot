#!/usr/bin/env node
import { runBatch } from "./add-recipes-tilbehor30-lib.mjs";
import {
  RECIPES,
  GUIDE_RECIPE_ADDITIONS,
  SLUG_EXPANSIONS,
  UPDATED,
} from "./recipes-portugal-value-data.mjs";

runBatch({
  RECIPES,
  GUIDE_RECIPE_ADDITIONS,
  SLUG_EXPANSIONS,
  UPDATED,
  label: "Portugal value (bifana/prego/cataplana)",
});
