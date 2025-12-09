import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const TransactionsHome = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="container mt-5">
      <h3>Transactions</h3>
      <hr />

      <ul style={{ fontSize: "18px", lineHeight: "35px" }}>

        {/* Book Availability — for both Admin & User */}
        <li>
          <Link to="/transactions/book-availability">Book Availability</Link>
        </li>

        {/* Return Book — for both Admin & User */}
        <li>
          <Link to="/transactions/return-book">Return Book</Link>
        </li>

        {/* Pending Issue Requests — only admin */}
        {user?.role === "admin" && (
          <li>
            <Link to="/reports/pending-requests">Pending Issue Requests</Link>
          </li>
        )}

        {/* Active Issue List — admin only */}
        {user?.role === "admin" && (
          <li>
            <Link to="/reports/active-issues">Active Issues</Link>
          </li>
        )}

        {/* Overdue List — admin only */}
        {user?.role === "admin" && (
          <li>
            <Link to="/reports/overdue">Overdue Books</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default TransactionsHome;
