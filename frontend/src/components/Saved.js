import SavedItem from "./SavedItem";
import Navbar from "./NavBar";
import { useState } from "react";

import api from "../utils/api";
import { useEffect } from "react";

export default function Saved() {

  const [savedItems, setSavedItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() =>{
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
  }, [])
  return (
    <>
        <Navbar />
        <div className="saved-container">
        {loading && <p>Loading...</p>}
        {error && <p>Error fetching data: {error}</p>}


            <h2>Your Saved Items</h2>
            <div className="saved-list">
                {savedItems.length > 0 ? (
                savedItems.map((savedItem) => <SavedItem key={savedItem.item.id} item={savedItem.item} />)
                ) : (
                <p>No items saved yet!</p>
                )}
            </div>
        </div>
    </>
    
  );
}
