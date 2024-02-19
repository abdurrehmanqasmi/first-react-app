import React, { createContext, useEffect, useState } from "react";
// import Menu from "../Pages/MenuApi";
// import Product from "../Pages/Product";

export const ShopContext = createContext(null)

const getDefaultCart = ()=>{
    let cart = { };
    for (let index = 0; index < 300+1; index++) {
         cart[index] = 0
        
    }
        return cart;
}

const ShopContextProvider = (props) =>{

    const [menu, setMenu] = useState([])
    const [cartItems, setCartItems] = useState(getDefaultCart())

    useEffect(()=>{
        fetch('http://localhost:4000/allproducts')
        .then((response)=>response.json())
        .then((data)=>setMenu(data))

        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/getcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: "",
            })
            .then((response)=>response.json())
            .then((data)=>setCartItems(data))
        }
    },[])
   
    const addToCart = (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        if(localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/addtocart',{  
                method:'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data));
        }

    }

    const removeFromToCart = (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/removefromcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data));
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
          if (cartItems[item] > 0) {
            let itemInfo = menu.find((product) => product.id === Number(item));
            totalAmount += itemInfo.price * cartItems[item];
          }
        }
        return totalAmount;
      };

      const getTotalCartItem = () =>{
        let totalItem = 0;
        for( const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                totalItem+= cartItems[item];
            }
        }
        return totalItem;
      }
      

    const caontextValue = {getTotalCartItem,getTotalCartAmount,menu,cartItems,addToCart,removeFromToCart}
    
    return (
        <ShopContext.Provider value={caontextValue}>
            {props.children}
        </ShopContext.Provider>
     )
}

export default ShopContextProvider