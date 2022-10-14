import "./order-summary-item.styles.scss";

const OrderSummaryItem = ({ cartItem }) => {
  const { name, price, imageUrl, quantity } = cartItem;
  return (
    <div className="order-item-container">
      <div className="product-info">
        <div className="image-container">
          <img src={imageUrl} alt={`Product photo of a ${name}`} />
        </div>
        <div className="item-details">
          <span className="name">{name}</span>
          {/* <span className="price">${price}</span> */}
          <span className="color">Color: red</span>
          <span className="size">Size: S</span>
        </div>
      </div>
      <span className="quantity">{quantity}</span>
      <span className="price">${price}</span>
      <span className="price">${quantity * price}</span>
    </div>
  );
};

export default OrderSummaryItem;
