import axios from "axios";
import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import './GameLookup.css';

function GameLookup() {

  const serverAPI = "/api/";
  const [formData, setFormData] = useState("mario");

  const initialResults = [
    {id: 1, name: "test1", platforms: [8]},
    {id: 2, name: "test2", platforms: [39]}
  ]

  const initialPlatforms = [
    {id: 8, abbreviation: "PS2", name: "PlayStation 2"},
    {id: 39, abbreviation: "iOS", name: "iOS"},
    {id: 6, abbreviation: "PC", name: "PC (Microsoft Windows)"}
  ]

  const [lookupResults, setLookupResults] = useState(initialResults);
  const [platforms, setPlatforms] = useState(initialPlatforms);
  const [isLoading, setIsLoading] = useState(false);

  const lookupAPICall = () => {
    if (formData !== "")
    {
      setIsLoading(true);
      axios.post(serverAPI + "lookup/games/" + formData)
      .then((response) => {
        setIsLoading(false);
        console.log(response.data);
        setLookupResults(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
    }
  }

  const onChange = (e) => {
    setFormData((e.target.value))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => lookupAPICall(), 1000);
    
    return () => clearTimeout(timeoutId);
  }, [formData]);

  useEffect(() => {
    axios.post(serverAPI + "lookup/platforms/")
    .then((response) => {
      console.log(response.data);
      setPlatforms(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
  }, []);
  
  return (
    <div>
        <h2>Lookup</h2>
        <form onSubmit={handleSubmit}>
            <label>
                Enter a title:
                <input type="text" name="game" value={formData} onChange={onChange} />
            </label>
        </form>
        {!isLoading && <div className="games-container">
          {lookupResults.map((result) => (
            <div className="game-card" key={result.id}>
              {result.name}
              <br></br>
              <img src={result.url}></img>
              {/* {result.platforms.join(', ')} */}
              <br></br>
              {result.platforms.map((obj) => {
                let platform = platforms.find(platform => platform.id == obj);
                return(
                <React.Fragment key={result.id + " " + platform.id}>
                  {platform.abbreviation != null ? platform.abbreviation + ' ' : platform.name + ' '}
                </React.Fragment>)
              })}
            </div>
          ))}
        </div>}
        {/* {isLoading && <div>Loading...</div>} */}
        {isLoading && <Spinner />}
    </div>
  )
}

export default GameLookup