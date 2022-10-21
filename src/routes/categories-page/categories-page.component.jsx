import CategoryPreview from "../../components/category-preview/category-preview.component";
import { CategoriesPageContainer } from "./categories-page.styles.jsx";
import { Fragment, useEffect } from "react";
import {
  selectCategoriesMap,
  selectCategoriesIsLoading,
} from "../../redux-store/categories/category.selector";
import { useSelector } from "react-redux";

import Spinner from "../../components/spinner/spinner.component";

const CATEGORY_ID = {
  tshirts: 7616,
  hats: 6517,
  jackets: 3606,
  footwear: 4209,
};

const CategoriesPage = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  const allProducts = Object.values(categoriesMap).flat();
  // console.log(allProducts);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        <CategoriesPageContainer>
          {/* {Object.keys(categoriesMap).map((title) => {
            const products = categoriesMap[title];
            return (
              <CategoryPreview key={title} title={title} products={products} />
            );
          })} */}
          {Object.keys(CATEGORY_ID).map((title) => {
            const categoryId = CATEGORY_ID[title];
            return (
              <CategoryPreview
                key={title}
                title={title}
                categoryId={categoryId}
              />
            );
          })}
        </CategoriesPageContainer>
      )}
    </Fragment>
  );
};

export default CategoriesPage;
