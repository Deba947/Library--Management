import React, { useState } from "react";
import API from "../api";

const Signup = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    name: "",
    role: "user"
  });

  const [msg, setMsg] = useState("");

  const handle = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    if (!form.username || !form.password || !form.name) {
      setMsg("All fields are required");
      return;
    }

    try {
      const res = await API.post("/auth/signup", form);
      setMsg("Signup successful! You can now login.");
    } catch (err) {
      setMsg(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="container mt-5 w-25 border p-4 rounded shadow">
      <h3 className="text-center mb-3">Signup</h3>

      <input
        type="text"
        name="username"
        placeholder="Username"
        className="form-control mb-3"
        onChange={handle}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        className="form-control mb-3"
        onChange={handle}
      />

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        className="form-control mb-3"
        onChange={handle}
      />

      <label>Role:</label>
      <select
        name="role"
        className="form-control mb-3"
        onChange={handle}
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <button className="btn btn-primary w-100" onClick={submit}>
        Signup
      </button>

      {msg && <div className="alert alert-info mt-3">{msg}</div>}
    </div>
  );
};

export default Signup;
