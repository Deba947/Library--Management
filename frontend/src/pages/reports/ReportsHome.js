import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./reports.css"; // NEW CSS FILE

const ReportsHome = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="container mt-5">

      <h2 className="fw-bold text-center">Reports</h2>
      <p className="text-center text-muted">View library reports & summaries</p>
      <hr />

      <div className="row g-4 mt-4">

        {/* Master Books */}
        <div className="col-md-4">
          <Link to="/reports/master-books" className="report-card card-blue">
            <div className="icon">📚</div>
            <h5>Master Books</h5>
            <p>Full list of all books & movies</p>
          </Link>
        </div>

        {/* Master Memberships */}
        <div className="col-md-4">
          <Link to="/reports/master-memberships" className="report-card card-green">
            <div className="icon">🪪</div>
            <h5>Master Memberships</h5>
            <p>Membership details & durations</p>
          </Link>
        </div>

        {/* Master Users */}
        <div className="col-md-4">
          <Link to="/reports/master-users" className="report-card card-gray">
            <div className="icon">👥</div>
            <h5>Master Users</h5>
            <p>All registered users in the system</p>
          </Link>
        </div>

        


            

      </div>
    </div>
  );
};

export default ReportsHome;
