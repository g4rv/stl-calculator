import { RootState } from "@/lib/store";
import { roundTo } from "@/utils/roundTo";
import { createSelector } from "@reduxjs/toolkit";
import { STLFile } from "./types";

// Raw STL files array
export const selectStlFiles = (state: RootState): STLFile[] => state.stlFiles.files;

// Price multiplier
export const selectPriceMultiplier = (state: RootState): number => state.stlFiles.priceMultiplier;

// Total price (memoized)
export const selectTotalPrice = createSelector([selectStlFiles], (files) =>
  files.reduce((sum, file) => sum + roundTo(file.price * file.quantity), 0)
);

export const selectTotalWeight = createSelector([selectStlFiles], (files) =>
  files.reduce(
    (sum, file) => sum + roundTo(file.modelWeight * file.quantity),
    0
  )
);
