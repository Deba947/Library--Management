import React from "react";
import { Link } from "react-router-dom";
import "./userHome.css";

const UserHome = () => {
  return (
    <div className="container mt-5">
      <h2 className="fw-bold text-center">User Dashboard</h2>
      <p className="text-center text-muted">Access your library services</p>
      <hr />

      <div className="row g-4 mt-4">

        <div className="col-md-6">
          <Link to="/transactions/book-availability" className="user-card card-blue">
            <div className="icon">📘</div>
            <h5>Check Book Availability</h5>
          </Link>
        </div>

        <div className="col-md-6">
          <Link to="/transactions/return-book" className="user-card card-yellow">
            <div className="icon">📥</div>
            <h5>Return a Book</h5>
          </Link>
        </div>

        <div className="col-md-6">
          <Link to="/reports/master-memberships" className="user-card card-blue">
            <div className="icon">🧾</div>
            <h5>My Membership</h5>
          </Link>
        </div>

        {/* ✅ ACTIVE ISSUES (CORRECT PATH) */}
        <div className="col-md-6">
          <Link to="/transactions/active-issues" className="user-card card-green">
            <div className="icon">📚</div>
            <h5>My Active Issues</h5>
          </Link>
        </div>

        <div className="col-md-6 offset-md-3">
          <Link to="/transactions/overdue" className="user-card card-red">
            <div className="icon">⏰</div>
            <h5>Overdue Books</h5>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default UserHome;
