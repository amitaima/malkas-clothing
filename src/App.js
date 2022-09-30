import { Routes, Route, Outlet } from "react-router-dom";

import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Footer from "./routes/footer/footer.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path={"auth"} element={<Authentication />} />
          <Route path={"shop"} element={<Shop />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
