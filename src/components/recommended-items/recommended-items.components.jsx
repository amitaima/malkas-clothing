import "./recommended-items.styles.scss";

import { selectCategoriesMap } from "../../redux-store/categories/category.selector";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ProductCard from "../product-card/product-card.component";

const RecommendedItems = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  const allProducts = Object.values(categoriesMap).flat();
  const randomNum = Math.floor(Math.random() * allProducts.length) - 4;
  const [products, setProducts] = useState([]);
  // const products = allProducts.slice(randomNum, randomNum + 4);

  useEffect(() => {
    if (products.length) return;
    if (!categoriesMap) return;
    if (!allProducts) return;
    setProducts(allProducts.slice(randomNum, randomNum + 4));
  }, [allProducts]);
  useEffect(() => {
    if (products.length) return;
    if (!categoriesMap) return;
    if (!allProducts) return;
    setProducts(allProducts.slice(randomNum, randomNum + 4));
  }, [categoriesMap]);

  return (
    <section className="section-recommended-items">
      <h2 className="recommended-title">YOU MIGHT ALSO LIKE</h2>
      <div className="recommended-div flex-row">
        {products.map((product) => {
          return <ProductCard key={product.name} product={product} />;
        })}
      </div>
    </section>
  );
};

export default RecommendedItems;
