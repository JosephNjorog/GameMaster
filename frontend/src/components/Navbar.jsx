import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css'; // Import the Navbar styling

const Navbar = () => {
  const location = useLocation(); // Get current location to highlight the active link

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="navbar-title">YourApp</Link> {/* Update with your app's name */}
      </div>
      <ul className="navbar-links">
        <li className={location.pathname === '/' ? 'active' : ''}>
          <Link to="/">Dashboard</Link>
        <li className={location.pathname === '/games' ? 'active' : ''}>
          <Link to="/games">Games</Link>
        </li>
        <li className={location.pathname === '/payment' ? 'active' : ''}>
          <Link to="/payment">Payment</Link>
        </li>
        <li className={location.pathname === '/login' ? 'active' : ''}>
          <Link to="/login">Login</Link>
        </li>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
