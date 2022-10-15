import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  selectCartItems,
  selectCartCount,
  selectCartTotal,
} from "../../redux-store/cart/cart.selector";
import { selectCurrentUser } from "../../redux-store/user/user.selector";
import { setCart } from "../../redux-store/cart/cart.action";
import OrderSummary from "../../components/order-summary/order-summary.component";
import { useNavigate, useLocation } from "react-router-dom";

import "./payment-confirmation.styles.scss";
import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../components/button/button.component";
import { IoCheckmarkOutline } from "react-icons/io5";

const PaymentConfirmation = () => {
  // const cartItems = useSelector(selectCartItems);
  // const cartCount = useSelector(selectCartCount);
  // const cartTotal = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { name, email, phone } = location.state.billingDetails;
  const { cartItems, cartTotal } = location.state;
  // console.log(location.state.billingDetails);
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(setCart([], currentUser));
  }, [currentUser]);

  return (
    <section className="payment-confirmation-container">
      <div className="confirmation-msg-div">
        <IoCheckmarkOutline className="check-icon" />
        <h2 className="payment-successful">Payment Successful</h2>
        <p className="thank-you-msg">
          Thank you for your order! <br /> A confirmation email has been sent to{" "}
          <span className="user-email">{email}</span>
        </p>
      </div>
      <h3 className="order-summary-title">Order Summary</h3>
      <div className="order-summary-div">
        <OrderSummary cartItems={cartItems} cartTotal={cartTotal} />
      </div>
      <div className="order-details-div">
        <h3 className="order-summary-title">Order Details</h3>
        <div className="details-info-div">
          <div className="details-title">
            <span>Name</span>
            <span>Email</span>
            <span>Phone Number</span>
            <span>Address</span>
            <span>Order Date</span>
            <span>Amount Paid</span>
          </div>
          <div className="details-info">
            <span>{name}</span>
            <span>{email}</span>
            <span>{phone}</span>
            <span>{"Moreshet, Levona 294"}</span>
            <span>{"15/10/2022 16:34"}</span>
            <span>$ {cartTotal}</span>
          </div>
        </div>
      </div>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={() => {
          navigate("/");
        }}
      >
        Home
      </Button>
    </section>
  );
};

export default PaymentConfirmation;
