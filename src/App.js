// import './css/App.css';
import React, { useEffect, useState } from "react";
import Dataframe from "./componets/Dataframe";
import MissingData from "./componets/MissingData";
import DataTypeChange from "./componets/DataTypeChange";
import DataEncoding from "./componets/DataEncoding";
import DfUniqueData from "./componets/DfUniqueData";
import SelectFeatureTarget from "./componets/SelectFeatureTarget";
import TrainTestSplit from "./componets/TrainTestSplit";
import MLAlgo from "./componets/MLAlog";
import Welcome from "./componets/Welcome";

function App() {
  const [userInput, setUserInput] = useState(5);
  const [cols, setCols] = useState([]);
  const [sectionBVisible, setSectionBVisible] = useState(false);
  const [reloadDataTypeChange, setReloadDataTypeChange] = useState(false);
  const [showWelcome,setShowWelcome] = useState(true);
  // const [selectedFile, setSelectedFile] = useState({"name":"No Selected"});



  const triggerReloadDataTypeChange = () => {
    setReloadDataTypeChange(
      (prevReloadDataTypeChange) => !prevReloadDataTypeChange
    );
  };

  const triggerReloadSelectedFile = () => {
    setShowWelcome(
      (prevReloadDataTypeChange) => !prevReloadDataTypeChange
    );
  };

  const fetchData = async () => {
    try {
      const url = `http://127.0.0.1:5001/api/dfcols`;
      const resp = await fetch(url);
      if (resp.ok) {
        const jsonData = await resp.json();
        setCols(jsonData.cols);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sectionBVisibleFun = () => {
    setSectionBVisible(true);
  };

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  return (
    <>
    {showWelcome ? (
<>
<Welcome triggerReloadSelectedFile={triggerReloadSelectedFile}/>
</>
    ):(
<>
<div className="" style={{ background : '#87C4FF'}}>
  <div className=" text-center mb-8">
  <h1 className=" flex items-center justify-center" style={{ fontFamily : 'Goza',fontSize : 'clamp(5vw,4rem,2vw)',color : '#0766AD'}}>MLQuickFlow</h1>
  </div>
  <div>
      <h1 className="text-2xl  p-5 font-semibold border-t-2 border-b-2 border-blue-500"
      style={{ fontFamily : 'ClashGrotesk', fontSize : 'clamp(3vw,1.5rem,1.5vw)',}}>
        Data Preprocessing
      </h1>

      <div className=" w-full flex flex-col items-center justify-center">
      <div className="m-5" style={{
         fontFamily : 'Poppins'
      }}>
        <div className="m-3">
          <div className=" w-fit p-2 bg-blue-600 rounded-lg text-blue-300 uppercase  font-semibold text-xl">
          Display{" "}
          <input
            className=" lg:w-60 outline-none p-6 border-2 mx-2 text-blue-800 border-blue-600 shadow-2xl shadow-blue-500 h-8 rounded-lg bg-blue-300"
            placeholder="Enter number of rows"
            type="number"
            value={userInput}
            min={5}
            onChange={handleInputChange}
          />
          rows
          </div>
        </div>
        <Dataframe rows={userInput} cols={[]} shapeDisplay="true" />
      </div>
      </div>
      </div>

      <div className="section B top-8">
        <h1 className="text-2xl p-5 font-semibold border-t-2 border-b-2 border-blue-500"
        style={{ fontFamily : 'ClashGrotesk', fontSize : 'clamp(3vw,1.5rem,1.5vw)',}} 
        onClick={sectionBVisibleFun}>
          Missing Value
        </h1>
        <MissingData
          triggerReloadDataTypeChange={triggerReloadDataTypeChange}
        />
      </div>

      <div className="section C">
        <DataTypeChange reloadDataTypeChange={reloadDataTypeChange} />
      </div>

      <div className="section D">
        <h1 className="text-2xl p-5 font-semibold border-t-2 border-b-2 border-blue-500"
        style={{ fontFamily : 'ClashGrotesk', fontSize : 'clamp(3vw,1.5rem,1.5vw)',}}
         onClick={sectionBVisibleFun}>
          Data Encoding
        </h1>
        <DataEncoding />
      </div>

      <div className="section E">
        <SelectFeatureTarget />
      </div>

      <div className="section E">
        <TrainTestSplit />
      </div>

      <div className="section E">
        <MLAlgo />
      </div>

      
    </div>

</>      
    )}
    
    </>
  );
}

export default App;
