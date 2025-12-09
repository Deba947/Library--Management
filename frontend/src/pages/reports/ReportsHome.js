import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const ReportsHome = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="container mt-5">
      <h3>Reports</h3>
      <hr />

      <ul>
        <li><Link to="/reports/master-books">Master Books</Link></li>
        <li><Link to="/reports/master-memberships">Master Memberships</Link></li>
        <li><Link to="/reports/master-users">Master Users</Link></li>
        <li><Link to="/reports/pending-requests">Pending Issue Requests</Link></li>

        {user?.role === "admin" && (
          <>
            <li><Link to="/reports/active-issues">Active Issues</Link></li>
            <li><Link to="/reports/overdue">Overdue Books</Link></li>
          </>
        )}
      </ul>
    </div>
  );
};

export default ReportsHome;
