import React, { useState } from "react";
import styles from "./Navbar.module.css";
import logo from "../../assets/images/logo.png";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const pagesLinks = [
    { label: "Cart", path: "/cart" },
    { label: "Change Password", path: "/changePassword" },
    { label: "Login", path: "/login" },
    { label: "Order Details", path: "/orderDetails" },
    { label: "Order Summery", path: "/orderSummery" },
    { label: "Order Tracking", path: "/orderTracking" },
    { label: "Payment", path: "/payment" },
    { label: "Profile", path: "/profile" },
    { label: "Sign Up", path: "/signUp" },
  ];

  return (
    <div className={styles.navbar}>
      <div className={styles.navbarStart}>
        <img src={logo} alt="Logo" />
      </div>

      <div className={styles.navbarMiddle}>
        <Link
          to="/"
          className={`${styles.link} ${
            location.pathname === "/" ? styles.active : ""
          }`}
        >
          Home
        </Link>
        <Link
          to="/about"
          className={`${styles.link} ${
            location.pathname === "/about" ? styles.active : ""
          }`}
        >
          About Us
        </Link>

        {/* DROPDOWN PAGES */}
        <div
          className={styles.dropdownWrapper}
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <p className={styles.link}>
            Pages <i className="fa-solid fa-chevron-down"></i>
          </p>
          {dropdownOpen && (
            <ul className={styles.dropdown}>
              {pagesLinks.map((link) => (
                <li key={link.path} className={styles.dropdownItem}>
                  <Link
                    to={link.path}
                    className={`${styles.link} ${
                      location.pathname === link.path ? styles.active : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <Link
          to="/product"
          className={`${styles.link} ${
            location.pathname === "/product" ? styles.active : ""
          }`}
        >
          Product
        </Link>
        <Link
          to="/blog"
          className={`${styles.link} ${
            location.pathname === "/blog" ? styles.active : ""
          }`}
        >
          Blog
        </Link>
        <Link
          to="/contact"
          className={`${styles.link} ${
            location.pathname === "/contact" ? styles.active : ""
          }`}
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
