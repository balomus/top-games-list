import axios from "axios";
import { useEffect, useState } from "react";

function GameLookup() {

  const serverAPI = "/api/";
  const [formData, setFormData] = useState("");

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

  const lookupAPICall = () => {
    if (formData !== "")
    {
      axios.post(serverAPI + "lookup/games/" + formData)
      .then((response) => {
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
        <form>
            <label>
                Enter a title:
                <input type="text" name="game" value={formData} onChange={onChange} />
            </label>
        </form>
        <div className="container">
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
                <>
                  {platform.abbreviation != null ? platform.abbreviation + ' ' : platform.name + ' '}
                </>)
              })}
            </div>
          ))}
        </div>
    </div>
  )
}

export default GameLookup