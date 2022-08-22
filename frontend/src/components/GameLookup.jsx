import axios from "axios";
import { useEffect, useState } from "react";

function GameLookup() {

  const serverAPI = "/api/";
  const [formData, setFormData] = useState("");

  // const initialResults = ["test1", "test2"]
  const initialResults = [
    {id: 1, name: "test1"},
    {id: 2, name: "test2"}
  ]

  const [lookupResults, setLookupResults] = useState(initialResults);

  const onChange = (e) => {
    setFormData((e.target.value))
  }

  useEffect(() => {
    if (formData !== "")
    {
      // console.log(serverAPI + "lookup" + formData);
      axios.post(serverAPI + "lookup/" + formData)
      .then((response) => {
        console.log(response.data);
        setLookupResults(response.data);
        // setLookupResults(response.data);
        // lookupResults = response.data;
      })
      .catch((error) => {
        console.log(error);
      })
    }
    else
    {
      
    }
  }, [formData]);

  useEffect(() => {
    // axios.post(serverAPI).then((res) => {
    //   console.log(res.data);
    //   localStorage.setItem('accessToken', JSON.stringify({'token': res.data}));
    // });
  }, [])
  
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
          <div key={result.id}>{result.name}</div>
        ))}
    </div>
  )
}

export default GameLookup