import { getOrdersDB } from "../../utils/firebase/firebase.utils";
import { selectCurrentUser } from "../../redux-store/user/user.selector";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import OrderPreview from "../../components/order-preview/order-preview.component";
import "./order-history.styles.scss";
import Spinner from "../../components/spinner/spinner.component";

const OrderHistory = () => {
  const currentUser = useSelector(selectCurrentUser);
  const [allOrders, setAllOrders] = useState([]);

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
    if (currentUser) {
      getOrders();
      console.log(allOrders);
    }
  }, [currentUser]); // maybe AllOrders ?
  // useEffect(() => {
  // }, [allOrders]);

  return (
    <section className="order-history-container">
      {allOrders && currentUser ? (
        allOrders.map((order) => (
          <div className="order-previews-div">
            <OrderPreview
              key={order[0]}
              title={order[0]}
              cartItems={order[1].items}
              cartTotal={order[1].total}
            />
          </div>
        ))
      ) : (
        <div className="spinner-div">
          <Spinner />
        </div>
      )}
    </section>
  );
};

export default OrderHistory;
