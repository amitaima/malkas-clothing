import { Fragment, useContext, useState, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux-store/user/user.selector";

import "./navigation.styles.scss";
import { RiSearchLine } from "react-icons/ri";
import WishlistIcon from "../../components/wishlist-icon/wishlist-icon.component";
import CartIcon from "../../components/cart-icon/cart-icon.components";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.components";
import { selectIsCartOpen } from "../../redux-store/cart/cart.selector";
import { selectCategoriesMap } from "../../redux-store/categories/category.selector";
import SearchDropdown from "../../components/search-dropdown/search-dropdown.component";
import { getCategoriesandDocuments } from "../../utils/firebase/firebase.utils";
import { useDispatch } from "react-redux";
import { fetchCategoriesStart } from "../../redux-store/categories/category.action";
import { signOutStart } from "../../redux-store/user/user.action";
import {
  RiArrowUpSLine,
  RiArrowDropDownFill,
  RiCloseFill,
  RiCloseLine,
} from "react-icons/ri";
import { setCart, setCartNoUser } from "../../redux-store/cart/cart.action";
import { setWishlist } from "../../redux-store/wishlist/wishlist.action";
import Hamburger from "hamburger-react";

import MobileNav from "../../components/mobile-nav/mobile-nav.component";
import MobileSearch from "../../components/mobile-search/mobile-search.component";

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  const [searchDropClass, setsearchDropClass] = useState(false);
  const [stickyClass, setStickyClass] = useState("");
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [searchField, setSearchField] = useState(""); // [state, setState]
  const categoriesMap = useSelector(selectCategoriesMap);
  const allProducts = Object.values(categoriesMap).flat();
  const [filteredProducts, setfilteredProducts] = useState(allProducts);
  const [matches, setMatches] = useState(
    window.matchMedia("(max-width: 75em)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(max-width: 75em)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);
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
    !window.location.href.includes("auth") && currentUser
      ? dispatch(setWishlist(currentUser.wishlist, currentUser))
      : dispatch(setWishlist([], null));
  }, [currentUser]);

  useEffect(() => {
    dispatch(fetchCategoriesStart());
  }, []);
  // Search
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
    setsearchDropClass(true);
    // setIsCartOpen(true);
  };

  const closeSearch = () => {
    setsearchDropClass(false);
    // setIsCartOpen(false);
  };

  const toggleMobileSearch = () => {
    setIsMobileSearchOpen(!isMobileSearchOpen);
    // setIsCartOpen(true);
  };

  const closeMobileSearch = () => {
    setIsMobileSearchOpen(false);
    // setIsCartOpen(false);
  };
  const closeMenu = () => {
    setIsMobileNavOpen(false);
  };

  return (
    <Fragment>
      {/* <MobileNav /> */}
      {/****************************
       *
       * Mobile Navbar
       *
       ******************************/}
      <div className={`nav-mobile ${!matches && "hidden"}`}>
        <header className="App-header">
          <Link className="logo-link-mobile" to="/">
            <h1 className="logo">Malka`s</h1>
          </Link>
          <div className="flex-row menu-search">
            <button className="search-btn" onClick={toggleMobileSearch}>
              <RiSearchLine className="search-icon" />
              {/* <input
                className="search-input"
                placeholder="Search"
                type="search"
                onChange={onSearchChange}
                onFocus={openSearch}
                required
              ></input> */}
              {/* <span className="search-text">Search</span> */}
            </button>
            <div
              className={`hamburger-container ${
                isMobileSearchOpen ? "hidden" : ""
              }`}
            >
              <Hamburger
                direction="right"
                duration={0.3}
                size={24}
                color="#777"
                toggled={isMobileNavOpen}
                toggle={setIsMobileNavOpen}
              />
            </div>
          </div>
        </header>
        <nav className={`mobile-menu ${isMobileNavOpen ? "open" : ""}`}>
          <div className="background"></div>
          <ul className="nav-list header-nav-list">
            {!window.location.href.includes("auth") && currentUser ? (
              <li className="dropdown dropdown-2">
                <div
                  className="name-container"
                  onClick={() => setIsMobileNavOpen(true)}
                >
                  <span className="display-name">
                    {currentUser.displayName
                      ? "Hi, " +
                        currentUser.displayName
                          .split(" ")[0]
                          .charAt(0)
                          .toUpperCase() +
                        currentUser.displayName
                          .split(" ")[0]
                          .slice(1)
                          .toLowerCase()
                      : "Hi"}
                  </span>
                  <RiArrowDropDownFill className="arrow-icon" />
                </div>
                <ul
                  className="dropdown_menu dropdown_menu-2"
                  onClick={closeMenu}
                >
                  <li className="dropdown_item dropdown_item--1">
                    <Link className="dropdown-link" to="/order-history">
                      My Orders
                    </Link>
                  </li>
                  <li className="dropdown_item dropdown_item--2">
                    <Link className="dropdown-link" to="/">
                      My Profile
                    </Link>
                  </li>
                  <li className="dropdown_item dropdown_item--3">
                    <Link className="dropdown-link" to="/">
                      Settings
                    </Link>
                  </li>
                  <li className="dropdown_item dropdown_item--4">
                    <span className="dropdown-link" onClick={signOutUser}>
                      Sign Out
                    </span>
                  </li>
                </ul>
              </li>
            ) : (
              <Link className="nav-link" to="/auth">
                Sign In
              </Link>
            )}
            <li>
              <Link
                className="nav-link wishlist-link"
                to="/wishlist"
                onClick={closeMenu}
              >
                <WishlistIcon></WishlistIcon>
              </Link>
            </li>
            <li>
              <Link
                className="nav-link cart-link"
                to="/checkout"
                onClick={closeMenu}
              >
                <CartIcon></CartIcon>
              </Link>
            </li>
          </ul>
          <ul className="mobile-nav-list" onClick={closeMenu}>
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
              <Link className="nav-link" to="/shop/womens">
                Women
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="/shop/mens">
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
        <div
          className={`mobile-search-container mobile-menu ${
            isMobileSearchOpen ? "open" : ""
          }`}
          aria-hidden={!isMobileSearchOpen ? true : false}
        >
          <div className="mobile-search-nav">
            <div className="mobile-close-search" onClick={closeMobileSearch}>
              <RiCloseLine className="mobile-close" />
            </div>
            <button className="search-btn">
              <RiSearchLine className="search-icon" />
              <input
                className="search-input"
                placeholder="Search"
                type="search"
                onChange={onSearchChange}
                required
              ></input>
              {/* <span className="search-text">Search</span> */}
            </button>
          </div>
          <MobileSearch
            className={!isMobileSearchOpen ? "hide-search" : ""}
            products={filteredProducts}
            searchField={searchField}
          ></MobileSearch>
        </div>
      </div>
      {/****************************
       *
       * Regular Navbar
       *
       ******************************/}
      <div className={`${matches && "hidden"}`}>
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
              {!window.location.href.includes("auth") && currentUser ? (
                <li className="dropdown dropdown-2">
                  <div className="name-container">
                    <span className="display-name">
                      {currentUser.displayName
                        ? "Hi, " +
                          currentUser.displayName
                            .split(" ")[0]
                            .charAt(0)
                            .toUpperCase() +
                          currentUser.displayName
                            .split(" ")[0]
                            .slice(1)
                            .toLowerCase()
                        : "Hi"}
                    </span>
                    <RiArrowDropDownFill className="arrow-icon" />
                  </div>
                  <ul className="dropdown_menu dropdown_menu-2">
                    <li className="dropdown_item dropdown_item--1">
                      <Link className="dropdown-link" to="/order-history">
                        My Orders
                      </Link>
                    </li>
                    <li className="dropdown_item dropdown_item--2">
                      <Link className="dropdown-link" to="/">
                        My Profile
                      </Link>
                    </li>
                    <li className="dropdown_item dropdown_item--3">
                      <Link className="dropdown-link" to="/">
                        Settings
                      </Link>
                    </li>
                    <li className="dropdown_item dropdown_item--4">
                      <span className="dropdown-link" onClick={signOutUser}>
                        Sign Out
                      </span>
                    </li>
                  </ul>
                </li>
              ) : (
                <Link className="nav-link" to="/auth">
                  Sign In
                </Link>
              )}
              <li>
                <Link className="nav-link wishlist-link" to="/wishlist">
                  <WishlistIcon></WishlistIcon>
                </Link>
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
                <Link className="nav-link" to="/shop/womens">
                  Women
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/shop/mens">
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
                  <ul className="dropdown_menu dropdown_menu-2">
                    <li className="dropdown_item dropdown_item--1">
                      <Link className="dropdown-link" to="/order-history">
                        My Orders
                      </Link>
                    </li>
                    <li className="dropdown_item dropdown_item--2">
                      <Link className="dropdown-link" to="/">
                        My Profile
                      </Link>
                    </li>
                    <li className="dropdown_item dropdown_item--3">
                      <Link className="dropdown-link" to="/">
                        Settings
                      </Link>
                    </li>
                    <li className="dropdown_item dropdown_item--4">
                      <span className="dropdown-link" onClick={signOutUser}>
                        Sign Out
                      </span>
                    </li>
                  </ul>
                </li>
              ) : (
                <li>
                  <Link className="nav-link" to="/auth">
                    Sign In
                  </Link>
                </li>
              )}
              <li>
                <Link className="nav-link-sticky wishlist-link" to="/wishlist">
                  <WishlistIcon></WishlistIcon>
                </Link>
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
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
