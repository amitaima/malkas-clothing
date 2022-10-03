import "./checkout.styles.scss";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import Button from "../../components/button/button.component";
import { useEffect } from "react";

const Checkout = () => {
  const { cartItems, cartCount } = useContext(CartContext);
  const subTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
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
          <span>${subTotal}</span>
        </div>
        <Button>Proceed To Checkout</Button>
      </div>
    </section>
  );
};

export default Checkout;
