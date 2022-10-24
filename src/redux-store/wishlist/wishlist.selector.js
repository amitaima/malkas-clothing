import { createSelector } from "reselect";

const selectWishlistReducer = (state) => state.wishlist;

export const selectWishlistItems = createSelector(
  [selectWishlistReducer],
  (wishlistSlice) => wishlistSlice.wishlistItems
);
export const selectIsWishlistOpen = createSelector(
  [selectWishlistReducer],
  (wishlistSlice) => wishlistSlice.isWishlistOpen
);
export const selectWishlistCount = createSelector(
  [selectWishlistReducer],
  (wishlistItems) => {
    return wishlistItems.wishlistItems.length;
  }
  // wishlistItems.reduce((total, item) => total + item.quantity, 0)
);
