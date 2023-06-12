import React from 'react';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Maindb from './Maindb';


import App from './App';
// import Login from './logandregis/Login';




export default function Appcontrol() {
  return (
    
        <BrowserRouter>
          <Routes>
                <Route path="/" element={<App />} />
                <Route path="/dashboard" element={<Maindb />} />
          </Routes>
        </BrowserRouter>
     
   
  );
}

