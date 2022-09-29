import "./category-item.styles.scss";

const CategoryItem = ({ category, className = "" }) => {
  const { title, imageUrl } = category;
  return (
    <div className={`category-container ${className}`}>
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      ></div>
      <div className="category-body-container">
        <h2 className="category-name">{title}</h2>
        {/* <p className="shop-now">Shop Now</p> */}
      </div>
    </div>
  );
};

export default CategoryItem;
