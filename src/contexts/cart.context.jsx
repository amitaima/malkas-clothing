import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find((item) => {
    return productToAdd.id === item.id;
  });

  if (existingCartItem) {
    return cartItems.map((item) =>
      item.id === existingCartItem.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setcartCount] = useState(0);

  useEffect(() => {
    setcartCount(cartItems.reduce((total, item) => total + item.quantity, 0));
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };
  const removeItemFromCart = (productToRemove) => {
    setCartItems(cartItems.filter((item) => item.id !== productToRemove.id));
  };
  const addQuantity = (productToAdd) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === productToAdd.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };
  const removeQuantity = (productToRemove) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === productToRemove.id
          ? item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
          : item
      )
    );
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    addQuantity,
    removeQuantity,
    cartItems,
    cartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
