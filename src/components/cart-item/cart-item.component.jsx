import "./cart-item.styles.scss";
import { GrTrash } from "react-icons/gr";
import { FaRegTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { removeItemFromCart } from "../../redux-store/cart/cart.action";
import { selectCartItems } from "../../redux-store/cart/cart.selector";
import { selectCurrentUser } from "../../redux-store/user/user.selector";

const CartItem = ({ cartItem }) => {
  const { name, imageUrl, quantity, colour } = cartItem;
  const price = cartItem.price.current.value;
  const cartItems = useSelector(selectCartItems);
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  console.log(cartItem);

  return (
    <div className="cart-item-container">
      <div className="cart-item-info-container">
        <div className="cart-image-container">
          <img src={imageUrl} alt={`Product photo of a ${name}`} />
        </div>
        <div className="item-details">
          <span className="name">{name}</span>
          <span className="total-price">COLOR: {colour}</span>
          <span className="total-price">SIZE: M</span>
          <div className="price-and-quantity">
            <span className="quantity">QTY: {quantity}</span>
            <span className="price">$ {quantity * price}</span>
          </div>
          {/* <span className="total-price">
            Subtotal: <span>$ {quantity * price}</span>
          </span> */}
        </div>
      </div>
      <div className="div-trash-icon">
        <FaRegTrashAlt
          onClick={() => {
            dispatch(removeItemFromCart(cartItems, cartItem, currentUser));
          }}
          className="trash-icon"
        />
      </div>
    </div>
  );
};

export default CartItem;
