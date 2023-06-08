import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.productId === item.productId);
    if (existingItem) {
      const updatedItem = { ...existingItem, quantity: existingItem.quantity + 1 };
      setCartItems((prevItems) =>
        prevItems.map((cartItem) => (cartItem.productId === item.productId ? updatedItem : cartItem))
      );
    } else {
      const newItem = { ...item, quantity: 1 };
      setCartItems((prevItems) => [...prevItems, newItem]);
    }

  };
  
  const removeFromCart = (item) => {
    setCartItems((prevItems) => prevItems.filter((i) => i.productId !== item.productId));
  };
  const updateQuantity = (itemId, newQuantity) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.productId === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };
  
  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart ,updateQuantity}}>
      {children}
    </CartContext.Provider>
  );
};