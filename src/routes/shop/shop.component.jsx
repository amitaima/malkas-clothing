import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import CategoriesPage from "../categories-page/categories-page.component";
import Category from "../category/category.component";
import "./shop.styles.scss";
import { useEffect } from "react";
import { getCategoriesandDocuments } from "../../utils/firebase/firebase.utils";

import { fetchCategoriesStart } from "../../redux-store/categories/category.action";

const Shop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesStart());
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPage />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
