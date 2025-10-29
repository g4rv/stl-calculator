import { roundTo } from "@/utils/roundTo";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addStlFilesAsync } from "./thunks";
import { STLFile } from "./types";

const initialState: STLFile[] = [];

const stlFilesSlice = createSlice({
  name: "stl-files",
  initialState,
  reducers: {
    removeStlFile: (state, action: PayloadAction<string>) => {
      return state.filter((file) => file.name !== action.payload);
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      return state.map((file) => {
        if (file.name === action.payload)
          return { ...file, quantity: file.quantity + 1 };
        return file;
      });
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      return state.map((file) => {
        if (file.name === action.payload)
          return { ...file, quantity: file.quantity - 1 };
        return file;
      });
    },
    setQuantity: (
      state,
      action: PayloadAction<{ name: string; quantity: number }>
    ) =>
      state.map((file) => {
        if (file.name === action.payload.name) {
          console.log(state);
          return { ...file, quantity: action.payload.quantity };
        }
        return file;
      }),

    setIncludePaint: (
      state,
      action: PayloadAction<{ name: string; includePaint: boolean }>
    ) => {
      return state.map((file) => {
        if (file.name === action.payload.name)
          return { ...file, includePaint: action.payload.includePaint, price: roundTo(action.payload.includePaint ? file.price * 1.1 : file.price / 1.1) };
        return file;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addStlFilesAsync.fulfilled, (state, action) => {
      return action.payload.reduce(
        (acc, currFile) => {
          const duplicate = state.find((file) => file.name === currFile.name);
          if (duplicate) return acc;
          return [...acc, currFile];
        },
        [...state]
      );
    });
  },
});

export const {
  removeStlFile,
  incrementQuantity,
  decrementQuantity,
  setIncludePaint,
  setQuantity,
} = stlFilesSlice.actions;
export default stlFilesSlice.reducer;
