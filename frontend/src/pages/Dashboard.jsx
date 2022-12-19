import { useEffect } from "react";
import { useNavigate, redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import GameListItem from "../components/GameListItem";
import Spinner from "../components/Spinner";
import { getGameLists, createGameList } from "../features/gameLists/gameListSlice";
import { reset } from "../features/auth/authSlice";
// import GameLookup from "../components/GameLookup";

function Dashboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { gameLists, isLoading, isError, message } = useSelector((state) => state.gameLists);

    useEffect(() => {
        if (isError) {
            // TODO uncomment this and figure out why I'm getting an error in console after logout.
            // console.log(message);
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
    }, [user, navigate]);

    const handleClick = async () => {
        const resp = await dispatch(createGameList({"title": "Title", "games": [], "description": "Game list description."}));
        console.log(resp.payload._id);
        navigate("/gamelist?id=" + resp.payload._id);
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <section className="heading">
                <h1>Welcome {user && user.name}</h1>
                <p>Games List Dashboard</p>
                <button onClick={handleClick}>Create new game list</button>
            </section>

            <section className="content">
                {gameLists.length > 0 ? (
                    <div className="gameLists">
                        {gameLists.map((gameList) => (
                            <GameListItem key={gameList._id} gamelist={gameList} />
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