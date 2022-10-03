import { Routes, Route } from "react-router-dom";

import { Fragment, useContext } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import ProductCard from "../../components/product-card/product-card.component";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import CategoriesPage from "../categories-page/categories-page.component";
import Category from "../category/category.component";
import "./shop.styles.scss";
import { useEffect } from "react";

const Shop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Routes>
      <Route index element={<CategoriesPage />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
