import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  if (!user) return null; // Hide navbar on login/signup pages

  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <Link to={user.role === "admin" ? "/admin" : "/user"} className="navbar-brand">
        Library System
      </Link>

      <div className="text-white">
        <span className="me-3">
          {user.name} ({user.role})
        </span>

        <button className="btn btn-outline-light btn-sm" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
