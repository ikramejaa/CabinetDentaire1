import React from 'react';
import { Link } from "react-router-dom";
import "../css/Navbar.css";
export default function Navbar() {
  return (
    <div className="div-navbar">
      <nav className="navbar navbar-expand-lg navbar-dark ">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">Navbar</a>
    <Link className="btn btn-outline-light" to="/adduser">+</Link>
    </div>
     </nav>
    </div>
  )
}
