// Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>🏨 Hotel App</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/rooms">Rooms</Link>
        <Link to="/bookings">All Bookings</Link>
        <Link to="/mybookings">My Bookings</Link>
        <Link to="/admin" className="admin-link">Admin</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">SignupForm</Link>
      </div>
    </nav>
  );
};

export default Navbar;
