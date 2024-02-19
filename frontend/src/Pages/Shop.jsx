import React, {useContext  } from 'react'
import './CSS/shop.css'
import { ShopContext } from '../Context/ShopContext'
import { Link } from 'react-router-dom'


const Shop = () => {
  const {menu} = useContext(ShopContext)
  return (
    <div className='shop-category'>      
       <div className="shop-category-product">
        {menu.map((curElem) => {
           return (
            <div key={curElem.id}>
                  <h2 className='card-title'> {curElem.name} </h2>            
                <Link to={`/product/${curElem.id}`}> 
                <img
                className='card-media'
                  src={curElem.image}
                  alt={curElem.image}                  
                /></Link>
                <h1 className='item-price'>${curElem.price} </h1>
            </div>
          );
        })}
        </div>      
    </div>

   
  )
}

export default Shop
