import React from 'react'
import ring from "../../images/ring.png"
import necklace from "../../images/necklace.png"

const ProductPanel = ({name, price, type, handleDetailsOpen, addToCart}) => {


  return (
    <div className='product-panel'>
        <img src={type == "necklace" ? necklace : ring} className='img-icon'/>
        <div>
            <h2 className='product-name'>{name}</h2>
            <p>${price}</p>
        </div>
        <div className='button-wrap'>
            <button className='search-button' onClick={e => handleDetailsOpen(e.target.value, e.target.id)} value="ring" id="1">View Details</button>
            <button className='search-button' onClick={e => addToCart(e.target.id)} id="1">Add to Cart</button>
        </div>
    </div>
  )

  
}

export default ProductPanel