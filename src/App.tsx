import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import CatDetails from './pages/CatDetails';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/breed/:id' element={<CatDetails/>}/>
      </Routes>
    </div>
  );
}

export default App;
