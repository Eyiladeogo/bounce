import shoe from '../assets/red-cement.png'

export default function SavedItem({item}){
    return(
        <div className="saved-item">
            <img src={shoe} alt={item.name} className="saved-item-image" />
            <div className="saved-item-details">
                <h3>{item.name}</h3>
                <p className="saved-item-price">${item.price}</p>
            </div>
            <button className="remove-saved-item">Remove</button>
        </div>
    )
}