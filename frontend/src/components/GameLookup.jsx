import { useEffect, useState } from "react";

function GameLookup() {
  const [formData, setFormData] = useState("");

  const lookupResults = ["test1", "test2"];

  const onChange = (e) => {
    setFormData((e.target.value))
  }

  useEffect(() => {
    if (formData !== "")
    {
      
    }
  }, [formData]);

  useEffect(() => {
    // authenticateAPI();
  }, [])

  // const authenticateAPI = async () => {
  //   let response = await fetch (`https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=${process.env.GRANT_TYPE}`);
  //   let data = await response.json();
  //   console.log(data);
  // }
  
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
          <div key={result}>{result}</div>
        ))}
    </div>
  )
}

export default GameLookup