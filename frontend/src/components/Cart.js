import Navbar from "./NavBar"
import CartItem from "./CartItem.js";

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

  var totalPrice = 0
  for (let i=0; i<cartItems.length; i++){
    totalPrice += cartItems[i]['price']
  }

export default function Cart(){
    return(
        <>
            <Navbar />
            <div className="saved-container">
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
