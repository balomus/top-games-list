import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { HiX } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import axios from "axios";
import GameLookup from "../components/GameLookup";
import "./GameList.css";
import { getGameLists, updateGameList } from "../features/gameLists/gameListSlice";
import { useSelector, useDispatch } from 'react-redux';

const GameList = () => {

    const dispatch = useDispatch();

    const serverAPI = "/api/";

    const [searchParams] = useSearchParams();

    const [gamelist, setGameList] = useState();

    const { gameLists, isLoading, isError, message } = useSelector((state) => state.gameLists);

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

    const handleSave = () => {
        axios.get(serverAPI + "gamelists/" + id)
        .then((response) => {
            if (JSON.stringify(response.data) === JSON.stringify(gamelist))
            {
                console.log('Same game list');
            }
            else
            {
                console.log('Different lists');
                // dispatch(updateGameList(gamelist._id));
                dispatch(updateGameList(gamelist));
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        lookupAPICall();
        const found = gameLists.find(e => e._id == id)
        console.log("found " + found);
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
                        <button onClick={handleSave}>Save</button>
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