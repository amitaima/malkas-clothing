import "./cart-icon.styles.scss";
import { RiShoppingBagLine } from "react-icons/ri";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen } = useContext(CartContext);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div onClick={toggleCart} className="cart-icon-container">
      <RiShoppingBagLine className="cart-icon" />
      <span className="cart-num">3</span>
    </div>
  );
};

export default CartIcon;
