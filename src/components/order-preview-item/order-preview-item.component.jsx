import "./order-preview-item.styles.scss";

const OrderPreviewItem = ({ product }) => {
  const { name, imageUrl } = product;

  return (
    <div className="order-preview-item-container">
      <div className="img-div">
        <img src={imageUrl} alt={`Product photo of a ${name}`} />
      </div>
    </div>
  );
};

export default OrderPreviewItem;
