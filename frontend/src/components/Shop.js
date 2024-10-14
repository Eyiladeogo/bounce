import NavBar from './NavBar.js'
import api from '../utils/api.js'
import { useEffect, useState } from 'react'
import { FaHeart, FaShoppingCart } from 'react-icons/fa'
import { useSelector } from 'react-redux'

export default function Shop(){

    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)


    useEffect(() =>{
        async function fetchShopData(){
            try{
                const response = await api.get('shop/')
                setItems(response.data)
                setLoading(false)
            }
            catch(error){
                setError(error.message)
                setLoading(false)
            }
        }

        fetchShopData()
    }, [])

    const handleSaveItem = async (item) =>{
        console.log(item)
        // console.log(item.id)
        if (!isAuthenticated) return

        const updatedItems = items.map(i =>
            i.id === item.id ? { ...i, is_saved: !i.is_saved } : i
        )

        setItems(updatedItems)

        try {
            await api.post('/saved/', {"item_id":item.id})
        } catch (error) {
            console.error("Failed to save item:", error)

            const revertedItems = items.map(i => 
                i.id === items.id ? { ...i, is_saved: !i.is_saved } : i
            )
            setItems(revertedItems)
        }
    }


    return(
        <>
            <NavBar />
        <div className='item-grid'>
            {/* <h1>Shop</h1> */}

            {loading && <p>Loading...</p>}
            {error && <p>Error fetching data: {error}</p>}
                {items.map(item => (
                    <div key={item.id} className='item-card'>
                        <img src={item.image_url} alt={item.name}/>
                        <h2>{item.name}</h2>
                        <h3>${item.price}</h3>

                        {/* Heart Button */}
                        {
                            isAuthenticated && (
                                <button
                                    className="icon-button"
                                    onClick={() => handleSaveItem(item)}
                                    title="Save Item">
                                    <FaHeart className="icon"
                                    style={{ color:item.is_saved? '#d41515':'black' }} />
                                </button>
                            )
                        }
                        
                        
                        {/* Add to Cart Button */}

                        <button
                            className="icon-button"
                            // onClick={() => handleAddToCart(item)}
                            title="Add to Cart"
                        >
                            <FaShoppingCart className="icon" />
                        </button>
                    </div>
                ))}
        </div>
        </>
        
    )
}