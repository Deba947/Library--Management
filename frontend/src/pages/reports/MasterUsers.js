import React, { useEffect, useState } from "react";
import API from "../../api";

const MasterUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get("/reports/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error loading users:", err));
  }, []);

  return (
    <div className="container mt-4">
      <h3>Master Users</h3>
      <hr />

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u._id}</td>
              <td>{u.name}</td>
              <td>{u.username}</td>
              <td>{u.role}</td>
              <td>{u.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MasterUsers;
