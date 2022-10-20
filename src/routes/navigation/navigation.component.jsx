import { Fragment, useContext, useState, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux-store/user/user.selector";

import "./navigation.styles.scss";
import { RiSearchLine } from "react-icons/ri";
import CartIcon from "../../components/cart-icon/cart-icon.components";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.components";
import { selectIsCartOpen } from "../../redux-store/cart/cart.selector";
import { selectCategoriesMap } from "../../redux-store/categories/category.selector";
import SearchDropdown from "../../components/search-dropdown/search-dropdown.component";
import { getCategoriesandDocuments } from "../../utils/firebase/firebase.utils";
import { useDispatch } from "react-redux";
import { fetchCategoriesStart } from "../../redux-store/categories/category.action";
import { signOutStart } from "../../redux-store/user/user.action";
import { RiArrowUpSLine, RiArrowDropDownFill } from "react-icons/ri";
import { setCart, setCartNoUser } from "../../redux-store/cart/cart.action";

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  const [searchDropClass, setsearchDropClass] = useState(false);
  const [stickyClass, setStickyClass] = useState("");
  const [searchField, setSearchField] = useState(""); // [state, setState]
  const categoriesMap = useSelector(selectCategoriesMap);
  const allProducts = Object.values(categoriesMap).flat();
  const [filteredProducts, setfilteredProducts] = useState(allProducts);
  // console.log(filteredProducts);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signOutUser = () => {
    dispatch(signOutStart());
    navigate("/");
  };

  useEffect(() => {
    // console.log(currentUser);/";
    window.location.href.includes("auth") && currentUser && navigate("/");
    !window.location.href.includes("auth") && currentUser
      ? dispatch(setCart(currentUser.cart, currentUser))
      : dispatch(setCart([], null));
  }, [currentUser]);

  useEffect(() => {
    dispatch(fetchCategoriesStart());
  }, []);
  // Search
  // gfds;
  useEffect(() => {
    const newFilteredProducts = allProducts.filter((product) =>
      product.name.toLowerCase().includes(searchField)
    );
    setfilteredProducts(newFilteredProducts);
  }, [searchField]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLowerCase();
    setSearchField(searchFieldString); // A rerender triggers by the change of 'searchField' (state)
  };

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

  const openSearch = () => {
    console.log("openSearch");
    setsearchDropClass(true);
    // setIsCartOpen(true);
  };

  const closeSearch = () => {
    console.log("closeSearch");
    setsearchDropClass(false);
    // setIsCartOpen(false);
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
              onChange={onSearchChange}
              onFocus={openSearch}
              required
            ></input>
            {/* <span className="search-text">Search</span> */}
          </button>
          <Link className="logo-link" to="/">
            <h1 className="logo">Malka`s</h1>
          </Link>
          <ul className="nav-list header-nav-list">
            {!window.location.href.includes("auth") &&
            currentUser &&
            currentUser.displayName ? (
              <li className="dropdown dropdown-2">
                <div className="name-container">
                  <span className="display-name">
                    Hi,{" "}
                    {currentUser.displayName
                      .split(" ")[0]
                      .charAt(0)
                      .toUpperCase() +
                      currentUser.displayName
                        .split(" ")[0]
                        .slice(1)
                        .toLowerCase()}
                  </span>
                  <RiArrowDropDownFill className="arrow-icon" />
                </div>
                <ul class="dropdown_menu dropdown_menu-2">
                  <li class="dropdown_item dropdown_item--1">
                    <Link className="dropdown-link" to="/order-history">
                      My Orders
                    </Link>
                  </li>
                  <li class="dropdown_item dropdown_item--2">
                    <Link className="dropdown-link" to="/">
                      My Profile
                    </Link>
                  </li>
                  <li class="dropdown_item dropdown_item--3">
                    <Link className="dropdown-link" to="/">
                      Settings
                    </Link>
                  </li>
                  <li class="dropdown_item dropdown_item--4">
                    <Link className="dropdown-link" to="/">
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </li>
            ) : (
              ""
            )}

            <li>
              {!window.location.href.includes("auth") && currentUser ? (
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
          {/* {isCartOpen && <CartDropdown />} */}
        </div>
        <nav className={`nav-menu ${stickyClass}`}>
          <button className={`search-btn ${stickyClass ? "" : "hidden"}`}>
            <RiSearchLine className="search-icon" />
            <input
              className="search-input"
              placeholder="Search"
              type="search"
              onChange={onSearchChange}
              value={searchField}
              onFocus={openSearch}
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
                <span className="nav-link-sticky" onClick={signOutUser}>
                  Sign Out
                </span>
              ) : (
                <Link className="nav-link-sticky" to="/auth">
                  Sign In
                </Link>
              )}
            </li>
            <li>
              <Link className="nav-link-sticky cart-link">
                <CartIcon></CartIcon>
              </Link>
            </li>
          </ul>
          <div className={`cart-dropdown-div ${!isCartOpen && "hide-cart"}`}>
            {isCartOpen && <CartDropdown />}
          </div>
          <div
            className={`search-dropdown-div ${
              !searchDropClass ? "hide-search" : ""
            }`}
            aria-hidden={!searchDropClass ? true : false}
          >
            <SearchDropdown
              className={!searchDropClass ? "hide-search" : ""}
              products={filteredProducts}
              searchField={searchField}
            ></SearchDropdown>
            <div
              onClick={closeSearch}
              className={`search-dropdown-div ${
                !searchDropClass ? "hide-search" : ""
              }`}
              aria-hidden={!searchDropClass ? true : false}
            ></div>
          </div>
        </nav>
      </header>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
