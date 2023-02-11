import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { HiX } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import "./GameList.css";
import { getGameLists, updateGameList } from "../features/gameLists/gameListSlice";
import { useSelector, useDispatch } from 'react-redux';
import GameLookup from "../components/GameLookup";
import axios from 'axios';

const GameList = () => {

    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const { gameLists, isLoading } = useSelector((state) => state.gameLists);
    const { user } = useSelector((state) => state.auth);
    const [localGameList, setLocalGameList] = useState();

    const [owner, setOwner] = useState();
    
    useEffect(() => {
        dispatch(getGameLists());
    }, [dispatch])

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('/api/gamelists/' + searchParams.get('id'));
            setLocalGameList(response.data);
            // console.log(response.data.user)
            if (user)
            {
                // console.log("user exists")
                if (user._id === response.data.user)
                {
                    // console.log("same user")
                    setOwner(true);
                }
                else
                {
                    // console.log("different user")
                    setOwner(false);
                }
            }
            else
            {
                // console.log("no user")
            }
        }
        fetchData();
    }, [gameLists, searchParams])

    const onChange = (e) => {
        let gameList = {...localGameList};
        if (e.target.name === 'title')
        {
            gameList.title = e.target.value;
            setLocalGameList(gameList);
        }
        else if (e.target.name === 'description')
        {
            gameList.description = e.target.value;
            setLocalGameList(gameList);
        }
    }

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

    const handleSave = async () => {
        if (JSON.stringify(localGameList) === JSON.stringify(gameLists.find(e => e._id === searchParams.get('id'))))
        {
            console.log('Same game list, no change made');
            alert("No changes made to the game list. Please make changes first.")
        }
        else
        {
            console.log('Different game list, updating game list in DB');
            console.log('gameLists version:');
            console.log(gameLists.find(e => e._id === searchParams.get('id')));
            await dispatch(updateGameList(localGameList));
            dispatch(getGameLists());
            alert("Game list has been updated successfully.")
        }
    }

    if (isLoading)
    {
        return (<Spinner />)
    }

    return ( 
        <>
            <section className="gamelist">
                {localGameList ? (
                    <>
                        Gamelist ID: {localGameList._id}
                        <h2>
                            { owner ?
                                <input type="text" name="title" value={localGameList.title} onChange={onChange} />
                            : 
                                <>{localGameList.title}</>
                            }
                            
                            {/* {localGameList.title} */}
                        </h2>
                        <h3>
                            { owner ? 
                                <input type="text" name="description" value={localGameList.description} onChange={onChange} />
                            : 
                                <>{localGameList.description}</>
                            }
                            
                        </h3>
                        {localGameList.games.map((game, index) => {
                            return(
                                <div className="game" key={game.id}>
                                    <h3>
                                        {index + 1}. {game.name}
                                    </h3>

                                    { owner && 
                                    <div>
                                        <div><button onClick={() => handleClick('up', index)}><FaArrowUp /></button></div>
                                        <div><button onClick={() => handleClick('delete', index)} className="x"><HiX /></button></div>
                                        <div><button onClick={() => handleClick('down', index)}><FaArrowDown /></button></div>
                                    </div>
                                    }

                                    <div><img src={game.url} alt={`${game.name} cover art`} className="game-image"></img></div>
                                </div>
                            );
                        })}

                        { owner &&
                            <div>
                                {JSON.stringify(localGameList) === JSON.stringify(gameLists.find(e => e._id === searchParams.get('id'))) ? (
                                    <button disabled>Save</button>
                                ) : (
                                    <button onClick={handleSave}>Save</button>
                                )}
                            </div>
                        }
                        
                        
                    </>
                ) : (
                    <Spinner />
                )}
            </section>
            { owner &&
            <section className="gameLookup">
                <GameLookup localGameList={localGameList} setLocalGameList={setLocalGameList} />
            </section>
            }
            
        </>
     );
}
 
export default GameList;