import getGrammsFromSTL from "@/utils/getGrammsFromSTL";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { STLFile } from "./types";

export const addStlFilesAsync = createAsyncThunk<STLFile[], File[]>(
  "stl-files/addStlFilesAsync",
  async (files: File[]) => {
    const processed = await Promise.all(
      files.map(async (file) => {
        const grams = await getGrammsFromSTL(file);
        return {
          name: file.name,
          URL: URL.createObjectURL(file),
          modelWeight: grams,
          quantity: 1,
          price: 0,
          includePaint: false,
        } as STLFile;
      })
    );

    return processed;
  }
);
