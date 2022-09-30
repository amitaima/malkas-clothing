import "./cart-dropdown.styles.scss";
import Button from "../button/button.component";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const CartDropdown = () => {
  const { setIsCartOpen } = useContext(CartContext);
  const close = () => {
    setIsCartOpen(false);
  };

  return (
    <div onMouseLeave={close} className="cart-dropdown-container">
      <div className="cart-items"></div>
      <Button>Go to checkout</Button>
    </div>
  );
};

export default CartDropdown;
