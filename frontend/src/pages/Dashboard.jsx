import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import Spinner from "../components/Spinner";
import { reset } from "../features/auth/authSlice";
import GameLookup from "../components/GameLookup";

function Dashboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!user)
        {
            navigate('/login');
        }
    }, [user]);

    return (
        <>
            <section className="heading">
                <h1>Welcome {user && user.name}</h1>
                <p>Games List Dashboard</p>
            </section>

            <GameLookup />
        </>
    )
}

export default Dashboard;