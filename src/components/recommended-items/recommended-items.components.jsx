import "./recommended-items.styles.scss";

import {
  selectCategoriesMap,
  selectCategoriesIsLoading,
} from "../../redux-store/categories/category.selector";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ProductCard from "../product-card/product-card.component";
import { useDispatch } from "react-redux";
import Spinner from "../spinner/spinner.component";
import { Fragment } from "react";

const RecommendedItems = () => {
  const dispatch = useDispatch();
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  const allProducts = Object.values(categoriesMap).flat();
  const randomNum = Math.floor(Math.random() * allProducts.length) - 4;
  // const [products, setProducts] = useState(
  //   allProducts.slice(randomNum, randomNum + 4)
  // );
  const products = allProducts.slice(randomNum, randomNum + 4);
  // console.log(products);
  // const products = allProducts.slice(randomNum, randomNum + 4);

  // useEffect(() => {
  //   console.log(allProducts);
  //   if (products.length) return;
  //   if (!categoriesMap) return;
  //   if (!allProducts) return;
  //   setProducts(allProducts.slice(randomNum, randomNum + 4));
  // }, [allProducts]);
  // useEffect(() => {
  //   console.log(allProducts);
  //   if (products.length) return;
  //   if (!categoriesMap) return;
  //   if (!allProducts) return;
  //   setProducts(allProducts.slice(randomNum, randomNum + 4));
  // }, [categoriesMap]);

  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        <section className="section-recommended-items">
          <h2 className="recommended-title">YOU MIGHT ALSO LIKE</h2>
          <div className="recommended-div flex-row">
            {products.map((product) => {
              return <ProductCard key={product.name} product={product} />;
            })}
          </div>
        </section>
      )}
    </Fragment>
  );
};

export default RecommendedItems;
