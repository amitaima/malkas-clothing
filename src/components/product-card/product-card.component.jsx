import Button from "../button/button.component";
import "./product-card.styles.scss";
import { RiHeart3Line, RiHeart3Fill } from "react-icons/ri";
import { useState } from "react";

import CartItem from "../cart-item/cart-item.component";

import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../redux-store/cart/cart.selector";
import { selectCurrentUser } from "../../redux-store/user/user.selector";
import {
  setIsCartOpen,
  addItemToCart,
} from "../../redux-store/cart/cart.action";

const ProductCard = ({ product }) => {
  const { name, brandName } = product;
  const imageUrl = product.price?.current?.text
    ? `https://${product.imageUrl}`
    : product.imageUrl;
  const price = product.price?.current?.value || product.price;
  const newProduct = {
    ...product,
    imageUrl: `https://${product.imageUrl}`,
  };
  // console.log(newProduct);
  const [fillHeart, setFillHeart] = useState(false);
  const [inFavorites, setInFavorites] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const currentUser = useSelector(selectCurrentUser);

  const handleAddToCart = () => {
    dispatch(addItemToCart(cartItems, newProduct, currentUser));
    dispatch(setIsCartOpen(true));
    setTimeout(() => {
      dispatch(setIsCartOpen(false));
    }, 2000);
  };

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
      <Button
        buttonType="inverted"
        className="no-border add-to-cart"
        onClick={handleAddToCart}
      >
        Add to cart
      </Button>
      <div className="info">
        <span className="companyName">{brandName}</span>
        <span className="name">{name}</span>
        <span className="price">$ {price}</span>
      </div>
    </div>
  );
};

export default ProductCard;
