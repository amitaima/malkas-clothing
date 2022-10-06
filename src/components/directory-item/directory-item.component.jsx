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
// background-image: linear-gradient(
//   rgba(24, 100, 171, 0.2),
//   rgba(24, 100, 171, 0.2)
// ),
// url(https://images.unsplash.com/photo-1603189343302-e603f7add05a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80);