import './navbar.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';

import { AuthContext } from './../../context/AuthContext';

const Navbar = () => {
    const { user } = useContext(AuthContext);

    return (
        <>
            <div className="navbar">
                <div className="navContainer">
                    <Link to="/" className="logo">
                        <span>lamabooking</span>
                    </Link>
                    {user ? (
                        <>
                            <div className="navUser">{user.userName}</div>
                            <div>
                                <Link to={`/transaction/${user._id}`} className="btn">
                                    Transaction
                                </Link>
                            </div>
                            <div>
                                <button>Log out</button>
                            </div>
                        </>
                    ) : (
                        <div className="navItems">
                            <Link to="/login" className="navButton">
                                Register
                            </Link>
                            <Link to="/login" className="navButton">
                                Login
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Navbar;
