import NavBar from './NavBar.js'
import api from '../utils/api.js'
import { useEffect, useState } from 'react'

export default function Shop(){

    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)


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
                    </div>
                ))}
        </div>
        </>
        
    )
}