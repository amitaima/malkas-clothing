import { createSelector } from "reselect";

const selectSearchReducer = (state) => state.search;

export const selectIsSearchOpen = createSelector(
  [selectSearchReducer],
  (searchSlice) => searchSlice.isSearchOpen
);
export const selectIsMobileSearchOpen = createSelector(
  [selectSearchReducer],
  (searchSlice) => searchSlice.isMobileSearchOpen
);
