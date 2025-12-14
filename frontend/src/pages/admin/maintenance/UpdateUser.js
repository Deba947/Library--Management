import React, { useState } from "react";
import axios from "axios";

const UpdateUser = () => {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    password: "",
    role: "",
    status: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        "http://localhost:5000/api/auth/update-user",
        formData,
        {
          headers: {
            "x-role": "admin", // Required for admin access
            "Content-Type": "application/json",
          },
        }
      );

      alert(res.data.message);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Error updating user");
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="fw-bold">Update User</h3>
      <form onSubmit={handleUpdate} className="mt-4">

        <div className="mb-3">
          <label className="form-label">Username (Required)</label>
          <input
            type="text"
            className="form-control"
            name="username"
            placeholder="Enter username to update"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">New Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Enter new name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">New Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Enter new password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Role</label>
          <select
            className="form-control"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="">Select role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            className="form-control"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="">Select status</option>
            <option value="active">Active</option>
            <option value="disabled">Disabled</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Update User
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
