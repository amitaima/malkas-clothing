import "./order-preview.styles.scss";
import ProductCard from "../product-card/product-card.component";
import { RiArrowDropRightLine } from "react-icons/ri";
import { RiArrowUpSLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import OrderPreviewItem from "../order-preview-item/order-preview-item.component";

const OrderPreview = ({ title, cartItems, cartTotal }) => {
  return (
    <div className="order-preview-container">
      <h2 className="title-container">
        <Link className="title-link" to={title}>
          <span className="title">{`Order ${title.slice(5)}`}</span>
          <RiArrowDropRightLine className="arrow-icon" />
        </Link>
        <span>ESTIMATED DELIVERY: SUNDAY, 25 OCTOBER 2022</span>
      </h2>
      <div className="preview">
        {cartItems
          .filter((_, index) => index < 4)
          .map((product) => {
            return (
              <OrderPreviewItem
                product={product}
                key={product.id}
              ></OrderPreviewItem>
            );
          })}
      </div>
    </div>
  );
};

export default OrderPreview;
