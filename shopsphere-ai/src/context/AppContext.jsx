
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import api from "../services/api";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState({
  name: localStorage.getItem("username") || "Guest",
  email: "",
  role: "USER",
  avatar: (localStorage.getItem("username") || "G")
    .charAt(0)
    .toUpperCase()
});
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [notification, setNotification] = useState(null);
  useEffect(() => {
  const loadCart = async () => {
    try {
      const response = await api.get("/cart");
      setCart(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  loadCart();
}, []);

  const showNotification = useCallback((message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3500);
  }, []);

  const addToCart = useCallback(async (product, qty = 1) => {

  try {

    await api.post(`/cart/add/${product.id}?quantity=${qty}`);
    const response=await api.get("/cart");
    console.log(response.data);
    setCart(response.data);

    showNotification(`${product.name} added to cart`);

  } catch (error) {

    console.error(error);

    showNotification("Failed to add product", "error");

  }

}, [showNotification]);
  const removeFromCart = useCallback(async (cartId) => {

  try {

    await api.delete(`/cart/${cartId}`);
    const response=await api.get("/cart");
    setCart(response.data);


    showNotification("Item removed from cart");

  } catch (error) {

    console.error(error);

    showNotification("Failed to remove item", "error");

  }

}, [showNotification]);
const updateQty = useCallback(async (cartId, qty) => {

  if (qty < 1) {

    removeFromCart(cartId);

    return;

  }

  try {

    await api.put(`/cart/${cartId}?quantity=${qty}`);
    const response=await api.get("/cart");
    setCart(response.data);

    setCart(prev =>
      prev.map(item =>
        item.id === cartId
          ? { ...item, qty }
          : item
      )
    );

  } catch (error) {

    console.error(error);

  }

}, [removeFromCart]);

  const clearCart = useCallback(async () => {

  try {

    await api.delete("/cart/clear");
    const response=await api.get("/cart");
    setCart(response.data);

    setCart([]);

    showNotification("Cart cleared");

  } catch (error) {

    console.error(error);

  }

}, [showNotification]);

  const toggleWishlist = useCallback((product) => {
    setWishlist(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) { showNotification('Removed from wishlist', 'info'); return prev.filter(i => i.id !== product.id); }
      showNotification('Added to wishlist');
      return [...prev, product];
    });
  }, [showNotification]);

  const cartTotal = cart.reduce((sum, i) => sum + i.product.productPrice * i.quantity, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  const login = (userData) => { setUser(userData); showNotification(`Welcome back, ${userData.name}!`); };
  const logout = () => { setUser(null); showNotification('Logged out successfully', 'info'); };

  return (
    <AppContext.Provider value={{
      user, login, logout,
      cart, addToCart, removeFromCart, updateQty, clearCart, cartTotal, cartCount,
      wishlist, toggleWishlist,
      notification, showNotification,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
