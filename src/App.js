import React from 'react';
import {Products,Navbar,Cart,Checkout} from './Components';
import {useState, useEffect} from 'react';
import {commerce} from './lib/commerce';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';


const App = () => {
  const [products,setProducts] = useState([]);
  const [cart,setCart] = useState({});
  
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);

    setCart(item);
  };

  const handleUpdateCartQty = async (lineItemId, quantity) => {
    const response = await commerce.cart.update(lineItemId, { quantity });

    setCart(response);
  };

  const handleRemoveFromCart = async (lineItemId) => {
    const response = await commerce.cart.remove(lineItemId);

    setCart(response);
  };

  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();

    setCart(response);
  };


  

  useEffect(()=>{
    fetchProducts();
    fetchCart();
   
  },[]);
 

  return (
    <Router>
    <div>
       <Navbar totalItems={cart.total_items}/>
       <Routes>
        <Route exact path="/" element={<Products products ={ products} onAddToCart ={handleAddToCart}/>}/>
        
      
        <Route exact path="/cart" element={ <Cart 
        cart={cart}
        onUpdateCartQty={handleUpdateCartQty}
        onRemoveFromCart={handleRemoveFromCart}
        onEmptyCart={handleEmptyCart}
         />}/>
       
       </Routes>
        
    </div>
    </Router>
  )
}

export default App;