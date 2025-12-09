import React from "react";
import { Link } from "react-router-dom";

const AdminHome = () => {
  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>
      <hr />

      <ul>
        <li><Link to="/admin/maintenance">Maintenance</Link></li>
        <li><Link to="/admin/reports">Reports</Link></li>
        <li><Link to="/admin/transactions">Transactions</Link></li>
        <li><Link to="/transactions">Transactions</Link></li>
        <li><Link to="/reports">Reports</Link></li>


      </ul>
    </div>
  );
};

export default AdminHome;
