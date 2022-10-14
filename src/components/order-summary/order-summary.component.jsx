import "./order-summary.styles.scss";
import OrderSummaryItem from "../order-summary-item/order-summary-item.component";

import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
} from "../../redux-store/cart/cart.selector";

const OrderSummary = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  console.log(cartItems);

  return (
    <section className="order-container">
      <div className="order-header">
        <span className="header-block">ITEM</span>
        <span className="header-block">QTY</span>
        <span className="header-block">PRICE</span>
        <span className="header-block">TOTAL</span>
      </div>
      <div className="product-list">
        {cartItems.map((item) => {
          return <OrderSummaryItem key={item.id} cartItem={item} />;
        })}
      </div>
      <div className="order-summary">
        <div className="subtotal">
          <span>SUBTOTAL:</span>
          <span>${cartTotal}</span>
        </div>
      </div>
    </section>
  );
};

export default OrderSummary;
