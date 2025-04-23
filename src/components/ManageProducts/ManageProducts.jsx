import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/client";
import styles from "./ManageProducts.module.css";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    image: "",
    title: "",
    price: "",
    category: "",
    sunlight: "",
    size: "",
    description: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase.from("products").select("*");
        if (error) throw error;
        setProducts(data);
      } catch (error) {
        console.error(
          "An error occurred while loading products:",
          error.message
        );
      }
    };
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setEditingId(product.id);
    setEditForm({
      image: product.image || "",
      title: product.title,
      price: product.price,
      category: product.category,
      sunlight: product.sunlight || "",
      size: product.size || "",
      description: product.description || "",
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({
      image: "",
      title: "",
      price: "",
      category: "",
      sunlight: "",
      size: "",
      description: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const updateData = { ...editForm };
      const { error } = await supabase
        .from("products")
        .update(updateData)
        .eq("id", editingId);
      if (error) throw error;
      setProducts((prev) =>
        prev.map((p) => (p.id === editingId ? { ...p, ...updateData } : p))
      );
      handleCancel();
      alert("Product successfully saved!");
    } catch (error) {
      console.error("Error saving product:", error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
      setProducts((prev) => prev.filter((p) => p.id !== id));
      alert("Product successfully deleted!");
    } catch (error) {
      console.error("Error deleting product:", error.message);
    }
  };

  const truncate = (text, wordCount = 7) => {
    const words = text.split(" ");
    return words.length > wordCount
      ? words.slice(0, wordCount).join(" ") + "..."
      : text;
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Manage Products</h2>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Category</th>
              <th>Sunlight</th>
              <th>Size</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  {editingId === product.id ? (
                    <input
                      type="text"
                      name="image"
                      value={editForm.image}
                      onChange={handleChange}
                      placeholder="Image URL"
                      className={styles.input}
                    />
                  ) : (
                    <img
                      src={product.image}
                      alt={product.title}
                      className={styles.image}
                    />
                  )}
                </td>
                <td>
                  {editingId === product.id ? (
                    <input
                      type="text"
                      name="title"
                      value={editForm.title}
                      onChange={handleChange}
                      className={styles.input}
                    />
                  ) : (
                    product.title
                  )}
                </td>
                <td>
                  {editingId === product.id ? (
                    <input
                      type="number"
                      name="price"
                      value={editForm.price}
                      onChange={handleChange}
                      className={styles.input}
                    />
                  ) : (
                    `${product.price} ₼`
                  )}
                </td>
                <td>
                  {editingId === product.id ? (
                    <input
                      type="text"
                      name="category"
                      value={editForm.category}
                      onChange={handleChange}
                      className={styles.input}
                    />
                  ) : (
                    product.category
                  )}
                </td>
                <td>
                  {editingId === product.id ? (
                    <input
                      type="text"
                      name="sunlight"
                      value={editForm.sunlight}
                      onChange={handleChange}
                      className={styles.input}
                    />
                  ) : (
                    product.sunlight
                  )}
                </td>
                <td>
                  {editingId === product.id ? (
                    <input
                      type="text"
                      name="size"
                      value={editForm.size}
                      onChange={handleChange}
                      className={styles.input}
                    />
                  ) : (
                    product.size
                  )}
                </td>
                <td>
                  {editingId === product.id ? (
                    <input
                      type="text"
                      name="description"
                      value={editForm.description}
                      onChange={handleChange}
                      className={styles.input}
                    />
                  ) : (
                    truncate(product.description || "")
                  )}
                </td>
                <td>
                  <div className={styles.actions}>
                    {editingId === product.id ? (
                      <>
                        <button className={styles.saveBtn} onClick={handleSave}>
                          Save
                        </button>
                        <button
                          className={styles.cancelBtn}
                          onClick={handleCancel}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className={styles.editBtn}
                          onClick={() => handleEdit(product)}
                        >
                          Edit
                        </button>
                        <button
                          className={styles.deleteBtn}
                          onClick={() => handleDelete(product.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProducts;
