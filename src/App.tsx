import React from 'react';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import CatDetails from './pages/CatDetails';


function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/:id' element={<CatDetails/>}/>
      </Routes>
    </div>
  );
}

export default App;
