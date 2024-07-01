import axios from 'axios'
import React, { useEffect } from 'react'

export default function Catalog() {

    useEffect(()=>{
        const retriveCatBread=async()=>{
            const response = await axios.get("https://api.thecatapi.com/v1/breeds?limit=20")
            console.log(response.data);
        }
        retriveCatBread()
    },[])
  return (
    <div>Catalog</div>
  )
}
