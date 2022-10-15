import { Routes, Route } from "react-router-dom";

import PaymentPage from "../payment-page/payment-page.component";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from "../../redux-store/user/user.selector";
import PaymentConfirmation from "../payment-confirmation/payment-confirmation.component";

const Payment = () => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Routes>
      <Route index element={<PaymentPage />} />
      <Route path="confirmation" element={<PaymentConfirmation />} />
    </Routes>
  );
};

export default Payment;
