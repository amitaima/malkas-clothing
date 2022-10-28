import "./mobile-nav.styles.scss";
import Hamburger from "hamburger-react";
import { RiSearchLine } from "react-icons/ri";
import { Link } from "react-router-dom";

import { useState } from "react";

const MobileNav = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const toggleMenu = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  return (
    <header className={`App-header  ${isMobileNavOpen ? "open" : ""}`}>
      {/* <div className="background"></div> */}
      <nav className="navbar">
        <img className="navbar-logo" src="./assets/logo.png" />
        <input type="text" placeholder="Search" className="navbar-search" />
      </nav>
      <button className="navbar-burger" onClick={toggleMenu}></button>
      <nav className="menu">
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Products</a>
        <a href="#">Contact</a>
      </nav>
    </header>
  );
};

export default MobileNav;
