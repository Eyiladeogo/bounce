import SavedItem from "./SavedItem";
import Navbar from "./NavBar";

const savedItems = [
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

export default function Saved() {
  return (
    <>
        <Navbar />
        <div className="saved-container">
            <h2>Your Saved Items</h2>
            <div className="saved-list">
                {savedItems.length > 0 ? (
                savedItems.map((item) => <SavedItem key={item.id} item={item} />)
                ) : (
                <p>No items saved yet!</p>
                )}
            </div>
        </div>
    </>
    
  );
}
