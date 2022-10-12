import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Spinner from "../components/Spinner";
// import { getGameLists } from "../features/gameLists/gameListSlice";
import axios from "axios";
import GameLookup from "../components/GameLookup";
import "./GameList.css";

const GameList = () => {
    // const dispatch = useDispatch();

    const serverAPI = "/api/";

    const [searchParams, setSearchParams] = useSearchParams();

    const [gamelist, setGameList] = useState();

    const id = searchParams.get('id');

    const lookupAPICall = () => {
        axios.get(serverAPI + "gamelists/" + id)
        .then((response) => {
            console.log(response.data);
            setGameList(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
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
                        {gamelist.games.map((game) => {
                            return(
                                <div className="game" key={game.id}>
                                    <h3>{game.name}</h3>
                                    <div><img src={game.url}></img></div>
                                </div>
                            );
                        })}
                    </>
                ) : (
                    <Spinner />
                )}
            </section>
            {/* <GameLookup /> */}
        </>
     );
}
 
export default GameList;