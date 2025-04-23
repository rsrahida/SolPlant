import React from "react";
import { Link } from "react-router-dom";
import styles from "./Dashboard.module.css";
import {
  FaBoxOpen,
  FaPlus,
  FaEnvelope,
  FaCogs,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

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

          <Link to="/dashboard/add" className={styles.card}>
            <FaPlus className={styles.icon} />
            <div>
              <h3>Add New Product</h3>
              <p>Add a fresh plant to your store.</p>
            </div>
          </Link>

          <Link to="/dashboard/messages" className={styles.card}>
            <FaEnvelope className={styles.icon} />
            <div>
              <h3>Messages</h3>
              <p>Read feedback and messages from users.</p>
            </div>
          </Link>

          <Link to="/dashboard/settings" className={styles.card}>
            <FaCogs className={styles.icon} />
            <div>
              <h3>Site Settings</h3>
              <p>Update your site's configuration.</p>
            </div>
          </Link>

          <Link to="/dashboard/users" className={styles.card}>
            <FaUsers className={styles.icon} />
            <div>
              <h3>Manage Users</h3>
              <p>View and manage registered users.</p>
            </div>
          </Link>

          <Link to="/logout" className={`${styles.card} ${styles.logout}`}>
            <FaSignOutAlt className={styles.icon} />
            <div>
              <h3>Logout</h3>
              <p>Securely leave the admin panel.</p>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
