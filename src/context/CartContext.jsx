import React, { createContext, useState, useContext } from 'react';

// 1. CREATE CONTEXT
// Initialize Context with default value structure (cartItems, action functions)
const CartContext = createContext();

// 2. CUSTOM HOOK FOR EASY ACCESS
// Create and export a custom hook `useCart` that wraps `useContext(CartContext)`
// - Include a guard check to throw an error if used outside a CartProvider
export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
}

// 3. PROVIDER COMPONENT
export function CartProvider({ children }) {
  // STATE MANAGEMENT
  // Define state for `cartItems` (array of objects with product info + quantity)
  const [cartItems, setCartItems] = useState([]);

  // CART OPERATIONS / HANDLERS
  
  // Implement `addToCart(product)`
  // - Check if the product already exists in `cartItems`
  // - If it exists: increment its `quantity`
  // - If it does not exist: append new product object with `quantity: 1`
  function addToCart(product) {
    setCartItems(prevCartItems => {
      const exists = prevCartItems.some(item => item.id === product.id);

      if (exists) {
        return prevCartItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCartItems, { ...product, quantity: 1 }];
      }
    });
  }

  // Implement `removeFromCart(productId)`
  // - Filter out the product matching `productId` from `cartItems`
  function removeFromCart(productId) {
    setCartItems(prevCartItems => 
      prevCartItems.filter(item => item.id !== productId)
    );
  }

  // Implement `updateQuantity(productId, newQuantity)`
  // - If `newQuantity <= 0`: trigger `removeFromCart` or filter it out
  // - Otherwise: update matching item's `quantity` property
  function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems(prevCartItems =>
          prevCartItems.map(item =>
            item.id === productId
              ? { ...item, quantity: newQuantity }
              : item
          )
      );
    }
  }

  // Implement `clearCart()`
  // - Reset `cartItems` state to an empty array
  function clearCart() {
    setCartItems([]);
  }

  // DERIVED STATE / COMPUTED VALUES
  // Calculate `totalItemsCount` (sum of all item quantities in cart)
  const totalItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  // Calculate `cartSubtotal` (sum of each item's price * quantity)
  const cartSubtotal = cartItems.reduce((subTotal, item) => subTotal + (item.price * item.quantity), 0);

  // CONTEXT VALUE
  // Bundle state, computed values, and handler functions into an object
  const value = {
    cartItems,
    totalItemsCount,
    cartSubtotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// Export Context as default or named export if needed
export default CartContext;
