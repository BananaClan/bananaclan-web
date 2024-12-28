import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [cartItems] = useState([
    {
      id: 1,
      name: "Adidas Samba Brazil Edition",
      price: 3199,
      size: "UK 7",
      quantity: 1,
      image: "assets/images/WeRecommendImage.jpg",
      seller: "V2 Shoes",
    },
    {
      id: 2,
      name: "Nike Air Force 1",
      price: 4999,
      size: "UK 8",
      quantity: 1,
      image: "assets/images/WeRecommendImage.jpg",
      seller: "Nike Store",
    },
    {
      id: 3,
      name: "Puma RS-X",
      price: 2999,
      size: "UK 9",
      quantity: 1,
      image: "assets/images/WeRecommendImage.jpg",
      seller: "Puma Official",
    },
  ]);

  const getSelectedProducts = () => {
    return cartItems.filter((item) => selectedItems.includes(item.id));
  };

  const calculateSubtotal = () => {
    return selectedItems.reduce((total, itemId) => {
      const item = cartItems.find((i) => i.id === itemId);
      return total + (item ? item.price * item.quantity : 0);
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        selectedItems,
        setSelectedItems,
        cartItems,
        getSelectedProducts,
        calculateSubtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
