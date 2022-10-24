import { WISHLIST_ACTION_TYPES } from "./wishlist.types";

const WISHLIST_INITIAL_STATE = {
  isWishlistOpen: false,
  wishlistItems: [],
};

export const wishlistReducer = (
  state = WISHLIST_INITIAL_STATE,
  action = {}
) => {
  // console.log("dispatched");
  const { type, payload } = action;

  switch (type) {
    case WISHLIST_ACTION_TYPES.SET_WISHLIST_ITEMS:
      return {
        ...state,
        wishlistItems: payload,
      };
    case WISHLIST_ACTION_TYPES.SET_WISHLIST_COUNT:
      return {
        ...state,
        ...payload,
      };
    case WISHLIST_ACTION_TYPES.SET_IS_WISHLIST_OPEN:
      return {
        ...state,
        isWishlistOpen: payload,
      };
    default:
      return state;
  }
};
