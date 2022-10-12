import { Routes, Route, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";

import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Footer from "./routes/footer/footer.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import { useEffect, componentDidMount } from "react";
import {
  onAuthStateChangedListener,
  signOutUser,
  createUserDocFromAuth,
} from "./utils/firebase/firebase.utils";

import { setCurrentUser } from "./redux-store/user/user.action";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadingLogo = document.querySelector(".loading-logo");
    loadingLogo.style.display = "none";
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) createUserDocFromAuth(user);
      dispatch(setCurrentUser(user));
    });
    return unsubscribe;
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path={"auth"} element={<Authentication />} />
          <Route path={"shop/*"} element={<Shop />} />
          <Route path={"checkout"} element={<Checkout />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
