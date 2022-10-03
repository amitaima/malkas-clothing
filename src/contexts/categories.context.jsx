import { createContext, useState } from "react";
import PRODUCTS from "../shop-data.json";
import SHOP_DATA from "../shop-data-db";
import {
  addCollectionAndDocuments,
  getCategoriesandDocuments,
} from "../utils/firebase/firebase.utils";
import { useEffect } from "react";

// Actual value you want to access
export const CategoriesContext = createContext({
  Categories: [],
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});
  // useEffect(() => {
  //   addCollectionAndDocuments("categories", SHOP_DATA);
  // }, []);
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesandDocuments();
      // console.log(categoryMap);
      setCategoriesMap(categoryMap);
      return categoryMap;
    };
    getCategoriesMap();
  }, []);
  const value = { categoriesMap };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
