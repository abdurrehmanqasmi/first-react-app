import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom'
import ProductDisplay from '../Componetns/ProductDisplay/ProductDisplay'
 import { ToastContainer, toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';

const Product = () => {
    const {menu} = useContext(ShopContext)
    const {productId} = useParams()
    const product = menu.find((e) => e.id === Number(productId))
    // alert('Add to Cart')

    const notify = () => toast.success("Added to Cart!",{
      position:"top-center"
    });

  return (
    <div>
      
      <ProductDisplay product={product} notify={notify}/>
      <ToastContainer />
    </div>
  )
}

export default Product
