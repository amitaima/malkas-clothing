import OrderSummary from "../../components/order-summary/order-summary.component";
import { getOrdersDB } from "../../utils/firebase/firebase.utils";
import { selectCurrentUser } from "../../redux-store/user/user.selector";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const OrderHistory = () => {
  const currentUser = useSelector(selectCurrentUser);
  const orders = getOrdersDB(currentUser);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="order-history-container">
      {orders.map((order) => (
        <OrderSummary cartItems={order.items} />
      ))}
    </section>
  );
};

export default OrderHistory;
