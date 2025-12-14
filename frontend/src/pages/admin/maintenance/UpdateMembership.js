import React, { useState, useContext } from "react";
import API from "../../../api";
import { AuthContext } from "../../../context/AuthContext";
import { Navigate } from "react-router-dom";

const UpdateMembership = () => {
  const { user } = useContext(AuthContext);

 
  const [membershipNumber, setMembershipNumber] = useState("");
  const [action, setAction] = useState("extend");
  const [msg, setMsg] = useState("");

  
  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async () => {
    if (!membershipNumber) {
      setMsg("Membership Number is required");
      return;
    }

    try {
      const res = await API.put(
        "/membership/update",
        { membershipNumber, action, duration: 6 },
        { headers: { "x-role": user.role } }
      );

      setMsg(res.data.message);
    } catch (err) {
      setMsg(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Update Membership</h3>
      <hr />

      <input
        type="text"
        placeholder="Membership Number"
        className="form-control mb-3"
        onChange={(e) => setMembershipNumber(e.target.value)}
      />

      <label>Action:</label>
      <select
        className="form-control mb-3"
        value={action}
        onChange={(e) => setAction(e.target.value)}
      >
        <option value="extend">Extend 6 Months</option>
        <option value="cancel">Cancel Membership</option>
      </select>

      <button className="btn btn-primary" onClick={handleSubmit}>
        Update
      </button>

      {msg && <div className="alert alert-info mt-3">{msg}</div>}
    </div>
  );
};

export default UpdateMembership;
