import { combineReducers } from "redux";
import { categoriesReducer } from "./categories/category.reducer";
import { userReducer } from "./user/user.reducer";
import { cartReducer } from "./cart/cart.reducer";
import { wishlistReducer } from "./wishlist/wishlist.reducer";
import { searchReducer } from "./search-toggle/search-toggle.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  search: searchReducer,
});
