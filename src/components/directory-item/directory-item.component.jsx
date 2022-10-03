import "./directory-item.styles.scss";
import { Link, useNavigate } from "react-router-dom";

const DirectoryItem = ({ category, className = "" }) => {
  const { title, imageUrl, position } = category;
  const navigate = useNavigate();
  const goToCategory = () => {
    navigate(`/shop/${title.toLowerCase()}`);
  };
  return (
    <div
      onClick={goToCategory}
      className={`directory-item-container ${className}`}
    >
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundPosition: `${position}`,
        }}
      ></div>
      <div className="directory-item-body-container">
        <h2 className="directory-item-name">{title}</h2>
        {/* <p className="shop-now">Shop Now</p> */}
      </div>
    </div>
  );
};

export default DirectoryItem;
