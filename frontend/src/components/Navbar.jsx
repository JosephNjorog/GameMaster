import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">GameHub</Link>
      <div className="navbar-links">
        <Link to="/">Dashboard</Link>
        <Link to="/games/chess">Chess</Link>
        <Link to="/games/ludo">Ludo</Link>
        <Link to="/games/scrabble">Scrabble</Link>
        <Link to="/games/draft">Draft</Link>
        <Link className="nav-link" to="/login">Login</Link>
        <Link className="nav-link" to="/signup">Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;
