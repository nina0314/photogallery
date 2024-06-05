import { PayloadAction, createSlice } from "@reduxjs/toolkit";

//Create interface with properties
interface ImageState {
  //Initialise properties and it's corresponding types
  value: string;
  loading: boolean;
  error: string;
  images: string[];
  page: number;
}

//Initialise the intialState of the image when first rendered
const initialState: ImageState = {
  //Set all properties to default values
  value: "",
  loading: false,
  error: "",
  images: [],
  page: 1,
};

//Create reducers and call initialState in the createSlice function of redux toolkit
const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    //Returns the keyword value whenever the findKeyword function is called
    findKeyword: (
      state,
      action: PayloadAction<{ keyword: string; page?: number }>
    ) => {
      state.value = action.payload.keyword;
      if (action.payload.page) {
        state.page = action.payload.page;
      } else {
        state.page = 1;
      }
    },
    //Returns the loading state when findKeyWordLoading is called
    findKeyWordLoading: (state) => {
      state.loading = true;
    },

    //Returns the loading state as false and assigns the images property in the state as the parameter action
    findKeyWordSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      if (state.images.length !== 0) {
        state.images = [...state.images, action.payload];
      } else {
        state.images = [action.payload];
      }
    },
    ///Returns the loading state as false and assings the error property in the state as the parameter action
    findKeyWordReject: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    findKeywordNoPage: (
      state,
      action: PayloadAction<{ keyword: string; page: number }>
    ) => {
      state.value = action.payload.keyword;
      state.page = action.payload.page;
    },
  },
});

//Exports the reducers
export const {
  findKeyword,
  findKeyWordSuccess,
  findKeyWordLoading,
  findKeyWordReject,
} = imageSlice.actions;

//Exports the slice and reducers
export default imageSlice.reducer;
