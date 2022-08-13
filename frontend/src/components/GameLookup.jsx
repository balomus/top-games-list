import axios from "axios";
import { useEffect, useState } from "react";

function GameLookup() {

  const serverAPI = "/api/authenticate";
  const [formData, setFormData] = useState("");

  const lookupResults = ["test1", "test2"];

  const onChange = (e) => {
    setFormData((e.target.value))
  }

  useEffect(() => {
    if (formData !== "")
    {
      //https://masteringjs.io/tutorials/axios/post-headers
      
      // axios.post("https://api.igdb.com/v4/games/", 
      // {
      //   search: "persona",
      //   fields: "name"
      // }, 
      // {
      //   headers: 
      //   {
      //     Client-ID: 
      //   }
      // })
      // .then((res) => {
      //   console.log(res.data);
      // })
    }
  }, [formData]);

  useEffect(() => {
    axios.post(serverAPI).then((res) => {
      console.log(res.data);
      localStorage.setItem('accessToken', JSON.stringify({'token': res.data}));
    });
    // localStorage.setItem('accessToken', JSON.stringify({'token': 'test'}));
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