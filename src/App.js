import "./general.scss";
import { Routes, Route, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";

// import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Footer from "./routes/footer/footer.component";
// import Authentication from "./routes/authentication/authentication.component";
// import Shop from "./routes/shop/shop.component";
// import Checkout from "./routes/checkout/checkout.component";
import PaymentPage from "./routes/payment-page/payment-page.component";
// import Payment from "./routes/payment/payment.component";
import PaymentConfirmation from "./routes/payment-confirmation/payment-confirmation.component";
import { useEffect, lazy, Suspense } from "react";
import {
  onAuthStateChangedListener,
  signOutUser,
  createUserDocFromAuth,
  getCurrentUser,
} from "./utils/firebase/firebase.utils";
import OrderHistory from "./routes/order-history/order-history.component";
// import Orders from "./routes/orders/orders.component";
// import Wishlist from "./routes/wishlist/wishlist.component";
// import Product from "./routes/product/product.component";

import { checkUserSession } from "./redux-store/user/user.action";
import Spinner from "./components/spinner/spinner.component";

const Home = lazy(() => import("./routes/home/home.component"));
const Authentication = lazy(() =>
  import("./routes/authentication/authentication.component")
);
const Shop = lazy(() => import("./routes/shop/shop.component"));
const Wishlist = lazy(() => import("./routes/wishlist/wishlist.component"));
const Checkout = lazy(() => import("./routes/checkout/checkout.component"));
const Payment = lazy(() => import("./routes/payment/payment.component"));
const Orders = lazy(() => import("./routes/orders/orders.component"));
const Product = lazy(() => import("./routes/product/product.component"));

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
      <Suspense fallback={<Spinner />}>
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
      </Suspense>
    </div>
  );
}

export default App;
