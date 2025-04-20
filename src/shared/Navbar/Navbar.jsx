import React from "react";
import styles from "./Navbar.module.css";
import Logo from "../../assets/images/logo.png";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <div className={styles.navbar}>
      <div className={styles.navbarStart}>
        <img src={Logo} alt="Logo" />
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
          to="/products"
          className={`${styles.link} ${
            location.pathname === "/products" ? styles.active : ""
          }`}
        >
          Products
        </Link>
        <Link
          to="/registration"
          className={`${styles.link} ${
            location.pathname === "/registration" ? styles.active : ""
          }`}
        >
          Registration
        </Link>
        <Link
          to="/login"
          className={`${styles.link} ${
            location.pathname === "/login" ? styles.active : ""
          }`}
        >
          Login
        </Link>
        <Link
          to="/dasboard"
          className={`${styles.link} ${
            location.pathname === "/dasboard" ? styles.active : ""
          }`}
        >
          Dasboard
        </Link>
      </div>
      <div className={styles.navbarEnd}>
        <i className="fa-solid fa-circle-user" style={{ color: "black" }}>
          ..........
        </i>
      </div>
    </div>
  );
};

export default Navbar;
