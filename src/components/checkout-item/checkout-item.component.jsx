import "./checkout-item.styles.scss";
import { RiCloseFill } from "react-icons/ri";
import { RiAddLine, RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItemFromCart,
  addQuantity,
  removeQuantity,
} from "../../redux-store/cart/cart.action";
import { selectCartItems } from "../../redux-store/cart/cart.selector";
import { selectCurrentUser } from "../../redux-store/user/user.selector";
import { useNavigate } from "react-router-dom";

const CheckoutItem = ({ cartItem }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  const goToProduct = () => {
    navigate(`/product/${id}`, {
      state: {
        product: { ...cartItem, quantity: 1 },
      },
    });
  };

  const { name, price, imageUrl, quantity, id } = cartItem;
  return (
    <div className="checkout-item-container">
      <div className="product-info">
        <div className="image-container" onClick={goToProduct}>
          <img src={imageUrl} alt={`Product photo of a ${name}`} />
        </div>
        <div className="item-details">
          <span className="name" onClick={goToProduct}>
            {name}
          </span>
          {/* <span className="price">${price}</span> */}
          <span className="color">Color: red</span>
          <span className="size">Size: S</span>
          <span className="quantity-number">Qty: {quantity}</span>
        </div>
      </div>
      <div className="quantity-container">
        <div className="quantity">
          <RiArrowUpSLine
            onClick={() => {
              dispatch(addQuantity(cartItems, cartItem, currentUser));
            }}
            className="arrow-icon"
          />
          <span className="quantity-number">{quantity}</span>
          <RiArrowDownSLine
            onClick={() => {
              dispatch(removeQuantity(cartItems, cartItem, currentUser));
            }}
            className="arrow-icon"
          />
        </div>
      </div>
      <span className="price">${price}</span>
      <span className="price total-price">${quantity * price}</span>
      <div
        onClick={() => {
          dispatch(removeItemFromCart(cartItems, cartItem, currentUser));
        }}
        className="remove-button"
      >
        <RiCloseFill className="remove-icon" />
      </div>
    </div>
  );
};

export default CheckoutItem;
