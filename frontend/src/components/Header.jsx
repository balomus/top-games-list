import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import './Header.css';

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    }

    return (
        <header className="header-container">
            <div className="logo header-section">
                <Link to="/">Game Lists</Link>
            </div>
            <div className="header-section">
                <nav className="nav">
                    {user ? (
                        <>
                            <Link to="/login" onClick={onLogout}>
                                <FaSignOutAlt /> Logout
                            </Link>
                        </>
                    ) : (
                        <nav>
                            <Link to="/login">
                                <FaSignInAlt /> Login
                            </Link>
                            <Link to="/register">
                                <FaUser /> Register
                            </Link>
                        </nav>
                    )}
                </nav>
            </div>
        </header>
    );
}



export default Header;