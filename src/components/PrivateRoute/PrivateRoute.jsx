import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./PrivateRoute.module.css";

const PrivateRoute = () => {
  const user = useSelector((state) => state.auth.user);

  return user ? (
    <Outlet />
  ) : (
    <div className={styles.container}>
      <div className={styles.messageBox}>
        <p className={styles.message}>
          Please sign in to access your dashboard.
        </p>
        <Link to="/login" className={styles.loginLink}>
          Login
        </Link>
      </div>
    </div>
  );
};

export default PrivateRoute;
