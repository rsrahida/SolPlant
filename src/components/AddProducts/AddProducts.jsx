import React, { useState } from "react";
import { supabase } from "../../lib/client";
import Swal from "sweetalert2";
import styles from "./AddProducts.module.css";

const AddProducts = () => {
  const [form, setForm] = useState({
    image: "",
    title: "",
    price: "",
    category: "",
    sunlight: "",
    size: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("products").insert([form]);
    if (error) {
      console.error("Error adding product:", error.message);
      Swal.fire({
        icon: "error",
        title: "Failed to add product",
        text: error.message,
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Product added successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      setForm({
        image: "",
        title: "",
        price: "",
        category: "",
        sunlight: "",
        size: "",
        description: "",
      });
    }
  };

  return (
    <div className={styles.generalContainer}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Add New Product</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="Image URL (e.g. https://example.com/image.jpg)"
              required
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title (e.g. Beautiful Plant)"
              required
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <input
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Price (e.g. 22)"
              required
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="Category (e.g. Houseplant)"
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <input
              name="sunlight"
              value={form.sunlight}
              onChange={handleChange}
              placeholder="Sunlight Requirements (e.g. Medium)"
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <input
              name="size"
              value={form.size}
              onChange={handleChange}
              placeholder="Size (e.g. Small)"
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description (e.g. This plant needs moderate watering and bright light)"
              className={styles.textarea}
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
