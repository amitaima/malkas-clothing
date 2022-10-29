import { Routes, Route, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";

import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Footer from "./routes/footer/footer.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import PaymentPage from "./routes/payment-page/payment-page.component";
import Payment from "./routes/payment/payment.component";
import PaymentConfirmation from "./routes/payment-confirmation/payment-confirmation.component";
import { useEffect, componentDidMount } from "react";
import {
  onAuthStateChangedListener,
  signOutUser,
  createUserDocFromAuth,
  getCurrentUser,
} from "./utils/firebase/firebase.utils";
import OrderHistory from "./routes/order-history/order-history.component";
import Orders from "./routes/orders/orders.component";
import Wishlist from "./routes/wishlist/wishlist.component";
import Product from "./routes/product/product.component";

import { checkUserSession } from "./redux-store/user/user.action";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadingLogo = document.querySelector(".loading-logo");
    loadingLogo.style.display = "none";
    dispatch(checkUserSession());

    // const unsubscribe = onAuthStateChangedListener((user) => {
    //   if (user) createUserDocFromAuth(user);
    //   dispatch(setCurrentUser(user));
    // });
    // return unsubscribe;
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path={"auth"} element={<Authentication />} />
          <Route path={"shop/*"} element={<Shop />} />
          <Route path={"wishlist"} element={<Wishlist />} />
          <Route path={"checkout"} element={<Checkout />} />
          <Route path={"payment/*"} element={<Payment />} />
          <Route path={"order-history/*"} element={<Orders />} />
          <Route path={"product/*"} element={<Product />} />
          {/* <Route path={"payment/"} element={<PaymentPage />} />
          <Route path={"payment/"} element={<PaymentPage />} /> */}
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
