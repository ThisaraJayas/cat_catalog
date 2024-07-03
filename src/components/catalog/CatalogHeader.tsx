import React from "react";

export default function CatalogHeader() {
  return (
    <div>
      <div className="mt-6 flex justify-center">
        <div className="">
          <h1 className=" bg-blue-700 rounded-full text-white p-4 text-3xl font-bold text-center pb-4">
            Cat Catalog
          </h1>
          <div>
            <h2 className="text-lg text-center">
              Explore our collection of cat breeds
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
