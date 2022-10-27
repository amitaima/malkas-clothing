import "./wishlist-item.styles.scss";
import { RiCloseFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { removeItemFromWishlist } from "../../redux-store/wishlist/wishlist.action";
import { selectWishlistItems } from "../../redux-store/wishlist/wishlist.selector";
import { selectCurrentUser } from "../../redux-store/user/user.selector";
import Button from "../button/button.component";
import {
  addItemToCart,
  setIsCartOpen,
} from "../../redux-store/cart/cart.action";
import { selectCartItems } from "../../redux-store/cart/cart.selector";

const WishlistItem = ({ wishlistItem }) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(selectWishlistItems);
  const currentUser = useSelector(selectCurrentUser);
  const cartItems = useSelector(selectCartItems);

  const handleAddToCart = () => {
    dispatch(
      addItemToCart(cartItems, { ...wishlistItem, quantity: 1 }, currentUser)
    );
    dispatch(removeItemFromWishlist(wishlistItems, wishlistItem, currentUser));
    dispatch(setIsCartOpen(true));
    setTimeout(() => {
      dispatch(setIsCartOpen(false));
    }, 2000);
  };

  const { name, price, imageUrl } = wishlistItem;
  return (
    <div className="wishlist-item-container">
      <div className="product-info">
        <div className="image-container">
          <img src={imageUrl} alt={`Product photo of a ${name}`} />
        </div>
        <div className="item-details">
          <span className="name">{name}</span>
          {/* <span className="price">${price}</span> */}
          <span className="color">Color: red</span>
          <span className="size">Size: S</span>
          <span className="price">${price}</span>
        </div>
      </div>
      <div className="wishlist-actions">
        <div
          onClick={() => {
            dispatch(
              removeItemFromWishlist(wishlistItems, wishlistItem, currentUser)
            );
          }}
          className="remove-button"
        >
          <RiCloseFill className="remove-icon" />
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
};

export default WishlistItem;
