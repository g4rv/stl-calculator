import getGrammsFromSTL from "@/utils/getGrammsFromSTL";
import { roundTo } from "@/utils/roundTo";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { STLFile } from "./types";

export const addStlFilesAsync = createAsyncThunk<STLFile[], File[]>(
  "stl-files/addStlFilesAsync",
  async (files: File[]) => {
    const processed = await Promise.all(
      files.map(async (file) => {
        const grams = await getGrammsFromSTL(file);
        return {
          name: file.name.replace(/\.stl/gi, ""),
          URL: URL.createObjectURL(file),
          modelWeight: roundTo(grams),
          quantity: 1,
          price: roundTo((40 * grams) / 1.2),
          includePaint: false,
        } as STLFile;
      })
    );

    return processed;
  }
);
