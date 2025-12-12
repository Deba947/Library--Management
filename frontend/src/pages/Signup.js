import React, { useState } from "react";
import { Link } from "react-router-dom";
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
      await API.post("/auth/signup", form); // Fixed: no unused variable
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
        {/* <option value="admin">Admin</option> */}
      </select>

      <button className="btn btn-primary w-100" onClick={submit}>
        Signup
      </button>

      {/* Message */}
      {msg && <div className="alert alert-danger mt-3">{msg}</div>}

      {/* Login link */}
      <Link to="/" className="d-block mt-3 text-center">
        Already have an account? Login
      </Link>
    </div>
  );
};

export default Signup;
