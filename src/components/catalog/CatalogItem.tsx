import axios from "axios";
import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import '../../styles/catalog.css'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { Link } from "react-router-dom";
import { Cat } from "../Search";


interface CatalogProps {
  filteredCatData: Cat[];
}
const CatalogItem: React.FC<CatalogProps> = ({ filteredCatData }) => {
  return (
    <>
      
      <div className="mt-6 flex flex-col items-center">
          {filteredCatData.map((cat) => (
            <Link key={cat.id} to={`/breed/${cat.id}`}>
            <div className="container">
              <div className="listText">{cat.name}</div>
              <div className="listIcon"><ArrowForwardIosIcon /></div>
            </div>
            </Link>
          ))}
        </div>
      
    </>
  );
};
export default CatalogItem;
