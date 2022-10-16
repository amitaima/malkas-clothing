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

const OrderPreviewItem = ({ product }) => {
  const { name, imageUrl } = product;

  return (
    <div className="product-card-container">
      <div className="img-div">
        <img src={imageUrl} alt={`Product photo of a ${name}`} />
      </div>
    </div>
  );
};

export default OrderPreviewItem;
