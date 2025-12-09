import React, { useState } from "react";
import API from "../../../api";

const AddUser = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    name: "",
    role: "user"
  });

  const [msg, setMsg] = useState("");

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    if (!form.username || !form.password || !form.name) {
      setMsg("All fields mandatory");
      return;
    }

    try {
      const res = await API.post("/auth/add-user", form);
      setMsg(res.data.message);
    } catch (err) {
      setMsg(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Add User</h3>
      <hr />

      <input
        name="username"
        placeholder="Username"
        className="form-control mb-3"
        onChange={change}
      />

      <input
        name="password"
        placeholder="Password"
        type="password"
        className="form-control mb-3"
        onChange={change}
      />

      <input
        name="name"
        placeholder="Name"
        className="form-control mb-3"
        onChange={change}
      />

      <label>Role:</label>
      <select name="role" className="form-control mb-3" onChange={change}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <button className="btn btn-primary" onClick={submit}>
        Add User
      </button>

      {msg && <div className="alert alert-info mt-3">{msg}</div>}
    </div>
  );
};

export default AddUser;
