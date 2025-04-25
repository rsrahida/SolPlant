import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/client";
import styles from "./ManageUsers.module.css";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const [profileList, setProfileList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ username: "", age: "", phone: "" });

  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    username: "",
    age: "",
    phone: "",
  });

  useEffect(() => {
    async function fetchProfiles() {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, username, age, phone");
      if (error) console.error(error.message);
      else setProfileList(data);
    }
    fetchProfiles();
  }, []);

  const handleEdit = (profile) => {
    setEditId(profile.id);
    setForm({
      username: profile.username,
      age: profile.age,
      phone: profile.phone,
    });
  };

  const handleCancel = () => {
    setEditId(null);
    setForm({ username: "", age: "", phone: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const { error } = await supabase
      .from("profiles")
      .update({
        username: form.username,
        age: form.age,
        phone: form.phone,
      })
      .eq("id", editId);
    if (error) {
      Swal.fire("Error", "Changes were not saved: " + error.message, "error");
    } else {
      setProfileList((prev) =>
        prev.map((p) =>
          p.id === editId
            ? {
                id: p.id,
                username: form.username,
                age: form.age,
                phone: form.phone,
              }
            : p
        )
      );
      handleCancel();
      Swal.fire("Success", "Changes were saved!", "success");
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this profile?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { error } = await supabase.from("profiles").delete().eq("id", id);
        if (error) {
          Swal.fire(
            "Error",
            "An error occurred while deleting: " + error.message,
            "error"
          );
        } else {
          setProfileList((prev) => prev.filter((p) => p.id !== id));
          Swal.fire("Deleted", "Profile successfully deleted", "success");
        }
      }
    });
  };

  const handleNewUserChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = async () => {
    const { email, password, username, age, phone } = newUser;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      Swal.fire("Error", "User was not added: " + error.message, "error");
      return;
    }

    const userId = data.user?.id;

    if (userId) {
      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: userId,
          username,
          age,
          phone,
        },
      ]);

      if (profileError) {
        Swal.fire(
          "Error",
          "Profile was not added: " + profileError.message,
          "error"
        );
      } else {
        setProfileList((prev) => [
          ...prev,
          { id: userId, username, age, phone },
        ]);
        setNewUser({
          email: "",
          password: "",
          username: "",
          age: "",
          phone: "",
        });
        Swal.fire("Success", "User was added successfully!", "success");
      }
    }
  };

  return (
    <div className={styles.generalContainer}>
      <div className={styles.container}>
        <h2 className={styles.title}>Manage Users</h2>
        <div className={styles.addForm}>
          <h3>Add New User</h3>
          <input
            name="username"
            placeholder="Username"
            value={newUser.username}
            onChange={handleNewUserChange}
          />
          <input
            name="age"
            type="number"
            placeholder="Age"
            value={newUser.age}
            onChange={handleNewUserChange}
          />
          <input
            name="phone"
            placeholder="Phone"
            value={newUser.phone}
            onChange={handleNewUserChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newUser.email}
            onChange={handleNewUserChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={newUser.password}
            onChange={handleNewUserChange}
          />
          <button className={styles.saveBtn} onClick={handleAdd}>
            Add
          </button>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Username</th>
              <th>Age</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {profileList.map((p) => (
              <tr key={p.id}>
                <td>
                  {editId === p.id ? (
                    <input
                      name="username"
                      value={form.username}
                      onChange={handleChange}
                      className={styles.input}
                    />
                  ) : (
                    p.username
                  )}
                </td>
                <td>
                  {editId === p.id ? (
                    <input
                      name="age"
                      type="number"
                      value={form.age}
                      onChange={handleChange}
                      className={styles.input}
                    />
                  ) : (
                    p.age
                  )}
                </td>
                <td>
                  {editId === p.id ? (
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className={styles.input}
                    />
                  ) : (
                    p.phone
                  )}
                </td>
                <td className={styles.actions}>
                  {editId === p.id ? (
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
                        onClick={() => handleEdit(p)}
                      >
                        Edit
                      </button>
                      <button
                        className={styles.deleteBtn}
                        onClick={() => handleDelete(p.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
