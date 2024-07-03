import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CatBreed } from "./CatBreedSlice";
import { CAT_API_URL, CAT_IMAGE_URL } from "../../api_url";

//fetch all cat breed details
export const fetchBreeds = createAsyncThunk("fetchBreeds", async () => {
  try {
    const response = await axios.get<CatBreed[]>(`${CAT_API_URL}?limit=20`);
    return response.data;
  } catch (error) {
    console.log("error ", error);
  }
});

//fetch cat breed by cat id
export const fetchBreedDetails = createAsyncThunk(
  "fetchBreedDetail",
  async (id: string) => {
    try {
      const response = await axios.get<CatBreed>(`${CAT_API_URL}/${id}`);
      const breed = response.data;

      //fetch cat image
      const imageId = response.data.reference_image_id;
      const breedImage = await axios.get(
        `${CAT_IMAGE_URL}?limit=1&breed_ids=${id}&api_key=${imageId}`
      );
      const image = breedImage.data[0];
      return { breed, image };

    } catch (error) {
      console.log("error ", error);
    }
  }
);
