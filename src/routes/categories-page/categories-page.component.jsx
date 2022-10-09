import CategoryPreview from "../../components/category-preview/category-preview.component";
import { CategoriesPageContainer } from "./categories-page.styles.jsx";
import { Fragment, useEffect } from "react";
import {
  selectCategoriesMap,
  selectCategoriesIsLoading,
} from "../../redux-store/categories/category.selector";
import { useSelector } from "react-redux";

import Spinner from "../../components/spinner/spinner.component";

const CategoriesPage = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  const allProducts = Object.values(categoriesMap).flat();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        <CategoriesPageContainer>
          {Object.keys(categoriesMap).map((title) => {
            const products = categoriesMap[title];
            return (
              <CategoryPreview key={title} title={title} products={products} />
            );
          })}
        </CategoriesPageContainer>
      )}
    </Fragment>
  );
};

export default CategoriesPage;
