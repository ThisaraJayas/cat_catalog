import { createSlice } from "@reduxjs/toolkit";

export interface CatBreed{
    id: string,
    name: string
}

const initialState = {

};

export const CatBreedSlice = createSlice({
  name: 'catBreeds',
  initialState,
  reducers: {
    
  },
});


export default CatBreedSlice.reducer;