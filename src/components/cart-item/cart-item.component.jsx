import "./cart-item.styles.scss";

const CartItem = ({ cartItem }) => {
  const { name, price, imageUrl, quantity } = cartItem;

  return (
    <div className="cart-item-container">
      <img src={imageUrl} alt={`Product photo of a ${name}`} />
      <div className="item-details">
        <span className="name">{name}</span>
        <div className="price-and-quantity">
          <span className="price">${price}</span>
          <span className="quantity">QTY: {quantity}</span>
        </div>
        <span className="quantity">Subtotal: ${quantity * price}</span>
      </div>
    </div>
  );
};

export default CartItem;
