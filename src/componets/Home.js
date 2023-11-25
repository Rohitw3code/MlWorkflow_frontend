import React,{useState,useEffect} from 'react'
import Dataframe from "../componets/Dataframe";
import MissingData from "../componets/MissingData";
import DataTypeChange from "../componets/DataTypeChange";
import DataEncoding from "../componets/DataEncoding";
import DfUniqueData from "../componets/DfUniqueData";
import SelectFeatureTarget from "../componets/SelectFeatureTarget";
import TrainTestSplit from "../componets/TrainTestSplit";
import MLAlgo from "../componets/MLAlog";
import ThemeContext from '../componets/ThemeContext';

export default function Home() {
  const [userInput, setUserInput] = useState(5);
  const [cols, setCols] = useState([]);
  const [sectionBVisible, setSectionBVisible] = useState(false);
  const [reloadDataTypeChange, setReloadDataTypeChange] = useState(false);
  // const [selectedFile, setSelectedFile] = useState({"name":"No Selected"});



  const triggerReloadDataTypeChange = () => {
    setReloadDataTypeChange(
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

  const [color,setColor] = useState('#87C4FF')
  return (
    <ThemeContext.Provider value={color}>
    <div className={`relative ${color === '#ED9ED6' && 'bg-pink-200'} ${color === '#87C4FF' && 'bg-blue-200'}
      ${color === '#9ADE7B' && 'bg-green-200'} ${color === '#FFCF96' && 'bg-yellow-200'} ${color === 'gradient--pink' && 'bg-gradient-to-r from-indigo-300 via-purple-400 to-pink-400'}
      ${color === 'gradient--black' && 'bg-gradient-to-t from-slate-900 via-slate-800 to-slate-900 text-white'}`}>
  <div className="fixed right-0 z-40 top-1/3 p-4 bg-white rounded-l-lg flex flex-col gap-2">
      <button className=" bg-pink-500 w-8 h-8 rounded-full" onClick={() => setColor('#ED9ED6')}></button>
      <button className=" bg-blue-500 w-8 h-8 rounded-full" onClick={() => setColor('#87C4FF')}></button>
      <button className=" bg-teal-500 w-8 h-8 rounded-full" onClick={() => setColor('#9ADE7B')}></button>
      <button className=" bg-yellow-500 w-8 h-8 rounded-full" onClick={() => setColor('#FFCF96')}></button>
      <button className=" bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-8 h-8 rounded-full" onClick={() => setColor('gradient--pink')}></button>
      <button className=" bg-gradient-to-t from-slate-900 to-slate-700 w-8 h-8 rounded-full" onClick={() => setColor('gradient--black')}></button>
  </div>
  <div className=" text-center mb-8">
    <div className=' w-fit  px-12 bg-white/50 shadow-xl m-auto rounded-b-full'>
  <h1 className={` flex items-center justify-center ${color === '#ED9ED6' && 'text-pink-800'} ${color === '#87C4FF' && 'text-blue-800'}
      ${color === '#9ADE7B' && 'text-green-800'} ${color === '#FFCF96' && 'text-yellow-800'} ${color === 'gradient--pink' && 'text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-700'}`} style={{ fontFamily : 'Goza',fontSize : 'clamp(5vw,5rem,4vw)'}}>MLQuickFlow</h1>
      </div>
  </div>
  <div>
      <h1 className={`text-2xl  p-5 font-semibold border-t-2 border-b-2 ${color === '#ED9ED6' && 'border-pink-500'} ${color === '#87C4FF' && 'border-blue-500'}
      ${color === '#9ADE7B' && 'border-green-500'} ${color === '#FFCF96' && 'border-yellow-500'} ${color === 'gradient--pink' && 'border-none backdrop-blur-sm bg-white/30 custom--bg--pink'}`}
      style={{ fontFamily : 'ClashGrotesk', fontSize : 'clamp(3vw,2.5rem,4vw)',}}>
        Data Preprocessing
      </h1>

      <div className=" w-full flex flex-col items-center justify-center">
      <div className="m-5" style={{
         fontFamily : 'Poppins'
      }}>
        <div className="m-3 flex justify-center md:block">
          <div className={` w-fit p-2 rounded-lg uppercase  font-semibold text-sm md:text-xl ${color === '#ED9ED6' && 'bg-pink-500'} ${color === '#87C4FF' && 'bg-blue-500'}
          ${color === '#9ADE7B' && 'bg-green-500'} ${color === '#FFCF96' && 'bg-yellow-500'} ${color === 'gradient--pink' && ' bg-gradient-to-r from-purple-500 to-pink-500'}
          ${color === 'gradient--black' && 'bg-slate-700 text-white'}`}>
          Display{" "}
          <input
            className={` w-40 lg:w-60 outline-none p-6 border-2 mx-2 shadow-2xl h-8 rounded-lg ${color === '#ED9ED6' && 'bg-pink-300'} ${color === '#87C4FF' && 'bg-blue-300'}
            ${color === '#9ADE7B' && 'bg-green-300'} ${color === '#FFCF96' && 'bg-yellow-300'} ${color === 'gradient--pink' && 'border-none backdrop-blur-sm bg-white/30 custom--bg--pink'}
            ${color === 'gradient--black' && 'border-none backdrop-blur-sm bg-white/30 custom--bg--pink'}`}
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
        <h1 className={`text-2xl  p-5 font-semibold border-t-2 border-b-2 ${color === '#ED9ED6' && 'border-pink-500'} ${color === '#87C4FF' && 'border-blue-500'}
      ${color === '#9ADE7B' && 'border-green-500'} ${color === '#FFCF96' && 'border-yellow-500'} ${color === 'gradient--pink' && 'border-none backdrop-blur-sm bg-white/30 custom--bg--pink'}`}
        style={{ fontFamily : 'ClashGrotesk', fontSize : 'clamp(3vw,3rem,3.5vw)',}} 
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
        <h1 className={`text-2xl  p-5 font-semibold border-t-2 border-b-2 ${color === '#ED9ED6' && 'border-pink-500'} ${color === '#87C4FF' && 'border-blue-500'}
      ${color === '#9ADE7B' && 'border-green-500'} ${color === '#FFCF96' && 'border-yellow-500'} ${color === 'gradient--pink' && 'border-none backdrop-blur-sm bg-white/30 custom--bg--pink'}`}
        style={{ fontFamily : 'ClashGrotesk', fontSize : 'clamp(3vw,3rem,4vw)',}}
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
    </ThemeContext.Provider>
  )
}
