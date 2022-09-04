import axios from "axios";
import { useEffect, useState } from "react";

function GameLookup() {

  const serverAPI = "/api/";
  const [formData, setFormData] = useState("");

  const initialResults = [
    {id: 1, name: "test1"},
    {id: 2, name: "test2"}
  ]

  const [lookupResults, setLookupResults] = useState(initialResults);

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
  
  return (
    <div>
        <h2>Lookup</h2>
        <form>
            <label>
                Enter a title:
                <input type="text" name="game" value={formData} onChange={onChange} />
            </label>
        </form>
        {lookupResults.map((result) => (
          <div key={result.id}>
            <img src={result.url}></img>
            {result.name}
          </div>
        ))}
    </div>
  )
}

export default GameLookup