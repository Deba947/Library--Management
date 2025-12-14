import React from "react";
import { Link } from "react-router-dom";
import "./adminHome.css";  

const AdminHome = () => {
  return (
    <div className="container mt-5">

      <h2 className="fw-bold text-center">Admin Dashboard</h2>
      <p className="text-center text-muted">Quick access to all admin modules</p>
      <hr />

      <div className="row g-4 mt-4">

        {/* Maintenance */}
        <div className="col-md-4">
          <Link to="/admin/maintenance" className="dash-card card-maint">
            <div className="icon">🛠️</div>
            <h5>Maintenance</h5>
            <p>Manage books, users, memberships</p>
          </Link>
        </div>
        


        {/* Transactions */}
        <div className="col-md-4">
          <Link to="/transactions" className="dash-card card-trans">
            <div className="icon">🔄</div>
            <h5>Transactions</h5>
            <p>Issue & return books</p>
          </Link>
        </div>

        {/* Reports */}
        <div className="col-md-4">
          <Link to="/reports" className="dash-card card-report">
            <div className="icon">📊</div>
            <h5>Reports</h5>
            <p>View system and usage reports</p>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default AdminHome;
