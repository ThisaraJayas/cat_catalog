import { createSlice } from "@reduxjs/toolkit";
import { fetchBreedDetails, fetchBreeds } from "./CatBreedAction";

export interface CatBreed {
  id: number;
  name: string;
  description: string;
  reference_image_id: string;
  origin: string;
  life_span: string;
}

export interface CatImage {
  url: string;
}
interface BreedsState {
  breeds: CatBreed[];
  selectedBreed: CatBreed | null;
  selectedBreedImage: CatImage | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}
const initialState: BreedsState = {
  breeds: [],
  status: "idle",
  selectedBreed: null,
  selectedBreedImage: null,
};

//here we create cat breed slice
export const CatBreedSlice = createSlice({
  name: "catBreeds",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //fetch all cat breed cases
    builder.addCase(fetchBreeds.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchBreeds.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.breeds = action.payload ?? [];
    });
    builder.addCase(fetchBreeds.rejected, (state) => {
      state.status = "failed";
    });
    //fetch single selected cat breed cases
    builder.addCase(fetchBreedDetails.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchBreedDetails.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.selectedBreed = action.payload?.breed ?? null;
      state.selectedBreedImage = action.payload?.image ?? null;
    });
    builder.addCase(fetchBreedDetails.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export default CatBreedSlice.reducer;
