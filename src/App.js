import { Routes, Route, Outlet } from "react-router-dom";

import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Footer from "./routes/footer/footer.component";
import SignIn from "./routes/sign-in/sign-in.component";

const New = () => {
  return (
    <div>
      <h1>New Landing Page</h1>
    </div>
  );
};

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path={"signin"} element={<SignIn />} />
          <Route path={"new"} element={<New />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
