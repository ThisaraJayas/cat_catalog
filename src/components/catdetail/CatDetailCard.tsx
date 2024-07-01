import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import '../../styles/catdetail.css'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

interface CatBreed{
    id: string;
  name: string;
  description: string;
    reference_image_id: string;
    origin:string;
    life_span:string
}
interface CatImage{
    url: string
}
export default function CatDetailCard() {
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
            console.log(response.data);
            
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
          <div className="flex items-center mt-3 ml-3 cursor-pointer">
            <Link to={'/'}><ArrowBackIosIcon /></Link>
            <h1 className='text-4xl font-bold text-center mb-3 flex-grow'>{catBreed.name}</h1>
          </div>
          <div className="detail-container">
            <div className="flex justify-center mb-4">
              <img className="cat-image rounded-lg" src={catImage.url} alt={catBreed.name} />
            </div>
            <div className="cat-details">
              <p className='text-2xl mb-2'><b>Origins : </b>{catBreed.origin}</p>
              <p className='text-2xl mb-2'><b>Life Span : </b>{catBreed.life_span}</p>
              <p className="text-2xl mb-2"><b>Description : </b></p>
              <p className='text-1xl mb-2'>{catBreed.description}</p>
            </div>
          </div>
        </div>
  )
}
