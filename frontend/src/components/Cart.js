import Navbar from "./NavBar"
import CartItem from "./CartItem.js";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";

import api from "../utils/api.js";

const cartItems = [
    {
      id: 1,
      name: 'Tatum 2 "Red Cement"',
      price: 87.97,
    },
    {
      id: 2,
      name: 'Tatum 2 "Red Cement"',
      price: 87.97,
    },
    {
      id: 3,
      name: 'Tatum 2 "Red Cement"',
      price: 87.97,
    },
    {
      id: 4,
      name: 'Tatum 2 "Red Cement"',
      price: 87.97,
    },
  ];

  

export default function Cart(){

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const navigate = useNavigate()
  const location = useLocation()

  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)


  var totalPrice = 0
  for (let i=0; i<cartItems.length; i++){
    totalPrice += cartItems[i]['price']
  }
  
  useEffect(() => {
    if (!isAuthenticated) {
      // If user isn't logged in, redirect them to login
      navigate('/sign-in', { state: { from: location } });
    }
  }, [isAuthenticated, navigate, location]);

  useEffect(() =>{
    if (isAuthenticated){
      const token = localStorage.getItem('token');
      if (token){
        async function fetchCartItems(){
          try{
              const response = await api.get('cart/')
              const cart = response.data['items']
              setCartItems(cart)
              setLoading(false)
          }
          catch(error){
              setError(error.message)
              setLoading(false)
          }
        }
        fetchCartItems()
      }
    }
  }, [isAuthenticated])
    return(
        <>
            <Navbar />
            <div className="saved-container">
            {loading && (
            <div className="spinner-container">
              <FaSpinner className="spinner" />
            </div>
          )}
        {error && <p>Error fetching data: {error}</p>}
            <div className="cart-summary">
                <h2>TOTAL</h2>
                <h3>${totalPrice}</h3>
            </div>
            
            <div className="saved-list">
                {cartItems.length > 0 ? (
                cartItems.map((item) => <CartItem key={item.id} item={item} />)
                ) : (
                <p>Cart is Empty!</p>
                )}
            </div>
        </div>
        </>
        
    )
}
