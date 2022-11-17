import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { HiX } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import axios from "axios";
import GameLookup from "../components/GameLookup";
import "./GameList.css";

const GameList = () => {

    const serverAPI = "/api/";

    const [searchParams] = useSearchParams();

    const [gamelist, setGameList] = useState();

    const id = searchParams.get('id');

    const lookupAPICall = () => {
        axios.get(serverAPI + "gamelists/" + id)
        .then((response) => {
            // console.log(response.data);
            setGameList(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const handleClick = (command, index) => {
        if (command === "up")
        {
            if (index !== 0)
            {
                let newGamelist = {...gamelist};
                const game = newGamelist.games[index];
                newGamelist.games.splice(index, 1);
                newGamelist.games.splice(index - 1, 0, game);
                setGameList(newGamelist);
            }
        }
        if (command === "down")
        {
            if (index !== gamelist.games.length - 1)
            {
                let newGamelist = {...gamelist};
                const game = newGamelist.games[index];
                newGamelist.games.splice(index, 1);
                newGamelist.games.splice(index + 1, 0, game);
                setGameList(newGamelist);                
            }
        }
        if (command === "delete")
        {
            let newGamelist = {...gamelist};
            newGamelist.games.splice(index, 1);
            setGameList(newGamelist); 
        }
    }

    useEffect(() => {
        lookupAPICall();
    }, [])

    return ( 
        <>
            ID: {id}
            <section className="gamelist">
                {gamelist ? (
                    <>
                        <h2>{gamelist.title}</h2>
                        <div>{gamelist.description}</div>
                        {gamelist.games.map((game, index) => {
                            return(
                                <div className="game" key={game.id}>
                                    <h3>
                                        {index + 1}. {game.name}
                                    </h3>
                                    <div>
                                        <div><button onClick={() => handleClick('up', index)}><FaArrowUp /></button></div>
                                        <div><button onClick={() => handleClick('delete', index)} className="x"><HiX /></button></div>
                                        <div><button onClick={() => handleClick('down', index)}><FaArrowDown /></button></div>
                                    </div>
                                    <div><img src={game.url} alt={`${game.name} cover art`} className="game-image"></img></div>
                                </div>
                            );
                        })}
                    </>
                ) : (
                    <Spinner />
                )}
            </section>
            <GameLookup gamelist={gamelist}/>
        </>
     );
}
 
export default GameList;