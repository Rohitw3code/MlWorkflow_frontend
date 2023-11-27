import React,{useState,useEffect,useRef} from 'react'
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
  
  const [active, setActive] = useState(null);
  const observer = useRef(null);

  const [dataTabs, setDataTabs] = useState([
    {
      id: "1",
      tabTitle: "Data-PreProcessing",
      moveto : '#section-A',
      tabClass: "myCustomClass",
      tabClicked: false
    },
    {
      id: "2",
      tabTitle: "Missing Values",
      moveto : '#section-B',
      tabClass: "myCustomClass",
      tabClicked: false
    },
    {
      id: "3",
      tabTitle: "Data Encoding",
      moveto : '#section-C',
      tabClass: "myCustomClass",
      tabClicked: false
    },
    {
      id: "4",
      tabTitle: "Features",
      moveto : '#section-D',
      tabClass: "myCustomClass",
      tabClicked: false
    },
    {
      id: "5",
      tabTitle: "Train - Test",
      moveto : '#section-E',
      tabClass: "myCustomClass",
      tabClicked: false
    },
    {
      id: "6",
      tabTitle: "ML - Algorithms",
      moveto : '#section-F',
      tabClass: "myCustomClass",
      tabClicked: false
    }
  ]);

  const NavLink = ({ id, tabTitle,moveTo, isActive, onClick }) => {
    return (
      <a
        href={moveTo}
        onClick={() => navigate(id)}
        className={isActive ? ` inline-block w-56 h-full p-2 rounded-xl rounded-r-none text-sm md:text-xl ${color === '#ED9ED6' && 'bg-pink-200'} ${color === '#87C4FF' && 'bg-blue-200'}
        ${color === '#9ADE7B' && 'bg-green-200'} ${color === '#FFCF96' && 'bg-yellow-200'} ${color === 'gradient--pink' && ' bg-gradient-to-r from-purple-200 to-pink-500'}
        ${color === 'gradient--black' && 'bg-slate-800 text-white'}
        ${color === 'aurora--bgr' && 'border-none backdrop-blur-md bg-white/30 custom--bg--pink text-slate-500'}` 
        : " transition-all ease-in-out delay-200"}
      >
        {tabTitle}
      </a>
    );
  };

  const navigate = (id) => {
    setActive(id);
  };

  useEffect(() => {
    //create new instance and pass a callback function
        observer.current = new IntersectionObserver((entries) => {
          const visibleSection = entries.find((entry) => entry.isIntersecting)?.target;
    //Update state with the visible section ID
          if (visibleSection) {
            setActive(visibleSection.id);
          }
        });
    
    //Get custom attribute data-section from all sections
        const sections = document.querySelectorAll('[data-section]');
    
        sections.forEach((section) => {
          observer.current.observe(section);
        });
    //Cleanup function to remove observer
        return () => {
          sections.forEach((section) => {
            observer.current.unobserve(section);
          });
        };
      }, []);


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
      {console.log(active)}
      <section className='relative bg-white/30'>
    <div className={` ml-52 ${color === '#ED9ED6' && 'bg-pink-200'} transition-all ease-linear delay-200 duration-300 ${color === '#87C4FF' && 'bg-blue-200'}
      ${color === '#9ADE7B' && 'bg-green-200'} ${color === '#FFCF96' && 'bg-yellow-200'} ${color === 'gradient--pink' && 'bg-gradient-to-r from-indigo-300 via-purple-400 to-pink-400'}
      ${color === 'gradient--black' && 'bg-gradient-to-t from-slate-900 via-slate-800 to-slate-900 text-white'} ${color === 'aurora--bgr' && "bg-[url('/aurora1.jpg')]"} `}
      style={{
        backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 150%',
    backgroundPosition: 'center'
      }}>
  <div className={`w-52 oool, h-screen fixed top-0 left-0 flex flex-col justify-around items-center overflow-hidden ${color === '#ED9ED6' && 'bg-pink-600'} ${color === '#87C4FF' && 'bg-blue-600'}
          ${color === '#9ADE7B' && 'bg-green-600'} ${color === '#FFCF96' && 'bg-yellow-600'} ${color === 'gradient--pink' && ' bg-gradient-to-r from-purple-600 to-pink-600'}
          ${color === 'gradient--black' && 'bg-slate-700 text-white'}
          ${color === 'aurora--bgr' && 'border-none backdrop-blur-md bg-black text-slate-300'}`}>
    
    <div className=' flex gap-3 place-items-center'>
      <img src="/aurora2.jpg" className=' w-16 h-16 rounded-full'/>
      <div className=' flex flex-col' style={{ fontFamily : 'Poppins'}}>
          <h1 className='  font-semibold'>Rishabh RAJ</h1>
          <p className=' font-mono text-sm'>ML LEARNER</p>
      </div>
    </div>
    <ul className=' w-full flex flex-col gap-1'>
      {dataTabs.map((item) => (
        <li key={item.id} className=' w-full p-2 text-center'>
          <NavLink {...item} isActive={active === item.id} moveTo={item.moveto} onClick={navigate} />
        </li>
      ))}
    </ul>
    <div className="z-40 w-full p-4 bg-white/80 columns-4 mx-auto">
      <button className=" bg-pink-500 w-8 h-8 rounded-full" onClick={() => setColor('#ED9ED6')}></button>
      <button className=" bg-blue-500 w-8 h-8 rounded-full" onClick={() => setColor('#87C4FF')}></button>
      <button className=" bg-teal-500 w-8 h-8 rounded-full" onClick={() => setColor('#9ADE7B')}></button>
      <button className=" bg-yellow-500 w-8 h-8 rounded-full" onClick={() => setColor('#FFCF96')}></button>
      <button className=" bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-8 h-8 rounded-full" onClick={() => setColor('gradient--pink')}></button>
      <button className=" bg-gradient-to-t from-slate-900 to-slate-700 w-8 h-8 rounded-full" onClick={() => setColor('gradient--black')}></button>
      <button className=" bg-gradient-to-t from-white/95 via-blue-300 to-blue-700 w-8 h-8 rounded-full" onClick={() => setColor('aurora--bgr')}></button>
  </div>
  </div>
  <div className=" text-center mb-8">
    <div className=' w-fit  px-12 bg-white/50 shadow-xl m-auto rounded-b-full'>
  <h1 className={` flex items-center justify-center ${color === '#ED9ED6' && 'text-pink-800'} ${color === '#87C4FF' && 'text-blue-800'}
      ${color === '#9ADE7B' && 'text-green-800'} ${color === '#FFCF96' && 'text-yellow-800'} ${color === 'gradient--pink' && 'text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-700'}`} style={{ fontFamily : 'Goza',fontSize : 'clamp(5vw,5rem,4vw)'}}>MLQuickFlow</h1>
      </div>
  </div>
  <div id="1" data-section className=' min-h-screen border-b-2 border-blue-500'>
    <div className='p-2'>
      <div className=' w-full  lg:w-1/2 '>
      <img src="/data_preprocess.png"></img>
      </div>
      </div>
      <div className=" w-full flex flex-col items-center justify-center">
      <div className="m-5" style={{
         fontFamily : 'Poppins'
      }}>
        <div className="m-3 flex justify-center md:block">
          <div className={` w-fit p-2 rounded-lg uppercase  font-semibold text-sm md:text-xl ${color === '#ED9ED6' && 'bg-pink-500'} ${color === '#87C4FF' && 'bg-blue-500'}
          ${color === '#9ADE7B' && 'bg-green-500'} ${color === '#FFCF96' && 'bg-yellow-500'} ${color === 'gradient--pink' && ' bg-gradient-to-r from-purple-500 to-pink-500'}
          ${color === 'gradient--black' && 'bg-slate-700 text-white'}
          ${color === 'aurora--bgr' && 'border-none backdrop-blur-md bg-white/30 custom--bg--pink text-slate-200'}`}>
          Display{" "}
          <input
            className={` w-40 lg:w-60 outline-none p-6 border-2 mx-2 shadow-2xl h-8 rounded-lg ${color === '#ED9ED6' && 'bg-pink-300'} ${color === '#87C4FF' && 'bg-blue-300'}
            ${color === '#9ADE7B' && 'bg-green-300'} ${color === '#FFCF96' && 'bg-yellow-300'} ${color === 'gradient--pink' && 'border-none backdrop-blur-sm bg-white/30 custom--bg--pink'}
            ${color === 'gradient--black' && 'border-none backdrop-blur-sm bg-white/30 custom--bg--pink'}
            ${color === 'aurora--bgr' && 'border-none backdrop-blur-md bg-white/70 custom--bg--pink text-slate-800'}`}
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

      <div id='2' data-section className={`section B top-8 backdrop-blur-lg ${color === 'aurora--bgr' && ""}`}>
      <div className='p-2 flex lg:justify-end'>
      <div className=' w-full  lg:w-1/2 '>
      <img src="/missing_value.png"></img>
      </div>
      </div>
        <MissingData
          triggerReloadDataTypeChange={triggerReloadDataTypeChange}
        />
      </div>

      <div className={`section C border-b-2 border-blue-500 backdrop-blur-lg ${color.startsWith('aurora--bgr') ? 'text-slate-200' : 'null'}`}>
        <DataTypeChange reloadDataTypeChange={reloadDataTypeChange} />
      </div>

      <div  id="3" data-section className={`section D backdrop-blur-md ${color === 'aurora--bgr' && 'text-white'}`}>
      <div className='p-2 flex'>
      <div className=' w-full  lg:w-1/2 '>
      <img src="/data_encode.png"></img>
      </div>
      </div>
        <DataEncoding />
      </div>

      <div id='4' data-section className={`section E backdrop-blur-md ${color === 'aurora--bgr' && 'text-white'}`}>
        <SelectFeatureTarget />
      </div>

      <div id='5' data-section className={`section E backdrop-blur-md ${color === 'aurora--bgr' && 'bg-white/50 p-5 rounded-lg text-gray-800'}`}>
        <TrainTestSplit />
      </div>

      <div id='6' data-section className={`section E backdrop-blur-md ${color === 'aurora--bgr' && 'bg-white/50 mt-6 p-5 rounded-lg text-gray-800'}`}>
      <div className='p-2 flex'>
      <div className=' w-full '>
      <img src="/ml_algo.png"></img>
      </div>
      </div>
        <MLAlgo />
      </div>

      
    </div>
    </section>
    </ThemeContext.Provider>
  )
}
