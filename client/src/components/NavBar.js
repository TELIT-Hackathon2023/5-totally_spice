import React from "react";
import "../styles/NavBar.css";
import Logo from '../assets/dl-telekom-logo-01.jpg';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src={Logo} alt="Logo" className="logo"/>
            </div>
            <div className="navbar-links">
                <a href="/signin" className="navbar-link">Log In</a>
                <a href="/registration" className="navbar-link navbar-link-sign-in">Sign In</a>
            </div>
        </nav>
    );
}

export default Navbar;