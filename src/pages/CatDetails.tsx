import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

interface CatBreed{
    id: string;
  name: string;
  description: string;
    reference_image_id: string;
    origin:string
}
interface CatImage{
    url: string
}
export default function CatDetails() {
    const[catBreed,setCatBreed]=useState<CatBreed|null>(null)
    const[catImage,setCatImage]=useState<CatImage|null>(null)
    const {id} = useParams()

    useEffect(() => {
        const retriveBreed = async () => {
          try {
            const response = await axios.get<CatBreed>(
              `https://api.thecatapi.com/v1/breeds/${id}`
            );
            setCatBreed(response.data)
            try{
                const catImage_ID= catBreed?.reference_image_id
                const catImageUrl= await axios.get(`https://api.thecatapi.com/v1/images/search?limit=1&breed_ids=${id}&api_key=${catImage_ID}`)
                setCatImage(catImageUrl.data[0])
                console.log(catImageUrl.data[0].url);
            }catch(error){
                console.log(error);
            }
          } catch (error) {
            console.log(error);
          }
        };
        retriveBreed();
      }, [id]);

      if (!catBreed || !catImage) {
        return <div>Loading...</div>;
      }
  return (
    <div>
        {catBreed.id}
        {catBreed.origin}
        {catBreed.reference_image_id}
       <img src={catImage.url} alt={catBreed.name} style={{ maxWidth: '30%', height: 'auto' }} />
    </div>
  )
}
