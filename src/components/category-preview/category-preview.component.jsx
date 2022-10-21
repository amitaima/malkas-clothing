import "./category-preview.styles.scss";
import ProductCard from "../product-card/product-card.component";
import { RiArrowDropRightLine } from "react-icons/ri";
import { RiArrowUpSLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "../spinner/spinner.component";

const CategoryPreview = ({ title, categoryId }) => {
  const [products, setProducts] = useState([]);
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
      `https://asos2.p.rapidapi.com/products/v2/list?store=US&offset=0&categoryId=${categoryId}&limit=48&country=US&sort=freshness&currency=USD&sizeSchema=US&lang=en-US`,
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
    fetchProducts();
  }, []);

  return (
    <div className="category-preview-container">
      <h2 className="title-container">
        <Link className="title-link" to={title}>
          <span className="title">{title.toUpperCase()}</span>
          <RiArrowDropRightLine className="arrow-icon" />
        </Link>
      </h2>
      <div className="preview">
        {products &&
          products
            .filter((_, index) => index < 4)
            .map((product) => {
              return (
                <ProductCard product={product} key={product.id}></ProductCard>
              );
            })}
      </div>
    </div>
  );
};

export default CategoryPreview;
