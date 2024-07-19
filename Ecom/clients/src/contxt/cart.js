import React, { useState, useContext, createContext, useEffect } from 'react';

const cartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(()=>{
    let existingItems=localStorage.getItem("cart");
    if(existingItems){
      setCart(JSON.parse(existingItems));
    }
  },[])

  return (
    <cartContext.Provider value={[cart, setCart]}>
      {children}
    </cartContext.Provider>
  );
};

const useCart = () => useContext(cartContext);

export { useCart, CartProvider };
