import React from "react";
import { Link } from "react-router-dom";

const UserHome = () => {
  return (
    <div className="container mt-5">
      <h2>User Dashboard</h2>
      <hr />

      <ul>
        <li><Link to="/user/reports">Reports</Link></li>
        <li><Link to="/user/transactions">Transactions</Link></li>
        <li><Link to="/transactions">Transactions</Link></li>
        <li><Link to="/reports">Reports</Link></li>


        
      </ul>
    </div>
  );
};

export default UserHome;
