import React from "react";
import styles from "./Navbar.module.css";
import Logo from "../../assets/images/logo.png";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

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
          to={"/dashboard"}
          className={`${styles.link} ${
            location.pathname === "/dashboard" ? styles.active : ""
          }`}
        >
          Dashboard
        </Link>
      </div>
      <div className={styles.navbarEnd}>
        <Link to="/basket" className={styles.basket}>
          <i
            className="fa-solid fa-basket-shopping"
            style={{ color: "#000000", fontSize: "20px", marginLeft: "8px" }}
          ></i>
        </Link>
        <Link to="/wishlist" className={styles.basket}>
          <i
            className="fa-solid fa-heart"
            style={{ color: "#000000", fontSize: "20px", marginLeft: "8px" }}
          ></i>
        </Link>
        <Link to="/dashboard" className={styles.basket}>
          {" "}
          <i
            className="fa-solid fa-circle-user"
            style={{ color: "black", fontSize: "20px", marginLeft: "8px" }}
          >
            <span className={styles.name}>
              &nbsp;{user ? user.username : "........."}
            </span>
          </i>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
