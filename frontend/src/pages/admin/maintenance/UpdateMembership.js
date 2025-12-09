import React, { useState } from "react";
import API from "../../../api";

const UpdateMembership = () => {
  const [membershipNumber, setMembershipNumber] = useState("");
  const [action, setAction] = useState("extend");
  const [msg, setMsg] = useState("");

  const handleSubmit = async () => {
    if (!membershipNumber) {
      setMsg("Membership Number is required");
      return;
    }

    try {
      const res = await API.put("/membership/update", {
        membershipNumber,
        action,
        duration: 6
      });
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
