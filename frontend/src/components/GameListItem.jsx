import { useDispatch } from "react-redux";
import { deleteGameList } from "../features/gameLists/gameListSlice";

const GameListItem = ({gameList}) => {
    const dispatch = useDispatch();

    return ( 
        <div className="gameList">
            <h2>{gameList.title}</h2>
            <button onClick={() => dispatch(deleteGameList(gameList._id))} className="close">
                X
            </button>
        </div>
     );
}
 
export default GameListItem;