import { useDispatch } from "react-redux";
import { deleteGameList } from "../features/gameLists/gameListSlice";
import { Link } from "react-router-dom";

const GameListItem = ({gamelist}) => {
    const dispatch = useDispatch();

    return ( 
        <div className="gamelist">
            <h2><Link to={"/gamelist?id=" + gamelist._id} gamelist={gamelist}>{gamelist.title}</Link></h2>
            <button onClick={() => dispatch(deleteGameList(gamelist._id))} className="close">
                X
            </button>
        </div>
     );
}
 
export default GameListItem;