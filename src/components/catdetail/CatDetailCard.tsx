import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import '../../styles/catdetail.css'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../Redux/store';
import { fetchBreedDetails } from '../../Redux/slice/CatBreedSlice';


export default function CatDetailCard() {
    const {id} = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const {selectedBreed, selectedBreedImage, status}=useSelector((state : RootState)=>state.catBreed)

    useEffect(() => {
      if(id){
        dispatch(fetchBreedDetails(id))
      }
      }, [dispatch,id]);

      // if (!catBreed || !catImage) {
      //   return <div>Loading...</div>;
      // }
  return (

        <div>
          <div className="flex items-center mt-3 ml-3 cursor-pointer">
            <Link to={'/'}><ArrowBackIosIcon /></Link>
            <h1 className='text-4xl font-bold text-center mb-3 flex-grow'>{selectedBreed?.name}</h1>
          </div>
          <div className="detail-container">
            <div className="flex justify-center mb-4">
              <img className="cat-image rounded-lg" src={selectedBreedImage?.url} alt={selectedBreed?.name} />
            </div>
            <div className="cat-details">
              <p className='text-2xl mb-2'><b>Origins : </b>{selectedBreed?.origin}</p>
              <p className='text-2xl mb-2'><b>Life Span : </b>{selectedBreed?.life_span}</p>
              <p className="text-2xl mb-2"><b>Description : </b></p>
              <p className='text-1xl mb-2'>{selectedBreed?.description}</p>
            </div>
          </div>
        </div>
  )
}
