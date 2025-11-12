import { roundTo } from "@/utils/roundTo";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addStlFilesAsync } from "./thunks";
import { STLFile } from "./types";

const initialState: {
  files: STLFile[];
  priceMultiplier: number;
} = {
  files: [],
  priceMultiplier: 40,
};

const stlFilesSlice = createSlice({
  name: "stl-files",
  initialState,
  reducers: {
    removeStlFile: (state, action: PayloadAction<string>) => {
      state.files = state.files.filter((file) => file.name !== action.payload);
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      state.files = state.files.map((file) => {
        if (file.name === action.payload)
          return { ...file, quantity: Math.min(file.quantity + 1, 99999) };
        return file;
      });
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      state.files = state.files.map((file) => {
        if (file.name === action.payload)
          return { ...file, quantity: Math.max(file.quantity - 1, 1) };
        return file;
      });
    },
    setQuantity: (
      state,
      action: PayloadAction<{ name: string; quantity: number }>
    ) => {
      state.files = state.files.map((file) => {
        if (file.name === action.payload.name) {
          return { ...file, quantity: action.payload.quantity };
        }
        return file;
      });
    },

    setIncludePaint: (
      state,
      action: PayloadAction<{ name: string; includePaint: boolean }>
    ) => {
      state.files = state.files.map((file) => {
        if (file.name === action.payload.name)
          return {
            ...file,
            includePaint: action.payload.includePaint,
            price: roundTo(
              action.payload.includePaint ? file.price * 1.1 : file.price / 1.1
            ),
          };
        return file;
      });
    },
    setPriceMultiplier: (state, action: PayloadAction<number>) => {
      state.priceMultiplier = action.payload;
      // Update all file prices with new multiplier
      state.files = state.files.map((file) => ({
        ...file,
        price: roundTo((state.priceMultiplier * file.modelWeight) / 1.2),
      }));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addStlFilesAsync.fulfilled, (state, action) => {
      action.payload.forEach((currFile) => {
        const duplicate = state.files.find((file) => file.name === currFile.name);
        if (!duplicate) {
          state.files.push(currFile);
        }
      });
    });
  },
});

export const {
  removeStlFile,
  incrementQuantity,
  decrementQuantity,
  setIncludePaint,
  setQuantity,
  setPriceMultiplier,
} = stlFilesSlice.actions;
export default stlFilesSlice.reducer;
