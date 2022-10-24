import { createAction } from "../../utils/reducer/reducer.utils";
import { WISHLIST_ACTION_TYPES } from "./wishlist.types";
import { updateWishlistDB } from "../../utils/firebase/firebase.utils";

const addWishlistItem = (wishlistItems, productToAdd) => {
  let updatedWishlist = [];
  const existingWishlistItem = wishlistItems.find((item) => {
    return productToAdd.id === item.id;
  });

  if (existingWishlistItem) {
    updatedWishlist = wishlistItems.map((item) =>
      item.id === existingWishlistItem.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  } else {
    updatedWishlist = [...wishlistItems, { ...productToAdd, quantity: 1 }];
  }
  return updatedWishlist;
};

const removeWishlistItem = (wishlistItems, productToRemove) => {
  return wishlistItems.filter((item) => item.id !== productToRemove.id);
};

export const setWishlist = (wishlistArr, currentUser) => {
  currentUser && updateWishlistDB(currentUser, wishlistArr);
  return createAction(WISHLIST_ACTION_TYPES.SET_WISHLIST_ITEMS, wishlistArr);
};

export const setIsWishlistOpen = (bool) =>
  createAction(WISHLIST_ACTION_TYPES.SET_IS_WISHLIST_OPEN, bool);

export const addItemToWishlist = (wishlistItems, productToAdd, currentUser) => {
  const newWishlistItems = addWishlistItem(wishlistItems, productToAdd);
  currentUser && updateWishlistDB(currentUser, newWishlistItems);
  return createAction(
    WISHLIST_ACTION_TYPES.SET_WISHLIST_ITEMS,
    newWishlistItems,
    currentUser
  );
};
export const removeItemFromWishlist = (
  wishlistItems,
  productToRemove,
  currentUser
) => {
  const newWishlistItems = removeWishlistItem(wishlistItems, productToRemove);
  currentUser && updateWishlistDB(currentUser, newWishlistItems);
  return createAction(
    WISHLIST_ACTION_TYPES.SET_WISHLIST_ITEMS,
    newWishlistItems,
    currentUser
  );
};
