import React from 'react';
import bounceLogo from '../assets/icon.svg'
import SignIn from './SignIn';
import { Link } from 'react-router-dom'; // Assuming you are using react-router for navigation
import { FaShoppingCart, FaHeart, FaUser, FaSearch } from 'react-icons/fa'; // You can replace these with your icons
import { useSelector, useDispatch } from 'react-redux';
import { login,logout } from '../features/authSlice';

const Navbar = () => {

  
  const { isAuthenticated, user } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  return (
    // <nav className="navbar">
    //   <div className="navbar-left">
    //     {/* Logo and Shop Link */}
    //     <Link to="/" className="logo">
    //       <img src={bounceLogo} alt="Logo" />
    //     </Link>
    //     <Link to="/shop" className="shop-link">Shop</Link>
    //   </div>

    <nav className="flex justify-between items-center bg-white px-12 py-4 shadow-md">
        <div className="flex items-center">
            {/* Logo and Shop Link */}
            <Link to="/" className="mr-8">
            <img src={bounceLogo} alt="Logo" className="h-10" />
            </Link>
            <Link to="/shop" className="text-black montserrat font-bold text-lg">SHOP</Link>
        </div>

        <div className="relative mx-auto w-1/5">
            {/* Search Bar */}
            <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 border border-gray-300 montserrat rounded-full text-center"
            />
            <FaSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500' />
        </div>

      <div className="flex gap-4 text-2*1 icons">
        {/* Icons */}
        <Link to='/saved'>
            <FaHeart className="text-black cursor-pointer" title="Saved Items" />
        </Link>
        <Link to='/cart'>
            <FaShoppingCart className="text-black cursor-pointer" title="Cart" />
        </Link>
        {
          isAuthenticated ? 
          (
            <FaUser className="text-black cursor-pointer" title="User Profile" />
          ) : (
            <SignIn/>
          )
          
          
        }
        {/* <button className="text-black cursor-pointer" title="Sign In" >Sign In</button> */}
        
      </div>
    </nav>
  );
};

export default Navbar;
