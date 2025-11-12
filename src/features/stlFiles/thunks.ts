import getGrammsFromSTL from "@/utils/getGrammsFromSTL";
import { roundTo } from "@/utils/roundTo";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/lib/store";
import { STLFile } from "./types";

export const addStlFilesAsync = createAsyncThunk<
  STLFile[],
  File[],
  { state: RootState }
>(
  "stl-files/addStlFilesAsync",
  async (files: File[], { getState }) => {
    const state = getState();
    const priceMultiplier = state.stlFiles.priceMultiplier;

    const processed = await Promise.all(
      files.map(async (file) => {
        const grams = await getGrammsFromSTL(file);
        return {
          name: file.name.replace(/\.stl/gi, "").replace(/\_/g, " "),
          URL: URL.createObjectURL(file),
          modelWeight: roundTo(grams),
          quantity: 1,
          price: roundTo((priceMultiplier * grams) / 1.2),
          includePaint: false,
        } as STLFile;
      })
    );

    return processed;
  }
);
