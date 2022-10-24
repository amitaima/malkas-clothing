import "./wishlist-icon.styles.scss";
import { RiHeart3Line } from "react-icons/ri";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectWishlistCount } from "../../redux-store/wishlist/wishlist.selector";
import { Navigate, useNavigate } from "react-router-dom";

const WishlistIcon = () => {
  const dispatch = useDispatch();
  const wishlistCount = useSelector(selectWishlistCount);
  // const navigate = useNavigate();

  // const toWishlist = () => {
  //   navigate("wishlist");
  // };

  return (
    <div className="wishlist-icon-container">
      <RiHeart3Line className="wishlist-icon" />
      <span className="wishlist-num">{wishlistCount}</span>
    </div>
  );
};

export default WishlistIcon;
