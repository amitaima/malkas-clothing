import { useContext } from "react";
import { ProductsContext } from "../../contexts/products.context";
import ProductCard from "../../components/product-card/product-card.component";
import "./shop.styles.scss";

const Shop = () => {
  const { products } = useContext(ProductsContext);
  return (
    <section className="section-shop">
      <div className="products-container">
        {products.map((product) => {
          return <ProductCard product={product} key={product.id}></ProductCard>;
        })}
      </div>
    </section>
  );
};

export default Shop;
