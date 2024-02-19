import React, { useContext } from 'react'
import  "./Cartitem.css"
import { ShopContext } from '../../Context/ShopContext'
import { Link } from 'react-router-dom'

const Cartitem = () => {
    const {getTotalCartAmount,menu,cartItems,removeFromToCart} = useContext(ShopContext)
  return (
    <div className='cartitem'>
        <div className="cartitem-format-main">
            <p>Product</p>
            <p>Tital</p> 
            <p>Price</p>
            <p>Quantity</p>
            <p>total</p>
            <p>Remove</p>
        </div>
        <hr />
        {menu.map((e)=>{
            if(cartItems[e.id]>0){
                return <div>
                <div className="cartitem-format cartitem-format-main">
                <img src={e.image} alt=""  className='carticon-product-icon'/>
                <p>{e.name}</p>
                <p>${e.price}</p>
                <button className='cartitem-quantity'>{cartItems[e.id]}</button>
                <p>{e.price*cartItems[e.id]}</p>
                <i class="fa-regular fa-trash" onClick={()=>{removeFromToCart(e.id)}}></i>
             
            </div>
            
            
            <hr />
            </div>
            }
            return null; 
        })}

    <div className="cartitem-down">
        <div className="cartitem-total">
            <h1>Cart Totals</h1>
            <div>
                <div className="cartitem-total-item">
                    <p>Subtotal</p>
                    <p>${getTotalCartAmount()}</p>

                </div>
                <hr />
                <div className="cartitem-total-item">
                    <p>Shipping Fee</p>
                    <p>Free</p>
                </div>
                <hr />
                <div className="cartitem-total-item">
                    <h3>Total</h3>
                    <h3>${getTotalCartAmount()}</h3>
                </div>
            </div>
            <Link to="/invoice">
            <button>PROCEED TO CHECKOUT</button>
            </Link>
        </div>
    </div>
    </div>

  )
}

export default Cartitem
