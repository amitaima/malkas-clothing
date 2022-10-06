import { createAction } from "../../utils/reducer/reducer.utils";
import { CATEGORIES_ACTION_TYPES } from "./category.types";

export const setCategories = (categoriesArr) => {
  return createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesArr);
};
