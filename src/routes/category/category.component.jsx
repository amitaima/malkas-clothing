import "./category.styles.scss";
import { useParams } from "react-router-dom";
import { Fragment, useContext, useState, useEffect } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import ProductCard from "../../components/product-card/product-card.component";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import CategoriesPage from "../categories-page/categories-page.component";
import { RiArrowLeftLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
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
