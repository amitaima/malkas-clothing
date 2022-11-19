import { createAction } from "../../utils/reducer/reducer.utils";
import { SEARCH_ACTION_TYPES } from "./search-toggle.types";

export const setIsSearchOpen = (bool) =>
  createAction(SEARCH_ACTION_TYPES.SET_IS_SEARCH_OPEN, bool);

export const setIsMobileSearchOpen = (bool) =>
  createAction(SEARCH_ACTION_TYPES.SET_IS_MOBILE_SEARCH_OPEN, bool);
