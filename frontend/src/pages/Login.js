import React, { useState, useContext } from "react";
import API from "../api";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ username: "", password: "" });
  const [msg, setMsg] = useState("");

  const handle = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    try {
      const res = await API.post("/auth/login", form);
      login(res.data.user);
      if (res.data.user.role === "admin") window.location = "/admin";
      else window.location = "/user";
    } catch (err) {
      setMsg("Invalid username or password");
    }
  };

  return (
    <div className="container mt-5 w-25 border p-4 rounded shadow">
      <h3 className="text-center mb-3">Login</h3>

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

      <button className="btn btn-primary w-100" onClick={submit}>
        Login
      </button>

      <a href="/signup" className="d-block mt-3 text-center">Create an account</a>

      {msg && <div className="alert alert-danger mt-3">{msg}</div>}
    </div>
  );
};

export default Login;
