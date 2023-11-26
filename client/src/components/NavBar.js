import React from "react";
import { Link } from 'react-router-dom'; // Import the Link component
import "../styles/NavBar.css";
import Logo from '../assets/dl-telekom-logo-01.jpg';
import { useAuth } from './AuthContext';

function Navbar() {
    const { isLoggedIn, setIsLoggedIn } = useAuth();

    const handleLogout = () => {
        setIsLoggedIn(false);
        // Perform any other logout operations here
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/"> {/* Wrap the image in a Link component */}
                    <img src={Logo} alt="Logo" className="logo"/>
                </Link>
            </div>
            <div className="navbar-links">
                {!isLoggedIn && <Link to="/signin" className="navbar-link">Log In</Link>} {/* Use Link instead of 'a' */}
                {!isLoggedIn && <Link to="/registration" className="navbar-link navbar-link-sign-in">Sign In</Link>}
                {isLoggedIn && <a href="/" className="navbar-link" onClick={handleLogout}>Log Out</a>}
            </div>
        </nav>
    );
}

export default Navbar;
