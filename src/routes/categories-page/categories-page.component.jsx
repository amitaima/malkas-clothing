import CategoryPreview from "../../components/category-preview/category-preview.component";
import { CategoriesPageContainer } from "./categories-page.styles.jsx";
import { useEffect } from "react";
import { selectCategoriesMap } from "../../redux-store/categories/category.selector";
import { useSelector } from "react-redux";

const CategoriesPage = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  const allProducts = Object.values(categoriesMap).flat();
  console.log(allProducts);

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
