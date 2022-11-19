import "./cart-icon.styles.scss";
import { RiShoppingBagLine } from "react-icons/ri";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartCount,
  selectIsCartOpen,
} from "../../redux-store/cart/cart.selector";
import { setIsCartOpen } from "../../redux-store/cart/cart.action";

const CartIcon = () => {
  const dispatch = useDispatch();
  const isCartOpen = useSelector(selectIsCartOpen);
  const cartCount = useSelector(selectCartCount);

  const toggleCart = () => {
    dispatch(setIsCartOpen(!isCartOpen));
  };

  return (
    <div onClick={toggleCart} className="cart-icon-container">
      <RiShoppingBagLine className="cart-icon" />
      <span className="cart-num">{cartCount}</span>
    </div>
  );
};

export default CartIcon;
