import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";
import { updateCartDB } from "../../utils/firebase/firebase.utils";

const addCartItem = (cartItems, productToAdd) => {
  let updatedCart = [];
  const existingCartItem = cartItems.find((item) => {
    return productToAdd.id === item.id;
  });

  if (existingCartItem) {
    updatedCart = cartItems.map((item) =>
      item.id === existingCartItem.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  } else {
    updatedCart = [...cartItems, { ...productToAdd, quantity: 1 }];
  }
  return updatedCart;
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

export const setCart = (cartArr, currentUser) => {
  currentUser && updateCartDB(currentUser, cartArr);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartArr);
};

export const setIsCartOpen = (bool) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);

export const addItemToCart = (cartItems, productToAdd, currentUser) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  currentUser && updateCartDB(currentUser, newCartItems);
  return createAction(
    CART_ACTION_TYPES.SET_CART_ITEMS,
    newCartItems,
    currentUser
  );
};
export const removeItemFromCart = (cartItems, productToRemove, currentUser) => {
  const newCartItems = removeCartItem(cartItems, productToRemove);
  currentUser && updateCartDB(currentUser, newCartItems);
  return createAction(
    CART_ACTION_TYPES.SET_CART_ITEMS,
    newCartItems,
    currentUser
  );
};
export const addQuantity = (cartItems, productToAdd, currentUser) => {
  const newCartItems = increaseItemQuantity(cartItems, productToAdd);
  currentUser && updateCartDB(currentUser, newCartItems);
  return createAction(
    CART_ACTION_TYPES.SET_CART_ITEMS,
    newCartItems,
    currentUser
  );
};
export const removeQuantity = (cartItems, productToRemove, currentUser) => {
  const newCartItems = decreaseItemQuantity(cartItems, productToRemove);
  currentUser && updateCartDB(currentUser, newCartItems);
  return createAction(
    CART_ACTION_TYPES.SET_CART_ITEMS,
    newCartItems,
    currentUser
  );
};
