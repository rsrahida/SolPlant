import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";
import {
  FaBoxOpen,
  FaPlus,
  FaEnvelope,
  FaCogs,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className={styles.dashboardContainer}>
      <h2 className={styles.dashboardTitle}>
        {user ? (
          <>
            Welcome to your Dashboard,{" "}
            <span className={styles.name}>{user.username}</span>
          </>
        ) : (
          <span className={styles.notLoggedIn}>Please log in</span>
        )}
      </h2>

      {!user ? (
        <div className={styles.loginMessage}>
          <p>
            To proceed, please{" "}
            <Link to="/login" className={styles.loginLink}>
              log in
            </Link>
            .
          </p>
        </div>
      ) : (
        <div className={styles.cardList}>
          <Link to="/dashboard/products" className={styles.card}>
            <FaBoxOpen className={styles.icon} />
            <div>
              <h3>Manage Products</h3>
              <p>Edit, delete, or view your plant products.</p>
            </div>
          </Link>

          <Link to="/products/addproducts" className={styles.card}>
            <FaPlus className={styles.icon} />
            <div>
              <h3>Add New Product</h3>
              <p>Add a fresh plant to your store.</p>
            </div>
          </Link>

          <Link to="/dashboard/dashboardchart" className={styles.card}>
            <FaCogs className={styles.icon} />
            <div>
              <h3>Analytics</h3>
              <p>View your weekly product stats.</p>
            </div>
          </Link>

          <Link to="/dashboard/manageusers" className={styles.card}>
            <FaUsers className={styles.icon} />
            <div>
              <h3>Manage Users</h3>
              <p>View and manage registered users.</p>
            </div>
          </Link>

          <button
            className={`${styles.card} ${styles.logout}`}
            onClick={handleLogout}
          >
            <FaSignOutAlt className={styles.icon} />
            <div>
              <h3 style={{ marginLeft: "-140px" }}>Logout</h3>
              <p>Leave the admin panel securely.</p>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
