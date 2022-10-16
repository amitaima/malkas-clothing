import OrderSummary from "../../components/order-summary/order-summary.component";
import { getOrdersDB } from "../../utils/firebase/firebase.utils";
import { selectCurrentUser } from "../../redux-store/user/user.selector";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";

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
    getOrders();
  }, []);
  // useEffect(() => {
  // }, [allOrders]);

  return (
    <section className="order-history-container">
      {allOrders &&
        allOrders.map((order) => (
          <div>
            <h3>{order[0]}</h3>
            <OrderSummary
              key={order[0]}
              cartItems={order[1].items}
              cartTotal={order[1].total}
            />
          </div>
        ))}
    </section>
  );
};

export default OrderHistory;

/*
order5
: 
address
: 
"Moreshet, Levona 294"
date
: 
"16/10/2022"
email
: 
"amitai.malka@gmail.com"
items
: 
(3) [{…}, {…}, {…}]
name
: 
"Amitai Malka"
phone
: 
"0584966113"
total
: 
78
*/
