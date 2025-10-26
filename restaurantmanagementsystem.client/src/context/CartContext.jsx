import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

const addToCart = (menuItem, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === menuItem.id);
 
      if (existingItem) {
        return prevItems.map(item =>
          item.id === menuItem.id
    ? { ...item, quantity: item.quantity + quantity }
      : item
        );
}
      
   return [...prevItems, { ...menuItem, quantity }];
    });
  };

  const removeFromCart = (menuItemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== menuItemId));
  };

  const updateQuantity = (menuItemId, quantity) => {
 if (quantity <= 0) {
      removeFromCart(menuItemId);
      return;
  }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === menuItemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
 cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export default CartContext;
