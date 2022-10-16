import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import OrderHistory from "../order-history/order-history.component";

const Orders = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Routes>
      <Route index element={<OrderHistory />} />
      <Route path=":order" element={<OrderInfo />} />
    </Routes>
  );
};

export default Orders;
