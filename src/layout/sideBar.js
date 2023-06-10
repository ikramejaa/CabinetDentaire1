import React from 'react'
import { Link } from 'react-router-dom';
import "../css/sideBar.css"


export default function sideBar() {
  return (
    <div className="sidebar">
        <Link to="/" className="sidebar-link">Home</Link>
        <Link to="/" className="sidebar-link">Patients</Link>
      {/* Add more links as needed */}
    </div>
  )
}
