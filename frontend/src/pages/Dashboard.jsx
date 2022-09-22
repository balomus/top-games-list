import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import GameListItem from "../components/GameListItem";
import Spinner from "../components/Spinner";
import { getGameLists } from "../features/gameLists/gameListSlice";
import { reset } from "../features/auth/authSlice";
// import GameLookup from "../components/GameLookup";

function Dashboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { gameLists, isLoading, isError, message } = useSelector((state) => state.gameLists);

    useEffect(() => {
        if (isError) {
            console.log(message);
        }

        dispatch(getGameLists());

        return () => {
            dispatch(reset());
        }
    }, [navigate, isError, message, dispatch])

    useEffect(() => {
        if (!user)
        {
            navigate('/login');
        }
    }, [user]);

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <section className="heading">
                <h1>Welcome {user && user.name}</h1>
                <p>Games List Dashboard</p>
                <button>Create new game list</button>
            </section>

            <section className="content">
                {gameLists.length > 0 ? (
                    <div className="gameLists">
                        {gameLists.map((gameList) => (
                            <GameListItem key={gameList._id} gameList={gameList} />
                        ))}
                    </div>
                ) : (
                    <h3>You have not created any game lists</h3>
                )}
            </section>
        </>
    )
}

export default Dashboard;