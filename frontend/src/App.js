import './App.css';
import Navbar from './Componetns/Navbar/Navbar';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignUp from './Pages/LoginSignUp';
import Footer from './Componetns/Footer/Footer';
import Invoice from './Pages/Invoice';


function App() {
  return (
    <div>
      
      <BrowserRouter>
      <Navbar />
      <Routes>
      <Route path='/' element = {<Shop/>  } />
     <Route path='/carpet' element = { <ShopCategory category="carpet" /> } />
     <Route path='/cushion' element = { <ShopCategory category="cushion"/> } />
     <Route path='/curtain' element = { <ShopCategory category="curtains"/> } /> 
     <Route path='/product/:productId' element={<Product />} />
     <Route path='cart' element = {<Cart />} />
     <Route path='login' element = {<LoginSignUp />} /> 
     <Route path='invoice' element = {<Invoice />} /> 

      </Routes>
      <Footer />
      </BrowserRouter>

    </div>
  );
}

export default App;
