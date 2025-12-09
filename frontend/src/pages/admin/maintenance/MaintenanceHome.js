import React from "react";
import { Link } from "react-router-dom";

const MaintenanceHome = () => {
  return (
    <div className="container mt-5">
      <h3>Maintenance</h3>
      <hr />

      <ul>
        <li><Link to="/admin/maintenance/add-membership">Add Membership</Link></li>
        <li><Link to="/admin/maintenance/update-membership">Update Membership</Link></li>
        <li><Link to="/admin/maintenance/add-book">Add Book / Movie</Link></li>
        <li><Link to="/admin/maintenance/update-book">Update Book / Movie</Link></li>
        <li><Link to="/admin/maintenance/add-user">Add User</Link></li>
        <li><Link to="/admin/maintenance/update-user">Update User</Link></li>
      </ul>
    </div>
  );
};

export default MaintenanceHome;
