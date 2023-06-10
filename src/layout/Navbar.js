import React from 'react';
import toothIcon from '../assets/tooth.png';
import "../css/Navbar.css";

export default function Navbar() {
  return (
    <div>
    <nav className="navbar-container">
        <span className="icon">
            <img src={toothIcon} alt="Tooth icon" />
        </span>
        <div className="navbar-container-text">
            <label>
                Cabinet Dentaire
            </label>
        </div>
    </nav>
</div>
  )
}
