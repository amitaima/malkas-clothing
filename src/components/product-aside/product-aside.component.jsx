import "./product-aside.styles.scss";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import { RiShareLine } from "react-icons/ri";
import Button from "../button/button.component";
import { RiHeart3Line, RiHeart3Fill } from "react-icons/ri";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectWishlistItems } from "../../redux-store/wishlist/wishlist.selector";
import {
  removeItemFromWishlist,
  addItemToWishlist,
} from "../../redux-store/wishlist/wishlist.action";
import { selectCurrentUser } from "../../redux-store/user/user.selector";

const ProductAside = ({ product }) => {
  const { name, price } = product;
  const dispatch = useDispatch();
  const [inFavorites, setInFavorites] = useState(false);
  const wishlistItems = useSelector(selectWishlistItems);
  const currentUser = useSelector(selectCurrentUser);
  const [fillHeart, setFillHeart] = useState(false);
  const checkFavorite = () => {
    wishlistItems.map((item) => item.id === product.id && setInFavorites(true));
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
  useEffect(() => {
    checkFavorite();
  }, []);

  return (
    <div className="aside-container">
      <h1>{name}</h1>
      <span>$ {price}</span>
      <span>COLOR: BLACK</span>
      <select className="size-selector">
        <option value>Please select</option>
        <option value>XS</option>
        <option value>S</option>
        <option value>M</option>
        <option value>L</option>
        <option value>XL</option>
      </select>
      <div className="aside-actions-div">
        <Button className="aside-cart-btn inverted">Add To Cart</Button>
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
      </div>
    </div>
  );
};

export default ProductAside;
