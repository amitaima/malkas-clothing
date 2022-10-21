import "./category.styles.scss";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import ProductCard from "../../components/product-card/product-card.component";
import { RiArrowLeftLine } from "react-icons/ri";
import { Link } from "react-router-dom";
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

const Category = () => {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  const [products, setProducts] = useState(categoriesMap[category]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "56ba5e2393msh1d93f944bee08b9p1fed26jsn9090a00eb2df",
        "X-RapidAPI-Host": "asos2.p.rapidapi.com",
      },
    };

    fetch(
      `https://asos2.p.rapidapi.com/products/v2/list?store=US&offset=0&categoryId=${CATEGORY_ID[category]}&limit=48&country=US&sort=freshness&currency=USD&sizeSchema=US&lang=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setProducts(response.products);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProducts();
  }, []);
  // useEffect(() => {
  //   setProducts(categoriesMap[category]);
  // }, [category, categoriesMap]);

  return (
    <div className="category-page-container">
      <div className="category-title-container">
        <Link className="back-link" to="../">
          <RiArrowLeftLine className="arrow-icon" />
        </Link>
        <h2 className="category-title">{category.toUpperCase()}</h2>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="category-grid">
          {products &&
            products.map((product) => {
              return (
                <ProductCard product={product} key={product.id}></ProductCard>
              );
            })}
        </div>
      )}
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
