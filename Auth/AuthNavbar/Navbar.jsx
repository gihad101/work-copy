import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const handleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    return (
        <nav className="navbar m-1">
            <div className="navbar-logo">
                INNOVEST
            </div>
            <div className="navbar-links-container">
                <ul className="navbar-links d-flex align-items-center mt-2">
                    <li><a href="#invest">Invest</a></li>
                    <li><a href="#how-it-works">How It Works</a></li>
                    <li className="dropdown-container">
                        <a href="#discover" className="dropdown" onClick={handleDropdown}>Discover</a>
                        {dropdownVisible && (
                            <ul className="dropdown-menu">
                                <li><a href="#option1">Option 1</a></li>
                                <li><a href="#option2">Option 2</a></li>
                                <li><a href="#option3">Option 3</a></li>
                            </ul>
                        )}
                    </li>
                    <li><a href="#about">About</a></li>
                </ul>
                <div className="navbar-button ms-3">
                    <button className="get-started-btn">Get Started</button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
