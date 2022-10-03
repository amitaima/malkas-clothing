import "./cart-item.styles.scss";
import { GrTrash } from "react-icons/gr";
import { FaRegTrashAlt } from "react-icons/fa";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const CartItem = ({ cartItem }) => {
  const { name, price, imageUrl, quantity } = cartItem;
  const { removeItemFromCart } = useContext(CartContext);

  return (
    <div className="cart-item-container">
      <div className="cart-item-info-container">
        <div className="cart-image-container">
          <img src={imageUrl} alt={`Product photo of a ${name}`} />
        </div>
        <div className="item-details">
          <span className="name">{name}</span>
          <div className="price-and-quantity">
            <span className="price">${price}</span>
            <span className="quantity">QTY: {quantity}</span>
          </div>
          <span className="quantity">Subtotal: ${quantity * price}</span>
        </div>
      </div>
      <div className="div-trash-icon">
        <FaRegTrashAlt
          onClick={() => {
            removeItemFromCart(cartItem);
          }}
          className="trash-icon"
        />
      </div>
    </div>
  );
};

export default CartItem;
