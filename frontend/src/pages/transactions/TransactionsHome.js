import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./transactions.css";

const TransactionsHome = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="container mt-5">

      <h2 className="fw-bold text-center">Transactions</h2>
      <p className="text-center text-muted">Issue, Return & Book Status</p>
      <hr />

      <div className="row g-4 mt-4">

        {/* Book Availability */}
        <div className="col-md-4">
          <Link to="/transactions/book-availability" className="trans-card card-blue">
            <div className="icon">📚</div>
            <h5>Book Availability</h5>
            <p>Check available copies & serial numbers</p>
          </Link>
        </div>

        {/* Return Book */}
        <div className="col-md-4">
          <Link to="/transactions/return-book" className="trans-card card-green">
            <div className="icon">🔁</div>
            <h5>Return Book</h5>
            <p>Process returned books & calculate fines</p>
          </Link>
        </div>

        {/* Pending Requests — Admin Only */}
        {user?.role === "admin" && (
          <div className="col-md-4">
            <Link to="/transactions/pending-issues" className="trans-card card-yellow">
              <div className="icon">⏳</div>
              <h5>Pending Issue Requests</h5>
              <p>Requests waiting for admin approval</p>
            </Link>
          </div>
        )}

        {/* Active Issues — Admin Only */}
        {user?.role === "admin" && (
          <div className="col-md-4">
            <Link to="/transactions/active-issues" className="trans-card card-gray">
              <div className="icon">📘</div>
              <h5>Active Issues</h5>
              <p>Books currently issued to users</p>
            </Link>
          </div>
        )}

        {/* ⭐ Overdue Books — Admin + Users */}
        <div className="col-md-4">
          <Link to="/transactions/overdue" className="trans-card card-red">
            <div className="icon">⚠️</div>
            <h5>Overdue Books</h5>
            <p>View overdue books & fines</p>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default TransactionsHome;
