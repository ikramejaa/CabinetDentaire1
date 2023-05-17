import React from 'react'
import toothIcon from '../icons/tooth.png';
import '../css/navbar.css';


export default function Navbar() {
  return (
    <div>
        <nav className="headcommon">
            <span className="icon">
                <img src={toothIcon} alt="Tooth icon" />
            </span>
            <div className="container-fluid">
                <label>
                    Cabinet Dentaire
                </label>
            </div>
        </nav>
    </div>
  )
}
