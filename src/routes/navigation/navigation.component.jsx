import { Fragment, useContext, useState, useEffect } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import "./navigation.styles.scss";
import { RiSearchLine } from "react-icons/ri";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.components";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.components";
import { CartContext, CartProvider } from "../../contexts/cart.context";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);
  const [stickyClass, setStickyClass] = useState("");

  // STICKY NAV //
  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);
    return () => window.removeEventListener("scroll", stickNavbar);
  }, []);

  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      // window height changed for the demo
      windowHeight > 73 ? setStickyClass("sticky") : setStickyClass("");
    }
  };

  // const signOutHandler = async () => {
  //   await signOutUser();
  //   setCurrentUser(null);
  // };

  return (
    <Fragment>
      <header className="App-header">
        <div className="nav-header">
          <button className="search-btn">
            <RiSearchLine className="search-icon" />
            <input
              className="search-input"
              placeholder="Search"
              type="search"
              required
            ></input>
            {/* <span className="search-text">Search</span> */}
          </button>
          <Link className="logo-link" to="/">
            <h1 className="logo">Malka`s</h1>
          </Link>
          <ul className="nav-list header-nav-list">
            <li>
              {currentUser ? (
                <span className="nav-link" onClick={signOutUser}>
                  Sign Out
                </span>
              ) : (
                <Link className="nav-link" to="/auth">
                  Sign In
                </Link>
              )}
            </li>
            <li>
              <Link className="nav-link cart-link">
                <CartIcon></CartIcon>
              </Link>
            </li>
          </ul>
          {isCartOpen && <CartDropdown />}
        </div>
        <nav className={`nav-menu ${stickyClass}`}>
          <button className={`search-btn ${stickyClass ? "" : "hidden"}`}>
            <RiSearchLine className="search-icon" />
            <input
              className="search-input"
              placeholder="Search"
              type="search"
              required
            ></input>
            {/* <span className="search-text">Search</span> */}
          </button>
          <ul className="nav-list">
            <li>
              <Link className="nav-link" to="/shop">
                Shop
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/">
                New
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/">
                Women
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/">
                Men
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/">
                Outlet
              </Link>
            </li>
          </ul>
          <ul
            className={`nav-list header-nav-list ${
              stickyClass ? "" : "hidden"
            }`}
          >
            <li>
              {currentUser ? (
                <span className="nav-link" onClick={signOutUser}>
                  Sign Out
                </span>
              ) : (
                <Link className="nav-link" to="/auth">
                  Sign In
                </Link>
              )}
            </li>
            <li>
              <Link className="nav-link cart-link">
                <CartIcon></CartIcon>
              </Link>
            </li>
          </ul>
          <div className={`cart-dropdown-div ${stickyClass ? "" : "hidden"}`}>
            {isCartOpen && <CartDropdown />}
          </div>
        </nav>
      </header>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
