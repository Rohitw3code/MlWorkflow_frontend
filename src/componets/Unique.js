import React, { useEffect, useState } from 'react';

function Unique (){
    const [uni,setUni] = useState({});
    const [keys,setKeys] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const [error, setError] = useState(null); // Add error state
  
    useEffect(() => {
        fetchUnique();
    }, []);
    const url = 'https://mlflow-b0hqc7chc3fjcvd0.centralindia-01.azurewebsites.net'

    const fetchUnique= async () => {
      try {
        const resp = await fetch(`${url}/api/dataunique`);
        if (resp.ok) {
            const jsonData = await resp.json();
            setLoading(false); // Set loading to false after data is fetched
        } else {
            setError("Failed to fetch data");
            setLoading(false); // Set loading to false in case of an error
        }
    } catch (error) {
        setError("Error: " + error.message);
        setLoading(false); // Set loading to false in case of an error
    }

    }



    return (<>
    Unique

    {keys.map((item,index)=>{
        <>
        {item}
        </>
    })}

    {error}


    </>);

}

export default Unique;