import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../features/auth/authSlice";
import styles from "./Registration.module.css";
import LeafBackground from "../../components/Background/LeafBackground";
import Swal from "sweetalert2";

const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, registerError } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: "",
    age: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};
    const phoneRegex =
      /^\+?\d{1,3}?[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.username.trim()) errors.username = "Username is required";
    if (!formData.email) errors.email = "Email is required";
    else if (!emailRegex.test(formData.email))
      errors.email = "Invalid email format";
    if (!formData.password) errors.password = "Password is required";
    else if (formData.password.length < 8)
      errors.password = "Password must be at least 8 characters long";
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (!formData.age) errors.age = "Age is required";
    if (!formData.phone) errors.phone = "Phone number is required";
    else if (!phoneRegex.test(formData.phone))
      errors.phone = "Phone number is invalid";

    return errors;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    const { confirmPassword, ...userData } = formData;

    await dispatch(registerUser(userData))
      .unwrap()
      .then(() => {
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          age: "",
          phone: "",
        });
        Swal.fire({
          title: "Good job!",
          text: "Registration completed successfully!",
          icon: "success",
          timer: 1500,
        }).then(() => {
          navigate("/login");
        });
      })
      .catch(() => {});
  };

  return (
    <div className={styles.formContainer}>
      <LeafBackground />
      <form className={styles.form} onSubmit={handleRegister}>
        <h2>Registration</h2>
        <input
          className={styles.input}
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
        />
        {errors.username && <p className={styles.error}>{errors.username}</p>}

        <input
          className={styles.input}
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
          placeholder="Age"
        />
        {errors.age && <p className={styles.error}>{errors.age}</p>}

        <input
          className={styles.input}
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
        />
        {errors.phone && <p className={styles.error}>{errors.phone}</p>}

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

        <input
          className={styles.input}
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
        />
        {errors.confirmPassword && (
          <p className={styles.error}>{errors.confirmPassword}</p>
        )}

        {registerError && <p className={styles.error}>{registerError}</p>}

        <button className={styles.button} type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Registration;
