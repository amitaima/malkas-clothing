import Button from "../button/button.component";
import "./product-card.styles.scss";
import { RiHeart3Line, RiHeart3Fill } from "react-icons/ri";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;

  const [fillHeart, setFillHeart] = useState(false);
  const [inFavorites, setInFavorites] = useState(false);

  const handleEnter = () => {
    setFillHeart(true);
  };

  const handleLeave = () => {
    setFillHeart(false);
  };
  const handleClick = () => {
    inFavorites ? setInFavorites(false) : setInFavorites(true);
  };

  return (
    <div className="product-card-container">
      <div className="img-div">
        <img src={imageUrl} alt={`Product photo of a ${name}`} />
      </div>
      <div
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onClick={handleClick}
        className={`favorite-div ${inFavorites ? "active" : ""}`}
      >
        {inFavorites ? (
          <RiHeart3Fill className="favorite-icon" />
        ) : fillHeart ? (
          <RiHeart3Fill className="favorite-icon" />
        ) : (
          <RiHeart3Line className="favorite-icon" />
        )}
      </div>
      <Button buttonType="inverted" className="no-border">
        Add to cart
      </Button>
      <div className="info">
        <span className="companyName">MALKA'S</span>
        <span className="name">{name}</span>
        <span className="price">$ {price}</span>
      </div>
    </div>
  );
};

export default ProductCard;
