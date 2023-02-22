import axios from "axios";
import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import './GameLookup.css';
import { HiX } from "react-icons/hi";
import { FaPlus } from "react-icons/fa";

function GameLookup({ localGameList, setLocalGameList, closeModal }) {

  const serverAPI = "/api/";
  const [formData, setFormData] = useState("mario");

  // const initialResults = [
  //   {id: 1, name: "test1", platforms: [8]},
  //   {id: 2, name: "test2", platforms: [39]}
  // ]

  const initialPlatforms = [
    {id: 8, abbreviation: "PS2", name: "PlayStation 2"},
    {id: 39, abbreviation: "iOS", name: "iOS"},
    {id: 6, abbreviation: "PC", name: "PC (Microsoft Windows)"}
  ]

  const [lookupResults, setLookupResults] = useState();
  const [platforms, setPlatforms] = useState(initialPlatforms);
  const [isLoading, setIsLoading] = useState(true);

  const lookupAPICall = () => {
    if (formData !== "")
    {
      setIsLoading(true);
      axios.post(serverAPI + "lookup/games/" + formData)
      .then((response) => {
        setIsLoading(false);
        // console.log(response.data);
        setLookupResults(response.data);

        // if (props.gamelist !== undefined)
        // {
        //   console.log(props.gamelist.games)
        // }
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

  const handleClick = (command, game) => {
    const newGameListObj = {...localGameList};
    const newGameList = [...localGameList.games];
    
    if (command === 'delete')
    {
      const found = newGameList.find(obj => obj.id === game.id);
      const index = newGameList.indexOf(found);
      newGameList.splice(index, 1);
    }

    if (command === 'add')
    {
      newGameList.push(game)
    }

    newGameListObj.games = newGameList;
    setLocalGameList(newGameListObj);
  }

  useEffect(() => {
    // console.log(localGameList.games);
    const timeoutId = setTimeout(() => lookupAPICall(), 1000);
    
    return () => clearTimeout(timeoutId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  useEffect(() => {
    axios.post(serverAPI + "lookup/platforms/")
    .then((response) => {
      // console.log(response.data);
      setPlatforms(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
  }, []);
  
  return (
    <div>
      <button onClick={closeModal}>Close Window</button>
        <h2>Lookup</h2>
        <form onSubmit={handleSubmit}>
            <label>
                Enter a title:
                <input type="text" name="game" value={formData} onChange={onChange} />
            </label>
        </form>
        {!isLoading && <div className="games-container">
          {lookupResults?.map((result) => (
            <div className="game-card" key={result.id}>
              {result.name}
              <br></br>
              <img src={result.url} alt={`${result.name} cover art`}></img>
              {/* {result.platforms.join(', ')} */}
              <br></br>
              {result.platforms?.map((obj) => {
                let platform = platforms.find(platform => platform.id === obj);
                return(
                <React.Fragment key={result.id + " " + platform.id}>
                  {platform.abbreviation != null ? platform.abbreviation + ' ' : platform.name + ' '}
                </React.Fragment>)
              })}
              {/* If localGameList exists, and the game is in the list, render a fragment 
                  that allows the user to remove the game */}
              {localGameList && localGameList.games.filter(value => value.id === result.id).length > 0 ? (
                <>
                  {/* in game list */}
                  <div><button onClick={() => handleClick('delete', result)} className="x"><HiX /></button></div>
                </>
              ) : (
                <>
                  {/* not in game list */}
                  <div><button onClick={() => handleClick('add', result)} className=""><FaPlus /></button></div>
                </>
              )}
            </div>
          ))}
        </div>}
        {/* {isLoading && <div>Loading...</div>} */}
        {isLoading && <Spinner />}
    </div>
  )
}

export default GameLookup