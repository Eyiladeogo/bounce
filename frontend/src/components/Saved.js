import SavedItem from "./SavedItem";
import Navbar from "./NavBar";
import { useState, useEffect, } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import api from "../utils/api";
import { FaSpinner } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Saved() {

  const [savedItems, setSavedItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const navigate = useNavigate()
  const location = useLocation()

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
        async function fetchSavedItems(){
          try{
              const response = await api.get('saved/')
              console.log(response.data)
              setSavedItems(response.data)
              setLoading(false)
          }
          catch(error){
              setError(error.message)
              setLoading(false)
          }
        }
        fetchSavedItems()
      }
    }
  }, [isAuthenticated])
  return (
    <>
        <Navbar />
        <div className="saved-container">
        {loading && (
          <div className="spinner-container">
            <FaSpinner className="spinner" />
          </div>
        )}
        {error && <p>Error fetching data: {error}</p>}

        {!loading && (
          <>
            <h2>Your Saved Items</h2>
            <div className="saved-list">
                {savedItems.length > 0 ? (
                savedItems.map((savedItem) => <SavedItem key={savedItem.item.id} item={savedItem.item} />)
                ) : (
                <p>No items saved yet!</p>
                )}
            </div>
          </>
          
        )}
            
        </div>
    </>
    
  );
}
