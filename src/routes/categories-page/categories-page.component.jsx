import { Fragment, useContext } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import ProductCard from "../../components/product-card/product-card.component";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import { CategoriesPageContainer } from "./categories-page.styles.jsx";
import { useEffect } from "react";

const CategoriesPage = () => {
  const { categoriesMap } = useContext(CategoriesContext);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <CategoriesPageContainer>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })}
    </CategoriesPageContainer>
  );
};

export default CategoriesPage;
