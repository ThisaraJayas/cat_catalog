import axios from "axios";
import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import StarIcon from "@mui/icons-material/Star";
import CommentIcon from "@mui/icons-material/Comment";
import IconButton from "@mui/material/IconButton";
import { Divider } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Search from "./Search";

export interface Cat {
  id: number;
  name: string;
}
export default function Catalog() {
  const [catData, setCatData] = useState<Cat[]>([]);
  const [filteredCatData, setFilteredCatData] = useState<Cat[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  console.log(catData);

  useEffect(() => {
    const retriveCatBreed = async () => {
      try {
        const response = await axios.get(
          "https://api.thecatapi.com/v1/breeds?limit=20"
        );
        console.log(response.data);
        setCatData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    retriveCatBreed();
  }, []);

  useEffect(() => {
    const filterCatBreeds = () => {
      if (searchTerm === "") {
        setFilteredCatData(catData); // Show all cat breeds if search term is empty
      } else {
        const filteredBreeds = catData.filter((cat) =>
          cat.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCatData(filteredBreeds);
      }
    };
    filterCatBreeds();
}, [searchTerm, catData]);

  return (
    <>
      <div className="mt-6 flex justify-center">
        <div>
          <h1 className="text-3xl font-bold text-center pb-4">
            Cat Catalog
          </h1>
          <div>
            <h2 className="text-lg text-center">
              Explore our collection of cat breeds
            </h2>
          </div>
          {/* <input
            type="text"
            placeholder="Search cat breeds..."
            className="mt-4 p-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          /> */}
          <Search/>
        </div>
      </div>
      <div className="mt-6 flex justify-center">
        <List
          sx={{
            border: "1px solid #ccc",
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
          }}
          aria-label="contacts"
        >
          {filteredCatData.map((cat) => (
            <div key={cat.id}>
              <ListItem
                disablePadding
                secondaryAction={
                  <ListItemIcon>
                    <ArrowForwardIosIcon />
                  </ListItemIcon>
                }
              >
                <ListItemButton>
                  <ListItemText primary={cat.name} />
                </ListItemButton>
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </div>
    </>
  );
}
