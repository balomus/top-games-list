import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { HiX } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import GameLookup from "../components/GameLookup";
import "./GameList.css";
import { getGameLists, updateGameList } from "../features/gameLists/gameListSlice";
import { useSelector, useDispatch } from 'react-redux';

const GameList = () => {

    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const { gameLists } = useSelector((state) => state.gameLists);
    const [localGameList, setLocalGameList] = useState();
    
    useEffect(() => {
        dispatch(getGameLists());
    }, [dispatch])

    useEffect(() => {
        const found = gameLists.find(e => e._id === searchParams.get('id'));
        setLocalGameList(found);
        console.log(found);
    }, [gameLists, searchParams])

    const handleClick = (command, index) => {
        const newGameListObj = {...localGameList};
        const newGameList = [...localGameList.games];
        const game = newGameList[index];

        if (command === "up")
        {
            if (index !== 0)
            {
                newGameList.splice(index, 1);
                newGameList.splice(index - 1, 0, game);
            }
        }
        if (command === "down")
        {
            if (index !== newGameList.length - 1)
            {
                newGameList.splice(index, 1);
                newGameList.splice(index + 1, 0, game);
            }
        }
        if (command === "delete")
        {
            newGameList.splice(index, 1);
        }
        newGameListObj.games = newGameList;
        setLocalGameList(newGameListObj);
    }

    const handleSave = () => {
        // axios.get(serverAPI + "gamelists/" + id)
        // .then((response) => {
        //     if (JSON.stringify(response.data) === JSON.stringify(gamelist))
        //     {
        //         console.log('Same game list');
        //     }
        //     else
        //     {
        //         console.log('Different lists');
        //         // dispatch(updateGameList(gamelist._id));
        //         dispatch(updateGameList(gamelist));
        //     }
        // })
        // .catch((error) => {
        //     console.log(error);
        // })
    }

    return ( 
        <>
            <section className="gamelist">
                {localGameList ? (
                    <>
                        ID: {localGameList._id}
                        <h2>{localGameList.title}</h2>
                        <div>{localGameList.description}</div>
                        {localGameList.games.map((game, index) => {
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
        </>
     );
}
 
export default GameList;