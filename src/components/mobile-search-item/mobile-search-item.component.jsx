import Button from "../button/button.component";
import "./mobile-search-item.styles.scss";
import { RiHeart3Line, RiHeart3Fill } from "react-icons/ri";
import { useState, useEffect } from "react";

import CartItem from "../cart-item/cart-item.component";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../redux-store/cart/cart.selector";
import { selectCurrentUser } from "../../redux-store/user/user.selector";
import {
  addItemToCart,
  setIsCartOpen,
} from "../../redux-store/cart/cart.action";
import { selectWishlistItems } from "../../redux-store/wishlist/wishlist.selector";
import {
  setIsWishlistOpen,
  addItemToWishlist,
  removeItemFromWishlist,
} from "../../redux-store/wishlist/wishlist.action";
import { setIsMobileSearchOpen } from "../../redux-store/search-toggle/search-toggle.action";
import { useNavigate } from "react-router-dom";

const MobileSearchItem = ({ product }) => {
  const { name, price, imageUrl, id } = product;
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const currentUser = useSelector(selectCurrentUser);
  const wishlistItems = useSelector(selectWishlistItems);
  const navigate = useNavigate();

  const [fillHeart, setFillHeart] = useState(false);
  const [inFavorites, setInFavorites] = useState(false);

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
  const handleClick = () => {
    if (inFavorites) {
      setInFavorites(false);
      dispatch(removeItemFromWishlist(wishlistItems, product, currentUser));
    } else {
      setInFavorites(true);
      dispatch(addItemToWishlist(wishlistItems, product, currentUser));
    }
  };
  const closeMobileSearch = () => {
    dispatch(setIsMobileSearchOpen(false));
    document.body.style.overflow = "unset";
    document.body.style.overflowX = "hidden";
    document.body.style.height = "unset";
    // setIsCartOpen(false);
  };
  const goToProduct = () => {
    closeMobileSearch();
    navigate(`/product/${id}`, {
      state: {
        product,
      },
    });
  };

  useEffect(() => {
    checkFavorite();
  }, []);

  return (
    <div className="mobile-search-item-container">
      <div className="product-info">
        <div className="image-container" onClick={goToProduct}>
          <img src={imageUrl} alt={`Product photo of a ${name}`} />
        </div>
        <div className="item-details">
          <span className="name" onClick={goToProduct}>
            {name}
          </span>
          {/* <span className="price">${price}</span> */}
          <span className="color">Color: red</span>
          <span className="size">Size: S</span>
          <span className="price">${price}</span>
        </div>
      </div>
      <div className="mobile-search-actions">
        <div
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          onClick={handleClick}
          className={`favorite-div`}
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
          className="add-to-cart"
          onClick={handleAddToCart}
        >
          Add to cart
        </Button>
      </div>
    </div>
  );

  return (
    <div className="search-item-container">
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
        className="no-border"
        onClick={handleAddToCart}
      >
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
export default MobileSearchItem;
