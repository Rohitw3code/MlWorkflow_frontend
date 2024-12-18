import { useContext, useState } from "react";
import "../css/TrainTestSplit.css";
import ThemeContext from "./ThemeContext";

function TrainTestSplit() {
  const [randomstate, setRandomState] = useState(42);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState(true);
  const [shuffle, setshuffle] = useState(false);
  const [trainsize, setTrainSize] = useState(80);
  const [trainshape, setTrainShape] = useState([]);
  const [testshape, setTestShape] = useState([]);
  const color = useContext(ThemeContext)
  const apiurl = 'https://mlflow-b0hqc7chc3fjcvd0.centralindia-01.azurewebsites.net'

  const splitDf = async () => {
    const url = `${apiurl}/api/train-test-split`;

    const data = {
      randomstate: randomstate,
      shuffle: shuffle,
      trainsize: trainsize,
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
        setTrainShape(jsonResponse.trainshape);
        setTestShape(jsonResponse.testshape);
        setSuccess(jsonResponse.success);
        setMessage(jsonResponse.message);
        console.log("Data updated successfully:", jsonResponse);
      } else {
        // Request failed
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

  const handleRandomState = (event) => {
    setRandomState(event.target.value);
  };

  const handleTrainState = (event) => {
    setTrainSize(event.target.value);
  };

  const handleShuffle = (event) => {
    setshuffle(event.target.value);
  };

  return (
    <>
      <h4 className="text-lg mx-2 my-3 font-semibold"  style={{fontFamily : 'ClashGrotesk'}}>
        Train Test Split
      </h4>
      {!success && message}
      <div className="train-test-split-field-tts ">
        <div className="mx-5">
          <h3 className=""  style={{fontFamily : 'ClashGrotesk'}}>Random State</h3>
          <input
            className={`w-20 h-10 text-white p-1 rounded-xl my-5  ${color === '#ED9ED6' && 'bg-pink-500'} ${color === '#87C4FF' && 'bg-blue-500'}
            ${color === '#9ADE7B' && 'bg-green-500'} ${color === '#FFCF96' && 'bg-yellow-500'} ${color === 'gradient--pink' && 'bg-pink-500'}
            ${color === 'gradient--black' && 'bg-slate-600'}
            ${color === 'aurora--bgr' && 'bg-white/70 text-gray-800'}`}
            placeholder="random state"
            type="number"
            value={randomstate}
            onChange={handleRandomState}
          />
        </div>

        <div className="mx-10">
          <h3 className=""  style={{fontFamily : 'ClashGrotesk'}}>Train Size</h3>
          <input
            className={`w-20 h-10 text-white p-1 rounded-xl mx-3 my-5  ${color === '#ED9ED6' && 'bg-pink-500'} ${color === '#87C4FF' && 'bg-blue-500'}
            ${color === '#9ADE7B' && 'bg-green-500'} ${color === '#FFCF96' && 'bg-yellow-500'} ${color === 'gradient--pink' && 'bg-purple-500'}
            ${color === 'gradient--black' && 'bg-slate-600'}
            ${color === 'aurora--bgr' && 'bg-white/70 text-gray-800'}`}
            placeholder="train-size %"
            type="number"
            value={trainsize}
            onChange={handleTrainState}
          />
        </div>
      </div>

      <div className="shuffle-tts">
        <label className="font-semibold">Shuffle</label>
        <select
          className={` p-2 rounded-md mx-3  ${color === '#ED9ED6' && 'bg-pink-500'} ${color === '#87C4FF' && 'bg-blue-500'}
          ${color === '#9ADE7B' && 'bg-green-500'} ${color === '#FFCF96' && 'bg-yellow-500'} ${color === 'gradient--pink' && 'bg-pink-500'}
          ${color === 'gradient--black' && 'bg-slate-600'}
          ${color === 'aurora--bgr' && ' text-gray-800'}`}
          value={shuffle || true}
          onChange={(e) => handleShuffle(e.target.value)}
        >
          <option className="bg-white" value="true">true</option>
          <option className="bg-white" value="false">false</option>
        </select>

        <button
          className={`p-2 w-20  rounded-xl uppercase  ${color === '#ED9ED6' && 'bg-pink-500'} ${color === '#87C4FF' && 'bg-blue-500'}
          ${color === '#9ADE7B' && 'bg-green-500'} ${color === '#FFCF96' && 'bg-yellow-500'} ${color === 'gradient--pink' && 'bg-pink-700 text-white'}
          ${color === 'gradient--black' && 'bg-slate-600'}`}
          onClick={() => {
            splitDf();
          }}
        >
          split
        </button>

        <div>
          {trainshape.length === 0 ? (
            ""
          ) : (
            <>
              <p className="py-4">No. of rows in Train {trainshape[0]}</p>
            </>
          )}
          {testshape.length === 0 ? (
            ""
          ) : (
            <>
              <p className="py-4">No. of rows in Test {testshape[0]}</p>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default TrainTestSplit;
