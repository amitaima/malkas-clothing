import "./cart-dropdown.styles.scss";
import Button from "../button/button.component";
import { Link, useNavigate } from "react-router-dom";
import CartItem from "../cart-item/cart-item.component";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../redux-store/cart/cart.selector";
import { setIsCartOpen } from "../../redux-store/cart/cart.action";
import { useCallback, useMemo } from "react";

const CartDropdown = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);

  const navigate = useNavigate();
  const close = () => {
    dispatch(setIsCartOpen(false));
  };
  const open = () => {
    dispatch(setIsCartOpen(true));
  };

  const goToCheckout = useCallback(() => {
    navigate("/checkout");
    close();
  }, []);

  return (
    <div
      onMouseEnter={open}
      onMouseLeave={close}
      className="cart-dropdown-container dropdown_animation--1"
    >
      <div
        className={`cart-items scrollable opacity-animation ${
          !cartItems.length ? "empty" : "not"
        }`}
      >
        {cartItems.length ? (
          cartItems.map((item) => {
            return <CartItem key={item.id} cartItem={item} />;
          })
        ) : (
          <span className="empty-message">Your cart is empty</span>
        )}
      </div>
      {/* <Link className="link-to-checkout" to="/checkout"> */}
      <Button className="opacity-animation" onClick={goToCheckout}>
        Checkout
      </Button>
      {/* </Link> */}
    </div>
  );
};

export default CartDropdown;
