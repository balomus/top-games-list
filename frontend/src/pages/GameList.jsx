import { FaArrowUp, FaArrowDown, FaShareAlt } from "react-icons/fa";
import { HiX } from "react-icons/hi";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import "./GameList.css";
import "../components/GameLookup.css";
import { getGameLists, updateGameList } from "../features/gameLists/gameListSlice";
import { useSelector, useDispatch } from 'react-redux';
import GameLookup from "../components/GameLookup";
import axios from 'axios';
import Modal from 'react-modal';
import { toast } from "react-toastify";

Modal.setAppElement('#root');

const GameList = () => {

    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const { gameLists, isLoading } = useSelector((state) => state.gameLists);
    const { user } = useSelector((state) => state.auth);
    const [localGameList, setLocalGameList] = useState();
    const [owner, setOwner] = useState();
    const [modalIsOpen, setIsOpen] = useState(false);
    
    useEffect(() => {
        dispatch(getGameLists());
    }, [dispatch])

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('/api/gamelists/' + searchParams.get('id'));
            setLocalGameList(response.data);
            if (user)
            {
                if (user._id === response.data.user)
                {
                    setOwner(true);
                }
                else
                {
                    setOwner(false);
                }
            }
            else
            {
                setOwner(false);
            }
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameLists, searchParams])

    useEffect(() => {
        const alertUser = (e) => {
            let sameList = JSON.stringify(localGameList) === JSON.stringify(gameLists.find(e => e._id === searchParams.get('id')));
            if (!sameList)
            {
                e.preventDefault();
                e.returnValue = '';
                return;
            }
            return;
        }

        window.addEventListener('beforeunload', alertUser)
        return () => {
            window.removeEventListener('beforeunload', alertUser)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [localGameList])


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

    const onEnter = (e) => {
        if (e.key === "Enter")
        {
          e.target.blur();
        }
    }

    const handleShare = async (e) => {
        e.preventDefault();
        console.log('Share link clicked');
        console.log(window.location.href);
        console.log('window.isSecureContext = ' + window.isSecureContext)
        if (navigator.clipboard)
        {
            console.log('navigator.clipboard exists')
        }
        else
        {
            console.log('navigator.clipboard does not exist');
        }
        try 
        {
            await navigator.clipboard.writeText(window.location.href);
            toast.info("URL Copied to clipboard");
        }
        catch (err)
        {
            console.error('Could not write to clipboard', err);
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
            toast.error("No changes made to the game list. Please make changes first.");
        }
        else
        {
            console.log('Different game list, updating game list in DB');
            console.log('gameLists version:');
            console.log(gameLists.find(e => e._id === searchParams.get('id')));
            await dispatch(updateGameList(localGameList));
            dispatch(getGameLists());
            toast.success("Game list has been updated successfully.");
        }
    }

    const openModal = () => {
        setIsOpen(true);
    }

    const afterOpenModal = () => {
        // console.log("afterOpenModal ran");
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    if (isLoading)
    {
        return (<Spinner />)
    }

    return ( 
        <>
            { owner &&
            <section className="gameLookup">
                <button onClick={openModal}>Add Games</button>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={ { content: { backgroundColor: 'black' } } }
                    contentLabel="Game Lookup Modal"
                >
                    <GameLookup localGameList={localGameList} setLocalGameList={setLocalGameList} closeModal={closeModal} />
                </Modal>
            </section>
            }
            <section className="gamelist">
                {localGameList ? (
                    <>
                        {/* Gamelist ID: {localGameList._id} */}
                        <>
                            { owner ?
                                <div className="title">
                                    <label >Title:</label>
                                    <div><input type="text" name="title" value={localGameList.title} onChange={onChange} /></div>
                                </div>
                            : 
                                <h2>{localGameList.title}</h2>
                            }
                            
                            {/* {localGameList.title} */}
                        </>
                        <>
                            { owner ? 
                                <div className="description">
                                    <label>Description:</label>
                                    <div><input type="text" name="description" value={localGameList.description} onChange={onChange} onKeyUp={onEnter} /></div>
                                </div>
                            : 
                                <h3>{localGameList.description}</h3>
                            }
                            <Link onClick={handleShare}><FaShareAlt /></Link>
                        </>
                        {localGameList.games.map((game, index) => {
                            return(
                                <div className="game" key={game.id}>
                                    <h3>
                                        {index + 1}. {game.name}
                                    </h3>

                                    { owner && 
                                    <div className="button-controls">
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
            
        </>
     );
}
 
export default GameList;