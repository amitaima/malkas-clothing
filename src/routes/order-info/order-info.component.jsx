import { useSelector } from "react-redux";
import { Fragment, useEffect, useState } from "react";
import { selectCurrentUser } from "../../redux-store/user/user.selector";

import OrderSummary from "../../components/order-summary/order-summary.component";
import { useNavigate, Link } from "react-router-dom";
import { RiArrowLeftLine } from "react-icons/ri";

import "./order-info.styles.scss";
import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../components/button/button.component";
import { getOrdersDB } from "../../utils/firebase/firebase.utils";
import Spinner from "../../components/spinner/spinner.component";

const OrderInfo = () => {
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const [allOrders, setAllOrders] = useState([]);
  const [thisOrder, setThisOrder] = useState([]);

  const getOrders = async () => {
    const orders = await getOrdersDB(currentUser).then((res) => {
      return res;
    });

    // Returns the list of orders from newest to oldest.
    const ordersArr = Object.entries(orders).sort((a, b) => {
      return parseInt(b[0].slice(5)) - parseInt(a[0].slice(5));
    });
    setAllOrders(ordersArr);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    currentUser && getOrders();
  }, [currentUser]);

  useEffect(() => {
    if (allOrders) {
      console.log("allOrders: ", allOrders);
      console.log(window.location.pathname.split("/")[2]);
      setThisOrder(
        allOrders.filter(
          (order) => window.location.pathname.split("/")[2] === order[0]
        )[0]
      );
    }
  }, [allOrders]);

  useEffect(() => {
    if (thisOrder) {
      console.log("thisOrder: ", thisOrder);
    }
  }, [thisOrder]);

  return (
    <section className="order-info-container">
      {thisOrder && thisOrder !== [] && thisOrder[1] ? (
        <Fragment>
          <div className="confirmation-msg-div">
            <Link className="back-link" to="../">
              <RiArrowLeftLine className="arrow-icon" />
            </Link>
            <h2 className="payment-successful">{`Order # ${thisOrder[0].slice(
              5
            )}`}</h2>
            <p className="thank-you-msg">
              The order has been shipped and should arrive shorlty, Thank you!
            </p>
          </div>
          <h3 className="order-summary-title">Order Summary</h3>
          <div className="order-summary-div">
            <OrderSummary
              cartItems={thisOrder[1].items}
              cartTotal={thisOrder[1].total}
            />
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
                <span>{thisOrder[1].name}</span>
                <span>{thisOrder[1].email}</span>
                <span>{thisOrder[1].phone}</span>
                <span>{thisOrder[1].address}</span>
                <span>{thisOrder[1].date}</span>
                <span>$ {thisOrder[1].total}</span>
              </div>
            </div>
          </div>
          <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>Track Order</Button>
        </Fragment>
      ) : (
        <Spinner />
      )}
    </section>
  );
};

export default OrderInfo;
