import React from "react";
import { Link } from "react-router-dom";
import "./maintenance.css";

const MaintenanceHome = () => {
  return (
    <div className="container mt-5">
      <h3 className="fw-bold text-center">Maintenance Section</h3>
      <p className="text-center text-muted">Manage books, users & memberships</p>
      <hr />

      <div className="row g-4 mt-4">

        <div className="col-md-4">
          <Link to="/admin/maintenance/add-membership" className="maint-card card-blue">
            <h5>Add Membership</h5>
            <p>Create new library membership</p>
          </Link>
        </div>

        <div className="col-md-4">
          <Link to="/admin/maintenance/update-membership" className="maint-card card-green">
            <h5>Update Membership</h5>
            <p>Extend or cancel membership</p>
          </Link>
        </div>


        <div className="col-md-4">
          <Link to="/admin/maintenance/add-user" className="maint-card card-purple">
            <h5>Add User</h5>
            <p>Create new system user</p>
          </Link>
        </div>

        <div className="col-md-4">
          <Link to="/admin/maintenance/update-user" className="maint-card card-red">
            <h5>Update User</h5>
            <p>Edit system user details</p>
          </Link>
        </div>

        <div className="col-md-4">
          <Link to="/admin/maintenance/add-book" className="maint-card card-orange">
            <h5>Add Book / Movie</h5>
            <p>Add new book or movie</p>
          </Link>
        </div>

        <div className="col-md-4">
          <Link to="/admin/maintenance/update-book" className="maint-card card-teal">
            <h5>Update Book / Movie</h5>
            <p>Edit book or movie details</p>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default MaintenanceHome;
