import React, { useState } from "react";
import API from "../../../api";

const UpdateUser = () => {
  const [form, setForm] = useState({
    userId: "",
    name: "",
    password: "",
    role: "",
    status: ""
  });

  const [msg, setMsg] = useState("");

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    if (!form.userId) {
      setMsg("User ID required");
      return;
    }

    try {
      const res = await API.put("/auth/update-user", form);
      setMsg(res.data.message);
    } catch (err) {
      setMsg(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Update User</h3>
      <hr />

      <input
        name="userId"
        placeholder="User ID"
        className="form-control mb-3"
        onChange={change}
      />

      <input
        name="name"
        placeholder="Name"
        className="form-control mb-3"
        onChange={change}
      />

      <input
        name="password"
        placeholder="New Password"
        type="password"
        className="form-control mb-3"
        onChange={change}
      />

      <label>Role:</label>
      <select name="role" className="form-control mb-3" onChange={change}>
        <option value="">--Select--</option>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <label>Status:</label>
      <select name="status" className="form-control mb-3" onChange={change}>
        <option value="">--Select--</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      <button className="btn btn-primary" onClick={submit}>
        Update User
      </button>

      {msg && <div className="alert alert-info mt-3">{msg}</div>}
    </div>
  );
};

export default UpdateUser;
