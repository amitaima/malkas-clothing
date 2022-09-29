import { Fragment, useContext } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import "./navigation.styles.scss";
import { RiSearchLine, RiShoppingBagLine } from "react-icons/ri";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const signOutHandler = async () => {
    await signOutUser();
    setCurrentUser(null);
  };

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
                <span className="nav-link" onClick={signOutHandler}>
                  Sign Out
                </span>
              ) : (
                <Link className="nav-link" to="/auth">
                  Sign In
                </Link>
              )}
            </li>
            <li>
              <Link className="nav-link cart-link" to="/">
                <RiShoppingBagLine className="cart-icon" />
                <span className="cart-num">3</span>
              </Link>
            </li>
          </ul>
        </div>
        <nav className="nav-menu">
          <ul className="nav-list">
            <li>
              <Link className="nav-link" to="/new">
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
        </nav>
      </header>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
