import axios from "axios";
import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import CatalogItem from "./CatalogItem";

export interface Cat {
  id: number;
  name: string;
}
export default function Search() {
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
    <div className="flex flex-col items-center mt-6">
      <Paper
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Cat Breeds"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      <CatalogItem filteredCatData={filteredCatData} />
    </div>
  );
}
