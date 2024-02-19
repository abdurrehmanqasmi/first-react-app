import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { Link } from 'react-router-dom'
// import '../CSS/Shopcategory'
import "./shopcategory.css"

const ShopCategory = (props) => {
  const {menu} = useContext(ShopContext)
  return (
    <div className='shop-category'>
      <div className="shop-category-product">
        {menu.map((curElem)=>{
          if (props.category===curElem.category){
            return (
              <div key={curElem.id}>
                    <h2 className='card-title'> {curElem.name} </h2>
               <Link to={`/product/${curElem.id}`}>
                <img
                    src={curElem.image}
                    alt={curElem.image}
                    className='card-media'
                  /></Link>   
                  <h1 className='item-price'>${curElem.price} </h1>
              </div>
            );
          }
          else{
            return null;
          }
          
       })}

       
      </div>
    </div>
  )
}

export default ShopCategory
