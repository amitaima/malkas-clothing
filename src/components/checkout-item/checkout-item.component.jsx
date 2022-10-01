import "./checkout-item.styles.scss";
import { RiCloseFill } from "react-icons/ri";
import { RiAddLine, RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const CheckoutItem = ({ cartItem }) => {
  const { removeItemFromCart, addQuantity, removeQuantity } =
    useContext(CartContext);

  const { name, price, imageUrl, quantity } = cartItem;
  return (
    <div className="checkout-item-container">
      <div className="product-info">
        <div className="image-container">
          <img src={imageUrl} alt={`Product photo of a ${name}`} />
        </div>
        <div className="item-details">
          <span className="name">{name}</span>
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
              addQuantity(cartItem);
            }}
            className="arrow-icon"
          />
          <span className="quantity-number">{quantity}</span>
          <RiArrowDownSLine
            onClick={() => {
              removeQuantity(cartItem);
            }}
            className="arrow-icon"
          />
        </div>
      </div>
      <span className="price">${price}</span>
      <span className="price">${quantity * price}</span>
      <div
        onClick={() => {
          removeItemFromCart(cartItem);
        }}
        className="remove-button"
      >
        <RiCloseFill className="remove-icon" />
      </div>
    </div>
  );
};

export default CheckoutItem;
