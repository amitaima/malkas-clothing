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
  const [currentImg, setCurrentImg] = useState(imageUrl);
  const currentUser = useSelector(selectCurrentUser);

  const getSecondImgUrl = () => {
    if (Object.keys(product).length === 0) return "";
    return product.imageUrl
      .split("/")
      .map((splitSlash, index) => {
        if (index === 5) {
          const lastPart = splitSlash.split("-").map((splitDash, index) => {
            if (index === 1) return "2";
            if (index === 2) return splitDash.split("?")[1];
            return splitDash;
          });
          return (
            lastPart[0] +
            "-" +
            lastPart[1] +
            "?" +
            "$n_640w$&wid=513&fit=constrain" // Should make this smaller if screen smaller
            // (highQuality
            //   ? "$n_1280w$&wid=1026&fit=constrain" // High qualit for big picture
            //   : "$n_320w$&wid=257&fit=constrain") // Low quality for small side pictures
          );
        }
        return splitSlash;
      })
      .join("/");
  };

  const checkFavorite = () => {
    wishlistItems.map((item) => item.id === product.id && setInFavorites(true));
  };

  const handleAddToCart = (e) => {
    dispatch(addItemToCart(cartItems, product, currentUser));
    e.target.closest(".add-to-cart").textContent = "Added!";
    e.target.closest(".add-to-cart").disabled = true;
    dispatch(setIsCartOpen(true));
    setTimeout(() => {
      e.target.closest(".add-to-cart").textContent = "Add To Cart";
      e.target.closest(".add-to-cart").disabled = false;
      dispatch(setIsCartOpen(false));
    }, 2000);
  };

  const handleEnterImg = () => {
    setCurrentImg(getSecondImgUrl());
  };
  const handleLeaveImg = () => {
    setCurrentImg(imageUrl);
  };
  const handleEnterFavorite = () => {
    setFillHeart(true);
  };

  const handleLeaveFavorite = () => {
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
      <div
        className="img-btn-div"
        onMouseEnter={handleEnterImg}
        onMouseLeave={handleLeaveImg}
      >
        <div className="img-div" onClick={goToProduct}>
          <img src={currentImg} alt={`Product photo of a ${name}`} />
        </div>
        <div
          onMouseEnter={handleEnterFavorite}
          onMouseLeave={handleLeaveFavorite}
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
        <div className="btn-div">
          <Button
            buttonType="inverted"
            className="no-border add-to-cart"
            onClick={(e) => handleAddToCart(e)}
          >
            Add to cart
          </Button>
        </div>
      </div>
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
