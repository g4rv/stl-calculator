import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addStlFilesAsync } from "./thunks";
import { STLFile } from "./types";

type STLFilesState = STLFile[];

const initialState: STLFilesState = [];

const stlFilesSlice = createSlice({
  name: "stl-files",
  initialState,
  reducers: {
    removeStlFile: (state, action: PayloadAction<string>) => {
      return state.filter((file) => file.name !== action.payload);
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

export const { removeStlFile } = stlFilesSlice.actions;
export default stlFilesSlice.reducer;
