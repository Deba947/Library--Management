import React, { useEffect, useState } from "react";
import API from "../../api";

const MasterUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get("/reports/users").then((res) => setUsers(res.data));
  }, []);

  return (
    <div className="container mt-4">
      <h3>Master Users</h3>
      <hr />

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
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
