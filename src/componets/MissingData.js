import "../css/MissingData.css";
import React, { useContext, useEffect, useState } from "react";
import ThemeContext from "./ThemeContext";

function MissingData({ triggerReloadDataTypeChange }) {
  const [data, setData] = useState({});
  const [dtypes, setDtypes] = useState({});
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state
  const [clickedButton, setClickedButton] = useState(null);
  const [btnDtype, setBtnDtype] = useState(null);

  // Update Dataset isna sum and dtypes
  const [updated_ds, setUpdatedDs] = useState({});
  const color = useContext(ThemeContext);

  useEffect(() => {
    fetchData();
  }, []);

  const apiurl = 'https://mlflow-b0hqc7chc3fjcvd0.centralindia-01.azurewebsites.net'

  const fetchData = async () => {
    try {
      const resp = await fetch(`${apiurl}/api/df/missingdata`);
      if (resp.ok) {
        const jsonData = await resp.json();
        setData(jsonData.missing);
        setDtypes(jsonData.dtypes);
        setLoading(false); // Set loading to false after data is fetched
      } else {
        setError("Failed to fetch data");
        setLoading(false); // Set loading to false in case of an error
      }
    } catch (error) {
      setError("Error: " + error.message);
      setLoading(false); // Set loading to false in case of an error
    }
  };

  const post = async (key, value, replace = "nan") => {
    const url = `${apiurl}/api/df/missingdata/operation`; // Replace with your API endpoint URL
    // Data to be sent in the request body
    const data = {
      key: key,
      operation: value,
      replace: replace,
    };

    try {
      const response = await fetch(url, {
        method: "POST", // Use PUT for updating data
        headers: {
          "Content-Type": "application/json", // Specify the content type as JSON
        },
        body: JSON.stringify(data), // Convert data to JSON and send in the request body
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        if (jsonResponse.updated) {
          setUpdatedDs(jsonResponse);
          triggerReloadDataTypeChange();
        }
        console.log("Data updated successfully:", jsonResponse);
      } else {
        console.error(
          "Failed to update data:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleMissingData = (key, opra, replace = "nan") => {
    setUpdatedDs({});
    post(key, opra, replace);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleButtonClick = (key, dtype) => {
    setClickedButton(key);
    setBtnDtype(dtype);
  };

  return (
    <div className="w-full flex flex-col">
      <div className=" w-full h-full overflow-auto p-3 m-1">
      <div className=" flex justify-center m-1 rounded-md wrap">
        {Object.keys(data).map((key) => (
          <div key={key} className={` text-center ${color === '#ED9ED6' && 'bg-pink-600'} ${color === '#87C4FF' && 'bg-blue-500'}
          ${color === '#9ADE7B' && 'bg-green-600'} ${color === '#FFCF96' && 'bg-yellow-500'} ${color === 'gradient--pink' && 'bg-pink-600'}
          ${color === 'aurora--bgr' && 'border-none backdrop-blur-md bg-white/30 custom--bg--pink text-slate-200'}
          ${color === 'gradient--black' && 'bg-slate-700'}`} style={{boxShadow: 'rgba(0,0,0,0.4) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px'}}>
            <div className=" p-2 text-center">
              {key}
              <br /> ({dtypes[key]})
            </div>
            <div className="p-1 font-semibold" style={{ background : '#FFF6F6',color : '#164863',fontFamily : 'Poppins'}}>{data[key]}</div>
          </div>
        ))}
      </div>
      </div>
      <div className={` t-4 ${color === 'aurora--bgr' && ' text-slate-200'}`}>
        <div className="text-3xl mt-4  px-3 font-semibold"
        style={{ fontFamily : 'ClashGrotesk' }}>
          Fix the missing data
        </div>
        <div className="text-lg px-3 my-3 font-medium"
        style={{ fontFamily : 'Poppins' }}>
          Data Imputation and Deletion
        </div>
        <div className={`m-3 w-fit rounded-md ${color === '#ED9ED6' && 'bg-pink-500'} ${color === '#87C4FF' && 'bg-blue-500'}
          ${color === '#9ADE7B' && 'bg-green-500'} ${color === '#FFCF96' && 'bg-yellow-500'} ${color === 'gradient--pink' && 'bg-purple-500'} ${color === 'gradient--black' && 'bg-slate-600'}
          ${color === 'aurora--bgr' && 'border-none backdrop-blur-md bg-white/30 custom--bg--pink text-slate-200'}`}>
          {Object.keys(data).map(
            (key) =>
              data[key] !== 0 && (
                <button
                  key={key}
                  className={` border-r p-4 ${
                    clickedButton === key && `${color === '#ED9ED6' && 'bg-pink-600'} ${color === '#87C4FF' && 'bg-blue-600'}
                    ${color === '#9ADE7B' && 'bg-green-600'} ${color === '#FFCF96' && 'bg-yellow-600'} ${color === 'gradient--pink' || 'gradient-black' && 'border-none backdrop-blur-sm bg-white/30 custom--bg--pink'}`} rounded-l-md" : ""
                  }`}
                  onClick={() => handleButtonClick(key, dtypes[key])}
                >
                  {key}
                </button>
              )
          )}
        </div>

        {clickedButton && (
          <div>
          <div className={`w-fit mx-3 rounded-md flex flex-col justify-center items-center bg-white ${color === 'gradient--pink' || 'aurora--bgr' && 'border-none backdrop-blur-sm bg-white/30 custom--bg--pink'}
          ${color.startsWith('aurora--bgr') ? 'bg-white/60' : 'null'}`}
          style={{color : '#164863',fontFamily : 'Poppins',}}>
            <div className=" p-2 pb-4 border-b-2 border-gray-600 border-dashed">
            {btnDtype === "float64" && (
              <>
                <button
                  className={`p-2 mx-1 rounded-lg ${color.startsWith('#') ? 'bg-slate-300 hover:bg-gray-200' : null} ${color === 'gradient--pink' && 'bg-pink-600 text-white hover:bg-pink-700'} 
                  ${color === 'gradient--black' && 'bg-slate-800 text-white'}`}
                  onClick={() => handleMissingData(clickedButton, "mean")}
                >
                  mean
                </button>
                <button
                className={`p-2 mx-1 rounded-lg hover:bg-gray-200 ${color.startsWith('#') ? 'bg-slate-300' : null} ${color === 'gradient--pink' && 'bg-pink-600 text-white'} 
                ${color === 'gradient--black' && 'bg-slate-800 text-white'}`}
                  onClick={() => handleMissingData(clickedButton, "median")}
                >
                  median
                </button>
              </>
            )}
            {btnDtype === "object" && (
              <>
                <button
                className={`p-2 mx-1 rounded-lg hover:bg-gray-200 ${color.startsWith('#') ? 'bg-slate-300' : null} ${color === 'gradient--pink' && 'bg-pink-600 text-white'} 
                ${color === 'gradient--black' && 'bg-slate-800 text-white'}`}
                  onClick={() => handleMissingData(clickedButton, "mode")}
                >
                  mode
                </button>
              </>
            )}
            <button
            className={`p-2 mx-1 rounded-lg hover:bg-gray-200 ${color.startsWith('#') ? 'bg-slate-300' : null} ${color === 'gradient--pink' && 'bg-pink-600 text-white'} 
            ${color === 'gradient--black' && 'bg-slate-800 text-white'}`}
              onClick={() => handleMissingData(clickedButton, "delete")}
            >
              delete (column)
            </button>
            <button
            className={`p-2 mx-1 rounded-lg hover:bg-gray-200 ${color.startsWith('#') ? 'bg-slate-300' : null} ${color === 'gradient--pink' && 'bg-pink-600 text-white'} 
            ${color === 'gradient--black' && 'bg-slate-800 text-white'}`}
              onClick={() => handleMissingData(clickedButton, "remove")}
            >
              remove (nan)
            </button>
           </div>
           <div className={`flex rounded-md m-3 ${color === '#ED9ED6' && 'bg-pink-600'} ${color === '#87C4FF' && 'bg-blue-600'}
               ${color === '#9ADE7B' && 'bg-green-600'} ${color === '#FFCF96' && 'bg-yellow-600'} ${color === 'gradient--pink' && ' bg-gradient-to-r from-purple-500 to-pink-500'}
               ${color === 'gradient--black' && ' bg-gradient-to-t from-slate-900 via-slate-800 to-slate-900'}
               ${color === 'aurora--bgr' && 'bg-white/70'}`}>
            <input
              type="text"
              placeholder="repl......"
              className={` ${color.startsWith('aurora--bgr') ? 'text-slate-800' : 'text-slate-50'} placeholder:text-black/60 rounded-l-md outline-none border-none p-3 flex rounded-md m-3 ${color === '#ED9ED6' && 'bg-pink-800'} ${color === '#87C4FF' && 'bg-blue-800'}
               ${color === '#9ADE7B' && 'bg-green-800'} ${color === '#FFCF96' && 'bg-yellow-800'} ${color === 'gradient--pink' || 'gradient--black' && 'border-none backdrop-blur-sm bg-white/30 custom--bg--pink'}`}
            />
            <button
              className={`${color.startsWith('aurora--bgr') ? 'text-slate-800' : 'text-slate-50'}  p-2 rounded `}
              onClick={() => {
                const inputValue =
                  document.querySelector(".replace-input").value; // Get the input value
                handleMissingData(clickedButton, "replace", inputValue);
              }}
            >
              replace
            </button>
            </div>
            </div>
          </div>
        )}
      </div>
      {updated_ds.updated && (
        <>
          <div className="flex m-5 overflow-auto">
            {Object.keys(updated_ds.data).map((key) => (
              <div key={key} className="table-row">
                <div className={`${color === '#ED9ED6' && 'bg-pink-500'} ${color === '#87C4FF' && 'bg-blue-500'}
          ${color === '#9ADE7B' && 'bg-green-500'} ${color === '#FFCF96' && 'bg-yellow-500'} ${color === 'gradient--pink' && 'bg-pink-500'}
          ${color === 'gradient--black' && 'bg-slate-700'} ${color.startsWith('aurora--bgr') ? 'bg-white/40 text-slate-800' : 'text-slate-50'} p-2`}>
                  {key} {updated_ds.dtypes[key]}
                </div>
                <div className={` text-black bg-white/40 items-center p-4`}>
                  {updated_ds.data[key]}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default MissingData;
