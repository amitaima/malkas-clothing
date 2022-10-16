import "./category-preview.styles.scss";
import ProductCard from "../product-card/product-card.component";
import { RiArrowDropRightLine } from "react-icons/ri";
import { RiArrowUpSLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import OrderPreviewItem from "../order-preview-item/order-preview-item.component";

const OrderPreview = ({ title, items }) => {
  return (
    <div className="category-preview-container">
      <h2 className="title-container">
        <Link className="title-link" to={title}>
          <span className="title">{title.toUpperCase()}</span>
          <RiArrowDropRightLine className="arrow-icon" />
        </Link>
      </h2>
      <div className="preview">
        {items
          .filter((_, index) => index < 4)
          .map((product) => {
            return (
              <OrderPreviewItem
                product={product}
                key={product.id}
              ></OrderPreviewItem>
            );
            return (
              <ProductCard product={product} key={product.id}></ProductCard>
            );
          })}
      </div>
    </div>
  );
};

export default OrderPreview;
