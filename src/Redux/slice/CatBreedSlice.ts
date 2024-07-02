import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { CAT_API_URL, CAT_IMAGE_URL } from "../../api_url";

export interface CatBreed{
    id: number;
    name: string;
    description: string;
    reference_image_id: string;
    origin:string;
    life_span:string
}

export interface CatImage{
    url:string
}
interface BreedsState {
    breeds: CatBreed[];
    selectedBreed: CatBreed | null;
    selectedBreedImage: CatImage | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
  }
const initialState:BreedsState = {
    breeds: [],
    status: "idle",
    selectedBreed: null,
    selectedBreedImage: null
};
export const fetchBreeds = createAsyncThunk("fetchBreeds", async()=>{
    try{
        const response = await axios.get<CatBreed[]>(`${CAT_API_URL}?limit=20`)
        return response.data
    }catch(error){
        console.log("error ",error);
        
    }
    
})

export const fetchBreedDetails = createAsyncThunk("fetchBreedDetail",async(id: string)=>{
    try{
        const response = await axios.get<CatBreed>(`${CAT_API_URL}/${id}`)
        const breed = response.data
        const imageId= response.data.reference_image_id
    
        const breedImage = await axios.get(`${CAT_IMAGE_URL}?limit=1&breed_ids=${id}&api_key=${imageId}`)
        const image = breedImage.data[0]
        return {breed , image}
    }catch(error){
        console.log("error ",error);
        
    }
       
   
})
export const CatBreedSlice = createSlice({
  name: 'catBreeds',
  initialState,
  reducers: {},
  extraReducers:(builder)=>{
    builder.addCase(fetchBreeds.pending,(state)=>{
        state.status='loading';
    })
    builder.addCase(fetchBreeds.fulfilled,(state, action)=>{
        state.status='succeeded'
        state.breeds=action.payload??[];
    })
    builder.addCase(fetchBreeds.rejected,(state)=>{
        state.status='failed'
    })
    builder.addCase(fetchBreedDetails.pending,(state)=>{
        state.status='loading';
    })
    builder.addCase(fetchBreedDetails.fulfilled,(state,action)=>{
        state.status='succeeded'
        state.selectedBreed=action.payload?.breed ??null;
        state.selectedBreedImage=action.payload?.image ??null
    })
    builder.addCase(fetchBreedDetails.rejected,(state)=>{
        state.status='failed';
    })
  }
});


export default CatBreedSlice.reducer;