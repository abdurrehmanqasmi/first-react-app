import React, { useContext } from 'react'
import "./ProductDisplay.css"
import { ShopContext } from '../../Context/ShopContext'

const ProductDisplay = ({product,notify}) => {

    const {addToCart} = useContext(ShopContext)

  return (
    <div className='productdisplay'>
      <div className="productdisplay-left">
        <div className="productdisplay-list-img">
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
            
        </div>
        <div className="productdisplay-img">
            <img className='productdisplay-main-img' src={product.image} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <h1>{product.description}</h1>        
        {/* <div className="productdisplay-right-star">
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
            
            
        </div> */}
        <div className="productdisplay-right-description">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius, corporis dolorum. Consequuntur molestiae eaque perferendis illum quis adipisci accusantium harum!
        </div>
        <h1>{product.price}</h1>
        <button className='btn' onClick={() => { notify(); addToCart(product.id); }}>ADD TO CART</button>

   
      </div>
    </div>
    
  )
}

export default ProductDisplay
