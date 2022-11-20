import CategoryPreview from "../../components/category-preview/category-preview.component";
import { CategoriesPageContainer } from "./categories-page.styles.jsx";
import { Fragment, useEffect, useState } from "react";
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
  const [finalCategories, setFinalCategories] = useState({});

  // Setting the order of the categoories
  useEffect(() => {
    if (Object.keys(categoriesMap).length === 0) return;
    const categoriesOrder = {
      new: null,
      womens: null,
      mens: null,
      jackets: null,
      sneakers: null,
      hats: null,
      outlet: null,
    };
    setFinalCategories(Object.assign(categoriesOrder, categoriesMap));
  }, [categoriesMap]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Fragment>
      {isLoading || Object.keys(finalCategories).length === 0 ? (
        <Spinner />
      ) : (
        <CategoriesPageContainer>
          {Object.keys(finalCategories).map((title) => {
            const products = finalCategories[title];
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
