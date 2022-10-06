import "./category.styles.scss";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import ProductCard from "../../components/product-card/product-card.component";
import { RiArrowLeftLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { selectCategoriesMap } from "../../redux-store/categories/category.selector";
import { useSelector } from "react-redux";

const Category = () => {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <div className="category-page-container">
      <div className="category-title-container">
        <Link className="back-link" to="../">
          <RiArrowLeftLine className="arrow-icon" />
        </Link>
        <h2 className="category-title">{category.toUpperCase()}</h2>
      </div>
      <div className="category-grid">
        {products &&
          products.map((product) => {
            return (
              <ProductCard product={product} key={product.id}></ProductCard>
            );
          })}
      </div>
    </div>
    // <section className="section-shop">
    //   {Object.keys(categoriesMap).map((title) => {
    //     const products = categoriesMap[title];
    //     return (
    //       <CategoryPreview key={title} title={title} products={products} />
    //     );
    //   })}
    // </section>
  );
};

export default Category;
