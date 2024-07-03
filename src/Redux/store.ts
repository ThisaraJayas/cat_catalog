import { configureStore } from "@reduxjs/toolkit";
import catBreedReducer from "./CatBreed/CatBreedSlice";

export const store = configureStore({
  reducer: {
    catBreed: catBreedReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
