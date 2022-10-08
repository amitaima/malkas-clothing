import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

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

const removeCartItem = (cartItems, productToRemove) => {
  return cartItems.filter((item) => item.id !== productToRemove.id);
};

const increaseItemQuantity = (cartItems, productToAdd) => {
  return cartItems.map((item) =>
    item.id === productToAdd.id
      ? { ...item, quantity: item.quantity + 1 }
      : item
  );
};

const decreaseItemQuantity = (cartItems, productToRemove) => {
  return cartItems.map((item) =>
    item.id === productToRemove.id
      ? item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
      : item
  );
};

export const setCart = (cartArr) => {
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartArr);
};

export const setIsCartOpen = (bool) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
export const removeItemFromCart = (cartItems, productToRemove) => {
  const newCartItems = removeCartItem(cartItems, productToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
export const addQuantity = (cartItems, productToAdd) => {
  const newCartItems = increaseItemQuantity(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
export const removeQuantity = (cartItems, productToRemove) => {
  const newCartItems = decreaseItemQuantity(cartItems, productToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
