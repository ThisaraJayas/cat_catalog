import axios from 'axios'
import React, { useEffect, useState } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';

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
    <>
   <List
      sx={{ border: '1px solid #ccc', width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      aria-label="contacts"
    >
     {catData.map((cat) => (
          <ListItem key={cat.id} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <CommentIcon />
              </ListItemIcon>
              <ListItemText primary={cat.name} />
            </ListItemButton>
          </ListItem>
        ))}
    </List>
  </>
  )
}
