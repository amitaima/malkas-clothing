import "./cart-dropdown.styles.scss";
import Button from "../button/button.component";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import CartItem from "../cart-item/cart-item.component";

const CartDropdown = () => {
  const { setIsCartOpen, cartItems } = useContext(CartContext);
  const close = () => {
    setIsCartOpen(false);
  };
  const open = () => {
    setIsCartOpen(true);
  };

  return (
    <div
      onMouseEnter={open}
      onMouseLeave={close}
      className="cart-dropdown-container"
    >
      <div className="cart-items">
        {cartItems.map((item) => {
          return <CartItem key={item.id} cartItem={item} />;
        })}
      </div>
      <Button>Go to checkout</Button>
    </div>
  );
};

export default CartDropdown;
