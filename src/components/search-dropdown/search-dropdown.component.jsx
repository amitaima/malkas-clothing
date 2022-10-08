import "./search-dropdown.styles.scss";
import Button from "../button/button.component";
import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchItem from "../search-item/search-item.component";

import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../redux-store/cart/cart.selector";

const SearchDropdown = ({ products, searchField, className, ...props }) => {
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();

  return (
    <Fragment>
      <section className={`section-search dropdown_animation--1 ${className}`}>
        {/* <div className="search-dropdown-container"> */}
        <div
          className={`search-items opacity-animation ${
            !products.length ? "empty" : "not"
          }`}
        >
          {products.length && searchField ? (
            products
              .filter((_, index) => index < 6)
              .map((product) => {
                return (
                  <SearchItem product={product} key={product.id}></SearchItem>
                );
              })
          ) : !searchField ? (
            <span className="empty-message">
              Try searching for an item in our store
            </span>
          ) : (
            <span className="empty-message">No results for {searchField}</span>
          )}
        </div>

        {/* <div className={`search-items ${!cartItems.length ? "empty" : "not"}`}>
          {cartItems.length ? (
            cartItems.map((item) => {
              return <CartItem key={item.id} cartItem={item} />;
            })
          ) : (
            <span className="empty-message">Your cart is empty</span>
          )}
          </div> 
        {/* </div> */}
      </section>
    </Fragment>
  );
};

export default SearchDropdown;
