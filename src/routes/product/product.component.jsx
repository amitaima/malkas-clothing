import "./product.styles.scss";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductGallery from "../../components/product-gallery/product-gallery.component";
import ProductAside from "../../components/product-aside/product-aside.component";
import RecommendedItems from "../../components/recommended-items/recommended-items.components";

const Product = () => {
  const location = useLocation();
  const { product } = location.state;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <section className="product-container">
        <div className="product-gallery-div">
          <ProductGallery product={product} />
        </div>
        <aside className="product-aside-div">
          <ProductAside product={product} />
        </aside>
      </section>
      <RecommendedItems />
    </div>
  );
};

export default Product;
