import Button from "../button/button.component";
import "./product-card.styles.scss";
import { RiHeart3Line, RiHeart3Fill } from "react-icons/ri";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import CartItem from "../cart-item/cart-item.component";

import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../redux-store/cart/cart.selector";
import { selectWishlistItems } from "../../redux-store/wishlist/wishlist.selector";
import { selectCurrentUser } from "../../redux-store/user/user.selector";
import {
  setIsCartOpen,
  addItemToCart,
} from "../../redux-store/cart/cart.action";
import {
  setIsWishlistOpen,
  addItemToWishlist,
  removeItemFromWishlist,
} from "../../redux-store/wishlist/wishlist.action";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const [inFavorites, setInFavorites] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const wishlistItems = useSelector(selectWishlistItems);
  const [fillHeart, setFillHeart] = useState(false);
  const currentUser = useSelector(selectCurrentUser);

  const checkFavorite = () => {
    wishlistItems.map((item) => item.id === product.id && setInFavorites(true));
  };

  const handleAddToCart = () => {
    dispatch(addItemToCart(cartItems, product, currentUser));
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
  const handleFavoritesClick = () => {
    if (inFavorites) {
      setInFavorites(false);
      dispatch(removeItemFromWishlist(wishlistItems, product, currentUser));
    } else {
      setInFavorites(true);
      dispatch(addItemToWishlist(wishlistItems, product, currentUser));
    }
  };

  const goToProduct = () => {
    navigate(`/product/${product.id}`, {
      state: {
        product,
      },
    });
  };

  useEffect(() => {
    checkFavorite();
  }, []);

  return (
    <div className="product-card-container">
      <div className="img-div" onClick={goToProduct}>
        <img src={imageUrl} alt={`Product photo of a ${name}`} />
      </div>
      <div
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onClick={handleFavoritesClick}
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
        <span className="companyName">MALKA'S</span>
        <div className="name-div">
          <span className="name">{name}</span>
        </div>
        <span className="price">$ {price}</span>
      </div>
    </div>
  );
};

export default ProductCard;
