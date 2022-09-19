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
        <header className="site-header">
            <div className="wrapper site-header__wrapper">
                <div className="logo">
                    <Link to="/">Game Lists</Link>
                </div>
                <nav className="nav">
                    <button className="nav__toggle" aria-expanded="false" type="button">
                        menu
                    </button>
                    <ul className="nav__wrapper">
                        {user ? (
                            <li className="nav__item">
                                <Link to="/login" onClick={onLogout}>
                                    <FaSignOutAlt /> Logout
                                </Link>
                                {/* <button className="btn" onClick={onLogout}>
                                    <FaSignOutAlt /> Logout
                                </button> */}
                            </li>
                        ) : (
                            <>
                                <li className="nav__item">
                                    <Link to="/login">
                                        <FaSignInAlt /> Login
                                    </Link>
                                </li>
                                <li className="nav__item">
                                    <Link to="/register">
                                        <FaUser /> Register
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
}



export default Header;