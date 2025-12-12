import React, { useEffect, useState, useContext } from "react";
import API from "../../api";
import { AuthContext } from "../../context/AuthContext";

const MasterMemberships = () => {
  const [list, setList] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    API.get("/reports/memberships", {
      headers: {
        "x-role": user.role,
        "x-username": user.username
      }
    })
      .then((res) => setList(res.data))
      .catch(() => setList([]));
  }, [user]);

  return (
    <div className="container mt-4">
      <h3 className="fw-bold text-center">
        {user.role === "admin" ? "Master Membership List" : "Your Membership"}
      </h3>
      <hr />

      {list.length === 0 ? (
        <p className="text-center text-muted">No membership found.</p>
      ) : (
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>Membership No</th>
              <th>Name</th>
              <th>Duration</th>
              <th>Status</th>
              <th>Start</th>
              <th>End</th>
            </tr>
          </thead>

          <tbody>
            {list.map((m) => (
              <tr key={m._id}>
                <td>{m.membershipNumber}</td>
                <td>{m.memberName}</td>
                <td>{m.duration} months</td>
                <td>{m.status}</td>
                <td>{m.startDate.split("T")[0]}</td>
                <td>{m.endDate.split("T")[0]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MasterMemberships;
