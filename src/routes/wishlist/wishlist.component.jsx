import "./wishlist.styles.scss";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";

import Button from "../../components/button/button.component";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  selectWishlistItems,
  selectWishlistCount,
} from "../../redux-store/wishlist/wishlist.selector";
import WishlistItem from "../../components/wishlist-item/wishlist-item.component";

const Wishlist = () => {
  const wishlistItems = useSelector(selectWishlistItems);
  const wishlistCount = useSelector(selectWishlistCount);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="wishlist-container">
      <h1 className="page-header">Wishlist</h1>
      {/* <div className="wishlist-header">
        <span className="header-block">WISHLIST ({wishlistCount})</span>
        <span className="header-block">PRICE</span>
        <span className="header-block">REMOVE</span>
      </div> */}
      <div className="product-list">
        {wishlistItems.map((item) => {
          return <WishlistItem key={item.id} wishlistItem={item} />;
        })}
      </div>
    </section>
  );
};

export default Wishlist;
