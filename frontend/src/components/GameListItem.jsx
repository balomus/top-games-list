import { useDispatch } from "react-redux";
import { deleteGameList } from "../features/gameLists/gameListSlice";
import { Link, useNavigate } from "react-router-dom";

const GameListItem = ({gameList}) => {
    const dispatch = useDispatch();

    return ( 
        <div className="gameList">
            <h2><Link to={"/gamelist" + "?id=" + gameList._id} gameList={gameList}>{gameList.title}</Link></h2>
            <button onClick={() => dispatch(deleteGameList(gameList._id))} className="close">
                X
            </button>
        </div>
     );
}
 
export default GameListItem;