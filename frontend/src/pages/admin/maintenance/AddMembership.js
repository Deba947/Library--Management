import React, { useState, useContext } from "react";
import API from "../../../api";
import { AuthContext } from "../../../context/AuthContext";
import { Navigate } from "react-router-dom";

const AddMembership = () => {
  const { user } = useContext(AuthContext);

 
  const [form, setForm] = useState({
    membershipNumber: "",
    memberName: "",
    duration: 6
  });

  const [msg, setMsg] = useState("");

  
  if (user?.role !== "admin") return <Navigate to="/" />;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.membershipNumber || !form.memberName) {
      setMsg("All fields are required");
      return;
    }

    try {
      const res = await API.post("/membership/add", form, {
        headers: { "x-role": user.role }
      });
      setMsg(res.data.message);
    } catch (err) {
      setMsg(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Add Membership</h3>
      <hr />

      <input
        type="text"
        name="membershipNumber"
        placeholder="Membership Number"
        className="form-control mb-3"
        onChange={handleChange}
      />

      <input
        type="text"
        name="memberName"
        placeholder="Member Username"
        className="form-control mb-3"
        onChange={handleChange}
      />

      <label>Duration:</label>
      <select
        name="duration"
        className="form-control mb-3"
        onChange={handleChange}
      >
        <option value="6">6 Months</option>
        <option value="12">1 Year</option>
        <option value="24">2 Years</option>
      </select>

      <button className="btn btn-primary" onClick={handleSubmit}>
        Add Membership
      </button>

      {msg && <div className="alert alert-info mt-3">{msg}</div>}
    </div>
  );
};

export default AddMembership;
