import "./cart-dropdown.styles.scss";
import Button from "../button/button.component";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../contexts/cart.context";
import CartItem from "../cart-item/cart-item.component";

const CartDropdown = () => {
  const { setIsCartOpen, cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const close = () => {
    setIsCartOpen(false);
  };
  const open = () => {
    setIsCartOpen(true);
  };

  const goToCheckout = () => {
    navigate("/checkout");
    close();
  };

  return (
    <div
      onMouseEnter={open}
      onMouseLeave={close}
      className="cart-dropdown-container"
    >
      <div className={`cart-items ${!cartItems.length ? "empty" : "not"}`}>
        {cartItems.length ? (
          cartItems.map((item) => {
            return <CartItem key={item.id} cartItem={item} />;
          })
        ) : (
          <span className="empty-message">Your cart is empty</span>
        )}
      </div>
      {/* <Link className="link-to-checkout" to="/checkout"> */}
      <Button onClick={goToCheckout}>Go to checkout</Button>
      {/* </Link> */}
    </div>
  );
};

export default CartDropdown;
