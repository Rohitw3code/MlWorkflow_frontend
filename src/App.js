import './css/App.css';
import React, { useEffect, useState } from "react";
import Welcome from "./componets/Welcome";
import Home from './componets/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pricing from './componets/pricing';
import Help from './componets/Help';

function App() {
  const [showWelcome,setShowWelcome] = useState(true);

  const triggerReloadSelectedFile = () => {
    setShowWelcome(
      (prevReloadDataTypeChange) => !prevReloadDataTypeChange
    );
  };
  return (
    <>
    {showWelcome ? (
<>
<BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome triggerReloadSelectedFile={triggerReloadSelectedFile}/>}></Route>
        <Route path='/pricing' element={<Pricing/>}></Route>
        <Route path='/help' element={<Help/>}></Route>
      </Routes>
    </BrowserRouter> 
</>
    ):(
      <Home />    
    )}
    </>
  );
}

export default App;
