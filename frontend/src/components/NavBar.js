import React from 'react';
import bounceLogo from '../assets/icon.svg'
import { Link } from 'react-router-dom'; // Assuming you are using react-router for navigation
import { FaShoppingCart, FaHeart, FaUser } from 'react-icons/fa'; // You can replace these with your icons

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        {/* Logo and Shop Link */}
        <Link to="/" className="logo">
          <img src={bounceLogo} alt="Logo" />
        </Link>
        <Link to="/shop" className="shop-link">Shop</Link>
      </div>

      <div className="navbar-search">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
        />
      </div>

      <div className="navbar-right">
        {/* Icons */}
        <FaHeart className="navbar-icon" title="Saved Items" />
        <FaShoppingCart className="navbar-icon" title="Cart" />
        <FaUser className="navbar-icon" title="User Profile" />
      </div>
    </nav>
  );
};

export default Navbar;
