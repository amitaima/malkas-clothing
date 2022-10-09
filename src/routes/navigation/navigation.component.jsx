import { Fragment, useContext, useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux-store/user/user.selector";

import "./navigation.styles.scss";
import { RiSearchLine } from "react-icons/ri";

import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.components";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.components";
import { selectIsCartOpen } from "../../redux-store/cart/cart.selector";
import { selectCategoriesMap } from "../../redux-store/categories/category.selector";
import SearchDropdown from "../../components/search-dropdown/search-dropdown.component";
import { getCategoriesandDocuments } from "../../utils/firebase/firebase.utils";
import { useDispatch } from "react-redux";
import { fetchCategoriesAsync } from "../../redux-store/categories/category.action";
import { RiArrowUpSLine } from "react-icons/ri";

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

  useEffect(() => {
    dispatch(fetchCategoriesAsync());
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
