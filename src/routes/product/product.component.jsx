import "./product.styles.scss";
import { useLocation } from "react-router-dom";
import ProductGallery from "../../components/product-gallery/product-gallery.component";
import ProductAside from "../../components/product-aside/product-aside.component";
import RecommendedItems from "../../components/recommended-items/recommended-items.components";
import {
  selectCategoriesMap,
  selectCategoriesIsLoading,
} from "../../redux-store/categories/category.selector";
import { useSelector } from "react-redux";
import { Fragment, useEffect, useState } from "react";
import Spinner from "../../components/spinner/spinner.component";

const Product = () => {
  const location = useLocation();
  const [product, setProduct] = useState({});
  const categoriesMap = useSelector(selectCategoriesMap);
  // const isLoading = useSelector(selectCategoriesIsLoading);
  const allProducts = Object.values(categoriesMap).flat();
  useEffect(() => {
    window.scrollTo(0, 0);
    // console.log(JSON.parse(localStorage.getItem("current-product")));
    if (allProducts.length === 0) return;
    if (
      localStorage.getItem("current-product") === null ||
      location.state?.product
    ) {
      setProduct(location.state.product);
      localStorage.setItem("current-product", JSON.stringify(product));
    } else {
      if (localStorage.getItem("current-product")) {
        if (
          JSON.parse(localStorage.getItem("current-product")).id.toString() ===
          window.location.pathname.slice(9)
        ) {
          setProduct(JSON.parse(localStorage.getItem("current-product")));
        } else {
          setProduct(
            allProducts.filter(
              (product) =>
                product.id.toString() === window.location.pathname.slice(9)
            )[0]
          );
        }
      }
    }
  }, [window.location.href, allProducts]);
  // useEffect(() => {
  //   if (!product.length) {
  //     if (location.state) {
  //       setProduct(location.state.product);
  //     } else {
  //       setProduct(
  //         allProducts.filter(
  //           (product) => product.id === window.location.pathname.slice(9)
  //         )
  //       );
  //     }
  //   }
  // }, []);

  // useEffect(() => {
  //   if (product.length) return;
  //   if (!categoriesMap) return;
  //   if (!allProducts) return;
  //   if (!product.length) {
  //     if (location.state) {
  //       setProduct(location.state.product);
  //     } else {
  //       setProduct(
  //         allProducts.filter(
  //           (product) => product.id === window.location.pathname.slice(9)
  //         )
  //       );
  //     }
  //   }
  // }, []);
  // useEffect(() => {
  //   console.log("inside categories map");
  //   if (product.length) return;
  //   if (!categoriesMap) return;
  //   if (!allProducts) return;
  //   if (!product.length) {
  //     if (location.state) {
  //       setProduct(location.state.product);
  //     } else {
  //       setProduct(
  //         allProducts.filter(
  //           (product) => product.id === window.location.pathname.slice(9)
  //         )
  //       );
  //     }
  //   }
  //   console.log(product);
  // }, [categoriesMap]);

  return (
    <div>
      {Object.keys(product).length === 0 ? (
        <Spinner />
      ) : (
        <Fragment>
          <section className="product-container">
            <div className="product-gallery-div">
              <ProductGallery product={product} />
            </div>
            <aside className="product-aside-div">
              <ProductAside product={product} />
            </aside>
          </section>
          <RecommendedItems />
        </Fragment>
      )}
    </div>
  );
};

export default Product;
