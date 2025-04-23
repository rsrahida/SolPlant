import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/auth/authSlice";
import styles from "./Login.module.css";
import LeafBackground from "../../components/Background/LeafBackground";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, loginError } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) errors.email = "Email is required";
    else if (!emailRegex.test(formData.email)) errors.email = "Invalid email";
    if (!formData.password) errors.password = "Password is required";

    return errors;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async () => {
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    await dispatch(loginUser(formData))
      .unwrap()
      .then(() => {
        setFormData({ email: "", password: "" });
        alert("Logged in successfully!");
        navigate("/dashboard");
      })
      .catch(() => {});
  };

  return (
    <div className={styles.container}>
      <LeafBackground />
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <h2>Login</h2>

        <input
          className={styles.input}
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        {errors.email && <p className={styles.error}>{errors.email}</p>}

        <input
          className={styles.input}
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        {errors.password && <p className={styles.error}>{errors.password}</p>}

        {loginError && <p className={styles.error}>{loginError}</p>}

        <button
          className={styles.button}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
