import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ImageState {
  value: string;
}

const initialState: ImageState = {
  value: "",
};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    findKeyword: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { findKeyword } = imageSlice.actions;
export default imageSlice.reducer;
