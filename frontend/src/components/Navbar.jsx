import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/chess">Chess</Link>
        <Link to="/ludo">Ludo</Link>
        <Link to="/scrabble">Scrabble</Link>
        <Link to="/draft">Draft</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </nav>
    </header>
  );
};

export default Navbar;
