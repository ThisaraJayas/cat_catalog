import axios from 'axios'
import React, { useEffect, useState } from 'react'

interface Cat{
    id :number;
    name: string;
}
export default function Catalog() {

    const [catData, setCatData]= useState<Cat[]>([])

    console.log(catData);
    
    useEffect(()=>{
        const retriveCatBreed=async()=>{
            try{
                const response = await axios.get("https://api.thecatapi.com/v1/breeds?limit=20")
                console.log(response.data);
                setCatData(response.data)
                
            }catch(error){
                console.log(error);
            }
        }
        retriveCatBreed()
    },[])
  return (
    <ul>
        {catData.map((breed) => (
          <li key={breed.id}>{breed.name}</li>
        ))}
      </ul>
  )
}
