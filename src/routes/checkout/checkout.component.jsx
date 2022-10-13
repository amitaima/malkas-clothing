import "./checkout.styles.scss";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import PaymentForm from "../../components/payment-form/payment-form.component";

import Button from "../../components/button/button.component";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartCount,
  selectCartTotal,
} from "../../redux-store/cart/cart.selector";

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const cartCount = useSelector(selectCartCount);
  const cartTotal = useSelector(selectCartTotal);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
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
        {cartItems.map((item) => {
          return <CheckoutItem key={item.id} cartItem={item} />;
        })}
      </div>
      <div className="checkout-summary">
        <div className="subtotal">
          <span>SUBTOTAL</span>
          <span>${cartTotal}</span>
        </div>
        <Button>Proceed To Checkout</Button>
      </div>
      <PaymentForm />
    </section>
  );
};

export default Checkout;
