import { SEARCH_ACTION_TYPES } from "./search-toggle.types";

const SEARCH_INITIAL_STATE = {
  isSearchOpen: false,
  isMobileSearchOpen: false,
};

export const searchReducer = (state = SEARCH_INITIAL_STATE, action = {}) => {
  // console.log("dispatched");
  const { type, payload } = action;

  switch (type) {
    case SEARCH_ACTION_TYPES.SET_IS_SEARCH_OPEN:
      return {
        ...state,
        isSearchOpen: payload,
      };
    case SEARCH_ACTION_TYPES.SET_IS_MOBILE_SEARCH_OPEN:
      return {
        ...state,
        isMobileSearchOpen: payload,
      };
    default:
      return state;
  }
};
