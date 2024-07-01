import axios from "axios";
import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import Search, { Cat } from "./Search";
import '../styles/catalog.css'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface CatalogProps {
  filteredCatData: Cat[];
}
const CatalogItem: React.FC<CatalogProps> = ({ filteredCatData }) => {
  return (
    <>
      <div className="mt-6 flex justify-center">
      <div className="mt-6 flex flex-col items-center">
          {filteredCatData.map((cat) => (
            <div key={cat.id} className="container">
              <div className="listText">{cat.name}</div>
              <div className="listIcon"><ArrowForwardIosIcon /></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default CatalogItem;
