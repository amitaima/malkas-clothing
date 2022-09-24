import "./footer.styles.scss";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { RiTwitterLine, RiInstagramLine, RiFacebookLine } from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="logo-col">
        <Link className="logo-link--footer" to="/">
          <h1 className="logo--footer">Malka`s</h1>
        </Link>

        <ul className="social-links">
          <li>
            <a className="footer-link" href="#">
              <RiInstagramLine className="social-icon" name="logo-instagram" />
            </a>
          </li>
          <li>
            <a className="footer-link" href="#">
              <RiFacebookLine className="social-icon" name="logo-facebook" />
            </a>
          </li>
          <li>
            <a className="footer-link" href="#">
              <RiTwitterLine className="social-icon" name="logo-twitter" />
            </a>
          </li>
        </ul>

        <p className="copyright">
          Copyright &copy; <span className="year">2027</span> by Malka's, Inc.
          All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
