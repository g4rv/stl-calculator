import { RootState } from "@/lib/store";
import { createSelector } from "@reduxjs/toolkit";
import { STLFile } from "./types";

// Raw STL files array
export const selectStlFiles = (state: RootState): STLFile[] => state.stlFiles;

// Total price (memoized)
export const selectTotalPrice = createSelector([selectStlFiles], (files) =>
  files.reduce((sum, file) => sum + file.price, 0)
);