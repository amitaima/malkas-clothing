import "./checkout.styles.scss";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";

import Button from "../../components/button/button.component";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartCount,
  selectCartTotal,
} from "../../redux-store/cart/cart.selector";
import RecommendedItems from "../../components/recommended-items/recommended-items.components";
import { Fragment } from "react";

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const cartCount = useSelector(selectCartCount);
  const cartTotal = useSelector(selectCartTotal);
  const navigate = useNavigate();

  const toPaymentPage = () => {
    if (cartItems.length === 0) return;
    navigate("/payment");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Fragment>
      <section className="checkout-container">
        {/* <h1>Checkout</h1> */}
        <div className="checkout-header">
          <span className="header-block">SHOPPING BAG ({cartCount})</span>
          <span className="header-block">QTY</span>
          <span className="header-block">PRICE</span>
          <span className="header-block">TOTAL</span>
          <span className="header-block">REMOVE</span>
        </div>
        <div className="product-list">
          {cartItems.length > 0 ? (
            cartItems.map((item) => {
              return <CheckoutItem key={item.id} cartItem={item} />;
            })
          ) : (
            <h2 className="empty-error">Your cart is empty</h2>
          )}
        </div>
        <div className="checkout-summary">
          <div className="subtotal">
            <span>SUBTOTAL</span>
            <span>${cartTotal}</span>
          </div>
          <Button onClick={toPaymentPage}>Proceed To Checkout</Button>
        </div>
      </section>
      <RecommendedItems />
    </Fragment>
  );
};

export default Checkout;
